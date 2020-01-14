import * as React from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { useRef } from 'react';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import theme from '../../../../../styles/personOversiktTheme';

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
    ${theme.resetEkspanderbartPanelStyling};
    border: ${theme.border.skille};
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    const meldinger = props.traad.map(melding => (
        <EnkeltMelding
            key={melding.id}
            melding={melding}
            erEnkeltstaende={props.traad.length === 1}
            defaultApen={props.defaultApen}
        />
    ));
    return <>{meldinger}</>;
}

function TidligereMeldinger(props: Props) {
    const ref = useRef<HTMLHeadingElement>(null);
    const traadUtenDelviseSvar = props.traad.meldinger.filter(
        melding => melding.meldingstype !== Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );
    const delsvar = props.traad.meldinger.filter(
        melding => melding.meldingstype === Meldingstype.DELVIS_SVAR_SKRIFTLIG
    );

    useFocusOnMount(ref);

    const defaultApen = delsvar.length > 0 || traadUtenDelviseSvar.length === 1;

    return (
        <StyledArticle>
            <h3 tabIndex={-1} className="sr-only" ref={ref}>
                Tråd under arbeid
            </h3>
            <Traadpanel traad={traadUtenDelviseSvar} tittel="Vis tidligere meldinger" defaultApen={defaultApen} />
            <Traadpanel traad={delsvar} tittel="Vis alle delsvar" defaultApen={defaultApen} />
        </StyledArticle>
    );
}

export default TidligereMeldinger;
