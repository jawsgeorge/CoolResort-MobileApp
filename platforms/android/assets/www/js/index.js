
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
	$.ajax({
		url : "http://52.32.94.204:8080//confirmUser/"+uname,
	      dataType:"json",
	      cache: false,
	      error:function (xhr, ajaxOptions, thrownError){
		        debugger;
		                alert(xhr.statusText);
		                alert(thrownError);
		            },
		            success : function(json) {
		            	console.log(JSON.stringify(json));
			        	    $.each(json, function(key,val){
			        	    console.log("key : "+key+" ; value : "+val);
			        	       if(val ==$('#password').val() ){
			        	    	   $.mobile.changePage($('#Home'));
			        	    	   $.ajax({
			        	    			url : "http://52.32.94.204:8080//getAllDetails",
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
				        	    				        	   html +=val;
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
			        	       else
			        	    	   alert("Invalid credentials");
			        	    	} );
			        	
		            	 
		    	      }
		            
	 });
	
});
$( "#fooditems" ).click(function() {
	$.ajax({
		url : "http://52.32.94.204:8080//getCuisines",
	      dataType:"json",
	      cache: false,
	      error:function (xhr, ajaxOptions, thrownError){
		        debugger;
		                alert(xhr.statusText);
		                alert(thrownError);
		            },
		            success : function(json) {
		            	console.log(JSON.stringify(json));
			        	    $.each(json, function(key,val){
			        	    console.log("key : "+key+" ; value : "+val);
			        	    var html = '<li>' + key + ' ' + val +'<img src="/img/cusine/'+key+'.jpg"' +'>'+'</li>';
			        	    $('#foodList').append(html);
			        	    } );
			        	
		            	 
		    	      }
		            
	 });
});



$("#foodList").on("click", "a[data-id]", function() {
	 displayObject($(this).attr("data-id"));

});
//Order submission
$("#order").click(function() {
	$("#nameOfUserOrdering").val(uname);
	var formData = $("form.orderForm").serializeArray();
	console.log(JSON.stringify(formData));   
	alert ("Order for user"+ uname);
	$.ajax({
        type: "POST",
        url: "http://52.32.94.204:8080/orderCuisine",
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
function displayObject(testval) {
    //var id = $(this).attr("data-id");
    
    $.mobile.changePage($('#CuisineOrderPage'));
    $('#fname').attr("value", testval);
  
};


app.initialize();
