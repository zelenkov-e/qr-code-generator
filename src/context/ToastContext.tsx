// src/context/ToastContext.tsx
import React, { createContext, useState, useCallback, ReactNode } from "react";
import Toast from "@/components/common/Toast"; // Adjust path as needed

type ToastType = "success" | "error";
type Position = "topRight" | "bottomRight" | "topLeft" | "bottomLeft";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, position?: Position) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");
  const [position, setPosition] = useState<Position>("topRight");
  const [trigger, setTrigger] = useState(false);

  const showToast = useCallback((msg: string, type: ToastType = "success", pos: Position = "topRight") => {
    setMessage(msg);
    setType(type);
    setPosition(pos);
    setTrigger(true);
    setTimeout(() => setTrigger(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast trigger={trigger} message={message} type={type} position={position} />
    </ToastContext.Provider>
  );
};
