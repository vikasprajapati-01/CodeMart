import { HttpRouter } from "convex/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

import { httpAction } from "./_generated/server"
import { api, internal } from "./_generated/api"

const http = new HttpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async ( ctx, request ) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error("CLERK_WEBHOOK_SECRET is not set");
        }

        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("No svix headers", {
                status: 400,
            });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const whook = new Webhook(webhookSecret);
        let event: WebhookEvent;

        try {
            event = whook.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;
        }
        catch (error) {
            console.error("Webhook verification failed:", error);
            return new Response("Invalid signature", { status: 400 });
        }

        const eventType = event.type;
        if(eventType === "user.created") {
            const { id, email_addresses, first_name, last_name } = event.data;

            const email = email_addresses.length > 0 ? email_addresses[0].email_address : "";
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, {
                    userId: id,
                    email: email,
                    name: name,
                });
            } catch (error) {
                console.error("Error creating user:", error);
                return new Response("Error creating user", { status: 500 });
            }
        }

        return new Response("User created successfully", { status: 200 });
    })
})

http.route({
  path: "/lemon-squeezy-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const signature = request.headers.get("X-Signature");

    if (!signature) {
      return new Response("Missing X-Signature header", { status: 400 });
    }

    try {
      const payload = await ctx.runAction(internal.lemonSqueezy.verifyWebhook, {
        payload: payloadString,
        signature,
      });

      if (payload.meta.event_name === "order_created") {
        const { data } = payload;

        const { success } = await ctx.runMutation(api.users.upgradeToPro, {
          email: data.attributes.user_email,
          lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
          lemonSqueezyOrderId: data.id,
          amount: data.attributes.total,
        });

        if (success) {
          console.log("User upgraded to Pro:", data.attributes.user_email);
        }
      }

      return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
      console.log("Webhook error:", error);
      return new Response("Error processing webhook", { status: 500 });
    }
  }),
});

export default http;