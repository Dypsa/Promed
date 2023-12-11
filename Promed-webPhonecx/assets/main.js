var connected = false;
var SessionID;

$(function() {
	var cliente = ZAFClient.init();
	cliente.invoke('resize', { width: '100%', height: '400px' });

	$("button").click(function(){
		//Oculto mensajes de error
		hideAlerts();

    	switch(this.id) {
			case "getItem":
				//getItem(false);
	  			//connectSL(cliente);
				var docTypeId = document.getElementById("docType");
	  			var ItemCode = document.getElementById("dni");
	  			console.log('valor del itemcode:' + ItemCode.value);
	  			if ( docTypeId.value == 'dni') {
					if (ItemCode.value == '30584786') {
						displayFijo_1(cliente);
					}
				} else {
					$("#okAlert").fadeOut();
					$("#errorAlert").fadeIn();
					displayVacio(cliente);
				};
				break;
			case "getLoc":
				var ItemCode = document.getElementById("lacator");
				if ( ItemCode.value != '') {
					displayLoc(cliente);
		
	 			} else {
					$("#okAlert").fadeOut();
					$("#errorAlert").fadeIn();
					displayVacio(cliente);
				};
				break; 
    	}
	});
	//Erases Result Modal Content
	$('#resulModal').on('hidden.bs.modal', function () {
		$('#resultTable').find("tr").remove();
		$('.jsonResult').empty();
	});
	//Hide Alerts
	$("#okAlert").hide();
	$("#errorAlert").hide(); 
});

function connectSL(cliente){
	var filter = "";
	var numberId = document.getElementById("dni");
	var docTypeId = document.getElementById("docType");
	filter = "/"+"idTypeCode="+docTypeId.value+"&idNumber="+numberId.value+"/";
  	//Hago la proxima consulta SAP-SL
	var serv = "http://api.voyenbus.com:8090/TOLWeb/api/rest/v1.0/bo/person/search?" + filter;
  
	console.log(serv + filter);

	//$.ajax({
	cliente.request({
			url: serv + filter,
			// whether this is a POST or GET request
			type: "POST",
			// the type of data we expect back
			}).then(function( results ) {	   
					if (results.length > 0){
						console.log("Dio OK");
						//console.log(results);
						//displayItem(results, cliente);
					} else {
						console.log('ERROR: json vacio...');
						//displayVacio();
						$("#errorAlert").fadeIn();
					}
			 	})
				.catch((error) => {
					console.log("ERROR el llamado a Contracts:", error);
					$("#errorAlert").fadeIn();

				})
	 }


 function connectLoc(cliente){
	var filter = "";
	var locatorId = document.getElementById("lacator");
	//Primero Obtengo el token desde Authorize
	var autorize = "http://api.voyenbus.com:8090/TOLWeb/api/rest/v1.0/authorize"
	cliente.request({
		url: autorize,
		// whether this is a POST or GET request
		type: "GET",
		// the type of data we expect back
		headers: {
			Authorization: "{{authToken}}",
			ClientId: "demoVeb1",
			Host: "test.api",
		},
		accepts: "application/json",
		}).then(function( results ) {
			if (results.length > 0){
				console.log("Dio OK");
				console.log(results);
				//displayItem(results, cliente);
			} else {
				console.log('ERROR: json vacio...');
				console.log(results);
				//displayVacio();
				$("#errorAlert").fadeIn();
			}
		 })
		 .catch((error) => {
			console.log("ERROR el llamado a Contracts:", error);
			$("#errorAlert").fadeIn();	
		});
}




function hideAlerts(){

	$("#okAlert").fadeOut();
	$("#errorAlert").fadeOut();
}

function displayVacio(client){
	document.getElementById('idNumber').style.display="";
	document.getElementById('idNumber').innerHTML="";
	document.getElementById('lastname').style.display="";
	document.getElementById('lastname').innerHTML="";	
	document.getElementById('name').style.display="";
	document.getElementById('name').innerHTML="";	
	document.getElementById('phone').style.display="";
	document.getElementById('phone').innerHTML="";
	document.getElementById('email').style.display="";
	document.getElementById('email').innerHTML="";
	document.getElementById('id').style.display="";
	document.getElementById('id').innerHTML="";
	// Agrego el set de campos del ticket
	//
	//Localizador
	client.set('ticket.customField:custom_field_360039339031', '');
	//Telefono
	client.set('ticket.customField:custom_field_360039406632', '');
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', '');
	//Apellido y Nombre
	client.set('ticket.customField:custom_field_1900001995767', '');	
}

function displayFijo_1(client){
	$("#okAlert").fadeIn();
	document.getElementById('idNumber').style.display="block";
	document.getElementById('idNumber').innerHTML="30584786";
	document.getElementById('lastname').style.display="block";
	document.getElementById('lastname').innerHTML="Villarreal";	
	document.getElementById('name').style.display="block";
	document.getElementById('name').innerHTML="Lucas";	
	document.getElementById('phone').style.display="block";
	document.getElementById('phone').innerHTML="2616924053";
	document.getElementById('email').style.display="block";
	document.getElementById('email').innerHTML="lucas@voyenbus.com";
	document.getElementById('id').style.display="block";
	document.getElementById('id').innerHTML="20801";
	// Agrego el set de campos del ticket
	//
	//Localizador
	client.set('ticket.customField:custom_field_360039339031', '');
	//Telefono
	client.set('ticket.customField:custom_field_360039406632', '2616924053');
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', 'lucas@voyenbus.com');
	//Apellido y Nombre
	client.set('ticket.customField:custom_field_1900001995767', 'Villarreal, Lucas');		
}



function displayLoc(client){
	$("#okAlert").fadeIn();
	document.getElementById('idNumber').style.display="block";
	document.getElementById('idNumber').innerHTML="34747592";
	document.getElementById('lastname').style.display="block";
	document.getElementById('lastname').innerHTML="Cocco";	
	document.getElementById('name').style.display="block";
	document.getElementById('name').innerHTML="Daniel Edgardo";	
	document.getElementById('phone').style.display="block";
	document.getElementById('phone').innerHTML="2615165638";
	document.getElementById('email').style.display="block";
	document.getElementById('email').innerHTML="danielc@voyenbus.com";
	document.getElementById('id').style.display="block";
	document.getElementById('id').innerHTML="1259948";
	// Agrego el set de campos del ticket
	//
	//Localizador
	client.set('ticket.customField:custom_field_360039339031', 'LGKY0TMW-22E');
	//Telefono
	client.set('ticket.customField:custom_field_360039406632', '2615165638');
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', 'lucas@voyenbus.com');
	//Apellido y Nombre
	client.set('ticket.customField:custom_field_1900001995767', 'Cocco, Daniel Edgardo');		
}
