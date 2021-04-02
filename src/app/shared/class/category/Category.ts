export class Category {
    id: number;
level: number;
name: string;
parent: number;
constructor( id: number, level: number, name: string, parent: number) {
    this.id = id;
    this.level = level;
    this.name = name;
    this.parent = parent;
}
}

export class MultiCategery {
    id_item: number;
    item_text: string;

    constructor(category: Category) {
        this.id_item = category.id;
        this.item_text = category.name;
    }
}
