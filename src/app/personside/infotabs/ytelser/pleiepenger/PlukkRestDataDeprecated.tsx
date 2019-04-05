import * as React from 'react';
import { ReactNode } from 'react';
import { isLoaded, Loaded, DeprecatedRestResource } from '../../../../../redux/restReducers/deprecatedRestResource';
import Innholdslaster, { InnholdslasterProps } from '../../../../../components/Innholdslaster';

interface OwnProps<T> {
    restResource: DeprecatedRestResource<T>;
    children: (data: T) => ReactNode;
}

type Props<T> = OwnProps<T> & Pick<InnholdslasterProps, 'spinnerSize' | 'returnOnPending' | 'returnOnError'>;

class PlukkRestDataDeprecated<T> extends React.Component<Props<T>> {
    render() {
        const { children, restResource, ...innholdsLasterProps } = this.props;
        if (!isLoaded(restResource)) {
            return <Innholdslaster avhengigheter={[this.props.restResource]} {...innholdsLasterProps} />;
        }
        return children((restResource as Loaded<T>).data);
    }
}

export default PlukkRestDataDeprecated;
