/**
 * Flipbook — a self-contained, dependency-free page-curl book viewer.
 *
 *   new Flipbook(container, { pages: [...], duration: 700, sound: true })
 *
 * Vanilla TS/JS + HTML + CSS (styles injected once). Two-page spread bound at a
 * centre spine; pages rotate around the spine in 3D with a moving gloss/shadow
 * to fake the curl highlight. Click halves / arrows, drag the corner, or use
 * arrow keys to turn. Collapses to a single page on narrow screens.
 */

export type FlipbookOptions = {
  pages: string[];
  /** Page size in px (per single page). */
  width?: number;
  height?: number;
  /** Single-page aspect ratio (width / height). Defaults to A3 landscape (√2)
   *  and is auto-detected from the first page image at runtime. */
  aspect?: number;
  /** Flip duration in ms. */
  duration?: number;
  /** CSS easing for the turn. */
  easing?: string;
  /** 3D perspective in px. */
  perspective?: number;
  /** Book drop-shadow / gloss intensity (0–1). */
  shadow?: number;
  /** Page-turn sound on each flip. */
  sound?: boolean;
  /** Optional download URL — shows a download button when set. */
  downloadUrl?: string | null;
  /** Width (px) below which the book collapses to a single page. */
  breakpoint?: number;
  /** Starting page index. */
  startPage?: number;
};

const DEFAULTS = {
  // Base page height in px; page width is derived as height * aspect.
  height: 553,
  // A3 landscape (√2 ≈ 1.414). Auto-detected from the first page image.
  aspect: 1600 / 1131,
  duration: 700,
  easing: "cubic-bezier(0.4, 0.2, 0.2, 1)",
  perspective: 1500,
  shadow: 0.25,
  sound: true,
  breakpoint: 720,
  startPage: 0,
  downloadUrl: null as string | null,
};

const STYLE_ID = "flipbook-styles";

const ICONS = {
  fs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  soundOn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',
  soundOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
};

function injectStyles() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.fb-stage{position:relative;width:100%;display:flex;align-items:center;justify-content:center;background:#fcfcfc;border-radius:4px;overflow:hidden;touch-action:pan-y}
.fb-stage:fullscreen{background:#fcfcfc}
.fb-stage.fb-zoom{position:fixed;inset:0;z-index:9999;height:auto!important;max-width:none;border-radius:0;background:rgba(0,0,0,0.9);overflow:auto;cursor:zoom-out;-webkit-overflow-scrolling:touch}
.fb-stage.fb-zoom .fb-scale{margin:auto;cursor:default}
.fb-stage.fb-zoom .fb-toolbar{position:fixed;top:14px;right:14px}
.fb-stage.fb-zoom .fb-arrow.prev{position:fixed;left:14px}
.fb-stage.fb-zoom .fb-arrow.next{position:fixed;right:14px}
.fb-stage.fb-zoom .fb-count{position:fixed;left:50%;bottom:14px}
.dark .fb-stage.fb-zoom{background:rgba(0,0,0,0.92)}
.fb-scale{transform-origin:center center}
.fb-viewport{position:relative}
.fb-book{position:absolute;inset:0;transform-style:preserve-3d}
.fb-page,.fb-leaf{position:absolute;top:0;height:100%;background:#fff;background-size:contain;background-position:center;background-repeat:no-repeat}
.fb-page{box-shadow:0 0 20px 0 rgba(0,0,0,var(--fb-shadow))}
.fb-spine{position:absolute;top:0;bottom:0;width:46px;pointer-events:none;z-index:6;background:linear-gradient(to right,rgba(0,0,0,0) 0%,rgba(0,0,0,calc(var(--fb-shadow)*0.55)) 48%,rgba(0,0,0,calc(var(--fb-shadow)*0.55)) 52%,rgba(0,0,0,0) 100%)}
.fb-leaf{transform-style:preserve-3d;z-index:10;will-change:transform;backface-visibility:visible}
.fb-face{position:absolute;inset:0;backface-visibility:hidden;background-size:contain;background-position:center;background-repeat:no-repeat;background-color:#fff;box-shadow:0 0 20px 0 rgba(0,0,0,calc(var(--fb-shadow)*0.8))}
.fb-face.fb-back{transform:rotateY(180deg)}
.fb-shine{position:absolute;inset:0;pointer-events:none;opacity:0}
.fb-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:30;width:42px;height:42px;display:flex;align-items:center;justify-content:center;border:none;border-radius:999px;background:rgba(255,255,255,0.78);color:#1c1917;cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,0.15);transition:opacity .2s,background .2s;backdrop-filter:blur(4px)}
.fb-arrow svg{width:22px;height:22px}
.fb-arrow:hover{background:#fff}
.fb-arrow[disabled]{opacity:.25;cursor:default}
.fb-arrow.prev{left:10px}.fb-arrow.next{right:10px}
.fb-toolbar{position:absolute;top:10px;right:10px;z-index:40;display:flex;gap:6px}
.fb-btn{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:none;border-radius:8px;background:rgba(255,255,255,0.8);color:#1c1917;cursor:pointer;box-shadow:0 1px 5px rgba(0,0,0,0.12);transition:background .2s}
.fb-btn:hover{background:#fff}
.fb-btn svg{width:18px;height:18px}
.fb-count{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);z-index:30;font:500 11px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.12em;color:#57534e;background:rgba(255,255,255,0.8);padding:5px 10px;border-radius:999px;box-shadow:0 1px 5px rgba(0,0,0,0.1)}
.fb-grab{cursor:grab}.fb-grabbing,.fb-grabbing *{cursor:grabbing!important}
@media (prefers-reduced-motion: reduce){.fb-leaf{transition:none!important}}
`;
  document.head.appendChild(el);
}

export class Flipbook {
  private container: HTMLElement;
  private opts: typeof DEFAULTS;
  private pages: string[];
  private pageW = 0; // derived single-page width (height * aspect)
  private destroyed = false;
  private zoomed = false; // centered overlay ("fullscreen") mode

  // DOM
  private stage!: HTMLDivElement;
  private scale!: HTMLDivElement;
  private viewport!: HTMLDivElement;
  private book!: HTMLDivElement;
  private spine!: HTMLDivElement;
  private leftEl!: HTMLDivElement;
  private rightEl!: HTMLDivElement;
  private prevBtn!: HTMLButtonElement;
  private nextBtn!: HTMLButtonElement;
  private soundBtn!: HTMLButtonElement;
  private countEl!: HTMLDivElement;

  // state
  private page = 0; // index of left page (double) / current page (single)
  private cols = 2; // 1 = single, 2 = double
  private animating = false;
  private actx: AudioContext | null = null;

  // drag
  private dragging = false;
  private dragDir: 1 | -1 = 1;
  private dragLeaf: HTMLDivElement | null = null;
  private dragShine: HTMLDivElement | null = null;
  private dragStartX = 0;
  private dragProgress = 0;

  private ro?: ResizeObserver;
  private onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.zoomed) this.setZoom(false);
    else if (e.key === "ArrowRight") this.next();
    else if (e.key === "ArrowLeft") this.prev();
  };
  private onResize = () => {
    if (this.zoomed) this.layout();
  };

  constructor(container: HTMLElement, options: FlipbookOptions) {
    injectStyles();
    this.container = container;
    this.opts = { ...DEFAULTS, ...options } as typeof DEFAULTS;
    // An explicit width override implies an aspect ratio.
    if (options.width) this.opts.aspect = options.width / this.opts.height;
    this.pages = options.pages || [];
    this.page = Math.max(0, Math.min(this.opts.startPage, this.pages.length - 1));
    this.computePageW();
    this.build();
    this.layout();
    this.render();
    this.detectAspect();

    this.ro = new ResizeObserver(() => this.layout());
    this.ro.observe(this.container);
    document.addEventListener("keydown", this.onKey);
    window.addEventListener("resize", this.onResize);
  }

  // ---- build DOM ----
  private build() {
    const o = this.opts;
    this.container.innerHTML = "";
    const stage = document.createElement("div");
    stage.className = "fb-stage";
    stage.style.setProperty("--fb-dur", `${o.duration}ms`);
    stage.style.setProperty("--fb-ease", o.easing);
    stage.style.setProperty("--fb-shadow", `${o.shadow}`);

    const scale = document.createElement("div");
    scale.className = "fb-scale";
    const viewport = document.createElement("div");
    viewport.className = "fb-viewport";
    viewport.style.perspective = `${o.perspective}px`;
    const book = document.createElement("div");
    book.className = "fb-book";

    this.leftEl = document.createElement("div");
    this.leftEl.className = "fb-page fb-page-left";
    this.rightEl = document.createElement("div");
    this.rightEl.className = "fb-page fb-page-right";
    this.spine = document.createElement("div");
    this.spine.className = "fb-spine";

    book.append(this.leftEl, this.rightEl, this.spine);
    viewport.append(book);
    scale.append(viewport);
    stage.append(scale);

    // arrows
    this.prevBtn = this.arrow("prev", ICONS.chevL, () => this.prev());
    this.nextBtn = this.arrow("next", ICONS.chevR, () => this.next());
    stage.append(this.prevBtn, this.nextBtn);

    // toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "fb-toolbar";
    this.soundBtn = this.btn(o.sound ? ICONS.soundOn : ICONS.soundOff, () =>
      this.toggleSound(),
    );
    this.soundBtn.title = "Sound on/off";
    const fsBtn = this.btn(ICONS.fs, () => this.toggleFullscreen());
    fsBtn.title = "Fullscreen";
    toolbar.append(this.soundBtn, fsBtn);
    if (this.opts.downloadUrl) {
      const dl = document.createElement("a");
      dl.className = "fb-btn";
      dl.href = this.opts.downloadUrl;
      dl.setAttribute("download", "");
      dl.title = "Download";
      dl.innerHTML = ICONS.download;
      toolbar.append(dl);
    }
    stage.append(toolbar);

    this.countEl = document.createElement("div");
    this.countEl.className = "fb-count";
    stage.append(this.countEl);

    // interaction surface
    book.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    // In zoom mode, clicking the dim backdrop (outside the book) closes it.
    stage.addEventListener("click", (e) => {
      if (this.zoomed && !scale.contains(e.target as Node)) this.setZoom(false);
    });

    this.container.append(stage);
    this.stage = stage;
    this.scale = scale;
    this.viewport = viewport;
    this.book = book;
  }

  private arrow(cls: string, icon: string, cb: () => void) {
    const b = document.createElement("button");
    b.className = `fb-arrow ${cls}`;
    b.innerHTML = icon;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      cb();
    });
    return b;
  }
  private btn(icon: string, cb: () => void) {
    const b = document.createElement("button");
    b.className = "fb-btn";
    b.innerHTML = icon;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      cb();
    });
    return b;
  }

  // ---- sizing ----
  private computePageW() {
    // Single page is landscape: width = height * aspect (A3 √2 by default).
    this.pageW = Math.max(1, Math.round(this.opts.height * this.opts.aspect));
  }

  // Refine the aspect ratio from the actual page image so the frame matches the
  // sheet exactly (no stretching/cropping).
  private detectAspect() {
    const probe = this.pages[this.opts.startPage] || this.pages[0];
    if (!probe || typeof Image === "undefined") return;
    const img = new Image();
    img.onload = () => {
      if (this.destroyed || !img.naturalWidth || !img.naturalHeight) return;
      const a = img.naturalWidth / img.naturalHeight;
      if (Math.abs(a - this.opts.aspect) > 0.01) {
        this.opts.aspect = a;
        this.computePageW();
        this.layout();
        this.render();
      }
    };
    img.src = probe;
  }

  // ---- layout / responsive ----
  private layout() {
    const o = this.opts;
    const inlineW = this.container.clientWidth || window.innerWidth;
    const cw = this.zoomed ? window.innerWidth : inlineW;
    const cols = cw < o.breakpoint ? 1 : 2;
    if (cols !== this.cols) {
      this.cols = cols;
      if (cols === 2) this.page = this.page - (this.page % 2); // snap to spread
    }
    // Spread width = cols × (single landscape page); 2 pages ≈ 2.828 : 1.
    const bookW = this.cols * this.pageW;
    const bookH = o.height;
    this.viewport.style.width = `${bookW}px`;
    this.viewport.style.height = `${bookH}px`;

    let s: number;
    if (this.zoomed) {
      // Fit the spread to the viewport at the largest fully-visible size
      // (never upscaling past 1:1).
      const viewFit = Math.min(
        (window.innerWidth - 48) / bookW,
        (window.innerHeight - 72) / bookH,
      );
      s = Math.min(1, viewFit);
    } else {
      s = Math.min(1, (cw - 36) / bookW, (window.innerHeight * 0.85) / bookH);
    }

    this.scale.style.transform = `scale(${s})`;
    this.scale.style.width = `${bookW}px`;
    this.scale.style.height = `${bookH}px`;
    this.stage.style.height = this.zoomed ? "" : `${bookH * s + 8}px`;
    this.spine.style.display = this.cols === 2 ? "block" : "none";
    this.spine.style.left = `${this.pageW - 23}px`;
    if (!this.animating) this.render();
  }

  private setImg(el: HTMLElement, url?: string) {
    el.style.backgroundImage = url ? `url("${url}")` : "none";
  }

  private placeStatics() {
    const w = this.pageW;
    if (this.cols === 2) {
      Object.assign(this.leftEl.style, { left: "0", width: `${w}px`, display: "block" });
      Object.assign(this.rightEl.style, { left: `${w}px`, width: `${w}px`, display: "block" });
    } else {
      Object.assign(this.leftEl.style, { left: "0", width: `${w}px`, display: "block" });
      this.rightEl.style.display = "none";
    }
  }

  // ---- render rest state ----
  private render() {
    this.placeStatics();
    if (this.cols === 2) {
      this.setImg(this.leftEl, this.pages[this.page]);
      this.setImg(this.rightEl, this.pages[this.page + 1]);
    } else {
      this.setImg(this.leftEl, this.pages[this.page]);
    }
    this.updateControls();
  }

  private updateControls() {
    this.prevBtn.disabled = !this.canPrev();
    this.nextBtn.disabled = !this.canNext();
    const total = this.pages.length;
    if (this.cols === 2) {
      const r = Math.min(this.page + 2, total);
      this.countEl.textContent = `${this.page + 1}–${r} / ${total}`;
    } else {
      this.countEl.textContent = `${this.page + 1} / ${total}`;
    }
  }

  private step() {
    return this.cols === 2 ? 2 : 1;
  }
  private canNext() {
    return this.page + this.step() < this.pages.length;
  }
  private canPrev() {
    return this.page > 0;
  }

  // ---- build a turning leaf ----
  private makeLeaf(dir: 1 | -1) {
    const w = this.pageW;
    const leaf = document.createElement("div");
    leaf.className = "fb-leaf";
    leaf.style.width = `${w}px`;

    let frontUrl: string | undefined;
    let backUrl: string | undefined;
    let originLeft: boolean;
    let leafLeft: number;

    if (this.cols === 2) {
      if (dir === 1) {
        leafLeft = w; // right half
        originLeft = true;
        frontUrl = this.pages[this.page + 1];
        backUrl = this.pages[this.page + 2];
        this.setImg(this.leftEl, this.pages[this.page]);
        this.setImg(this.rightEl, this.pages[this.page + 3]); // revealed under
      } else {
        leafLeft = 0; // left half
        originLeft = false;
        frontUrl = this.pages[this.page];
        backUrl = this.pages[this.page - 1];
        this.setImg(this.rightEl, this.pages[this.page + 1]);
        this.setImg(this.leftEl, this.pages[this.page - 2]); // revealed under
      }
    } else {
      leafLeft = 0;
      if (dir === 1) {
        originLeft = true;
        frontUrl = this.pages[this.page];
        backUrl = this.pages[this.page + 1];
        this.setImg(this.leftEl, this.pages[this.page + 1]);
      } else {
        originLeft = false;
        frontUrl = this.pages[this.page];
        backUrl = this.pages[this.page - 1];
        this.setImg(this.leftEl, this.pages[this.page - 1]);
      }
    }

    leaf.style.left = `${leafLeft}px`;
    leaf.style.transformOrigin = originLeft ? "left center" : "right center";

    const front = document.createElement("div");
    front.className = "fb-face fb-front";
    this.setImg(front, frontUrl);
    const back = document.createElement("div");
    back.className = "fb-face fb-back";
    this.setImg(back, backUrl);
    const shine = document.createElement("div");
    shine.className = "fb-shine";
    leaf.append(front, back, shine);
    this.book.append(leaf);
    return { leaf, shine, originLeft };
  }

  private shineGradient(dir: 1 | -1) {
    // light sheen toward the outer edge, shadow toward the spine
    return dir === 1
      ? "linear-gradient(to left, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.30) 100%)"
      : "linear-gradient(to right, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.30) 100%)";
  }

  // ---- programmatic flip ----
  next() {
    this.flip(1);
  }
  prev() {
    this.flip(-1);
  }

  private flip(dir: 1 | -1) {
    if (this.animating || this.dragging) return;
    if (dir === 1 && !this.canNext()) return;
    if (dir === -1 && !this.canPrev()) return;
    this.animating = true;
    this.playSound();
    const { leaf, shine, originLeft } = this.makeLeaf(dir);
    const end = originLeft ? -180 : 180;
    shine.style.background = this.shineGradient(dir);
    leaf.style.transition = "none";
    leaf.style.transform = "rotateY(0deg)";
    // force reflow then animate
    void leaf.offsetWidth;
    leaf.style.transition = `transform var(--fb-dur) var(--fb-ease)`;
    leaf.style.transform = `rotateY(${end}deg)`;
    // gloss peak mid-turn
    shine.animate(
      [{ opacity: 0 }, { opacity: 1, offset: 0.5 }, { opacity: 0 }],
      { duration: this.opts.duration, easing: "ease-in-out" },
    );
    const done = () => {
      leaf.removeEventListener("transitionend", done);
      this.page += dir * this.step();
      leaf.remove();
      this.animating = false;
      this.render();
    };
    leaf.addEventListener("transitionend", done);
    // safety timeout
    window.setTimeout(() => {
      if (this.animating) done();
    }, this.opts.duration + 120);
  }

  // ---- drag to flip ----
  private onPointerDown(e: PointerEvent) {
    if (this.animating || this.dragging) return;
    const rect = this.book.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;
    // direction by which half (single = always forward unless near left edge)
    let dir: 1 | -1;
    if (this.cols === 2) dir = x > half ? 1 : -1;
    else dir = x > rect.width * 0.35 ? 1 : -1;
    if (dir === 1 && !this.canNext()) return;
    if (dir === -1 && !this.canPrev()) return;

    this.dragging = true;
    this.dragDir = dir;
    this.dragStartX = e.clientX;
    this.dragProgress = 0;
    const { leaf, shine } = this.makeLeaf(dir);
    leaf.style.transition = "none";
    leaf.style.transform = "rotateY(0deg)";
    shine.style.background = this.shineGradient(dir);
    this.dragLeaf = leaf;
    this.dragShine = shine;
    this.stage.classList.add("fb-grabbing");
    this.book.setPointerCapture(e.pointerId);
    this.book.addEventListener("pointermove", this.onPointerMove);
    this.book.addEventListener("pointerup", this.onPointerUp);
    this.book.addEventListener("pointercancel", this.onPointerUp);
    this._moved = false;
  }

  private _moved = false;
  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging || !this.dragLeaf) return;
    const rect = this.book.getBoundingClientRect();
    const span = this.cols === 2 ? rect.width / 2 : rect.width;
    const dx = e.clientX - this.dragStartX;
    if (Math.abs(dx) > 4) this._moved = true;
    // forward: dragging left (dx<0) increases progress; backward: dragging right
    let p = (this.dragDir === 1 ? -dx : dx) / span;
    p = Math.max(0, Math.min(1, p));
    this.dragProgress = p;
    const sign = this.dragDir === 1 ? -1 : 1;
    this.dragLeaf.style.transform = `rotateY(${sign * 180 * p}deg)`;
    if (this.dragShine) this.dragShine.style.opacity = `${Math.sin(p * Math.PI)}`;
  };

  private onPointerUp = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.book.removeEventListener("pointermove", this.onPointerMove);
    this.book.removeEventListener("pointerup", this.onPointerUp);
    this.book.removeEventListener("pointercancel", this.onPointerUp);
    try {
      this.book.releasePointerCapture(e.pointerId);
    } catch {}
    this.stage.classList.remove("fb-grabbing");
    const leaf = this.dragLeaf!;
    const dir = this.dragDir;
    const complete = this._moved ? this.dragProgress > 0.4 : true; // click = complete
    const sign = dir === 1 ? -1 : 1;
    this.dragging = false;
    this.animating = true;
    if (complete) this.playSound();
    const targetP = complete ? 1 : 0;
    leaf.style.transition = `transform var(--fb-dur) var(--fb-ease)`;
    leaf.style.transform = `rotateY(${sign * 180 * targetP}deg)`;
    if (this.dragShine) {
      this.dragShine.animate(
        [
          { opacity: this.dragShine.style.opacity || "0" },
          { opacity: complete ? 0 : 0 },
        ],
        { duration: this.opts.duration, easing: "ease-out" },
      );
    }
    const done = () => {
      leaf.removeEventListener("transitionend", done);
      if (complete) this.page += dir * this.step();
      leaf.remove();
      this.dragLeaf = null;
      this.dragShine = null;
      this.animating = false;
      this.render();
    };
    leaf.addEventListener("transitionend", done);
    window.setTimeout(() => {
      if (this.animating && this.dragLeaf === leaf) done();
    }, this.opts.duration + 120);
  };

  // ---- controls ----
  toggleSound() {
    this.opts.sound = !this.opts.sound;
    this.soundBtn.innerHTML = this.opts.sound ? ICONS.soundOn : ICONS.soundOff;
  }

  // "Fullscreen" = centred zoom overlay (not native fullscreen): dim the page,
  // centre the book, enlarge it. Click outside / Esc / the button closes it.
  toggleFullscreen() {
    this.setZoom(!this.zoomed);
  }

  private prevOverflow = "";
  private setZoom(on: boolean) {
    if (on === this.zoomed) return;
    if (on) this.prevOverflow = document.body.style.overflow;
    this.zoomed = on;
    this.stage.classList.toggle("fb-zoom", on);
    document.body.style.overflow = on ? "hidden" : this.prevOverflow;
    this.layout();
  }

  private playSound() {
    if (!this.opts.sound) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = this.actx || (this.actx = new Ctx());
      const dur = 0.24;
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        const t = i / d.length;
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.2);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1700;
      bp.Q.value = 0.6;
      const g = ctx.createGain();
      g.gain.value = 0.22;
      src.connect(bp).connect(g).connect(ctx.destination);
      src.start();
    } catch {}
  }

  destroy() {
    this.destroyed = true;
    if (this.zoomed) document.body.style.overflow = this.prevOverflow;
    document.removeEventListener("keydown", this.onKey);
    window.removeEventListener("resize", this.onResize);
    this.ro?.disconnect();
    this.container.innerHTML = "";
  }
}

export default Flipbook;
