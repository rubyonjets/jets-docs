document.addEventListener('DOMContentLoaded', function() {
  var alert = document.getElementById('jets-version-alert');
  var closeButton = alert.querySelector('.close');

  if (localStorage.getItem('hideJetsVersionAlert') !== 'true') {
    alert.style.display = 'block';
  } else {
    alert.style.display = 'none';
  }

  closeButton.addEventListener('click', function() {
    alert.style.display = 'none';
    localStorage.setItem('hideJetsVersionAlert', 'true');
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    localStorage.setItem('hideJetsVersionAlertExpiration', expirationDate.toISOString());
  });

  var expirationDate = new Date(localStorage.getItem('hideJetsVersionAlertExpiration'));
  if (expirationDate < new Date()) {
    localStorage.removeItem('hideJetsVersionAlert');
    localStorage.removeItem('hideJetsVersionAlertExpiration');
  }
});
