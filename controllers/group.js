
module.exports = function(){
    return{
        SetRouting: function(router){
            router.get('/group/:name', this.getGroupPage)
        },

        getGroupPage: function(req, res) {
            const name = req.params.name
            res.render('groupchat/group', {title: "Chat App - Group", name: name})
        }
    }
}