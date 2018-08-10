(function() {
  'use strict';

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


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();