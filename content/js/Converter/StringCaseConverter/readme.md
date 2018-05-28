# StringCaseConverter  * Convert any case of string to any case  
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
var Logger	=  require('ko/console');

for(var c=0; c<case_types.length;c++)
{
	var StringCaseConverter	= new ko.extensions.vilbur.StringCaseConverter(case_types[c]);	
	
    Logger.info(StringCaseConverter.toLower(),    'toLowerCase');
    Logger.info(StringCaseConverter.toCapital(),  'toCapital');
    Logger.info(StringCaseConverter.toTitle(),    'toTitle');
    Logger.info(StringCaseConverter.toPascal(),   'toPascal');
    Logger.info(StringCaseConverter.toCamel(),    'toCamel');

    Logger.info(StringCaseConverter.toSnake(),          'toSnake');
    Logger.info(StringCaseConverter.toSnake('capital'), 'toSnake("capital")');
    Logger.info(StringCaseConverter.toSnake('title'),   'toSnake("title")');
    Logger.info(StringCaseConverter.toSnake('upper'),   'toSnake("upper")');

    Logger.info(StringCaseConverter.toKebab(),          'toKebab');
    Logger.info(StringCaseConverter.toKebab('capital'), 'toKebab("capital")');
    Logger.info(StringCaseConverter.toKebab('title'),   'toKebab("title")');
    Logger.info(StringCaseConverter.toKebab('upper'),   'toKebab("upper")');
	
}
```    