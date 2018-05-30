import * as React from 'react';
import { FormEvent } from 'react';
import { Action } from 'history';
import { connect, Dispatch } from 'react-redux';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { STATUS } from '../../redux/utils';
import { AppState } from '../../redux/reducer';
import { VeilederRoller } from '../../models/veilederRoller';
import { EndreTilrettelagtKommunikasjonrequest } from '../../redux/brukerprofil/endreTilrettelagtKommunikasjonrequest';
import { endreTilrettelagtKommunikasjon, reset } from '../../redux/brukerprofil/endreTilrettelagtKommunikasjon';
import { Person } from '../../models/person/person';
import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import { CheckboksProps } from 'nav-frontend-skjema/src/checkboks-panel';

const TilbakemeldingWrapper = styled.div`
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
}

type Props = DispatchProps & StateProps & OwnProps;

const tilretteLagtKommunikasjonAlternativer = () => [ // TODO gjeldende valg må hentes fra backend
    { label: 'Tolkehjelp', value: 'tolk', id: 'tolk', checked: false },
    { label: 'Ledsager', value: 'ledsager', id: 'ledsager', checked: false },
    { label: 'Muntlig kommunikasjon', value: 'muntlig', id: 'muntlig', checked: false },
    { label: 'Skriflig kommunikasjon', value: 'skriftlig', id: 'skriftlig', checked: false }
];

class TilrettelagtKommunikasjonsForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const checkbokser = tilretteLagtKommunikasjonAlternativer().map((checkboks) => {
                return { ...checkboks, disabled: !this.harVeilderPåkrevdRolle()};
            }
        );
        this.state = {
            checkbokser: checkbokser
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
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
        return tilretteLagtKommunikasjonAlternativer().some((tilrettelagtKommunikasjonsform) =>
            this.state.checkbokser.some((checkboks) =>
                checkboks.value === tilrettelagtKommunikasjonsform.value
                && checkboks.checked !== tilrettelagtKommunikasjonsform.checked
            )
        );
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
                <KnappBase
                    type="standard"
                    spinner={this.props.status === STATUS.PENDING}
                    disabled={!this.erEndret()}
                    autoDisableVedSpinner={true}
                >
                    Endre tilrettelagt kommunikasjon
                </KnappBase>
                <TilbakemeldingWrapper><Tilbakemelding status={this.props.status}/></TilbakemeldingWrapper>
            </form>

        );
    }
}

function Tilbakemelding(props: { status: STATUS }) {
    if (props.status === STATUS.OK) {
        return (
            <AlertStripe
                type={'suksess'}
            >
                Tilrettelagt kommunikasjon ble endret. Det kan ta noen minutter før endringene blir synlig.
            </AlertStripe>
        );
    } else if (props.status === STATUS.ERROR) {
        return (
            <AlertStripe type={'advarsel'}>Det skjedde en feil ved endring av tilrettelagt kommunikasjon.</AlertStripe>
        );
    } else {
        return null;
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
