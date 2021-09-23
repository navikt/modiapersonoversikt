import * as React from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { theme } from '../../../../../styles/personOversiktTheme';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    .ekspanderbartPanel__innhold {
        padding: 0rem;
    }
    > *:not(:last-child) {
        margin-bottom: 0.5rem;
    }
    margin-top: 0.7rem;
`;

const StyledLi = styled.li`
    position: relative;
`;

const StyledPanel = styled(Panel)`
    padding: 0rem;
    margin-top: 0.1rem;
    > li:not(:last-child) {
        margin-bottom: 0.1rem;
    }
    > li:not(:only-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    if (props.traad.length === 0) {
        return null;
    }

    const flereMeldinger = props.traad.length > 1;
    const meldinger = props.traad.map((melding, index) => {
        const meldingnummer = props.traad.length - index;

        return (
            <StyledLi key={index}>
                <EnkeltMelding
                    key={melding.id}
                    melding={melding}
                    erEnkeltstaende={props.traad.length === 1}
                    defaultApen={props.defaultApen && !flereMeldinger}
                    meldingsNummer={meldingnummer}
                />
            </StyledLi>
        );
    });

    if (flereMeldinger) {
        return (
            <Ekspanderbartpanel
                renderContentWhenClosed={true}
                apen={false}
                tittel={<Undertittel>{props.tittel}</Undertittel>}
                border={true}
            >
                <StyledPanel>
                    <ol>{meldinger}</ol>
                </StyledPanel>
            </Ekspanderbartpanel>
        );
    } else {
        return (
            <StyledPanel aria-label={props.tittel}>
                <ol>{meldinger}</ol>
            </StyledPanel>
        );
    }
}

function TidligereMeldinger(props: Props) {
    const traadUtenDelviseSvar = props.traad.meldinger.filter(
        melding => melding.meldingstype !== Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );
    const delsvar = props.traad.meldinger.filter(
        melding => melding.meldingstype === Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );

    const defaultApen = delsvar.length > 0 || traadUtenDelviseSvar.length === 1;

    return (
        <ErrorBoundary boundaryName="Tidligere meldinger">
            <StyledArticle>
                <Traadpanel traad={traadUtenDelviseSvar} tittel="Tidligere meldinger" defaultApen={defaultApen} />
                <Traadpanel traad={delsvar} tittel="Delsvar" defaultApen={defaultApen} />
            </StyledArticle>
        </ErrorBoundary>
    );
}

export default TidligereMeldinger;
