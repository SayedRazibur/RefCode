import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getTodo = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/todos`);


      return await response.data
  }catch (e) {
      console.log(e)
  }
}