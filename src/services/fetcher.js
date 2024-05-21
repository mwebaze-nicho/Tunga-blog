import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const fetcher = async (url) => {
  // const res = axios.get(url).then((res) => res.data);
  try {
    const res = await axiosInstance.get(url);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
