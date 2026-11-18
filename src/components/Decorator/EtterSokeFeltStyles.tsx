export const etterSokeFeltStyles = `
  .knapper_container { display: flex; align-items: center; gap: 0.25em; }

  .oppdateringslogg {
    position: relative;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: white;
    cursor: pointer;
    border: 0.1rem white solid;
    border-radius: 50%;
    padding: 0;
  }
  .oppdateringslogg:hover { background-color: white; color: var(--ax-text-neutral); }
  .oppdateringslogg:focus { outline: none; box-shadow: 0 0 0 3px #ffbd66; }
  .oppdateringslogg__ikon { pointer-events: none; width: 1.3em; display: flex; align-items: center; justify-content: center;}
  .oppdateringslogg__ikon svg { width: 2em; }
  .oppdateringslogg__ulestindikator { display: none; position: absolute; top: -2px; right: -4px; width: 0.75em; height: 0.75em; border-radius: 100%; background: #ba3a26; }
  .oppdateringslogg--uleste .oppdateringslogg__ulestindikator { display: block; }

  .personsok-button {
    width: 2em; height: 2em; border-radius: 2em;
    background: none; border: none; font-size: 1em;
    padding: 0; background-color: white; cursor: pointer;
  }
  .personsok-button span {
    color: var(--ax-text-neutral);
    width: 34px; height: 34px; border-radius: 34px;
    text-align: center; vertical-align: middle;
    display: inline-block; padding-top: 6px; pointer-events: none;
  }
  .personsok-button:hover { background-color: var(--ax-bg-accent-strong-hover); outline: none; }
  .personsok-button:hover span { color: white; }
  .personsok-button:focus { outline: none; box-shadow: 0 0 0 3px #ffbd66; }

  #ny-modia-knapp { width: 2em; height: 1.8em; border-radius: 6px; border-width: 1px; border-color: white; font-size: 1.2em; cursor: pointer; display: flex; align-items: center; margin-left: 6px; }
  #ny-modia-knapp:hover { background-color: var(--ax-bg-neutral-moderate); outline: none; cursor: pointer; }
  #ny-modia-knapp span { margin: auto; font-size: 1.1em }
  #ny-modia-knapp:hover span { color: black;}
  #ny-modia-knapp:focus { outline: none; box-shadow: 0 0 0 3px #ffbd66; border: none }
  #dropdown-container { display: flex; align-items: center; }
`;
