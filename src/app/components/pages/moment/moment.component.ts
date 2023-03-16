import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment.development';

import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/Interfaces/Comment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';



@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  momento?: Moment;
  urlApiImages: string = environment.urlApiImages;

  faTimes = faTimes
  faEdit = faEdit

  constructor(private momentService: MomentService,
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentService) { }

  ngOnInit(): void {
    const idMomento: number = Number(this.activatedRoute.snapshot.paramMap.get("idMoment"))

    this.momentService.getMoment(idMomento).subscribe(
      (response) => {
        this.momento = response.data
      })
  }

  async excluirMomento(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messagesService.adicionarMensagem("Momento excluído com sucesso");

    this.router.navigate(['/']);
  }

  async addComment(event: Comment) {

    await this.commentService.addComment(this.momento!.id!, event).subscribe((response)=>{
      this.momento?.comments?.push(response.data);
    });
    this.messagesService.adicionarMensagem("Comentário adicionado");
  }


}
