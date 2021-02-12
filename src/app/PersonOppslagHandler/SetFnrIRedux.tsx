import setGjeldendeBrukerIRedux from '../../redux/gjeldendeBruker/actions';
import { useDispatch } from 'react-redux';
import { useFodselsnummer } from '../../utils/customHooks';

interface Props {
    fnr: string;
}

function SetFnrIRedux(props: Props) {
    const fnr = useFodselsnummer();
    const dispatch = useDispatch();

    if (fnr !== props.fnr) {
        dispatch(setGjeldendeBrukerIRedux(props.fnr));
    }
    return null;
}

export default SetFnrIRedux;
