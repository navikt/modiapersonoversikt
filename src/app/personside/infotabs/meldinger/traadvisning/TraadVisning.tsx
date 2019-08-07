import * as React from 'react';
import { Traad } from '../../../../../models/meldinger/meldinger';
import styled from 'styled-components';
import { datoSynkende } from '../../../../../utils/dateUtils';
import EnkeltMelding from './Enkeltmelding';
import theme from '../../../../../styles/personOversiktTheme';
import { useEffect } from 'react';
import { hasData, RestResource } from '../../../../../rest/utils/restResource';
import { useDispatch } from 'react-redux';
import { settValgtTraad } from '../../../../../redux/meldinger/actions';
import RestResourceConsumer from '../../../../../rest/consumer/RestResourceConsumer';

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
        if (!valgtTraad && hasData(traader)) {
            dispatch(settValgtTraad(traader.data[0]));
        }
    }, [valgtTraad, traader, dispatch]);

    return (
        <VisningStyle aria-label={'Meldinger for valgt tråd'}>
            <RestResourceConsumer<Traad[]> getResource={restResources => restResources.tråderOgMeldinger}>
                {trader => <AlleMeldinger traad={valgtTraad || trader[0]} />}
            </RestResourceConsumer>
        </VisningStyle>
    );
}

export default TraadVisning;
