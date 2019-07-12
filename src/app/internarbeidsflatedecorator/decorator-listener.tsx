import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';

import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';
import { initialiserToppmeny } from './dekorator-utils';
import { hentAktivEnhet } from './context-api';

type Props = RouteComponentProps<{}>;

declare global {
    type DecoratorPersonsokEvent = EventListenerOrEventListenerObject & { fodselsnummer: string };
}

function DecoratorListener(props: Props) {
    useEffect(() => {
        const handlePersonsøk = (event: object) => {
            const personsokEvent = event as DecoratorPersonsokEvent;
            setNyBrukerIPath(props.history, personsokEvent.fodselsnummer);
            hentAktivEnhet().then(enhet => initialiserToppmeny(personsokEvent.fodselsnummer, enhet));
        };
        const handleFjernPerson = () => {
            fjernBrukerFraPath(props.history);
            hentAktivEnhet().then(enhet => initialiserToppmeny('', enhet));
        };

        document.addEventListener('dekorator-hode-fjernperson', handleFjernPerson);
        document.addEventListener('dekorator-hode-personsok', handlePersonsøk);
        return () => {
            document.removeEventListener('dekorator-hode-fjernperson', handleFjernPerson);
            document.removeEventListener('dekorator-hode-personsok', handlePersonsøk);
        };
    }, [props.history]);

    return null;
}

export default withRouter(DecoratorListener);
