# 4. Typesikker rest-store i Redux

Date: 2018-08-11

## Status

Accepted

## Context

Etter bump av Redux og sterkere krav på typesikring på reducere har vi måttet omskrive måten vi aksesserer data fra REST i storen

## Løsning

For å følge prinsippet "make the impossible impossible" ble det valgt å trekke data og error ut i sub-klasser. Slik er ikke data en gyldig property å be om, med mindre status er success og dataen er veldefinert som korrekt type.

```typescript
export interface RestReducer<T> {
    status: STATUS
}

export interface Success<T> extends RestReducer<T> {
    status: STATUS.SUCCESS;
    data: T;
}

export interface NotStarted<T> extends RestReducer<T> {
    status: STATUS.NOT_STARTED;
}
.
.
.
export interface Failed<T> extends RestReducer<T> {
    status: STATUS.FAILED;
    error: string;
}

```

Med en reducer på formen

```typescript
reducer: (state : RestReducer<T> = initialState, action: Action) : RestReducer<T> => {
    .
    .
    .
    case actionTypes.FINISHED:
        return {
            status: STATUS.SUCCESS,
            data: (<FetchSuccess<T>> action).data
        } as Success<T> ;
    case actionTypes.FAILED:
        return {
            status: STATUS.FAILED,
            error: (<FetchError> action).error
        } as Failed<T> ;
    .
    .
    .
}
```

For å få tak i data/error-objektet må man nå teste på typen med en Typescrpt typeguard:

```typescript
if (isSuccess(state.restEndepunkter.landReducer)) {
    state.restEndepunkter.landReducer.data;
}
```

Som typesikrer objektet som et Success-objekt for resten av grenen.

I TSX-kode derimot tar vi i bruk Innholdslasteren:

```Typescript
<Innholdslaster avhengigheter={[this.props.saksoversiktReducer]}>
    <SakstemaVisning
        sakstemaWrapper={(this.props.saksoversiktReducer as Loaded<SakstemaWrapper>).data}
        oppdaterSakstema={this.oppdaterSakstema}
        valgtSakstema={this.state.valgtSakstema}
    />
</Innholdslaster>
```

Her er det viktig å vite at det er ditt eget ansvar å huske å wrappe alle komponenter som bruker restReducer-props i en Innholdslaster. Det er også viktig å forstå at "data" propertyen i dette tilfellet kan være undefined i de tilfellene hvor dataen ikke har ankommet og innholdslaster ikke rendrer children. Aksesser kun de propsene til data internt i komponenten som blir wrappet av Innholdslaster.

####Utrygg bruk:

```Typescript
<Innholdslaster avhengigheter={[this.props.saksoversiktReducer, this.props.baseUrlReducer]}>
    <SakstemaVisning
        sakstemaWrapper={(this.props.saksoversiktReducer as Loaded<SakstemaWrapper>).data.sakstema} //Kan kaste runtime feil!
        ...
    />
</Innholdslaster>
```
