import { FilterState } from './Filter';
import { Utbetaling } from '../../../../models/utbetalinger';
import { sorterAlfabetisk } from '../../../../utils/string-utils';
import * as React from 'react';
import { Checkbox } from 'nav-frontend-skjema';

interface UtbetaltTilProps {
    onChange: (change: Partial<FilterState>) => void;
    filterState: FilterState;
    utbetalinger: Utbetaling[];
}

class UtbetaltTilValg extends React.Component<UtbetaltTilProps> {

    constructor(props: UtbetaltTilProps) {
        super(props);
        this.props.onChange({
            utbetaltTil: [...this.getUnikeMottakere()]
        });
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

    getUnikeMottakere() {
        const fjernDuplikater = (utbetaltTil: string, index: number, self: Array<string>) =>
            self.indexOf(utbetaltTil) === index;
        const unikeMottakere = this.props.utbetalinger
            .map(utbetaling => utbetaling.utbetaltTil)
            .filter(fjernDuplikater)
            .sort(sorterAlfabetisk);
        return unikeMottakere;
    }

    render() {
        const unikeMottakere = this.getUnikeMottakere();
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
