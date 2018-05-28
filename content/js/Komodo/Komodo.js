/** Container for classes which are not related to extension
 * 
 */
(function()
{
	function Komodo()
	{
		///** init Document
		// */
		//this.initDocument = function()
		//{
		//	ko.statusBar.AddMessage('ko.extensions.CaseConverter.Komodo.initDocument()', 'Extension');
		//	this.Komodo.Document.hostName('CaseConverter');
		//}; 
		/** savePreferences
		 */
		this.savePreferences = function(window_class)
		{
			
		}; 
		
		/** test
		 */
		this.test = function()
		{
			alert( 'Komodo' );
			return new ko.extensions.CaseConverter.Komodo();
		};
		
		
	}
	return Komodo;

})().apply(ko.extensions.CaseConverter.Komodo);