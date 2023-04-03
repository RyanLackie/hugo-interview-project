import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import {Ping} from '../Ping';


test('renders ping page', () => {
    render(
        <Ping ping="Pong" />
    );

    const pong = screen.getByText("Pong");
    expect(pong).toBeInTheDocument();
});
