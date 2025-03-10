import { List, ReadMore } from '@navikt/ds-react';
import type { Journalpost } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

type Props = {
    journalposter: Journalpost[];
};

export const Journalposter = ({ journalposter }: Props) => {
    if (journalposter.length === 0) {
        return null;
    }

    return (
        <ReadMore header={`Dialogen er journalført på ${journalposter.length} sak(er)`}>
            <List size="small">
                {journalposter.map((p) => {
                    const navn = p.journalfortAv?.navn ?? 'ukjent';
                    const dato = formaterDato(p.journalfortDato);
                    const tema = p.journalfortTemanavn;
                    const saksid = p.journalfortSaksid ? `saksid ${p.journalfortSaksid}` : 'ukjent saksid';
                    return (
                        <li className="list-none" key={`${p.journalfortDato}-${p.journalfortSaksid}`}>
                            {dato}: {tema} ({saksid}) av {navn}
                        </li>
                    );
                })}
            </List>
        </ReadMore>
    );
};
