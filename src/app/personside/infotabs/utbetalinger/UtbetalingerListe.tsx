import * as React from 'react';
import { Utbetaling } from '../../../../models/utbetalinger';
import { Undertekst, UndertekstBold, Undertittel } from 'nav-frontend-typografi';
import { Bold, SpaceBetween, Uppercase } from '../../../../components/common-styled-components';
import { formaterDato } from '../../../../utils/dateUtils';
import styled from 'styled-components';
import { månedOgÅrForUtbetaling, sortByPosteringsDato } from './utbetalingerUtils';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import theme from '../../../../styles/personOversiktTheme';
import PrintKnapp from '../../../../components/PrintKnapp';

interface Props {
    utbetalinger: Utbetaling[];
}

const Opacity = styled.span`
  opacity: .5;
`;

const UtbetalingStyle = styled.div`
  padding: .5rem 1.2rem;
  > *:not(:first-child):not(:nth-child(3)) {
    margin-top: 1rem;
  }
`;

const UtbetalingsGruppeStyle = styled.div`
  > *:first-child {
    background-color: ${theme.color.bakgrunn};
    padding: .2rem 1.2rem;
  }
`;

function Utbetaling({utbetaling}: { utbetaling: Utbetaling }) {
    return (
        <UtbetalingStyle>
            <SpaceBetween>
                <Undertekst>
                    <Opacity>
                        {utbetaling.posteringsdato && formaterDato(utbetaling.posteringsdato)} / {utbetaling.status}
                    </Opacity>
                </Undertekst>
                <PrintKnapp onClick={() => console.log('ikke implementert')} />
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold>{utbetaling.metode}</UndertekstBold>
                <UndertekstBold>Tekst</UndertekstBold>
            </SpaceBetween>
            <Undertekst><Opacity>Periode</Opacity></Undertekst>
            <Undertekst><Opacity>Utbetalt til</Opacity></Undertekst>
        </UtbetalingStyle>
    );
}

function Gruppe({gruppe}: { gruppe: ArrayGroup<Utbetaling> }) {
    return (
        <UtbetalingsGruppeStyle>
            <Undertekst><Bold><Uppercase>{gruppe.category}</Uppercase></Bold></Undertekst>
            {gruppe.array.map(utbetaling =>
                <Utbetaling utbetaling={utbetaling} key={utbetaling.posteringsdato}/>)}
        </UtbetalingsGruppeStyle>
    );
}

const UtbetalingerStyle = styled.div`
  > *:first-child {
    padding: 0 1.2rem .2rem;
  }
`;

function UtbetalingerListe(props: Props) {
    const utbetalingerIGrupper: GroupedArray<Utbetaling> =
        groupArray(props.utbetalinger.sort(sortByPosteringsDato), månedOgÅrForUtbetaling);
    const gruppeliste = utbetalingerIGrupper
        .map((gruppe: ArrayGroup<Utbetaling>) => <Gruppe gruppe={gruppe} key={gruppe.category} />);

    return (
        <UtbetalingerStyle>
            <Undertittel>Utbetalinger</Undertittel>
            {gruppeliste}
        </UtbetalingerStyle>
    );
}

export default UtbetalingerListe;
