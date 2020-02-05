import * as React from 'react';
import { useRef } from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { theme } from '../../../../../styles/personOversiktTheme';
import { guid } from 'nav-frontend-js-utils';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    .ekspanderbartPanel__innhold {
        padding: 0rem;
    }
    margin-top: 0.7rem;
`;

const StyledLi = styled.li`
    position: relative;
    border-bottom: 1px solid ${theme.color.navGra20};
`;

const StyledOl = styled.ol`
    margin-top: 0.1rem;
    border: ${theme.border.skille};
    > li:not(:last-child) {
        margin-bottom: 0.1rem;
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
            <StyledLi>
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
            <Ekspanderbartpanel apen={false} tittel={props.tittel} tag="undertittel" border={true}>
                <StyledOl aria-label={props.tittel}>{meldinger}</StyledOl>
            </Ekspanderbartpanel>
        );
    } else {
        return <StyledOl aria-label={props.tittel}>{meldinger}</StyledOl>;
    }
}

function TidligereMeldinger(props: Props) {
    const traadUtenDelviseSvar = props.traad.meldinger.filter(
        melding => melding.meldingstype !== Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );
    const delsvar = props.traad.meldinger.filter(
        melding => melding.meldingstype === Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );
    const tittelId = useRef(guid());

    const defaultApen = delsvar.length > 0 || traadUtenDelviseSvar.length === 1;

    return (
        <ErrorBoundary boundaryName="Tidligere meldinger">
            <StyledArticle>
                <h3 tabIndex={-1} className="sr-only" id={tittelId.current}>
                    Tidligere meldinger
                </h3>
                <Traadpanel traad={traadUtenDelviseSvar} tittel="Tidligere meldinger" defaultApen={defaultApen} />
                <Traadpanel traad={delsvar} tittel="Delsvar" defaultApen={defaultApen} />
            </StyledArticle>
        </ErrorBoundary>
    );
}

export default TidligereMeldinger;
