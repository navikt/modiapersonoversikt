import { Element, Normaltekst } from 'nav-frontend-typografi';
import { createRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Bold, FlexEnd, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import type { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import { setEkspanderYtelse } from '../../../../../redux/utbetalinger/actions';
import theme, { pxToRem } from '../../../../../styles/personOversiktTheme';
import { useOnMount } from '../../../../../utils/customHooks';
import { datoVerbose } from '../../../../../utils/date-utils';
import { loggEvent } from '../../../../../utils/logger/frontendLogger';
import usePrinter from '../../../../../utils/print/usePrinter';
import { utbetalingerTest } from '../../dyplenkeTest/utils-dyplenker-test';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { formaterNOK, getGjeldendeDatoForUtbetaling, getNettoSumYtelser } from '../utils/utbetalinger-utils';
import DelUtbetaling from './DelUtbetaling';

interface Props {
    utbetaling: Utbetaling;
    erValgtIUrl: boolean;
}

const SammensattUtbetalingStyle = styled.li`
    padding: ${pxToRem(15)};
    > *:nth-child(3) {
        margin-bottom: 0.8rem;
    }
    @media print {
        list-style-type: none;
        li {
            page-break-inside: avoid;
        }
    }
    &:focus {
        ${theme.focusInset}
    }
`;

const YtelsesListe = styled.ul`
    margin-top: 2rem;
    padding: 0;
    list-style: none;
    border-radius: ${theme.borderRadius.layout};
    border: ${theme.border.skilleSvak};
    @media print {
        border: none;
    }
    > li:not(:first-child) {
        border-top: ${theme.border.skilleSvak};
    }
`;

function SammensattUtbetaling(props: Props) {
    const utbetalingRef = createRef<HTMLLIElement>();
    const printer = usePrinter();
    const print = printer.triggerPrint;
    const PrinterWrapper = printer.printerWrapper;
    const dispatch = useDispatch();
    const ekspanderYtelse = (ytelse: Ytelse) => dispatch(setEkspanderYtelse(ytelse, true));

    useOnMount(() => {
        if (props.erValgtIUrl) {
            if (utbetalingRef.current) utbetalingRef.current.focus();
        }
    });

    const visDetaljerAndPrint = () => {
        const ytelser = props.utbetaling.ytelser;
        if (!ytelser) {
            return;
        }
        // biome-ignore lint/suspicious/useIterableCallbackReturn: Biome migration
        ytelser.forEach((ytelse) => ekspanderYtelse(ytelse));
        print();
        loggEvent('Print', 'SammensattUtbetaling');
    };

    const utbetaling = props.utbetaling;
    if (!utbetaling.ytelser) {
        return <>'Manglende data i utbetaling.'</>;
    }

    const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
    const sum = formaterNOK(getNettoSumYtelser(utbetaling.ytelser));
    const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato ? `Forfallsdato: ${dato}` : '';
    const ytelsesListe = utbetaling.ytelser.map((ytelse, index) => (
        <DelUtbetaling ytelse={ytelse} konto={utbetaling.konto} melding={utbetaling.melding} key={index} />
    ));

    return (
        <PrinterWrapper>
            <SammensattUtbetalingStyle ref={utbetalingRef} tabIndex={-1} className={utbetalingerTest.utbetaling}>
                <UtbetalingTabellStyling>
                    <Normaltekst>
                        {dato} / <Bold>{utbetaling.status}</Bold>
                    </Normaltekst>
                    <SpaceBetween>
                        <Element tag={'h4'}>Diverse ytelser</Element>
                        <Element>{sum}</Element>
                    </SpaceBetween>
                    <FlexEnd>
                        <Normaltekst>{forfallsInfo}</Normaltekst>
                    </FlexEnd>
                    <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                    <SpaceBetween>
                        <Normaltekst>Utbetalingsmetode: {utbetaling.metode}</Normaltekst>
                        <PrintKnapp onClick={visDetaljerAndPrint} />
                    </SpaceBetween>
                    <YtelsesListe aria-label={'Diverse ytelser'}>{ytelsesListe}</YtelsesListe>
                </UtbetalingTabellStyling>
            </SammensattUtbetalingStyle>
        </PrinterWrapper>
    );
}

export default SammensattUtbetaling;
