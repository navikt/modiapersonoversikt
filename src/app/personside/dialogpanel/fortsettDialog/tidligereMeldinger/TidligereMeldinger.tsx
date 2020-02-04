import * as React from 'react';
import { useRef, useState } from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { pxToRem, theme } from '../../../../../styles/personOversiktTheme';
import { guid } from 'nav-frontend-js-utils';
import ErrorBoundary from '../../../../../components/ErrorBoundary';
import { EkspanderbartpanelBasePure } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    traad: Traad;
}

const StyledLi = styled.li`
    position: relative;
    border-bottom: 1px solid ${theme.color.navGra20};
`;

const StyledEkspanderbartpanel = styled(EkspanderbartpanelBasePure)`
    overflow: hidden;
    .ekspanderbartPanel__hode:focus {
        ${theme.focusInset};
    }
`;

const StyledOl = styled.ol`
    margin-top: 1rem;
    border: ${theme.border.skille};
    border-radius: 0.25rem;
    > li:not(:last-child) {
        margin-bottom: 0.1rem;
    }
`;

const StyledUndertittel = styled(Undertittel)`
    font-size: ${pxToRem(18)} !important;
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    const [apen, setApen] = useState(props.defaultApen);
    if (props.traad.length === 0) {
        return null;
    }

    const flereMeldinger = props.traad.length > 1;
    console.log(props.traad.length);
    console.log(flereMeldinger);

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
            <StyledEkspanderbartpanel
                apen={apen}
                onClick={() => setApen(value => !value)}
                collapseProps={{
                    hasNestedCollapse: true,
                    forceInitialAnimation: false
                }} // Litt trøbbel med mye hopping pga nestede ekspanderebare paneler
                heading={<StyledUndertittel>{props.tittel}</StyledUndertittel>}
            >
                <StyledOl aria-label={props.tittel}>{meldinger}</StyledOl>
            </StyledEkspanderbartpanel>
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
            <article aria-labelledby={tittelId.current}>
                <h3 tabIndex={-1} className="sr-only" id={tittelId.current}>
                    Tidligere meldinger
                </h3>
                <Traadpanel traad={traadUtenDelviseSvar} tittel="Tidligere meldinger" defaultApen={defaultApen} />
                <Traadpanel traad={delsvar} tittel="Delsvar" defaultApen={defaultApen} />
            </article>
        </ErrorBoundary>
    );
}

export default TidligereMeldinger;
