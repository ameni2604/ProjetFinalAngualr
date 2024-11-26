import { Commentaire } from "./commentaire";

export class Product { 
    constructor(
       public id: number, 
       public reference: string,
       public name: string,
       public description: string,
       public price: number,
       public sectionName: string,
       public  material: string,
       public  availability: string, 
       public  weight: string,
       public dimensions: string,
       public Images:string[],
       public ListeDesImages:string[],
       public colors: string[],
     public commentaire : Commentaire []  

    ){};
}
