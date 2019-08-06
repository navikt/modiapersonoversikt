import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { datoSynkende } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import theme from '../../../../../styles/personOversiktTheme';
import { useEffect } from 'react';
import { isLoaded, RestResource } from '../../../../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { settValgtTraad } from '../../../../../redux/meldinger/actions';

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

function AlleMeldinger(props: { traad: Traad }) {
    const meldingskomponenter = props.traad.meldinger
        .sort(datoSynkende(melding => melding.opprettetDato))
        .map(melding => <EnkeltMelding melding={melding} key={melding.id} />);

    return <div>{meldingskomponenter}</div>;
}

function TraadVisning({ valgtTraad, traader }: Props) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!valgtTraad && isLoaded(traader)) {
            dispatch(settValgtTraad(traader.data[0]));
        }
    }, [valgtTraad, traader, dispatch]);

    if (!valgtTraad) {
        return <AlertStripeInfo>Ingen tråd er valgt</AlertStripeInfo>;
    }

    return (
        <VisningStyle aria-label={'Meldinger for valgt tråd'}>
            <AlleMeldinger traad={valgtTraad} />
        </VisningStyle>
    );
}

export default TraadVisning;
