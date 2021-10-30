import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {
  // @ts-ignore
  notes: NoteModel[];
  myThing : boolean = false;
  userId ?: number;
  isAdmin : boolean = false;


  constructor(private noteService: NoteService, private userService: UserService) { }

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

    this.userService.currentUser$.subscribe( user =>{
      this.userId = user.id;
      if(user.roles?.includes("ADMIN")){
        this.isAdmin = true;
      }
    }, error => {
      this.userId = -1;
    });

  }

}
