import { SetNyGjeldendeBrukerAction, SetNyGjeldendeBrukerActionTypes } from './types';

export default function setNyGjeldendeBruker(fødselsnummer: string): SetNyGjeldendeBrukerAction {
    return {
        type: SetNyGjeldendeBrukerActionTypes.SetNyPerson,
        fnr: fødselsnummer
    };
}
