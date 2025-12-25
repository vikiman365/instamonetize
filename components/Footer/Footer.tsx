'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone } from 'react-icons/fi';
import { theme } from '../../styles/theme';
import { fadeInUp } from '../../styles/animations';
import AnimatedSection from '../AnimatedASecton/AnimatedSection';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: ${theme.spacing.xxl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing.xl};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${theme.spacing.lg};
  color: white;
  position: relative;
  padding-bottom: ${theme.spacing.sm};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${theme.colors.gradient.accent};
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    color: white;
    transform: translateX(5px);
  }
`;

const ContactInfo = styled.div`
  margin-top: ${theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: rgba(255, 255, 255, 0.8);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const NewsletterForm = styled.form`
  margin-top: ${theme.spacing.md};
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: ${theme.spacing.sm};
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Company Info */}
          <AnimatedSection animation="fadeInUp" delay={0.1}>
            <FooterSection>
              <Logo href="/">
                <FiInstagram size={28} />
                InstaMonetize
              </Logo>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: theme.spacing.md }}>
                Empowering Instagram creators to turn their passion into profit through our exclusive monetization platform.
              </p>
              <SocialLinks>
                <SocialIcon 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiInstagram />
                </SocialIcon>
                <SocialIcon 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTwitter />
                </SocialIcon>
                <SocialIcon 
                  href="https://facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiFacebook />
                </SocialIcon>
                <SocialIcon 
                  href="https://youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiYoutube />
                </SocialIcon>
              </SocialLinks>
            </FooterSection>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="fadeInUp" delay={0.2}>
            <FooterSection>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLinks>
                <FooterLink>
                  <StyledLink href="/">Home</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/apply">Apply Now</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/dashboard">Creator Dashboard</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/login">Login</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/success-stories">Success Stories</StyledLink>
                </FooterLink>
              </FooterLinks>
            </FooterSection>
          </AnimatedSection>

          {/* Resources */}
          <AnimatedSection animation="fadeInUp" delay={0.3}>
            <FooterSection>
              <FooterTitle>Resources</FooterTitle>
              <FooterLinks>
                <FooterLink>
                  <StyledLink href="/blog">Blog & Tips</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/faq">FAQ</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/guidelines">Content Guidelines</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/pricing">Pricing & Fees</StyledLink>
                </FooterLink>
                <FooterLink>
                  <StyledLink href="/support">Support Center</StyledLink>
                </FooterLink>
              </FooterLinks>
            </FooterSection>
          </AnimatedSection>

          {/* Contact & Newsletter */}
          <AnimatedSection animation="fadeInUp" delay={0.4}>
            <FooterSection>
              <FooterTitle>Stay Updated</FooterTitle>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: theme.spacing.md }}>
                Subscribe to our newsletter for monetization tips and updates.
              </p>
              
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <NewsletterInput 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                />
                <button 
                  type="submit"
                  style={{
                    background: theme.colors.gradient.secondary,
                    color: 'white',
                    border: 'none',
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Subscribe
                </button>
              </NewsletterForm>

              <ContactInfo>
                <ContactItem>
                  <FiMail />
                  <span>support@instamonetize.com</span>
                </ContactItem>
                <ContactItem>
                  <FiPhone />
                  <span>+1 (555) 123-4567</span>
                </ContactItem>
              </ContactInfo>
            </FooterSection>
          </AnimatedSection>
        </FooterGrid>

        <Copyright>
          <p>© {new Date().getFullYear()} InstaMonetize. All rights reserved.</p>
          <p style={{ marginTop: theme.spacing.sm }}>
            <StyledLink href="/privacy" style={{ fontSize: '0.875rem' }}>Privacy Policy</StyledLink> | 
            <StyledLink href="/terms" style={{ fontSize: '0.875rem', marginLeft: theme.spacing.sm }}>Terms of Service</StyledLink> | 
            <StyledLink href="/cookies" style={{ fontSize: '0.875rem', marginLeft: theme.spacing.sm }}>Cookie Policy</StyledLink>
          </p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;