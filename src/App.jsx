import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';
import { ImageDetector } from '@/components/ImageDetector';
import { TextDetector } from '@/components/TextDetector';
import { VideoDetector } from '@/components/VideoDetector';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrainCircuit, FileText as FileTextIcon, FileImage as ImageIcon, Video as VideoIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState("image");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col selection:bg-primary/30 selection:text-white">
      <Header />
      
      <motion.main 
        className="flex-grow container mx-auto px-4 py-10 md:py-16"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
              className="inline-block p-3 bg-primary/10 rounded-full mb-6 floating-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 150}}
            >
              <BrainCircuit size={48} className="text-primary" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 text-gradient bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            >
              AI Content Detector
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            >
              Uncover the origin of digital content. Our sophisticated tools analyze images, text, and videos, distinguishing between human creativity and AI generation.
            </motion.p>
          </div>

          <motion.div 
            className="glass-card p-6 md:p-10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            <Tabs defaultValue="image" value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 p-1.5 rounded-lg">
                <TabsTrigger value="image" className="text-sm sm:text-base md:text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all duration-300 ease-in-out flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Image
                </TabsTrigger>
                <TabsTrigger value="text" className="text-sm sm:text-base md:text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all duration-300 ease-in-out flex items-center justify-center">
                  <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Text
                </TabsTrigger>
                <TabsTrigger value="video" className="text-sm sm:text-base md:text-lg py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all duration-300 ease-in-out flex items-center justify-center">
                  <VideoIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Video
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image" className="mt-0">
                <ImageDetector />
              </TabsContent>
              
              <TabsContent value="text" className="mt-0">
                <TextDetector />
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <VideoDetector />
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div 
            className="mt-16 glass-card rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-6 text-center text-gradient">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { title: "Upload or Input", description: "Provide an image, text, or video file for analysis.", icon: <UploadIcon className="w-8 h-8 mx-auto mb-3 text-primary floating-icon" /> },
                { title: "Advanced Analysis", description: "Our AI algorithms meticulously examine the content for signs of AI generation.", icon: <CpuIcon className="w-8 h-8 mx-auto mb-3 text-primary floating-icon" style={{animationDelay: '0.2s'}}/> },
                { title: "Clear Results", description: "Receive a straightforward verdict with a confidence score and detailed insights.", icon: <BarChartIcon className="w-8 h-8 mx-auto mb-3 text-primary floating-icon" style={{animationDelay: '0.4s'}}/> }
              ].map((step, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  {step.icon}
                  <div className="text-xl font-medium mb-2 text-gray-100">{step.title}</div>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
      <Toaster />
    </div>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function CpuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

export default App;