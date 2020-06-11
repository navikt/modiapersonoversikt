import * as React from 'react';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Ytelse } from '../../../../models/ytelse/ytelse-utils';
import YtelserListeElement from './YtelserListeElement';
import { Undertittel } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import { HjelpetekstUnderHoyre } from 'nav-frontend-hjelpetekst';
import { ReactNode } from 'react';
import Panel from 'nav-frontend-paneler';

const StyledPanel = styled(Panel)`
    padding: 0rem;
`;

const StyledOl = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const HjelpetekstHoyreWrapper = styled.div`
    margin-left: ${pxToRem(50)};
    position: absolute;
`;

const TittelWrapper = styled.div`
    padding: ${pxToRem(15)};
    border-bottom: ${theme.border.skille};
    display: flex;
`;

interface Props {
    ytelser: Ytelse[];
    pending: boolean;
    valgtYtelse: Ytelse;
    placeHolders: ReactNode[];
}

function YtelseListe(props: Props) {
    const ytelser = props.ytelser.map(ytelse => (
        <YtelserListeElement ytelse={ytelse} erValgt={ytelse === props.valgtYtelse} />
    ));
    return (
        <section>
            <StyledPanel>
                <TittelWrapper>
                    <Undertittel>Ytelser</Undertittel>
                    <HjelpetekstHoyreWrapper>
                        <HjelpetekstUnderHoyre id={guid()}>
                            Viser kun ytelser fra Infotrygd 2 år tilbake i tid (foreldrepenger, pleiepenger, sykepenger)
                        </HjelpetekstUnderHoyre>
                    </HjelpetekstHoyreWrapper>
                </TittelWrapper>
                <nav aria-label="Velg ytelser">
                    <StyledOl>{ytelser}</StyledOl>
                    {props.pending ? <CenteredLazySpinner /> : props.placeHolders}
                </nav>
            </StyledPanel>
        </section>
    );
}

export default YtelseListe;
