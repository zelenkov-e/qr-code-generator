import React from "react";

export interface TextAreaProps {
  className?: string;
  value: string;
  handleChange: (e: React.SyntheticEvent) => void;
  handleBlur?: (e: React.SyntheticEvent) => void;
  handleFocus?: (e: React.SyntheticEvent) => void;
  handleKeyDown?: (e: React.SyntheticEvent) => void;
  handlePaste?: (e: React.SyntheticEvent) => void;
  id?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}
