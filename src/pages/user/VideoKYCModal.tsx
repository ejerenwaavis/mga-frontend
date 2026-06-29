import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { X, Check, RefreshCw, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as faceapi from "@vladmandic/face-api";

interface VideoKYCModalProps {
  onClose: () => void;
  onConfirm: (file: File) => void;
  isUploading?: boolean;
}

const VideoKYCModal: React.FC<VideoKYCModalProps> = ({ onClose, onConfirm, isUploading }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [step, setStep] = useState<"instruction" | "recording" | "preview">("instruction");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const [guideText, setGuideText] = useState("Loading face tracking engine...");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const guideStateRef = useRef<number>(0);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setStep("recording");
    setCapturing(true);
    setRecordedChunks([]);
    guideStateRef.current = 0;
    setGuideText("Turn your head slowly to the LEFT");
    
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
      mediaRecorderRef.current.start();
      
      // Safety timeout: stop after 15s if they don't complete it
      recordingTimeoutRef.current = setTimeout(() => {
        if (guideStateRef.current !== 3) {
           setGuideText("Time limit reached. Processing what we have...");
           handleStopCaptureClick();
        }
      }, 15000);
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable, modelsLoaded]);

  const handleStopCaptureClick = useCallback(() => {
    if (recordingTimeoutRef.current) clearTimeout(recordingTimeoutRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, setCapturing]);

  useEffect(() => {
    let active = true;
    const trackFace = async () => {
      if (!capturing || !active || step !== "recording") return;
      if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
        const video = webcamRef.current.video;
        const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
        
        if (detection && active) {
            const nose = detection.landmarks.positions[30];
            const leftEdge = detection.landmarks.positions[0];
            const rightEdge = detection.landmarks.positions[16];
            const ratio = (nose.x - leftEdge.x) / (rightEdge.x - leftEdge.x);
            
            if (guideStateRef.current === 0) {
                // Wait for them to turn LEFT (ratio < 0.35)
                if (ratio < 0.35) {
                    setGuideText("Great! Now turn your head slowly to the RIGHT");
                    guideStateRef.current = 1;
                } else if (ratio > 0.65) {
                    setGuideText("Great! Now turn your head slowly to the LEFT");
                    guideStateRef.current = 2; // turned right first
                }
            } else if (guideStateRef.current === 1) {
                // Wait for them to turn RIGHT (ratio > 0.65)
                if (ratio > 0.65) {
                    setGuideText("Perfect! Processing video...");
                    guideStateRef.current = 3;
                    handleStopCaptureClick();
                }
            } else if (guideStateRef.current === 2) {
                // Wait for them to turn LEFT
                if (ratio < 0.35) {
                    setGuideText("Perfect! Processing video...");
                    guideStateRef.current = 3;
                    handleStopCaptureClick();
                }
            }
        } else if (!detection && active) {
            // Face lost
        }
      }
      if (active && guideStateRef.current !== 3) {
         requestAnimationFrame(trackFace);
      }
    };

    if (capturing) {
       trackFace();
    }
    return () => { active = false; };
  }, [capturing, step]);

  // Once recording stops and chunks are populated, show preview
  React.useEffect(() => {
    if (!capturing && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setStep("preview");
    }
  }, [capturing, recordedChunks]);

  const handleRetake = () => {
    setRecordedChunks([]);
    setVideoUrl(null);
    setStep("instruction");
  };

  const handleUpload = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      // create a File from Blob
      const file = new File([blob], "video_kyc.webm", { type: "video/webm" });
      onConfirm(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C69C45]/10 rounded-full">
              <Video className="w-5 h-5 text-[#C69C45]" />
            </div>
            <h2 className="text-xl font-bold text-[#143D2A]">Selfie Video KYC</h2>
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
                  Center your face in the camera, start recording, and slowly turn your head from side to side for 7 seconds.
                </p>
              </div>
              <Button 
                onClick={handleStartCaptureClick} 
                disabled={!modelsLoaded}
                className={`w-full bg-[#143D2A] hover:bg-[#143D2A]/90 text-white rounded-xl py-6 text-lg ${!modelsLoaded ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {!modelsLoaded ? "Loading Tracking Engine..." : "I'm Ready, Start Camera"}
              </Button>
            </div>
          )}

          {step === "recording" && (
            <div className="w-full flex flex-col items-center space-y-4">
               <div className="relative w-full aspect-[3/4] max-w-[320px] bg-black rounded-3xl overflow-hidden border-4 border-[#C69C45] shadow-[0_0_20px_rgba(198,156,69,0.3)]">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    videoConstraints={{ facingMode: "user" }}
                    className="w-full h-full object-cover"
                  />
                  {/* Face outline overlay */}
                  <div className="absolute inset-0 border-[6px] border-dashed border-white/40 m-6 rounded-[100px] pointer-events-none" />
                  
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium tracking-widest">REC</span>
                  </div>
               </div>
               <div className="h-8 flex items-center justify-center">
                 <p className="text-center font-bold text-lg text-[#143D2A] transition-all duration-300 transform scale-105">
                    {guideText}
                 </p>
               </div>
            </div>
          )}

          {step === "preview" && videoUrl && (
             <div className="w-full flex flex-col items-center space-y-6">
               <div className="relative w-full aspect-[3/4] max-w-[320px] bg-black rounded-3xl overflow-hidden border-4 border-gray-200">
                 <video src={videoUrl} autoPlay loop playsInline className="w-full h-full object-cover" />
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
                   {isUploading ? "Uploading..." : <><Check className="w-4 h-4 mr-2" /> Use Video</>}
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
