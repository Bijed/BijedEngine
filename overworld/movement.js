/*
    === Still to add ===

    = Tile types=
    > Water falls
    > Bike ramps
    > Bike hop blocks
    > Mud slopes
    > Long grass
    > (Deep) Sand
    > Switches
    > Bridges
    > Cracks
    > Hills (like the cycling road in RBY)

    === Bugs ===
    > When multiple tiles are placed on top of each other, there is often flickering and other errors.

*/

engine.addInitialiser(movementInitialise);

movementCanvas = undefined;
player = undefined;
view = undefined;
function movementInitialise() {
    movementCanvas = document.getElementById("overworld");
    movementCanvas.width = 256;
    movementCanvas.height = 192;
    movementCanvas.ctx = movementCanvas.getContext("2d");
    movementCanvas.entities = [];

    movementCanvas.update = function(self) {
        for (var i = 0; i < self.entities.length; ++i)
            if (self.entities[i].update)
                self.entities[i].update();
    };

    movementCanvas.draw = function(self) {
        self.ctx.fillStyle = "purple";
        self.ctx.fillRect(0, 0, movementCanvas.width, movementCanvas.height);
        self.ctx.fillStyle = "pink";
        self.ctx.fillRect((-view.x), (-view.y), map.width * grid.cell.width, map.height * grid.cell.height);

        self.ctx.fillStyle = "black";
        self.ctx.fillText("Hello", 0, 0);

        var depths = self.entities;
        depths.sort(function(a, b) { return a.z - b.z; });

        for (var i = 0; i < depths.length; ++i)
            if (depths[i].draw)
                depths[i].draw(self.ctx);
    };

    engine.addUpdater(function(element){ return (function() { element.update(element);  element.draw(element); }); }(movementCanvas));

    map = new Map(15, 10, "Test Town");

    movementCanvas.entities.push(player = new Character(0, 0));
    player.hasControl = true;

    movementCanvas.entities.push(view = new OverworldView(movementCanvas.width, movementCanvas.height, player));

    movementCanvas.entities.push(new Water(2, 3, 3, 3));
    movementCanvas.entities.push(new Ice(1, 7, 7, 3));
    movementCanvas.entities.push(new Obstacle(2, 7, 1, 2));
    movementCanvas.entities.push(new WeakIce(8, 7, 1, 3));
    movementCanvas.entities.push(new Obstacle(9, 6));
    movementCanvas.entities.push(new Ledge(5, 1, 7, directions.south));
    movementCanvas.entities.push(new Ice(9, 2, 3, 4));
    movementCanvas.entities.push(new Ledge(10, 6, 1, directions.south));
    movementCanvas.entities.push(new Obstacle(7, 3, 1, 2));
    fillTileArea(Sand, 0, 3, 2, 2);
    movementCanvas.entities.push(new Sign(2, 2, "Hello, I'm a sign!"));
    movementCanvas.entities.push(new Sign(0, 9, "^_^"));
    movementCanvas.entities.push(new Sign(0, 2, ["I have lots and lots of text that goes over multiple lines, so you can see the cool scrolling effect :D", "I also have multiple messages, which works just fine."]));
	movementCanvas.entities.push(new Grass (1, 1))

    fillRelativeTilePath(function(x, y, direction) { return new Current(x, y, direction) }, 3, 1, directions.vertical, [1, 2, 4, -4], undefined, true);

    movementCanvas.entities.push(new Spinner(3, 0, directions.east));
    movementCanvas.entities.push(new Spinner(13, 0, directions.south));
    movementCanvas.entities.push(new Ledge(13, 4, 2, directions.north));
    movementCanvas.entities.push(new Marsh(0, 1));

    movementCanvas.draw(movementCanvas);
    movementCanvas.update(movementCanvas);
}

function OverworldView(width, height, object) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.follow = object || undefined;

    this.update = function() {
        if (typeof this.follow !== "undefined") {
            this.x = this.follow.x * grid.cell.width - this.width / 2 + grid.cell.width / 2;
            this.y = this.follow.y * grid.cell.height - this.height / 2 + grid.cell.height / 2;
        }
    };
}

function drawGradient(context, x, y, width, height, direction, fromColour, toColour) {
    var drawX = (-view.x) + x * grid.cell.width, drawY = (-view.y) + y * grid.cell.height;
    var gradient = context.createLinearGradient(drawX + (grid.cell.width / 2) - (Math.cos(direction) * grid.cell.width / 2), drawY + (grid.cell.height / 2) - (Math.sin(direction) * grid.cell.height / 2), (drawX) + (grid.cell.width / 2) + (Math.cos(direction) * grid.cell.width / 2), (drawY) + (grid.cell.height / 2) + (Math.sin(direction) * grid.cell.height / 2));
    gradient.addColorStop(0, fromColour);
    gradient.addColorStop(1, toColour);
    context.fillStyle = gradient;
    context.fillRect(drawX, drawY, width, height);
}

function Character(x, y) {
    this.x = x;
    this.y = y;
    this._x = x;
    this._y = y;
    this.x_ = x;
    this.y_ = y;
    this.direction = directions.south;
    this.speed = 0;
    this.movementState = movements.walking;
    this.z = 1;
    this.hasControl = true;

    this.move = function() {
        var alignedWithGrid = (this.x % 1 === 0 && this.y % 1 === 0);
        if (!alignedWithGrid)
            return;
        var onTile = map.tile(this.x, this.y), previousDirection = this.direction;
        if (onTile === tileTypes.verglas || onTile === tileTypes.hustle)
            this.movementState = movements.walking;
        if (this.hasControl && this.x === this.x_ && this.y === this.y_) {
            if (engine.keyIsHeld[engine.key.secondary] && this.movementState === movements.walking)
                this.movementState = movements.running;
            if (!engine.keyIsHeld[engine.key.secondary] && this.movementState === movements.running)
                this.movementState = movements.walking;
            var directionHeld = (engine.keyIsHeld[engine.key.left] ? directions.west : (engine.keyIsHeld[engine.key.up] ? directions.north : (engine.keyIsHeld[engine.key.right] ? directions.east : (engine.keyIsHeld[engine.key.down] ? directions.south : undefined))));
            if (typeof directionHeld !== "undefined" && directionHeld !== this.direction) {
                this.direction = directionHeld;
            }
            var heldFor = (this.direction === directions.west ? engine.keyIsHeld[engine.key.left] : this.direction === directions.east ? engine.keyIsHeld[engine.key.right] : this.direction === directions.south ? engine.keyIsHeld[engine.key.down] : engine.keyIsHeld[engine.key.up]);
            if (typeof directionHeld === "undefined" || heldFor < engine.framerate / 10)
                directionHeld = undefined;
            if (directionHeld !== undefined) {
                if (this.direction === directionHeld) {
                    /* Trigonometric approximation causes some error, so we need to round the results */
                    this.x_ += Math.round(Math.cos(this.direction));
                    this.y_ += Math.round(Math.sin(this.direction));
                }
                else
                    this.direction = directionHeld;
            }
        }
        var tileProperties, tileDirection, hurled = false;
        tileProperties = map.properties(this.x, this.y);
        switch (map.tile(this.x, this.y)) {
            case tileTypes.hustle:
                tileDirection = tileProperties.direction;
                if (tileProperties.approachable === directions.any) {
                    this.direction = tileDirection;
                    this.x_ = this.x + Math.round(Math.cos(tileDirection));
                    this.y_ = this.y + Math.round(Math.sin(tileDirection));
                    hurled = tileProperties.hurl;
                    //if (hurled)
                    this.movementState = movements.walking;
                }
                break;
            case tileTypes.tenacious:
                this.x_ = this.x;
                this.y_ = this.y;
                var keyIsPressedInDirection = (this.direction === directions.west ? engine.keyIsPressed[engine.key.left] : this.direction === directions.east ? engine.keyIsPressed[engine.key.right] : this.direction === directions.south ? engine.keyIsPressed[engine.key.down] : engine.keyIsPressed[engine.key.up]);
                if (keyIsPressedInDirection && previousDirection !== this.direction) {
                    var stickChance = Math.random();
                    if (stickChance > 0.8) {
                        this.x_ += Math.round(Math.cos(this.direction));
                        this.y_ += Math.round(Math.sin(this.direction));
                    }
                }
                if (!tileProperties.twistable)
                    this.direction = previousDirection;
                break;
        }
        var validTile, lastValidTile = {x : this.x, y : this.y}, currentTile, beingHurled;
        while (lastValidTile.x !== this.x_ || lastValidTile.y !== this.y_) {
            currentTile = {x : this.x_, y : this.y_};
            validTile = true;
            beingHurled = false;
            switch (map.tile(this.x_, this.y_)) {
                case undefined:
                    validTile = false;
                    break;
                case tileTypes.water:
                    if (this.movementState !== movements.surfing) {
                        validTile = false;
                    }
                    break;
                case tileTypes.trammel:
                    validTile = false;
                    break;
                case tileTypes.verglas:
                    this.x_ += Math.round(Math.cos(this.direction));
                    this.y_ += Math.round(Math.sin(this.direction));
                    break;
                case tileTypes.hustle:
                    tileProperties = map.properties(this.x_, this.y_);
                    tileDirection = tileProperties.direction;
                    validTile = (tileProperties.approachable === directions.any);
                    if (tileProperties.approachable === directions.congruous && tileDirection === this.direction) {
                        this.x_ += Math.round(Math.cos(tileDirection));
                        this.y_ += Math.round(Math.sin(tileDirection));
                    }
                    break;
                default:
                    beingHurled = hurled;
                    break;
            }
            if (validTile)
                lastValidTile = currentTile;
            if (beingHurled) {
                this.x_ += Math.round(Math.cos(this.direction));
                this.y_ += Math.round(Math.sin(this.direction));
            }
            if (!validTile && this.x_ === currentTile.x && this.y_ === currentTile.y) {
                this.x_ = lastValidTile.x;
                this.y_ = lastValidTile.y;
            }
        }
        //this.x_ = lastValidTile.x;
        //this.y_ = lastValidTile.y;
    };

    this.canInteractWith = function(object, direction) {
        return (this.hasControl && ((this.x === object.x && Math.abs(this.y - object.y) === 1) || (this.y === object.y && Math.abs(this.x - object.x) === 1)) && this.direction === Math.atan2(object.y - this.y, object.x - this.x) && (typeof direction === "undefined" || direction === this.direction));
    };

    this.jumpTo = function(x, y) {
        this.x = x;
        this.y = y;
        this.x_ = x;
        this.y_ = y;
    };

    this.update = function() {
        this._x = this.x;
        this._y = this.y;
        this.move();
        switch (this.movementState) {
            case movements.walking:
                this.speed = 1 / 16;
                break;
            case movements.running:
                this.speed = 1 / 8;
                break;
            case movements.cycling:
                this.speed = 1 / 4;
                break;
        }
        this.x += sign(this.x_ - this.x) * this.speed;
        this.y += sign(this.y_ - this.y) * this.speed;
        /*if (Math.abs(this.x_ - this.x) < this.speed)
            this.x = this.x_;
        if (Math.abs(this.y_ - this.y) < this.speed)
            this.y = this.y_;*/
    };

    this.draw = function(context) {
        drawGradient(context, this.x, this.y, grid.cell.width, grid.cell.height, this.direction, "darkred", "red");
    };
}

function fillTileArea(object, x, y, width, height, initialiser, directed) {
    var newObject;
    if (width < 0) {
        x += width + 1;
        width = -width;
    }
    if (height < 0) {
        y += height + 1;
        height = -height;
    }
    for (var cellX = x; cellX < x + width; ++cellX)
        for (var cellY = y; cellY < y + height; ++cellY) {
            newObject = new object(cellX, cellY, directed);
            if (initialiser)
                initialiser(newObject);
            movementCanvas.entities.push(newObject);
        }
}
function fillTilePath(object, path, initialiser, directed) {
    var width, height, direction;
    for (var i = 0; i < path.length - 1; ++i) {
        width = path[i+1].x - path[i].x;
        width += sign(width) || 1;
        height = path[i+1].y - path[i].y;
        height += sign(height) || 1;
        direction = Math.atan2((Math.abs(height) > 1 ? sign(height) : 0), (Math.abs(width) > 1 ? sign(width) : 0));
        if (Math.abs(width) > 1 && i < path.length - 2)
            width -= sign(width);
        if (Math.abs(height) > 1 && i < path.length - 2)
            height -= sign(height);
        fillTileArea(object, path[i].x, path[i].y, width, height, initialiser, (directed ? direction : undefined));
    }
}
function fillRelativeTilePath(object, x, y, initialDirection, relativePath, initialiser, directed) {
    var path = [], currentX = x, currentY = y, nextSegmentIsHorizontal = (initialDirection === directions.horizontal);
    path.push({x : currentX, y : currentY});
    for (var i = 0; i < relativePath.length; ++i) {
        if (nextSegmentIsHorizontal)
            currentX += relativePath[i];
        else
            currentY += relativePath[i];
        path.push({x : currentX, y : currentY});
        nextSegmentIsHorizontal = !nextSegmentIsHorizontal;
    }
    fillTilePath(object, path, initialiser, directed);
}

function Obstacle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width || 1;
    this.height = height || 1;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.trammel);
    this.draw = function(context) {
        context.fillStyle = "black";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
    };
}

function Sign(x, y, text) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.trammel);

    this.text = text || "";

    this.update = function() {
        if (typeof textbox !== "undefined" && ((engine.keyIsPressed[engine.key.primary] && player.canInteractWith(this)) || (player.canInteractWith(this, directions.north) && engine.keyIsPressed[engine.key.up]))) {
            textbox.say(this.text);
        }
    };

    this.draw = function(context) {
        context.fillStyle = "orange";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
    };
}

function Current(x, y, direction) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    this.direction = direction;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.hustle, {direction : this.direction, approachable: directions.any, hurl : false});
    this.draw = function(context) {
        drawGradient(context, this.x, this.y, grid.cell.width, grid.cell.height, this.direction, "green", "lime");
    };
}

function Spinner(x, y, direction) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    this.direction = direction;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.hustle, {direction : this.direction, approachable: directions.any, hurl : true});
    this.draw = function(context) {
        drawGradient(context, this.x, this.y, grid.cell.width, grid.cell.height, this.direction, "darkgrey", "grey");
    };
}

function Ledge(x, y, length, direction) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.length = length || 1;
    this.direction = direction || directions.south;
    map.setTiles(this.x, this.y, 1 + (this.length - 1) * Math.abs(Math.round(Math.sin(this.direction))), 1 + ((this.length - 1) * Math.abs(Math.round(Math.cos(this.direction)))), tileTypes.hustle, {direction : this.direction, approachable: directions.congruous, hurl : false});
    this.draw = function(context) {
        drawGradient(context, this.x, this.y, grid.cell.width + (this.length - 1) * Math.abs(Math.sin(this.direction)) * grid.cell.width, grid.cell.height + (this.length - 1) * Math.abs(Math.cos(this.direction)) * grid.cell.height, this.direction, "brown", "darkgoldenrod");
    };
}

function Water(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width || 1;
    this.height = height || 1;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.water);
    this.draw = function(context) {
        context.fillStyle = "hsl(" + (225 + 25 * Math.sin((new Date() % 2000) / 2000 * Math.PI * 2)) + ", 100%, 50%)";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
    };
}

function Ice(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width || 1;
    this.height = height || 1;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.verglas);
    this.draw = function(context) {
        context.fillStyle = "hsl(180, 100%, 80%)";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
    };
}

function Grass(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width || 1;
    this.height = height || 1;
    this.states = [];
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.brush);
    this.update = function() {
        if (player.x >= this.x && player.x < this.x + this.width && isInt(player.x) && player.y >= this.y && player.y < this.y + this.height && isInt(player.y) && (player.x !== player._x || player.y !== player._y)) {
            /* Randomly initiate a battle */
			if (chance(encounterRates.grass, encounterRates.base)) {
				console.log("Battle should occur")
				if (Battle === null) {
					Battle = BattleContext(true);
				}
				Battle.beginWildBattle(Game.player, [new pokemon({ "species" : "Charizard (Nintendo)", "level" : 70 })], {style:"normal",flags:[],weather:"clear",scene:"Field Clearing",rules:{levels:"any",party:"up to: 6",items:"allowed"},tile:"grass"}, function (flags, trainers) {console.log("battle ended", flags, trainers);});
			}	
        }
    };
    this.draw = function(context) {
        for (var cellY = 0; cellY < this.height; ++cellY)
            for (var cellX = 0; cellX < this.width; ++cellX) {
                context.fillStyle = "hsl(108, 100%, 19%)";
                context.fillRect((-view.x) + (this.x + cellX) * grid.cell.width, (-view.y) + (this.y + cellY)  * grid.cell.height, grid.cell.width, grid.cell.height);
            }
    };
}

function WeakIce(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = width || 1;
    this.height = height || 1;
    this.states = [];
    for (var cellY = 0; cellY < this.height; ++cellY) {
        this.states[cellY] = [];
        for (var cellX = 0; cellX < this.width; ++cellX)
            this.states[cellY][cellX] = iceStates.untouched;
    }
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.verglas);
    this.update = function() {
        if (player.x >= this.x && player.x < this.x + this.width && isInt(player.x) && player.y >= this.y && player.y < this.y + this.height && isInt(player.y) && (player.x !== player._x || player.y !== player._y)) {
            /* Go to the next state, or send the player to another place */
            var currentState = this.states[player.y - this.y][player.x - this.x], newState = (currentState === iceStates.untouched ? iceStates.cracked : (currentState === iceStates.cracked ? iceStates.broken : currentState));
            this.states[player.y - this.y][player.x - this.x] = newState;
            if (newState === iceStates.broken)
                player.jumpTo(0, 0);
        }
    };
    this.draw = function(context) {
        for (var cellY = 0; cellY < this.height; ++cellY)
            for (var cellX = 0; cellX < this.width; ++cellX) {
                context.fillStyle = "hsl(" + 100 * this.states[cellY][cellX] + ", 100%, 80%)";
                context.fillRect((-view.x) + (this.x + cellX) * grid.cell.width, (-view.y) + (this.y + cellY)  * grid.cell.height, grid.cell.width, grid.cell.height);
            }
    };
}

function Marsh(x, y) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.width = 1;
    this.height = 1;
    map.setTiles(this.x, this.y, this.width, this.height, tileTypes.tenacious, {twistable : true});
    this.draw = function(context) {
        context.fillStyle = "teal";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, grid.cell.width, grid.cell.height);
    };
}

function Sand(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.footstep = 0;
    this.width = width || 1;
    this.height = height || 1;
    this.update = function() {
        if (player.x === this.x && player.y === this.y)
            this.footstep = 1;
        if (this.footstep > 0)
            this.footstep = Math.max(this.footstep - 0.02, 0);
    };
    this.draw = function(context) {
        context.fillStyle = "yellow";
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
        context.fillStyle = "black";
        context.globalAlpha = this.footstep;
        context.fillRect((-view.x) + this.x * grid.cell.width, (-view.y) + this.y * grid.cell.height, this.width * grid.cell.width, this.height * grid.cell.height);
        context.globalAlpha = 1;
    };
}

function Map(width, height, name) {
    this.width = width;
    this.height = height;
    this.name = name;
    this.objects = []; this.attributes = [];
    for (var row = 0; row < this.height; ++row) {
        rowArray = [];
        for (var column = 0; column < this.width; ++column)
            rowArray[column] = tileTypes.normal;
        this.objects.push(rowArray);
        this.attributes.push([]);
    }
    this.setTiles = function(x, y, width, height, value, attributes) {
        for (var cellX = x; cellX < x + width; ++cellX)
            for (var cellY = y; cellY < y + height; ++cellY) {
                this.objects[cellY][cellX] = value;
                this.attributes[cellY][cellX] = attributes || {};
            }
    };
    this.setTilePath = function(path, value, attributes) {
        for (var i = 0; i < path.length-1; ++i)
            this.setTiles(path[i].x, path[i].y, path[i+1].x - path[i].x + 1, path[i+1].y - path[i].y + 1, value, attributes);
    };
    this.tile = function(x, y) {
        x = (x < 0 ? undefined : (x >= this.width ? undefined : x));
        y = (y < 0 ? undefined : (y >= this.height ? undefined : y));
        if (x !== Math.round(x) || y !== Math.round(y))
            return undefined;
        return this.objects[y][x];
    };
    this.properties = function(x, y) {
        x = (x < 0 ? 0 : (x >= this.width ? this.width - 1 : x));
        y = (y < 0 ? 0 : (y >= this.height ? this.height - 1 : y));
        if (x !== Math.round(x) || y !== Math.round(y))
            return undefined;
        return this.attributes[y][x];
    };
    this.raycast = function(x, y, direction, tile, absence, inclusive) {
        var x_ = x, y_ = y, length;
        while ((!absence && this.objects[y_][x_] !== tile) || (absence && this.objects[y_][x_] === tile)) {
            x_ += Math.cos(direction);
            y_ += Math.sin(direction);
        }
        length = (x_ - x) + (y_ - y);
        return (length - (inclusive ? 0 : sign(length)));
    };
}
