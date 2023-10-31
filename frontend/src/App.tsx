import axios from "axios";
import { useState, useEffect } from "react";

interface ResultProps {
  result?: { branch_prediction: string; college_prediction: string };
  error?: string;
}

function App() {
  const [result, setResult] = useState<ResultProps>();

  useEffect(() => {
    axios
      .get<ResultProps>("http://localhost:5000/api/data-analysis")
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setResult({
            error: data.error,
          });
        } else {
          setResult({
            result: data.result,
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Data Analysis Result:</h1>
        <p>{result?.result?.college_prediction}</p>
      </header>
    </div>
  );
}

export default App;
