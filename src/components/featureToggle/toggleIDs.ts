export enum FeatureToggles {
    VisPromptMeldingSending = 'modiapersonoversikt.vis-promt-naar-melding-sendes',
    JournalforUtenSvar = 'modiapersonoversikt.meldinger-uten-svar-kan-journalfores',
    NyModiaKnapp = 'modiapersonoversikt.ny-modia-knapp',
    InfotrygdSykepenger = 'modiapersonoversikt.infotrygd-sykepenger',
    SpokelseSykepenger = 'modiapersonoversikt.spokelse-sykepenger',
    /**
     * Styrer ny vs. gammel oversikt-side (`PersonlinjeDetails` vs. `PersonlinjeDetailsGammel`).
     *
     * Når denne fjernes må også duplikatene for gammelt design slettes:
     * `Details/Familie/{FamilieGammel,BarnGammel,ForeldreGammel,SivilstandGammel,componentsGammel}.tsx`,
     * `Details/VergemalGammel.tsx` og `Details/NavKontor/NavKontorGammel.tsx`.
     */
    NyOversiktDesign = 'modiapersonoversikt.ny-oversikt-design'
}
