import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedCardProps = {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
};

export default function AnimatedCard({ children, delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' } : {}}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
