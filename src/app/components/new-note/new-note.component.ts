import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveNote() {
    this.noteModel.title = this.title
    this.noteModel.body = this.body
    this.noteService.saveNote(this.noteModel)
      .subscribe(
        data => {
          console.log(data.status)
          console.log(data)
          this.router.navigate(['/my-notes']);
        },
        error => {
          console.log(error)
        }
      );
  }
}
