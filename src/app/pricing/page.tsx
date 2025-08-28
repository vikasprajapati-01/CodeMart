import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Star } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { api } from "../../../convex/_generated/api";
import VeiwProPlan from "./pricingComponents/VeiwProPlan/VeiwProPlan";
import Navbar from "@/components/Navbar/Navbar";
import { ENTERPRISE_FEATURES, FEATURES } from "./constants";
import FeatureCategory from "./pricingComponents/FeatureCategory/FeatureCategory";
import FeatureItem from "./pricingComponents/FeatureItem/FeatureItem";
import UpgradeBtn from "./pricingComponents/UpgradeBtn/UpgradeBtn";
import LoginButton from "@/components/Login/Login";
import "./PricingPage.css";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <VeiwProPlan />;

  return (
    <div className="pricing-page">
      <Navbar />

      <main className="pricing-main">
        <div className="pricing-container">
          {/* Hero Section */}
          <div className="pricing-hero">
            <div className="pricing-hero-title-wrap">
              <div className="pricing-hero-glow" />
              <h1 className="pricing-hero-title">
                Supercharge Your <br />
                Dev Stack
              </h1>
            </div>
            <p className="pricing-hero-subtitle">
              Join thousands of developers building the future with our tools
            </p>
          </div>

          {/* Enterprise Features */}
          <div className="enterprise-grid">
            {ENTERPRISE_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="enterprise-card">
                  <div className="enterprise-icon-wrap">
                    <Icon className="enterprise-icon" />
                  </div>
                  <h3 className="enterprise-title">{feature.label}</h3>
                  <p className="enterprise-desc">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Pricing Card */}
          <div className="pricing-card-wrap">
            <div className="pricing-card-glow" />
            <div className="pricing-card">
              <div className="pricing-card-top-line" />
              <div className="pricing-card-bottom-line" />

              <div className="pricing-card-inner">
                {/* Header */}
                <div className="pricing-header">
                  <div className="pricing-star-wrap">
                    <Star className="pricing-star" />
                  </div>
                  <h2 className="pricing-title">Unlock CodeMart Pro
                    {/* <br />
                    <span style={{ color: "#3aafa9" }}>Limited time offer</span> */}
                  </h2>
                  <div className="pricing-amount">
                    <span className="pricing-currency">₹</span>
                    <span className="pricing-price">449.99</span>
                    <span className="pricing-period">/year</span>
                  </div>
                  <p className="pricing-subtitle">Unlock the full potential of CodeMart</p>
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Deployment">
                    {FEATURES.deployment.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="pricing-cta">
                  <SignedIn>
                    <UpgradeBtn />
                  </SignedIn>
                  <SignedOut>
                    <LoginButton />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;