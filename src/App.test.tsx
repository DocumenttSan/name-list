import React from 'react';
import { render, screen } from '@testing-library/react';
import { NameList } from './App';

test('renders learn react link', () => {
  render(<NameList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
