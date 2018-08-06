import * as React from 'react';
import Utbetalinger from './utbetalinger';
import { getMockUtbetalinger } from '../../../../mock/utbetalinger-mock';

interface Props {
    personnummer: string;
}

class UtbetalingerContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Utbetalinger utbetalinger={getMockUtbetalinger(this.props.personnummer).utbetalinger}/>
            </div>
        );
    }
}

export default UtbetalingerContainer;

// TODO legg til restreducer her
