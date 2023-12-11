//Botones de la pagina
const btnCliente = document.querySelector("button[id='getCliente']");
const btnCompania = document.querySelector("button[id='getCia']");
//Tablas de campos a mostrar
//Clientes
const tablaCliente = [
	{nombre: "Comp.Nro.....:"},
	{nombre: "Cliente Nro..:"},
	{nombre: "Nombre.......:"},
	{nombre: "Identificador:"},
	{nombre: "Direccion....:"},
	{nombre: "Telefonos....:"},
	{nombre: "Correos......:"}
	];
// Para Testing
const myItems =	[
        {
            "no_cia": "26",
            "no_cliente": "CP-01",
            "nombre": "CENTRO NACIONAL DE CARDIOLOGIA",
            "identificador": "J01100000172057",
            "direccion": "Contiguo al parqueo interno Hosp. Roberto Calderon Gutierrez",
            "telefono": "22700326",
            "telefono2": null,
            "email1": null,
            "email2": null,
            "codigo_kbox": "NIC-130-X-C005450"
        },
        {
            "no_cia": "26",
            "no_cliente": "CV-22",
            "nombre": "CENTRO DE INSUMOS PARA LA SALUD (CIPS) - MINSA / UNOPS - PROYECTO BM-22842",
            "identificador": "J1410000330415",
            "direccion": "CASA DE NACIONES UNIDAS, PASEO NACIONES UNIDAS, ROTONDA EL GUEGUENSE 100 MTS AL SUR, MANAGUA",
            "telefono": null,
            "telefono2": null,
            "email1": null,
            "email2": null,
            "codigo_kbox": "NIC-110-1-C006786"
        },
        {
            "no_cia": "26",
            "no_cliente": "CV-38",
            "nombre": "CENTRO DE DIAGNOSTICO POR IMAGENES LA CONCEPCION",
            "identificador": "881-081060-001",
            "direccion": "IGLESIA EL CALVARIO IC AL N 25 CHINANDEGA",
            "telefono": null,
            "telefono2": null,
            "email1": "monte-v@hotmail.com",
            "email2": null,
            "codigo_kbox": "NIC-190-X-C002654"
        },
        {
            "no_cia": "26",
            "no_cliente": "007990",
            "nombre": "CENTRO NACIONAL DE OFTALMOLOGIA (CENAO)",
            "identificador": "J0130000135730-4",
            "direccion": "CONTIGUO EDIFICIO INSS CENTRAL, 4 AV SUROESTE, MANAGUA, NICARAGUA",
            "telefono": "+50581004017",
            "telefono2": null,
            "email1": "c01h31-mga@minsa.gob.ni",
            "email2": null,
            "codigo_kbox": "NIC-110-1-C007990"
        },
        {
            "no_cia": "26",
            "no_cliente": "GP-03",
            "nombre": "CENTRO NACIONAL DE DIAGNOSTICO Y REFERENCIA CNDR- MINSA",
            "identificador": "J0810000158862",
            "direccion": "COSTADO OESTE COLONIA PRIMERO DE MAYO. MANAGUA, NICARAGUA|PBX",
            "telefono": null,
            "telefono2": null,
            "email1": null,
            "email2": null,
            "codigo_kbox": "NIC-110-2-C007248"
        }
	];

// Zendesk
const cliente = ZAFClient.init();
//cliente.invoke('resize', { width: '20vw', height: '50vh' });
cliente.invoke('resize', { width: '300px', height: '450px'});

// Vbles de entorno
var tipoConsulta = "1";
var cia_nro = "0";
var clienteNombre = "0";
var compania = "0";
var selectTipo = document.getElementById("docType");
//Para la consulta de los datos
var miStatus='';
var miAccessToken = 'valor-inicial';

//Oculto Datos y Alertas para mostrar segun resultados
hideAlerts();

function hideAlerts(){

	$("#okAlert").fadeOut();
	$("#errorAlert").fadeOut();
};



btnCliente.addEventListener("click", function(){
	//login('1',cliente,'');
	tipoConsulta = "1";
	cia_nro = document.getElementById("cia").value;
	clienteNombre = document.getElementById("cliente").value;
	console.log('Cia y Clte-Nombre: ' + cia_nro + '-' + clienteNombre);
	//login();
	//Llamo directo a la API de Heroku
	clientesAPI(cia_nro,clienteNombre);
	
})

btnCompania.addEventListener("click", function(){
	//login('1',cliente,'');
	tipoConsulta = "2";
	//compania = document.getElementById("locator").value;
	console.log('Compañia: ' + compania);
	login();
	
})


function login(){
	
	console.log('ENTRO AL LOGIN:')
	//Paso el response a JSON para obtener el atoken
	const payload = JSON.stringify({
			"username": "zendesk@promed-sa.com",
			"password": "Zendesk*099"
	  });
	var options = {
		url: "https://trxk539p2e.execute-api.us-east-1.amazonaws.com/Stage/Login",
		type: "POST",
		timeout : 0,
		contentType: 'application/json',
		data: payload,
		};  
	  //$.ajax(settings).done(function (response) {
		//console.log(response);
	  //});
	cliente.request(options)
	  	.then(function(response) {
			console.log('LOGIN');
			//console.log(JSON.stringify(response));
			//console.log('error: ' + response.error);
			//console.log('idToken: ' + response.idToken);
			//Guardo el Token para las conexiones siguientes
			miAccessToken = response.idToken;
			hideAlerts();
			//Habilito la consulta segun tipo: 1-Tipo y Nro DNI, 2-Localizador
			if (tipoConsulta == '1'){
				//clientes();
				displayClienteMockUp();
			}
			else {
				companias();
			}
		},
	  function(response) {
		console.log('ERROR LOGIN:');
		console.log(JSON.stringify(response));
		displayVacio(response.status);
		$("#errorAlert").fadeIn();
		//
	  });
}


function companias(){
	console.log('Tipo de Consulta: ' + tipoConsulta);
	//Paso a consultar las Compañias
  	var options = {
	  url: "https://e1kb0ljw0g.execute-api.us-east-1.amazonaws.com/beta/companias",
	  type: "GET",
	  timeout : 0,
	  contentType: 'application/json',
	  headers: {
		"auth" : miAccessToken,
		"Content-Type": "text/plain"
	  }
	  };
	cliente.request(options)
		.then(function(response) {
		  console.log('COMPANIAS');
		  console.log(JSON.stringify(response));
		  displayLoc(response);
		  $("#okAlert").fadeIn();
	  },
	function(response) {
	  console.log('ERROR COMPANIAS:');
	  console.log(JSON.stringify(response));
	  displayLoc(response);
	  $("#errorAlert").fadeIn();
	});
}


function clientes(){
	console.log('Tipo de Consulta: ' + tipoConsulta);
	//Paso a consultar los Clientes
	const payload2 = JSON.stringify({
		"no_cia": cia_nro,
		"nombre_cliente": clienteNombre
	 });
  	var options = {
	  url: "https://e1kb0ljw0g.execute-api.us-east-1.amazonaws.com/beta/clientes",
	  type: "GET",
	  timeout : 0,
	  payload : payload2,
	  headers: {
		"auth" : miAccessToken,
		"Content-Type": "text/plain"
	  }, 
	  };
	cliente.request(options)
		.then(function(response) {
		  console.log('CLIENTES');
		  console.log(response);
		  //console.log(JSON.stringify(response));
		  //displayLoc(response);
		  $("#okAlert").fadeIn();
	  },
	function(response) {
	  console.log('ERROR CLIENTES:');
	  console.log(JSON.stringify(response));
	  displayVacio(response.status);
	  $("#errorAlert").fadeIn();
	});
}

// API en Heroku
function clientesAPI(cia, clienteNombre){
	console.log('Tipo de Consulta: ' + tipoConsulta);
	//Paso a consultar los Clientes
  	var options = {
	  url: "https://apipromed-5ad52b4064b7.herokuapp.com/clientes/" + cia + "/" + clienteNombre,
	  type: "GET"
	  };
	cliente.request(options)
		.then(function(response) {
		  console.log('CLIENTES');
		  console.log(response);
		  console.log(JSON.stringify(response));
		  displayPersonas(response);
		  $("#okAlert").fadeIn();
	  },
	function(response) {
	  console.log('ERROR CLIENTES:');
	  console.log(JSON.stringify(response));
	  //displayVacio(response.status);
	  $("#errorAlert").fadeIn();
	});
}


//
//---- VISUALIZACION DE DATOS
//
function displayVacio(codoperacion){
	//Visualizo el formulario
	$("#tabClte").show(); 
	//Data
	document.getElementById('idNumber').style.display="";
	document.getElementById('idNumber').innerHTML="";
	document.getElementById('compania').style.display="";
	document.getElementById('compania').innerHTML="";	
	document.getElementById('name').style.display="";
	document.getElementById('name').innerHTML="";	
	document.getElementById('identificador').style.display="";
	document.getElementById('identificador').innerHTML="";
	document.getElementById('direccion').style.display="";
	document.getElementById('direccion').innerHTML="";
	document.getElementById('telefono').style.display="";
	document.getElementById('telefono').innerHTML="";
	document.getElementById('email').style.display="";
	document.getElementById('email').innerHTML=codoperacion;
	document.getElementById('codigo_kbox').style.display="";
	document.getElementById('codigo_kbox').innerHTML=codoperacion;

	// Agrego el set de campos del ticket
	//
	//Localizador
	//cliente.set('ticket.customField:custom_field_360039339031', '');
	//Telefono
	//cliente.set('ticket.customField:custom_field_360039406632', '');
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', '');
	//Apellido y Nombre
	//cliente.set('ticket.customField:custom_field_1900001995767', '');	
}

//------ CLIENTES
function displayPersonas(jasonres){
	$("#okAlert").fadeIn();
	//Visualizo el formulario correspondiente
	$("#tabCompania").hide(); 
	$("#tabClte").show(); 
	//Data
	pval ="";
        for (i=0;i<jasonres.items.length;i++) {
			pval += "<tr>";
			pval += "<td>"+tablaCliente[0].nombre+jasonres.items[i].no_cia+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[1].nombre+jasonres.items[i].no_cliente+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[2].nombre+jasonres.items[i].nombre+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[3].nombre+jasonres.items[i].identificador+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[4].nombre+jasonres.items[i].direccion+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[5].nombre+jasonres.items[i].telefono+"</td>";
			pval += "</tr>";
			pval += "<td>"+tablaCliente[6].nombre+jasonres.items[i].email+"</td>";
			pval += "</tr>";
			pval += "<tr>_____________________________________";
			pval += "</tr>";;
        };	
        document.getElementById('tabla-clte').innerHTML=pval;

	// Agrego el set de campos del ticket
	//
	//Localizador
	//cliente.set('ticket.customField:custom_field_360039339031', '');
	//Telefono
	//cliente.set('ticket.customField:custom_field_17096368176404', jasonres.data.list[0].phones);
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', '');
	//Apellido y Nombre
	//cliente.set('ticket.customField:custom_field_17100873120660', jasonres.data.list[0].lastname + ', ' + jasonres.data.list[0].name);	
	//DNI
	//cliente.set('ticket.customField:custom_field_17096351404436', jasonres.data.list[0].id);	
}

//---- COMPANIAS
function displayLoc(jasonres){
	$("#okAlert").fadeIn();
	//Visualizo el formulario correspondiente
	$("#tabClte").hide(); 
	$("#tabCompania").show(); 
	//Data
	pval ="";
        for (i=0;i<jasonres.items.length;i++) {
            pval += "<tr>";
			pval += "<td>"+jasonres.items[i].no_cia+"</td>";
			pval += "<td>"+jasonres.items[i].compania+"</td>";
			pval += "<td>"+jasonres.items[i].pais+"</td>";
            pval += "</tr>";
        };	
        document.getElementById('tabla-cias').innerHTML=pval;
	// Agrego el set de campos del ticket
	//
	//Localizador
	//cliente.set('ticket.customField:custom_field_360039339031', jasonres.data.sales[0].locator);
	//Telefono
	//cliente.set('ticket.customField:custom_field_360039406632', jasonres.data.sales[0].passenger.phone);
	//Correo
	//client.set('ticket.customField:custom_field_360048354551', 'lucas@voyenbus.com');
	//Apellido y Nombre
	//cliente.set('ticket.customField:custom_field_1900001995767', jasonres.data.sales[0].passenger.lastname + ',' + jasonres.data.sales[0].passenger.name);		
}
//------ CLIENTES
function displayClienteMockUp(){
	$("#okAlert").fadeIn();
	//Visualizo el formulario correspondiente
	$("#tabCompania").hide(); 
	$("#tabClte").show(); 
	//Data
	pval ="";
	//for (i=0;i<jasonres.items.length;i++) {
	for (i=0;i<myItems.length;i++) {
		pval += "<tr>";
		pval += "<td>"+tablaCliente[0].nombre+myItems[i].no_cia+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[1].nombre+myItems[i].no_cliente+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[2].nombre+myItems[i].nombre+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[3].nombre+myItems[i].identificador+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[4].nombre+myItems[i].direccion+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[5].nombre+myItems[i].telefono+"</td>";
		pval += "</tr>";
		pval += "<td>"+tablaCliente[6].nombre+myItems[i].email+"</td>";
		pval += "</tr>";
		pval += "<tr>_____________________________________";
		pval += "</tr>";;
	};	
	document.getElementById('tabla-clte').innerHTML=pval;

}
