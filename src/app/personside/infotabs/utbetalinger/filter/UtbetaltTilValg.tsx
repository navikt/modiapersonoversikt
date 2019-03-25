import { Utbetaling } from '../../../../../models/utbetalinger';
import { sorterAlfabetisk } from '../../../../../utils/string-utils';
import * as React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { utbetaltTilBruker } from '../utils/utbetalingerUtils';
import { UtbetalingFilterState } from '../../../../../redux/utbetalinger/types';

interface Props {
    onChange: (change: Partial<UtbetalingFilterState>) => void;
    filterState: UtbetalingFilterState;
    utbetalinger: Utbetaling[];
}

class UtbetaltTilValg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.props.onChange({
            utbetaltTil: [...this.getUnikeMottakere(props.utbetalinger)]
        });
    }

    componentDidUpdate(prevProps: Props) {
        const tidligereMottakere = this.getUnikeMottakere(prevProps.utbetalinger);
        const nyeMottakere = this.getUnikeMottakere(this.props.utbetalinger).filter(
            (mottaker: string) => !tidligereMottakere.includes(mottaker)
        );
        if (nyeMottakere.length > 0) {
            this.props.onChange({
                utbetaltTil: [...this.props.filterState.utbetaltTil, ...nyeMottakere]
            });
        }
    }

    onUtbetaltTilChange(change: string) {
        const utbetlatTilState = this.props.filterState.utbetaltTil;
        const newUtbetaltTilState: Array<string> = utbetlatTilState.includes(change)
            ? utbetlatTilState.filter((mottaker: string) => mottaker !== change)
            : [...utbetlatTilState, change];
        this.props.onChange({
            utbetaltTil: newUtbetaltTilState
        });
    }

    getUnikeMottakere(utbetalinger: Utbetaling[]) {
        const fjernDuplikater = (utbetaltTil: string, index: number, self: Array<string>) =>
            self.indexOf(utbetaltTil) === index;
        return utbetalinger
            .map(utbetaling => (utbetaling.erUtbetaltTilPerson ? utbetaltTilBruker : utbetaling.utbetaltTil))
            .filter(fjernDuplikater)
            .sort(sorterAlfabetisk);
    }

    render() {
        const unikeMottakere = this.getUnikeMottakere(this.props.utbetalinger);

        const checkboxer = unikeMottakere.map(mottaker => (
            <Checkbox
                key={mottaker}
                label={mottaker}
                checked={this.props.filterState.utbetaltTil.includes(mottaker)}
                onChange={() => this.onUtbetaltTilChange(mottaker)}
            />
        ));
        return <>{checkboxer}</>;
    }
}

export default UtbetaltTilValg;
