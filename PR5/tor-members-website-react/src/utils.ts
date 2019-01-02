export const readToken = () => {
    try {
        return localStorage.getItem('token');
    } catch (e) {
        return null;
    }
};

export const setToken = (token: string) => {
    // First check if there already is a token
    if (readToken()) {
        localStorage.removeItem('token');
    }
    localStorage.setItem('token', token);
};

/**
 * Util function to remove typename from the object. Apollo issue: https://github.com/apollographql/apollo-client/issues/2160
 * @param value object to remove typename from
 */

export const removeTypename: any = (value: any) => {
    if (value === null || value === undefined) {
        return value;
    } else if (Array.isArray(value)) {
        return value.map(v => removeTypename(v));
    } else if (typeof value === 'object') {
        const newObj: any = {};
        Object.entries(value).forEach(([key, v]) => {
            if (key !== '__typename') {
                newObj[key] = removeTypename(v);
            }
        });
        return newObj;
    }
    return value;
};
