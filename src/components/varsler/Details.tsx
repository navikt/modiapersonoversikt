import { BodyShort, ErrorMessage, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
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
        <HStack gap="1">
            <HStack width="8rem">
                <BodyShort size="small" weight="regular">
                    {tittel}
                </BodyShort>
            </HStack>
            <VStack gap="1">
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
        <HStack gap="1">
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

const DittNavInformasjonsLinjer = ({ varsel, kanaler }: { varsel: Varsel; kanaler: string[] }) => {
    const eksternVarsling = varsel.eksternVarsling;

    return (
        <>
            <VStack gap="1" className="p-2">
                <BodyShort size="medium" className="mb-4" weight="semibold">
                    {varsel.innhold.tekst}
                </BodyShort>
                <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.innhold.link, ENDASH)} />
            </VStack>

            <VStack gap="1" className="px-2">
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
        <ErrorBoundary boundaryName="vaslerDetaljer" errorText="Det oppstod en feil under visning av varsel">
            {valgtVarsel && (
                <Card padding="2" className="border-0 bg-ax-bg-sunken">
                    <DittNavInformasjonsLinjer varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                </Card>
            )}
        </ErrorBoundary>
    );
};
