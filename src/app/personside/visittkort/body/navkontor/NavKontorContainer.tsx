import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, Reducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { NavKontor } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { BaseUrlsResponse } from '../../../../../models/baseurls';

interface Props {
    navKontorReducer: Reducer<NavKontor>;
    baseUrlReducer: Reducer<BaseUrlsResponse>;
}

class NavKontorContainer extends React.Component<Props> {
    render() {
        const baseUrlResponse = this.props.baseUrlReducer;
        return (
            <Innholdslaster avhengigheter={[this.props.navKontorReducer, this.props.baseUrlReducer]} spinnerSize={'L'}>
                <NavKontorVisning navKontor={this.props.navKontorReducer.data} baseUrlsResponse={baseUrlResponse.data}/>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return ({
        navKontorReducer: state.brukersNavKontor,
        baseUrlReducer: state.baseUrlReducer
    });
};

export default connect(mapStateToProps, null)(NavKontorContainer);
