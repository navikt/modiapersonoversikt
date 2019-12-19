import * as React from 'react';
import { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import { formaterNOK, getGjeldendeDatoForUtbetaling, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { useDispatch } from 'react-redux';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/actions';
import { datoVerbose } from '../../../../../utils/dateUtils';
import { utbetalingerTest } from '../../dyplenkeTest/utils';
import { useAppState, useOnMount, usePrevious } from '../../../../../utils/customHooks';
import usePrinter from '../../../../../utils/UsePrinter';
import { useEffect, useRef } from 'react';

interface Props {
    utbetaling: UtbetalingInterface;
    ytelse: Ytelse;
    valgt: boolean;
}
const UtbetalingStyle = styled.li`
    cursor: pointer;
    transition: 0.3s;
    &:focus {
        ${theme.focusOverlay}
    }
    @media print {
        list-style-type: none;
    }
`;

const UtbetalingHeaderStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${theme.margin.px10} ${pxToRem(15)} 0;
    transition: 0.3s;
    cursor: pointer;
    > *:nth-child(3) {
        margin-bottom: 0.8rem;
    }
    .order-first {
        order: -1;
    }
`;

function EnkelUtbetaling(props: Props) {
    const printerButtonRef = useRef<HTMLSpanElement>(null);
    const utbetalingRef = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();
    const printer = usePrinter();
    const utbetalingerState = useAppState(state => state.utbetalinger);
    const erIFokus = utbetalingerState.ytelseIFokus === props.ytelse;
    const visDetaljer = utbetalingerState.ekspanderteYtelser.includes(props.ytelse);
    const ekspanderYtelse = (ekspander: boolean) => dispatch(setEkspanderYtelse(props.ytelse, ekspander));
    const setYtelseIFokus = () => !erIFokus && dispatch(setNyYtelseIFokus(props.ytelse));

    useOnMount(() => {
        if (props.valgt) {
            utbetalingRef.current && utbetalingRef.current.focus();
        }
    });

    const prevErIFokus = usePrevious(erIFokus);
    useEffect(() => {
        const fikkFokus = erIFokus && !prevErIFokus;
        if (fikkFokus && utbetalingRef.current) {
            utbetalingRef.current.focus();
        }
    }, [prevErIFokus, erIFokus, utbetalingRef]);

    const toggleVisDetaljer = () => {
        ekspanderYtelse(!visDetaljer);
        setYtelseIFokus();
    };

    const handlePrint = () => {
        ekspanderYtelse(true);
        printer.triggerPrint();
        loggEvent('Print', 'EnkeltUtbetlaing');
    };

    const handleClickOnUtbetaling = (event: React.MouseEvent<HTMLElement>) => {
        const printKnappTrykket = eventTagetIsInsideRef(event, printerButtonRef);
        if (!printKnappTrykket) {
            toggleVisDetaljer();
        }
    };

    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(props.utbetaling)).sammensatt;
    const sum = formaterNOK(props.ytelse.nettobeløp);
    const periode = periodeStringFromYtelse(props.ytelse);
    const forfallsInfo =
        props.utbetaling.forfallsdato && !props.utbetaling.utbetalingsdato ? `Forfallsdato: ${dato}` : '';
    const tittel = props.ytelse.type;
    const PrinterWrapper = printer.printerWrapper;

    return (
        <PrinterWrapper>
            <UtbetalingStyle
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    cancelIfHighlighting(() => handleClickOnUtbetaling(event));
                }}
                ref={utbetalingRef}
                tabIndex={0}
                onFocus={setYtelseIFokus}
                className={utbetalingerTest.utbetaling}
            >
                <article aria-expanded={visDetaljer} aria-label={'Utbetaling ' + props.ytelse.type}>
                    <UtbetalingTabellStyling>
                        <UtbetalingHeaderStyle>
                            <SpaceBetween>
                                <Element tag={'h4'}>{tittel}</Element>
                                <Element>{sum}</Element>
                            </SpaceBetween>
                            <Normaltekst className="order-first">
                                {dato} / <Bold>{props.utbetaling.status}</Bold>
                            </Normaltekst>
                            <SpaceBetween>
                                <Normaltekst>{periode}</Normaltekst>
                                <Normaltekst>{forfallsInfo}</Normaltekst>
                            </SpaceBetween>
                            <SpaceBetween>
                                <Normaltekst>Utbetaling til: {props.utbetaling.utbetaltTil}</Normaltekst>
                                <span ref={printerButtonRef}>
                                    <PrintKnapp onClick={handlePrint} />
                                </span>
                            </SpaceBetween>
                        </UtbetalingHeaderStyle>
                        <DetaljerCollapse open={visDetaljer} toggle={toggleVisDetaljer}>
                            <UtbetalingsDetaljer
                                ytelse={props.ytelse}
                                konto={props.utbetaling.konto}
                                melding={props.utbetaling.melding}
                            />
                        </DetaljerCollapse>
                    </UtbetalingTabellStyling>
                </article>
            </UtbetalingStyle>
        </PrinterWrapper>
    );
}

export default React.memo(EnkelUtbetaling);
