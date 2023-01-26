import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'find-user';
  type = 'me';
  
  
  link(type:any){
    if(type == 'linkedin'){
      window.open('https://www.linkedin.com/in/sriharshamaddirala/', "_blank");
    }else{
      window.open('https://github.com/Sri-harsha99', "_blank");
    }
  }
}