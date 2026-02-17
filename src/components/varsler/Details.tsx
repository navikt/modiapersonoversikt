import { BodyShort, ErrorMessage, HStack, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import ErrorBoundary from 'src/components/ErrorBoundary';
import type { VarselData } from 'src/components/varsler/List/utils';
import type { FeiletVarsling, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { ENDASH, emptyReplacement, formaterDato } from 'src/utils/string-utils';

const FeilteVarslingerListe = ({
    tittel,
    feilteVarslinger
}: {
    tittel: string;
    feilteVarslinger: FeiletVarsling[];
}) => {
    return (
        <HStack gap="1">
            <HStack width="8rem">
                <BodyShort size="small" weight="regular">
                    {tittel}
                </BodyShort>
            </HStack>
            {feilteVarslinger.map((varsling) => (
                <div key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                    <ErrorMessage size="small" showIcon>
                        {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                    </ErrorMessage>
                </div>
            ))}
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
    return (
        <VStack gap="1" className="p-2">
            <BodyShort size="medium" className="mb-4">
                {varsel.tekst}
            </BodyShort>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Kanaler:" tekst={emptyReplacement(kanaler?.join(', '), ENDASH)} />
        </VStack>
    );
};

const DittNavInformasjonsLinjerV2 = ({ varsel, kanaler }: { varsel: Varsel; kanaler: string[] }) => {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    const hasErrors = varslingsTidspunkt?.harFeilteVarslinger || varslingsTidspunkt?.harFeilteRevarslinger;
    return (
        <>
            <DittNavInformasjonsLinjer varsel={varsel} kanaler={kanaler} />
            <VStack gap="1" className="px-2">
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={
                        varslingsTidspunkt?.tidspunkt
                            ? `${formaterDato(varslingsTidspunkt.tidspunkt)} - ${varslingsTidspunkt.sendteKanaler.join(', ')}`
                            : '-'
                    }
                />
                {varslingsTidspunkt?.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(
                            varslingsTidspunkt.renotifikasjonTidspunkt
                        )} - ${varslingsTidspunkt.renotifikasjonsKanaler.join(', ')}`}
                    />
                )}
                {hasErrors && <div className="my-2 border border-ax-border-neutral-subtle" />}
                {varslingsTidspunkt?.harFeilteVarslinger && (
                    <FeilteVarslingerListe
                        tittel="Varslingsfeil: "
                        feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                    />
                )}
                {varslingsTidspunkt?.harFeilteRevarslinger && (
                    <FeilteVarslingerListe
                        tittel="Revarslingsfeil: "
                        feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                    />
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
                    {valgtVarsel.erVarslerV2 ? (
                        <DittNavInformasjonsLinjerV2 varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                    ) : (
                        <DittNavInformasjonsLinjer varsel={valgtVarsel.event} kanaler={valgtVarsel.kanaler} />
                    )}
                </Card>
            )}
        </ErrorBoundary>
    );
};
