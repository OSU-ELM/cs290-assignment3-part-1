/**
* Create an object literal with the following key value pairs:
* type: {string} 'Goldfish'
* brand: {string} 'Pepperidge Farm'
* flavor: {string} 'Cheddar'
* count: {number} 2000
* It should be returned directly by the following function
* @return {object} - the object literal
*/

function returnObjectLiteral() {
    var SnackObj = {
        type: 'Goldfish',
        brand: 'Pepperidge Farm',
        flavor: 'Cheddar',
        count: 2000
    };
    return SnackObj; //Modify ONLY this line
    //end your code
}

/**
* Create a constructor function for a `MessageLog` object.
* @constructor
* @param {string} user - The user associated to the message log
* The string indicating the user should be stored in the user property of the
* object instances.
*
* In addition, the following methods should be
* callable on a MessageLog object:
* logMessage( {string} messageText, {number} direction) - This should log a
* message
* as either being sent or received. A direction of 0 indicates it is a message
* the user sent. A direction of 1 indicates it is a message the user received.
* Behavior for other numbers is undefined.
* getSentMessage({number} n) - returns as a string, the content of the nth most
* recently sent message. To conserve memory, the object should only keep the
* last 5 message. n=0 retrieves the most recent n=4 retrieves the least recent
* of the 5.
* totalSent() - returns an integer indicating the total number of messages sent
* totalReceived() - returns an integer indicating the total number of messages
* received
*/

//your code here


var MessageLog = function (user) {
    var i;//used for loops
    this.user = user; //username data
    this.sent_msg_log = ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"]; //5 index array to hold sent messages' text
    this.last_msg_received = "EMPTY"; //the last message the user received.
    this.countsent = 0; //number of messages sent
    this.countrec = 0; //number of messages received
    this.logMessage = function (messagetext, direction) { //funtion inputs sent messages into sent_msg_log, recived into last_msg_received, and otherwise counts message types
        if (direction === 0) {//for sent messages, add to array sent_msg_log
            for (i = 4; i > 0; i--) { //only 5 sent messages are kept, with each new message added shifting the other's indexes by 1. The 5th index message is lost.
                this.sent_msg_log[i] = this.sent_msg_log[i - 1];
            }
            this.sent_msg_log[0] = messagetext;
            this.countsent += 1;
        }
        else if (direction === 1) { //in case of received message, simply place the text into last_msg_received
            this.countrec += 1;
            this.last_msg_received = messagetext;
        }
    };
    this.getSentMessage = function (n) {
        if (n > -1 && n < 5) {
            return this.sent_msg_log[n];
        }
    };
    this.totalSent = function () { //return number of messages sent
        return this.countsent;
    };
    this.totalReceived = function () {//return number of messages received
        return this.countrec;
    };
};
//end your code

/**
* Add a method to the MessageLog prototype:
* lastReceivedMessage() - returns the message text of the last message the user
* received.
*/
//your code here
MessageLog.prototype.lastReceivedMessage = function () {
    return this.last_msg_received;
};
//end your code

/**
* Create an instance of a `MessageLog` for the user "BlackHatGuy". Have the
* instance receive 3 messages: "foo", "bar" and "baz", received in that order.
* Assign it to the variable myLog.
*/

//your code here
var myLog = new MessageLog("BlackHatGuy");
myLog.logMessage("foo", 1);
myLog.logMessage("bar", 1);
myLog.logMessage("baz", 1);
//end your code
