export class SendServices {
id: number;
price: number;
name: string;
descride: string;
minutes: number;
category: string;
subcategory: string;
constructor(id: number,  price: number, name: string,   descride: string,   minutes: number,
            category: string, subcategory: string) {
    this.category=category;
    this.descride=descride;
    this.id=id;
    this.minutes=minutes;
    this.name=name;
    this.price=price;
    this.subcategory = subcategory;
}
}
