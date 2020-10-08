import React, { useState } from "react";

import {
  requiredValidation,
  minimumValidation,
  maximumValidation,
} from "./validations";

const SurveyForm = () => {
  const initialValues = {
    data: {
      value: "",
      validations: [
        requiredValidation,
        maximumValidation(10),
        minimumValidation(3),
      ],
    },
    min: {
      value: "",
      validations: [requiredValidation],
    },
    max: {
      value: "",
      validations: [requiredValidation],
    },
  };

  const [fields, setFields] = useState(initialValues);

  const [validation, setValidation] = useState("");
  const [shape, setShape] = useState({ step: 1, pattern: "[0-9]*" });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(true);

  const handleValidationChange = (event) => {
    const { value } = event.target;

    setValidation(value);
    if (value === "integer" || value === "integer-range") {
      setShape({
        step: 1,
        pattern: "[0-9]*",
      });
    } else {
      setShape({
        step: 0.1,
        pattern: "[0-9]+([,][0-9]+)?",
      });
    }
    setFields(initialValues);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    let newFields = { ...fields };
    newFields[name].value = value;
    newFields = setValidationErrors(newFields);
    setIsSubmittable(!hasErrors(newFields));
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(fields);
      setIsSubmitting(false);
    });
  };

  const hasErrors = (fields) => {
    return (
      Object.keys(fields)
        .map((field) => fields[field].errors.length)
        .reduce((acc, errorCount) => acc + errorCount, 0) > 0
    );
  };

  const setValidationErrors = (fields) => {
    Object.keys(fields).forEach((field) => {
      fields[field].errors = errorsForField(field);
    });

    return fields;
  };

  const errorsForField = (field) => {
    return fields[field].validations
      .map((validation) => {
        const { isValid, message } = validation(fields[field].value);
        return isValid ? "" : message;
      })
      .filter((value) => value.length > 0);
  };

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
                onChange={handleChange}
                value={fields.min.value}
                placeholder="Minimum"
              />
              <small id="dataErrors" className="form-text text-danger">
                {fields.min.errors &&
                  fields.min.errors.map((error) => (
                    <span key={error}>
                      {error}
                      <br />
                    </span>
                  ))}
              </small>
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
                onChange={handleChange}
                value={fields.max.value}
                placeholder="Maximum"
              />
              <small id="dataErrors" className="form-text text-danger">
                {fields.max.errors &&
                  fields.max.errors.map((error) => (
                    <span key={error}>
                      {error}
                      <br />
                    </span>
                  ))}
              </small>
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
              onChange={handleChange}
              value={fields.data.value}
              placeholder="Enter data"
            />
            <br/>
            <small id="dataHelp" className="form-text text-muted">
              We'll never share your data with anyone else.
            </small>
            <br/>
            <small id="dataErrors" className="form-text text-danger">
              {fields.data.errors &&
                fields.data.errors.map((error) => (
                  <span key={error}>
                    {error}
                    <br />
                  </span>
                ))}
            </small>
          </div>
        </div>
        <br />
        <button className="button" type="submit" disabled={isSubmitting || !isSubmittable}>
          Submit
        </button>
      </form>
    </>
  );
};

export default SurveyForm;
