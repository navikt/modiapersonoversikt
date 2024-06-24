import * as React from 'react';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import styled from 'styled-components';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { Ytelse } from '../../../../models/ytelse/ytelse-utils';
import YtelserListeElement from './YtelserListeElement';
import { Undertittel } from 'nav-frontend-typografi';
import { guid } from 'nav-frontend-js-utils';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
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

const TittelWrapper = styled.div`
    padding: ${pxToRem(15)};
    border-bottom: ${theme.border.skille};
    display: flex;

    .hjelpetekst {
        margin-left: 0.5rem;
    }
    .popover {
        max-width: 30rem;
    }
`;

interface Props {
    ytelser: Ytelse[];
    pending: boolean;
    valgtYtelse: Ytelse;
    placeHolders: ReactNode[];
}

function YtelseListe(props: Props) {
    const ytelser = props.ytelser.map((ytelse, index) => (
        <YtelserListeElement key={index} ytelse={ytelse} erValgt={ytelse === props.valgtYtelse} />
    ));
    return (
        <section>
            <StyledPanel>
                <TittelWrapper>
                    <Undertittel>Ytelser</Undertittel>
                    <Hjelpetekst id={guid()} type={PopoverOrientering.UnderVenstre}>
                        Viser kun ytelser fra Infotrygd 2 år tilbake i tid (foreldrepenger, pleiepenger, sykepenger)
                    </Hjelpetekst>
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
