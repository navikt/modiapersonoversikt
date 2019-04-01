import * as React from 'react';
import { FormEvent } from 'react';
import styled from 'styled-components';

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
import {
    default as MidlertidigAdresseNorge,
    getInitialGateadresseInput,
    getInitialMatrikkeladresseInput,
    getInitialPostboksadresse,
    MidlertidigeAdresserNorgeInput,
    MidlertidigeAdresserNorgeInputValg
} from './midlertidigAdresseNorge/MidlertidigAdresseNorge';
import {
    default as MidlertidigAdresseUtland,
    MidlertidigAdresseUtlandInputs,
    tomUtlandsadresse
} from './midlertidigAdresseUtland/MidlertidigAdresseUtland';
import { validerGateadresse } from './midlertidigAdresseNorge/gateadresse/gateadresseValidator';
import { validerMatrikkeladresse } from './midlertidigAdresseNorge/matrikkeladresse/matrikkeladresseValidator';
import { validerPostboksadresse } from './midlertidigAdresseNorge/postboksadresse/postboksadresseValidator';
import SubmitFeedback from './common/SubmitFeedback';
import { VeilederRoller } from '../../../models/veilederRoller';
import { FormFieldSet } from '../../personside/visittkort/body/VisittkortStyles';
import { veilederHarPåkrevdRolleForEndreAdresse } from '../utils/RollerUtils';
import { isFailed, isLoading, isNotStarted, isSuccess, RestResource } from '../../../redux/restReducers/restResource';
import {
    getValidUtlandsadresseForm,
    validerUtenlandsAdresse
} from './midlertidigAdresseUtland/midlertidigAdresseUtlandValidator';
import { EndreAdresseInfomelding } from '../Infomelding';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import FolkeregistrertAdresse from './FolkeregistrertAdresse';
import { loggEvent } from '../../../utils/frontendLogger';
import KnappMedBekreftPopup from '../../../components/KnappMedBekreftPopup';

interface Props {
    veilederRoller: VeilederRoller;
    person: Person;
    endreNorskGateadresse: (fødselsnummer: string, gateadresse: Gateadresse) => void;
    endreMatrikkeladresse: (fødselsnummer: string, matrikkeladresse: Matrikkeladresse) => void;
    endrePostboksadresse: (fødselsnummer: string, postboksadresse: Postboksadresse) => void;
    endreUtlandsadresse: (fødselsnummer: string, utlandsadresse: Utlandsadresse) => void;
    slettMidlertidigeAdresser: (fødselsnummer: string) => void;
    resetEndreAdresseResource: () => void;
    endreAdresseResource: RestResource<{}>;
    reloadPersonInfo: (fødselsnummer: string) => void;
}

export enum Valg {
    FOLKEREGISTRERT = 'folkeregistrert',
    MIDLERTIDIG_NORGE = 'midlertidigNorge',
    MIDLERTIDIG_UTLAND = 'midlertidigUtland'
}

function getValg(value: string): Valg {
    if (Valg.FOLKEREGISTRERT === value) {
        return Valg.FOLKEREGISTRERT;
    } else if (Valg.MIDLERTIDIG_NORGE === value) {
        return Valg.MIDLERTIDIG_NORGE;
    }
    return Valg.MIDLERTIDIG_UTLAND;
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

const Wrapper = styled.div`
    margin-top: 2em;
`;

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
        this.slettMidlertidigAdresse = this.slettMidlertidigAdresse.bind(this);
        this.state = this.getInitialState();
    }

    componentDidUpdate(prevProps: Props) {
        this.reloadOnEndret(prevProps);
        const nyeDataPåPerson = prevProps.person !== this.props.person;
        if (nyeDataPåPerson) {
            this.setState(this.getInitialState());
        }
    }

    reloadOnEndret(prevProps: Props) {
        if (!isSuccess(prevProps.endreAdresseResource) && isSuccess(this.props.endreAdresseResource)) {
            this.props.reloadPersonInfo(this.props.person.fødselsnummer);
        }
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

    initialRadioValg(): Valg {
        const { alternativAdresse } = this.props.person;

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
        const { midlertidigAdresseUtland, midlertidigAdresseNorge }: Partial<State> = this.getInitialState();
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
        const { midlertidigAdresseNorge }: Partial<State> = this.getInitialState();
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
        this.setState({ formErEndret: true });
        this.updateMidlertidigAdresseUtlandInputState(endring);
        this.resetResource();
    }

    onMidlertidigAdresseNorgeFormChange(adresse: Partial<MidlertidigeAdresserNorgeInput>) {
        this.updateMidlertidigAdresseNorgeInputState(adresse);
        this.setState({ formErEndret: true });
        this.resetResource();
    }

    onAdresseValgChange(event: React.SyntheticEvent<EventTarget>, value: string) {
        this.setState({ selectedRadio: getValg(value) });
        this.resetResource();
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
        this.resetResource();
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

    getAktivForm() {
        const endringsinfo =
            (this.props.person.alternativAdresse && this.props.person.alternativAdresse.endringsinfo) || undefined;

        if (this.state.selectedRadio === Valg.FOLKEREGISTRERT) {
            return <FolkeregistrertAdresse person={this.props.person} />;
        } else if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            return (
                <MidlertidigAdresseNorge
                    midlertidigAdresseNorge={this.state.midlertidigAdresseNorge}
                    onChange={this.onMidlertidigAdresseNorgeFormChange}
                    endringsinfo={endringsinfo}
                />
            );
        } else {
            return (
                <MidlertidigAdresseUtland
                    midlertidigAdresseUtland={this.state.midlertidigAdresseUtland}
                    onChange={this.onMidlertidigAdresseUtlandFormChange}
                    visFeilmeldinger={false}
                    endringsinfo={endringsinfo}
                />
            );
        }
    }

    onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ formErEndret: false });
        if (this.state.selectedRadio === Valg.MIDLERTIDIG_NORGE) {
            this.submitMidlertidigNorskAdresse(this.state.midlertidigAdresseNorge);
            loggEvent('Endre adresse', 'Brukerprofil', { type: 'Midlertidig Norsk adresse' });
        } else if (this.state.selectedRadio === Valg.MIDLERTIDIG_UTLAND) {
            this.submitMidlertidigUtenlandsadresse(this.state.midlertidigAdresseUtland);
            loggEvent('Endre adresse', 'Brukerprofil', { type: 'Midlertidig Utenlandsk adresse' });
        } else if (this.state.selectedRadio === Valg.FOLKEREGISTRERT) {
            this.submitSlettMidlertidigeAdresser();
            loggEvent('Endre adresse', 'Brukerprofil', { type: 'Folkeregistrert' });
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

    resetResource() {
        if (isNotStarted(this.props.endreAdresseResource)) {
            this.props.resetEndreAdresseResource();
        }
    }

    requestIsPending() {
        return isLoading(this.props.endreAdresseResource);
    }

    slettMidlertidigAdresse() {
        this.submitSlettMidlertidigeAdresser();
        loggEvent('Slett adresse', 'Brukerprofil', { type: 'klikk' });
    }

    render() {
        const kanEndreAdresse = veilederHarPåkrevdRolleForEndreAdresse(this.props.veilederRoller);

        const aktivForm = this.getAktivForm();
        const sletteKnapp =
            this.props.person.alternativAdresse && !this.requestIsPending() ? (
                <FormKnapperWrapper>
                    <KnappMedBekreftPopup
                        onBekreft={this.slettMidlertidigAdresse}
                        popUpTekst="Sikker på at du vil slette midlertidig addressse?"
                    >
                        Slett adresse
                    </KnappMedBekreftPopup>
                </FormKnapperWrapper>
            ) : null;

        return (
            <form onSubmit={this.onSubmit}>
                <FormFieldSet disabled={!kanEndreAdresse}>
                    <EndreAdresseInfomelding veilderRoller={this.props.veilederRoller} />
                    <RadioPanelGruppe
                        radios={[
                            { label: 'Bostedsadresse fra folkeregisteret', value: Valg.FOLKEREGISTRERT },
                            { label: 'Midlertidig adresse i Norge', value: Valg.MIDLERTIDIG_NORGE },
                            { label: 'Midlertidig adresse i utlandet', value: Valg.MIDLERTIDIG_UTLAND }
                        ]}
                        name={'Velg adressetype'}
                        checked={this.state.selectedRadio}
                        legend={''}
                        onChange={this.onAdresseValgChange}
                    />
                    <Wrapper>{aktivForm}</Wrapper>
                    <FormKnapperWrapper>
                        <KnappBase
                            type="standard"
                            onClick={this.onAvbryt}
                            disabled={
                                (!this.state.formErEndret && !isFailed(this.props.endreAdresseResource)) ||
                                this.requestIsPending()
                            }
                        >
                            Avbryt
                        </KnappBase>
                        <KnappBase
                            type="hoved"
                            spinner={isLoading(this.props.endreAdresseResource)}
                            autoDisableVedSpinner={true}
                            disabled={!this.state.formErEndret && !this.kanSletteMidlertidigeAdresser()}
                        >
                            Endre adresse
                        </KnappBase>
                    </FormKnapperWrapper>
                    {sletteKnapp}
                    <SubmitFeedback
                        visFeedback={!this.state.formErEndret}
                        status={this.props.endreAdresseResource.status}
                    />
                </FormFieldSet>
            </form>
        );
    }
}

export default AdresseForm;
