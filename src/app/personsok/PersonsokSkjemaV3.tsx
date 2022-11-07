import * as React from 'react';
import { PersonsokRequestV3, PersonsokResponse } from '../../models/person/personsok';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { lagRequestV3, PersonSokFormStateV3, validatorPersonsokV3 } from './personsokV3-utils';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { Systemtittel } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';
import LenkeDrekV2, { DrekPropsV2 } from './LenkeDrekV2';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { feilmelding } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import formstateFactory, { Values } from '@nutgaard/use-formstate';
import { Kjonn } from '../personside/visittkort-v2/PersondataDomain';
import PersonsokDatovelger from './PersonsokDatovelger';
import FormErrorSummary from '../../components/form/FormErrorSummary';

interface Props {
    setResponse: (response: FetchResponse<PersonsokResponse[]>) => void;
    setPosting: (posting: boolean) => void;
}
const FormStyle = styled.article`
    padding: ${theme.margin.layout};
    .skjemaelement {
        margin-bottom: 0.5rem;
    }
    .skjemaelement__label {
        margin-bottom: 0rem;
    }
`;

const SectionStyle = styled.section`
    display: flex;
    margin-bottom: 0.5rem;
    > *:first-child {
        margin-right: 10rem;
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

const initialValues: PersonSokFormStateV3 = {
    navn: '',
    kontonummer: '',
    utenlandskID: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: '',
    adresse: '',
    _minimumskrav: ''
};

const useFormstate = formstateFactory<PersonSokFormStateV3>(validatorPersonsokV3);

function PersonsokSkjemaV3(props: Props) {
    const formstate = useFormstate(initialValues);
    const hjelpetekstID = useRef(guid());

    function submitHandler(values: Values<PersonSokFormStateV3>): Promise<any> {
        props.setPosting(true);

        if (values.utenlandskID.length > 0) {
            loggEvent('PersonsokUtenlandsId', 'Personsok');
        }

        const request: PersonsokRequestV3 = lagRequestV3(values);
        return fetchToJson<PersonsokResponse[]>(`${apiBaseUri}/personsok/v3`, postConfig(request))
            .then((response) => {
                props.setPosting(false);
                props.setResponse(response);
            })
            .catch(() => {
                loggError(Error('Noe gikk galt - Personsøk'));
            });
    }

    const drekProps: DrekPropsV2 = {
        navn: formstate.fields.navn.input.value,
        fodselsdatoFra: formstate.fields.fodselsdatoFra.input.value,
        kjonn: formstate.fields.kjonn.input.value
    };

    const utenlandskIDTittel = [
        'Utenlandsk ID ',
        <Hjelpetekst id={hjelpetekstID.current}>Husk å inkludere alle tegn. Eksempel: 010101-12345</Hjelpetekst>
    ];

    const navnTittel = [
        'Navn (Fonetisk søk) ',
        <Hjelpetekst id={hjelpetekstID.current}>
            Dersom du er helt sikker på hvordan deler av ett navn staves så kan en benytte "" rundt det ordet du er
            sikker på og søkeløsningen vil prøve å finne eksakt match for dette ordet
        </Hjelpetekst>
    ];

    const adresseTittel = [
        'Adresse ',
        <Hjelpetekst id={hjelpetekstID.current}>
            Dersom du er helt sikker på hvordan deler av en adresse staves så kan en benytte "" rundt det ordet for å si
            at nøyaktig dette ordet må være med i adressen for å gi treff
        </Hjelpetekst>
    ];

    return (
        <form
            onSubmit={formstate.onSubmit(submitHandler)}
            onReset={() => {
                formstate.reinitialize(initialValues);
            }}
        >
            <FormStyle>
                <SectionStyle>
                    <section aria-label={'Søkekriterier'}>
                        <FormErrorSummary tittel={'For å kunne søke må du rette opp i følgende:'} />
                        <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                        <Input
                            bredde={'XL'}
                            label={navnTittel}
                            {...formstate.fields.navn.input}
                            feil={feilmelding(formstate.fields.navn)}
                        />
                        <Input
                            bredde={'XL'}
                            label={adresseTittel}
                            {...formstate.fields.adresse.input}
                            feil={feilmelding(formstate.fields.adresse)}
                        />
                        <Input
                            bredde={'L'}
                            label={'Kontonummer (Norske nummer)'}
                            {...formstate.fields.kontonummer.input}
                            feil={feilmelding(formstate.fields.kontonummer)}
                        />
                        <Input
                            bredde={'L'}
                            label={utenlandskIDTittel}
                            {...formstate.fields.utenlandskID.input}
                            feil={feilmelding(formstate.fields.utenlandskID)}
                        />
                    </section>
                    <section aria-label={'Begrens søket'}>
                        <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                        <InputLinje>
                            <PersonsokDatovelger form={formstate.fields} />
                        </InputLinje>
                        <InputLinje>
                            <Input
                                bredde={'M'}
                                label={'Alder fra'}
                                {...formstate.fields.alderFra.input}
                                feil={feilmelding(formstate.fields.alderFra)}
                            />
                            <Input
                                bredde={'M'}
                                label={'Alder til'}
                                {...formstate.fields.alderTil.input}
                                feil={feilmelding(formstate.fields.alderTil)}
                            />
                        </InputLinje>
                        <Select label={'Kjønn'} {...formstate.fields.kjonn.input}>
                            <option value={''} key={''}>
                                Velg Kjønn
                            </option>
                            <option value={Kjonn.K} key={'K'}>
                                K - Kvinne
                            </option>
                            <option value={Kjonn.M} key={'M'}>
                                M - Mann
                            </option>
                        </Select>
                    </section>
                </SectionStyle>
                <LenkeDrekV2 props={drekProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                    <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
                </KnappStyle>
            </FormStyle>
        </form>
    );
}

export default PersonsokSkjemaV3;
