import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers';
import { Kodeverk, KodeverkResponse } from '../../../../models/kodeverk';
import { hentLandKodeverk } from '../../../../redux/restReducers/kodeverk/landKodeverk';
import Innholdslaster from '../../../../components/Innholdslaster';
import { VelgLand } from './VelgLand';
import { MidlertidigAdresseUtlandInputs } from './MidlertidigAdresseUtland';
import { isNotStarted, Loaded, RestResource } from '../../../../redux/restReducers/restResource';
import { AsyncDispatch } from '../../../../redux/ThunkTypes';

interface DispatchProps {
    hentLand: () => void;
}

interface StateProps {
    landResource: RestResource<KodeverkResponse>;
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
        if (isNotStarted(this.props.landResource)) {
            this.props.hentLand();
        }
    }

    render() {
        return (
            <div>
                <Innholdslaster avhengigheter={[this.props.landResource]}>
                    <VelgLand
                        visFeilmeldinger={false}
                        landKodeverk={(this.props.landResource as Loaded<KodeverkResponse>).data}
                        midlertidigAdresseUtlandInputs={this.props.midlertidigAdresseUtlandInput}
                        onChange={this.props.landChanged}
                    />
                </Innholdslaster>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        landResource: state.restResources.land
    };
};

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentLand: () => dispatch(hentLandKodeverk())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VelgLandContainer);
