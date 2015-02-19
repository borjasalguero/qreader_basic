window.onload = function() {

  document.getElementById('close').addEventListener(
    'click',
    function() {
      window.close();
    }
  )

  // For making our app work with the library provided by LazarSoft
  // we need to do 2 steps:

  // 1) Add a callback. This will be called when the image will be
  // analyzed and the result will be ready.
  qrcode.callback = function(data) {
    if (data && data.length && data.length > 0) {
      var a = document.getElementById('text_read');
      a.textContent = data;
      a.href = data;
    } else {
      alert('Unable to read the QR Code');
    }
  }

  // 2) We need to get the "image" from the camera or given a file...
  // How to do this? This is your task :). Find a way to get image to analyze
  // and pass the data to "qrcode" library
  var activityRequest = new MozActivity({
    name: 'pick',
    data: {
      type: 'image/*'
    }
  });

  activityRequest.onsuccess = function() {
    document.getElementById('image').src = window.URL.createObjectURL(this.result.blob);
    qrcode.decode(window.URL.createObjectURL(this.result.blob));
  }


  activityRequest.onerror = function() {
    alert('ERROR con la actividad!');
    window.close();
  }
}