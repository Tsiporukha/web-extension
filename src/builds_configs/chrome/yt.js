export default function(){
  if (!window['YT']) {
    var YT = {};
  }
  if (!YT.Player) {
    (function() {
      var g, h = window;
      function l(a) {
        a = a.split(".");
        for (var b = h, c; c = a.shift();) if (null != b[c]) b = b[c];
        else
        return null;
        return b
      }

      function n(a) {
        var b = typeof a;
        if ("object" == b) if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
          if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
        } else
        return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
      }

      function p(a) {
        return "string" == typeof a
      }

      function aa(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
      }
      var ba = "closure_uid_" + (1E9 * Math.random() >>> 0),
          ca = 0;

      function da(a, b, c) {
        return a.call.apply(a.bind, arguments)
      }

      function ea(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
          var d = Array.prototype.slice.call(arguments, 2);
          return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c)
          }
        }
        return function() {
          return a.apply(b, arguments)
        }
      }

      function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
        return q.apply(null, arguments)
      }

      function r(a, b) {
        var c = a.split("."),
            d = h;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
      }

      function s(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.u = b.prototype;
        a.prototype = new c
      }
      Function.prototype.bind = Function.prototype.bind ||
      function(a, b) {
        if (1 < arguments.length) {
          var c = Array.prototype.slice.call(arguments, 1);
          c.unshift(this, a);
          return q.apply(null, c)
        }
        return q(this, a)
      };
      var v = Array.prototype,
          fa = v.indexOf ?
          function(a, b, c) {
          return v.indexOf.call(a, b, c)
          } : function(a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (p(a)) return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1
          },
          w = v.forEach ?
          function(a, b, c) {
          v.forEach.call(a, b, c)
          } : function(a, b, c) {
          for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
          };

      function ga(a, b) {
        var c;
        t: {
          c = a.length;
          for (var d = p(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
            c = e;
            break t
          }
          c = -1
        }
        return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
      }

      function ha(a) {
        return v.concat.apply(v, arguments)
      }

      function ia(a) {
        var b = a.length;
        if (0 < b) {
          for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
          return c
        }
        return []
      }

      function ja(a, b, c) {
        return 2 >= arguments.length ? v.slice.call(a, b) : v.slice.call(a, b, c)
      };

      function ka(a) {
        var b = x,
            c;
        for (c in b) if (a.call(void 0, b[c], c, b)) return c
      };
      var y, z, A, C;

      function la() {
        return h.navigator ? h.navigator.userAgent : null
      }
      C = A = z = y = !1;
      var D;
      if (D = la()) {
        var ma = h.navigator;
        y = 0 == D.indexOf("Opera");
        z = !y && -1 != D.indexOf("MSIE");
        A = !y && -1 != D.indexOf("WebKit");
        C = !y && !A && "Gecko" == ma.product
      }
      var E = z,
          F = C,
          na = A;

      function oa() {
        var a = h.document;
        return a ? a.documentMode : void 0
      }
      var G;
      t: {
        var H = "",
            I;
        if (y && h.opera) var J = h.opera.version,
            H = "function" == typeof J ? J() : J;
        else if (F ? I = /rv\:([^\);]+)(\)|;)/ : E ? I = /MSIE\s+([^\);]+)(\)|;)/ : na && (I = /WebKit\/(\S+)/), I) var pa = I.exec(la()),
            H = pa ? pa[1] : "";
        if (E) {
          var qa = oa();
          if (qa > parseFloat(H)) {
            G = String(qa);
            break t
          }
        }
        G = H
      }
      var ra = G,
          sa = {};

      function ta(a) {
        if (!sa[a]) {
          for (var b = 0, c = String(ra).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
            var m = c[f] || "",
                k = d[f] || "",
                B = RegExp("(\\d*)(\\D*)", "g"),
                Qa = RegExp("(\\d*)(\\D*)", "g");
            do {
              var t = B.exec(m) || ["", "", ""],
                  u = Qa.exec(k) || ["", "", ""];
              if (0 == t[0].length && 0 == u[0].length) break;
              b = ((0 == t[1].length ? 0 : parseInt(t[1], 10)) < (0 == u[1].length ? 0 : parseInt(u[1], 10)) ? -1 : (0 == t[1].length ? 0 : parseInt(t[1], 10)) > (0 == u[1].length ? 0 : parseInt(u[1], 10)) ? 1 : 0) || ((0 == t[2].length) < (0 == u[2].length) ? -1 : (0 == t[2].length) > (0 == u[2].length) ? 1 : 0) || (t[2] < u[2] ? -1 : t[2] > u[2] ? 1 : 0)
            } while (0 == b)
          }
          sa[a] = 0 <= b
        }
      }
      var ua = h.document,
          va = ua && E ? oa() || ("CSS1Compat" == ua.compatMode ? parseInt(ra, 10) : 5) : void 0;
      if (F || E) {
        var K;
        if (K = E) K = E && 9 <= va;
        K || F && ta("1.9.1")
      }
      E && ta("9");

      function wa() {
        var a, b, c, d;
        a = document;
        if (a.querySelectorAll && a.querySelector) return a.querySelectorAll(".yt-player");
        if (a.getElementsByClassName) {
          var e = a.getElementsByClassName("yt-player");
          return e
        }
        e = a.getElementsByTagName("*");
        d = {};
        for (b = c = 0; a = e[b]; b++) {
          var f = a.className;
          "function" == typeof f.split && 0 <= fa(f.split(/\s+/), "yt-player") && (d[c++] = a)
        }
        d.length = c;
        return d
      }

      function xa(a, b) {
        for (var c = 0; a;) {
          if (b(a)) return a;
          a = a.parentNode;
          c++
        }
        return null
      };

      function ya(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
          return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
      }

      function za() {}

      function L(a, b, c) {
        switch (typeof b) {
        case "string":
          Aa(b, c);
          break;
        case "number":
          c.push(isFinite(b) && !isNaN(b) ? b : "null");
          break;
        case "boolean":
          c.push(b);
          break;
        case "undefined":
          c.push("null");
          break;
        case "object":
          if (null == b) {
            c.push("null");
            break
          }
          if ("array" == n(b)) {
            var d = b.length;
            c.push("[");
            for (var e = "", f = 0; f < d; f++) c.push(e), L(a, b[f], c), e = ",";
            c.push("]");
            break
          }
          c.push("{");
          d = "";
          for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), Aa(e, c), c.push(":"), L(a, f, c), d = ","));
          c.push("}");
          break;
        case "function":
          break;
        default:
          throw Error("Unknown type: " + typeof b);
        }
      }
      var M = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
      },
          Ba = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

      function Aa(a, b) {
        b.push('"', a.replace(Ba, function(a) {
          if (a in M) return M[a];
          var b = a.charCodeAt(0),
              e = "\\u";
          16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
          return M[a] = e + b.toString(16)
        }), '"')
      };

      function N() {}
      N.prototype.q = !1;N.prototype.dispose = function() {
        this.q || (this.q = !0, this.j())
      };N.prototype.j = function() {
        if (this.C) for (; this.C.length;) this.C.shift()()
      };

      function O() {
        this.a = [];
        this.b = {}
      }
      s(O, N);O.prototype.w = 1;O.prototype.h = 0;

      function Ca(a, b, c, d) {
        var e = a.b[b];
        e || (e = a.b[b] = []);
        var f = a.w;
        a.a[f] = b;
        a.a[f + 1] = c;
        a.a[f + 2] = d;
        a.w = f + 3;
        e.push(f)
      }

      function Da(a, b, c) {
        var d = P;
        if (a = d.b[a]) {
          var e = d.a;
          (a = ga(a, function(a) {
            return e[a + 1] == b && e[a + 2] == c
          })) && Ea(d, a)
        }
      }

      function Ea(a, b) {
        if (0 != a.h) a.d || (a.d = []), a.d.push(b);
        else {
          var c = a.a[b];
          if (c) {
            if (c = a.b[c]) {
              var d = fa(c, b);
              0 <= d && v.splice.call(c, d, 1)
            }
            delete a.a[b];
            delete a.a[b + 1];
            delete a.a[b + 2]
          }
        }
      }
      O.prototype.A = function(a, b) {
        var c = this.b[a];
        if (c) {
          this.h++;
          for (var d = ja(arguments, 1), e = 0, f = c.length; e < f; e++) {
            var m = c[e];
            this.a[m + 1].apply(this.a[m + 2], d)
          }
          this.h--;
          if (this.d && 0 == this.h) for (; c = this.d.pop();) Ea(this, c);
          return 0 != e
        }
        return !1
      };O.prototype.j = function() {
        O.u.j.call(this);
        delete this.a;
        delete this.b;
        delete this.d
      };
      var Fa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");

      function Ga(a) {
        if (Q) {
          Q = !1;
          var b = h.location;
          if (b) {
            var c = b.href;
            if (c && (c = (c = Ga(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) throw Q = !0, Error();
          }
        }
        return a.match(Fa)
      }
      var Q = na;

      function Ha(a, b, c) {
        if ("array" == n(b)) for (var d = 0; d < b.length; d++) Ha(a, String(b[d]), c);
        else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
      };

      function R(a, b) {
        return a.dataset ? a.dataset[Ia(b)] : a.getAttribute("data-" + b)
      }
      var Ja = {};

      function Ia(a) {
        return Ja[a] || (Ja[a] = String(a).replace(/\-([a-z])/g, function(a, c) {
          return c.toUpperCase()
        }))
      };
      var S = l("yt.dom.getNextId_");
      if (!S) {
        S = function() {
          return ++Ka
        };
        r("yt.dom.getNextId_", S);
        var Ka = 0
      };r("yt.config_", window.yt && window.yt.config_ || {});r("yt.tokens_", window.yt && window.yt.tokens_ || {});r("yt.globals_", window.yt && window.yt.globals_ || {});r("yt.msgs_", window.yt && window.yt.msgs_ || {});r("yt.timeouts_", window.yt && window.yt.timeouts_ || []);
      var La = window.yt && window.yt.intervals_ || [];r("yt.intervals_", La);

      function Ma(a) {
        "function" == n(a) && (a = Na(a));
        a = window.setInterval(a, 250);
        La.push(a);
        return a
      }

      function Na(a) {
        return window.yterr ?
        function() {
          try {
            return a.apply(this, arguments)
          } catch (b) {
            var c = l("yt.www.onException");
            c && c(b);
            throw b;
          }
        } : a
      };

      function T(a) {
        if (a = a || window.event) {
          for (var b in a) b in Oa || (this[b] = a[b]);
          this.scale = a.scale;
          this.rotation = a.rotation;
          (b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);
          this.target = b;
          if (b = a.relatedTarget) try {
            b = b.nodeName && b
          } catch (c) {
            b = null
          } else "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);
          this.relatedTarget = b;
          this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
          this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
          if (document.body && document.documentElement) {
            b = document.body.scrollLeft + document.documentElement.scrollLeft;
            var d = document.body.scrollTop + document.documentElement.scrollTop;
            this.pageX = void 0 != a.pageX ? a.pageX : a.clientX + b;
            this.pageY = void 0 != a.pageY ? a.pageY : a.clientY + d
          }
          this.keyCode = a.keyCode ? a.keyCode : a.which;
          this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
          this.altKey = a.altKey;
          this.ctrlKey = a.ctrlKey;
          this.shiftKey = a.shiftKey;
          "MozMousePixelScroll" == this.type ? (this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0, this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail) : window.opera ? (this.wheelDeltaX = 0, this.wheelDeltaY = a.detail) : 0 == a.wheelDelta % 120 ? "WebkitTransform" in document.documentElement.style ? window.a && 0 == navigator.platform.indexOf("Mac") ? (this.wheelDeltaX = a.wheelDeltaX / -30, this.wheelDeltaY = a.wheelDeltaY / -30) : (this.wheelDeltaX = a.wheelDeltaX / -1.2, this.wheelDeltaY = a.wheelDeltaY / -1.2) : (this.wheelDeltaX = 0, this.wheelDeltaY = a.wheelDelta / -1.6) : (this.wheelDeltaX = a.wheelDeltaX / -3, this.wheelDeltaY = a.wheelDeltaY / -3)
        }
      }
      g = T.prototype;g.type = "";g.target = null;
      g.relatedTarget = null;g.currentTarget = null;g.data = null;g.keyCode = 0;g.charCode = 0;g.altKey = !1;g.ctrlKey = !1;g.shiftKey = !1;g.clientX = 0;g.clientY = 0;g.pageX = 0;g.pageY = 0;g.wheelDeltaX = 0;g.wheelDeltaY = 0;g.rotation = 0;g.scale = 1;
      var Oa = {
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        scale: 1,
        rotation: 1
      };
      var x = l("yt.events.listeners_") || {};r("yt.events.listeners_", x);
      var Pa = l("yt.events.counter_") || {
        count: 0
      };r("yt.events.counter_", Pa);

      function Ra(a, b, c) {
        return ka(function(d) {
          return d[0] == a && d[1] == b && d[2] == c && !1 == d[4]
        })
      }

      function Sa(a, b, c) {
        if (a && (a.addEventListener || a.attachEvent)) {
          var d = Ra(a, b, c);
          if (!d) {
            var d = ++Pa.count + "",
                e = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document),
                f;
            f = e ?
            function(d) {
              d = new T(d);
              if (!xa(d.relatedTarget, function(b) {
                return b == a
              })) return d.currentTarget = a, d.type = b, c.call(a, d)
            } : function(b) {
              b = new T(b);
              b.currentTarget = a;
              return c.call(a, b)
            };
            f = Na(f);
            x[d] = [a, b, c, f, !1];
            a.addEventListener ? "mouseenter" == b && e ? a.addEventListener("mouseover", f, !1) : "mouseleave" == b && e ? a.addEventListener("mouseout", f, !1) : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style ? a.addEventListener("MozMousePixelScroll", f, !1) : a.addEventListener(b, f, !1) : a.attachEvent("on" + b, f)
          }
        }
      }

      function Ta(a) {
        "string" == typeof a && (a = [a]);
        w(a, function(a) {
          if (a in x) {
            var c = x[a],
                d = c[0],
                e = c[1],
                f = c[3],
                c = c[4];
            d.removeEventListener ? d.removeEventListener(e, f, c) : d.detachEvent("on" + e, f);
            delete x[a]
          }
        })
      };
      var Ua = {},
          Va = [],
          P = new O;

      function Wa() {
        w(Va, function(a) {
          a()
        })
      }

      function Xa(a, b) {
        P.A.apply(P, arguments)
      };

      function U(a, b) {
        this.g = b;
        this.h = this.a = null;
        this.b = this.id = 0;
        this.s = !1;
        this.j = this.d = null;
        var c = p(a) ? document.getElementById(a) : a;
        if (c) {
          if ("iframe" != c.tagName.toLowerCase()) {
            for (var d = c, e = document.createElement("iframe"), d = d.attributes, f = 0, m = d.length; f < m; f++) {
              var k = d[f].value;
              null != k && ("" != k && "null" != k) && e.setAttribute(d[f].name, k)
            }
            e.setAttribute("frameBorder", 0);
            e.setAttribute("allowfullscreen", 1);
            e.setAttribute("title", "YouTube " + V(this.g, "title"));
            (d = V(this.g, "width")) && e.setAttribute("width", d);
            (d = V(this.g, "height")) && e.setAttribute("height", d);
            d = this.p();
            d.enablejsapi = window.postMessage ? 1 : 0;
            window.location.host && (d.origin = window.location.protocol + "//" + window.location.host);
            var f = V(this.g, "host") + this.t() + "?",
                m = [],
                B;
            for (B in d) Ha(B, d[B], m);
            m[0] = "";
            e.src = f + m.join("");
            this.h = c;
            (B = c.parentNode) && B.replaceChild(e, c);
            c = e
          }
          this.a = c;
          this.id = this[ba] || (this[ba] = ++ca);
          this.a.id && (Ua[this.a.id] = this);
          window.postMessage && (this.d = new O, Ya(this))
        }
      }
      g = U.prototype;
      g.M = function() {
        this.a.id && (Ua[this.a.id] = null);
        var a = this.d;
        a && "function" == typeof a.dispose && a.dispose();
        if (this.h) {
          var a = this.a,
              b = a.parentNode;
          b && b.replaceChild(this.h, a)
        } else(a = this.a) && a.parentNode && a.parentNode.removeChild(a);
        W && (W[this.id] = null);
        this.g = null;
        var a = this.a,
            c;
        for (c in x) x[c][0] == a && Ta(c);
        this.h = this.a = null
      };

      function Ya(a) {
        Za(a.g, a, a.id);
        a.b = Ma(q(a.v, a));
        Sa(a.a, "load", q(function() {
          window.clearInterval(this.b);
          this.b = Ma(q(this.v, this))
        }, a))
      }
      g.p = function() {
        return {}
      };
      g.v = function() {
        this.a && this.a.contentWindow ? $a(this, {
          event: "listening"
        }) : window.clearInterval(this.b)
      };g.B = function(a) {
        this.o(a.event, a)
      };g.addEventListener = function(a, b) {
        var c = b;
        "string" == typeof b && (c = function() {
          window[b].apply(window, arguments)
        });
        Ca(this.d, a, c);
        X(this, "addEventListener", [a]);
        return this
      };g.o = function(a, b) {
        if (!this.d.q) {
          var c = {
            target: this,
            data: b
          };
          this.d.A(a, c);
          this.j && Xa(this.j + "." + a, c)
        }
      };

      function X(a, b, c) {
        c = c || [];
        c = Array.prototype.slice.call(c);
        $a(a, {
          event: "command",
          func: b,
          args: c
        })
      }

      function $a(a, b) {
        b.id = a.id;
        var c;
        c = [];
        L(new za, b, c);
        c = c.join("");
        var d = Ga(a.a.src),
            e = d[1],
            f = d[2],
            m = d[3],
            d = d[4],
            k = "";
        e && (k += e + ":");
        m && (k += "//", f && (k += f + "@"), k += m, d && (k += ":" + d));
        a.a.contentWindow.postMessage(c, k)
      }
      g.O = function(a, b) {
        this.a.width = a;
        this.a.height = b;
        return this
      };g.N = function() {
        return this.a
      };
      var ab = "corp.google.com youtube.com youtube-nocookie.com prod.google.com sandbox.google.com docs.google.com drive.google.com play.google.com".split(" ");
      var bb = window.YTConfig || {};

      function Y(a) {
        this.b = a || {};
        this.a = {};
        this.a.width = 640;
        this.a.height = 390;
        this.a.title = "";
        this.a.host = ("https:" == document.location.protocol ? "https:" : "http:") + "//www.youtube.com"
      }
      var W = null;

      function V(a, b) {
        for (var c = [a.b, bb, a.a], d = 0; d < c.length; d++) {
          var e = c[d][b];
          if (void 0 != e) return e
        }
        return null
      }

      function Za(a, b, c) {
        W || (W = {}, Sa(window, "message", q(a.d, a)));
        W[c] = b
      }
      Y.prototype.d = function(a) {
        if (a.origin == V(this, "host") || RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + ab.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i").test(a.origin)) {
          var b;
          try {
            b = ya(a.data)
          } catch (c) {
            return
          }
          if (a = W[b.id]) {
            if (!a.s) {
              a.s = !0;
              var d = V(a.g, "events"),
                  e;
              for (e in d) d.hasOwnProperty(e) && a.addEventListener(e, d[e])
            }
            a.B(b)
          }
        }
      };

      function cb(a) {
        Y.call(this, a);
        this.a.title = "video player";
        this.a.videoId = ""
      }
      s(cb, Y);

      function Z(a, b) {
        U.call(this, a, new cb(b));
        this.j = "player";
        this.k = {};
        this.i = {}
      }
      s(Z, U);

      function db(a) {
        if ("iframe" != a.tagName.toLowerCase()) {
          var b = a.getAttribute("videoid") || R(a, "videoid");
          if (b) {
            var c = a.getAttribute("width") || R(a, "width"),
                d = a.getAttribute("height") || R(a, "height");
            new Z(a, {
              videoId: b,
              width: c,
              height: d
            })
          }
        }
      }
      g = Z.prototype;g.t = function() {
        return "/embed/" + V(this.g, "videoId")
      };g.p = function() {
        return V(this.g, "playerVars") || {}
      };
      g.B = function(a) {
        var b = a.event;
        a = a.info;
        switch (b) {
        case "apiInfoDelivery":
          if (aa(a)) for (var c in a) this.i[c] = a[c];
          break;
        case "infoDelivery":
          eb(this, a);
          break;
        case "initialDelivery":
          window.clearInterval(this.b);
          this.k = {};
          this.i = {};
          fb(this, a.apiInterface);
          eb(this, a);
          break;
        default:
          this.o(b, a)
        }
      };

      function eb(a, b) {
        if (aa(b)) for (var c in b) a.k[c] = b[c]
      }

      function fb(a, b) {
        w(b, function(a) {
          this[a] || (0 == a.search("cue") || 0 == a.search("load") ? this[a] = function() {
            this.k = {};
            this.i = {};
            X(this, a, arguments);
            return this
          } : 0 == a.search("get") || 0 == a.search("is") ? this[a] = function() {
            var b = 0;
            0 == a.search("get") ? b = 3 : 0 == a.search("is") && (b = 2);
            return this.k[a.charAt(b).toLowerCase() + a.substr(b + 1)]
          } : this[a] = function() {
            X(this, a, arguments);
            return this
          })
        }, a)
      }
      g.L = function() {
        var a = this.a.cloneNode(!1),
            b = this.k.videoData,
            c = V(this.g, "host");
        a.src = b && b.video_id ? c + "/embed/" + b.video_id : a.src;
        b = document.createElement("div");
        b.appendChild(a);
        return b.innerHTML
      };g.K = function(a) {
        return this.i.namespaces ? a ? this.i[a].options || [] : this.i.namespaces || [] : []
      };g.J = function(a, b) {
        if (this.i.namespaces && a && b) return this.i[a][b]
      };

      function gb(a) {
        Y.call(this, a);
        this.a.host = "https://www.youtube.com";
        this.a.title = "upload widget";
        this.a.height = 0.67 * V(this, "width")
      }
      s(gb, Y);

      function $(a, b) {
        U.call(this, a, new gb(b))
      }
      s($, U);g = $.prototype;g.t = function() {
        return "/upload_embed"
      };g.p = function() {
        var a = {},
            b = V(this.g, "webcamOnly");
        null != b && (a.webcam_only = b);
        return a
      };g.o = function(a, b) {
        $.u.o.call(this, a, b);
        "onApiReady" == a && X(this, "hostWindowReady")
      };g.F = function(a) {
        X(this, "setVideoDescription", arguments)
      };
      g.G = function(a) {
        X(this, "setVideoKeywords", arguments)
      };g.H = function(a) {
        X(this, "setVideoPrivacy", arguments)
      };g.D = function(a) {
        X(this, "setParentVideoId", arguments)
      };g.I = function(a) {
        X(this, "setVideoTitle", arguments)
      };r("YT.PlayerState.UNSTARTED", -1);r("YT.PlayerState.ENDED", 0);r("YT.PlayerState.PLAYING", 1);r("YT.PlayerState.PAUSED", 2);r("YT.PlayerState.BUFFERING", 3);r("YT.PlayerState.CUED", 5);r("YT.UploadWidgetEvent.API_READY", "onApiReady");r("YT.UploadWidgetEvent.UPLOAD_SUCCESS", "onUploadSuccess");r("YT.UploadWidgetEvent.PROCESSING_COMPLETE", "onProcessingComplete");r("YT.UploadWidgetEvent.STATE_CHANGE", "onStateChange");r("YT.UploadWidgetState.IDLE", 0);r("YT.UploadWidgetState.PENDING", 1);
      r("YT.UploadWidgetState.ERROR", 2);r("YT.UploadWidgetState.PLAYBACK", 3);r("YT.UploadWidgetState.RECORDING", 4);r("YT.UploadWidgetState.STOPPED", 5);r("YT.get", function(a) {
        return Ua[a]
      });r("YT.scan", Wa);r("YT.subscribe", function(a, b, c) {
        Ca(P, a, b, c)
      });r("YT.unsubscribe", function(a, b, c) {
        Da(a, b, c)
      });r("YT.Player", Z);r("YT.UploadWidget", $);U.prototype.destroy = U.prototype.M;U.prototype.setSize = U.prototype.O;U.prototype.getIframe = U.prototype.N;U.prototype.addEventListener = U.prototype.addEventListener;
      Z.prototype.getVideoEmbedCode = Z.prototype.L;Z.prototype.getOptions = Z.prototype.K;Z.prototype.getOption = Z.prototype.J;$.prototype.setParentVideoId = $.prototype.D;$.prototype.setVideoDescription = $.prototype.F;$.prototype.setVideoKeywords = $.prototype.G;$.prototype.setVideoPrivacy = $.prototype.H;$.prototype.setVideoTitle = $.prototype.I;
      var hb = l("onYTReady");hb && hb();
      var ib = l("onYouTubeIframeAPIReady");ib && ib();
      var jb = l("onYouTubePlayerAPIReady");jb && jb();
      Va.push(function() {
        var a = ia(document.getElementsByTagName("yt:player")),
            b;
        b = document;
        b = b.querySelectorAll && b.querySelector ? b.querySelectorAll(".yt-player") : b.getElementsByClassName ? b.getElementsByClassName("yt-player") : wa();
        b = ia(b);
        w(ha(a, b), db)
      });Wa();
    })();
  }
  window['YT'].loaded = 1;
}
