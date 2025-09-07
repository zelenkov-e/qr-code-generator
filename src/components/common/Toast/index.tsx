import React, { FC } from "react";
import styles from "./Toast.module.scss";

export interface ToastProps {
  title?: string;
  message: string;
  position: "topRight" | "bottomRight" | "topLeft" | "bottomLeft";
  trigger: boolean;
  type: "success" | "error";
}

const Toast: FC<ToastProps> = ({ position, trigger, message, type }) => {
  const containerClass = `${styles.notificationContainer} ${styles[position]}`;
  const toastClass = `${styles.notification} ${type === "success" ? styles.toastSuccess : styles.toastError} ${styles[position]}`;

  return (
    <div className={containerClass}>
      {trigger && (
        <div className={toastClass}>
          <p className={styles.notificationMessage}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Toast;
