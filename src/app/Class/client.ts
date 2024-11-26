
import { Commentaire } from "./commentaire";
import { Product } from "./prouduct";

export class Client { 
    constructor(
        public id?:number,
    public nom?:String,
    public prenom?:String,
    public mdp?:String,
    public nomUtilisateur?:String,
    public products?: Product[],
    public commentaire? : Commentaire []  

    ){};
}
