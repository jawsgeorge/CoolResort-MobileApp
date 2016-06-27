
var app = {
		
    // Application Constructor
		
    initialize: function() {
    	console.log('Received Event: ' );
       // this.bindEvents();
    	this.getContactList();
    },
    getContactList: function(){
    	 console.log("Entering getContactList()");
    	    console.log("Exiting getContactList()");
    	   
    }
   
    
    
};

var uname;
$( "#submitforcheck" ).click(function() {
	uname=$('#uname').val();

	var formData = $("form.userLoginPage").serializeArray();
	console.log("Name details of booking"+JSON.stringify(formData));
	$.ajax({
		type: "POST",
        url: "http://localhost:8080/confirmUser",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
	      error:function (xhr, ajaxOptions, thrownError){
		        debugger;
		                alert(xhr.statusText);
		                alert(thrownError);
		            },
		            success : function(json) {
		            	console.log(JSON.stringify(json));
			        	    $.each(json, function(key,val){
			        	    console.log("key : "+key+" ; value : "+val);
			        	       if((val=='G')&&(key ==$('#password').val()) ){
			        	    	   $.mobile.changePage($('#Home'));
			        	    	   $.ajax({
			        	    			url : "http://localhost:8080//getAllDetails",
			        	    		      dataType:"json",
			        	    		      cache: false,
			        	    		      error:function (xhr, ajaxOptions, thrownError){
			        	    			        debugger;
			        	    			                alert(xhr.statusText);
			        	    			                alert(thrownError);
			        	    			            },
			        	    			            success : function(json) {
			        	    			            	console.log(JSON.stringify(json.cuisine));
			        	    			            	

			        	    			            	$.each(json.cuisine, function(index,jsonObject){
			        	    			            		var i=0;
			        	    			            		var html='<li>';
			        	    				        	    $.each(jsonObject, function(key,val){
			        	    				        	    i=i+1;
			        	    				        	    if(key=='name')
			        	    				        	    	{
			        	    				        	    	html+= '<a href="#" data-id="'+ val +'" >'+val+'</a>';
				        	    				        	  
				        	    				        	  
			        	    				        	    	}
			        	    				        	    else if(key=='description')
			        	    				        	    	{
			        	    				        	    	html +=val;
			        	    				        	    	}
			        	    				        	    if(key=='name')
			        	    				        	    	{
			        	    				        	    	html+='<img src="/img/cusine/'+val+'.jpg"' +'>'
			        	    				        	    	}
			        	    				        	    	if(i==3)
			        	    				        	    		{
			        	    				        	    		html+='</li>';
			        	    				        	    		console.log("html ---> "+html);
			        	    				        	    		$('#foodList').append(html);
			        	    				        	    		}
			        	    				        	    
			        	    				        	    } );
			        	    			            	});
			        	    			            	var obj = $('#foodList');
			        	    			            	var str = $('#foodList').prop('outerHTML');
			        	    			            	console.log("html str ---> "+str);
			        	    			            	//console.log("html alertText ---> "+alertText);
			        	    			            	console.log("html whole ---> "+obj);
			        	    			            	$.each(json.games, function(index,jsonObject){
			        	    			            		var i=0;
			        	    			            		var html='<li>';
			        	    				        	    $.each(jsonObject, function(key,val){
			        	    				        	    i=i+1;
			        	    				        	    console.log("key : "+key+" ; value : "+val+ "index "+i);
			        	    				        	    
			        	    				        	    	
			        	    				        	    if(key=='names')
			        	    				        	    	{
				        	    				        	   html +='<a href="#" data-id="'+ val +'" >'+val+'</a>';;
			        	    				        	    	}
			        	    				        	    else if(key=='description')
			        	    				        	    	{
			        	    				        	    	html +=val;
			        	    				        	    	}
			        	    				        	    if(key=='names')
			        	    				        	    	{
			        	    				        	    	html+='<img src="/img/cusine/'+val+'.jpg"' +'>'
			        	    				        	    	}
			        	    				        	    	if(i==3)
			        	    				        	    		{
			        	    				        	    		html+='</li>';
			        	    				        	    		console.log("html ---> "+html);
			        	    				        	    		$('#gamesList').append(html);
			        	    				        	    		}
			        	    				        	    
			        	    				        	    } );
			        	    			            	} ) ;
			        	    			            	
			        	    			            	
			        	    			            	 
			        	    			    	      }
			        	    			            
			        	    		 });
			        	       }
							   else if((val=='A')&&(key ==$('#password').val()) ){
								   $.mobile.changePage($('#AdminHome'));
							   }
			        	       
			        	       else
			        	    	   alert("Invalid credentials");
			        	    	} );
			        	
		            	 
		    	      }
		            
	 });
	
});

$("#foodList").on("click", "a[data-id]", function() {
	 displayObject($(this).attr("data-id"));

});

$("#gamesList").on("click", "a[data-id]", function() {
	displayGames($(this).attr("data-id"));

});


//Order submission
$("#order").click(function() {
	$("#nameOfUserOrdering").val(uname);
	var formData = $("form.orderForm").serializeArray();
	console.log(JSON.stringify(formData));   
	$.ajax({
        type: "POST",
        url: "http://localhost:8080/orderCuisine",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        	console.log("Final here in js"+ JSON.stringify(response));
        	var tHead = $('table#app-status-table thead');
            
            var headRow = "<tr><th data-priority='1'>Serial No</th>";
            headRow += "<th data-priority='2'>Item Name</th>";
            headRow += "<th data-priority='3'>Ordered Date </th>";
            headRow += "<th data-priority='4'>Amount</th> </tr>";
               
            tHead.append(headRow);
            console.log("html tHead ---> "+headRow);
            var i=0;
        	$.each(response.orderInfo, function(index,jsonObject){
        		
        		 var dateValue;
         	    var amountValue;
         	    var cusineValue;
        		 i=i+1;
        	    $.each(jsonObject, function(key,val){
        	    console.log("key : "+key+" ; value : "+val+ "index "+i);
        	    if(key=='date')
        	    	{
        	    	dateValue = val;
        	    	}
        	    else if(key=='amount')
        	    	{
        	    	amountValue =val;
        	    	}
        	    if(key=='cuisineName')
        	    	{
        	    	cusineValue = val;
        	    	}
        	    } );
        	    var thedata={
        		        serialNo: i,
        		        cusineName: cusineValue,
        		        date: dateValue,
        		        amount: amountValue,
        		        };
        	    console.log("Inside the row binding" +JSON.stringify(thedata));
        		    showAppStatusData(thedata);
        	} ) ;
        	console.log("Inside the logic done");
        	$.mobile.changePage($('#application-status'));
        	$("#app-status-table").table("refresh");
        },
	    error      : function() {
	        //console.log("error"+error);
	    }
	
    });

});

$("#fetchSlotList").click(function() {
	$("#nameOfUserBooking").val(uname);
	var formData = $("form.gameBookingCheck").serializeArray();
	console.log("Name details of booking"+JSON.stringify(formData));
	var i=1;
	$.ajax({
        type: "POST",
        url: "http://localhost:8080/checkSlot",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        	console.log("response object vlue -- > "+JSON.stringify(response.slotInfo));
        	$.each(response.slotInfo, function(index,jsonObject){
        		
       		 var slotIdValue;
        	    var intervalValue;
        	    
       	    $.each(jsonObject, function(key,val){
       	    console.log("key : "+key+" ; value : "+val+ "index "+i);
       	    if(key=='slotId')
       	    	{
       	    	slotId = val;
       	    	}
       	    else if(key=='intreval')
       	    	{
       	    	intervalValue =val;
       	    	}
       	   
       	    } );
       	 $("#mySelector").append('<option value="' + slotId + '">Option ' + intervalValue + '</option>');
       	    
       	} ) ;
        	
        	$.mobile.changePage($('#gamesSlotStatus'));
        	$("#mySelector").trigger("change");
        },
	    error      : function() {
	    	alert("Phase1 struck");

	    }
	
    });

});

$("#selectSlots").click(function() {
	$("#userNameForJson").val(uname);
	var gameNameFromPreviousForm = document.getElementById("gamesName").getAttribute("value");
	$("#gameNameForJson").val(gameNameFromPreviousForm);
	var dateFromPreviousForm=document.getElementById("gamesDate").value;
	$("#bookingdateForJson").val(dateFromPreviousForm);
	var formData = $("form.gameAvailableSlot").serializeArray();
	console.log("Slot details"+JSON.stringify(formData));

	$.ajax({
		type: "POST",
        url: "http://localhost:8080/createGamesBooking",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
        	console.log("response object vlue -- > "+JSON.stringify(response.userBookedInfo));
        	var tHead = $('table#book-status-table thead');
            
            var headRow = "<tr><th data-priority='1'>Serial No</th>";
            headRow += "<th data-priority='2'>Slot Intreval</th>";
            headRow += "<th data-priority='3'>Booked Date </th>";
            headRow += "<th data-priority='4'>Booked Game</th> </tr>";
               
            tHead.append(headRow);
            console.log("html tHead ---> "+headRow);
            var i=0;
        	$.each(response.userBookedInfo, function(index,jsonObject){
        		
        		 var intreval;
         	    var gamename;
         	    var bookeddate;
        		 i=i+1;
        	    $.each(jsonObject, function(key,val){
        	    console.log("key : "+key+" ; value : "+val+ "index "+i);
        	    if(key=='slotIntreval')
        	    	{
        	    	intreval = val;
        	    	}
        	    else if(key=='gameName')
        	    	{
        	    	gamename =val;
        	    	}
        	    if(key=='bookingDate')
        	    	{
        	    	bookeddate = val;
        	    	}
        	    } );
        	    var thedata={
        		        serialNo: i,
        		        slotIntreval: intreval,
        		        bookedDateOfGame: bookeddate,
        		        gameName:gamename,
        		        };
        	    console.log("Inside the row binding" +JSON.stringify(thedata));
        		    showAppStatusDataofGame(thedata);
        	} ) ;
        	$.mobile.changePage($('#booked-status'));
        	$("#book-status-table").table("refresh");
        },
	    error      : function() {
	    	alert("Phase1 struck");
	    	//console.log("error"+error);
	    }
	});
	
});

$("#submitCuisine").click(function() {
	var formData = $("form.createCuisineDetails").serializeArray();
	console.log("Create cuisine details "+JSON.stringify(formData));
	$.ajax({
		type: "POST",
        url: "http://localhost:8080/createCuisine",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error      : function() {
	    	alert("Struck in cuisine creation");
	    },
	    success: function (response) {
	    	console.log("response object vlue -- > "+JSON.stringify(response.isCreated));
	    	 $("#createCuisineResponse").popup("open");
	    }
	});	    
});

$("#deleteCuisine").click(function() {
	var formData = $("form.deleteCuisineDetails").serializeArray();
	console.log("Delete cuisine details "+JSON.stringify(formData));
	$.ajax({
		type: "POST",
        url: "http://localhost:8080/deleteCuisine",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error      : function() {
	    	alert("Struck in cuisine deletion");
	    },
	    success: function (response) {
	    	console.log("response object vlue -- > "+JSON.stringify(response.isDeleted));
	    	 $("#deleteCuisineResponse").popup("open");
	    }
	});	    
});

$("#submitGame").click(function() {
	var formData = $("form.createGameDetails").serializeArray();
	console.log("Create cuisine details "+JSON.stringify(formData));
	$.ajax({
		type: "POST",
        url: "http://localhost:8080/createGames",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error      : function() {
	    	alert("Struck in cuisine creation");
	    },
	    success: function (response) {
	    	console.log("response object vlue -- > "+JSON.stringify(response.isCreated));
	    	$("#createGameResponse").popup("open");
	    }
	});	    
});

$("#deleteGame").click(function() {
	var formData = $("form.deleteGameDetails").serializeArray();
	console.log("Delete Game details "+JSON.stringify(formData));
	$.ajax({
		type: "POST",
        url: "http://localhost:8080/deleteGames",
        data: JSON.stringify({ classroom: formData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error      : function() {
	    	alert("Struck in cuisine deletion");
	    },
	    success: function (response) {
	    	console.log("response object vlue -- > "+JSON.stringify(response.isDeleted));
	    	$("#deleteGameResponse").popup("open");
	    }
	});	    
});

function showAppStatusData(data) {
    var pageData = data;
    var tBody = $('#app-status-table tbody');
    var theRow = "<tr><td>" + data.serialNo + "</td>";
    theRow += "<td>" + data.cusineName + "</td>";
    theRow += "<td>" + data.date + "</td>";
    theRow += "<td>" + data.amount + "</td></tr>";
    tBody.append(theRow);
	console.log("html theRow ---> "+theRow);
 }

function showAppStatusDataofGame(data) {
    var pageData = data;
    var tBody = $('#book-status-table tbody');
    var theRow = "<tr><td>" + data.serialNo + "</td>";
    theRow += "<td>" + data.slotIntreval + "</td>";
    theRow += "<td>" + data.bookedDateOfGame + "</td>";
    theRow += "<td>" + data.gameName + "</td></tr>";
    tBody.append(theRow);
	console.log("html theRow ---> "+theRow);
 }

function displayGames(testval) {
    $.mobile.changePage($('#gamesBookingPage'));
    $('#gamesName').attr("value", testval);
  
}

	      
function displayObject(testval) {
    $.mobile.changePage($('#CuisineOrderPage'));
    $('#fname').attr("value", testval);
  
};




app.initialize();
