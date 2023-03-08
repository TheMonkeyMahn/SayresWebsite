var modName = "mods/randomness.js";
var libraryMod = "mods/code_library.js";

if(enabledMods.includes(libraryMod)) {
	//i made some stupid things

	//TPT reference
	elements.warp = {
		name: "warp",
		color: "#111111",
		behavior: [
			"M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
			"M1%30 AND SW%30|DL%1|M1%30 AND SW%30",
			"M1%30 AND SW%30|M1%30 AND SW%30|M1%30 AND SW%30",
		],
		category: "special",
		state: "gases",
	},

	//unrealistically flammable thing
	elements.unnamed_gas = {
		color: "#ddee11",
		behavior: [
			"M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1|M1%05 AND SW%2 AND HT:1%1",
			"M1%10 AND SW%2 AND HT:1%1|HT:1%1.000000000000000000|M1%10 AND SW%2 AND HT:1%1",
			"M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1|M1%15 AND SW%2 AND HT:1%1",
		],
		behaviorOn: [
			"M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2|M1%10 AND SW%4 AND HT:2%2",
			"M1%20 AND SW%4 AND HT:2%2|HT:2%2 AND CH:plasma%0.01|M1%20 AND SW%4 AND HT:2%2",
			"M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2|M1%30 AND SW%4 AND HT:2%2",
		],
		category: "gases",
		burn: 3000,
		burnTime: 5,
		burnInto: "burning_unnamed_gas",
		state: "gas",
		density: 2,
		tempHigh: 95,
		stateHigh: "burning_unnamed_gas",
		conduct: 0.2,
		}, 

	elements.burning_unnamed_gas = {
		color: "#eedd11",
		behavior: [
			"M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
			"M1 AND HT:3750%70 AND CR:plasma%10|HT:3750%70.000000 AND CH:plasma%6.71 AND EX:9>plasma,plasma,burning_unnamed_gas%0.25|M1 AND HT:3750%70 AND CR:plasma%10",
			"M2 AND HT:3750%70 AND CR:plasma%10|M1 AND HT:3750%70 AND CR:plasma%10.000000000000000000000000000000000000000000|M2 AND HT:3750%70 AND CR:plasma%10",
		],
		behaviorOn: [
			"M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
			"M1 AND HT:7500%70 AND CR:plasma%15|HT:7500%70 AND CH:plasma%5.60 AND EX:11>plasma,plasma,burning_unnamed_gas%0.5|M2 AND HT:7500%70 AND CR:plasma%15",
			"M2 AND HT:7500%70 AND CR:plasma%15|M1 AND HT:7500%70 AND CR:plasma%15.00000000000000000000000000000000000|M2 AND HT:7500%70 AND CR:plasma%15",
		],
		category: "gases",
		burn: 2000,
		burnTime: 950,
		burnInto: "plasma",
		state: "gas",
		density: 1.5,
		tempHigh: 200001,
		stateHigh: "plasma",
		hidden: true,
		excludeRandom: true,
	}, 

	elements.unnamed_powder = {
		color: "#cddd22",
		behavior: [
			"HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3|HT:2%2 AND CR:unnamed_gas%3",
			"HT:2%2 AND CR:unnamed_gas%1|HT:2%2.00000000000000000000|HT:2%2 AND CR:unnamed_gas%1",
			"M2 AND HT:2%2.0000000000000|M1 AND HT:2%2.0000000000000|M2 AND HT:2%2.0000000000000",
		],
		behaviorOn: [
			"HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6|HT:4%4 AND CR:unnamed_gas%6",
			"HT:4%4 AND CR:unnamed_gas%2|HT:4%4.00000000000000000000|HT:4%4 AND CR:unnamed_gas%2",
			"M2 AND HT:4%4.0000000000000|M1 AND HT:4%4.0000000000000|M2 AND HT:4%4.0000000000000",
		],
		category: "powders",
		burn: 3000,
		burnTime: 5,
		burnInto: "burning_unnamed_gas",
		state: "powders",
		density: 20,
		tempHigh: 95,
		stateHigh: "burning_unnamed_gas",
		conduct: 0.4,
	}, 

	elements.burning_unnamed_powder = {
		color: "#ddcd22",
		behavior: [
			"HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CR:burning_unnamed_gas%7.0000000000000000000000000000000000000000000000000000000000000000000000000000|HT:89850%70 AND CR:burning_unnamed_gas%7",
			"HT:89850%70 AND CR:burning_unnamed_gas%7|HT:89850%70 AND CH:plasma%00000000005.60 AND EX:12>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_powder%0.5|HT:89850%70 AND CR:burning_unnamed_gas%7",
			"M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7|M1 AND HT:89850%70 AND CR:burning_unnamed_gas%7.00000000000000000000000000000000000000000000000000000000000000|M2 AND HT:89850%70 AND CR:burning_unnamed_gas%7",
		],
		behaviorOn: [
			"HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CR:burning_unnamed_gas%9.00000000000000000000000000000000000000000000000000000000000000000000000000|HT:179700%70 AND CR:burning_unnamed_gas%9",
			"HT:179700%70 AND CR:burning_unnamed_gas%9|HT:179700%70 AND CH:plasma%00000000004.79 AND EX:13>plasma,plasma,plasma,burning_unnamed_gas,burning_unnamed_gas,burning_unnamed_powder%1|HT:179700%70 AND CR:burning_unnamed_gas%9",
			"M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9|M1 AND HT:179700%70 AND CR:burning_unnamed_gas%9.000000000000000000000000000000000000000000000000000000000000|M2 AND HT:179700%70 AND CR:burning_unnamed_gas%9",
		],
		category: "powders",
		burn: 2000,
		burnTime: 1150,
		burnInto: "plasma",
		state: "powders",
		density: 15,
		tempHigh: 200001,
		stateHigh: "burning_unnamed_gas",
		conduct: 0.4,
		hidden: true,
		excludeRandom: true,
	},

	elements.steam_remover = { //pov: you tried using water to cool something
		name: "steam remover",
		color: "#542900",
		behavior: [
			"CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
			"CH:steam>steam_remover|DL%40|CH:steam>steam_remover",
			"CH:steam>steam_remover|CH:steam>steam_remover|CH:steam>steam_remover",
		],
		category: "special",
		excludeRandom: true,
	},

	elements.filler_remover = { //pov: you put a filler for fun but now you want your scene back
		name: "filler remover",
		color: "#00dd00",
		behavior: [
			"CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
			"CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|DL%40|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
			"CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover|CH:filler>filler_remover AND CH:lattice>filler_remover AND CH:virus>filler_remover AND CH:gray_goo>filler_remover",
		],
		"category":"special",
		excludeRandom: true,
	},     

	elements.plasma_remover = { //why would you need this?
		name: "plasma remover",
		color: "#77ff00",
		behavior: [
			"CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
			"CH:plasma>plasma_remover|DL%40|CH:plasma>plasma_remover",
			"CH:plasma>plasma_remover|CH:plasma>plasma_remover|CH:plasma>plasma_remover",
		],
		category: "special",
		temp: 7065,
		excludeRandom: true,
	},

	elements.black_decay = { //random mystcraft mod reference
		name: "black decay",
		color: "#222222",
		behavior: [
			"XX|CH:black_decay%2 AND DL:black_decay%30|XX",
			"CH:black_decay%1|DL%0.2|CH:black_decay%1",
			"XX|CH:black_decay%1 AND M1|XX",
		],
		category: "special",
		excludeRandom: true,
	},

	elements.steel.behavior = behaviors.FAIRYKILL;

	elements.tungstensteel = {
		color: "#555589",
		behavior: behaviors.FAIRYKILL,
		tempHigh: 3600,
		category: "solids",
		density: 19000,
		conduct: 0.48,
	},

	elements.molten_tungsten = {
		density: 17600,
		temp: 3500,
		tempHigh: 5555,
		stateHigh: "tungsten_gas",
	},         

	elements.tungsten_gas = {
		color: "#FFEEE2",
		behavior: [
			"CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
			"M1|XX|M1",
			"CR:plasma%0.625 AND M2|M1|CR:plasma%0.625 AND M2",
		],
		density: 15800, //https://link.springer.com/article/10.1007/s11661-019-05262-5
		temp: 5600,
		tempLow: 5555,
		stateLow: "molten_tungsten",
		category: "gases",
		hidden: true,
	},

	elements.molten_steel = {
		reactions: {
			"molten_tungsten": { "elem1":"molten_tungstensteel", "elem2":"molten_tungstensteel" }
		}
	}

	elements.molten_tungstensteel = {
		behavior: [
			"XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
			"DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
			"M1|DL:"+eLists.FAIRY+"|M1",
		]
	}

	elements.unnamed_substance_bomb = {
		name: "unnamed bomb",
		color: "#cdad52",
		behavior: [
			"XX|XX|XX",
			"XX|XX|XX",
			"M2|M1 AND EX:10>plasma,burning_unnamed_powder,unnamed_powder,unnamed_powder,unnamed_powder,burning_unnamed_gas,unnamed_gas,unnamed_gas,unnamed_gas|M2",
		],
		category: "weapons",
		state: "solid",
		density: 1300,
		excludeRandom: true,
	},

	elements.warp_bomb = {
		name: "warp bomb",
		color: "#422e4a",
		behavior: [
			"XX|XX|XX",
			"XX|CC:#5b3a69,#382740,#400e61|XX",
			"M2|M1 AND EX:15>warp|M2",
		],
		category: "weapons",
		state: "solid",
		density: 1300,
		excludeRandom: true,
	},

	//hormones

		//estrogens

	elements.estradiol = {
		color: "#f2fcee", //it absorbs shorter wavelength UV than testosterone and I am treating this like absorbing violet for convenience
			  //https://www.researchgate.net/publication/226065469_Optical_Properties_of_Two_Types_of_Sex_Hormones_of_the_Cyclopentenephenanthrene_Series
			  //http://depts.washington.edu/cmditr/modules/lum/color.html
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1200,
		tempHigh: 173,
		category: "powders",
	},

	elements.molten_estradiol = {
		tempHigh: 446,
		stateHigh: "vaporized_estradiol",
	},

	elements.vaporized_estradiol = {
		color: ["#ffbf60","#ffdc60","#ff9d60"], //hormone gas wouldn't glow that brightly at these temperatures but just ignore that
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 972,
		temp: 500,
		tempLow: 446,
		stateLow: "molten_estradiol",
	},

		//progestogens

	elements.progesterone = {
		color: "#f7eefc", //slightly different? from testosterone but exaggerated
			  //https://downloads.hindawi.com/journals/ijps/2017/9603140.pdf
			  //these hormones all absorb in the uv region anyway so they would all look white to us
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1100,
		tempHigh: 121,
		category: "powders",
	},

	elements.molten_progesterone = {
		tempHigh: 447,
		stateHigh: "vaporized_progesterone",
	},

	elements.vaporized_progesterone = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 891,
		tempLow: 447,
		stateLow: "molten_progesterone",
	}

		//androgens

			//plain testosterone

	elements.testosterone = {
		color: "#f7eef7", //it absorbs longer wavelength UV than estradiol and I am treating this like absorbing green for convenience
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1100,
		tempHigh: 155,
		category: "powders",
	},

	elements.molten_testosterone = {
		tempHigh: 433,
		temp: 400,
		stateHigh: "vaporized_testosterone",
	},

	elements.vaporized_testosterone = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 891,
		temp: 500,
		tempLow: 433,
		stateLow: "molten_testosterone",
	},

			//undecanoate (form actually used in HRT)

	elements.testosterone_undecanoate = {
		color: "#f8f2fc", //more creatively-interpreted UV data: https://spectrabase.com/spectrum/5Yc7XCCDkA7 plus http://depts.washington.edu/cmditr/modules/lum/color.html and a lot of eyeballing and loose approximation
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1037, //https://www.chembk.com/en/chem/Testosterone%20Undecanoate
		tempHigh: 63,
		category: "powders",
	},

	elements.molten_testosterone_undecanoate = {
		tempHigh: 550,
		stateHigh: "vaporized_testosterone_undecanoate",
		hidden: true,
	},

	elements.vaporized_testosterone_undecanoate = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 834, //made-up due to lack of data
		temp: 600,
		tempLow: 63,
		stateLow: "molten_testosterone_undecanoate",
	},

	//other

		//anti-androgens

			//CPA

	elements.cyproterone_acetate = {
		color: "#efeef8", //it absorbs far longer uv than the others, which i am rendering as red absorption
			  //https://www.researchgate.net/figure/UV-spectrum-for-drospirenone-cyproterone-acetate-desogestrel-and-ethinyl-estradiol-at-1_fig1_315746083
			  //i didn't really expect to find a spectrum for this
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1068,
		tempHigh: 200,
		category: "powders",
	},

	/*    > Hazardous decomposition products:
		> Hydrogen chloride (HCl)
		> Carbon monoxide and carbon dioxide
		> Hydrogen
		
		> https://cdn.caymanchem.com/cdn/msds/16622m.pdf
		
		so many interesting effects i can't add
	*/
	elements.molten_cyproterone_acetate = {
		tempHigh: 569,
		stateHigh: "vaporized_cyproterone_acetate",
	},

	elements.vaporized_cyproterone_acetate = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 865,
		tempLow: 569,
		stateLow: "molten_cyproterone_acetate",
	},

			//spironolactone

	elements.spironolactone = {
		color: "#f7eef1", //UV absorbance peak wavelength is slightly shorter than that of testosterone
			  //https://www.researchgate.net/publication/348592381_Quantification_of_Spironolactone_by_first_and_second_order_UV_Derivative_Spectrophotometry_in_bulk_and_tablet_dosage_form/link/6006b3cf299bf14088a649bd/download
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1200,
		tempHigh: 207,
		category: "powders",
	},

	elements.molten_spironolactone = {
		tempHigh: 597,
		stateHigh: "vaporized_spironolactone",
		/*should have more decomps
		https://sci-hub.se/https://link.springer.com/article/10.1007/BF01979243
		> The TG-DTG curves of spironolactone in Fig. 7 demonstrate that the compound is thermally stable up to 200*C, and that its thermal decomposition occurs between 200 and 620*C. Four consecutive steps are observed in the TG-DTG curves. The first step, up to 260*C is ascribed to the elimination of the substituent group, SCOCH_{3} (TG= 19.59%, Calc. = 19.33%). The second step (260-370*C) and the third and fourth steps (370-700*C) involve losses of 42.93% and 37.48%, respectively, but do not permit a suggestion as to which parts of the compound are eliminated in each step. */
	},

	elements.vaporized_spironolactone = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 972,
		tempLow: 597,
		stateLow: "molten_spironolactone",
	},

			//finasteride

	elements.finasteride = {
		color: "#fcfcf1", //UV absorbance peak wavelength is even shorter than that of estradiol
			  //https://www.researchgate.net/publication/312317200
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1100,
		tempHigh: 253,
		category: "powders",
	},

	elements.molten_finasteride = {
		tempHigh: 577,
		stateHigh: "vaporized_finasteride",
	},

	elements.vaporized_finasteride = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 891,
		tempLow: 577,
		stateLow: "molten_finasteride",
	},

			//dutasteride

	elements.dutasteride = {
		color: "#fbf6ee", //High UV absorbances around the peak wavelengths of both estradiol and testosterone
			  //https://sphinxsai.com/sphinxsaivol_2no.1/pharmtech_vol_2no.1/PharmTech_Vol_2No.1PDF/PT=18%20(113-117).pdf
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1303, //https://www.chemicalbook.com/ChemicalProductProperty_EN_CB3254628.htm
		tempHigh: 243,
		category: "powders",
	},

	elements.molten_dutasteride = {
		tempHigh: 620, //http://www.chemspider.com/Chemical-Structure.5293502.html
		stateHigh: "vaporized_dutasteride",
	},

	elements.vaporized_dutasteride = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 1055,
		tempLow: 620,
		stateLow: "molten_dutasteride",
	},

			//bicalutamide

	elements.bicalutamide = {
		color: "#f4fcee", //peaks at 200-220 and at 270
			  //i am probably mapping uv to visible wrong and misreading color.html
			  //https://www.researchgate.net/publication/257679318
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1520, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
		tempHigh: 192,
		category: "powders",
	},

	elements.molten_bicalutamide = {
		tempHigh: 659,
		stateHigh: "vaporized_bicalutamide",
	},

	elements.vaporized_bicalutamide = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 1231,
		tempLow: 659,
		stateLow: "molten_bicalutamide",
	},

		//puberty blockers

	elements.leuprolide = {
		color: "#f5eefb", //http://dspace.hmlibrary.ac.in:8080/jspui/bitstream/123456789/1143/11/11_Chapter%203.pdf
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1440, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
		tempHigh: 150,
		category: "powders",
	},

	elements.molten_leuprolide = {
		tempHigh: 1720, //https://web.archive.org/web/20210512074205/http://www.shreejipharmainternational.com/leuprolide-acetate-1177796.html
		stateHigh: "vaporized_leuprolide",
	},

	elements.vaporized_leuprolide = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		density: 1166,
		tempLow: 1720,
		stateLow: "molten_leuprolide",
	},

		//histrelin

	elements.histrelin = {
		color: "#f8f5ee", //no spectrum available
		behavior: behaviors.POWDER,
		state: "solid",
		category: "solids",
		density: 1500, //https://www.chemicalbook.com/ProductMSDSDetailCB7457827_EN.htm
		tempHigh: 1800, //https://www.chemsrc.com/en/cas/76712-82-8_1042020.html
		stateHigh: "vaporized_histrelin",
		category: "powders",
	},

	elements.vaporized_histrelin = {
		color: ["#ffbf60","#ffdc60","#ff9d60"],
		behavior: behaviors.GAS,
		state: "gas",
		category: "gases",
		hidden: true,
		tempLow: 1800,
		stateLow: "histrelin",
	},

	//end of hrt section

	liquidBalloonDepth = 8

	elements.rm_water_balloon = {
		name: "water balloon",
		color: "#3dc2ff",
		behavior: [
			"XX|M2|XX",
			"XX|C2:wb"+liquidBalloonDepth+"|XX",
			"XX|M1|XX",
		],
		category: "special",
		state: "solid",
		density: 997,
	}

	//For statement syntax by charPointer
	for (var i = liquidBalloonDepth; i > 1; i--) {
		elements[`wb${i}`] = {
			color: "#2167ff",
			behavior: [
				`XX|CR:wb${i-1}|XX`,
				`CR:wb${i-1}|CH:wb${i-1}|CR:wb${i-1}`,
				`XX|CR:wb${i-1}|XX`,
			],
			state: "solid",
			excludeRandom:true,
			hidden: true,
			category: "weapons",
		}
	}

	elements.wb1 = {
		name: "wb1",
		color: "#2167ff",
		behavior: [
			"XX|CR:water|XX",
			"CR:water|CH:water|CR:water",
			"XX|CR:water|XX",
		],
		category: "special",
		density: 997,
		hidden: true,
		excludeRandom: true,
	}

	elements.rm_lava_balloon = {
		name: "lava balloon",
		color: "#ffab36",
		behavior: [
			"XX|M2|XX",
			"XX|C2:lb"+liquidBalloonDepth+"|XX",
			"XX|M1|XX",
		],
		temp: 950,
		category: "special",
		state: "solid",
		density: 2725,
	}

	for (var i = liquidBalloonDepth; i > 1; i--) {
		elements[`lb${i}`] = {
			color: "#ff8c00",
			behavior: [
				`XX|CR:lb${i-1}|XX`,
				`CR:lb${i-1}|CH:lb${i-1}|CR:lb${i-1}`,
				`XX|CR:lb${i-1}|XX`,
			],
			state: "solid",
			excludeRandom:true,
			hidden: true,
			category: "weapons",
		}
	}

	elements.lb1 = {
		color: "#ff8c00",
		behavior: [
			"XX|CR:magma|XX",
			"CR:magma|CH:magma|CR:magma",
			"XX|CR:magma|XX",
		],
		category: "special",
		density: 997,
		hidden: true,
		excludeRandom: true,
	}

	elements.densinium = {
		color: ["#565656","#575657","#565257","#554d57","#554659"],
		tempHigh: 4712, //arbitrary
		hardness: 0.9991, //somewhat arbitrary
		density: 39180,
		conduct: 0.86, //arbitrary
		behavior: behaviors.WALL,
		state: "solid",
		category: "solids",
	} //this is effectively a mere interpretation of densinium

	elements.molten_densinium = {
		hardness: 0.9991,
	}

	elements.acid.ignore.push("densinium","molten_densinium")

	rainbowDustArray = []
	for(i = 0; i < 24; i++) {
		rainbowDustArray.push([i * 15,15,45])
	}

	for(i = 0; i < rainbowDustArray.length; i++) {
		rainbowDustArray[i] = hslToHex(...rainbowDustArray[i])
	}

	rainbowStoneArray = []
	for(i = 0; i < 24; i++) {
		rainbowStoneArray.push([i * 15,40,48])
		rainbowStoneArray.push([i * 15,48,38])
		rainbowStoneArray.push([i * 15,52,47])
	}

	for(i = 0; i < rainbowStoneArray.length; i++) {
		rainbowStoneArray[i] = hslToHex(...rainbowStoneArray[i])
	}

	rainbowGravelArray = []
	for(i = 0; i < 24; i++) { 
		rainbowGravelArray.push([i * 15,35,58])
		rainbowGravelArray.push([i * 15,38,49])
		rainbowGravelArray.push([i * 15,53,63])
		rainbowGravelArray.push([i * 15,23,32])
	}

	for(i = 0; i < rainbowGravelArray.length; i++) {
		rainbowGravelArray[i] = hslToHex(...rainbowGravelArray[i])
	}

	elements.rainbow_stone = {
		color: rainbowStoneArray,
		behavior: behaviors.POWDER,
		tempHigh: 1271,
		stateHigh: "rainbow_magma",
		category: "land",
		state: "solid",
		density: 3201,
		hardness: 0.8,
		breakInto: ["rainbow_dust","rainbow_gravel"],
	};

	elements.rainbow_magma = {
		color: ["#F14313", "#F17E13", "#F1AB13", "#C8C830", "#F53952", "#F63434", "#CF7932"],
		behavior: behaviors.MOLTEN,
		temp: 1300,
		tempLow: 1271,
		stateLow: ["rainbow_stone_2", "rainbow_stone_2", "rainbow_stone"],
		category: "liquids",
		state: "solid",
		density: 2562,
		hardness: 0.7,
		breakInto: "rainbow_magma",
		viscosity: 3452400,
	};

	elements.rainbow_stone_2 = {
		color: ["#503A2A","#443228","#533D2D","#4D422B","#433827","#53432D","#4B472B","#423E25","#4F4A2C","#494C2A","#414125","#4B512B","#475328","#3E4725","#4A592A","#40532C","#384529","#45582D","#3C522F","#35462A","#3F572F","#35552F","#2F472D","#375931","#2D5333","#28482E","#2F5836","#2F5138","#2A4634","#31563A","#2F5140","#2B4539","#2F5542","#2F5044","#2C443C","#325449","#30504A","#2D4340","#31544F","#34494B","#2E4040","#354E4E","#35424C","#2F3C40","#374551","#383E4B","#323641","#3D3E50","#3B374C","#352F42","#3C3951","#413649","#393041","#443750","#473548","#3D2E3F","#4A374D","#4B3546","#422F3C","#52364A","#503644","#452E3B","#593447","#50353F","#463137","#583643","#50363A","#463033","#57393B","#4F3832","#443130","#553B35"],
		behavior: [
			"XX|XX|XX",
			"XX|XX|XX",
			"M2%81|M1|M2%81"
		],
		tempHigh: 1276,
		stateHigh: "rainbow_magma",
		category: "land",
		state: "solid",
		density: 3717,
		hardness: 0.82,
		breakInto: ["rainbow_dust","rainbow_gravel"],
	};

	elements.rainbow_dust = {
		color: rainbowDustArray,
		behavior: behaviors.POWDER,
		tempHigh: 1271,
		stateHigh: "rainbow_magma",
		category: "land",
		state: "solid",
		density: 3552,
		hardness: 0.4,
		breakInto: ["rainbow_dust","color_smoke","color_smoke","color_smoke","smoke","rainbow_dust","color_smoke","color_smoke","color_smoke","smoke","rainbow_magma"],
	};

	elements.rainbow_gravel = {
		color: rainbowGravelArray,
		behavior: behaviors.POWDER,
		tempHigh: 1271,
		stateHigh: "rainbow_magma",
		category: "land",
		state: "solid",
		density: 3552,
		hardness: 0.4,
		breakInto: ["rainbow_dust","color_smoke","color_smoke","color_smoke","smoke","rainbow_dust","color_smoke","color_smoke","color_smoke","smoke","rainbow_magma"],
	};

	if(!enabledMods.includes("mods/minecraft.js")) {
		elements.netherrack = {
			color: ["#802b2b","#4f1b1b","#943232"],
			behavior: behaviors.POWDER,
			tempHigh: 7550,
			category: "land",
			state: "solid",
			density: 2550,
			hardness: 0.07,
			breakInto: ["crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","sulfur"], // and some copper, gold, iron, nickel after processing //sulfur closer to 1/7 in-game
			burn: 9,
			burnTime: 9007199254740995,
			burnInto: "netherrack",
		}
		minecraftModEnabled = false
	} else if(enabledMods.includes("mods/minecraft.js")) {
		minecraftModEnabled = true
	}

	if(!enabledMods.includes("mods/minecraft.js")) {
		elements.crushed_netherrack = {
			color: ["#e34b46","#b04235","#73431f","#522510","#7a3326"],
			behavior: behaviors.POWDER,
			category:"land",
			tempHigh: 7550,
			stateHigh: "molten_netherrack",
			state: "solid",
			density: 1680,
			burn: 20,
			burnTime: 9007199254740995,
			hardness: 0.02,
			hidden: true,
		}
		minecraftModEnabled = false
	} else if(enabledMods.includes("mods/minecraft.js")) {
		minecraftModEnabled = true
	}

	runAfterLoad(function() {
	  if(enabledMods.includes("mods/fey_and_more.js")) {
		elements.tungstensteel.behavior = [
		  "XX|DL:"+eLists.FAIRY+"|XX",
		  "DL:"+eLists.FAIRY+"|XX|DL:"+eLists.FAIRY+"",
		  "XX|DL:"+eLists.FAIRY+"|XX",
		],
		elements.molten_tungstensteel.behavior = [
		  "XX|DL:"+eLists.FAIRY+" AND CR:fire%2.5|XX",
		  "DL:"+eLists.FAIRY+" AND M2|XX|DL:"+eLists.FAIRY+" AND M2",
		  "M1|DL:"+eLists.FAIRY+"|M1",
		]
	  }
		if(minecraftModEnabled) {
			elements.netherrack.hardness = 0.07
			elements.netherrack.breakInto = ["crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","crushed_netherrack","sulfur"] // and some copper, gold, iron, nickel after processing //sulfur closer to 1/7 in-game
			elements.netherrack.burn = 9
			elements.netherrack.burnTime = 9007199254740995
			elements.netherrack.burnInto = "netherrack"
		elements.crushed_netherrack = {
			color: ["#e34b46","#b04235","#73431f","#522510","#7a3326"],
			behavior: behaviors.POWDER,
			category:"land",
			tempHigh: 2750,
			stateHigh: "molten_netherrack",
			state: "solid",
			density: 1680,
			burn: 20,
			burnTime: 9007199254740995,
			hardness: 0.02,
			hidden: true,
		}
	  }
	});
} else {
	if(!enabledMods.includes(libraryMod)) { enabledMods.splice(enabledMods.indexOf(modName),0,libraryMod) };
	alert(`The "${libraryMod}" mod is required and has been automatically inserted (reload for this to take effect).`)
	localStorage.setItem("enabledMods", JSON.stringify(enabledMods));
};
