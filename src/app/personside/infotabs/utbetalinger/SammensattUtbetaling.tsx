import * as React from 'react';
import {
    datoVerbose,
    formaterNOK,
    getGjeldendeDatoForUtbetaling,
    getNettoSumYtelser,
    periodeStringFromYtelse
} from './utbetalingerUtils';
import { UtbetalingStyle } from './Utbetaling';
import styled from 'styled-components';
import { Bold, SpaceBetween, UndertekstGrå, UndertekstGråBold } from '../../../../components/common-styled-components';
import PrintKnapp from '../../../../components/PrintKnapp';
import { UndertekstBold } from 'nav-frontend-typografi';
import DetaljerKnapp from './DetaljerKnapp';
import UtbetalingsDetaljer from './UtbetalingsDetaljer';
import { Utbetaling, Ytelse } from '../../../../models/utbetalinger';

export interface EnkeltYtelseProps {
    ytelse: Ytelse;
    konto: string | undefined;
    melding: string | undefined;
}

interface EnkeltYtelseState {
    visDetaljer: boolean;
}

const EnkeltYtelseStyle = styled<{ focus: boolean }, 'li'>('li')`
  transition: 0.3s;
  ${props => props.focus && 'background-color: rgba(0, 0, 0, 0.03);'}
`;

const PadLeft = styled.div`
  margin-left: .5rem;
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
        const detaljer = this.state.visDetaljer &&
            <UtbetalingsDetaljer ytelse={ytelse} konto={this.props.konto} melding={this.props.melding}/>;

        return (
            <EnkeltYtelseStyle focus={this.state.visDetaljer}>
                <SpaceBetween>
                    <UndertekstGråBold>
                        {ytelse.type}
                    </UndertekstGråBold>
                    <SpaceBetween>
                        <UndertekstGråBold>
                            {formaterNOK(ytelse.nettobeløp)}
                        </UndertekstGråBold>
                        <PadLeft/>
                        <DetaljerKnapp onClick={this.toggleVisDetaljer} open={this.state.visDetaljer}/>
                    </SpaceBetween>
                </SpaceBetween>
                <UndertekstGrå>
                    {periode}
                </UndertekstGrå>
                {detaljer}
            </EnkeltYtelseStyle>
        );
    }
}

interface Props {
    utbetaling: Utbetaling;
}

const YtelsesListe = styled.ul`
  padding-left: .5rem;
  list-style: none;
  > * {
    margin-top: .2rem;
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
        <UtbetalingStyle>
            <SpaceBetween>
                <UndertekstGrå>
                    {dato} / <Bold>{utbetaling.status}</Bold>
                </UndertekstGrå>
                <PrintKnapp onClick={() => alert('ikke implementert')}/>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstBold tag={'h4'}>{'Diverse ytelser'}</UndertekstBold>
                <UndertekstBold>{sum}</UndertekstBold>
            </SpaceBetween>
            <SpaceBetween>
                <UndertekstGrå>Utbetaling til: {utbetaling.utbetaltTil}</UndertekstGrå>
                <UndertekstGrå>{forfallsInfo}</UndertekstGrå>
            </SpaceBetween>
            <YtelsesListe>
                {ytelsesListe}
            </YtelsesListe>
        </UtbetalingStyle>
    );
}

export default SammensattUtbetaling;
