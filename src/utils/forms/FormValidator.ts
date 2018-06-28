import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';

export interface Valideringsregel<T> {
    felt: keyof T;
    feilmelding: string;
    validator: (input: T) => boolean;
}

export interface ValideringsResultat<T> {
    formErGyldig: boolean;
    felter: FormValidering<T>;
}

export interface FeltValidering {
    erGyldig: boolean;
    feilmeldinger: string[];
    skjemafeil: SkjemaelementFeil | undefined;
}

type FormValidering<T> = {
    [P in keyof T]: FeltValidering;
};

export default class FormValidator<T> {

    private regler: Valideringsregel<T>[];

    constructor(regler: Valideringsregel<T>[]) {
        this.regler = regler;
    }

    valider(t: T): ValideringsResultat<T> {
        return this.validate(t);
    }

    private validate(obj: T): ValideringsResultat<T> {
        let formErGyldig = true;
        let result = this.settAlleFelterTilGyldig(obj);

        this.regler.forEach(regel => {

            // Hvis et optional-felt i interfacet er fraværende
            if (!result[regel.felt]) {
                result[regel.felt] = {
                    erGyldig: true,
                    feilmeldinger: [],
                    skjemafeil: undefined
                };
            }

            const validering = regel.validator(obj);
            if (!validering) {
                result[regel.felt].erGyldig = false;
                result[regel.felt].feilmeldinger.push(regel.feilmelding);
                formErGyldig = false;
            }
        });

        const feltValideringer = this.sammenslåFeilmeldinger(result);

        return {
            formErGyldig: formErGyldig,
            felter: feltValideringer
        };
    }

    private settAlleFelterTilGyldig(obj: T) {
        let result = {} as FormValidering<T>;

        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }
            result[key] = {
                erGyldig: true,
                feilmeldinger: [],
                skjemafeil: undefined
            };
        }
        return result;
    }

    private sammenslåFeilmeldinger(felt: FormValidering<T>) {
        for (const key in felt) {
            if (!felt.hasOwnProperty(key)) {
                continue;
            }
            const skjemafeil = this.getSkjemafeil(felt[key].feilmeldinger);

            felt[key].skjemafeil = skjemafeil;
        }
        return felt;
    }

    private getSkjemafeil(feilmeldinger: string[]) {
        if (feilmeldinger.length === 0 ) {
            return undefined;
        }

        return {
            feilmelding: feilmeldinger.join('. ')
        };
    }
}
