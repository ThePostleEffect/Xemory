'use client';

import { useRef, useEffect, useState } from 'react';

interface CameraSetupProps {
  onReady: () => void;
}

export default function CameraSetup({ onReady }: CameraSetupProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Camera access is required. Please enable camera permissions and refresh.');
      }
    }

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Position Your Face</h1>
          <p className="text-gray-300 text-lg">
            Make sure your face is clearly visible in the frame below.
            We'll be capturing your natural expressions during the experience.
          </p>
        </div>

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover mirror"
          />
          
          {/* Face guide overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-80 border-4 border-green-500 border-dashed rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={onReady}
            disabled={!stream}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-xl rounded-lg transition-colors"
          >
            I'm Ready
          </button>
          
          <p className="text-sm text-gray-400">
            By clicking "I'm Ready", you confirm that you've read and agreed to the consent form.
          </p>
        </div>
      </div>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}

