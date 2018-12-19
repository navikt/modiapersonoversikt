import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import ToolTip from './ToolTip';

interface StateProps {
    children?: string;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        children: state.tooltip.tooltip
    };
}

export default connect(mapStateToProps)(ToolTip);
