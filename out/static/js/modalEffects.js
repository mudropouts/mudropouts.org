/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 
var autoOpenModal;
var ModalEffects = (function() {

	function init() {
		
		var overlay = $( '.md-overlay' );
		
		$( '.md-trigger' ).each( function(i,el) {
			
			var modal = $( '#' + $(el).attr( 'data-modal' ) );
			var close = $( '.md-close',modal);
			
			function removeModal( hasPerspective ) {
				$(modal).removeClass('md-show')

				if( hasPerspective ) {
					$(document).removeClass('md-perspective');
				}
			}
			
			function removeModalHandler() {
				removeModal( $(el).hasClass('md-setperspective') ); 
			}
			
			$(el).click(function(ev) {

				$(modal).addClass('md-show');
				overlay.unbind("click", removeModalHandler);
				overlay.click(removeModalHandler);
				
				if( $(el).hasClass('md-setperspective') ) {
					setTimeout( function() {
						$(document).addClass('md-perspective');
					}, 25 );
				}
			});
			
			$(close).click(function(ev){
				ev.preventDefault();
				removeModalHandler();
			});
			
			autoOpenModal = function(modal_id){
				
				var modal = $( '#' + modal_id);
				
				$(modal).addClass('md-show');
				overlay.unbind("click", removeModalHandler);
				overlay.click(removeModalHandler);
				
				$(".md-close",modal).click(function(e) {
					$(modal).removeClass('md-show');
                });
			}
		});

	}

	init();
	
})();