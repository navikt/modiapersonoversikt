import * as React from 'react';
import { PersonsokSkjemaProps } from './PersonsokSkjema';
import styled from 'styled-components';
import { Input } from 'nav-frontend-skjema';
import { ChangeEvent, useState } from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import { Select } from 'nav-frontend-skjema';
import { Kjønn } from '../../models/person/person';
import theme from '../../styles/personOversiktTheme';
import { Systemtittel } from 'nav-frontend-typografi';
import LenkeDrek from './LenkeDrek';
import { DatovelgerAvgrensninger } from 'nav-datovelger/dist/datovelger/types';

const FormStyle = styled.article`
    padding: ${theme.margin.layout};
`;

const SectionStyle = styled.div`
    display: flex;
    > *:first-child {
        padding-right: 3em;
    }
`;

const KnappStyle = styled.div`
    padding-top: ${theme.margin.layout};
    display: flex;
    justify-content: space-between;
`;

const InputLinje = styled.div`
    display: flex;
    .skjemaelement {
        padding-right: 0.5em;
    }
`;

const DatovelgerStyle = styled.div`
    flex-direction: column;
    padding-right: 0.5em;
    margin-bottom: 1em;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.375rem;
    font-weight: 400;
`;

const DatolabelStyle = styled.div`
    margin-bottom: 0.5em;
`;

function PersonsokSkjemaElementer(props: { form: PersonsokSkjemaProps }) {
    const [tilAvgrensing, settTilAvgrensing] = useState<DatovelgerAvgrensninger | undefined>(undefined);
    const datoChanger = (dato?: string) => {
        props.form.actions.settFodselsdatoFra(dato);
        settTilAvgrensing({ minDato: dato });
    };
    return (
        <FormStyle>
            <SectionStyle>
                <section aria-label={'Søkekriterier'}>
                    <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                    <InputLinje>
                        <Input
                            bredde={'XL'}
                            label={'Fornavn (Fonetisk søk)'}
                            value={props.form.state.fornavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settFornavn(event.target.value)
                            }
                        />
                        <Input
                            bredde={'XL'}
                            label={'Etternavn (Fonetisk søk)'}
                            value={props.form.state.etternavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settEtternavn(event.target.value)
                            }
                        />
                    </InputLinje>
                    <InputLinje>
                        <Input
                            bredde={'L'}
                            label={'Gatenavn'}
                            value={props.form.state.gatenavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settGatenavn(event.target.value)
                            }
                            feil={props.form.valideringsResultat.felter.gatenavn.skjemafeil}
                        />
                        <Input
                            bredde={'M'}
                            label={'Husnummer'}
                            value={props.form.state.husnummer}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settHusnummer(event.target.value)
                            }
                            feil={props.form.valideringsResultat.felter.husnummer.skjemafeil}
                        />
                        <Input
                            bredde={'M'}
                            label={'Husbokstav'}
                            value={props.form.state.husbokstav}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settHusbokstav(event.target.value)
                            }
                        />
                    </InputLinje>
                    <Input
                        bredde={'M'}
                        label={'Postnummer'}
                        value={props.form.state.postnummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actions.settPostnummer(event.target.value)
                        }
                        feil={props.form.valideringsResultat.felter.postnummer.skjemafeil}
                    />
                    <Input
                        bredde={'L'}
                        label={'Kontonummer (Norske nummer)'}
                        value={props.form.state.kontonummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actions.settKontonummer(event.target.value)
                        }
                        feil={props.form.valideringsResultat.felter.kontonummer.skjemafeil}
                    />
                </section>
                <section aria-label={'Begrens søket'}>
                    <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                    <Input
                        bredde={'M'}
                        label={'Bosted'}
                        value={props.form.state.kommunenummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actions.settKommunenummer(event.target.value)
                        }
                        feil={props.form.valideringsResultat.felter.kommunenummer.skjemafeil}
                    />
                    <InputLinje>
                        <DatovelgerStyle>
                            <DatolabelStyle>
                                <label htmlFor="personsok-datovelger-fra">Fødselsdato fra:</label>
                            </DatolabelStyle>
                            <Datovelger
                                input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                                visÅrVelger={true}
                                valgtDato={props.form.state.fodselsdatoFra}
                                onChange={datoChanger}
                                id="personsok-datovelger-fra"
                            />
                        </DatovelgerStyle>
                        <DatovelgerStyle>
                            <DatolabelStyle>
                                <label htmlFor="personsok-datovelger-til">Fødselsdato til:</label>
                            </DatolabelStyle>
                            <Datovelger
                                input={{ id: 'personsok-datovelger-til', name: 'Fødselsdato til dato' }}
                                visÅrVelger={true}
                                valgtDato={props.form.state.fodselsdatoTil}
                                onChange={dato => props.form.actions.settFodselsdatoTil(dato)}
                                id="personsok-datovelger-til"
                                avgrensninger={tilAvgrensing}
                            />
                        </DatovelgerStyle>
                    </InputLinje>
                    <InputLinje>
                        <Input
                            bredde={'M'}
                            label={'Alder fra'}
                            value={props.form.state.alderFra}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settAlderFra(event.target.value)
                            }
                            feil={props.form.valideringsResultat.felter.alderFra.skjemafeil}
                        />
                        <Input
                            bredde={'M'}
                            label={'Alder til'}
                            value={props.form.state.alderTil}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actions.settAlderTil(event.target.value)
                            }
                            feil={props.form.valideringsResultat.felter.alderTil.skjemafeil}
                        />
                    </InputLinje>
                    <Select
                        label={'Kjønn'}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            props.form.actions.settKjonn(event.target.value)
                        }
                    >
                        <option value={''} key={''}>
                            Velg Kjønn
                        </option>
                        <option value={Kjønn.Kvinne} key={'K'}>
                            K - Kvinne
                        </option>
                        <option value={Kjønn.Mann} key={'M'}>
                            M - Mann
                        </option>
                    </Select>
                </section>
            </SectionStyle>
            <LenkeDrek props={props.form.state} />
            <KnappStyle>
                <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
            </KnappStyle>
        </FormStyle>
    );
}

export default PersonsokSkjemaElementer;
