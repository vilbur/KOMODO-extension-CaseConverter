# Dropdown element  

| __document__( \_document )	|Set document where Dropdown is working, pane or preferences document	|  
|:---	|:---	|  
|`@param string` \_document	|	|  
|`@return self`	|	|  

##  

| __element__( selector_or_element )	|Set dropdown element	|  
|:---	|:---	|  
|`@param string` selector_or_element	|	|  
|`@return self`	|	|  

##  

| __create__( id, items, [menu_text], [menu_text] )	|Create dropdown element	|  
|:---	|:---	|  
|`@param string` id	|Id of dropdown element	|  
|`@param object` items	|Items for dropdown	|  
|`@param string` [ menu_text=null]	|Text in dropdown menu button, if null then current item is shown	|  
|`@return [element](https://developer.mozilla.org/en-US/docs/Web/API/Element)`	|	|  

##  

| __select__( [index] )	|Select item in dropdown menu	|  
|:---	|:---	|  
|`@param int` [ index=null ]	|Index of menu element, last item if index < 0	|  
|`@return self`	|	|  

##  

| __add__( attributes, [index], [select] )	|Add item to menu	|  
|:---	|:---	|  
|`@param {attr:value}|string` attributes	|Attributes for menu item, or separator if '-'	|  
|`@param int` [ index=null ]	|Index where to insert item, 'null' & '-1' append at last position	|  
|`@param boolean` [ select=false ]	|Select item after insertion if not false	|  
|`@return self`	|	|  

##  

| __delete__( [_index], index )	|Delete item at index	|  
|:---	|:---	|  
|`@param null` [ \_index=null ]	|	|  
|`@param int` index	|Index of menu element, last item if index < 0	|  
|`@return self`	|	|  
>Next item is selected after delete, if last item is deleted then previous item is selected  

##  

| __count__()	|Count of items, including separators	|  
|:---	|:---	|  
|`@return int`	|Count of items in menu	|  

##  

| __menuElements__()	|Get all elements from menupopup element	|  
|:---	|:---	|  
|`@return array`	|Array of elements	|  

##  

| __current__()	|Get index of current selected item	|  
|:---	|:---	|  
|`@return int`	|	|  

##  

| __getIndex__( index, [loop] )	|Get index value	|  
|:---	|:---	|  
|`@param int` index	|Index of menu element	|  
|`@param mixed` [ loop=null ]	|If not null, then return first item if index is bigger then max index	|  
|`@return int`	|Return index, last index if 'index < 0', null if more then max index	|  

##  


## Examples  
``` JavaScript  
var dropdown_items =  
{  
	'Item A':'console.log("Selected A")',  
	'Item B':{oncommand:'console.log("Selected B")', tooltip: 'Tooltip example'},  
};  

new Dropdown().create('#dropdown_test', dropdown_items )  

```  
  