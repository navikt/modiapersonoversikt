import { GlobeFillIcon } from '@navikt/aksel-icons';
import { Box } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import type { Person } from 'src/app/personside/visittkort-v2/PersondataDomain';
import Endringstekst from 'src/app/personside/visittkort-v2/body/Endringstekst';
import GyldighetsPeriode from 'src/app/personside/visittkort-v2/body/GyldighetsPeriode';
import VisittkortElement from 'src/app/personside/visittkort-v2/body/VisittkortElement';
import { VisittkortGruppe } from 'src/app/personside/visittkort-v2/body/VisittkortStyles';
import { formaterDato } from 'src/utils/string-utils';

interface Props {
    person: Person;
}

export default function FlyttingInfo({ person }: Props) {
    if (person.innflyttingTilNorge.isEmpty() && person.utflyttingFraNorge.isEmpty()) {
        return null;
    }
    return (
        <VisittkortGruppe tittel="Flytting" ikon={<GlobeFillIcon color="#C6C2BF" />}>
            {person.innflyttingTilNorge.isNotEmpty() && (
                <VisittkortElement beskrivelse="Flyttet fra">
                    {person.innflyttingTilNorge.map((innFlytting, index) => {
                        return (
                            <Box key={`${innFlytting.gyldighetsPeriode}-${index}`} className="mb-[0.5rem]">
                                <Normaltekst>{innFlytting.fraflyttingsland} </Normaltekst>
                                {innFlytting.sistEndret && <Endringstekst sistEndret={innFlytting.sistEndret} />}
                                {innFlytting.gyldighetsPeriode && (
                                    <GyldighetsPeriode gyldighetsPeriode={innFlytting.gyldighetsPeriode} />
                                )}
                            </Box>
                        );
                    })}
                </VisittkortElement>
            )}
            {person.utflyttingFraNorge.isNotEmpty() && (
                <VisittkortElement beskrivelse="Flyttet til">
                    {person.utflyttingFraNorge.map((utflyttingFraNorge, index) => {
                        return (
                            <Box key={`${utflyttingFraNorge.gyldighetsPeriode}-${index}`} className="mb-[0.5rem]">
                                <Normaltekst>{utflyttingFraNorge.tilflyttingsland} </Normaltekst>
                                {utflyttingFraNorge.utflyttingsdato && (
                                    <Normaltekst>
                                        Utflyttingsdato: {formaterDato(utflyttingFraNorge.utflyttingsdato)}
                                    </Normaltekst>
                                )}
                                {utflyttingFraNorge.sistEndret && (
                                    <Endringstekst sistEndret={utflyttingFraNorge.sistEndret} />
                                )}
                                {utflyttingFraNorge.gyldighetsPeriode && (
                                    <GyldighetsPeriode gyldighetsPeriode={utflyttingFraNorge.gyldighetsPeriode} />
                                )}
                            </Box>
                        );
                    })}
                </VisittkortElement>
            )}
        </VisittkortGruppe>
    );
}
