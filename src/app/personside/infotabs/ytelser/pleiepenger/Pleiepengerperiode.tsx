import * as React from 'react';
import { Pleiepengeperiode, Vedtak as VedtakInterface } from '../../../../../models/ytelse/pleiepenger';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import DescriptionList from '../../../../../components/DescriptionList';
import { Undertittel } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';

interface Props {
    periode: Pleiepengeperiode;
    periodeNummer: number;
}

const PaddingBottom = styled.div`
    padding-bottom: 1rem;
`;

const VedtaksListe = styled.ul`
    list-style: none;
    padding: 2rem;
    li {
        margin-top: ${theme.margin.px10};
        &:not(:last-child) {
            padding-bottom: ${theme.margin.px20};
            border-bottom: ${theme.border.skilleDashed};
        }
    }
`;

function Vedtak({ vedtak }: { vedtak: VedtakInterface }) {
    const anvisteUtbetalingerEntries = {
        'Fra og med dato': formaterDato(vedtak.periode.fom),
        'Til og med dato': formaterDato(vedtak.periode.tom),
        Bruttobeløp: 'NOK ' + formaterNOK(vedtak.bruttobeløp),
        'Anvist Utbetaling': formaterDato(vedtak.anvistUtbetaling),
        Dagsats: 'NOK ' + formaterNOK(vedtak.dagsats),
        Pleiepengegrad: vedtak.pleiepengegrad + '%'
    };

    return (
        <li>
            <DescriptionList entries={anvisteUtbetalingerEntries} />
            <PaddingBottom />
        </li>
    );
}

function Pleiepengerperiode({ periode, ...props }: Props) {
    const vedtak = periode.vedtak.map((v, index) => <Vedtak key={index} vedtak={v} />);

    return (
        <YtelserPeriode tittel={`Periode ${props.periodeNummer} - ${formaterDato(periode.fom)}`}>
            <VedtaksListe>
                <Undertittel>Anviste utbetalinger</Undertittel>
                {vedtak}
            </VedtaksListe>
        </YtelserPeriode>
    );
}

export default Pleiepengerperiode;
