import React from "react";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "space-between" | "space-around" | "flex-end";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  gap?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ className = "", children, direction = "row", justify = "flex-start", align = "center", gap = "1rem" }) => {
  return (
    <div className={`${styles.wrapper} ${className}`} style={{ flexDirection: direction, justifyContent: justify, alignItems: align, gap }}>
      {children}
    </div>
  );
};

export default Wrapper;
