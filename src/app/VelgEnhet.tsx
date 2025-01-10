import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Select } from 'nav-frontend-skjema';
import { type ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import LazySpinner from '../components/LazySpinner';
import { useValgtenhet } from '../context/valgtenhet-state';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheterResource';
import theme from '../styles/personOversiktTheme';

const Style = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    .skjemaelement__label {
        ${theme.visuallyHidden};
    }
`;

function VelgEnhet() {
    const enheter = saksbehandlersEnheter.useFetch();
    const setEnhetId = useValgtenhet().setEnhetId;

    useEffect(() => {
        if (enheter.data?.enhetliste?.length === 1) {
            setEnhetId(enheter.data.enhetliste[0].enhetId);
        }
    }, [enheter, setEnhetId]);

    if (enheter.isLoading) {
        return <LazySpinner type="M" />;
    }
    if (enheter.isError) {
        return <AlertStripeAdvarsel>Kunne ikke hente enhetsliste</AlertStripeAdvarsel>;
    }

    const options = enheter.data?.enhetliste.map((enhet) => {
        return (
            <option value={enhet.enhetId} key={enhet.enhetId}>
                {enhet.enhetId} {enhet.navn}
            </option>
        );
    });

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setEnhetId(e.target.value);
    };

    return (
        <Style>
            <Select label="Velg enhet" onChange={handleOnChange} value={''}>
                <option disabled={true} value={''}>
                    Velg enhet
                </option>
                {options}
            </Select>
        </Style>
    );
}

export default VelgEnhet;
