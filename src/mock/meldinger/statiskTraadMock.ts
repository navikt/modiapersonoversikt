import { saksbehandlerTekst } from 'src/app/personside/infotabs/meldinger/utils/meldingerUtils';
import { LestStatus, Meldingstype, type Traad, TraadType } from 'src/models/meldinger/meldinger';
import { Temagruppe } from 'src/models/temagrupper';

export const statiskTraadMock: Traad = {
    traadId: 'sg838exr',
    traadType: TraadType.CHAT,
    temagruppe: Temagruppe.Arbeid,
    meldinger: [
        {
            id: 'x4k72bwd',
            meldingsId: 'IDx4k72bwd',
            meldingstype: Meldingstype.SAMTALEREFERAT_OPPMOTE,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'nzxo4q', fornavn: 'Sander', etternavn: 'Hansen' }),
            fritekst:
                'Ea laborum accusamus et ex voluptates provident eveniet voluptatem. Sunt et sed eligendi harum exercitationem. Eaque est maiores autem sunt occaecati atque ipsa ea itaque. Dolorum enim quaerat alias ut sit labore pariatur.',
            lestDato: '2019-07-12',
            status: LestStatus.Lest,
            opprettetDato: '2019-07-30',
            ferdigstiltDato: '2019-07-07',
            sendtTilSladding: false
        },
        {
            id: 'q1i6ndyj',
            meldingsId: 'Aq1i6ndyj',
            meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
            temagruppe: Temagruppe.Helse,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'xmqgb8', fornavn: 'Frida', etternavn: 'Pedersen' }),
            fritekst:
                'Quo magni eaque et libero minima ipsum amet et dolorem. Sed iusto ratione sit. Voluptate alias qui impedit ut dolorum doloribus qui. Qui beatae rerum minima suscipit.',
            lestDato: '2019-07-14',
            status: LestStatus.IkkeLest,
            opprettetDato: '2019-08-10',
            ferdigstiltDato: '2019-07-16',
            sendtTilSladding: false
        },
        {
            id: 'q57oayxa',
            meldingsId: 'Aq57oayxa',
            meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'e5otkk', fornavn: 'Synne', etternavn: 'Lunde' }),
            fritekst:
                'Animi qui molestiae omnis reiciendis quam in. Provident magnam dolor. Omnis voluptatem placeat labore in ut aliquam perspiciatis fugiat. Perspiciatis voluptatum odit.',
            lestDato: '2019-08-11',
            status: LestStatus.Lest,
            opprettetDato: '2019-08-06',
            ferdigstiltDato: '2019-07-12',
            sendtTilSladding: false
        },
        {
            id: '90l2nkx0',
            meldingsId: 'A90l2nkx0',
            meldingstype: Meldingstype.SPORSMAL_MODIA_UTGAAENDE,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'xy70r8', fornavn: 'Kristoffer', etternavn: 'Fredriksen' }),
            fritekst:
                'Dolores omnis ea voluptatem corrupti odit incidunt enim. Unde fugiat sed animi explicabo maiores. Nihil cum accusamus omnis officiis deserunt est. Qui quisquam unde aut magni dignissimos.',
            lestDato: '2019-07-23',
            status: LestStatus.Lest,
            opprettetDato: '2019-08-13',
            ferdigstiltDato: '2019-07-27',
            sendtTilSladding: false
        }
    ],
    journalposter: [
        {
            journalfortTema: 'DAG',
            journalfortTemanavn: 'Dagpenger',
            journalfortSaksid: undefined,
            journalfortDato: '2019-07-30T12:12:12.000',
            journalfortAv: {
                ident: 'p0jh0d',
                navn: 'Jenny Berg'
            }
        },
        {
            journalfortTema: 'AAP',
            journalfortTemanavn: 'Arbeidsavklaringspenger',
            journalfortSaksid: undefined,
            journalfortDato: '2019-07-28T14:12:12.000',
            journalfortAv: {
                ident: 'p0jh0d',
                navn: 'Jenny Berg'
            }
        }
    ]
};
