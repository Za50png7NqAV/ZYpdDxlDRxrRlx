var allowedDomains = [
    "www.v2kcomputers.com",
    "form.v2kcomputers.com",
    "yp.yojnaportal.com",
    "yojnaportal.com",
    "yojnaportals.com",
    "tools.v2kcomputers.com"
];

try {
    var referrer = document.referrer;
    var referrerDomain = referrer ? new URL(referrer).hostname : "";

    if (!referrerDomain || !allowedDomains.includes(referrerDomain)) {
        window.location.href = "https://tools.v2kcomputers.com/";
    }
} catch (e) {
    
    window.location.href = "https://form.v2kcomputers.com/p/akxievxkml5sevgh.html";
}