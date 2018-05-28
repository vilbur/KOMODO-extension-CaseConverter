/** CaseConverter
 */
(function()
{
	function CaseConverter()
	{
		var self	= this;
	
		/** localizedTest
		 */
		this.localizedTest = function(string)
		{
			var bundleSvc = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
			var _locale = bundleSvc.createBundle("chrome://CaseConverter/locale/CaseConverter.properties");
			
			/** GetLocalizedString
			 */
			var GetLocalizedString = function(str) {
				return _locale.GetStringFromName(str);
			};
			
			alert('ko.extensions.CaseConverter.Test("'+string+'")\n\n'+GetLocalizedString('property.property_test') );
		};
		/** Get new instance of object in this
		 * @example _new('UI') get new instance of this.UI()  
		 */
		this._new = function(_class)
		{
			return new this.Komodo[_class]();
		};
		
		/** Access to UI class
		 * @param	object	_document	Document where UI is working
		 */
		this.UI = function(_document=null)
		{
			return  new ko.extensions.CaseConverter.Komodo.UI().document(_document ? _document : document);			
		}; 
		/** 
		 */ 
		this.test = function()
		{
			alert( 'CaseConverter.test()' );
			console.log( window.frameElement.contentWindow.document.location );
		};
		
	}

	return CaseConverter;

})().apply(ko.extensions.CaseConverter);

/** Access to extension from UI 
 *	Access from preference.xul
 */
function CaseConverter()
{
	return ko.windowManager.getMainWindow().ko.extensions.CaseConverter;
}