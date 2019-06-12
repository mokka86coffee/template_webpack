type addAction = {|
    type: "add",
    data: {
        field: string
    },
    sucess: true
|};

type deleteAction = {|
    type: 'delete',
    data: string,
    error: string
|};

type modifyAction = {
    type: 'modify'
};

type Actions = addAction | deleteAction;

// let m: Actions;

let m: Actions = {
    type: 'delete',
    data: 'string',
    error: 'error'
};


function fn (obj: Actions) {
    console.log(str);
    if(obj.error) {
        const resp: ?boolean = obj.data.includes('error');
    }

    switch (obj.type){
        case 'add': return {str: 'red'};
        case 'delete': return {str: 'green'};
        default: 
            (obj: empty);
    }
}

//-----------------------------------------

type Response<T> = {
    posts: Array<T>
};

type User = {|
    name: number
|};

const data: Response<User> = {
    name: 'Abdul',
    posts: [{name: 2}]
};

console.log(data);

//-----------------------------------------

class Wrap<O: {|id: string|}, U> {
    data: O;
    data2: U
}

type obj = {|
    id: string 
|}
type obj2 = {
    id: string 
}

const wrap:Wrap<obj, obj2> = new Wrap();
console.log(wrap.data.id.includes('ss'));
console.log(wrap.data2.id.includes('ss'));

//---------------------------------------
/* $Exact */

type Fpp = {
    m: ?boolean
};

const fpp: $Exact<Fpp> = {
    m: null,
    // n: false
};

/* $Keys */

const langs = {
    eng: 'eng.json',
    fr: 'fr.json',
    ru: 'ru.json'
}

const lang: $Keys<typeof langs> = 'ru';

/* $Values */

const colors = /*::Object.freeze(*/{
    red: 'rgb(255, 0, 0)',
    green: 'rgb(0, 255, 0)',
    blue: 'rgb(0, 0, 255)',
}/*::)*/;

const color: $Values<typeof colors> = 'rgb(255, 0, 0)';

/* $ReadOnly */

type logginUsers = {
    name: string,
    age: number
};

// function logUser(user:{+name: string, +age: number}) {}
function logUser(user:$ReadOnly<logginUsers>) {} // неглубокое

/* $Shape */

type shapeUser = {
    name: string,
    key: string
}

function updateShapeUser(a: shapeUser, b: $Shape<shapeUser>){}
updateShapeUser({name: 'name', key: 'key'}, {name:'newname'});

/* $Diff */

type Pagination = {
    current: number,
    limit: number,
    offset: number,
    total: number
}

const defaultPaginationValues = {
    current: 1,
    limit: 10
}

function createPagination(
    config: $Diff<Pagination, typeof defaultPaginationValues>
    ):Pagination {
    const actualConfig = {
        ...defaultPaginationValues,
        ...config
    }

    return actualConfig;
}

createPagination({offset: 100, total: 200});

/* $Rest */
/* тоже что и $Diff только вместо создания подобия, исключает property */

/* $ProprtyType */

type ProductsTypes = {
    quanity: number,
    all: {
        veges: string,
        fruits: string
    }
}

type Products = $PropertyType<ProductsTypes, 'all'>;
const products: Products = {
    veges: '2',
    fruits: '1'
}

type ProductsVeges = $PropertyType<$PropertyType<ProductsTypes, 'all'>, 'veges'>;
const veges: ProductsVeges = '2';

/* $ElementType */
// Tricky потому что в типе получаемого значения, нужно указывать :* 
// также можно использовать readonly {+[key: string]: mixed}

type ItemsTypes = {
    quanity: number,
    all: {
        veges: string,
        fruits: string
    }
}

type ItemsAll = $PropertyType<ItemsTypes, 'all'>;

// function getItem<O: *, K: string>(o: O, key: K):$ElementType<O, K> {
function getItem<O: {+[key: string]: mixed}, K: string>(o: O, key: K):$ElementType<O, K> {
    return o[key];
}

const itemsAll: ItemsAll = {
    veges: 'potatoes',
    fruits: 'apples'
}

const resultItemsAll = getItem(itemsAll, 'veges');

/* $Array */

type FiguresCoordsTypes = 'square' | 'triangle' | 'random';

type CoordsType = [ number, number, FiguresCoordsTypes, null, void];
// type XCoordsType = $ElementType<CoordsType, 0>;
const XCoords: $ElementType<CoordsType, 0> = 0;
const YCoords: $ElementType<CoordsType, 1> = 0;
const FigureCoords: $ElementType<CoordsType, 2> = 'square';

/* $Array */



//----------------------

