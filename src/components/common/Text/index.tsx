import React from "react";
import styles from "./Text.module.scss";

interface TextProps {
  size?: "small" | "middle" | "large";
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ size = "middle", className = "", children }) => {
  return <p className={`${styles.text} ${styles[size]} ${className}`}>{children}</p>;
};

export default Text;
