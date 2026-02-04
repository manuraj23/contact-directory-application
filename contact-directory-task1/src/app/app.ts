import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from './service/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  countryCodes:any[] = [];
  
  contactForm=new FormGroup({
    name: new FormControl('', Validators.required),
    countrycode: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required,Validators.max(9999999999),Validators.min(1000000000)])
  })
  searchForm=new FormGroup({
    name: new FormControl()
  })

  searchedcontact=[];
  contacts=[];
  showall=false;
  constructor(private countryService: Contact) {}

ngOnInit() {
  this.countryService.getCountryCodes().subscribe(data => {
    // for(let i=0; i<data.length; i++){
    //   this.countryCodes[i]=data[i].dial_code;
    // }

    // console.log(this.countryCodes);

    this.countryCodes=data;
    console.log(this.countryCodes);
  });
}

onSubmit(){
  if(this.contactForm.invalid){
    return;
  }
  const formdata=this.contactForm.value;
  const contact={
    name: formdata.name,
    code: formdata.countrycode,
    phone: formdata.phone
  }

  const storeddata=localStorage.getItem('contacts');
  let contacts= storeddata? JSON.parse(storeddata):[];

  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  console.log("saved contact");
  alert("contact saved");
  console.log(contacts);

  this.contactForm.reset();
}

onSearch(){
  this.showall=false;
  const searchname=this.searchForm.value.name||'';
  const storeddata=localStorage.getItem('contacts');
  let contacts= storeddata? JSON.parse(storeddata):[];

  const result = contacts.filter((contact:any) =>
  contact.name.toLowerCase().includes(searchname.toLowerCase())
);
console.log(result);
if(result.length==0){
  alert("contact not found");
}
else{
  this.searchedcontact=result;
}

this.searchForm.reset();
}

showAll(){
  this.showall=true;
  const storeddata=localStorage.getItem('contacts');
  this.contacts= storeddata? JSON.parse(storeddata):[];
  console.log(this.contacts);
}
}