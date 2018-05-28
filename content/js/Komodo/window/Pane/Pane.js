/** Pane
*/
//ko.extensions.CaseConverter.Komodo.Pane = {};

(function()
{
	function Pane()
	{
		this.UI = {};
		/** init
		 */
		this.init = function()
		{
			ko.statusBar.AddMessage('CaseConverter.Komodo.Pane.init()', 'Extension');
			this.UI  = new ko.extensions.CaseConverter.Komodo.UI().document(document);		
		}; 
		/** test
		 */
		this.test = function() 
		{ 
			alert( 'CaseConverter.Komodo.Pane.test()' ); 
		}; 
		/** Test
		 */
		this.toggleCheckbox = function(id)
		{
			console.log( 'Pane.toggleCheckbox()' );
			var checkbox 	= document.getElementById(id);	
			checkbox.checked = ! checkbox.checked ;
		};
	}
	return Pane;

})().apply(ko.extensions.CaseConverter.Komodo.Pane);