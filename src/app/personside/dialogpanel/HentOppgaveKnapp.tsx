import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
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
import { SaksbehandlerRoller } from '../../../utils/RollerUtils';
import { loggEvent } from '../../../utils/frontendLogger';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import { RestResourcePlaceholderProps } from '../../../rest/consumer/placeholder';
import { guid } from 'nav-frontend-js-utils';

const StyledArticle = styled.article`
    text-align: center;
    padding: ${theme.margin.layout};
    border-bottom: ${theme.border.skilleSvak};
    label {
        ${theme.visuallyHidden}
    }
`;

const KnappLayout = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    > * {
        margin: 0.2em !important;
        flex-grow: 1;
    }
    > *:first-child {
        white-space: nowrap;
    }
`;

const placeholderProps: RestResourcePlaceholderProps = { returnOnNotFound: 'Kunne ikke hente roller' };

function HentOppgaveKnapp() {
    const history = useHistory();
    const [tomKø, setTomKø] = useState(false);
    const [temaGruppeFeilmelding, setTemaGruppeFeilmelding] = useState(false);
    const dispatch = useDispatch();
    const oppgaveResource = useSelector((state: AppState) => state.restResources.plukkNyeOppgaver);
    const velgTemaGruppe = (temagruppe: Temagruppe) => dispatch(velgTemagruppeForPlukk(temagruppe));
    const valgtTemaGruppe = useSelector((state: AppState) => state.session.temagruppeForPlukk);
    const tittelId = useRef(guid());
    let selectRef: HTMLSelectElement | null = null;

    const rollerResource = useRestResource(resources => resources.veilederRoller, placeholderProps);

    useEffect(() => {
        if (temaGruppeFeilmelding) {
            selectRef && selectRef.focus();
        }
    }, [selectRef, temaGruppeFeilmelding]);

    if (!rollerResource.data) {
        return rollerResource.placeholder;
    }

    if (!rollerResource.data.roller.includes(SaksbehandlerRoller.HentOppgave)) {
        return null;
    }

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
                history.push(
                    `${paths.personUri}/${fødselsnummer}/${INFOTABS.MELDINGER.toLowerCase()}/${oppgave.traadId}`
                );
                response.length > 1 && loggEvent('FlereOppgaverTildelt', 'HentOppgave');
                loggEvent('Hent-Oppgave', 'HentOppgave');
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
        <StyledArticle aria-describedby={tittelId.current}>
            <h2 className="sr-only" id={tittelId.current}>
                Hent oppgave
            </h2>
            <KnappLayout>
                <Select
                    // @ts-ignore
                    selectRef={ref => (selectRef = ref)}
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
        </StyledArticle>
    );
}

export default HentOppgaveKnapp;
