var BibleUtils = {
		
	AT : {
			Gn:{nome:"Gênesis",abrev:"Gn",totalCapitulos:50,
		capVerMap:{
			"1":31,
			"2":25,
			"3":24,
			"4":26,
			"5":32
		}
		},
			Ex:{nome:"Êxodo",abrev:"Êx",totalCapitulos:40},
			Lv:{nome:"Levítico",abrev:"Lv",totalCapitulos:27},
			Nm:{nome:"Números",abrev:"Nm",totalCapitulos:36},
			Dt:{nome:"Deuteronômio",abrev:"Dt",totalCapitulos:34},
			Js:{nome:"Josué",abrev:"Js",totalCapitulos:24},
			Jz:{nome:"Juízes",abrev:"Jz",totalCapitulos:21},
			Rt:{nome:"Rute",abrev:"Rt",totalCapitulos:4},
			_1Sm:{nome:"1 Samuel",abrev:"1Sm",totalCapitulos:31},
			_2Sm:{nome:"2 Samuel",abrev:"2Sm",totalCapitulos:24},
			_1Rs:{nome:"1 Reis",abrev:"1Rs",totalCapitulos:22},
			_2Rs:{nome:"2 Reis",abrev:"2Rs",totalCapitulos:25},
			_1Cr:{nome:"1 Crônicas",abrev:"1Cr",totalCapitulos:29},
			_2Cr:{nome:"2 Crônicas",abrev:"2Cr",totalCapitulos:36},
			Ed:{nome:"Esdras",abrev:"Ed",totalCapitulos:10},
			Ne:{nome:"Neemias",abrev:"Ne",totalCapitulos:13},
			Es:{nome:"Ester",abrev:"Et",totalCapitulos:10},
			Jo:{nome:"Jó",abrev:"Jó",totalCapitulos:42},
			Sl:{nome:"Salmos",abrev:"Sl",totalCapitulos:150},
			Pv:{nome:"Provérbios",abrev:"Pv",totalCapitulos:31},
			Ec:{nome:"Eclesiastes",abrev:"Ec",totalCapitulos:12},
			Ct:{nome:"Cântico dos Cânticos",abrev:"Ct",totalCapitulos:8},
			Is:{nome:"Isaías",abrev:"Is",totalCapitulos:66},
			Jr:{nome:"Jeremias",abrev:"Jr",totalCapitulos:52},
			Lm:{nome:"Lamentações de Jeremias",abrev:"Lm",totalCapitulos:5},
			Ez:{nome:"Ezequias",abrev:"Ez",totalCapitulos:48},
			Dn:{nome:"Daniel",abrev:"Dz",totalCapitulos:12},
			Os:{nome:"Oseias",abrev:"Os",totalCapitulos:14},
			Jl:{nome:"Joel",abrev:"Jl",totalCapitulos:3},
			Am:{nome:"Amós",abrev:"Am",totalCapitulos:9},
			Ob:{nome:"Obadias",abrev:"Ob",totalCapitulos:1},
			Jn:{nome:"Jonas",abrev:"Jn",totalCapitulos:4},
			Mq:{nome:"Miqueias",abrev:"Mq",totalCapitulos:7},
			Na:{nome:"Naum",abrev:"Na",totalCapitulos:3},
			Hc:{nome:"Habacuque",abrev:"Hc",totalCapitulos:3},
			Sf:{nome:"Sofonias",abrev:"Sf",totalCapitulos:3},
			Ag:{nome:"Ageu",abrev:"Ag",totalCapitulos:2},
			Zc:{nome:"Zacarias",abrev:"Zc",totalCapitulos:14},
			Ml:{nome:"Malaquias",abrev:"Ml",totalCapitulos:4},
			
	}	
		
}




/*
function loadCapituloVersiculo(target){

	$("#"+target.selCap+",#"+target.selver).empty();

	for (var i = 0; i <= target.selCapTotal; i++) {
		$("#"+target.selCap+")
		
	};


}
*/