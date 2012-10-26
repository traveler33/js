/*******************************************************************************
**
** FileName: exp_parser.js
**
*******************************************************************************/


/*******************************************************************************
**
** javascript object exp_parser: AICC complex prerequisites logic statement parser
** 
** AICC prerequisites logic statement:
**		1) a list of course elements (block or lesson) with their status
**		   separated by the logic operator
**		2) single word "never"
**
**		example:	~L01&(L02=Passed|L03)
**					L01&L02&3*{L03,L04|L05,L06,L07}		  
**
** Usage: 1) create a new object based on exp_parser with logic statement and array of element name
**				var exp_op = new exp_parser(strValue,arrName);
**		  2) call method to convert logic statement to logic exoression	
**				exp_parser.to_exp();
**		  3) error code and message if error raised when convert	
**				exp_parser.error_code
**				exp_parser.error_message
**		  4) evaluate experssion
**				var result = exp_parser.eval_exp();
**		  5) error code and message if error raised when evaluation	
**				exp_parser.error_code
**				exp_parser.error_message
** 
** object name: exp_parser
**		Constructor:	exp_parser(strLogicStatement, arrElementName)
**		Properties:		error_code
**						error_message
**		Method:			to_exp()	// convert logic statement to logic expression
**						eval_exp()	// evalute logic expression		
**
******************************************************************************************/




//	object exp_parser::to_exp()
//		get all tokens
//		element name and operator check  
//		convert logic statement to an expression
function to_exp()
{

	if (this._debug)
		alert(this._trace_message="enter to_exp::"+this.exp+"@");
		
	// remove all white space in logic statement
	var statement = new String(this.exp.toString());
	
	if (statement.toString() == "never")
		return;
	
	// scan: remove all white space charactors	
	var re = /\s/;		//pattern: space,tab,line feed 
	while ( statement.match(re) != null)
		statement = statement.replace(re, "");

	// split logic statement by operator into a array, get all tokens	
	re =/\&|\||\~|\{|\}|\,|\*|\(|\)/;		//pattern: logic operator: &|~{}()*,
	while ((i=statement.search(re)) >= 0)
	{
		if (i > 0)	
		{
			this.token.push(statement.substr(0,i));
			this.tokenType.push(this._undefined);
		}	
		
		this.token.push(statement.substr(i,1));
		this.tokenType.push(this._undefined);
				
		if (i >= statement.length)
			statement = new String("");
		else
			statement = statement.substring(i+1,statement.length);
	}
	if (statement.length > 0)
	{
		this.token.push(statement);
		this.tokenType.push(this._undefined);
	}
	
	if (this._debug)
		alert(this._trace_message+="tokenizing::"+this.token.toString()+"@");


	// Scan: check element name, value, operator and declare the type of token
	var term, itema,item2,j;
	for (i=0; i<this.token.length; i++)
	{
		term = this.token[i];	// get a token
		re = /\=/;   //patten: =
		if ((j=term.search(re)) >= 0)
		{
			// token is a element with status:name=value
			// name must be system id and value must be a reserved name
			item1 = term.substr(0,j);
			item2 = term.substring(j+1,term.length);
			if ( this.name_match(item1,this.arrIDs) == false)
			{	
				this.syntax_error(4); // is not element name
				return;
			}
			if ( this.name_match(item2,this.arrReserved) == false)
			{	
				this.syntax_error(5); // is not a reseved status name.");
				return;
			}
			//	token is a legal element name with status
			this.tokenType[i] = this._atom;
			if (this._debug)
				alert(this._trace_message+="legal element with status::"+item1.toString()+"=" + item2.toString()+ "@");
		}
		else
		{
			re =/\&|\||\~|\{|\}|\,|\*|\(|\)/; //pattern: logic operator: &|~{}()*,
			if (this.name_match(term,this.arrIDs))
			{
				//	token is a legal element name
				this.tokenType[i]=this._atom;
				if (this._debug)
					alert(this._trace_message+="legal element::"+term.toString()+ "@");
			} else if (term.length == 1 && term.search(re) >=0 )
			{
				// token is a legal logic operator
				this.tokenType[i]=this._operator;
				if (this._debug)
					alert(this._trace_message+="legal operator::"+term.toString()+ "@");
			}
			else
			{
				re = /\D/;  //patten: 0~9
				if ((term.search(re)) >= 0)
				{
					this.syntax_error(5); // illeage name.");
					return;
				}	
				//token is a number
				this.tokenType[i]=this._number;
				if (this._debug)
					alert(this._trace_message+="legal number::"+term.toString()+ "@");
			}	
		}
	}	

	// Scan: Parentheses Match
	var parentheses = new Array();
	for (i=0; i<this.token.length; i++)
	{
		if (this.token[i].toString() == "(" || this.token[i].toString() == "{")
			parentheses.push (this.token[i]);
			
		if (this.token[i].toString() == ")" )
		{
			if (!( (parentheses.length > 0) && (parentheses.pop().toString() == "(") )) 
			{
				this.syntax_error(3); // Parentheses () is unbalanced.
				return;
			}
					
		}
		if (this.token[i].toString() == "}" )
		{
			if (!( (parentheses.length > 0) && (parentheses.pop().toString() == "{") )) 
			{
				this.syntax_error(3); // Parentheses {} is unbalanced.
				return;
			}
			
		}
	}	
	if (parentheses.length > 0)
	{
		this.syntax_error(3); // Parentheses is unbalanced.
		return;  
	}

	// Scan: Rules check
	//		must be a number before *
	//		must be a { after *
	//		must be "*" before {
	//		must * after a number
	var prevTokenType = this._undefined;
	for (i=0; i<this.token.length; i++)
	{
		if (this.token[i].toString() == "*")
		{
			if (prevTokenType != this._number)
			{
				this.syntax_error(6);		// must be a number before * 
				return;  
			}
			if ( (i>=(this.token.length-1)) || (this.token[i+1].toString() != "{"))
			{
				this.syntax_error(7);		// must be { after *
				return;
			}
		}
		if (this.token[i].toString() == "{")
		{
			if ( (i<=0) || (this.token[i-1].toString() != "*"))
			{
				this.syntax_error(8);		// must be * before { 
				return;
			}
		}
		if (this.tokenType[i] == this._number)
		{
			if ( (i>=(this.token.length-1)) || (this.token[i+1].toString() != "*"))
			{
				this.syntax_error(9);		// must be a * after a number
				return;
			}
		}
			
		prevTokenType = this.tokenType[i];
		 	
	}
	
	//convert to experssion
	//	rules:	element or element with status conevrt to "1" (assuming the value of element all true)
	//			insert () outside X*{...}
	//			insert () for each item inside X*{}
	//			convert {} to ()
	//			convert , to +
	//			convert * to <
	var tempToken = new Array();
	var tempTokenType = new Array();
	
	for (i=0; i<this.token.length; i++)
	{
		if (this.tokenType[i]==this._atom)
		{
			//tempTaken.push(taken[i]);
			tempToken.push(new String("1"));	// assuming all true	
			tempTokenType.push(this._atom)
		} else if (this.tokenType[i]==this._number)
		{
			tempToken.push(new String("("));
			tempTokenType.push(this._operator);
			tempToken.push(this.token[i]);
			tempTokenType.push(this._atom)
		} else if (this.tokenType[i]==this._operator)
		{
			switch (this.token[i].toString())
			{
			case "|":
				tempToken.push(this.token[i]);
				tempTokenType.push(this._operator);
				break;
			case "&":
				tempToken.push(this.token[i]);
				tempTokenType.push(this._operator);
				break;
			case "~":
				tempToken.push(this.token[i]);
				tempTokenType.push(this._operator);
				break;
			case "(":
				tempToken.push(this.token[i]);
				tempTokenType.push(this._operator);
				break;
			case ")":
				tempToken.push(this.token[i]);
				tempTokenType.push(this._operator)
				break;;
			case "*":
				tempToken.push(new String("<"));
				tempTokenType.push(this._operator);
				break;
			case "{":
				tempToken.push(new String("("));
				tempTokenType.push(this._operator);
				tempToken.push(new String("("));
				tempTokenType.push(this._operator);
				break;
			case "}":
				tempToken.push(new String(")"));
				tempTokenType.push(this._operator);
				tempToken.push(new String(")"));
				tempTokenType.push(this._operator);
				tempToken.push(new String(")"));
				tempTokenType.push(this._operator);
				break;
			case ",":
				tempToken.push(new String(")"));
				tempTokenType.push(this._operator);
				tempToken.push(new String("+"));
				tempTokenType.push(this._operator);
				tempToken.push(new String("("));
				tempTokenType.push(this._operator);
				break;
			default:
				this.syntax_error(2); // illeage Operator
				return;  
			}
		}
		else
		{
			this.syntax_error(4); // illeage name
			return;  
		}
		
	}

	this.token = tempToken;
	this.tokenType = tempTokenType;
	
	//Scan: conform no unbanlanced parentheses after convert
	for (i=0; i<this.token.length; i++)
	{
		if (this.token[i].toString() == "(" || this.token[i].toString() == "{")
			parentheses.push (this.token[i]);
			
		if (this.token[i].toString() == ")" )
		{
			if (!( (parentheses.length > 0) && (parentheses.pop().toString() == "(") )) 
			{
				this.syntax_error(2); // wrong expression after convert.
				return;
			}
		}
	}	
	if (parentheses.length > 0)
	{
		this.syntax_error(2); // wrong expression after convert.
		return;  
	}

	//Done:  new logic expression in this.exp
	this.exp = new String("");
	for (i=0;i<this.token.length;i++)
		this.exp += this.token[i];

	if (this._debug)
		alert(this._trace_message+="leave to_exp::@"+"Expression= "+this.exp.toString()+"@"
			 + "Token of expression: " + this.token.toString()+ "@"
			 + "Token type: " + this.tokenType.toString() + "@");
						
	return;
	
}

//	method exp_parser::name_match()
//		match name  whin in a array of reserved name
//		input: name, arrar of resvered name
//		return: ture or false
function name_match(name,arrName)
{
	for (var i=0; i<arrName.length; i++)
	{
		if (name.toString() == arrName[i])
			return true;
	}
	 return false;
}

// method: exp_parser::get_token()
//	get and remove first element in array of token and array tokenType
//	assign properties: cntToken, cntTokenType
function get_token()
{
	//if (this._debug)
	//	alert(this._trace_message+="enter get_token::token length="+this.token.length+"@");

	if (this.token.length > 0)
	{
		this.cntToken = this.token.shift();
		this.cntTokenType = this.tokenType.shift();
	}
	else
	{
		this.cntToken = new String("");
		this.cntTokenType = this._undefined;
	}
	
	if (this._debug)
		alert(this._trace_message+="leave get_token::token="+this.cntToken.toString()+" type="+this.cntTokenType+"@");
	
	return;
}


// method: exp_parser::eval_exp()
//		evaluate expression, parse entry point, return result "1" or "0"
function eval_exp()
{
	//alert("eval_exp::"+this.exp+"\n");

	if (this._debug)
		alert(this._trace_message="enter eval_exp::"+this.exp+"\n");
		
	var result = new String("0");
	
	if (this.exp.toString() == "never")
		return result;
					
	this.get_token();
	if ((this.cntToken == "") || (this.cntTokenType == this._undefined))
	{
		this.syntax_error(1); // No expression;
		return result;
	}
	
	result = this.eval_exp2(result);
	
	this.get_token();
	if (!((this.cntToken == "") || (this.cntTokenType == this._undefined)))
		this.syntax_error(2); // "Syntax Error::last token must be null

	if (parseInt(result)>1) 
		this.syntax_error(2); // return wrong result
		
	if (this._debug)
		alert(this._trace_message+="leave eval_exp::result="+result.toString()+"\n");
	
	return result;
	
}

// method: exp_parser::eval_exp2(value)
//		expression evalution: | or Add two term
function eval_exp2(value)
{

	if (this._debug)
		alert(this._trace_message+="enter eval_exp2::value="+value.toString()+"\n");
		
	var temp;
	var op;

	var result = this.eval_exp3(value);
		
	while ( ((op=this.cntToken.toString()) == "|") || (op == "+"))
	{
		this.get_token();
		temp = this.eval_exp3(value);
		
		switch (op) {
		case "|":
			if (this._debug)
				alert(this._trace_message+="operator:: "+result.toString()+"|"+temp.toString()+"@");

			if (result.toString() == "1" || temp.toString() == "1") 
				result = new String("1");
			else
				result = new String ("0");
					
			break;	
			
		case "+":
			if (this._debug)
				alert(this._trace_message+="operator:: "+result.toString()+"+"+temp.toString()+"@");
				
			var e = result+"+"+temp;
			result = new String(eval(e));
			break;		
		}	
		value = result;
	}
	
	if (this._debug)
		alert(this._trace_message+="leave eval_exp2::result="+result.toString()+"\n");

	return result;
	
}


// method: exp_parser::eval_exp2(value)
//		expression evalution: & or <= two term
function eval_exp3(value)
{
	if (this._debug)
		alert(this._trace_message+="enter eval_exp3::value="+value.toString()+"@");
		
	var temp;
	var op;

	var result = this.eval_exp4(value);
		
	while ( ((op=this.cntToken.toString()) == "&") || (op == "<"))
	{
		this.get_token();
		temp = this.eval_exp4(value);
		
		switch (op) {
		case "&":
			if (this._debug)
				alert(this._trace_message+="operator:: "+result.toString()+"&"+temp.toString()+"@");
			
			if (result.toString() == "1" && temp.toString() == "1")
				result = new String("1");
			else
				result = new String ("0");
			
			break;	
			
		case "<":
			if (this._debug)
				alert(this._trace_message+="operator:: "+result.toString()+"<="+temp.toString()+"@");
			
			if (parseInt(result) <= parseInt(temp))
				result = new String("1");
			else
				result = new String ("0");
					
			break;		
		}	
		value = result;		
	}
	if (this._debug)
		alert(this._trace_message+="leave eval_exp3::result="+result.toString()+"@");
				
	return result;	
}

// method: exp_parser::eval_exp4(value)
//		expression evalution: ~
function eval_exp4(value)
{
	if (this._debug)
		alert(this._trace_message+="enter eval_exp4::value="+value.toString()+"@");
				
	var op = this.cntToken.toString(); 
	var result = new String("0");
	
	if (op == "~")
	{
		this.get_token();
	}
	result = this.eval_exp5(value)

	if (op == "~")
	{
		if (this._debug)
				alert(this._trace_message+="operator::~"+result.toString()+"@");

		if (result.toString() == "1")
			result = new String("0");
		else if (result.toString() == "0")  
			result = new String("1");
		else
			this.syntax_error(2); // Syntax Error	
	}
	
	if (this._debug)
		alert(this._trace_message+="leave eval_exp4::result="+result.toString()+"@");
	
	return result;		
}

// method: exp_parser::eval_exp5(value)
//		expression evalution: process a parenthesize expression
function eval_exp5(value)
{
	if (this._debug)
		alert(this._trace_message+="enter eval_exp5::value="+value.toString()+"@");
	
	var result = new String("0");
	
	if (this.cntToken.toString() == "(")
	{
		if (this._debug)
			alert(this._trace_message+="operator::("+"@");
	
		this.get_token();
		result = this.eval_exp2(value);
		if (this.cntToken.toString() != ")")
			this.syntax_error(2); //Unbalanced Parentheses
		if (this._debug)
			alert(this._trace_message+="operator::)"+"@");
		this.get_token();
	}
	else
		result = this.eval_atom();

	if (this._debug)
		alert(this._trace_message+="leave eval_exp5::result="+result.toString()+"@");
			
	return result;						
}

// method: exp_parser::eval_atom()
//		expression evalution: get the vaule of the element
function eval_atom()
{

	if (this._debug)
		alert(this._trace_message+="enter eval_atom::@");
		
	var result = new String("0");
	if (this.cntTokenType == this._atom)
	{
		result = this.cntToken;
		this.get_token();
	}
	else
		this.syntax_error(2);  // syntax error
	
	if (this._debug)
		alert(this._trace_message+="leave eval_atom::result="+result.toString()+"@");
	
	return result;	
}

// method: exp_parser::syntax_error(code)
//		pop up error message
function syntax_error(code)
{
	error_text = new Array("No syntax error found",
			"No Expression Present",
			"General Syntax Error",
			"Unbalanced Parenthese",
			"Illeage Element Name or operator",
			"Unmatched Element Value",
			"Syntax Error: missing a number before *",
			"Syntax Error: missing { after *",
			"Syntax Error: missing * before {",
			"Syntax Error: missing * after a number"
			);
	
	this.error_code = code;
	this.error_message = this.error_message + error_text[code];
	alert(error_text[code]);
	
	this._trace_message+="enter syntax_error::result="+"Error:"+error_text[code]+"@";
}

//Object: Expression Parser
//Recursive data structure
//	Expression	->	term[|term][+term]
//  term		->	factor[&factor][~factor][<factor]
//	factor		->	boolean, number or expression
//Tokenizing: each component of an expression is called a token
//	type of token:	underfined, operator (both operator and Parentheses), number, atom
 
function exp_parser(exp, arrIDs)
{
	// hold logic statement and list of element IDs
	// change logic statement to low case string
	this.exp = new String(exp.toLowerCase());
	
	// hold logic statement and list of element name
	// change element name to low case string
	this.arrIDs = new Array();
	for ( i=0; i < arrIDs.length; i++)
		this.arrIDs.push( arrIDs[i].toLowerCase() );

	// resevered name
	this.arrReserved = new Array("true","false",
		"notattempted","n","na","incomplete","i","completed","c","failed","f","passed","p","browsed","b");
	
	// token of expression and type of token
	this.token = new Array();
	this.tokenType = new Array();
	
	// type of token
	this._undefined		= 101;
	this._operator		= 102;
	this._number		= 103;
	this._atom			= 104;
	
	// hold current token for evaluation
	this.cntToken = new String("");
	this.cntTokenType = this._undefined 

	// error message
	this.error_code = 0;
	this.error_message = new String("");
	
	// debug flag
	this._debug = false;
	this._trace_message = new String();
		
	// method
	this.to_exp = to_exp;			//convert logic statement to expression and get all tokens	
	this.get_token = get_token;		//obtain the next token
	this.eval_exp = eval_exp;		//evaluate an expression
	this.eval_exp2 = eval_exp2;		//evaluate operator '|' '+'
	this.eval_exp3 = eval_exp3;		//evaluate operatoe '&' '>'
	this.eval_exp4 = eval_exp4;		//evaluate operatoe '~'
	this.eval_exp5 = eval_exp5;		//evaluate operatoe '(' ')'
	this.eval_atom = eval_atom;		//get the value of a element
	this.syntax_error = syntax_error;	//dispaly syntax error
	this.name_match = name_match;	//name match
	
	if (this._debug)
		alert("logic statemant: " + this.exp + "\nReserved Name:" + this.arrIDs.toString());
}
