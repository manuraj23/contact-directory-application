import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from './service/contact';
import phoneLengthData from '../app/countrylength.json';

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
    countrycode: new FormControl<any | null>(null, Validators.required),
    phone: new FormControl('', Validators.required)
  })
  searchForm=new FormGroup({
    name: new FormControl('', Validators.required)
  })

  searchedcontact=[];
  contacts=[];
  showall=false;
  phoneLengthByCountry: { [key: string]: number } = phoneLengthData;

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

  this.contactForm.get('countrycode')?.valueChanges.subscribe(country => {
    if (country) {
      this.applyPhoneValidation(country.name);
    }
  });
}

onSubmit(){
  if(!this.contactForm.value.name||!this.contactForm.value.countrycode||!this.contactForm.value.phone){
    alert("Please fill complete form")
    return;
  }
  const formdata=this.contactForm.value;
  const contact={
    name: formdata.name,
    code: formdata.countrycode?.dial_code,
    countryName: formdata.countrycode?.name,
    phone: formdata.phone
  }


  const countryName=contact.countryName;
  const requiredLength=this.phoneLengthByCountry[countryName];
  const phoneStr = formdata.phone?.toString();
  if(requiredLength!==phoneStr?.length){
    alert(`the phone number length for country ${countryName} is ${requiredLength}`);
    return;
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
  if(this.searchForm.invalid){
    alert("please enter name");
    return ;
  }
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


applyPhoneValidation(countryName: string) {
  const phoneControl = this.contactForm.get('phone');
  const length = this.phoneLengthByCountry[countryName];

  phoneControl?.setValidators([
    Validators.required,
    Validators.pattern(`^[0-9]{${length}}$`)
  ]);
  
  phoneControl?.updateValueAndValidity();
}

}