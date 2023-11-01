import axios from "axios";
// import { head } from "axios";
import { useState } from "react";
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
    <div className="App">
      <form onSubmit={handleSubmit(FormSubmit)}>
        <label htmlFor="branch" className="form-label">
          CET Cutoff Marks
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
        <button type="submit">Submit</button>
      </form>
      <header className="App-header">
        <h1>Data Analysis Result:</h1>
        <p>College : {result?.result?.college_prediction}</p>
        <p>branch : {result?.result?.branch_prediction}</p>
      </header>
    </div>
  );
}

export default App;
