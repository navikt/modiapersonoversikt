import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Select } from 'nav-frontend-skjema';
import theme from '../styles/personOversiktTheme';
import saksbehandlersEnheter from '../rest/resources/saksbehandlersEnheterResource';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import LazySpinner from '../components/LazySpinner';
import { useValgtenhet } from '../context/valgtenhet-state';

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
    } else if (enheter.isError) {
        return <AlertStripeAdvarsel>Kunne ikke hente enhetsliste</AlertStripeAdvarsel>;
    }

    const options = enheter.data.enhetliste.map((enhet) => {
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
