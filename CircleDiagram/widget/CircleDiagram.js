dojo.provide("CircleDiagram.widget.CircleDiagram");

dojo.declare('CircleDiagram.widget.CircleDiagram', mxui.widget._WidgetBase, {
	attr : null,

	startup : function(){
		if (typeof(jQuery) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery-1_11_1_min");
		
		if (typeof(jQuery.knob) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery_knob");
		
		this.actLoaded();
	},
    
    update : function(obj, callback){
		var value = +obj.get(this.attr);
		var inputnode = mxui.dom.input();
		dojo.empty(this.domNode);
		this.domNode.appendChild(inputnode);
		$(inputnode).knob({
			fgColor : 'red',
			bgColor : 'blue',
			readOnly : true
		}).val(value);

		callback && callback();
	}
});