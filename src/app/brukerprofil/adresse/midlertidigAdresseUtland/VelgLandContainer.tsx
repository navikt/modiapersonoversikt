import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { hentLandKodeverk } from '../../../../redux/restReducers/kodeverk/landKodeverk';
import Innholdslaster from '../../../../components/Innholdslaster';
import { VelgLand } from './VelgLand';
import { MidlertidigAdresseUtlandInputs } from './MidlertidigAdresseUtland';
import { Loaded, RestReducer } from '../../../../redux/restReducers/restReducer';
import { STATUS } from '../../../../redux/restReducers/utils';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';

interface DispatchProps {
    hentLand: () => void;
}

interface StateProps {
    landReducer: RestReducer<KodeverkResponse>;
}

interface OwnProps {
    midlertidigAdresseUtlandInput: MidlertidigAdresseUtlandInputs;
    landChanged: (input: Kodeverk) => void;
}

type Props = OwnProps & DispatchProps & StateProps;

class VelgLandContainer extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.landReducer.status === STATUS.NOT_STARTED) {
            this.props.hentLand();
        }
    }

    render() {
        return (
            <div>
                <Innholdslaster avhengigheter={[this.props.landReducer]}>
                    <VelgLand
                        visFeilmeldinger={false}
                        landKodeverk={(this.props.landReducer as Loaded<KodeverkResponse>).data}
                        midlertidigAdresseUtlandInputs={this.props.midlertidigAdresseUtlandInput}
                        onChange={this.props.landChanged}
                    />
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return ({
        landReducer: state.restEndepunkter.landReducer,
    });
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentLand: () => dispatch(hentLandKodeverk())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VelgLandContainer);
