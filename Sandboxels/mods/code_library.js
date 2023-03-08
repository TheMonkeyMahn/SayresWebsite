//URL

	urlParams = new URLSearchParams(window.location.search);

//Objects

	//getKeyByValue code by SO UncleLaz: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
	//CC-BY-SA-4.0
	function getKeyByValue(object, value) {
	  return Object.keys(object).find(key => object[key] === value);
	};

//RNG

	//Random integer from 0 to n
	function randomIntegerFromZeroToValue(value) {
		var absoluteValuePlusOne = Math.abs(value) + 1;
		if(value >= 0) { //Positive case
			return Math.floor(Math.random() * absoluteValuePlusOne)
		} else { //Negative case: flip sign
			return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
		};
	};

	//Random thing from array
	function randomChoice(array) {
		if(array.length === 0) { throw new Error(`The array ${array} is empty`) };
		var length = array.length;
		var randomIndex = randomIntegerFromZeroToValue(length - 1);
		return array[randomIndex];
	};

	//Random integer from m to n
	function randomIntegerBetweenTwoValues(min,max) {
		if(min > max) {
			var temp = max; //the need of a temporary space has always annoyed me
			max = min;
			min = temp;
		};
		return Math.floor(Math.random() * (max - min + 1)) + min
	};

//Arrays

	//Shallow array comparer by SO Tim Down: https://stackoverflow.com/a/10260204
	//CC-BY-SA-3.0
	function arraysIdentical(arr1, arr2) {
		var i = arr1.length;
		if (i !== arr2.length) {
			return false;
		};
		while (i--) {
			if (arr1[i] !== arr2[i]) {
				return false;
			};
		};
		return true;
	};

	function indexOf(arr, val, comparer) {
		for (var i = 0, len = arr.length; i < len; ++i) {
			if ( i in arr && comparer(arr[i], val) ) {
				return i;
			};
		};
		return -1;
	};

	function averageNumericArray(array) {
		var total = array.reduce(addTwoNumbers,0)
		return total / array.length
	};

	function sumNumericArray(array) { //Sum of array numbers
		return array.reduce((partialSum, a) => partialSum + a, 0);
	};

	function pad_array(arr,len,fill) { //https://stackoverflow.com/a/38851957
		//console.log("Padding array");
		return arr.concat(Array(len).fill(fill)).slice(0,len);
	}
	
	//Function to check if an array includes a given array by SO Johnny Tisdale: https://stackoverflow.com/a/60922255
	//CC-BY-SA-4.0
	function includesArray(parentArray, testArray) {
		for (let i = 0; i < parentArray.length; i++) {
			if (parentArray[i].every(function(value, index) { return value === testArray[index]})) {
				return true;
			};
		};
		return false;
	};

	function addArraysInPairs(array1,array2,fill=0) { //e.g. [1,2,3] + [10,0,-1] = [11,2,2]
		//console.log("Adding in pairs: " + array1 + " and " + array2 + ".");
		if(array1.length > array2.length) { //zero-padding
			array2 = pad_array(array2,array1.length,fill); //if a1 is longer, pad a2 to a1's length
		} else if(array2.length > array1.length) {
			array1 = pad_array(array1,array2.length,fill); //if a2 is longer, pad a1 to a2's length
		};
		var tempArray = [];
		for(z = 0; z < array1.length; z++) {
			//console.log("Forming output values (" + array1[z] + " + " + array2[z] + ")");
			tempArray[z] = array1[z] + array2[z];
			//console.log("Sum" + tempArray[z]);
		};
		//console.log("Added into " + tempArray + ".");
		return tempArray;
	};

	function tryJoin(stringOrArray,joiner) {
		//console.log(`tryJoin: ${stringOrArray}`);
		if(typeof(stringOrArray) === "string") {
			//console.log("tryJoin: String");
			return stringOrArray;
		} else if(Array.isArray(stringOrArray)) {
			//console.log("tryJoin: Array");
			return stringOrArray.join(joiner);
		} else {
			throw new TypeError(`Unexpected type: ${typeof(stringOrArray)}`);
		};
	};

//Checks

	//Element exists in the elements object
	function elementExists(elementName) {
		return typeof(elements[elementName]) === "object";
	};

	//Check if pixel of given element exists at given location
	function hasPixel(x,y,elementInput) {
		if(isEmpty(x,y,true)) { //if empty, it can't have a pixel
			return false;
		} else {
			if(elementInput.includes(",")) { //CSTA
				elementInput = elementInput.split(",");
			};
			if(Array.isArray(elementInput)) { //if element list
				for(i = 0; i < elementInput.length; i++) { if(!elementExists(elementInput[i])) { console.log(`hasPixel: Element "${elementInput[i]}" doesn't exist`) } };
				return elementInput.includes(pixelMap[x][y].element);
			} else { //if single element
				if(!elementExists(elementInput)) { console.log(`hasPixel: Element "${elementInput}" doesn't exist`) };
				return pixelMap[x][y].element === elementInput;
			};
		};		
	};

//Math(s)

	//Distance between points
	function pyth(xA,yA,xB,yB) {
		var a = Math.abs(xB - xA);
		var b = Math.abs(yB - yA);
		var c = Math.sqrt(a**2 + b**2);
		return c;
	};

	//Limit number to [min, max]
	function bound(number,lowerBound,upperBound) {
		return Math.min(upperBound,Math.max(lowerBound,number));
	};

	function addTwoNumbers(number1,number2) { //reducer
		return number1 + number2
	}

//Color

	function rgbStringToUnvalidatedObject(string) { //turns rgb() to {r,g,b} with no bounds checking
		//console.log("Splitting string into object");
		string = string.split(",");
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
		//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	function rgbStringToObject(string,doRounding=true,doBounding=true) { //turns rgb() to {r,g,b}
		//console.log(`rgbStringToObject: ${string}`);
			//console.log("Splitting string into object");
		string = string.split(",");
		if( (!string[0].startsWith("rgb(")) || (!string[2].endsWith(")")) ) {
			throw new Error("Color must start with \"rgb(\" and end with \")\"");
		};
		var red = parseFloat(string[0].substring(4));
		var green = parseFloat(string[1]);
		var blue = parseFloat(string[2].slice(0,-1));
			//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
		//NaN checking
			var redNaN = isNaN(red);
			var greenNaN = isNaN(green);
			var blueNaN = isNaN(blue);
			var NanErrorString = "One or more colors are NaN:"
			if(redNaN) { NanErrorString += " red" };
			if(greenNaN) { NanErrorString += " green" };
			if(blueNaN) { NanErrorString += " blue" };
			if(redNaN || greenNaN || blueNaN) { throw new Error(NanErrorString) };
		if(doRounding) {
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
		};
		if(doBounding) {
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
		};
			//console.log("String split: outputs " + red + ", " + green + ", " + blue + ".");
		return {r: red, g: green, b: blue};
	};

	function hslColorStringToObject(color) {
		if(!color.startsWith("hsl(") || !color.endsWith(")")) {
			throw new Error(`The color ${color} is not a valid hsl() color`)
		};
		var colorTempArray = color.split(",")
		if(colorTempArray.length !== 3) {
			throw new Error(`The color ${color} is not a valid hsl() color`)
		};
		if(!colorTempArray[1].endsWith("%")) { console.log(`hslColorStringToObject: Saturation in color ${color} was missing a %`); colorTempArray[1] += "%"; }
		if(!colorTempArray[2].endsWith("%)")) { console.log(`hslColorStringToObject: Lightness in color ${color} was missing a %`); colorTempArray[2] = [colorTempArray[2].slice(0, colorTempArray[2].length - 1), "%", colorTempArray[2].slice(colorTempArray[2].length - 1)].join(''); }
		var hue = parseFloat(colorTempArray[0].substring(4));
		var saturation = parseFloat(colorTempArray[1].slice(0,-1))
		var lightness = parseFloat(colorTempArray[2].slice(0,-2));
		//NaN checking
            var hueNaN,saturationNaN,lightnessNaN;
			isNaN(hue) ? hueNaN = true : hueNaN = false;
			isNaN(saturation) ? saturationNaN = true : saturationNaN = false;
			isNaN(lightness) ? lightnessNaN = true : lightnessNaN = false;
			var NanErrorString = "One or more colors are NaN:"
			if(hueNaN) { NanErrorString += " hue" };
			if(saturationNaN) { NanErrorString += " saturation" };
			if(lightnessNaN) { NanErrorString += " lightness" };
			if(hueNaN || saturationNaN || lightnessNaN) { throw new Error(NanErrorString) };
		return {h: hue, s: saturation, l: lightness};
	};

	function rgbToHex(color) {
		//console.log(`rgbToHex called on ${typeof(color) === "object" ? JSON.stringify(color) : color}`);
		if(typeof(color) == "object") { //Expects object like "{r: 172, g: 11, b: 34}"
			var red = color.r;
			var green = color.g;
			var blue = color.b;
				//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
			red = red.toString(16);
			green = green.toString(16);
			blue = blue.toString(16);
				//console.log(`Colors converted to (0x${red}, 0x${green}, 0x${blue})`);
			//console.log("Padding R");
			while(red.length < 2) {
				red = "0" + red;
			};
			//console.log("Padding G");
			while(green.length < 2) {
				green = "0" + green;
			};
			//console.log("Padding B");
			while(blue.length < 2) {
				blue = "0" + blue;
			};
				//console.log(`Colors padded to (0x${red}, 0x${green}, 0x${blue}), concatenating...`);
			return "#" + red + green + blue;
		} else if(typeof(color) == "string") { //Expects string like "rgb(20,137,4)". Also doesn't round properly for some reason...
				//console.log("Splitting string")
			color = rgbStringToUnvalidatedObject(color);
			red = color.r;
			green = color.g;
			blue = color.b;
				//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
				//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
				//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
			red = red.toString(16);
			green = green.toString(16);
			blue = blue.toString(16);
				//console.log(`Colors converted to (0x${red}, 0x${green}, 0x${blue})`);
			//console.log("Padding R");
			while(red.length < 2) {
				red = "0" + red;
			};
			//console.log("Padding G");
			while(green.length < 2) {
				green = "0" + green;
			};
			//console.log("Padding B");
			while(blue.length < 2) {
				blue = "0" + blue;
			};
				//console.log(`Colors padded to (0x${red}, 0x${green}, 0x${blue}), concatenating...`);
			return "#" + red + green + blue;
			} else {
			throw new Error(`Received invalid color: ${color}`);
		};
	};

	function linearBlendTwoColorObjects(color1,color2,weight1=0.5) { /*third argument is for color1 and expects a float from 0
																  to 1, where 0 means "all color2" and 1 means "all color1"*/
		var w1 = Math.min(Math.max(weight1,0),1);
		var red1 = color1.r;
		var green1 = color1.g;
		var blue1 = color1.b;
		var red2 = color2.r;
		var green2 = color2.g;
		var blue2 = color2.b;
		var red3 = (red1 * w1) + (red2 * (1 - w1));
		var green3 = (green1 * w1) + (green2 * (1 - w1));
		var blue3 = (blue1 * w1) + (blue2 * (1 - w1));
		return {r: red3, g: green3, b: blue3};
	};

	function lightenColor(color,offset,outputType="rgb") {
		if(typeof(color) === "string") {
			if(color.length < 10) {
			//console.log(`detected as hex: ${color}`);
				//catch missing octothorpes
				if(!color.startsWith("#")) {
					color = "#" + color;
				};
			//console.log(`octothorpe checked: ${color}`);

				offset = parseFloat(offset);
				if(isNaN(offset)) {
					throw new Error("Offset is NaN");
				};
				
				color = hexToRGB(color);
				if(color === null) {
					throw new Error("hexToRGB(color) was null (maybe it's an invalid hex triplet?)");
				};
				
			//console.log("converted color: " + JSON.stringify(color));
				var red = color.r + offset;
				var green = color.g + offset;
				var blue = color.b + offset;
			//console.log(`altered color: rgb(${red},${green},${blue})`);
				
				//rounding and bounding
				red = Math.round(red);
				green = Math.round(green);
				blue = Math.round(blue);
			//console.log(`rounded color: rgb(${red},${green},${blue})`);
				red = bound(red,0,255)
				green = bound(green,0,255)
				blue = bound(blue,0,255)
			//console.log(`bounded color: rgb(${red},${green},${blue})`);

				color = {r: red, g: green, b: blue};

				switch(outputType.toLowerCase()) {
					case "rgb":
						return `rgb(${red},${green},${blue})`;
						break;
					case "hex":
						return rgbToHex(color);
						break;
					case "json":
						return color;
						break;
					default:
						throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
				};
			} else {
				if(color.startsWith("rgb(")) {
					color = convertColorFormats(color,"json"); //object conversion
				//console.log(`color converted to object: ${JSON.stringify(color)}`);

					offset = parseFloat(offset);
					if(isNaN(offset)) {
						throw new Error("Offset is NaN");
					};
					
					var red = color.r + offset;
					var green = color.g + offset;
					var blue = color.b + offset;
				//console.log(`altered color: rgb(${red},${green},${blue})`);
					
					//rounding and bounding
					red = Math.round(red);
					green = Math.round(green);
					blue = Math.round(blue);
				//console.log(`rounded color: rgb(${red},${green},${blue})`);
					red = bound(red,0,255)
					green = bound(green,0,255)
					blue = bound(blue,0,255)
				//console.log(`bounded color: rgb(${red},${green},${blue})`);

					color = {r: red, g: green, b: blue};

					switch(outputType.toLowerCase()) {
						case "rgb":
							return `rgb(${red},${green},${blue})`;
							break;
						case "hex":
							return rgbToHex(color);
							break;
						case "json":
							return color;
							break;
						default:
							throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
					};
				} /*else if(color.startsWith("hsl")) {
					throw new Error("HSL is not implemented yet");
				}*/ else {
					throw new Error('Color must be of the type "rgb(red,green,blue)"'/* or "hsl(hue,saturation%,luminance%)"*/);
				};
			};
		} else if(typeof(color) === "object") {
			if(typeof(color.r) === "undefined" || typeof(color.g) === "undefined" || typeof(color.b) === "undefined") {
				throw new Error("Color must be of the form {r: red, g: green, b: blue}");
			};
			
		//console.log("received color: " + JSON.stringify(color));
			var red = color.r + offset;
			var green = color.g + offset;
			var blue = color.b + offset;
		//console.log(`altered color: rgb(${red},${green},${blue})`);
			
			//rounding and bounding
			red = Math.round(red);
			green = Math.round(green);
			blue = Math.round(blue);
		//console.log(`rounded color: rgb(${red},${green},${blue})`);
			red = bound(red,0,255)
			green = bound(green,0,255)
			blue = bound(blue,0,255)
		//console.log(`bounded color: rgb(${red},${green},${blue})`);

			color = {r: red, g: green, b: blue};

			switch(outputType.toLowerCase()) {
				case "rgb":
					return `rgb(${red},${green},${blue})`;
					break;
				case "hex":
					return rgbToHex(color);
					break;
				case "json":
					return color;
					break;
				default:
					throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
			};
		};
	};

	function rgbObjectToString(color) {
		if(typeof(color) !== "object") {
			throw new Error("Input color is not an object");
		};
		var red = color.r;
		var green = color.g;
		var blue = color.b;
			//console.log(`Colors loaded (${red}, ${green}, ${blue})`);
		red = Math.round(red);
		green = Math.round(green);
		blue = Math.round(blue);
			//console.log(`Colors rounded to (${red}, ${green}, ${blue})`);
		red = bound(red,0,255)
		green = bound(green,0,255)
		blue = bound(blue,0,255)
			//console.log(`Colors bounded to (${red}, ${green}, ${blue})`);
		return `rgb(${red},${green},${blue})`
	};
	
	function convertColorFormats(color,outputType="rgb") { //Hex triplet and object to rgb(), while rgb() is untouched
		if(typeof(color) === "undefined") {
			//console.log("Warning: An element has an undefined color. Unfortunately, due to how the code is structured, I can't say which one.");
			//color = "#FF00FF";
			throw new Error("Color is undefined!");
		};
		//console.log("Logged color for convertColorFormats: " + color);
		if(typeof(color) === "string") {
			if(typeof(color) === "string" && color.length < 10) {
				//console.log(`detected as hex: ${color}`);
					//catch missing octothorpes
					if(!color.startsWith("#")) {
						color = "#" + color;
					};
				//console.log(`octothorpe checked: ${color}`);

				color = hexToRGB(color);
				if(color === null) {
					throw new Error("hexToRGB(color) was null (maybe it's an invalid hex triplet?)");
				};
				
				switch(outputType.toLowerCase()) {
					case "rgb":
						return `rgb(${color.r},${color.g},${color.b})`;
						break;
					case "hex":
						return rgbToHex(color);
						break;
					case "json":
						return color;
						break;
					case "array":
						return [color.r, color.g, color.b];
						break;
					default:
						throw new Error("outputType must be \"rgb\", \"hex\", \"json\", or \"array\"");
				};
			} else {
				if(typeof(color) === "string" && color.startsWith("rgb(")) {
					//console.log(`convertColorFormats: calling rgbStringToObject on color ${color}`);
					color = rgbStringToObject(color,true,false);
					switch(outputType.toLowerCase()) {
						case "rgb":
							if(typeof(color) === "string") { color = rgbStringToObject(color) };
							return `rgb(${color.r},${color.g},${color.b})`;
							break;
						case "hex":
							return rgbToHex(color);
							break;
						case "json":
							return color;
							break;
						case "array":
							return [color.r, color.g, color.b];
							break;
						default:
							throw new Error("outputType must be \"rgb\", \"hex\", \"json\", or \"array\"");
					};
				} else {
					throw new Error('Color must be of the type "rgb(red,green,blue)"');
				};
			};
		} else if(typeof(color) === "object") {
			switch(outputType.toLowerCase()) {
				case "rgb":
					return `rgb(${color.r},${color.g},${color.b})`;
					break;
				case "hex":
					return rgbToHex(color);
					break;
				case "json":
					return color;
					break;
				case "array":
					return [color.r, color.g, color.b];
					break;
				default:
					throw new Error("outputType must be \"rgb\", \"hex\", \"json\", or \"array\"");
			};
		};
	};
	
	function rgbHexCatcher(color) {
		return convertColorFormats(color,"rgb");
	};

	function averageColorObjects(color1,color2,weight1=0.5) { /*third argument is for color1 and expects a float from 0
																  to 1, where 0 means "all color2" and 1 means "all color1"*/
		var w1 = Math.min(Math.max(weight1,0),1)
		var red1 = color1.r
		var green1 = color1.g
		var blue1 = color1.b
		var red2 = color2.r
		var green2 = color2.g
		var blue2 = color2.b
		var red3 = (red1 * w1) + (red2 * (1 - w1))
		var green3 = (green1 * w1) + (green2 * (1 - w1))
		var blue3 = (blue1 * w1) + (blue2 * (1 - w1))
		return {r: red3, g: green3, b: blue3}
	};

	function multiplyColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = convertColorFormats(color1,"json");
		};
		if(typeof(color2) !== "object") {
			color2 = convertColorFormats(color2,"json");
		};
		var finalR = Math.round(color1.r * (color2.r/255));
		var finalG = Math.round(color1.g * (color2.g/255));
		var finalB = Math.round(color1.b * (color2.b/255));
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function divideColors(color1,color2,outputType="rgb") { //color2 is the divisor and color1 the dividend (base/original color)
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = convertColorFormats(color1,"json");
		};
		if(typeof(color2) !== "object") {
			color2 = convertColorFormats(color2,"json");
		};
		var finalR = bound(Math.round(255 / (color2.r / color1.r)),0,255);
		var finalG = bound(Math.round(255 / (color2.g / color1.g)),0,255);
		var finalB = bound(Math.round(255 / (color2.b / color1.b)),0,255);
		if(isNaN(finalR)) { finalR = 255 };
		if(isNaN(finalG)) { finalG = 255 };
		if(isNaN(finalB)) { finalB = 255 };
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function addColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = convertColorFormats(color1,"json");
		};
		if(typeof(color2) !== "object") {
			color2 = convertColorFormats(color2,"json");
		};
		var finalR = bound(Math.round(color1.r + color2.r),0,255)
		var finalG = bound(Math.round(color1.g + color2.g),0,255)
		var finalB = bound(Math.round(color1.b + color2.b),0,255)
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function subtractColors(color1,color2,outputType="rgb") {
		//normalize rgb()/hex by turning any hex into rgb() and then rgb()s to {r,g,b}
		if(typeof(color1) !== "object") {
			color1 = convertColorFormats(color1,"json");
		};
		if(typeof(color2) !== "object") {
			color2 = convertColorFormats(color2,"json");
		};
		var finalR = bound(Math.round(color1.r - color2.r),0,255)
		var finalG = bound(Math.round(color1.g - color2.g),0,255)
		var finalB = bound(Math.round(color1.b - color2.b),0,255)
		var finalColor = {r: finalR, g: finalG, b: finalB};
		switch(outputType.toLowerCase()) {
			case "rgb":
				return `rgb(${finalColor.r},${finalColor.g},${finalColor.b})`;
				break;
			case "hex":
				return rgbToHex(finalColor);
				break;
			case "json":
				return finalColor;
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"json\"");
		};
	};

	function averageRgbPrefixedColorArray(colorArray,returnObject=false) { //array of rgb()s to single rgb() of average color
		//averageRgbPrefixedColorArray(["rgb(255,0,0)", "rgb(0,0,0)", "rgb(0,0,255)"]);
		//console.log("Averaging started");
		var reds = [];
		var greens = [];
		var blues = [];
		for(k = 0; k < colorArray.length; k++) {
			//console.log("Average function: Executing catcher on " + colorArray);
			var color = convertColorFormats(colorArray[k]);
			//console.log("Logged color for aRPCA: " + color);
			color = color.split(","); 
			var red = parseFloat(color[0].substring(4));
			reds.push(red)
			var green = parseFloat(color[1]);
			greens.push(green)
			var blue = parseFloat(color[2].slice(0,-1));
			blues.push(blue)
		};
		redAverage = Math.round(averageNumericArray(reds));
		greenAverage = Math.round(averageNumericArray(greens));
		blueAverage = Math.round(averageNumericArray(blues));
		var output; 
		returnObject ? output = {r: redAverage, g: greenAverage, b: blueAverage} : output = `rgb(${redAverage},${greenAverage},${blueAverage})`;
		//console.log("Averaging finished, product: " + output);
		return output;
	};

	//https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript
	function rgbStringToHSL(rgb,outputType="array") { //Originally a hex-to-HSL function, edited to take RGB and spit out an array
		//console.log("HSLing some RGBs");
		var result = rgbStringToUnvalidatedObject(rgb);

		var r = result.r;
		var g = result.g;
		var b = result.b;

		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		};

		s = s*100;
		s = Math.round(s);
		l = l*100;
		l = Math.round(l);
		h = Math.round(360*h);

		//var colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
		//Edit to return an array
		switch(outputType.toLowerCase()) {
			case "array":
				return [h,s,l];
				break;
			case "hsl":
				return `hsl(${h},${s}%,${l}%)`;
				break;
			case "json":
				return {h: h, s: s, l: l};
			default:
				throw new Error("outputType must be \"array\", \"hsl\", or \"json\"");
				break;				
		};
		//console.log("HSL output "+ colorInHSL + ".");
		
	};

	function normalizeColorToHslObject(color,arrayType=null) {
		var ambiguousArrayError = "changeSaturation can't tell if the array input is supposed to be RGB or HSL. Please use an \"arrayType\" argument of \"rgb\" or \"hsl\".";
		var isHsl = false;
		if(Array.isArray(color)) {
			if(arrayType === null) {
				throw new Error(ambiguousArrayError);
			} else if(arrayType === "rgb") {
				color = `rgb(${color[0]},${color[1]},${color[2]})`;
				color = rgbStringToHSL(color,"json"); //rgb arr to hsl obj
			} else if(arrayType === "hsl") {
				color = {h: color[0], s: color[1], l: color[2]}; //hsl arr to hsl obj
			} else {
				throw new Error(ambiguousArrayError);
			};
		} else {
			//by this point, any array cases would have been handled, leaving just hex (rgb), json rgb, json hsl, string rgb, and string hsl 
			if(typeof(color) === "string") {
				if(color.length < 10) { //detect hex: assume hex triplet if too short to be a well-formed rgb()
					if(!color.startsWith("#")) {
						color = "#" + color; //catch missing #
					};
					isHsl = false;
				};
				if(color.startsWith("rgb(")) { //detect rgb(): self-explanatory
					isHsl = false;
				};
				if(color.startsWith("hsl(")) { //detect hsl(): self-explanatory
					isHsl = true;
				};
			} else if(typeof(color) === "object") {
				if(typeof(color.r) !== "undefined") { //detect {r,g,b}: check for r key
					isHsl = false;
				};
				if(typeof(color.h) !== "undefined") { //detect {h,s,l}: check for h key
					isHsl = true;
				};
			};
			if(!isHsl) {
				color = convertColorFormats(color,"rgb"); //make any RGBs rgb()
				color = rgbStringToHSL(color,"json"); //make that rgb() an {h,s,l}
			} else { //by this point, it would have to either be a string or an object
				if(typeof(color) === "string") { //if it's a string
					color = hslColorStringToObject(color) //now it's an object
				};
			};
		};
		return color;		
	};

	function convertHslObjects(color,outputType="rgb") {
		switch(outputType.toLowerCase()) {
			//RGB cases
			case "rgb":
				color = hexToRGB(hslToHex(...Object.values(color))); //hsl to hex, hex to rgb_json, and rgb_json to rgb()
				return `rgb(${color.r},${color.g},${color.b})`;
				break;
			case "hex":
				color = hslToHex(...Object.values(color)); //hsl to hex
				return color;
				break;
			case "rgbjson":
			case "rgb-json":
			case "rgb_json":
				color = hexToRGB(hslToHex(...Object.values(color))); //hsl to hex and hex to rgb_json
				return color; 
				break;
			case "rgbarray":
			case "rgb-array":
			case "rgb_array":
				color = hexToRGB(hslToHex(...Object.values(color))); //hsl to hex, hex to rgb_json, and rgb_json to rgb_array
				return [color.r, color.g, color.b]; 
				break;
			//HSL cases
			case "hsl":
				//note: color was previously converted to {h, s, l}
				return `hsl(${color.h},${color.s}%,${color.l}%)`;
				break;
			case "hsljson":
			case "hsl-json":
			case "hsl_json":
				return color; 
				break;
			case "hslarray":
			case "hsl-array":
			case "hsl_array":
				return [color.h, color.s, color.l]; 
				break;
			default:
				throw new Error("outputType must be \"rgb\", \"hex\", \"rgb_json\", \"rgb_array\", \"hsl\", \"hsl_json\", or \"hsl_array\"");
		};
	}

	function changeSaturation(color,saturationChange,operationType="add",outputType="rgb",arrayType=null) {
		color = normalizeColorToHslObject(color,arrayType);
		//only {h,s,l} should exist now
		
		//Math
		switch(operationType.toLowerCase()) {
			case "+":
			case "add":
				color.s += saturationChange;
				break;
			case "-":
			case "subtract":
				color.s -= saturationChange;
				break;
			case "*":
			case "x":
			case "×":
			case "multiply":
				color.s *= saturationChange;
				break;
			case "/":
			case "÷":
			case "divide":
				color.s /= saturationChange;
				break;
			case "=":
			case "set":
				color.s = saturationChange;
				break;
			case ">":
			case ">=":
			case "min": //lower-bounds the color
				color.s = Math.max(color.s,saturationChange); //math.max to bound it to the higher of the input number or the existing color
				break;
			case "<":
			case "<=":
			case "max": //upper-bounds the color
				color.s = Math.min(color.s,saturationChange); //math.min to bound it to the lower of the input number or the existing color
				break;
			default:
				throw new Error("Operation must be \"add\", \"subtract\", \"multiply\", \"divide\", \"set\", \"min\", or \"max\"");
		};
		
		color.h = Math.round(color.h % 360);
		color.s = Math.round(bound(color.s,0,100));
		color.l = Math.round(bound(color.l,0,100));
		
		return convertHslObjects(color,outputType)
	};

	function changeLuminance(color,luminanceChange,operationType="add",outputType="rgb",arrayType=null) {
		color = normalizeColorToHslObject(color,arrayType);
		//only {h,s,l} should exist now
		
		//Math
		switch(operationType.toLowerCase()) {
			case "+":
			case "add":
				color.l += luminanceChange;
				break;
			case "-":
			case "subtract":
				color.l -= luminanceChange;
				break;
			case "*":
			case "x":
			case "×":
			case "multiply":
				color.l *= luminanceChange;
				break;
			case "/":
			case "÷":
			case "divide":
				color.l /= luminanceChange;
				break;
			case "=":
			case "set":
				color.l = luminanceChange;
				break;
			case ">":
			case ">=":
			case "min":
				color.l = Math.max(color.l,luminanceChange);
				break;
			case "<":
			case "<=":
			case "max":
				color.l = Math.min(color.l,luminanceChange);
				break;
			default:
				throw new Error("Operation must be \"add\", \"subtract\", \"multiply\", \"divide\", \"set\", \"min\", or \"max\"");
		};
		
		color.h = Math.round(color.h % 360);
		color.s = Math.round(bound(color.s,0,100));
		color.l = Math.round(bound(color.l,0,100));
		
		return convertHslObjects(color,outputType);
	};

	function changeHue(color,hueChange,operationType="add",outputType="rgb",arrayType=null) {
		color = normalizeColorToHslObject(color,arrayType);
		//only {h,s,l} should exist now
		
		//Math
		switch(operationType.toLowerCase()) {
			case "+":
			case "add":
				color.h += hueChange;
				break;
			case "-":
			case "subtract":
				color.h -= hueChange;
				break;
			case "*":
			case "x":
			case "×":
			case "multiply":
				color.h *= hueChange;
				break;
			case "/":
			case "÷":
			case "divide":
				color.h /= hueChange;
				break;
			case "=":
			case "set":
				color.h = hueChange;
				break;
			case ">":
			case ">=":
			case "min":
				color.h = Math.max(color.h,hueChange);
				break;
			case "<":
			case "<=":
			case "max":
				color.h = Math.min(color.h,hueChange);
				break;
			default:
				throw new Error("Operation must be \"add\", \"subtract\", \"multiply\", \"divide\", \"set\", \"min\", or \"max\"");
		};
		
		color.h = Math.round(color.h % 360);
		color.s = Math.round(bound(color.s,0,100));
		color.l = Math.round(bound(color.l,0,100));
		
		return convertHslObjects(color,outputType);
	};

	function colorToHsl(color,outputType) {
		color = convertColorFormats(color,"rgb");
		color = rgbStringToHSL("color",)
	};

	//https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
	function hslToHex(h, s, l) { //h, s, l params to hex triplet
	  //console.log(`Hexing some HSLs (the HSLs are ${h},${s},${l})`)
	  s = bound(s,0,100); //limit to 0-100
	  l = bound(l,0,100);
	  l /= 100;
	  var a = s * Math.min(l, 1 - l) / 100;
	  var f = n => {
		var k = (n + h / 30) % 12;
		var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
	  };
	  //console.log(`Hexed to #${f(0)}${f(8)}${f(4)}`)
	  return `#${f(0)}${f(8)}${f(4)}`;
	};
		
//Pixels

	function exposedToAir(pixel) {	
		return (isEmpty(pixel.x+1,pixel.y) || isEmpty(pixel.x-1,pixel.y) || isEmpty(pixel.x,pixel.y+1) || isEmpty(pixel.x,pixel.y-1));
	};

	function tryTarnish(pixel,element,chance) {
		if(exposedToAir(pixel)) {
			if(Array.isArray(element)) {
				if(Math.random() < chance) {
					changePixel(pixel,randomChoice(element));
				};
			} else {
				if(Math.random() < chance) {
					changePixel(pixel,element);
				};
			};
		};
	};

	//Try to create a pixel, return true if it could be created and false if it couldn't
	function tryCreatePixel(elementInput,x,y) {
		//array handling
		if(elementInput.includes(",")) { //CSTA
			elementInput = elementInput.split(",");
		};
		if(Array.isArray(elementInput)) { //if element list
			elementInput = elementInput.filter(function(e) {
				return elementExists(e);
			});
			if(elementInput.length === 0) { throw new Error("elementInput has no existing elements") };
			elementInput = randomChoice(elementInput);
		};

		//existence check
		if(!elementExists(elementInput)) {
			throw new Error("Element " + elementInput + " doesn't exist!");
		};

		//actual creation check
		if(isEmpty(x,y)) {
			createPixel(elementInput,x,y);
			return true;
		} else {
			return false;
		};
	};

	function breakPixel(pixel,changetemp=false) {
		var info = elements[pixel.element];
		if(typeof(info.breakInto) === "undefined") {
			return false;
		};
		var breakIntoElement = info.breakInto;
		if(Array.isArray(breakIntoElement)) {
			breakIntoElement = breakIntoElement[Math.floor(Math.random() * breakIntoElement.length)]
		};
		changePixel(pixel,breakIntoElement,changetemp)
	};

	function tryBreak(pixel,changetemp=false,defaultBreakIntoDust=false) {
		var info = elements[pixel.element];
		var hardness = defaultHardness;
		if(typeof(info.hardness) === "number") {
			hardness = info.hardness;
		};
		hardness = 1 - hardness; //invert hardness, so a hardness of 0 becomes a 100% chance and a hardness of 1 becomes a 0% chance
		if(Math.random() < hardness) {
			return breakPixel(pixel,changetemp=false,defaultBreakIntoDust=false);
		} else {
			return false;
		};
	};

	function reactionStealer(pixel,newPixel,reactionTarget) {
		if(!elements[reactionTarget]) {
			throw new Error(`No such element ${reactionTarget}!`);
		};
		if(typeof(newPixel) === "undefined") { //timing issue?
			return false;
		};
		var newElement = newPixel.element;
		var newInfo = elements[newElement];
		if(typeof(newInfo.reactions) === "undefined") {
			return false;
		};
		if(typeof(newInfo.reactions[reactionTarget]) === "undefined") {
			return false;
		};
		var pixel2 = pixel;
		var pixel1 = newPixel;
		var r = newInfo.reactions[reactionTarget];
		
		if (r.setting && settings[r.setting]===0) {
			return false;
		}
		// r has the attribute "y" which is a range between two y values
		// r.y example: [10,30]
		// return false if y is defined and pixel1's y is not in the range
		if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
			return false;
		}
		if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
			return false;
		}
		if (r.charged && !pixel.charge) {
			return false;
		}
		if (r.chance !== undefined && Math.random() > r.chance) {
			return false;
		}
		if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
			return false;
		}
		if (r.elem1 !== undefined) {
			// if r.elem1 is an array, set elem1 to a random element from the array, otherwise set it to r.elem1
			if (Array.isArray(r.elem1)) {
				var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
			} else { var elem1 = r.elem1; }
			
			if (elem1 == null) {
				deletePixel(pixel1.x,pixel1.y);
			}
			else {
				changePixel(pixel1,elem1);
			}
		}
		if (r.charge1) { pixel1.charge = r.charge1; }
		if (r.temp1) { pixel1.temp += r.temp1; pixelTempCheck(pixel1); }
		if (r.color1) { // if it's a list, use a random color from the list, else use the color1 attribute
			pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
		}
		if (r.attr1) { // add each attribute to pixel1
			for (var key in r.attr1) {
				pixel1[key] = r.attr1[key];
			}
		}
		if (r.elem2 !== undefined) {
			// if r.elem2 is an array, set elem2 to a random element from the array, otherwise set it to r.elem2
			if (Array.isArray(r.elem2)) {
				var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
			} else { var elem2 = r.elem2; }

			if (elem2 == null) {
				deletePixel(pixel2.x,pixel2.y);
			}
			else {
				changePixel(pixel2,elem2);
			}
		}
		if (r.charge2) { pixel2.charge = r.charge2; }
		if (r.temp2) { pixel2.temp += r.temp2; pixelTempCheck(pixel2); }
		if (r.color2) { // if it's a list, use a random color from the list, else use the color2 attribute
			pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
		}
		if (r.attr2) { // add each attribute to pixel2
			for (var key in r.attr2) {
				pixel2[key] = r.attr2[key];
			}
		}
		if (r.func) { r.func(pixel1,pixel2); }
		return r.elem1!==undefined || r.elem2!==undefined;
	};

//World

	function breakCircle(x,y,radius,respectHardness=false,changeTemp=false,defaultBreakIntoDust=false) {
		var coords = circleCoords(x,y,radius);
		for(i = 0; i < coords.length; i++) {
			coordX = coords[i].x;
			coordY = coords[i].y;
			if(!isEmpty(coordX,coordY,true)) {
				var pixel = pixelMap[coordX][coordY];
				respectHardness ? tryBreak(pixel,changeTemp,defaultBreakIntoDust) : breakPixel(pixel,changeTemp,defaultBreakIntoDust);
			};
		};
	};
	
	function fillCircle(element,x,y,radius,overwrite=false) {
		var coords = circleCoords(x,y,radius);
		var newElement = element;
		if(Array.isArray(newElement)) {
			newElement = newElement[Math.floor(Math.random() * newElement.length)];
		};
		for(i = 0; i < coords.length; i++) {
			coordX = coords[i].x;
			coordY = coords[i].y;
			if(overwrite && !isEmpty(coordX,coordY,true)) {
				changePixel(pixelMap[coordX][coordY],element);
			};
			if(isEmpty(coordX,coordY,false)) {
				createPixel(element,coordX,coordY);
			};
		};
	};

//Logic

	function xor(c1,c2) {
		if(!!c1 && !c2) {
			return true;
		} else if(!c1 && !!c2) {
			return true;
		} else {
			return false;
		};
	};

//currentPixels operations

	function findInCurrentPixels(x,y) {
		var pixel = currentPixels.filter(function(pixelObject) {
			return pixelObject.x == x && pixelObject.y == y;
		});
		if(pixel.length <= 0) {
			return undefined;
		};
		if(pixel.length > 1) {
			pixel.length = 1;
		};
		pixel = pixel[0];
		return pixel;
	};

	function filterCurrentPixels(filterFunction) {
		return currentPixels.filter(filterFunction);
	};
	
	//Filter test functions

	function _filterTest_xIsTwenty(pixel) {
		return pixel.x == 20;
	};

	function _filterTest_tempIsOdd(pixel) {
		return Math.trunc(pixel.temp) % 2 == 1;
	};

	function _filterTest_redRock(pixel) {
		if(typeof(convertColorFormats) === "undefined") {
			throw new Error("code_library.js is required!");
		};
		var color = rgbStringToHSL(convertColorFormats(pixel.color,"rgb"),"json");
		var isRed = ((color.h % 360) >= 350) || ((color.h % 360) <= 10);
		var isVivid = (color.s > 30);
		var isBright = (color.l > 20);
		return isRed && isVivid && isBright;
	};
