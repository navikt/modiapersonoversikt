import * as React from 'react';
import { PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { PersonSokFormState, lagRequest, validatorPersonsok, PersonSokFormProps } from './personsok-utils';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { Systemtittel } from 'nav-frontend-typografi';
import { Input, Select } from 'nav-frontend-skjema';
import PersonsokDatovelger from './PersonsokDatovelger';
import LenkeDrek, { DrekProps } from './LenkeDrek';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { feilmelding } from '../personside/infotabs/meldinger/traadvisning/verktoylinje/oppgave/validering';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { FeilmeldingOppsummering } from '../../components/FeilmeldingOppsummering';
import formstateFactory, { Values } from '@nutgaard/use-formstate';
import { Kjonn } from '../personside/visittkort-v2/PersondataDomain';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

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

const initialValues: PersonSokFormState = {
    fornavn: '',
    etternavn: '',
    gatenavn: '',
    husnummer: '',
    husbokstav: '',
    postnummer: '',
    kontonummer: '',
    utenlandskID: '',
    kommunenummer: '',
    fodselsdatoFra: '',
    fodselsdatoTil: '',
    alderFra: '',
    alderTil: '',
    kjonn: '',
    _minimumskrav: ''
};

const useFormstate = formstateFactory<PersonSokFormState, PersonSokFormProps>(validatorPersonsok);

function PersonsokSkjema(props: Props) {
    const usePdlPersonsok = useFeatureToggle(FeatureToggles.BrukPdlPersonsok)?.isOn ?? false;
    const formstate = useFormstate(initialValues, { usePdlPersonsok });
    const hjelpetekstID = useRef(guid());

    function submitHandler(values: Values<PersonSokFormState>): Promise<any> {
        props.setPosting(true);

        if (values.utenlandskID.length > 0) {
            loggEvent('PersonsokUtenlandsId', 'Personsok');
        }

        const request: PersonsokRequest = lagRequest(values);
        const url = usePdlPersonsok ? `${apiBaseUri}/personsok/v2` : `${apiBaseUri}/personsok`;
        return fetchToJson<PersonsokResponse[]>(url, postConfig(request))
            .then((response) => {
                props.setPosting(false);
                props.setResponse(response);
            })
            .catch(() => {
                loggError(Error('Noe gikk galt - Personsøk'));
            });
    }

    const drekProps: DrekProps = {
        fornavn: formstate.fields.fornavn.input.value,
        etternavn: formstate.fields.etternavn.input.value,
        fodselsdatoFra: formstate.fields.fodselsdatoFra.input.value,
        kjonn: formstate.fields.kjonn.input.value
    };

    const utenlandskIDTittel = [
        'Utenlandsk ID ',
        <Hjelpetekst id={hjelpetekstID.current}>Husk å inkludere alle tegn. Eksempel: 010101-12345</Hjelpetekst>
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
                        <FeilmeldingOppsummering
                            formstate={formstate}
                            tittel={'For å kunne søke må du rett opp i følgende:'}
                        />
                        <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                        <InputLinje>
                            <Input
                                bredde={'XL'}
                                label={'Fornavn (Fonetisk søk)'}
                                {...formstate.fields.fornavn.input}
                                feil={feilmelding(formstate.fields.fornavn)}
                            />
                            <Input
                                bredde={'XL'}
                                label={'Etternavn (Fonetisk søk)'}
                                {...formstate.fields.etternavn.input}
                                feil={feilmelding(formstate.fields.etternavn)}
                            />
                        </InputLinje>
                        <InputLinje>
                            <Input
                                bredde={'L'}
                                label={'Gatenavn'}
                                {...formstate.fields.gatenavn.input}
                                feil={feilmelding(formstate.fields.gatenavn)}
                            />
                            <Input
                                bredde={'M'}
                                label={'Husnummer'}
                                {...formstate.fields.husnummer.input}
                                feil={feilmelding(formstate.fields.husnummer)}
                            />
                            <Input bredde={'M'} label={'Husbokstav'} {...formstate.fields.husbokstav.input} />
                        </InputLinje>
                        <Input
                            bredde={'M'}
                            label={'Postnummer'}
                            {...formstate.fields.postnummer.input}
                            feil={feilmelding(formstate.fields.postnummer)}
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
                        <Input
                            bredde={'M'}
                            label={'Bosted'}
                            {...formstate.fields.kommunenummer.input}
                            feil={feilmelding(formstate.fields.kommunenummer)}
                        />
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
                <LenkeDrek props={drekProps} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                    <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
                </KnappStyle>
            </FormStyle>
        </form>
    );
}

export default PersonsokSkjema;
