interface EnvConfig {
  NODE_ENV: string;
  APP_NAME: string;
  APP_VERSION: string;
  APP_URL: string;
  API_BASE_URL: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  GA_TRACKING_ID?: string;
  HOTJAR_ID?: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_DATABASE: boolean;
  ENABLE_AI_INSIGHTS: boolean;
  DEBUG_MODE: boolean;
  MOCK_DATA: boolean;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || '';
};

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
};

export const env: EnvConfig = {
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'PrintQuote Pro'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  APP_URL: getEnvVar('VITE_APP_URL', 'http://localhost:5173'),
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:5173/api'),
  SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  GA_TRACKING_ID: getEnvVar('VITE_GA_TRACKING_ID'),
  HOTJAR_ID: getEnvVar('VITE_HOTJAR_ID'),
  ENABLE_ANALYTICS: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
  ENABLE_DATABASE: getBooleanEnvVar('VITE_ENABLE_DATABASE', false),
  ENABLE_AI_INSIGHTS: getBooleanEnvVar('VITE_ENABLE_AI_INSIGHTS', true),
  DEBUG_MODE: getBooleanEnvVar('VITE_DEBUG_MODE', false),
  MOCK_DATA: getBooleanEnvVar('VITE_MOCK_DATA', true),
};

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

// Log configuration in development
if (isDevelopment && env.DEBUG_MODE) {
  console.log('Environment Configuration:', env);
}