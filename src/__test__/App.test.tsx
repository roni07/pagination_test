import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';

test('Render app component', () => {
    render(<App/>);
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
});
