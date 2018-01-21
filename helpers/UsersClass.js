class Users{
    constructor(){
        this.users = []
    }

    addUserData(id, name, room){
        this.users.push({id, name, room})
        return this.users
    }

    getUser(id){
        return this.users.find(userId => userId === id)
    }

    getUsersList(room){
        console.log(this.users)
        return this.users.map(user => {
            if(user.room === room && this.getUser(user.id)) {
                return user.name
            }
        })
    }
}

module.exports = {Users}