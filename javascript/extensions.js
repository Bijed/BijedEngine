Math.sign = function(x) {
    return (x === 0 ? 0 : (x > 0 ? 1 : -1));
};

Math.isInt = function(x) {
    return (x % 1 === 0);
};

Math.roundTo = function(x, y) {
    return Math.round(x / y) * y;
};

CanvasRenderingContext2D.prototype.setTextProperties = function(properties) {
    if (properties.hasOwnProperty("font") && properties.hasOwnProperty("size"))
        this.font = properties.size + "px " + properties.font;
    if (properties.hasOwnProperty("align"))
        this.textAlign = properties.align;
    if (properties.hasOwnProperty("baseline"))
        this.textBaseline = properties.baseline;
};

CanvasRenderingContext2D.prototype.setDrawingProperties = function(properties) {
    if (properties.hasOwnProperty("fill"))
        this.fillStyle = properties.fill;
    if (properties.hasOwnProperty("stroke"))
        this.strokeStyle = properties.stroke;
    if (properties.hasOwnProperty("strokeWidth"))
        this.lineWidth = properties.strokeWidth;
};

CanvasRenderingContext2D.prototype.drawText = function(text, x, y, outline, maxWidth) {
    outline = outline || false;
    if (outline) {
        if (maxWidth)
        this.strokeText(text, x, y, maxWidth);
    else
        this.strokeText(text, x, y);
    }
    if (maxWidth)
        this.fillText(text, x, y, maxWidth);
    else
        this.fillText(text, x, y);
};

Array.prototype.swap = function(first, second) {
    var temp = this[first];
    this[first] = this[second];
    this[second] = temp;
};
Array.prototype.clone = function() {
    return this.slice(0);
};