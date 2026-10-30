---
applyTo: "**"
excludeAgent: "cloud-agent"
---

# Code review

## Avgrensning

- Prioriter konkrete feil introdusert av endringen. Beskriv utløsende scenario og konsekvens, og skill dokumenterte feil fra usikkerhet.
- Les relevante kallesteder og tester før du rapporterer et funn. Ikke foreslå formatering som Biome håndterer, eller refaktorering uten en konkret feil.
- Prioriter `/new`, men kontroller begge løsningene når delt kode endres. Ikke krev migrering av legacy-kode utenfor PR-formålet.

## Kontrollpunkter

- Ved person- eller enhetsbytte: kontroller at data, valgte detaljer og pågående handlinger tilhører riktig kontekst, også når API-svar kommer etter byttet.
- Ved API-endringer: kontroller query-nøkler og at mutasjoner oppdaterer eller invaliderer berørte data. Følg mønstrene i `src/lib/clients/modiapersonoversikt-api.ts`.
- Skill mellom lasting, tomme resultater, manglende tilgang og tekniske feil. Ikke presenter mislykkede handlinger som vellykkede, heller ikke ved delvis suksess som feil i journalføring.
- Flagg nye lekkasjer av personopplysninger, meldingsinnhold eller tokens til logger, analytics og unødvendig nettleserlagring.
- Kontroller at eksisterende tilgangshåndtering bevares. Skjult UI erstatter ikke tilgangskontroll i API-et. Ikke påstå backend-feil uten grunnlag i backend-koden.
- Ved endret datavisning: kontroller datoavgrensninger, filtrering, sortering, beløp og manglende verdier.
- Ved UI-endringer: kontroller tastaturbetjening, tilgjengelige navn, fokus og kobling mellom skjemafelt og feilmeldinger. Sammenlign Aksel-bruk og komponentstørrelser med tilsvarende flater.
- Flagg manglende tester for konkrete regresjonsscenarioer. Kontroller at snapshot-endringer viser ønsket atferd, ikke skjuler feil.
