import * as React from 'react';
import { OppfolgingsYtelse } from '../../../../models/oppfolging';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import { genericDescendingDateComparator } from '../../../../utils/dateUtils';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList from '../../../../components/DescriptionList';
import OppfolgingsVedtakListe from './OppfolgingVedtakKomponent';

interface Props {
    ytelser: OppfolgingsYtelse[];
}

const ListeStyle = styled.ol`
    > * {
        border-top: ${theme.border.skille};
    }
`;

const YtelsePanelStyle = styled.div`
    display: flex;
    align-items: flex-start;
    > *:last-child {
        flex-shrink: 0;
        flex-basis: 70%;
    }
`;

const ElementStyle = styled.div`
    padding: ${theme.margin.layout};
`;

function OppfolgingYtelserListe(props: { ytelser: OppfolgingsYtelse[] }) {
    const sortertPåDato = props.ytelser.sort(genericDescendingDateComparator(ytelse => ytelse.datoKravMottatt));

    const listekomponenter = sortertPåDato.map(ytelse => <YtelseElement ytselse={ytelse} />);

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

function YtelseElement(props: { ytselse: OppfolgingsYtelse }) {
    const descriptionListProps = {
        status: props.ytselse.status,
        'Dato søknad mottatt': props.ytselse.datoKravMottatt,
        'Dato fra': props.ytselse.fom,
        'Dato til': props.ytselse.tom,
        'Dager igjen': props.ytselse.dagerIgjenMedBortfall,
        'Uker igjen': props.ytselse.ukerIgjenMedBortfall
    };
    return (
        <ElementStyle>
            <Undertittel>{props.ytselse.type}</Undertittel>
            <YtelsePanelStyle>
                <DescriptionList entries={descriptionListProps} />
                <OppfolgingsVedtakListe ytelseVedtak={props.ytselse.vedtak} />
            </YtelsePanelStyle>
        </ElementStyle>
    );
}

function OppfolgingYtelserEkspanderbartPanel(props: Props) {
    if (props.ytelser.length === 0) {
        return <AlertStripeInfo>Det finnes ikke ytelsesinformasjon om bruker i Arena</AlertStripeInfo>;
    }

    return (
        <EkspanderbartYtelserPanel tittel="Ytelser">
            <OppfolgingYtelserListe ytelser={props.ytelser} />
        </EkspanderbartYtelserPanel>
    );
}

export default OppfolgingYtelserEkspanderbartPanel;
