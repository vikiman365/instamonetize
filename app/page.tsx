'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDollarSign, FiClock } from 'react-icons/fi';
import { theme } from '@/styles/theme';
import Button from '@/components/Button/Button';
import StatsCard from '@/components/StatsCard/StatsCard';
import CreatorCard from '@/components/CreatorCard/CreatorCard';
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard';
import AnimatedSection from '@/components/AnimatedASecton/AnimatedSection';
import { fadeInUp, staggerContainer } from '@/styles/animations';

const HeroSection = styled.section`
  min-height: 100vh;
  background: ${theme.colors.gradient.secondary};
  color: white;
  padding: 120px ${theme.spacing.md} ${theme.spacing.xxl};
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.md};
  line-height: 1.1;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  max-width: 600px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xxl} 0;
`;

const Section = styled.section<{ $bg?: string }>`
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  background: ${({ $bg }) => $bg || 'transparent'};
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const CreatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0;
`;

const PhotoGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.xl} 0;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const GalleryImage = styled.div<{ $src: string }>`
  height: 300px;
  border-radius: 20px;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
              url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
  }
`;

export default function HomePage() {
  const creators = [
    { id: '1', name: 'TravelWithMe', handle: '@travelwithme', category: 'Travel', followers: '2.4M', earnings: '$42K/mo', avatar: '/images/creator-1.jpg' },
    { id: '2', name: 'FoodieAdventures', handle: '@foodieadventures', category: 'Food', followers: '1.8M', earnings: '$38K/mo', avatar: '/images/creator-2.jpg' },
    { id: '3', name: 'FashionForward', handle: '@fashionforward', category: 'Fashion', followers: '3.1M', earnings: '$65K/mo', avatar: '/images/creator-3.jpg' },
    { id: '4', name: 'FitnessGuru', handle: '@fitnessguru', category: 'Fitness', followers: '1.5M', earnings: '$28K/mo', avatar: '/images/creator-4.jpg' },
  ];

  const testimonials = [
    { id: '1', name: 'Sarah Chen', handle: '@sarahstravels', text: 'Went from posting as a hobby to earning $15K/month in just 6 months!', image: '/images/success-1.jpg', beforeEarnings: '$0', afterEarnings: '$15K' },
    { id: '2', name: 'Marcus Johnson', handle: '@marcusfitness', text: 'The application process was seamless and the support team is amazing.', image: '/images/success-2.jpg', beforeEarnings: '$500', afterEarnings: '$8K' },
    { id: '3', name: 'Lena Rodriguez', handle: '@lenasfoodworld', text: 'Best decision for my food content business! Professional and transparent.', image: '/images/success-3.jpg', beforeEarnings: '$1K', afterEarnings: '$12K' },
  ];

  return (
    <>
      <HeroSection>
        <HeroContent>
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <HeroTitle>
              Turn Your Instagram Passion<br />
              Into <span style={{ color: '#FCAF45' }}>Profit</span>
            </HeroTitle>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <HeroSubtitle>
              Join thousands of Instagram creators already earning through our exclusive 
              monetization program. Apply today to unlock your earning potential.
            </HeroSubtitle>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.6}>
            <HeroButtons>
              <Button  href="/apply" variant="gradient" size="lg">
                Apply Now
              </Button>
              <Button href="/dashboard" variant="outline" size="lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                Creator Dashboard
              </Button>
            </HeroButtons>
          </AnimatedSection>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <Section>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <SectionTitle>Why Choose Our Monetization Program?</SectionTitle>
          </AnimatedSection>
          
          <StatsGrid variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StatsCard 
              number="$45M+" 
              label="Paid to Creators" 
              description="Total earnings distributed"
              icon={<FiDollarSign />}
              delay={0.1}
            />
            <StatsCard 
              number="12,500+" 
              label="Active Creators" 
              description="Successfully monetizing"
              icon={<FiUsers />}
              delay={0.2}
            />
            <StatsCard 
              number="97%" 
              label="Satisfaction Rate" 
              description="Creator approval rating"
              icon={<FiTrendingUp />}
              delay={0.3}
            />
            <StatsCard 
              number="48h" 
              label="Average Approval" 
              description="Quick application review"
              icon={<FiClock />}
              delay={0.4}
            />
          </StatsGrid>
        </div>
      </Section>

      {/* Photo Gallery */}
      <Section $bg={theme.colors.background}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <SectionTitle>Success Stories Gallery</SectionTitle>
            <p style={{ textAlign: 'center', marginBottom: theme.spacing.xl, color: theme.colors.textLight }}>
              See the success our creators are achieving
            </p>
          </AnimatedSection>
          
          <PhotoGallery>
            <AnimatedSection animation="fadeInLeft" delay={0.1}>
              <GalleryImage $src="/images/success-1.jpg">
                Travel Creator
              </GalleryImage>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.2}>
              <GalleryImage $src="/images/success-2.jpg">
                Fitness Success
              </GalleryImage>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={0.3}>
              <GalleryImage $src="/images/success-3.jpg">
                Food Network
              </GalleryImage>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" delay={0.4}>
              <GalleryImage $src="/images/success-4.jpg">
                Fashion Brand
              </GalleryImage>
            </AnimatedSection>
          </PhotoGallery>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <SectionTitle>What Our Creators Say</SectionTitle>
          </AnimatedSection>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.id} animation="fadeInUp" delay={index * 0.1}>
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </TestimonialsGrid>
        </div>
      </Section>

      {/* Top Creators */}
      <Section $bg={theme.colors.background}>
        <div className="container">
          <AnimatedSection animation="fadeInUp">
            <SectionTitle>Top Earning Creators This Month</SectionTitle>
            <p style={{ textAlign: 'center', marginBottom: theme.spacing.xl, color: theme.colors.textLight }}>
              These Instagram creators are leading the way in monetization success
            </p>
          </AnimatedSection>
          
          <CreatorsGrid>
            {creators.map((creator, index) => (
              <AnimatedSection key={creator.id} animation="fadeInUp" delay={index * 0.1}>
                <CreatorCard {...creator} rank={index + 1} />
              </AnimatedSection>
            ))}
          </CreatorsGrid>
        </div>
      </Section>

      {/* CTA Section */}
      <Section $bg={theme.colors.gradient.secondary}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection animation="scaleUp">
            <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: theme.spacing.md }}>
              Ready to Monetize Your Instagram?
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: theme.spacing.xl, maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
              Join our exclusive program and start earning from your content. 
              Applications are reviewed within 48 hours.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <Button 
              
              href="/apply" 
              variant="gradient" 
              size="lg"
              style={{ background: 'white', color: theme.colors.primary, marginBottom: theme.spacing.sm }}
            >
              Start Your Application Now
            </Button>
            <p style={{ color: 'white', opacity: 0.8, fontSize: '0.875rem' }}>
              Limited spots available. Apply today!
            </p>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}