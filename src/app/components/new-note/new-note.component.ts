import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {

  title : string = ''
  body : string =''
  // @ts-ignore
  noteModel : NoteModel

  constructor() { }

  ngOnInit(): void {
  }

  saveNote() {
    this.noteModel.title = this.title
    this.noteModel.body = this.body

  }
}
