import { BodyShort, Box, HStack, Heading } from '@navikt/ds-react';
import type { PropsWithChildren, ReactElement } from 'react';
import type { Adresse, SistEndret } from 'src/lib/types/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

export const Group = ({
    title,
    icon,
    children
}: PropsWithChildren<{
    title?: string;
    icon?: ReactElement;
}>) => {
    return (
        <section className="mx-4 mb-2">
            <HStack className="relative" align="center">
                <div aria-hidden className="absolute -left-7 text-2xl text-icon-subtle">
                    {icon}
                </div>
                {title && (
                    <Heading as="h2" size="small">
                        {title}
                    </Heading>
                )}
            </HStack>
            <Box>{children}</Box>
        </section>
    );
};

export const InfoElement = ({
    children,
    title
}: PropsWithChildren<{
    title?: string;
    icon?: ReactElement;
}>) => (
    <Box className="mb-6 mt-2">
        <HStack align="center" className="relative">
            <Heading as="h3" size="xsmall" className="text-medium">
                {title}
            </Heading>
        </HStack>
        <Box>{children}</Box>
    </Box>
);

export const Adresseinfo = ({ adresse }: { adresse: Adresse }) => {
    const coAdresse = adresse.coAdresse ? <BodyShort size="small">{adresse.coAdresse}</BodyShort> : null;
    const adresselinje2 = adresse.linje2 ? <BodyShort size="small">{adresse.linje2}</BodyShort> : null;
    const adresselinje3 = adresse.linje3 ? <BodyShort size="small">{adresse.linje3}</BodyShort> : null;

    return (
        <>
            {coAdresse}
            <BodyShort size="small">{adresse.linje1}</BodyShort>
            {adresselinje2}
            {adresselinje3}
        </>
    );
};

export const LastChanged = ({ sistEndret }: { sistEndret?: SistEndret }) => {
    if (!sistEndret) return null;

    const formatertDato = formaterDato(new Date(sistEndret.tidspunkt));
    const endretAvSystemKilde = sistEndret.system;
    const kilde = sistEndret.kilde.length > 0 ? `(kilde: ${sistEndret.kilde})` : null;

    return (
        <BodyShort textColor="subtle" className="text-sm">
            Endret {formatertDato} {endretAvSystemKilde && `av ${endretAvSystemKilde} ${kilde}`}
        </BodyShort>
    );
};
