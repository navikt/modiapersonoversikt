import { hentFeatureToggles } from '../../redux/restReducers/featureToggles';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface DispatchProps {
    hentFeatureToggles: () => void;
}

type Props = DispatchProps;

function FetchFeatureToggles(props: Props) {
    useEffect(() => {
        props.hentFeatureToggles();
    }, []);

    return null;
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentFeatureToggles: () => {
            dispatch(hentFeatureToggles());
        }
    };
}

export default connect(
    null,
    mapDispatchToProps
)(FetchFeatureToggles);
