import * as React from 'react';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser
} from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, FlexEnd, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Normaltekst } from 'nav-frontend-typografi';
import { Utbetaling } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { FokusProps, UtbetalingTabellStyling } from '../Utbetalinger';
import EnkeltYtelse from './EnkeltYtelse';
import Printer from '../../../../../utils/Printer';

interface OwnProps {
    utbetaling: Utbetaling;
}

type Props = OwnProps & FokusProps;

interface State {
    visYtelseDetaljer: boolean[];
}

const SammensattUtbetalingStyle = styled.li`
  padding: ${theme.margin.px20};
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
`;

const YtelsesListe = styled.ul`
  padding: 0;
  margin-top: 2rem;
  > li {
    margin-left: 1.5rem;
    border-top: ${theme.border.skilleSvak};
    padding-top: 1rem;
  }
`;

class SammensattUtbetaling extends React.PureComponent<Props, State> {

    private print: () => void;

    constructor(props: Props) {
        super(props);

        if (this.props.utbetaling.ytelser) {
            let visYtelseDetaljer: boolean[] = [];
            this.props.utbetaling.ytelser.forEach(() => visYtelseDetaljer.push(false));
            this.state = {
                visYtelseDetaljer: visYtelseDetaljer
            };
        }

        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.visDetaljerAndPrint = this.visDetaljerAndPrint.bind(this);
    }

    visDetaljerAndPrint() {
        this.setState(
            {
                visYtelseDetaljer: this.state.visYtelseDetaljer.map(() => true)
            },
            this.print
        );
    }

    toggleVisDetaljer(index: number) {
        this.setState({
            visYtelseDetaljer: this.state.visYtelseDetaljer.map((ytelsedetalj, i) =>
                i === index ? !ytelsedetalj : ytelsedetalj
            )
        });
    }

    render() {
        const utbetaling = this.props.utbetaling;

        if (!utbetaling.ytelser) {
            return <>'Manglende data i utbetaling.'</>;
        }

        const dato = datoVerbose(getGjeldendeDatoForUtbetaling(utbetaling)).sammensatt;
        const sum = formaterNOK(getNettoSumYtelser(utbetaling.ytelser));
        const forfallsInfo = utbetaling.forfallsdato && !utbetaling.utbetalingsdato
            ? `Forfallsdato: ${dato}` : '';
        const ytelsesListe = utbetaling.ytelser.map((ytelse, index) => (
            <EnkeltYtelse
                ytelse={ytelse}
                konto={utbetaling.konto}
                melding={utbetaling.melding}
                key={index}
                toggleVisDetaljer={() => this.toggleVisDetaljer(index)}
                visDetaljer={this.state.visYtelseDetaljer[index]}
                {...this.props}
            />
        ));

        return (
            <Printer getPrintFunc={(func: () => void) => this.print = func}>
                <UtbetalingTabellStyling>
                    <SammensattUtbetalingStyle>
                        <Normaltekst>
                            {dato} / <Bold>{utbetaling.status}</Bold>
                        </Normaltekst>
                        <SpaceBetween>
                            <Normaltekst tag={'h4'}><Bold>Diverse ytelser</Bold></Normaltekst>
                            <Normaltekst><Bold>{sum}</Bold></Normaltekst>
                        </SpaceBetween>
                        <FlexEnd>
                            <Normaltekst>{forfallsInfo}</Normaltekst>
                        </FlexEnd>
                        <SpaceBetween>
                            <Normaltekst>Utbetaling til: {utbetaling.utbetaltTil}</Normaltekst>
                            <PrintKnapp onClick={this.visDetaljerAndPrint}/>
                        </SpaceBetween>
                        <YtelsesListe>
                            {ytelsesListe}
                        </YtelsesListe>
                    </SammensattUtbetalingStyle>
                </UtbetalingTabellStyling>
            </Printer>
        );
    }
}

export default SammensattUtbetaling;