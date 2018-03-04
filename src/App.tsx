import * as React from 'react';
import PersonPage from './components/person/PersonPage';

type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & {fodselsnummer: string};
import UnderArbeid from './components/underarbeid/UnderArbeid';

interface AppState {
    fodselsnummer: string;
}

interface AppProps {

}

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
        return (
            <div>
                <div id="header"/>
                <p className="App-intro">
                    Velkommen til nye, flotte personoversikten!
                </p>
                <UnderArbeid />
                <PersonPage fodselsnummer={this.state.fodselsnummer}/>
            </div>
        );
    }
}

export default App;
