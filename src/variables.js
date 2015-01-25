/*
Input:
a: a whole, positive number

Output:
plus5: a number that is the sum of 5 and `a`
asString: a string that is just `a` converted to a string
yourNumberIs: a string that says "Your Number is `x`." where `x` is replaced by
in input `a`
a: the original a number
*/
function variableModification(a) {
    var plus5;
    var asString;
    var yourNumberIs;
  //your code here
    plus5 = 5 + a;
    asString = a.toString(); //syntax from http://stackoverflow.com/questions/5765398/whats-the-best-way-to-convert-a-number-to-a-string
    yourNumberIs = "Your Number is " + a
  //end your code
    return [plus5, asString, yourNumberIs, a];
}

/*
Input:
b: could be anything

Output:
return true if b is a primitive string value (also known as a string literal),
false otherwise
*/
function isString(b) {
  //your code here
    if (typeof b === "string") {//syntax from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
        return true;
    }
    else {
        return false;
    }
  //end your code
}

/*
Input:
c: could be anything

Output:
return true if c is null, false otherwise
*/
function isNull(c) {
  //your code here
    if (c == null && typeof c != "undefined") {//syntax from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
        return true;
    }
    else {
        return false;
    }

  //end your code
}
