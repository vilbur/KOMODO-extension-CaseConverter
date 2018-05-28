/** Get case type of string
 *
 * @param	string	string
 * @return	string	Case type of string
 */
(function()
{
	function StringCaseType()
	{		
		var string	= '';		
		var words	= [];
		
		var snake_or_kebab	= '';
		
		var case_types = [
			'lower',
			'upper',
			'capital',
			'title',
			'camel',
			'pascal',
		];
				/** Test
		 */
		this.test = function()
		{
			alert('StringCaseType');
		};
		/*---------------------------------------
			BASE CASE
		-----------------------------------------
		*/
		/** Get type of string
		 * @return	string	Type of string E.g.: C
		 */
		this.getStringType = function(_string)
		{
			string = _string;
			setSnakeOrKebab();
			sanitizeString();
			
			words	= string.split(/\s/g);

			/** concat type name
			 * @return	string	E.G.: 'Capital snake case'
			 */
			var concatTypeName = function(case_type)
			{
				return capitalize( (snake_or_kebab? snake_or_kebab+' ' : '') + case_type );
			};
			
			for(var c=0; c<case_types.length;c++)
				if( this[method(case_types[c])]() )
					return concatTypeName(case_types[c]);
		};
		/*---------------------------------------
			STRING TEST
		-----------------------------------------
		*/
		/** Match string which has not lower case
		 */
		this.isLowerCase = function()
		{
			return string.match(/[A-Z]/g)===null;
		}; 
		/** Match string which has not upper case
		 */
		this.isUpperCase = function()
		{
			return string.match(/[a-z]/g)===null;
		}; 
		/** If only first word is capital
		 */
		this.isCapitalCase = function()
		{
			var is_capital	= false;
			
			for(var w=0; w<words.length;w++)
				if( isCapitalWord(words[w]) && w===0 )
					is_capital = true;
					
				else if( ! isLowerCaseWord(words[w]) )
					is_capital = false;
				
			return is_capital;
		}; 
		/** If all words are capital
		 */
		this.isTitleCase = function()
		{
			var is_title	= true;
			
			for(var w=0; w<words.length;w++)
				if( ! isCapitalWord(words[w]) )
					is_title = false;

			return is_title;
		};
		/** isCamelCase
		 */
		this.isCamelCase = function()
		{
			return string.match(/^[^A-Z][^A-Z]*(([A-Z][^A-Z]*)+)$/g)!==null;
		}; 
		/** isPascalCase
		 */
		this.isPascalCase = function()
		{
			return  string.match(/^[A-z]+$/gi)!==null && string.match(/^[A-Z][^A-Z]+(([A-Z][^A-Z]*)+)$/g)!==null;
		}; 
		
		/*---------------------------------------
			PRIVATE
		-----------------------------------------
		*/
		/** setSnakeOrKebab
		 */
		var setSnakeOrKebab = function()
		{
			snake_or_kebab = string.match(/_/gi) ? 'snake' : (string.match(/-/gi) ? 'kebab' : ''); 
		};
		/** Replace '_' and '-' with whitespace ' '
		 */
		var sanitizeString = function()
		{
			string	= string.replace(/[-_]+/gi, ' ').replace(/\s+/gi, ' ').trim(); 
		}; 
		/*---------------------------------------
			WORD TETS
		-----------------------------------------
		*/
		/** 
		 */
		var isCapitalWord = function(word)
		{
			return word.match(/^[A-Z][^A-Z]*$/g);
		}; 
		/** 
		 */
		var isLowerCaseWord = function(word)
		{
			return word.match(/[A-Z]/g)===null;
		};
		/*---------------------------------------
			HELPERS
		-----------------------------------------
		*/
		/** Get method in this object by case type
		 * @example 'isCamelCase'
		 */
		var method = function(case_type)
		{
			return 'is'+capitalize(case_type)+'Case';
		}; 
		/** capitalize
		 */
		var capitalize = function(string)
		{
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

	}
	return StringCaseType;

})().apply(ko.extensions.CaseConverter.Converter.StringCaseType);