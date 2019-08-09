import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { erMonolog, sisteSendteMelding } from '../meldinger/utils/meldingerUtils';
import { meldingstypeTekst, temagruppeTekst } from '../meldinger/utils/meldingstekster';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import Meldingsikon from '../meldinger/utils/Meldingsikon';
import { datoSynkende, formatterDatoTid } from '../../../../utils/dateUtils';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { delAvStringMedDots } from '../../../../utils/string-utils';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

const PanelStyle = styled.div`
    display: flex;
    > *:first-child {
        padding-right: ${theme.margin.layout};
    }
`;

interface Props {
    traader: Traad[];
}

function MeldingerOversikt() {
    return (
        <RestResourceConsumer<Traad[]> getResource={restResources => restResources.tråderOgMeldinger}>
            {data => <MeldingerPanel traader={data} />}
        </RestResourceConsumer>
    );
}

function MeldingerPanel(props: Props) {
    const traadKomponenter = props.traader
        .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
        .slice(0, Math.min(4, props.traader.length))
        .map(traad => <Traadelement traad={traad} key={traad.traadId} />);

    return <ListStyle>{traadKomponenter}</ListStyle>;
}

function Traadelement({ traad }: { traad: Traad }) {
    const nyesteMelding = sisteSendteMelding(traad);
    const datoTekst = formatterDatoTid(nyesteMelding.opprettetDato);
    const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(nyesteMelding.temagruppe)}`;

    return (
        <div>
            <VisMerKnapp onClick={() => {}} valgt={false} ariaDescription={'Vis meldinger for ' + tittel}>
                <PanelStyle>
                    <Meldingsikon
                        type={nyesteMelding.meldingstype}
                        erFerdigstiltUtenSvar={nyesteMelding.erFerdigstiltUtenSvar}
                        erMonolog={erMonolog(traad)}
                        antallMeldinger={traad.meldinger.length}
                    />
                    <div>
                        <Normaltekst>{datoTekst}</Normaltekst>
                        <Element>{tittel}</Element>
                        <Normaltekst>{delAvStringMedDots(nyesteMelding.fritekst, 100)}</Normaltekst>
                    </div>
                </PanelStyle>
            </VisMerKnapp>
        </div>
    );
}

export default MeldingerOversikt;
