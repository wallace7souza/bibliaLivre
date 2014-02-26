/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var bookClicked = null;
var capitulo = null;
var versiculo = null;
var testamento = null;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log('deviceready baby!');

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        if(!parentElement) return;
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function () {

    Hammer(document.getElementById("contentBook")).on("swipeleft",function (event) {
        if ($('#nextBook').is(":visible")) {
            $('#nextBook').click();
        }
    }).on("swiperight", function (event) {
            if ($('#prevBook').is(":visible")) {
                $('#prevBook').click();
            }
        }).on("pinchout", function (event) {
            $("#contentBook p").each(function(idx,p){
                var t = parseInt($(p).css('font-size'));
                $(p).css('font-size',(t+2)+'px');
            })
        }).on("pinchin", function (event) {
            $("#contentBook p").each(function(idx,p){
                var t = parseInt($(p).css('font-size'));
                $(p).css('font-size',(t-2)+'px');
            })
        });



    $("#popupCapVerAT,#popupCapVerNT").bind({
        // popupbeforeposition: function(event, ui) { 
        popupafteropen: function (event, ui) {


            $(this).one('popupafterclose', function () {
                $(window).one('navigate.popup', function (e) {
                    e.preventDefault();
                });
            });

            console.log('popup abrindo...');
            var caps = BibleUtils[testamento][bookClicked].totalCapitulos;

            //$("#slider-capitulo-at").attr("value",1).attr("max",caps);

            /* $("#slider-capitulo-at")
             .attr('max',1)
             .attr('value',1000).slider("refresh")
             .attr('value',1)
             .attr('max',caps)
             .attr('max',caps).slider("refresh")
             .attr('data-popup-enabled',true).slider("refresh"); */


            loadCapitulos("#select-cap-" + testamento.toLowerCase());
            loadVersiculos("#select-ver-" + testamento.toLowerCase(), "1");

            // $('#select-cap-at,#select-ver-at').selectmenu('refresh', true);
            // $("#slider-capitulo-at").attr('value',1).slider('refresh');


            capitulo = 1;
            versiculo = 1;
        }
    });


    $(document).on("pageshow", "#LivroPage", function () {

        setVersiculoBehavior(true);
        $("#select-livro").empty();

        for (var i = 0; i < BibleUtils[testamento][bookClicked].totalCapitulos; i++) {
            var t = i + 1;
            $("#select-livro").append("<option value='" + t + "'>" + BibleUtils[testamento][bookClicked].abrev + ": " + t + "</option>");
        }
        ;
        $("#select-livro").val(capitulo).selectmenu('refresh', true);
    });


//Desabilitando efeitos que prejudicando performance
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;

    $(".vclick").bind("click", function (ev) {
        eval($(ev.target).parents(".vclick").attr("target"));
    });


    setShareLinkEvents();
    setFavoritarLinkEvents();
});


function setVersiculoBehavior(hl) {
    console.log("abrindo livro no versiculo: " + versiculo);
    if (parseInt(versiculo) > 1) {

        $.mobile.silentScroll($("#v" + (parseInt(versiculo) - 1)).offset().top - 15);
    }
    $("#LivroPage p.versiculo").removeClass("highlight_versiculo").on("tap", function () {
        $(this).toggleClass('highlight_versiculo');
        checkVersiculosSelecionados();
    });
    if (hl){
        $("#v" + versiculo).addClass("highlight_versiculo");
        checkVersiculosSelecionados();
    }
}


function checkVersiculosSelecionados(){
    if($(".highlight_versiculo").length>0){
        $("#shareLink,#favoritarLink").show();
    }else{
        $("#shareLink,#favoritarLink").hide();
    }
}


function setShareLinkEvents(){
    $("#shareLink").on('tap',function(){
        var textToShare = [];
        $(".highlight_versiculo").each(function(idx,ver){
            textToShare.push($(ver).text())
        });
        var toShare = textToShare.join("\r\n") + "\r\n" + ((BibleUtils[testamento][bookClicked].nome) + " " + capitulo ) + " - @BibliaLivre";

        var message = 'Abrindo compartilhamento...';
        if(window.plugins){
            window.plugins.toast.showShortCenter(message);
            window.plugins.socialsharing.share(toShare);
        }else{
            window.console.log(message);
        }
    });
}

function setFavoritarLinkEvents(){

    $("#favoritarLink").on('tap',function(){

        var toFavoritos = [];
        $(".highlight_versiculo").each(function(idx,ver){
            var versiculo2 = ver.id.replace("v", "");
            toFavoritos.push({
                testamento: testamento,
                bookClicked: bookClicked,
                capitulo:capitulo,
                versiculo: versiculo2,
                texto: $(ver).text(),
                nome : ((BibleUtils[testamento][bookClicked].nome) + " " + capitulo+":"+versiculo2 )
            });
        });

        if(window.localStorage.getItem('favoritosArray')){
            var  t = JSON.parse(window.localStorage.getItem('favoritosArray'));
            window.console.log(t,(typeof t));
            for(var i=0; i < toFavoritos.length;i++){
                t.push(toFavoritos[i]);
            }
            toFavoritos = t;
        }


        window.localStorage.setItem('favoritosArray',JSON.stringify(toFavoritos));

        var message = 'Versículo(s) adicionado(s) ao Favoritos.';
        if(window.plugins){
            window.plugins.toast.showShortBottom(message);
        }else{
            window.console.log(message,toFavoritos);
        }

    });
}


function loadCapitulos(target) {

    var caps = BibleUtils[testamento][bookClicked].totalCapitulos;
    capitulo = 1;
    $(target).empty();
    for (var i = 0; i < caps; i++) {
        val = (i + 1);
        $(target).append("<option value='" + val + "'> Cap " + val + "</option");
    }

    $(target).val("1").selectmenu('refresh', true);


}
function loadVersiculos(target, val) {

    var vers = BibleUtils[testamento][bookClicked].capVerMap[val];
    // console.log("total versiculo:"+vers);
    //$(target).empty();

    if (vers) {
        // var selCap = 
        /*$(target).attr("max",vers);
         capitulo=val;
         versiculo=vers;*/

        versiculo = 1;

        // var caps =  BibleUtils.AT[bookClicked].totalCapitulos;
        $(target).empty();
        for (var i = 0; i < vers; i++) {
            val = (i + 1);
            $(target).append("<option value='" + val + "'> Ver " + val + "</option");
        }
        $(target).val("1").selectmenu('refresh', true);

    }


}

function gotoBook(testamento, bookClicked, capitulo, versiculo) {
    var toUrl = (testamento + "/" + bookClicked + "/" + capitulo + ".html#" + versiculo).toLowerCase();
    $.mobile.changePage(toUrl, { transition: "fade"});
}

function loadBook(gotoPage) {

    startLoading('Carregando livro...');

    var url = ("./" + testamento + "/" + bookClicked + "/" + capitulo + ".json").toLowerCase();

    console.log(url);
    $.getJSON(url, function (book) {

        capitulo = parseInt(capitulo);

        $("#bookName,#bookHeader").empty();


        if (book.bookHeader)
            $("#bookHeader").empty().append("<strong>" + book.bookHeader + "</strong>");

        if (book.bookName)
            $("#bookName").empty().append("<strong>" + book.bookName + "</strong>");


        $("#contentBook").empty();

        headText = BibleUtils[testamento][bookClicked].abrev + " " + capitulo;//+":"+versiculo;
        $("#headText,#footerText").html(headText);
        // XGH NO JUTSO!!!
        // $("#headText").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");


        $("#nextBook,#prevBook").show();

        if (capitulo < BibleUtils[testamento][bookClicked].totalCapitulos) {
            var textNext = BibleUtils[testamento][bookClicked].abrev + " " + (capitulo + 1);
            $("#nextBook").html("&nbsp;&nbsp;" + textNext + "&nbsp;&nbsp;");
        } else {
            $("#nextBook").hide();
        }

        if (capitulo > 1) {
            var textNext = BibleUtils[testamento][bookClicked].abrev + " " + (capitulo - 1);
            $("#prevBook").html("&nbsp;&nbsp;" + textNext + "&nbsp;&nbsp;");

        } else {
            $("#prevBook").hide();
        }

        $(book.bookContent).each(function (idx, ver) {
            if (ver.tipo == 'calling' || ver.tipo == 'sub-calling') {

                $("#contentBook").append("<p class='" + ver.tipo + "' ><strong >" + ver.texto + "</strong></p>");


            } else if (ver.tipo == 'versiculo') {
                $("#contentBook")
                    .append("<p class='versiculo' id='v" + ver.id + "' ><strong >" + ver.id + ". </strong>" + ver.texto + "</p>");
            }
        });


        if (gotoPage) {
            console.log('redirect to livroPage');
            $.mobile.changePage("#LivroPage", {transition: 'fade'});
        } else {
            //carergando capitulo do livro
            $.mobile.changePage("#v" + versiculo, {transition: 'flip'});
            $.mobile.silentScroll($("#LivroPage").offset());
            setVersiculoBehavior();
        }

        stopLoading();

    });
}

function startLoading(msg){
    $.mobile.loading("show", {
        text: msg,
        textVisible: true,
        theme: 'b',
        textonly: false,
        html: ""
    });

}

function stopLoading(){
    $.mobile.loading("hide");
}


function openTargetBook(test,bookcl,cap,vers) {
    testamento = test;
    bookClicked = bookcl;
    capitulo = cap;
    versiculo = vers;
    loadBook(true);
}

function loadFavoritos(){
    $("#favoritosListView,#semFavoritosMessage").hide();
    $("#favoritosListView").empty();
    if(window.localStorage.getItem('favoritosArray')){

        var t = JSON.parse(window.localStorage.getItem('favoritosArray'));
        var favoritoClicado = null;
        var favoritoClicadoIdx = null;

        $.each(t, function (idx, ver) {

            var templateLi = $(".templateLi").clone();
            $(templateLi).removeClass("templateLi");//.addClass(clazz.join((" ")));
            $(templateLi).find(".nome").text(ver.nome);
            $(templateLi).find(".texto").text(ver.texto);

            $(templateLi).find(".gearIcon").on('click',function(){
                favoritoClicado = ver;
                favoritoClicadoIdx = idx;
                $('#menuFavorito').popup('open');
            });

            $(templateLi).find(".action").on('tap',function(){
                openTargetBook(ver.testamento,ver.bookClicked,ver.capitulo,ver.versiculo);
            });
            $(templateLi).appendTo("#favoritosListView");

        });

        $("#favoritosListView").show();

        $("#menuFavorito .shareMenuItem").on('tap',function(){

            var toShare = favoritoClicado.texto + " \r\n "+ ((BibleUtils[favoritoClicado.testamento][favoritoClicado.bookClicked].nome) + " " + favoritoClicado.capitulo ) + " - @BibliaLivre";

            var message = 'Abrindo compartilhamento...';
            if(window.plugins){
                window.plugins.toast.showShortCenter(message);
                window.plugins.socialsharing.share(toShare);
            }else{
                window.console.log(message,toShare);
            }

            $('#menuFavorito').popup('close');

        });
        $("#menuFavorito .deleteMenuItem").on('tap',function(){
            t.splice(favoritoClicadoIdx,1);
            window.localStorage.setItem('favoritosArray',JSON.stringify(t));
            $('#menuFavorito').popup('close');
            loadFavoritos();
        });
        $("#menuFavorito .closeMenuItem").on('tap',function(){
            $('#menuFavorito').popup('close');
        });


    }else{
        $("#semFavoritosMessage").show();
    }
}

function navigate(page, perform,loadingEffect) {
    if(loadingEffect){
        startLoading('Abrindo página...');

    }
    if (typeof perform === 'function') {
        perform();
    }

    $.mobile.changePage(page);

    if(loadingEffect){
        stopLoading();
    }
}

function openPopupCapVer() {

    $("#popupCapVer" + testamento).popup('open');
}
