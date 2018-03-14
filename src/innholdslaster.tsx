import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

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
            return (
                <AlertStripe type="advarsel">
                    Feil ved lasting av data
                </AlertStripe>
            );
        } else {
            return <NavFrontendSpinner type="XXL" />;
        }
    }
}

export default Innholdslaster;