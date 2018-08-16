/*
* Kopiert fra PAM stillingssøk RestoreScroll
*
* Checkboxer og radioknapper fra nav-frontend skaper rar oppførsel ved onClick. Siden "hopper" da litt opp.
* Det kan virke som elementene prøver å sette seg selv i fokus ved å kalle "scrollTo" på window. Har ikke
* funnet implementasjonen i nav-frontend-moduler, men funksjonen restoreScroll kan motvirke denne oppførselen.
*
* */

export function restoreScroll() {
    try {
        const scrollTop = sessionStorage.getItem('scrollTop');
        if (scrollTop && scrollTop !== null) {
            sessionStorage.removeItem('scrollTop');
            setTimeout(() => {window.scrollTo(0, parseInt(scrollTop, 10)); }, 10);
        } else {
            window.scrollTo(0, 0);
        }
    } catch (error) {
        // Ignore any session storage error
    }
}
