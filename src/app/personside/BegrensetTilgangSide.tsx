import AlertStripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import { useCallback, useState } from 'react';
import type { HarIkkeTilgang } from 'src/rest/resources/tilgangskontrollResource';
import styled from 'styled-components';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import gsaktemaResource from '../../rest/resources/gsaktemaResource';
import OppgaveSkjemaBegrensetTilgang from './infotabs/meldinger/traadvisning/verktoylinje/oppgave/BegrensetTilgang/OppgaveSkjemaBegrensetTilgang';

interface BegrensetTilgangProps {
    tilgangsData: HarIkkeTilgang;
}

const Wrapper = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  > *:first-child {
    margin-bottom: 1rem;
  }
`;

const StyledModalWrapper = styled(ModalWrapper)`
    &.modal {
        padding: 1rem;
        min-width: 30rem;
    }
`;

const Styledknapp = styled(Hovedknapp)`
   max-width: 15rem;
`;

const StyledSystemtittel = styled(Systemtittel)`
    text-align: center;
    margin: 0.75rem 0rem 1rem 1rem;
`;

function OpprettOppgaveAvvistTilgang() {
    const [apen, setApen] = useState(false);
    const togglePanel = useCallback(() => setApen((it) => !it), [setApen]);
    return gsaktemaResource.useRenderer({
        ifError: (
            <AlertStripe type="info">Kunne ikke vise opprett oppgave panel. Vennligst last siden på nytt</AlertStripe>
        ),
        ifData: (gsaktema) => (
            <>
                <Styledknapp mini htmlType="button" onClick={togglePanel}>
                    Opprett Oppgave
                </Styledknapp>
                <StyledModalWrapper contentLabel="Opprett oppgave" isOpen={apen} onRequestClose={togglePanel}>
                    <StyledSystemtittel>Opprett oppgave</StyledSystemtittel>
                    <OppgaveSkjemaBegrensetTilgang gsakTema={gsaktema} lukkPanel={togglePanel} />
                </StyledModalWrapper>
            </>
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
