import * as React from 'react';
import { BegrensetTilgang, BegrensetTilgangTyper } from '../../models/person/person';
import { Periode } from '../../models/periode';
import FillCenterAndFadeIn from '../../components/FillCenterAndFadeIn';
import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import VisPeriode from '../../components/person/VisPeriode';
import { Sikkerhetstiltak } from '../../models/sikkerhetstiltak';
import BegrensetTilgangBegrunnelse from '../../components/person/BegrensetTilgangBegrunnelse';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
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

interface BegrensetTilgangProps {
    person: BegrensetTilgang;
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
        return <AlertStripeInfo>Kunne ikke vise opprett oppgave panel</AlertStripeInfo>;
    }

    return (
        <Ekspanderbartpanel
            tittel={'Avvist tilgang - opprett oppgave for videre behandling'}
            apen={apen}
            onClick={() => setApen(!apen)}
        >
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
function BegrensetTilgangSide({ person }: BegrensetTilgangProps) {
    const erEgenAnsatt = person.begrunnelse === BegrensetTilgangTyper.EgenAnsatt;
    return (
        <FillCenterAndFadeIn>
            <Wrapper>
                <AlertStripe type="advarsel">
                    <BegrensetTilgangBegrunnelse begrunnelseType={person.begrunnelse} />
                    {visSikkerhetstiltak(person.sikkerhetstiltak, erEgenAnsatt)}
                </AlertStripe>
                <OpprettOppgaveAvvistTilgang />
            </Wrapper>
        </FillCenterAndFadeIn>
    );
}

function visSikkerhetstiltak(sikkerhetstiltak?: Sikkerhetstiltak, erEgenAnsatt?: boolean) {
    if (!sikkerhetstiltak) {
        return null;
    }
    if (erEgenAnsatt) {
        return (
            <>
                <Undertittel>Egen ansatt</Undertittel>
            </>
        );
    }
    return (
        <>
            <Undertittel>Sikkerhetstiltak</Undertittel>
            {hentPeriode(sikkerhetstiltak.periode)}
            <Normaltekst>{sikkerhetstiltak.sikkerhetstiltaksbeskrivelse}</Normaltekst>
        </>
    );
}

function hentPeriode(periode?: Periode) {
    if (periode != null) {
        return <VisPeriode periode={periode} />;
    }
    return null;
}

export default BegrensetTilgangSide;
