function getcookie(req) { 
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const [name, value] = item.trim().split('=');
            return { ...res, [name]: value };
        }, {});
        res.locals.cookie = values;
    }
    else res.locals.cookie = {};
}

module.exports = getcookie