var StateMachine = function(){};
StateMachine.prototype = {
	current_state: "start",
	states: {
		start:{},
		loading:{
			event_with_transition:function()
			{
				return 'start';
			}
			event_with_parameters:function(param1,param2)
			{
				console.log("" + param1 + " " + param2);
			}
		}
	},
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
			console.log('Tried to process event without handler: '+event )
		}
	},
	jumpToState: function(newstate){
		cur = this.states[this.current_state]; 
		if(cur != null && cur != undefined && cur.after!=undefined)cur.after();
		this.current_state = newstate;
		cur = this.states[this.current_state]; 
		if(cur != null && cur != undefined && cur.before!=undefined)cur.before();
	}
}