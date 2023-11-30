import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import {IViewProps} from "../models/propsModel";
import {ISchema} from "../models/schemaModel";

const Form = ({handleView}:IViewProps)=>{

  const schema = yup.object<ISchema>().shape({
    name: yup.string().required("Can't be blank"),
    number: yup
      .string()
      .required("Can't be blank")
      .matches(/^[0-9]+$/, "Numbers only")
      .min(16, "Must be exactly 16 digits")
      .max(16, "Must be exactly 16 digits"),
    month: yup
      .string()
      .required("Can't be blank")
      .matches(/(^0?[1-9]$)|(^1[0-2]$)/, "Incorrect value"),
    year: yup
      .string()
      .required("Can't be blank")
      .matches(/[0-9][0-9]|[0-9]/, "Incorrect value"),
    cvc: yup
      .string()
      .required("Can't be blank")
      .matches(/^[0-9]+$/, "Numbers only")
      .min(3, "Must be exactly 3 digits")
      .max(3, "Must be exactly 3 digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit = ():void => {
    handleView();
  };

  return (
    <section className="form_container" id="inputsCard">
      <form className="form" id="form" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <Input name="name" register={register} error={errors} isDate={false} />
        <Input
          name="number"
          register={register}
          error={errors}
          isDate={false}
        />

        <div className="info_container">
          <Input
            name={["month", "year"]}
            register={register}
            error={errors}
            classCont="date_info_container"
            isDate={true}
          />
          <Input
            name="cvc"
            register={register}
            error={errors}
            classCont="cvc_container"
            isDate={false}
          />
        </div>

        <button>Confirm</button>
      </form>
    </section>
  );
}

export default Form;
