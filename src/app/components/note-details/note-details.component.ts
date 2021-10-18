import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  // @ts-ignore
  noteModel : NoteModel = new NoteModel()
  message = '';

  constructor(   private noteService: NoteService,
                 private route: ActivatedRoute,
                 private router: Router) {}

  ngOnInit(): void {
    this.message = '';
    this.getNote(this.route.snapshot.params.id);
  }

  getNote(id: string): void {
    this.noteService.getById(id)
      .subscribe(
        data => {
          this.noteModel = data.body? data.body : new NoteModel();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
