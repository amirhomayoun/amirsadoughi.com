// Loads remark42 comments without inline scripts (keeps the CSP strict).
(function () {
  var el = document.getElementById("remark42");
  if (!el) return;
  var host = el.dataset.host.replace(/\/$/, "");
  var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  window.remark_config = {
    host: host,
    site_id: el.dataset.siteId,
    url: el.dataset.url,
    components: ["embed"],
    theme: dark ? "dark" : "light",
    no_footer: true
  };
  var s = document.createElement("script");
  s.src = host + "/web/embed.js";
  s.defer = true;
  document.head.appendChild(s);
})();
