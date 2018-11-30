import * as React from 'react';
import { ReactNode } from 'react';
import { isLoaded, Loaded, RestReducer } from '../../../../../redux/restReducers/restReducer';
import Innholdslaster, { InnholdslasterProps } from '../../../../../components/Innholdslaster';

interface OwnProps<T> {
    restReducer: RestReducer<T>;
    children: (data: T) => ReactNode;
}

type Props<T> = OwnProps<T> & Pick<InnholdslasterProps, 'spinnerSize' | 'returnOnPending' | 'returnOnError'>;

class PlukkRestData<T> extends React.Component<Props<T>> {
    render() {
        const {children, restReducer, ...innholdsLasterProps } = this.props;
        if (!isLoaded(restReducer)) {
            return <Innholdslaster avhengigheter={[this.props.restReducer]} {...innholdsLasterProps}/>;
        }
        return children((restReducer as Loaded<T>).data);
    }
}

export default PlukkRestData;
