import { Component, OnInit } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { HomeService } from '../home.service';
import * as tf from '@tensorflow/tfjs';
import words from '../../assets/word_dict.json';
import { ChartOptions } from 'chart.js';

// var tokeniser = require('node_modules\string-tokeniser\index.js')
// import { tokeniser } from '../../../node_modules/string-tokeniser/index';
// import { tokeniser } from 'string-tokeniser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputReddit = "";
  from = "";
  to = "";
  data:any;
  tokenizer:any;
  wordDict: any;
  nodeURL = 'https://serverless-tweet.azurewebsites.net/api/HttpTrigger3?code=7J111qj4uroIibIKhVlrOnXLA6IWqu2kPCj7IGL_azqMAzFunK1Y2Q==';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  constructor(    private http: HttpClient,private homeService: HomeService) { }

  ngOnInit(): void {  
  }

  getData(){
    this.homeService.homeApi({ query: this.inputReddit }).subscribe(
      (res) => {
        console.log(res);
        this.data = res.data;
        
      },
      (err) => {
        console.error(err);
      }
    );
}

  }
