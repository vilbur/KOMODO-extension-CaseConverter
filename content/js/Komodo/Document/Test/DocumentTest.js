/** Get document of extension`s pane
 */
var getPaneDocument = function()
{
	console.log( ko.extensions.CaseConverter.Komodo.Document.get('pane') );
};

getPaneDocument();