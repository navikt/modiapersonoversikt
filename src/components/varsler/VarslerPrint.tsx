import { ChevronDownIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { ActionMenu, BodyShort, Button, HStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import usePrinter from 'src/components/Print/usePrinter';
import { VarselDetail } from 'src/components/varsler/Details';
import type { VarselData } from 'src/components/varsler/List/utils';
import { datoVerbose } from 'src/utils/date-utils';

type Props = {
    alleVarsler: VarselData[];
    gjeldendeSide: VarselData[];
};

export const VarslerPrint = ({ alleVarsler, gjeldendeSide }: Props) => {
    const [varslerForUtskrift, setVarslerForUtskrift] = useState<VarselData[]>([]);
    const printer = usePrinter();
    const PrinterWrapper = printer.printerWrapper;
    const dagensDato = dayjs();
    const periodeFra = datoVerbose(dagensDato.subtract(1, 'year').toDate()).sammensatt;
    const periodeTil = datoVerbose(dagensDato.toDate()).sammensatt;

    const skrivUt = (varsler: VarselData[]) => {
        setVarslerForUtskrift(varsler);
        printer.triggerPrint();
    };

    return (
        <>
            {alleVarsler.length <= 50 ? (
                <Button
                    size="small"
                    variant="tertiary"
                    icon={<PrinterSmallIcon aria-hidden />}
                    onClick={() => skrivUt(alleVarsler)}
                >
                    Skriv ut varsler
                </Button>
            ) : (
                <ActionMenu>
                    <ActionMenu.Trigger>
                        <Button
                            variant="tertiary"
                            icon={<ChevronDownIcon aria-hidden />}
                            aria-label="Utskriftsvalg for varsler"
                            size="small"
                            iconPosition="right"
                        >
                            <HStack gap="space-4" align="center">
                                <PrinterSmallIcon aria-hidden fontSize="1.5rem" />
                                Utskriftsvalg for varsler
                            </HStack>
                        </Button>
                    </ActionMenu.Trigger>
                    <ActionMenu.Content>
                        <ActionMenu.Item onSelect={() => skrivUt(alleVarsler)}>Skriv ut alle varsler</ActionMenu.Item>
                        <ActionMenu.Item onSelect={() => skrivUt(gjeldendeSide)}>
                            Skriv ut varsler på gjeldende side
                        </ActionMenu.Item>
                    </ActionMenu.Content>
                </ActionMenu>
            )}
            <PrinterWrapper>
                <div className="print-only">
                    {varslerForUtskrift.length > 0 && (
                        <>
                            <BodyShort>Antall varsler: {varslerForUtskrift.length}</BodyShort>
                            <BodyShort>
                                Periode: {periodeFra} – {periodeTil}
                            </BodyShort>
                        </>
                    )}
                    {varslerForUtskrift.map((varsel) => (
                        <VarselDetail key={varsel.eventId} valgtVarsel={varsel} />
                    ))}
                </div>
            </PrinterWrapper>
        </>
    );
};
