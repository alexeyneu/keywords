import {useLayoutEffect, useState} from "react";

const queries = [
    '(max-width: 555px)'
]

export const UseMatchMedia = () => {
    const mediaQueriesLists = queries.map(item => matchMedia(item));
    const getValues = mediaQueriesLists.map(mq1 => mq1.matches);
    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () =>  setValues(getValues);

        mediaQueriesLists.map(mq1 => mq1.addEventListener('change', handler));
        return () => mediaQueriesLists.map(mq1 => mq1.removeEventListener('change', handler));
    });
    return ['isMobile'].reduce((acc: React.ReactNode, screen: string, index: React.ReactNode) => ({
        ...acc,
        [screen]: values[index],
    }), {});
}
