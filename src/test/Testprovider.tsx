import * as React from 'react';
import { ReactNode } from 'react';
import { getTestStore } from './testStore';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { AppState } from '../redux/reducers';
import { MeldingsokProvider } from '../context/meldingsok';
import { VisittkortStateProvider } from '../context/visittkort-state';
import { DialogpanelStateProvider } from '../context/dialogpanel-state';

interface Props {
    children: ReactNode;
    customStore?: Store<AppState>;
}

function TestProvider({ children, customStore }: Props) {
    return (
        <Provider store={customStore || getTestStore()}>
            <DialogpanelStateProvider>
                <VisittkortStateProvider>
                    <MeldingsokProvider>
                        <StaticRouter context={{}}>
                            <>{children}</>
                        </StaticRouter>
                    </MeldingsokProvider>
                </VisittkortStateProvider>
            </DialogpanelStateProvider>
        </Provider>
    );
}

export default TestProvider;
