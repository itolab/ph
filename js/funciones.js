function carga_pais(){
	$("#contenedor_").show();
	$("#contenedor_").load('graficar_pais.html');
	
}

function loadmenu(e) {	
var i=0;
var l = 0;

				    $.ajax({
                    url : 'http://lunatiks.net/app_retail_v1/load_menu.php',
					crossDomain: true,
                    data : { 
                        // data client
                        tuser: $("#idu").val(),
                        op:'loadm'  
                    },
                    type : 'GET',
                    dataType : 'json',
					error:function(jqXHR,text_status,strError){
					alert("no conecta");},
					timeout:600000,
					beforeSend : function(){
						$("#cargar").show();
                    },
                    success : function(json) {
                        //console.log(json);
                        if (json.response == 'ok') {
                            sesiones = json.menu;
                            // alert(sesiones);
                             valid_login = true;    
                              sessionStorage.setItem("usuario",sesiones);
                              $('#cargar').hide();
							  var manulis = [];
							  var manusub = [];
							$("#carga_home").load('home.html');
							
							if(perfil==1 || perfil=="1" ){
							
								$("#carga_home").load('home.html');
								console.log("entro en perfil:"+perfil);
							}if(perfil==2 || perfil=="2" ){
								console.log("entro en perfil:"+perfil);
								$("#carga_home").load('home2.html');

							}
							
							var  x = "";
							for (i in json.menu) {
								var lista_menu = '<li>'+json.menu[i].menui+ ' <a title= "'+json.menu[i].menui+'"><i class="fa fa-info-circle"></i></a></span> </b></li>';
								$("#menu_1").append(lista_menu);
								var submenu_l = '<ul id="subm_1'+i+'">';
								$("#menu_1").append(submenu_l);
								for (j in json.menu[i].sub) {
									//x += json.menu[i].sub[j].submenu + "<br>";
									submenu_l = '<li> <a href="'+json.menu[i].sub[j].link+'" title= "'+json.menu[i].sub[j].submenu+'"><i class="fa fa-info-circle"></i>'+json.menu[i].sub[j].submenu+ '</a></span> </b></li>';
									$("#subm_1"+i).append(submenu_l);
								}
								console.log(submenu_l);
								submenu_l = '</ul>';
								$("#subm_1"+i).append(submenu_l);
								
							}							
							console.log(x);
							
                        }else{
						    //alert("resultado: "+json.response);
							//waitingDialog.show('Error en Datos...', {dialogSize: 'sm', progressType: 'red'});setTimeout(function () {waitingDialog.hide();}, 1000);
                         //waitingDialog.show('Error en sus datos...', {dialogSize: 'm', progressType: 'red'});setTimeout(function () {waitingDialog.hide();}, 2000);
                        }
                    },
                    error : function(jqXHR, status, error) {
                        console.log(error);
						alert(error);
                    }
                }); 
			}
			
function mostrar_marcas(){
					    $.ajax({
                    url : 'http://lunatiks.net/app_retail_v1/load_brank.php',
					crossDomain: true,
                    data : { 
                        // data client
                        tuser: $("#idu").val(),
                        op:'loabr'  
                    },
                    type : 'GET',
                    dataType : 'json',
					error:function(jqXHR,text_status,strError){
					alert("no conecta");},
					timeout:600000,
					beforeSend : function(){
						$("#cargar").show();
                    },
                    success : function(json) {
                        //console.log(json);
                        if (json.response == 'ok') {
                            // alert(sesiones);
                             valid_login = true;    							  
							var brank = [];
							var new_div = "<ul class='ca-menu' >;";	
							 $.each(json.marca, function(d,brank){								
								new_div += "<li>"+
										"<a href=''>"+
											"<span class='ca-icon'>A</span>"+
											"<div class='ca-content'>"+
												"<h2 class='ca-main'><img src='../img/"+json.marca[d].logo+"'</h2>"+
												"<h3 class='ca-sub'>"+json.marca[d].brank+"</h3>"+
											"</div>"+
										"</a>"+
									"</li>";
                            });
                            new_div += "</ul>";
							$("#carga_menu_ventas").append(new_div);
							console.log(new_div);
                        }
                    },
                    error : function(jqXHR, status, error) {
                        console.log(error);
						alert(error);
                    }
                }); 
	
}	