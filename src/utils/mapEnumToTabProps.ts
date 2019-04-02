import { TabProps } from 'nav-frontend-tabs/lib/tab';

function bareEnumNavn(enumKeys: string[]) {
    return enumKeys.slice(enumKeys.length / 2, enumKeys.length);
}

export function mapEnumToTabProps(myEnum: {}, selected?: {}): TabProps[] {
    const keys = Object.keys(myEnum);
    return bareEnumNavn(keys).map(key => ({
        label: key,
        aktiv: selected === myEnum[key]
    }));
}
