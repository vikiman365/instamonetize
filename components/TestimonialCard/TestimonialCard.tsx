import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInstagram, FiTrendingUp } from 'react-icons/fi';
import { theme } from '../../styles/theme';
import { fadeInUp } from '../../styles/animations';

interface TestimonialCardProps {
  id: string;
  name: string;
  handle: string;
  text: string;
  image: string;
  beforeEarnings: string;
  afterEarnings: string;
}

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const Avatar = styled.div<{ $src: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), 
              url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  border: 3px solid ${theme.colors.gradient.accent};
`;

const CreatorInfo = styled.div`
  flex: 1;
`;

const CreatorName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

const CreatorHandle = styled.p`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.875rem;
`;

const TestimonialText = styled.p`
  color: ${theme.colors.text};
  font-style: italic;
  line-height: 1.8;
  margin-bottom: ${theme.spacing.lg};
  flex: 1;
  
  &:before, &:after {
    content: '"';
    color: ${theme.colors.primary};
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const EarningsComparison = styled.div`
  background: linear-gradient(135deg, ${theme.colors.background}, #f8f9fa);
  border-radius: 15px;
  padding: ${theme.spacing.md};
  margin-top: auto;
`;

const EarningsTitle = styled.h4`
  font-size: 0.875rem;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.sm};
  text-align: center;
`;

const EarningsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
`;

const EarningsItem = styled.div<{ $type: 'before' | 'after' }>`
  text-align: center;
  padding: ${theme.spacing.sm};
  background: ${({ $type }) => 
    $type === 'before' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(74, 222, 128, 0.1)'};
  border-radius: 10px;
`;

const EarningsLabel = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.xs};
`;

const EarningsValue = styled.div<{ $type: 'before' | 'after' }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $type }) => 
    $type === 'before' ? theme.colors.error : theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;

const EarningsChange = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${theme.colors.gradient.accent};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  handle,
  text,
  image,
  beforeEarnings,
  afterEarnings
}) => {
  const calculateGrowth = () => {
    const before = parseFloat(beforeEarnings.replace(/[^0-9.-]+/g, ''));
    const after = parseFloat(afterEarnings.replace(/[^0-9.-]+/g, ''));
    
    if (before === 0) return '∞';
    const growth = ((after - before) / before) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(0)}%`;
  };

  return (
    <Card
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      whileHover={{ y: -5 }}
    >
      <TestimonialHeader>
        <Avatar $src={image} />
        <CreatorInfo>
          <CreatorName>{name}</CreatorName>
          <CreatorHandle>
            <FiInstagram />
            {handle}
          </CreatorHandle>
        </CreatorInfo>
      </TestimonialHeader>
      
      <TestimonialText>{text}</TestimonialText>
      
      <EarningsComparison>
        <EarningsTitle>Earnings Growth</EarningsTitle>
        <div style={{ position: 'relative' }}>
          <EarningsGrid>
            <EarningsItem $type="before">
              <EarningsLabel>Before</EarningsLabel>
              <EarningsValue $type="before">
                {beforeEarnings}
              </EarningsValue>
            </EarningsItem>
            
            <EarningsItem $type="after">
              <EarningsLabel>After</EarningsLabel>
              <EarningsValue $type="after">
                <FiTrendingUp />
                {afterEarnings}
              </EarningsValue>
            </EarningsItem>
          </EarningsGrid>
          
          <EarningsChange>
            <FiTrendingUp />
            {calculateGrowth()}
          </EarningsChange>
        </div>
      </EarningsComparison>
    </Card>
  );
};

export default TestimonialCard;