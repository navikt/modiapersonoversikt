import { Oppgaveliste } from 'src/components/melding/OppgavelisteRadioKnapper';
import { MeldingsType } from 'src/components/melding/VelgMeldingsType';
import { Temagruppe } from 'src/models/temagrupper';
import { z } from 'zod';

export const maksLengdeMelding = 15000;

const commonSchema = z.object({
    melding: z.string().nonempty('Fyll ut meldingsfeltet').max(maksLengdeMelding, `Maks ${maksLengdeMelding} tegn`),
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
            tema: z.nativeEnum(Temagruppe, {
                message: 'Knytt meldingen til en temagruppe'
            })
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Samtale),
            oppgaveliste: z.nativeEnum(Oppgaveliste),
            sak: sakSchema
        }),
        z.object({
            meldingsType: z.literal(MeldingsType.Infomelding),
            oppgaveliste: z.nativeEnum(Oppgaveliste),
            sak: sakSchema
        })
    ])
    .and(commonSchema);

export default nyMeldingSchema;

export const fortsettDialogSchema = z
    .object({
        avsluttet: z.boolean().optional(),
        oppgaveliste: z.nativeEnum(Oppgaveliste).optional(),
        sak: sakSchema.optional()
    })
    .and(commonSchema);
