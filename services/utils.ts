

export const generateId = (key: string) => {
  // all lowercase, no spaces, no special characters
  return key.trim().replace(/\s/g, "_").toLowerCase();
};

export const BASE_PATH = "services/data";
