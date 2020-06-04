/**
 * 
 */

/*$.getJSON('http://localhost:9090/api/v1/listemployees', function(data) {
    $.each(data,function(index,emp){
    	var text = `Date: ${emp.age}<br>
            Time: ${emp.ename}<br>`
    		//alert(text);
    		$(".mypanel").html(text);
    })
});
    
/*
var rootURL = "http://localhost:9090/api/v1/listemployees";

$(document).ready(
		function() {
			$.ajax({
				url : "http://localhost:9090/api/v1/listemployees"
			}).then(
					function(data) {
						$.each(data,
								function(index, employee) {
										$('#empList').append(
												'<li>'+
														employee.age+' '+ employee.ename
														+ '</li>');
								});

					});
		});
*/





$(document).ready(
		function() {
$('#showEmployee').click(function() {
	
	$.ajax({
		url :"http://localhost:9090/api/v1/getallRecord",
	}).then(
			function(data) {
				$.each(data,
						function(index, employee) {
								$('#empList').append(
									'<li>'+employee.id+'  '+employee.name+'   '+employee.phoneno+'   '+employee.status+'  '+employee.department+'  '+employee.createddtm+'  '+employee.createdby+'  '+employee.updateddtm+'  '+employee.updatedby+' </li>');
						});

			});

});
$("#showEmployeeById").click(function() {
	var id = $("#id").val();
	if(id != null && id != "")
	{
		$.ajax({
			url :"http://localhost:9090/api/v1/empid/"+id,
		}).then(
		function(data) {			
			$('#empListid').append(
							'<li>'+data[0]["id"]+'  '+ data[0]["name"]+'  '+data[0]["phoneno"]
							+'  '+data[0]["status"]+'  '+data[0]["department"]+'  '+data[0]["createddtm"]+'  '+data[0]["createdby"]+'  '+data[0]["updateddtm"]
							+' '+data[0]["updatedby"]+'</li>');
					
		});
	}
	else
	{
		alert("Enter id first.")
	}

});


$("#showEmployeeByName").click(function() {
	var name = $("#name").val();
	if(name != null && name != "")
	{
		$.ajax({
			url :"http://localhost:9090/api/v1/showemployeesByname/"+name,
		}).then(
		function(data) {			
			$('#empListname').append(
					'<li>'+data[0]["id"]+' '+ data[0]["name"]+' '+data[0]["phoneno"]
					+' '+data[0]["status"]+' '+data[0]["department"]+' '+data[0]["createddtm"]+' '+data[0]["createdby"]+' '+data[0]["updateddtm"]
					+''+data[0]["updatedby"]+'</li>');
					
		});
	}
	else
	{
		alert("Enter name first.");
	}

});


$('#showEmployeeByStatus').click(function() {
	var status = $("#status").val();
	if(status != null && status != "")
	{
		$.ajax({
			url :"http://localhost:9090/api/v1/status/"+status,
		}).then(
		function(data) {			
			
			$.each(data,
					function(index, employee) {
							$('#empListstatus').append(
									'<li>'+data[0]["id"]+' '+ data[0]["name"]+' '+data[0]["phoneno"]
									+' '+data[0]["status"]+' '+data[0]["department"]+' '+data[0]["createddtm"]+' '+data[0]["createdby"]+' '+data[0]["updateddtm"]
									+''+data[0]["updatedby"]+'</li>');
					});
					
		});
	}
	else
	{
		alert("Enter status first.");
	}

});


$('#btnSave').click(function() {
	addEmployee();
});
$('#addCountry').click(function() {
	addCountry();
});
$('#updateCountry').click(function() {
	updateCountry();
});


//delete
$('#deleteCountryById').click(function() {
	var cid = $("#ciddelete").val();
	if(cid != null && cid != "")
	{
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/deleteCountryById/'+cid,
		dataType: "json",
		data: formToJSONCountryUpdate(),
	}).then(
			function(data) {			
				if(data != "" && data != null)
				alert("Country deleted."+data["cid"]);
						
			});
	}
	else
		{
			alert("Enter cid for delete.");
		}
});
$('#deleteCountryByName').click(function() {
	var cname = $("#cnamedelete").val();
	if(cname != null && cname != "")
	{
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/deleteCountryByName/'+cname,
		dataType: "json",
		data: formToJSONCountryUpdate(),
	}).then(
			function(data) {			
				if(data != "" && data != null)
				alert("Country deleted."+data["cname"]);
						
			});
	}
	else
		{
		alert("Enter cname for delete.")
		}
});
$('#deleteEmployeeById').click(function() {
	var id=$("#eiddelete").val();
	if(id != null && id != "")
		{
	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/deleteemployee/'+id,
		dataType: "json",
		data: formToJSONCountryUpdate(),
	}).then(
			function(data) {			
				if(data != "" && data != null)
				alert("Employee Deleted:"+data["id"]);
						
			});
		}
	else
		{
			alert("Enter eid for delete.");
		}
});

});
function updateCountry() {
	var cid = $("#cid").val();
	
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/updatecountryname',
		dataType: "json",
		data: formToJSONCountryUpdate(),
	}).then(
			function(data) {			
				if(data != "" && data != null)
				alert("Country updated:"+data["cname"]);
						
			});
}
function addCountry() {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/addcountry',
		dataType: "json",
		data: formToJSONCountry(),
	});
}

function addEmployee() {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://localhost:9090/api/v1/addemployee',
		dataType: "json",
		data: formToJSON(),
	});
}


//Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	return JSON.stringify({
		"name": $('#name').val(), 
		"phoneno": $('#phoneno').val(), 
		"department": $('#department').val(), 
		"createddtm": $('#createddtm').val(), 
		"createdby": $('#createdby').val(), 
		"updateddtm": $('#updateddtm').val(), 
		"updatedby": $('#updatedby').val(), 
		"status": $('#status').val(),
		
		});
}
function formToJSONCountry() {
	return JSON.stringify({
		"cname": $('#cname').val(), 
		});
}
function formToJSONCountryUpdate() {
	return JSON.stringify({
		"cid": $('#cid').val(), 
		"cname": $('#cname').val(), 
		});
}
