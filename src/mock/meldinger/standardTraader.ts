import { saksbehandlerTekst } from '../../app/personside/infotabs/meldinger/utils/meldingerUtils';
import { LestStatus, Meldingstype, type Traad, TraadType } from '../../models/meldinger/meldinger';
import { Temagruppe } from '../../models/temagrupper';

const standardTraader: Traad[] = [
    {
        traadId: 'replaced',
        traadType: TraadType.CHAT,
        meldinger: [
            {
                id: 'x4k72bwd',
                meldingsId: 'IDx4k72bwd',
                meldingstype: Meldingstype.CHATMELDING_FRA_BRUKER,
                temagruppe: Temagruppe.Øvrig,
                skrevetAvTekst: saksbehandlerTekst({ ident: 'nzxo4q', fornavn: 'Sander', etternavn: 'Hansen' }),
                fritekst:
                    'Ea laborum accusamus et ex voluptates provident eveniet voluptatem. Sunt et sed eligendi harum exercitationem. Eaque est maiores autem sunt occaecati atque ipsa ea itaque. Dolorum enim quaerat alias ut sit labore pariatur.',
                lestDato: '2019-07-12',
                status: LestStatus.Lest,
                opprettetDato: '2024-01-30',
                ferdigstiltDato: '2024-02-07',
                sendtTilSladding: false
            }
        ],
        journalposter: []
    }
];

export default standardTraader;
