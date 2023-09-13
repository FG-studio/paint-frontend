declare global {
  interface Window {
    API_ENDPOINT: string
    ENV: string
    DEBUG: string
  }
}

export const API_ENDPOINT = window.API_ENDPOINT
export const DEBUG = window.DEBUG === 'true'
