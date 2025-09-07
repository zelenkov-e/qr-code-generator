import React from "react";
import styles from "./Fab.module.scss";

export interface FabProps {
  onClick: () => void;
  icon?: React.ReactNode;
  position?: "bottom-right" | "bottom-left";
  label?: string;
}

const Fab: React.FC<FabProps> = ({ onClick, icon, position = "bottom-right", label }) => {
  return (
    <button className={`${styles.fab} ${styles[position]}`} onClick={onClick}>
      {icon}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default Fab;
