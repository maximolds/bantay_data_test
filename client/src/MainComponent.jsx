import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./MainComponent.css";

const MainComponent = () => {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");

  // Fetch all numbers from the server
  const getAllNumbers = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/values/all");
      setValues(data.rows.map(row => row.number)); // Adjust if your API response format is different
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  }, []);

  // Save a number to the server
  const saveNumber = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await axios.post("/api/values", { value });
        setValue("");
        getAllNumbers();
      } catch (error) {
        console.error("Error saving number:", error);
      }
    },
    [value, getAllNumbers]
  );

  // Fetch numbers when the component mounts
  useEffect(() => {
    getAllNumbers();
  }, [getAllNumbers]);

  return (
    <div>
      <button onClick={getAllNumbers}>Get all numbers</button>
      <br />
      <span className="title">Values</span>
      <div className="values">
        {values.map((val, index) => (
          <div key={index} className="value">{val}</div>
        ))}
      </div>
      <form className="form" onSubmit={saveNumber}>
        <label>Enter your value: </label>
        <input
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainComponent;
