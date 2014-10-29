var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", "http://code.jquery.com/jquery-1.10.2.min.js");
 document.getElementsByTagName("head")[0].appendChild(fileref);

function extrairCapitulo(cap){

//pegando o nome do livro
//var bookName = $("#conteudo b.font_subtitulo").text();

//removendo titulo e subtitulo 
$("#conteudo .font_subtitulo").remove();
$("#conteudo .font_titulo").remove();
$("#conteudo table").remove();
$("#conteudo .paginacao").remove();

//regex para versiculos
var regex = /[0-9]+.[0-9]+/g;
capitulo = $("#conteudo").text().trim();
var a = capitulo.replace(regex,"|").split("|");

var livro = { "bookHeader":   "",
 "bookName":cap,
"bookContent":[]};

for (var i = 0; i < a.length; i++) {
	var versiculos = a[i];
	if(versiculos.trim()!==''){
		//console.log(i+":"+versiculos.trim());
		livro.bookContent.push({"id":i,"tipo":"versiculo","texto":versiculos.trim()});
	}
};

console.log(JSON.stringify(livro));

//return a;

}

//extrairCapitulo();