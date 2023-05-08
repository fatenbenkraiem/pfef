import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demandeur } from 'src/app/model/Demandeur';
import { DemandeurService } from 'src/app/services/demandeur.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import{NgToastService} from 'ng-angular-popup';
@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  term = '';
  Demandeur  :Demandeur = new Demandeur();
  Demandeurs: Demandeur[] = [];
  totalDemandeurs!: number;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  myForm: FormGroup;
  constructor(private contactservice :DemandeurService,
   private toastr: NgToastService,
    private router: Router){ this.myForm = new FormGroup({
      nom: new FormControl(null, [Validators.required]),
      tel: new  FormControl(null, [Validators.required]),
      email: new  FormControl(null, [Validators.required, Validators.email]),
      password: new  FormControl(null,[Validators.required ,   Validators.minLength(6)]),
    });}
 
 

    createdemandeur(){
      this.Demandeur.nom=this.myForm.value.nom;
      this.Demandeur.tel=this.myForm.value.tel;
      const id=this.myForm.value.type;
      this.Demandeur.email=this.myForm.value.email;
      this.Demandeur.password=this.myForm.value.password;
      this.Demandeur.role='user';
      console.log(this.Demandeur)
     
      this.contactservice.create(this.Demandeur).subscribe(data=>{
        console.log(data)
        this.toastr.success({detail:"Message succès!",summary:"Demandeur ajouter avec succès!",duration:2000})
        this.getDemandeurs()
        this.redirectToList()
      }, error=>{
        this.toastr.error({detail:"Message error!",summary:"server not responding!",duration:2000})
      });
    }
    editdemandeur(demandeur: Demandeur){
      

      this.gotoTop();
      this.showEditForm();
       this.contactservice.findcontactById(demandeur.id).subscribe(data=>{
        this. Demandeur = data;
        this.myForm.setValue({
          nom: this.Demandeur.nom,
          tel: this.Demandeur.tel,
          email: this.Demandeur.email,
          password: "*********************"
          
        });
      });
       this.Demandeur.id=demandeur.id;
    }
    deletedemandeur(id:number) {
      this.contactservice.deletecontact(id).subscribe(data => {
        this.toastr.success({detail:"Message succès ",summary:"Demandeur supprimer avec succées!",duration:2000})
        this.getDemandeurs();
        this.redirectToList() 
        
      }, error => {
        this.toastr.error({detail:"Error",summary:"server not responding!",duration:2000})
        console.log(error)
      })
    }
    updatedemandeur(){
      this.Demandeur.role='user';
      this.Demandeur.nom=this.myForm.value.nom;
      this.Demandeur.tel=this.myForm.value.tel;
      this.Demandeur.email=this.myForm.value.email;
      //console.log(this.Demandeur);
      this.contactservice.update(this.Demandeur,this.Demandeur.id).subscribe(data=>{
     
          this.toastr.success({detail:"Message succès",summary:"Demandeur Modifier  avec succès!",duration:2000})
          this.getDemandeurs()
          this.redirectToList()
        }, error=>{
          this.toastr.error({detail:"Erreur",summary:"Serveur ne répond pas!",duration:2000})
        });
        this.Demandeur=new Demandeur();
      }
    getDemandeurs() {
      this.contactservice.getcontact().subscribe(data => {
        this.Demandeur = new Demandeur();
        if (data != null) {
          this. Demandeurs = data;
          this.totalDemandeurs = data.length;
          console.log(data.length)
          this.hideAddForm();
          this.hideEditForm();
        } else {
          this.totalDemandeurs = 0;
          this.Demandeurs = []
        }
      }, error => {
         this.toastr.warning({detail:"Serveur ne répond pas!"})
       });
    }
   
      
  ngOnInit(): void {
    this.getDemandeurs();
  }
  showAddForm() {
    this.addFormVisible = true;
  }
  hideAddForm() {
    this.addFormVisible = false;
  }
  showEditForm() {
    this.editFormVisible = true;
  }
  hideEditForm() {
    this.editFormVisible = false;
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  gotoTDetails() {
    window.scroll({ 
      top: 700, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  redirectToList(){
    this.router.navigate(['/admin/demandeur'])
  }

}