import React,{useState,useEffect} from "react";
import "./App.css";
import InputWithValidator from "./components/InputWithValidator";
import FormSelect from "./components/FormSelect";

const App = () => {
  const [data, setData] = useState("");
  let [min, setMin] = useState(1);
  let [max, setMax] = useState(32);

  const options = ["Integer", "Integer Range", "Decimal", "Decimal Range"];

  const [validation, setValidation] = useState("integer");

  // Handle the change in our data entry points
  const handleValidationChange = (event) => {
    const { value } = event.target;

    setData("");
    setMin(1);
    setMax(32);
    setValidation(value);
  };

  const handleDataChange = (event) => {
    const { value } = event.target;

    setData(value);
  };

  const handleMinChange = (event) => {
    const { value } = event.target;

    setMin(value);
  };

  const handleMaxChange = (event) => {
    const { value } = event.target;

    setMax(value);
  };

  // Handle the submit process for the data entry

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value)
  };
  //   useEffect(() => {
  //   document.querySelector('#button').addEventListener('click',alertMessage)
  // },[data])

  // const alertMessage = () => {
  //   if(document.querySelector('#data').innerHTML === ''){
  //     document.querySelector('#data').setCustomValidity('Enter the data!')
  //   // }else if(document.querySelector('#data').innerHTML < min){
  //   //   document.querySelector('#data').setCustomValidity('Increase the data!')
  //   // }else if(document.querySelector('#data').innerHTML > max){
  //   //   document.querySelector('#data').setCustomValidity('Decrease the data!')
  //   }  
  // }

  // const form = document.getElementsByTagName('form');

  return (
    <div className="App">
      <div>
        <label>Validation Type</label>
        <br />
        <br />
        <FormSelect
          options={options}
          value={validation}
          onChange={handleValidationChange}
          id="validationType"
          name="validationType"
        />
        <br/>
        <br/>
      </div>
      {validation === "Integer Range" || validation === "Decimal Range" ? (
      <div>
      <div>
        <InputWithValidator
          value={min}
          onChange={handleMinChange}
          inputProps={{ type: "number",placeholder:"Minimum" }}
          id="min"
          labelText="Enter Minimum:"
          checks={["valueMissing"]}
          errorMessage="Please enter the minimum!!"
        />
        {console.log(min)}
      </div>
        <br/>
      <div>
        <InputWithValidator
          value={max}
          onChange={handleMaxChange}
          inputProps={{ type: "number",placeholder:"Maximum"}}
          id="max"
          labelText="Enter Maximum:"
          checks={["valueMissing"]}
          errorMessage="Please enter the maximum!!"
        />
        {console.log(max)}
      </div>
      </div>):(null)}
      <br/>
      {validation === "Integer Range" || validation === "Decimal Range" ? (
      <form>
      <div>
      <InputWithValidator
          value={data}
          min={min}
          max={max}     
          onChange={handleDataChange}
          inputProps={{ type: "number"}}
          id="data"
          labelText={`Enter a number :`}
          checks={["valueMissing","rangeOverflow", "rangeUnderflow"]}
          errorMessage="Please enter a number !"
        />
      </div>
      <br />
      {console.log(data)}
        <button id="button" className="button" type="submit">
          Submit
        </button>
      </form>
        ):(
      <form>
      <div>
      <InputWithValidator
          value={data}
          onChange={handleDataChange}
          inputProps={{ type: "number"}}
          id="data"
          labelText={`Enter a number:`}
          checks={["valueMissing"]}
          errorMessage="Please enter a number !"
        />
      </div>
      <br />
          {console.log(data)}
        <button id="button" className="button" type="submit"  >
          Submit
        </button>
      </form>
     )}
    </div>
  );
};

export default App;
