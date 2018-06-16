

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
							
							var  x = "";
							for (i in json.menu) {
								var lista_menu = '<li>'+json.menu[i].menui+ ' <a title= "'+json.menu[i].menui+'"><i class="fa fa-info-circle"></i></a></span> </b></li>';
								$("#menu_1").append(lista_menu);
								var submenu_l = '<ul id="subm_1'+i+'">';
								$("#menu_1").append(submenu_l);
								for (j in json.menu[i].sub) {
									//x += json.menu[i].sub[j].submenu + "<br>";
									submenu_l = '<li>'+json.menu[i].sub[j].submenu+ ' <a  href="#" title= "'+json.menu[i].sub[j].submenu+'"><i class="fa fa-info-circle"></i></a></span> </b></li>';
									$("#subm_1"+i).append(submenu_l);
								}
								
								submenu_l = '</ul>';
								$("#subm_1"+i).append(submenu_l);
								console.log(submenu_l);
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
			
