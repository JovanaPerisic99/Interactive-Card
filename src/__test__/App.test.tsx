import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '../test-utils';
import '@testing-library/jest-dom'
import Form from '../Components/Form'
import ThankYouCard from '../Components/ThankYouCard'
import App from '../App'

describe("App component", ()=>{
     describe("Sidebar elements content change", () => {
          test("should change username display when typing in input", async ()=>{
               render(<App />);
               const inputElement = screen.getByPlaceholderText("e.g. Jane Appleseed") as HTMLInputElement;
               const usernameElement = screen.getByTestId(/username_cont/i);

               fireEvent.change(inputElement, { target: { value: "Jovana" } });
               expect(usernameElement.textContent).toBe("JOVANA");
          })

          test("should change card number display when typing in input", async ()=>{
               render(<App />);
               const inputElement = screen.getByPlaceholderText("e.g. 1234 5678 9123 0000") as HTMLInputElement;
               const cardNumberElement = screen.getByTestId(/card_num_cont/i);

               fireEvent.change(inputElement, { target: { value: "1234" } });
               expect(cardNumberElement.textContent).toBe("1234 ____ ____ ____");
          })
          
          test("should change cvc number display when typing in input", async ()=>{
               render(<App />);
               const inputElement = screen.getByPlaceholderText("e.g. 123") as HTMLInputElement;
               const cvcNumberElement = screen.getByTestId(/cvc_num_cont/i);

               
               fireEvent.change(inputElement, { target: { value: "12" } });
               expect(cvcNumberElement.textContent).toBe("12_");
          })

          test("should change month display when typing in input", async ()=>{
               render(<App />);
               const inputElement = screen.getByPlaceholderText("MM") as HTMLInputElement;
               const monthElement = screen.getByTestId(/month_cont/i);
               
               fireEvent.change(inputElement, { target: { value: "1" } });
               expect(monthElement.textContent).toBe("01");
          })

          test("should change username display when typing in input", async ()=>{
               render(<App />);
               const inputElement = screen.getByPlaceholderText("YY") as HTMLInputElement;
               const yearElement = screen.getByTestId(/year_cont/i);
               
               fireEvent.change(inputElement, { target: { value: "1" } });
               expect(yearElement.textContent).toBe("01");
          })
          
     })

     
     describe("Change view",()=>{
          test("when 'confirm' button clicked and no errors show thank you card", async()=>{
               render(<App />);
               const formElement = await screen.findByTestId("form");
          
               
               await fireEvent.submit(formElement, {
                    target: {
                         name:{value:'Jovana'},
                         number: {value: '1234123412341234'},
                         cvc:{value:'123'},
                         month:{value:'12'},
                         year:{value:'12'}
                    }
               });

               await screen.findByTestId("thankYouCard");

               const sectionElement=screen.getByTestId("thankYouCard");
               expect(sectionElement).toBeInTheDocument();
          })

          // test("when 'continue' btn clicked return form view and reset input values",()=>{

          // })
     })
     
     
})

