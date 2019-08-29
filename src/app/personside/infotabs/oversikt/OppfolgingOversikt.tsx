import * as React from 'react';
import { DetaljertOppfolging, Oppfolging } from '../../../../models/oppfolging';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bold } from '../../../../components/common-styled-components';

const Style = styled.div`
    padding: ${theme.margin.layout};
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

    const veilederNavn = oppfolging.veileder ? (
        <Normaltekst>{oppfolging.veileder.navn}</Normaltekst>
    ) : (
        <Normaltekst>Ikke angitt</Normaltekst>
    );

    const veilederIdent = oppfolging.veileder ? <Normaltekst>({oppfolging.veileder.ident})</Normaltekst> : null;

    return (
        <>
            <Normaltekst>
                <Bold>Oppfølgende enhet:</Bold>
            </Normaltekst>
            <Normaltekst>{oppfolging.enhet.navn}</Normaltekst>
            <Normaltekst>
                <Bold>Veileder:</Bold>
            </Normaltekst>
            {veilederNavn}
            {veilederIdent}
        </>
    );
}

export default OppfolgingOversikt;
