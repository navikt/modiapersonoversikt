import { PersonsokRequestV3 as PersonsokRequest, PersonsokResponse } from '../../models/person/personsok';
import { apiBaseUri, postConfig } from '../../api/config';
import { FetchResponse, fetchToJson } from '../../utils/fetchToJson';
import { lagRequestV3, PersonSokFormStateV3 as PersonSokFormState, resolver } from './personsokUtils';
import { loggError, loggEvent } from '../../utils/logger/frontendLogger';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import LenkeDrekV2 from './LenkeDrekV2';
import { Hovedknapp } from 'nav-frontend-knapper';
import { LenkeKnapp } from '../../components/common-styled-components';
import styled from 'styled-components';
import theme from '../../styles/personOversiktTheme';
import { useForm } from 'react-hook-form';
import PersonsokNavnAdresseKontonrDnr from './PersonsokNavnAdresseKontonrDnr';
import PersonsokAlderKjonn from './PersonsokAlderKjonn';
import PersonsokDatovelger from './PersonsokDatovelger';
import FormErrorSummary from '../../components/form/FormErrorSummary';
import { useValgtenhet } from '../../context/valgtenhet-state';

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

function PersonsokSkjema(props: Props) {
    const form = useForm<PersonSokFormState>({
        resolver,
        mode: 'onChange',
        shouldFocusError: false
    });
    const valgtEnhet = useValgtenhet();
    function submitHandler(values: PersonSokFormState): Promise<void> {
        props.setPosting(true);

        if (values.utenlandskID.length > 0) {
            loggEvent('PersonsokUtenlandsId', 'Personsok');
        }

        const request: PersonsokRequest = lagRequestV3(valgtEnhet.enhetId, values);
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
        <form onSubmit={form.handleSubmit(submitHandler)} onReset={() => form.reset()}>
            <FormStyle>
                <SectionStyle>
                    <section aria-label={'Søkekriterier'}>
                        <FormErrorSummary form={form} tittel={'For å kunne søke må du rette opp i følgende:'} />
                        <Systemtittel tag={'h2'}>Søkekriterier</Systemtittel>
                        <PersonsokNavnAdresseKontonrDnr form={form} />
                    </section>
                    <section aria-label={'Begrens søket'}>
                        <Systemtittel tag={'h2'}>Begrens søket</Systemtittel>
                        <PersonsokDatovelger form={form} />
                        <PersonsokAlderKjonn form={form} />
                    </section>
                </SectionStyle>
                <LenkeDrekV2 watch={form.watch} />
                <a
                    className="lenke"
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={
                        import.meta.env.PROD
                            ? 'https://utbetalingsportalen.intern.nav.no'
                            : 'https://utbetalingsportalen.intern.dev.nav.no'
                    }
                >
                    <Normaltekst>Kontonummersøk i utbetalingsportalen</Normaltekst>
                </a>
                <KnappStyle>
                    <Hovedknapp htmlType="submit">Søk</Hovedknapp>
                    <LenkeKnapp type="reset">Nullstill</LenkeKnapp>
                </KnappStyle>
            </FormStyle>
        </form>
    );
}

export default PersonsokSkjema;
