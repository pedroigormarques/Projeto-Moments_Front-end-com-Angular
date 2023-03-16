import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private _message: string="";

  constructor() { }

  get message(){
    return this._message;
  }

  adicionarMensagem(message:string){
    this._message = message;

    setTimeout(()=>{
      this.limparMensagem();
    },4000)
  }

  limparMensagem(){
    this._message="";
  }

}
