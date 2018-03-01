import * as React from 'react';
import UnderArbeid from './components/underarbeid/UnderArbeid';

class App extends React.Component {
    render() {
        return (
            <div>
                <div id="header"/>
                <p className="App-intro">
                    Velkommen til nye, flotte personoversikten!
                </p>
                <UnderArbeid />
            </div>
        );
    }
}

export default App;
