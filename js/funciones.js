var marca_s = 0;
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
							if(perfil==1){
								//$("#carga_home").load('home.html');
								console.log("entro en perfil:"+perfil);
							}if(perfil==2){
								//console.log("entro en perfil:"+perfil);
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
							//console.log(x);
							
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
							var URLactual = window.location.pathname;
							var new_div = "<ul class='ca-menu' >;";	
							 $.each(json.marca, function(d,brank){								
								new_div += "<li>"+
										"<a  onclick='carga_tiendas("+json.marca[d].id+");' href='../ventas_tienda.html?id="+json.marca[d].id+"'>"+
											"<span class='ca-icon'>A</span>"+
											"<div class='ca-content'>"+
												"<h2 class='ca-main'><img src='"+json.marca[d].logo+"'</h2>"+
												"<h3 class='ca-sub'>"+json.marca[d].brank+"</h3>"+
											"</div>"+
										"</a>"+
									"</li>";
									marca_s = json.marca[d].id;
									$("#marca_s").val(marca_s);
									$("#fecha_o").val(fecha);
                            });
                            new_div += "</ul>";
							$("#carga_menu_ventas").append(new_div);
							//console.log(new_div);
                        }
                    },
                    error : function(jqXHR, status, error) {
                        console.log(error);
						alert(error);
                    }
                }); 
	
}	
function carga_tiendas(mar){
	$("#tienda_sl").empty();
	//alert(mar);
	$.ajax({
                    url : 'http://lunatiks.net/app_retail_v1/load_tiendas.php',
					crossDomain: true,
                    data : { 
                        // data client
                        ttienda: mar,
						tuser: user,
                        op:'loati'  
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

							var new_opt = "";	
							 $.each(json.tiendas, function(j,tienda){								
								$('#tienda_sl').append('<option value="'+json.tiendas[j].idtienda+'" selected="selected">'+json.tiendas[j].tienda+'</option>');									
								new_opt += '<option value="'+json.tiendas[j].idtienda+'" selected="selected">'+json.tiendas[j].tienda+'</option>';
							});		
						
                        }
                    },
                    error : function(jqXHR, status, error) {
                        console.log(error);
						alert(error);
                    }
                }); 
}
function sumar_ventas(){
			var tbruto2 = $("#txt_bruto").val();
			var tiva2 = $("#txt_iva").val();
			var sumatoria = parseFloat(tiva2)+parseFloat(tbruto2);
			$("#txt_neto").val(sumatoria);
}
function save_venta(e)
{
			var idlocal = document.getElementById('tienda_sl');
			var local_ = "";
			if(idlocal.selectedIndex>0){
				local_ = idlocal.options[idlocal.selectedIndex].value;		
			}
			if(local_==""){
				$('#mostrar_error').parent().addClass('has-error has-feedback');
				return;
			}else{
				$('#mostrar_error').parent().removeClass('has-success has-error'); 
			}
			console.log("tienda"+local_);
			var tienda_id = local_;
			var tfecha = $("#fecha_o").val();
			var tpeizas = $("#txt_piezas").val();
			var tticke = $("#txt_tick").val();
			var tbruto = $("#txt_bruto").val();
			var tiva = $("#txt_iva").val();
			var neto = $("#txt_neto").val();
			
			if(tfecha==""){
			  $("#fecha_o").focus();
			  $('#fecha_o').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#fecha_o').parent().removeClass('has-success has-error');
			}
			if(tpeizas==""){
			  $("#txt_piezas").focus();
			  $('#txt_piezas').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#txt_piezas').parent().removeClass('has-success has-error');
			}
			if(tticke==""){
			  $("#txt_tick").focus();
			  $('#txt_tick').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#txt_tick').parent().removeClass('has-success has-error');
			}
			if(tbruto==""){
			  $("#txt_bruto").focus();
			  $('#txt_bruto').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#txt_bruto').parent().removeClass('has-success has-error');
			}
			if(tiva==""){
			  $("#txt_iva").focus();
			  $('#txt_iva').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#txt_iva').parent().removeClass('has-success has-error');
			}
			if(neto==""){
			  $("#txt_neto").focus();
			  $('#txt_neto').parent().addClass('has-error has-feedback');
			  //$('#username').parent().removeClass('has-success has-error');
				return;			  
		    }else{
				$('#txt_neto').parent().removeClass('has-success has-error');
			}
			
				$.ajax({
				 url : 'http://lunatiks.net/app_retail_v1/ventas_script.php',
				crossDomain: true,
			    data : { 
					idtienda: tienda_id,
					fecha_v: tfecha,
					piezas: tpeizas,
					tick:tticke,
					bruto:tbruto,
					iva:tiva,
					tt:neto,
			    	op: 'add_v'
			    },	
			    type : 'GET',
			    dataType : 'json',
				cache: false,
			    beforeSend: function(){
					$("#ventas_send").attr("disabled", true);

					$(e).css({
								'color':'#337ab7', 
								'pointer-events': 'auto',
				   				'cursor': 'pointer'
							});
			    },		
			    success : function(json) {
					if(json.ventas=='ok'){
							//vent.carga_tiendas(json.marca);
							$("#ventas_send").attr("disabled", true);
					}else {
						
							$("#ventas_send").attr("disabled", false);
					}
				},
				error: function(error){
			    	console.log(error);
			    }
			});
			

		}
