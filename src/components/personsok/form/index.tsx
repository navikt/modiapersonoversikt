import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import {
    Box,
    Button,
    DatePicker,
    ErrorMessage,
    HStack,
    Link,
    Select,
    TextField,
    VStack,
    useDatepicker
} from '@navikt/ds-react';
import { useForm } from '@tanstack/react-form';
import dayjs from 'dayjs';
import { type ReactNode, useEffect } from 'react';
import type { PersonsokRequest } from 'src/lib/types/modiapersonoversikt-api';
import { usePrevious } from 'src/utils/customHooks';
import { backendDatoformat } from 'src/utils/date-utils';
import { z } from 'zod';
import LenkeDrekV2 from './LenkeDrekV2';

const FIELD_GROUP_ERROR = 'Minst en av navn, adresse, telefonnummer, eller utenlandsk ID må fylles ut for å kunne søke';
const fieldGroup = ['name', 'dnr', 'address', 'phoneNumber'] as const;

const fieldLabels: Record<keyof z.infer<typeof personSokSchema>, [string, ReactNode] | [string]> = {
    name: ['Navn (fonetisk søk)'],
    dnr: ['Utenlandsk ID', 'Husk å inkludere alle tegn. Eksempel: 010101-12345'],
    address: ['Adresse', ''],
    phoneNumber: ['Telefonnummer', 'Telefonnummer uten landskode'],
    birthDateFrom: ['Fødselsdato fra'],
    birthDateTo: ['Fødselsdato til'],
    gender: ['Kjønn'],
    ageFrom: ['Alder fra'],
    ageTo: ['Alder til'],
    _fieldgroup: ['']
};

const personSokSchema = z
    .object({
        name: z.string(),
        dnr: z.string(),
        birthDateFrom: z.date().optional(),
        birthDateTo: z.date().optional(),
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
        if (!val.name && !val.dnr && !val.address && !val.phoneNumber) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: FIELD_GROUP_ERROR,
                path: ['_fieldgroup']
            });
        }
    });

function emptyString(input?: string): string | undefined {
    if (!input || input.length === 0) {
        return undefined;
    }
    return input;
}

type Props = {
    onSubmit: (value: PersonsokRequest | undefined) => void;
    onReset: () => void;
};

export function PersonsokForm({ onSubmit, onReset }: Props) {
    const form = useForm({
        defaultValues: {
            name: '',
            dnr: ''
        } as z.infer<typeof personSokSchema>,
        validators: {
            onChange: personSokSchema
        },
        onSubmit: ({ value: v }) => {
            onSubmit({
                navn: emptyString(v.name),
                adresse: emptyString(v.address),
                utenlandskID: emptyString(v.dnr),
                fodselsdatoFra: emptyString(
                    v.birthDateFrom ? dayjs(v.birthDateFrom).format(backendDatoformat) : undefined
                ),
                fodselsdatoTil: emptyString(v.birthDateTo ? dayjs(v.birthDateTo).format(backendDatoformat) : undefined),
                alderFra: z.coerce.number().optional().catch(undefined).parse(v.ageFrom),
                alderTil: z.coerce.number().optional().catch(undefined).parse(v.ageTo),
                kjonn: emptyString(v.gender),
                telefonnummer: emptyString(v.phoneNumber)
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
            <VStack marginBlock="8" gap="4">
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
                                        field.form.state.errorMap.onChange?._fieldgroup.length
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
                    <HStack gap="4" align="start" className="pr-2">
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
                    <HStack gap="4">
                        <form.Field name="birthDateFrom">
                            {(field) => (
                                <DateInput
                                    label={fieldLabels[field.name][0]}
                                    onChange={field.handleChange}
                                    value={field.state.value}
                                />
                            )}
                        </form.Field>
                        <form.Field name="birthDateTo">
                            {(field) => (
                                <DateInput
                                    label={fieldLabels[field.name][0]}
                                    onChange={field.handleChange}
                                    value={field.state.value}
                                />
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

            <Box marginBlock="2">
                <div>
                    <form.Subscribe
                        selector={(state) =>
                            [state.values.name, state.values.birthDateFrom, state.values.gender] as const
                        }
                    >
                        {([name, birthDateFrom, gender]) => (
                            <LenkeDrekV2
                                birthDateFrom={
                                    birthDateFrom ? dayjs(birthDateFrom).format(backendDatoformat) : undefined
                                }
                                gender={gender}
                                name={name}
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
    value,
    label
}: {
    onChange: (val?: Date) => void;
    value?: Date;
    label: string;
}) => {
    const { inputProps, datepickerProps, reset } = useDatepicker({
        onDateChange: onChange,
        defaultSelected: value,
        fromDate: new Date(1900, 1, 1),
        toDate: new Date()
    });
    const prevValue = usePrevious(value);

    useEffect(() => {
        if (value === undefined && prevValue !== undefined) {
            reset();
        }
    }, [value, prevValue, reset]);

    return (
        <DatePicker {...datepickerProps} dropdownCaption>
            <DatePicker.Input label={label} size="small" {...inputProps} />
        </DatePicker>
    );
};
