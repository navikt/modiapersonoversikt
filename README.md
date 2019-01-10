# Modiapersonoversikt [![Build Status](https://travis-ci.org/navikt/modiapersonoversikt.svg?branch=master)](https://travis-ci.org/navikt/modiapersonoversikt) [![Maintainability](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/maintainability)](https://codeclimate.com/github/navikt/modiapersonoversikt/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/test_coverage)](https://codeclimate.com/github/navikt/modiapersonoversikt/test_coverage)

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og
saksbehandlere oversikt over brukeres forhold til NAV.

## Komme i gang

### Konfiguere miljøvariabler

Opprett filen `.env` med følgende innhold:

```shell
REACT_APP_MODIA_URL=https://example.com # URL til backend
REACT_APP_MOCK_ENABLED=true # For å styre om applikasjonen skal bruke mock
REACT_APP_HODE_URL=https://example.com/head.min.js # URL til navigasjonsmenyen
PORT=80 # Port som nginx skal lytte på når den kjører i docker-containeren. Kan ikke være 80 på Heroku.
```

### Starte appen lokalt

```console
npm install
npm run build
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

* Daniel Winsvold, daniel.winsvold@nav.no
* Jan-Eirik B. Nævdal, jan.eirik.b.navdal@nav.no
* Jørund Amsen, jorund.amsen@nav.no
* Ketil S. Velle, ketil.s.velle@nav.no
* Richard Borge, richard.borge@nav.no

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personoversikt.
