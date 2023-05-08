import { Demandeur } from 'src/app/model/Demandeur';
import { User } from './User';
export class Reservation {
    id!: number;
    datedebut!: Date;
    datefin!: Date;
   etat!: number;
   user_id!: number;
   ressource!: string;
   demandeur!: string;
   ressources_id!: number;

    
        
}
