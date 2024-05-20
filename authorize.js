

const authorize = (req, res, next) => {
    // const { user } = req.query
    // if (user === 'Bilal') {
    //     req.user = { name: 'Bilal', id: 3 }
    //     console.log('authorize')
    //     next()
    // } else {
    //     res.status(401).send('Unauthorize')
    // }
    next()

}

module.exports = authorize