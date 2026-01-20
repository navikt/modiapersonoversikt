import { guid } from 'nav-frontend-js-utils';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { CheckboksPanelGruppe, type CheckboksPanelProps } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useRef } from 'react';
import styled from 'styled-components';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import { pxToRem } from '../../../../../styles/personOversiktTheme';
import { useHentAlleSakstemaFraResourceV2, useSakstemaURLStateV2 } from '../useSakstemaURLState';
import { aggregertSakstemaV2, sakstemakodeAlle } from '../utils/saksoversiktUtilsV2';
import SakstemaListeElementCheckboksV2 from './SakstemaListeElementCheckboksV2';
import { filtrerSakstemaerUtenDataV2 } from './SakstemaListeUtils';

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

const StyledCheckboksPanelGruppe = styled(CheckboksPanelGruppe)`
    label {
        border: 0;
        border-top: 1px solid #6a6a6a;
        border-radius: 0;

        &.inputPanel--checked {
            background-color: transparent;
        }

        &.inputPanel:not(:last-child) {
            margin-bottom: 0;
        }

        &.inputPanel:hover:not(.inputPanel--disabled):not(.bekreftCheckboksPanel) {
            border: 0;
            border-top: 1px solid #6a6a6a;
            box-shadow: none;
        }
    }
`;

function SakstemaListe() {
    const { alleSakstema } = useHentAlleSakstemaFraResourceV2();
    const { setAlleValgte, setIngenValgte, toggleValgtSakstema, valgteSakstemaer } =
        useSakstemaURLStateV2(alleSakstema);
    const tittelId = useRef(guid());

    function sakstemaErValgt(sakstema: Sakstema): boolean {
        const valgteTemakoder: string[] = valgteSakstemaer.map((sakstema) => sakstema.temakode);
        return valgteTemakoder.includes(sakstema.temakode) || valgteTemakoder[0] === sakstemakodeAlle;
    }

    const checkbokser = filtrerSakstemaerUtenDataV2(alleSakstema).map((sakstema) => {
        return {
            label: <SakstemaListeElementCheckboksV2 sakstema={sakstema} key={sakstema.temakode} />,
            value: sakstema.temakode,
            id: sakstema.temakode,
            checked: sakstemaErValgt(sakstema)
        } as CheckboksPanelProps;
    });

    return (
        <nav>
            <StyledPanel aria-labelledby={tittelId.current}>
                <TittelWrapper>
                    <Undertittel id={tittelId.current}>Tema</Undertittel>
                    <Normaltekst>({checkbokser.length} saker)</Normaltekst>
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
                    <ol>
                        <StyledCheckboksPanelGruppe
                            checkboxes={checkbokser}
                            onChange={(_, value) => {
                                toggleValgtSakstema(
                                    alleSakstema.find((sakstema) => sakstema.temakode === value) ??
                                        aggregertSakstemaV2(alleSakstema)
                                );
                            }}
                        />
                    </ol>
                </nav>
            </StyledPanel>
        </nav>
    );
}

export default SakstemaListe;
