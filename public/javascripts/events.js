/*jslint browser: true */
/*global jQuery, Toolbox */
// This was previously placed in app/views/events/index.html.erb

  function sortListElements(list_selector, comparison_function) {
    var mylist = jQuery(list_selector);
    var listitems = mylist.children('li').get();
    listitems.sort(comparison_function);

    jQuery.each(listitems, function(idx, itm) { mylist.append(itm); });    
  }

  function sortListElementsByStartDate(list_selector) {
    sortListElements(list_selector, function(a,b) {
      var compA = Date.parse(jQuery(a).children('div.js_date').text());
      var compB = Date.parse(jQuery(b).children('div.js_date').text());
      //console.debug("a: " + compA + "b: " + compB);
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;      
    });
  }

  function domIdForEvent(this_event) {
    return 'room_' + this_event.room_id + '_event_' + this_event.id;
  }

  function makeListEntry(this_event) {
    var date =  Date.parse(this_event.start_time);

    var li = '<li id="' + domIdForEvent(this_event) +
    '" class="event" style="display: none">'+
    '<div class="js_date">'+ this_event.js_date + "</div>" +
    '<dl><dt class="title">' + 
    '<span class="start_time' + (this_event.current ? ' current' : '' )  + '">' + this_event.human_start_time + '</span>' +
    this_event.title + '</dt>' +
    '<dt class="subtitle">' + this_event.subtitle + '</dt>' +
    '<dd class="people">' + '' + '</dd>' +
    '</dl>' + "</li>";
    
    return jQuery(li);
  }

  function insertEventNotInList(list_selector, events) {
//    var ids_should_be_present = events.map(function() {
//      return this['id']
//    });
    
  //  jQuery.each( ids_should_be_present, function() {
//      if(!jQuery())
  //  })
  }
  
  
  function getEventsAndUpdateList(room_id, limit) {
    var url = "/rooms/" + room_id + "/events.json?limit=" + limit;
    //console.log("gettin: " + url);
    jQuery.getJSON(url,
              function(data) {

								
								var blackout = false;
                jQuery.each(data, function(index) {

									blackout = blackout || this.event.blackout;
									
									console.log("in event blackout: " + blackout);
									
                  var entry = makeListEntry(this.event);
                  if( jQuery('#' + domIdForEvent(this.event)).length ) {
                    jQuery('#' + domIdForEvent(this.event)).replaceWith(entry);
                    jQuery('#' + domIdForEvent(this.event)).show();
                  }
                  else {           
                    entry.appendTo("#room_" + room_id + "_events");
                    jQuery('#' + domIdForEvent(this.event)).toggle("slow");                    
                  }


                });
                var ids_from_server = jQuery.map(data, function(n,i) {
                  return domIdForEvent(n.event);
                });
                var ids_on_page = jQuery.map(jQuery("#room_" + room_id + "_events li"), function(n,i) {
                  return n.id;
                });
                                
               
                jQuery.each(ids_on_page, function(index) {
                  var inArray = false;
                  for (var i = ids_from_server.length - 1; i >= 0; i--){
                    inArray = (ids_from_server[i] == this);
                    if(inArray) {
                      break;
                    }
                  }
                  
                  
                  
                  if(!inArray) {
                    jQuery('#' + this).hide("slow");
                    //console.log("would remove: " + this);
                  }

                });

                sortListElementsByStartDate("#room_" + room_id + "_events");

								// hide everything if blackout is on
								var superwrap = jQuery("#superwrap");
								if (blackout) {
									superwrap.show();
								} else {
									superwrap.hide();									
								};
								
              });    
  }




$(function() {
    $.ajaxSetup({cache : false});
});
