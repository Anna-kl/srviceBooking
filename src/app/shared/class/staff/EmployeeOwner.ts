export class  EmployeeOwner {
    firstname: string;
lastname: string;
middlename: string;
 phone: string;
id: number;
email: string;
 birthday: Date;
constructor(firstname: string, lastname: string, middlename: string, phone: string,
            email: string,   birthday: Date, id: number) {
    this.birthday = birthday;
    this.email = email;
    this.middlename = middlename;
    this.firstname = firstname;
    this.phone = phone;
    this.lastname = lastname;
    this.id = id;
}
}
