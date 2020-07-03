import * as React from 'react';
import { useCallback, useState } from 'react';
import PersonsokSkjema from './PersonsokSkjema';
import PersonsokResultat from './PersonsokResultat';
import ModalWrapper from 'nav-frontend-modal';
import styled from 'styled-components/macro';
import theme from '../../styles/personOversiktTheme';
import { Innholdstittel } from 'nav-frontend-typografi';
import useListener from '../../utils/hooks/use-listener';
import { PersonsokResponse } from '../../models/person/personsok';
import { FetchResponse } from '../../utils/fetchToJson';

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        background-color: ${theme.color.navLysGra};
    }
`;

const TittelStyle = styled(Innholdstittel)`
    padding: 0rem 0rem 1rem 0.5rem;
`;

function PersonsokContainer() {
    const [apen, settApen] = useState(false);
    const listener = useCallback(() => settApen(a => !a), [settApen]);
    useListener('#toggle-personsok', 'click', listener, document.querySelector('dekorator'));
    const [response, setResponse] = useState<FetchResponse<PersonsokResponse[]> | undefined>(undefined);
    const [posting, setPosting] = useState(false);
    const handleOnClose = () => {
        settApen(false);
        setResponse(undefined);
    };
    return (
        <StyledModalWrapper contentLabel="Avansert søk" onRequestClose={handleOnClose} isOpen={apen}>
            <TittelStyle>Avansert Søk</TittelStyle>
            <PersonsokSkjema setPosting={setPosting} setResponse={setResponse} />
            <PersonsokResultat posting={posting} response={response} onClose={() => settApen(false)} />
        </StyledModalWrapper>
    );
}

export default PersonsokContainer;
