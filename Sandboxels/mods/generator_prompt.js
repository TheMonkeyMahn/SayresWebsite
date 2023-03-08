var lategenOptions = [];

var creeperMod = "mods/mobs.js";
var spoutMod = "mods/spouts.js";
var fairyMod = "mods/more_fairies.js";
var cloudMod = "mods/more_clouds.js";
var bombMod = "mods/more_bombs.js";
var singularityMod = "mods/neutronium_compressor.js";
if(enabledMods.includes(creeperMod)) {
	lategenOptions.push("creeper");
};
if(enabledMods.includes(spoutMod)) {
	lategenOptions.push("spout");
};
if(enabledMods.includes(fairyMod)) {
	lategenOptions.push("fairy");
};
if(enabledMods.includes(cloudMod)) {
	lategenOptions.push("cloud");
};
if(enabledMods.includes(bombMod)) {
	lategenOptions.push("bomb");
};
if(enabledMods.includes(bombMod)) {
	lategenOptions.push("bomb");
};
if(enabledMods.includes(singularityMod)) {
	lategenOptions.push("singularity");
};
lgoDisplayString = lategenOptions.join(", ");
if(lgoDisplayString === "") {
	lgoDisplayString: "[None. This requires at least one element-generating mod: mobs.js, spouts.js, more_fairies.js, more_clouds.js, more_bombs.js, or neutronium_compressor.js!]";
};

document.addEventListener("keydown", function(e) { //prop prompt listener
	// , = propPrompt()
	if (e.keyCode == 71) { //G
		if(shiftDown) { generatorPrompt() };
	};
});

function generatorPrompt() {
	var type = prompt(`Enter what kind of thing you want to generate
	Valid options: ${lgoDisplayString}`);
	var elements, typePlural;
	if(type === null) {
		return false;
	};
	if(!lategenOptions.includes(type)) {
		alert("Type is not valid!");
		return false;
	} else {
		if(type === "fairy") {
			typePlural = "fairies"
		} else {
			typePlural = type + "s";
		};
		elements = prompt(`Enter the element(s) you want to generate ${typePlural} for.
		Elements are separated by commas; to use a combination of elements, the elements are separated by plus signs (like "gold_coin+diamond").`);
		elements = parseForLateGenerationParameter(elements);
		switch(type) {
			case "creeper":
				generateCreeper(elements,true);
				break;
			case "spout":
				generateSpout(elements,true);
				break;
			case "fairy":
				generateFairy(elements,true);
				break;
			case "cloud":
				generateCloud(elements,true);
				break;
			case "singularity":
				generateSingularity(elements,true);
				break;
			case "bomb":
				var number = prompt(`Enter a bomb number (default: 1)
				1 corresponds to radius 10, 2 corresponds to radius 15, etc.`);
				if(isNaN(parseFloat(number))) { number = 1 };
				generateBomb(elements,true,number);
				break;
			default:
				alert("An invalid type made it past the if statement. You shouldn't ever see this error.");
				throw new Error("An invalid type made it through the if statement.");
		};
	};
};

elements.generator_prompt = {
	color: ["#000000","#666666","#886622","#558800"],
	behavior: behaviors.SELFDELETE,
	desc: "<span style='color:#FF00FF;' onClick=generatorPrompt()>Click here or press Shift+G to open the generator prompt.</span>",
	category:"special",
};

function parseForLateGenerationParameter(input) {
	if(typeof(input) === "string") { //it should be an array, so string check
		input = input.replace(/ /g,"_");
		//console.log("String detected");
		if(input.includes(",")) { //comma-separated string?
			//console.log("Splitting string to array");
			input = input.split(","); //,SS to array
		} else {
			//console.log("Wrapping string in array");
			input = [input]; //single string to array 
		};
	};
	for(i = 0; i < input.length; i++) {
		input[i] = input[i].replace(/ /g,"_");
		if(input[i].includes("+")) {
			input[i] = input[i].split("+")
		};
	};
	return input;
};
