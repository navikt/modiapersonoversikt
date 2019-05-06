import * as React from 'react';
import { isDagpenger, OppfolgingsYtelse } from '../../../../models/oppfolging';
import AlertStripeInfo from 'nav-frontend-alertstriper/lib/info-alertstripe';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import DescriptionList, { DescriptionListEntries, fjernEntriesUtenVerdi } from '../../../../components/DescriptionList';
import OppfolgingsVedtakTabell from './OppfolgingVedtakKomponent';
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
    padding: ${theme.margin.px20};
`;

function OppfolgingYtelserListe(props: { ytelser: OppfolgingsYtelse[] }) {
    const sortertPåDato = props.ytelser.sort(datoSynkende(ytelse => ytelse.datoKravMottatt));

    const listekomponenter = sortertPåDato.map((ytelse, index) => <YtelseElement key={index} ytelse={ytelse} />);

    return <ListeStyle>{listekomponenter}</ListeStyle>;
}

function YtelseElement({ ytelse }: { ytelse: OppfolgingsYtelse }) {
    const descriptionListProps = {
        Status: ytelse.status,
        'Dato søknad mottatt': datoEllerNull(ytelse.datoKravMottatt),
        'Dato fra': datoEllerNull(ytelse.fom),
        'Dato til': datoEllerNull(ytelse.tom),
        ...fjernEntriesUtenVerdi({
            'Bortfall: Dager igjen': ytelse.dagerIgjenMedBortfall,
            'Bortfall: Uker igjen': ytelse.ukerIgjenMedBortfall
        }),
        ...dersomDagpengerLeggTilFelter(ytelse)
    };

    return (
        <ElementStyle>
            <Undertittel>{ytelse.type}</Undertittel>
            <YtelsePanelStyle>
                <DescriptionList entries={descriptionListProps} />
                <OppfolgingsVedtakTabell ytelseVedtak={ytelse.vedtak} />
            </YtelsePanelStyle>
        </ElementStyle>
    );
}

function dersomDagpengerLeggTilFelter(ytelse: OppfolgingsYtelse): DescriptionListEntries {
    if (isDagpenger(ytelse)) {
        return {
            'Dager igjen': ytelse.dagerIgjen,
            'Uker igjen': ytelse.ukerIgjen,
            ...fjernEntriesUtenVerdi({
                'Permittering: Dager igjen': ytelse.dagerIgjenPermittering,
                'Permittering: Uker igjen': ytelse.ukerIgjenPermittering
            })
        };
    }

    return {};
}

function OppfolgingYtelserEkspanderbartPanel(props: Props) {
    if (props.ytelser.length === 0) {
        return <AlertStripeInfo>Det finnes ikke informasjon om ytelser for valgt periode i Arena</AlertStripeInfo>;
    }

    return (
        <EkspanderbartYtelserPanel tittel="Ytelser">
            <OppfolgingYtelserListe ytelser={props.ytelser} />
        </EkspanderbartYtelserPanel>
    );
}

export default OppfolgingYtelserEkspanderbartPanel;
