import { Component, EventEmitter, OnInit } from '@angular/core';

import { Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() textoTipoAcaoBotao: String = "";
  @Input() momentData?: Moment;

  @Output() notificarSubmitForm: EventEmitter<Moment> = new EventEmitter();



  momentForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData? this.momentData.id:""),
      title: new FormControl(this.momentData? this.momentData.title:"", [Validators.required]),
      description: new FormControl(this.momentData? this.momentData.description:"", [Validators.required]),
      image: new FormControl(''),
    })
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  get image() {
    return this.momentForm.get('image')!;
  }

  onChangeImage(event: any) {
    const image: File = event.target.files[0];
    this.momentForm.patchValue({ image: image });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    const moment:Moment = this.momentForm.value;

    this.notificarSubmitForm.emit(moment);

  }


}
