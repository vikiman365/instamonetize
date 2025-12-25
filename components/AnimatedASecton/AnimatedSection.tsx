import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleUp } from '../../styles/animations';
import styled from 'styled-components';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleUp';
  delay?: number;
  threshold?: number;
  className?: string;
}

const StyledSection = styled(motion.div)<{ $delay?: number }>`
  opacity: 0;
`;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  className
}) => {
  const animationVariants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleUp,
  }[animation];

  return (
    <StyledSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={animationVariants}
      custom={delay}
    >
      {children}
    </StyledSection>
  );
};

export default AnimatedSection;