'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { fadeInUp } from '../../styles/animations';
import Button from '../Button/Button';

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: ${theme.spacing.lg};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.gradient.accent};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &.required:after {
    content: '*';
    color: ${theme.colors.error};
  }
`;

const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
  }
  
  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: ${theme.colors.primary};
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${theme.spacing.xs};
`;

const SuccessMessage = styled.div`
  background: ${theme.colors.success}20;
  border: 2px solid ${theme.colors.success};
  color: ${theme.colors.text};
  padding: ${theme.spacing.md};
  border-radius: 10px;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const ApplicationForm: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    instagramHandle: '',
    followers: '',
    engagementRate: '',
    niche: '',
    contentType: [] as string[],
    monthlyPosts: '',
    country: '',
    ageRange: '',
    hasBrandDeals: false,
    monetizationGoals: '',
    agreement: false,
  });

  // Error state - using separate interface for error messages
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.instagramHandle.trim()) newErrors.instagramHandle = 'Instagram handle is required';
    if (!formData.followers) newErrors.followers = 'Follower count is required';
    if (!formData.engagementRate) newErrors.engagementRate = 'Engagement rate is required';
    if (!formData.niche) newErrors.niche = 'Please select a niche';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          instagramHandle: '',
          followers: '',
          engagementRate: '',
          niche: '',
          contentType: [],
          monthlyPosts: '',
          country: '',
          ageRange: '',
          hasBrandDeals: false,
          monetizationGoals: '',
          agreement: false,
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, email: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (value: string) => {
    const newContentType = formData.contentType.includes(value)
      ? formData.contentType.filter(item => item !== value)
      : [...formData.contentType, value];
    
    setFormData({ ...formData, contentType: newContentType });
  };

  if (isSubmitted) {
    return (
      <SuccessMessage>
        <h3>🎉 Application Submitted Successfully!</h3>
        <p>Our team will review your application within 48 hours. We'll contact you at {formData.email}.</p>
      </SuccessMessage>
    );
  }

  return (
    <Form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={fadeInUp}>
      {/* Personal Information Section */}
      <FormSection>
        <SectionTitle>Personal Information</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="fullName" className="required">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" className="required">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
        </FormGrid>
      </FormSection>

      {/* Instagram Account Details */}
      <FormSection>
        <SectionTitle>Instagram Account Details</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="instagramHandle" className="required">
              Instagram Handle
            </Label>
            <Input
              id="instagramHandle"
              name="instagramHandle"
              type="text"
              value={formData.instagramHandle}
              onChange={handleChange}
              placeholder="@username"
            />
            {errors.instagramHandle && <ErrorMessage>{errors.instagramHandle}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="followers" className="required">
              Follower Count
            </Label>
            <Input
              id="followers"
              name="followers"
              type="number"
              value={formData.followers}
              onChange={handleChange}
              placeholder="e.g., 50000"
            />
            {errors.followers && <ErrorMessage>{errors.followers}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="engagementRate" className="required">
              Engagement Rate (%)
            </Label>
            <Input
              id="engagementRate"
              name="engagementRate"
              type="number"
              step="0.1"
              value={formData.engagementRate}
              onChange={handleChange}
              placeholder="e.g., 3.5"
            />
            {errors.engagementRate && <ErrorMessage>{errors.engagementRate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="niche" className="required">
              Primary Content Niche
            </Label>
            <Select
              id="niche"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
            >
              <option value="">Select your niche</option>
              <option value="fashion">Fashion & Beauty</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="food">Food & Cooking</option>
              <option value="fitness">Fitness & Wellness</option>
              <option value="tech">Technology</option>
              <option value="gaming">Gaming</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </Select>
            {errors.niche && <ErrorMessage>{errors.niche}</ErrorMessage>}
          </FormGroup>
        </FormGrid>
      </FormSection>

      {/* Content Creation Details */}
      <FormSection>
        <SectionTitle>Content Creation</SectionTitle>
        
        <FormGroup>
          <Label>Content Types You Create (Select all that apply)</Label>
          <CheckboxGroup>
            {['Reels', 'Stories', 'Posts', 'IGTV/Videos', 'Guides', 'Live', 'Carousels', 'Collaborations'].map(type => (
              <CheckboxLabel key={type}>
                <input
                  type="checkbox"
                  checked={formData.contentType.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
                <span>{type}</span>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FormGroup>

        <FormGrid>
          <FormGroup>
            <Label htmlFor="monthlyPosts">Average Monthly Posts</Label>
            <Input
              id="monthlyPosts"
              name="monthlyPosts"
              type="number"
              value={formData.monthlyPosts}
              onChange={handleChange}
              placeholder="e.g., 12"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="hasBrandDeals">Previous Brand Deal Experience</Label>
            <Select
              id="hasBrandDeals"
              name="hasBrandDeals"
              value={formData.hasBrandDeals ? 'yes' : 'no'}
              onChange={(e) => setFormData({ ...formData, hasBrandDeals: e.target.value === 'yes' })}
            >
              <option value="no">No experience</option>
              <option value="yes">Have experience</option>
            </Select>
          </FormGroup>
        </FormGrid>
      </FormSection>

      {/* Monetization Goals */}
      <FormSection>
        <SectionTitle>Monetization Goals</SectionTitle>
        <FormGroup>
          <Label htmlFor="monetizationGoals">
            What are your monetization goals?
          </Label>
          <Textarea
            id="monetizationGoals"
            name="monetizationGoals"
            value={formData.monetizationGoals}
            onChange={handleChange}
            placeholder="Tell us about your goals for monetizing your Instagram content..."
          />
        </FormGroup>
      </FormSection>

      {/* Agreement */}
      <FormSection>
        <FormGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
            />
            <span>
              I agree to the terms and conditions and understand that this data 
              will be used for monetization eligibility assessment.
            </span>
          </CheckboxLabel>
          {errors.agreement && <ErrorMessage>{errors.agreement}</ErrorMessage>}
        </FormGroup>
      </FormSection>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </Form>
  );
};

export default ApplicationForm;