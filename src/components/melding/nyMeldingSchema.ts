import { Oppgaveliste } from 'src/components/melding/OppgavelisteOptions';
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
        fagsystemSaksId: z.string().optional(),
        temaKode: z.string().optional(),
        temaNavn: z.string().optional(),
        fagsystemKode: z.string().optional(),
        fagsystemNavn: z.string().optional(),
        sakstype: z.string().optional(),
        opprettetDato: z.string().optional()
    },
    { message: 'Meldingen må knyttes til en sak' }
);

const nyMeldingSchema = z
    .object({
        meldingsType: z.nativeEnum(MeldingsType, { message: 'Velg dialogtype' }).optional(),
        melding: z.string().nonempty('Fyll ut meldingsfeltet').max(maksLengdeMelding, `Maks ${maksLengdeMelding} tegn`),
        fnr: z.string(),
        enhetsId: z.string(),
        tema: z.nativeEnum(Temagruppe).optional(),
        oppgaveliste: z.nativeEnum(Oppgaveliste).optional(),
        sak: sakSchema.optional()
    })
    .superRefine((val, ctx) => {
        if (!val.meldingsType) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Velg dialogtype', path: ['meldingsType'] });
            return z.NEVER;
        }
        switch (val.meldingsType) {
            case MeldingsType.Referat:
                if (!val.tema) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Knytt meldingen til en temagruppe',
                        path: ['tema']
                    });
                }
                break;
            case MeldingsType.Samtale:
            case MeldingsType.Infomelding:
                if (!val.sak) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Meldingen må knyttes til en sak',
                        path: ['sak']
                    });
                }
                break;
        }
    });

export default nyMeldingSchema;

export const fortsettDialogSchema = z
    .object({
        avsluttet: z.boolean().optional(),
        oppgaveliste: z.nativeEnum(Oppgaveliste).optional(),
        sak: sakSchema.optional()
    })
    .and(commonSchema);
