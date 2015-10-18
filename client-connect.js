// This global needs to be declared as it is used by the actual script
GA_SHARE_URL = '//localhost:8080';

var s = document.createElement('script');
s.setAttribute('src', GA_SHARE_URL + '/client.js');
document.body.appendChild(s);
