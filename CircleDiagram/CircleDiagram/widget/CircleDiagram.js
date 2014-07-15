dojo.provide('CircleDiagram.widget.CircleDiagram');

mxui.widget.declare('CircleDiagram.widget.CircleDiagram', {
	// inputarguments
	attr : '',
	inputClass: '',
	displayInput : true,
	displayInputType : '',
	positionType : '',
	width : '',
	height : '',
	colorCircle : '',
	fgColor : '',
	bgColor : '',
	fgColorLabel : '',
	fgColorLabelFromTo : '',
	labelCircleDiagram : '',
	thickness : '',
	lineCap : '',
	minValue : 0,
	maxValue : 100,
	maxValueAttr : '',
	stepSize : 1,
	angleOffset : 0,
	angleArc : 360,
	showPercentage : false,

	// *
	fontSizePercentage : 0,
	valueOriginal : 0,
	valuePercentage : 0,
	maxValueUsed : 0,
	inputnode : null,
	newinputnode : null,
	percentageNode : null,
	percentageInputNode : null,
	descriptionNodeFromTo : null,
	mxobj : null,
	_hasStarted : false,
	$ : null,

	startup : function(){
		'use strict';

		if (this._hasStarted)
			return;

		this._hasStarted = true;

		// Load jQuery if not defined.
		if (typeof(jQuery) == 'undefined')
			dojo.require('CircleDiagram.widget.lib.jquery-1_11_1_min');

		// Set jQuery internally
		this.$ = jQuery;
		
		// Load knob extension.
		if (typeof(jQuery.knob) == 'undefined')
			dojo.require('CircleDiagram.widget.lib.jquery_knob');

		// Load excanvas
		if (!document.createElement('canvas').getContext)
			dojo.require('CircleDiagram.widget.lib.excanvas');

		// Set domNode style to position relative so other parts van be position absolute.
		dojo.style(this.domNode, 'position', 'relative');
		
		this.actLoaded();
	},
    
    update : function(obj, callback){
    	'use strict';

    	// Always define variables in one var.
    	var value = '',
    		mxnode = {},
    		knob = {};

    	// Get data object from outside and set it as an internal value.
    	this.mxobj = obj;

 		// Attach to data refresh.
    	mx.data.subscribe({
    		guid : obj.getGuid(),
    		callback : dojo.hitch(this, this.refresh)
    	});

    	// Set value in this function.
		value = +obj.get(this.attr);

		// Set max value
		this.maxValueUsed = (this.maxValueAttr != '') ? +obj.get(this.maxValueAttr) : this.maxValue;

		// Set the value
		this.valueOriginal = value;

		// Reformat value to percentage if needed.
		this.valuePercentage = (this.showPercentage) ? this.calcpercentage(value) : value;

		// Create new mxui dom input node.
		mxnode = mxui.dom.input({
			className : this.inputClass
		});

		// Set class for domNode
		dojo.addClass(this.domNode, 'wx-circlediagram-container');

		// Empty domnode of this and appand new input
		dojo.empty(this.domNode);
		this.domNode.appendChild(mxnode);

		// Set internal variable with the node of the input field, make it jquery aware.
		this.inputnode = this.$(mxnode);

		// Extend the input field node with knob.
		knob = this.inputnode.knob({
			displayInput : this.displayInput,
			width : this.width,
			height : this.height,
			thickness : this.thickness,
			lineCap : this.lineCap,
			min : this.minValue,
			max : this.maxValueUsed,
			stepSize : this.stepSize,
			angleOffset : this.angleOffset,
			angleArc : this.angleArc,
			fgColor : this.colorCircle,
			bgColor : this.bgColor,
			readOnly : true
		});

		// Set display type!
		knob.css('display',this.displayInputType.replace('inlineblock','inline-block'));
		knob.css('position',this.positionType);
		knob.addClass('wx-circlediagram');

		// Set the value of the input field.
		this.inputnode.val(this.valueOriginal).trigger('change');

		// Set class inputnode
		this.inputnode.addClass('wx-circlediagram-input');
 
		if (!this.showPercentage) {
			this.createLabel(knob);
		} else {
			this.createPercentage(knob);
		}

		callback && callback();

	},

	createLabel: function(knob){
		'use strict';

		var dnode = null,
			dtnode = null,
			ninputnode = null,
			fontSizePercentage = 0,
			fontSizeLabel = 0;

		// Set font size.
		fontSizePercentage = Math.round(+this.inputnode.css('fontSize').replace('px','') / 2);
		fontSizeLabel = Math.round(fontSizePercentage / 1.5);

		// The font color can be altered seperately!
		this.inputnode.css('color',this.fgColor);
		this.inputnode.css('backgroundColor', 'transparent');

		// -----------------
		// Description node
		// -----------------
		dnode = this.$('<div></div>');
		dnode.css('position', 'relative');
		dnode.css('textAlign', 'center');
		dnode.css('width', this.width);
		dnode.css('fontSize', fontSizeLabel + 'px');
		dnode.addClass('wx-circlediagram-label-container');

		// Create label node.
		dtnode = this.$('<div></div>');
		dtnode.html(this.labelCircleDiagram);
		dtnode.css('fontSize', fontSizeLabel + 'px');
		dtnode.css('color', this.fgColorLabel);
		dtnode.addClass('wx-circlediagram-label');

		// Append description node.
		dnode.append(dtnode);

		knob.append(dnode);
	},

	createPercentage: function(knob) {
		'use strict';

		var dnode = null,
    		dtnode = null,
    		pnode = null,
    		ptxtnode = null,
    		dfromto = null,
    		valueTextSize = null,
    		fontSizeOriginal = 0,
			fontSizePercentage = 0,
			fontSizeLabel = 0,
			fontSizeFromTo = 0;


		// -----------------
		// Percentage node
		// -----------------

		// Clone the input value and then set the value of the input value to percentage.
		this.percentageInputNode = this.$('<input></input>');
		ptxtnode = this.percentageInputNode;
		ptxtnode.attr('style', this.inputnode.attr('style'));
		ptxtnode.attr('id','wx-input-' + this.content_id);
		ptxtnode.attr('readonly', 'readonly');
		ptxtnode.css('color',this.fgColor);
		ptxtnode.css('backgroundColor', 'transparent');
		ptxtnode.val(this.valuePercentage);
		ptxtnode.addClass('wx-circlediagram-input-percentage');
		knob.append(this.percentageInputNode);

		// Do not display the original value (knob uses this for calculations)
		this.inputnode.css('display','none');

		// Font size should be calculated runtime since its set by knob.
		fontSizeOriginal = ptxtnode.css('fontSize');
		fontSizePercentage = Math.round(+ptxtnode.css('fontSize').replace('px','') / 2);
		fontSizeLabel = Math.round(fontSizePercentage / 1.5);
		fontSizeFromTo = Math.round(fontSizePercentage / 2);
		this.fontSizePercentage = fontSizePercentage;

		// Calculate the textsize of value in characters.
		valueTextSize = ((this.valuePercentage.toString().length * fontSizePercentage) / 2) + Math.round(fontSizePercentage / 6);

		// Append knob with percentage logo.
		this.percentageNode = this.$('<div></div>');
		pnode = this.percentageNode;
		pnode.css('position', 'absolute');
		pnode.css('marginLeft', (this.width / 2) + valueTextSize);
		pnode.css('marginTop', (+ptxtnode.css('marginTop').replace('px','') + (fontSizePercentage / 3) ) + 'px');
		pnode.css('fontSize', fontSizePercentage + 'px');
		pnode.css('color', ptxtnode.css('color'));
		pnode.css('left', 0);
		pnode.css('top', 0);
		pnode.html('%');
		pnode.addClass('wx-circlediagram-percentage');
		knob.append(pnode);

		// -----------------
		// Description node
		// -----------------
		dnode = this.$('<div></div>');
		dnode.css('textAlign', 'center');
		dnode.css('width', this.width);
		dnode.css('fontSize', fontSizeLabel + 'px');
		dnode.addClass('wx-circlediagram-label-container');

		// Create label node.
		dtnode = this.$('<div></div>');
		dtnode.html(this.labelCircleDiagram);
		dtnode.css('fontSize', fontSizeLabel + 'px');
		dtnode.css('color', this.fgColorLabel);
		dtnode.addClass('wx-circlediagram-label');

		// Create text node.
		this.descriptionNodeFromTo = this.$('<div></div>');
		dfromto = this.descriptionNodeFromTo;
		dfromto.html(this.valueOriginal + ' / ' + this.maxValueUsed);
		dfromto.css('fontSize', fontSizeFromTo + 'px');
		dfromto.css('color', this.fgColorLabelFromTo);
		dfromto.addClass('wx-circlediagram-label-fromto');
		
		// Append description node.
		dnode.append(dtnode);
		dnode.append(dfromto);
		knob.append(dnode);
	},

	calcpercentage: function(value){
		'use strict';

		var maxRange = Math.abs(this.maxValueUsed) - Math.abs(this.minValue),
			valueRange = value - Math.abs(this.minValue),
			percentage = Math.round((valueRange * 100) / maxRange);

		if(maxRange == 0 && valueRange == 0) {
			percentage = 0;
		}

		return percentage; 
	},

	refresh : function(objguid) {
		'use strict';

		var value,
			valueTextSize;

		if (this.mxobj.getGuid() == objguid) {
			
			// Get value from mxobj data.
			value = +this.mxobj.get(this.attr);

			// Set the value
			this.valueOriginal = value;

			// Set max value used.
			this.maxValueUsed = (this.maxValueAttr != '') ? +this.mxobj.get(this.maxValueAttr) : this.maxValue; 

			// Reformat value to percentage if needed.
			this.valuePercentage = (this.showPercentage) ? this.calcpercentage(value) : value;

			// Refresh input node
			this.inputnode.trigger('configure', {
				max : this.maxValueAttr != '' ? +this.mxobj.get(this.maxValueAttr) : this.maxValue
			}).val(value).trigger('change');

			this.inputnode.css('color',this.fgColor);
		
			// When percentage is used refresh also the percentage text node and description node.
			if(this.showPercentage){

				// Set new percentage value.
				this.percentageInputNode.val(this.valuePercentage);
				this.percentageInputNode.css('color',this.fgColor);

				// Set the new from to values.
				this.descriptionNodeFromTo.html(this.valueOriginal + ' / ' + this.maxValueUsed);

				// Reset percentage margin-left css position.
				valueTextSize = ((this.valuePercentage.toString().length * this.fontSizePercentage) / 2) + Math.round(this.fontSizePercentage / 6);
				this.percentageNode.css('marginLeft', (this.width / 2) + valueTextSize);

			}
		}
	}
});