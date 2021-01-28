import { useContext, useState } from "react";
import { FormsContext } from "lib/contexts";

function Input(props) {
  const { fields, updateField, currentInput, setCurrentInput } = useContext(
    FormsContext
  );
  const [isWarned, setIsWarned] = useState(null);

  function handleFocus(event) {
    // sets details about current input, if different from previous
    if (
      !currentInput.node ||
      !event.target.isSameNode(currentInput.node)
    ) {
      const newInputState = {};
      newInputState.node = event.target;
      newInputState.id = props.id;

      setCurrentInput(newInputState);
    }
  }

  function handleChange(event) {
    if (props.id) {
      updateField(props.id, event.target.value);
    } else {
      if (!isWarned || !isWarned.isSameNode(event.target)) {
        setIsWarned(event.target);
        console.warn("Input field is missing an id. State won't be stored without a unique ID for each field. Element below:");
        console.warn(event.target);
      }
    }
  }

  return (
    <>
      <div className="input-container">
        {props.label && (
          <div className="label-container">
            <label className="label" htmlFor={props.id}>
              {props.label}
            </label>
          </div>
        )}

        <input
          id={props.id}
          type={props.type || "text"}
          className={props.className ? `input ${props.className}` : "input"}
          labelpos={props.labelpos}
          placeholder={props.placeholder}
          spellCheck="false"
          onFocus={handleFocus}
          onChange={handleChange}
          {...props}
        />
      </div>

      <style jsx>{`
        .label-container {
          display: ${props.labelpos === "hidden" ? "none" : "block"};
          user-select: none;
          margin: 0;
          margin-bottom: 6px;
          width: 100%;
          text-align: ${props.labelpos === "hidden"
            ? "left"
            : props.labelPos || "left"};
        }

        .label {
          display: inline-block;
        }

        .input-container {
          margin-bottom: 18px;

          &:last-of-type {
            margin-bottom: 0;
          }
        }

        .input {
          --height: 35px;
          height: var(--height);
          line-height: var(--height);
          padding: 8px;
          border: 1px solid #d5d5d5;
          color: #242424;
          border-radius: 3px;

          &[type="password"] {
            font-family: verdana, sans-serif;
            font-size: 20px;
          }

          ::placeholder {
            font-family: "GothamPro", verdana, sans-serif;
            font-size: 18px;
            color: #bababa;
          }

          :focus {
            border: 1px solid #666;
            outline: none;
          }
        }
      `}</style>
    </>
  );
}

export default Input;