import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState, Reducer } from '../../../redux/reducer';
import { VeilederRoller } from '../../../models/veilederRoller';
import { Person } from '../../../models/person/person';
import { CheckboksProps } from 'nav-frontend-skjema/src/checkboks-panel';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';

import TilrettelagtKommunikasjonsForm from './TilrettelagtKommunikasjonForm';
import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import * as tilrettelagtKommunikasjonKodeverkReducer from '../../../redux/kodeverk/tilrettelagtKommunikasjonReducer';
import { Action } from 'history';
import { STATUS } from '../../../redux/utils';

interface State {
    checkbokser: CheckboksProps[];
}

interface StateProps {
    tilrettelagtKommunikasjonKodeverkReducer: Reducer<KodeverkResponse>;
}

interface DispatchProps {
    hentTilrettelagtKommunikasjonKodeverk: () => void;
}

interface OwnProps {
    person: Person;
    veilederRoller?: VeilederRoller;
}

type Props = StateProps & OwnProps & DispatchProps;

const onError = (
    <>
        <Undertittel>Tilrettelagt kommunikasjon</Undertittel>
        <AlertStripe type="advarsel">
            Det skjedde en feil ved lasting av kodeverk for tilrettelagt kommunikasjon.
        </AlertStripe>
    </>
);

interface TilrettelagtKommunikasjonWrapperProps {
    veilederRoller?: VeilederRoller;
    person: Person;
    tilrettelagtKommunikasjonKodeverk: KodeverkResponse | undefined;
}

function TilrettelagtKommunikasjonWrapper({ veilederRoller, person, tilrettelagtKommunikasjonKodeverk }:
                                              TilrettelagtKommunikasjonWrapperProps) {
    if (tilrettelagtKommunikasjonKodeverk) {
        return (
            <TilrettelagtKommunikasjonsForm
                veilederRoller={veilederRoller}
                person={person}
                tilrettelagtKommunikasjonKodeverk={tilrettelagtKommunikasjonKodeverk}
            />
        );
    } else {
        return onError;
    }
}

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
                    <TilrettelagtKommunikasjonWrapper
                        tilrettelagtKommunikasjonKodeverk={this.props.tilrettelagtKommunikasjonKodeverkReducer.data}
                        person={this.props.person}
                        veilederRoller={this.props.veilederRoller}
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
        tilrettelagtKommunikasjonKodeverkReducer: state.tilrettelagtKommunikasjonKodeverk
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(TilrettelagtKommunikasjonsContainer);
