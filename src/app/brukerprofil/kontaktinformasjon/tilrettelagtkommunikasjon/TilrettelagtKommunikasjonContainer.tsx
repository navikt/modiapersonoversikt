import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Reducer } from '../../../../redux/reducer';
import { VeilederRoller } from '../../../../models/veilederRoller';
import { Person } from '../../../../models/person/person';
import { CheckboksProps } from 'nav-frontend-skjema/src/checkboks-panel';
import { KodeverkResponse } from '../../../../models/kodeverk';
import Innholdslaster from '../../../../components/Innholdslaster';

import TilrettelagtKommunikasjonsForm from './TilrettelagtKommunikasjonForm';
import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

interface State {
    checkbokser: CheckboksProps[];
}

interface StateProps {
    tilrettelagtKommunikasjonReducer: Reducer<KodeverkResponse>;
}

interface OwnProps {
    person: Person;
    veilederRoller?: VeilederRoller;
}

type Props = StateProps & OwnProps;

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
    }

    render() {
        return (
            <Innholdslaster
                avhengigheter={[this.props.tilrettelagtKommunikasjonReducer]}
                returnOnError={onError}
            >

                <TilrettelagtKommunikasjonWrapper
                    tilrettelagtKommunikasjonKodeverk={this.props.tilrettelagtKommunikasjonReducer.data}
                    person={this.props.person}
                    veilederRoller={this.props.veilederRoller}
                />
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        tilrettelagtKommunikasjonReducer: state.tilrettelagtKommunikasjonKodeverk
    });
};

export default connect(mapStateToProps)(TilrettelagtKommunikasjonsContainer);
