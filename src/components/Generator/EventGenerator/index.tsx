"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import styles from "./EventQRGenerator.module.scss";

const QRCode = dynamic(() => import("react-qrcode-logo").then((mod) => mod.QRCode), { ssr: false });

interface PageProps {
  preview: string;
  uploadLogo: string;
  inputLabel: string;
  resetBtn: string;
  generateBtn: string;
  downloadBtn: string;
  downloadAllBtn: string;
  noEvents: string;
  noQRs: string;
  placeholders: any;
}

type EventItem = {
  summary: string;
  start: string;
  end: string;
  location: string;
  description: string;
  logoImage?: string;
};

const EventQRGenerator = ({ preview, uploadLogo, inputLabel, resetBtn, generateBtn, downloadBtn, downloadAllBtn, noEvents, noQRs, placeholders }: PageProps) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [formData, setFormData] = useState<EventItem>({
    summary: "",
    start: "",
    end: "",
    location: "",
    description: "",
  });
  const [logoImage, setLogoImage] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogoImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const generateEventQR = () => {
    if (!formData.summary || !formData.start || !formData.end) {
      alert(noEvents);
      return;
    }

    const newEvent: EventItem = {
      ...formData,
      logoImage,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const resetAll = () => {
    setEvents([]);
    setFormData({ summary: "", start: "", end: "", location: "", description: "" });
    setLogoImage(undefined);
  };

  const downloadQR = (canvasId: string, index: number) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `event_qrcode_${index + 1}.png`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    if (events.length === 0) {
      alert(noQRs);
      return;
    }

    const zip = new JSZip();
    for (let i = 0; i < events.length; i++) {
      const canvas = document.getElementById(`event-qr-${i}`) as HTMLCanvasElement | null;
      if (!canvas) continue;

      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      zip.file(`event_qrcode_${i + 1}.png`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "event_qrcodes.zip");
  };

  const formatEventData = (e: EventItem) => `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${e.summary}
DTSTART:${e.start.replace(/[-:]/g, "")}Z
DTEND:${e.end.replace(/[-:]/g, "")}Z
LOCATION:${e.location}
DESCRIPTION:${e.description}
END:VEVENT
END:VCALENDAR
`;

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

      <form className={styles.form}>
        <div className={styles.eventBlock}>
          <label>{inputLabel}</label>
          <input type="text" name="summary" placeholder={placeholders.summary} value={formData.summary} onChange={handleChange} className={styles.input} />
          <input type="datetime-local" name="start" placeholder={placeholders.start} value={formData.start} onChange={handleChange} className={styles.input} />
          <input type="datetime-local" name="end" placeholder={placeholders.end} value={formData.end} onChange={handleChange} className={styles.input} />
          <input type="text" name="location" placeholder={placeholders.location} value={formData.location} onChange={handleChange} className={styles.input} />
          <input type="text" name="description" placeholder={placeholders.description} value={formData.description} onChange={handleChange} className={styles.input} />
        </div>
      </form>

      <div className={styles.actions}>
        <button onClick={generateEventQR} className={styles.generateBtn}>
          {generateBtn}
        </button>
        <button onClick={resetAll} className={styles.resetBtn}>
          {resetBtn}
        </button>
        {events.length > 0 && (
          <button onClick={downloadAllAsZip} className={styles.zipBtn}>
            {downloadAllBtn}
          </button>
        )}
      </div>

      <div className={styles.qrGrid}>
        {events.map((event, idx) => {
          const canvasId = `event-qr-${idx}`;
          const qrValue = formatEventData(event).trim();
          return (
            <div key={idx} className={styles.qrItem}>
              <QRCode id={canvasId} value={qrValue} ecLevel="H" size={300} quietZone={20} fgColor="#000000" bgColor="#ffffff" qrStyle="squares" logoImage={event.logoImage} logoWidth={48} logoHeight={48} logoPadding={12} logoPaddingStyle="circle" removeQrCodeBehindLogo />
              <button onClick={() => downloadQR(canvasId, idx)} className={styles.downloadBtn}>
                {downloadBtn}
              </button>
              <div className={styles.qrText}>{event.summary}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventQRGenerator;
