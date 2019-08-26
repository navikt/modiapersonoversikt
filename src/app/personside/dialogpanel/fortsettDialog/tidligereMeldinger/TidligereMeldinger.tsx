import * as React from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import EnkeltMelding from './EnkeltMelding';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../../styles/personOversiktTheme';
import { Ingress } from 'nav-frontend-typografi';

interface Props {
    traad: Traad;
}

const Wrapper = styled.div`
    ${theme.resetEkspanderbartPanelStyling}
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    > * {
        border: ${theme.border.skille};
    }
`;

const StyledEkspanderbartpanel = styled(EkspanderbartpanelBase)`
    overflow: hidden;
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    const flereMeldinger = props.traad.length > 1;
    const meldinger = props.traad.map(melding => (
        <EnkeltMelding
            key={melding.id}
            melding={melding}
            erEnkeltstaende={props.traad.length === 1}
            defaultApen={props.defaultApen && !flereMeldinger}
        />
    ));

    if (flereMeldinger) {
        return (
            <StyledEkspanderbartpanel heading={<Ingress>{props.tittel}</Ingress>} apen={props.defaultApen}>
                {meldinger}
            </StyledEkspanderbartpanel>
        );
    }

    return <>{meldinger}</>;
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
        <Wrapper>
            <Traadpanel traad={traadUtenDelviseSvar} tittel="Vis tidligere meldinger" defaultApen={defaultApen} />
            <Traadpanel traad={delsvar} tittel="Vis alle delsvar" defaultApen={defaultApen} />
        </Wrapper>
    );
}

export default TidligereMeldinger;
