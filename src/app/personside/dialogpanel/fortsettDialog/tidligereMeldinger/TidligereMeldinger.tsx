import * as React from 'react';
import { useRef } from 'react';
import { Melding, Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components/macro';
import EnkeltMelding from './EnkeltMelding';
import { useFocusOnMount } from '../../../../../utils/customHooks';
import theme from '../../../../../styles/personOversiktTheme';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    traad: Traad;
}

const StyledOl = styled.ol`
    margin-top: 1rem;
    border: ${theme.border.skille};
    border-radius: 0.25rem;
    > li:not(:last-child) {
        margin-bottom: 0.1rem;
    }
`;

function Traadpanel(props: { traad: Melding[]; tittel: string; defaultApen: boolean }) {
    if (props.traad.length === 0) {
        return null;
    }

    const meldinger = props.traad.map(melding => (
        <EnkeltMelding
            key={melding.id}
            melding={melding}
            erEnkeltstaende={props.traad.length === 1}
            defaultApen={props.defaultApen}
        />
    ));

    return <StyledOl aria-label={props.tittel}>{meldinger}</StyledOl>;
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
        <article aria-describedby={tittelId.current}>
            <h3 tabIndex={-1} className="sr-only" ref={ref} id={tittelId.current}>
                Tidligere meldinger
            </h3>
            <Traadpanel traad={traadUtenDelviseSvar} tittel="Dialog" defaultApen={defaultApen} />
            <Traadpanel traad={delsvar} tittel="Delsvar" defaultApen={defaultApen} />
        </article>
    );
}

export default TidligereMeldinger;
