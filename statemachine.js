
var EditorStateMachine = function(){};
EditorStateMachine.prototype = {
	current_state: "start",
	states: {
		start:{},
		loading:{
			before: function(){
				console.log('enter loading');
			},
			after:function(){
				console.log('after loading');					
			},
			mouse_clicked:function()
			{
				return 'start';
			}
		}	
	},
	processEvent: function(event){
		cur = this.states[this.current_state];
		if(cur!=null && cur!=undefined && cur[event] != null && cur[event]!=undefined)
		{
			var result = cur[event]();
			if(result != null && result != undefined)
			{
				this.jumpToState(result);
				return result;
			}				
		}
		else
		{
			console.log('tried to process event without handler: '+event )
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