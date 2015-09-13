engine.addInitialiser(bagInitialise);

bagCanvas = undefined;
bag = undefined;
function bagInitialise() {
    bagCanvas = document.getElementById("bag");
    bagCanvas.width = 256;
    bagCanvas.height = 192;
    
    bagCanvas.ctx = bagCanvas.getContext("2d");
    bagCanvas.hover = false;
    
    bag = new Bag();
    
    document.getElementById("bag").addEventListener("mouseover", function (event) {
        bagCanvas.hover = true;
    });
    document.getElementById("bag").addEventListener("mousemove", function (event) {
        bagCanvas.mouseX = event.clientX - bagCanvas.offsetLeft;
        bagCanvas.mouseY = event.clientY - bagCanvas.offsetTop;
    });
    document.getElementById("bag").addEventListener("mouseout", function (event) {
        bagCanvas.hover = false;
    });
    
    bag.inventory.addItem("Master Ball", 10);
    bag.inventory.addItem("Super Potion");
    bag.inventory.addItem("Oran Berry", 25);
    bag.draw();
    
    engine.addUpdater(function(element){ return (function() { element.update(element);  element.draw(); }); }(bag));
}

function Bag() {
    this.inventory = new Inventory();
    this.selected = "";
    this.menu = false;
    
    this.tileWidth = 72;
    this.tileHeight = 48;
    this.tilePadding = 10;
    
    this.update = function() {
        
    };
    this.draw = function() {
        var context = bagCanvas.ctx;
        context.fillStyle = "blue";
        context.fillRect(0, 0, bagCanvas.width, bagCanvas.height);
        var tileWidth = this.tileWidth, tileHeight = this.tileHeight, tilePadding = this.tilePadding, tilesPerRow = Math.floor((bagCanvas.width - tilePadding) / (tileWidth + tilePadding)), tileX, tileY, item, drawX, drawY;
        var slotUnderMouse = (bagCanvas.hover ? Math.floor(bagCanvas.mouseY / (tileHeight + tilePadding)) * tilesPerRow + Math.floor(bagCanvas.mouseX / (tileWidth + tilePadding)) : undefined), mouseIsOverItem = (bagCanvas.mouseX % (tileWidth + tilePadding) >= tilePadding && bagCanvas.mouseY % (tileHeight + tilePadding) >= tilePadding);
        var clickedOnItem = false;
        if (this.held && !engine.mouseIsHeld) {
            this.inventory.list.splice(this.inventory.list.indexOf(this.held), 1);
            this.inventory.list.splice(slotUnderMouse, 0, this.held);
            delete this.held;
        } else if (this.held) {
            clickedOnItem = true;
        }
        if (!this.menu && mouseIsOverItem && engine.mouseIsClicked && !this.held) {
            this.selected = this.inventory.list[slotUnderMouse];
            this.dragged = false;
            clickedOnItem = true;
            this.clickOffsetX = bagCanvas.mouseX % (tileWidth + tilePadding) - tilePadding;
            this.clickOffsetY = bagCanvas.mouseY % (tileHeight + tilePadding) - tilePadding;
        }
        var list = this.inventory.list.clone();
        if (engine.mouseIsHeld && this.selected && !this.held) {
            if (bagCanvas.mouseX % (tileWidth + tilePadding) - tilePadding !== this.clickOffsetX || bagCanvas.mouseY % (tileHeight + tilePadding) - tilePadding !== this.clickOffsetY) {
                this.dragged = true;
                this.held = this.selected;
            }
        }
        if (this.selected && !engine.mouseIsHeld)
           this.menu = true;
        if (!this.selected)
            this.menu = false;
        if (this.held) {
            list.splice(list.indexOf(this.held), 1);
            list.push(this.held);
        }
        if (this.dragged || (engine.mouseIsClicked && !clickedOnItem))
            this.selected = "";
        for (var i = 0, j = 0; i < list.length; ++ i, ++ j) {
            item = list[i];
            if (this.held && slotUnderMouse === j)
                ++ j;
            tileX = tileWidth * (j % tilesPerRow) + tilePadding * ((j % tilesPerRow) + 1);
            tileY = tileHeight * Math.floor(j / tilesPerRow) + tilePadding * (Math.floor(j / tilesPerRow) + 1);
            if (this.held === item) {
                drawX = bagCanvas.mouseX - this.clickOffsetX;
                drawY = bagCanvas.mouseY - this.clickOffsetY;
            } else {
                drawX = tileX;
                drawY = tileY;
            }
            context.fillStyle = (this.held === item ? "aqua" : this.selected === item && this.menu ? "lime" : slotUnderMouse === j ? "orange" : "red");
            context.fillRect(drawX, drawY, tileWidth, tileHeight);
            context.setTextProperties({font: "Arial", size: 10, align: "center", baseline: "bottom"});
            context.setDrawingProperties({fill: "white", stroke: "black"});
            context.drawText(item, drawX + tileWidth / 2, drawY + tileHeight - 2, true, tileWidth - 12);
            if (this.inventory.numberOfItem(item) > 1) {
                context.setTextProperties({font: "Arial", size: 20, align: "right", baseline: "top"});
                context.setDrawingProperties({strokeWidth: 3});
                context.drawText("x" + this.inventory.numberOfItem(item), drawX + tileWidth - 6, drawY + 2, true);
            }
        }
        if (this.menu) {
            context.fillStyle = "yellow";
            context.fillRect(0, 0, bagCanvas.width, 100);
        }
    };
}

function Inventory() {
    this.items = {};
    this.list = [];
    
    this.addItem = function(item, quantity) {
        quantity = quantity || 1;
        if (quantity < 0)
            quantity = 0;
        if (this.items.hasOwnProperty(item))
            this.items[item] += quantity;
        else {
            this.list.push(item);
            this.items[item] = quantity;
        }
    };
    this.removeItem = function(item, quantity) {
        quantity = quantity || Infinity;
        var numberOfItem;
        if (this.items.hasOwnProperty(item))
            numberOfItem = this.items[item];
        else
            return;
        if (numberOfItem > quantity)
            this.items[item] -= quantity;
        else {
            this.list.splice(this.list.indexOf(item), 1);
            delete this.items[item];
        }
    };
    this.numberOfItems = function() {
        var number = 0;
        for (var _ in this.items)
            ++ number;
        return (number);
    };
    this.numberOfItem = function(item) {
        return (this.items.hasOwnProperty(item) ? this.items[item] : 0);
    };
}