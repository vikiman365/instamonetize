export interface Creator {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  earnings: string;
  avatar: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  text: string;
  image: string;
  beforeEarnings: string;
  afterEarnings: string;
}
// In types/index.ts - Update your ApplicationFormData interface
export interface ApplicationFormData {
  fullName: string;
  email: string;
  instagramHandle: string;
  followers: string;
  engagementRate: string;
  niche: string;
  contentType: string[];
  monthlyPosts: string;
  country: string;
  ageRange: string;
  hasBrandDeals: boolean;
  monetizationGoals: string;
  agreement: boolean;  // This should stay as boolean
}

// Add a NEW interface for form errors
export interface ApplicationFormErrors {
  fullName?: string;
  email?: string;
  instagramHandle?: string;
  followers?: string;
  engagementRate?: string;
  niche?: string;
  contentType?: string;
  monthlyPosts?: string;
  country?: string;
  ageRange?: string;
  hasBrandDeals?: string;
  monetizationGoals?: string;
  agreement?: string;  // This can be string for error messages
}

export interface StatCardProps {
  number: string;
  label: string;
  description: string;
  delay?: number;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textLight: string;
    success: string;
    warning: string;
    error: string;
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}