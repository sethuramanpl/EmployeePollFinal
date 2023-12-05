import { render, screen , fireEvent} from '@testing-library/react';
import React from 'react';
import {Provider} from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import store from '../store';
import Login from '../components/Login';
import {handleInitialData} from "../actions/shared";

describe("Login", () => {

  it('should display an error message after entering wrong password', async () => {
      await store.dispatch(handleInitialData());

      const {wrapper} = render(
          <Provider store={store}>
              <BrowserRouter>
                  <Login/>
              </BrowserRouter>
          </Provider>
      );

      const usernameInputElement = screen.getByTestId("username");
      const passwordInputElement = screen.getByTestId("password");
      const submitButtonElement = screen.getByTestId("submit");
      expect(usernameInputElement).toBeInTheDocument();
      expect(passwordInputElement).toBeInTheDocument();
      expect(submitButtonElement).toBeInTheDocument();

      fireEvent.change(usernameInputElement, {target: {value: 'sarahedo'}});
      fireEvent.change(passwordInputElement, {target: {value: 'wrongpassword'}});
      expect(usernameInputElement.value).toBe("sarahedo");
      expect(passwordInputElement.value).toBe("wrongpassword");
      fireEvent.click(submitButtonElement);
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    //   expect(wrapper).toMatchSnapshot();
  });

});