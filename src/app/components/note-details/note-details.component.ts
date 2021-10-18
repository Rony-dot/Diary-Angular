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

  constructor(   private noteService: NoteService,
                 private route: ActivatedRoute,
                 private router: Router) {}

  ngOnInit(): void {
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


  updateNote() {
    // @ts-ignore
    this.noteService.update(this.noteModel.id, this.noteModel).subscribe(
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

  deleteNote() {
    // @ts-ignore
    this.noteService.deleteById(this.noteModel.id).subscribe(
      data => {
        console.log(data.status)
        console.log(data)
        this.router.navigate(['/my-notes']);
      },
      error => {
        console.log(error)
      }
    )
  }
}
