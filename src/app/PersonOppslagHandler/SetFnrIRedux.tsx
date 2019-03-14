import setNyGjeldendeBruker from '../../redux/gjeldendeBruker/actions';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface OwnProps {
    fødselsnummer: string;
}

interface DispatchProps {
    setFnrIKontekst: (fnr: string) => void;
}

type Props = DispatchProps & OwnProps;

function SetFnrIRedux(props: Props) {
    props.setFnrIKontekst(props.fødselsnummer);
    return null;
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setFnrIKontekst: (fnr: string) => dispatch(setNyGjeldendeBruker(fnr))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(SetFnrIRedux);
