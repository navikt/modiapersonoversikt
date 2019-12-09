import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { useDispatch } from 'react-redux';
import { useFødselsnummer } from '../../utils/customHooks';

interface Props {
    fødselsnummer: string;
}

function SetFnrIRedux(props: Props) {
    const fnr = useFødselsnummer();
    const dispatch = useDispatch();

    if (fnr !== props.fødselsnummer) {
        dispatch(setGjeldendeBrukerIRedux(props.fødselsnummer));
    }
    return null;
}

export default SetFnrIRedux;
