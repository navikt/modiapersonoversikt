import * as React from 'react';
import { Pleiepengeperiode, Vedtak as VedtakInterface } from '../../../../../models/ytelse/pleiepenger';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import { GråttPanel } from '../../../../../components/common-styled-components';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import DescriptionList from '../felles-styling/DescriptionList';
import { Undertittel } from 'nav-frontend-typografi';
import { formaterDato } from '../../../../../utils/dateUtils';
import { formaterNOK } from '../../utbetalinger/utils/utbetalingerUtils';

interface Props {
    periode: Pleiepengeperiode;
    periodeNummer: number;
}

const Padding = styled.div`
  margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

const PaddingBottom = styled.div`
  padding-bottom: 1rem;
`;

const VedtaksListe = styled.ul`
  list-style: none;
  margin-right: 1rem;
  li {
    margin-bottom: ${theme.margin.px20};
  }
`;

const Flex = styled.div`
  display: flex;
`;

const TittelStyling = styled.div`
  padding: 1rem 0.3rem .5rem;
`;

function Vedtak({vedtak}: { vedtak: VedtakInterface }) {
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
            <GråttPanel>
                <DescriptionList entries={anvisteUtbetalingerEntries}/>
                <PaddingBottom/>
            </GråttPanel>
        </li>
    );
}

function Pleiepengerperiode({periode, ...props}: Props) {

    const entries = {
        Pleiedager: periode.antallPleiepengedager
    };

    const vedtak = periode.vedtak.map((v, index) => <Vedtak key={index} vedtak={v}/>);

    return (
        <YtelserPeriode tittel={`Periode ${props.periodeNummer} - ${formaterDato(periode.fom)}`}>
            <Flex>
                <Padding>
                    <DescriptionList entries={entries}/>
                </Padding>
                <div>
                    <TittelStyling>
                        <Undertittel>Anviste utbetalinger</Undertittel>
                    </TittelStyling>
                    <VedtaksListe>
                        {vedtak}
                    </VedtaksListe>
                </div>
            </Flex>
        </YtelserPeriode>
    );
}

export default Pleiepengerperiode;
