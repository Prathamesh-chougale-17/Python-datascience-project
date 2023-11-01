import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import "./App.css";
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
  error?: string;
}

function App() {
  const [result, setResult] = useState<ResultProps>();
  const { register, handleSubmit } = useForm<BodyProps>();
  const FormSubmit = (data: FieldValues) => {
    const sentData = JSON.stringify(data);
    axios
      .post("http://localhost:5000/api/add", sentData, {
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <main className="App">
      <div className="rules">
        <h1>Rules: </h1>
        <p>1. CET Cutoff should be between 0 and 100 and should be integer</p>
        <p>2. Category should be between 0 and 3 and should be integer</p>
        <p>3. If you are from General category enter 0</p>
        <p>4. If you are from OBC category enter 1</p>
        <p>5. If you are from SC category enter 2</p>
      </div>
      <form onSubmit={handleSubmit(FormSubmit)}>
        <div className="inputForm">
          <label htmlFor="branch" className="form-label">
            CET Percentile
          </label>
          <input
            {...register("branch", { valueAsNumber: true })}
            type="number"
            id="branch"
            placeholder="Branch"
          />
          <label htmlFor="college" className="form-label">
            category
          </label>
          <input
            {...register("college", { valueAsNumber: true })}
            type="number"
            id="college"
            placeholder="College"
          />
          <button className="submitButton" type="submit">
            Submit
          </button>
        </div>
      </form>
      <header className="App-header">
        <p>College : {result?.result?.college_prediction}</p>
        <p>branch : {result?.result?.branch_prediction}</p>
      </header>
    </main>
  );
}

export default App;
