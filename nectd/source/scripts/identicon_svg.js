var Identicon = {
    patches: [
        [ 0, 4, 24, 20 ],
        [ 0, 4, 20 ],
        [ 2, 24, 20 ],
        [ 0, 2,  20, 22 ],
        [ 2, 14, 22, 10 ],
        [ 0, 14, 24, 22 ],
        [ 2, 24, 22, 13, 11, 22, 20 ],
        [ 0, 14, 22 ],
        [ 6, 8, 18, 16 ],
        [ 4, 20, 10, 12, 2 ],
        [ 0, 2, 12, 10 ],
        [ 10, 14, 22 ],
        [ 20, 12, 24 ],
        [ 10, 2, 12 ],
        [ 0, 2, 10 ],
        [ 0, 4, 24, 20 ]
    ],
    middlePatch: [ 0, 4, 8, 15 ],
    background: "rgb(255, 255, 255)"
};

function render_identicon_patch(svg, offset, patch, turn, invert, foreColor, backColor) {
    patch %= patchTypes.length;
    turn %= 4;
    if (patch == 15)
        invert = !invert;

    var vertices = patchTypes[patch];
    var offset = size / 2;
    var scale = size / 4;

    ctx.save();

    // paint background
    ctx.fillStyle = invert ? foreColor : backColor;
    ctx.fillRect(x, y, size, size);

    // build patch path
    ctx.translate(x + offset, y + offset);
    ctx.rotate(turn * Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo((vertices[0] % 5 * scale - offset), (Math.floor(vertices[0] / 5) * scale - offset));
    for (var i = 1; i < vertices.length; i++)
        ctx.lineTo((vertices[i] % 5 * scale - offset), (Math.floor(vertices[i] / 5) * scale - offset));
    ctx.closePath();

    // offset and rotate coordinate space by patch position (x, y) and
    // 'turn' before rendering patch shape

    // render rotated patch using fore color (back color if inverted)
    ctx.fillStyle = invert ? backColor : foreColor;
    ctx.fill();

    // restore rotation
    ctx.restore();
}

function render_identicon(code) {
    var middleType = Identicon.middlePatch[code & 3];
    var middleInvert = ((code >> 2) & 1) != 0;
    var cornerType = (code >> 3) & 15;
    var cornerTurn = (code >> 8) & 3;
    var sideType = (code >> 10) & 15;
    var sideTurn = (code >> 15) & 3;
    var blue = (code >> 16) & 31;
    var green = (code >> 21) & 31;
    var red = (code >> 27) & 31;

    var altColor = "rgb(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ")";

    var sideInvert = ((code >> 14) & 1) != 0,
        cornerInvert = ((code >> 7) & 1) != 0;
    var sideColor = sideInvert ? Identicon.background : altColor,
        cornerColor = cornerInvert ? Identicon.background : altColor;

    // middle patch
    render_identicon_patch(ctx, patchSize, patchSize, patchSize, middleType, 0, middleInvert, foreColor, backColor);
    // side patchs, starting from top and moving clock-wise
    render_identicon_patch(ctx, patchSize, 0, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, patchSize, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize, patchSize * 2, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    render_identicon_patch(ctx, 0, patchSize, patchSize, sideType, sideTurn++, sideInvert, foreColor, backColor);
    // corner patchs, starting from top left and moving clock-wise
    render_identicon_patch(ctx, 0, 0, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, 0, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, patchSize * 2, patchSize * 2, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
    render_identicon_patch(ctx, 0, patchSize * 2, patchSize, cornerType, cornerTurn++, cornerInvert, foreColor, backColor);
}

function render_identicon_canvases(prefix) {
    var canvases = document.getElementsByTagName("canvas");
    var n = canvases.length;
    for (var i = 0; i < n; i++) {
        var node = canvases[i];
        if (node.title && node.title.indexOf(prefix) == 0) {
            if (node.style.display == 'none') node.style.display = "inline";
            var code = node.title.substring(prefix.length) * 1;
            var size = node.width;
            render_identicon(node, code, size);
        }
    }
}

export default Identicon;
