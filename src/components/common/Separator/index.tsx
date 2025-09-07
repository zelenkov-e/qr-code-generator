import React from "react";
import styles from "./Separator.module.scss";

interface SeparatorProps {
  size?: "small" | "middle" | "large";
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ size = "middle", className = "" }) => {
  return <div className={`${styles.separator} ${styles[size]} ${className}`} />;
};

export default Separator;
