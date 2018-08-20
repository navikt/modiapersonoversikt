export interface ArrayGroup<T> {
    category: string;
    array: T[];
}

export interface GroupedArray<T> extends Array<ArrayGroup<T>> {}

export function groupArray<T>(array: T[], getGroupCategoryForElement: (element: T) => string): GroupedArray<T> {
    return array.reduce(
        (acc: GroupedArray<T>, arrayEntry) => {
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
        },
        []);
}
