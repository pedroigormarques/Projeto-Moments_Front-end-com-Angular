import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urlApiImages = environment.urlApiImages;
  faSearch = faSearch;

  todosMomentos: Moment[] = [];
  momentosFiltrados: Moment[] = [];

  filtroMomentos!: string;

  constructor(private momentService: MomentService) {
  }

  ngOnInit() {
    this.momentService.getMoments().subscribe((respostaMomentos) => {
      const data = respostaMomentos.data;

      data.map((moment) => moment.created_at = new Date(moment.created_at!).toLocaleDateString('pt-BR'))


      this.todosMomentos = data;
      this.momentosFiltrados = data;

    });
  }

  filtrarMomentos(event: any) {
    const target = event.target;
    const filtro:string = target.value.toLowerCase();

    this.momentosFiltrados = this.todosMomentos.filter((momento) => momento.title.toLowerCase().includes(filtro))
    console.log(filtro)
  }

}




