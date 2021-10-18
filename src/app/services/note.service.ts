import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {NoteModel} from "../models/noteModel";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient: HttpClient) { }

  saveNote(noteModel: NoteModel): Observable<HttpResponse<NoteModel>> {
    return this.httpClient.post<NoteModel>(environment.NOTE_SERVICE + '/add', noteModel,{observe : 'response'});
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
    return this.httpClient.put<NoteModel>(environment.NOTE_SERVICE+'/'+id,noteModel, {observe:'response'});
  }

}
