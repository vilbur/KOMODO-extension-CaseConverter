/** Convert any case of string to any case
 * 
 */
ko.extensions.CaseConverter.StringCaseConverter = (function()						   
{
	function StringCaseConverter(string)
	{		
		var self	= this;
		var string_lower	= '';

		/*---------------------------------------
			BASE CASE
		-----------------------------------------
		*/
		/** 
		 */
		this.toLower = function()
		{
			return string.replace(/[-_]/gi, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\s+/g, ' ').toLowerCase().trim();
		};
		/** 
		 */
		this.toUpper = function()
		{
			return string.toUpperCase();
		};
		/** 
		 */
		this.toCapital = function()
		{
			return capitalize(string_lower);
		}; 
		/** toTitle
		 */
		this.toTitle = function()
		{
			return string_lower.split(/\s/).map(function(word){
				return capitalize(word);
			}).join(' '); 
		};
		
		/*---------------------------------------
			SPLITTER CASE
		-----------------------------------------
		*/
		/** Convert to snake case with secondary case
		 * @example snake_case|Snake_capital_case|Snake_Title_Case|SNAKE_UPPER_CASE
		 * 
		 * @param	string	secondary_case	'capital|title|upper'
		 */
		this.toSnake = function(secondary_case='')
		{
			return getSecondaryCase(secondary_case).replace(/\s/gi, '_'); 
		};
		/** Convert to snake case with secondary case
		 * @example snake_case|Snake_capital_case|Snake_Title_Case|SNAKE_UPPER_CASE
		 * 
		 * @param	string	secondary_case	'capital|title|upper'
		 */
		this.toKebab = function(secondary_case='')
		{
			return getSecondaryCase(secondary_case).replace(/\s/gi, '-'); 
		};
		/*---------------------------------------
			CONCAT CASE
		-----------------------------------------
		*/
		/** 
		 */
		this.toCamel = function()
		{
			return decapitalize( this.toTitle().replace(/\s+/gi, '') );
		}; 
		/** 
		 */
		this.toPascal =  function()
		{
			return string_lower.toLowerCase().replace(/(?:(^.)|(\s+.))/g, function(match){
				return match.charAt(match.length-1).toUpperCase();
			});
		};
		
		/*---------------------------------------
			PRIVATE
		-----------------------------------------
		*/
		/** capitalize
		 */
		var capitalize = function(string)
		{
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
		/** capitalize
		 */
		var decapitalize = function(string)
		{
			return string.charAt(0).toLowerCase() + string.slice(1);
		};
		/** Convert to desired case before kebab or snake conversion
		 */
		var getSecondaryCase = function(secondary_case)
		{
			var method	= 'to' + capitalize(secondary_case.toLowerCase());
			return secondary_case ? self[method]() : string_lower;
		}; 
		
		string_lower = this.toLower();

	}
	return StringCaseConverter;

})();