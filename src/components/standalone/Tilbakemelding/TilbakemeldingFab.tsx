import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../../utils/customHooks';
import TilbakemeldingPopup from './TilbakemeldingPopup';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import { loggEvent } from '../../../utils/frontendLogger';
import { apneIkon, lukkeIkon } from './TilbakemeldingIkoner';

const localstoragePrefix = 'modiapersonoversikt__tilbakemelding__';

const TilbakemeldingWrapper = styled.div``;
const TilbakemeldingBtn = styled.button`
    position: fixed;
    bottom: ${theme.margin.px20};
    right: ${theme.margin.px20};
    width: ${pxToRem(64)};
    height: ${pxToRem(64)};
    padding-top: ${theme.margin.px10};
    border-radius: 50%;
    border: none;
    background-color: white;
    box-shadow: 0 ${pxToRem(6)} ${pxToRem(10)} 0 ${theme.color.gråSkrift};
    transition: all 0.1s ease-in-out;
    z-index: 999;

    &:hover {
        box-shadow: 0 ${pxToRem(6)} ${pxToRem(14)} 0 ${theme.color.gråSkrift};
        transform: scale(1.15);
        cursor: pointer;
    }

    &:focus {
        ${theme.focus}
    }
`;

interface Props {
    temaId: string;
    sporsmal: string;
    kommentarLabel: string;
}

function tilfredshetErValg(tilfredshet: number) {
    return tilfredshet >= 0;
}

function TilbakemeldingFab(props: Props) {
    const localStorageKey = `${localstoragePrefix}${props.temaId}`;
    const erBesvartFraLocalStorage = Boolean(window.localStorage.getItem(localStorageKey));
    const [erBesvart, settErBesvart] = React.useState(erBesvartFraLocalStorage);
    const [erApen, settErApen] = React.useState(false);
    const wrapper = React.createRef<HTMLDivElement>();

    const clickOutsideHandler = useCallback(() => settErApen(false), [settErApen]);
    useClickOutside(wrapper, clickOutsideHandler);

    if (erBesvart && !erApen) {
        return null;
    }

    const settBesvartCallback = (tilfredshet: number, kommentar: string) => {
        settErBesvart(true);
        window.localStorage.setItem(localStorageKey, 'true');

        if (tilfredshetErValg(tilfredshet)) {
            loggEvent(
                'tilbakemelding',
                props.temaId,
                {},
                {
                    tilfredshet,
                    kommentar
                }
            );
        } else {
            settErApen(false);
        }
    };

    const ikon = erApen ? lukkeIkon : apneIkon;
    return (
        <TilbakemeldingWrapper ref={wrapper}>
            <TilbakemeldingPopup
                erApen={erApen}
                besvart={erBesvart}
                settBesvart={settBesvartCallback}
                sporsmal={props.sporsmal}
                kommentarLabel={props.kommentarLabel}
            />
            <TilbakemeldingBtn onClick={() => settErApen(!erApen)}>
                <img src={ikon} alt="" />
                <span className="sr-only">{erApen ? 'Lukk tilbakemelding' : 'Vis tilbakemelding'}</span>
            </TilbakemeldingBtn>
        </TilbakemeldingWrapper>
    );
}
export default TilbakemeldingFab;
