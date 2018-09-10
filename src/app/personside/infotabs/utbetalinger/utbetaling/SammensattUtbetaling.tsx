import * as React from 'react';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser,
    periodeStringFromYtelse
} from '../utils/utbetalingerUtils';
import styled from 'styled-components';
import { Bold, SpaceBetween } from '../../../../../components/common-styled-components';
import PrintKnapp from '../../../../../components/PrintKnapp';
import { Undertekst, UndertekstBold } from 'nav-frontend-typografi';
import DetaljerKnapp from '../utils/DetaljerKnapp';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Utbetaling, Ytelse } from '../../../../../models/utbetalinger';
import theme from '../../../../../styles/personOversiktTheme';
import { UnmountClosed } from 'react-collapse';

export interface EnkeltYtelseProps {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
}

interface EnkeltYtelseState {
    visDetaljer: boolean;
}

const EnkeltYtelseStyle = styled<{ åpen: boolean }, 'li'>('li')`
  transition: 0.3s;
  ${props => props.åpen && 'background-color: rgba(0, 0, 0, 0.03);'}
  cursor: pointer;
`;

const PadLeft = styled.div`
  margin-left: .5rem;
`;

const SammensattUtbetalingStyle = styled.li`
  padding: ${theme.margin.px20} ${theme.margin.px10};
  > *:first-child, > *:nth-child(2), > *:nth-child(3) {
    height: 1.3rem;
  }
  > *:nth-child(3) {
    margin-bottom: .8rem;
  }
`;

class EnkeltYtelse extends React.Component<EnkeltYtelseProps, EnkeltYtelseState> {

    constructor(props: EnkeltYtelseProps) {
        super(props);
        this.state = {
            visDetaljer: false
        };
        this.toggleVisDetaljer = this.toggleVisDetaljer.bind(this);
    }

    toggleVisDetaljer() {
        this.setState({
            visDetaljer: !this.state.visDetaljer
        });
    }

    render() {
        const ytelse = this.props.ytelse;
        const periode = periodeStringFromYtelse(ytelse);

        return (
            <EnkeltYtelseStyle onClick={this.toggleVisDetaljer} åpen={this.state.visDetaljer}>
                <SpaceBetween>
                    <UndertekstBold>
                        {ytelse.type}
                    </UndertekstBold>
                    <SpaceBetween>
                        <UndertekstBold>
                            {formaterNOK(ytelse.nettobeløp)}
                        </UndertekstBold>
                        <PadLeft/>
                        <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                    </SpaceBetween>
                </SpaceBetween>
                <Undertekst>
                    {periode}
                </Undertekst>
                <UnmountClosed isOpened={this.state.visDetaljer}>
                    <UtbetalingsDetaljer ytelse={ytelse} konto={this.props.konto} melding={this.props.melding}/>
                </UnmountClosed>
            </EnkeltYtelseStyle>
        );
    }
}

interface Props {
    utbetaling: Utbetaling;
}

const YtelsesListe = styled.ul`
  list-style: none;
  padding: 0;
  > * {
    padding-left: .5rem;
    margin-top: 1rem;
  }
`;

function SammensattUtbetaling(props: Props) {
    const utbetaling = props.utbetaling;
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
        />
    ));

    return (
        <SammensattUtbetalingStyle>
            <SpaceBetween>
                <Undertekst>
                    {dato} / <Bold>{utbetaling.status}</Bold>
                </Undertekst>
                <PrintKnapp onClick={() => alert('ikke implementert')}/>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold tag={'h4'}>{'Diverse ytelser'}</UndertekstBold>
                <UndertekstBold>{sum}</UndertekstBold>
            </SpaceBetween>
            <SpaceBetween>
                <Undertekst>Utbetaling til: {utbetaling.utbetaltTil}</Undertekst>
                <Undertekst>{forfallsInfo}</Undertekst>
            </SpaceBetween>
            <YtelsesListe>
                {ytelsesListe}
            </YtelsesListe>
        </SammensattUtbetalingStyle>
    );
}

export default SammensattUtbetaling;
