export interface IInputField{
     value: string;
     name: string;
     label: string;
     type: string;
     placeholder: string;
}

export interface IAction{
     type:string;
     inputId?:string;
     value?:string;
}

export interface IState{
     name: IInputField;
     number: IInputField;
     month: IInputField;
     year: IInputField;
     cvc: IInputField;
}

export interface IContext{
     formFields:IState;
     inputHandler: (id:string, value:string)=>void;
     resetHandler: ()=>void;
}

export interface IContextProviderProps {
     children: React.ReactNode;
} 