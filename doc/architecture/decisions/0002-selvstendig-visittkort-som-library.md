# 2. Selvstendig visittkort som library

Date: 2018-05-31

## Status

Accepted

## Context

Modiapersonoversikt (denne frontenden) blir utviklet som en selvstendig frontend som på sikt skal erstatte frontenden i dagens modiabrukerdialog. For å kunne levere fortløpende ny funksjonalitet til saksbehandlerene, ønsker vi å levere ofte og smått.

## Decision

Visittkortet dras inn som en enkeltstående react-komponent inn til modiabrukerdialog.

## Consequences

Vi publiserer en npm-modul som eksponerer StandAloneVisittkort som kan rendres som en selvstendig react-komponent.
