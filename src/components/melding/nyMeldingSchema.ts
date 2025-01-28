import { z } from 'zod';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';
import { Temagruppe } from 'src/models/temagrupper';
import { Oppgaveliste } from 'src/components/melding/VelgOppgaveliste';

export const maksLengdeMelding = 15000;

const commonSchema = z.object({
    melding: z
        .string()
        .nonempty('Du kan ikke sende en tom melding til bruker')
        .max(maksLengdeMelding, 'Du kan ikke sende en melding som er lenger enn 15.000 tegn'),
    fnr: z.string(),
    enhetsId: z.string()
});

const sakSchema = z.object(
    {
        fnr: z.string().optional(),
        saksId: z.string().optional(),
        fagsystemSaksId: z.string().optional(),
        temaKode: z.string().optional(),
        temaNavn: z.string().optional(),
        fagsystemKode: z.string().optional(),
        fagsystemNavn: z.string().optional(),
        sakstype: z.string().optional(),
        opprettetDato: z.string().optional(),
        finnesIGsak: z.boolean().optional(),
        finnesIPsak: z.boolean().optional(),
        sakstypeForVisningGenerell: z.boolean().optional(),
        saksIdVisning: z.string().optional()
    },
    { message: 'Meldingen må knyttes til en sak' }
);

const nyMeldingSchema = z
    .discriminatedUnion('meldingsType', [
        z.object({
            meldingsType: z.literal(MeldingsType.Referat),
            tema: z.nativeEnum(Temagruppe, { message: 'Meldingen må knyttes til et tema' })
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Samtale),
            oppgaveliste: z.nativeEnum(Oppgaveliste),
            sak: sakSchema
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Infomelding),
            sak: sakSchema
        })
    ])
    .and(commonSchema);

export default nyMeldingSchema;
