import * as React from 'react';
import { FormEvent } from 'react';

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
import MidlertidigAdresseNorge, {
    getInitialGateadresseInput,
    getInitialMatrikkeladresseInput,
    getInitialPostboksadresse,
    MidlertidigeAdresserNorgeInput,
    MidlertidigeAdresserNorgeInputValg
} from './midlertidigAdresseNorge/MidlertidigAdresseNorge';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { AdresseValg } from './AdresseValg';
import MidlertidigAdresseUtland, { MidlertidigAdresseUtlandInputs, tomUtlandsadresse }
    from './midlertidigAdresseUtland/MidlertidigAdresseUtland';
import { validerGateadresse } from './midlertidigAdresseNorge/gateadresse/gateadresseValidator';
import { validerMatrikkeladresse } from './midlertidigAdresseNorge/matrikkeladresse/matrikkeladresseValidator';
import { validerPostboksadresse } from './midlertidigAdresseNorge/postboksadresse/postboksadresseValidator';
import SubmitFeedback from './common/SubmitFeedback';
import { VeilederRoller } from '../../../models/veilederRoller';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreAdresse } from '../utils/RollerUtils';
import { EndreAdresseInfomelding } from '../Infomelding';
import { getValidUtlandsadresseForm, validerUtenlandsAdresse }
    from './midlertidigAdresseUtland/midlertidigAdresseUtlandValidator';

interface Props {
    veilederRoller: VeilederRoller;
    person: Person;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) => void;
    endreUtlandsadresse: (fødselsnummer: string, utlandsadresse: Utlandsadresse) => void;
    slettMidlertidigeAdresser: (fødselsnummer: string) => void;
    resetEndreAdresseReducer: () => void;
    endreAdresseReducer: RestReducer<{}>;
}

export enum Valg {
    FOLKEREGISTRERT, MIDLERTIDIG_NORGE, MIDLERTIDIG_UTLAND
}

interface State {
    midlertidigAdresseNorge: MidlertidigeAdresserNorgeInput;
    midlertidigAdresseUtland: MidlertidigAdresseUtlandInputs;
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
        this.getInitialState = this.getInitialState.bind(this);
        this.onAdresseValgChange = this.onAdresseValgChange.bind(this);
        this.updateMidlertidigAdresseNorgeInputState = this.updateMidlertidigAdresseNorgeInputState.bind(this);
        this.onMidlertidigAdresseUtlandFormChange = this.onMidlertidigAdresseUtlandFormChange.bind(this);
        this.onMidlertidigAdresseNorgeFormChange = this.onMidlertidigAdresseNorgeFormChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAvbryt = this.onAvbryt.bind(this);

        this.state = this.getInitialState();
    }

    getInitialState(): State {
        const props = this.props;
        const alternativAdresse = props.person.alternativAdresse ? props.person.alternativAdresse : {};
        return {
            midlertidigAdresseNorge: this.intialMidlertidigAdresseNorgeInput(alternativAdresse),
            midlertidigAdresseUtland: this.initialMidlertidigAdresseUtland(alternativAdresse),
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

    intialMidlertidigAdresseNorgeInput(alternativAdresse: Personadresse): MidlertidigeAdresserNorgeInput {
        return {
            gateadresse: getInitialGateadresseInput(alternativAdresse.gateadresse),
            matrikkeladresse: getInitialMatrikkeladresseInput(alternativAdresse.matrikkeladresse),
            postboksadresse: getInitialPostboksadresse(alternativAdresse.postboksadresse),
            valg: getInitialAdresseTypeValg(alternativAdresse)
        };
    }

    initialMidlertidigAdresseUtland(alternativAdresse: Personadresse | undefined) {
        if (!alternativAdresse) {
            return this.initialUtlandsAdresse(undefined);
        }
        return this.initialUtlandsAdresse(alternativAdresse.utlandsadresse);
    }

    resetStateToInitalAdresse() {
        const {midlertidigAdresseUtland, midlertidigAdresseNorge}: Partial<State> = this.getInitialState();
        this.setState({
            midlertidigAdresseUtland,
            midlertidigAdresseNorge
        });
    }

    updateMidlertidigAdresseNorgeInputState(adresse: Partial<MidlertidigeAdresserNorgeInput>) {
        this.setState(
            {
                midlertidigAdresseNorge: {
                    ...this.state.midlertidigAdresseNorge,
                    ...adresse
                }
            },
            adresse.valg ? this.clearMidlertidigAdresseNorge : undefined
        );
    }

    clearMidlertidigAdresseNorge() {
        const {midlertidigAdresseNorge}: Partial<State> = this.getInitialState();
        this.setState({
            midlertidigAdresseNorge: {
                ...midlertidigAdresseNorge,
                valg: this.state.midlertidigAdresseNorge.valg
            }
        });
    }

    updateMidlertidigAdresseUtlandInputState(endring: Partial<Utlandsadresse>) {
        this.setState({
            midlertidigAdresseUtland: {
                validering: getValidUtlandsadresseForm(tomUtlandsadresse),
                value: {
                    ...this.state.midlertidigAdresseUtland.value,
                    ...endring
                }
            }
        });
    }

    onMidlertidigAdresseUtlandFormChange(endring: Partial<Utlandsadresse>) {
        this.setState({formErEndret: true});
        this.updateMidlertidigAdresseUtlandInputState(endring);
        this.resetReducer();
    }

    onMidlertidigAdresseNorgeFormChange(adresse: Partial<MidlertidigeAdresserNorgeInput>) {
        this.updateMidlertidigAdresseNorgeInputState(adresse);
        this.setState({formErEndret: true});
        this.resetReducer();
    }

    onAdresseValgChange(valg: Valg) {
        this.setState({selectedRadio: valg});
        this.resetReducer();
        this.resetStateToInitalAdresse();
    }

    initialUtlandsAdresse(utlandsAdresse: Utlandsadresse | undefined): MidlertidigAdresseUtlandInputs {
        if (!utlandsAdresse) {
            return {
                value: tomUtlandsadresse,
                validering: getValidUtlandsadresseForm(tomUtlandsadresse)
            };
        }
        return {
            value: utlandsAdresse,
            validering: getValidUtlandsadresseForm(tomUtlandsadresse)
        };
    }

    onAvbryt(event: React.MouseEvent<HTMLButtonElement>) {
        this.setState(this.getInitialState());
        this.resetReducer();
        event.preventDefault();
    }

    kanSletteMidlertidigeAdresser() {
        if (!(this.state.selectedRadio === Valg.FOLKEREGISTRERT)) {
            return false;
        }

        if (this.props.person.alternativAdresse) {
            return true;
        } else {
            return false;
        }
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({formErEndret: false});
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            this.submitMidlertidigNorskAdresse(this.state.midlertidigAdresseNorge);
        } else if (this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND) {
            this.submitMidlertidigUtenlandsadresse(this.state.midlertidigAdresseUtland);
        } else if (this.state.selectedRadio === Valg.FOLKEREGISTRERT) {
            this.submitSlettMidlertidigeAdresser();
        } else {
            console.error('Not implemented');
        }
    }

    submitMidlertidigUtenlandsadresse(midlertidigAdresseUtland: MidlertidigAdresseUtlandInputs) {
        const validering = validerUtenlandsAdresse(midlertidigAdresseUtland.value);
        if (!validering.formErGyldig) {
            this.setState({
                midlertidigAdresseUtland: {
                    ...this.state.midlertidigAdresseUtland,
                    validering: validering
                }
            });
            return;
        }
        this.props.endreUtlandsadresse(this.props.person.fødselsnummer, midlertidigAdresseUtland.value);
    }

    submitSlettMidlertidigeAdresser() {
        this.props.slettMidlertidigeAdresser(this.props.person.fødselsnummer);
    }

    submitMidlertidigNorskAdresse(input: MidlertidigeAdresserNorgeInput) {
        if (input.valg === MidlertidigeAdresserNorgeInputValg.GATEADRESSE) {
            this.submitGateadresse(input.gateadresse.value);
        } else if (input.valg === MidlertidigeAdresserNorgeInputValg.MATRIKKELADRESSE) {
            this.submitMatrikkeladresse(input.matrikkeladresse.value);
        } else if (input.valg === MidlertidigeAdresserNorgeInputValg.POSTBOKSADRESSE) {
            this.submitPostboksadresse(input.postboksadresse.value);
        } else {
            console.error('Not implemented');
        }
    }

    submitGateadresse(gateadresse: Gateadresse) {
        const validering = validerGateadresse(gateadresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                gateadresse: {
                    value: gateadresse,
                    validering
                }
            });
            return;
        }

        this.props.endreNorskGateadresse(this.props.person.fødselsnummer, gateadresse);
    }

    submitMatrikkeladresse(matrikkeladresse: Matrikkeladresse) {
        const validering = validerMatrikkeladresse(matrikkeladresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                matrikkeladresse: {
                    value: matrikkeladresse,
                    validering
                }
            });
            return;
        }

        this.props.endreMatrikkeladresse(this.props.person.fødselsnummer, matrikkeladresse);
    }

    submitPostboksadresse(postboksadresse: Postboksadresse) {
        const validering = validerPostboksadresse(postboksadresse);
        if (!validering.formErGyldig) {
            this.updateMidlertidigAdresseNorgeInputState({
                postboksadresse: {
                    value: postboksadresse,
                    validering
                }
            });
            return;
        }
        this.props.endrePostboksadresse(this.props.person.fødselsnummer, postboksadresse);
    }

    resetReducer() {
        if (this.props.endreAdresseReducer.status !== STATUS.NOT_STARTED) {
            this.props.resetEndreAdresseReducer();
        }
    }

    render() {
        const kanEndreAdresse = veilederHarPåkrevdRolleForEndreAdresse(this.props.veilederRoller);
        return (
            <form onSubmit={this.onSubmit}>
                <FormFieldSet disabled={!kanEndreAdresse}>
                    <EndreAdresseInfomelding
                        veilderRoller={this.props.veilederRoller}
                    />
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
                            onChange={this.onMidlertidigAdresseNorgeFormChange}
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
                            onChange={this.onMidlertidigAdresseUtlandFormChange}
                            visFeilmeldinger={false}
                        />
                    </AdresseValg>
                    <FormKnapperWrapper>
                        <KnappBase
                            type="standard"
                            onClick={this.onAvbryt}
                            disabled={
                                !this.state.formErEndret && this.props.endreAdresseReducer.status !== STATUS.ERROR
                            }
                        >
                            Avbryt
                        </KnappBase>
                        <KnappBase
                            type="hoved"
                            spinner={this.props.endreAdresseReducer.status === STATUS.PENDING}
                            autoDisableVedSpinner={true}
                            disabled={!this.state.formErEndret && !this.kanSletteMidlertidigeAdresser()}
                        >
                            Endre adresse
                        </KnappBase>
                    </FormKnapperWrapper>
                    <SubmitFeedback
                        visFeedback={!this.state.formErEndret}
                        status={this.props.endreAdresseReducer.status}
                    />
                </FormFieldSet>
            </form>
        );
    }

}

export default AdresseForm;
