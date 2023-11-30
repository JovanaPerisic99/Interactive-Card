import { render, screen } from '../../test-utils';
import Sidebar from '../Sidebar'
import React from 'react';

describe("Sidebar default content", () => {
     test('should render the correct default value for card number', () => {
       render(<Sidebar />);
       const pElement = screen.getByTestId(/card_num_cont/i);
       expect(pElement.textContent).toBe("0000 0000 0000 0000")
     });

     test('should render the correct default value for cvc number', () => {
          render(<Sidebar />);
          const pElement = screen.getByTestId(/cvc_num_cont/i);
          expect(pElement.textContent).toBe("000")
     });

     test('should render the correct default value for username', () => {
          render(<Sidebar />);
          const pElement = screen.getByTestId(/username_cont/i);
          expect(pElement.textContent).toBe("JANE APPLESEED")
     });

     test('should render the correct default value for month', () => {
          render(<Sidebar />);
          const pElement = screen.getByTestId(/month_cont/i);
          expect(pElement.textContent).toBe("00")
     });

     test('should render the correct default value for year', () => {
          render(<Sidebar />);
          const pElement = screen.getByTestId(/year_cont/i);
          expect(pElement.textContent).toBe("00")
     });
})
