import { render, screen } from '@testing-library/react';
import type { Skjulingsaarsak } from 'src/components/PersonLinje/skjulingsaarsak';
import { aremark } from 'src/mock/persondata/aremark';
import ForelderBarnRelasjonVisning from './body/familie/ForelderBarnRelasjon';
import Sivilstand from './body/familie/Sivilstand';
import Foreldreansvar from './body/foreldreansvar/Foreldreansvar';
import Fullmakter from './body/fullmakt/Fullmakt';
import Dodsbo from './body/kontaktinformasjon/dodsbo/Dodsbo';
import Vergemal from './body/vergemal/Vergemal';
import { type ForelderBarnRelasjon, InformasjonElement } from './PersondataDomain';

const aarsaker: [Skjulingsaarsak, string][] = [
    ['MANGLER_TILGANG', 'Personopplysninger skjult'],
    ['UAVKLART', 'Personopplysninger kunne ikke hentes']
];

test.each(aarsaker)('beholder relasjonene og deres metadata ved %s', (skjulingsaarsak, tekst) => {
    const barn: ForelderBarnRelasjon = {
        ...aremark.forelderBarnRelasjon[0],
        ident: null,
        navn: [],
        kjonn: [],
        alder: null,
        fodselsdato: [],
        dodsdato: [],
        adressebeskyttelse: [],
        harSammeAdresse: false,
        skjulingsaarsak
    };
    const feilendeSystemer = [InformasjonElement.PDL_TREDJEPARTSPERSONER];

    render(
        <>
            <ForelderBarnRelasjonVisning harFeilendeSystem relasjon={barn} beskrivelse="Ukjent" erBarn />
            <ForelderBarnRelasjonVisning harFeilendeSystem relasjon={barn} beskrivelse="Mor" erBarn={false} />
            <Sivilstand
                harFeilendeSystem
                sivilstandListe={[
                    {
                        ...aremark.sivilstand[0],
                        sivilstandRelasjon: {
                            fnr: '',
                            navn: [],
                            alder: null,
                            dodsdato: [],
                            adressebeskyttelse: [],
                            harSammeAdresse: false,
                            skjulingsaarsak
                        }
                    }
                ]}
            />
            <Foreldreansvar
                feilendeSystemer={feilendeSystemer}
                foreldreansvar={[
                    {
                        ansvar: 'felles',
                        ansvarlig: {
                            ident: '01010112345',
                            navn: { fornavn: 'Test', mellomnavn: null, etternavn: 'Forelder' }
                        },
                        ansvarsubject: { ident: null, navn: null, skjulingsaarsak }
                    }
                ]}
            />
            <Fullmakter
                feilendeSystemer={feilendeSystemer}
                fullmektige={[
                    {
                        ...aremark.fullmektige[0],
                        navn: null,
                        ident: '',
                        skjulingsaarsak,
                        digitalKontaktinformasjonTredjepartsperson: null
                    }
                ]}
            />
            <Vergemal
                feilendeSystemer={feilendeSystemer}
                vergemal={[{ ...aremark.vergemal[0], navn: null, ident: null, skjulingsaarsak }]}
            />
            <Dodsbo
                harFeilendeSystem
                dodsbo={[
                    {
                        ...aremark.dodsbo[0],
                        adressat: {
                            advokatSomAdressat: null,
                            organisasjonSomAdressat: null,
                            personSomAdressat: {
                                navn: [],
                                fnr: null,
                                fodselsdato: null,
                                skjulingsaarsak
                            }
                        },
                        adresse: {
                            coAdresse: null,
                            linje1: '',
                            linje2: null,
                            linje3: null,
                            sistEndret: null,
                            gyldighetsPeriode: null
                        }
                    }
                ]}
            />
        </>
    );

    expect(screen.getByRole('heading', { name: 'Barn' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mor' })).toBeInTheDocument();
    expect(screen.getByText(/Gift/)).toBeInTheDocument();
    expect(screen.getByText('Ansvarlig: Test Forelder (01010112345)')).toBeInTheDocument();
    expect(screen.getByText(`Gjelder for: ${tekst}`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Fullmektig' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Verge' })).toBeInTheDocument();
    expect(screen.getAllByText(/Gyldig:/)).toHaveLength(2);
    expect(screen.getByText('Skifteform: Offentlig')).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(tekst))).toHaveLength(7);
    expect(
        screen.queryByText(/Ukjent|Bor ikke med bruker|Feilet ved uthenting|Navn ikke tilgjengelig/)
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Kopier|Åpne person/ })).not.toBeInTheDocument();
});
