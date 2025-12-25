'use server';

export interface ProcessedData {
  success: boolean;
  message: string;
  userData: any | null; // Changed from optional to nullable
}

export async function decodeAndProcessData(encodedData: string): Promise<ProcessedData> {
  try {
    console.log('🔍 Server: Processing encoded data');
    
    let decodedData: string;
    
    try {
      const uriDecoded = decodeURIComponent(encodedData);
      decodedData = Buffer.from(uriDecoded, 'base64').toString('utf-8');
    } catch {
      try {
        decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
      } catch {
        decodedData = atob(encodedData);
      }
    }
    
    const userData = JSON.parse(decodedData);
    
    if (!userData.recordedAt) {
      userData.recordedAt = new Date().toISOString();
    }
    
    console.log('✅ Server: Successfully processed data for', userData.username);
    
    return {
      success: true,
      message: 'Data processed successfully',
      userData: userData
    };
    
  } catch (error) {
    console.error('❌ Server: Error processing data:', error);
    return {
      success: false,
      message: `Failed to process data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      userData: null
    };
  }
}