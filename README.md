# Modiapersonoversikt

![](https://github.com/navikt/modiapersonoversikt/workflows/Build%2C%20push%2C%20and%20deploy/badge.svg?branch=dev)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og
saksbehandlere oversikt over brukeres forhold til Nav.

## Komme i gang

### Miljøvariabler

Endring av miljøvariabler for lokal utvikling skal gjøres i `.env.development`.

- `PORT` kommer fra vite og styrer hvilken port devserveren starter på. Default: 3000
- `VITE_MOCK_ENABLED` styrer hvorvidt fetch-mock skal være aktivert
- `VITE_HODE_URL` styrer hvor dekoratøren hentes fra

**NB** Det skal ikke være nødvendig med endringer i disse filene for å få startet appen.

### Starte appen lokalt

Dette er gunstig for å kunne kjøre ting i `/web` uten å måtte generere mengder
av tokens for kallene som skjer til `/proxy` og `/modiapersonoversikt-draft`.
Kun et `LOCAL_TOKEN` er nødvendig. Dette kan hentes fra
<https://azure-token-generator.intern.dev.nav.no/api/obo?aud=dev-gcp:personoversikt:modiapersonoversikt>.

```console
pnpm i
pnpm run start
```

### Bygge og kjøre via docker

```console
docker build -t personoversikt .
docker run --env-file .env.development --name personoversikt -d -p 8080:80 personoversikt
```

## Dokumentasjon

Vi bruker Architecture Decision Records (ADR) til å beskrive viktige arkitekturbeslutninger for vår app. Dette sjekkes inn i kildekoden og kan bidra til man i ettertid kan skjønne hvorfor koden har blitt sånn den har blitt. Filosofien bak er dokumentert [her](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).

Dokumentasjonen vår innes i `doc/architecture/decisions`

### Generere dokumentasjon

Du kan, men du må ikke, bruke et verktøy for å generere markdown filer som ADRs. F.eks: [adr-tools](https://github.com/npryce/adr-tools)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

[Team Personoversikt](https://github.com/navikt/info-team-personoversikt)
