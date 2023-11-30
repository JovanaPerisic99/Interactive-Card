import React, { useState, useContext } from "react";
import { FormContext } from "../context/formContext";
import { FieldErrors } from "react-hook-form";
import { IContext, IInputField } from "../models/contextModel";
import { ISchema } from "../models/schemaModel";
import { IInputProps, INoMessage, IMaxLength } from "../models/propsModel";

const initialInputField = {
  value: "",
  name: "",
  label: "",
  type: "",
  placeholder: ""
}

const Input= ({name, isDate, register, error, classCont}:IInputProps) => {
  const contx = useContext<IContext>(FormContext);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const errorMsg:FieldErrors<ISchema>|INoMessage = error ? error : {name:{message:""}};
  const myInputSupportedMaxLength:IMaxLength = {
    cvc: 3,
    number: 16
  };
  
  let month:IInputField=initialInputField; 
  let year:IInputField=initialInputField;
  let inputField:IInputField=initialInputField;

  if (name.length === 2) {
    month = contx.formFields[name[0] as keyof typeof contx.formFields];
    year = contx.formFields[name[1] as keyof typeof contx.formFields];
  } else {
    inputField = contx.formFields[name as keyof typeof contx.formFields];
  }

  const handleBlur = (e:React.FormEvent, value:string):void => {
    e.preventDefault();
    if (value === "") {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };

  const handleChange = (e:React.FormEvent<HTMLInputElement>):void => {
    e.preventDefault();
    let inputName = e.currentTarget.name;
    let inputValue = e.currentTarget.value;

    contx.inputHandler(inputName, inputValue);
  };

  const element = isDate ? (
    <div className="date_container">
      <input
        type={month.type}
        defaultValue={month.value}
        placeholder={month.placeholder}
        maxLength={2}
        {...register(month.name as keyof typeof register, {
          onChange: (e) => {
            handleChange(e);
          },
          onBlur: (e) => handleBlur(e, month.value),
        })}
        style={errorMsg[month.name as keyof typeof errorMsg] || isTouched ? { borderColor: "#F96363" } : {}}
      />
      <input
        type={year.type}
        defaultValue={year.value}
        placeholder={year.placeholder}
        maxLength={2}
        {...register(year.name as keyof typeof register, {
          onChange: (e) => {
            handleChange(e);
          },
          onBlur: (e) => handleBlur(e, year.value),
        })}
        style={errorMsg[year.name as keyof typeof errorMsg] || isTouched ? { borderColor: "#F96363" } : {}}
      />
      <p className="error" data-testid={`${month.name}-error`}>
        {errorMsg[month.name as keyof typeof errorMsg]?.message || errorMsg[year.name as keyof typeof errorMsg]?.message || ""}{" "}
      </p>
    </div>
  ) : (
    <React.Fragment>
      <input
        type={inputField.type}
        defaultValue={inputField.value}
        placeholder={inputField.placeholder}
        maxLength={myInputSupportedMaxLength[inputField.name as keyof IMaxLength] || 100}
        {...register(inputField.name as keyof typeof register, {
          onChange: (e) => {
            handleChange(e);
          },
          onBlur: (e) => handleBlur(e, inputField.value),
        })}
        style={
          errorMsg[inputField.name as keyof typeof errorMsg] || isTouched ? { borderColor: "#F96363" } : {}
        }
      />
      <p className="error" data-testid={`${inputField.name}-error`}>{errorMsg[name as keyof typeof errorMsg]?.message} </p>
    </React.Fragment>
  );

  return (
    <div className={classCont ? classCont : "input_cont"}>
      <label {...typeof name === 'string' &&  { htmlFor: name }}  className="inp_lab">
        {inputField?.label || month?.label}
      </label>
      {element}
    </div>
  );
};

export default Input;
