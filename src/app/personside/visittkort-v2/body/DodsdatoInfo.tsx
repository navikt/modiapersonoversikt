import Endringstekst from 'src/app/personside/visittkort-v2/body/Endringstekst';
import VisittkortElement from 'src/app/personside/visittkort-v2/body/VisittkortElement';
import type { Person } from 'src/app/personside/visittkort-v2/PersondataDomain';
import WarningIcon from 'src/svg/WarningIcon';
import { formaterDato } from 'src/utils/string-utils';

interface Props {
    person: Person;
}

export default function DodsdatoInfo({ person }: Props) {
    const dodsdato = person.dodsdato.firstOrNull();
    if (dodsdato) {
        const formatertDodsdato = formaterDato(dodsdato.dodsdato);

        return (
            <VisittkortElement beskrivelse={'Død'} ikon={<WarningIcon />}>
                <span>Dødsdato {formatertDodsdato}</span>
                <Endringstekst sistEndret={dodsdato.sistEndret} />
            </VisittkortElement>
        );
    }

    return null;
}
