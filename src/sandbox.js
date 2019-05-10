const getInf = () => ({
    mas: [1,2,3],
    then(onFulfilled, onRejected) {
        if (this.mas.length) {
            onFulfilled(this.mas.shift())
        } else {
            onRejected('aa')
        }
    }
});



(async () => {

    const m = getInf();
    console.log(m)
    try {
        console.log(await m);
        console.log(await m);
        console.log(await m);
        console.log(await m);
    } catch (err) {
        console.log(err);
    }
})();

let b = {
    a: 'a',
    toString(){
        return 'str'
    },
    valueOf(){
        return 1
    }
}

let str = b + 'a'
let obj = { [b]: 'a'}
let numb = +b

console.log(b)
console.log(str)
console.log(obj)
console.log(numb)

function add(a){
    let res = a;
    let func = b => {
        res = a + b;
        return func;
    }

    func.valueOf = () => res;
    func.toString = () => 'res';
    return func;
}

console.log( 1 + add(2)(3) )