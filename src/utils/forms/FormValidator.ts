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
    feilmelding: string[];
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
                    feilmelding: []
                };
            }

            const validering = regel.validator(obj);
            if (!validering) {
                result[regel.felt].erGyldig = false;
                result[regel.felt].feilmelding.push(regel.feilmelding);
                formErGyldig = false;
            }
        });

        return {
            formErGyldig: formErGyldig,
            felter: result
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
                feilmelding: []
            };
        }
        return result;
    }
}
