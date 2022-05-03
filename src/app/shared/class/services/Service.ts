export class Service {
    describe: string;
    category: number;
    subcategory?: number;
    categoryLevel2?: number;
    minutes: number;
    name: string;
    price: number;
    id: number;

    constructor(describe: string,  minutes: number, name: string,
                price: number, id: number,
                category: number,
                subcategory?: number,
                categoryLevel2?: number,) {
        this.category = category;
        this.describe = describe;
        this.id = id;
        this.minutes = minutes;
        this.name = name;
        this.price = price;
        this.subcategory = subcategory;
        this.categoryLevel2 = categoryLevel2;
    }
}
