import * as React from 'react';
import { useCallback } from 'react';
import PersonsokSkjema from './PersonsokSkjema';
import PersonsokResultat from './PersonsokResultat';
import { useState } from 'react';
import { useEffect } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { Innholdstittel } from 'nav-frontend-typografi';
import { loggEvent } from '../../utils/logger/frontendLogger';
import useListener from '../../utils/hooks/use-listener';

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        background-color: ${theme.color.navLysGra};
    }
`;

const TittelStyle = styled(Innholdstittel)`
    padding-bottom: 3rem;
`;

function PersonsokContainer() {
    const [apen, settApen] = useState(false);
    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#toggle-personsok', 'click', listener, document.querySelector('dekorator'));

    return (
        <StyledModalWrapper contentLabel="Avansert søk" onRequestClose={() => settApen(false)} isOpen={apen}>
            <TittelStyle>Avansert Søk</TittelStyle>
            <PersonsokSkjema />
            <PersonsokResultat onClose={() => settApen(false)} />
        </StyledModalWrapper>
    );
}

export default PersonsokContainer;
