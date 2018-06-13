import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState, Reducer } from '../../../../../redux/reducer';
import Innholdslaster from '../../../../../components/Innholdslaster';
import { NavKontor } from '../../../../../models/navkontor';
import NavKontorVisning from './NavKontor';
import { BaseUrlsResponse } from '../../../../../models/baseurls';
import { hentBaseUrls } from '../../../../../redux/baseurls';
import { Action } from 'history';
import { STATUS } from '../../../../../redux/utils';

interface DispatchProps {
    hentBaseUrls: () => void;
}

interface StateProps {
    baseUrlReducer: Reducer<BaseUrlsResponse>;
}

interface OwnProps {
    navKontorReducer: Reducer<NavKontor>;
}

type Props = DispatchProps & StateProps & OwnProps;

class NavKontorContainer extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.baseUrlReducer.status ===  STATUS.NOT_STARTED) {
            this.props.hentBaseUrls();
        }
    }

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

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        hentBaseUrls: () => dispatch(hentBaseUrls())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavKontorContainer);
