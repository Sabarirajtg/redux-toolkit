import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote, resetState } from "./redux/quotesSlice";

const QuoteDisplay = () => {
  const dispatch = useDispatch();
  const { loading, error, quote } = useSelector((state) => state.quotes);

  useEffect(() => {
    dispatch(fetchRandomQuote());

    // Optionally, reset the state when the component unmounts
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Random Quote</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {quote && (
        <div>
          <p>Text: {quote.content}</p>
          <p>Author: {quote.author}</p>
          {/* Other quote data */}
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
