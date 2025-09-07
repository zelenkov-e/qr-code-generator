// components/common/Image.tsx
import NextImage from "next/image";
import React from "react";
import styles from "./Image.module.scss";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: boolean;
  priority?: boolean;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, rounded = true, priority = true, className = "" }) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`${styles.image} ${rounded ? styles.rounded : ""} ${className}`}
    />
  );
};

export default Image;
