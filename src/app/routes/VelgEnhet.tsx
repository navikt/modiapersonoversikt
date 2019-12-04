import * as React from 'react';
import styled from 'styled-components';
import { Select } from 'nav-frontend-skjema';
import { useRestResource } from '../../utils/customHooks';
import { hasData, isFailed, isNotStarted } from '../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import LazySpinner from '../../components/LazySpinner';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { velgEnhetAction } from '../../redux/session/session';
import { ChangeEvent, useEffect } from 'react';
import theme from '../../styles/personOversiktTheme';

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
    const enheter = useRestResource(resources => resources.saksbehandlersEnheter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasData(enheter) && enheter.data.enhetliste.length === 1) {
            dispatch(velgEnhetAction(enheter.data.enhetliste[0].enhetId));
        }
    }, [enheter, dispatch]);

    if (isNotStarted(enheter)) {
        dispatch(enheter.actions.fetch);
    }

    if (isFailed(enheter)) {
        return (
            <Style>
                <AlertStripeFeil>Kunne ikke hente enhetsliste</AlertStripeFeil>
            </Style>
        );
    }

    if (!hasData(enheter)) {
        return (
            <Style>
                <LazySpinner />
            </Style>
        );
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
