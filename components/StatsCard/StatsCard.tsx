import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { fadeInUp } from '../../styles/animations';

interface StatsCardProps {
  number: string;
  label: string;
  description: string;
  delay?: number;
  icon?: React.ReactNode;
}

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const Number = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: ${theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Label = styled.h3`
  font-size: 1.25rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const Description = styled.p`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.gradient.accent};
  color: white;
  margin-bottom: ${theme.spacing.md};
  font-size: 1.5rem;
`;

const StatsCard: React.FC<StatsCardProps> = ({ 
  number, 
  label, 
  description, 
  delay = 0,
  icon 
}) => {
  return (
    <Card
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      custom={delay}
    >
      {icon && <IconContainer>{icon}</IconContainer>}
      <Number>{number}</Number>
      <Label>{label}</Label>
      <Description>{description}</Description>
    </Card>
  );
};

export default StatsCard;