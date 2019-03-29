import * as React from 'react';
import { OppfolgingsYtelse } from '../../../../models/oppfolging';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList, { DescriptionListEntries } from '../../../../components/DescriptionList';
import OppfolgingsVedtakListe from './OppfolgingVedtakKomponent';
import { datoEllerNull } from '../../../../utils/stringFormatting';

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
    const sortertPåDato = props.ytelser.sort(datoSynkende(ytelse => ytelse.datoKravMottatt));

    const listekomponenter = sortertPåDato.map(ytelse => <YtelseElement ytelse={ytelse} />);

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

function YtelseElement(props: { ytelse: OppfolgingsYtelse }) {
    const descriptionListProps = {
        Status: props.ytelse.status,
        'Dato søknad mottatt': datoEllerNull(props.ytelse.datoKravMottatt),
        'Dato fra': datoEllerNull(props.ytelse.fom),
        'Dato til': datoEllerNull(props.ytelse.tom),
        ...dersomDagpengerLeggTilFelter(props.ytelse)
    };

    return (
        <ElementStyle>
            <Undertittel>{props.ytelse.type}</Undertittel>
            <YtelsePanelStyle>
                <DescriptionList entries={descriptionListProps} />
                <OppfolgingsVedtakListe ytelseVedtak={props.ytelse.vedtak} />
            </YtelsePanelStyle>
        </ElementStyle>
    );
}

function dersomDagpengerLeggTilFelter(ytelse: OppfolgingsYtelse): DescriptionListEntries {
    if (ytelse.type === 'Dagpenger') {
        return {
            'Dager igjen': ytelse.dagerIgjen,
            'Uker igjen': ytelse.ukerIgjen
        };
    }

    return {};
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
