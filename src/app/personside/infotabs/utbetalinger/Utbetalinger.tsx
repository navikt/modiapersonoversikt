import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useUtbetalingerFilter } from 'src/redux/utbetalinger/utbetalingerReducer';
import styled from 'styled-components';
import AriaNotification from '../../../../components/AriaNotification';
import type { Utbetaling, UtbetalingerResponse } from '../../../../models/utbetalinger';
import type { UtbetalingFilterState } from '../../../../redux/utbetalinger/types';
import theme, { pxToRem } from '../../../../styles/personOversiktTheme';
import { type ArrayGroup, type GroupedArray, groupArray } from '../../../../utils/groupArray';
import HandleUtbetalingerArrowKeys from './HandleUtbetalingerHotKeys';
import Månedsgruppe from './MånedsGruppe';
import TotaltUtbetalt from './totalt utbetalt/TotaltUtbetalt';
import {
    getTypeFromYtelse,
    maanedOgAarForUtbetaling,
    reduceUtbetlingerTilYtelser,
    utbetalingDatoComparator,
    utbetaltTilBruker
} from './utils/utbetalinger-utils';

const UtbetalingerPanel = styled(Panel)`
  padding: 0rem;
  margin-top: ${theme.margin.layout};
  margin-bottom: ${theme.margin.layout};
  > *:first-child {
    padding: ${pxToRem(15)};
  }
`;

const UtbetalingerListe = styled.ol`
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div`
  ol {
    list-style: none;
  }
`;

const OnOneLine = styled.div`
  display: inline-flex;
  align-items: center;
  > *:last-child {
    margin-left: 1rem;
  }
`;

export function getFiltrerteUtbetalinger(utbetalinger: Utbetaling[], filter: UtbetalingFilterState) {
    return utbetalinger
        .filter((utbetaling) => filtrerPaUtbetaltTilValg(utbetaling, filter))
        .filter((utbetaling) =>
            utbetaling.ytelser?.some((ytelse) => ytelse.type && filter.ytelser[ytelse.type] === true)
        )
        .map((utbetaling) => filtrerBortYtelserSomIkkeErValgt(utbetaling, filter));
}

function filtrerPaUtbetaltTilValg(utbetaling: Utbetaling, filter: UtbetalingFilterState) {
    return filter.utbetaltTil.includes(utbetaling.erUtbetaltTilPerson ? utbetaltTilBruker : utbetaling.utbetaltTil);
}

function filtrerBortYtelserSomIkkeErValgt(utbetaling: Utbetaling, filter: UtbetalingFilterState): Utbetaling {
    const ytelser = reduceUtbetlingerTilYtelser([utbetaling]);
    const filtrerteYtelser = ytelser.filter((ytelse) => filter.ytelser[getTypeFromYtelse(ytelse)] === true);
    if (filtrerteYtelser.length === ytelser.length) {
        return utbetaling;
    }
    return {
        ...utbetaling,
        ytelser: filtrerteYtelser
    };
}

interface UtbetalingerProps {
    utbetalingerData: UtbetalingerResponse;
}

function Utbetalinger(props: UtbetalingerProps) {
    const filter = useUtbetalingerFilter();
    const filtrerteUtbetalinger = getFiltrerteUtbetalinger(props.utbetalingerData.utbetalinger, filter);
    if (filtrerteUtbetalinger.length === 0) {
        return (
            <div role="alert">
                <AlertStripeInfo>
                    Det finnes ingen utbetalinger for valgte kombinasjon av periode og filtrering.
                </AlertStripeInfo>
            </div>
        );
    }

    const utbetalingerGruppert: GroupedArray<Utbetaling> = groupArray(
        filtrerteUtbetalinger.sort(utbetalingDatoComparator),
        maanedOgAarForUtbetaling
    );

    const månedsGrupper = utbetalingerGruppert.map((gruppe: ArrayGroup<Utbetaling>) => (
        <Månedsgruppe key={gruppe.category} gruppe={gruppe} {...props} />
    ));

    return (
        <Wrapper>
            <AriaNotification
                beskjed={`Det finnes ${filtrerteUtbetalinger.length} utbetalinger for valgt periode og filtrering`}
            />
            <TotaltUtbetalt utbetalinger={filtrerteUtbetalinger} periode={props.utbetalingerData.periode} />
            <HandleUtbetalingerArrowKeys utbetalinger={filtrerteUtbetalinger}>
                <article>
                    <UtbetalingerPanel aria-label="Utbetalinger">
                        <OnOneLine>
                            <Undertittel>Utbetalinger</Undertittel>
                            <Normaltekst>({filtrerteUtbetalinger.length} utbetalinger)</Normaltekst>
                        </OnOneLine>
                        <UtbetalingerListe aria-label="Måneder">{månedsGrupper}</UtbetalingerListe>
                    </UtbetalingerPanel>
                </article>
            </HandleUtbetalingerArrowKeys>
        </Wrapper>
    );
}

export default Utbetalinger;
