import * as React from 'react';
import { STATUS } from './ducks/utils';
import { Reducer } from './redux/reducer';

interface InnholdslasterProps {
    children: React.ReactChildren | React.ReactChild;
    avhengigheter: Reducer<object>[];
}

const array = (value: object) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status: STATUS[]) => (element: Reducer<object>) => array(status).includes(element.status);
const alleLastet = (avhengigheter: Reducer<object>[]) => (avhengigheter && avhengigheter.every(harStatus(STATUS.OK)));
const noenHarFeil = (avhengigheter: Reducer<object>[]) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));

class Innholdslaster extends React.Component<InnholdslasterProps> {

    render() {
        if (alleLastet(this.props.avhengigheter)) {
            return this.props.children;
        } else if (noenHarFeil(this.props.avhengigheter)) {
            return <p>Det skjedde en feil ved lasting av data</p>;
        } else {
            return <p>Spinner</p>;
        }
    }
}

export default Innholdslaster;