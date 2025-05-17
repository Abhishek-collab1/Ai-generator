
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <motion.header 
      className="w-full py-4 px-6 backdrop-blur-lg bg-background/70 border-b border-border/70 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Zap className="text-white h-6 w-6" />
          </div>
          <span className="font-bold text-xl text-gray-100 tracking-tight">AI Detector</span>
        </motion.div>
        
        <div className="flex items-center gap-2 md:gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white hover:bg-primary/20 transition-all">
              <Github className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white hover:bg-primary/20 transition-all">
              <Twitter className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="hidden md:flex animated-gradient-button shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
