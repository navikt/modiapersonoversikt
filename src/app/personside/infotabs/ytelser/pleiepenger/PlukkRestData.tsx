import * as React from 'react';
import { ReactNode } from 'react';
import { isLoaded, Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';

interface Props<T> {
    restReducer: RestReducer<T>;
    children: (data: T) => ReactNode;
}

class PlukkRestData<T> extends React.Component<Props<T>> {
    render() {
        if (!isLoaded(this.props.restReducer)) {
            return 'Not loaded';
        }
        return this.props.children((this.props.restReducer as Loaded<T>).data);
    }
}

export default PlukkRestData;
