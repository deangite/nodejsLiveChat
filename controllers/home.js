
module.exports = function(async, Club, _){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage)
        },
        homePage: (req, res) => {
            async.parallel([
                callback => {
                    Club.find({}, (err, result) => {callback(err, result)})
                },
                callback => {
                    Club.aggregate([
                        { $group: { _id: "$country" } },
                        { $sort: {_id: 1} }
                    ], (err, newResult) => {
                        callback(err, newResult)
                    })
                }
            ],(err, results) => {
                const res1 = results[0]
                const res2 = results[1]
                const newData = _.chunk(res1, 3)
                res.render('home', {title: 'Chat App - Home', data: newData, countries: res2})
            })
        }
    }
}