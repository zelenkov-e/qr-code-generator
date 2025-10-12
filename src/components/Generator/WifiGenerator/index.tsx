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

interface PageProps {
  preview: string;
  uploadLogo: string;
  inputLabel: string;
  resetBtn: string;
  downloadAllBtn: string;
  generateBtn: string;
  downloadBtn: string;
  noLinks: string;
  noQRs: string;
  limit: string;
  hiddenNetwork: string;
  removeBtn: string;
}

const WifiGenerator = ({ preview, uploadLogo, resetBtn, generateBtn, downloadBtn, noLinks, limit, hiddenNetwork, removeBtn }: PageProps) => {
  const [wifiConfigs, setWifiConfigs] = useState<WifiConfig[]>([{ ssid: "", password: "", type: "WPA", hidden: false }]);
  const [qrs, setQrs] = useState<QRItem[]>([]);
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result as string);
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
      alert(limit);
      return;
    }
    setWifiConfigs([...wifiConfigs, { ssid: "", password: "", type: "WPA", hidden: false }]);
  };

  const removeWifiConfig = (index: number) => {
    setWifiConfigs(wifiConfigs.filter((_, i) => i !== index));
  };

  const generateWifiString = ({ ssid, password, type, hidden }: WifiConfig) => `WIFI:T:${type};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;

  const generateAllQR = () => {
    if (wifiConfigs.length === 0) {
      alert(noLinks);
      return;
    }
    const qrList: QRItem[] = wifiConfigs.map((cfg) => ({
      data: generateWifiString(cfg),
      logoImage,
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
        <label>{uploadLogo}</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {logoImage && (
          <div className={styles.logoPreview}>
            <p>{preview}</p>
            <img src={logoImage} alt="logo" width={80} />
          </div>
        )}
      </div>

      <div className={styles.form}>
        {wifiConfigs.map((cfg, idx) => (
          <div key={idx} className={styles.wifiBlock}>
            <input type="text" placeholder="SSID(NETWORK NAME)" value={cfg.ssid} onChange={(e) => updateWifiField(idx, "ssid", e.target.value)} />
            <input type="text" placeholder="PASSWORD" value={cfg.password} onChange={(e) => updateWifiField(idx, "password", e.target.value)} />
            <select value={cfg.type} onChange={(e) => updateWifiField(idx, "type", e.target.value as WifiConfig["type"])}>
              <option value="WPA">WPA</option>
              <option value="WEP">WEP</option>
              <option value="">None</option>
            </select>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={cfg.hidden} onChange={(e) => updateWifiField(idx, "hidden", e.target.checked)} />
              <span>{hiddenNetwork}</span>
            </label>
            {wifiConfigs.length > 1 && (
              <button onClick={() => removeWifiConfig(idx)} className={styles.removeBtn}>
                {removeBtn}
              </button>
            )}
          </div>
        ))}
        <button onClick={addWifiConfig} className={styles.addBtn}>
          + Wi-Fi
        </button>
      </div>

      <div className={styles.actions}>
        <button onClick={generateAllQR} className={styles.generateBtn}>
          {generateBtn}
        </button>

        <button onClick={resetAll} className={styles.resetBtn}>
          {resetBtn}
        </button>
      </div>

      {/* Сетка с QR */}
      <div className={styles.qrGrid}>
        {qrs.map((qr, idx) => {
          const canvasId = `qr-${idx}`;
          return (
            <div key={idx} className={styles.qrItem}>
              <QRCode id={canvasId} value={qr.data} ecLevel="H" size={300} quietZone={20} fgColor="#000000" bgColor="#ffffff" qrStyle="squares" logoImage={qr.logoImage} logoWidth={48} logoHeight={48} logoPadding={12} logoPaddingStyle="circle" removeQrCodeBehindLogo />
              <button onClick={() => downloadQR(canvasId, idx)} className={styles.downloadBtn}>
                {downloadBtn}
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
