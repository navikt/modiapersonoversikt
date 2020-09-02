import React from 'react';
import { FormStyle } from '../personside/dialogpanel/fellesStyling';
import { Ingress, Normaltekst, Systemtittel, Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Tekstomrade from 'nav-frontend-tekstomrade';
import useNotifikasjoner from './useNotifikasjoner';
import { CenteredLazySpinner } from '../../components/LazySpinner';
import { AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import { NotfikiasjonerVelger } from './NotifikasjonerVelger';
import Etikett from 'nav-frontend-etiketter';
import Lesmerpanel from 'nav-frontend-lesmerpanel';

const StyledPanel = styled(Panel)`
    margin: 1rem;
`;

const StyledPanelPrioritert = styled(Panel)`
    margin: 1rem;
    border-color: red;
    border-width: thick;
`;

const StyledEtikettViktig = styled(Etikett)`
    margin: 0rem;
    background-color: red;
    color: white;
`;

const StyledEtikettBeskjed = styled(Etikett)`
    margin: 0rem;
    float: right;
`;

const StyledEtikettOppdatering = styled(Etikett)`
    margin: 0rem;
    float: right;
`;

function Notifikasjon() {
    const notifikasjoner = useNotifikasjoner();
    console.log(notifikasjoner);

    if (notifikasjoner.error) {
        return <AlertStripeFeil>Notifikasjoner er nede, vennligst prøv igjen senere.</AlertStripeFeil>;
    }
    if (notifikasjoner.data.length === 0) {
        return <AlertStripeInfo>Fant ingen notifikasjoner</AlertStripeInfo>;
    }
    if (notifikasjoner.pending) {
        return <CenteredLazySpinner />;
    }

    const notifikasjonArray = notifikasjoner.data.map(notifikasjon => {
        return notifikasjon;
    });

    const sortertNotifikasjonArray = notifikasjonArray.sort((a, b) => {
        return a.dato.localeCompare(b.dato);
    });

    sortertNotifikasjonArray.sort((a, b) => {
        return b.prioritet - a.prioritet;
    });

    const alleNotifikasjoner = sortertNotifikasjonArray.map(notifikasjon => {
        if (notifikasjon.prioritet === 1 && notifikasjon.beskrivelse.length < 150 && notifikasjon.type === 'beskjed') {
            return (
                <StyledPanelPrioritert border>
                    <StyledEtikettViktig type="advarsel">Viktig</StyledEtikettViktig>
                    <StyledEtikettBeskjed type="info">Beskjed</StyledEtikettBeskjed>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Normaltekst>
                        <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                    </Normaltekst>
                </StyledPanelPrioritert>
            );
        }
        if (
            notifikasjon.prioritet === 1 &&
            notifikasjon.beskrivelse.length < 150 &&
            notifikasjon.type === 'oppdatering'
        ) {
            return (
                <StyledPanelPrioritert border>
                    <StyledEtikettViktig type="advarsel">Viktig</StyledEtikettViktig>
                    <StyledEtikettOppdatering type="suksess">Oppdatering</StyledEtikettOppdatering>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Normaltekst>
                        <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                    </Normaltekst>
                </StyledPanelPrioritert>
            );
        }
        if (notifikasjon.prioritet === 1 && notifikasjon.beskrivelse.length >= 150 && notifikasjon.type === 'beskjed') {
            return (
                <StyledPanelPrioritert border>
                    <StyledEtikettViktig type="advarsel">Viktig</StyledEtikettViktig>
                    <StyledEtikettBeskjed type="info">Beskjed</StyledEtikettBeskjed>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Lesmerpanel>
                        <Normaltekst>
                            <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                        </Normaltekst>
                    </Lesmerpanel>
                </StyledPanelPrioritert>
            );
        }
        if (
            notifikasjon.prioritet === 1 &&
            notifikasjon.beskrivelse.length >= 150 &&
            notifikasjon.type === 'oppdatering'
        ) {
            return (
                <StyledPanelPrioritert border>
                    <StyledEtikettViktig type="advarsel">Viktig</StyledEtikettViktig>
                    <StyledEtikettOppdatering type="suksess">Oppdatering</StyledEtikettOppdatering>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Lesmerpanel>
                        <Normaltekst>
                            <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                        </Normaltekst>
                    </Lesmerpanel>
                </StyledPanelPrioritert>
            );
        }
        if (notifikasjon.beskrivelse.length >= 150 && notifikasjon.type === 'beskjed') {
            return (
                <StyledPanel border>
                    <StyledEtikettBeskjed type="info">Beskjed</StyledEtikettBeskjed>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Lesmerpanel>
                        <Normaltekst>
                            <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                        </Normaltekst>
                    </Lesmerpanel>
                </StyledPanel>
            );
        }
        if (notifikasjon.beskrivelse.length >= 150 && notifikasjon.type === 'oppdatering') {
            return (
                <StyledPanel border>
                    <StyledEtikettOppdatering type="suksess">Oppdatering</StyledEtikettOppdatering>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Lesmerpanel>
                        <Normaltekst>
                            <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                        </Normaltekst>
                    </Lesmerpanel>
                </StyledPanel>
            );
        }
        if (notifikasjon.type === 'beskjed') {
            return (
                <StyledPanel border>
                    <StyledEtikettBeskjed type="info">Beskjed</StyledEtikettBeskjed>
                    <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                    <Ingress>{notifikasjon.ingress}</Ingress>
                    <Undertekst>{notifikasjon.dato}</Undertekst>
                    <Normaltekst>
                        <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                    </Normaltekst>
                </StyledPanel>
            );
        }
        return (
            <StyledPanel border>
                <StyledEtikettOppdatering type="suksess">Oppdatering</StyledEtikettOppdatering>
                <Systemtittel>{notifikasjon.tittel}</Systemtittel>
                <Ingress>{notifikasjon.ingress}</Ingress>
                <Undertekst>{notifikasjon.dato}</Undertekst>
                <Normaltekst>
                    <Tekstomrade>{notifikasjon.beskrivelse}</Tekstomrade>
                </Normaltekst>
            </StyledPanel>
        );
    });

    return (
        <form>
            <FormStyle>
                <section>{alleNotifikasjoner}</section>
                <NotfikiasjonerVelger />
            </FormStyle>
        </form>
    );
}

export default Notifikasjon;
