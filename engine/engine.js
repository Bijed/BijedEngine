/* Is responsible for increasing the frame of the game */
function Engine() {
    var self = this;
    self.step = 0;
    self.framerate = 60;
    self.entities = {initialisers : [], updaters : []};
    self.keyIsHeld = {};
    self.keyIsPressed = {};
    self.mouseIsHeld = false;
    self.mouseIsClicked = undefined;
    document.addEventListener("keydown", function(event) {
        if (!self.keyIsHeld[event.keyCode])
            self.keyIsHeld[event.keyCode] = 1;
        if (self.keyIsPressed[event.keyCode] === undefined)
            self.keyIsPressed[event.keyCode] = self.step;
    });
    document.addEventListener("mousedown", function(event) {
        self.mouseIsHeld = true;
        if (self.mouseIsClicked === undefined)
            self.mouseIsClicked = self.step;
    });
    document.addEventListener("keyup", function(event) {
        self.keyIsHeld[event.keyCode] = 0;
        delete self.keyIsPressed[event.keyCode];
    });
    document.addEventListener("mouseup", function(event) {
        self.mouseIsHeld = false;
        self.mouseIsClicked = undefined;
    });
    self.clearKeyPresses = function() {
        self.keyIsPressed = {};
    };

    window.key = {
        Enter : 13,
        X : 88,
        Z : 90,
        Left : 37,
        Up : 38,
        Right : 39,
        Down : 40
    };

    self.key = {
        primary : window.key.X,
        secondary : window.key.Z,
        up : window.key.Up,
        down : window.key.Down,
        left : window.key.Left,
        right : window.key.Right
    };

    self.addInitialiser = function(initialiser) {
        self.entities.initialisers.push(initialiser);
    };
    self.addUpdater = function(updater) {
        self.entities.updaters.push(updater);
    };

    self.update = function() {
        for (var keyHeldFor in self.keyIsHeld) {
            if (self.keyIsHeld[keyHeldFor])
                ++ self.keyIsHeld[keyHeldFor];
        }
        for (var keyWasPressed in self.keyIsPressed) {
            if (self.keyIsPressed[keyWasPressed] && self.keyIsPressed[keyWasPressed] !== self.step)
                self.keyIsPressed[keyWasPressed] = false;
        }
        if (self.mouseIsClicked && self.mouseIsClicked !== self.step)
            self.mouseIsClicked = false;
        ++self.step;
        for (var i = 0; i < self.entities.updaters.length; ++i) {
                self.entities.updaters[i]();
        }
        self.frame = setTimeout(self.update, 1000 / self.framerate);
    };
    self.update();
}

engine = new Engine();

window.onload = function() {
    for (var i = 0; i < engine.entities.initialisers.length; ++i) {
                engine.entities.initialisers[i]();
        }
};

function sign(x) {
    return (x === 0 ? 0 : (x > 0 ? 1 : -1));
}

function roundTo(x, y) {
    return Math.round(x / y) * y;
}

function isInt(x) {
    return (x === Math.round(x));
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function stringInsert(string, insert, position) {
    return string.substr(0, position) + insert + string.substring(position, string.length);
}

function stringRemoveCount(string, start, count) {
    return string.substr(0, start) + string.substr(start+count);
}

function stringReplaceSection(string, insert, position, count) {
    return stringInsert(stringRemoveCount(string, position, count), insert, position);
}

function stringLines(string) {
    var newlines = string.match(new RegExp("\n", "g"));
    return (newlines ? newlines.length + 1 : (string.length > 0 ? 1 : 0));
}

function textWidth(context, string) {
    var strings = string.split("\n"), maxWidth = 0;
    for (var i = 0, lineWidth; i < strings.length; ++i)
        if ((lineWidth = context.measureText(strings[i]).width) > maxWidth)
            maxWidth = lineWidth;
    return maxWidth;
}

function fillText(context, string, x, y, maxWidth, lineHeight) {
    if (maxWidth)
        string = stringWrap(context, string, maxWidth);
    var strings = string.split("\n");
    for (var i = 0, height = 0; i < strings.length; ++i, height += lineHeight || context.fontHeight || 14)
        context.fillText(strings[i], x, y + height);
}

function stringWrap(context, string, width) {
    var newString = "";
    for (var i = 0, char, breakPoint; i < string.length; ++i) {
        char = string.charAt(i);
        if (char.match(/\s/))
            breakPoint = newString.length;
        if (char === "\n")
            breakPoint = undefined;
        newString += char;
        if (textWidth(context, newString) > width) {
            if (breakPoint !== undefined)
                newString = stringReplaceSection(newString, "\n", breakPoint, 1);
            else
                newString = stringInsert(newString, "\n", newString.length - 1);
            breakPoint = undefined;
        }
    }
    return newString;
}

function print() {
    var string = "";
    for (var i = 0; i < arguments.length; ++i)
        string += arguments[i] + (i < arguments.length - 1 ? ", " : "");
    alert(string);
}