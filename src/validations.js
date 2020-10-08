export const requiredValidation = (value) => {

    return {
      isValid: !!value,
      message: "Required"
    };
  };
  export const minimumValidation = (minimum) => {
   
    return (value) => {
      return {
        isValid: value >= minimum,
        message: `Must be at least ${minimum} `
      };
    };
  };
  export const maximumValidation = (maximum) => {
    return (value) => {
      return {
        isValid: value <= maximum,
        message: `Must be equal or lower than ${maximum} `
      };
    };
  };
