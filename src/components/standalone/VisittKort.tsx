import * as React from 'react';
import VisittkortLaster from './VisittKortLaster';
import ErrorBoundary from '../ErrorBoundary';
import Kontrollsporsmal from '../../app/personside/kontrollsporsmal/Kontrollsporsmal';
import LyttPåNyttFnrIReduxOgHentAllPersoninfo from '../../app/PersonOppslagHandler/LyttPåNyttFnrIReduxOgHentAllPersoninfo';
import SetFnrIRedux from '../../app/PersonOppslagHandler/SetFnrIRedux';
import theme from '../../styles/personOversiktTheme';
import styled from 'styled-components/macro';
import TilbakemeldingFab from './Tilbakemelding/TilbakemeldingFab';
import { FeatureToggles } from '../featureToggle/toggleIDs';
import IfFeatureToggleOn from '../featureToggle/IfFeatureToggleOn';
import FetchSessionInfoOgLeggIRedux from '../../app/FetchSessionInfoOgLeggIRedux';

interface Props {
    fødselsnummer: string;
}

const Styles = styled.div`
    overflow-y: auto;
    .visually-hidden {
        ${theme.visuallyHidden}
    }
`;

const temaId = 'sporsamtalePilot';
const sporsmal = 'Synes du «Spor samtale» er en effektiv måte å dokumentere samtale med bruker?';
const kommentarLabel =
    'Hva er bra, hva kunne vært bedre og er det noe du savner? Andre tilbakemelding? Alle tilbakemeldinger er anonyme.';

class VisittkortStandAlone extends React.Component<Props> {
    render() {
        return (
            <ErrorBoundary>
                <Styles>
                    <FetchSessionInfoOgLeggIRedux />
                    <SetFnrIRedux fødselsnummer={this.props.fødselsnummer} />
                    <LyttPåNyttFnrIReduxOgHentAllPersoninfo />
                    <Kontrollsporsmal />
                    <VisittkortLaster />

                    <IfFeatureToggleOn toggleID={FeatureToggles.VisTilbakemelding}>
                        <TilbakemeldingFab temaId={temaId} sporsmal={sporsmal} kommentarLabel={kommentarLabel} />
                    </IfFeatureToggleOn>
                </Styles>
            </ErrorBoundary>
        );
    }
}

export default VisittkortStandAlone;
