"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "./BulkQRGenerator.module.scss";

// Динамический импорт, чтобы отключить SSR у QR-код библиотеки
const QRCode = dynamic(
  () => import("react-qrcode-logo").then((mod) => mod.QRCode),
  { ssr: false }
);

const MAX_LINKS = 50;

type WifiConfig = {
  ssid: string;
  password: string;
  type: "WPA" | "WEP" | "";
  hidden: boolean;
};

type QRItem = {
  data: string;
//   logoImage: string;
};

const BulkQRGenerator: React.FC = () => {
  const [mode, setMode] = useState<"wifi" | "links">("wifi");
  const [wifiConfigs, setWifiConfigs] = useState<WifiConfig[]>([
    { ssid: "", password: "", type: "WPA", hidden: false },
  ]);
  const [links, setLinks] = useState<string[]>([""]);
  const [qrs, setQrs] = useState<QRItem[]>([]);

  // Обновление Wi-Fi полей
  const updateWifiField = <K extends keyof WifiConfig>(
    index: number,
    field: K,
    value: WifiConfig[K]
  ) => {
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
    setWifiConfigs([
      ...wifiConfigs,
      { ssid: "", password: "", type: "WPA", hidden: false },
    ]);
  };

  const removeWifiConfig = (index: number) => {
    setWifiConfigs(wifiConfigs.filter((_, i) => i !== index));
  };

  const generateWifiString = ({ ssid, password, type, hidden }: WifiConfig) =>
    `WIFI:T:${type};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;

  // Генерация QR-кодов
  const generateAllQR = () => {
    if (mode === "wifi") {
      if (wifiConfigs.length === 0) {
        alert("Нет Wi-Fi данных для генерации QR.");
        return;
      }
      const qrList: QRItem[] = wifiConfigs.map((cfg) => ({
        data: generateWifiString(cfg),
        // logoImage: "/logo.png", // логотип должен лежать в /public/logo.png
      }));
      setQrs(qrList);
    } else if (mode === "links") {
      if (links.length === 0 || !links.some((l) => l)) {
        alert("Нет ссылок для генерации QR.");
        return;
      }
      const qrList: QRItem[] = links.map((url) => ({
        data: url,
        // logoImage: "/logo.png",
      }));
      setQrs(qrList);
    }
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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Массовый генератор QR с логотипом</h2>

      {/* Выбор режима */}
      <div className={styles.modes}>
        <label>
          <input
            type="radio"
            name="mode"
            value="wifi"
            checked={mode === "wifi"}
            onChange={() => setMode("wifi")}
          />
          Wi-Fi
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="links"
            checked={mode === "links"}
            onChange={() => setMode("links")}
          />
          Ссылки
        </label>
      </div>

      {/* Форма для Wi-Fi */}
      {mode === "wifi" && (
        <div className={styles.form}>
          {wifiConfigs.map((cfg, idx) => (
            <div key={idx} className={styles.wifiBlock}>
              <input
                type="text"
                placeholder="SSID"
                value={cfg.ssid}
                onChange={(e) => updateWifiField(idx, "ssid", e.target.value)}
              />
              <input
                type="text"
                placeholder="Пароль"
                value={cfg.password}
                onChange={(e) => updateWifiField(idx, "password", e.target.value)}
              />
              <select
                value={cfg.type}
                onChange={(e) =>
                  updateWifiField(idx, "type", e.target.value as WifiConfig["type"])
                }
              >
                <option value="WPA">WPA</option>
                <option value="WEP">WEP</option>
                <option value="">None</option>
              </select>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={cfg.hidden}
                  onChange={(e) => updateWifiField(idx, "hidden", e.target.checked)}
                />
                <span>Скрытая сеть</span>
              </label>
              {wifiConfigs.length > 1 && (
                <button
                  onClick={() => removeWifiConfig(idx)}
                  className={styles.removeBtn}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
          <button onClick={addWifiConfig} className={styles.addBtn}>
            Добавить Wi-Fi
          </button>
        </div>
      )}

      {/* Форма для ссылок */}
      {mode === "links" && (
        <div className={styles.form}>
          {links.map((link, idx) => (
            <div key={idx} className={styles.linkBlock}>
              <input
                type="text"
                placeholder="Введите ссылку"
                value={link}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[idx] = e.target.value.trim();
                  setLinks(newLinks);
                }}
              />
              {links.length > 1 && (
                <button
                  onClick={() => setLinks(links.filter((_, i) => i !== idx))}
                  className={styles.removeBtn}
                >
                  Удалить
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              if (links.length >= MAX_LINKS) {
                alert(`Максимум ${MAX_LINKS} ссылок за раз.`);
                return;
              }
              setLinks([...links, ""]);
            }}
            className={styles.addBtn}
          >
            Добавить ссылку
          </button>
        </div>
      )}

      <button onClick={generateAllQR} className={styles.generateBtn}>
        Сгенерировать QR-коды
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
                // logoImage={qr.logoImage}
                size={200}
                logoWidth={50}
                logoHeight={50}
                logoOpacity={1}
                logoPadding={10}
                logoPaddingStyle="circle"
                removeQrCodeBehindLogo
              />
              <button
                onClick={() => downloadQR(canvasId, idx)}
                className={styles.downloadBtn}
              >
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

export default BulkQRGenerator;
