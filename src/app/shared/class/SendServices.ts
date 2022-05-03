export class SendServices {
id: number;
price: number;
name: string;
descride: string;
minutes: number;
category: string;
subcategory: string;
categoryLevel2: string;
constructor(id: number,  price: number, name: string,   descride: string,   minutes: number,
            category: string, subcategory: string, categoryLevel2: string) {
    this.category=category;
    this.descride=descride;
    this.id=id;
    this.minutes=minutes;
    this.name=name;
    this.price=price;
    this.subcategory = subcategory;
    this.categoryLevel2 = categoryLevel2;
}
}
