(function () {
  // ---------- Auto-link bare URLs in post body text ----------
  function autoLinkUrls(root) {
    var urlPattern = /(https?:\/\/[^\s<>"')\]]+)/g;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var tag = node.parentNode && node.parentNode.tagName;
        if (tag === "A" || tag === "CODE" || tag === "PRE" || tag === "SCRIPT" || tag === "STYLE") {
          return NodeFilter.FILTER_REJECT;
        }
        return urlPattern.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);

    nodes.forEach(function (node) {
      urlPattern.lastIndex = 0;
      var text = node.nodeValue;
      var frag = document.createDocumentFragment();
      var lastIndex = 0;
      var match;
      while ((match = urlPattern.exec(text))) {
        if (match.index > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        var a = document.createElement("a");
        a.href = match[0];
        a.textContent = match[0];
        a.className = "auto-link";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        frag.appendChild(a);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      node.parentNode.replaceChild(frag, node);
    });
  }

  // ---------- Copy button on every code block ----------
  function addCopyButtons(root) {
    var blocks = root.querySelectorAll("pre");
    blocks.forEach(function (pre) {
      if (pre.parentNode.classList.contains("code-block")) return; // already wrapped

      var wrapper = document.createElement("div");
      wrapper.className = "code-block";
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 15V6.5C5 5.67157 5.67157 5 6.5 5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

      btn.addEventListener("click", function () {
        var code = pre.innerText;
        navigator.clipboard.writeText(code).then(function () {
          btn.classList.add("copied");
          btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          setTimeout(function () {
            btn.classList.remove("copied");
            btn.innerHTML =
              '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 15V6.5C5 5.67157 5.67157 5 6.5 5H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
          }, 1600);
        });
      });

      wrapper.appendChild(btn);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector(".post__body");
    if (body) autoLinkUrls(body);
    addCopyButtons(document);
  });
})();