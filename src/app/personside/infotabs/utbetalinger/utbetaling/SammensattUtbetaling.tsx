import * as React from 'react';
import { formaterNOK, getGjeldendeDatoForUtbetaling, getNettoSumYtelser } from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, FlexEnd, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Normaltekst } from 'nav-frontend-typografi';
import { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import DelUtbetaling from './DelUtbetaling';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { useDispatch } from 'react-redux';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { setEkspanderYtelse } from '../../../../../redux/utbetalinger/actions';
import { datoVerbose } from '../../../../../utils/dateUtils';
import { utbetalingerTest } from '../../dyplenkeTest/utils';
import usePrinter from '../../../../../utils/UsePrinter';
import { useOnMount } from '../../../../../utils/customHooks';

interface Props {
    utbetaling: Utbetaling;
    erValgtIUrl: boolean;
}

const SammensattUtbetalingStyle = styled.li`
    padding: ${theme.margin.px20};
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
    const utbetalingRef = React.createRef<HTMLLIElement>();
    const printer = usePrinter();
    const print = printer.triggerPrint;
    const PrinterWrapper = printer.printerWrapper;
    const dispatch = useDispatch();
    const ekspanderYtelse = (ytelse: Ytelse) => dispatch(setEkspanderYtelse(ytelse, true));
    useOnMount(() => {
        if (props.erValgtIUrl) {
            utbetalingRef.current && utbetalingRef.current.focus();
        }
    });

    const visDetaljerAndPrint = () => {
        const ytelser = props.utbetaling.ytelser;
        if (!ytelser) {
            return;
        }
        ytelser.forEach(ytelse => ekspanderYtelse(ytelse));
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
                        <Normaltekst tag={'h4'}>
                            <Bold>Diverse ytelser</Bold>
                        </Normaltekst>
                        <Normaltekst>
                            <Bold>{sum}</Bold>
                        </Normaltekst>
                    </SpaceBetween>
                    <FlexEnd>
                        <Normaltekst>{forfallsInfo}</Normaltekst>
                    </FlexEnd>
                    <SpaceBetween>
                        <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                        <PrintKnapp onClick={visDetaljerAndPrint} />
                    </SpaceBetween>
                    <YtelsesListe aria-label={`Diverse ytelser`}>{ytelsesListe}</YtelsesListe>
                </UtbetalingTabellStyling>
            </SammensattUtbetalingStyle>
        </PrinterWrapper>
    );
}

export default SammensattUtbetaling;
