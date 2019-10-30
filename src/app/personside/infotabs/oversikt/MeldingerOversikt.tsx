import * as React from 'react';
import { Traad } from '../../../../models/meldinger/meldinger';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { nyesteMelding } from '../meldinger/utils/meldingerUtils';
import { meldingstypeTekst } from '../meldinger/utils/meldingstekster';
import VisMerKnapp from '../../../../components/VisMerKnapp';
import { datoSynkende } from '../../../../utils/dateUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';
import { useInfotabsDyplenker } from '../dyplenker';
import { meldingerTest } from '../dyplenkeTest/utils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { ReactNode } from 'react';
import { useOnMount } from '../../../../utils/customHooks';
import { temagruppeTekst } from '../../../../models/Temagrupper';
import TraadSammendrag from '../meldinger/traadliste/TraadSammendrag';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    setHeaderContent: (content: ReactNode) => void;
}

function MeldingerOversikt(props: Props) {
    return (
        <RestResourceConsumer<Traad[]>
            getResource={restResources => restResources.tråderOgMeldinger}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <TraadListe traader={data} {...props} />}
        </RestResourceConsumer>
    );
}

function TraadListe(props: { traader: Traad[] } & Props) {
    const traadKomponenter = props.traader
        .sort(datoSynkende(traad => nyesteMelding(traad).opprettetDato))
        .slice(0, 2)
        .map(traad => <Traadelement traad={traad} key={traad.traadId} />);

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
                ariaDescription={'Vis meldinger for ' + tittel}
                className={meldingerTest.oversikt}
            >
                <TraadSammendrag traad={props.traad} />
            </VisMerKnapp>
        </li>
    );
}

export default MeldingerOversikt;
