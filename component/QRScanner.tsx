"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

interface QRScannerProps {
  style?: React.CSSProperties;
  setData: (data: any) => void;
  isScanning?: boolean;
}

export default function QRScanner({ style, setData, isScanning = true }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (!isScanning) {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      return;
    }

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        codeReader.decodeFromVideoDevice(null, videoRef.current!, (result, error) => {
          if (result) {
            setData(result.getText());
          }

          if (error && error.name !== 'NotFoundException') {
            console.error('QR Code scanning error:', error);
          }
        });
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      codeReader.reset();
    };
  }, [isScanning]);

  return (
    <div>
      <video ref={videoRef} style={style} autoPlay playsInline />
    </div>
  );
}


