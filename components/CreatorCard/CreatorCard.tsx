import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiTrendingUp, FiInstagram } from 'react-icons/fi';
import { theme } from '../../styles/theme';
import { scaleUp } from '../../styles/animations';

interface CreatorCardProps {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  earnings: string;
  avatar: string;
  rank: number;
}

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  position: relative;
  height: 120px;
  background: ${theme.colors.gradient.secondary};
`;

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ rank }) => 
    rank === 1 ? '#FFD700' : 
    rank === 2 ? '#C0C0C0' : 
    rank === 3 ? '#CD7F32' : theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const AvatarContainer = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
`;

const Avatar = styled.div<{ $src: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid white;
  background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), 
              url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const CardBody = styled.div`
  padding: 60px ${theme.spacing.lg} ${theme.spacing.lg};
  text-align: center;
`;

const CreatorName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text};
`;

const CreatorHandle = styled.p`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  
  svg {
    font-size: 1.2rem;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.gradient.accent};
  color: white;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textLight};
`;

const CreatorCard: React.FC<CreatorCardProps> = ({
  name,
  handle,
  category,
  followers,
  earnings,
  avatar,
  rank
}) => {
  return (
    <Card
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={scaleUp}
      transition={{ delay: rank * 0.1 }}
    >
      <CardHeader>
        <RankBadge rank={rank}>
          #{rank}
        </RankBadge>
        <AvatarContainer>
          <Avatar $src={avatar} />
        </AvatarContainer>
      </CardHeader>
      
      <CardBody>
        <CreatorName>{name}</CreatorName>
        <CreatorHandle>
          <FiInstagram />
          {handle}
        </CreatorHandle>
        
        <CategoryBadge>{category}</CategoryBadge>
        
        <StatsGrid>
          <StatItem>
            <StatValue>
              <FiUsers />
              {followers}
            </StatValue>
            <StatLabel>Followers</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatValue>
              <FiTrendingUp />
              {earnings}
            </StatValue>
            <StatLabel>Monthly Earnings</StatLabel>
          </StatItem>
        </StatsGrid>
      </CardBody>
    </Card>
  );
};

export default CreatorCard;