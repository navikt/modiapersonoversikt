import * as React from 'react';
import AppContainer from './AppContainer';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    const { unmount } = render(
        <div id="root">
            <AppContainer />
        </div>
    );
    unmount();
});
