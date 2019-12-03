import * as React from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import EnkeltMelding from './EnkeltMelding';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import theme from '../../../../../styles/personOversiktTheme';
import { Ingress } from 'nav-frontend-typografi';
import { useRef, useState } from 'react';
import { useFocusOnMount } from '../../../../../utils/customHooks';
interface Props {
    traad: Traad;
}

const Wrapper = styled.article`
    ${theme.resetEkspanderbartPanelStyling}
    > *:not(:first-child) {
        margin-top: 1rem;
    }
    > * {
        border: ${theme.border.skille};
    }
`;

const StyledEkspanderbartpanel = styled(EkspanderbartpanelBasePure)`
    overflow: hidden;
    .ekspanderbartPanel__hode:focus {
        ${theme.focusInset};
    }
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    const [apen, setApen] = useState(props.defaultApen);
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
            <StyledEkspanderbartpanel
                apen={apen}
                onClick={() => setApen(value => !value)}
                collapseProps={{ hasNestedCollapse: true, forceInitialAnimation: false }} // Litt trøbbel med mye hopping pga nestede ekspanderebare paneler
                heading={<Ingress>{props.tittel}</Ingress>}
            >
                {meldinger}
            </StyledEkspanderbartpanel>
        );
    }

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
        <Wrapper>
            <h3 tabIndex={-1} className="sr-only" ref={ref}>
                Tråd under arbeid
            </h3>
            <Traadpanel traad={traadUtenDelviseSvar} tittel="Vis tidligere meldinger" defaultApen={defaultApen} />
            <Traadpanel traad={delsvar} tittel="Vis alle delsvar" defaultApen={defaultApen} />
        </Wrapper>
    );
}

export default TidligereMeldinger;
