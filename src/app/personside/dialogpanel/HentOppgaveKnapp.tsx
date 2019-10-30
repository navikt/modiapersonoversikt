import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { velgTemagruppeForPlukk } from '../../../redux/session/session';
import { AppState } from '../../../redux/reducers';
import { settJobberMedSpørsmålOgSvar } from '../kontrollsporsmal/cookieUtils';
import { isFailedPosting, isPosting } from '../../../rest/utils/postResource';
import theme from '../../../styles/personOversiktTheme';
import TildelteOppgaver from './TildelteOppgaver';
import { paths } from '../../routes/routing';
import { INFOTABS } from '../infotabs/InfoTabEnum';
import { Temagruppe, temagruppeTekst, TemaPlukkbare } from '../../../models/Temagrupper';

const HentOppgaveLayout = styled.article`
    text-align: center;
    padding: ${theme.margin.layout};
    label {
        ${theme.visuallyHidden}
    }
`;

const KnappLayout = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 0.4em;
    > * {
        margin-right: 0.4em;
        flex-grow: 1;
    }
    > *:first-child {
        margin-bottom: 0.6em;
        white-space: nowrap;
    }
    > *:last-child {
        margin-bottom: 0.4em;
    }
`;

type Props = RouteComponentProps<{}>;

function HentOppgaveKnapp(props: Props) {
    const [tomKø, setTomKø] = useState(false);
    const [temaGruppeFeilmelding, setTemaGruppeFeilmelding] = useState(false);
    const dispatch = useDispatch();
    const oppgaveResource = useSelector((state: AppState) => state.restResources.plukkNyeOppgaver);
    const velgTemaGruppe = (temagruppe: Temagruppe) => dispatch(velgTemagruppeForPlukk(temagruppe));
    const valgtTemaGruppe = useSelector((state: AppState) => state.session.temagruppeForPlukk);

    const onPlukkOppgaver = () => {
        if (!valgtTemaGruppe) {
            setTemaGruppeFeilmelding(true);
            return;
        }
        setTemaGruppeFeilmelding(false);
        setTomKø(false);
        settJobberMedSpørsmålOgSvar();
        dispatch(
            oppgaveResource.actions.post({}, response => {
                if (response.length === 0) {
                    setTomKø(true);
                    return;
                }
                const oppgave = response[0];
                const fødselsnummer = oppgave.fødselsnummer;
                props.history.push(
                    `${paths.personUri}/${fødselsnummer}/${INFOTABS.MELDINGER.toLowerCase()}/${oppgave.traadId}`
                );
            })
        );
    };

    const onTemagruppeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        velgTemaGruppe(event.target.value as Temagruppe);
        setTemaGruppeFeilmelding(false);
    };

    const tomtTilbakemelding = tomKø ? (
        <AlertStripeInfo>Det er ingen nye oppgaver på valgt temagruppe</AlertStripeInfo>
    ) : null;
    const temagruppeOptions = TemaPlukkbare.map(temagruppe => (
        <option value={temagruppe} key={temagruppe}>
            {temagruppeTekst(temagruppe)}
        </option>
    ));
    return (
        <HentOppgaveLayout>
            <h2 className="sr-only">Hent oppgave</h2>
            <KnappLayout>
                <Select
                    label="Hent oppgave fra temagruppe"
                    value={valgtTemaGruppe || ''}
                    onChange={onTemagruppeChange}
                    feil={temaGruppeFeilmelding ? { feilmelding: 'Du må velge temagruppe' } : undefined}
                >
                    <option disabled={true} value={''}>
                        Velg temagruppe
                    </option>
                    {temagruppeOptions}
                </Select>
                <KnappBase
                    id="hentoppgaveknapp"
                    type="hoved"
                    onClick={onPlukkOppgaver}
                    spinner={isPosting(oppgaveResource)}
                >
                    Hent oppgave
                </KnappBase>
            </KnappLayout>
            {isFailedPosting(oppgaveResource) && <AlertStripeAdvarsel>Det skjedde en teknisk feil</AlertStripeAdvarsel>}
            {tomtTilbakemelding}
            <TildelteOppgaver />
        </HentOppgaveLayout>
    );
}

export default withRouter(HentOppgaveKnapp);
