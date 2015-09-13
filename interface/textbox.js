/*
    === Still to add ===
    > Symbols in text
    > Different coloured/sized text
    > Yes/No Questions
    > Option lists
    > Word from categories
*/

engine.addInitialiser(textboxInitialise);

textboxCanvas = undefined;
textbox = undefined;
function textboxInitialise() {
    textboxCanvas = document.getElementById("textbox");
    textboxCanvas.width = 256;
    
    textboxCanvas.paddingX = 8;
    textboxCanvas.paddingY = 4;
    textboxCanvas.fontHeight = 16;
    textboxCanvas.lineHeight = 22;
    textboxCanvas.lines = 2;
    
    textboxCanvas.height = (textboxCanvas.fontHeight * textboxCanvas.lines) + ((textboxCanvas.lineHeight - textboxCanvas.fontHeight) * (textboxCanvas.lines - 1)) + (textboxCanvas.paddingY * 2);
    textboxCanvas.ctx = textboxCanvas.getContext("2d");
    
    textbox = new OverworldTextbox();
    textbox.draw(textboxCanvas.ctx);
    
    engine.addUpdater(function(element){ return (function() { element.update(element);  element.draw(); }); }(textbox));
}

function OverworldTextbox() {
    this.messages = [];
    this.displayed = "";
    this.charactersDisplayed = 0;
    this.line = 0;
    this.typeSpeed = 2;
    this.fastTypeSpeed = 2;
    this.scrollSpeed = 1/10;
    
    this.say = function(message) {
        if (message instanceof Array) {
            for (var i = 0; i < message.length; ++i)
                this.addMessage(message[i]);
        } else
            this.addMessage(message);
    };
    
    this.addMessage = function(message) {
        message = "" + message; // Typecast to string
        if (message.length > 0) {
            this.messages.push(stringWrap(textboxCanvas.ctx, message, textboxCanvas.width - textboxCanvas.paddingX * 2));
            if (typeof player !== "undefined")
                player.hasControl = false;
        }
    };
    
    this.update = function() {
        if (!isInt(roundTo(this.line, this.scrollSpeed)))
            this.line += this.scrollSpeed;
        
        if (this.messages.length > 0 && ((this.line + textboxCanvas.lines >= stringLines(this.messages[0]) && this.displayed.length === this.messages[0].length)  || (this.line + textboxCanvas.lines < stringLines(this.displayed))) && engine.keyIsPressed[engine.key.primary]) {
            if (this.line + textboxCanvas.lines < stringLines(this.messages[0])) {
                this.line += this.scrollSpeed;
            }
            else {
                this.messages.splice(0, 1);
                this.displayed = "";
                this.charactersDisplayed = 0;
                this.line = 0;
                if (this.messages.length === 0 && player) {
                    player.hasControl = true;
                    engine.clearKeyPresses();
                }
            }
            return;
        }
        
        if (this.messages.length > 0 && this.displayed.length < this.messages[0].length) {
            if (stringLines(this.displayed) <= this.line + textboxCanvas.lines) {
                this.charactersDisplayed += (engine.keyIsHeld[engine.key.primary] ? this.fastTypeSpeed : this.typeSpeed);
                this.displayed = this.messages[0].substr(0, Math.floor(this.charactersDisplayed));
                if (stringLines(this.displayed) > this.line + textboxCanvas.lines) {
                    this.displayed = this.displayed.substr(0, this.displayed.lastIndexOf("\n") + 1);
                    this.charactersDisplayed = this.displayed.length;
                }
            }
            return;
        }
    };
    
    this.draw = function() {
        var context = textboxCanvas.ctx, active = (this.messages.length > 0);
        context.fillStyle = (active ? "hsl(" + (50 + 25 * Math.sin((new Date() % 2000) / 2000 * Math.PI * 2)) + ", 100%, 50%)" : "grey");
        context.fillRect(0, 0, textboxCanvas.width, textboxCanvas.height);
        context.fontHeight = textboxCanvas.fontHeight;
        context.font = context.fontHeight + "px sans-serif";
        context.textBaseline = "top";
        context.fillStyle = (active ? "white": "darkgrey");
        context.fillRect(textboxCanvas.paddingX, 0, textboxCanvas.width - textboxCanvas.paddingX * 2, textboxCanvas.height);
        context.fillStyle = "black";
        fillText(context, this.displayed, textboxCanvas.paddingX, textboxCanvas.paddingY - textboxCanvas.lineHeight * this.line, undefined, textboxCanvas.lineHeight);
        if (!active) {
            context.clearRect(0, 0, textboxCanvas.width, textboxCanvas.height);
            return;
        }
    };
}