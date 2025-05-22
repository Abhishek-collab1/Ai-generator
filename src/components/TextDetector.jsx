import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, FileText as FileTextIconLucide, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { detectAIText } from '@/lib/ai-detection';

export function TextDetector() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (result) {
        setResult(null);
        setProgressValue(0);
    }
  };

  const analyzeText = async () => {
    if (!text.trim() || text.length < 50) {
      toast({
        title: "Text too short",
        description: "Please enter at least 50 characters for accurate analysis.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setResult(null);
    setProgressValue(0);

    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 20; 
      });
    }, 100);

    try {
      const detectionResult = await detectAIText(text);
      clearInterval(interval);
      setProgressValue(100);
      setResult(detectionResult);
      
      toast({
        title: "Text Analysis Complete",
        description: "Your text has been successfully analyzed.",
      });
    } catch (error) {
      clearInterval(interval);
      setProgressValue(0);
      console.error("Error analyzing text:", error);
      toast({
        title: "Text Analysis Failed",
        description: "There was an error analyzing your text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetText = () => {
    setText('');
    setResult(null);
    setProgressValue(0);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste or type text here (minimum 50 characters)..."
          className="w-full h-48 p-4 rounded-lg bg-background/50 border border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
        />
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {text.length} characters {text.length > 0 && text.length < 50 && <span className="text-yellow-500">(minimum 50)</span>}
          </div>
          {text && (
            <Button variant="ghost" size="sm" onClick={resetText} className="text-primary hover:text-primary/80">
              Clear Text
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <p className="text-center text-sm text-gray-400">Analyzing text...</p>
          <Progress value={progressValue} className="h-2 transition-all duration-300" />
        </div>
      ) : result ? (
        <AnimatePresence>
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
                  {result.isAI ? "AI-Generated Text Detected" : "Likely Human-Written Text"}
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
                </div>

                {result.details && result.details.length > 0 && (
                  <div className="mt-4 bg-background/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Analysis Details:</h4>
                    <ul className="space-y-1.5 text-sm">
                      {result.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <Button 
          className="w-full py-6 text-lg animated-gradient-button"
          onClick={analyzeText}
          disabled={!text.trim() || text.length < 50 || loading}
        >
          Analyze Text
        </Button>
      )}

      <div className="mt-8 p-4 rounded-lg bg-secondary/30">
        <h3 className="font-medium mb-2 text-gray-100">Tips for accurate text detection:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Provide at least 100-200 words for more robust results.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Ensure text includes complete sentences and paragraphs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>For best results, analyze unedited text directly from its source.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}