import { Zap } from "lucide-react";
import Link from "next/link";
import "./UpgradeBtn.css";

export default function UpgradeBtn() {
  const CHECKOUT_URL =
    "https://ytprogrammingstore.lemonsqueezy.com/buy/d459dddb-a233-4060-9e72-90a1a7740552";

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