#!/bin/sh
set +x
set -eu

cd -- "$(dirname -- "$0")/.."

for command in pnpm node; do
    if ! command -v "$command" >/dev/null 2>&1; then
        printf 'Mangler kommandoen %s.\n' "$command" >&2
        exit 1
    fi
done

if [ ! -t 0 ]; then
    printf 'Kjør skriptet i en interaktiv terminal for å lime inn tokenet.\n' >&2
    exit 1
fi

url='https://azure-token-generator.intern.dev.nav.no/api/obo?aud=dev-gcp:personoversikt:modiapersonoversikt'
if command -v open >/dev/null 2>&1; then
    browser=open
elif command -v xdg-open >/dev/null 2>&1; then
    browser=xdg-open
else
    printf 'Fant ingen standardnettleser. Åpne denne lenken manuelt:\n%s\n' "$url" >&2
    browser=''
fi

if [ -n "$browser" ] && ! "$browser" "$url"; then
    printf 'Kunne ikke åpne standardnettleseren. Sjekk nettleserinnstillingene dine.\n' >&2
    exit 1
fi

LOCAL_TOKEN=$(node scripts/read-local-token.mjs)
export LOCAL_TOKEN

printf 'Starter appen uten mockdata.\n'
exec pnpm run start:dev "$@"
