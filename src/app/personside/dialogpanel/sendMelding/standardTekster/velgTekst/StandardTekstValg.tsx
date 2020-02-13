import React, { useMemo } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { createDynamicHighlightingRule } from 'nav-frontend-tekstomrade';
import { parseTekst } from '../../../../../../components/tag-input/tag-input';
import { FieldState } from '../../../../../../utils/hooks/use-field-state';
import * as StandardTekster from '../domain';
import LocaleVelger from './LocaleVelger';
import styled from 'styled-components/macro';
import theme from '../../../../../../styles/personOversiktTheme';
import useAlwaysInViewport from '../../../../../../utils/hooks/use-always-in-viewport';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import StandardTekstPreview from './StandardTekstPreview';
import StandardtekstListe from './StandardtekstListe';

interface Props {
    tekster: Array<StandardTekster.Tekst>;
    sokefelt: FieldState;
    valgt: FieldState;
    valgtLocale: FieldState;
    valgtTekst?: StandardTekster.Tekst;
    harAutofullførData: boolean;
}

const Style = styled.div`
    display: flex;
    flex-grow: 1;
    height: 0; // hack for å få flex til å funke som vi vil her, bør skrives om til grid
    b {
        font-weight: bolder !important;
    }
    em {
        font-style: normal;
        ${theme.highlight}
    }
`;

const PreviewStyle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: white;
`;

const VelgTekst = styled.div`
    padding: 1rem;
`;

const VelgKnapp = styled(Hovedknapp)`
    float: right;
`;

const LocaleVelgerStyle = styled.div`
    float: left;
    .skjemaelement {
        margin: 0;
    }
`;

const StyledAlertstripeAdvarsel = styled(AlertStripeAdvarsel)`
    margin-bottom: 0.5rem;
`;

const manglerAutoCompleteDataWarning = (
    <StyledAlertstripeAdvarsel>
        Kunne ikke laste autofullfør-data. Du må gå over teksten og fylle inn manuelt (feks: [bruker.navn]).
    </StyledAlertstripeAdvarsel>
);

function StandardTekstValg({ valgt, valgtLocale, valgtTekst, sokefelt, tekster, harAutofullførData }: Props) {
    const { text, tags } = useMemo(() => parseTekst(sokefelt.input.value), [sokefelt.input.value]);
    const highlightRule = useMemo(() => createDynamicHighlightingRule(text.split(' ').concat(tags)), [text, tags]);

    useAlwaysInViewport('.standardtekster__liste input:checked', [valgtTekst, tekster]);

    return (
        <Style>
            <StandardtekstListe
                locale={valgtLocale.input.value}
                tekster={tekster}
                valgt={valgt}
                highlightRule={highlightRule}
            />
            <PreviewStyle>
                <StandardTekstPreview
                    tekst={valgtTekst}
                    locale={valgtLocale.input.value}
                    sokefelt={sokefelt}
                    highlightRule={highlightRule}
                />
                <VelgTekst>
                    {!harAutofullførData && manglerAutoCompleteDataWarning}
                    <div>
                        <LocaleVelgerStyle>
                            <LocaleVelger tekst={valgtTekst} valgt={valgtLocale} />
                        </LocaleVelgerStyle>
                        <VelgKnapp>
                            Velg <span className="sr-only">tekst</span>
                        </VelgKnapp>
                    </div>
                </VelgTekst>
            </PreviewStyle>
        </Style>
    );
}

export default StandardTekstValg;
