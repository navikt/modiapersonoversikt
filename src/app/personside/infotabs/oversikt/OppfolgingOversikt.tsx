import * as React from 'react';
import { DetaljertOppfolging, Oppfolging } from '../../../../models/oppfolging';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';

const Style = styled.div`
    margin-top: 1px;
    background-color: white;
    padding: ${theme.margin.px10};
`;

interface Props {
    detaljertOppfølging: DetaljertOppfolging;
}

function OppfolgingOversikt() {
    return (
        <RestResourceConsumer<DetaljertOppfolging> getResource={restResources => restResources.oppfolging}>
            {data => <OppfolgingPanel detaljertOppfølging={data} />}
        </RestResourceConsumer>
    );
}

function OppfolgingPanel(props: Props) {
    return (
        <Style>
            <OppfolgingVisning oppfolging={props.detaljertOppfølging.oppfølging} />
        </Style>
    );
}

function OppfolgingVisning({ oppfolging }: { oppfolging: Oppfolging }) {
    if (!oppfolging.erUnderOppfølging) {
        return <Normaltekst>Er ikke i arbeidsrettet oppfølging</Normaltekst>;
    }

    const veilederNavn = oppfolging.veileder
        ? `${oppfolging.veileder.navn} (${oppfolging.veileder.ident})`
        : 'Ikke angitt';

    return (
        <>
            <Normaltekst>Oppføgende enhet: {oppfolging.enhet.navn}</Normaltekst>
            <Normaltekst>Veileder: {veilederNavn}</Normaltekst>
        </>
    );
}

export default OppfolgingOversikt;
