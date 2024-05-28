const url = 'https://json-storage-api.p.rapidapi.com/datalake';
const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'c19deb7c3fmshd663226d72587d9p146504jsn3428b82c941d',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
};

export const createUser = async (email, password, name) => {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "@type": "CreateAction",
            Result: {
                "@type": "DataLakeItem",
                Creator: {
                    "@type": "UserAccount",
                    Identifier: "Admin"
                },
                Name: "Users",
                Identifier: email,
                About: {
                    "@type": "UserDetails",
                    Name: name,
                    Email: email,
                    Password: password,
                    Accounts: {
                        Saving: {
                            AccountNumber: new Date().valueOf(),
                            Transactions: []
                        }
                    }
                }
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ActionStatus === 'CompleteActionStatus') {
                return {success: true, message: null};
            } else {
                return {success: false, message: 'Something went wrong. Please try again.'};
            }
        })
        .catch(error => {
            return {success: false, message: error};
        });
};

export const readUser = async (email) => {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "@type": "SearchAction",
            Object: {
                "@type": "Filter",
                FilterItem: {
                    "@type": "DataLakeItem",
                    Creator: {
                        "@type": "UserAccount",
                        Identifier: "Admin"
                    },
                    Name: "Users",
                    Identifier: email
                }
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.Result.NumberOfItems > 0) {
                return {success: true, message: null, user: data.Result.ItemListElement[0].Item};
            } else {
                return {success: false, message: 'Account not found.', user: null};
            }
        })
        .catch(error => {
            return {success: false, message: error, user: null};
        });
};

export const updateUser = async (user) => {
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "@type": "UpdateAction",
            Result: user
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ActionStatus === 'CompleteActionStatus') {
                return {success: true, message: null};
            } else {
                return {success: false, message: 'Something went wrong. Please try again.'};
            }
        })
        .catch(error => {
            return {success: false, message: error};
        });
};

export const deleteUser = async (email) => {
    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "@type": "DeleteAction",
            Object: {
                "@type": "DataLakeItem",
                Creator: {
                    "@type": "UserAccount",
                    Identifier: "Admin"
                },
                Name: "Users",
                Identifier: email
            }
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ActionStatus === 'CompleteActionStatus') {
                return {success: true, message: null};
            } else {
                return {success: false, message: 'Something went wrong. Please try again.'};
            }
        })
        .catch(error => {
            return {success: false, message: error};
        });
};