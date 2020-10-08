export class Category {
    id: number;
level: number;
name: number;
parent: number;
constructor( id: number, level: number, name: number, parent: number) {
    this.id = id;
    this.level = level;
    this.name = name;
    this.parent = parent;
}
}
