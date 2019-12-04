import React from 'react';
import { useEffect } from 'react';
import { useAppState, useRestResource } from '../../utils/customHooks';
import { hasData } from '../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { velgEnhetAction } from '../../redux/session/session';
import styled from 'styled-components';
import LazySpinner from '../../components/LazySpinner';
import { loggError } from '../../utils/frontendLogger';

const Style = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

function VelgEnhet() {
    const enheter = useRestResource(resources => resources.saksbehandlersEnheter);
    const valgtEnhet = useAppState(state => state.session.valgtEnhetId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (hasData(enheter) && !valgtEnhet) {
            const førsteEnhet = enheter.data.enhetliste[0];
            if (!førsteEnhet) {
                loggError(Error('Kunne ikke finne enheter for bruker'));
            }
            dispatch(velgEnhetAction(førsteEnhet.enhetId));
        }
    }, [enheter, dispatch, valgtEnhet]);

    if (!valgtEnhet) {
        return (
            <Style>
                <LazySpinner />
            </Style>
        );
    }

    return null;
}

export default VelgEnhet;
