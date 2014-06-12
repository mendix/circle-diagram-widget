dojo.provide("CircleDiagram.widget.CircleDiagram");

dojo.declare('CircleDiagram.widget.CircleDiagram', mxui.widget._WidgetBase, {
	attr : null,
	inputnode : null,
	mxobj : null,

	startup : function(){
		if (typeof(jQuery) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery-1_11_1_min");
		
		if (typeof(jQuery.knob) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery_knob");
		
		this.actLoaded();
	},
    
    update : function(obj, callback){
    	this.mxobj = obj;
    	mx.data.subscribe({
    		guid : obj.getGuid(),
    		callback : dojo.hitch(this, this.refresh)
    	});
		var value = +obj.get(this.attr);
		var mxnode = mxui.dom.input();
		dojo.empty(this.domNode);
		this.domNode.appendChild(mxnode);
		this.inputnode = $(mxnode);
		var knob = this.inputnode.knob({
			fgColor : 'red',
			bgColor : 'blue',
			readOnly : true
		});
		this.inputnode.val(value).trigger("change");

		callback && callback();
	},

	refresh : function(objguid) {
		if (this.mxobj.getGuid == objguid) {
			var value = +this.mxobj.get(this.attr);
			this.inputnode.val(value).trigger("change");
		}
	}
});