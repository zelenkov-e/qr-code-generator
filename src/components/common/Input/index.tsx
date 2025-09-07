import React, { FC } from "react";
import { InputProps } from "./interface";
import styles from "./Input.module.scss";

const Input: FC<InputProps> = ({ handleChange, handleKeyDown, type = "text", className = "", ...props }) => {
  return <input {...props} className={`${styles.input} ${className}`} type={type} onChange={handleChange} onKeyDown={handleKeyDown} />;
};

export default Input;
