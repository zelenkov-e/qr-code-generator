import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import styles from "./BarCodeScanner.module.scss";

interface Props {
  stopScan: string;
  startScan: string;
  note: string;
  iframeMessage: string;
}

export default function BarCodeScanner({ stopScan, startScan, note, iframeMessage }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<any>(null); // <--- FIX
  const readerRef = useRef(new BrowserMultiFormatReader()); // <--- FIX

  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = async () => {
    console.log("Camera started");
    try {
      const controls = await readerRef.current.decodeFromVideoDevice(undefined, videoRef.current!, (result, error) => {
        if (result) {
          setResult(result.getText());
          stopScanner();
        }
      });

      controlsRef.current = controls;
      setIsScanning(true);
    } catch (e) {
      console.error("Scanner error:", e);
    }
  };

  const stopScanner = () => {
    if (controlsRef.current) {
      console.log("Stopping camera...");
      controlsRef.current.stop();
      console.log("Camera stopped");
    }
    setIsScanning(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} />
        {!isScanning && !result && <div className={styles.videoOverlay}>{iframeMessage}</div>}
      </div>

      <div className={styles.actions}>
        {!isScanning ? (
          <button className={styles.startBtn} onClick={startScanner}>
            {startScan}
          </button>
        ) : (
          <button className={styles.stopBtn} onClick={stopScanner}>
            {stopScan}
          </button>
        )}
      </div>

      {result && (
        <div className={styles.resultBox}>
          <h3>Result:</h3>
          <p>{result}</p>
          <button
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(result);
              alert(note);
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
