var allowedDomains = ["www.v2kcomputers.com", "form.v2kcomputers.com", "yp.yojnaportal.com", "yojnaportal.com", "yojnaportals.com", "tools.v2kcomputers.com"];
if (window !== window.top) {
  var referrer = document.referrer;
  var referrerDomain = new URL(referrer).hostname;

  if (!allowedDomains.includes(referrerDomain)) {
    window.top.location = "tools.v2kcomputers.com/";
  }
}