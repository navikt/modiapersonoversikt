import * as React from 'react';
import styled from 'styled-components';
import { datoSynkende } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import { Flatknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { toggleDialogpanel } from '../../../../../redux/uiReducers/UIReducer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../../components/LazySpinner';
import { Traad } from '../../../../../models/meldinger/meldinger';
import { eldsteMelding, saksbehandlerTekst } from '../utils/meldingerUtils';

interface Props {
    valgtTraad?: Traad;
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

function AlleMeldinger({ traad }: { traad: Traad }) {
    const meldingskomponenter = traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding melding={melding} key={melding.id} />);

    return <div>{meldingskomponenter}</div>;
}

function Topplinje({ valgtTraad }: { valgtTraad: Traad }) {
    const dispatch = useDispatch();
    const dialogpanelTraad = useAppState(state => state.oppgaver.dialogpanelTraad);

    const melding = eldsteMelding(valgtTraad);

    if (melding.erFerdigstiltUtenSvar) {
        return (
            <AlertStripeInfo>
                Ferdigstilt uten svar av {saksbehandlerTekst(melding.ferdigstiltUtenSvarAv)}
            </AlertStripeInfo>
        );
    }

    if (melding.markertSomFeilsendtAv) {
        return (
            <AlertStripeInfo>
                Markert som feilsendt av {saksbehandlerTekst(melding.markertSomFeilsendtAv)}
            </AlertStripeInfo>
        );
    }

    const handleNyMelding = () => {
        valgtTraad && dispatch(setValgtTraadDialogpanel(valgtTraad));
        dispatch(toggleDialogpanel(true));
    };

    return (
        <KnappWrapper>
            {dialogpanelTraad === valgtTraad ? (
                <AlertStripeInfo>Under arbeid</AlertStripeInfo>
            ) : (
                <Flatknapp onClick={handleNyMelding}>Ny melding</Flatknapp>
            )}
        </KnappWrapper>
    );
}

function TraadVisning(props: Props) {
    if (!props.valgtTraad) {
        return <CenteredLazySpinner />;
    }

    return (
        <VisningStyle aria-label={'Meldinger for valgt tråd'} key={props.valgtTraad.traadId}>
            <Topplinje valgtTraad={props.valgtTraad} />
            <AlleMeldinger traad={props.valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
