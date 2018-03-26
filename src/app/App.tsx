import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import getStore from './store';
import Routing, { paths } from '../routes/routing';
import UnderArbeid from '../components/underarbeid/UnderArbeid';
import { setupMock } from '../mock/setup-mock';
import { personOversiktTheme } from '../themes/personOversiktTheme';
import { ThemeProvider } from 'styled-components';
import AppWrapper from './AppWrapper';

type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & {fodselsnummer: string};

interface AppProps {

}

if (process.env.REACT_APP_MOCK === 'true') {
    setupMock();
}

const store = getStore();

class App extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
        this.handlePersonsok = this.handlePersonsok.bind(this);
    }

    componentDidMount() {
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
        document.addEventListener('dekorator-hode-fjernperson', this.handleFjernPerson);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
        document.removeEventListener('dekorator-hode-fjernperson', this.handleFjernPerson);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        window.location.href = `${paths.personUri}/${personsokEvent.fodselsnummer}`;
    }

    handleFjernPerson() {
        window.location.href = `/`;
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <AppWrapper>
                        <nav id="header"/>
                        <BrowserRouter>
                            <Routing />
                        </BrowserRouter>
                        <UnderArbeid />
                    </AppWrapper>
                </ThemeProvider>
            </Provider>
        );
    }
}

export default App;
