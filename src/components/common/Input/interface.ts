export interface InputProps {
  className?: string;
  value: string;
  handleChange?: (e: React.SyntheticEvent) => void;
  handleBlur?: () => void;
  handleFocus?: () => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePaste?: () => void;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
}
