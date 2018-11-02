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
import { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { FokusProps, UtbetalingTabellStyling } from '../Utbetalinger';
import EnkeltYtelse from './EnkeltYtelse';
import Printer from '../../../../../utils/Printer';

interface OwnProps {
    utbetaling: Utbetaling;
}

type Props = OwnProps & FokusProps;

interface State {
    åpnedeYtelser: Ytelse[];
}

const SammensattUtbetalingStyle = styled.li`
  padding: ${theme.margin.px20};
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
  @media print{
    list-style-type: none;
    li {
      page-break-inside: avoid;
    }
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

class SammensattUtbetaling extends React.PureComponent<Props, State> {

    private print: () => void;

    constructor(props: Props) {
        super(props);

        this.state = {
            åpnedeYtelser: []
        };

        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
        this.visDetaljerAndPrint = this.visDetaljerAndPrint.bind(this);
    }

    visDetaljerAndPrint() {
        this.setState(
            {
                åpnedeYtelser: this.props.utbetaling.ytelser != null ? [ ...this.props.utbetaling.ytelser ] : []
            },
            this.print
        );
    }

    toggleVisDetaljer(ytelse: Ytelse) {
        if (this.state.åpnedeYtelser.includes(ytelse)) {
            this.setState({
                åpnedeYtelser: this.state.åpnedeYtelser.filter((y: Ytelse) => ytelse !== y)
            });
        } else {
            this.setState({
                åpnedeYtelser: [ ...this.state.åpnedeYtelser, ytelse ]
            });
        }
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
                toggleVisDetaljer={() => this.toggleVisDetaljer(ytelse)}
                visDetaljer={this.state.åpnedeYtelser.includes(ytelse)}
                {...this.props}
            />
        ));

        return (
            <Printer getPrintTrigger={(trigger: () => void) => this.print = trigger}>
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