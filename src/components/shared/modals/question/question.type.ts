export interface props{
   setModal:React.Dispatch<any>;
   question:question;
}

export interface question{
   id:number;
   attempt:number;
   attempt_price:number;
   createdAt:Date;
   date:string;
   img:string;
   prize:number;
   updatedAt:Date;
   user:any;
   wordbroken:string;
}