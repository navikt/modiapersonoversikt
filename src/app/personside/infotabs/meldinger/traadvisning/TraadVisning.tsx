import * as React from 'react';
import { useEffect } from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { datoSynkende } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { hasData, RestResource } from '../../../../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { setValgtTraadMeldingspanel } from '../../../../../redux/meldinger/actions';
import { Flatknapp } from 'nav-frontend-knapper';
import { setValgtTraadDialogpanel } from '../../../../../redux/oppgave/actions';
import { useAppState } from '../../../../../utils/customHooks';
import { Collapse } from 'react-collapse';
import { toggleDialogpanel } from '../../../../../redux/uiReducers/UIReducer';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../../components/LazySpinner';

interface Props {
    valgtTraad?: Traad;
    traader: RestResource<Traad[]>;
}

const VisningStyle = styled.section`
    ${theme.hvittPanel};
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

function AlleMeldinger(props: { traad: Traad }) {
    const meldingskomponenter = props.traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding melding={melding} key={melding.id} />);

    return <div>{meldingskomponenter}</div>;
}

function TraadVisning({ valgtTraad, traader }: Props) {
    const dispatch = useDispatch();
    const traadDialogpanel = useAppState(state => state.oppgaver.dialogpanelTraad);
    useEffect(() => {
        if (!valgtTraad && hasData(traader)) {
            dispatch(setValgtTraadMeldingspanel(traader.data[0]));
        }
    }, [valgtTraad, traader, dispatch]);

    if (!valgtTraad) {
        return <CenteredLazySpinner />;
    }

    const handleSendMelding = () => {
        dispatch(setValgtTraadDialogpanel(valgtTraad));
        dispatch(toggleDialogpanel(true));
    };

    return (
        <VisningStyle aria-label={'Meldinger for valgt tråd'} key={valgtTraad ? valgtTraad.traadId : ''}>
            <KnappWrapper>
                <Collapse isOpened={true}>
                    {traadDialogpanel === valgtTraad ? (
                        <AlertStripeInfo>Under arbeid</AlertStripeInfo>
                    ) : (
                        <Flatknapp onClick={handleSendMelding}>Ny melding</Flatknapp>
                    )}
                </Collapse>
            </KnappWrapper>
            <AlleMeldinger traad={valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
