import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const Axios = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/quotes",
  headers: {
    "X-Api-Key": "j+q5iAAkpKOIuMiC9A6LYw==36PbCWlgYTRKTgJh",
  },
});

class QuoteService {
  async fetchQuote() {
    try {
      const res = await Axios.get("?category=happiness");
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new QuoteService();
