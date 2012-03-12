statemachine.js
=============

This is a little javascript state-machine that does the job for me.
It's less complicated than https://github.com/jakesgordon/javascript-state-machine/
I like C++ boost::statechart, so all the transitions are done within event handlers.

Status
-------
WIP

Usage
-------

Define states inside 'states' hash. Set first first state as 'current_state', like that:

### States Declaration
	
	current_state:"start",
	states:{
		start:{},
		loading:{},
		dragging:{},
		refreshing:{}
	}

### Event Handlers Declaration

Add event handlers inside the states, like that:
	
	states:{
		start:{},
		dragging:{
			user_click:function(e){},
			user_mouseup:function(e){}
		}
	}

You can use two callbacks called when leaving and entering state:

* before - when entering state
* after - when leaving state 

Like that:
	
	states:{
		start:{},
		loading:{
			before:function(){},
			after:function(){}
		}
	}
	
### Transitions

To make transitions return next state name string in event handler, like this:

	states:{
		start:{},
		loading:{
			loaded:function(){
				/*Everything is loaded => Switch to idle state*/
				return "idle";
			}
		}
		idle:{}
		error_state:{}
	}

Or use jumpToState(stateName) function, like this:

	sm.jumpToState("loaded");

### Runtime

Copy the code somewhere in your app.

Create statemachine object: 
	
	var fsm = new StateMachine();

To control state machine call jumpToState, like this:

	fsm.jumpToState("loaded");

Or process events, like this:

	fsm.processEvent("loaded");

processEvent calls should be hidden somewhere in your UI or AJAX event handlers, like(jQuery):

	$('#something').click(function(){fsm.processEvent('clicked-something');}); 

Enjoy
-------
Hope somebody finds it useful. Wrote it to learn making docs in github;p

Jacek G³odek