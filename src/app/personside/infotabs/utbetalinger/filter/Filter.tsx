import * as React from 'react';
import styled from 'styled-components';
import { Radio } from 'nav-frontend-skjema';
import { EtikettLiten, Undertittel } from 'nav-frontend-typografi';
import NavDatovelger from 'nav-datovelger';
import { Feilmelding } from '../../../../../utils/Feilmelding';
import * as moment from 'moment';
import { UtbetalingerResponse } from '../../../../../models/utbetalinger';
import { isLoaded, isLoading, isReloading, RestReducer } from '../../../../../redux/restReducers/restReducer';
import UtbetaltTilValg from './UtbetaltTilValg';
import YtelseValg from './YtelseValg';
import theme from '../../../../../styles/personOversiktTheme';
import { restoreScroll } from '../../../../../utils/restoreScroll';
import { Knapp } from 'nav-frontend-knapper';

export interface FilterState {
    periode: PeriodeOptions;
    utbetaltTil: Array<string>;
    ytelser: Array<string>;
}

interface PeriodeOptions {
    radioValg: PeriodeValg;
    egendefinertPeriode: FraTilDato;
}

export interface FraTilDato {
    fra: Date;
    til: Date;
}

interface Props {
    onChange: (change: Partial<FilterState>) => void;
    hentUtbetalinger: () => void;
    filterState: FilterState;
    utbetalingReducer: RestReducer<UtbetalingerResponse>;
}

export enum PeriodeValg {
    SISTE_30_DAGER = 'Siste 30 dager',
    INNEVÆRENDE_ÅR = 'Inneværende år',
    I_FJOR = 'I fjor',
    EGENDEFINERT = 'Egendefinert'
}

const FiltreringsPanel = styled.nav`
  ${theme.hvittPanel};
  padding: ${theme.margin.px20};
  margin-bottom: ${theme.margin.layout};
`;

const InputPanel = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  > *:first-child {
    margin-bottom: .5rem;
  }
  > * {
    margin-top: .5rem;
  }
`;

const KnappWrapper = styled.div`
  margin-top: 1rem;
`;

const FieldSet = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  > *:first-child {
    margin-bottom: .8rem;
  }
  > *:last-child {
    margin-bottom: 0;
  }
`;

const WrapOnSmallScreen = styled.div`
 @media(max-width: ${theme.media.utbetalinger}) {
    display: flex;
    flex-wrap: wrap;
    > * {
      flex-grow: 1;
      flex-basis: 30%;
    }
    > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

function onRadioChange(props: Props, key: PeriodeValg) {
    props.onChange({
        periode: {
            ...props.filterState.periode,
            radioValg: key
        }
    });
}

function onDatoChange(props: Props, dato: Partial<FraTilDato>) {
    const newPeriode: FraTilDato = {
        fra: dato.fra && moment(dato.fra).isValid()
            ? dato.fra
            : new Date(props.filterState.periode.egendefinertPeriode.fra),
        til: dato.til && moment(dato.til).isValid()
            ? dato.til
            : new Date(props.filterState.periode.egendefinertPeriode.til)
    };
    props.onChange({
        periode: {
            ...props.filterState.periode,
            egendefinertPeriode: newPeriode
        }
    });
}

function egendefinertDatoInputs(props: Props) {

    const fra = props.filterState.periode.egendefinertPeriode.fra;
    const til = props.filterState.periode.egendefinertPeriode.til;
    const periodeFeilmelding = fra && til && fra > til ?
        <Feilmelding feil={{feilmelding: 'Fra-dato kan ikke være senere enn til-dato'}}/> : null;

    return (
        <>
            <label htmlFor="utbetalinger-datovelger-fra">Fra:</label>
            <NavDatovelger
                dato={props.filterState.periode.egendefinertPeriode.fra}
                id={'utbetalinger-datovelger-fra'}
                onChange={dato => onDatoChange(props, {fra: dato})}
            />
            <label htmlFor="utbetalinger-datovelger-til">Til:</label>
            <NavDatovelger
                dato={props.filterState.periode.egendefinertPeriode.til}
                id={'utbetalinger-datovelger-til'}
                onChange={dato => onDatoChange(props, {til: dato})}
            />
            {periodeFeilmelding}
        </>
    );
}

function visCheckbokser(utbetalingerResponse: UtbetalingerResponse): boolean {
    return utbetalingerResponse.utbetalinger && utbetalingerResponse.utbetalinger.length > 0;
}

function Filtrering(props: Props) {
    const radios = Object.keys(PeriodeValg).map(key => {
        const label = PeriodeValg[key];
        const checked = props.filterState.periode.radioValg === label;
        return (
            <Radio
                key={label}
                label={label}
                checked={checked}
                onChange={() => onRadioChange(props, PeriodeValg[key])}
                name="FiltreringsvalgGruppe"
            />
        );
    });

    const visSpinner = isLoading(props.utbetalingReducer)
        || isReloading(props.utbetalingReducer);
    const checkBokser = isLoaded(props.utbetalingReducer) && visCheckbokser(props.utbetalingReducer.data) && (
        <>
            <InputPanel>
                <EtikettLiten>Utbetaling til</EtikettLiten>
                <UtbetaltTilValg
                    utbetalinger={props.utbetalingReducer.data.utbetalinger}
                    onChange={props.onChange}
                    filterState={props.filterState}
                />
            </InputPanel>
            <InputPanel>
                <EtikettLiten>Velg ytelse</EtikettLiten>
                <YtelseValg
                    onChange={props.onChange}
                    filterState={props.filterState}
                    utbetalinger={props.utbetalingReducer.data.utbetalinger}
                />
            </InputPanel>
        </>
    );
    const hentUtbetalinger = (
        <InputPanel>
            <FieldSet>
                <EtikettLiten tag="legend">Velg periode</EtikettLiten>
                {radios}
            </FieldSet>
            {props.filterState.periode.radioValg === PeriodeValg.EGENDEFINERT && egendefinertDatoInputs(props)}
            <KnappWrapper>
                <Knapp
                    onClick={props.hentUtbetalinger}
                    spinner={visSpinner}
                    htmlType="button"
                >
                    Hent utbetalinger
                </Knapp>
            </KnappWrapper>
        </InputPanel>
    );
    return (
        <FiltreringsPanel onClick={restoreScroll} aria-label="Filtrering utbetalinger">
            <Undertittel>Filtrering</Undertittel>

            <WrapOnSmallScreen>
                {hentUtbetalinger}
                {checkBokser}
            </WrapOnSmallScreen>

        </FiltreringsPanel>
    );
}

export default Filtrering;
