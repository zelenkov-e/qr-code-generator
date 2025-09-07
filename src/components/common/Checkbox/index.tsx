import React, { FC } from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, name, label, checked, onChange, disabled = false, className = "" }) => {
  return (
    <label className={`${styles.checkboxWrapper} ${className}`} htmlFor={id}>
      <input type="checkbox" id={id} name={name} checked={checked} onChange={onChange} disabled={disabled} className={styles.checkboxInput} />
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};

export default Checkbox;
