import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { AlignTextRight } from '../../../../components/common-styled-components';
import { FilterState, FraTilDato, PeriodeValg } from './Filter';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../components/PrintKnapp';
import { formaterDato } from '../../../../utils/dateUtils';

interface Props {
    utbetalinger: Utbetaling[];
    filter: FilterState;
}

const Style = styled.div`
  margin: 1.2rem;
`;

function getFra(filter: FilterState): Date {
    const iDag = new Date();
    let returDato = new Date();
    switch (filter.periode.radioValg) {
        case PeriodeValg.INNEVÆRENDE_ÅR:
            returDato.setDate(0);
            return returDato;
        case PeriodeValg.I_FJOR:
            returDato.setDate(0);
            returDato.setFullYear(returDato.getFullYear() - 1);
            return returDato;
        case PeriodeValg.EGENDEFINERT:
            return filter.periode.egendefinertPeriode.fra || new Date();
        case PeriodeValg.SISTE_30_DAGER:
        default:
            returDato.setDate(iDag.getDate() - 30);
            return returDato;
    }
}

function getTil(filter: FilterState): Date {
    if (filter.periode.radioValg === PeriodeValg.EGENDEFINERT) {
        return filter.periode.egendefinertPeriode.til || new Date();
    }
    return new Date();
}

function TotaltUtbetalt(props: Props) {

    const periode: FraTilDato = {
        fra: getFra(props.filter),
        til: getTil(props.filter)
    };

    return (
        <Style>
            <Undertittel>Totalt utbetalt for perioden</Undertittel>
            <Undertekst>{formaterDato(periode.fra)} - {formaterDato(periode.til)}</Undertekst>
            <AlignTextRight><PrintKnapp onClick={() => console.log('ikke implementert')}/></AlignTextRight>
        </Style>
    );
}

export default TotaltUtbetalt;
