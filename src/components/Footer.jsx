
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Footer() {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="w-full py-8 px-6 border-t border-border/70 mt-auto bg-background/50"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1, delayChildren: 1.2 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div className="flex items-center gap-2" variants={itemVariants}>
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm text-gray-400">AI Detector &copy; {new Date().getFullYear()}</span>
          </motion.div>
          
          <motion.div className="flex gap-4 md:gap-6" variants={itemVariants}>
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link) => (
              <motion.span 
                key={link}
                className="text-sm text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="text-center mt-6 pt-6 border-t border-border/50"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-600">
            Disclaimer: AI detection is an evolving field. Our tool provides likelihood scores based on current models and should be used as one of many factors in content assessment.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
