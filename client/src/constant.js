// Form placeholders and labels
export const PLACEHOLDERS = {
  PRODUCT: "Enter product name",
  MESSAGE: "Enter specific messaging",
  TONE: "Enter tone (e.g., energetic, professional)",
};

export const LABELS = {
  VIDEO_PREVIEW: "Video Preview",
  GENERATE_BUTTON: "Create Video",
  GENERATING_BUTTON: " Creating...",
};

// Error messages
export const ERROR_MESSAGES = {
  MISSING_FIELDS: "Please fill in all fields before generating the video.",
  GENERATION_FAILED: "Something went wrong while generating the video.",
};

// API endpoints
export const API = {
  GENERATE_VIDEO: "http://localhost:5000/api/generate",
  VIDEO_BASE_URL: "http://localhost:5000/videos/",
};
