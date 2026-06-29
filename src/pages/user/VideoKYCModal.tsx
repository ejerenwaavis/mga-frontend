import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { X, Check, RefreshCw, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as faceapi from "@vladmandic/face-api";

interface VideoKYCModalProps {
  onClose: () => void;
  onConfirm: (file: File) => void;
  isUploading?: boolean;
}

const VideoKYCModal: React.FC<VideoKYCModalProps> = ({ onClose, onConfirm, isUploading }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturing, setCapturing] = useState(false);
  const [step, setStep] = useState<"instruction" | "capturing" | "preview">("instruction");
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const capturedPhotosRef = useRef<string[]>([]);
  const detectionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stageRef = useRef<number>(0);
  const lastCaptureAtRef = useRef<number>(0);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [progressPct, setProgressPct] = useState(0);

  const [guideText, setGuideText] = useState("Loading face tracking engine...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const captureSequence = [
    {
      label: "Look straight at the camera",
      isMatch: (ratio: number) => ratio > 0.45 && ratio < 0.55,
    },
    {
      label: "Turn your head slowly to the RIGHT",
      isMatch: (ratio: number) => ratio < 0.42,
    },
    {
      label: "Now turn your head slowly to the LEFT",
      isMatch: (ratio: number) => ratio > 0.58,
    },
    {
      label: "Back to center for final photo",
      isMatch: (ratio: number) => ratio > 0.45 && ratio < 0.55,
    },
  ];

  const buildCollageFile = useCallback(async (photos: string[]) => {
    const images = await Promise.all(
      photos.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          })
      )
    );

    if (!images.length) {
      throw new Error("No photos captured");
    }

    const cols = 2;
    const rows = Math.ceil(images.length / cols);
    const cellW = images[0].naturalWidth;
    const cellH = images[0].naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = cellW * cols;
    canvas.height = cellH * rows;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to create canvas context");
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    images.forEach((img, idx) => {
      const x = (idx % cols) * cellW;
      const y = Math.floor(idx / cols) * cellH;
      ctx.drawImage(img, x, y, cellW, cellH);
    });

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });

    if (!blob) {
      throw new Error("Failed to generate KYC photo collage");
    }

    return new File([blob], "video_kyc_photos.jpg", { type: "image/jpeg" });
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        setGuideText("Look straight at the camera");
      } catch (err) {
        console.error("Failed to load face-api models", err);
        setGuideText("Error loading face tracking. Please refresh.");
      }
    };
    loadModels();
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    if (!modelsLoaded) return;
    setStep("capturing");
    setCapturing(true);
    setCapturedPhotos([]);
    capturedPhotosRef.current = [];
    stageRef.current = 0;
    lastCaptureAtRef.current = 0;
    setProgressPct(0);
    setGuideText(captureSequence[0].label);

    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      setCapturing(false);
      if (capturedPhotosRef.current.length >= 3) {
        setGuideText("Captured enough photos. Review before upload.");
        setStep("preview");
      } else {
        setGuideText("Could not capture enough photos. Please retake.");
        setStep("instruction");
      }
    }, 20000);
  }, [modelsLoaded, captureSequence]);

  const handleStopCaptureClick = useCallback(() => {
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    setCapturing(false);
  }, [setCapturing]);

  useEffect(() => {
    let active = true;
    const trackFace = async () => {
      if (!capturing || !active || step !== "capturing") return;
      try {
        if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          
          if (detection && active) {
            const nose = detection.landmarks.positions[30];
            const leftEdge = detection.landmarks.positions[0];
            const rightEdge = detection.landmarks.positions[16];
            const ratio = (nose.x - leftEdge.x) / (rightEdge.x - leftEdge.x);
            const currentStage = stageRef.current;

            setProgressPct((currentStage / captureSequence.length) * 100);

            if (currentStage < captureSequence.length) {
              const stage = captureSequence[currentStage];
              setGuideText(stage.label);

              const now = Date.now();
              const canCapture = now - lastCaptureAtRef.current > 900;

              if (stage.isMatch(ratio) && canCapture) {
                const photo = webcamRef.current?.getScreenshot();
                if (photo) {
                  capturedPhotosRef.current.push(photo);
                  setCapturedPhotos([...capturedPhotosRef.current]);
                  lastCaptureAtRef.current = now;
                  stageRef.current += 1;

                  const nextStage = stageRef.current;
                  setProgressPct((nextStage / captureSequence.length) * 100);

                  if (nextStage >= captureSequence.length) {
                    setGuideText("Perfect! Processing photos...");
                    handleStopCaptureClick();
                    setStep("preview");
                    return;
                  }

                  setGuideText(captureSequence[nextStage].label);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Face tracking error:", err);
      }
      if (active && stageRef.current < captureSequence.length) {
         detectionTimerRef.current = setTimeout(trackFace, 100);
      }
    };

    if (capturing) {
       trackFace();
    }
    return () => {
      active = false;
      if (detectionTimerRef.current) clearTimeout(detectionTimerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [capturing, step, handleStopCaptureClick, captureSequence]);

  const handleRetake = () => {
    capturedPhotosRef.current = [];
    setCapturedPhotos([]);
    stageRef.current = 0;
    setProgressPct(0);
    setGuideText("Look straight at the camera");
    setStep("instruction");
  };

  const handleUpload = useCallback(async () => {
    if (!capturedPhotosRef.current.length) return;
    try {
      const file = await buildCollageFile(capturedPhotosRef.current);
      onConfirm(file);
    } catch (err) {
      console.error("Failed to build KYC photos file:", err);
      setGuideText("Failed to process photos. Please retake.");
      setStep("instruction");
    }
  }, [buildCollageFile, onConfirm]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C69C45]/10 rounded-full">
              <Camera className="w-5 h-5 text-[#C69C45]" />
            </div>
            <h2 className="text-xl font-bold text-[#143D2A]">Selfie Photo KYC</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
            disabled={isUploading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center flex-1 overflow-y-auto">
          {step === "instruction" && (
            <div className="space-y-6 text-center">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
                 <img src="https://cdn-icons-png.flaticon.com/512/8110/8110996.png" className="w-20 h-20 opacity-60" alt="Face scan icon" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Record a short selfie video</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-[280px] mx-auto">
                  We will auto-capture 4 photos as you move: center, right, left, and back to center.
                </p>
              </div>
              <Button 
                onClick={handleStartCaptureClick} 
                disabled={!modelsLoaded}
                className={`w-full bg-[#143D2A] hover:bg-[#143D2A]/90 text-white rounded-xl py-6 text-lg ${!modelsLoaded ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {!modelsLoaded ? "Loading Tracking Engine..." : "I'm Ready, Start Auto Capture"}
              </Button>
            </div>
          )}

          {step === "capturing" && (
            <div className="w-full flex flex-col items-center space-y-4">
               <div className="relative w-full aspect-[3/4] max-w-[320px] bg-black rounded-3xl overflow-hidden border-4 border-[#C69C45] shadow-[0_0_20px_rgba(198,156,69,0.3)]">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    videoConstraints={{ facingMode: "user" }}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                  />
                  {/* Face outline overlay */}
                  <div className="absolute inset-0 border-[6px] border-dashed border-white/40 m-6 rounded-[100px] pointer-events-none" />
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
                    <div className="w-2.5 h-2.5 bg-[#C69C45] rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium tracking-widest">AUTO</span>
                  </div>
               </div>
               <div className="flex flex-col items-center w-full mt-2 space-y-3">
                 <p className="text-center font-bold text-lg text-[#143D2A] transition-all duration-300 transform scale-105 h-6">
                    {guideText}
                 </p>
                 <div className="w-full max-w-[200px] bg-gray-200 h-2 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 left-0 bottom-0 bg-[#C69C45] transition-all duration-300 ease-out"
                      style={{ width: `${progressPct}%` }}
                    />
                 </div>
                 <p className="text-xs text-gray-500">Captured {capturedPhotos.length}/4 photos</p>
               </div>
            </div>
          )}

          {step === "preview" && capturedPhotos.length > 0 && (
             <div className="w-full flex flex-col items-center space-y-6">
               <div className="grid grid-cols-2 gap-2 w-full max-w-[320px]">
                 {capturedPhotos.map((photo, index) => (
                   <div key={`photo-${index}`} className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-200 bg-black">
                     <img src={photo} alt={`KYC capture ${index + 1}`} className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
               
               <div className="flex gap-3 w-full">
                 <Button
                   variant="outline"
                   onClick={handleRetake}
                   disabled={isUploading}
                   className="flex-1 rounded-xl py-6 border-[#C69C45] text-[#C69C45] hover:bg-[#C69C45] hover:text-white"
                 >
                   <RefreshCw className="w-4 h-4 mr-2" /> Retake
                 </Button>
                 <Button
                   onClick={handleUpload}
                   disabled={isUploading}
                   className="flex-1 bg-[#143D2A] hover:bg-[#143D2A]/90 text-white rounded-xl py-6"
                 >
                   {isUploading ? "Uploading..." : <><Check className="w-4 h-4 mr-2" /> Use Photos</>}
                 </Button>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoKYCModal;
