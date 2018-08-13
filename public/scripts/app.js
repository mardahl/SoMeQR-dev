(function() {
  'use strict';
  
	document.addEventListener("DOMContentLoaded", function(){
	$('.preloader-background').delay(1700).fadeOut('slow');

	$('.preloader-wrapper')
		.delay(1700)
		.fadeOut();
	});

  //getting window size for calculating the size og the QR Code Canvas
  let size = (window.innerWidth * 0.50)
  
  window.onload = function() {
    let content = localStorage.getItem("qrCodeMessage") || 'https://twitter.com/intent/follow?screen_name=michael_mardahl';
    //$('#qrCodeMessage').val(content);
    $('#qrcode').qrcode({width: size, height: size, text: content});
  }

   $('#buttonGenerate').click(() => {
	 console.log('click');
	 let message = $('#qrCodeMessage').val();
	 localStorage.setItem("qrCodeMessage", message);
	 $('#qrcode').html('');
	 $('#qrcode').qrcode({width: size, height: size, text: message});
   });

//registering serviceworker for PWA
// ServiceWorker is a progressive technology. Ignore unsupported browsers
	if ('serviceWorker' in navigator) {
	  console.log('CLIENT: service worker registration in progress.');
	  navigator.serviceWorker.register('/service-worker.js').then(function() {
		console.log('CLIENT: service worker registration complete.');
	  }, function() {
		console.log('CLIENT: service worker registration failure.');
	  });
	} else {
	  console.log('CLIENT: service worker is not supported.');
	}
})();