# Modiapersonoversikt [![Build Status](https://travis-ci.org/navikt/modiapersonoversikt.svg?branch=master)](https://travis-ci.org/navikt/modiapersonoversikt) [![Maintainability](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/maintainability)](https://codeclimate.com/github/navikt/modiapersonoversikt/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/bc150401e4210a34fc4f/test_coverage)](https://codeclimate.com/github/navikt/modiapersonoversikt/test_coverage)

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og
saksbehandlere oversikt over brukeres forhold til NAV.

## Komme i gang

### Kjøre appen

Opprett filen `.env` med følgende innhold:

```shell
REACT_APP_MODIA_URL=https://example.com # URL til backend
REACT_APP_MOCK_ENABLED=true # For å styre om applikasjonen skal bruke mock
REACT_APP_HODE_URL=https://example.com/head.min.js # URL til navigasjonsmenyen
PORT=80 # Port som nginx skal lytte på når den kjører i docker-containeren. Kan ikke være 80 på Heroku.
```

#### For utvikling

```console
npm install
npm run build
npm run start
```

#### Førstegangsoppsett for lokal npm publish (publish-local.sh)

Adduser kjøres med egen AD-bruker(liten forbokstav)+passord+epostadresse
Auth-token legges ikke i kildekontroll, få full config fra en annen i teamet

```console
npm install
npm adduser
npm config set //repo.adeo.no/repository/npm-internal/:_authToken=

./publish-local.sh
```

#### Storybook

```console
npm run storybook
```

#### Med docker

```console
docker build -t personoversikt .
docker run --env-file .env --name personoversikt -d -p 8080:80 personoversikt
```

---

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Daniel Winsvold, daniel.winsvold@nav.no
* Eigil Skjæveland, eigil.skjeveland@nav.no
* Jan-Eirik B. Nævdal, jan.eirik.b.navdal@nav.no
* Ketil S. Velle, ketil.s.velle@nav.no
* Joakim Lindquister, joakim.lindquister@nav.no
* Richard Borge, richard.borge@nav.no

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-oppfølging.
