import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../Redux/configureStore';
import Search from '../Components/Search';

describe('Search component', () => {
  test('Renders Search component', () => {
    const tree = render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <Search />
          </Router>
        </Provider>
      </React.StrictMode>,
    );
    expect(tree).toMatchSnapshot();
  });

  test('Handles search input correctly', () => {
    const searchFunction = jest.fn(); // Mock search function
    const { getByPlaceholderText } = render(<Search search={searchFunction} />);
    const inputElement = getByPlaceholderText('🔎Search Heros');

    fireEvent.change(inputElement, { target: { value: 'Spider-Man' } });

    expect(inputElement.value).toBe('Spider-Man');
    expect(searchFunction).toHaveBeenCalledWith('Spider-Man');
  });
});
