'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText, FiTrendingUp, FiAward } from 'react-icons/fi';
import { theme } from '@/styles/theme';
import ApplicationForm from '@/components/ApplicationForm/ApplicationForm';
import { fadeInUp } from '@/styles/animations';
import AnimatedSection from '@/components/AnimatedASecton/AnimatedSection';

const ApplyContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, #f8f9fa 100%);
  padding: 100px 0 ${theme.spacing.xxl};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  background: ${theme.colors.gradient.secondary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.textLight};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled(motion.div)<{ $active?: boolean }>`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 2px solid ${({ $active }) => 
    $active ? theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const StepIcon = styled.div<{ $active?: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${({ $active }) => 
    $active ? theme.colors.gradient.secondary : theme.colors.background};
  color: ${({ $active }) => $active ? 'white' : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  font-size: 1.8rem;
`;

const StepNumber = styled.div<{ $active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $active }) => 
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ $active }) => $active ? 'white' : theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const StepTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  font-size: 1.2rem;
`;

const StepDescription = styled.p`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const FormSection = styled.div`
  background: white;
  border-radius: 25px;
  padding: ${theme.spacing.xl};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const FormTitle = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  font-size: 2rem;
`;

const FormSubtitle = styled.p`
  color: ${theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BenefitsSection = styled.div`
  margin-top: ${theme.spacing.xxl};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background};
  border-radius: 20px;
`;

const BenefitsTitle = styled.h3`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  font-size: 1.8rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.gradient.accent};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.md};
  font-size: 1.5rem;
`;

const BenefitTitle = styled.h4`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const BenefitDescription = styled.p`
  color: ${theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Disclaimer = styled.div`
  background: ${theme.colors.warning}15;
  border: 2px solid ${theme.colors.warning}40;
  border-radius: 15px;
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const DisclaimerTitle = styled.h4`
  color: ${theme.colors.warning};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const DisclaimerText = styled.p`
  color: ${theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.6;
`;

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      number: 1,
      icon: <FiFileText />,
      title: 'Application Form',
      description: 'Fill out your basic information and Instagram account details',
      active: currentStep >= 1
    },
    {
      number: 2,
      icon: <FiTrendingUp />,
      title: 'Content Review',
      description: 'Our team reviews your content quality and engagement metrics',
      active: currentStep >= 2
    },
    {
      number: 3,
      icon: <FiCheckCircle />,
      title: 'Approval Process',
      description: 'Get notified about your application status within 48 hours',
      active: currentStep >= 3
    },
    {
      number: 4,
      icon: <FiAward />,
      title: 'Start Earning',
      description: 'Access monetization features and start generating revenue',
      active: currentStep >= 4
    }
  ];

  const benefits = [
    {
      icon: <FiTrendingUp />,
      title: 'Higher Earnings',
      description: 'Top creators earn $5K-$50K monthly through our exclusive partnerships'
    },
    {
      icon: <FiAward />,
      title: 'Brand Partnerships',
      description: 'Get connected with premium brands looking for authentic creators'
    },
    {
      icon: <FiCheckCircle />,
      title: 'Quick Approval',
      description: 'Applications reviewed within 48 hours with transparent feedback'
    }
  ];

  return (
    <ApplyContainer>
      <ContentWrapper>
        {/* Header Section */}
        <AnimatedSection animation="fadeInUp">
          <HeaderSection>
            <Title>Apply for Instagram Monetization</Title>
            <Subtitle>
              Join thousands of Instagram creators who are already earning through our exclusive 
              monetization program. Complete your application in just 10 minutes.
            </Subtitle>
          </HeaderSection>
        </AnimatedSection>

        {/* Process Steps */}
        <AnimatedSection animation="fadeInUp" delay={0.1}>
          <ProcessSteps>
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} animation="fadeInUp" delay={0.1 * index}>
                <StepCard 
                  $active={step.active}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StepIcon $active={step.active}>
                    {step.icon}
                  </StepIcon>
                  <StepNumber $active={step.active}>
                    {step.number}
                  </StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepCard>
              </AnimatedSection>
            ))}
          </ProcessSteps>
        </AnimatedSection>

        {/* Main Application Form */}
        <AnimatedSection animation="fadeInUp" delay={0.2}>
          <FormSection>
            <FormHeader>
              <FormTitle>Monetization Application Form</FormTitle>
              <FormSubtitle>
                Please fill out all required fields accurately. This information helps us 
                make informed decisions about your monetization eligibility and opportunities.
              </FormSubtitle>
            </FormHeader>

            <ApplicationForm />
          </FormSection>
        </AnimatedSection>

        {/* Benefits Section */}
        <AnimatedSection animation="fadeInUp" delay={0.3}>
          <BenefitsSection>
            <BenefitsTitle>Why Creators Choose Us</BenefitsTitle>
            <BenefitsGrid>
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={0.1 * index}>
                  <BenefitCard>
                    <BenefitIcon>
                      {benefit.icon}
                    </BenefitIcon>
                    <BenefitTitle>{benefit.title}</BenefitTitle>
                    <BenefitDescription>{benefit.description}</BenefitDescription>
                  </BenefitCard>
                </AnimatedSection>
              ))}
            </BenefitsGrid>
          </BenefitsSection>
        </AnimatedSection>

        {/* Disclaimer */}
        <AnimatedSection animation="fadeInUp" delay={0.4}>
          <Disclaimer>
            <DisclaimerTitle>
              <FiCheckCircle />
              Important Information
            </DisclaimerTitle>
            <DisclaimerText>
              <strong>Data Usage Disclaimer:</strong> The information collected in this application 
              is used exclusively for monetization eligibility assessment and partnership opportunities. 
              We collect specific user data to make informed decisions about content monetization 
              potential. All data is stored securely in compliance with data protection regulations. 
              By submitting this application, you consent to this data collection and usage for 
              monetization assessment purposes.
            </DisclaimerText>
            <DisclaimerText style={{ marginTop: theme.spacing.sm, fontSize: '0.85rem' }}>
              Average approval time: 48 hours | Acceptance rate: 68% | Minimum followers: 10K
            </DisclaimerText>
          </Disclaimer>
        </AnimatedSection>
      </ContentWrapper>
    </ApplyContainer>
  );
}