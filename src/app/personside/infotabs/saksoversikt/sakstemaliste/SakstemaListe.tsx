import React from 'react';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { SakstemaListeElementCheckbox } from './SakstemaListeElement';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { getUnikSakstemaKey } from '../utils/saksoversiktUtils';
import { useSakstemaer } from '../SakstemaContext';

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

const KnappeSeksjon = styled.section`
    width: 100%;
    padding: 0 ${pxToRem(15)} ${pxToRem(15)} ${pxToRem(15)};
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

interface Props {
    valgtSakstema: Sakstema;
    sortertSakstemaListe: Sakstema[];
}

function SakstemaListe(props: Props) {
    const { filtrerPaTema } = useSakstemaer();
    const tittelId = useRef(guid());

    function velgAlleTema() {
        filtrerPaTema(props.sortertSakstemaListe);
    }

    function velgIngenTema() {
        filtrerPaTema([]);
    }

    function sakstemaErValgt(sakstema: Sakstema): boolean {
        const valgteTemakoder = props.valgtSakstema.temakode.split('-');
        return valgteTemakoder.includes(sakstema.temakode.split('-')[0]) || valgteTemakoder[0] === sakstemakodeAlle;
    }

    return (
        <nav>
            <StyledPanel aria-labelledby={tittelId.current}>
                <TittelWrapper>
                    <Undertittel id={tittelId.current}>Tema</Undertittel>
                    <Normaltekst>({props.sortertSakstemaListe.length} saker)</Normaltekst>
                </TittelWrapper>
                <KnappeSeksjon>
                    <Knapp key={'Velg alle'} onClick={() => velgAlleTema()} htmlType="button" kompakt={true}>
                        Velg alle
                    </Knapp>
                    <Knapp key={'Velg ingen'} onClick={() => velgIngenTema()} htmlType="button" kompakt={true}>
                        Velg ingen
                    </Knapp>
                </KnappeSeksjon>
                <nav aria-label="Velg sakstema">
                    <SakstemaListeStyle>
                        {props.sortertSakstemaListe
                            .filter(
                                (sakstema) =>
                                    sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0
                            )
                            .map((sakstema) => {
                                return (
                                    <SakstemaListeElementCheckbox
                                        sakstema={sakstema}
                                        key={getUnikSakstemaKey(sakstema)}
                                        erValgt={sakstemaErValgt(sakstema)}
                                    />
                                );
                            })}
                    </SakstemaListeStyle>
                </nav>
            </StyledPanel>
        </nav>
    );
}

export default SakstemaListe;
