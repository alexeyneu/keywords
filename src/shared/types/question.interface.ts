export interface question {
   className:string;
   id:string;
   _objCount:number;
   attributes:questionAttributes;
   createdAt:Date;
   updatedAt:Date;
}

export interface questionAttributes {
   attempt:number;
   attempt_price:number;
   date:number;
   prize:number;

   word:string;
   img:string;

   createdAt:Date;
   updatedAt:Date;

   user:any;
}