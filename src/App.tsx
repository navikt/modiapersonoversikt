import * as React from 'react';
import { Provider } from 'react-redux';

import PersonPage from './components/person/PersonPage';
import getStore from './store';
import UnderArbeid from './components/underarbeid/UnderArbeid';
import Startbilde from './components/startbilde/Startbilde';

type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & {fodselsnummer: string};

interface AppState {
    fodselsnummer: string;
}

interface AppProps {

}

const store = getStore();

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = { fodselsnummer: '' };
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
        this.setState(() => {
            return { fodselsnummer: personsokEvent.fodselsnummer};
        });
    }

    render() {
        const pageContent = this.state.fodselsnummer
            ? <PersonPage fodselsnummer={this.state.fodselsnummer}/>
            : <Startbilde/>;

        return (
            <Provider store={store}>
                <div>
                    <div id="header"/>
                    <p className="App-intro">
                        Velkommen til nye, flotte personoversikten!
                    </p>
                    <UnderArbeid />
                    {pageContent}
                </div>
            </Provider>
        );
    }
}

export default App;
