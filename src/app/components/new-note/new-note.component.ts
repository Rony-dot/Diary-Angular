import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {

  title : string = ''
  body : string =''
  // @ts-ignore
  noteModel : NoteModel = new NoteModel()
  message: string = '';
  alertType: string = '';
  display: boolean = false;
  validFileTypes = [
    '.jpg',
    '.jpeg',
    '.png',
  ];
  image: any;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  saveNote() {
    this.noteModel.title = this.title
    this.noteModel.body = this.body
    this.noteService.saveNote(this.noteModel, this.image)
      .subscribe(
        data => {
          // @ts-ignore
          this.message = "Note Saved Successfully"
          this.alertType = "success"
          this.displayAction();
        },
        error => {
          this.message = "Failed to save note"
          this.alertType = "danger"
          this.displayAction();
          console.log(error)
        }
      );
  }

  displayAction() {
    setTimeout(() => {
      this.display = false;
    }, 2000);
    this.display = true;
  }

  handleFileInput(target: any) {
    const file = target.files.item(0);
    if (!file) {
      return;
    }
    this.image = file;
  }
}
