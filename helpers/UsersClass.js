class Users{
    constructor(){
        this.users = []
    }

    addUserData(id, name, room){
        this.users.push({id, name, room})
        return this.users
    }

    getUsersList(room){
        return this.users.map(user => {
            if(user.room === room) return user.name
        })
    }
}

module.exports = {Users}