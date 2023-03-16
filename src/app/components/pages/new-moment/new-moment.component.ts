import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Interfaces/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';



@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  constructor(private momentService: MomentService,
    private messagesService: MessagesService,
    private router:Router) { }


  async addMoment(moment: Moment) {
    //necessário para envio de arquivos
    const formData: FormData = new FormData();

    formData.append("title", moment.title);
    formData.append("description", moment.description)


    if (moment.image) {
      formData.append("image", moment.image)
    }

    await this.momentService.addMoment(formData).subscribe();
    this.messagesService.adicionarMensagem("Momento adicionado com sucesso");
    this.router.navigate(["/"]);
  }
}
