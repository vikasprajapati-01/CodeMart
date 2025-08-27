import React from "react";
import "./FeatureCategory.css";

interface FeatureCategoryProps {
  children: React.ReactNode;
  label: string;
}

const FeatureCategory = ({ children, label }: FeatureCategoryProps) => (
  <div className="feature-category">
    <h3 className="feature-category-title">{label}</h3>
    <div className="feature-category-list">{children}</div>
  </div>
);

export default FeatureCategory;