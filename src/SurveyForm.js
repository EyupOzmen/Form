import React, { useState,useEffect} from "react";

const SurveyForm = () => {

  const [data,setData] = useState("")
  const [min,setMin] = useState("")
  const [max,setMax] = useState("")

  const [validation, setValidation] = useState("integer");
  const [shape, setShape] = useState({ step: 1, pattern: "[0-9]*" });

  const [isSubmitting, setIsSubmitting] = useState(true);
  

  const [dataErr,setDataErr] = useState({})
  const [minErr,setMinErr] = useState({})
  const [maxErr,setMaxErr] = useState({})

  const handleValidationChange = (event) => {
    const { value } = event.target;

    if (value === "integer" || value === "integer-range") {
      setShape({
        step: 1,
        pattern: "[0-9]*",
      });
    } else {
      setShape({
        step: 0.1,
        pattern: "[0-9]+([.][0-9]+)?",
      });
    }
    setData("");
    setMin("");
    setMax("");
    setValidation(value);
    
  };

  const handleDataChange = (event) => {
    const { value } = event.target;

    setData(value);
  };

  const handleMinChange = (event) => {
    const { value} = event.target;

   setMin(value)
  };

  const handleMaxChange = (event) => {
    const { value} = event.target;

   setMax(value)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const isValid = formValidation();
    console.log(isValid)
    if(isValid){
      setIsSubmitting(false);
      console.log(data)
      
      
      setData("");
      setMin("");
      setMax("");
    }
    setIsSubmitting(true)
  };

  useEffect(() => {
    formValidation()

  },[data])
  
  const formValidation = () => {
     const dataErr = {};
     const minErr = {};
     const maxErr = {};

     let isValid = true;

     if(  !data ){
       dataErr.required = "Required"
       isValid=false;
     }

     if( validation === "integer-range" || validation === "decimal-range"){
       if(data < min){
         dataErr.minimum =  `Must be at least ${min} `
         isValid = false;
       }
       if(data  > max){
         dataErr.maximum = `Must be equal or lower than ${max} `
         isValid = false;
       }
     }
     if( validation === "integer-range" || validation === "decimal-range"){
        if(!min){
          minErr.required = "Required"
          isValid=false;
        }
        if(!max){
          maxErr.required =  "Required"
          isValid=false;
        }
     }
     if(validation === "decimal-range" || validation === "decimal"){
       if(data%1 == 0){
         console.log(data)
         dataErr.decimal = "Must be decimal!"
         isValid=false;
       }
       if(min%1 == 0){
         console.log(min)
         minErr.decimal = "Must be decimal!"
         isValid=false;
      }
      if(max%1 == 0){
        console.log(max)
        maxErr.decimal = "Must be decimal!"
        isValid=false;
      }
     }
     if(max < min ){
       maxErr.bigger = "Max must be greater than min"
       isValid=false;
     }
     if(validation === "integer-range" || validation === "integer"){
      console.log(data)
     
      if(data%1 != 0){
        console.log(data)
        dataErr.decimal = "Must be integer!"
        isValid=false;
      }
      if(min%1 != 0){
      console.log(min)
       minErr.decimal = "Must be integer!"
       isValid=false;
     }
     if(max%1 != 0){
       console.log(max)
       maxErr.decimal = "Must be integer!"
       isValid=false;
     }
    }
    if(max < min ){
      console.log(max)
      console.log(min)
      maxErr.bigger = "Max must be greater than min"
      isValid=false;
    }
     setDataErr(dataErr);
     setMaxErr(maxErr);
     setMinErr(minErr);

     return isValid;
  }
 
  return (
    <>
      <h1>Survey Form</h1>

      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Validation Type</label>
          <div>
            <select
              value={validation}
              onChange={handleValidationChange}
              id="validationType"
              name="validationType"
            >
              <option value="integer">Integer</option>
              <option value="integer-range">Integer Range</option>
              <option value="decimal">Decimal</option>
              <option value="decimal-range">Decimal Range</option>
            </select>
          </div>
          <br />
          {validation === "integer-range" || validation === "decimal-range" ? (
            <div>
              <input
                autoComplete="off"
                className="form-control"
                id="min"
                name="min"
                type="number"
                min="0"
                pattern={shape.pattern}
                step={shape.step}
                inputMode="numeric"
                onChange={handleMinChange}
                value={min}
                placeholder="Minimum"
              />
              {Object.keys(minErr).map((key) => {
                return <div key={key} style={{color:"red"}}>{minErr[key]}</div>
              })}
              <br />
              <br />
              <input
                autoComplete="off"
                className="form-control"
                id="max"
                name="max"
                type="number"
                min="0"
                pattern={shape.pattern}
                step={shape.step}
                inputMode="numeric"
                onChange={handleMaxChange}
                value={max}
                placeholder="Maximum"
              />
               {Object.keys(maxErr).map((key) => {
                return <div key={key} style={{color:"red"}}>{maxErr[key]}</div>
              })}
            </div>
          ) : null}
          <br />

          <div className="data-wrapper">
            <label htmlFor="data">Data Entry</label>
            <br />
            <br />
            <input
              autoComplete="off"
              className="data"
              id="data"
              name="data"
              type="number"
              min="0"
              pattern={shape.pattern}
              step={shape.step}
              inputMode="numeric"
              onChange={handleDataChange}
              value={data}
              placeholder="Enter data"
            />
            <br/>
            <small id="dataHelp" className="form-text text-muted">
              We'll never share your data with anyone else.
            </small>
            <br/>
            {Object.keys(dataErr).map((key) => {
                return <div key={key} style={{color:"red"}}>{dataErr[key]}</div>
              })}
          </div>
        </div>
        <br />
        <button className="button" type="submit" disabled={!isSubmitting}>
          Submit
        </button>
      </form>
    </>
  );
};

export default SurveyForm;
