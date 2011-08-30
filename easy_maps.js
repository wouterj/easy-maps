/*
 * EASY MAPS
 * A simple libary for a nice google maps
 * on your one page.
 *
 * @name 	: Easy Maps
 * @for		: Google Maps API V3
 * @version	: 1.1
 * @author	: Wouter J
 * @use		: JavaScript
 */
// Let's create a workaround
(function(window,document,undefined) {

	/*
	 * @name	: extend
	 * @type	: Function
	 * @visibility	: private
	 * @use		: For extending 2 arrays
	 * @parameters	: OBJECT arrayOne
	 * 		  OBJECT arrayTwo
	 */
	var extend = function( aOne, aTwo ) {
		if( arguments.length != 2 ) 
			return false;

		for( i in aTwo ) {
			if( !aOne[i] ) {
				aOne[i] = aTwo[i];
			}
		}

		return aOne;
	};

	/*
	 * @name	: Position
	 * @type	: Object
	 * @visibility	: public
	 * @use		: For creating a co�rdinate
	 * @parameters	: OBJECT ll  ||  STRING place
	 */
	var position = function() {
		var args = arguments,
		    len = args.length;

		if( len < 1 ) 
			return false;
		
		if( len == 1 && typeof args[0] == 'string' ) {
			return new google.maps.LatLng(args[0]);
		}

		if( len == 2 && typeof args[0] == 'number' && typeof args[1] == 'number' ) {
			return new google.maps.LatLng(args[0], args[1]);
		}
		return false;
	};

	/*
	 * @name	: Map
	 * @type	: Object
	 * @visibility	: public
	 * @use		: For creating a new google map
	 * @parameters	: DOM elem
	 * 		  OBJECT options
	 * @TODO	: Elem dom check
	 */
	var map = function( elem, options ) {
		if( arguments.length < 1 ) 
			return false;

		var defaults = {
			zoom : 1,
			center : new google.maps.LatLng(0,0),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		if( options !== undefined ) {
			options = extend( options, defaults );
		}
		else {
			options = defaults;
		}

		this.maps = new google.maps.Map(elem, options);

		/*
		 * @name	: map.addMarker
		 * @type	: Function
		 * @visibility	: public
		 * @use		: To add a marker to a map
		 * @parameters	: MARKER marker
		 */
		this.addMarker = function( marker ) {
			marker.setMap(this.maps);
		};

		/*
		 * @name	: map.addMarkers
		 * @type	: Function
		 * @visibility	: public
		 * @use		: To add multiply markers to a map
		 * @parameters	: ojbect markers || MARKER marker, [MARKER marker], [...]
		 */
		this.addMarkers = function() {
			var args = arguments,
			    markers = [];
			if( args.length < 1 ) {
				return false;
			}
			else if( args.length == 1 && args[0][1] === 'undefined' ) {
				markers.push(args[0]);
			}
			else if( args.length == 1 ) {
				for( i in args[0] ) {
					markers.push(args[0][i]);
				}
			}
			else if( args.length > 1 ) {
				for( i in args ) {
					markers.push(args[i]);
				}
			}
			else {
				return false;
			}

			for( var x=0;x < markers.length; x++ ) {
				this.addMarker(markers[x]);
			}
		};

		/*
		 * @name	: map.fitMarkers
		 * @type	: Function
		 * @visibility	: public
		 * @use		: To fit the markers in a map
		 * @parameters	: MARKER marker
		 * 		  [MARKER marker]
		 * 		  [...]
		 */
		this.fitMarkers = function() {
			var args = arguments,
			    bounds = new google.maps.LatLngBounds(),
			    len;
			if( args.length < 1 ) {
				return false;
			}
			else {
				len = args.length;
			}

			for( var i=0;i < len; i++ ) {
				var marker = args[i];
				bounds.extend(marker.getPosition());
			}

			this.maps.fitBounds(bounds);
		};

	};


	/*
	 * @name	: Marker
	 * @type	: Object
	 * @visibility	: public
	 * @use		: For creating a marker
	 * @parameters	: OBJECT options
	 */
	var marker = function( options ) {
		if( arguments.length != 1 || typeof options !== 'object' ) 
			return false;

		var defaults = {
			position : position(0,0)
		};

		var options = extend(options, defaults);

		this.marker = new google.maps.Marker(options);

		return this.marker;
	};

	// Every object should work in the normal workaround
	window.Position = position;
	     window.Map = map;
	  window.Marker	= marker;

})(window, document);
