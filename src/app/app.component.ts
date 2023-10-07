import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitizenService } from './citizen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
[x: string]: any;
  title = 'curd';
name: any;

  citizenForm: any;
submitted: any;
citizens: any;
given_detail: any;
viewData: any;
  
  constructor(private user: FormBuilder,private _citizen:CitizenService) { }
  states = [
"Andhra Pradesh (AP)",
"Arunachal Pradesh (AR)",
"Assam (AS)",
"Bihar (BR)",
"Chhattisgarh (CG)",
"Goa (GA)",
"Gujarat (GJ)",
"Haryana (HR)",
"Himachal Pradesh (HP)",
"Jammu and Kashmir (JK)",
"Jharkhand (JH)",
"Karnataka (KA)",
"Kerala (KL)",
"Madhya Pradesh (MP)",
"Maharashtra (MH)",
"Manipur (MN)",
"Meghalaya (ML)",
"Mizoram (MZ)",
"Nagaland (NL)",
"Odisha(OR)",
"Punjab (PB)",
"Rajasthan (RJ)",
"Sikkim (SK)",
"Tamil Nadu (TN)",
"Telangana (TS)",
"Tripura (TR)",
"Uttar Pradesh (UP)",
"Uttarakhand (UK)",
"West Bengal (WB)"
  ]

  showPassword = false;
  showCPassword = false;
  ngOnInit(){
    this.citizenForm = this.user.group({
      name:['',Validators.required],
      father_name:['',Validators.required],
      dob:['',Validators.required],
      phone_number:['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      country:[''],
      mail_id:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{}|;:'",.<>?`~\-=/\\]+$/)]],
      cpassword:['',Validators.required],
     
    })

    this.getAllCitizenDetailsData()
  }

  get citizenFormControl(){
    return this.citizenForm.controls;
  }

  submit(){
   
    if(this.citizenForm.value.password == this.citizenForm.value.cpassword){
      let data = {
        mail_id: this.citizenForm.value.mail_id,
        password:this.citizenForm.value.password,
        phone_number:this.citizenForm.value.phone_number,
      }
      this._citizen.postLoginData(data).subscribe((response:any)=>{
        console.log(response);
        if(response.id != null){
          this.create();
        }else{
          alert("your login not created")
        }
      })
      
    }else{
      alert("Incorrect password")
    }
   
    
  }

  create(){
    let details = {
      name:this.citizenForm.value.name,
      father_name:this.citizenForm.value.father_name,
      dob:this.citizenForm.value.dob,
      phone_number:this.citizenForm.value.phone_number,
      address:this.citizenForm.value.address,
      city:this.citizenForm.value.city,
      state:this.citizenForm.value.state,
      country:"India",
    }
    this._citizen.postData(details).subscribe((res:any)=>{
      console.log(res);
      window.location.reload();
     })
  }

  getAllCitizenDetailsData(){
    this._citizen.getAllCitizenDetailsData().subscribe((res:any)=>{
      console.log(res);
      this.citizens = res
      console.log();
    })
  }

  deleteAllCitizenDetailsData(id: any) {
    const userConfirmed = window.confirm('Are you sure you want to delete details?');
  
    if (userConfirmed) {
      console.log(id);
      this._citizen.deleteAllCitizenDetailsData(id)
        .subscribe(response => {
          // Handle the response after deletion if needed
          console.log('Deletion response:', response);
        });
    } else {
      // Handle the case where the user cancels the deletion
      console.log('Deletion canceled by the user');
    }
    window.location.reload();
  }

  getCitizenData(id:any){
    this._citizen.getCitizenData(id).subscribe((res:any)=>{
      console.log(res);

      this._citizen.getLoginData(id).subscribe((login:any)=>{
      console.log(login)
        this.given_detail ={
        name:res.name,
        father_name:res.father_name,
        dob:res.dob,
        phone_number:res.phone_number,
        address:res.address,
        city:res.city,
        state:res.state,
        mail_id:login.mail_id,
        password:login.password,
        id:res.id

       }
       
      })
    })
  }

  update(id:any){
    let userData = this.citizenForm.value;
    let data = {
      name: userData.name,
      address:userData.address,
      father_name:userData.father_name,
      phone_number: userData.phone_number,
      city: userData.city,
      dob: userData.dob,
      state:this.given_detail.state,
      country:"India"
    };
    console.log(id);
    
    this._citizen.updateData(id,data).subscribe((response:any)=>{
      
      this.given_detail=null
      window.location.reload()
    })
  }

  getData(id:any){
    this._citizen.getCitizenData(id).subscribe((res:any)=>{
      console.log(res);

      
     
        this.viewData ={
        name:res.name,
        father_name:res.father_name,
        dob:res.dob,
        phone_number:res.phone_number,
        address:res.address,
        city:res.city,
        state:res.state,
        country:res.country

       }
       
      
    })
  }
  close(){
    this.viewData==null
    window.location.reload()
  }

  password(){
    this.showPassword = !this.showPassword;
  }
  cpassword(){
    this.showCPassword = !this.showCPassword;
  }
  
}
