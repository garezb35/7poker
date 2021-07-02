import { Component, OnInit,Input , OnChanges, SimpleChanges, SimpleChange  } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges  {

  	constructor() { }

  	@Input() user: any;
    isuserLogin : boolean =  false;
  	ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {

    	for (let property in changes) {
            if (property === 'user') {
              this.user = changes[property].currentValue
              console.log(this.user)
              this.isuserLogin = true;
            }
        }
    }

    public getAmountType(amount:string){
      if(typeof amount == "undefined")
        return 0;
    	let amount_size = amount.length;
    	let amount_result = "";
    	for(let i = amount_size; i > 0 ; i--){
    		if(amount[i] == "0")
    			continue;
    		switch (i) {
    				case 12:
    					amount_result += amount.charAt(amount_size-i)+"천억 "
    					break;
    					case 11:
    					amount_result += amount.charAt(amount_size-i)+"백억 "
    					// code...
    					break;
    					case 10:
    					amount_result += amount.charAt(amount_size-i)+"십억 "
    					// code...
    					break;
    					case 9:
    					amount_result += amount.charAt(amount_size-i)+"억 "
    					// code...
    					break;
    					case 8:
    					amount_result += amount.charAt(amount_size-i)+"천만 "
    					// code...
    					break;
    					case 7:
    					amount_result += amount.charAt(amount_size-i)+"백만 "
    					// code...
    					break;
    					case 6:
    					amount_result += amount.charAt(amount_size-i)+"십만 "
    					// code...
    					break;
    					case 5:
    					amount_result += amount.charAt(amount_size-i)+"만 "
    					// code...
    					break;
    					case 4:
    					amount_result += amount.charAt(amount_size-i)+"천 "
    					// code...
    					break;
    					case 3:
    					amount_result += amount.charAt(amount_size-i)+"백 "
    					// code...
    					break;
    					case 2:
    					amount_result += amount.charAt(amount_size-i)+"십 "
    					// code...
    					break;
    					case 1:
    					amount_result += amount.charAt(amount_size-i)+""
    					// code...
    					break;

    				default:
    					// code...
    					break;
    			}
    	}

    	return amount_result;
    }

}
