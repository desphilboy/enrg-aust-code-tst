import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const infoHead = screen.getByText(/The semantic/i);
    expect(infoHead).toBeInTheDocument();
});
