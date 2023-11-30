import React, { createContext, useReducer, useCallback } from "react";
import { IState, IContext, IAction, IContextProviderProps } from '../models/contextModel'

const initialValues:IState = {
  name: {
    value: "",
    name: "name",
    label: "CARDHOLDER NAME",
    type: "text",
    placeholder: "e.g. Jane Appleseed",
  },
  number: {
    value: "",
    name: "number",
    label: "CARD NUMBER",
    type: "text",
    placeholder: "e.g. 1234 5678 9123 0000",
  },
  month: {
    value: "",
    name: "month",
    label: "EXP. DATE (MM/YY)",
    type: "text",
    placeholder: "MM",
  },
  year: {
    value: "",
    name: "year",
    label: "EXP. DATE (MM/YY)",
    type: "text",
    placeholder: "YY",
  },
  cvc: {
    value: "",
    name: "cvc",
    label: "CVC",
    type: "text",
    placeholder: "e.g. 123",
  },
};

export const FormContext = createContext<IContext>({
  formFields: initialValues,
  inputHandler: ()=> {},
  resetHandler: ()=> {},
});

const formReducer = (state:IState, action:IAction) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.inputId as keyof typeof state]: {
          ...state[action.inputId as keyof typeof state],
          value: action.value,
        },
      };
    case "RESET":
      return {
        name: {
          ...state.name,
          value: "",
        },
        number: {
          ...state.number,
          value: "",
        },
        month: {
          ...state.month,
          value: "",
        },
        year: {
          ...state.year,
          value: "",
        },
        cvc: {
          ...state.cvc,
          value: "",
        },
      };
    default:
      return state;
  }
};

export const FormContextProvider:React.FC<IContextProviderProps> = ({ children }) => {
  const [formFields, dispatch] = useReducer(formReducer, initialValues);

  const inputHandler = useCallback((id:string, value:string) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
    });
  }, []);

  const resetHandler = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);

  const value:IContext = {
    formFields,
    inputHandler,
    resetHandler,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormContext;
