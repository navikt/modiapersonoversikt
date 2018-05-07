Modiapersonoversikt [![Build Status](https://travis-ci.org/navikt/modiapersonoversikt.svg?branch=master)](https://travis-ci.org/navikt/modiapersonoversikt)
===================

Modiapersonoversikt er en intern arbeidsflate som gir veiledere og 
saksbehandlere oversikt over brukeres forhold til NAV.

# Komme i gang

## Kjøre appen

Opprett filen `.env` med følgende innhold:
```shell
REACT_APP_MODIA_URL=https://example.com # URL til backend for kjøring med npm
PERSONOVERSIKTAPI_URL=https://example.com # URL til backend for kjøring i docker
REACT_APP_HODE_URL=https://example.com/head.min.js # URL til navigasjonsmenyen for kjøring med npm
IADECORATOR_JS_URL=https://example.com/head.min.js # URL til navigasjonsmenyen for kjøring i docker
```

### For utvikling
```console
$ npm install
$ npm run start
```
### Storybook
```console
$ npm run storybook
```

### Med docker
```console
$ docker build -t personoversikt .
$ docker run --env-file .env --name personoversikt -d -p 8080:80 personoversikt
```

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Daniel Winsvold, daniel.winsvold@nav.no
* Eigil Skjæveland, eigil.skjeveland@nav.no
* Jan-Eirik B. Nævdal, jan.eirik.b.navdal@nav.no
* Ketil S. Velle, ketil.s.velle@nav.no
* Joakim Lindquister, joakim.lindquister@nav.no
* Richard Borge, richard.borge@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-oppfølging.
