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
        this.updateYtelseFilterWithNewValues();
    }

    updateYtelseFilterWithNewValues() {
        const tidligereYtelser = this.props.filterState.ytelser;
        const tidligereYtelserKeys = Object.keys(tidligereYtelser);
        const nyeYtelser = this.getUnikeYtelserRecord(this.props.utbetalinger);

        if (Object.keys(nyeYtelser).filter((y) => !tidligereYtelserKeys.includes(y)).length > 0) {
            this.props.onChange({
                ytelser: { ...nyeYtelser, ...tidligereYtelser }
            });
        }
    }

    componentDidUpdate() {
        this.updateYtelseFilterWithNewValues();
    }

    onYtelseChange(change: string) {
        this.props.onChange({
            ytelser: {
                ...this.props.filterState.ytelser,
                [change]: !this.props.filterState.ytelser[change]
            }
        });
    }

    getUnikeYtelserRecord(utbetalinger: Utbetaling[]): Record<string, boolean> {
        return this.getUnikeYtelser(utbetalinger).reduce(
            (rec, ytelse) => {
                rec[ytelse] = true;
                return rec;
            },
            {} as Record<string, boolean>
        );
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
                checked={this.props.filterState.ytelser[ytelse]}
                onChange={() => this.onYtelseChange(ytelse)}
            />
        ));
        return <>{checkboxer}</>;
    }
}

export default YtelseValg;
