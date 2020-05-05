import { useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { loggError } from '../../../utils/logger/frontendLogger';
import useFeatureToggle from '../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';

export interface DraftContext {
    [key: string]: string;
}

export interface Draft {
    owner: string;
    content: string;
    context: DraftContext;
    created: string;
}

interface DraftSystem {
    update(content: string): void;
    remove(): void;
}

function useDraft(context: DraftContext, ifPresent: (draft: Draft) => void = () => {}): DraftSystem {
    const enabled = useFeatureToggle(FeatureToggles.BrukKladd).isOn ?? false;
    const update = useCallback(
        debounce((content: string) => {
            if (!enabled) {
                return;
            }

            fetch('/modiapersonoversikt-draft/api/draft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, context })
            }).catch((error: Error) => {
                loggError(error, 'Feil ved oppdatering av draft', { context });
            });
        }, 500),
        [context, enabled]
    );

    const remove = useCallback(() => {
        if (!enabled) {
            return;
        }
        fetch('/modiapersonoversikt-draft/api/draft', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(context)
        }).catch((error: Error) => {
            loggError(error, 'Feil ved sletting av draft', { context });
        });
    }, [context, enabled]);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const queryParams = Object.entries(context)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        fetch(`/modiapersonoversikt-draft/api/draft?exact=true&${queryParams}`)
            .then(resp => resp.json())
            .then((json: Array<Draft>) => {
                if (json.length > 0) {
                    ifPresent(json[0]);
                }
            })
            .catch((error: Error) => {
                loggError(error, 'Feil ved uthenting av draft', { context });
            });
    }, [context, ifPresent, enabled]);

    return useMemo(
        () => ({
            update,
            remove
        }),
        [update, remove]
    );
}

export default useDraft;
