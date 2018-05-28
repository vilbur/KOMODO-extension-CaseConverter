# StringCaseType  * Get case type of string  
``` javascript
/*---------------------------------------
	SUPPORTED TYPES OF CASE
-----------------------------------------
*/
var case_types = [
	'lower case',
	'Capital case',
	'Title Case',
	'UPPER CASE',
	
	'snake_case',
	'Snake_capital_case',
	'Snake_Title_Case',	
	'SNAKE_UPPER_CASE',
	
	'kebab-case',
	'Kebab-capital-case',
	'Kebab-Title-Case',	
	'KEBAB-UPPER-CASE',
	
	'camelCase',	
	'PascalCase',
];

/*--------------------------------------- 
	TEST
-----------------------------------------
*/
var getStringTypeTest = function()
{
	//var Logger	=  require('ko/console');
	var Logger	= ko.extensions.Logger_v3 ? new ko.extensions.Logger_v3(this).clear(true).off(false) : require('ko/console');
	

	for(var c=0; c<case_types.length;c++)
		Logger.info(
			ko.extensions.CaseConverter.StringCaseType.getStringType(case_types[c]),
		case_types[c]);
};

getStringTypeTest();

/* RESULT
    lower case         = Lower
    Capital case       = Capital
    Title Case         = Title
    UPPER CASE         = Upper
    snake_case         = Snake lower
    Snake_capital_case = Snake capital
    Snake_Title_Case   = Snake title
    SNAKE_UPPER_CASE   = Snake upper
    kebab-case         = Kebab lower
    Kebab-capital-case = Kebab capital
    Kebab-Title-Case   = Kebab title
    KEBAB-UPPER-CASE   = Kebab upper
    camelCase          = Camel
    PascalCase         = Pascal
*/
```    