import * as React from 'react';
import { PersonsokRequestV3, PersonsokResponse } from '../../models/person/personsok';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { lagRequestV3, PersonSokFormStateV3, resolver } from './personsokV3-utils';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { Systemtittel } from 'nav-frontend-typografi';
import LenkeDrekV2 from './LenkeDrekV2';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { FeilmeldingOppsummering } from '../../components/FeilmeldingOppsummering';
import { useForm } from 'react-hook-form';
import PersonsokNavnAdresseKontonrDnr from './PersonsokNavnAdresseKontonrDnr';
import PersonsokAlderKjonn from './PersonsokAlderKjonn';
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

export const InputLinje = styled.div`
    display: flex;
    .skjemaelement {
        padding-right: 0.5em;
    }
`;

function PersonsokSkjemaV3(props: Props) {
    const { register, handleSubmit, formState, reset, watch } = useForm<PersonSokFormStateV3>({
        resolver,
        mode: 'onBlur'
    });

    function submitHandler(values: PersonSokFormStateV3): Promise<void> {
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

    return (
        <form onSubmit={handleSubmit(submitHandler)} onReset={() => reset()}>
            <FormStyle>
                <SectionStyle>
                    <section aria-label={'Søkekriterier'}>
                        <FeilmeldingOppsummering
                            formState={formState}
                            tittel={'For å kunne søke må du rette opp i følgende:'}
                        />
                        <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                        <PersonsokNavnAdresseKontonrDnr formState={formState} register={register} />
                    </section>
                    <section aria-label={'Begrens søket'}>
                        <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                        <PersonsokDatovelger formState={formState} register={register} watch={watch} />
                        <PersonsokAlderKjonn formState={formState} register={register} />
                    </section>
                </SectionStyle>
                <LenkeDrekV2 watch={watch} />
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                    <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
                </KnappStyle>
            </FormStyle>
        </form>
    );
}

export default PersonsokSkjemaV3;
