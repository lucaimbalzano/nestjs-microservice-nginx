(function() {
    // Function to customize the Swagger UI
    function customizeSwaggerUI() {
      // Change the favicon
      var existingFavicon = document.querySelector("link[rel*='icon']");
      if (existingFavicon) {
        existingFavicon.href = '/favicon.ico';
      } else {
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = '/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
  
      // Hide the default Swagger logo
      var logo = document.querySelector('.swagger-ui .topbar .link');
      if (logo) {
        logo.style.display = 'none';
      }
  
      // Add your own logo
      var customLogo = document.createElement('img');
      customLogo.src = '/logo.png'; // Ensure this path is correct
      customLogo.style.height = '30px';
      customLogo.style.marginLeft = '10px'; // Adjust spacing as needed
      customLogo.alt = 'My Logo'; // For accessibility
  
      var topbar = document.querySelector('.swagger-ui .topbar');
      if (topbar && !document.getElementById('custom-logo')) {
        customLogo.id = 'custom-logo';
        topbar.appendChild(customLogo);
      }
    }
  
    // Initial customization
    window.addEventListener('load', customizeSwaggerUI);
  
    // Observe DOM changes to re-apply customization if needed
    var observer = new MutationObserver(function(mutations, obs) {
      customizeSwaggerUI();
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  