import * as React from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import { useRef, useState } from 'react';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    traad: Traad;
}

const StyledArticle = styled.article`
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

const StyledUndertittel = styled(Undertittel)`
    font-size: ${pxToRem(18)} !important;
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
                heading={<StyledUndertittel>{props.tittel}</StyledUndertittel>}
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
    const tittelId = useRef(guid());

    useFocusOnMount(ref);

    const defaultApen = delsvar.length > 0 || traadUtenDelviseSvar.length === 1;

    return (
        <StyledArticle aria-describedby={tittelId.current}>
            <h3 tabIndex={-1} className="sr-only" ref={ref} id={tittelId.current}>
                Tidligere meldinger
            </h3>
            <Traadpanel traad={traadUtenDelviseSvar} tittel="Vis tidligere meldinger" defaultApen={defaultApen} />
            <Traadpanel traad={delsvar} tittel="Vis alle delsvar" defaultApen={defaultApen} />
        </StyledArticle>
    );
}

export default TidligereMeldinger;
