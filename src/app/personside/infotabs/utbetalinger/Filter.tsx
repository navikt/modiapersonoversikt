import * as React from 'react';
import Dato from 'nav-faker/dist/dato/dato';
import styled from 'styled-components';
import { Checkbox, Radio } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import EtikettMini from '../../../../components/EtikettMini';

export interface FilterState {
    periode: Periode;
    utbetaltTil: UtbetaltTilValg;
    ytelse: Ytelse;
}

interface Periode {
    radioValg: PeriodeValg;
    egendefinertPeriode?: {
        fra: Dato,
        til: Dato
    };
}

interface UtbetaltTilValg {
    bruker: boolean;
    annenMottaker: boolean;
}

interface Ytelse {
    alleYtelser: boolean;
}

interface Props {
    onChange: (change: Partial<FilterState>) => void;
    filterState: FilterState;
}

const FiltreringsPanel = styled.nav`
  > *:first-child {
    margin-top: 2em;
  }
`;

const InputPanel = styled.form`
  margin-top: 1em;
  margin-bottom: 1em;
  > *:not(:last-child) {
    margin-bottom: 1em;
  }
`;

const Opacity = styled.span`
  opacity: .5;
`;

export enum PeriodeValg {
    SISTE_30_DAGER = 'Siste 30 dager',
    INNEVÆRENDE_ÅR = 'Inneværende år',
    I_FJOR = 'I fjor',
    EGENDEFINERT = 'Egendefinert'
}

function Filtrering(props: Props) {

    function onRadioChange(key: PeriodeValg) {
        props.onChange({
            periode: {
                ...props.filterState.periode,
                radioValg: key
            }
        });
    }

    function onUtbetaltTilChange(change: Partial<UtbetaltTilValg>) {
        props.onChange({
            utbetaltTil: {
                ...props.filterState.utbetaltTil,
                ...change
            }
        });
    }

    function onYtelseChange(change: Partial<Ytelse>) {
        props.onChange({
            ytelse: {
                ...props.filterState.ytelse,
                ...change
            }
        });
    }

    const radios = Object.keys(PeriodeValg).map(key => {
        const label = PeriodeValg[key];
        const checked = props.filterState.periode.radioValg === label;
        return (
            <Radio
                label={label}
                key={label}
                checked={checked}
                onChange={() => onRadioChange(PeriodeValg[key])}
                name="FiltreringsvalgGruppe"
            />);
    });

    return (
        <FiltreringsPanel>
            <Element>Filtrering</Element>

            <InputPanel>
                <EtikettMini><Opacity>Velg periode</Opacity></EtikettMini>
                {radios}
            </InputPanel>

            <InputPanel>
                <EtikettMini><Opacity>Utbetaling til</Opacity></EtikettMini>
                <Checkbox
                    label="Bruker"
                    checked={props.filterState.utbetaltTil.bruker}
                    onChange={() => onUtbetaltTilChange({ bruker: !props.filterState.utbetaltTil.bruker})}
                />
                <Checkbox
                    label="Annen mottaker"
                    checked={props.filterState.utbetaltTil.annenMottaker}
                    onChange={() => onUtbetaltTilChange({ annenMottaker: !props.filterState.utbetaltTil.annenMottaker})}
                />
            </InputPanel>

            <InputPanel>
                <EtikettMini><Opacity>Velg ytelse</Opacity></EtikettMini>
                <Checkbox
                    label="Alle"
                    checked={props.filterState.ytelse.alleYtelser}
                    onChange={() => onYtelseChange({alleYtelser: !props.filterState.ytelse.alleYtelser})}
                />
            </InputPanel>

        </FiltreringsPanel>
    );
}

export default Filtrering;
