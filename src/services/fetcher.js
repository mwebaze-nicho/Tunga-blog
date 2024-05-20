import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "/",
// });

const fetcher = async (url) => {
  // const res = axios.get(url).then((res) => res.data);
 try {
   const res = await axios.get(url);
   
   return res.data
 } catch (error) {
  
 }
};

export default fetcher;
