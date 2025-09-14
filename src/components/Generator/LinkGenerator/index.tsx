"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./LinkQRGenerator.module.scss";

// отключаем SSR для библиотеки QR
const QRCode = dynamic(() => import("react-qrcode-logo").then((mod) => mod.QRCode), { ssr: false });

const MAX_LINKS = 50;

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
}

const LinkGenerator = ({ preview, uploadLogo, inputLabel, resetBtn, downloadAllBtn, generateBtn, downloadBtn, noLinks, noQRs, limit }: PageProps) => {
  const [rawLinks, setRawLinks] = useState<string>("");
  const [qrs, setQrs] = useState<QRItem[]>([]);
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result as string); // base64 строка
    };
    reader.readAsDataURL(file);
  };

  const generateAllQR = () => {
    const linksArray = rawLinks
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (linksArray.length === 0) {
      alert(noLinks);
      return;
    }

    if (linksArray.length > MAX_LINKS) {
      //   alert(`Максимум ${MAX_LINKS} ссылок за раз.`);
      alert(limit);
      return;
    }

    const qrList: QRItem[] = linksArray.map((url) => ({
      data: url,
      logoImage: logoImage,
    }));
    setQrs(qrList);
  };

  const resetAll = () => {
    setRawLinks("");
    setQrs([]);
    setLogoImage(undefined);
  };

  // скачать один QR
  const downloadQR = (canvasId: string, index: number) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode_${index + 1}.png`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    if (qrs.length === 0) {
      alert(noQRs);
      return;
    }

    const zip = new JSZip();

    for (let i = 0; i < qrs.length; i++) {
      const canvas = document.getElementById(`qr-${i}`) as HTMLCanvasElement | null;
      if (!canvas) continue;

      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      zip.file(`qrcode_${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "qrcodes.zip");
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
        <label>{inputLabel}</label>
        <textarea rows={8} value={rawLinks} onChange={(e) => setRawLinks(e.target.value)} className={styles.textarea} />
      </div>

      <div className={styles.actions}>
        <button onClick={generateAllQR} className={styles.generateBtn}>
          {generateBtn}
        </button>

        <button onClick={resetAll} className={styles.resetBtn}>
          {resetBtn}
        </button>

        {qrs.length > 0 && (
          <button onClick={downloadAllAsZip} className={styles.zipBtn}>
            {downloadAllBtn}
          </button>
        )}
      </div>

      {/* Сетка QR-кодов */}
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

export default LinkGenerator;
