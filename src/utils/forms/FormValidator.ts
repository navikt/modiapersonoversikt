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
    feilmelding: string;
}

type FormValidering<T> = {
    [P in keyof T]: FeltValidering;
};

export default class FormValidator<T> {

    private regler: Valideringsregel<T>[];

    constructor(regler: Valideringsregel<T>[]) {
        this.regler = regler;
    }

    validerRegel(regel: Valideringsregel<T>, obj: T): FeltValidering {
        const valideringsresultat = regel.validator(obj);
        return {
            erGyldig: valideringsresultat,
            feilmelding: valideringsresultat ? '' : regel.feilmelding
        };
    }

    valider(t: T): ValideringsResultat<T> {
        return this.validate(t);
    }

    private validate(obj: T): ValideringsResultat<T> {
        let result = {} as FormValidering<T>;
        let formErGyldig = true;
        for (const key in obj) {
            if (!obj.hasOwnProperty(key)) {
                continue;
            }

            const skjemafeil = this.getSkjemafeil(obj, key);

            const feilmelding = skjemafeil.map(validering => validering.feilmelding).join(', ');
            const feltHarSkjemafeil = skjemafeil.length !== 0;

            if (feltHarSkjemafeil) {
                formErGyldig = false;
            }

            result[key] = {
                erGyldig: !feltHarSkjemafeil,
                feilmelding
            };
        }

        return {
            formErGyldig: formErGyldig,
            felter: result
        };
    }

    private getSkjemafeil(obj: T, key: string) {
        return this.regler
            .filter(this.erSammeFeltPåObjekt(key))
            .map(this.validerObjekt(obj))
            .filter(this.kunInvalideValideringer);
    }

    private erSammeFeltPåObjekt(key: string) {
        return (regel: Valideringsregel<T>) => {
            return regel.felt.toString() === key;
        };
    }

    private validerObjekt(obj: T) {
        return (regel: Valideringsregel<T>) => this.validerRegel(regel, obj);
    }

    private kunInvalideValideringer(validering: FeltValidering) {
        return !validering.erGyldig;
    }

}
