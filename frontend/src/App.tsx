import axios from "axios";
import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface ResultProps {
  result?: {
    branch_prediction: string;
    college_prediction: string;
  };
  error?: string;
}

interface BodyProps {
  branch: number;
  college: number;
}

function App() {
  const [result, setResult] = useState<ResultProps>();
  const [branch, setBranch] = useState(0);
  const [college, setCollege] = useState(0);
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

  // interface BodyProps{
  //   branch: number;
  //   college: number;
  // }

  const { register, handleSubmit } = useForm<BodyProps>();
  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="branch" className="form-label">
          Branch
        </label>
        <input
          {...register("branch", { valueAsNumber: true })}
          type="number"
          id="branch"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(parseInt(e.target.value))}
        />
        <label htmlFor="college" className="form-label">
          Collage
        </label>
        <input
          {...register("college", { valueAsNumber: true })}
          type="number"
          id="college"
          placeholder="College"
          value={college}
          onChange={(e) => setCollege(parseInt(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
      <header className="App-header">
        <h1>Data Analysis Result:</h1>
        <p>{result?.result?.college_prediction}</p>
      </header>
    </div>
  );
}

export default App;
