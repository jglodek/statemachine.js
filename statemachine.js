/**
* statemachine.js - simple statemachine by Jacek G³odek
**/

var StateMachine = function(states){
	if(states!= null && states!= undefined)this.states=states;
	else this.states = {};
};
StateMachine.prototype = {
	processEvent: function(event, arg1, arg2, arg3, arg4, arg5){
		cur = this.states[this.current_state];
		if(cur!=null && cur!=undefined && cur[event] != null && cur[event]!=undefined)
		{
			var result = cur[event](arg1,arg2,arg3,arg4,arg5);
			if(result != null && result != undefined)
			{
				this.jumpToState(result);
				return result;
			}				
		}
		else
		{
				if(this.debug==true)console.log('Tried to process event without handler: '+event + " in state: " + this.current_state );
		}
	},
	jumpToState: function(newstate){
		if(this.current_state != null && this.current_state != undefined)
		{
			cur = this.states[this.current_state]; 
			if(cur != null && cur != undefined && cur.after!=undefined)cur.after();
		}
		this.current_state = newstate;
		cur = this.states[this.current_state]; 
		if(cur != null && cur != undefined && cur.before!=undefined)cur.before();
	}
}