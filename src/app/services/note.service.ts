import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {NoteModel} from "../models/noteModel";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient: HttpClient) { }

<<<<<<< HEAD

=======
>>>>>>> 72f613e07b9fc80fe6a6eb39c7d58d4a89a59d7f
  saveNote(noteModel: NoteModel, image: File): Observable<HttpResponse<NoteModel>> {
    const formData = new FormData();
    formData.append('title', noteModel.title);
    formData.append('body', noteModel.body);
    formData.append('image', image);
    return this.httpClient.post<NoteModel>(environment.NOTE_SERVICE + '/add', formData,{observe : 'response'});
  }

  fetchMyNotes(): Observable<HttpResponse<NoteModel[]>> {
    // @ts-ignore
    return this.httpClient.get<NoteModel[]>(environment.NOTE_SERVICE + '/all',{observe : 'response'});
  }
<<<<<<< HEAD

  getById(id: string): Observable<HttpResponse<NoteModel>>{
    return this.httpClient.get<NoteModel>(environment.NOTE_SERVICE+'/'+id, {observe:'response'});
  }

  deleteById(id : number): Observable<HttpResponse<NoteModel>>{
    return this.httpClient.delete<NoteModel>(environment.NOTE_SERVICE+'/'+id, {observe:'response'});
  }

  update(id : number, noteModel : NoteModel): Observable<HttpResponse<NoteModel>>{
    const formData = new FormData();
    formData.append('title', noteModel.title);
    formData.append('body', noteModel.body);
    formData.append('image', noteModel.image);
    return this.httpClient.put<NoteModel>(environment.NOTE_SERVICE+'/'+id,formData, {observe:'response'});
  }

=======
>>>>>>> 72f613e07b9fc80fe6a6eb39c7d58d4a89a59d7f
}
