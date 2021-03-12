export class Service {
    describe: string;
    category: string;
    minutes: number;
    name: string;
    price: number;
    id: number;

    constructor(describe: string, category: string, minutes: number, name: string, price: number, id: number) {
        this.category = category;
        this.describe = describe;
        this.id = id;
        this.minutes = minutes;
        this.name = name;
        this.price = price;
    }
}
