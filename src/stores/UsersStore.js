import { decorate, observable, computed, flow, action } from 'mobx'
import axios from 'axios'

export default decorate(class {
    users = []

    get getUserInfo(){
        return this.users
    }

    fetchUsers = flow(function* (arg){
        const fetched = yield axios('https://jsonplaceholder.typicode.com/users') 
        this.users = fetched.data 
    })
},{
    users: observable,
    getUserInfo: computed,
    fetchUsers: action
});

