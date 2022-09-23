import { Component, OnInit } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputReddit = "";
  from = "";
  to = "";
  flaskURL = '';
  url = 'https://api.pushshift.io/reddit/search/comment/?subreddit='

  constructor(    private http: HttpClient,) { }

  ngOnInit(): void {
  }

  getData(){
    let httpParams = new HttpParams();
    if (this.from) {
      httpParams = httpParams.set("from", new Date(this.from).getTime().toString());
    }
    if(this.to){
      httpParams = httpParams.set("to", new Date(this.to).getTime().toString());
    } else{
      httpParams = httpParams.set("to", new Date().getTime().toString());
    }
    this.http.get<any>(this.flaskURL,{params: httpParams}).subscribe((data) => {
      if(data){
        console.log(data)
      }
    });
  }

  }
