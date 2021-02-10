import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { useDispatch } from 'react-redux';
import { useFodselsnummer } from '../../utils/customHooks';

interface Props {
    fødselsnummer: string;
}

function SetFnrIRedux(props: Props) {
    const fnr = useFodselsnummer();
    const dispatch = useDispatch();

    if (fnr !== props.fødselsnummer) {
        dispatch(setGjeldendeBrukerIRedux(props.fødselsnummer));
    }
    return null;
}

export default SetFnrIRedux;
