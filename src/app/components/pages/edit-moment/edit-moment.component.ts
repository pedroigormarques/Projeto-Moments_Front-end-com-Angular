import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Interfaces/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';



@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {


  momento!: Moment;


  constructor(private momentService: MomentService,
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("idMoment"));
    this.momentService.getMoment(id).subscribe((response) => this.momento = response.data);
  }

  async editMoment(event: Moment) {
    const formData: FormData = new FormData();

    formData.append("title", event.title);
    formData.append("description", event.description);
    if (event.image) {
      formData.append("image", event.image);
    }

    console.log(this.momento)
    console.log(event)
    formData.forEach(a =>console.log(a))

    await this.momentService.updateMoment(this.momento.id!,formData).subscribe();
    this.messagesService.adicionarMensagem(`O momento ${this.momento!.id!} foi editado com sucesso`)

    this.router.navigate([`/moments/${this.momento.id}`])
  }
}
