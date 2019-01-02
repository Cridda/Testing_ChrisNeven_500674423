declare module '*.svg' {
    const content: any;
    export default content;
}

// real node-fetch clashes with apollo-link-http, so manually define it as globalfetch here.
declare module 'node-fetch' {
    const fetch: GlobalFetch['fetch'];
    export default fetch;
}

declare module 'graphql-faker';
