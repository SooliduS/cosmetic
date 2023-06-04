const filterOrders = (req) => {
    const { name, melliCode, level, sort , page , limit } = req.query;

    // set page
    let p = 1;
    if (page) p = page;

    // set filters
    const filter = {};
    if (name) {
        filter.$or = [
            { firstname: { $regex: name } },
            { lastname: { $regex: name } },
            { username: { $regex: name } },
        ];
        // filter.username=name
    }
    if (melliCode) {
        filter.melliCode = { $regex: melliCode };
    }
    if (level) filter.level = Number(level);
    //set sort
    let s;
    if (sort === 'leveluptodown') s = { level: -1 };
    if (sort === 'leveldowntoup') s = { level: 1 };
    if (sort === 'name') s = { username: 1 };
    if (sort === 'roles')
        s = {
         'roles.Admin':-1,
         'roles.Editor':-1,
         'roles.Salesman':-1,
         'roles.User':-1
        };

    //set limit
    let l;
    if (limit) l = limit;
    else l = 30;

    return { page: p, sort: s, filter, limit: l };
};

module.exports = filterOrders;
