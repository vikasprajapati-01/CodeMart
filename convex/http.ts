import { HttpRouter } from "convex/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

import { httpAction } from "./_generated/server"
import { api } from "./_generated/api"

const router = new HttpRouter();

router.route({
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

export default router;