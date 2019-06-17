import { RouteComponentProps, withRouter } from 'react-router';
import { useEffect } from 'react';

import { fjernBrukerFraPath, setNyBrukerIPath } from '../routes/routing';

type Props = RouteComponentProps<{}>;

function DecoratorListener(props: Props) {
    useEffect(() => {
        const handlePersonsøk = (event: object) => {
            const personsokEvent = event as DecoratorPersonsokEvent;
            setNyBrukerIPath(props.history, personsokEvent.fodselsnummer);
        };
        const handleFjernPerson = () => {
            fjernBrukerFraPath(props.history);
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
