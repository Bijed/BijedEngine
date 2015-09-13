<?php
    $javascriptImports = array("javascript/extensions.js", "structure/constants.js", "structure/pokeball-structure.js", "structure/item-structure.js", "structure/move-structure.js", "structure/ability-structure.js", "structure/party-structure.js", "structure/pokemon-structure.js", "structure/trainer-structure.js", "structure/save-structure.js", "structure/world-structure.js", "structure/pokedex-structure.js", "modifications/modifications.js", "game/game.js", "engine/engine.js");
    for ($i = 0; $i < count($javascriptImports); ++$i)
        include $javascriptImports[$i];
    echo "console.log(\"Engine intialised.\");"
?>