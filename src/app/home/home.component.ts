import { Component, OnInit, Input } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { any } from '@tensorflow/tfjs';

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
  fromDate:any;
  toDate:any;
  done = false;
  tokenizer:any;
  panelOpenState = false;
  isCall = false;
  wordDict: any;
  maximum = 500;
  currPositiveTweets:any = [];
  currNegativeTweets:any = [];
  positiveTweets:any = [];
  negativeTweets:any = [];
  countError = false;
  @Input() type!: string;
  nodeURL = 'https://serverless-tweet.azurewebsites.net/api/HttpTrigger3?code=7J111qj4uroIibIKhVlrOnXLA6IWqu2kPCj7IGL_azqMAzFunK1Y2Q==';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Negative'], [ 'Positive']];
  public pieChartDatasets = [ {
    data: [ 300, 500]
  } ];
  destroy$: Subject<boolean> = new Subject<boolean>();
  public pieChartLegend = true;
  constructor(    private http: HttpClient,private homeService: HomeService) { }

  ngOnInit(): void {  
  }

  getData(){
    if(this.maximum > 5000){
      this.maximum = 5000;
    }
    this.done = false;
    this.isCall = true;
    let pos = 0;
    let neg = 0;
    this.homeService.homeApi({ query: this.inputReddit, startTime:this.fromDate, endTime: this.toDate, max:this.maximum }).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if(data){
        console.log(data);
        this.done = true;
        let predicts = data.predicts.slice(0, -1);
        predicts = predicts.substring(1);
        predicts = predicts.split(" ");
        predicts.forEach((ele: any,index: any)=> {
            if(ele == '1'){
              pos += 1
              this.positiveTweets.push(data.tweets[index]);
            }else{data
              neg += 1
              this.negativeTweets.push(data.tweets[index]);
            }
        });
        this.pieChartDatasets = [ { data: [ neg, pos]} ];
      }
      this.isCall = false;
    });
}

maxChanged(data: any){
  console.log(this.fromDate)
  if(data<=5000){
    this.countError = false;
  } else{
    this.countError = true;
  }
}

  changePage(page:any,type:any){
    if(type === 'positive'){
      this.currPositiveTweets = this.positiveTweets.slice((page*100)-100,page*100)
    } else{
      this.currNegativeTweets = this.negativeTweets.slice((page*100)-100,page*100)
    }
  }

}
