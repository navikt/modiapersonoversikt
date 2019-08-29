import { SetNyGjeldendeBrukerAction, SetNyGjeldendeBrukerActionTypes } from './types';

// Det er neppe denne du har lyst til å bruke
// Denne brukes kun til å sette gjeldende fnr i redux, den vil ikke oppdatere url med nytt fnr
// Sansynligvis ønsker du å bruke setNyBrukerIPath som propagerer videre til resten av appen
export default function setGjeldendeBrukerIRedux(fødselsnummer: string): SetNyGjeldendeBrukerAction {
    return {
        type: SetNyGjeldendeBrukerActionTypes.SetNyPerson,
        fnr: fødselsnummer
    };
}
