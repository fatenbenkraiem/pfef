import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Reservation } from 'src/app/model/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Demandeur } from 'src/app/model/Demandeur';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';
import { DemandeurService } from 'src/app/services/demandeur.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminreserve',
  templateUrl: './adminreserve.component.html',
  styleUrls: ['./adminreserve.component.css']
})
export class AdminreserveComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 10;
  redetails: boolean = false;
  iduser!: string;
  idresorce!: string;
  idres!: number;
  Demandeurs: Demandeur[] = [];
  actualitesRes!: ActualiteRes[];
  host: string = "http://127.0.0.1:8000";
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  base64Data: any;
  retrieveResonse: any;
  reservations: Reservation[] = [];
  reservation: Reservation = new Reservation();
  totalReservations!: number;
  myForm: FormGroup;
  searchTerm = '';
  term = '';
  constructor(
    private toastr: NgToastService,
    private reservationService: ReservationService,
    private ressourcesService: RessourcesService,
    private contactservice: DemandeurService,
    private router: Router,
 

  ) {
    this.myForm = new FormGroup({
      datedebut: new FormControl(null, [Validators.required]),
      datefin: new FormControl(null, [Validators.required]),
      etat: new FormControl(null, [Validators.required]),
      res: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getReservations();
    this.getActualitesadmin();
    this.getDemandeurs();
  }
  details(Reservation: Reservation) {
   
    this.ressourcesService.findActualiteById(Reservation.ressources_id).subscribe((data) => {
    //  console.log(data)
    })
    this.contactservice.findcontactById(Reservation.user_id).subscribe((data) => {
    //  console.log(data)
    })
  }
  getReservations() {
    this.reservation = new Reservation();
    this.reservationService.getReservations().subscribe(data => {
      if (data != null) {
        this.reservations = data;
      //  console.log(this.reservations)
        this.totalReservations = data.length;
      } else {
        this.totalReservations = 0;
        this.reservations = []
      }
    })
  }
  getActualitesadmin() {
    this.ressourcesService.getAll().subscribe(data => {
      if (data != null) {
      //  console.log(data.length)
        this.actualitesRes = data;
      } else {
        this.actualitesRes = [];
      }
    }, error => {
      this.toastr.warning({ detail: "Serveur ne répond pas!" })
    });
  }
  getDemandeurs() {
    this.contactservice.getcontact().subscribe(data => {
      if (data != null) {
        this.Demandeurs = data;
    //   console.log(data.length)
      } else {
        this.Demandeurs = []
      }
    }, error => {
      this.toastr.warning({ detail: "error", summary: "Serveur ne répond pas!" })
    });
  }

  createReservation() {
  
    this.reservation.datedebut = this.myForm.value.datedebut;
    this.reservation.datefin = this.myForm.value.datefin;
    this.reservation.etat = this.myForm.value.etat;
    const id = this.myForm.value.res;
    const iduser = this.myForm.value.user;
    console.log(this.reservation)
    console.log(this.iduser);
    console.log(this.idresorce);
    this.reservationService.createReservation(this.reservation, this.idresorce, this.iduser).subscribe(data => {
      console.log(data)
      this.toastr.success({ detail: "Message succès!", summary: "Reservation Ajouter avec succès!", duration: 2000 })
      this.getReservations()
      this.redirectToList()
      this.hideAddForm()    }, error => {
     // console.log(error);
      this.toastr.error({ detail: "Erreur", summary: "Serveur ne répond pas!" })
    });
    this.reservation = new Reservation();
  }

  editReservation(Reservation: Reservation) {

    //console.log(Reservation.id)
    this.gotoTop();
    this.showEditForm();
    //console.log(this.addFormVisible)
    this.reservationService.findReservationById(Reservation.id).subscribe(data => {
      this.reservation = data;
      
     this.myForm.setValue({
        datedebut: this.reservation.datedebut,
        datefin: this.reservation.datefin,
        user: this.reservation.user_id,
        res: this.reservation.ressources_id,
        etat: this.reservation.etat
      });

    });
  }
  updateReservation() {
    this.reservation.datedebut = this.myForm.value.datedebut;
    this.reservation.datefin = this.myForm.value.datefin;
    this.reservation.etat = this.myForm.value.etat;
     console.log(this.reservation.ressources_id)
   this.reservationService.updateReservations(this.reservation.id, this.reservation,this.reservation.ressources_id).subscribe(data => {
      this.toastr.success({ detail: "Message succès!", summary: "Reservation Modifier avec succès!", duration: 2000 })
      this.getReservations()
      this.redirectToList()
    }, error => {
      this.toastr.error({ detail: "Erreur", summary: "Serveur ne répond pas!" })
    });
  }
  deleteReservation(Reservation: Reservation) {
    var id = Object.values(Reservation)[0]
    this.reservationService.deleteReservation(id).subscribe(data => {
      this.toastr.success({ detail: "Message succès!", summary: "Reservation  Supprimer avec succès!", duration: 2000 })
    //  console.log(data);
      this.getReservations();
      this.redirectToList()

    }, error => {
      this.toastr.error({ detail: "Error", summary: "server not responding!" })
   //   console.log(error)
    })
  }
  onOptionSelected(event: any) {
    this.iduser = event.target.value;
 console.log("test"+this.iduser);
  }
  Select_typeres(event: any) {
    this.idresorce = event.target.value;
     console.log(this.idresorce);
  }

  showAddForm() {
    this.addFormVisible = true;
    this.hideEditForm();
  }
  hideAddForm() {
    this.addFormVisible = false;
  }

  showEditForm() {
    this.editFormVisible = true;
    this.hideAddForm();
  }
  hideEditForm() {
    this.editFormVisible = false;
  }

  redirectToList() {
    this.router.navigate(['/admin/reserve'])
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
