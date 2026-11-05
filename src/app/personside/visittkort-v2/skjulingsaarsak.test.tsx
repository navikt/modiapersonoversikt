import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Skjulingsaarsak } from 'src/components/PersonLinje/skjulingsaarsak';
import type { Tilgangsavslag } from 'src/lib/types/modiapersonoversikt-api';
import { aremark } from 'src/mock/persondata/aremark';
import ForelderBarnRelasjonVisning from './body/familie/ForelderBarnRelasjon';
import Sivilstand from './body/familie/Sivilstand';
import Foreldreansvar from './body/foreldreansvar/Foreldreansvar';
import Fullmakter from './body/fullmakt/Fullmakt';
import Dodsbo from './body/kontaktinformasjon/dodsbo/Dodsbo';
import Vergemal from './body/vergemal/Vergemal';
import { type ForelderBarnRelasjon, InformasjonElement, SivilstandType } from './PersondataDomain';

const aarsaker: [Skjulingsaarsak, string][] = [
    ['MANGLER_TILGANG', 'Personopplysninger skjult'],
    ['UAVKLART', 'Personopplysninger kunne ikke hentes']
];

const detaljertAvslag: [Skjulingsaarsak, string, Tilgangsavslag] = [
    'MANGLER_TILGANG',
    'Personopplysninger er skjult: Du har ikke tilgang på grunn av habilitet',
    { title: 'AVVIST_HABILITET', message: 'Du har ikke tilgang på grunn av habilitet' }
];

test.each([...aarsaker, detaljertAvslag])(
    'beholder relasjonene og deres metadata ved %s: %s',
    (skjulingsaarsak, tekst, tilgangsavslag?: Tilgangsavslag) => {
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
            skjulingsaarsak,
            tilgangsavslag
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
                                skjulingsaarsak,
                                tilgangsavslag
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
                            ansvarsubject: { ident: null, navn: null, skjulingsaarsak, tilgangsavslag }
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
                            tilgangsavslag,
                            digitalKontaktinformasjonTredjepartsperson: null,
                            fullmakt: { ...aremark.fullmektige[0].fullmakt, endringslogg: [] }
                        }
                    ]}
                />
                <Vergemal
                    feilendeSystemer={feilendeSystemer}
                    vergemal={[{ ...aremark.vergemal[0], navn: null, ident: null, skjulingsaarsak, tilgangsavslag }]}
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
                                    skjulingsaarsak,
                                    tilgangsavslag
                                }
                            },
                            adresse: {
                                coAdresse: null,
                                linje1: 'Gateveien',
                                linje2: '9988 Poststed',
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
        expect(screen.getByText('Gateveien')).toBeVisible();
        expect(screen.getByText('9988 Poststed')).toBeVisible();
        expect(screen.getAllByText(new RegExp(tekst))).toHaveLength(7);
        expect(
            screen.queryByText(/Ukjent|Bor ikke med bruker|Feilet ved uthenting|Navn ikke tilgjengelig/)
        ).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Kopier|Åpne person/ })).not.toBeInTheDocument();
    }
);

test.each(aarsaker)('viser fullmaktens ident uten endringslogg ved %s', async (skjulingsaarsak) => {
    const fullmektig = aremark.fullmektige[0];
    render(
        <Fullmakter
            feilendeSystemer={[InformasjonElement.PDL_TREDJEPARTSPERSONER]}
            fullmektige={[
                {
                    ...fullmektig,
                    navn: null,
                    ident: '',
                    skjulingsaarsak,
                    digitalKontaktinformasjonTredjepartsperson: null,
                    fullmakt: {
                        ...fullmektig.fullmakt,
                        fullmektig: '01010112345',
                        endringslogg: fullmektig.fullmakt.endringslogg.map((endring) => ({
                            ...endring,
                            registrertAv: 'testsystem'
                        }))
                    }
                }
            ]}
        />
    );

    expect(screen.getByText('F.nr.: 01010112345')).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Detaljer' }));
    expect(screen.queryByRole('button', { name: 'Endringslogg' })).not.toBeInTheDocument();
    expect(screen.queryByText('Registrert av: testsystem')).not.toBeInTheDocument();
});

test('viser innebygde barne- og foreldreansvarsopplysninger ved teknisk PDL-feil', () => {
    render(
        <>
            <ForelderBarnRelasjonVisning
                harFeilendeSystem
                relasjon={{
                    ...aremark.forelderBarnRelasjon[0],
                    ident: null,
                    navn: [{ fornavn: 'Innebygd', mellomnavn: null, etternavn: 'Barn' }],
                    harSammeAdresse: null,
                    skjulingsaarsak: null
                }}
                beskrivelse="Barn"
                erBarn
            />
            <Foreldreansvar
                feilendeSystemer={[InformasjonElement.PDL_TREDJEPARTSPERSONER]}
                foreldreansvar={[
                    {
                        ansvar: 'felles',
                        ansvarlig: {
                            ident: null,
                            navn: { fornavn: 'Innebygd', mellomnavn: null, etternavn: 'Forelder' }
                        },
                        ansvarsubject: null
                    }
                ]}
            />
        </>
    );

    expect(screen.getByText(/Innebygd Barn/)).toBeVisible();
    expect(screen.getByText(/Ansvarlig: Innebygd Forelder/)).toBeVisible();
    expect(screen.queryByText(/Feilet ved uthenting/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bor (ikke )?med bruker/)).not.toBeInTheDocument();
});

test.each([null, true, false])('viser bosted bare når adressene kan sammenlignes (%s)', (harSammeAdresse) => {
    const { container } = render(
        <>
            <ForelderBarnRelasjonVisning
                harFeilendeSystem={false}
                relasjon={{
                    ...aremark.forelderBarnRelasjon[0],
                    ident: '01010112345',
                    navn: [{ fornavn: 'Test', mellomnavn: null, etternavn: 'Barn' }],
                    adressebeskyttelse: [],
                    dodsdato: [],
                    harSammeAdresse
                }}
                beskrivelse="Barn"
                erBarn
            />
            <Sivilstand
                harFeilendeSystem={false}
                sivilstandListe={[
                    {
                        ...aremark.sivilstand[0],
                        type: { kode: SivilstandType.GIFT, beskrivelse: 'Gift' },
                        sivilstandRelasjon: {
                            fnr: '02020212345',
                            navn: [{ fornavn: 'Test', mellomnavn: null, etternavn: 'Partner' }],
                            alder: 35,
                            adressebeskyttelse: [],
                            dodsdato: [],
                            harSammeAdresse
                        }
                    }
                ]}
            />
        </>
    );

    expect(screen.getByText(/Test Barn/)).toBeVisible();
    expect(screen.getByText(/Test Partner/)).toBeVisible();
    if (harSammeAdresse == null) {
        expect(screen.queryByText(/Bor (ikke )?med bruker/)).not.toBeInTheDocument();
        expect(
            Array.from(container.querySelectorAll('p')).filter((paragraph) => !paragraph.hasChildNodes())
        ).toHaveLength(0);
    } else {
        expect(screen.getAllByText(harSammeAdresse ? 'Bor med bruker' : 'Bor ikke med bruker')).toHaveLength(2);
    }
});
