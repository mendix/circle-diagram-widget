dojo.provide("CircleDiagram.widget.CircleDiagram");

mxui.widget.declare('CircleDiagram.widget.CircleDiagram', {
	addons     : [dijit._Contained, mxui.addon._Contextable],
	// inputarguments
	inputargs: {
		sourceAttr : '',
		inputClass: '',
		displayInput : true,
		width : '',
		height : '',
		fgColor : '#000',
		bgColor : '#FFF',
		thickness : '',
		lineCap : '',
		minValue : 0,
		maxValue : 100,
		stepSize : 1,
		angleOffset : 0,
		angleArc : 360
	},
	// *
	
	inputnode : null,
	mxobj : null,
	_hasStarted : false,

	startup : function(){
		if (this._hasStarted)
			return;

		this._hasStarted = true;

		if (typeof(jQuery) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery-1_11_1_min");
		
		if (typeof(jQuery.knob) == "undefined")
			dojo.require("CircleDiagram.widget.lib.jquery_knob");

		if (!document.createElement('canvas').getContext)
			dojo.require("CircleDiagram.widget.lib.excanvas");

		dojo.style(this.domNode, "position", "relative");
		
		this.actLoaded();
	},
    
    update : function(obj, callback){
    	this.mxobj = obj;
    	mx.data.subscribe({
    		guid : obj.getGuid(),
    		callback : dojo.hitch(this, this.refresh)
    	});
		var value = +obj.get(this.sourceAttr);
		var mxnode = mxui.dom.input({
			className : this.inputClass
		});
		dojo.empty(this.domNode);
		this.domNode.appendChild(mxnode);
		this.inputnode = $(mxnode);
		var knob = this.inputnode.knob({
			displayInput : this.displayInput,
			width : this.width,
			height : this.height,
			thickness : this.thickness,
			lineCap : this.lineCap,
			min : this.minValue,
			max : this.maxValue,
			stepSize : this.stepSize,
			angleOffset : this.angleOffset,
			angleArc : this.angleArc,
			fgColor : this.fgColor,
			bgColor : this.bgColor,
			readOnly : true
		});
		this.inputnode.val(value).trigger("change");

		callback && callback();
	},

	refresh : function(objguid) {
		if (this.mxobj.getGuid() == objguid) {
			var value = +this.mxobj.get(this.sourceAttr);
			this.inputnode.val(value).trigger("change");
		}
	},
	uninitialize : function(){
	}
});