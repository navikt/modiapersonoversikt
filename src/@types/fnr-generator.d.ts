declare module 'fnr-generator' {
    export default function fnr(date: Date): Generator;

    interface Generator {
        next(): { value: string };
    }
}
