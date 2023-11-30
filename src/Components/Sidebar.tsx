import React, { useContext } from "react";
import { FormContext } from "../context/formContext";
import { IContext, IState } from "../models/contextModel";

const Sidebar = ()=>{
  const contx = useContext<IContext>(FormContext);
  const { name, number, month, year, cvc }:IState = contx.formFields;

  const cardNumber = ():string => {
    let cardValue:string = (number.value).padEnd(16, "_");
    cardValue =
      cardValue.substr(0, 4) +
      " " +
      cardValue.substr(4, 4) +
      " " +
      cardValue.substr(8, 4) +
      " " +
      cardValue.substr(12, 4);
    return cardValue;
  };

  const cvcNumber = ():string => {
    let cvcNumValue:number|string = Number(cvc.value);
    if (cvcNumValue < 10) {
      cvcNumValue = cvcNumValue.toString().substr(0, 1) + "__";
    } else if (cvcNumValue < 100) {
      cvcNumValue = cvcNumValue.toString().substr(0, 2) + "_";
    }
    return cvcNumValue.toString();
  };

  const monthNumber = ():string => {
    let monthValue:number|string = Number(month.value);
    if (monthValue < 10) {
      monthValue = "0" + monthValue;
    }
    return monthValue.toString();
  };

  const yearNumber = ():string => {
    let yearValue:number|string = Number(year.value);
    if (yearValue < 10) {
      yearValue = "0" + yearValue;
    }
    return yearValue.toString();
  };

  return (
    <section className="sidebar">
      <div className="card_container">
        <div className="cards">
          <div className="card1">
            <div className="card_text1">
              <svg
                width="84"
                height="47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="23.478"
                  cy="23.5"
                  rx="23.478"
                  ry="23.5"
                  fill="#fff"
                />
                <path
                  d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
                  stroke="#fff"
                />
              </svg>
              <p id="card_num_cont" data-testid="card_num_cont">
                {number.value === "" ? "0000 0000 0000 0000" : cardNumber()}
              </p>
              <div className="card_text_flex">
                <p id="username_cont" data-testid="username_cont">
                  {name.value === ""
                    ? "JANE APPLESEED"
                    : name.value.toUpperCase()}
                </p>
                <p id="date_cont">
                  <span id="month_cont" data-testid="month_cont">
                    {month.value === "" ? "00" : monthNumber()}
                  </span>
                  /
                  <span id="year_cont" data-testid="year_cont">
                    {year.value === "" ? "00" : yearNumber()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <div className="card_text2">
              <p id="cvc_num_cont" data-testid="cvc_num_cont">{cvc.value === "" ? "000" : cvcNumber()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
