import React from 'react';
import styled from 'styled-components';
import { FeatureToggles } from '../../featureToggle/toggleIDs';
import { useClickOutside } from '../../../utils/customHooks';
import TilbakemeldingPopup from './TilbakemeldingPopup';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import { loggEvent } from '../../../utils/frontendLogger';
import { apneIkon, lukkeIkon } from './TilbakemeldingIkoner';
import IfFeatureToggleOn from '../../featureToggle/IfFeatureToggleOn';

const localstoragePrefix = 'modiapersonoversikt__tilbakemelding__';
const localstorageId = 'hurtigreferat';
const sporsmal = 'Her kan vi skrive spørsmålet... lorem ipsum etc, bare for å få litt tekst her';

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
    box-shadow: 0 6px 10px 0 ${theme.color.gråSkrift};
    transition: all 0.1s ease-in-out;
    z-index: 999;

    &:hover {
        box-shadow: 0 6px 14px 0 ${theme.color.gråSkrift};
        transform: scale(1.15);
        cursor: pointer;
    }

    &:focus {
        ${theme.focus}
    }
`;

function TilbakemeldingFab() {
    const localStorageKey = `${localstoragePrefix}${localstorageId}`;
    const [besvart, settBesvart] = React.useState(Boolean(window.localStorage.getItem(localStorageKey)));
    const [erApen, settErApen] = React.useState(false);
    const wrapper = React.createRef<HTMLDivElement>();
    useClickOutside(wrapper, () => settErApen(false));

    if (besvart && !erApen) {
        return null;
    }

    const settBesvartCallback = (tilfredshet: number, kommentar: string) => {
        settBesvart(true);
        window.localStorage.setItem(localStorageKey, 'true');

        if (tilfredshet >= 0) {
            loggEvent('tilbakemelding', 'tilbakemelding', {
                feature: localstorageId,
                tilfredshet,
                kommentar
            });
        } else {
            settErApen(false);
        }
    };

    const ikon = erApen ? lukkeIkon : apneIkon;
    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.VisTilbakemelding}>
            <TilbakemeldingWrapper ref={wrapper}>
                <TilbakemeldingPopup
                    erApen={erApen}
                    besvart={besvart}
                    settBesvart={settBesvartCallback}
                    sporsmal={sporsmal}
                />
                <TilbakemeldingBtn onClick={() => settErApen(!erApen)}>
                    <img src={ikon} alt="" />
                    <span className="sr-only">{erApen ? 'Lukk tilbakemelding' : 'Vis tilbakemelding'}</span>
                </TilbakemeldingBtn>
            </TilbakemeldingWrapper>
        </IfFeatureToggleOn>
    );
}
export default TilbakemeldingFab;
