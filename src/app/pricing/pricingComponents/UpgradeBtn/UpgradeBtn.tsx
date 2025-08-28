import { Zap } from "lucide-react";
import Link from "next/link";
import "./UpgradeBtn.css";

export default function UpgradeBtn() {
  const CHECKOUT_URL =
    "https://vikasprajapati.lemonsqueezy.com/buy/909ab34b-287c-4a1f-a093-76a28d98a5dd";

  return (
    <Link
      href={CHECKOUT_URL}
      className="upgrade-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Upgrade to Pro plan"
    >
      <Zap className="icon" />
      <span className="upgrade-btn-text">Upgrade to Pro</span>
    </Link>
  );
}