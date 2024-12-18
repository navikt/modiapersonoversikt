import { Checkbox } from 'nav-frontend-skjema';
import { Component } from 'react';
import type { Utbetaling } from '../../../../../models/utbetalinger';
import type { UtbetalingFilterState } from '../../../../../redux/utbetalinger/types';
import { sorterAlfabetisk } from '../../../../../utils/string-utils';
import { getTypeFromYtelse, reduceUtbetlingerTilYtelser } from '../utils/utbetalinger-utils';

interface Props {
    onChange: (change: Partial<UtbetalingFilterState>) => void;
    filterState: UtbetalingFilterState;
    utbetalinger: Utbetaling[];
}

class YtelseValg extends Component<Props> {
    constructor(props: Props) {
        super(props);
        if (props.filterState.ytelser.length === 0) {
            this.props.onChange({
                ytelser: [...this.getUnikeYtelser(props.utbetalinger)]
            });
        }
    }

    componentDidUpdate(prevProps: Props) {
        const tidligereYtelser = this.getUnikeYtelser(prevProps.utbetalinger);
        const nyeYtelser = this.getUnikeYtelser(this.props.utbetalinger).filter(
            (ytelse: string) => !tidligereYtelser.includes(ytelse)
        );
        if (nyeYtelser.length > 0) {
            this.props.onChange({
                ytelser: [...this.props.filterState.ytelser, ...nyeYtelser]
            });
        }
    }

    onYtelseChange(change: string) {
        const ytelseState = this.props.filterState.ytelser;
        const newYtelseState: Array<string> = ytelseState.includes(change)
            ? ytelseState.filter((ytelse: string) => ytelse !== change)
            : [...ytelseState, change];
        this.props.onChange({
            ytelser: newYtelseState
        });
    }

    getUnikeYtelser(utbetalinger: Utbetaling[]): string[] {
        const fjernDuplikater = (ytelse: string, index: number, self: Array<string>) => self.indexOf(ytelse) === index;
        return reduceUtbetlingerTilYtelser(utbetalinger)
            .map(getTypeFromYtelse)
            .filter(fjernDuplikater)
            .sort(sorterAlfabetisk);
    }

    render() {
        const unikeYtelser = this.getUnikeYtelser(this.props.utbetalinger);
        const checkboxer = unikeYtelser.map((ytelse) => (
            <Checkbox
                key={ytelse}
                label={ytelse}
                checked={this.props.filterState.ytelser.includes(ytelse)}
                onChange={() => this.onYtelseChange(ytelse)}
            />
        ));
        return <>{checkboxer}</>;
    }
}

export default YtelseValg;
