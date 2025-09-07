import React from "react";
import { ButtonProps } from "./interface";
import styles from "./Button.module.scss";

const Button: React.FC<ButtonProps> = ({
  className = "",
  onClick,
  title,
  disabled,
  children,
  type = "button",
  variant = "primary", // new prop for variant
}) => {
  const variantClass =
    {
      primary: styles.askBtnPrimary,
      default: styles.askBtnDefault,
      basic: styles.askBtnBasic,
    }[variant] || styles.askBtnDefault;

  const classes = `${variantClass} ${disabled ? styles.askBtnDisabled : ""} ${className}`;

  return (
    <button className={classes} onClick={onClick} title={title} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
