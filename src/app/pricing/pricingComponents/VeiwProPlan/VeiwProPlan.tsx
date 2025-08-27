import { ArrowRight, Command, Star } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import "./VeiwProPlan.css";

function VeiwProPlan() {
  return (
    <div className="pro-plan-page">
      <Navbar />
      <div className="pro-plan-container">
        <div className="pro-plan-card-wrap">
          <div className="pro-plan-top-line" />
          <div className="pro-plan-bottom-line" />
          <div className="pro-plan-outer-glow" />

          <div className="pro-plan-card">
            <div className="pro-plan-inner-glow" />

            <div className="pro-plan-content">
              <div className="pro-plan-star-wrap">
                <Star className="pro-plan-star" />
              </div>

              <h1 className="pro-plan-title">Pro Plan Active</h1>
              <p className="pro-plan-subtitle">
                Experience the full power of professional development
              </p>

              <Link href="/" className="pro-plan-cta">
                <Command className="icon-command" />
                <span className="pro-plan-cta-text">Open Editor</span>
                <ArrowRight className="icon-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VeiwProPlan;