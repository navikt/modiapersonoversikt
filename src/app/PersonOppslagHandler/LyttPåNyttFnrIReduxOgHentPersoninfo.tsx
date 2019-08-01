import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

function LyttPåNyttFnrIReduxOgHentPersoninfo() {
    const dispatch = useDispatch();
    const fnr = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const hentPerson = useSelector((state: AppState) => state.restResources.personinformasjon.actions.fetch);

    useEffect(() => {
        dispatch(hentPerson);
    }, [fnr, dispatch, hentPerson]);

    return null;
}

export default LyttPåNyttFnrIReduxOgHentPersoninfo;
