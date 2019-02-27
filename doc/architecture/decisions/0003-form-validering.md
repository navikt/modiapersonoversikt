# 1. Form validering

Date: 2018-06-28

## Status

Accepted

## Context

Form validering av adresser, samt alle andre forms. Jeg gjorde en stor jobb på dette. Kopierer inn fra PR-en min her.

[Github PR 232](https://github.com/navikt/modiapersonoversikt/pull/232)

## Kopiert fra PR

Et nytt forsøk på validering av felter i forms. Dette er en annen måte å gjøre validering på enn i https://github.com/navikt/modiapersonoversikt/pull/230. Denne er basert på en [bloggpost](https://medium.com/code-monkey/client-side-form-validation-in-react-40e367de47ba) jeg kom over.

Fordelen med denne er at den ble mye mindre intrusive(påtrengende) en det andre alternativet. Her er det litt mer dropin av valideringen, du trenger ikke skrive om hele formen din. Ble sånn passe godt fornøyd med denne foran den andre, kom gjerne med tilbakemelding 👍

![](https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif)

Skriver litt om løsningen her, les om du vil :)

## Løsning

Løsningen er basert på en klasse, FormValidator, som er generisk og validerer objekter basert på typen den blir initialisert med.

```typescript
export default class FormValidator<T> {
    constructor(regler: Valideringsregel<T>[]);
}
```

Reglene som man ønsker å validere på sendes med i konstruktøren. Det 'geniale' i denne løsningen er via Typescript sin mapped types, hvor et interface blir speilet men med andre verdier som indikerer valideringsresultatet. Eksempelvis for gateadresse:

```typescript
interface Gateadresse {
    gatenavn: string;
    husnummer: string;
}
```

Valideringsresultatet av denne vil bli, uten at man trenger å definere et eget interface:

```typescript
{
  formErGyldig: false,
  felter: {
    gatenavn: {
       erGyldig: false,
       feilmelding: 'Gatenavn mangler'
    },
    husnummer: {
      erGyldig: true,
      feilmelding: ''
   }
 }
}
```

## Bruk

```typescript
// Felt er keyOf Gateadresse, dvs. at typescript klager hvis du sender inn noe som ikke finnes
const regel: Valideringsregel<Gateadresse> = {
    felt: 'gatenavn',
    feilmelding: 'Gatenavn kan ikke være tom',
    validator: (gateadresse: Gateadresse) => erIkkeTomStreng(gateadresse.gatenavn)
};

function validerGateadresse(gateadresse: Gateadresse) {
    return new FormValidator<Gateadresse>([regel]).valider(gateadresse);
}
```

### Use-case i en form

Når bruker forsøker å submitte, kjøres valideringen. Hvis valideringen feiler, settes valideringsresultatet på staten. Input-feltene får da dette gjennom props og kan velge å vise feilmelding.

Når bruker skriver noe igjen, kan man velge å sette valideringsresultatet til undefined, slik at feilmeldingen ikke lenger vises.

```typescript
const valideringsresultat = validerGateadresse(input.gateadresse);
if (!valideringsresultat.formErGyldig) {
    this.setState({
        midlertidigAdresseNorge: {
            ...this.state.midlertidigAdresseNorge,
            gateadresseValidering: valideringsresultat
        }
    });
    return;
}

this.props.endreNorskGateadresse(this.props.person.fødselsnummer, input.gateadresse);
```

```jsx
<Input
    bredde={'XXL'}
    label="Gateadresse"
    value={props.gateadresse.gatenavn}
    onChange={(event: ChangeEvent<HTMLInputElement>) =>
        props.onChange({ ...props.gateadresse, gatenavn: event.target.value })
    }
    feil={getSkjemafeilFraValidering(props.validering ? props.validering.felter.gatenavn : undefined)}
/>
```
