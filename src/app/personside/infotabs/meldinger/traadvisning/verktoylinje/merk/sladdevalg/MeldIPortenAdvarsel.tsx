import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

interface Props {
    className?: string;
}

function MeldIPortenAdvarsel(props: Props) {
    const className = props.className ?? 'blokk-xxs';
    return (
        <AlertStripeAdvarsel className={className}>
            Sak om feilregistrering/sladding må meldes i
            <a
                href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1481"
                target="_blank"
                rel="noopener noreferrer"
            >
                porten
            </a>
            .
        </AlertStripeAdvarsel>
    );
}

export default MeldIPortenAdvarsel;
