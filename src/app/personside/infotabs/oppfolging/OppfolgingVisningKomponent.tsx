import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ArenaLenkerPanel from './ArenaLenkerKomponent';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';

interface VisningProps {
    detaljertOppfølging: DetaljertOppfolging;
}

const DetaljertInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:last-child {
        margin-left: ${theme.margin.layout};
    }
    > * {
        flex-basis: 50%;
    }
`;

const LenkeOgDatoWrapper = styled.div`
    > *:first-child {
        margin-bottom: ${theme.margin.layout};
    }
    display: flex;
    flex-direction: column;
    > * {
        flex-grow: 1;
    }
`;

const EkspanderbartPanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    > * {
        margin-top: ${theme.margin.layout};
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <>
            <DetaljertInfoWrapper>
                <LenkeOgDatoWrapper>
                    <ArenaLenkerPanel />
                    <OppfolgingDatoPanel />
                </LenkeOgDatoWrapper>
                <VisOppfolgingDetaljer detaljertOppfølging={props.detaljertOppfølging} />
            </DetaljertInfoWrapper>
            <EkspanderbartPanelWrapper>
                <SykefravarsoppfolgingEkspanderbartPanel syfoPunkt={props.detaljertOppfølging.sykefraværsoppfølging} />
                <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfølging.ytelser} />
            </EkspanderbartPanelWrapper>
        </>
    );
}

export default OppfolgingVisning;
