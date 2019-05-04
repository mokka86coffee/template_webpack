import { decorate, observable, computed, flow, action } from 'mobx'

const store = new decorate(class {
    birds = ['chicken', 'sparrow', 'smth',  ]

    get getBirds(){
        return this.birds
    }
},{
    birds: observable,
    getBirds: computed
})

export default new store()
