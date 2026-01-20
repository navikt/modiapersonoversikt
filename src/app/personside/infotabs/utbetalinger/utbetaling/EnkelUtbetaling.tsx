import { Element, Normaltekst } from 'nav-frontend-typografi';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { trackVisDetaljvisning } from 'src/utils/analytics';
import styled from 'styled-components';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import PrintKnapp from '../../../../../components/PrintKnapp';
import type { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import { setEkspanderYtelse, setNyYtelseIFokus } from '../../../../../redux/utbetalinger/actions';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { useAppState, useOnMount, useOnUpdate, usePrevious } from '../../../../../utils/customHooks';
import { datoVerbose } from '../../../../../utils/date-utils';
import { cancelIfHighlighting } from '../../../../../utils/function-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import usePrinter from '../../../../../utils/print/usePrinter';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRef-utils';
import { utbetalingerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { formaterNOK, getGjeldendeDatoForUtbetaling, periodeStringFromYtelse } from '../utils/utbetalinger-utils';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';

interface Props {
    utbetaling: UtbetalingInterface;
    ytelse: Ytelse;
    erValgtIUrl: boolean;
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
    const utbetalingerState = useAppState((state) => state.utbetalinger);
    const erIFokus = utbetalingerState.ytelseIFokus === props.ytelse;
    const visDetaljer = utbetalingerState.ekspanderteYtelser.includes(props.ytelse);
    const ekspanderYtelse = (ekspander: boolean) => dispatch(setEkspanderYtelse(props.ytelse, ekspander));
    const setYtelseIFokus = () => !erIFokus && dispatch(setNyYtelseIFokus(props.ytelse));

    useOnMount(() => {
        if (props.erValgtIUrl) {
            if (utbetalingRef.current) utbetalingRef.current.focus();
            ekspanderYtelse(true);
            setYtelseIFokus();
        }
    });

    const prevErIFokus = usePrevious(erIFokus);
    useOnUpdate(() => {
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
        loggEvent('Print-Enkeltutbetaling', 'Utbetalinger');
    };

    const handleClickOnUtbetaling = (event: React.MouseEvent<HTMLElement>) => {
        const printKnappTrykket = eventTagetIsInsideRef(event, printerButtonRef);
        if (!printKnappTrykket) {
            if (!visDetaljer) trackVisDetaljvisning('utbetaling', 'vis enkel utbetaling');
            toggleVisDetaljer();
        }
        ekspanderYtelse(!visDetaljer);
    };

    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(props.utbetaling)).sammensatt;
    const sum = formaterNOK(props.ytelse.nettobelop);
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
                <article aria-expanded={visDetaljer} aria-label={`Utbetaling ${props.ytelse.type}`}>
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
                            <Normaltekst>Utbetaling til: {props.utbetaling.utbetaltTil}</Normaltekst>
                            <SpaceBetween>
                                <Normaltekst>Utbetalingsmetode: {props.utbetaling.metode}</Normaltekst>
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

export default EnkelUtbetaling;
