import React, { useState, useCallback, ChangeEvent } from "react";
import jsQR, { QRCode } from "jsqr";
import styles from "./QRCodeDecoder.module.scss";

interface QRCodeDecoderProps {
  uploadLabel: string;
  decodeBtn: string;
  preview: string;
  resultLabel: string;
  notFound: string;
}

const QRCodeDecoder: React.FC<QRCodeDecoderProps> = ({ uploadLabel, decodeBtn, preview, resultLabel, notFound }) => {
  const [image, setImage] = useState<string | null>(null);
  const [decodedLink, setDecodedLink] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeQRCode = useCallback((): void => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code: QRCode | null = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setDecodedLink(code.data);
        } else {
          setDecodedLink("QR code not found");
        }
      }
    };
    img.src = image;
  }, [image]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadBox}>
        <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.fileInput} />
      </div>

      <button onClick={decodeQRCode} className={styles.decodeButton} disabled={!image}>
        {decodeBtn}
      </button>

      {decodedLink && (
        <p className={styles.result}>
          {resultLabel}:{" "}
          <a href={decodedLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {decodedLink}
          </a>
        </p>
      )}

      {image && (
        <div className={styles.preview}>
          <p className={styles.previewLabel}>{preview}</p>
          <img src={image} alt="Uploaded QR Code" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
};

export default QRCodeDecoder;
