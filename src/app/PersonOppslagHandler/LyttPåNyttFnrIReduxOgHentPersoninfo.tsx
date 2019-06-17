import { hentPerson } from '../../redux/restReducers/personinformasjon';
import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

function LyttPåNyttFnrIReduxOgHentPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);

    useEffect(() => {
        dispatch(hentPerson(fnr));
    }, [fnr, dispatch]);

    return null;
}

export default LyttPåNyttFnrIReduxOgHentPersoninfo;
