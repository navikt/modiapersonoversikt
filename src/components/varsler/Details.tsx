import { BodyShort, ErrorMessage, Heading, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { EksternVarselTekst } from 'src/components/varsler/EksternVarselTekst';
import type { VarselData } from 'src/components/varsler/List/utils';
import type { Feilhistorikk, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';

const FeilteVarslingerListe = ({
    tittel,
    feiledeVarslinger
}: {
    tittel: string;
    feiledeVarslinger: Feilhistorikk[];
}) => {
    return (
        <HStack gap="space-4">
            <HStack width="8rem">
                <BodyShort size="small" weight="regular">
                    {tittel}
                </BodyShort>
            </HStack>
            <VStack gap="space-4">
                {feiledeVarslinger.map((varsling) => (
                    <div key={`${varsling.tidspunkt} - ${varsling.feilmelding}`}>
                        <ErrorMessage size="small" showIcon>
                            {formaterDato(varsling.tidspunkt)}: {varsling.feilmelding}
                        </ErrorMessage>
                    </div>
                ))}
            </VStack>
        </HStack>
    );
};

const DittNavInformasjonsLinje = ({ tittel, tekst }: { tittel: string; tekst: string; className?: string }) => {
    return (
        <HStack gap="space-4">
            <HStack width="8rem">
                <BodyShort size="small" weight="regular">
                    {tittel}
                </BodyShort>
            </HStack>
            <BodyShort size="small" weight="regular">
                {tekst}
            </BodyShort>
        </HStack>
    );
};

const VarselInnholdBlokk = ({
    tittel,
    felter
}: {
    tittel: string;
    felter: { label: string; verdi: string; kanal?: string | null }[];
}) => {
    if (felter.length === 0) {
        return null;
    }

    return (
        <section aria-label={tittel} className="rounded-md border border-ax-border-neutral-subtle p-4">
            <VStack gap="space-4">
                <Heading level="3" size="small">
                    {tittel}
                </Heading>
                <dl className="m-0 flex flex-col gap-2">
                    {felter.map(({ label, verdi, kanal }) => (
                        <div key={label}>
                            <dt>
                                <BodyShort size="small" weight="semibold">
                                    {label}
                                </BodyShort>
                            </dt>
                            <dd className="m-0">
                                <EksternVarselTekst tekst={verdi} kanal={kanal} />
                            </dd>
                        </div>
                    ))}
                </dl>
            </VStack>
        </section>
    );
};

const DittNavInformasjonsLinjer = ({ varsel, kanaler }: { varsel: Varsel; kanaler: string[] }) => {
    const eksternVarsling = varsel.eksternVarsling;
    const innholdIFelter = [
        { label: 'Tittel', verdi: eksternVarsling.tittel },
        { label: 'Tekst', verdi: eksternVarsling.tekst, kanal: eksternVarsling.kanal }
    ].filter((felt): felt is { label: string; verdi: string; kanal?: string | null } => Boolean(felt.verdi?.trim()));
    const revarselFelter = [
        {
            label: 'Tittel',
            verdi: eksternVarsling.renotifikasjonTittel,
            original: eksternVarsling.tittel
        },
        {
            label: 'Tekst',
            verdi: eksternVarsling.renotifikasjonTekst,
            original: eksternVarsling.tekst,
            kanal: eksternVarsling.renotifikasjonKanal
        }
    ].filter(
        (felt): felt is { label: string; verdi: string; original: string | null | undefined; kanal?: string | null } =>
            Boolean(felt.verdi?.trim()) && felt.verdi !== felt.original
    );

    return (
        <>
            <VStack className="p-2">
                <BodyShort size="medium" weight="semibold">
                    {`Varsel: ${varsel.innhold.tekst}`}
                </BodyShort>
            </VStack>
            {(innholdIFelter.length > 0 || revarselFelter.length > 0) && (
                <VStack gap="space-4" className="p-2">
                    <VarselInnholdBlokk tittel="Innhold i varselet til brukeren" felter={innholdIFelter} />
                    <VarselInnholdBlokk tittel="Innhold i revarselet til brukeren" felter={revarselFelter} />
                </VStack>
            )}
            <VStack gap="space-4" className="px-2">
                <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.innhold.link, ENDASH)} />
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={
                        eksternVarsling.sendtTidspunkt
                            ? `${formaterDato(eksternVarsling.sendtTidspunkt)} - ${kanaler.join(', ')}`
                            : '-'
                    }
                />
                {eksternVarsling.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(eksternVarsling.renotifikasjonTidspunkt)} - 
                    ${kanaler.join(', ')}`}
                    />
                )}
                <VStack gap="space-4" className="print-only">
                    <DittNavInformasjonsLinje tittel="Ferdigstilt: " tekst={varsel.aktiv ? 'Nei' : 'Ja'} />
                    <DittNavInformasjonsLinje
                        tittel="Status: "
                        tekst={(eksternVarsling.feilhistorikk.length ?? 0) > 0 ? 'Feilet' : 'Vellykket'}
                    />
                </VStack>
                {(eksternVarsling.feilhistorikk.length ?? 0) > 0 && (
                    <>
                        <div className="my-2 border border-ax-border-neutral-subtle" />
                        <FeilteVarslingerListe
                            tittel="Varslingsfeil: "
                            feiledeVarslinger={eksternVarsling.feilhistorikk}
                        />
                    </>
                )}
            </VStack>
        </>
    );
};

export const VarselDetail = ({ valgtVarsel }: { valgtVarsel: VarselData }) => {
    return (
        <ErrorBoundary errorText="Det oppstod en feil under visning av varsel">
            {valgtVarsel && (
                <Card padding="space-8" className="border-0 bg-ax-bg-neutral-soft">
                    <DittNavInformasjonsLinjer varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                </Card>
            )}
        </ErrorBoundary>
    );
};
