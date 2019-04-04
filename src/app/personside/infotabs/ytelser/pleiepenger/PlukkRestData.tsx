import * as React from 'react';
import { ReactNode } from 'react';
import { isLoaded, Loaded, RestResource } from '../../../../../redux/restReducers/restResource';
import Innholdslaster, { InnholdslasterProps } from '../../../../../components/Innholdslaster';

interface OwnProps<T> {
    restResource: RestResource<T>;
    children: (data: T) => ReactNode;
}

type Props<T> = OwnProps<T> & Pick<InnholdslasterProps, 'spinnerSize' | 'returnOnPending' | 'returnOnError'>;

class PlukkRestData<T> extends React.Component<Props<T>> {
    render() {
        const { children, restResource, ...innholdsLasterProps } = this.props;
        if (!isLoaded(restResource)) {
            return <Innholdslaster avhengigheter={[this.props.restResource]} {...innholdsLasterProps} />;
        }
        return children((restResource as Loaded<T>).data);
    }
}

export default PlukkRestData;
