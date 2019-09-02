import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import KnappBase from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { velgTemagruppe } from '../../../redux/temagruppe';
import { selectFodselsnummerfraOppgaver } from '../../../redux/restReducers/oppgaver';
import { AppState } from '../../../redux/reducers';
import { settJobberMedSpørsmålOgSvar } from '../kontrollsporsmal/cookieUtils';
import { isFailedPosting, isPosting } from '../../../rest/utils/postResource';
import theme from '../../../styles/personOversiktTheme';
import TildelteOppgaver from './TildelteOppgaver';
import { paths } from '../../routes/routing';
import { INFOTABS } from '../infotabs/InfoTabEnum';

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
    align-items: flex-end;
    > * {
        margin-right: 0.4em;
        flex-grow: 1;
    }
    > *:first-child {
        margin-bottom: 0;
        white-space: nowrap;
    }
    > *:last-child {
        margin-top: 0.4em;
    }
`;

const PLUKKBARE_TEMAGRUPPER = [
    { kode: 'ARBD', beskrivelse: 'Arbeid' },
    { kode: 'FMLI', beskrivelse: 'Familie' },
    { kode: 'HJLPM', beskrivelse: 'Hjelpemidler' },
    { kode: 'BIL', beskrivelse: 'Hjelpemidler bil' },
    { kode: 'ORT_HJE', beskrivelse: 'Ortopediske hjelpemidler' },
    { kode: 'PENS', beskrivelse: 'Pensjon' },
    { kode: 'PLEIEPENGERSY', beskrivelse: 'Pleiepenger sykt barn' },
    { kode: 'UFRT', beskrivelse: 'Uføretrygd' },
    { kode: 'UTLAND', beskrivelse: 'Utland' }
];

type Props = RouteComponentProps<{}>;

function HentOppgaveKnapp(props: Props) {
    const [tomKø, setTomKø] = useState(false);
    const [temaGruppeFeilmelding, setTemaGruppeFeilmelding] = useState(false);
    const dispatch = useDispatch();
    const oppgaveResource = useSelector((state: AppState) => state.restResources.oppgaver);
    const velgTemaGruppe = (temagruppe: string) => dispatch(velgTemagruppe(temagruppe));
    const valgtTemaGruppe = useSelector((state: AppState) => state.temagruppe.valgtTemagruppe);

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
                const fødselsnummer = selectFodselsnummerfraOppgaver(response);
                if (!fødselsnummer) {
                    setTomKø(true);
                    return;
                }
                props.history.push(`${paths.personUri}/${fødselsnummer}/${INFOTABS.MELDINGER.toLowerCase()}`);
            })
        );
    };

    const onTemagruppeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        velgTemaGruppe(event.target.value);
        setTemaGruppeFeilmelding(false);
    };

    const tomtTilbakemelding = tomKø ? (
        <AlertStripeInfo>Det er ingen nye oppgaver på valgt temagruppe</AlertStripeInfo>
    ) : null;
    const temagruppeOptions = PLUKKBARE_TEMAGRUPPER.map(temagruppe => (
        <option value={temagruppe.kode} key={temagruppe.kode}>
            {temagruppe.beskrivelse}
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
                    Plukk oppgave
                </KnappBase>
            </KnappLayout>
            {isFailedPosting(oppgaveResource) && <AlertStripeAdvarsel>Det skjedde en teknisk feil</AlertStripeAdvarsel>}
            {tomtTilbakemelding}
            <TildelteOppgaver />
        </HentOppgaveLayout>
    );
}

export default withRouter(HentOppgaveKnapp);
