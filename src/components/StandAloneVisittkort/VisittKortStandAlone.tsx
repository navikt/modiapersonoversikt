import * as React from 'react';
import { personOversiktTheme } from '../../themes/personOversiktTheme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import thunkMiddleware from 'redux-thunk';
import reducers from './StandAloneVisittkortReducer';
import { applyMiddleware, createStore } from 'redux';
import { hentAllPersonData } from '../../redux/personinformasjon';
import StandAloneVisittKortContainer from './VisittKortLaster';

interface Props {
    fødselsnummer: string;
}

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

class VisittkortStandAlone extends React.Component<Props> {
    componentWillMount() {
        hentAllPersonData(store.dispatch, this.props.fødselsnummer);
    }

    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={personOversiktTheme}>
                    <StandAloneVisittKortContainer />
                </ThemeProvider>
            </Provider>
        );
    }
}

export default VisittkortStandAlone;