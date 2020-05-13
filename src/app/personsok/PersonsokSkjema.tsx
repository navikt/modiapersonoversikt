import * as React from 'react';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { PersonSokFormState, lagRequest } from './personsokUtils';
import { loggError } from '../../utils/logger/frontendLogger';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { required } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/skjermetPerson/oppgaveSkjemaValidatorSkjermetPerson';
import { Systemtittel } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';
import PersonsokDatovelger from './PersonsokDatovelger';
import { Kjønn } from '../../models/person/person';
import LenkeDrek, { DrekProps } from './LenkeDrek';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';

interface Props {
    setResponse: (response: FetchResponse<PersonsokResponse[]>) => void;
    setPosting: (posting: boolean) => void;
}
const FormStyle = styled.article`
    padding: ${theme.margin.layout};
`;

const SectionStyle = styled.section`
    display: flex;
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
const validator = useFormstate<PersonSokFormState>({
    fornavn: required('Du må velge fornavn'),
    etternavn: required('Du må velge etternavn'),
    gatenavn: required('Du må velge gatenavn'),
    husnummer: required('Du må velge husnummer'),
    husbokstav: required('Du må velge husbokstav'),
    postnummer: required('Du må velge postnummer'),
    kontonummer: required('Du må velge kontonummer'),
    kommunenummer: required('Du må velge kommunenummer'),
    fodselsdatoFra: required('Du må velge fodselsdatoFra'),
    fodselsdatoTil: required('Du må velge fodselsdatoTil'),
    alderFra: required('Du må velge alderFra'),
    alderTil: required('Du må velge alderTil'),
    kjonn: required('Du må velge kjonn')
});

function PersonsokSkjema(props: Props) {
    const initialValues = {
        fornavn: '',
        etternavn: '',
        gatenavn: '',
        husnummer: '',
        husbokstav: '',
        postnummer: '',
        kontonummer: '',
        kommunenummer: '',
        fodselsdatoFra: '',
        fodselsdatoTil: '',
        alderFra: '',
        alderTil: '',
        kjonn: ''
    };
    const state = validator(initialValues);

    function submitHandler<S>(values: Values<PersonSokFormState>): Promise<any> {
        props.setPosting(true);
        const request: PersonsokRequest = lagRequest(values);
        return fetchToJson<PersonsokResponse[]>(`${apiBaseUri}/personsok`, postConfig(request))
            .then(response => {
                props.setPosting(false);
                props.setResponse(response);
            })
            .catch(() => {
                loggError(Error('Noe gikk galt - Personsøk'));
            });
    }

    const drekProps: DrekProps = {
        fornavn: state.fields.fornavn.input.value,
        etternavn: state.fields.etternavn.input.value,
        fodselsdatoFra: state.fields.fodselsdatoFra?.input.value,
        kjonn: state.fields.kjonn.input.value
    };

    return (
        <form
            onSubmit={state.onSubmit(submitHandler)}
            onReset={() => {
                state.reinitialize(initialValues);
            }}
        >
            <FormStyle>
                <SectionStyle>
                    <section aria-label={'Søkekriterier'}>
                        <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                        <InputLinje>
                            <Input bredde={'XL'} label={'Fornavn (Fonetisk søk)'} {...state.fields.fornavn.input} />
                            <Input bredde={'XL'} label={'Etternavn (Fonetisk søk)'} {...state.fields.etternavn.input} />
                        </InputLinje>
                        <InputLinje>
                            <Input bredde={'L'} label={'Gatenavn'} {...state.fields.gatenavn.input} />
                            <Input bredde={'M'} label={'Husnummer'} {...state.fields.husnummer.input} />
                            <Input bredde={'M'} label={'Husbokstav'} {...state.fields.husbokstav.input} />
                        </InputLinje>
                        <Input bredde={'M'} label={'Postnummer'} {...state.fields.postnummer.input} />
                        <Input bredde={'L'} label={'Kontonummer (Norske nummer)'} {...state.fields.kontonummer.input} />
                    </section>
                    <section aria-label={'Begrens søket'}>
                        <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                        <Input bredde={'M'} label={'Bosted'} {...state.fields.kommunenummer.input} />
                        <InputLinje>
                            <PersonsokDatovelger form={state.fields} />
                        </InputLinje>
                        <InputLinje>
                            <Input bredde={'M'} label={'Alder fra'} {...state.fields.alderFra.input} />
                            <Input bredde={'M'} label={'Alder til'} {...state.fields.alderTil.input} />
                        </InputLinje>
                        <Select label={'Kjønn'} {...state.fields.kjonn.input}>
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
                <LenkeDrek props={drekProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                    <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
                </KnappStyle>
            </FormStyle>
            <AlertStripeInfo>
                <span role="alert">Du må minimum fylle inn navn, adresse eller kontonummer for å gjøre søk</span>
            </AlertStripeInfo>
        </form>
    );
}

export default PersonsokSkjema;
