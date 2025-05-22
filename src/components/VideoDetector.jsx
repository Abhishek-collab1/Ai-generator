import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Video as VideoIconLucide, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { detectAIVideo } from '@/lib/ai-detection';

export function VideoDetector() {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, WebM, MOV, etc.)",
        variant: "destructive",
      });
      return;
    }

    setVideo(file);
    setResult(null);
    setProgressValue(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    multiple: false
  });

  const resetVideo = () => {
    setVideo(null);
    setPreview('');
    setResult(null);
    setProgressValue(0);
  };

  const analyzeVideo = async () => {
    if (!video) return;
    
    setLoading(true);
    setResult(null);
    setProgressValue(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const detectionResult = await detectAIVideo(video);
      clearInterval(interval);
      setProgressValue(100);
      setResult(detectionResult);
      
      toast({
        title: "Video Analysis Complete",
        description: "Your video has been successfully analyzed.",
      });
    } catch (error) {
      clearInterval(interval);
      setProgressValue(0);
      console.error("Error analyzing video:", error);
      toast({
        title: "Video Analysis Failed",
        description: "There was an error analyzing your video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!video ? (
          <motion.div
            key="dropzone-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              {...getRootProps()} 
              className={cn(
                "drop-area rounded-lg p-8 text-center cursor-pointer transition-all",
                isDragActive && "active"
              )}
            >
              <input {...getInputProps()} />
              <motion.div 
                className="flex flex-col items-center justify-center gap-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <VideoIconLucide className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drag & drop a video here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                </div>
                <p className="text-xs text-gray-500 max-w-md">
                  Supported formats: MP4, WebM, MOV, AVI, MKV (Max 100MB for demo)
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-black/50 flex items-center justify-center">
                {preview && (
                  <video 
                    src={preview} 
                    controls
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full z-10"
                onClick={resetVideo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-400">Analyzing video... ({video.name})</p>
                <Progress value={progressValue} className="h-2 transition-all duration-300" />
              </div>
            ) : result ? (
              <motion.div 
                className={cn(
                  "result-card p-6 rounded-lg",
                  result.isAI ? "ai" : "human"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    result.isAI ? "bg-red-500/20" : "bg-green-500/20"
                  )}>
                    {result.isAI ? (
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-1">
                      {result.isAI ? "AI-Generated Video Detected" : "Likely Authentic Video Content"}
                    </h3>
                    <p className="text-gray-400 mb-3 text-sm">{result.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">Confidence</div>
                        <div className="text-lg font-medium">{result.confidence}%</div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">Analysis Time</div>
                        <div className="text-lg font-medium">{result.analysisTime}s</div>
                      </div>
                       <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">File Name</div>
                        <div className="font-medium truncate" title={result.videoInfo.fileName}>{result.videoInfo.fileName}</div>
                      </div>
                       <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">File Size</div>
                        <div className="font-medium">{result.videoInfo.fileSize}</div>
                      </div>
                       <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">Est. Duration</div>
                        <div className="font-medium">{result.videoInfo.duration}</div>
                      </div>
                       <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-gray-400">Est. Resolution</div>
                        <div className="font-medium">{result.videoInfo.resolution}</div>
                      </div>
                    </div>
                     {result.findings && result.findings.length > 0 && (
                      <div className="mt-4 bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Key Findings:</h4>
                        <ul className="space-y-1.5 text-sm">
                          {result.findings.map((finding, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span className="text-gray-300">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <Button 
                className="w-full py-6 text-lg animated-gradient-button"
                onClick={analyzeVideo}
              >
                Analyze Video
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}