import React, { forwardRef, Ref } from "react";
import { TextAreaProps } from "./interface";
import styles from "./TextArea.module.scss";

const TextArea = forwardRef((props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
  const {
    className = "",
    value,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handlePaste,
    id,
    name,
    placeholder,
    disabled,
    maxLength,
  } = props;

  return (
    <textarea
      ref={ref}
      className={`${styles.textarea} ${className}`}
      id={id}
      name={name}
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPaste={handlePaste}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
});

TextArea.displayName = "TextArea"; // Required for forwardRef

export default TextArea;
