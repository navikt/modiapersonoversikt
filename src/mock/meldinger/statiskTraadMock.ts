import { LestStatus, Meldingstype, Traad } from '../../models/meldinger/meldinger';
import { saksbehandlerTekst } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { Temagruppe } from '../../models/Temagrupper';

export const statiskTraadMock: Traad = {
    traadId: 'sg838exr',
    meldinger: [
        {
            id: 'x4k72bwd',
            meldingstype: Meldingstype.SAMTALEREFERAT_OPPMOTE,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'nzxo4q', fornavn: 'Sander', etternavn: 'Hansen' }),
            journalfortAv: { ident: 'vlzaiw', fornavn: 'Adrian', etternavn: 'Pettersen' },
            fritekst:
                'Ea laborum accusamus et ex voluptates provident eveniet voluptatem. Sunt et sed eligendi harum exercitationem. Eaque est maiores autem sunt occaecati atque ipsa ea itaque. Dolorum enim quaerat alias ut sit labore pariatur.',
            lestDato: '2019-07-12',
            status: LestStatus.Lest,
            opprettetDato: '2019-07-30',
            journalfortDato: '2019-07-11',
            ferdigstiltDato: '2019-07-07',
            erFerdigstiltUtenSvar: true,
            erDokumentMelding: false
        },
        {
            id: 'q1i6ndyj',
            meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'xmqgb8', fornavn: 'Frida', etternavn: 'Pedersen' }),
            journalfortAv: { ident: 'ly4pps', fornavn: 'Emil', etternavn: 'Nguyen' },
            fritekst:
                'Quo magni eaque et libero minima ipsum amet et dolorem. Sed iusto ratione sit. Voluptate alias qui impedit ut dolorum doloribus qui. Qui beatae rerum minima suscipit.',
            lestDato: '2019-07-14',
            status: LestStatus.IkkeLest,
            opprettetDato: '2019-08-10',
            journalfortDato: '2019-07-21',
            ferdigstiltDato: '2019-07-16',
            erFerdigstiltUtenSvar: true,
            erDokumentMelding: false
        },
        {
            id: 'q57oayxa',
            meldingstype: Meldingstype.SPORSMAL_SKRIFTLIG,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'e5otkk', fornavn: 'Synne', etternavn: 'Lunde' }),
            journalfortAv: { ident: '3t55yt', fornavn: 'Victoria', etternavn: 'Andresen' },
            fritekst:
                'Animi qui molestiae omnis reiciendis quam in. Provident magnam dolor. Omnis voluptatem placeat labore in ut aliquam perspiciatis fugiat. Perspiciatis voluptatum odit.',
            lestDato: '2019-08-11',
            status: LestStatus.Lest,
            opprettetDato: '2019-08-06',
            journalfortDato: '2019-08-12',
            ferdigstiltDato: '2019-07-12',
            erFerdigstiltUtenSvar: true,
            erDokumentMelding: false
        },
        {
            id: '90l2nkx0',
            meldingstype: Meldingstype.DELVIS_SVAR_SKRIFTLIG,
            temagruppe: Temagruppe.Arbeid,
            skrevetAvTekst: saksbehandlerTekst({ ident: 'xy70r8', fornavn: 'Kristoffer', etternavn: 'Fredriksen' }),
            journalfortAv: { ident: 'p0jh0d', fornavn: 'Jenny', etternavn: 'Berg' },
            fritekst:
                'Dolores omnis ea voluptatem corrupti odit incidunt enim. Unde fugiat sed animi explicabo maiores. Nihil cum accusamus omnis officiis deserunt est. Qui quisquam unde aut magni dignissimos.',
            lestDato: '2019-07-23',
            status: LestStatus.Lest,
            opprettetDato: '2019-08-13',
            journalfortDato: '2019-07-30',
            ferdigstiltDato: '2019-07-27',
            erFerdigstiltUtenSvar: false,
            erDokumentMelding: false
        }
    ]
};
