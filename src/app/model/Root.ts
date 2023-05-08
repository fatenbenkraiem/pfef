export class Root {
    //reservation!: Reservation;
   // user!: User;
   // typeressources!: Typeressources;
  
  }
    
    export interface Reservation {
      id: number
      datedebut: string
      datefin: string
      etat: number
      user_id: number
      ressources_id: number
      created_at: string
      updated_at: string
    }
    
    export interface User {
      id: number
      nom: string
      role: string
      tel: any
      email: string
      email_verified_at: any
      created_at: string
      updated_at: string
    }
    
    export interface Typeressources {
      id: number
      nom: string
      quantites: number
      created_at: string
      updated_at: string
    }
    