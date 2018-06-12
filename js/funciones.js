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
                        console.log(json);
                        if (json.response == 'ok') {
                            sesiones = json.menu;
                            // alert(sesiones);
                             valid_login = true;    
                              sessionStorage.setItem("usuario",sesiones);
                              $('#cargar').hide();
							  var manulis = [];
							  var manusub = [];
							 $.each(json.menu, function(d,menu){
                                manulis.push(json.menu[d].menui);
								i=i+1;
								var lista_menu = '<li>'+json.menu[d].menui+ ' <a class="dropdown-toggle" href="#" title= "'+json.menu[d].menui+'"><i class="fa fa-info-circle"></i></a></span> </b></li>';
								$("#menu_1").append(lista_menu);
								var submenu_l = '<ol id="subm_1">';
								/*$.each(json.sub, function(j,sub){
								
                                manusub.push(json.sub[j].detalle);
								l=l+1;
								var lista_smenu = '<li>'+json.sub[j].detalle+ ' <a class="dropdown-toggle" href="#" title= "'+json.sub[j].detalle+'"><i class="fa fa-info-circle"></i></a></span> </b></li>';
								$("#subm_1").append(lista_smenu);
								console.log(lista_smenu);
								submenu_l = '</ol>';
								console.log(lista_menu);
								});*/
								
                            });

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
			
