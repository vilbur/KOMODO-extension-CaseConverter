/** Convert any case of string to any case
 */
(function()
{
	function Converter()
	{		
		var case_types = [
			'Lower',
			'Capital',
			'Title',
			'Upper',
			'Snake lower',
			'Snake capital',
			'Snake title',
			'Snake upper',
			'Kebab lower',
			'Kebab capital',
			'Kebab title',
			'Kebab upper',
			'Camel',
			'Pascal',
		];
		var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(false).off(false) : require('ko/console');
		
		var self	= this;
		var koEditor	= require("ko/editor");
		var scimoz	= ko.views.manager.currentView.scimoz;
		
		var current_pos;
		var current_anchor;
		var position_last;

		var content_current	= '';
		var content_new	= '';
		var content_last	= '';		

		var text_current	= '';
		var text_converted	= '';
		var text_last	= '';
		
		var selection_starts	= [];
		
		var is_conversion_of_same_string	= false; // for continuing conversion
		
		/** convertSelection
		 */
		this.convertSelection = function()
		{
			setPositionCurrent();
			setTextCurrent();
			console.log(  'current_pos: ' + current_pos );
			console.log(  'position_last: ' + position_last );

			isConversionOfSameString();
			
			setContentCurrent();			
			convertText();
			setSelectionStarts();			
			
			ko.views.manager.currentView.scimoz.beginUndoAction();
			
			try {
				
				if( selection_starts.length == 1 )
					replaceSingleSelection();
					
				else
					replaceMultiSelection();
				
				setPositionLast();

			} finally {
				ko.views.manager.currentView.scimoz.endUndoAction();
			} 
			
				
		}; 
		/** Test
		 */
		this.convert = function(string)
		{
			var type	= this.StringCaseType.getStringType(string);
			var next_type	= getNextType(type);

			return new ko.extensions.CaseConverter.StringCaseConverter(string)['to' + next_type[0]](next_type[1] ? next_type[1] : '');
		};
		/*---------------------------------------
			CONNTENT
		-----------------------------------------
		*/
		/** setContentCurrent
		 */
		var setContentCurrent = function()
		{
			content_current	= koEditor.getValue();  
		}; 
		/*---------------------------------------
			REPLACE SELECTION
		-----------------------------------------
		*/
		/** replaceSingleSelection
		 */
		var replaceSingleSelection = function()
		{
			saveSelection();
									
			koEditor.replaceSelection(text_converted);
			
			restoreSelection();
		};
		/** replaceMultiSelection
		 */
		var replaceMultiSelection = function()
		{
			var last_sel_pos	= 0;
			
			/** setNewContent
			 */
			var setNewContent = function()
			{
				/** Parse file content and add new text`s tabstop to each selection
				 */
				var addTabstopToNewContent = function(sel_start)
				{
					var content_substr = content_current.substring( last_sel_pos, sel_start );
					//Logger.info(content_substr, 'CaseConverter: '+'content_substr');

					content_new += content_substr + '[[%tabstop1:'+text_converted+']]';					
					
					last_sel_pos	= sel_start + text_current.length;				
				};
				
				content_new	= '';
				
				for(var s=0; s<selection_starts.length;s++)
					addTabstopToNewContent(selection_starts[s]);
					
				/* Add content after last tabstop */
				content_new += content_current.substring( last_sel_pos, content_current.length );
				
				/** Remove '[[%tabstop:...]]' from contetn_new */
				content_last	= content_new.replace(/\[\[%tabstop\d:([^\]]+)\]\]/gi, '$1');
				//Logger.info(content_last, 'CaseConverter: '+'content_last');
				
				
			};
			/** removeContent
			 */
			var removeContent = function()
			{
				koEditor.setValue('');	
			};
			/** insertSnippet
			 */
			var insertSnippet = function()
			{
				var content_snippet = {
					hasAttribute: function(name) {
						return name in this;
					},
					getStringAttribute: function(name) {
						return this[name];
					},
					name:	"content snippet",
					indent_relative:	"true",
					set_selection:	"true", 
					value:	content_new
				};
				
				ko.projects.snippetInsert(content_snippet); 
			}; 
			
			setNewContent();
			updateSelectionStarts();
			//Logger.info(content_new, 'CaseConverter: '+'content_new');
			removeContent();
			insertSnippet();
			
		};

		/*---------------------------------------
			ANALYZE SELECTIONS
		-----------------------------------------
		*/
		/** setTextCurrent
		 */
		var setTextCurrent = function()
		{
			//text_current	= is_conversion_of_same_string ? text_last : koEditor.getSelection();
			text_current	= koEditor.getSelection();			
		};
		/** convertText
		 */
		var convertText = function()
		{
			text_converted = self.convert(text_current);
			
			text_last = text_converted;
		};
		/** isConversionOfSameString
		 */
		var isConversionOfSameString = function()
		{
			//is_conversion_of_same_string = text_current===text_last && current_pos === position_last && koEditor.getValue() === content_last;
			is_conversion_of_same_string = text_current===text_last && current_pos === position_last;
			
			console.log(  'is_conversion_of_same_string: ' + is_conversion_of_same_string );
			//console.log(  'text_current: ' + text_current );
			//console.log(  'text_last: ' + text_last );
		}; 
		/** setSelectionStarts
		 */
		var setSelectionStarts = function()
		{	
			if( is_conversion_of_same_string )
				return;
			
			selection_starts	= [];

			while ( selection_starts.indexOf( koEditor.getCursorPosition('absolute')-text_current.length) === -1 )
			{
				selection_starts.push(koEditor.getCursorPosition('absolute')-text_current.length);
				ko.commands.doCommand('cmd_removePrevWordInCaretSet');
			}
			
			selection_starts.sort(function(a, b){return a - b;}); 
		};
		/** Update previous selections starts with previous converted text
		 */
		var updateSelectionStarts = function()
		{				
			if( text_current.length == text_converted.length )
				return; 
			
			selection_starts = selection_starts.map(function(sel_start, index)
			{
				return  sel_start + index * (text_converted.length - text_current.length);
			});
		}; 
		/** 
		 */
		var setPositionCurrent = function()
		{
			current_pos	= ko.views.manager.currentView.scimoz.currentPos;
		};
		/** 
		 */
		var setPositionLast = function()
		{
			position_last = ko.views.manager.currentView.scimoz.currentPos;
		};
		/**  
		 */
		var saveSelection = function() 
		{ 
		  current_pos  	= scimoz.currentPos; 
		  current_anchor	= scimoz.anchor; 
		}; 

		/** 
		 */
		var restoreSelection = function()
		{
			scimoz.currentPos	= position.current.anchor > position.current.pos ? position.current.pos : position.current.anchor;
			scimoz.anchor	= scimoz.currentPos + text_converted.length;
		};
		/*---------------------------------------
			GET NEXT CASE TYPE 
		-----------------------------------------
		*/
		/** getNextType
		 */
		var getNextType = function(type)
		{
			var next_index	= getNextIndex( type );
			
			return case_types[next_index].split(/\s/);
		};
		
		/** getNextIndex
		 */
		var getNextIndex = function(type)
		{
			var index	= case_types.indexOf( type ) ;
			
			return index < case_types.length-1 ? index +1 : 0;
		};
		
	}
	return Converter;

})().apply(ko.extensions.CaseConverter.Converter);