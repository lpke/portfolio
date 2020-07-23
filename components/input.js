function Input(props) {
  let inputClasses = "input";
  //#region -> handle props
  if (props.area) inputClasses += " area";
  else inputClasses += " single";
  if (props.mono) inputClasses += " mono";
  if (props.className) inputClasses += ` ${props.className}`;
  //#endregion <-

  return (
    <>
      <div className="input-container">
        {props.label && (
          <label className="label" htmlFor={props.id}>
            {props.label}
          </label>
        )}

        {!props.area ? (
          <input
            type={props.type || "text"}
            placeholder={props.placeholder}
            className={inputClasses}
            spellCheck={props.spellCheck || "false"}
            id={props.id}
          />
        ) : (
          <textarea className={inputClasses} spellcheck="false" id={props.id} />
        )}
      </div>

      <style jsx>{`
        .label {
          display: block;
          user-select: none;
          margin: 0;
          margin-bottom: 10px;
        }

        .input-container {
          width: 100%;

          :not(:last-of-type) {
            margin-bottom: 18px;
          }
        }

        .input {
          color: #b1b1b1;
          background: #262628;
          height: 40px;
          min-height: 40px;
          border-radius: 5px;
          border: 1px solid #1f534c;
          outline: none;
          width: 100%;
          transition: border 0.2s ease-out, box-shadow 0.25s ease-in-out,
            background 0.2s ease-in-out;
          padding: 12px;
          font-size: 16px;

          .area {
            resize: vertical;
            padding-bottom: 0;
          }

          &.mono {
            padding-top: 12px;
            font-family: "JetBrains Mono", monospace;
          }

          :focus {
            background: #2e2e31;
            color: #cfcfcf;
            border: 1px solid #17b897;
            box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.4);
          }

          ::selection {
            background: #048271;
            color: #ffffff;
          }
        }
      `}</style>
    </>
  );
}

export default Input;
