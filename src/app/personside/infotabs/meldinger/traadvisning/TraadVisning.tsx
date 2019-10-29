import * as React from 'react';
import styled from 'styled-components';
import { datoSynkende, formatterDatoMedMaanedsnavn } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import { Flatknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { toggleDialogpanel } from '../../../../../redux/uiReducers/UIReducer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Meldingstype, Traad } from '../../../../../models/meldinger/meldinger';
import { eldsteMelding, saksbehandlerTekst } from '../utils/meldingerUtils';
import { formaterDato } from '../../../../../utils/stringFormatting';
interface Props {
    valgtTraad: Traad;
    sokeord: string;
}

const VisningStyle = styled.section`
    padding: ${theme.margin.layout};
    flex-grow: 1;
    > *:last-child {
        margin-top: ${theme.margin.layout};
    }
`;

const KnappWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;
const KanBesvaresMeldingstyper = [Meldingstype.SPORSMAL_MODIA_UTGAAENDE, Meldingstype.SPORSMAL_SKRIFTLIG];

function AlleMeldinger({ traad, sokeord }: { traad: Traad; sokeord: string }) {
    const meldingskomponenter = traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding sokeord={sokeord} melding={melding} key={melding.id} />);

    return <div>{meldingskomponenter}</div>;
}

function Topplinje({ valgtTraad }: { valgtTraad: Traad }) {
    const dispatch = useDispatch();
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);

    const melding = eldsteMelding(valgtTraad);
    if (melding.erFerdigstiltUtenSvar) {
        return (
            <AlertStripeInfo>
                Henvendelsen er avsluttet uten å svare bruker av {saksbehandlerTekst(melding.ferdigstiltUtenSvarAv)}{' '}
                {melding.ferdigstiltDato && formatterDatoMedMaanedsnavn(melding.ferdigstiltDato)}
            </AlertStripeInfo>
        );
    }

    if (melding.markertSomFeilsendtAv) {
        return (
            <AlertStripeInfo>
                Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}{' '}
                {melding.ferdigstiltDato && formaterDato(melding.ferdigstiltDato)}
            </AlertStripeInfo>
        );
    }

    const handleNyMelding = () => {
        valgtTraad && dispatch(setValgtTraadDialogpanel(valgtTraad));
        dispatch(toggleDialogpanel(true));
    };

    if (dialogpanelTraad === valgtTraad) {
        return (
            <KnappWrapper>
                <AlertStripeInfo>Under arbeid</AlertStripeInfo>
            </KnappWrapper>
        );
    }

    if (KanBesvaresMeldingstyper.includes(melding.meldingstype)) {
        return (
            <KnappWrapper>
                <Flatknapp onClick={handleNyMelding}>Ny melding</Flatknapp>
            </KnappWrapper>
        );
    } else {
        return null;
    }
}

function TraadVisning(props: Props) {
    return (
        <VisningStyle aria-label={'Meldinger for valgt tråd'} key={props.valgtTraad.traadId}>
            <Topplinje valgtTraad={props.valgtTraad} />
            <AlleMeldinger sokeord={props.sokeord} traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
