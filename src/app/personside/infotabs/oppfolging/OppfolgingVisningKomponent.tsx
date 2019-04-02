import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';

interface VisningProps {
    detaljertOppfølging: DetaljertOppfolging;
}

const DetaljertInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:last-child {
        margin-left: ${theme.margin.layout};
        flex-basis: 75%;
    }
`;

const EkspanderbartPanelWrapper = styled.div`
    > * {
        margin-top: ${theme.margin.layout};
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <article>
            <VisuallyHiddenAutoFokusHeader tittel="Oppfølging" />
            <DetaljertInfoWrapper>
                <OppfolgingDatoPanel />
                <VisOppfolgingDetaljer detaljertOppfølging={props.detaljertOppfølging} />
            </DetaljertInfoWrapper>
            <EkspanderbartPanelWrapper>
                <SykefravarsoppfolgingEkspanderbartPanel syfoPunkt={props.detaljertOppfølging.sykefraværsoppfølging} />
                <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfølging.ytelser} />
            </EkspanderbartPanelWrapper>
        </article>
    );
}

export default OppfolgingVisning;
