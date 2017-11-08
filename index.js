$(document).ready(function() {
	// standard AJAX http request 
	// fetch array containing apartment objects
	$.ajax({
		url: "https://api.myjson.com/bins/2sadq?pretty=1",
		dataType: "json",
		success: function(response) {
			// generic iterator function over arrays or objects
			// parse data and append apartment's details as link
			$.each(response.apartments, function(i, apartment) {
				var apartmentAddress = "<p class='address'>" + apartment.address + "</p>";
				var apartmentCity = apartment.city.toLowerCase().replace(" ", "-");
				var listing = "<a href='#' class='list-group-item " + apartmentCity +  " listing'> <h4 class='list-group-item-heading'>" + apartment.description + 
					" / "  + apartment.bedrooms + " BR / "  +  apartment.price + "</h4><p class='list-group-item-text'>" + apartment.neighborhood + "</p></a>";

				// Append listing for display
				// Append address for use in map	
				$(".apartments").append(listing).append(apartmentAddress);
				$(".address").css("display", "none");
			});	
		},
		
		error: function(error) {
			console.log(error);
		}
	});

	// Filter and display apartments by city
	$(".filter").click(function() {
		$(".filter").removeClass('active');
		$(this).addClass('active');

		$(".listing").show();

		var city = $(this).attr("id"); 
		if(city !== 'all') {
			$(".listing").not("." + city).css("display", "none");
		}

	});

	// Open a new window at address of selected apartment in google maps
	$(document).on("click", ".listing", function() {
		var address = $(this).next().html();
		window.open("https://www.google.com/maps/place/" + address);
	});
});



