"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./WifiQRGenerator.module.scss";

// Динамический импорт, чтобы отключить SSR у QR-код библиотеки
const QRCode = dynamic(() => import("react-qrcode-logo").then((mod) => mod.QRCode), { ssr: false });

const MAX_LINKS = 50;

type WifiConfig = {
  ssid: string;
  password: string;
  type: "WPA" | "WEP" | "";
  hidden: boolean;
};

type QRItem = {
  data: string;
  logoImage?: string;
};

const WifiGenerator: React.FC = () => {
  const [wifiConfigs, setWifiConfigs] = useState<WifiConfig[]>([{ ssid: "", password: "", type: "WPA", hidden: false }]);
  const [qrs, setQrs] = useState<QRItem[]>([]);
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);

  // загрузка файла логотипа
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result as string); // base64 строка
    };
    reader.readAsDataURL(file);
  };

  const updateWifiField = <K extends keyof WifiConfig>(index: number, field: K, value: WifiConfig[K]) => {
    const newConfigs = [...wifiConfigs];
    if (typeof value === "string") {
      newConfigs[index][field] = value.trim() as WifiConfig[K];
    } else {
      newConfigs[index][field] = value;
    }
    setWifiConfigs(newConfigs);
  };

  const addWifiConfig = () => {
    if (wifiConfigs.length >= MAX_LINKS) {
      alert(`Максимум ${MAX_LINKS} Wi-Fi QR за раз.`);
      return;
    }
    setWifiConfigs([...wifiConfigs, { ssid: "", password: "", type: "WPA", hidden: false }]);
  };

  const removeWifiConfig = (index: number) => {
    setWifiConfigs(wifiConfigs.filter((_, i) => i !== index));
  };

  const generateWifiString = ({ ssid, password, type, hidden }: WifiConfig) =>
    `WIFI:T:${type};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;

  // Генерация QR-кодов
  const generateAllQR = () => {
    if (wifiConfigs.length === 0) {
      alert("Нет Wi-Fi данных для генерации QR.");
      return;
    }
    const qrList: QRItem[] = wifiConfigs.map((cfg) => ({
      data: generateWifiString(cfg),
      logoImage, // логотип должен лежать в /public/logo.png
    }));
    setQrs(qrList);
  };

  const downloadQR = (canvasId: string, index: number) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode_${index + 1}.png`;
    link.click();
  };

  // сброс формы
  const resetAll = () => {
    setWifiConfigs([{ ssid: "", password: "", type: "WPA", hidden: false }]);
    setQrs([]);
    setLogoImage(undefined);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoUpload}>
        <label>Выберите логотип (png/jpg):</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {logoImage && (
          <div className={styles.logoPreview}>
            <p>Предпросмотр:</p>
            <img src={logoImage} alt="Логотип" width={80} />
          </div>
        )}
      </div>

      <div className={styles.form}>
        {wifiConfigs.map((cfg, idx) => (
          <div key={idx} className={styles.wifiBlock}>
            <input type="text" placeholder="SSID" value={cfg.ssid} onChange={(e) => updateWifiField(idx, "ssid", e.target.value)} />
            <input type="text" placeholder="Пароль" value={cfg.password} onChange={(e) => updateWifiField(idx, "password", e.target.value)} />
            <select value={cfg.type} onChange={(e) => updateWifiField(idx, "type", e.target.value as WifiConfig["type"])}>
              <option value="WPA">WPA</option>
              <option value="WEP">WEP</option>
              <option value="">None</option>
            </select>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={cfg.hidden} onChange={(e) => updateWifiField(idx, "hidden", e.target.checked)} />
              <span>Скрытая сеть</span>
            </label>
            {wifiConfigs.length > 1 && (
              <button onClick={() => removeWifiConfig(idx)} className={styles.removeBtn}>
                Удалить
              </button>
            )}
          </div>
        ))}
        <button onClick={addWifiConfig} className={styles.addBtn}>
          Добавить Wi-Fi
        </button>
      </div>

      <button onClick={generateAllQR} className={styles.generateBtn}>
        Сгенерировать QR-коды
      </button>

      <button onClick={resetAll} className={styles.resetBtn}>
        Сбросить
      </button>

      {/* Сетка с QR */}
      <div className={styles.qrGrid}>
        {qrs.map((qr, idx) => {
          const canvasId = `qr-${idx}`;
          return (
            <div key={idx} className={styles.qrItem}>
              <QRCode
                id={canvasId}
                value={qr.data}
                ecLevel="H"
                size={300}
                quietZone={20}
                fgColor="#000000"
                bgColor="#ffffff"
                qrStyle="squares"
                logoImage={qr.logoImage}
                logoWidth={48}
                logoHeight={48}
                logoPadding={12}
                logoPaddingStyle="circle"
                removeQrCodeBehindLogo
              />
              <button onClick={() => downloadQR(canvasId, idx)} className={styles.downloadBtn}>
                Скачать
              </button>
              <div className={styles.qrText}>{qr.data}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WifiGenerator;
