import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import {PingConnector} from '../PingConnector';
import { PingProps } from '../types';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve("Pong"),
  })
) as jest.Mock;

const mockChildComponent = jest.fn();

jest.mock('../Ping', () => {
    return {
        __esmodule: true,
        Ping: (props: PingProps) => {
            mockChildComponent(props);
            
            return <></>;
        }
    }
})

test('renders ping connector', async () => {
    await act(async () => 
        render(<PingConnector/>)
    );

    expect(mockChildComponent).toBeCalledWith({
        ping: "Pong"
    });
});
