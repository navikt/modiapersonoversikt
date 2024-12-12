import AlertStripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import gsaktemaResource from '../../rest/resources/gsaktemaResource';
import type { HarIkkeTilgang } from '../../rest/resources/tilgangskontrollResource';
import OppgaveSkjemaBegrensetTilgang from './infotabs/meldinger/traadvisning/verktoylinje/oppgave/BegrensetTilgang/OppgaveSkjemaBegrensetTilgang';

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
            <Ekspanderbartpanel
                tittel={'Opprett oppgave'}
                apen={apen}
                onClick={togglePanel}
                collapseProps={{ style: { overflow: 'initial', height: 'auto' } }}
            >
                <OppgaveSkjemaBegrensetTilgang gsakTema={gsaktema} lukkPanel={togglePanel} />
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
