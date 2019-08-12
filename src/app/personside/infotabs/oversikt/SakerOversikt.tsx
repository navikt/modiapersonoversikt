import * as React from 'react';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch } from 'react-redux';
import SakstemaListeElement from '../saksoversikt/sakstemaliste/SakstemaListeElement';
import { settValgtSakstema } from '../../../../redux/saksoversikt/actions';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    sakstema: Sakstema[];
}

function SakerOversikt() {
    return (
        <RestResourceConsumer<SakstemaResponse> getResource={restResources => restResources.sakstema}>
            {data => <SakerPanel sakstema={data.resultat} />}
        </RestResourceConsumer>
    );
}

function SakerPanel(props: Props) {
    const dispatch = useDispatch();
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .map((sakstema, index) => (
            <SakstemaListeElement
                sakstema={sakstema}
                erValgtSakstema={false}
                oppdaterSakstema={() => dispatch(settValgtSakstema(sakstema))}
                key={index}
            />
        ));

    return <ListStyle>{sakstemakomponenter}</ListStyle>;
}

export default SakerOversikt;
