$Javakeywords =["abstract","continue","for","new","switch","assert","default","goto","package","synchronized","boolean","do","if","private","this","break","double","implements","protected","throw","byte","else","import","public","throws","case","enum","instanceof","return","transient","catch","extends","int","short","try","char","final","interface","static","void","class","finally","long","strictfp","volatile","const","float","native","super","while","true","false","null"];

//Regex for Java:

/*Comment:
1. Single Line
2. Multiple Line
*/

//Singe Line Comment
var slineComment = /\/\/([^<br>]+)<br>/gi;
//Multiple Line Comment
var mlineComment = /\/\*([^\*\/]+)\*\//gi;
//Double Quote Values
var dquoteString = /\"([^\"]+)\"/gi;
//Single Quote Values
var squoteString = /\'([^\']+)\'/gi;

