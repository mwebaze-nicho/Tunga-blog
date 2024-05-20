import { api } from "@/config/axiosConfig";

export const fetcher = async (url) => {
  try {
    const response = await api.get(url);
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error: No data available");
      return null;
    } else {
      throw error;
    }
  }
};
