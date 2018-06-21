import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import { Gateadresse, Matrikkeladresse, Personadresse, Postboksadresse } from '../../../models/personadresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { EndreAdresseRequest } from '../../../api/brukerprofil/adresse-api';
import { STATUS } from '../../../redux/utils';
import { RestReducer } from '../../../redux/reducer';
import RequestTilbakemelding from '../RequestTilbakemelding';
import MidlertidigAdresseNorge, { MidlertidigeAdresserNorge } from './MidlertidigAdresseNorge';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { AdresseValg } from './AdresseValg';

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
    endreAdresse: (fødselsnummer: string, request: EndreAdresseRequest) => void;
    endreAdresseReducer: RestReducer<{}>;
}

export enum Valg {
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
        this.onAdresseValgChange = this.onAdresseValgChange.bind(this);
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
                matrikkeladresse: this.initialMatrikkeladresse(undefined),
                postboksadresse: this.initialPostboksadresse(undefined)
            };
        }
        return {
            gateadresse: this.initialGateadresse(alternativAdresse.gateadresse),
            matrikkeladresse: this.initialMatrikkeladresse(alternativAdresse.matrikkeladresse),
            postboksadresse: this.initialPostboksadresse(alternativAdresse.postboksadresse)
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

    initialPostboksadresse(postboksadresse: Postboksadresse | undefined): Postboksadresse {
        if (!postboksadresse) {
            return {
                postboksnummer: '',
                poststed: '',
                postnummer: ''
            };
        }
        return postboksadresse;
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

    onAdresseValgChange(valg: Valg) {
        this.setState({selectedRadio: valg});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Undertittel>Adresse</Undertittel>
                <AdresseValg
                    label={'Bostedsadresse fra folkeregisteret'}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.FOLKEREGISTRERT}
                    valg={Valg.FOLKEREGISTRERT}
                />
                <FolkeregistrertAdresse person={this.props.person}/>
                <AdresseValg
                    label={'Midlertidig adresse i Norge'}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE}
                    valg={Valg.MIDLERTIDIG_NORGE}
                >
                    <MidlertidigAdresseNorge
                        midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                        onChange={this.onMidlertidigAdresseNorgeInput}
                    />
                </AdresseValg>
                <AdresseValg
                    label="Midlertidig adresse i utlandet"
                    valg={Valg.MIDLERTIDIG_UTLAND}
                    onAdresseValgChange={this.onAdresseValgChange}
                    checked={this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND}
                >
                    <span>Utenlandsk adresseform</span>
                </AdresseValg>
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
                <Tilbakemelding formErEndret={this.state.formErEndret} status={this.props.endreAdresseReducer.status}/>
            </form>
        );
    }

}

export default AdresseForm;
