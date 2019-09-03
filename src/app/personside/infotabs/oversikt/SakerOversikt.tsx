import * as React from 'react';
import { Sakstema, SakstemaResponse } from '../../../../models/saksoversikt/sakstema';
import RestResourceConsumer from '../../../../rest/consumer/RestResourceConsumer';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { useDispatch, useSelector } from 'react-redux';
import SakstemaListeElement from '../saksoversikt/sakstemaliste/SakstemaListeElement';
import { settValgtSakstema } from '../../../../redux/saksoversikt/actions';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from '../../../../redux/reducers';
import { paths } from '../../../routes/routing';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CenteredLazySpinner } from '../../../../components/LazySpinner';

const ListStyle = styled.ol`
    > *:not(:first-child) {
        border-top: ${theme.border.skille};
    }
`;

interface Props {
    sakstema: Sakstema[];
    onClick: (sakstema: Sakstema) => void;
}

function SakerOversikt(props: RouteComponentProps) {
    const dispatch = useDispatch();
    const valgtBrukersFnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);

    const clickHandler = (sakstema: Sakstema) => {
        dispatch(settValgtSakstema(sakstema));
        props.history.push(`${paths.personUri}/${valgtBrukersFnr}/saker`);
    };

    return (
        <RestResourceConsumer<SakstemaResponse>
            getResource={restResources => restResources.sakstema}
            returnOnPending={<CenteredLazySpinner padding={theme.margin.layout} />}
        >
            {data => <SakerPanel sakstema={data.resultat} onClick={clickHandler} />}
        </RestResourceConsumer>
    );
}

function SakerPanel(props: Props) {
    const sakstemakomponenter = props.sakstema
        .filter(sakstema => sakstema.behandlingskjeder.length > 0 || sakstema.dokumentMetadata.length > 0)
        .slice(0, 4)
        .map((sakstema, index) => (
            <SakstemaListeElement
                sakstema={sakstema}
                erValgtSakstema={false}
                oppdaterSakstema={() => props.onClick(sakstema)}
                key={index}
            />
        ));

    if (sakstemakomponenter.length === 0) {
        return <AlertStripeInfo>Fant ingen saker på bruker</AlertStripeInfo>;
    }

    return <ListStyle>{sakstemakomponenter}</ListStyle>;
}

export default withRouter(SakerOversikt);
