// app/capture-data/actions.ts
'use server';

interface ProcessedData {
  success: boolean;
  message: string;
  userData?: any;
}

export async function decodeAndProcessData(encodedData: string): Promise<ProcessedData> {
  try {
    console.log('Processing encoded data on server...');
    
    // Try different decoding strategies
    let decodedData: string;
    
    try {
      // First try: decode URI component, then base64
      const uriDecoded = decodeURIComponent(encodedData);
      decodedData = Buffer.from(uriDecoded, 'base64').toString('utf-8');
    } catch (firstError) {
      try {
        // Second try: direct base64 decode
        decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      } catch (secondError) {
        // Third try: atob (for browser compatibility)
        decodedData = atob(encodedData);
      }
    }
    
    const userData = JSON.parse(decodedData);
    
    // Add timestamp if not present
    if (!userData.recordedAt) {
      userData.recordedAt = new Date().toISOString();
    }
    
    console.log('Successfully processed data for:', userData.username);
    
    return {
      success: true,
      message: 'Data successfully loaded from Cloudflare!',
      userData: userData
    };
    
  } catch (error) {
    console.error('Error processing data on server:', error);
    return {
      success: false,
      message: 'Failed to process data. ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
}