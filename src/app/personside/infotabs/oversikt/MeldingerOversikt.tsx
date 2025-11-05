import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import type { Traad } from '../../../../models/meldinger/meldinger';
import { temagruppeTekst } from '../../../../models/temagrupper';
import dialogResource from '../../../../rest/resources/dialogResource';
import theme from '../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../utils/customHooks';
import { datoSynkende } from '../../../../utils/date-utils';
import { meldingerTest } from '../dyplenkeTest/utils-dyplenker-test';
import { useInfotabsDyplenker } from '../dyplenker';
import TraadSammendrag from '../meldinger/traadliste/TraadSammendrag';
import { nyesteMelding } from '../meldinger/utils/meldingerUtils';
import { meldingstypeTekst } from '../meldinger/utils/meldingstekster';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function MeldingerOversikt(props: Props) {
    return dialogResource.useRenderer({
        ifPending: <CenteredLazySpinner padding={theme.margin.layout} />,
        ifData: (data: Traad[]) => <TraadListe traader={data} {...props} />
    });
}

function TraadListe(props: { traader: Traad[] } & Props) {
    const traadKomponenter = props.traader
        .sort(datoSynkende((traad: Traad) => nyesteMelding(traad).opprettetDato))
        .slice(0, 2)
        .map((traad) => <Traadelement traad={traad} key={traad.traadId} />);

    useOnMount(() => {
        props.setHeaderContent(
            <Normaltekst>
                {traadKomponenter.length} / {props.traader.length}
            </Normaltekst>
        );
    });

    if (traadKomponenter.length === 0) {
        return <AlertStripeInfo>Brukeren har ingen meldinger</AlertStripeInfo>;
    }

    return <ListStyle aria-label="Oversikt brukers meldinger">{traadKomponenter}</ListStyle>;
}

function Traadelement(props: { traad: Traad }) {
    const sisteMelding = nyesteMelding(props.traad);
    const tittel = `${meldingstypeTekst(sisteMelding.meldingstype)} - ${temagruppeTekst(sisteMelding.temagruppe)}`;
    const dyplenker = useInfotabsDyplenker();

    return (
        <li>
            <VisMerKnapp
                linkTo={dyplenker.meldinger.link(props.traad)}
                valgt={false}
                ariaDescription={`Vis meldinger for ${tittel}`}
                className={meldingerTest.oversikt}
                umamiEvent={{ name: 'detaljvisning klikket', data: { fane: 'oversikt', tekst: 'vis melding' } }}
            >
                <TraadSammendrag traad={props.traad} />
            </VisMerKnapp>
        </li>
    );
}

export default MeldingerOversikt;
