import { render, screen , fireEvent} from '@testing-library/react';
import PollCreation from '../components/PollCreation';
import React from 'react';
import {Provider} from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import store from '../store';

describe("PollCreation", () => {
    it('should display all the navigation links in the page', async () => {
        const {wrapper} = render(
          <MemoryRouter>
            <Provider store={store}>
                    <PollCreation />
            </Provider>
          </MemoryRouter>
        );

        const optionOne = screen.getByTestId("optionOne");
        const optionTwo = screen.getByTestId("optionTwo");
        const submitButton = screen.getByTestId("submitButton");

        expect(optionOne).toBeInTheDocument();
        expect(optionTwo).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        expect(submitButton).toBeDisabled();

        fireEvent.change(optionOne,{target:{value:'Java?'}})
        fireEvent.change(optionTwo,{target:{value:'Python?'}})
        expect(submitButton).not.toBeDisabled();

    });
  });