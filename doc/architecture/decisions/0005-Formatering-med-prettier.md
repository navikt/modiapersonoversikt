# 5. Automatisk formatering av kode med prettier

Date: 2019-02-27

## Status

Accepted

## Context

Ulike innstillinger i IDEAer har tidligere ført til mye white-space og andre uvensentlige endringer som kan gjøre PRer tunge å lese.
I tillegg kan forskjellige utvikleres kodestil gjøre at forskjelige deler av kodebasen ser annerledes ut, noe som kan gjøre den tyngre å lese.

## Løsning

Vi tar ibruk prettier som automatisk formaterer koden ved commit.

Prettier er svært mye brukt og har mye bra feedback i miljøet.
Det vil sørge for at koden vår vil ligge nærmere en etablert standard for hvordan kode skal se ut, og da blir det også lettere for nye utviklere å sette seg inn i kodebasen.

## Bruk

```
git commit
```

Prettier kjøres automatisk ved `git commit` vha `husky` og `lint-staged`.

### Oppsett

```package.json
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
        }
    },
    "lint-staged": {
        "*.{js,ts,tsx,json,css,md}": [
            "prettier --write",
            "git add"
        ]
    }
```

## Consequences

Prettier vil endre koden din når du commiter. Dette kan virke frustrerende i starten,
men erfaring fra andre team tilsier at det er vel verdt det siden man ender opp med en standarisert kodestil.

Prettier har lite mulighet for config, men dette er et bevisst valg. Med færre valgmuligheter får vi mindre tid til å krangle og mer tid til å kode. Yey!

![](https://media.giphy.com/media/bTvCkBTQDIPyE/giphy.gif)
