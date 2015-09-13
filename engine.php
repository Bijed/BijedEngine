<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Pokémon Engine</title>
        <script src="engine-js.php" type="text/javascript"></script>
        <script src="interface/textbox.js" type="text/javascript"></script>
        <script src="overworld/movement.js" type="text/javascript"></script>
 		<script src="../pokengine/battle/scripts/functions/functions.js" type="text/javascript"></script>
		<script src="../pokengine/battle/scripts/functions/random.js" type="text/javascript"></script>
		<script src="../pokengine/battle/imports.js" type="text/javascript"></script>
        <style>
            canvas {
                display: block;
            }
            #textbox {
                margin-top: -46px;
            }
        </style>
    </head>
    <body>
        <div id="heading">Pokémon Engine</div>
        <canvas id="overworld"></canvas>
        <canvas id="textbox"></canvas>
    </body>
</html>