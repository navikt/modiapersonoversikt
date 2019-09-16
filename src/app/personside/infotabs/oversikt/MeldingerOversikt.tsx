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
import { withRouter } from 'react-router';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import Tekstomrade from '../../../../components/tekstomrade/tekstomrade';
import { useInfotabsDyplenker } from '../dyplenker';

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
    traad: Traad;
}

function MeldingerOversikt() {
    return (
        <RestResourceConsumer<Traad[]>
            getResource={restResources => restResources.tråderOgMeldinger}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => {
                const traadKomponenter = data
                    .sort(datoSynkende(traad => sisteSendteMelding(traad).opprettetDato))
                    .slice(0, 4)
                    .map(traad => <Traadelement traad={traad} key={traad.traadId} />);

                return <ListStyle aria-label="Oversikt brukers meldinger">{traadKomponenter}</ListStyle>;
            }}
        </RestResourceConsumer>
    );
}

export function Traadelement(props: Props) {
    const nyesteMelding = sisteSendteMelding(props.traad);
    const datoTekst = formatterDatoTid(nyesteMelding.opprettetDato);
    const tittel = `${meldingstypeTekst(nyesteMelding.meldingstype)} - ${temagruppeTekst(nyesteMelding.temagruppe)}`;
    const dyplenker = useInfotabsDyplenker();

    return (
        <li>
            <VisMerKnapp
                linkTo={dyplenker.meldinger.link(props.traad)}
                valgt={false}
                ariaDescription={'Vis meldinger for ' + tittel}
            >
                <PanelStyle>
                    <Meldingsikon
                        type={nyesteMelding.meldingstype}
                        erFerdigstiltUtenSvar={nyesteMelding.erFerdigstiltUtenSvar}
                        erMonolog={erMonolog(props.traad)}
                        antallMeldinger={props.traad.meldinger.length}
                    />
                    <div>
                        <Normaltekst>{datoTekst}</Normaltekst>
                        <Element>{tittel}</Element>
                        <Tekstomrade>{delAvStringMedDots(nyesteMelding.fritekst, 70)}</Tekstomrade>
                    </div>
                </PanelStyle>
            </VisMerKnapp>
        </li>
    );
}

export default withRouter(MeldingerOversikt);
