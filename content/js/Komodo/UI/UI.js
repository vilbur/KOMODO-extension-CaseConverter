/** UI
* Manage extension`s ui elements
*
*/
ko.extensions.CaseConverter.Komodo.UI = (function()
{
	function UI()
	{
		var self	= this;
		var $	= require('ko/dom');
		var document	= document;		

		/*---------------------------------------
			SETUP
		-----------------------------------------
		*/
		/** Set document where UI is operating, pane or preferences window
		 *
		 * @param	string	_document
		 * @return	self 
		 */
		this.document = function(_document)
		{
			document = _document;
			return this;
		};

		/** Query selector in document
		 * 
		 * @param	string	selector	Selector of node
		 * @param	string	selector	Selector of parent, if null, then current document is used
		 * 
		 * @return	type	[QueryObject](https://docs.activestate.com/komodo/11/sdk/api/module-ko_dom-QueryObject.html)
		 */
		this.$ = function(selector, parent=null)
		{
			//if( ! selector.match(/^[#\.]/) )
			//	selector = '#' +selector;
			parent = parent ? this.$(parent).element() : document;

			return $(selector, parent);
		};
		/** Exists
		 */
		this.exists = function(selector, parent=null)
		{
			return typeof this.$(selector, parent).element()!=='undefined'; 
		}; 
		/** Create dom element or array of elements
		 * 
		 * @example 
		 *		.create('checkbox', 'Checkbox 1')	// single node, attribute is label
		 *		.create('checkbox', {label: 'Checkbox 1'})	// single node with attributes		 
		 *		.create('checkbox', ['Checkbox 1', 'Checkbox 2'])	// multiple nodes
		 *		.create('checkbox', [{label: 'Checkbox 1'}, {label: 'Checkbox 2'}])	// multiple nodes with attributes
		 *
		 *		.create('groupbox')	// node without attributes
		 *		.create('groupbox', {id: 'gp_id'})	// node with attributes
		 *		.create('groupbox', null, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// node with children
		 *		.create('groupbox', {id: 'gp_id'}, ['checkbox', ['Checkbox 1', 'Checkbox 2']] )	// node with attributes and children
		 *
		 * @param	string	type	Type of node to append
		 * @param	null|string|object|[object] 	[attributes]	Attributes for controls, define array of strings or array of objects for adding multiple nodes 
		 * @param	[type, attributes]	children	Array of attributes [type, attributes, create] for nested loop of create() function
		 * 
		 * @return element|[elements] created node or array of created nodes
		 */
		this.create = function(type, attributes=null, children=null)
		{
			//console.log('UI.create("'+type+'")'); 
			/** Sanitize attributes
			 */
			attributes = (function()
			{
				return ! attributes ? [{}] : ( ! Array.isArray(attributes) ? [attributes] : attributes );				
			})();

			var created_nodes = attributes.map(function(node_attributes)
			{
				//console.log(  'created_nodes: ' + type +' '+node_attributes.id );
				return new ko.extensions.CaseConverter.Komodo.Node()
											 .type(type)													 
											 .attributes(node_attributes)
				 							 .get();
			});
 
			/** Last node
			 */
			var lastNode = created_nodes[created_nodes.length-1];
			
			if( children )
				lastNode.appendChild ( this.create(children[0], children[1], children[2]) );
			
			return created_nodes.length > 1 ? created_nodes : lastNode ;
		};
		/** Delete Node
		 */
		this.delete = function(selector_or_element, parent=null)
		{
			var element	= typeof selector_or_element === 'string' ? this.$(selector_or_element, parent) : selector_or_element;
			element.parentNode.removeChild(element);
		};
		
		/** Get\Set values of controls
		 * @param	string	param1
		 * @param	mixed	param2	if not false, then take only nodes without attribute prefs="false"
		 * @return	{id: value}	Object of node ids and values
		 *
		 * @example values()	// GET all values from docuent
		 * @example values('id')	// GET all values from element
		 * @example values('only-prefs')	// GET prefs values from docuent
		 * @example values('id', 'only-prefs')	// GET prefs values from element
		 * 
		 * @example values({'id': 'value to set'})	// mass SET values by object
		 * 
		 */
		this.values = function(param1, param2=false)
		{
			console.log(  'UI.values()' );

			return typeof param1 === 'object' ? setValues(param1) : getValues(param1, param2) ;
		};
		
		/** Get\Set element value
		 *
		 * @param	string	param1	Selector of element to get\set value
		 * @param	string	param2	Value of element to set
		 * @return mixed          Current value of element 
		 *
		 * @example value('#selector')	// get value of element
		 * @example value('#selector', 'value')	// set value to element
		 */
		this.value = function(param1=null, param2=null)
		{
			var element	= typeof param1 === 'string' ? this.$(param1).element() : param1;
			
			return param2 ? setValue(element, param2) : getValue(element);
		};

		/** Append new children to node
		 *
		 * @param	node|string 	parent	Node element or selector of parent to append children
		 * @param	element|array	elements	Element to append
		 * 
		 * @return	self 
		 */
		this.append = function( parent_selector, elements )
		{
			//console.log( 'UI.append()' );
			//console.log( elements );
			parent = this.$(parent_selector);
			
			/** Parent id exists
			 *  it should EXISTS
			 */
			var parentIdExists = function()
			{
				if( self.exists(parent_selector) )
					return true;
				
				alert( 'UI.append()\n\nPARENT ELEMENT DOES NOT EXISTS: '+parent_selector );
				return false;
			}; 
			
			///** Id not exists
			// *  it should NOT EXISTS
			// */
			//var childIdExists = function(id)
			//{
			//	console.log('childIdExists: '+id); 
			//	//if( ! id || ! self.exists('#'+id, parent) )
			//	if( ! self.exists('#'+id) )			
			//		return false;
			//	
			//	//alert( 'UI.append()\n\nCHILD ID ALREADY EXISTS: #'+id );
			//	alert( 'UI.append()\n\nChild in parent alerady exists\n\nPARENT: '+parent_selector+'\nCHILD:    #'+id );				
			//	return true;
			//};
			
			if( ! parentIdExists() )
				return;
			 
			if( ! Array.isArray(elements) )
				elements = [elements];	
			
			for(let e=0; e<elements.length;e++)
				parent.element().appendChild( elements[e] );				
			
			return this;
		};
		
		/** Remove child element
		 * @param	string	selector	Selector of node
		 * @return	self
		 */
		this.empty = function(selector, parent=null)
		{
			this.$(selector, parent).empty();
			
			return this;
		};
		/*---------------------------------------
			PREFSET DOM
		-----------------------------------------
		*/
		/** Get Controlset class
		 * @return	object [ControlSet](Controls/ControlSet)
		 */
		this.controlset = function()
		{
			return  new ko.extensions.CaseConverter.Komodo.Controls.ControlSet().document(document);
		};

		/** Get Dropdown class
		 * @param	string	selector	Selector of dropdown menu
		 * @return	object [Dropdown](Controls/Dropdown)
		 */
		this.dropdown = function(selector=null)
		{
			var dropdown =  new ko.extensions.CaseConverter.Komodo.Controls.Dropdown().document(document);
		
			if( selector )
				dropdown.element( this.$(selector) );
			
			return dropdown;
		}; 
		
		/*---------------------------------------
			PRIVATE VALUE METHODS
		-----------------------------------------
		*/
		/** Get values from controls
		 *
		 * @param	string	selector	Selector of node or parent nodes whereto get values
		 * @param	mixed	only_prefs	If not false then only elements withthout attribute prefs="false" will be processed
		 * @return	{id: value}	            Object with elements ids and current values
		 */
		var getValues = function(selector, only_prefs=false)
		{
			var values	= {};
			
			/** Test if getting only preferences,
			* 		if so, then if control has not 
			*/
			var preferenceTest = function(element)
			{
				return only_prefs===false || element.getAttribute('prefs')!=='false';
			}; 
			/** Set to value to values object
			 */
			var setToValues = function(id, value)
			{
				//console.log(  'setToValues(): ' + id +', '+ value );
				if( value!==null )
					values[id] = value;
			};
			 
			/** Get prefset values
			 */
			var getPrefsetValues = function(prefset_id)
			{
				var prefset_values	= {};

				/** Loop containers
				 */
				var loopContainers = function()
				{
					/** Get elements values
					 */
					var getElementsValues = function(container)
					{
						var prefset_values	= {};

						$(container).children().each(function()
						{
							var value = preferenceTest() ? self.value( this ) : null;
							
							if( value )
								prefset_values[this.id] = value;
						});
						return prefset_values;
					}; 
					
					self.$('#'+prefset_id +' .prefset-container').each(function()
					{	
						prefset_values[this.getAttribute('label')] = getElementsValues(this);
					});
				}; 
				loopContainers();

				return prefset_values;
			};
			
			/** Get values form child nodes
			 * @param	array	child_nodes	Element list of child nodes
			 */
			var loopNestedElements = function(child_nodes)
			{
				//console.log('loopNestedElements');
				//console.log( child_nodes );
				child_nodes.each(function()
				{
					var id	= this.getAttribute('id');
					//console.log( '-----child_node: '+id );
					//console.log( this );
					//console.log( ! Object.keys(this.childNodes).length );
					
					if( ! Object.keys(this.childNodes).length ){
						if( preferenceTest(this) )
							setToValues( id, self.value(this) );
								
					}else if( this.hasAttribute('prefset') )
						//console.log(  'PREF SET: ' + id );
						setToValues( id, getPrefsetValues(id) );
					
					else
						loopNestedElements( $(this.childNodes) );
				});
			}; 

			loopNestedElements( self.$(selector).children() );
			
			return values;
		};

		/** Set values to elements
		 * @param	{id: value}	values_data	Object with ids and valuest to set
		 */
		var setValues = function(values_data)
		{
			for(var id in values_data)
				if (values_data.hasOwnProperty(id))
					setValue( '#' + id,  values_data[id] );
		};

		/** Get element value
		 * @param	object	element	Element node for get value
		 */
		var getValue = function(element)
		{
			/** I element type node
			*/
			var is_control_node = ['checkbox','textbox','radio'].indexOf( element.nodeName ) > -1;
			
			if( element.id && is_control_node )
				return element.nodeName == 'checkbox' ? element.checked : element.value;
			
			return null;
		};
		
		/** Set element value
		 * @param	string	selector	Selector of element for set value
		 * @param	mixed	value	Value of element
		 */
		var setValue = function(selector, value)
		{
			console.log(  'setValue()' );
			console.log( selector );
			console.log( value );
			
			var element	= self.$(selector).element();
			
			if( element.nodeName === 'checkbox' )
				 element.checked = value;
			
			else
				element.value = value;
		}; 
	
		/** Get sanitized id
		 */
		var sanitizeId = function(id)
		{
			return id.replace(/[^a-z0-9\s-_]/gi, '').replace(/\s+/gi, '_').trim().toLowerCase();
		};
		/** test
		 */
		this.test = function()
		{
			alert( 'UI.test()' );
		}; 
	}
	return UI;

})();