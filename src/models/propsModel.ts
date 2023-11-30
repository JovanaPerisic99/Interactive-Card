import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ISchema } from "./schemaModel";

export interface IViewProps{
     handleView:()=>void;
}

export interface IInputProps{
     name:string|string[];
     isDate:boolean;
     register:UseFormRegister<ISchema>;
     error:FieldErrors<ISchema>;
     classCont?:string;
}

export interface INoMessage{
     name: {
          message:""
     }
}

export interface IMaxLength{
     cvc:number;
     number:number;
}