import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {
  // @ts-ignore
  notes: NoteModel[];

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.noteService.fetchMyNotes().subscribe(
      data => {
        console.log(data)
        this.notes = data.body ? data.body : []
      },
      error => {
        console.log(error)
      }
    )
  }
}
