import React from "react";

const FormSelect = ({ options, value, onChange, id, name }) => {
  return (
    <div>
      {options && options.length > 0 && (
        <div>
          <select value={value} onChange={onChange} id={id} name={name}>
            {options.map((option, index) => {
                return <option value={option} key={index}>{option}</option>
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default FormSelect ;
