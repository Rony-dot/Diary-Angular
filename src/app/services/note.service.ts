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
}
