import * as React from 'react';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe from 'nav-frontend-alertstriper';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import { HarIkkeTilgang } from '../../redux/restReducers/tilgangskontroll';
import OppgaveSkjemaSkjermetPerson from './infotabs/meldinger/traadvisning/verktoylinje/oppgave/skjermetPerson/OppgaveSkjemaSkjermetPerson';
import { useRestResource } from '../../rest/consumer/useRestResource';
import { useFødselsnummer } from '../../utils/customHooks';
import { usePostResource } from '../../rest/consumer/usePostResource';
import { OpprettOppgaveRequest } from '../../models/meldinger/oppgave';
import { opprettOppgaveActionCreator } from '../../redux/restReducers/meldinger/opprettOppgave';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { useState } from 'react';
import useFeatureToggle from '../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../components/featureToggle/toggleIDs';

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
    const gsakTemaResource = useRestResource(resources => resources.oppgaveGsakTema);
    const gsakTema = gsakTemaResource?.data;
    const fnr = useFødselsnummer();
    const innloggetSaksbehanderResource = useRestResource(resources => resources.innloggetSaksbehandler);
    const innloggetSaksbehandler = innloggetSaksbehanderResource?.data;
    const opprettOppgaveResource = usePostResource(resources => resources.opprettOppgave);
    const dispatch = useDispatch();
    const opprettOppgave = (request: OpprettOppgaveRequest) => dispatch(opprettOppgaveActionCreator(request));
    const [apen, setApen] = useState(false);

    const lukk = () => {
        setApen(!apen);
    };

    if (!gsakTema || !innloggetSaksbehandler) {
        return (
            <AlertStripe type={'info'}>Kunne ikke vise opprett oppgave panel. Vennligst last siden på nytt</AlertStripe>
        );
    }

    return (
        <Ekspanderbartpanel tittel={'Opprett oppgave'} apen={apen} onClick={() => setApen(!apen)}>
            <OppgaveSkjemaSkjermetPerson
                gsakTema={gsakTema}
                gjeldendeBrukerFnr={fnr}
                innloggetSaksbehandler={innloggetSaksbehandler}
                opprettOppgaveResource={opprettOppgaveResource}
                opprettOppgave={opprettOppgave}
                lukkPanel={lukk}
            />
        </Ekspanderbartpanel>
    );
}
function BegrensetTilgangSide(props: BegrensetTilgangProps) {
    const enabled = useFeatureToggle(FeatureToggles.SkjermetPerson).isOn ?? false;
    return (
        <FillCenterAndFadeIn>
            <Wrapper>
                <AlertStripe type="advarsel">
                    <BegrensetTilgangBegrunnelse begrunnelseType={props.tilgangsData.ikkeTilgangArsak} />
                </AlertStripe>
                {enabled && <OpprettOppgaveAvvistTilgang />}
            </Wrapper>
        </FillCenterAndFadeIn>
    );
}

export default BegrensetTilgangSide;
