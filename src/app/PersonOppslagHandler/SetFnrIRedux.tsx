import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface OwnProps {
    fødselsnummer: string;
}

interface DispatchProps {
    setFnrIRedux: (fnr: string) => void;
}

type Props = DispatchProps & OwnProps;

function SetFnrIRedux(props: Props) {
    props.setFnrIRedux(props.fødselsnummer);
    return null;
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setFnrIRedux: (fnr: string) => dispatch(setGjeldendeBrukerIRedux(fnr))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(SetFnrIRedux);
