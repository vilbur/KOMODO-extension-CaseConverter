# CaseConverter  * Convert any case of string to any case  
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
	var CaseConverter	= new ko.extensions.vilbur.CaseConverter(case_types[c]);	
	
    Logger.info(CaseConverter.toLower(),    'toLowerCase');
    Logger.info(CaseConverter.toCapital(),  'toCapital');
    Logger.info(CaseConverter.toTitle(),    'toTitle');
    Logger.info(CaseConverter.toPascal(),   'toPascal');
    Logger.info(CaseConverter.toCamel(),    'toCamel');

    Logger.info(CaseConverter.toSnake(),          'toSnake');
    Logger.info(CaseConverter.toSnake('capital'), 'toSnake("capital")');
    Logger.info(CaseConverter.toSnake('title'),   'toSnake("title")');
    Logger.info(CaseConverter.toSnake('upper'),   'toSnake("upper")');

    Logger.info(CaseConverter.toKebab(),          'toKebab');
    Logger.info(CaseConverter.toKebab('capital'), 'toKebab("capital")');
    Logger.info(CaseConverter.toKebab('title'),   'toKebab("title")');
    Logger.info(CaseConverter.toKebab('upper'),   'toKebab("upper")');
	
}
```    