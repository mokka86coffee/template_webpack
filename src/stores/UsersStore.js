import { decorate, observable, computed, flow, action, runInAction } from 'mobx'
import axios from 'axios'

const store = decorate(class {
    users = [];

    get getUserInfo(){
        return this.users;
    }

    fetchUsers = flow(function* (){
        const fetched = yield axios('https://jsonplaceholder.typicode.com/users');
        this.users = fetched.data;
    });
},{
    users: observable,
    getUserInfo: computed,
    fetchUsers: action
});

class decStore {
    @observable users = [];

    @computed get getUserInfo(){
        return this.users;
    }

    @action
    fetchUsers = async () => {
        const fetched = await axios('https://jsonplaceholder.typicode.com/users');
        runInAction( () => 
           this.users = fetched.data
        );
    }
}

export default new decStore();
// export default new store();