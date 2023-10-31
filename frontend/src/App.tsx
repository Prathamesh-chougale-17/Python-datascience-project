import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [result, setResult] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data-analysis")
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setResult(`Error: ${data.error}`);
        } else {
          setResult(`Result: ${data.result}`);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Analysis Result:</h1>
        <p>{result}</p>
      </header>
    </div>
  );
}

export default App;
