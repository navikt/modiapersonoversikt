import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import {
    Box,
    Button,
    DatePicker,
    type DateValidationT,
    ErrorMessage,
    HStack,
    Link,
    Select,
    TextField,
    useDatepicker,
    VStack
} from '@navikt/ds-react';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { type ReactNode, useState } from 'react';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { backendDatoformat } from 'src/utils/date-utils';
import { z } from 'zod';
import LenkeDrekV2 from './LenkeDrekV2';
import { trimInput } from './utils';

const FIELD_GROUP_ERROR = 'Fyll ut navn, adresse, telefonnummer, utenlandsk ID eller fødselsdato fra og til';
const fieldGroup = ['firstName', 'lastName', 'address', 'phoneNumber', 'dnr'] as const;

const fieldLabels: Record<keyof z.infer<typeof personSokSchema>, [string, ReactNode] | [string]> = {
    firstName: ['Fornavn'],
    lastName: ['Etternavn'],
    dnr: ['Utenlandsk ID', 'Husk å inkludere alle tegn. Eksempel: 010101-12345'],
    address: ['Adresse', ''],
    phoneNumber: ['Telefonnummer', 'Telefonnummer uten landskode'],
    birthDateFrom: ['Fødselsdato fra'],
    birthDateTo: ['Fødselsdato til'],
    birthDateFromFeil: [''],
    birthDateToFeil: [''],
    gender: ['Kjønn'],
    ageFrom: ['Alder fra'],
    ageTo: ['Alder til'],
    _fieldgroup: ['']
};

export const TIDLIGSTE_FODSELSDATO = new Date(1900, 0, 1);

const datoFeil = z.enum(['ugyldig', 'forTidlig', 'fremtid']);
type DatoFeil = z.infer<typeof datoFeil>;

export const DATO_FEILTEKST: Record<DatoFeil, string> = {
    ugyldig: 'Ugyldig dato. Skriv datoen som dd.mm.åååå',
    forTidlig: `Datoen kan ikke være før ${TIDLIGSTE_FODSELSDATO}`,
    fremtid: 'Datoen kan ikke være frem i tid'
};
export const DATO_REKKEFOLGE_FEIL = 'Fødselsdato til kan ikke være før fødselsdato fra';

function tilDatoFeil(validering: DateValidationT): DatoFeil | undefined {
    if (validering.isValidDate || validering.isEmpty) return undefined;
    if (validering.isBefore) return 'forTidlig';
    if (validering.isAfter) return 'fremtid';
    return 'ugyldig';
}

const personSokSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        dnr: z.string(),
        birthDateFrom: z.date().optional(),
        birthDateTo: z.date().optional(),
        birthDateFromFeil: datoFeil.optional(),
        birthDateToFeil: datoFeil.optional(),
        ageFrom: z.number({ coerce: true, message: 'Må være et gyldig tall' }).min(0).optional(),
        ageTo: z.number({ coerce: true, message: 'Må være et gyldig tall' }).min(0).optional(),
        gender: z.enum(['M', 'K', '']),
        address: z.string(),
        phoneNumber: z
            .string()
            .regex(/^(\d+)?$/, 'Må inneholde kun tall')
            .optional(),
        _fieldgroup: z.never()
    })
    .partial()
    .superRefine((val, ctx) => {
        if (val.birthDateFromFeil) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: DATO_FEILTEKST[val.birthDateFromFeil],
                path: ['birthDateFromFeil']
            });
        }
        if (val.birthDateToFeil) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: DATO_FEILTEKST[val.birthDateToFeil],
                path: ['birthDateToFeil']
            });
        }
        if (val.birthDateFrom && val.birthDateTo && val.birthDateFrom.getTime() > val.birthDateTo.getTime()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: DATO_REKKEFOLGE_FEIL,
                path: ['birthDateTo']
            });
        }

        const harFeltIGruppe =
            !!trimInput(val.firstName) ||
            !!trimInput(val.lastName) ||
            !!trimInput(val.dnr) ||
            !!trimInput(val.address) ||
            !!trimInput(val.phoneNumber);
        if (harFeltIGruppe) return;

        const harDobFra = !!val.birthDateFrom || !!val.birthDateFromFeil;
        const harDobTil = !!val.birthDateTo || !!val.birthDateToFeil;

        if (!harDobFra && !harDobTil) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: FIELD_GROUP_ERROR,
                path: ['_fieldgroup']
            });
        } else if (!harDobFra) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Fyll ut fødselsdato fra',
                path: ['birthDateFrom']
            });
        } else if (!harDobTil) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Fyll ut fødselsdato til',
                path: ['birthDateTo']
            });
        }
    });

type Props = {
    onSubmit: (value: PersonsokRequest | undefined) => void;
    onReset: () => void;
};

export function PersonsokForm({ onSubmit, onReset }: Props) {
    const [skjemaNummer, setSkjemaNummer] = useState(0);
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            dnr: ''
        } as z.infer<typeof personSokSchema>,
        validators: {
            onChange: personSokSchema
        },
        onSubmit: ({ value: v }) => {
            onSubmit({
                fornavn: trimInput(v.firstName),
                etternavn: trimInput(v.lastName),
                adresse: trimInput(v.address),
                utenlandskID: trimInput(v.dnr),
                fodselsdatoFra: trimInput(
                    v.birthDateFrom ? dayjs(v.birthDateFrom).format(backendDatoformat) : undefined
                ),
                fodselsdatoTil: trimInput(v.birthDateTo ? dayjs(v.birthDateTo).format(backendDatoformat) : undefined),
                alderFra: z.coerce.number().optional().catch(undefined).parse(v.ageFrom),
                alderTil: z.coerce.number().optional().catch(undefined).parse(v.ageTo),
                kjonn: trimInput(v.gender),
                telefonnummer: trimInput(v.phoneNumber)
            });
        }
    });

    return (
        <form
            name="Søk person"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <VStack marginBlock="space-32" gap="space-16">
                <Box className="grid grid-cols-2 gap-4 items-end">
                    {fieldGroup.map((fieldName) => (
                        <form.Field
                            name={fieldName}
                            key={fieldName}
                            validators={{
                                onChangeListenTo: fieldGroup.map((a) => a)
                            }}
                        >
                            {(field) => (
                                <TextField
                                    error={
                                        field.form.state.errorMap.onChange?._fieldgroup?.length
                                            ? true
                                            : field.state.meta.errors.join(', ')
                                    }
                                    value={field.state.value}
                                    name={field.name}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="grow min-w-[40%]"
                                    size="small"
                                    description={fieldLabels[fieldName][1]}
                                    label={fieldLabels[fieldName][0]}
                                />
                            )}
                        </form.Field>
                    ))}
                </Box>
                <HStack justify="space-between">
                    <HStack gap="space-16" align="start" className="pr-2">
                        <form.Field name="gender">
                            {(field) => (
                                <Select
                                    size="small"
                                    label={fieldLabels[field.name][0]}
                                    onChange={(e) => field.handleChange(e.target.value as typeof field.state.value)}
                                    onBlur={field.handleBlur}
                                    value={field.state.value}
                                >
                                    <option value="">- Velg kjønn -</option>
                                    <option value="M">M - Mann</option>
                                    <option value="K">K - Kvinne</option>
                                </Select>
                            )}
                        </form.Field>
                        <form.Field name="ageFrom">
                            {(field) => (
                                <TextField
                                    inputMode="numeric"
                                    size="small"
                                    label={fieldLabels[field.name][0]}
                                    onChange={(e) =>
                                        field.handleChange((e.target.value as unknown as number) ?? undefined)
                                    }
                                    onBlur={field.handleBlur}
                                    value={field.state.value}
                                    error={field.state.meta.errors.join(', ')}
                                />
                            )}
                        </form.Field>
                        <form.Field name="ageTo">
                            {(field) => (
                                <TextField
                                    inputMode="numeric"
                                    size="small"
                                    label={fieldLabels[field.name][0]}
                                    onChange={(e) =>
                                        field.handleChange((e.target.value as unknown as number) ?? undefined)
                                    }
                                    onBlur={field.handleBlur}
                                    value={field.state.value}
                                    error={field.state.meta.errors.join(', ')}
                                />
                            )}
                        </form.Field>
                    </HStack>
                    <HStack gap="space-16">
                        <form.Field name="birthDateFrom">
                            {(field) => (
                                <form.Field name="birthDateFromFeil">
                                    {(feilField) => (
                                        <DateInput
                                            key={skjemaNummer}
                                            label={fieldLabels[field.name][0]}
                                            onChange={field.handleChange}
                                            onValidate={feilField.handleChange}
                                            datoFeil={feilField.state.value}
                                            value={field.state.value}
                                            error={
                                                field.form.state.errorMap.onChange?._fieldgroup?.length
                                                    ? true
                                                    : field.state.meta.errors.map((e) => e?.message).join(', ')
                                            }
                                        />
                                    )}
                                </form.Field>
                            )}
                        </form.Field>
                        <form.Field name="birthDateTo">
                            {(field) => (
                                <form.Field name="birthDateToFeil">
                                    {(feilField) => (
                                        <DateInput
                                            key={skjemaNummer}
                                            label={fieldLabels[field.name][0]}
                                            onChange={field.handleChange}
                                            onValidate={feilField.handleChange}
                                            datoFeil={feilField.state.value}
                                            value={field.state.value}
                                            error={
                                                field.form.state.errorMap.onChange?._fieldgroup?.length
                                                    ? true
                                                    : field.state.meta.errors.map((e) => e?.message).join(', ')
                                            }
                                        />
                                    )}
                                </form.Field>
                            )}
                        </form.Field>
                    </HStack>
                </HStack>
            </VStack>
            <Box>
                <form.Subscribe selector={(state) => [state.errors]}>
                    {([errors]) => {
                        return (
                            errors.length > 0 && (
                                <VStack>
                                    {form.state.errors
                                        .filter((e) => !!e)
                                        .map((e) => Object.values(e))
                                        .flat(2)
                                        .filter((e) => e.message === FIELD_GROUP_ERROR)
                                        .map((e) => (
                                            <ErrorMessage key={e.message}>{e.message}</ErrorMessage>
                                        ))}
                                </VStack>
                            )
                        );
                    }}
                </form.Subscribe>
            </Box>
            <Box marginBlock="space-8">
                <div>
                    <form.Subscribe
                        selector={(state) =>
                            [
                                state.values.firstName,
                                state.values.lastName,
                                state.values.birthDateFrom,
                                state.values.gender
                            ] as const
                        }
                    >
                        {([firstName, lastName, birthDateFrom, gender]) => (
                            <LenkeDrekV2
                                birthDateFrom={
                                    birthDateFrom ? dayjs(birthDateFrom).format(backendDatoformat) : undefined
                                }
                                gender={gender}
                                firstName={firstName}
                                lastName={lastName}
                            />
                        )}
                    </form.Subscribe>
                </div>
                <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                        import.meta.env.PROD
                            ? 'https://utbetalingsportalen.intern.nav.no'
                            : 'https://utbetalingsportalen.intern.dev.nav.no'
                    }
                >
                    Kontonummersøk i utbetalingsportalen
                </Link>
            </Box>
            <HStack justify="space-between">
                <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isTouched]}>
                    {([canSubmit, isSubmitting, isTouched]) => (
                        <Button
                            type="submit"
                            size="small"
                            variant="primary"
                            icon={<MagnifyingGlassIcon />}
                            disabled={!canSubmit || !isTouched}
                            loading={isSubmitting}
                        >
                            Søk ny person
                        </Button>
                    )}
                </form.Subscribe>
                <Button
                    size="small"
                    variant="tertiary"
                    onClick={() => {
                        form.reset();
                        setSkjemaNummer((n) => n + 1);
                        onReset();
                    }}
                >
                    Resett
                </Button>
            </HStack>
        </form>
    );
}

const DateInput = ({
    onChange,
    onValidate,
    datoFeil,
    value,
    label,
    error
}: {
    onChange: (val?: Date) => void;
    onValidate: (feil?: DatoFeil) => void;
    datoFeil?: DatoFeil;
    value?: Date;
    label: string;
    error?: ReactNode;
}) => {
    const { inputProps, datepickerProps } = useDatepicker({
        onDateChange: onChange,
        onValidate: (validering) => onValidate(tilDatoFeil(validering)),
        defaultSelected: value,
        fromDate: TIDLIGSTE_FODSELSDATO,
        toDate: new Date()
    });
    const [erFerdigMedFeltet, setErFerdigMedFeltet] = useState(false);

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input
                label={label}
                size="small"
                error={(erFerdigMedFeltet && datoFeil ? DATO_FEILTEKST[datoFeil] : undefined) || error || undefined}
                {...inputProps}
                onChange={(e) => {
                    setErFerdigMedFeltet(false);
                    inputProps.onChange?.(e);
                }}
                onBlur={(e) => {
                    setErFerdigMedFeltet(true);
                    inputProps.onBlur?.(e);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') setErFerdigMedFeltet(true);
                }}
            />
        </DatePicker>
    );
};
