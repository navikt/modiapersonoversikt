import * as React from 'react';
import { Utbetaling, UtbetalingerPeriode } from '../../../../../models/utbetalinger';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { formaterDato } from '../../../../../utils/stringFormatting';
import {
    getBruttoSumYtelser,
    getNettoSumYtelser,
    getTrekkSumYtelser,
    summertBeløpStringFraUtbetalinger
} from '../utils/utbetalingerUtils';
import TotaltUtbetaltDetaljer from './TotaltUtbetaltDetaljer';
import theme from '../../../../../styles/personOversiktTheme';
import { cancelIfHighlighting } from '../../../../../utils/functionUtils';
import { FlexEnd } from '../../../../../components/common-styled-components';
import { loggEvent } from '../../../../../utils/frontendLogger';
import { UtbetalingTabellStyling } from '../utils/CommonStyling';
import { eventTagetIsInsideRef } from '../../../../../utils/reactRefUtils';
import { Table } from '../../../../../utils/table/Table';
import { useState } from 'react';
import usePrinter from '../../../../../utils/UsePrinter';

export interface TotaltUtbetaltProps {
    utbetalinger: Utbetaling[];
    periode: UtbetalingerPeriode;
}

const Wrapper = styled.article`
    ${theme.hvittPanel};
    cursor: pointer;
`;

const Header = styled.div`
    padding: ${theme.margin.px20} ${theme.margin.px20} 0;
`;

const TotaltUtbetaltOversikt = styled.section`
    margin: 1rem 0;
    th {
        font-weight: normal;
    }
    th {
        text-transform: uppercase;
    }
    td {
        font-weight: bold;
    }
`;

function TotaltUtbetalt(props: TotaltUtbetaltProps) {
    const printerButtonRef = React.createRef<HTMLButtonElement>();
    const [visDetaljer, setVisDetaljer] = useState(false);
    const printer = usePrinter();
    const print = printer.triggerPrint;
    const PrinterWrapper = printer.printerWrapper;
    const sluttDato = new Date(props.periode.sluttDato) > new Date() ? new Date() : props.periode.sluttDato;
    const periode: string = formaterDato(props.periode.startDato) + ' - ' + formaterDato(sluttDato);
    const brutto: string = summertBeløpStringFraUtbetalinger(props.utbetalinger, getBruttoSumYtelser);
    const trekk: string = summertBeløpStringFraUtbetalinger(props.utbetalinger, getTrekkSumYtelser);
    const utbetalt: string = summertBeløpStringFraUtbetalinger(props.utbetalinger, getNettoSumYtelser);
    const totaltUtbetaltTabell = (
        <Table
            tittelRekke={['Totalt Utbetalt', 'Brutto', 'Trekk', 'Utbetalt']}
            rows={[[periode, brutto, trekk, utbetalt]]}
        />
    );

    const toggelVisDetaljer = () => {
        setVisDetaljer(!visDetaljer);
    };
    const handlePrint = () => {
        loggEvent('UtskriftTotaltUtbetalt', 'usePrinter');
        setVisDetaljer(true);
        print();
    };

    const handleClickOnUtbetaling = (event: React.MouseEvent<HTMLElement>) => {
        const printerButtonClicked = eventTagetIsInsideRef(event, printerButtonRef);
        if (!printerButtonClicked) {
            setVisDetaljer(!visDetaljer);
        }
    };

    return (
        <PrinterWrapper>
            <Wrapper
                aria-label="Totalt utbetalt"
                onClick={(event: React.MouseEvent<HTMLElement>) =>
                    cancelIfHighlighting(() => handleClickOnUtbetaling(event))
                }
            >
                <UtbetalingTabellStyling>
                    <Header>
                        <Undertittel>Totalt utbetalt for perioden</Undertittel>
                        <TotaltUtbetaltOversikt>
                            <Normaltekst tag="span">{totaltUtbetaltTabell}</Normaltekst>
                        </TotaltUtbetaltOversikt>
                        <FlexEnd>
                            <span ref={printerButtonRef}>
                                <PrintKnapp onClick={handlePrint} />
                            </span>
                        </FlexEnd>
                    </Header>
                    <TotaltUtbetaltDetaljer
                        visDetaljer={visDetaljer}
                        toggleVisDetaljer={toggelVisDetaljer}
                        {...props}
                    />
                </UtbetalingTabellStyling>
            </Wrapper>
        </PrinterWrapper>
    );
}

export default TotaltUtbetalt;
