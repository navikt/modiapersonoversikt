import { fakerNB_NO as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import navfaker from 'nav-faker';
import type { Innhold, Varsel, VarselInfo } from 'src/lib/types/modiapersonoversikt-api';
import type { VarslerResult } from '../../models/varsel';
import { backendDatoformat, datoSynkende } from '../../utils/date-utils';
import { aremark } from '../persondata/aremark';
import { fyllRandomListe } from '../utils/mock-utils';
import { nArrayElement } from '../utils-mock';
import { statiskVarselMock } from './statiskVarselMock';

export function getMockVarsler(fnr: string): VarslerResult {
    faker.seed(Number(fnr));
    navfaker.seed(`${fnr}varsel`);
    if (fnr === aremark.personIdent) {
        return {
            feil: ['Feil ved uthenting av varsler', 'Annen feilmelding fra backend'],
            varsler: [...statiskVarselMock]
        };
    }

    const mockEventer = fyllRandomListe(() => genererDittNavEventVarsel(false), 15, false);
    const mockEventerResendt = fyllRandomListe(() => genererDittNavEventVarsel(true), 15, false);

    return {
        feil: [],
        varsler: [...mockEventer, ...mockEventerResendt].sort(datoSynkende((v) => v.eksternVarsling.sistOppdatert))
    };
}

function genererDittNavEventVarsel(resendt: boolean): Varsel {
    const tidspunkt = faker.date.recent({ days: 90 });
    const sendtTidspunkt = dayjs(tidspunkt).format(backendDatoformat);
    const renotifikasjonTidspunkt = resendt
        ? dayjs(
              faker.date.between({
                  from: dayjs(tidspunkt).add(1, 'day').toDate(),
                  to: dayjs(tidspunkt).add(8, 'day').toDate()
              })
          ).format(backendDatoformat)
        : undefined;
    const sendteKanaler = nArrayElement(['SMS', 'EPOST'], faker.number.int(2), false);

    const innhold: Innhold = {
        tekst: faker.lorem.sentence(5 + faker.number.int(5)),
        link: `https://${faker.lorem.word()}.no/${faker.lorem.word()}`
    };

    const varselInfo: VarselInfo = {
        sendt: true,
        sendtTidspunkt: sendtTidspunkt,
        renotifikasjonSendt: resendt,
        renotifikasjonTidspunkt: renotifikasjonTidspunkt,
        sendteKanaler: sendteKanaler,
        feilhistorikk: faker.datatype.boolean()
            ? fyllRandomListe(
                  () => ({
                      tidspunkt: dayjs(tidspunkt).format(backendDatoformat),
                      feilmelding: faker.lorem.sentence(5 + faker.number.int(5))
                  }),
                  3
              )
            : [],
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        sistOppdatert: resendt ? renotifikasjonTidspunkt! : sendtTidspunkt
    };

    return {
        type: 'OPPGAVE',
        varselId: faker.string.uuid(),
        aktiv: faker.datatype.boolean(),
        produsent: faker.string.alphanumeric(10),
        sensitivitet: 'high',
        innhold: innhold,
        eksternVarsling: varselInfo,
        opprettet: dayjs(tidspunkt).format(backendDatoformat)
    };
}
