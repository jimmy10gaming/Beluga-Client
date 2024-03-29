export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        ModAPI.require("player");
        ModAPI.require("world");

        // Function to find the nearest farmable block
        function findNearestFarmableBlock() {
            const player = ModAPI.player;
            const playerPos = player.getPositionVector();
            let nearestFarmableBlock = null;
            let nearestDistance = Infinity;

            // Iterate through all blocks around the player
            for (let x = -5; x <= 5; x++) {
                for (let y = -5; y <= 5; y++) {
                    for (let z = -5; z <= 5; z++) {
                        const blockPos = playerPos.add(x, y, z);
                        const blockId = ModAPI.world.getBlockIdAt(blockPos.x, blockPos.y, blockPos.z);

                        // Check if the block is a farmable block and is at maximum growth
                        if (isFarmableBlock(blockId) && isBlockAtMaxGrowth(blockPos.x, blockPos.y, blockPos.z)) {
                            const distance = playerPos.distanceTo(blockPos);
                            if (distance < nearestDistance) {
                                nearestFarmableBlock = blockPos;
                                nearestDistance = distance;
                            }
                        }
                    }
                }
            }

            return nearestFarmableBlock;
        }

        // Function to check if a block is a farmable block
        function isFarmableBlock(blockId) {
            switch (blockId) {
                case 59: // Wheat
                case 141: // Nether Wart
                case 127: // Cocoa Beans
                case 83: // Sugar Cane
                case 142: // Carrots
                case 141: // Potatoes
                case 207: // Beetroots
                case 103: // Melons
                case 86: // Pumpkins
                    return true;
                default:
                    return false;
            }
        }

        // Function to check if a farmable block is at maximum growth
        function isBlockAtMaxGrowth(x, y, z) {
            const blockData = ModAPI.world.getBlockDataAt(x, y, z);
            // Check if the block is at the maximum growth stage
            switch (ModAPI.world.getBlockIdAt(x, y, z)) {
                case 59: // Wheat
                    return blockData === 7;
                case 141: // Nether Wart
                    return blockData === 3;
                case 127: // Cocoa Beans
                    return blockData === 2;
                case 83: // Sugar Cane
                    return blockData === 2;
                case 142: // Carrots
                    return blockData === 7;
                case 141: // Potatoes
                    return blockData === 7;
                case 207: // Beetroots
                    return blockData === 3;
                case 103: // Melons
                    return false; // Melons don't have a growth stage
                case 86: // Pumpkins
                    return false; // Pumpkins don't have a growth stage
                default:
                    return false;
            }
        }

        // Function to break the nearest farmable block
        function breakNearestFarmableBlock() {
            const nearestFarmableBlock = findNearestFarmableBlock();
            if (nearestFarmableBlock) {
                ModAPI.network.sendPacketPlayerDigging({
                    action: "START_DESTROY_BLOCK",
                    x: nearestFarmableBlock.x,
                    y: nearestFarmableBlock.y,
                    z: nearestFarmableBlock.z,
                    facing: "UP"
                });
            }
        }

        // Function to replant the nearest farmable block
        function replantNearestFarmableBlock() {
            const player = ModAPI.player;
            const inventory = player.inventory;

            // Find the nearest farmable block
            const nearestFarmableBlock = findNearestFarmableBlock();
            if (nearestFarmableBlock) {
                // Check if the player has the appropriate seeds in their inventory
                for (let i = 0; i < inventory.mainInventory.length; i++) {
                    const itemStack = inventory.mainInventory[i];
                    if (isSeedForFarmableBlock(itemStack.itemId)) {
                        // Place the seeds on the farmable block
                        ModAPI.network.sendPacketPlayerBlockPlacement({
                            x: nearestFarmableBlock.x,
                            y: nearestFarmableBlock.y,
                            z: nearestFarmableBlock.z,
                            face: "UP",
                            heldItem: itemStack
                        });
                        break;
                    }
                }
            }
        }

        // Function to check if an item is a seed for a farmable block
        function isSeedForFarmableBlock(itemId) {
            switch (itemId) {
                case 59: // Wheat seeds
                case 105: // Melon seeds
                case 86: // Pumpkin seeds
                case 295: // Nether Wart
                case 351: // Cocoa Beans
                case 83: // Sugar Cane
                case 141: // Carrot
                case 142: // Potato
                case 435: // Beetroot seeds
                    return true;
                default:
                    return false;
            }
        }

        // Automation loop
        setInterval(() => {
            breakNearestFarmableBlock();
            replantNearestFarmableBlock();
        }, 5000); // Run the automation every 5 seconds
    } else {
        console.log("Disabled Mod");
    }
}