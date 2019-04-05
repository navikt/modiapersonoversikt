import * as React from 'react';
import { connect } from 'react-redux';

import { CheckboksProps } from 'nav-frontend-skjema/lib/checkboks-panel';
import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';

import { AppState } from '../../../redux/reducers';
import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import Innholdslaster from '../../../components/Innholdslaster';

import TilrettelagtKommunikasjonsForm from './TilrettelagtKommunikasjonForm';
import { hentTilrettelagtKommunikasjon } from '../../../redux/restReducers/kodeverk/tilrettelagtKommunikasjonReducer';
import { isNotStarted, Loaded, DeprecatedRestResource } from '../../../redux/restReducers/deprecatedRestResource';
import { AsyncDispatch } from '../../../redux/ThunkTypes';

interface State {
    checkbokser: CheckboksProps[];
}

interface StateProps {
    tilrettelagtKommunikasjonKodeverkResource: DeprecatedRestResource<KodeverkResponse>;
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

        if (isNotStarted(this.props.tilrettelagtKommunikasjonKodeverkResource)) {
            this.props.hentTilrettelagtKommunikasjonKodeverk();
        }
    }

    render() {
        return (
            <div>
                <Undertittel>Tilrettelagt Kommunikasjon</Undertittel>
                <Innholdslaster
                    avhengigheter={[this.props.tilrettelagtKommunikasjonKodeverkResource]}
                    returnOnError={onError}
                >
                    <TilrettelagtKommunikasjonsForm
                        person={this.props.person}
                        tilrettelagtKommunikasjonKodeverk={
                            (this.props.tilrettelagtKommunikasjonKodeverkResource as Loaded<KodeverkResponse>).data
                        }
                    />
                </Innholdslaster>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: AsyncDispatch): DispatchProps => {
    return {
        hentTilrettelagtKommunikasjonKodeverk: () => dispatch(hentTilrettelagtKommunikasjon())
    };
};

const mapStateToProps = (state: AppState): StateProps => {
    return {
        tilrettelagtKommunikasjonKodeverkResource: state.restResources.tilrettelagtKommunikasjonKodeverk
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TilrettelagtKommunikasjonsContainer);
