// Code Party - ملعب تشغيل الأكواد (Playground)
// - JavaScript / TypeScript: بيشتغلوا في المتصفح جوه Web Worker
// - Python: بيشتغل في المتصفح عن طريق Pyodide (WebAssembly)
// - باقي اللغات: بتتبعت لسيرفر Judge0 CE العام وبترجع الناتج
(function () {
  "use strict";

  const JUDGE0 = "https://ce.judge0.com";
  const JUDGE0_IDS = { java: 91, c: 103, cpp: 105, csharp: 51, go: 107, rust: 108, php: 98, kotlin: 111, swift: 83 };
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
  const TS_URL = "https://cdn.jsdelivr.net/npm/typescript@5.6.2/lib/typescript.js";
  const TIMEOUT_MS = 5000;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- تحميل مكتبات خارجية عند الحاجة فقط ---------- */
  const scripts = {};
  function loadScript(src) {
    if (!scripts[src]) {
      scripts[src] = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = () => { delete scripts[src]; reject(new Error("فشل تحميل المكتبة، اتأكد من الإنترنت وجرب تاني.")); };
        document.head.appendChild(s);
      });
    }
    return scripts[src];
  }

  /* ---------- JavaScript (Web Worker) ---------- */
  const WORKER_SRC = [
    "self.onmessage = function (e) {",
    "  var out = [];",
    "  function fmt(a) {",
    "    return a.map(function (x) {",
    "      if (typeof x === 'string') return x;",
    "      try { return (typeof x === 'object' && x !== null) ? JSON.stringify(x) : String(x); } catch (err) { return String(x); }",
    "    }).join(' ');",
    "  }",
    "  function log() { out.push(fmt([].slice.call(arguments))); }",
    "  var fake = { log: log, error: log, warn: log, info: log, debug: log };",
    "  var err = null;",
    "  try { new Function('console', e.data)(fake); } catch (ex) { err = String(ex && ex.stack ? ex.stack : ex); }",
    "  self.postMessage({ out: out.join('\\n'), err: err });",
    "};",
  ].join("\n");

  function runJS(code) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      const w = new Worker(url);
      const timer = setTimeout(() => {
        w.terminate(); URL.revokeObjectURL(url);
        resolve({ out: "", err: "الوقت خلص (٥ ثواني). غالباً فيه حلقة لا نهائية." });
      }, TIMEOUT_MS);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); URL.revokeObjectURL(url); resolve(e.data); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); URL.revokeObjectURL(url); resolve({ out: "", err: e.message || "خطأ غير معروف" }); };
      w.postMessage(code);
    });
  }

  async function runTS(code) {
    await loadScript(TS_URL);
    const js = window.ts.transpileModule(code, { compilerOptions: { target: "ES2020" } }).outputText;
    return runJS(js);
  }

  /* ---------- Python (Pyodide) ---------- */
  let pyodideP = null;
  function getPyodide() {
    if (!pyodideP) {
      pyodideP = loadScript(PYODIDE_URL).then(() => window.loadPyodide()).catch((e) => { pyodideP = null; throw e; });
    }
    return pyodideP;
  }

  async function runPython(code, stdin) {
    const py = await getPyodide();
    let out = "";
    const lines = (stdin || "").split("\n");
    py.setStdout({ batched: (s) => { out += s + "\n"; } });
    py.setStderr({ batched: (s) => { out += s + "\n"; } });
    py.setStdin({ stdin: () => (lines.length ? lines.shift() : undefined) });
    const globals = py.globals.get("dict")();
    try {
      await py.runPythonAsync(code, { globals });
      return { out: out.replace(/\n$/, ""), err: null };
    } catch (ex) {
      return { out: out.replace(/\n$/, ""), err: String(ex.message || ex) };
    } finally {
      globals.destroy();
    }
  }

  /* ---------- باقي اللغات (Judge0) ---------- */
  function b64e(s) {
    const bytes = new TextEncoder().encode(s);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin);
  }
  function b64d(s) {
    if (!s) return "";
    const bin = atob(s.replace(/\s/g, ""));
    return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  }

  async function runRemote(langId, code, stdin) {
    let res;
    try {
      res = await fetch(JUDGE0 + "/submissions?base64_encoded=true&fields=token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_code: b64e(code), language_id: JUDGE0_IDS[langId], stdin: b64e(stdin || "") }),
      });
    } catch (e) {
      throw new Error("مقدرتش أوصل لسيرفر التشغيل. اتأكد من الإنترنت أو جرب بعد شوية.");
    }
    if (!res.ok) {
      throw new Error(res.status === 429
        ? "الطلبات كتير على السيرفر المجاني. استنى شوية وجرب تاني."
        : "سيرفر التشغيل رجّع خطأ (" + res.status + "). جرب بعد شوية.");
    }
    const { token } = await res.json();

    for (let i = 0; i < 30; i++) {
      await sleep(i === 0 ? 700 : 1000);
      const g = await fetch(JUDGE0 + "/submissions/" + token +
        "?base64_encoded=true&fields=stdout,stderr,compile_output,message,status,time");
      if (!g.ok) continue;
      const d = await g.json();
      if (d.status && d.status.id >= 3) {
        const out = b64d(d.stdout);
        const parts = [];
        if (d.compile_output) parts.push("خطأ في الترجمة:\n" + b64d(d.compile_output));
        if (d.stderr) parts.push(b64d(d.stderr));
        if (d.message) parts.push(b64d(d.message));
        if (d.status.id !== 3 && !parts.length) parts.push(d.status.description);
        return { out: out.replace(/\n$/, ""), err: parts.length ? parts.join("\n").trim() : null, time: d.time };
      }
    }
    throw new Error("السيرفر اتأخر في الرد. جرب تاني.");
  }

  /* ---------- نقطة التشغيل الموحدة ---------- */
  function run(langId, code, stdin) {
    if (langId === "javascript") return runJS(code);
    if (langId === "typescript") return runTS(code);
    if (langId === "python") return runPython(code, stdin);
    return runRemote(langId, code, stdin);
  }

  function noteFor(langId) {
    if (langId === "javascript") return "بيشتغل جوه المتصفح بتاعك. مفيش حاجة بتتبعت لأي سيرفر.";
    if (langId === "typescript") return "بيتحول لـ JavaScript ويشتغل في المتصفح (أول مرة بيحمل مكتبة TypeScript). بيشيل الأنواع بس ومبيفحصهاش.";
    if (langId === "python") return "بيشتغل جوه المتصفح بـ Pyodide. أول تشغيل بيحمل حوالي ١٠ ميجا فاستنى شوية.";
    return "الكود بيتبعت لسيرفر Judge0 العام (مجاني ومحدود)، فممكن يتأخر أو يرفض لو الطلبات كتير.";
  }

  /* ---------- الواجهة ---------- */
  // opts: { langs, langId, code, selectable, onLangChange }
  function mount(host, opts) {
    const langs = opts.langs;
    let langId = opts.langId;
    const find = (id) => langs.find((l) => l.id === id);

    host.innerHTML =
      '<div class="pg">' +
      (opts.selectable
        ? '<label class="pg-pick">اختار اللغة: <select class="pg-select" aria-label="اللغة">' +
          langs.map((l) => '<option value="' + l.id + '">' + l.name + "</option>").join("") +
          "</select></label>"
        : "") +
      '<textarea class="pg-editor" dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="محرر الكود"></textarea>' +
      '<details class="pg-stdin"><summary>إدخال للبرنامج (اختياري)</summary>' +
      '<textarea class="pg-input" dir="ltr" spellcheck="false" placeholder="لو برنامجك بيقرأ إدخال، اكتبه هنا (سطر لكل قيمة)"></textarea></details>' +
      '<div class="row"><button class="btn pg-run">▶ شغّل</button>' +
      '<button class="btn ghost pg-reset">↺ رجّع الكود الأصلي</button></div>' +
      '<pre class="pg-out" dir="ltr" aria-live="polite">الناتج هيظهر هنا...</pre>' +
      '<p class="pg-note"></p></div>';

    const $ = (s) => host.querySelector(s);
    const editor = $(".pg-editor"), input = $(".pg-input"), out = $(".pg-out");
    const runBtn = $(".pg-run"), note = $(".pg-note"), select = $(".pg-select");
    let original = opts.code;

    function setLang(id) {
      langId = id;
      note.textContent = noteFor(id);
    }
    editor.value = original;
    setLang(langId);
    if (select) select.value = langId;

    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = editor.selectionStart, t = editor.selectionEnd;
        editor.value = editor.value.slice(0, s) + "    " + editor.value.slice(t);
        editor.selectionStart = editor.selectionEnd = s + 4;
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        doRun();
      }
    });

    $(".pg-reset").addEventListener("click", () => { editor.value = original; });

    if (select) {
      select.addEventListener("change", () => {
        if (editor.value !== original && !confirm("تغيير اللغة هيمسح الكود اللي كتبته. تكمل؟")) {
          select.value = langId;
          return;
        }
        const l = find(select.value);
        original = l.code.hello;
        editor.value = original;
        out.textContent = "الناتج هيظهر هنا...";
        out.classList.remove("err");
        setLang(l.id);
        if (opts.onLangChange) opts.onLangChange(l.id);
      });
    }

    let busy = false;
    async function doRun() {
      if (busy) return;
      busy = true;
      runBtn.disabled = true;
      runBtn.textContent = "جاري التشغيل...";
      out.classList.remove("err");
      out.textContent = langId === "python" ? "بيجهز Python... (أول مرة بتاخد وقت)" : "بيشتغل...";
      try {
        const res = await run(langId, editor.value, input.value);
        let text = res.out || "";
        if (res.err) text += (text ? "\n\n" : "") + res.err;
        out.textContent = text || "(البرنامج خلص ومطبعش حاجة)";
        out.classList.toggle("err", !!res.err);
      } catch (e) {
        out.textContent = e.message || String(e);
        out.classList.add("err");
      } finally {
        busy = false;
        runBtn.disabled = false;
        runBtn.textContent = "▶ شغّل";
      }
    }
    runBtn.addEventListener("click", doRun);
  }

  window.Playground = { mount };
})();
