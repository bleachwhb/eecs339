/* jshint strict: false */
/* global $: false, google: false */
//
// Red, White, and Blue JavaScript 
// for EECS 339 Project A at Northwestern University
//
// Originally by Peter Dinda
// Sanitized and improved by Ben Rothman
//
//
// Global state
//
// html    - the document itself ($. or $(document).)
// map     - the map object
// usermark- marks the user's position on the map
// markers - list of markers on the current map (not including the user position)
//
//

//
// When the document has finished loading, the browser
// will invoke the function supplied here.  This
// is an anonymous function that simply requests that the 
// brower determine the current position, and when it's
// done, call the "Start" function  (which is at the end
// of this file)
// 
//
$(document).ready(function() {
	navigator.geolocation.getCurrentPosition(Start);
});

// Global variables
var map, usermark, markers = [],

// UpdateMapById draws markers of a given category (id)
// onto the map using the data for that id stashed within 
// the document.
UpdateMapById = function(id, tag) {
// the document division that contains our data is #committees 
// if id=committees, and so on..
// We previously placed the data into that division as a string where
// each line is a separate data item (e.g., a committee) and
// tabs within a line separate fields (e.g., committee name, committee id, etc)
// 
// first, we slice the string into an array of strings, one per 
// line / data item
	var rows  = $("#"+id).html().split("\n");

// then, for each line / data item
	for (var i=0; i<rows.length; i++) {
// we slice it into tab-delimited chunks (the fields)
		var cols = rows[i].split("\t"),
// grab specific fields like lat and long
			lat = cols[0],
			long = cols[1];

// then add them to the map.   Here the "new google.maps.Marker"
// creates the marker and adds it to the map at the lat/long position
// and "markers.push" adds it to our list of markers so we can
// delete it later 
		 
		markers.push(new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(lat,long),
			title: tag+"\n"+cols.join("\n")
			}));
			

	}
},

//
// ClearMarkers just removes the existing data markers from
// the map and from the list of markers.
//
ClearMarkers = function() {
	// clear the markers
	while (markers.length>0) {
		markers.pop().setMap(null);
	}
},

//
// UpdateMap takes data sitting in the hidden data division of 
// the document and it draws it appropriately on the map
//
UpdateMap = function() {
// We're consuming the data, so we'll reset the "color"
// division to white and to indicate that we are updating
	var color = $("#color");
	color.css("background-color", "white")
		.html("<b><blink>Updating Display...</blink></b>");
        var colorc1=$("#newidc1");
        var colorc2=$("#newidc2");
        var colori1=$("#newidi1");
        var colori2=$("#newidi2");
        var coloro1=$("#newido1");
        var coloro2=$("#newido2");
        var coloro3=$("#newido3");

        colorc1.css("background-color","red");
        
       
        colorc2.css("background-color","blue");
        
       
        colori1.css("background-color","red");
        
      
        colori2.css("background-color","blue");


        coloro1.css("background-color","red");


        coloro2.css("background-color","white");


        coloro3.css("background-color","blue");

   
// Remove any existing data markers from the map
	ClearMarkers();

// Then we'll draw any new markers onto the map, by category
// Note that there additional categories here that are 
// commented out...  Those might help with the project...
//      
	 var checkpoint=document.getElementsByName("datachoice");
	 if(checkpoint[0].checked)
		UpdateMapById("committee_data","COMMITTEE");
	 if(checkpoint[1].checked)
        	UpdateMapById("candidate_data","CANDIDATE");
	 if(checkpoint[2].checked)
		UpdateMapById("individual_data", "INDIVIDUAL");
	 if(checkpoint[3]!=null&&checkpoint[3].checked)
		UpdateMapById("opinion_data","OPINION");

// When we're done with the map update, we mark the color division as
// Ready.
	color.html("Ready");

// The hand-out code doesn't actually set the color according to the data
// (that's the student's job), so we'll just assign it a random color for now
	if (Math.random()>0.5) {
		color.css("background-color", "blue");
	} else {
		color.css("background-color", "red");
	}

},

//
// NewData is called by the browser after any request
// for data we have initiated completes
//
NewData = function(data) {
// All it does is copy the data that came back from the server
// into the data division of the document.   This is a hidden 
// division we use to cache it locally
	$("#data").html(data);
         $newidc1=$("#newidc1");
         $newidc2=$("#newidc2");
         $newidi1=$("#newidi1");
         $newidi2=$("#newidi2");
         $newido1=$("#newido1");
         $newido2=$("#newido2");
         $newido3=$("#newido3");
    var datach=document.getElementsByName("datachoice");


        if($newidc1.length)
        {
          $newidc1.remove();
        }
        if($newidc2.length)
        {
          $newidc2.remove();
        }
       if($newidi1.length)
        {
          $newidi1.remove();
        }
        if($newidi2.length)
        {
          $newidi2.remove();
        }


        if($newido1.length)
        {
          $newido1.remove();
        }
        if($newido2.length)
        {
          $newido2.remove();
        }
        if($newido3.length)
        {
          $newido3.remove();
        }


	if($("#colorc1").length)
	   {
	    $newidc1=$("#colorc1").clone().attr('id','newidc1');
	   $("#data").before($newidc1);
            }
         if($("#colorc2").length)
	    {
              $newidc2=$("#colorc2").clone().attr('id','newidc2');
	      $("#data").before($newidc2);
            }   
          if($("#colori1").length)
	    {
             $newidi1=$("#colori1").clone().attr('id','newidi1');
	     $("#data").before($newidi1); 

	     }
     
	if($("#colori2").length)
	    {
            $newidc1=$("#colori2").clone().attr('id','newidi2');
	    $("#data").before($newidi2);  
	    }


      	if($("#coloro1").length)
	    {
            $newido1=$("#coloro1").clone().attr('id','newido1');
	    $("#data").before($newido1);  
	    }
     	if($("#coloro2").length)
	    {
            $newido2=$("#coloro2").clone().attr('id','newido2');
	    $("#data").before($newido2);  
	    }
        if($("#coloro3").length)
	    {
            $newido3=$("#coloro3").clone().attr('id','newido3');
	    $("#data").before($newido3);  
	    }


            
// Now that the new data is in the document, we use it to
// update the map
	UpdateMap();
},

//
// The Google Map calls us back at ViewShift when some aspect
// of the map changes (for example its bounds, zoom, etc)
//
ViewShift = function() {
// We determine the new bounds of the map
	var bounds = map.getBounds(),
		ne = bounds.getNorthEast(),
		sw = bounds.getSouthWest();

// Now we need to update our data based on those bounds
// first step is to mark the color division as white and to say "Querying"
	$("#color").css("background-color","white")
		.html("<b><blink>Querying...("+ne.lat()+","+ne.lng()+") to ("+sw.lat()+","+sw.lng()+")</blink></b>");

// Now we make a web request.   Here we are invoking rwb.pl on the 
// server, passing it the act, latne, etc, parameters for the current
// map info, requested data, etc.
// the browser will also automatically send back the cookie so we keep
// any authentication state
// 
// This *initiates* the request back to the server.  When it is done,
// the browser will call us back at the function NewData (given above)
	$.get("rwb.pl",
		{
			act:	"near",
			latne:	ne.lat(),
			longne:	ne.lng(),
			latsw:	sw.lat(),
			longsw:	sw.lng(),
			format:	"raw",
			// cycle:  "1121",
			what:	getdata(),
		        cycle:  getcycle(),
		}, NewData);
},


//
// If the browser determines the current location has changed, it 
// will call us back via this function, giving us the new location
//
Reposition = function(pos) {
// We parse the new location into latitude and longitude
	var lat = pos.coords.latitude,
		long = pos.coords.longitude;
       	document.cookie = "Lat=" + lat;
	document.cookie = "Long=" + long; 
// ... and scroll the map to be centered at that position
// this should trigger the map to call us back at ViewShift()
	map.setCenter(new google.maps.LatLng(lat,long));
// ... and set our user's marker on the map to the new position
	usermark.setPosition(new google.maps.LatLng(lat,long));
},


//
// The start function is called back once the document has 
// been loaded and the browser has determined the current location
//
Start = function(location) {
// Parse the current location into latitude and longitude        
	var lat = location.coords.latitude,
	    long = location.coords.longitude,
	    acc = location.coords.accuracy,
// Get a pointer to the "map" division of the document
// We will put a google map into that division
	    mapc = $("#map");

// Create a new google map centered at the current location
// and place it into the map division of the document
	map = new google.maps.Map(mapc[0],
		{
			zoom: 16,
			center: new google.maps.LatLng(lat,long),
			mapTypeId: google.maps.MapTypeId.HYBRID
		});

// create a marker for the user's location and place it on the map
	usermark = new google.maps.Marker({ map:map,
		position: new google.maps.LatLng(lat,long),
		title: "You are here"});

// clear list of markers we added to map (none yet)
// these markers are committees, candidates, etc
	markers = [];
	document.cookie = "Lat=" + lat;
	document.cookie = "Long=" + long;
// set the color for "color" division of the document to white
// And change it to read "waiting for first position"
	$("#color").css("background-color", "white")
		.html("<b><blink>Waiting for first position</blink></b>");

//
// These lines register callbacks.   If the user scrolls the map, 
// zooms the map, etc, then our function "ViewShift" (defined above
// will be called after the map is redrawn
//
	google.maps.event.addListener(map,"bounds_changed",ViewShift);
	google.maps.event.addListener(map,"center_changed",ViewShift);
	google.maps.event.addListener(map,"zoom_changed",ViewShift);

//
// Finally, tell the browser that if the current location changes, it
// should call back to our "Reposition" function (defined above)
//
	navigator.geolocation.watchPosition(Reposition);
};

function getdata()
{
    var datach=document.getElementsByName("datachoice");
    var data="";
    var i=0;
      for(i=0;i<datach.length;i++)
    	{
	    if(datach[i].checked)
	    	{
    		    data=data+datach[i].value+",";
		}
    	}
      if(data.length==0)
	  {
	  data=undefined;
          return data;
	  }
    return data.substring(0,data.length-1);

}

function getcycle()
{
    var cycll=document.getElementsByName("cyclechoice");
    var choice="";
    var i=0;
    for(i=0;i<cycll.length;i++)
	{
	    if(cycll[i].checked)
		{
		    choice=choice+"'"+cycll[i].value+"',";
                }
        }
    if(choice.length==0)
	{
	choice=undefined;
 	return choice;
        }
    return choice.substring(0,choice.length-1);
}
