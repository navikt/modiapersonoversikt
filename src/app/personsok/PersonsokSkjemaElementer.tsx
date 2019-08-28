import * as React from 'react';
import { PersonsokSkjemaProps } from './PersonsokSkjema';
import styled from 'styled-components';
import { Input } from 'nav-frontend-skjema';
import { ChangeEvent } from 'react';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import { Select } from 'nav-frontend-skjema';
import { Kjønn } from '../../models/person/person';
import theme from '../../styles/personOversiktTheme';
import { Systemtittel } from 'nav-frontend-typografi';
import moment from 'moment';
import { formaterDato } from '../../utils/stringFormatting';

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

function nullstill(props: PersonsokSkjemaProps) {
    props.actionsCriteria.settKontonummer('');
    props.actionsCriteria.settPostnummer('');
    props.actionsCriteria.settHusbokstav('');
    props.actionsCriteria.settHusnummer('');
    props.actionsCriteria.settGatenavn('');
    props.actionsCriteria.settEtternavn('');
    props.actionsCriteria.settFornavn('');
    props.actionsLimit.settKjonn('');
    props.actionsLimit.settAlderFra('');
    props.actionsLimit.settFodselsdatoTil(undefined);
    props.actionsLimit.settFodselsdatoFra(undefined);
}

function PersonsokSkjemaElementer(props: { form: PersonsokSkjemaProps }) {
    const stateLimit = props.form.stateLimit;
    return (
        <FormStyle>
            <SectionStyle>
                <section aria-label={'Søkekriterier'}>
                    <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                    <InputLinje>
                        <Input
                            bredde={'XL'}
                            label={'Fornavn (Fonetisk søk)'}
                            value={props.form.stateCriteria.fornavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsCriteria.settFornavn(event.target.value)
                            }
                        />
                        <Input
                            bredde={'XL'}
                            label={'Etternavn (Fonetisk søk)'}
                            value={props.form.stateCriteria.etternavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsCriteria.settEtternavn(event.target.value)
                            }
                        />
                    </InputLinje>
                    <InputLinje>
                        <Input
                            bredde={'L'}
                            label={'Gatenavn'}
                            value={props.form.stateCriteria.gatenavn}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsCriteria.settGatenavn(event.target.value)
                            }
                        />
                        <Input
                            bredde={'M'}
                            label={'Husnummer'}
                            value={props.form.stateCriteria.husnummer}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsCriteria.settHusnummer(event.target.value)
                            }
                        />
                        <Input
                            bredde={'M'}
                            label={'Husbokstav'}
                            value={props.form.stateCriteria.husbokstav}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsCriteria.settHusbokstav(event.target.value)
                            }
                        />
                    </InputLinje>
                    <Input
                        bredde={'M'}
                        label={'Postnummer'}
                        value={props.form.stateCriteria.postnummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actionsCriteria.settPostnummer(event.target.value)
                        }
                    />
                    <Input
                        bredde={'L'}
                        label={'Kontonummer (Norske nummer)'}
                        value={props.form.stateCriteria.kontonummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actionsCriteria.settKontonummer(event.target.value)
                        }
                    />
                </section>
                <section aria-label={'Begrens søket'}>
                    <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                    <Input
                        bredde={'M'}
                        label={'Bosted'}
                        value={stateLimit.kommunenummer}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            props.form.actionsLimit.settKommunenummer(event.target.value)
                        }
                    />
                    <InputLinje>
                        <DatovelgerStyle>
                            <DatolabelStyle>
                                <label htmlFor="personsok-datovelger-fra">Fødselsdato fra:</label>
                            </DatolabelStyle>
                            <Datovelger
                                input={{ id: 'personsok-datovelger-fra', name: 'Fødselsdato fra dato' }}
                                visÅrVelger={true}
                                valgtDato={stateLimit.fodselsdatoFra ? formaterDato(stateLimit.fodselsdatoFra) : ''}
                                onChange={dato => props.form.actionsLimit.settFodselsdatoFra(moment(dato).toDate())}
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
                                valgtDato={stateLimit.fodselsdatoTil ? formaterDato(stateLimit.fodselsdatoTil) : ''}
                                onChange={dato => props.form.actionsLimit.settFodselsdatoTil(moment(dato).toDate())}
                                id="personsok-datovelger-til"
                            />
                        </DatovelgerStyle>
                    </InputLinje>
                    <InputLinje>
                        <Input
                            bredde={'M'}
                            label={'Alder fra'}
                            value={stateLimit.alderFra}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsLimit.settAlderFra(event.target.value)
                            }
                        />
                        <Input
                            bredde={'M'}
                            label={'Alder til'}
                            value={stateLimit.alderTil}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                props.form.actionsLimit.settAlderTil(event.target.value)
                            }
                        />
                    </InputLinje>
                    <Select
                        label={'Kjønn'}
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            props.form.actionsLimit.settKjonn(event.target.value)
                        }
                    >
                        <option value={''} key={''}>
                            Velg Kjønn
                        </option>
                        <option value={Kjønn.Mann} key={'M'}>
                            M - Mann
                        </option>
                        <option value={Kjønn.Kvinne} key={'K'}>
                            K - Kvinne
                        </option>
                        <option value={Kjønn.Diskresjonskode} key={'D'}>
                            D - Diskresjonskode
                        </option>
                    </Select>
                </section>
            </SectionStyle>
            <KnappStyle>
                <Hovedknapp htmlType="submit">Send</Hovedknapp>
                <LenkeKnapp type="button" onClick={() => nullstill(props.form)}>
                    Nullstill
                </LenkeKnapp>
            </KnappStyle>
        </FormStyle>
    );
}

export default PersonsokSkjemaElementer;
