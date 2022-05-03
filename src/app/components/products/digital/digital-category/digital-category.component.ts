import {Component, OnInit, TemplateRef} from '@angular/core';import { digitalCategoryDB } from 'src/app/shared/tables/digital-category';import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';import {DataServices} from '../../../../shared/service/data.services';import {SendAuth} from '../../../../shared/class/auth/SendAuth';import {ServicesServices} from '../../../../shared/service/services.services';import {Answer} from '../../../../shared/class/helpers/Response';import {SendServices} from '../../../../shared/class/SendServices';import {FormArray, FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';import {CategoryServices} from '../../../../shared/service/category.services';import {Category} from '../../../../shared/class/category/Category';import Swal from 'sweetalert2';import {content} from '../../../../shared/routes/content-routes';import {Service} from '../../../../shared/class/services/Service';@Component({  selector: 'app-digital-category',  templateUrl: './digital-category.component.html',  styleUrls: ['./digital-category.component.scss'],  providers: [ServicesServices, CategoryServices]})export class DigitalCategoryComponent implements OnInit {    add = false;    images: any[];    SubCategory: any;    subcategory: any;    categoryLevel2: any;    categoriesLevel2: Category[];  constructor(private modalService: NgbModal, private dataservices: DataServices,              private services: ServicesServices, private formbuilder: FormBuilder,              private categories: CategoryServices) {      this.createForm();  }    get photos(): FormArray {        return this.ServicesControl.get('photos') as FormArray;    }  public closeResult: string;  public servicesdata = []  private user: SendAuth;  ServicesControl: FormGroup;  Category: Category[];  category: Category;    private modalReference: any;  public settings = {    actions: {      position: 'right',        delete: true,        add: false,        edit: true    },      mode: 'external',      delete: {          deleteButtonContent: 'Delete',          confirmDelete: true      },      edit: {          editButtonContent: '',          saveButtonContent: 'save',          cancelButtonContent: 'cancel',          confirmSave: true,      },    columns: {      name: {        title: 'Наименование'      },      price: {        title: 'Цена'      },      minutes: {        title: 'Длительность',      },      category: {        title: 'Категория',      }    },  };    // tslint:disable-next-line:no-shadowed-variable  open(content: any) {      this.add = true;      this.images = [];      this.categories.getCategoriesServices(this.user.token).subscribe(          (result: Answer) => {              if (result.status.code === 200) {                  this.Category = [];                  this.Category.push(new Category(-1, -1, 'Выберите категорию', -1));                  this.category = this.Category[0];                  this.SubCategory = [];                  this.SubCategory.push(new Category(-1, -1, 'Выберите подкатегорию', -1));                  if ((result.responce as Category[]).length !== 0) {                      this.Category.push(...result.responce as Category[]);                      this.categories.getSubCategory(2, this.category.id).subscribe(                          (resultSubCategory: Answer) => {                              this.SubCategory.push(...resultSubCategory.responce as Category[]);                          }                      );                  } else {                      this.categories.getOwnerCategories(this.user.token, 0, 0).subscribe(                          (categories: Category[]) => {                              this.Category.push(...categories);                              // categories.forEach(item => {                              //     this.categories.getOwnerCategories(this.user.token, item.id).subscribe(                              //         (subCateries: Category[]) => {                              //             this.SubCategory.push(...subCateries);                              //         });                              // });                          }                      );                  }                  this.ServicesControl = this.formbuilder.group({                      photos: [],                      name: '',                      price: 0,                      minutes: 0,                      describe: '',                      category: this.category,                      subcategory: this.SubCategory[0],                      categoryLevel2: this.SubCategory[0]                  });              }          }      );      this.modalReference = this.modalService.open(content);      this.modalReference.result.then((result) => {          this.closeResult = `Closed with: ${result}`;      }, (reason) => {          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;      });    //       , { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {    //   this.closeResult = `Closed with: ${result}`;    // }, (reason) => {    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;    // });  }  private getDismissReason(reason: any): string {    if (reason === ModalDismissReasons.ESC) {      return 'by pressing ESC';    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {      return 'by clicking on a backdrop';    } else {      return `with: ${reason}`;    }  }createForm(){    this.ServicesControl = this.formbuilder.group({        name: ['', Validators.required],        price: [0, Validators.required],        minutes: [0, Validators.required],        describe: [''],        category: [undefined, Validators.required],        subcategory: [undefined, Validators.required],        categoryLevel2: [undefined, Validators.required],        photos: this.formbuilder.array([])    });}  ngOnInit() {    this.dataservices.users.subscribe(result => {      this.user = result;      this.services.getServices(this.user.token).subscribe(    (result1: Answer) => {      if (result1.status.code === 200) {            this.servicesdata = result1.responce as SendServices[];      }    });    });  }    createItem(data): FormGroup {        return this.formbuilder.group(data);    }    detectFiles(event) {        const files = event.target.files;        if (files) {            for (const file of files) {                const reader = new FileReader();                reader.onload = (e: any) => {                    this.photos.push(this.createItem({                        file,                        url: e.target.result  // Base64 string for preview image                    }));                }                reader.readAsDataURL(file);            }        }    }    changeCategory($event) {const parent = this.Category.find(x => x.name === this.ServicesControl.get('category').value);this.categories.getOwnerCategories(this.user.token, 1, parent.id).subscribe(    (result: Category[]) => {            this.SubCategory=[];            this.SubCategory.push(new Category(-1, -1, 'Выберите подкатегорию', -1));            this.SubCategory.push(...result);    })    }    position(text: string) {        Swal.fire({            position: 'top-end',            icon: 'success',            title: text,            showConfirmButton: false,            timer: 1500        }); }    noposition(text: string) {        Swal.fire({            position: 'top-end',            icon: 'error',            title: text,            showConfirmButton: false,            timer: 1500        });  }  SaveServices() {    const data = this.ServicesControl.getRawValue();    const sent = new Service(data.describe,data.minutes, data.name,        data.price, null,        this.Category.find(_ => _.name === data.category).id,        this.SubCategory.find(_ => _.name === data.subcategory).id,        this.categoriesLevel2.find(_ => _.name === data.categoryLevel2).id);    if (this.add){        this.services.addService(this.user.token, sent).subscribe(            (result: Answer) => {                if (result.status.code === 201) {                    this.position('Услуга добавлена');                    const res = result.responce as SendServices;                    for (const a of data.photos) {                        this.services.uploadUserPhoto(this.user.token, a.file, res.id).subscribe(                            (resultphoto: Answer) => {                                if (resultphoto.status.code === 500){                                    this.noposition(resultphoto.status.message);                                    return -1;                                }                            });                        }                        this.services.getServices(this.user.token).subscribe(                            (result1: Answer) => {                                if (result1.status.code === 200) {                                    this.servicesdata = result1.responce as SendServices[];                                }                            });                        this.modalReference.close();                                } else {                                    this.noposition(result.status.message);                                }                    });            } else {        this.services.updateService(this.user.token, sent).subscribe(            (result: Answer) => {                if (result.status.code === 201) {                    this.position('Услуга изменена');                    const res = result.responce as SendServices;                    this.services.getServices(this.user.token).subscribe(                        (result1: Answer) => {                            if (result1.status.code === 200) {                                this.servicesdata = result1.responce as SendServices[];                            }                        });                    this.modalReference.close();                } else {                    this.noposition(result.status.message);                        }                });           }       }    onRoleDelete($event: any) {        this.services.deleteServices(this.user.token, $event.data.id).subscribe(            (result: Answer) => {                if (result.status.code === 200){                    this.position('Услуга удалена');                }            }        );    }    // tslint:disable-next-line:no-shadowed-variable    onEditConfirm($event: any, content: TemplateRef<any>) {        this.add = false;        this.ServicesControl.reset();        this.ServicesControl = this.formbuilder.group({            id: $event.data.id,            name: $event.data.name,            price: $event.data.price,            minutes: $event.data.minutes,            describe: $event.data.describe,            category: $event.data.category,            subcategory: $event.data.subcategory,            categoryLevel2: $event.data.categoryLevel2,            photos: ''        });        this.images=[];        this.services.getPhotos(this.user.token, $event.data.id).subscribe(            (result: Answer) => {                if (result.status.code === 200){                    const temp = result.responce as any[];                    for (const a of temp) {                        this.images.push('data:image/jpeg;base64,' + a.fileContents);                    }                }            }        )        this.modalReference = this.modalService.open(content);        this.modalReference.result.then((result) => {                this.closeResult = 'Closed';        }, (reason) => {            this.closeResult = 'Dissmissed';        }   );    }    changeSubCategory($event: Event) {        const subcategory = this.SubCategory.find(_ => _.name === this.ServicesControl.get('subcategory').value);        this.categories.getSubCategory(2, subcategory.id).subscribe(            (result: Answer) => {                if (result.status.code === 200){                    this.categoriesLevel2 = [];                    this.categoriesLevel2.push(new Category(-1, 2, 'Выберите подкатегорию', subcategory.id));                    this.categoriesLevel2.push(...result.responce as Category[]);                }            }        )       // this.subcategory = this.SubCategory.find(x => x.name === this.ServicesControl.get('subcategory').value);    }    changeCategoryLevel2($event: Event) {    }}