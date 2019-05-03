import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../../redux/reducers';
import { DeprecatedRestResource, isLoaded } from '../../../redux/restReducers/deprecatedRestResource';
import { FeatureToggles } from '../../featureToggle/toggleIDs';
import { useClickOutside } from '../../../utils/customHooks';
import TilbakemeldingPopup from './TilbakemeldingPopup';
import theme, { pxToRem } from '../../../styles/personOversiktTheme';
import { loggEvent } from '../../../utils/frontendLogger';
import { apneIkon, lukkeIkon } from './TilbakemeldingIkoner';

const localstoragePrefix = 'modiapersonoversikt__tilbakemelding__';
const localstorageId = 'hurtigreferat';

interface Props {
    featureErPa: boolean;
}

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

function TilbakemeldingFab(props: Props) {
    const localStorageKey = `${localstoragePrefix}${localstorageId}`;
    const [besvart, settBesvart] = React.useState(Boolean(window.localStorage.getItem(localStorageKey)));
    const [erApen, settErApen] = React.useState(false);
    const wrapper = React.createRef<HTMLDivElement>();
    useClickOutside(wrapper, () => settErApen(false));

    const skalVises = props.featureErPa && (erApen || !besvart);
    if (!skalVises) {
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
        <TilbakemeldingWrapper ref={wrapper}>
            <TilbakemeldingPopup erApen={erApen} besvart={besvart} settBesvart={settBesvartCallback} />
            <TilbakemeldingBtn onClick={() => settErApen(!erApen)}>
                <img src={ikon} alt="" />
                <span className="sr-only">{erApen ? 'Lukk tilbakemelding' : 'Vis tilbakemelding'}</span>
            </TilbakemeldingBtn>
        </TilbakemeldingWrapper>
    );
}

function mapStateToProps(state: AppState) {
    const featureToggles: DeprecatedRestResource<FeatureToggles> = state.restResources.featureToggles;
    if (!isLoaded(featureToggles)) {
        return { featureErPa: false };
    }
    return { featureErPa: featureToggles.data[FeatureToggles.VisTilbakemelding] };
}

export default connect(mapStateToProps)(TilbakemeldingFab);
