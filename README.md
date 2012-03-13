statemachine.js
=============

This is a little javascript state-machine that does the job for me.

I like C++ boost::statechart, so all the transitions are done within event handlers. So there is no declaration of transitions. 

Status
-------
WIP

Usage
-------

### Creating state machine
Add script to your app. Create StateMachine object, like this:

	var fsm = new StateMachine();

### States Declaration

Declare states you need. In a constructor:	

	var fsm = new StateMachine({
		start:{},
		loading:{},
		dragging:{},
		refreshing:{}
	});

or after creating with = operator;

	fsm.states = {
		start:{},
		loading:{},
		dragging:{},
		refreshing:{}
	};

### Event Handlers Declaration

Add event handlers inside the states, like that:
	
	fsm.states = {
		start:{},
		dragging:{
			user_mousemove:	function(e);
			user_mousedown:	function(some, arguments, go, here){},
			user_mouseup:	function(up, to, five, arguments){}
		}
	}

You can use two callbacks called when leaving and entering state:

* before - when entering state
* after - when leaving state 

Like that:
	
	fsm.states = {
		start:{},
		loading:{
			loaded:	function(what_was_loaded){},
			before:	function(){},
			after:	function(){}
		}
	}
	
### Logic And Transitions

To make transitions return next state name string in event handler, like this:

	fsm.states = {
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

	fsm.jumpToState("loaded");

### Runtime

Copy the code somewhere in your app.

Create statemachine object: 
	
	var fsm = new StateMachine( /** States definition hash here **/ );

To control state machine call jumpToState, like this:

	fsm.jumpToState("loaded");

Or process events, like this:

	fsm.processEvent("loaded");

You can process events with up to 5 parameters, like this:

	fsm.processEvent("loaded", "dojox");

processEvent calls should be placed somewhere in your UI or AJAX event handlers, like(jQuery):

	$('#something').click(function(){fsm.processEvent('clicked-something');}); 


### Debug

You can turn on debug info. Processed events without handlers will be reported in console.

	fsm.debug = true;
	
Enjoy
-------
Hope somebody finds it useful. Wrote it to learn making docs in github;p

It's less complicated than https://github.com/jakesgordon/javascript-state-machine/

Jacek Glodek