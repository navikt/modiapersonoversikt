export interface ArrayGroup<T> {
    category: string;
    array: T[];
}

export interface GroupedArray<T> extends Array<ArrayGroup<T>> {}

export function groupArray<T>(array: T[], getGroupCategoryForElement: (element: T) => string): GroupedArray<T> {
    return array.reduce((acc: GroupedArray<T>, arrayEntry) => {
        const currentCategory = getGroupCategoryForElement(arrayEntry);
        const categoryIndex = acc.findIndex(group => group.category === currentCategory);
        if (categoryIndex >= 0) {
            acc[categoryIndex].array.push(arrayEntry);
        } else {
            acc.push({
                category: currentCategory,
                array: [arrayEntry]
            });
        }
        return acc;
    }, []);
}

export type Group<T> = { [key: string]: Array<T> };
export function groupBy<T>(fn: (value: T) => string): (acc: Group<T>, value: T) => Group<T> {
    return (acc: Group<T>, element: T) => {
        const key = fn(element);
        const group: Array<T> = acc[key] || [];
        group.push(element);
        acc[key] = group;
        return acc;
    };
}
