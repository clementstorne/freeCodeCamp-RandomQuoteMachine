import { useEffect, useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import QuoteService from "../services/QuoteService";
import { changeBackgroundColor } from "../utils/randomBackgroundColor";

function App() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#16a085");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchNewQuote = async () => {
    setLoading(true);
    const newColor = changeBackgroundColor();
    setColor(newColor);

    try {
      const res = await QuoteService.fetchQuote();
      setQuote(res[0].quote);
      setAuthor(res[0].author);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  if (loading) {
    return (
      <div
        id="quote-box"
        className="w-[450px] py-[40px] px-[50px] bg-white rounded"
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      id="quote-box"
      className="w-[450px] py-[40px] px-[50px] bg-white rounded"
    >
      <div id="text" className="text-3xl font-medium text-center">
        {quote}
      </div>
      <div id="author" className="pt-[20px] text-base font-normal text-right">
        - {author}
      </div>
      <div
        id="buttons"
        className="mt-[30px] flex justify-around items-center"
        title="Post this quote on X!"
      >
        <a id="tweet-quote" href="twitter.com/intent/tweet">
          <FaSquareXTwitter size={38} />
        </a>
        <button
          id="new-quote"
          className="h-[38px] rounded text-white outline-none text-sm pt-[8px] px-[18px] pb-[6px]"
          style={{ backgroundColor: color }}
          onClick={fetchNewQuote}
        >
          New quote
        </button>
      </div>
    </div>
  );
}

export default App;
