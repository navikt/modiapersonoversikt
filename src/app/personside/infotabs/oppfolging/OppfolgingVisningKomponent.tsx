import * as React from 'react';
import { DetaljertOppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import OppfolgingDatoPanel from './OppfolgingDatoKomponent';
import VisOppfolgingDetaljer from './OppfolgingDetaljerKomponent';
import SykefravarsoppfolgingEkspanderbartPanel from './SykefravarsoppfolgingEkspanderbartPanel';
import OppfolgingYtelserEkspanderbartPanel from './OppfolgingYtelserEkspanderbartPanel';
import VisuallyHiddenAutoFokusHeader from '../../../../components/VisuallyHiddenAutoFokusHeader';
import { erModiabrukerdialog } from '../../../../utils/erNyPersonoversikt';

interface VisningProps {
    detaljertOppfølging: DetaljertOppfolging;
}

const OppfolgingStyle = styled.article`
    > *:not(:last-child) {
        margin-bottom: ${theme.margin.layout};
    }
    padding: ${theme.margin.layout};
`;

const DetaljertInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    > *:last-child {
        margin-left: ${theme.margin.layout};
        flex-basis: 75%;
    }
`;

function OppfolgingVisning(props: VisningProps) {
    return (
        <OppfolgingStyle>
            {erModiabrukerdialog() && <VisuallyHiddenAutoFokusHeader tittel="Oppfølging" />}
            <DetaljertInfoWrapper>
                <OppfolgingDatoPanel />
                <VisOppfolgingDetaljer detaljertOppfølging={props.detaljertOppfølging} />
            </DetaljertInfoWrapper>
            <SykefravarsoppfolgingEkspanderbartPanel syfoPunkter={props.detaljertOppfølging.sykefraværsoppfølging} />
            <OppfolgingYtelserEkspanderbartPanel ytelser={props.detaljertOppfølging.ytelser} />
        </OppfolgingStyle>
    );
}

export default OppfolgingVisning;
