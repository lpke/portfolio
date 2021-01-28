import { useState } from "react";
import { FormsContext } from "lib/contexts";
import Input from "components/form-parts/Input";

function Form(props) {
  const sideMargins = props.center ? 'auto' : '0';
  const [fields, setFields] = useState({});
  const [currentInput, setCurrentInput] = useState({
    node: "",
    id: ""
  });

  const updateField = (key, value) => {
    const fieldsState = { ...fields };
    fieldsState[key] = value;
    setFields(fieldsState);
  };

  return (
    <>
      <form
        className={props.className ? `form ${props.className}` : "form"}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(fields);
        }}
      >
        <FormsContext.Provider
          value={{ fields, updateField, currentInput, setCurrentInput }}
        >
          {props.children}
        </FormsContext.Provider>
        {!props.noSubmitButton && (
          <button type="submit" className="submit-btn">
            {props.submitText || "Submit"}
          </button>
        )}
      </form>

      <style jsx>{`
        .form {
          display: flex;
          flex-direction: ${props.direction || "column"};
          max-width: ${props.maxwidth || "100%"};
          background: ${props.background || "none"};
          margin: 20px ${sideMargins};
        }

        .submit-btn {
          display: inline-block;
          margin: 0;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

export { Form, Input };