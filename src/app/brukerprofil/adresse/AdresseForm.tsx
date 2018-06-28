import * as React from 'react';
import { FormEvent } from 'react';

import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import KnappBase from 'nav-frontend-knapper';

import { Person } from '../../../models/person/person';
import {
    Gateadresse,
    Matrikkeladresse,
    Personadresse,
    Postboksadresse,
    Utlandsadresse
} from '../../../models/personadresse';
import { FormKnapperWrapper } from '../BrukerprofilForm';
import { STATUS } from '../../../redux/utils';
import { RestReducer } from '../../../redux/reducer';
import RequestTilbakemelding from '../RequestTilbakemelding';
import MidlertidigAdresseNorge, {
    getGateadresseInput,
    getMatrikkeladresseInput,
    MidlertidigeAdresserNorgeInput,
    MidlertidigeAdresserNorgeInputValg
} from './midlertidigAdresseNorge/MidlertidigAdresseNorge';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { AdresseValg } from './AdresseValg';
import MidlertidigAdresseUtland from './midlertidigAdresseUtland/MidlertidigAdresseUtland';
import { validerGateadresse } from './midlertidigAdresseNorge/gateadresse/gateadresseValidator';
import { validerMatrikkeladresse } from './midlertidigAdresseNorge/matrikkeladresse/matrikkeladresseValidator';

function Tilbakemelding(props: { formErEndret: boolean, status: STATUS }) {
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
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endreAdresseReducer: RestReducer<{}>;
}

export enum Valg {
    FOLKEREGISTRERT, MIDLERTIDIG_NORGE, MIDLERTIDIG_UTLAND
}

interface State {
    midlertidigAdresseNorge: MidlertidigeAdresserNorgeInput;
    midlertidigAdresseUtland: Utlandsadresse;
    selectedRadio: Valg;
    formErEndret: boolean;
}

function getInitialAdresseTypeValg(alternativAdresse: Personadresse) {
    if (alternativAdresse.gateadresse) {
        return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    } else if (alternativAdresse.matrikkeladresse) {
        return MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE;
    } else if (alternativAdresse.postboksadresse) {
        return MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE;
    } else {
        return MidlertidigeAdresserNorgeInputValg.GATEADRESSE;
    }
}

class AdresseForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.initialState = this.initialState.bind(this);
        this.onAdresseValgChange = this.onAdresseValgChange.bind(this);
        this.onMidlertidigAdresseNorgeInput = this.onMidlertidigAdresseNorgeInput.bind(this);
        this.onMidlertidigAdresseUtlandInput = this.onMidlertidigAdresseUtlandInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAvbryt = this.onAvbryt.bind(this);

        this.state = this.initialState(props);
    }

    initialState(props: Props) {
        return {
            midlertidigAdresseNorge: this.initialMidlertidigAdresseNorge(props.person.alternativAdresse),
            midlertidigAdresseUtland: this.initialMidlertidigAdresseUtland(props.person.alternativAdresse),
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

    initialMidlertidigAdresseNorge(alternativAdresse: Personadresse | undefined) {
        if (!alternativAdresse) {
            return {
                gateadresse: getGateadresseInput(undefined),
                matrikkeladresse: getMatrikkeladresseInput(undefined),
                postboksadresse: this.initialPostboksadresse(undefined),
                valg: MidlertidigeAdresserNorgeInputValg.GATEADRESSE
            };
        }
        return {
            gateadresse: getGateadresseInput(alternativAdresse.gateadresse),
            matrikkeladresse: getMatrikkeladresseInput(alternativAdresse.matrikkeladresse),
            postboksadresse: this.initialPostboksadresse(alternativAdresse.postboksadresse),
            valg: getInitialAdresseTypeValg(alternativAdresse)
        };
    }

    initialMidlertidigAdresseUtland(alternativAdresse: Personadresse | undefined) {
        if (!alternativAdresse) {
            return this.initialUtlandsAdresse(undefined);
        }
        return this.initialUtlandsAdresse(alternativAdresse.utlandsadresse);
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

    onMidlertidigAdresseNorgeInput(adresser: MidlertidigeAdresserNorgeInput) {
        this.setState({
            midlertidigAdresseNorge: {
                ...adresser,
                gateadresseValidering: undefined
            },
            formErEndret: true
        });
    }

    onAdresseValgChange(valg: Valg) {
        this.setState({selectedRadio: valg});
    }

    initialUtlandsAdresse(utlandsAdresse: Utlandsadresse | undefined): Utlandsadresse {
        if (!utlandsAdresse) {
            return {
                landkode: {kodeRef: '', beskrivelse: ''},
                adresselinjer: [''],
                periode: {
                    fra: '',
                    til: ''
                }
            };
        }
        return utlandsAdresse;
    }

    onAvbryt(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.initialState(this.props));
        event.preventDefault();
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            this.submitMidlertidigNorskAdresse(this.state.midlertidigAdresseNorge);
        } else {
            console.error('Not implemented');
        }
    }

    submitMidlertidigNorskAdresse(input: MidlertidigeAdresserNorgeInput) {
        if (input.valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE) {
            this.submitGateadresse(input.gateadresse.input);
        } else if (input.valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE) {
            this.submitMatrikkeladresse(input.matrikkeladresse.input);
        } else {
            console.error('Not implemented');
        }
    }

    onMidlertidigAdresseUtlandInput(adresser: Utlandsadresse) {
        this.setState({
            midlertidigAdresseUtland: adresser,
            formErEndret: true
        });
    }

    submitGateadresse(gateadresse: Gateadresse) {
        const valideringsresultat = validerGateadresse(gateadresse);
        if (!valideringsresultat.formErGyldig) {
            this.setState({
                midlertidigAdresseNorge: {
                    ...this.state.midlertidigAdresseNorge,
                    gateadresse: {
                        input: gateadresse,
                        validering: valideringsresultat
                    }
                }
            });
            return;
        }

        this.props.endreNorskGateadresse(this.props.person.fødselsnummer, gateadresse);
    }

    submitMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
        const valideringsresultat = validerMatrikkeladresse(matrikkeladresse);
        if (!valideringsresultat.formErGyldig) {
            this.setState({
                midlertidigAdresseNorge: {
                    ...this.state.midlertidigAdresseNorge,
                    matrikkeladresse: {
                        input: matrikkeladresse,
                        validering: valideringsresultat
                    }
                }
            });
            return;
        }

        this.props.endreMatrikkeladresse(this.props.person.fødselsnummer, matrikkeladresse);
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
                    <MidlertidigAdresseUtland
                        midlertidigAdresseUtland={this.state.midlertidigAdresseUtland}
                        onChange={this.onMidlertidigAdresseUtlandInput}
                        visFeilmeldinger={false}
                        land={this.state.midlertidigAdresseUtland.landkode}
                    />
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
