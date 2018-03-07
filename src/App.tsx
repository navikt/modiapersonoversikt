import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import getStore from './store';
import Routing from './routing';
import UnderArbeid from './components/underarbeid/UnderArbeid';

type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & {fodselsnummer: string};

interface AppProps {

}

const store = getStore();

class App extends React.Component<AppProps> {

    constructor(props: AppProps) {
        super(props);
        this.handlePersonsok = this.handlePersonsok.bind(this);
    }

    componentDidMount() {
        document.addEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    componentWillUnmount() {
        document.removeEventListener('dekorator-hode-personsok', this.handlePersonsok);
    }

    handlePersonsok(event: object) {
        const personsokEvent = event as DecoratorPersonsokEvent;
        window.location.href = `/person/${personsokEvent.fodselsnummer}`;
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <header id="header"/>
                    <UnderArbeid />
                    <BrowserRouter>
                        <Routing />
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
