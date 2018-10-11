import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'history';

import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';
import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import { AppState } from '../../../redux/reducers';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';

import TilrettelagtKommunikasjonsForm from './TilrettelagtKommunikasjonForm';
import * as tilrettelagtKommunikasjonKodeverkReducer from
        '../../../redux/restReducers/kodeverk/tilrettelagtKommunikasjonReducer';
import { STATUS } from '../../../redux/restReducers/utils';
import { RestReducer } from '../../../redux/restReducers/restReducer';

interface State {
    checkbokser: CheckboksProps[];
}

interface StateProps {
    tilrettelagtKommunikasjonKodeverkReducer: RestReducer<KodeverkResponse>;
}

interface DispatchProps {
    hentTilrettelagtKommunikasjonKodeverk: () => void;
}

interface OwnProps {
    person: Person;
}

type Props = StateProps & OwnProps & DispatchProps;

const onError = (
    <>
        <AlertStripe type="advarsel">
            Det skjedde en feil ved lasting av kodeverk for tilrettelagt kommunikasjon.
        </AlertStripe>
    </>
);

class TilrettelagtKommunikasjonsContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        if (this.props.tilrettelagtKommunikasjonKodeverkReducer.status === STATUS.NOT_STARTED) {
            this.props.hentTilrettelagtKommunikasjonKodeverk();
        }
    }

    render() {
        return (
            <div>
                <Undertittel>Tilrettelagt Kommunikasjon</Undertittel>
                <Innholdslaster
                    avhengigheter={[this.props.tilrettelagtKommunikasjonKodeverkReducer]}
                    returnOnError={onError}
                >
                    <TilrettelagtKommunikasjonsForm
                        person={this.props.person}
                        tilrettelagtKommunikasjonKodeverk={this.props.tilrettelagtKommunikasjonKodeverkReducer.data}
                    />
                </Innholdslaster>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
    return ({
        hentTilrettelagtKommunikasjonKodeverk:
            () => dispatch(tilrettelagtKommunikasjonKodeverkReducer.hentTilrettelagtKommunikasjon())
    });
};

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        tilrettelagtKommunikasjonKodeverkReducer: state.restEndepunkter.tilrettelagtKommunikasjonKodeverk
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TilrettelagtKommunikasjonsContainer);
