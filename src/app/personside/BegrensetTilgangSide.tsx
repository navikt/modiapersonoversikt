import * as React from 'react';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import OppgaveSkjemaSkjermetPerson from './infotabs/meldinger/traadvisning/verktoylinje/oppgave/skjermetPerson/OppgaveSkjemaSkjermetPerson';
import styled from 'styled-components/macro';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useState, useCallback } from 'react';
import gsaktemaResource from '../../rest/resources/gsaktemaResource';
import { HarIkkeTilgang } from '../../rest/resources/tilgangskontrollResource';

interface BegrensetTilgangProps {
    tilgangsData: HarIkkeTilgang;
}

const Wrapper = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    flex-grow: 0;
    > *:first-child {
        margin-bottom: 1rem;
    }
`;

function OpprettOppgaveAvvistTilgang() {
    const [apen, setApen] = useState(false);
    const togglePanel = useCallback(() => setApen((it) => !it), [setApen]);
    return gsaktemaResource.useRenderer({
        ifError: (
            <AlertStripe type="info">Kunne ikke vise opprett oppgave panel. Vennligst last siden på nytt</AlertStripe>
        ),
        ifData: (gsaktema) => (
            <Ekspanderbartpanel tittel={'Opprett oppgave'} apen={apen} onClick={togglePanel}>
                <OppgaveSkjemaSkjermetPerson gsakTema={gsaktema} lukkPanel={togglePanel} />
            </Ekspanderbartpanel>
        )
    });
}

function BegrensetTilgangSide(props: BegrensetTilgangProps) {
    return (
        <FillCenterAndFadeIn>
            <Wrapper>
                <AlertStripe type="advarsel">
                    <BegrensetTilgangBegrunnelse begrunnelseType={props.tilgangsData.ikkeTilgangArsak} />
                </AlertStripe>
                <OpprettOppgaveAvvistTilgang />
            </Wrapper>
        </FillCenterAndFadeIn>
    );
}

export default BegrensetTilgangSide;
