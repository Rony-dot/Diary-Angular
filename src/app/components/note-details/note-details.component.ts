import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../../models/noteModel";
import {NoteService} from "../../services/note.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  // @ts-ignore
  noteModel : NoteModel = new NoteModel()
  validFileTypes = [
    '.jpg',
    '.jpeg',
    '.png',
  ];
  image: any;
  canEdit : boolean = false;
  canDelete : boolean = false;
  isAdmin : boolean = false;


  constructor(   private noteService: NoteService,
                 private userService : UserService,
                 private route: ActivatedRoute,
                 private router: Router) {}

  ngOnInit(): void {
    this.getNote(this.route.snapshot.params.id);
    // this.getPermission();
  }

  getNote(id: string): NoteModel {
    this.noteService.getById(id)
      .subscribe(
        note  => {
          this.userService.currentUser$.subscribe( user =>{
            if(note.body?.userId == user.id ){
              this.canEdit = true;
              this.canDelete = true;
            }
            if(user.roles?.includes("ADMIN")){
              this.canDelete = true;
              this.canEdit = true;
              this.isAdmin = true;
            }
          }, error =>{

          });
          this.noteModel = note.body? note.body : new NoteModel();

        },
        error => {
          console.log(error);
        });
    return this.noteModel;
  }

  getPermission(){
    console.log("node model userid : "+this.noteModel.userId)
    // console.log("note model : "+this.noteModel.userId)
    this.userService.currentUser$.subscribe(user => {
      if(this.noteModel.userId == user.id){
        alert(this.noteModel.userId + " "+ user.id);
        console.log(this.noteModel.userId +" "+ user.id)
        this.canDelete = true;
        this.canEdit = true;
      }else{
        alert(this.noteModel.userId + " "+ user.id);
        console.log(this.noteModel.userId +" "+ user.id)
      }
    }, error => {
      this.canDelete = false;
      this.canEdit = false;
    });

  }

  updateNote() {
    this.noteModel.image = this.image;
    console.log(this.noteModel.body)
    console.log(this.noteModel.title)
    console.log(this.noteModel.image)
    // @ts-ignore
    this.noteService.update(this.noteModel.id, this.noteModel).subscribe(
      data => {
        console.log("data status is : "+data.status)
        console.log("data is : "+data)
        console.log("data body is : "+data.body)
        this.router.navigate(['/my-notes']);
      },
      error => {
        console.log("error is :");
        console.log(error);
      }
    );
  }


  handleFileInput(target: any) {
    const file = target.files.item(0);
    if (!file) {
      return;
    }
    this.image = file;
  }


  deleteNote() {

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
