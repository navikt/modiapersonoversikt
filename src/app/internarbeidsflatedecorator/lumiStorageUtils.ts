export const lumiStorageStrategy = import.meta.env.PROD ? 'localStorage' : 'none';

const GAMMEL_MODIA_SURVEY_ID = 'modiapersonoversikt-bytt-til-gammel';
const GAMMEL_MODIA_STORAGE_KEY = `lumi-dismissed-${GAMMEL_MODIA_SURVEY_ID}`;

export function isGamleModiaFeedbackInCooldown(): boolean {
    if (!import.meta.env.PROD) return false;
    try {
        const raw = localStorage.getItem(GAMMEL_MODIA_STORAGE_KEY);
        if (!raw) return false;
        const parsed = JSON.parse(raw) as { resumeAt?: string } | null;
        if (!parsed?.resumeAt) return false;
        const resumeTime = Date.parse(parsed.resumeAt);
        if (Number.isNaN(resumeTime)) return false;
        return resumeTime > Date.now();
    } catch {
        return false;
    }
}
