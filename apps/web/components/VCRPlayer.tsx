'use client';

import { useRef, useEffect, useState } from 'react';

interface VCRPlayerProps {
  videoSrc: string;
  onComplete: (expressionData: any[]) => void;
}

export default function VCRPlayer({ videoSrc, onComplete }: VCRPlayerProps) {
  const vcrVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [expressionData, setExpressionData] = useState<any[]>([]);
  const [cameraReady, setCameraReady] = useState(false);

  // Initialize user camera
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Camera access is required for the VCR experience');
      }
    }

    initCamera();

    return () => {
      // Cleanup: stop camera stream
      if (userVideoRef.current?.srcObject) {
        const stream = userVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // TODO: Integrate face-api.js for expression capture
  // This is a placeholder for the facial detection logic
  useEffect(() => {
    if (!cameraReady) return;

    const interval = setInterval(() => {
      if (vcrVideoRef.current && !vcrVideoRef.current.paused) {
        // TODO: Call face-api.js detection here
        // For now, just log timestamp
        const timestamp = vcrVideoRef.current.currentTime;
        console.log('Capturing at:', timestamp);
        
        // Placeholder data
        setExpressionData(prev => [...prev, {
          timestamp,
          // TODO: Add actual expression data from face-api.js
        }]);
      }
    }, 200); // Capture every 200ms

    return () => clearInterval(interval);
  }, [cameraReady]);

  const handleVideoEnd = () => {
    console.log('VCR complete. Captured', expressionData.length, 'data points');
    onComplete(expressionData);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* VCR Video (fullscreen) */}
      <video
        ref={vcrVideoRef}
        src={videoSrc}
        onEnded={handleVideoEnd}
        autoPlay
        className="w-full h-full object-cover"
      />

      {/* User camera (hidden, for facial capture) */}
      <video
        ref={userVideoRef}
        autoPlay
        muted
        className="hidden"
      />

      {/* Camera status indicator */}
      {!cameraReady && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded">
          Waiting for camera access...
        </div>
      )}
    </div>
  );
}

