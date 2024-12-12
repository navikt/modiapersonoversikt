import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Undertittel } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import type { Ytelse } from '../../../../models/ytelse/ytelse-utils';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import YtelserListeElement from './YtelserListeElement';

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
                        Viser ytelser fra Infotrygd 2 år tilbake i tid (foreldrepenger, pleiepenger, sykepenger). I
                        tillegg til tiltakspenger 10 år tilbake.
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
