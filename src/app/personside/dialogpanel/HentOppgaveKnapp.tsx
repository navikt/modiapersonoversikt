import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Select } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import theme from '../../../styles/personOversiktTheme';
import TildelteOppgaver from './TildelteOppgaver';
import { paths } from '../../routes/routing';
import { INFOTABS } from '../infotabs/InfoTabEnum';
import { Temagruppe, temagruppeTekst, TemaPlukkbare } from '../../../models/temagrupper';
import { SaksbehandlerRoller } from './RollerUtils';
import { loggEvent } from '../../../utils/logger/frontendLogger';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import { RestResourcePlaceholderProps } from '../../../rest/consumer/placeholder';
import { guid } from 'nav-frontend-js-utils';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { FetchResponse, fetchToJson, hasData, hasError } from '../../../utils/fetchToJson';
import { Oppgave } from '../../../models/meldinger/oppgave';
import { apiBaseUri, postConfig } from '../../../api/config';
import { getTemaFraCookie, setTemaCookie } from '../../../redux/session/plukkTemaCookie';
import { useDispatch } from 'react-redux';
import { selectValgtEnhet, setJobberMedSTO } from '../../../redux/session/session';
import { useAppState } from '../../../utils/customHooks';

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
    const dispatch = useDispatch();
    const valgtEnhet = useAppState(selectValgtEnhet);
    const [tomKø, setTomKø] = useState(false);
    const [temaGruppeFeilmelding, setTemaGruppeFeilmelding] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [response, setResponse] = useState<FetchResponse<Oppgave[]> | undefined>(undefined);
    const [temagruppe, setTemagruppe] = useState<Temagruppe | undefined>(getTemaFraCookie);

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
        if (!temagruppe) {
            setTemaGruppeFeilmelding(true);
            return;
        }
        setTemaGruppeFeilmelding(false);
        setTomKø(false);
        setIsPosting(true);
        dispatch(setJobberMedSTO(true));
        fetchToJson<Oppgave[]>(`${apiBaseUri}/oppgaver/plukk/${temagruppe}?enhet=${valgtEnhet}`, postConfig()).then(
            response => {
                setIsPosting(false);
                setResponse(response);
                if (hasData(response)) {
                    const stoOppgaver = response.data.filter(oppgave => oppgave.erSTOOppgave);
                    const antallOppgaverTildelt = stoOppgaver.length;
                    if (antallOppgaverTildelt === 0) {
                        setTomKø(true);
                        return;
                    }
                    const oppgave = stoOppgaver[0];
                    const fødselsnummer = oppgave.fødselsnummer;
                    history.push(
                        `${paths.personUri}/${fødselsnummer}/${INFOTABS.MELDINGER.toLowerCase()}/${oppgave.traadId}`
                    );
                    antallOppgaverTildelt > 1 &&
                        loggEvent('FlereOppgaverTildelt', 'HentOppgave', undefined, { antall: antallOppgaverTildelt });
                    loggEvent('Hent-Oppgave', 'HentOppgave', undefined, { antall: antallOppgaverTildelt });
                }
            }
        );
    };

    const onTemagruppeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTemagruppe(event.target.value as Temagruppe);
        setTemaCookie(event.target.value as Temagruppe);
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
        <StyledArticle aria-labelledby={tittelId.current}>
            <h2 className="sr-only" id={tittelId.current}>
                Hent oppgave
            </h2>
            <KnappLayout>
                <Select
                    // @ts-ignore
                    selectRef={ref => (selectRef = ref)}
                    label="Hent oppgave fra temagruppe"
                    value={temagruppe || ''}
                    onChange={onTemagruppeChange}
                    feil={
                        temaGruppeFeilmelding ? (
                            <SkjemaelementFeilmelding>Du må velge temagruppe</SkjemaelementFeilmelding>
                        ) : (
                            undefined
                        )
                    }
                >
                    <option disabled={true} value={''}>
                        Velg temagruppe
                    </option>
                    {temagruppeOptions}
                </Select>
                <Hovedknapp id="hentoppgaveknapp" type="hoved" onClick={onPlukkOppgaver} spinner={isPosting}>
                    Hent oppgave
                </Hovedknapp>
            </KnappLayout>
            {response && hasError(response) && <AlertStripeAdvarsel>Det skjedde en teknisk feil</AlertStripeAdvarsel>}
            {tomtTilbakemelding}
            <TildelteOppgaver />
        </StyledArticle>
    );
}

export default HentOppgaveKnapp;
