// Share buttons: Mastodon (asks for the reader's instance) and copy-link.
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-share]");
  if (!btn) return;
  if (btn.dataset.share === "mastodon") {
    var saved = "";
    try { saved = localStorage.getItem("mastodon-instance") || ""; } catch (_) {}
    var host = window.prompt("Your Mastodon instance (e.g. mastodon.social)", saved || "mastodon.social");
    if (!host) return;
    host = host.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    try { localStorage.setItem("mastodon-instance", host); } catch (_) {}
    window.open("https://" + host + "/share?text=" + encodeURIComponent(btn.dataset.text), "_blank", "noopener");
  } else if (btn.dataset.share === "copy") {
    var label = btn.textContent;
    var done = function (msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = label; }, 1500); };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(btn.dataset.url).then(function () { done("Copied!"); }, function () { done("Copy failed"); });
    } else {
      window.prompt("Copy this link:", btn.dataset.url);
    }
  }
});
