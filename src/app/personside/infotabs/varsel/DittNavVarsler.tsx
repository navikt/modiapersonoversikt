import { emptyReplacement } from 'src/utils/string-utils';
import styled from 'styled-components';
import type { DittNavEvent, FeiletVarsling } from '../../../../models/varsel';
import theme from '../../../../styles/personOversiktTheme';
import { ENDASH, formaterDato } from '../../../../utils/string-utils';
import { VarselRow } from './VarselRow';

const GraattDefinisjonsListe = styled.dl`
  ${theme.graattPanel}
  dt {
    float: left;
    clear: left;
    font-weight: bold;
    margin-bottom: 0.5rem;
    width: 7rem;
  }
  dd {
    margin-bottom: 0.5rem;
    margin-left: 7.125rem;
  }
`;

const BoldTekst = styled.span`
  font-weight: bold;
`;

const FeilteVarslinerListeStyling = styled.div`
  margin-top: 0.5rem;
`;

const FeilteVarslingerListeWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function DittNavInformasjonsLinje({ tittel, tekst }: { tittel: string; tekst: string }) {
    return (
        <>
            <dt>{tittel}</dt>
            <dd>{tekst}</dd>
        </>
    );
}

function DittNavInformasjonsLinjer(varsel: { produsent: string; tekst: string; link: string }) {
    return (
        <>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Tekst:" tekst={emptyReplacement(varsel.tekst, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.link, ENDASH)} />
        </>
    );
}

function DittNavEventVarsel({ varsel }: { varsel: DittNavEvent }) {
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const datoer = [formaterDato(varsel.forstBehandlet)];
    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const kanaler = ['DITT_NAV', ...varsel.eksternVarslingKanaler];

    return (
        <VarselRow datoer={datoer} tittel={tittel} kanaler={kanaler} varsel={varsel}>
            <GraattDefinisjonsListe>
                <DittNavInformasjonsLinjer produsent={varsel.produsent} tekst={varsel.tekst} link={varsel.link} />
            </GraattDefinisjonsListe>
        </VarselRow>
    );
}

function FeilteVarslingerListe({ tittel, feilteVarslinger }: { tittel: string; feilteVarslinger: FeiletVarsling[] }) {
    return (
        <FeilteVarslingerListeWrapper>
            <BoldTekst>{tittel}</BoldTekst>
            <FeilteVarslinerListeStyling>
                {feilteVarslinger.map((varsling) => (
                    <li key={`${varsling.tidspunkt} - ${varsling.kanal}`}>
                        {formaterDato(varsling.tidspunkt)} - {varsling.kanal}: {varsling.feilmelding}
                    </li>
                ))}
            </FeilteVarslinerListeStyling>
        </FeilteVarslingerListeWrapper>
    );
}

export function DittNavEventVarselV2({ varsel }: { varsel: DittNavEvent }) {
    const varslingsTidspunkt = varsel.varslingsTidspunkt;

    if (!varslingsTidspunkt || !varslingsTidspunkt.tidspunkt) {
        return <DittNavEventVarsel varsel={varsel} />;
    }

    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const datoer = [formaterDato(varslingsTidspunkt.tidspunkt)];
    if (varslingsTidspunkt.renotifikasjonTidspunkt) {
        datoer.push(formaterDato(varslingsTidspunkt.renotifikasjonTidspunkt));
    }

    const tittel = `Notifikasjon${aktiv}: ${varsel.tekst}`;
    const kanaler = [
        'DITT_NAV',
        ...varsel.eksternVarslingKanaler,
        ...varslingsTidspunkt.renotifikasjonsKanaler
    ].unique();

    return (
        <VarselRow
            datoer={datoer}
            tittel={tittel}
            kanaler={kanaler}
            varsel={varsel}
            harFeilteVarsel={varslingsTidspunkt.harFeilteVarslinger || varslingsTidspunkt.harFeilteRevarslinger}
        >
            <GraattDefinisjonsListe>
                <div>
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
                </div>
            </GraattDefinisjonsListe>
        </VarselRow>
    );
}
