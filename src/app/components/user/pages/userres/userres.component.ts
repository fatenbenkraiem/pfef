import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';

@Component({
  selector: 'app-userres',
  templateUrl: './userres.component.html',
  styleUrls: ['./userres.component.css']
})
export class UserresComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';
  term = '';
  actualiteRes: ActualiteRes= new ActualiteRes();
  actualitesRes!: ActualiteRes[];
  totalActualites!: number;
  constructor(
    private ressourcesService: RessourcesService,
    private toastr: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActualites();
  }

  getActualites(){
    this.actualiteRes = new ActualiteRes();
    this.ressourcesService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesRes = data;
        this.totalActualites = data.length;
        
      }else{
        this.totalActualites = 0;
        this.actualitesRes = [];
      }
    }, error => {
      this.toastr.warning({detail:"Serveur ne répond pas!",duration:2000})
    });
  }
}
