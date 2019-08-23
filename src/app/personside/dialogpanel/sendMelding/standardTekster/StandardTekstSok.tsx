import React, { useEffect, useState } from 'react';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import NavFrontendSpinner from 'nav-frontend-spinner';
import styled from 'styled-components';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import useFieldState from '../../../../../utils/hooks/use-field-state';
import { sokEtterTekster } from './sokUtils';
import useDebounce from '../../../../../utils/hooks/use-debounce';
import StandardTekstVisning from './StandardTekstVisning';
import * as StandardTekster from './domain';
import theme from '../../../../../styles/personOversiktTheme';
import TagInput from '../../../../../components/tag-input/tag-input';

interface Props {
    appendTekst(tekst: string, locale: string): void;
}
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const Spinner = styled(NavFrontendSpinner)`
    display: block;
    margin: 0 auto;
`;
const Sokefelt = styled.div`
    padding: 1rem;
    border-bottom: 1px solid ${theme.color.navGra20}
    background-color: #f5f5f5;
    
    .skjemaelement {
        max-width: calc(100% - 3rem);
        margin: 0;
    }
    .skjemaelement__label {
        ${theme.visuallyHidden}
    }
`;

function StandardTekstSok(props: Props) {
    const data = useFetch<StandardTekster.Tekster>('/modiapersonoversikt-skrivestotte/skrivestotte');
    const sokefelt = useFieldState('sykepe');
    const debouncedSokefelt = useDebounce(sokefelt.input.value, 100);
    const [filtrerteTekster, settFiltrerteTekster] = useState(() => sokEtterTekster(data, debouncedSokefelt));

    useEffect(() => {
        settFiltrerteTekster(sokEtterTekster(data, debouncedSokefelt));
    }, [settFiltrerteTekster, data, debouncedSokefelt]);

    let content = null;
    if (isPending(data)) {
        content = <Spinner type="XL" />;
    } else if (hasError(data)) {
        content = <Feilmelding feil={{ feilmelding: 'Kunne ikke laste inn standardtekster' }} />;
    } else if (hasData(data)) {
        content = <StandardTekstVisning tekster={filtrerteTekster} sokefelt={sokefelt} {...props} />;
    }

    return (
        <Container>
            <Sokefelt>
                <TagInput {...sokefelt.input} name="standardtekstsok" label="Søk etter standardtekster" />
            </Sokefelt>
            {content}
        </Container>
    );
}

export default StandardTekstSok;
