// Code Party - منطق الموقع (بدون مكتبات خارجية)
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const content = $("#content");
  const langList = $("#langList");
  const sidebar = $("#sidebar");

  /* ---------- storage (آمن لو المتصفح مانع التخزين) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };
  let progress = store.get("cp-progress", {}); // { python: ["hello","vars"], ... }
  let scores = store.get("cp-scores", {});     // { python: 2, ... }

  const done = (id) => progress[id] || [];
  const pct = (id) => Math.round((done(id).length / TOPICS.length) * 100);

  function toggleDone(langId, topicId) {
    const list = done(langId).slice();
    const i = list.indexOf(topicId);
    if (i >= 0) list.splice(i, 1); else list.push(topicId);
    progress[langId] = list;
    store.set("cp-progress", progress);
  }

  /* ---------- helpers ---------- */
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const KW = ["abstract","as","async","await","bool","boolean","break","case","catch","char","class","const","constructor","continue","def","double","else","elif","elseif","enum","extends","false","final","float","fn","for","foreach","fun","func","function","if","impl","implements","import","in","include","init","int","interface","let","long","main","mut","new","nil","null","None","package","private","public","return","self","static","string","struct","super","switch","this","throw","true","True","False","try","type","use","using","val","var","void","when","while","yield","echo","print","println","namespace","std"];
  const TOKEN = new RegExp(
    "(\\/\\/.*|#(?!include).*|\\/\\*[\\s\\S]*?\\*\\/)" +       // 1 comments
    "|(\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*')" +        // 2 strings
    "|(\\b\\d+(?:\\.\\d+)?\\b)" +                              // 3 numbers
    "|(\\b(?:" + KW.join("|") + ")\\b)",                       // 4 keywords
    "g"
  );
  function highlight(code) {
    return esc(code).replace(TOKEN, (m, c, s, n, k) => {
        if (c) return '<span class="tk-c">' + c + "</span>";
        if (s) return '<span class="tk-s">' + s + "</span>";
        if (n) return '<span class="tk-n">' + n + "</span>";
        if (k) return '<span class="tk-k">' + k + "</span>";
        return m;
      });
  }

  /* ---------- sidebar ---------- */
  function renderSidebar(active, filter = "") {
    const q = filter.trim().toLowerCase();
    const onPlay = /^#\/play/.test(location.hash);
    langList.innerHTML = '<a class="lang-link play-side' + (onPlay ? " active" : "") + '" href="#/play/python">💻 جرّب الكود</a>' + LANGS
      .filter((l) => !q || l.name.toLowerCase().includes(q) || l.id.includes(q))
      .map((l) =>
        '<a class="lang-link' + (l.id === active ? " active" : "") + '" href="#/lang/' + l.id + '">' +
        '<span class="dot" style="background:' + l.color + '"></span>' + l.name +
        '<span class="pct">' + pct(l.id) + "%</span></a>"
      ).join("") || '<p class="muted">مفيش نتائج</p>';
  }

  /* ---------- views ---------- */
  function renderHome() {
    document.title = "Code Party | تعلم البرمجة بـ ١٢ لغة";
    const total = LANGS.reduce((a, l) => a + done(l.id).length, 0);
    const max = LANGS.length * TOPICS.length;
    content.innerHTML =
      '<section class="hero"><h1>أهلاً بيك في Code Party 🎉</h1>' +
      "<p>اتعلم البرمجة خطوة بخطوة بـ ١٢ لغة، بأمثلة جاهزة تنسخها وتجربها. اختار لغة وابدأ!</p>" +
      '<p style="margin-top:10px">تقدمك الكلي: <b>' + total + " / " + max + " درس</b></p>" +
      '<p style="margin-top:14px"><a class="btn hero-btn" href="#/play/python">💻 جرّب الكود دلوقتي</a></p></section>' +
      '<div class="grid">' +
      LANGS.map((l) =>
        '<a class="card" href="#/lang/' + l.id + '">' +
        '<span class="badge" style="background:' + l.color + '">' + l.ext + "</span>" +
        "<h3>" + l.name + "</h3><p>" + l.tagline + "</p>" +
        '<div class="bar"><i style="width:' + pct(l.id) + '%"></i></div></a>'
      ).join("") + "</div>";
    renderSidebar(null, $("#search").value);
  }

  function renderLang(id, topicId) {
    const lang = LANGS.find((l) => l.id === id);
    if (!lang) return renderHome();
    const topic = TOPICS.find((t) => t.id === topicId) || TOPICS[0];
    document.title = lang.name + " | Code Party";

    const idx = TOPICS.indexOf(topic);
    const next = TOPICS[idx + 1];
    const isDone = done(id).includes(topic.id);

    content.innerHTML =
      '<div class="lang-head"><span class="badge" style="background:' + lang.color + '">' + lang.ext + "</span>" +
      "<h1>" + lang.name + "</h1><p>" + lang.about + "</p></div>" +
      '<div class="chips">' + lang.uses.map((u) => '<span class="chip">' + u + "</span>").join("") + "</div>" +
      '<div class="bar"><i style="width:' + pct(id) + '%"></i></div>' +
      '<div class="tabs">' +
      TOPICS.map((t) =>
        '<button class="tab' + (t.id === topic.id ? " active" : "") + (done(id).includes(t.id) ? " done" : "") +
        '" data-topic="' + t.id + '">' + t.title + "</button>"
      ).join("") + "</div>" +
      '<article class="lesson"><h2>' + topic.title + "</h2><p>" + topic.text + "</p>" +
      '<div class="code-wrap"><button class="copy">نسخ</button><pre><code>' + highlight(lang.code[topic.id]) + "</code></pre></div>" +
      '<div class="run-box">للتشغيل: <code>' + esc(lang.run) + "</code> (احفظ الكود في ملف باسم <code>main" + lang.ext + "</code>)</div>" +
      '<div class="row"><button class="btn" id="doneBtn">' + (isDone ? "إلغاء علامة الإنجاز" : "تمام، خلصت الدرس ✓") + "</button>" +
      (next ? '<button class="btn ghost" id="nextBtn">الدرس التالي ←</button>' : "") + "</div></article>" +
      '<section class="lesson pg-section"><h2>جرّب بنفسك ▶</h2>' +
      "<p>عدّل على الكود واضغط شغّل (أو Ctrl + Enter) وشوف الناتج.</p><div id=\"pg-host\"></div></section>" +
      '<section class="quiz"><h2>اختبر نفسك في ' + lang.name + "</h2><div id=\"quiz\"></div></section>";

    Playground.mount($("#pg-host"), { langs: LANGS, langId: id, code: lang.code[topic.id], selectable: false });

    $(".copy").addEventListener("click", (e) => {
      const text = lang.code[topic.id];
      const ok = () => { e.target.textContent = "اتنسخ ✓"; setTimeout(() => (e.target.textContent = "نسخ"), 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, ok); else ok();
    });
    content.querySelectorAll(".tab").forEach((b) =>
      b.addEventListener("click", () => (location.hash = "#/lang/" + id + "/" + b.dataset.topic)));
    $("#doneBtn").addEventListener("click", () => { toggleDone(id, topic.id); renderLang(id, topic.id); });
    if (next) $("#nextBtn").addEventListener("click", () => (location.hash = "#/lang/" + id + "/" + next.id));

    renderQuiz(lang);
    renderSidebar(id, $("#search").value);
  }

  function renderPlay(id) {
    const lang = LANGS.find((l) => l.id === id) || LANGS[0];
    document.title = "جرّب الكود | Code Party";
    content.innerHTML =
      '<section class="hero"><h1>جرّب الكود 💻</h1>' +
      "<p>اختار لغة من القايمة، اكتب كودك أو عدّل على المثال، واضغط شغّل عشان يظهرلك الناتج.</p></section>" +
      '<section class="lesson"><div id="pg-host"></div></section>';
    Playground.mount($("#pg-host"), {
      langs: LANGS, langId: lang.id, code: lang.code.hello, selectable: true,
      onLangChange: (newId) => history.replaceState(null, "", "#/play/" + newId),
    });
    renderSidebar(null, $("#search").value);
  }

  function renderQuiz(lang) {
    const box = $("#quiz");
    let answered = 0, correct = 0;
    box.innerHTML = lang.quiz.map((q, qi) =>
      '<div class="q"><p>' + (qi + 1) + ". " + esc(q.q) + "</p>" +
      q.o.map((o, oi) => '<button class="opt" dir="auto" data-q="' + qi + '" data-o="' + oi + '">' + esc(o) + "</button>").join("") +
      "</div>"
    ).join("") + '<p id="result" class="score">' + (scores[lang.id] != null ? "أعلى نتيجة ليك: " + scores[lang.id] + " / " + lang.quiz.length : "") + "</p>";

    box.querySelectorAll(".opt").forEach((btn) => btn.addEventListener("click", () => {
      const qi = +btn.dataset.q, oi = +btn.dataset.o;
      const group = box.querySelectorAll('.opt[data-q="' + qi + '"]');
      group.forEach((g) => (g.disabled = true));
      const right = lang.quiz[qi].a;
      group[right].classList.add("ok");
      if (oi === right) correct++; else btn.classList.add("bad");
      answered++;
      if (answered === lang.quiz.length) {
        $("#result").textContent = "نتيجتك: " + correct + " / " + lang.quiz.length + (correct === lang.quiz.length ? " 🎉 ممتاز!" : "");
        if (scores[lang.id] == null || correct > scores[lang.id]) {
          scores[lang.id] = correct; store.set("cp-scores", scores);
        }
      }
    }));
  }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "lang" && parts[1]) renderLang(parts[1], parts[2]);
    else if (parts[0] === "play") renderPlay(parts[1]);
    else renderHome();
    sidebar.classList.remove("open");
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);

  /* ---------- UI wiring ---------- */
  $("#search").addEventListener("input", (e) => {
    const m = location.hash.match(/#\/lang\/([^/]+)/);
    renderSidebar(m ? m[1] : null, e.target.value);
  });
  $("#menuBtn").addEventListener("click", () => sidebar.classList.toggle("open"));

  const root = document.documentElement;
  const savedTheme = store.get("cp-theme", null) ||
    (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = savedTheme;
  $("#themeBtn").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("cp-theme", root.dataset.theme);
  });

  route();
})();
