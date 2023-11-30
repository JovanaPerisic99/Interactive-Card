import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '../../test-utils';
import '@testing-library/jest-dom'
import Form from '../Form'

const mockedHandleView = jest.fn();

const emptyFieldError = async (element:HTMLElement)=>{
     const formElement = await screen.findByTestId("form");

     act(()=>{
          fireEvent.submit(formElement);
     }) 

     await waitFor(() => {
          expect(element.textContent).toBe("Can't be blank ");
     });
}

describe("Form elements", () => {
     describe("Should render elements", ()=>{
          test('should render username input element', () => {
            render(<Form handleView={mockedHandleView} />);
            const inputElement = screen.getByPlaceholderText("e.g. Jane Appleseed");
            expect(inputElement).toBeInTheDocument();
          });
     
          test('should render card number input element', () => {
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("e.g. 1234 5678 9123 0000");
               expect(inputElement).toBeInTheDocument();
          });
     
          test('should render cvc number input element', () => {
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("e.g. 123");
               expect(inputElement).toBeInTheDocument();
          });
     
          test('should render month input element', () => {
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("MM");
               expect(inputElement).toBeInTheDocument();
          });
     
          test('should render year input element', () => {
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("YY");
               expect(inputElement).toBeInTheDocument();
          });
     })

     describe("Should change input value", ()=>{
          test("should be able to type username",()=>{
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("e.g. Jane Appleseed") as HTMLInputElement;
               fireEvent.change(inputElement, { target: { value: "Jovana" } })
               expect(inputElement.value).toBe("Jovana");
          })

          test("should be able to type card number",()=>{
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("e.g. 1234 5678 9123 0000") as HTMLInputElement;
               fireEvent.change(inputElement, { target: { value: "1244" } })
               expect(inputElement.value).toBe("1244");
          })

          test("should be able to type cvc number",()=>{
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("e.g. 123") as HTMLInputElement;
               fireEvent.change(inputElement, { target: { value: "445" } })
               expect(inputElement.value).toBe("445");
          })

          test("should be able to type month",()=>{
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("MM") as HTMLInputElement;
               fireEvent.change(inputElement, { target: { value: "12" } })
               expect(inputElement.value).toBe("12");
          })

          test("should be able to type year",()=>{
               render(<Form handleView={mockedHandleView} />);
               const inputElement = screen.getByPlaceholderText("YY") as HTMLInputElement;
               fireEvent.change(inputElement, { target: { value: "04" } })
               expect(inputElement.value).toBe("04");
          })
     })

     describe("Error showing",()=>{
          test("empty username error handler", async ()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("name-error");
               emptyFieldError(errorElement);
          })

          test("empty card number error handler", async ()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("number-error");
               emptyFieldError(errorElement);
          })

          test("empty cvc number error handler", async ()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("cvc-error");
               emptyFieldError(errorElement);
          })

          test("empty month/year error handler", async ()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("month-error");
               emptyFieldError(errorElement);
          })

          test("card number invalid error", async()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("number-error");

               const formElement = await screen.findByTestId("form");

               act(()=>{
                    fireEvent.submit(formElement, {
                         target: {
                              number: {value: '12A4'}
                         }
                    });
               }) 

               await waitFor(() => {
                    expect(errorElement.textContent).not.toBe(" ");
               });
          })

          test("cvc number invalid error", async()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("cvc-error");

               const formElement = await screen.findByTestId("form");

               act(()=>{
                    fireEvent.submit(formElement, {
                         target: {
                              cvc: {value: '12A4'}
                         }
                    });
               }) 

               await waitFor(() => {
                    expect(errorElement.textContent).not.toBe(" ");
               });
          })

          test("month invalid error", async()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("month-error");

               const formElement = await screen.findByTestId("form");

               act(()=>{
                    fireEvent.submit(formElement, {
                         target: {
                              month: {value: '13'}
                         }
                    });
               }) 

               await waitFor(() => {
                    expect(errorElement.textContent).not.toBe(" ");
               });
          })

          test("year invalid error", async()=>{
               render(<Form handleView={mockedHandleView} />);
               const errorElement = screen.getByTestId("month-error");

               const formElement = await screen.findByTestId("form");

               act(()=>{
                    fireEvent.submit(formElement, {
                         target: {
                              year: {value: 'a5'}
                         }
                    });
               }) 

               await waitFor(() => {
                    expect(errorElement.textContent).not.toBe(" ");
               });
          })

          test("input fields with no errors", async()=>{
               render(<Form handleView={mockedHandleView} />);
               const nameError = screen.getByTestId("name-error");
               const numberError = screen.getByTestId("number-error");
               const cvcError = screen.getByTestId("cvc-error");
               const monthError = screen.getByTestId("month-error");
               
               const formElement = await screen.findByTestId("form");

               act(()=>{
                    fireEvent.submit(formElement, {
                         target: {
                              name:{value:'Jovana'},
                              number: {value: '1234123412341234'},
                              cvc:{value:'123'},
                              month:{value:'12'},
                              year:{value:'12'}
                         }
                    });
               }) 

               await waitFor(() => {
                    expect(nameError.textContent).toBe(" ");
                    expect(numberError.textContent).toBe(" ");
                    expect(cvcError.textContent).toBe(" ");
                    expect(monthError.textContent).toBe(" ");
               });
          })
     })
})