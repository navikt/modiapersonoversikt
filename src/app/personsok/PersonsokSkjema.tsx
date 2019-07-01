import * as React from 'react';
import { FormEvent } from 'react';
import { PersonsokRequest } from '../../models/person/personsok';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { Hovedknapp } from 'nav-frontend-knapper';

function PersonsokSkjema() {
    const dispatch = useDispatch();
    const personsokResource = useSelector((state: AppState) => state.restResources.personsok);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const request: PersonsokRequest = {};
        dispatch(personsokResource.actions.post(request));
    };

    return (
        <form onSubmit={submitHandler}>
            <Hovedknapp htmlType={'submit'}>Send</Hovedknapp>
        </form>
    );
}

export default PersonsokSkjema;
