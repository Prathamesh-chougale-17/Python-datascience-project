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
  const [branch, setBranch] = useState(0);
  const [college, setCollege] = useState(0);
  // interface BodyProps{
  //   branch: number;
  //   college: number;
  // }

  const { register, handleSubmit } = useForm<BodyProps>();
  // const onSubmit = (data: FieldValues) => console.log(data);
  // const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // axios
  //   //   .post<BodyProps>(
  //   //     "http://localhost:5000/add",
  //   //     {
  //   //       branch: branch,
  //   //       college: college,
  //   //     },
  //   //     {
  //   //       headers: {
  //   //         "Access-Control-Allow-Origin": "*",
  //   //         // "Content-Type": "application/json",
  //   //         "X-Requested-With": "XMLHttpRequest",
  //   //         "content-type": "application/json",
  //   //       },
  //   //     }
  //   //   )
  //   fetch(`http://localhost:5000/api/add`, {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       branch: branch,
  //       college: college,
  //     }),
  //   })
  //     .then((response) => {
  //       const data = response.body;
  //       console.log(data);
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  // };

  const FormSubmit = (data: FieldValues) => {
    const sentData = JSON.stringify(data);
    console.log(sentData);
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
    // useEffect(() => {
    //   fetch(`http://localhost:5000/api/add`, {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((response) => response.json())
    //     .catch((error) => console.log(error));
    // }, [data]);
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
          value={branch}
          onChange={(e) => setBranch(parseInt(e.target.value))}
        />
        <label htmlFor="college" className="form-label">
          category
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
        <p>College : {result?.result?.college_prediction}</p>
        <p>branch : {result?.result?.branch_prediction}</p>
      </header>
    </div>
  );
}

export default App;
