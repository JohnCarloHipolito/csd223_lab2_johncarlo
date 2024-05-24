export function readBody() {
    return {
        "@type": "SearchAction",
        Object: {
            "@type": "Filter",
            FilterItem: {
                "@type": "DataLakeItem",
                Creator: {
                    "@type": "UserAccount",
                    Identifier: "Admin"
                }
            }
        }
    };
}

export function createBody() {
    return {
        "@type": "CreateAction",
        Result: {
            "@type": "DataLakeItem",
            Creator: {
                "@type": "UserAccount",
                Identifier: "Admin"
            },
        }
    };
}

export function deleteBody() {
    return {
        "@type": "DeleteAction",
        Object: {
            "@type": "Filter",
            FilterItem: {
                "@type": "DataLakeItem",
                Creator: {
                    "@type": "UserAccount",
                    Identifier: "Admin"
                }
            }
        }
    };
}

export const storeUrl = 'https://json-storage-api.p.rapidapi.com/datalake';
export const storeHeader = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'c19deb7c3fmshd663226d72587d9p146504jsn3428b82c941d',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
};

export function prepareQuery(type, name, identifier) {
    let body = {};
    switch (type) {
        case 'read':
            body = {
                '@type': 'SearchAction',
                Object: {
                    "@type": "Filter",
                    FilterItem: {
                        "@type": "DataLakeItem",
                        Creator: {
                            "@type": "UserAccount",
                            Identifier: "ADMIN"
                        },
                    }
                }
            };
            break;
        case 'create':
            body = {
                "@type": "CreateAction",
                Result: {
                    "@type": "DataLakeItem",
                    Creator: {
                        "@type": "UserAccount",
                        Identifier: "ADMIN"
                    },
                }
            };
            break;
        case 'delete':
            body = {
                "@type": "DeleteAction",
                Object: {
                    "@type": "Filter",
                    FilterItem: {
                        "@type": "DataLakeItem",
                        Creator: {
                            "@type": "UserAccount",
                            Identifier: "ADMIN"
                        },
                    }
                }
            };
            break;
        default:
            console.log("Invalid type");
            break;
    }

    const url = 'https://json-storage-api.p.rapidapi.com/datalake';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'c19deb7c3fmshd663226d72587d9p146504jsn3428b82c941d',
            'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
        },
        body: body
    };

    return {url, options};
}


