import * as React from 'react';
import { isDagpenger, OppfolgingsYtelse } from '../../../../models/oppfolging';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import EkspanderbartYtelserPanel from '../ytelser/felles-styling/EkspanderbartYtelserPanel';
import { datoSynkende } from '../../../../utils/dateUtils';
import styled from 'styled-components/macro';
import theme from '../../../../styles/personOversiktTheme';
import { Undertittel } from 'nav-frontend-typografi';
import DescriptionList, { DescriptionListEntries, fjernEntriesUtenVerdi } from '../../../../components/DescriptionList';
import OppfolgingsVedtakTabell from './OppfolgingVedtakKomponent';
import { datoEllerNull } from '../../../../utils/stringFormatting';
import { useAppState } from '../../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { setYtelserEkspandert } from '../../../../redux/oppfolging/actions';
import { loggEvent } from '../../../../utils/frontendLogger';

interface Props {
    ytelser: OppfolgingsYtelse[];
}

const ListeStyle = styled.ol`
    > li:not(:first-child) {
        padding-top: 2rem;
        margin-top: 2rem;
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
        <li>
            <Undertittel>{ytelse.type}</Undertittel>
            <YtelsePanelStyle>
                <DescriptionList entries={descriptionListProps} />
                <OppfolgingsVedtakTabell ytelseVedtak={ytelse.vedtak} />
            </YtelsePanelStyle>
        </li>
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
    const open = useAppState(state => state.oppfolging.ytelserEkspandert);
    const dispatch = useDispatch();
    const setOpen = (open: boolean) => {
        !open && loggEvent('VisYtelserPanel', 'Oppfølging');
        dispatch(setYtelserEkspandert(open));
    };

    if (props.ytelser.length === 0) {
        return <AlertStripeInfo>Det finnes ikke informasjon om ytelser for valgt periode i Arena</AlertStripeInfo>;
    }

    return (
        <EkspanderbartYtelserPanel open={open} setOpen={setOpen} tittel="Ytelser">
            <OppfolgingYtelserListe ytelser={props.ytelser} />
        </EkspanderbartYtelserPanel>
    );
}

export default OppfolgingYtelserEkspanderbartPanel;
