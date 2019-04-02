import * as React from 'react';
import { Utbetaling, UtbetalingerResponse } from '../../../../models/utbetalinger';
import styled from 'styled-components';
import theme from '../../../../styles/personOversiktTheme';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import TotaltUtbetalt from './totalt utbetalt/TotaltUtbetalt';
import { ArrayGroup, groupArray, GroupedArray } from '../../../../utils/groupArray';
import {
    fjernTommeUtbetalinger,
    getTypeFromYtelse,
    månedOgÅrForUtbetaling,
    reduceUtbetlingerTilYtelser,
    utbetalingDatoComparator,
    utbetaltTilBruker
} from './utils/utbetalingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Månedsgruppe from './MånedsGruppe';
import HandleUtbetalingerArrowKeys from './HandleUtbetalingerHotKeys';
import AriaNotification from '../../../../components/AriaNotification';
import { UtbetalingFilterState } from '../../../../redux/utbetalinger/types';

const UtbetalingerArticle = styled.article`
    ${theme.hvittPanel};
    margin-top: ${theme.margin.layout};
    margin-bottom: ${theme.margin.layout};
    > *:first-child {
        padding: ${theme.margin.px20};
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
        .filter(utbetaling => filtrerPaUtbetaltTilValg(utbetaling, filter))
        .map(utbetaling => filtrerBortYtelserSomIkkeErValgt(utbetaling, filter))
        .filter(fjernTommeUtbetalinger);
}

function filtrerPaUtbetaltTilValg(utbetaling: Utbetaling, filter: UtbetalingFilterState) {
    return filter.utbetaltTil.includes(utbetaling.erUtbetaltTilPerson ? utbetaltTilBruker : utbetaling.utbetaltTil);
}

function filtrerBortYtelserSomIkkeErValgt(utbetaling: Utbetaling, filter: UtbetalingFilterState): Utbetaling {
    const ytelser = reduceUtbetlingerTilYtelser([utbetaling]).filter(ytelse =>
        filter.ytelser.includes(getTypeFromYtelse(ytelse))
    );
    return {
        ...utbetaling,
        ytelser: ytelser
    };
}

interface UtbetalingerProps {
    utbetalingerData: UtbetalingerResponse;
    filter: UtbetalingFilterState;
}

function Utbetalinger({ filter, ...props }: UtbetalingerProps) {
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
        månedOgÅrForUtbetaling
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
                <UtbetalingerArticle aria-label="Utbetalinger">
                    <OnOneLine>
                        <Undertittel>Utbetalinger</Undertittel>
                        <Normaltekst>({filtrerteUtbetalinger.length} utbetalinger)</Normaltekst>
                    </OnOneLine>
                    <UtbetalingerListe aria-label="Måneder">{månedsGrupper}</UtbetalingerListe>
                </UtbetalingerArticle>
            </HandleUtbetalingerArrowKeys>
        </Wrapper>
    );
}

export default Utbetalinger;
