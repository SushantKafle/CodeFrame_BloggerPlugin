function isKeyword($value)
{
	for(var i=0;i<$Javakeywords.length;i++)
	{
		if($value == $Javakeywords[i])
			return true;
	}

	return false;
}

function getWidth($value)
{
	$data=$value.split("<br>");
	$maxLength=$data[0].length;
	for(var i=1;i<$data.length;i++)
	{
		if($data[i].length > $maxLength)
		{
			$maxLength=$data[i].length;
		}
	}

	var extra=$data.length.toString().length;

	return (($maxLength+7+extra) * 8.5 );
}

function processCode($value)
{
	//for the keywords
	$value=handleKeywords($value);

	//For multiple Line Comments
	$value=handleMLineComments($value);
		
	//For single Line Comments
	$value=handleSLineComments($value);

	//For Double Quote Values
	$value=handleDoubleQuotes($value);

	//For Single Quote Values
	$value=handleSingleQuotes($value);

	return $value;	
}

function handleSingleQuotes($value)
{
	if(squoteString.test($value))
	{
		var count=($value.match(squoteString).length);
		var itr=0;
		while(itr<count)
		{
			itr++;
			result = squoteString.exec($value);
			$value=$value.substring(0,result.index)+"<string>"+$value.substring(result.index,result.index+result[0].length)+"</string>"+$value.substring(result.index+result[0].length);
		}
	}
	return $value;
}

function handleDoubleQuotes($value)
{
	while(result = dquoteString.exec($value))
	{
		$value=$value.substring(0,result.index)+"<string>"+$value.substring(result.index,result.index+result[0].length)+"</string>"+$value.substring(result.index+result[0].length);
	}
	return $value;
}

function handleMLineComments($value)
{
	while((result = mlineComment.exec($value)))
	{
		$value=$value.substring(0,result.index)+"<comment>"+$value.substring(result.index,result.index+result[0].length)+"</comment>"+$value.substring(result.index+result[0].length);
	}
	return $value;
}

function handleSLineComments($value)
{
	while(result = slineComment.exec($value))
	{
		$value=$value.substring(0,result.index)+"<comment>"+$value.substring(result.index,result.index+result[0].length)+"</comment>"+$value.substring(result.index+result[0].length);
	}
	return $value;
}

function handleKeywords($value)
{	
	/*
	for(var i=0;i<$Javakeywords.length;i++)
	{
		var keywordMatcher = new RegExp($Javakeywords[i]);
			
		if(!keywordMatcher.test($value))
			continue;

		var count=$value.match(keywordMatcher).length;

		itr=0;
		while(itr<count)
		{
			result = keywordMatcher.exec($value);
			itr++;
			$value=$value.substring(0,result.index)+"<keyword>"+$value.substring(result.index,result.index+$Javakeywords[i].length)+"</keyword>"+$value.substring(result.index+$Javakeywords[i].length);

		}

	}
	*/
	$parsableValue = getParsableValue($value);
	
	$data= $parsableValue.split(" ");
	$finalValue="";
	var count=0;

	for(var i=0;i<$data.length;i++)
	{
		var shift=$finalValue.length+$data[i].length - (19*count);
		if(isKeyword($data[i]))
		{
			if($value[shift])
				$finalValue = $finalValue + "<keyword>" + $data[i] + "</keyword>" + $value[shift];
			else
				$finalValue = $finalValue + "<keyword>" + $data[i] + "</keyword>";

			count++;
		}else
		{
			if($value[shift])
				$finalValue = $finalValue + $data[i] + $value[shift];
			else
				$finalValue = $finalValue + $data[i];
			
		}
	}

	return $finalValue;
}


function getParsableValue($value)
{
	$parsableValue="";

	for(var i=0;i<$value.length;i++)
	{
		if($value[i] == "'" || $value[i] == '"' || $value[i] == '(' ||
			$value[i] == ')' || $value[i] == '.' || $value[i] == '{' ||
			$value[i] == '}')
		{
			$parsableValue +=" ";
		}else
		{
			$parsableValue +=$value[i];
		}
	}

	return $parsableValue;
}

function postProcess($value)
{
	$data=$value.split("<br>");
	$temp="";

	for(var i=0;i<$data.length;i++)
	{
		$temp = $temp +"<linenumber>"+(i+1)+"</linenumber>"+".&nbsp;&nbsp;&nbsp;&nbsp;"+$data[i]+"<br>";
	}

	return $temp;
}
