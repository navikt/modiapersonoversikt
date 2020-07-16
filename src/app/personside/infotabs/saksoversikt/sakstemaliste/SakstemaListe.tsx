import * as React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SakstemaListeElement from './SakstemaListeElement';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { getUnikSakstemaKey, hentDatoForSisteHendelse, useAgregerteSaker } from '../utils/saksoversiktUtils';
import { datoSynkende } from '../../../../../utils/date-utils';
import LazySpinner from '../../../../../components/LazySpinner';
import { useRestResource } from '../../../../../rest/consumer/useRestResource';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';

interface Props {
    valgtSakstema?: Sakstema;
}

export const sakstemakodeAlle = 'ALLE';

const SakstemaListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const StyledPanel = styled(Panel)`
    padding: 0rem;
    ol {
        list-style: none;
    }
`;

const TittelWrapper = styled.div`
    padding: ${pxToRem(15)};
    display: flex;
    align-items: flex-end;
    > *:not(:last-child) {
        margin-right: 1rem;
    }
`;

function GrupperteTema(props: { sakstema: Sakstema[]; valgtSakstema?: Sakstema }) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .map(sakstema => {
            return (
                <SakstemaListeElement
                    sakstema={sakstema}
                    key={getUnikSakstemaKey(sakstema)}
                    erValgt={
                        props.valgtSakstema
                            ? getUnikSakstemaKey(sakstema) === getUnikSakstemaKey(props.valgtSakstema)
                            : false
                    }
                />
            );
        });
    return <SakstemaListeStyle>{sakstemakomponenter}</SakstemaListeStyle>;
}

function SakstemaListe(props: Props) {
    const sakstemaResource = useRestResource(resources => resources.sakstema);
    const agregerteSaker = useAgregerteSaker();
    const tittelId = useRef(guid());

    if (!sakstemaResource.data || !agregerteSaker) {
        return <LazySpinner />;
    }

    const sakstema = sakstemaResource.data.resultat;

    if (sakstema.length === 0) {
        return <AlertStripeInfo>Det finnes ingen saker for bruker.</AlertStripeInfo>;
    }

    const sortertSakstema = sakstema.sort(datoSynkende(sakstema => hentDatoForSisteHendelse(sakstema)));

    return (
        <nav>
            <StyledPanel aria-labelledby={tittelId.current}>
                <TittelWrapper>
                    <Undertittel id={tittelId.current}>Tema</Undertittel>
                    <Normaltekst>({sortertSakstema.length} saker)</Normaltekst>
                </TittelWrapper>
                <nav aria-label="Velg sakstema">
                    <GrupperteTema
                        sakstema={[agregerteSaker, ...sortertSakstema]}
                        valgtSakstema={props.valgtSakstema}
                    />
                </nav>
            </StyledPanel>
        </nav>
    );
}

export default SakstemaListe;
