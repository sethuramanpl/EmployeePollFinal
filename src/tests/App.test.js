import { render, screen , fireEvent} from '@testing-library/react';
import App from '../components/App';
import React from 'react';
import {Provider} from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import store from '../store';

describe("App", () => {
  it('should render the login form onLoad', async () => {
      const {wrapper} = render(
        <MemoryRouter>
          <Provider store={store}>
                  <App />
          </Provider>
        </MemoryRouter>
      );
      expect(screen.getByText('Welcome to Employee Portal.')).toBeInTheDocument();
  });
});