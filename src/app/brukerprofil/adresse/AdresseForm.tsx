import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import Radio from 'nav-frontend-skjema/lib/radio';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import { KodeverkResponse } from '../../../models/kodeverk';
import { Gateadresse, Matrikkeladresse, Personadresse } from '../../../models/personadresse';
import { formatterRiktigAdresse } from '../../personside/visittkort/body/kontaktinformasjon/adresse/Adresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { EndreAdresseRequest } from '../../../api/brukerprofil/adresse-api';
import { STATUS } from '../../../redux/utils';
import { Reducer } from '../../../redux/reducer';
import RequestTilbakemelding from '../RequestTilbakemelding';
import MidlertidigAdresseNorge, { MidlertidigeAdresserNorge } from './MidlertidigAdresseNorge';

function Tilbakemelding(props: {formErEndret: boolean, status: STATUS}) {
    if (!props.formErEndret) {
        return null;
    }

    return (
        <RequestTilbakemelding
            status={props.status}
            onSuccess={'Adressen ble endret'}
            onError={'Det skjedde en feil ved endring av adresse'}
        />
    );
}

interface Props {
    person: Person;
    postnummer: KodeverkResponse;
    endreAdresse: (fødselsnummer: string, request: EndreAdresseRequest) => void;
    endreAdresseReducer: Reducer<{}>;
}

enum Valg {
    FOLKEREGISTRERT, MIDLERTIDIG_NORGE, MIDLERTIDIG_UTLAND
}

interface State {
    midlertidigAdresseNorge: MidlertidigeAdresserNorge;
    selectedRadio: Valg;
    formErEndret: boolean;
}

class AdresseForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.onMidlertidigAdresseNorgeInput = this.onMidlertidigAdresseNorgeInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAvbryt = this.onAvbryt.bind(this);

        this.state = this.initialState(props);
    }

    initialState(props: Props) {
        return {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorge(props.person.alternativAdresse),
            selectedRadio: this.initialRadioValg(),
            formErEndret: false
        };
    }

    initialRadioValg() {
        const {alternativAdresse} = this.props.person;

        if (alternativAdresse && alternativAdresse.utlandsadresse) {
            return Valg.MIDLERTIDIG_UTLAND;
        } else if (alternativAdresse) {
            return Valg.MIDLERTIDIG_NORGE;
        } else {
            return Valg.FOLKEREGISTRERT;
        }
    }

    intialMidlertidigAdresseNorge(alternativAdresse: Personadresse | undefined) {
        if (!alternativAdresse) {
            return {
                gateadresse: this.initialGateadresse(undefined),
                matrikkeladresse: this.initialMatrikkeladresse(undefined)
            };
        }
        return {
            gateadresse: this.initialGateadresse(alternativAdresse.gateadresse),
            matrikkeladresse: this.initialMatrikkeladresse(alternativAdresse.matrikkeladresse)
        };
    }

    initialGateadresse(gateadresse: Gateadresse | undefined): Gateadresse {
        if (!gateadresse) {
            return {
                gatenavn: '',
                poststed: '',
                postnummer: ''
            };
        }
        return gateadresse;
    }

    initialMatrikkeladresse(matrikkeladresse: Matrikkeladresse | undefined): Matrikkeladresse {
        if (!matrikkeladresse) {
            return {
                poststed: '',
                postnummer: ''
            };
        }
        return matrikkeladresse;
    }

    onAvbryt(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        event.preventDefault();
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        let request = {};
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            request = {
                norskAdresse: this.state.midlertidigAdresseNorge
            };
        }

        this.props.endreAdresse(this.props.person.fødselsnummer, request);
        event.preventDefault();
    }

    onMidlertidigAdresseNorgeInput(adresser: MidlertidigeAdresserNorge) {
        this.setState({
            midlertidigAdresseNorge: adresser,
            formErEndret: true
        });
    }

    render() {
        const {person} = this.props;
        const adresse = person.folkeregistrertAdresse ?
            formatterRiktigAdresse(person.folkeregistrertAdresse)
            : 'Ikke registrert';

        return (
            <form onSubmit={this.onSubmit}>
                <Undertittel>Adresse</Undertittel>
                <Radio
                    label="Bostedsadresse fra folkeregisteret"
                    name="folkeregistrertRadio"
                    onChange={() => this.setState({selectedRadio: Valg.FOLKEREGISTRERT})}
                    checked={this.state.selectedRadio === Valg.FOLKEREGISTRERT}
                />
                {adresse}
                <Radio
                    label="Midlertidig adresse i Norge"
                    name="midlertidigAdresseRadio"
                    onChange={() => this.setState({selectedRadio: Valg.MIDLERTIDIG_NORGE})}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE}
                />
                {this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE &&
                <MidlertidigAdresseNorge
                    midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                    onChange={this.onMidlertidigAdresseNorgeInput}
                    postnummerKodeverk={this.props.postnummer.kodeverk}
                />
                }
                <Radio
                    label="Midlertidig adresse i utlandet"
                    name="midlertidigAdresseUtlandRadio"
                    onChange={() => this.setState({selectedRadio: Valg.MIDLERTIDIG_UTLAND})}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND}
                />
                <FormKnapperWrapper>
                    <KnappBase
                        type="standard"
                        onClick={this.onAvbryt}
                        disabled={!this.state.formErEndret}
                    >
                        Avbryt
                    </KnappBase>
                    <KnappBase
                        type="hoved"
                        spinner={this.props.endreAdresseReducer.status === STATUS.PENDING}
                        autoDisableVedSpinner={true}
                        disabled={!this.state.formErEndret}
                    >
                        Endre adresse
                    </KnappBase>
                </FormKnapperWrapper>
                <Tilbakemelding
                    formErEndret={this.state.formErEndret}
                    status={this.props.endreAdresseReducer.status}
                />
            </form>
        );
    }

}

export default AdresseForm;
