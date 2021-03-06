import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {NoteModel} from "../models/noteModel";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient: HttpClient) { }

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

}
