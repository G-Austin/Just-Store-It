$(document).ready(function() {

// =====================================
// YOGI
// =====================================


 // =====================================
// YOGI
// =====================================

  $('.carousel').carousel();
  $('.materialboxed').materialbox();

// =========================
// START OF ADD VIRTUAL BOX
// =========================

$('#vboxSubmit').on('click', function(event) {

	var vbName = $('#vboxName').val().trim().toUpperCase();
	var vbPriority = $('#priority').val().trim();
	var vbCategory = $('#category').val().trim().toUpperCase();
	var vbAddress = $('#address').val().trim().toUpperCase();
	var vbitems = $('#vboxItems').val().trim().toUpperCase();

$.get('/api/all', function(data) {
//checks for blank fields or duplicate box names
	var notPresent = data.map(i => i.box_name).indexOf(vbName) == -1;
	if (vbName !== '' && vbPriority !== '' && vbCategory !== '' && vbAddress !== '' && vbitems !== '' && notPresent) {
		//Geocoder function moving over:



    var geocoder = new google.maps.Geocoder();

        // var address = document.getElementById('address').value;
        // console.log('address', address);
        // var home1 = (lat, lng);
	        geocoder.geocode({'address': vbAddress}, function(results, status) {
	            if (status === 'OK') {
	                //resultsMap.setCenter(results[0].geometry.location);
	                console.log('results', results);
	                var marker = new google.maps.Marker({
	                	// center: home1,
	                    map: map,
	                    position: results[0].geometry.location,
	                });
	                var lat = results[0].geometry.location.lat();
	                var lng = results[0].geometry.location.lng();
	                console.log('lat & long', lat, lng);
	                //
	                $.post('/api/new', {
      						box_name: vbName,
      						priority: vbPriority,
      						category: vbCategory,
      						address: vbAddress,
      						item_description: vbitems,
      						lat: lat,
      						lng: lng
      					})
      					.done(function(data) {
      						console.log('data received', data);
      					});

	            } else {
	                alert('Geocode was not successful for the following reason: ' + status);
	            }
	        });
	} else {
		alert('Missing input or virtual box already exist');
	}
});


		//Clears all inputs after submission
		$('#vboxName').val('');
		$('#priority').val('');
		$('#category').val('');
		$('#address').val('');
		$('#vboxItems').val('');

	console.log('name: ', vbName);
	console.log('priority: ', vbPriority);
	console.log('category: ', vbCategory);
	console.log('address: ', vbAddress);
	console.log('vboxItems: ', vbitems);
	console.log()
});
// =========================
// END OF ADD VIRTUAL BOX
// =========================

// =================================
// START OF BOX OPTIONS AND DISPLAY
// =================================

//This function dynamically appends the box name from the database
function getOptionItem() {
	$.get('/api/all', function(data) {
	  for (var i = 0; i < data.length; i++) {
	    var optionSection = $('<option></option>');
	    optionSection.append(data[i].box_name);
	    $('#boxSelection').append(optionSection);
	  }
	});
}

getOptionItem();

	//This function controls if there's a change in box selection
	function changeBox() {
		var optionSelected = $('#boxSelection');
		optionSelected.on('change', handleBoxSelected);
	}

	changeBox();

	function handleBoxSelected() {
	    var newBoxSelected = $('#boxSelection').val();
	   	$('#vboxBtn').show();
	   	$('#displayResults').empty();
	   	$('#carouselBox').hide();
	   	$('#addButton').hide();
	   	$('#searchSection').slideDown(2500);

	   	$.get('/api/' + newBoxSelected, function(data) {
			displayResults(data);
			})
	    	console.log(newBoxSelected);
		}

		function displayResults(data) {
			if (data.length !== 0) {

				for (var i = 0; i < data.length; i++) {

					var div = $('<div>');

					div.append('<p> • Box Name: ' + data[i].box_name + '</p>');
					div.append('<p> • Priority: ' + data[i].priority + '</p>');
					div.append('<p> • Category: ' + data[i].category + '</p>');
					div.append('<p> • Address: ' + data[i].address + '</p>');
					div.append('<p> • Items: ' + data[i].item_description + '</p>');

					$('#displayResults').append(div);

				}
			}
		}
	// =================================
	// END OF BOX OPTIONS AND DISPLAY
	// =================================

	// =============================
	// START OF UPDATE MODAL BUTTON
	// =============================

	$(document).ready(function(){
	    $('#updateModal').modal();
	    $('#updateBtn').on('click', function() {

		    var boxSelected = $('#boxSelection').val();
		    $.get('/api/' + boxSelected, function(data) {
		    	for (var i = 0; i < data.length; i++) {
					var updatePriority = $('#updatePriority').val().trim();
					var updateCategory = $('#updateCategory').val().trim().toUpperCase();
					var updateAddress = $('#updateAddress').val().trim().toUpperCase();
					var updateitems = $('#vboxUpdate').val().trim().toUpperCase();
				}

				$.post('/api/update', {
					box_name: boxSelected,
					priority: updatePriority,
					category: updateCategory,
					address: updateAddress,
					item_description: updateitems
				})
				.then(function(data) {
				});

			//Clears all inputs after submission
				$('#updateName').val('');
				$('#updatePriority').val('');
				$('#updateCategory').val('');
				$('#updateAddress').val('');
				$('#vboxUpdate').val('');

				console.log('BOX: ', boxSelected);
				console.log('priority: ', updatePriority);
				console.log('category: ', updateCategory);
				console.log('Address: ', updateAddress);
				console.log('vboxItems: ', updateitems);

				$('#updateModal').modal('close');

			});
		});
	});

	// =======================
	// END OF UPDATE BUTTON
	// =======================

	// =======================
	// START OF DELETE BUTTON
	// =======================
	$(document).ready(function(){
		$('#destroyModal').modal();
		$("#destroyBtn").click(function() {
			var boxSelected = $('#boxSelection').val();
			$.post('/api/delete', {
			  box_name: boxSelected
			})
		    .then(function(deldata) {
		      console.log(boxSelected);
		      console.log(deldata);
		      console.log("Deleted Successfully!");
		    });

			  $(this).closest("option").remove();
			  $('#destroyModal').modal('close');
		});
	});


	$('#addButton').on('click', function(event) {
		$('#carouselBox').hide();
		$('#addButton').hide();
		$('#addCard').show();

	});


}); //ready
