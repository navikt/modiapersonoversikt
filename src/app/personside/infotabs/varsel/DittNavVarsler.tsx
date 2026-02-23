import type { Feilhistorikk, Varsel } from 'src/lib/types/modiapersonoversikt-api';
import { emptyReplacement } from 'src/utils/string-utils';
import styled from 'styled-components';
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

function DittNavInformasjonsLinjer(varsel: { produsent: string; tekst: string; link: string | null | undefined }) {
    return (
        <>
            <DittNavInformasjonsLinje tittel="Produsert av:" tekst={emptyReplacement(varsel.produsent, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Tekst:" tekst={emptyReplacement(varsel.tekst, ENDASH)} />
            <DittNavInformasjonsLinje tittel="Link:" tekst={emptyReplacement(varsel.link, ENDASH)} />
        </>
    );
}

function FeilteVarslingerListe({ tittel, feilteVarslinger }: { tittel: string; feilteVarslinger: Feilhistorikk[] }) {
    return (
        <FeilteVarslingerListeWrapper>
            <BoldTekst>{tittel}</BoldTekst>
            <FeilteVarslinerListeStyling>
                {feilteVarslinger.map((feiletVarsel) => (
                    <li key={`${feiletVarsel.tidspunkt}`}>
                        {formaterDato(feiletVarsel.tidspunkt)}: {feiletVarsel.feilmelding}
                    </li>
                ))}
            </FeilteVarslinerListeStyling>
        </FeilteVarslingerListeWrapper>
    );
}

export function DittNavEventVarsel({ varsel }: { varsel: Varsel }) {
    const aktiv = varsel.aktiv ? '' : ' (Ferdigstilt)';
    const datoer = [formaterDato(varsel.eksternVarsling.sendtTidspunkt)];
    if (varsel.eksternVarsling.renotifikasjonTidspunkt) {
        datoer.push(formaterDato(varsel.eksternVarsling.renotifikasjonTidspunkt));
    }

    const tittel = `Notifikasjon${aktiv}: ${varsel.innhold.tekst}`;
    const kanaler = ['DITT_NAV', ...varsel.eksternVarsling.sendteKanaler].unique();

    return (
        <VarselRow
            datoer={datoer}
            tittel={tittel}
            kanaler={kanaler}
            varsel={varsel}
            harFeilteVarsel={varsel.eksternVarsling.feilhistorikk.length > 0}
        >
            <GraattDefinisjonsListe>
                <div>
                    <DittNavInformasjonsLinjer
                        produsent={varsel.produsent}
                        tekst={varsel.innhold.tekst}
                        link={varsel.innhold.link}
                    />
                    <DittNavInformasjonsLinje
                        tittel="Varslet: "
                        tekst={`${formaterDato(varsel.eksternVarsling.sendtTidspunkt)} - ${varsel.eksternVarsling.sendteKanaler.join(
                            ', '
                        )}`}
                    />
                    {varsel.eksternVarsling.renotifikasjonTidspunkt && (
                        <DittNavInformasjonsLinje
                            tittel="Revarslet: "
                            tekst={`${formaterDato(
                                varsel.eksternVarsling.renotifikasjonTidspunkt
                            )} - ${varsel.eksternVarsling.sendteKanaler.join(', ')}`}
                        />
                    )}
                    {varsel.eksternVarsling.feilhistorikk && (
                        <>
                            <hr />
                            <FeilteVarslingerListe
                                tittel="Varslingsfeil"
                                feilteVarslinger={varsel.eksternVarsling.feilhistorikk}
                            />
                        </>
                    )}
                </div>
            </GraattDefinisjonsListe>
        </VarselRow>
    );
}
