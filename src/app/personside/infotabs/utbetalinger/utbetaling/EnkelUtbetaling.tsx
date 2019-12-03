import * as React from 'react';
import { Utbetaling as UtbetalingInterface, Ytelse } from '../../../../../models/utbetalinger';
import { formaterNOK, getGjeldendeDatoForUtbetaling, periodeStringFromYtelse } from '../utils/utbetalingerUtils';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import theme from '../../../../../styles/personOversiktTheme';
import styled from 'styled-components';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import DetaljerCollapse from '../../../../../components/DetaljerCollapse';
import { Normaltekst } from 'nav-frontend-typografi';
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
import { useEffect } from 'react';

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
    padding: ${theme.margin.px10} ${theme.margin.px20} 0;
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
    const printerButtonRef = React.createRef<HTMLSpanElement>();
    const utbetalingRef = React.createRef<HTMLLIElement>();
    const dispatch = useDispatch();
    const utbetaling = props.utbetaling;
    const ytelse = props.ytelse;
    const tittel = ytelse.type;

    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    const print = printer.triggerPrint;

    const utbetalinger = useAppState(state => state.utbetalinger);
    const erIFokus = utbetalinger.ytelseIFokus === ytelse;
    const visDetaljer = utbetalinger.ekspanderteYtelser.includes(ytelse);

    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
    const sum = formaterNOK(ytelse.nettobeløp);
    const periode = periodeStringFromYtelse(ytelse);
    const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato ? `Forfallsdato: ${dato}` : '';

    const ekspanderYtelse = (ekspander: boolean) => dispatch(setEkspanderYtelse(ytelse, ekspander));
    const setYtelseIFokus = () => dispatch(setNyYtelseIFokus(ytelse));

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
        print();
        loggEvent('EnkeltUtbetaling', 'usePrinter');
    };

    const handleClickOnUtbetaling = (event: React.MouseEvent<HTMLElement>) => {
        const printKnappTrykket = eventTagetIsInsideRef(event, printerButtonRef);
        if (!printKnappTrykket) {
            toggleVisDetaljer();
        }
    };

    return (
        <PrinterWrapper>
            <UtbetalingStyle
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                    cancelIfHighlighting(() => handleClickOnUtbetaling(event));
                }}
                ref={utbetalingRef}
                tabIndex={0}
                //onFocus={setYtelseIFokus}
                className={utbetalingerTest.utbetaling}
            >
                <article aria-expanded={visDetaljer} aria-label={'Utbetaling ' + ytelse.type}>
                    <UtbetalingTabellStyling>
                        <UtbetalingHeaderStyle>
                            <SpaceBetween>
                                <Normaltekst tag={'h4'}>
                                    <Bold>{tittel}</Bold>
                                </Normaltekst>
                                <Normaltekst>
                                    <Bold>{sum}</Bold>
                                </Normaltekst>
                            </SpaceBetween>
                            <Normaltekst className="order-first">
                                {dato} / <Bold>{utbetaling.status}</Bold>
                            </Normaltekst>
                            <SpaceBetween>
                                <Normaltekst>{periode}</Normaltekst>
                                <Normaltekst>{forfallsInfo}</Normaltekst>
                            </SpaceBetween>
                            <SpaceBetween>
                                <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                                <span ref={printerButtonRef}>
                                    <PrintKnapp onClick={handlePrint} />
                                </span>
                            </SpaceBetween>
                        </UtbetalingHeaderStyle>
                        <DetaljerCollapse open={visDetaljer} toggle={toggleVisDetaljer}>
                            <UtbetalingsDetaljer
                                ytelse={ytelse}
                                konto={utbetaling.konto}
                                melding={utbetaling.melding}
                            />
                        </DetaljerCollapse>
                    </UtbetalingTabellStyling>
                </article>
            </UtbetalingStyle>
        </PrinterWrapper>
    );
}

export default EnkelUtbetaling;
