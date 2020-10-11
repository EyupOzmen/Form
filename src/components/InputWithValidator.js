import React,{useState} from "react";

const InputWithValidator = ({
    id,
    inputProps,
    labelText,
    checks,
    errorMessage,
    onChange,
    value,
    min,
    max
  }) => {
    const [isValid, setIsValid] = useState(true);
  
    const checkValidity = ev => {
      const { validity } = ev.target;
      const checksPassed = checks.filter(check => validity[check]).length === 0;
      setIsValid(checksPassed.length);
    };
  
    return (
      <>
        <label htmlFor={id}>
          {labelText}
        </label>
        <input id={id} {...inputProps} onBlur={checkValidity} min={min} max={max} onChange={onChange} value={value} required />
        <p className={`${isValid ? `dn` : `dib red`}`}>{errorMessage}</p>
      </>
    );
  };

  export default InputWithValidator;
  