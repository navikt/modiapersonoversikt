import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import type { AppState } from '../redux/reducers';
import { renderWithProviders as renderWithSharedProviders } from './Testprovider';
import { getTestStore } from './testStore';

export const renderWithProviders = (children: ReactElement, customStore?: Store<AppState>) => {
    const store = customStore || getTestStore();

    return renderWithSharedProviders(
        <Provider store={store}>{children}</Provider>,
        store.getState().gjeldendeBruker.fødselsnummer
    );
};
