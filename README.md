# Modiapersonoversikt

![](https://github.com/navikt/modiapersonoversikt/workflows/Build%2C%20push%2C%20and%20deploy/badge.svg?branch=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og
saksbehandlere oversikt over brukeres forhold til NAV.

## Komme i gang

### Miljøvariabler

Endring av miljøvariabler for lokal utvikling skal gjøres i `.env.development`.

-   `PORT` kommer fra create-react-app og styrer hvilken port devserveren starter på. Default: 3000
-   `REACT_APP_MOCK_ENABLED` styrer hvorvidt fetch-mock skal være aktivert
-   `REACT_APP_HODE_URL` styrer hvor dekoratøren hentes fra

**NB** Det skal ikke være nødvendig med endringer i disse filene for å få startet appen.

### Starte appen lokalt

```console
npm i
npm run start
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

-   Jan-Eirik B. Nævdal, jan.eirik.b.navdal@nav.no
-   Nicklas Utgaard, nicklas.utgaard@nav.no
-   Andreas Bergman, andreas.bergman@nav.no
-   Ankur Tade, ankur.tade@nav.no

### For NAV-ansatte

Henvendelser kan sendes via Slack i kanalen #team-personoversikt.
