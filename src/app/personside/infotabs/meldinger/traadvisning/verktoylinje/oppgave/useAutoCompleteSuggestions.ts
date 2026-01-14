import { useMemo } from 'react';

const shouldShowItemBasedOnInput = (value: string, item: string, input: string | null) => {
    if (!input || input === '') {
        return true;
    }
    if (value && input === value) {
        return true;
    }
    return item.toLowerCase().includes(input.toLowerCase());
};

export function useAutoCompleteSuggestions({
    value = '',
    input,
    topSuggestions,
    suggestions
}: {
    value?: string;
    input: string;
    topSuggestions?: string[];
    suggestions: string[];
}) {
    return useMemo(() => {
        const filteredSuggestions: string[] = [];
        const filteredTopSuggestions: string[] = [];

        if (topSuggestions) {
            for (const suggestion of topSuggestions) {
                if (shouldShowItemBasedOnInput(value, suggestion, input)) {
                    filteredTopSuggestions.push(suggestion);
                }
            }
        }

        for (const suggestion of suggestions) {
            if (shouldShowItemBasedOnInput(value, suggestion, input) && !topSuggestions?.includes(suggestion)) {
                filteredSuggestions.push(suggestion);
            }
        }

        return { filteredSuggestions, filteredTopSuggestions };
    }, [input, suggestions, topSuggestions, value]);
}
