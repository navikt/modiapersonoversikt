import React from 'react';
import styled from 'styled-components/macro';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { SakstemaListeElementCheckbox } from './SakstemaListeElement';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import { guid } from 'nav-frontend-js-utils';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { useHentAlleSakstemaFraResource, useSakstemaURLState } from '../useSakstemaURLState';

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

function SakstemaListe() {
    const alleSakstema = useHentAlleSakstemaFraResource();
    const { setAlleValgte, setIngenValgte } = useSakstemaURLState(alleSakstema);
    const tittelId = useRef(guid());

    return (
        <nav>
            <StyledPanel aria-labelledby={tittelId.current}>
                <TittelWrapper>
                    <Undertittel id={tittelId.current}>Tema</Undertittel>
                    <Normaltekst>({alleSakstema.length} saker)</Normaltekst>
                </TittelWrapper>
                <KnappeSeksjon>
                    <Knapp key={'Velg alle'} onClick={() => setAlleValgte()} htmlType="button" kompakt={true}>
                        Velg alle
                    </Knapp>
                    <Knapp key={'Velg ingen'} onClick={() => setIngenValgte()} htmlType="button" kompakt={true}>
                        Velg ingen
                    </Knapp>
                </KnappeSeksjon>
                <nav aria-label="Velg sakstema">
                    <SakstemaListeStyle>
                        {alleSakstema
                            .filter(
                                (sakstema) =>
                                    sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0
                            )
                            .map((sakstema) => {
                                return <SakstemaListeElementCheckbox sakstema={sakstema} key={sakstema.temakode} />;
                            })}
                    </SakstemaListeStyle>
                </nav>
            </StyledPanel>
        </nav>
    );
}

export default SakstemaListe;
