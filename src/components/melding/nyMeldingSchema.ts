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
        fagsystemKode: z.string(),
        fagsystemNavn: z.string(),
        fagsystemSaksId: z.string().nullable(),
        finnesIGsak: z.boolean(),
        finnesIPsak: z.boolean(),
        opprettetDato: z.string().nullable(),
        saksId: z.string(),
        saksIdVisning: z.string(),
        sakstype: z.string().nullable(),
        sakstypeForVisningGenerell: z.boolean(),
        temaKode: z.string(),
        temaNavn: z.string(),
        syntetisk: z.boolean().nullable().optional()
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
