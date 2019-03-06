import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import ArenaLenkerPanel from './ArenaLenkerKomponent';
import OppfolgingDatoPanel, { FraTilDato } from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';

interface VisningProps {
    detaljertOppfølging: DetaljertOppfolging;
    onChange: (change: FraTilDato) => void;
    hentOppfølging: () => void;
    valgtPeriode: FraTilDato;
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
    > * {
        margin-top: ${theme.margin.layout};
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <article>
            <DetaljertInfoWrapper>
                <LenkeOgDatoWrapper>
                    <ArenaLenkerPanel />
                    <OppfolgingDatoPanel
                        onChange={props.onChange}
                        valgtPeriode={props.valgtPeriode}
                        hentOppfølging={props.hentOppfølging}
                    />
                </LenkeOgDatoWrapper>
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
