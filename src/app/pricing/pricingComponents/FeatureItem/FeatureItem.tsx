import { Check } from "lucide-react";
import "./FeatureItem.css";

interface FeatureItemProps {
  children: React.ReactNode;
}

const FeatureItem = ({ children }: FeatureItemProps) => (
  <div className="feature-item">
    <div className="feature-item-icon-wrap">
      <Check className="feature-item-icon" />
    </div>
    <span className="feature-item-text">{children}</span>
  </div>
);

export default FeatureItem;