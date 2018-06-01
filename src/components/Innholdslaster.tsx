import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';

import { STATUS } from '../redux/utils';
import { Reducer } from '../redux/reducer';

interface InnholdslasterProps {
    children: React.ReactChildren | React.ReactChild | JSX.Element[];
    avhengigheter: Reducer<object>[];
    spinnerSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    returnOnPending?: React.ReactChildren | React.ReactChild | null;
    returnOnError?: React.ReactChildren | React.ReactChild;
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
            return this.props.returnOnError || (
                <AlertStripe type="advarsel">
                    Feil ved lasting av data
                </AlertStripe>
            );
        } else if (this.props.returnOnPending === null) {
            return null;
        } else {
            return this.props.returnOnPending || (
                <NavFrontendSpinner type={this.props.spinnerSize || 'XXL'}/>
            );
        }
    }
}

export default Innholdslaster;