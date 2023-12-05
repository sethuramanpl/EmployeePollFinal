import { render, screen , fireEvent} from '@testing-library/react';
import Nav from '../components/Nav';
import React from 'react';
import {Provider} from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import store from '../store';

describe("Nav", () => {
  it('should display all the navigation links in the page', async () => {
      const {wrapper} = render(
        <MemoryRouter>
          <Provider store={store}>
                  <Nav />
          </Provider>
        </MemoryRouter>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Leaderboard')).toBeInTheDocument();
      expect(screen.getByText('New Poll')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});

describe("NavLinks", ()=>{
    it("should verify snapshot", async () => {
        const {wrapper} = render(
            <MemoryRouter>
              <Provider store={store}>
                      <Nav />
              </Provider>
            </MemoryRouter>
          );
    expect(wrapper).toMatchSnapshot();
    })
})