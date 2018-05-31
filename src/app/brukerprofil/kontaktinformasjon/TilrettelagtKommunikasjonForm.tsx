import * as React from 'react';
import { FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { STATUS } from '../../../redux/utils';
import { AppState } from '../../../redux/reducer';
import { VeilederRoller } from '../../../models/veilederRoller';
import {
    EndreTilrettelagtKommunikasjonrequest
} from
        '../../../redux/brukerprofil/endreTilrettelagtKommunikasjonrequest';
import { endreTilrettelagtKommunikasjon, reset } from '../../../redux/brukerprofil/endreTilrettelagtKommunikasjon';
import { Person } from '../../../models/person/person';
import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import { CheckboksProps } from 'nav-frontend-skjema/src/checkboks-panel';
import { KodeverkResponse } from '../../../models/kodeverk';
import RequestTilbakemelding from './RequestTilbakemelding';

const SubmitknappWrapper = styled.div`
  margin-top: 1em;
`;

interface State {
    checkbokser: CheckboksProps[];
}

interface DispatchProps {
    endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) => void;
    resetEndreTilrettelagtKommunikasjonReducer: () => void;
}

interface StateProps {
    status: STATUS;
}

interface OwnProps {
    person: Person;
    veilederRoller?: VeilederRoller;
    tilrettelagtKommunikasjonKodeverk: KodeverkResponse;
}

type Props = DispatchProps & StateProps & OwnProps;

class TilrettelagtKommunikasjonsForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            checkbokser: this.lagKnapper()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    lagKnapper() {
        const tilrettelagtKommunikasjonKodeverk = this.props.tilrettelagtKommunikasjonKodeverk.kodeverk;
        return tilrettelagtKommunikasjonKodeverk.map((kommunikasjonsmetode) => {
            return {
                label: kommunikasjonsmetode.beskrivelse,
                value: kommunikasjonsmetode.value,
                id: kommunikasjonsmetode.kodeRef,
                checked: this.props.person.tilrettelagtKomunikasjonsListe.some((tk) =>
                    tk.behovKode === kommunikasjonsmetode.kodeRef),
                disabled: !this.harVeilderPåkrevdRolle()
            };
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        this.props.endreTilrettelagtKommunikasjon({
            fødselsnummer: this.props.person.fødselsnummer // TODO må sende inn en gyldig request her
        });
        event.preventDefault();
    }

    handleOnChange(event: React.SyntheticEvent<EventTarget>, value?: string) {
        const newCheckboksState = this.state.checkbokser.map((checkboks: CheckboksProps) => {
                if (checkboks.value === value) {
                    return { ...checkboks, checked: !checkboks.checked };
                }
                return checkboks;
            }
        );
        this.setState({
            checkbokser: newCheckboksState
        });
    }

    harVeilderPåkrevdRolle() {
        if (!this.props.veilederRoller) {
            return false;
        }
        return this.props.veilederRoller.roller.includes('0000-GA-BD06_EndreKontaktAdresse');
    }

    erEndret() {
        return this.state.checkbokser.some((checkboks) => {
            const erTilrettelagt = this.props.person.tilrettelagtKomunikasjonsListe.some((tk) =>
                checkboks.id === tk.behovKode
            );
            const fjernet = !checkboks.checked && erTilrettelagt;
            const lagtTil = checkboks.checked && !erTilrettelagt;
            return fjernet || lagtTil;
        });
    }

    render() {
        const title = this.harVeilderPåkrevdRolle()
            ? ''
            : 'Du trenger AD-rolle 0000-GA-BD06_EndreKontaktAdresse for å endre dette';
        return (
            <form onSubmit={this.handleSubmit} title={title}>
                <Undertittel>Tilrettelagt kommunikasjon</Undertittel>
                <CheckboksPanelGruppe
                    checkboxes={this.state.checkbokser}
                    legend={''}
                    onChange={this.handleOnChange}
                />
                <SubmitknappWrapper>
                    <KnappBase
                        type="standard"
                        spinner={this.props.status === STATUS.PENDING}
                        disabled={!this.erEndret()}
                        title={!this.erEndret() ? 'Ingen endringer' : ''}
                        autoDisableVedSpinner={true}
                    >
                        Endre tilrettelagt kommunikasjon
                    </KnappBase>
                </SubmitknappWrapper>
                <RequestTilbakemelding
                    status={this.props.status}
                    onError={'Det skjedde en feil ved endring av tilrettelagt kommunikasjon.'}
                    onSuccess={`Tilrettelagt kommunikasjon ble endret.
                         Det kan ta noen minutter før endringene blir synlig.`}
                />
            </form>

        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        status: state.endreTilrettelagtKommunikasjon.status
    });
};

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        endreTilrettelagtKommunikasjon: (request: EndreTilrettelagtKommunikasjonrequest) =>
            dispatch(endreTilrettelagtKommunikasjon(request)),
        resetEndreTilrettelagtKommunikasjonReducer: () => dispatch(reset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TilrettelagtKommunikasjonsForm);
