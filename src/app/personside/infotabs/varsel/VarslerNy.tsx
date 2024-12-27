import { VStack, Alert } from '@navikt/ds-react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import varselResource from 'src/rest/resources/varselResource';
import { Pagination, Table } from '@navikt/ds-react';
import {
    DittNavEvent,
    FeiletVarsling,
    isDittNavEvent,
    UnifiedVarsel as UnifiedVarselModell,
    UnifiedVarsel,
    Varsel as VarselModell,
    VarslerResult
} from 'src/models/varsel';
import * as React from 'react';
import { datoSynkende } from 'src/utils/date-utils';
import { ReactNode, useState } from 'react';
import { ENDASH, formaterDato } from 'src/utils/string-utils';
import { emptyReplacement, getVarselTekst } from 'src/app/personside/infotabs/varsel/varsel-utils';
import WarningIcon from '../../../../svg/WarningIcon';
import CompletedIcon from '../../../../svg/CompletedIcon';
import VarselMeldinger from './varselDetaljer/VarselMeldinger';

function VarslerNy() {
    const [page, setPage] = useState(1);
    const rowsPerPage = 22;

    const varslerResponse = varselResource.useFetch();
    const varslerResult: VarslerResult = varslerResponse.data || { feil: [], varsler: [] };
    const datoExtractor = (varsel: UnifiedVarsel) => {
        if (isDittNavEvent(varsel)) {
            return varsel.forstBehandlet;
        }
        return varsel.mottattTidspunkt;
    };

    const varselElementer = varslerResult.varsler.sort(datoSynkende(datoExtractor));
    const varselPagniated = varselElementer.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const DittNavInformasjonsLinje = ({ tittel, tekst }: { tittel: string; tekst: string }) => {
        return (
            <div className={'flex space-x-4'}>
                <dt className={'font-bold'}>{tittel}</dt>
                <dd>{tekst}</dd>
            </div>
        );
    };

    const DittNavInformasjonsLinjer = (varsel: { produsent: string; tekst: string; link: string }) => {
        return (
            <div className={'flex flex-col space-y-2 bg-gray-200 p-4'}>
                <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Tekst:" tekst={emptyReplacement(varsel.tekst, ENDASH)} />
                <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.link, ENDASH)} />
            </div>
        );
    };

    const FeilteVarslingerListe = ({
        tittel,
        feilteVarslinger
    }: { tittel: string; feilteVarslinger: FeiletVarsling[] }) => {
        return (
            <div className={'my-2'}>
                <div className={'font-bold'}>{tittel}</div>
                <div>
                    {feilteVarslinger.map((varsling) => (
                        <li key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                            {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                        </li>
                    ))}
                </div>
            </div>
        );
    };

    const DittNavInformasjonsLinjerV2 = (varsel: DittNavEvent) => {
        const varslingsTidspunkt = varsel.varslingsTidspunkt;

        return (
            <>
                <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
                <DittNavInformasjonsLinje
                    tittel="Varslet: "
                    tekst={`${formaterDato(varslingsTidspunkt.tidspunkt)} - ${varslingsTidspunkt.sendteKanaler.join(
                        ', '
                    )}`}
                />
                {varslingsTidspunkt.renotifikasjonTidspunkt && (
                    <DittNavInformasjonsLinje
                        tittel="Revarslet: "
                        tekst={`${formaterDato(
                            varslingsTidspunkt.renotifikasjonTidspunkt
                        )} - ${varslingsTidspunkt.renotifikasjonsKanaler.join(', ')}`}
                    />
                )}
                {varslingsTidspunkt.harFeilteVarslinger && (
                    <>
                        <hr />
                        <FeilteVarslingerListe
                            tittel="Varslingsfeil"
                            feilteVarslinger={varslingsTidspunkt.feilteVarsliner}
                        />
                    </>
                )}
                {varslingsTidspunkt.harFeilteRevarslinger && (
                    <>
                        <hr />
                        <FeilteVarslingerListe
                            tittel="Revarslingsfeil"
                            feilteVarslinger={varslingsTidspunkt.feilteRevarslinger}
                        />
                    </>
                )}
            </>
        );
    };

    const dataExtractor = (
        varsel: UnifiedVarselModell
    ): { datoer: string[]; tittel: string; kanaler: string[]; harFeilteVarsel?: boolean; detaljer?: ReactNode } => {
        if (isDittNavEvent(varsel)) {
            const varslingsTidspunkt = varsel.varslingsTidspunkt;
            const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
            const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;

            if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
                const datoer = [formaterDato(varsel.forstBehandlet)];
                const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];

                const detaljer = (
                    <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
                );

                return { datoer, tittel, kanaler, detaljer };
            }

            const datoer = [formaterDato(varslingsTidspunkt.tidspunkt)];
            if (varslingsTidspunkt.renotifikasjonTidspunkt) {
                datoer.push(formaterDato(varslingsTidspunkt.renotifikasjonTidspunkt));
            }

            const kanaler = [
                'DITT_NAV',
                ...varsel.eksternVarslingKanaler,
                ...varslingsTidspunkt.renotifikasjonsKanaler
            ].unique();

            const harFeilteVarsel = varslingsTidspunkt.harFeilteVarslinger || varslingsTidspunkt.harFeilteRevarslinger;
            const detaljer = <DittNavInformasjonsLinjerV2 varsel={varsel} />;

            return { datoer, tittel, kanaler, detaljer, harFeilteVarsel };
        } else {
            const meldingsliste = item.meldingListe?.sort(datoSynkende((melding) => melding.utsendingsTidspunkt)) || [];
            const datoer = meldingsliste.map((melding) => formaterDato(melding.utsendingsTidspunkt)).unique();
            const tittel = getVarselTekst(item);
            const kanaler = meldingsliste.map((melding) => melding.kanal).unique();
            const detaljer = <VarselMeldinger sortertMeldingsliste={meldingsliste} />;
            return { datoer, tittel, kanaler, detaljer };
        }
    };

    return (
        <div className={'flex flex-col w-1/2 max-h-screen overflow-auto pb-6'}>
            <Alert variant="info" className={'my-4'} fullWidth={true} contentMaxWidth={false}>
                Varsler vises kun ett år tilbake i tid. Dersom man trenger å se informasjon om eldre varsler kan man
                lage en sak i porten for manuell uthenting.
            </Alert>
            {varslerResult.feil.length > 0 && (
                <AlertStripeFeil className="blokk-xs my-4">{varsler.feil.join('. ')}</AlertStripeFeil>
            )}
            <Table size={'small'} zebraStripes className={'border border-gray-400 mb-2'}>
                <Table.Header textSize={'small'}>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell className={'w-24'}>Dato</Table.HeaderCell>
                        <Table.HeaderCell className={'w-20'}>Status</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell className={'w-48'}>Kanal</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {varselPagniated.map((item: VarselModell) => {
                        const data = dataExtractor(item);
                        return (
                            <>
                                <Table.ExpandableRow key={data.tittel} content={data.detaljer}>
                                    <Table.DataCell align="left" textSize={'small'}>
                                        {data.datoer}
                                    </Table.DataCell>
                                    <Table.DataCell align="left" textSize={'small'}>
                                        {data.harFeilteVarsel ? <WarningIcon /> : <CompletedIcon />}
                                    </Table.DataCell>
                                    <Table.DataCell align="left" textSize={'small'}>
                                        {data.tittel}
                                    </Table.DataCell>
                                    <Table.DataCell align="left" textSize={'small'}>
                                        {data.kanaler.join(', ')}
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            </>
                        );
                    })}
                </Table.Body>
            </Table>
            <Pagination
                className={'border border-gray-300'}
                page={page}
                onPageChange={setPage}
                count={Math.ceil(varselElementer.length / rowsPerPage)}
                size="small"
            />
        </div>
    );
}

export default VarslerNy;
