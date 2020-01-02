# Modiapersonoversikt [![Build Status](https://travis-ci.org/navikt/modiapersonoversikt.svg?branch=master)](https://travis-ci.org/navikt/modiapersonoversikt) [![Maintainability](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/maintainability)](https://codeclimate.com/github/navikt/modiapersonoversikt/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/test_coverage)](https://codeclimate.com/github/navikt/modiapersonoversikt/test_coverage) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og
saksbehandlere oversikt over brukeres forhold til NAV.

## Komme i gang

### Konfiguere miljøvariabler

Opprett filen `.env` med følgende innhold:

```shell
# URL til backend
REACT_APP_MODIA_URL=https://modiabackend.nav
# For å styre om applikasjonen skal bruke mock
REACT_APP_MOCK_ENABLED=true
# URL til navigasjonsmenyen
REACT_APP_HODE_URL=https://navikt.github.io/internarbeidsflatedecorator
# Port som nginx skal lytte på når den kjører i docker-containeren. Kan ikke være 80 på Heroku.
PORT=3000
```

### Starte appen lokalt

```console
npm i
npm run start
```

### Bygge og kjøre via docker

```console
docker build -t personoversikt .
docker run --env-file .env --name personoversikt -d -p 8080:80 personoversikt
```

## Dokumentasjon

Vi bruker Architecture Decision Records (ADR) til å beskrive viktige arkitekturbeslutninger for vår app. Dette sjekkes inn i kildekoden og kan bidra til man i ettertid kan skjønne hvorfor koden har blitt sånn den har blitt. Filosofien bak er dokumentert [her](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).

Dokumentasjonen vår innes i `doc/architecture/decisions`

### Generere dokumentasjon

Du kan, men du må ikke, bruke et verktøy for å generere markdown filer som ADRs. F.eks: [adr-tools](https://github.com/npryce/adr-tools)

## Publisere npm-pakke

Modiapersonoversikt kan publiseres som en npm-modul og dras inn i modiabrukerdialog

### Førstegangsoppsett for lokal npm publish (publish-local.sh)

Adduser kjøres med egen AD-bruker(liten forbokstav)+passord+epostadresse
Auth-token legges ikke i kildekontroll, få full config fra en annen i teamet

```console
npm install
npm adduser
npm config set //repo.adeo.no/repository/npm-internal/:_authToken=

./publish-local.sh
```

---

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

-   Daniel Winsvold, daniel.winsvold@nav.no
-   Jan-Eirik B. Nævdal, jan.eirik.b.navdal@nav.no
-   Richard Borge, richard.borge@nav.no
-   Nicklas Utgaard, nicklas.utgaard@nav.no
-   Andreas Bergman, andreas.bergman@nav.no

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #personoversikt-intern.
Eksterne henvendelser kan sendes via Slack i kanalen #team-personoversikt.
