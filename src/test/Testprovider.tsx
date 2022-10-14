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
import { InnstillingerContextProvider } from '../rest/resources/innstillingerResource';
import { ValgtEnhetProvider } from '../context/valgtenhet-state';

interface Props {
    children: ReactNode;
    customStore?: Store<AppState>;
}

function TestProvider({ children, customStore }: Props) {
    return (
        <Provider store={customStore || getTestStore()}>
            <InnstillingerContextProvider>
                <DialogpanelStateProvider>
                    <VisittkortStateProvider>
                        <MeldingsokProvider>
                            <ValgtEnhetProvider>
                                <StaticRouter context={{}}>
                                    <>{children}</>
                                </StaticRouter>
                            </ValgtEnhetProvider>
                        </MeldingsokProvider>
                    </VisittkortStateProvider>
                </DialogpanelStateProvider>
            </InnstillingerContextProvider>
        </Provider>
    );
}

export default TestProvider;
