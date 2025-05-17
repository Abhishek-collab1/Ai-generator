
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { detectAIImage } from '@/lib/ai-detection';

export function ImageDetector() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    setResult(null);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const resetImage = () => {
    setImage(null);
    setPreview('');
    setResult(null);
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      // In a real app, this would call an actual AI detection model
      const detectionResult = await detectAIImage(image);
      setResult(detectionResult);
      
      toast({
        title: "Analysis Complete",
        description: "Your image has been successfully analyzed.",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="dropzone"
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
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drag & drop an image here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse files</p>
                </div>
                <p className="text-xs text-gray-500 max-w-md">
                  Supported formats: JPEG, PNG, GIF, WebP
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-black/20 flex items-center justify-center">
                {preview && (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full"
                onClick={resetImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-400">Analyzing image...</p>
                <Progress value={45} className="h-2" />
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
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    result.isAI ? "bg-red-500/20" : "bg-green-500/20"
                  )}>
                    {result.isAI ? (
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {result.isAI ? "AI-Generated Content Detected" : "Likely Human-Created Content"}
                    </h3>
                    <p className="text-gray-400 mb-3">{result.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Confidence</div>
                        <div className="text-lg font-medium">{result.confidence}%</div>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="text-sm text-gray-400">Analysis Time</div>
                        <div className="text-lg font-medium">{result.analysisTime}s</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <Button 
                className="w-full py-6 text-lg"
                onClick={analyzeImage}
              >
                Analyze Image
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
