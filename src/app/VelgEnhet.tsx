import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components/macro';
import { Select } from 'nav-frontend-skjema';
import { useDispatch } from 'react-redux';
import { velgEnhetAction } from '../redux/session/session';
import theme from '../styles/personOversiktTheme';
import { useRestResource } from '../rest/consumer/useRestResource';

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
    const enheter = useRestResource(
        resources => resources.saksbehandlersEnheter,
        { returnOnError: 'Kunne ikke hente enhetsliste' },
        true
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (enheter.data?.enhetliste.length === 1) {
            dispatch(velgEnhetAction(enheter.data.enhetliste[0].enhetId));
        }
    }, [enheter, dispatch]);

    if (!enheter.data) {
        return enheter.placeholder;
    }

    const options = enheter.data.enhetliste.map(enhet => {
        return (
            <option value={enhet.enhetId} key={enhet.enhetId}>
                {enhet.enhetId} {enhet.navn}
            </option>
        );
    });

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(velgEnhetAction(e.target.value));
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
