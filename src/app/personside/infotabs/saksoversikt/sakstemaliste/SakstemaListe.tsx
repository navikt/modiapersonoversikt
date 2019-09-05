import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components';
import theme from '../../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaListeElement from './SakstemaListeElement';
import { Undertittel } from 'nav-frontend-typografi';
import { getUnikSakstemaKey, hentDatoForSisteHendelse, useAgregerteSaker } from '../utils/saksoversiktUtils';
import { datoSynkende } from '../../../../../utils/dateUtils';
import { useRestResource } from '../../../../../utils/customHooks';
import { hasData } from '../../../../../rest/utils/restResource';
import LazySpinner from '../../../../../components/LazySpinner';

export const sakstemakodeAlle = 'ALLE';

const SakstemaListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const Wrapper = styled.div`
    ${theme.hvittPanel};
    min-width: 24rem;
    flex-basis: 24rem;
    ol {
        list-style: none;
    }
`;

const TittelWrapper = styled.div`
    padding: ${theme.margin.px20};
`;

function GrupperteTema(props: { sakstema: Sakstema[] }) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .map(sakstema => <SakstemaListeElement sakstema={sakstema} key={getUnikSakstemaKey(sakstema)} />);
    return <SakstemaListeStyle>{sakstemakomponenter}</SakstemaListeStyle>;
}

function SakstemaListe() {
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    const agregerteSaker = useAgregerteSaker();

    if (!hasData(sakstemaResource) || !agregerteSaker) {
        return <LazySpinner />;
    }

    const sakstema = sakstemaResource.data.resultat;

    if (sakstema.length === 0) {
        return <AlertStripeInfo>Det finnes ingen saker for bruker.</AlertStripeInfo>;
    }

    const sortertSakstema = sakstema.sort(datoSynkende(sakstema => hentDatoForSisteHendelse(sakstema)));

    return (
        <Wrapper>
            <TittelWrapper>
                <Undertittel>Tema</Undertittel>
            </TittelWrapper>
            <nav aria-label="Velg sakstema">
                <GrupperteTema sakstema={[agregerteSaker, ...sortertSakstema]} />
            </nav>
        </Wrapper>
    );
}

export default SakstemaListe;
