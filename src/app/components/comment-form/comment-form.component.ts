import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Comment } from 'src/app/Interfaces/Comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  formGroup!: FormGroup

  @Output() addCommentEmmiter:EventEmitter<Comment> = new EventEmitter()


  constructor() {

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    })
  }

  get text() {
    return this.formGroup.get("text")!;
  }

  get username() {
    return this.formGroup.get("username")!;
  }

  async submit(formDir:FormGroupDirective) {
    if (this.formGroup.invalid) {
      return
    }

    await this.addCommentEmmiter.emit(this.formGroup.value)
    this.formGroup.reset()
    formDir.resetForm()
  }
}
