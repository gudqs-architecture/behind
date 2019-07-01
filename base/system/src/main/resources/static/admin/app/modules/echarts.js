
!function (t, e) {
    if ("object" == typeof exports && "undefined" != typeof module) {
        e(exports);
    }else if ("function" == typeof define && define.amd) {
        define(["exports"], e);
    }
    else if (layui && layui.define) {
        layui.define('jquery', function (exports) {
            var echarts = {}; exports('echarts', echarts);
            e(t.echarts = {});
            layui.echarts = t.echarts;
        })
    }
    else {
        e(t.echarts = {});
    }
}(this, function (t) {
    "use strict";

    function e(t) {
        var e = {}, n = {}, i = t.match(/Firefox\/([\d.]+)/),
            r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge\/([\d.]+)/),
            o = /micromessenger/i.test(t);
        return i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), a && (n.edge = !0, n.version = a[1]), o && (n.weChat = !0), {
            browser: n,
            os: e,
            node: !1,
            canvasSupported: !!document.createElement("canvas").getContext,
            svgSupported: "undefined" != typeof SVGRect,
            touchEventsSupported: "ontouchstart" in window && !n.ie && !n.edge,
            pointerEventsSupported: "onpointerdown" in window && (n.edge || n.ie && n.version >= 11),
            domSupported: "undefined" != typeof document
        }
    }

    function n(t, e) {
        "createCanvas" === t && (pm = null), dm[t] = e
    }

    function i(t) {
        if (null == t || "object" != typeof t) return t;
        var e = t, n = am.call(t);
        if ("[object Array]" === n) {
            if (!R(t)) {
                e = [];
                for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r])
            }
        } else if (rm[n]) {
            if (!R(t)) {
                var o = t.constructor;
                if (t.constructor.from) e = o.from(t); else {
                    e = new o(t.length);
                    for (var r = 0, a = t.length; a > r; r++) e[r] = i(t[r])
                }
            }
        } else if (!im[n] && !R(t) && !T(t)) {
            e = {};
            for (var s in t) t.hasOwnProperty(s) && (e[s] = i(t[s]))
        }
        return e
    }

    function r(t, e, n) {
        if (!M(e) || !M(t)) return n ? i(e) : t;
        for (var a in e) if (e.hasOwnProperty(a)) {
            var o = t[a], s = e[a];
            !M(s) || !M(o) || _(s) || _(o) || T(s) || T(o) || S(s) || S(o) || R(s) || R(o) ? !n && a in t || (t[a] = i(e[a], !0)) : r(o, s, n)
        }
        return t
    }

    function a(t, e) {
        for (var n = t[0], i = 1, a = t.length; a > i; i++) n = r(n, t[i], e);
        return n
    }

    function o(t, e) {
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t
    }

    function s(t, e, n) {
        for (var i in e) e.hasOwnProperty(i) && (n ? null != e[i] : null == t[i]) && (t[i] = e[i]);
        return t
    }

    function l() {
        return pm || (pm = fm().getContext("2d")), pm
    }

    function u(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n
        }
        return -1
    }

    function h(t, e) {
        function n() {
        }

        var i = t.prototype;
        n.prototype = e.prototype, t.prototype = new n;
        for (var r in i) t.prototype[r] = i[r];
        t.prototype.constructor = t, t.superClass = e
    }

    function c(t, e, n) {
        t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, n)
    }

    function d(t) {
        return t ? "string" == typeof t ? !1 : "number" == typeof t.length : void 0
    }

    function f(t, e, n) {
        if (t && e) if (t.forEach && t.forEach === sm) t.forEach(e, n); else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t); else for (var a in t) t.hasOwnProperty(a) && e.call(n, t[a], a, t)
    }

    function p(t, e, n) {
        if (t && e) {
            if (t.map && t.map === hm) return t.map(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) i.push(e.call(n, t[r], r, t));
            return i
        }
    }

    function g(t, e, n, i) {
        if (t && e) {
            if (t.reduce && t.reduce === cm) return t.reduce(e, n, i);
            for (var r = 0, a = t.length; a > r; r++) n = e.call(i, n, t[r], r, t);
            return n
        }
    }

    function v(t, e, n) {
        if (t && e) {
            if (t.filter && t.filter === lm) return t.filter(e, n);
            for (var i = [], r = 0, a = t.length; a > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
            return i
        }
    }

    function m(t, e, n) {
        if (t && e) for (var i = 0, r = t.length; r > i; i++) if (e.call(n, t[i], i, t)) return t[i]
    }

    function y(t, e) {
        var n = um.call(arguments, 2);
        return function () {
            return t.apply(e, n.concat(um.call(arguments)))
        }
    }

    function x(t) {
        var e = um.call(arguments, 1);
        return function () {
            return t.apply(this, e.concat(um.call(arguments)))
        }
    }

    function _(t) {
        return "[object Array]" === am.call(t)
    }

    function w(t) {
        return "function" == typeof t
    }

    function b(t) {
        return "[object String]" === am.call(t)
    }

    function M(t) {
        var e = typeof t;
        return "function" === e || !!t && "object" === e
    }

    function S(t) {
        return !!im[am.call(t)]
    }

    function I(t) {
        return !!rm[am.call(t)]
    }

    function T(t) {
        return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
    }

    function C(t) {
        return t !== t
    }

    function A() {
        for (var t = 0, e = arguments.length; e > t; t++) if (null != arguments[t]) return arguments[t]
    }

    function D(t, e) {
        return null != t ? t : e
    }

    function k(t, e, n) {
        return null != t ? t : null != e ? e : n
    }

    function P() {
        return Function.call.apply(um, arguments)
    }

    function L(t) {
        if ("number" == typeof t) return [t, t, t, t];
        var e = t.length;
        return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
    }

    function O(t, e) {
        if (!t) throw new Error(e)
    }

    function z(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }

    function E(t) {
        t[gm] = !0
    }

    function R(t) {
        return t[gm]
    }

    function B(t) {
        function e(t, e) {
            n ? i.set(t, e) : i.set(e, t)
        }

        var n = _(t);
        this.data = {};
        var i = this;
        t instanceof B ? t.each(e) : t && f(t, e)
    }

    function N(t) {
        return new B(t)
    }

    function V(t, e) {
        for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
        var r = t.length;
        for (i = 0; i < e.length; i++) n[i + r] = e[i];
        return n
    }

    function F() {
    }

    function H(t, e) {
        var n = new mm(2);
        return null == t && (t = 0), null == e && (e = 0), n[0] = t, n[1] = e, n
    }

    function G(t, e) {
        return t[0] = e[0], t[1] = e[1], t
    }

    function W(t) {
        var e = new mm(2);
        return e[0] = t[0], e[1] = t[1], e
    }

    function Z(t, e, n) {
        return t[0] = e, t[1] = n, t
    }

    function X(t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t
    }

    function Y(t, e, n, i) {
        return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t
    }

    function U(t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t
    }

    function j(t) {
        return Math.sqrt(q(t))
    }

    function q(t) {
        return t[0] * t[0] + t[1] * t[1]
    }

    function K(t, e, n) {
        return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t
    }

    function $(t, e, n) {
        return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t
    }

    function Q(t, e) {
        return t[0] * e[0] + t[1] * e[1]
    }

    function J(t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t
    }

    function te(t, e) {
        var n = j(e);
        return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t
    }

    function ee(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
    }

    function ne(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
    }

    function ie(t, e) {
        return t[0] = -e[0], t[1] = -e[1], t
    }

    function re(t, e, n, i) {
        return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t
    }

    function ae(t, e, n) {
        var i = e[0], r = e[1];
        return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t
    }

    function oe(t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t
    }

    function se(t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t
    }

    function le() {
        this.on("mousedown", this._dragStart, this), this.on("mousemove", this._drag, this), this.on("mouseup", this._dragEnd, this), this.on("globalout", this._dragEnd, this)
    }

    function ue(t, e) {
        return {target: t, topTarget: e && e.topTarget}
    }

    function he(t, e) {
        var n = t._$eventProcessor;
        return null != e && n && n.normalizeQuery && (e = n.normalizeQuery(e)), e
    }

    function ce(t, e, n, i, r, a) {
        var o = t._$handlers;
        if ("function" == typeof n && (r = i, i = n, n = null), !i || !e) return t;
        n = he(t, n), o[e] || (o[e] = []);
        for (var s = 0; s < o[e].length; s++) if (o[e][s].h === i) return t;
        var l = {h: i, one: a, query: n, ctx: r || t, callAtLast: i.zrEventfulCallAtLast}, u = o[e].length - 1,
            h = o[e][u];
        return h && h.callAtLast ? o[e].splice(u, 0, l) : o[e].push(l), t
    }

    function de(t) {
        return t.getBoundingClientRect ? t.getBoundingClientRect() : {left: 0, top: 0}
    }

    function fe(t, e, n, i) {
        return n = n || {}, i || !nm.canvasSupported ? pe(t, e, n) : nm.browser.firefox && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : pe(t, e, n), n
    }

    function pe(t, e, n) {
        var i = de(t);
        n.zrX = e.clientX - i.left, n.zrY = e.clientY - i.top
    }

    function ge(t, e, n) {
        if (e = e || window.event, null != e.zrX) return e;
        var i = e.type, r = i && i.indexOf("touch") >= 0;
        if (r) {
            var a = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
            a && fe(t, a, e, n)
        } else fe(t, e, e, n), e.zrDelta = e.wheelDelta ? e.wheelDelta / 120 : -(e.detail || 0) / 3;
        var o = e.button;
        return null == e.which && void 0 !== o && Tm.test(e.type) && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
    }

    function ve(t, e, n) {
        Im ? t.addEventListener(e, n) : t.attachEvent("on" + e, n)
    }

    function me(t, e, n) {
        Im ? t.removeEventListener(e, n) : t.detachEvent("on" + e, n)
    }

    function ye(t) {
        return 2 === t.which || 3 === t.which
    }

    function xe(t) {
        var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
        return Math.sqrt(e * e + n * n)
    }

    function _e(t) {
        return [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2]
    }

    function we(t, e, n) {
        return {
            type: t,
            event: n,
            target: e.target,
            topTarget: e.topTarget,
            cancelBubble: !1,
            offsetX: n.zrX,
            offsetY: n.zrY,
            gestureEvent: n.gestureEvent,
            pinchX: n.pinchX,
            pinchY: n.pinchY,
            pinchScale: n.pinchScale,
            wheelDelta: n.zrDelta,
            zrByTouch: n.zrByTouch,
            which: n.which,
            stop: be
        }
    }

    function be() {
        Cm(this.event)
    }

    function Me() {
    }

    function Se(t, e, n) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
            for (var i, r = t; r;) {
                if (r.clipPath && !r.clipPath.contain(e, n)) return !1;
                r.silent && (i = !0), r = r.parent
            }
            return i ? km : !0
        }
        return !1
    }

    function Ie() {
        var t = new Om(6);
        return Te(t), t
    }

    function Te(t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
    }

    function Ce(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
    }

    function Ae(t, e, n) {
        var i = e[0] * n[0] + e[2] * n[1], r = e[1] * n[0] + e[3] * n[1], a = e[0] * n[2] + e[2] * n[3],
            o = e[1] * n[2] + e[3] * n[3], s = e[0] * n[4] + e[2] * n[5] + e[4], l = e[1] * n[4] + e[3] * n[5] + e[5];
        return t[0] = i, t[1] = r, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
    }

    function De(t, e, n) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], t
    }

    function ke(t, e, n) {
        var i = e[0], r = e[2], a = e[4], o = e[1], s = e[3], l = e[5], u = Math.sin(n), h = Math.cos(n);
        return t[0] = i * h + o * u, t[1] = -i * u + o * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, t[4] = h * a + u * l, t[5] = h * l - u * a, t
    }

    function Pe(t, e, n) {
        var i = n[0], r = n[1];
        return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, t[5] = e[5] * r, t
    }

    function Le(t, e) {
        var n = e[0], i = e[2], r = e[4], a = e[1], o = e[3], s = e[5], l = n * o - a * i;
        return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * s - o * r) * l, t[5] = (a * r - n * s) * l, t) : null
    }

    function Oe(t) {
        var e = Ie();
        return Ce(e, t), e
    }

    function ze(t) {
        return t > Rm || -Rm > t
    }

    function Ee(t) {
        this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null == t.loop ? !1 : t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
    }

    function Re(t) {
        return t = Math.round(t), 0 > t ? 0 : t > 255 ? 255 : t
    }

    function Be(t) {
        return t = Math.round(t), 0 > t ? 0 : t > 360 ? 360 : t
    }

    function Ne(t) {
        return 0 > t ? 0 : t > 1 ? 1 : t
    }

    function Ve(t) {
        return Re(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
    }

    function Fe(t) {
        return Ne(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
    }

    function He(t, e, n) {
        return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t
    }

    function Ge(t, e, n) {
        return t + (e - t) * n
    }

    function We(t, e, n, i, r) {
        return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t
    }

    function Ze(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
    }

    function Xe(t, e) {
        Km && Ze(Km, e), Km = qm.put(t, Km || e.slice())
    }

    function Ye(t, e) {
        if (t) {
            e = e || [];
            var n = qm.get(t);
            if (n) return Ze(e, n);
            t += "";
            var i = t.replace(/ /g, "").toLowerCase();
            if (i in jm) return Ze(e, jm[i]), Xe(t, e), e;
            if ("#" !== i.charAt(0)) {
                var r = i.indexOf("("), a = i.indexOf(")");
                if (-1 !== r && a + 1 === i.length) {
                    var o = i.substr(0, r), s = i.substr(r + 1, a - (r + 1)).split(","), l = 1;
                    switch (o) {
                        case"rgba":
                            if (4 !== s.length) return void We(e, 0, 0, 0, 1);
                            l = Fe(s.pop());
                        case"rgb":
                            return 3 !== s.length ? void We(e, 0, 0, 0, 1) : (We(e, Ve(s[0]), Ve(s[1]), Ve(s[2]), l), Xe(t, e), e);
                        case"hsla":
                            return 4 !== s.length ? void We(e, 0, 0, 0, 1) : (s[3] = Fe(s[3]), Ue(s, e), Xe(t, e), e);
                        case"hsl":
                            return 3 !== s.length ? void We(e, 0, 0, 0, 1) : (Ue(s, e), Xe(t, e), e);
                        default:
                            return
                    }
                }
                We(e, 0, 0, 0, 1)
            } else {
                if (4 === i.length) {
                    var u = parseInt(i.substr(1), 16);
                    return u >= 0 && 4095 >= u ? (We(e, (3840 & u) >> 4 | (3840 & u) >> 8, 240 & u | (240 & u) >> 4, 15 & u | (15 & u) << 4, 1), Xe(t, e), e) : void We(e, 0, 0, 0, 1)
                }
                if (7 === i.length) {
                    var u = parseInt(i.substr(1), 16);
                    return u >= 0 && 16777215 >= u ? (We(e, (16711680 & u) >> 16, (65280 & u) >> 8, 255 & u, 1), Xe(t, e), e) : void We(e, 0, 0, 0, 1)
                }
            }
        }
    }

    function Ue(t, e) {
        var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = Fe(t[1]), r = Fe(t[2]),
            a = .5 >= r ? r * (i + 1) : r + i - r * i, o = 2 * r - a;
        return e = e || [], We(e, Re(255 * He(o, a, n + 1 / 3)), Re(255 * He(o, a, n)), Re(255 * He(o, a, n - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e
    }

    function je(t) {
        if (t) {
            var e, n, i = t[0] / 255, r = t[1] / 255, a = t[2] / 255, o = Math.min(i, r, a), s = Math.max(i, r, a),
                l = s - o, u = (s + o) / 2;
            if (0 === l) e = 0, n = 0; else {
                n = .5 > u ? l / (s + o) : l / (2 - s - o);
                var h = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, d = ((s - a) / 6 + l / 2) / l;
                i === s ? e = d - c : r === s ? e = 1 / 3 + h - d : a === s && (e = 2 / 3 + c - h), 0 > e && (e += 1), e > 1 && (e -= 1)
            }
            var f = [360 * e, n, u];
            return null != t[3] && f.push(t[3]), f
        }
    }

    function qe(t, e) {
        var n = Ye(t);
        if (n) {
            for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, n[i] > 255 ? n[i] = 255 : t[i] < 0 && (n[i] = 0);
            return en(n, 4 === n.length ? "rgba" : "rgb")
        }
    }

    function Ke(t) {
        var e = Ye(t);
        return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0
    }

    function $e(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            n = n || [];
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = e[r], s = e[a], l = i - r;
            return n[0] = Re(Ge(o[0], s[0], l)), n[1] = Re(Ge(o[1], s[1], l)), n[2] = Re(Ge(o[2], s[2], l)), n[3] = Ne(Ge(o[3], s[3], l)), n
        }
    }

    function Qe(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            var i = t * (e.length - 1), r = Math.floor(i), a = Math.ceil(i), o = Ye(e[r]), s = Ye(e[a]), l = i - r,
                u = en([Re(Ge(o[0], s[0], l)), Re(Ge(o[1], s[1], l)), Re(Ge(o[2], s[2], l)), Ne(Ge(o[3], s[3], l))], "rgba");
            return n ? {color: u, leftIndex: r, rightIndex: a, value: i} : u
        }
    }

    function Je(t, e, n, i) {
        return t = Ye(t), t ? (t = je(t), null != e && (t[0] = Be(e)), null != n && (t[1] = Fe(n)), null != i && (t[2] = Fe(i)), en(Ue(t), "rgba")) : void 0
    }

    function tn(t, e) {
        return t = Ye(t), t && null != e ? (t[3] = Ne(e), en(t, "rgba")) : void 0
    }

    function en(t, e) {
        if (t && t.length) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")"
        }
    }

    function nn(t, e) {
        return t[e]
    }

    function rn(t, e, n) {
        t[e] = n
    }

    function an(t, e, n) {
        return (e - t) * n + t
    }

    function on(t, e, n) {
        return n > .5 ? e : t
    }

    function sn(t, e, n, i, r) {
        var a = t.length;
        if (1 === r) for (var o = 0; a > o; o++) i[o] = an(t[o], e[o], n); else for (var s = a && t[0].length, o = 0; a > o; o++) for (var l = 0; s > l; l++) i[o][l] = an(t[o][l], e[o][l], n)
    }

    function ln(t, e, n) {
        var i = t.length, r = e.length;
        if (i !== r) {
            var a = i > r;
            if (a) t.length = r; else for (var o = i; r > o; o++) t.push(1 === n ? e[o] : ty.call(e[o]))
        }
        for (var s = t[0] && t[0].length, o = 0; o < t.length; o++) if (1 === n) isNaN(t[o]) && (t[o] = e[o]); else for (var l = 0; s > l; l++) isNaN(t[o][l]) && (t[o][l] = e[o][l])
    }

    function un(t, e, n) {
        if (t === e) return !0;
        var i = t.length;
        if (i !== e.length) return !1;
        if (1 === n) {
            for (var r = 0; i > r; r++) if (t[r] !== e[r]) return !1
        } else for (var a = t[0].length, r = 0; i > r; r++) for (var o = 0; a > o; o++) if (t[r][o] !== e[r][o]) return !1;
        return !0
    }

    function hn(t, e, n, i, r, a, o, s, l) {
        var u = t.length;
        if (1 === l) for (var h = 0; u > h; h++) s[h] = cn(t[h], e[h], n[h], i[h], r, a, o); else for (var c = t[0].length, h = 0; u > h; h++) for (var d = 0; c > d; d++) s[h][d] = cn(t[h][d], e[h][d], n[h][d], i[h][d], r, a, o)
    }

    function cn(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
    }

    function dn(t) {
        if (d(t)) {
            var e = t.length;
            if (d(t[0])) {
                for (var n = [], i = 0; e > i; i++) n.push(ty.call(t[i]));
                return n
            }
            return ty.call(t)
        }
        return t
    }

    function fn(t) {
        return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
    }

    function pn(t) {
        var e = t[t.length - 1].value;
        return d(e && e[0]) ? 2 : 1
    }

    function gn(t, e, n, i, r, a) {
        var o = t._getter, s = t._setter, l = "spline" === e, u = i.length;
        if (u) {
            var h, c = i[0].value, f = d(c), p = !1, g = !1, v = f ? pn(i) : 0;
            i.sort(function (t, e) {
                return t.time - e.time
            }), h = i[u - 1].time;
            for (var m = [], y = [], x = i[0].value, _ = !0, w = 0; u > w; w++) {
                m.push(i[w].time / h);
                var b = i[w].value;
                if (f && un(b, x, v) || !f && b === x || (_ = !1), x = b, "string" == typeof b) {
                    var M = Ye(b);
                    M ? (b = M, p = !0) : g = !0
                }
                y.push(b)
            }
            if (a || !_) {
                for (var S = y[u - 1], w = 0; u - 1 > w; w++) f ? ln(y[w], S, v) : !isNaN(y[w]) || isNaN(S) || g || p || (y[w] = S);
                f && ln(o(t._target, r), S, v);
                var I, T, C, A, D, k, P = 0, L = 0;
                if (p) var O = [0, 0, 0, 0];
                var z = function (t, e) {
                    var n;
                    if (0 > e) n = 0; else if (L > e) {
                        for (I = Math.min(P + 1, u - 1), n = I; n >= 0 && !(m[n] <= e); n--) ;
                        n = Math.min(n, u - 2)
                    } else {
                        for (n = P; u > n && !(m[n] > e); n++) ;
                        n = Math.min(n - 1, u - 2)
                    }
                    P = n, L = e;
                    var i = m[n + 1] - m[n];
                    if (0 !== i) if (T = (e - m[n]) / i, l) if (A = y[n], C = y[0 === n ? n : n - 1], D = y[n > u - 2 ? u - 1 : n + 1], k = y[n > u - 3 ? u - 1 : n + 2], f) hn(C, A, D, k, T, T * T, T * T * T, o(t, r), v); else {
                        var a;
                        if (p) a = hn(C, A, D, k, T, T * T, T * T * T, O, 1), a = fn(O); else {
                            if (g) return on(A, D, T);
                            a = cn(C, A, D, k, T, T * T, T * T * T)
                        }
                        s(t, r, a)
                    } else if (f) sn(y[n], y[n + 1], T, o(t, r), v); else {
                        var a;
                        if (p) sn(y[n], y[n + 1], T, O, 1), a = fn(O); else {
                            if (g) return on(y[n], y[n + 1], T);
                            a = an(y[n], y[n + 1], T)
                        }
                        s(t, r, a)
                    }
                }, E = new Ee({target: t._target, life: h, loop: t._loop, delay: t._delay, onframe: z, ondestroy: n});
                return e && "spline" !== e && (E.easing = e), E
            }
        }
    }

    function vn(t, e, n, i, r, a, o, s) {
        function l() {
            h--, h || a && a()
        }

        b(i) ? (a = r, r = i, i = 0) : w(r) ? (a = r, r = "linear", i = 0) : w(i) ? (a = i, i = 0) : w(n) ? (a = n, n = 500) : n || (n = 500), t.stopAnimation(), mn(t, "", t, e, n, i, s);
        var u = t.animators.slice(), h = u.length;
        h || a && a();
        for (var c = 0; c < u.length; c++) u[c].done(l).start(r, o)
    }

    function mn(t, e, n, i, r, a, o) {
        var s = {}, l = 0;
        for (var u in i) i.hasOwnProperty(u) && (null != n[u] ? M(i[u]) && !d(i[u]) ? mn(t, e ? e + "." + u : u, n[u], i[u], r, a, o) : (o ? (s[u] = n[u], yn(t, e, u, i[u])) : s[u] = i[u], l++) : null == i[u] || o || yn(t, e, u, i[u]));
        l > 0 && t.animate(e, !1).when(null == r ? 500 : r, s).delay(a || 0)
    }

    function yn(t, e, n, i) {
        if (e) {
            var r = {};
            r[e] = {}, r[e][n] = i, t.attr(r)
        } else t.attr(n, i)
    }

    function xn(t, e, n, i) {
        0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, this.height = i
    }

    function _n(t) {
        for (var e = 0; t >= fy;) e |= 1 & t, t >>= 1;
        return t + e
    }

    function wn(t, e, n, i) {
        var r = e + 1;
        if (r === n) return 1;
        if (i(t[r++], t[e]) < 0) {
            for (; n > r && i(t[r], t[r - 1]) < 0;) r++;
            bn(t, e, r)
        } else for (; n > r && i(t[r], t[r - 1]) >= 0;) r++;
        return r - e
    }

    function bn(t, e, n) {
        for (n--; n > e;) {
            var i = t[e];
            t[e++] = t[n], t[n--] = i
        }
    }

    function Mn(t, e, n, i, r) {
        for (i === e && i++; n > i; i++) {
            for (var a, o = t[i], s = e, l = i; l > s;) a = s + l >>> 1, r(o, t[a]) < 0 ? l = a : s = a + 1;
            var u = i - s;
            switch (u) {
                case 3:
                    t[s + 3] = t[s + 2];
                case 2:
                    t[s + 2] = t[s + 1];
                case 1:
                    t[s + 1] = t[s];
                    break;
                default:
                    for (; u > 0;) t[s + u] = t[s + u - 1], u--
            }
            t[s] = o
        }
    }

    function Sn(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) > 0) {
            for (s = i - r; s > l && a(t, e[n + r + l]) > 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
            l > s && (l = s), o += r, l += r
        } else {
            for (s = r + 1; s > l && a(t, e[n + r - l]) <= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
            l > s && (l = s);
            var u = o;
            o = r - l, l = r - u
        }
        for (o++; l > o;) {
            var h = o + (l - o >>> 1);
            a(t, e[n + h]) > 0 ? o = h + 1 : l = h
        }
        return l
    }

    function In(t, e, n, i, r, a) {
        var o = 0, s = 0, l = 1;
        if (a(t, e[n + r]) < 0) {
            for (s = r + 1; s > l && a(t, e[n + r - l]) < 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
            l > s && (l = s);
            var u = o;
            o = r - l, l = r - u
        } else {
            for (s = i - r; s > l && a(t, e[n + r + l]) >= 0;) o = l, l = (l << 1) + 1, 0 >= l && (l = s);
            l > s && (l = s), o += r, l += r
        }
        for (o++; l > o;) {
            var h = o + (l - o >>> 1);
            a(t, e[n + h]) < 0 ? l = h : o = h + 1
        }
        return l
    }

    function Tn(t, e) {
        function n(t, e) {
            l[c] = t, u[c] = e, c += 1
        }

        function i() {
            for (; c > 1;) {
                var t = c - 2;
                if (t >= 1 && u[t - 1] <= u[t] + u[t + 1] || t >= 2 && u[t - 2] <= u[t] + u[t - 1]) u[t - 1] < u[t + 1] && t--; else if (u[t] > u[t + 1]) break;
                a(t)
            }
        }

        function r() {
            for (; c > 1;) {
                var t = c - 2;
                t > 0 && u[t - 1] < u[t + 1] && t--, a(t)
            }
        }

        function a(n) {
            var i = l[n], r = u[n], a = l[n + 1], h = u[n + 1];
            u[n] = r + h, n === c - 3 && (l[n + 1] = l[n + 2], u[n + 1] = u[n + 2]), c--;
            var d = In(t[a], t, i, r, 0, e);
            i += d, r -= d, 0 !== r && (h = Sn(t[i + r - 1], t, a, h, h - 1, e), 0 !== h && (h >= r ? o(i, r, a, h) : s(i, r, a, h)))
        }

        function o(n, i, r, a) {
            var o = 0;
            for (o = 0; i > o; o++) d[o] = t[n + o];
            var s = 0, l = r, u = n;
            if (t[u++] = t[l++], 0 !== --a) {
                if (1 === i) {
                    for (o = 0; a > o; o++) t[u + o] = t[l + o];
                    return void (t[u + a] = d[s])
                }
                for (var c, f, p, g = h; ;) {
                    c = 0, f = 0, p = !1;
                    do if (e(t[l], d[s]) < 0) {
                        if (t[u++] = t[l++], f++, c = 0, 0 === --a) {
                            p = !0;
                            break
                        }
                    } else if (t[u++] = d[s++], c++, f = 0, 1 === --i) {
                        p = !0;
                        break
                    } while (g > (c | f));
                    if (p) break;
                    do {
                        if (c = In(t[l], d, s, i, 0, e), 0 !== c) {
                            for (o = 0; c > o; o++) t[u + o] = d[s + o];
                            if (u += c, s += c, i -= c, 1 >= i) {
                                p = !0;
                                break
                            }
                        }
                        if (t[u++] = t[l++], 0 === --a) {
                            p = !0;
                            break
                        }
                        if (f = Sn(d[s], t, l, a, 0, e), 0 !== f) {
                            for (o = 0; f > o; o++) t[u + o] = t[l + o];
                            if (u += f, l += f, a -= f, 0 === a) {
                                p = !0;
                                break
                            }
                        }
                        if (t[u++] = d[s++], 1 === --i) {
                            p = !0;
                            break
                        }
                        g--
                    } while (c >= py || f >= py);
                    if (p) break;
                    0 > g && (g = 0), g += 2
                }
                if (h = g, 1 > h && (h = 1), 1 === i) {
                    for (o = 0; a > o; o++) t[u + o] = t[l + o];
                    t[u + a] = d[s]
                } else {
                    if (0 === i) throw new Error;
                    for (o = 0; i > o; o++) t[u + o] = d[s + o]
                }
            } else for (o = 0; i > o; o++) t[u + o] = d[s + o]
        }

        function s(n, i, r, a) {
            var o = 0;
            for (o = 0; a > o; o++) d[o] = t[r + o];
            var s = n + i - 1, l = a - 1, u = r + a - 1, c = 0, f = 0;
            if (t[u--] = t[s--], 0 !== --i) {
                if (1 === a) {
                    for (u -= i, s -= i, f = u + 1, c = s + 1, o = i - 1; o >= 0; o--) t[f + o] = t[c + o];
                    return void (t[u] = d[l])
                }
                for (var p = h; ;) {
                    var g = 0, v = 0, m = !1;
                    do if (e(d[l], t[s]) < 0) {
                        if (t[u--] = t[s--], g++, v = 0, 0 === --i) {
                            m = !0;
                            break
                        }
                    } else if (t[u--] = d[l--], v++, g = 0, 1 === --a) {
                        m = !0;
                        break
                    } while (p > (g | v));
                    if (m) break;
                    do {
                        if (g = i - In(d[l], t, n, i, i - 1, e), 0 !== g) {
                            for (u -= g, s -= g, i -= g, f = u + 1, c = s + 1, o = g - 1; o >= 0; o--) t[f + o] = t[c + o];
                            if (0 === i) {
                                m = !0;
                                break
                            }
                        }
                        if (t[u--] = d[l--], 1 === --a) {
                            m = !0;
                            break
                        }
                        if (v = a - Sn(t[s], d, 0, a, a - 1, e), 0 !== v) {
                            for (u -= v, l -= v, a -= v, f = u + 1, c = l + 1, o = 0; v > o; o++) t[f + o] = d[c + o];
                            if (1 >= a) {
                                m = !0;
                                break
                            }
                        }
                        if (t[u--] = t[s--], 0 === --i) {
                            m = !0;
                            break
                        }
                        p--
                    } while (g >= py || v >= py);
                    if (m) break;
                    0 > p && (p = 0), p += 2
                }
                if (h = p, 1 > h && (h = 1), 1 === a) {
                    for (u -= i, s -= i, f = u + 1, c = s + 1, o = i - 1; o >= 0; o--) t[f + o] = t[c + o];
                    t[u] = d[l]
                } else {
                    if (0 === a) throw new Error;
                    for (c = u - (a - 1), o = 0; a > o; o++) t[c + o] = d[o]
                }
            } else for (c = u - (a - 1), o = 0; a > o; o++) t[c + o] = d[o]
        }

        var l, u, h = py, c = 0, d = [];
        l = [], u = [], this.mergeRuns = i, this.forceMergeRuns = r, this.pushRun = n
    }

    function Cn(t, e, n, i) {
        n || (n = 0), i || (i = t.length);
        var r = i - n;
        if (!(2 > r)) {
            var a = 0;
            if (fy > r) return a = wn(t, n, i, e), void Mn(t, n, i, n + a, e);
            var o = new Tn(t, e), s = _n(r);
            do {
                if (a = wn(t, n, i, e), s > a) {
                    var l = r;
                    l > s && (l = s), Mn(t, n, n + l, n + a, e), a = l
                }
                o.pushRun(n, a), o.mergeRuns(), r -= a, n += a
            } while (0 !== r);
            o.forceMergeRuns()
        }
    }

    function An(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel
    }

    function Dn(t, e, n) {
        var i = null == e.x ? 0 : e.x, r = null == e.x2 ? 1 : e.x2, a = null == e.y ? 0 : e.y,
            o = null == e.y2 ? 0 : e.y2;
        e.global || (i = i * n.width + n.x, r = r * n.width + n.x, a = a * n.height + n.y, o = o * n.height + n.y), i = isNaN(i) ? 0 : i, r = isNaN(r) ? 1 : r, a = isNaN(a) ? 0 : a, o = isNaN(o) ? 0 : o;
        var s = t.createLinearGradient(i, a, r, o);
        return s
    }

    function kn(t, e, n) {
        var i = n.width, r = n.height, a = Math.min(i, r), o = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y,
            l = null == e.r ? .5 : e.r;
        e.global || (o = o * i + n.x, s = s * r + n.y, l *= a);
        var u = t.createRadialGradient(o, s, 0, o, s, l);
        return u
    }

    function Pn() {
        return !1
    }

    function Ln(t, e, n) {
        var i = fm(), r = e.getWidth(), a = e.getHeight(), o = i.style;
        return o && (o.position = "absolute", o.left = 0, o.top = 0, o.width = r + "px", o.height = a + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = a * n, i
    }

    function On(t) {
        if ("string" == typeof t) {
            var e = Ay.get(t);
            return e && e.image
        }
        return t
    }

    function zn(t, e, n, i, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !n) return e;
                var a = Ay.get(t), o = {hostEl: n, cb: i, cbPayload: r};
                return a ? (e = a.image, !Rn(e) && a.pending.push(o)) : (e = new Image, e.onload = e.onerror = En, Ay.put(t, e.__cachedImgObj = {
                    image: e,
                    pending: [o]
                }), e.src = e.__zrImageSrc = t), e
            }
            return t
        }
        return e
    }

    function En() {
        var t = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
            var n = t.pending[e], i = n.cb;
            i && i(this, n.cbPayload), n.hostEl.dirty()
        }
        t.pending.length = 0
    }

    function Rn(t) {
        return t && t.width && t.height
    }

    function Bn(t, e) {
        e = e || Oy;
        var n = t + ":" + e;
        if (Dy[n]) return Dy[n];
        for (var i = (t + "").split("\n"), r = 0, a = 0, o = i.length; o > a; a++) r = Math.max(qn(i[a], e).width, r);
        return ky > Py && (ky = 0, Dy = {}), ky++, Dy[n] = r, r
    }

    function Nn(t, e, n, i, r, a, o, s) {
        return o ? Fn(t, e, n, i, r, a, o, s) : Vn(t, e, n, i, r, a, s)
    }

    function Vn(t, e, n, i, r, a, o) {
        var s = Kn(t, e, r, a, o), l = Bn(t, e);
        r && (l += r[1] + r[3]);
        var u = s.outerHeight, h = Hn(0, l, n), c = Gn(0, u, i), d = new xn(h, c, l, u);
        return d.lineHeight = s.lineHeight, d
    }

    function Fn(t, e, n, i, r, a, o, s) {
        var l = $n(t, {rich: o, truncate: s, font: e, textAlign: n, textPadding: r, textLineHeight: a}),
            u = l.outerWidth, h = l.outerHeight, c = Hn(0, u, n), d = Gn(0, h, i);
        return new xn(c, d, u, h)
    }

    function Hn(t, e, n) {
        return "right" === n ? t -= e : "center" === n && (t -= e / 2), t
    }

    function Gn(t, e, n) {
        return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t
    }

    function Wn(t, e, n) {
        var i = e.x, r = e.y, a = e.height, o = e.width, s = a / 2, l = "left", u = "top";
        switch (t) {
            case"left":
                i -= n, r += s, l = "right", u = "middle";
                break;
            case"right":
                i += n + o, r += s, u = "middle";
                break;
            case"top":
                i += o / 2, r -= n, l = "center", u = "bottom";
                break;
            case"bottom":
                i += o / 2, r += a + n, l = "center";
                break;
            case"inside":
                i += o / 2, r += s, l = "center", u = "middle";
                break;
            case"insideLeft":
                i += n, r += s, u = "middle";
                break;
            case"insideRight":
                i += o - n, r += s, l = "right", u = "middle";
                break;
            case"insideTop":
                i += o / 2, r += n, l = "center";
                break;
            case"insideBottom":
                i += o / 2, r += a - n, l = "center", u = "bottom";
                break;
            case"insideTopLeft":
                i += n, r += n;
                break;
            case"insideTopRight":
                i += o - n, r += n, l = "right";
                break;
            case"insideBottomLeft":
                i += n, r += a - n, u = "bottom";
                break;
            case"insideBottomRight":
                i += o - n, r += a - n, l = "right", u = "bottom"
        }
        return {x: i, y: r, textAlign: l, textVerticalAlign: u}
    }

    function Zn(t, e, n, i, r) {
        if (!e) return "";
        var a = (t + "").split("\n");
        r = Xn(e, n, i, r);
        for (var o = 0, s = a.length; s > o; o++) a[o] = Yn(a[o], r);
        return a.join("\n")
    }

    function Xn(t, e, n, i) {
        i = o({}, i), i.font = e;
        var n = D(n, "...");
        i.maxIterations = D(i.maxIterations, 2);
        var r = i.minChar = D(i.minChar, 0);
        i.cnCharWidth = Bn("国", e);
        var a = i.ascCharWidth = Bn("a", e);
        i.placeholder = D(i.placeholder, "");
        for (var s = t = Math.max(0, t - 1), l = 0; r > l && s >= a; l++) s -= a;
        var u = Bn(n, e);
        return u > s && (n = "", u = 0), s = t - u, i.ellipsis = n, i.ellipsisWidth = u, i.contentWidth = s, i.containerWidth = t, i
    }

    function Yn(t, e) {
        var n = e.containerWidth, i = e.font, r = e.contentWidth;
        if (!n) return "";
        var a = Bn(t, i);
        if (n >= a) return t;
        for (var o = 0; ; o++) {
            if (r >= a || o >= e.maxIterations) {
                t += e.ellipsis;
                break
            }
            var s = 0 === o ? Un(t, r, e.ascCharWidth, e.cnCharWidth) : a > 0 ? Math.floor(t.length * r / a) : 0;
            t = t.substr(0, s), a = Bn(t, i)
        }
        return "" === t && (t = e.placeholder), t
    }

    function Un(t, e, n, i) {
        for (var r = 0, a = 0, o = t.length; o > a && e > r; a++) {
            var s = t.charCodeAt(a);
            r += s >= 0 && 127 >= s ? n : i
        }
        return a
    }

    function jn(t) {
        return Bn("国", t)
    }

    function qn(t, e) {
        return zy.measureText(t, e)
    }

    function Kn(t, e, n, i, r) {
        null != t && (t += "");
        var a = D(i, jn(e)), o = t ? t.split("\n") : [], s = o.length * a, l = s;
        if (n && (l += n[0] + n[2]), t && r) {
            var u = r.outerHeight, h = r.outerWidth;
            if (null != u && l > u) t = "", o = []; else if (null != h) for (var c = Xn(h - (n ? n[1] + n[3] : 0), e, r.ellipsis, {
                minChar: r.minChar,
                placeholder: r.placeholder
            }), d = 0, f = o.length; f > d; d++) o[d] = Yn(o[d], c)
        }
        return {lines: o, height: s, outerHeight: l, lineHeight: a}
    }

    function $n(t, e) {
        var n = {lines: [], width: 0, height: 0};
        if (null != t && (t += ""), !t) return n;
        for (var i, r = Ly.lastIndex = 0; null != (i = Ly.exec(t));) {
            var a = i.index;
            a > r && Qn(n, t.substring(r, a)), Qn(n, i[2], i[1]), r = Ly.lastIndex
        }
        r < t.length && Qn(n, t.substring(r, t.length));
        var o = n.lines, s = 0, l = 0, u = [], h = e.textPadding, c = e.truncate, d = c && c.outerWidth,
            f = c && c.outerHeight;
        h && (null != d && (d -= h[1] + h[3]), null != f && (f -= h[0] + h[2]));
        for (var p = 0; p < o.length; p++) {
            for (var g = o[p], v = 0, m = 0, y = 0; y < g.tokens.length; y++) {
                var x = g.tokens[y], _ = x.styleName && e.rich[x.styleName] || {}, w = x.textPadding = _.textPadding,
                    b = x.font = _.font || e.font, M = x.textHeight = D(_.textHeight, jn(b));
                if (w && (M += w[0] + w[2]), x.height = M, x.lineHeight = k(_.textLineHeight, e.textLineHeight, M), x.textAlign = _ && _.textAlign || e.textAlign, x.textVerticalAlign = _ && _.textVerticalAlign || "middle", null != f && s + x.lineHeight > f) return {
                    lines: [],
                    width: 0,
                    height: 0
                };
                x.textWidth = Bn(x.text, b);
                var S = _.textWidth, I = null == S || "auto" === S;
                if ("string" == typeof S && "%" === S.charAt(S.length - 1)) x.percentWidth = S, u.push(x), S = 0; else {
                    if (I) {
                        S = x.textWidth;
                        var T = _.textBackgroundColor, C = T && T.image;
                        C && (C = On(C), Rn(C) && (S = Math.max(S, C.width * M / C.height)))
                    }
                    var A = w ? w[1] + w[3] : 0;
                    S += A;
                    var P = null != d ? d - m : null;
                    null != P && S > P && (!I || A > P ? (x.text = "", x.textWidth = S = 0) : (x.text = Zn(x.text, P - A, b, c.ellipsis, {minChar: c.minChar}), x.textWidth = Bn(x.text, b), S = x.textWidth + A))
                }
                m += x.width = S, _ && (v = Math.max(v, x.lineHeight))
            }
            g.width = m, g.lineHeight = v, s += v, l = Math.max(l, m)
        }
        n.outerWidth = n.width = D(e.textWidth, l), n.outerHeight = n.height = D(e.textHeight, s), h && (n.outerWidth += h[1] + h[3], n.outerHeight += h[0] + h[2]);
        for (var p = 0; p < u.length; p++) {
            var x = u[p], L = x.percentWidth;
            x.width = parseInt(L, 10) / 100 * l
        }
        return n
    }

    function Qn(t, e, n) {
        for (var i = "" === e, r = e.split("\n"), a = t.lines, o = 0; o < r.length; o++) {
            var s = r[o], l = {styleName: n, text: s, isLineHolder: !s && !i};
            if (o) a.push({tokens: [l]}); else {
                var u = (a[a.length - 1] || (a[0] = {tokens: []})).tokens, h = u.length;
                1 === h && u[0].isLineHolder ? u[0] = l : (s || !h || i) && u.push(l)
            }
        }
    }

    function Jn(t) {
        var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
        return e && z(e) || t.textFont || t.font
    }

    function ti(t, e) {
        var n, i, r, a, o = e.x, s = e.y, l = e.width, u = e.height, h = e.r;
        0 > l && (o += l, l = -l), 0 > u && (s += u, u = -u), "number" == typeof h ? n = i = r = a = h : h instanceof Array ? 1 === h.length ? n = i = r = a = h[0] : 2 === h.length ? (n = r = h[0], i = a = h[1]) : 3 === h.length ? (n = h[0], i = a = h[1], r = h[2]) : (n = h[0], i = h[1], r = h[2], a = h[3]) : n = i = r = a = 0;
        var c;
        n + i > l && (c = n + i, n *= l / c, i *= l / c), r + a > l && (c = r + a, r *= l / c, a *= l / c), i + r > u && (c = i + r, i *= u / c, r *= u / c), n + a > u && (c = n + a, n *= u / c, a *= u / c), t.moveTo(o + n, s), t.lineTo(o + l - i, s), 0 !== i && t.arc(o + l - i, s + i, i, -Math.PI / 2, 0), t.lineTo(o + l, s + u - r), 0 !== r && t.arc(o + l - r, s + u - r, r, 0, Math.PI / 2), t.lineTo(o + a, s + u), 0 !== a && t.arc(o + a, s + u - a, a, Math.PI / 2, Math.PI), t.lineTo(o, s + n), 0 !== n && t.arc(o + n, s + n, n, Math.PI, 1.5 * Math.PI)
    }

    function ei(t) {
        return ni(t), f(t.rich, ni), t
    }

    function ni(t) {
        if (t) {
            t.font = Jn(t);
            var e = t.textAlign;
            "middle" === e && (e = "center"), t.textAlign = null == e || Ry[e] ? e : "left";
            var n = t.textVerticalAlign || t.textBaseline;
            "center" === n && (n = "middle"), t.textVerticalAlign = null == n || By[n] ? n : "top";
            var i = t.textPadding;
            i && (t.textPadding = L(t.textPadding))
        }
    }

    function ii(t, e, n, i, r, a) {
        i.rich ? ai(t, e, n, i, r, a) : ri(t, e, n, i, r, a)
    }

    function ri(t, e, n, i, r, a) {
        var o, s = ui(i), l = !1, u = e.__attrCachedBy === yy.PLAIN_TEXT;
        a !== xy ? (a && (o = a.style, l = !s && u && o), e.__attrCachedBy = s ? yy.NONE : yy.PLAIN_TEXT) : u && (e.__attrCachedBy = yy.NONE);
        var h = i.font || Ey;
        l && h === (o.font || Ey) || (e.font = h);
        var c = t.__computedFont;
        t.__styleFont !== h && (t.__styleFont = h, c = t.__computedFont = e.font);
        var d = i.textPadding, f = i.textLineHeight, p = t.__textCotentBlock;
        (!p || t.__dirtyText) && (p = t.__textCotentBlock = Kn(n, c, d, f, i.truncate));
        var g = p.outerHeight, v = p.lines, m = p.lineHeight, y = di(g, i, r), x = y.baseX, _ = y.baseY,
            w = y.textAlign || "left", b = y.textVerticalAlign;
        si(e, i, r, x, _);
        var M = Gn(_, g, b), S = x, I = M;
        if (s || d) {
            var T = Bn(n, c), C = T;
            d && (C += d[1] + d[3]);
            var A = Hn(x, C, w);
            s && hi(t, e, i, A, M, C, g), d && (S = mi(x, w, d), I += d[0])
        }
        e.textAlign = w, e.textBaseline = "middle", e.globalAlpha = i.opacity || 1;
        for (var D = 0; D < Ny.length; D++) {
            var k = Ny[D], P = k[0], L = k[1], O = i[P];
            l && O === o[P] || (e[L] = my(e, L, O || k[2]))
        }
        I += m / 2;
        var z = i.textStrokeWidth, E = l ? o.textStrokeWidth : null, R = !l || z !== E,
            B = !l || R || i.textStroke !== o.textStroke, N = pi(i.textStroke, z), V = gi(i.textFill);
        if (N && (R && (e.lineWidth = z), B && (e.strokeStyle = N)), V && (l && i.textFill === o.textFill || (e.fillStyle = V)), 1 === v.length) N && e.strokeText(v[0], S, I), V && e.fillText(v[0], S, I); else for (var D = 0; D < v.length; D++) N && e.strokeText(v[D], S, I), V && e.fillText(v[D], S, I), I += m
    }

    function ai(t, e, n, i, r, a) {
        a !== xy && (e.__attrCachedBy = yy.NONE);
        var o = t.__textCotentBlock;
        (!o || t.__dirtyText) && (o = t.__textCotentBlock = $n(n, i)), oi(t, e, o, i, r)
    }

    function oi(t, e, n, i, r) {
        var a = n.width, o = n.outerWidth, s = n.outerHeight, l = i.textPadding, u = di(s, i, r), h = u.baseX,
            c = u.baseY, d = u.textAlign, f = u.textVerticalAlign;
        si(e, i, r, h, c);
        var p = Hn(h, o, d), g = Gn(c, s, f), v = p, m = g;
        l && (v += l[3], m += l[0]);
        var y = v + a;
        ui(i) && hi(t, e, i, p, g, o, s);
        for (var x = 0; x < n.lines.length; x++) {
            for (var _, w = n.lines[x], b = w.tokens, M = b.length, S = w.lineHeight, I = w.width, T = 0, C = v, A = y, D = M - 1; M > T && (_ = b[T], !_.textAlign || "left" === _.textAlign);) li(t, e, _, i, S, m, C, "left"), I -= _.width, C += _.width, T++;
            for (; D >= 0 && (_ = b[D], "right" === _.textAlign);) li(t, e, _, i, S, m, A, "right"), I -= _.width, A -= _.width, D--;
            for (C += (a - (C - v) - (y - A) - I) / 2; D >= T;) _ = b[T], li(t, e, _, i, S, m, C + _.width / 2, "center"), C += _.width, T++;
            m += S
        }
    }

    function si(t, e, n, i, r) {
        if (n && e.textRotation) {
            var a = e.textOrigin;
            "center" === a ? (i = n.width / 2 + n.x, r = n.height / 2 + n.y) : a && (i = a[0] + n.x, r = a[1] + n.y), t.translate(i, r), t.rotate(-e.textRotation), t.translate(-i, -r)
        }
    }

    function li(t, e, n, i, r, a, o, s) {
        var l = i.rich[n.styleName] || {};
        l.text = n.text;
        var u = n.textVerticalAlign, h = a + r / 2;
        "top" === u ? h = a + n.height / 2 : "bottom" === u && (h = a + r - n.height / 2), !n.isLineHolder && ui(l) && hi(t, e, l, "right" === s ? o - n.width : "center" === s ? o - n.width / 2 : o, h - n.height / 2, n.width, n.height);
        var c = n.textPadding;
        c && (o = mi(o, s, c), h -= n.height / 2 - c[2] - n.textHeight / 2), fi(e, "shadowBlur", k(l.textShadowBlur, i.textShadowBlur, 0)), fi(e, "shadowColor", l.textShadowColor || i.textShadowColor || "transparent"), fi(e, "shadowOffsetX", k(l.textShadowOffsetX, i.textShadowOffsetX, 0)), fi(e, "shadowOffsetY", k(l.textShadowOffsetY, i.textShadowOffsetY, 0)), fi(e, "textAlign", s), fi(e, "textBaseline", "middle"), fi(e, "font", n.font || Ey);
        var d = pi(l.textStroke || i.textStroke, p), f = gi(l.textFill || i.textFill),
            p = D(l.textStrokeWidth, i.textStrokeWidth);
        d && (fi(e, "lineWidth", p), fi(e, "strokeStyle", d), e.strokeText(n.text, o, h)), f && (fi(e, "fillStyle", f), e.fillText(n.text, o, h))
    }

    function ui(t) {
        return !!(t.textBackgroundColor || t.textBorderWidth && t.textBorderColor)
    }

    function hi(t, e, n, i, r, a, o) {
        var s = n.textBackgroundColor, l = n.textBorderWidth, u = n.textBorderColor, h = b(s);
        if (fi(e, "shadowBlur", n.textBoxShadowBlur || 0), fi(e, "shadowColor", n.textBoxShadowColor || "transparent"), fi(e, "shadowOffsetX", n.textBoxShadowOffsetX || 0), fi(e, "shadowOffsetY", n.textBoxShadowOffsetY || 0), h || l && u) {
            e.beginPath();
            var c = n.textBorderRadius;
            c ? ti(e, {x: i, y: r, width: a, height: o, r: c}) : e.rect(i, r, a, o), e.closePath()
        }
        if (h) if (fi(e, "fillStyle", s), null != n.fillOpacity) {
            var d = e.globalAlpha;
            e.globalAlpha = n.fillOpacity * n.opacity, e.fill(), e.globalAlpha = d
        } else e.fill(); else if (M(s)) {
            var f = s.image;
            f = zn(f, null, t, ci, s), f && Rn(f) && e.drawImage(f, i, r, a, o)
        }
        if (l && u) if (fi(e, "lineWidth", l), fi(e, "strokeStyle", u), null != n.strokeOpacity) {
            var d = e.globalAlpha;
            e.globalAlpha = n.strokeOpacity * n.opacity, e.stroke(), e.globalAlpha = d
        } else e.stroke()
    }

    function ci(t, e) {
        e.image = t
    }

    function di(t, e, n) {
        var i = e.x || 0, r = e.y || 0, a = e.textAlign, o = e.textVerticalAlign;
        if (n) {
            var s = e.textPosition;
            if (s instanceof Array) i = n.x + vi(s[0], n.width), r = n.y + vi(s[1], n.height); else {
                var l = Wn(s, n, e.textDistance);
                i = l.x, r = l.y, a = a || l.textAlign, o = o || l.textVerticalAlign
            }
            var u = e.textOffset;
            u && (i += u[0], r += u[1])
        }
        return {baseX: i, baseY: r, textAlign: a, textVerticalAlign: o}
    }

    function fi(t, e, n) {
        return t[e] = my(t, e, n), t[e]
    }

    function pi(t, e) {
        return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
    }

    function gi(t) {
        return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
    }

    function vi(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
    }

    function mi(t, e, n) {
        return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3]
    }

    function yi(t, e) {
        return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
    }

    function xi(t) {
        t = t || {}, ly.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
        this.style = new wy(t.style, this), this._rect = null, this.__clipPaths = []
    }

    function _i(t) {
        xi.call(this, t)
    }

    function wi(t) {
        return parseInt(t, 10)
    }

    function bi(t) {
        return t ? t.__builtin__ ? !0 : "function" != typeof t.resize || "function" != typeof t.refresh ? !1 : !0 : !1
    }

    function Mi(t, e, n) {
        return Xy.copy(t.getBoundingRect()), t.transform && Xy.applyTransform(t.transform), Yy.width = e, Yy.height = n, !Xy.intersect(Yy)
    }

    function Si(t, e) {
        if (t === e) return !1;
        if (!t || !e || t.length !== e.length) return !0;
        for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0
    }

    function Ii(t, e) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.setTransform(e), e.beginPath(), i.buildPath(e, i.shape), e.clip(), i.restoreTransform(e)
        }
    }

    function Ti(t, e) {
        var n = document.createElement("div");
        return n.style.cssText = ["position:relative", "overflow:hidden", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0"].join(";") + ";", n
    }

    function Ci(t) {
        return "mousewheel" === t && nm.browser.firefox ? "DOMMouseScroll" : t
    }

    function Ai(t) {
        t._touching = !0, clearTimeout(t._touchTimer), t._touchTimer = setTimeout(function () {
            t._touching = !1
        }, 700)
    }

    function Di(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e
    }

    function ki(t) {
        function e(t, e) {
            return function () {
                return e._touching ? void 0 : t.apply(e, arguments)
            }
        }

        f($y, function (e) {
            t._handlers[e] = y(tx[e], t)
        }), f(Jy, function (e) {
            t._handlers[e] = y(tx[e], t)
        }), f(Ky, function (n) {
            t._handlers[n] = e(tx[n], t)
        })
    }

    function Pi(t) {
        function e(e, n) {
            f(e, function (e) {
                ve(t, Ci(e), n._handlers[e])
            }, n)
        }

        Sm.call(this), this.dom = t, this._touching = !1, this._touchTimer, this._handlers = {}, ki(this), nm.pointerEventsSupported ? e(Jy, this) : (nm.touchEventsSupported && e($y, this), e(Ky, this))
    }

    function Li(t, e) {
        var n = new ox(tm(), t, e);
        return rx[n.id] = n, n
    }

    function Oi(t) {
        if (t) t.dispose(); else {
            for (var e in rx) rx.hasOwnProperty(e) && rx[e].dispose();
            rx = {}
        }
        return this
    }

    function zi(t) {
        return rx[t]
    }

    function Ei(t, e) {
        ix[t] = e
    }

    function Ri(t) {
        delete rx[t]
    }

    function Bi(t) {
        return t instanceof Array ? t : null == t ? [] : [t]
    }

    function Ni(t, e, n) {
        if (t) {
            t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
            for (var i = 0, r = n.length; r > i; i++) {
                var a = n[i];
                !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
            }
        }
    }

    function Vi(t) {
        return !ux(t) || hx(t) || t instanceof Date ? t : t.value
    }

    function Fi(t) {
        return ux(t) && !(t instanceof Array)
    }

    function Hi(t, e) {
        e = (e || []).slice();
        var n = p(t || [], function (t) {
            return {exist: t}
        });
        return lx(e, function (t, i) {
            if (ux(t)) {
                for (var r = 0; r < n.length; r++) if (!n[r].option && null != t.id && n[r].exist.id === t.id + "") return n[r].option = t, void (e[i] = null);
                for (var r = 0; r < n.length; r++) {
                    var a = n[r].exist;
                    if (!(n[r].option || null != a.id && null != t.id || null == t.name || Zi(t) || Zi(a) || a.name !== t.name + "")) return n[r].option = t, void (e[i] = null)
                }
            }
        }), lx(e, function (t) {
            if (ux(t)) {
                for (var e = 0; e < n.length; e++) {
                    var i = n[e].exist;
                    if (!n[e].option && !Zi(i) && null == t.id) {
                        n[e].option = t;
                        break
                    }
                }
                e >= n.length && n.push({option: t})
            }
        }), n
    }

    function Gi(t) {
        var e = N();
        lx(t, function (t) {
            var n = t.exist;
            n && e.set(n.id, t)
        }), lx(t, function (t) {
            var n = t.option;
            O(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {})
        }), lx(t, function (t, n) {
            var i = t.exist, r = t.option, a = t.keyInfo;
            if (ux(r)) {
                if (a.name = null != r.name ? r.name + "" : i ? i.name : cx + n, i) a.id = i.id; else if (null != r.id) a.id = r.id + ""; else {
                    var o = 0;
                    do a.id = "\x00" + a.name + "\x00" + o++; while (e.get(a.id))
                }
                e.set(a.id, t)
            }
        })
    }

    function Wi(t) {
        var e = t.name;
        return !(!e || !e.indexOf(cx))
    }

    function Zi(t) {
        return ux(t) && t.id && 0 === (t.id + "").indexOf("\x00_ec_\x00")
    }

    function Xi(t, e) {
        function n(t, e, n) {
            for (var i = 0, r = t.length; r > i; i++) for (var a = t[i].seriesId, o = Bi(t[i].dataIndex), s = n && n[a], l = 0, u = o.length; u > l; l++) {
                var h = o[l];
                s && s[h] ? s[h] = null : (e[a] || (e[a] = {}))[h] = 1
            }
        }

        function i(t, e) {
            var n = [];
            for (var r in t) if (t.hasOwnProperty(r) && null != t[r]) if (e) n.push(+r); else {
                var a = i(t[r], !0);
                a.length && n.push({seriesId: r, dataIndex: a})
            }
            return n
        }

        var r = {}, a = {};
        return n(t || [], r), n(e || [], a, r), [i(r), i(a)]
    }

    function Yi(t, e) {
        return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? _(e.dataIndex) ? p(e.dataIndex, function (e) {
            return t.indexOfRawIndex(e)
        }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? _(e.name) ? p(e.name, function (e) {
            return t.indexOfName(e)
        }) : t.indexOfName(e.name) : void 0
    }

    function Ui() {
        var t = "__\x00ec_inner_" + fx++ + "_" + Math.random().toFixed(5);
        return function (e) {
            return e[t] || (e[t] = {})
        }
    }

    function ji(t, e, n) {
        if (b(e)) {
            var i = {};
            i[e + "Index"] = 0, e = i
        }
        var r = n && n.defaultMainType;
        !r || qi(e, r + "Index") || qi(e, r + "Id") || qi(e, r + "Name") || (e[r + "Index"] = 0);
        var a = {};
        return lx(e, function (i, r) {
            var i = e[r];
            if ("dataIndex" === r || "dataIndexInside" === r) return void (a[r] = i);
            var o = r.match(/^(\w+)(Index|Id|Name)$/) || [], s = o[1], l = (o[2] || "").toLowerCase();
            if (!(!s || !l || null == i || "index" === l && "none" === i || n && n.includeMainTypes && u(n.includeMainTypes, s) < 0)) {
                var h = {mainType: s};
                ("index" !== l || "all" !== i) && (h[l] = i);
                var c = t.queryComponents(h);
                a[s + "Models"] = c, a[s + "Model"] = c[0]
            }
        }), a
    }

    function qi(t, e) {
        return t && t.hasOwnProperty(e)
    }

    function Ki(t, e, n) {
        t.setAttribute ? t.setAttribute(e, n) : t[e] = n
    }

    function $i(t, e) {
        return t.getAttribute ? t.getAttribute(e) : t[e]
    }

    function Qi(t) {
        return "auto" === t ? nm.domSupported ? "html" : "richText" : t || "html"
    }

    function Ji(t) {
        var e = {main: "", sub: ""};
        return t && (t = t.split(px), e.main = t[0] || "", e.sub = t[1] || ""), e
    }

    function tr(t) {
        O(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
    }

    function er(t) {
        t.$constructor = t, t.extend = function (t) {
            var e = this, n = function () {
                t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
            };
            return o(n.prototype, t), n.extend = this.extend, n.superCall = ir, n.superApply = rr, h(n, this), n.superClass = e, n
        }
    }

    function nr(t) {
        var e = ["__\x00is_clz", vx++, Math.random().toFixed(3)].join("_");
        t.prototype[e] = !0, t.isInstance = function (t) {
            return !(!t || !t[e])
        }
    }

    function ir(t, e) {
        var n = P(arguments, 2);
        return this.superClass.prototype[e].apply(t, n)
    }

    function rr(t, e, n) {
        return this.superClass.prototype[e].apply(t, n)
    }

    function ar(t, e) {
        function n(t) {
            var e = i[t.main];
            return e && e[gx] || (e = i[t.main] = {}, e[gx] = !0), e
        }

        e = e || {};
        var i = {};
        if (t.registerClass = function (t, e) {
            if (e) if (tr(e), e = Ji(e), e.sub) {
                if (e.sub !== gx) {
                    var r = n(e);
                    r[e.sub] = t
                }
            } else i[e.main] = t;
            return t
        }, t.getClass = function (t, e, n) {
            var r = i[t];
            if (r && r[gx] && (r = e ? r[e] : null), n && !r) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
            return r
        }, t.getClassesByMainType = function (t) {
            t = Ji(t);
            var e = [], n = i[t.main];
            return n && n[gx] ? f(n, function (t, n) {
                n !== gx && e.push(t)
            }) : e.push(n), e
        }, t.hasClass = function (t) {
            return t = Ji(t), !!i[t.main]
        }, t.getAllClassMainTypes = function () {
            var t = [];
            return f(i, function (e, n) {
                t.push(n)
            }), t
        }, t.hasSubTypes = function (t) {
            t = Ji(t);
            var e = i[t.main];
            return e && e[gx]
        }, t.parseClassType = Ji, e.registerWhenExtend) {
            var r = t.extend;
            r && (t.extend = function (e) {
                var n = r.call(this, e);
                return t.registerClass(n, e.type)
            })
        }
        return t
    }

    function or(t) {
        return t > -Ix && Ix > t
    }

    function sr(t) {
        return t > Ix || -Ix > t
    }

    function lr(t, e, n, i, r) {
        var a = 1 - r;
        return a * a * (a * t + 3 * r * e) + r * r * (r * i + 3 * a * n)
    }

    function ur(t, e, n, i, r) {
        var a = 1 - r;
        return 3 * (((e - t) * a + 2 * (n - e) * r) * a + (i - n) * r * r)
    }

    function hr(t, e, n, i, r, a) {
        var o = i + 3 * (e - n) - t, s = 3 * (n - 2 * e + t), l = 3 * (e - t), u = t - r, h = s * s - 3 * o * l,
            c = s * l - 9 * o * u, d = l * l - 3 * s * u, f = 0;
        if (or(h) && or(c)) if (or(s)) a[0] = 0; else {
            var p = -l / s;
            p >= 0 && 1 >= p && (a[f++] = p)
        } else {
            var g = c * c - 4 * h * d;
            if (or(g)) {
                var v = c / h, p = -s / o + v, m = -v / 2;
                p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m)
            } else if (g > 0) {
                var y = Sx(g), x = h * s + 1.5 * o * (-c + y), _ = h * s + 1.5 * o * (-c - y);
                x = 0 > x ? -Mx(-x, Ax) : Mx(x, Ax), _ = 0 > _ ? -Mx(-_, Ax) : Mx(_, Ax);
                var p = (-s - (x + _)) / (3 * o);
                p >= 0 && 1 >= p && (a[f++] = p)
            } else {
                var w = (2 * h * s - 3 * o * c) / (2 * Sx(h * h * h)), b = Math.acos(w) / 3, M = Sx(h), S = Math.cos(b),
                    p = (-s - 2 * M * S) / (3 * o), m = (-s + M * (S + Cx * Math.sin(b))) / (3 * o),
                    I = (-s + M * (S - Cx * Math.sin(b))) / (3 * o);
                p >= 0 && 1 >= p && (a[f++] = p), m >= 0 && 1 >= m && (a[f++] = m), I >= 0 && 1 >= I && (a[f++] = I)
            }
        }
        return f
    }

    function cr(t, e, n, i, r) {
        var a = 6 * n - 12 * e + 6 * t, o = 9 * e + 3 * i - 3 * t - 9 * n, s = 3 * e - 3 * t, l = 0;
        if (or(o)) {
            if (sr(a)) {
                var u = -s / a;
                u >= 0 && 1 >= u && (r[l++] = u)
            }
        } else {
            var h = a * a - 4 * o * s;
            if (or(h)) r[0] = -a / (2 * o); else if (h > 0) {
                var c = Sx(h), u = (-a + c) / (2 * o), d = (-a - c) / (2 * o);
                u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d)
            }
        }
        return l
    }

    function dr(t, e, n, i, r, a) {
        var o = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, u = (s - o) * r + o, h = (l - s) * r + s,
            c = (h - u) * r + u;
        a[0] = t, a[1] = o, a[2] = u, a[3] = c, a[4] = c, a[5] = h, a[6] = l, a[7] = i
    }

    function fr(t, e, n, i, r, a, o, s, l, u, h) {
        var c, d, f, p, g, v = .005, m = 1 / 0;
        Dx[0] = l, Dx[1] = u;
        for (var y = 0; 1 > y; y += .05) kx[0] = lr(t, n, r, o, y), kx[1] = lr(e, i, a, s, y), p = wm(Dx, kx), m > p && (c = y, m = p);
        m = 1 / 0;
        for (var x = 0; 32 > x && !(Tx > v); x++) d = c - v, f = c + v, kx[0] = lr(t, n, r, o, d), kx[1] = lr(e, i, a, s, d), p = wm(kx, Dx), d >= 0 && m > p ? (c = d, m = p) : (Px[0] = lr(t, n, r, o, f), Px[1] = lr(e, i, a, s, f), g = wm(Px, Dx), 1 >= f && m > g ? (c = f, m = g) : v *= .5);
        return h && (h[0] = lr(t, n, r, o, c), h[1] = lr(e, i, a, s, c)), Sx(m)
    }

    function pr(t, e, n, i) {
        var r = 1 - i;
        return r * (r * t + 2 * i * e) + i * i * n
    }

    function gr(t, e, n, i) {
        return 2 * ((1 - i) * (e - t) + i * (n - e))
    }

    function vr(t, e, n, i, r) {
        var a = t - 2 * e + n, o = 2 * (e - t), s = t - i, l = 0;
        if (or(a)) {
            if (sr(o)) {
                var u = -s / o;
                u >= 0 && 1 >= u && (r[l++] = u)
            }
        } else {
            var h = o * o - 4 * a * s;
            if (or(h)) {
                var u = -o / (2 * a);
                u >= 0 && 1 >= u && (r[l++] = u)
            } else if (h > 0) {
                var c = Sx(h), u = (-o + c) / (2 * a), d = (-o - c) / (2 * a);
                u >= 0 && 1 >= u && (r[l++] = u), d >= 0 && 1 >= d && (r[l++] = d)
            }
        }
        return l
    }

    function mr(t, e, n) {
        var i = t + n - 2 * e;
        return 0 === i ? .5 : (t - e) / i
    }

    function yr(t, e, n, i, r) {
        var a = (e - t) * i + t, o = (n - e) * i + e, s = (o - a) * i + a;
        r[0] = t, r[1] = a, r[2] = s, r[3] = s, r[4] = o, r[5] = n
    }

    function xr(t, e, n, i, r, a, o, s, l) {
        var u, h = .005, c = 1 / 0;
        Dx[0] = o, Dx[1] = s;
        for (var d = 0; 1 > d; d += .05) {
            kx[0] = pr(t, n, r, d), kx[1] = pr(e, i, a, d);
            var f = wm(Dx, kx);
            c > f && (u = d, c = f)
        }
        c = 1 / 0;
        for (var p = 0; 32 > p && !(Tx > h); p++) {
            var g = u - h, v = u + h;
            kx[0] = pr(t, n, r, g), kx[1] = pr(e, i, a, g);
            var f = wm(kx, Dx);
            if (g >= 0 && c > f) u = g, c = f; else {
                Px[0] = pr(t, n, r, v), Px[1] = pr(e, i, a, v);
                var m = wm(Px, Dx);
                1 >= v && c > m ? (u = v, c = m) : h *= .5
            }
        }
        return l && (l[0] = pr(t, n, r, u), l[1] = pr(e, i, a, u)), Sx(c)
    }

    function _r(t, e, n) {
        if (0 !== t.length) {
            var i, r = t[0], a = r[0], o = r[0], s = r[1], l = r[1];
            for (i = 1; i < t.length; i++) r = t[i], a = Lx(a, r[0]), o = Ox(o, r[0]), s = Lx(s, r[1]), l = Ox(l, r[1]);
            e[0] = a, e[1] = s, n[0] = o, n[1] = l
        }
    }

    function wr(t, e, n, i, r, a) {
        r[0] = Lx(t, n), r[1] = Lx(e, i), a[0] = Ox(t, n), a[1] = Ox(e, i)
    }

    function br(t, e, n, i, r, a, o, s, l, u) {
        var h, c = cr, d = lr, f = c(t, n, r, o, Fx);
        for (l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0, h = 0; f > h; h++) {
            var p = d(t, n, r, o, Fx[h]);
            l[0] = Lx(p, l[0]), u[0] = Ox(p, u[0])
        }
        for (f = c(e, i, a, s, Hx), h = 0; f > h; h++) {
            var g = d(e, i, a, s, Hx[h]);
            l[1] = Lx(g, l[1]), u[1] = Ox(g, u[1])
        }
        l[0] = Lx(t, l[0]), u[0] = Ox(t, u[0]), l[0] = Lx(o, l[0]), u[0] = Ox(o, u[0]), l[1] = Lx(e, l[1]), u[1] = Ox(e, u[1]), l[1] = Lx(s, l[1]), u[1] = Ox(s, u[1])
    }

    function Mr(t, e, n, i, r, a, o, s) {
        var l = mr, u = pr, h = Ox(Lx(l(t, n, r), 1), 0), c = Ox(Lx(l(e, i, a), 1), 0), d = u(t, n, r, h),
            f = u(e, i, a, c);
        o[0] = Lx(t, r, d), o[1] = Lx(e, a, f), s[0] = Ox(t, r, d), s[1] = Ox(e, a, f)
    }

    function Sr(t, e, n, i, r, a, o, s, l) {
        var u = oe, h = se, c = Math.abs(r - a);
        if (1e-4 > c % Rx && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, void (l[1] = e + i);
        if (Bx[0] = Ex(r) * n + t, Bx[1] = zx(r) * i + e, Nx[0] = Ex(a) * n + t, Nx[1] = zx(a) * i + e, u(s, Bx, Nx), h(l, Bx, Nx), r %= Rx, 0 > r && (r += Rx), a %= Rx, 0 > a && (a += Rx), r > a && !o ? a += Rx : a > r && o && (r += Rx), o) {
            var d = a;
            a = r, r = d
        }
        for (var f = 0; a > f; f += Math.PI / 2) f > r && (Vx[0] = Ex(f) * n + t, Vx[1] = zx(f) * i + e, u(s, Vx, s), h(l, Vx, l))
    }

    function Ir(t, e, n, i, r, a, o) {
        if (0 === r) return !1;
        var s = r, l = 0, u = t;
        if (o > e + s && o > i + s || e - s > o && i - s > o || a > t + s && a > n + s || t - s > a && n - s > a) return !1;
        if (t === n) return Math.abs(a - t) <= s / 2;
        l = (e - i) / (t - n), u = (t * i - n * e) / (t - n);
        var h = l * a - o + u, c = h * h / (l * l + 1);
        return s / 2 * s / 2 >= c
    }

    function Tr(t, e, n, i, r, a, o, s, l, u, h) {
        if (0 === l) return !1;
        var c = l;
        if (h > e + c && h > i + c && h > a + c && h > s + c || e - c > h && i - c > h && a - c > h && s - c > h || u > t + c && u > n + c && u > r + c && u > o + c || t - c > u && n - c > u && r - c > u && o - c > u) return !1;
        var d = fr(t, e, n, i, r, a, o, s, u, h, null);
        return c / 2 >= d
    }

    function Cr(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        if (l > e + u && l > i + u && l > a + u || e - u > l && i - u > l && a - u > l || s > t + u && s > n + u && s > r + u || t - u > s && n - u > s && r - u > s) return !1;
        var h = xr(t, e, n, i, r, a, s, l, null);
        return u / 2 >= h
    }

    function Ar(t) {
        return t %= e_, 0 > t && (t += e_), t
    }

    function Dr(t, e, n, i, r, a, o, s, l) {
        if (0 === o) return !1;
        var u = o;
        s -= t, l -= e;
        var h = Math.sqrt(s * s + l * l);
        if (h - u > n || n > h + u) return !1;
        if (Math.abs(i - r) % n_ < 1e-4) return !0;
        if (a) {
            var c = i;
            i = Ar(r), r = Ar(c)
        } else i = Ar(i), r = Ar(r);
        i > r && (r += n_);
        var d = Math.atan2(l, s);
        return 0 > d && (d += n_), d >= i && r >= d || d + n_ >= i && r >= d + n_
    }

    function kr(t, e, n, i, r, a) {
        if (a > e && a > i || e > a && i > a) return 0;
        if (i === e) return 0;
        var o = e > i ? 1 : -1, s = (a - e) / (i - e);
        (1 === s || 0 === s) && (o = e > i ? .5 : -.5);
        var l = s * (n - t) + t;
        return l === r ? 1 / 0 : l > r ? o : 0
    }

    function Pr(t, e) {
        return Math.abs(t - e) < a_
    }

    function Lr() {
        var t = s_[0];
        s_[0] = s_[1], s_[1] = t
    }

    function Or(t, e, n, i, r, a, o, s, l, u) {
        if (u > e && u > i && u > a && u > s || e > u && i > u && a > u && s > u) return 0;
        var h = hr(e, i, a, s, u, o_);
        if (0 === h) return 0;
        for (var c, d, f = 0, p = -1, g = 0; h > g; g++) {
            var v = o_[g], m = 0 === v || 1 === v ? .5 : 1, y = lr(t, n, r, o, v);
            l > y || (0 > p && (p = cr(e, i, a, s, s_), s_[1] < s_[0] && p > 1 && Lr(), c = lr(e, i, a, s, s_[0]), p > 1 && (d = lr(e, i, a, s, s_[1]))), f += 2 === p ? v < s_[0] ? e > c ? m : -m : v < s_[1] ? c > d ? m : -m : d > s ? m : -m : v < s_[0] ? e > c ? m : -m : c > s ? m : -m)
        }
        return f
    }

    function zr(t, e, n, i, r, a, o, s) {
        if (s > e && s > i && s > a || e > s && i > s && a > s) return 0;
        var l = vr(e, i, a, s, o_);
        if (0 === l) return 0;
        var u = mr(e, i, a);
        if (u >= 0 && 1 >= u) {
            for (var h = 0, c = pr(e, i, a, u), d = 0; l > d; d++) {
                var f = 0 === o_[d] || 1 === o_[d] ? .5 : 1, p = pr(t, n, r, o_[d]);
                o > p || (h += o_[d] < u ? e > c ? f : -f : c > a ? f : -f)
            }
            return h
        }
        var f = 0 === o_[0] || 1 === o_[0] ? .5 : 1, p = pr(t, n, r, o_[0]);
        return o > p ? 0 : e > a ? f : -f
    }

    function Er(t, e, n, i, r, a, o, s) {
        if (s -= e, s > n || -n > s) return 0;
        var l = Math.sqrt(n * n - s * s);
        o_[0] = -l, o_[1] = l;
        var u = Math.abs(i - r);
        if (1e-4 > u) return 0;
        if (1e-4 > u % r_) {
            i = 0, r = r_;
            var h = a ? 1 : -1;
            return o >= o_[0] + t && o <= o_[1] + t ? h : 0
        }
        if (a) {
            var l = i;
            i = Ar(r), r = Ar(l)
        } else i = Ar(i), r = Ar(r);
        i > r && (r += r_);
        for (var c = 0, d = 0; 2 > d; d++) {
            var f = o_[d];
            if (f + t > o) {
                var p = Math.atan2(s, f), h = a ? 1 : -1;
                0 > p && (p = r_ + p), (p >= i && r >= p || p + r_ >= i && r >= p + r_) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (h = -h), c += h)
            }
        }
        return c
    }

    function Rr(t, e, n, i, r) {
        for (var a = 0, o = 0, s = 0, l = 0, u = 0, h = 0; h < t.length;) {
            var c = t[h++];
            switch (c === i_.M && h > 1 && (n || (a += kr(o, s, l, u, i, r))), 1 === h && (o = t[h], s = t[h + 1], l = o, u = s), c) {
                case i_.M:
                    l = t[h++], u = t[h++], o = l, s = u;
                    break;
                case i_.L:
                    if (n) {
                        if (Ir(o, s, t[h], t[h + 1], e, i, r)) return !0
                    } else a += kr(o, s, t[h], t[h + 1], i, r) || 0;
                    o = t[h++], s = t[h++];
                    break;
                case i_.C:
                    if (n) {
                        if (Tr(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0
                    } else a += Or(o, s, t[h++], t[h++], t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                    o = t[h++], s = t[h++];
                    break;
                case i_.Q:
                    if (n) {
                        if (Cr(o, s, t[h++], t[h++], t[h], t[h + 1], e, i, r)) return !0
                    } else a += zr(o, s, t[h++], t[h++], t[h], t[h + 1], i, r) || 0;
                    o = t[h++], s = t[h++];
                    break;
                case i_.A:
                    var d = t[h++], f = t[h++], p = t[h++], g = t[h++], v = t[h++], m = t[h++];
                    h += 1;
                    var y = 1 - t[h++], x = Math.cos(v) * p + d, _ = Math.sin(v) * g + f;
                    h > 1 ? a += kr(o, s, x, _, i, r) : (l = x, u = _);
                    var w = (i - d) * g / p + d;
                    if (n) {
                        if (Dr(d, f, g, v, v + m, y, e, w, r)) return !0
                    } else a += Er(d, f, g, v, v + m, y, w, r);
                    o = Math.cos(v + m) * p + d, s = Math.sin(v + m) * g + f;
                    break;
                case i_.R:
                    l = o = t[h++], u = s = t[h++];
                    var b = t[h++], M = t[h++], x = l + b, _ = u + M;
                    if (n) {
                        if (Ir(l, u, x, u, e, i, r) || Ir(x, u, x, _, e, i, r) || Ir(x, _, l, _, e, i, r) || Ir(l, _, l, u, e, i, r)) return !0
                    } else a += kr(x, u, x, _, i, r), a += kr(l, _, l, u, i, r);
                    break;
                case i_.Z:
                    if (n) {
                        if (Ir(o, s, l, u, e, i, r)) return !0
                    } else a += kr(o, s, l, u, i, r);
                    o = l, s = u
            }
        }
        return n || Pr(s, u) || (a += kr(o, s, l, u, i, r) || 0), 0 !== a
    }

    function Br(t, e, n) {
        return Rr(t, 0, !1, e, n)
    }

    function Nr(t, e, n, i) {
        return Rr(t, e, !0, n, i)
    }

    function Vr(t) {
        xi.call(this, t), this.path = null
    }

    function Fr(t, e, n, i, r, a, o, s, l, u, h) {
        var c = l * (x_ / 180), d = y_(c) * (t - n) / 2 + m_(c) * (e - i) / 2,
            f = -1 * m_(c) * (t - n) / 2 + y_(c) * (e - i) / 2, p = d * d / (o * o) + f * f / (s * s);
        p > 1 && (o *= v_(p), s *= v_(p));
        var g = (r === a ? -1 : 1) * v_((o * o * s * s - o * o * f * f - s * s * d * d) / (o * o * f * f + s * s * d * d)) || 0,
            v = g * o * f / s, m = g * -s * d / o, y = (t + n) / 2 + y_(c) * v - m_(c) * m,
            x = (e + i) / 2 + m_(c) * v + y_(c) * m, _ = b_([1, 0], [(d - v) / o, (f - m) / s]),
            w = [(d - v) / o, (f - m) / s], b = [(-1 * d - v) / o, (-1 * f - m) / s], M = b_(w, b);
        w_(w, b) <= -1 && (M = x_), w_(w, b) >= 1 && (M = 0), 0 === a && M > 0 && (M -= 2 * x_), 1 === a && 0 > M && (M += 2 * x_), h.addData(u, y, x, o, s, _, M, c, a)
    }

    function Hr(t) {
        if (!t) return new t_;
        for (var e, n = 0, i = 0, r = n, a = i, o = new t_, s = t_.CMD, l = t.match(M_), u = 0; u < l.length; u++) {
            for (var h, c = l[u], d = c.charAt(0), f = c.match(S_) || [], p = f.length, g = 0; p > g; g++) f[g] = parseFloat(f[g]);
            for (var v = 0; p > v;) {
                var m, y, x, _, w, b, M, S = n, I = i;
                switch (d) {
                    case"l":
                        n += f[v++], i += f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"L":
                        n = f[v++], i = f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"m":
                        n += f[v++], i += f[v++], h = s.M, o.addData(h, n, i), r = n, a = i, d = "l";
                        break;
                    case"M":
                        n = f[v++], i = f[v++], h = s.M, o.addData(h, n, i), r = n, a = i, d = "L";
                        break;
                    case"h":
                        n += f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"H":
                        n = f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"v":
                        i += f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"V":
                        i = f[v++], h = s.L, o.addData(h, n, i);
                        break;
                    case"C":
                        h = s.C, o.addData(h, f[v++], f[v++], f[v++], f[v++], f[v++], f[v++]), n = f[v - 2], i = f[v - 1];
                        break;
                    case"c":
                        h = s.C, o.addData(h, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i, f[v++] + n, f[v++] + i), n += f[v - 2], i += f[v - 1];
                        break;
                    case"S":
                        m = n, y = i;
                        var T = o.len(), C = o.data;
                        e === s.C && (m += n - C[T - 4], y += i - C[T - 3]), h = s.C, S = f[v++], I = f[v++], n = f[v++], i = f[v++], o.addData(h, m, y, S, I, n, i);
                        break;
                    case"s":
                        m = n, y = i;
                        var T = o.len(), C = o.data;
                        e === s.C && (m += n - C[T - 4], y += i - C[T - 3]), h = s.C, S = n + f[v++], I = i + f[v++], n += f[v++], i += f[v++], o.addData(h, m, y, S, I, n, i);
                        break;
                    case"Q":
                        S = f[v++], I = f[v++], n = f[v++], i = f[v++], h = s.Q, o.addData(h, S, I, n, i);
                        break;
                    case"q":
                        S = f[v++] + n, I = f[v++] + i, n += f[v++], i += f[v++], h = s.Q, o.addData(h, S, I, n, i);
                        break;
                    case"T":
                        m = n, y = i;
                        var T = o.len(), C = o.data;
                        e === s.Q && (m += n - C[T - 4], y += i - C[T - 3]), n = f[v++], i = f[v++], h = s.Q, o.addData(h, m, y, n, i);
                        break;
                    case"t":
                        m = n, y = i;
                        var T = o.len(), C = o.data;
                        e === s.Q && (m += n - C[T - 4], y += i - C[T - 3]), n += f[v++], i += f[v++], h = s.Q, o.addData(h, m, y, n, i);
                        break;
                    case"A":
                        x = f[v++], _ = f[v++], w = f[v++], b = f[v++], M = f[v++], S = n, I = i, n = f[v++], i = f[v++], h = s.A, Fr(S, I, n, i, b, M, x, _, w, h, o);
                        break;
                    case"a":
                        x = f[v++], _ = f[v++], w = f[v++], b = f[v++], M = f[v++], S = n, I = i, n += f[v++], i += f[v++], h = s.A, Fr(S, I, n, i, b, M, x, _, w, h, o)
                }
            }
            ("z" === d || "Z" === d) && (h = s.Z, o.addData(h), n = r, i = a), e = h
        }
        return o.toStatic(), o
    }

    function Gr(t, e) {
        var n = Hr(t);
        return e = e || {}, e.buildPath = function (t) {
            if (t.setData) {
                t.setData(n.data);
                var e = t.getContext();
                e && t.rebuildPath(e)
            } else {
                var e = t;
                n.rebuildPath(e)
            }
        }, e.applyTransform = function (t) {
            g_(n, t), this.dirty(!0)
        }, e
    }

    function Wr(t, e) {
        return new Vr(Gr(t, e))
    }

    function Zr(t, e) {
        return Vr.extend(Gr(t, e))
    }

    function Xr(t, e) {
        for (var n = [], i = t.length, r = 0; i > r; r++) {
            var a = t[r];
            a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), n.push(a.path)
        }
        var o = new Vr(e);
        return o.createPathProxy(), o.buildPath = function (t) {
            t.appendPath(n);
            var e = t.getContext();
            e && t.rebuildPath(e)
        }, o
    }

    function Yr(t, e, n, i, r, a, o) {
        var s = .5 * (n - t), l = .5 * (i - e);
        return (2 * (e - n) + s + l) * o + (-3 * (e - n) - 2 * s - l) * a + s * r + e
    }

    function Ur(t, e, n) {
        var i = e.points, r = e.smooth;
        if (i && i.length >= 2) {
            if (r && "spline" !== r) {
                var a = L_(i, r, n, e.smoothConstraint);
                t.moveTo(i[0][0], i[0][1]);
                for (var o = i.length, s = 0; (n ? o : o - 1) > s; s++) {
                    var l = a[2 * s], u = a[2 * s + 1], h = i[(s + 1) % o];
                    t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1])
                }
            } else {
                "spline" === r && (i = P_(i, n)), t.moveTo(i[0][0], i[0][1]);
                for (var s = 1, c = i.length; c > s; s++) t.lineTo(i[s][0], i[s][1])
            }
            n && t.closePath()
        }
    }

    function jr(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x1, a = e.x2, o = e.y1, s = e.y2;
            E_(2 * r) === E_(2 * a) ? t.x1 = t.x2 = Kr(r, i, !0) : (t.x1 = r, t.x2 = a), E_(2 * o) === E_(2 * s) ? t.y1 = t.y2 = Kr(o, i, !0) : (t.y1 = o, t.y2 = s)
        }
    }

    function qr(t, e, n) {
        var i = n && n.lineWidth;
        if (e && i) {
            var r = e.x, a = e.y, o = e.width, s = e.height;
            t.x = Kr(r, i, !0), t.y = Kr(a, i, !0), t.width = Math.max(Kr(r + o, i, !1) - t.x, 0 === o ? 0 : 1), t.height = Math.max(Kr(a + s, i, !1) - t.y, 0 === s ? 0 : 1)
        }
    }

    function Kr(t, e, n) {
        var i = E_(2 * t);
        return (i + E_(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2
    }

    function $r(t, e, n) {
        var i = t.cpx2, r = t.cpy2;
        return null === i || null === r ? [(n ? ur : lr)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? ur : lr)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(n ? gr : pr)(t.x1, t.cpx1, t.x2, e), (n ? gr : pr)(t.y1, t.cpy1, t.y2, e)]
    }

    function Qr(t) {
        xi.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
    }

    function Jr(t) {
        return Vr.extend(t)
    }

    function ta(t, e) {
        return Zr(t, e)
    }

    function ea(t, e, n, i) {
        var r = Wr(t, e);
        return n && ("center" === i && (n = ia(n, r.getBoundingRect())), ra(r, n)), r
    }

    function na(t, e, n) {
        var i = new _i({
            style: {image: t, x: e.x, y: e.y, width: e.width, height: e.height}, onload: function (t) {
                if ("center" === n) {
                    var r = {width: t.width, height: t.height};
                    i.setStyle(ia(e, r))
                }
            }
        });
        return i
    }

    function ia(t, e) {
        var n, i = e.width / e.height, r = t.height * i;
        r <= t.width ? n = t.height : (r = t.width, n = r / i);
        var a = t.x + t.width / 2, o = t.y + t.height / 2;
        return {x: a - r / 2, y: o - n / 2, width: r, height: n}
    }

    function ra(t, e) {
        if (t.applyTransform) {
            var n = t.getBoundingRect(), i = n.calculateTransform(e);
            t.applyTransform(i)
        }
    }

    function aa(t) {
        var e = t.shape, n = t.style.lineWidth;
        return j_(2 * e.x1) === j_(2 * e.x2) && (e.x1 = e.x2 = sa(e.x1, n, !0)), j_(2 * e.y1) === j_(2 * e.y2) && (e.y1 = e.y2 = sa(e.y1, n, !0)), t
    }

    function oa(t) {
        var e = t.shape, n = t.style.lineWidth, i = e.x, r = e.y, a = e.width, o = e.height;
        return e.x = sa(e.x, n, !0), e.y = sa(e.y, n, !0), e.width = Math.max(sa(i + a, n, !1) - e.x, 0 === a ? 0 : 1), e.height = Math.max(sa(r + o, n, !1) - e.y, 0 === o ? 0 : 1), t
    }

    function sa(t, e, n) {
        var i = j_(2 * t);
        return (i + j_(e)) % 2 === 0 ? i / 2 : (i + (n ? 1 : -1)) / 2
    }

    function la(t) {
        return null != t && "none" !== t
    }

    function ua(t) {
        if ("string" != typeof t) return t;
        var e = tw.get(t);
        return e || (e = qe(t, -.1), 1e4 > ew && (tw.set(t, e), ew++)), e
    }

    function ha(t) {
        if (t.__hoverStlDirty) {
            t.__hoverStlDirty = !1;
            var e = t.__hoverStl;
            if (!e) return void (t.__cachedNormalStl = t.__cachedNormalZ2 = null);
            var n = t.__cachedNormalStl = {};
            t.__cachedNormalZ2 = t.z2;
            var i = t.style;
            for (var r in e) null != e[r] && (n[r] = i[r]);
            n.fill = i.fill, n.stroke = i.stroke
        }
    }

    function ca(t) {
        var e = t.__hoverStl;
        if (e && !t.__highlighted) {
            var n = t.useHoverLayer;
            t.__highlighted = n ? "layer" : "plain";
            var i = t.__zr;
            if (i || !n) {
                var r = t, a = t.style;
                n && (r = i.addHover(t), a = r.style), Pa(a), n || ha(r), a.extendFrom(e), da(a, e, "fill"), da(a, e, "stroke"), ka(a), n || (t.dirty(!1), t.z2 += Q_)
            }
        }
    }

    function da(t, e, n) {
        !la(e[n]) && la(t[n]) && (t[n] = ua(t[n]))
    }

    function fa(t) {
        var e = t.__highlighted;
        if (e) if (t.__highlighted = !1, "layer" === e) t.__zr && t.__zr.removeHover(t); else if (e) {
            var n = t.style, i = t.__cachedNormalStl;
            i && (Pa(n), t.setStyle(i), ka(n));
            var r = t.__cachedNormalZ2;
            null != r && t.z2 - r === Q_ && (t.z2 = r)
        }
    }

    function pa(t, e) {
        t.isGroup ? t.traverse(function (t) {
            !t.isGroup && e(t)
        }) : e(t)
    }

    function ga(t, e) {
        e = t.__hoverStl = e !== !1 && (e || {}), t.__hoverStlDirty = !0, t.__highlighted && (t.__cachedNormalStl = null, fa(t), ca(t))
    }

    function va(t) {
        return t && t.__isEmphasisEntered
    }

    function ma(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasisEntered && pa(this, ca)
    }

    function ya(t) {
        this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasisEntered && pa(this, fa)
    }

    function xa() {
        this.__isEmphasisEntered = !0, pa(this, ca)
    }

    function _a() {
        this.__isEmphasisEntered = !1, pa(this, fa)
    }

    function wa(t, e, n) {
        t.isGroup ? t.traverse(function (t) {
            !t.isGroup && ga(t, t.hoverStyle || e)
        }) : ga(t, t.hoverStyle || e), ba(t, n)
    }

    function ba(t, e) {
        var n = e === !1;
        if (t.__hoverSilentOnTouch = null != e && e.hoverSilentOnTouch, !n || t.__hoverStyleTrigger) {
            var i = n ? "off" : "on";
            t[i]("mouseover", ma)[i]("mouseout", ya), t[i]("emphasis", xa)[i]("normal", _a), t.__hoverStyleTrigger = !n
        }
    }

    function Ma(t, e, n, i, r, a, o) {
        r = r || $_;
        var s, l = r.labelFetcher, u = r.labelDataIndex, h = r.labelDimIndex, c = n.getShallow("show"),
            d = i.getShallow("show");
        (c || d) && (l && (s = l.getFormattedLabel(u, "normal", null, h)), null == s && (s = w(r.defaultText) ? r.defaultText(u, r) : r.defaultText));
        var f = c ? s : null, p = d ? D(l ? l.getFormattedLabel(u, "emphasis", null, h) : null, s) : null;
        (null != f || null != p) && (Sa(t, n, a, r), Sa(e, i, o, r, !0)), t.text = f, e.text = p
    }

    function Sa(t, e, n, i, r) {
        return Ta(t, e, i, r), n && o(t, n), t
    }

    function Ia(t, e, n) {
        var i, r = {isRectText: !0};
        n === !1 ? i = !0 : r.autoColor = n, Ta(t, e, r, i)
    }

    function Ta(t, e, n, i) {
        if (n = n || $_, n.isRectText) {
            var r = e.getShallow("position") || (i ? null : "inside");
            "outside" === r && (r = "top"), t.textPosition = r, t.textOffset = e.getShallow("offset");
            var a = e.getShallow("rotate");
            null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = D(e.getShallow("distance"), i ? null : 5)
        }
        var o, s = e.ecModel, l = s && s.option.textStyle, u = Ca(e);
        if (u) {
            o = {};
            for (var h in u) if (u.hasOwnProperty(h)) {
                var c = e.getModel(["rich", h]);
                Aa(o[h] = {}, c, l, n, i)
            }
        }
        return t.rich = o, Aa(t, e, l, n, i, !0), n.forceRich && !n.textStyle && (n.textStyle = {}), t
    }

    function Ca(t) {
        for (var e; t && t !== t.ecModel;) {
            var n = (t.option || $_).rich;
            if (n) {
                e = e || {};
                for (var i in n) n.hasOwnProperty(i) && (e[i] = 1)
            }
            t = t.parentModel
        }
        return e
    }

    function Aa(t, e, n, i, r, a) {
        n = !r && n || $_, t.textFill = Da(e.getShallow("color"), i) || n.color, t.textStroke = Da(e.getShallow("textBorderColor"), i) || n.textBorderColor, t.textStrokeWidth = D(e.getShallow("textBorderWidth"), n.textBorderWidth), t.insideRawTextPosition = t.textPosition, r || (a && (t.insideRollbackOpt = i, ka(t)), null == t.textFill && (t.textFill = i.autoColor)), t.fontStyle = e.getShallow("fontStyle") || n.fontStyle, t.fontWeight = e.getShallow("fontWeight") || n.fontWeight, t.fontSize = e.getShallow("fontSize") || n.fontSize, t.fontFamily = e.getShallow("fontFamily") || n.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && i.disableBox || (t.textBackgroundColor = Da(e.getShallow("backgroundColor"), i), t.textPadding = e.getShallow("padding"), t.textBorderColor = Da(e.getShallow("borderColor"), i), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || n.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || n.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || n.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || n.textShadowOffsetY
    }

    function Da(t, e) {
        return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
    }

    function ka(t) {
        var e = t.insideRollbackOpt;
        if (e && null == t.textFill) {
            var n, i = e.useInsideStyle, r = t.insideRawTextPosition, a = e.autoColor;
            i !== !1 && (i === !0 || e.isRectText && r && "string" == typeof r && r.indexOf("inside") >= 0) ? (n = {
                textFill: null,
                textStroke: t.textStroke,
                textStrokeWidth: t.textStrokeWidth
            }, t.textFill = "#fff", null == t.textStroke && (t.textStroke = a, null == t.textStrokeWidth && (t.textStrokeWidth = 2))) : null != a && (n = {textFill: null}, t.textFill = a), n && (t.insideRollback = n)
        }
    }

    function Pa(t) {
        var e = t.insideRollback;
        e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth, t.insideRollback = null)
    }

    function La(t, e) {
        var n = e || e.getModel("textStyle");
        return z([t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif"].join(" "))
    }

    function Oa(t, e, n, i, r, a) {
        "function" == typeof r && (a = r, r = null);
        var o = i && i.isAnimationEnabled();
        if (o) {
            var s = t ? "Update" : "", l = i.getShallow("animationDuration" + s),
                u = i.getShallow("animationEasing" + s), h = i.getShallow("animationDelay" + s);
            "function" == typeof h && (h = h(r, i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null)), "function" == typeof l && (l = l(r)), l > 0 ? e.animateTo(n, l, h || 0, u, a, !!a) : (e.stopAnimation(), e.attr(n), a && a())
        } else e.stopAnimation(), e.attr(n), a && a()
    }

    function za(t, e, n, i, r) {
        Oa(!0, t, e, n, i, r)
    }

    function Ea(t, e, n, i, r) {
        Oa(!1, t, e, n, i, r)
    }

    function Ra(t, e) {
        for (var n = Te([]); t && t !== e;) Ae(n, t.getLocalTransform(), n), t = t.parent;
        return n
    }

    function Ba(t, e, n) {
        return e && !d(e) && (e = Bm.getLocalTransform(e)), n && (e = Le([], e)), ae([], t, e)
    }

    function Na(t, e, n) {
        var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
            r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
            a = ["left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0];
        return a = Ba(a, e, n), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
    }

    function Va(t, e, n) {
        function i(t) {
            var e = {};
            return t.traverse(function (t) {
                !t.isGroup && t.anid && (e[t.anid] = t)
            }), e
        }

        function r(t) {
            var e = {position: W(t.position), rotation: t.rotation};
            return t.shape && (e.shape = o({}, t.shape)), e
        }

        if (t && e) {
            var a = i(t);
            e.traverse(function (t) {
                if (!t.isGroup && t.anid) {
                    var e = a[t.anid];
                    if (e) {
                        var i = r(t);
                        t.attr(r(e)), za(t, i, n, t.dataIndex)
                    }
                }
            })
        }
    }

    function Fa(t, e) {
        return p(t, function (t) {
            var n = t[0];
            n = q_(n, e.x), n = K_(n, e.x + e.width);
            var i = t[1];
            return i = q_(i, e.y), i = K_(i, e.y + e.height), [n, i]
        })
    }

    function Ha(t, e) {
        var n = q_(t.x, e.x), i = K_(t.x + t.width, e.x + e.width), r = q_(t.y, e.y),
            a = K_(t.y + t.height, e.y + e.height);
        return i >= n && a >= r ? {x: n, y: r, width: i - n, height: a - r} : void 0
    }

    function Ga(t, e, n) {
        e = o({rectHover: !0}, e);
        var i = e.style = {strokeNoScale: !0};
        return n = n || {
            x: -1,
            y: -1,
            width: 2,
            height: 2
        }, t ? 0 === t.indexOf("image://") ? (i.image = t.slice(8), s(i, n), new _i(e)) : ea(t.replace("path://", ""), e, n, "center") : void 0
    }

    function Wa(t, e, n) {
        this.parentModel = e, this.ecModel = n, this.option = t
    }

    function Za(t, e, n) {
        for (var i = 0; i < e.length && (!e[i] || (t = t && "object" == typeof t ? t[e[i]] : null, null != t)); i++) ;
        return null == t && n && (t = n.get(e)), t
    }

    function Xa(t, e) {
        var n = lw(t).getParent;
        return n ? n.call(t, e) : t.parentModel
    }

    function Ya(t) {
        return [t || "", uw++, Math.random().toFixed(5)].join("_")
    }

    function Ua(t) {
        var e = {};
        return t.registerSubTypeDefaulter = function (t, n) {
            t = Ji(t), e[t.main] = n
        }, t.determineSubType = function (n, i) {
            var r = i.type;
            if (!r) {
                var a = Ji(n).main;
                t.hasSubTypes(n) && e[a] && (r = e[a](i))
            }
            return r
        }, t
    }

    function ja(t, e) {
        function n(t) {
            var n = {}, a = [];
            return f(t, function (o) {
                var s = i(n, o), l = s.originalDeps = e(o), h = r(l, t);
                s.entryCount = h.length, 0 === s.entryCount && a.push(o), f(h, function (t) {
                    u(s.predecessor, t) < 0 && s.predecessor.push(t);
                    var e = i(n, t);
                    u(e.successor, t) < 0 && e.successor.push(o)
                })
            }), {graph: n, noEntryList: a}
        }

        function i(t, e) {
            return t[e] || (t[e] = {predecessor: [], successor: []}), t[e]
        }

        function r(t, e) {
            var n = [];
            return f(t, function (t) {
                u(e, t) >= 0 && n.push(t)
            }), n
        }

        t.topologicalTravel = function (t, e, i, r) {
            function a(t) {
                l[t].entryCount--, 0 === l[t].entryCount && u.push(t)
            }

            function o(t) {
                h[t] = !0, a(t)
            }

            if (t.length) {
                var s = n(e), l = s.graph, u = s.noEntryList, h = {};
                for (f(t, function (t) {
                    h[t] = !0
                }); u.length;) {
                    var c = u.pop(), d = l[c], p = !!h[c];
                    p && (i.call(r, c, d.originalDeps.slice()), delete h[c]), f(d.successor, p ? o : a)
                }
                f(h, function () {
                    throw new Error("Circle dependency may exists")
                })
            }
        }
    }

    function qa(t) {
        return t.replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function Ka(t, e, n, i) {
        var r = e[1] - e[0], a = n[1] - n[0];
        if (0 === r) return 0 === a ? n[0] : (n[0] + n[1]) / 2;
        if (i) if (r > 0) {
            if (t <= e[0]) return n[0];
            if (t >= e[1]) return n[1]
        } else {
            if (t >= e[0]) return n[0];
            if (t <= e[1]) return n[1]
        } else {
            if (t === e[0]) return n[0];
            if (t === e[1]) return n[1]
        }
        return (t - e[0]) / r * a + n[0]
    }

    function $a(t, e) {
        switch (t) {
            case"center":
            case"middle":
                t = "50%";
                break;
            case"left":
            case"top":
                t = "0%";
                break;
            case"right":
            case"bottom":
                t = "100%"
        }
        return "string" == typeof t ? qa(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? 0 / 0 : +t
    }

    function Qa(t, e, n) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), 20), t = (+t).toFixed(e), n ? t : +t
    }

    function Ja(t) {
        return t.sort(function (t, e) {
            return t - e
        }), t
    }

    function to(t) {
        if (t = +t, isNaN(t)) return 0;
        for (var e = 1, n = 0; Math.round(t * e) / e !== t;) e *= 10, n++;
        return n
    }

    function eo(t) {
        var e = t.toString(), n = e.indexOf("e");
        if (n > 0) {
            var i = +e.slice(n + 1);
            return 0 > i ? -i : 0
        }
        var r = e.indexOf(".");
        return 0 > r ? 0 : e.length - 1 - r
    }

    function no(t, e) {
        var n = Math.log, i = Math.LN10, r = Math.floor(n(t[1] - t[0]) / i),
            a = Math.round(n(Math.abs(e[1] - e[0])) / i), o = Math.min(Math.max(-r + a, 0), 20);
        return isFinite(o) ? o : 20
    }

    function io(t, e, n) {
        if (!t[e]) return 0;
        var i = g(t, function (t, e) {
            return t + (isNaN(e) ? 0 : e)
        }, 0);
        if (0 === i) return 0;
        for (var r = Math.pow(10, n), a = p(t, function (t) {
            return (isNaN(t) ? 0 : t) / i * r * 100
        }), o = 100 * r, s = p(a, function (t) {
            return Math.floor(t)
        }), l = g(s, function (t, e) {
            return t + e
        }, 0), u = p(a, function (t, e) {
            return t - s[e]
        }); o > l;) {
            for (var h = Number.NEGATIVE_INFINITY, c = null, d = 0, f = u.length; f > d; ++d) u[d] > h && (h = u[d], c = d);
            ++s[c], u[c] = 0, ++l
        }
        return s[e] / r
    }

    function ro(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e
    }

    function ao(t) {
        return t > -hw && hw > t
    }

    function oo(t) {
        if (t instanceof Date) return t;
        if ("string" == typeof t) {
            var e = dw.exec(t);
            if (!e) return new Date(0 / 0);
            if (e[8]) {
                var n = +e[4] || 0;
                return "Z" !== e[8].toUpperCase() && (n -= e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, +e[7] || 0))
            }
            return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, +e[7] || 0)
        }
        return new Date(null == t ? 0 / 0 : Math.round(t))
    }

    function so(t) {
        return Math.pow(10, lo(t))
    }

    function lo(t) {
        return Math.floor(Math.log(t) / Math.LN10)
    }

    function uo(t, e) {
        var n, i = lo(t), r = Math.pow(10, i), a = t / r;
        return n = e ? 1.5 > a ? 1 : 2.5 > a ? 2 : 4 > a ? 3 : 7 > a ? 5 : 10 : 1 > a ? 1 : 2 > a ? 2 : 3 > a ? 3 : 5 > a ? 5 : 10, t = n * r, i >= -20 ? +t.toFixed(0 > i ? -i : 0) : t
    }

    function ho(t, e) {
        var n = (t.length - 1) * e + 1, i = Math.floor(n), r = +t[i - 1], a = n - i;
        return a ? r + a * (t[i] - r) : r
    }

    function co(t) {
        function e(t, n, i) {
            return t.interval[i] < n.interval[i] || t.interval[i] === n.interval[i] && (t.close[i] - n.close[i] === (i ? -1 : 1) || !i && e(t, n, 1))
        }

        t.sort(function (t, n) {
            return e(t, n, 0) ? -1 : 1
        });
        for (var n = -1 / 0, i = 1, r = 0; r < t.length;) {
            for (var a = t[r].interval, o = t[r].close, s = 0; 2 > s; s++) a[s] <= n && (a[s] = n, o[s] = s ? 1 : 1 - i), n = a[s], i = o[s];
            a[0] === a[1] && o[0] * o[1] !== 1 ? t.splice(r, 1) : r++
        }
        return t
    }

    function fo(t) {
        return t - parseFloat(t) >= 0
    }

    function po(t) {
        return isNaN(t) ? "-" : (t = (t + "").split("."), t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : ""))
    }

    function go(t, e) {
        return t = (t || "").toLowerCase().replace(/-(.)/g, function (t, e) {
            return e.toUpperCase()
        }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t
    }

    function vo(t) {
        return null == t ? "" : (t + "").replace(gw, function (t, e) {
            return vw[e]
        })
    }

    function mo(t, e, n) {
        _(e) || (e = [e]);
        var i = e.length;
        if (!i) return "";
        for (var r = e[0].$vars || [], a = 0; a < r.length; a++) {
            var o = mw[a];
            t = t.replace(yw(o), yw(o, 0))
        }
        for (var s = 0; i > s; s++) for (var l = 0; l < r.length; l++) {
            var u = e[s][r[l]];
            t = t.replace(yw(mw[l], s), n ? vo(u) : u)
        }
        return t
    }

    function yo(t, e, n) {
        return f(e, function (e, i) {
            t = t.replace("{" + i + "}", n ? vo(e) : e)
        }), t
    }

    function xo(t, e) {
        t = b(t) ? {color: t, extraCssText: e} : t || {};
        var n = t.color, i = t.type, e = t.extraCssText, r = t.renderMode || "html", a = t.markerId || "X";
        return n ? "html" === r ? "subItem" === i ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + vo(n) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + vo(n) + ";" + (e || "") + '"></span>' : {
            renderMode: r,
            content: "{marker" + a + "|}  ",
            style: {color: n}
        } : ""
    }

    function _o(t, e) {
        return t += "", "0000".substr(0, e - t.length) + t
    }

    function wo(t, e, n) {
        ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
        var i = oo(e), r = n ? "UTC" : "", a = i["get" + r + "FullYear"](), o = i["get" + r + "Month"]() + 1,
            s = i["get" + r + "Date"](), l = i["get" + r + "Hours"](), u = i["get" + r + "Minutes"](),
            h = i["get" + r + "Seconds"](), c = i["get" + r + "Milliseconds"]();
        return t = t.replace("MM", _o(o, 2)).replace("M", o).replace("yyyy", a).replace("yy", a % 100).replace("dd", _o(s, 2)).replace("d", s).replace("hh", _o(l, 2)).replace("h", l).replace("mm", _o(u, 2)).replace("m", u).replace("ss", _o(h, 2)).replace("s", h).replace("SSS", _o(c, 3))
    }

    function bo(t) {
        return t ? t.charAt(0).toUpperCase() + t.substr(1) : t
    }

    function Mo(t) {
        return Nn(t.text, t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich, t.truncate)
    }

    function So(t, e, n, i, r, a, o, s) {
        return Nn(t, e, n, i, r, s, a, o)
    }

    function Io(t, e, n, i, r) {
        var a = 0, o = 0;
        null == i && (i = 1 / 0), null == r && (r = 1 / 0);
        var s = 0;
        e.eachChild(function (l, u) {
            var h, c, d = l.position, f = l.getBoundingRect(), p = e.childAt(u + 1), g = p && p.getBoundingRect();
            if ("horizontal" === t) {
                var v = f.width + (g ? -g.x + f.x : 0);
                h = a + v, h > i || l.newline ? (a = 0, h = v, o += s + n, s = f.height) : s = Math.max(s, f.height)
            } else {
                var m = f.height + (g ? -g.y + f.y : 0);
                c = o + m, c > r || l.newline ? (a += s + n, o = 0, c = m, s = f.width) : s = Math.max(s, f.width)
            }
            l.newline || (d[0] = a, d[1] = o, "horizontal" === t ? a = h + n : o = c + n)
        })
    }

    function To(t, e, n) {
        n = pw(n || 0);
        var i = e.width, r = e.height, a = $a(t.left, i), o = $a(t.top, r), s = $a(t.right, i), l = $a(t.bottom, r),
            u = $a(t.width, i), h = $a(t.height, r), c = n[2] + n[0], d = n[1] + n[3], f = t.aspect;
        switch (isNaN(u) && (u = i - s - d - a), isNaN(h) && (h = r - l - c - o), null != f && (isNaN(u) && isNaN(h) && (f > i / r ? u = .8 * i : h = .8 * r), isNaN(u) && (u = f * h), isNaN(h) && (h = u / f)), isNaN(a) && (a = i - s - u - d), isNaN(o) && (o = r - l - h - c), t.left || t.right) {
            case"center":
                a = i / 2 - u / 2 - n[3];
                break;
            case"right":
                a = i - u - d
        }
        switch (t.top || t.bottom) {
            case"middle":
            case"center":
                o = r / 2 - h / 2 - n[0];
                break;
            case"bottom":
                o = r - h - c
        }
        a = a || 0, o = o || 0, isNaN(u) && (u = i - d - a - (s || 0)), isNaN(h) && (h = r - c - o - (l || 0));
        var p = new xn(a + n[3], o + n[0], u, h);
        return p.margin = n, p
    }

    function Co(t, e, n, i, r) {
        var a = !r || !r.hv || r.hv[0], o = !r || !r.hv || r.hv[1], l = r && r.boundingMode || "all";
        if (a || o) {
            var u;
            if ("raw" === l) u = "group" === t.type ? new xn(0, 0, +e.width || 0, +e.height || 0) : t.getBoundingRect(); else if (u = t.getBoundingRect(), t.needLocalTransform()) {
                var h = t.getLocalTransform();
                u = u.clone(), u.applyTransform(h)
            }
            e = To(s({width: u.width, height: u.height}, e), n, i);
            var c = t.position, d = a ? e.x - u.x : 0, f = o ? e.y - u.y : 0;
            t.attr("position", "raw" === l ? [d, f] : [c[0] + d, c[1] + f])
        }
    }

    function Ao(t, e, n) {
        function i(n, i) {
            var o = {}, l = 0, u = {}, h = 0, c = 2;
            if (ww(n, function (e) {
                u[e] = t[e]
            }), ww(n, function (t) {
                r(e, t) && (o[t] = u[t] = e[t]), a(o, t) && l++, a(u, t) && h++
            }), s[i]) return a(e, n[1]) ? u[n[2]] = null : a(e, n[2]) && (u[n[1]] = null), u;
            if (h !== c && l) {
                if (l >= c) return o;
                for (var d = 0; d < n.length; d++) {
                    var f = n[d];
                    if (!r(o, f) && r(t, f)) {
                        o[f] = t[f];
                        break
                    }
                }
                return o
            }
            return u
        }

        function r(t, e) {
            return t.hasOwnProperty(e)
        }

        function a(t, e) {
            return null != t[e] && "auto" !== t[e]
        }

        function o(t, e, n) {
            ww(t, function (t) {
                e[t] = n[t]
            })
        }

        !M(n) && (n = {});
        var s = n.ignoreSize;
        !_(s) && (s = [s, s]);
        var l = i(Mw[0], 0), u = i(Mw[1], 1);
        o(Mw[0], t, l), o(Mw[1], t, u)
    }

    function Do(t) {
        return ko({}, t)
    }

    function ko(t, e) {
        return e && t && ww(bw, function (n) {
            e.hasOwnProperty(n) && (t[n] = e[n])
        }), t
    }

    function Po(t) {
        var e = [];
        return f(Cw.getClassesByMainType(t), function (t) {
            e = e.concat(t.prototype.dependencies || [])
        }), e = p(e, function (t) {
            return Ji(t).main
        }), "dataset" !== t && u(e, "dataset") <= 0 && e.unshift("dataset"), e
    }

    function Lo(t, e) {
        for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];
        return t[n - 1]
    }

    function Oo(t) {
        var e = t.get("coordinateSystem"), n = {coordSysName: e, coordSysDims: [], axisMap: N(), categoryAxisMap: N()},
            i = Lw[e];
        return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0
    }

    function zo(t) {
        return "category" === t.get("type")
    }

    function Eo(t) {
        this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === Rw ? {} : []), this.sourceFormat = t.sourceFormat || Bw, this.seriesLayoutBy = t.seriesLayoutBy || Vw, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && N(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
    }

    function Ro(t) {
        var e = t.option.source, n = Bw;
        if (I(e)) n = Nw; else if (_(e)) {
            0 === e.length && (n = zw);
            for (var i = 0, r = e.length; r > i; i++) {
                var a = e[i];
                if (null != a) {
                    if (_(a)) {
                        n = zw;
                        break
                    }
                    if (M(a)) {
                        n = Ew;
                        break
                    }
                }
            }
        } else if (M(e)) {
            for (var o in e) if (e.hasOwnProperty(o) && d(e[o])) {
                n = Rw;
                break
            }
        } else if (null != e) throw new Error("Invalid data");
        Hw(t).sourceFormat = n
    }

    function Bo(t) {
        return Hw(t).source
    }

    function No(t) {
        Hw(t).datasetMap = N()
    }

    function Vo(t) {
        var e = t.option, n = e.data, i = I(n) ? Nw : Ow, r = !1, a = e.seriesLayoutBy, o = e.sourceHeader,
            s = e.dimensions, l = Xo(t);
        if (l) {
            var u = l.option;
            n = u.source, i = Hw(l).sourceFormat, r = !0, a = a || u.seriesLayoutBy, null == o && (o = u.sourceHeader), s = s || u.dimensions
        }
        var h = Fo(n, i, a, o, s), c = e.encode;
        !c && l && (c = Zo(t, l, n, i, a, h)), Hw(t).source = new Eo({
            data: n,
            fromDataset: r,
            seriesLayoutBy: a,
            sourceFormat: i,
            dimensionsDefine: h.dimensionsDefine,
            startIndex: h.startIndex,
            dimensionsDetectCount: h.dimensionsDetectCount,
            encodeDefine: c
        })
    }

    function Fo(t, e, n, i, r) {
        if (!t) return {dimensionsDefine: Ho(r)};
        var a, o, s;
        if (e === zw) "auto" === i || null == i ? Go(function (t) {
            null != t && "-" !== t && (b(t) ? null == o && (o = 1) : o = 0)
        }, n, t, 10) : o = i ? 1 : 0, r || 1 !== o || (r = [], Go(function (t, e) {
            r[e] = null != t ? t : ""
        }, n, t)), a = r ? r.length : n === Fw ? t.length : t[0] ? t[0].length : null; else if (e === Ew) r || (r = Wo(t), s = !0); else if (e === Rw) r || (r = [], s = !0, f(t, function (t, e) {
            r.push(e)
        })); else if (e === Ow) {
            var l = Vi(t[0]);
            a = _(l) && l.length || 1
        }
        var u;
        return s && f(r, function (t, e) {
            "name" === (M(t) ? t.name : t) && (u = e)
        }), {startIndex: o, dimensionsDefine: Ho(r), dimensionsDetectCount: a, potentialNameDimIndex: u}
    }

    function Ho(t) {
        if (t) {
            var e = N();
            return p(t, function (t) {
                if (t = o({}, M(t) ? t : {name: t}), null == t.name) return t;
                t.name += "", null == t.displayName && (t.displayName = t.name);
                var n = e.get(t.name);
                return n ? t.name += "-" + n.count++ : e.set(t.name, {count: 1}), t
            })
        }
    }

    function Go(t, e, n, i) {
        if (null == i && (i = 1 / 0), e === Fw) for (var r = 0; r < n.length && i > r; r++) t(n[r] ? n[r][0] : null, r); else for (var a = n[0] || [], r = 0; r < a.length && i > r; r++) t(a[r], r)
    }

    function Wo(t) {
        for (var e, n = 0; n < t.length && !(e = t[n++]);) ;
        if (e) {
            var i = [];
            return f(e, function (t, e) {
                i.push(e)
            }), i
        }
    }

    function Zo(t, e, n, i, r, a) {
        var o = Oo(t), s = {}, l = [], u = [], h = t.subType, c = N(["pie", "map", "funnel"]),
            d = N(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
        if (o && null != d.get(h)) {
            var p = t.ecModel, g = Hw(p).datasetMap, v = e.uid + "_" + r,
                m = g.get(v) || g.set(v, {categoryWayDim: 1, valueWayDim: 0});
            f(o.coordSysDims, function (t) {
                if (null == o.firstCategoryDimIndex) {
                    var e = m.valueWayDim++;
                    s[t] = e, u.push(e)
                } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0); else {
                    var e = m.categoryWayDim++;
                    s[t] = e, u.push(e)
                }
            })
        } else if (null != c.get(h)) {
            for (var y, x = 0; 5 > x && null == y; x++) Uo(n, i, r, a.dimensionsDefine, a.startIndex, x) || (y = x);
            if (null != y) {
                s.value = y;
                var _ = a.potentialNameDimIndex || Math.max(y - 1, 0);
                u.push(_), l.push(_)
            }
        }
        return l.length && (s.itemName = l), u.length && (s.seriesName = u), s
    }

    function Xo(t) {
        var e = t.option, n = e.data;
        return n ? void 0 : t.ecModel.getComponent("dataset", e.datasetIndex || 0)
    }

    function Yo(t, e) {
        return Uo(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
    }

    function Uo(t, e, n, i, r, a) {
        function o(t) {
            return null != t && isFinite(t) && "" !== t ? !1 : b(t) && "-" !== t ? !0 : void 0
        }

        var s, l = 5;
        if (I(t)) return !1;
        var u;
        if (i && (u = i[a], u = M(u) ? u.name : u), e === zw) if (n === Fw) {
            for (var h = t[a], c = 0; c < (h || []).length && l > c; c++) if (null != (s = o(h[r + c]))) return s
        } else for (var c = 0; c < t.length && l > c; c++) {
            var d = t[r + c];
            if (d && null != (s = o(d[a]))) return s
        } else if (e === Ew) {
            if (!u) return;
            for (var c = 0; c < t.length && l > c; c++) {
                var f = t[c];
                if (f && null != (s = o(f[u]))) return s
            }
        } else if (e === Rw) {
            if (!u) return;
            var h = t[u];
            if (!h || I(h)) return !1;
            for (var c = 0; c < h.length && l > c; c++) if (null != (s = o(h[c]))) return s
        } else if (e === Ow) for (var c = 0; c < t.length && l > c; c++) {
            var f = t[c], p = Vi(f);
            if (!_(p)) return !1;
            if (null != (s = o(p[a]))) return s
        }
        return !1
    }

    function jo(t, e) {
        if (e) {
            var n = e.seiresIndex, i = e.seriesId, r = e.seriesName;
            return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r
        }
    }

    function qo(t, e) {
        var n = t.color && !t.colorLayer;
        f(e, function (e, a) {
            "colorLayer" === a && n || Cw.hasClass(a) || ("object" == typeof e ? t[a] = t[a] ? r(t[a], e, !1) : i(e) : null == t[a] && (t[a] = e))
        })
    }

    function Ko(t) {
        t = t, this.option = {}, this.option[Gw] = 1, this._componentsMap = N({series: []}), this._seriesIndices, this._seriesIndicesMap, qo(t, this._theme.option), r(t, Dw, !1), this.mergeOption(t)
    }

    function $o(t, e) {
        _(e) || (e = e ? [e] : []);
        var n = {};
        return f(e, function (e) {
            n[e] = (t.get(e) || []).slice()
        }), n
    }

    function Qo(t, e, n) {
        var i = e.type ? e.type : n ? n.subType : Cw.determineSubType(t, e);
        return i
    }

    function Jo(t, e) {
        t._seriesIndicesMap = N(t._seriesIndices = p(e, function (t) {
            return t.componentIndex
        }) || [])
    }

    function ts(t, e) {
        return e.hasOwnProperty("subType") ? v(t, function (t) {
            return t.subType === e.subType
        }) : t
    }

    function es(t) {
        f(Zw, function (e) {
            this[e] = y(t[e], t)
        }, this)
    }

    function ns() {
        this._coordinateSystems = []
    }

    function is(t) {
        this._api = t, this._timelineOptions = [], this._mediaList = [], this._mediaDefault, this._currentMediaIndices = [], this._optionBackup, this._newBaseOption
    }

    function rs(t, e, n) {
        var i, r, a = [], o = [], s = t.timeline;
        if (t.baseOption && (r = t.baseOption), (s || t.options) && (r = r || {}, a = (t.options || []).slice()), t.media) {
            r = r || {};
            var l = t.media;
            Yw(l, function (t) {
                t && t.option && (t.query ? o.push(t) : i || (i = t))
            })
        }
        return r || (r = t), r.timeline || (r.timeline = s), Yw([r].concat(a).concat(p(o, function (t) {
            return t.option
        })), function (t) {
            Yw(e, function (e) {
                e(t, n)
            })
        }), {baseOption: r, timelineOptions: a, mediaDefault: i, mediaList: o}
    }

    function as(t, e, n) {
        var i = {width: e, height: n, aspectratio: e / n}, r = !0;
        return f(t, function (t, e) {
            var n = e.match(Kw);
            if (n && n[1] && n[2]) {
                var a = n[1], o = n[2].toLowerCase();
                os(i[o], t, a) || (r = !1)
            }
        }), r
    }

    function os(t, e, n) {
        return "min" === n ? t >= e : "max" === n ? e >= t : t === e
    }

    function ss(t, e) {
        return t.join(",") === e.join(",")
    }

    function ls(t, e) {
        e = e || {}, Yw(e, function (e, n) {
            if (null != e) {
                var i = t[n];
                if (Cw.hasClass(n)) {
                    e = Bi(e), i = Bi(i);
                    var r = Hi(i, e);
                    t[n] = jw(r, function (t) {
                        return t.option && t.exist ? qw(t.exist, t.option, !0) : t.exist || t.option
                    })
                } else t[n] = qw(i, e, !0)
            }
        })
    }

    function us(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0, i = Jw.length; i > n; n++) {
            var a = Jw[n], o = e.normal, s = e.emphasis;
            o && o[a] && (t[a] = t[a] || {}, t[a].normal ? r(t[a].normal, o[a]) : t[a].normal = o[a], o[a] = null), s && s[a] && (t[a] = t[a] || {}, t[a].emphasis ? r(t[a].emphasis, s[a]) : t[a].emphasis = s[a], s[a] = null)
        }
    }

    function hs(t, e, n) {
        if (t && t[e] && (t[e].normal || t[e].emphasis)) {
            var i = t[e].normal, r = t[e].emphasis;
            i && (n ? (t[e].normal = t[e].emphasis = null, s(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, t.emphasis[e] = r)
        }
    }

    function cs(t) {
        hs(t, "itemStyle"), hs(t, "lineStyle"), hs(t, "areaStyle"), hs(t, "label"), hs(t, "labelLine"), hs(t, "upperLabel"), hs(t, "edgeLabel")
    }

    function ds(t, e) {
        var n = Qw(t) && t[e], i = Qw(n) && n.textStyle;
        if (i) for (var r = 0, a = dx.length; a > r; r++) {
            var e = dx[r];
            i.hasOwnProperty(e) && (n[e] = i[e])
        }
    }

    function fs(t) {
        t && (cs(t), ds(t, "label"), t.emphasis && ds(t.emphasis, "label"))
    }

    function ps(t) {
        if (Qw(t)) {
            us(t), cs(t), ds(t, "label"), ds(t, "upperLabel"), ds(t, "edgeLabel"), t.emphasis && (ds(t.emphasis, "label"), ds(t.emphasis, "upperLabel"), ds(t.emphasis, "edgeLabel"));
            var e = t.markPoint;
            e && (us(e), fs(e));
            var n = t.markLine;
            n && (us(n), fs(n));
            var i = t.markArea;
            i && fs(i);
            var r = t.data;
            if ("graph" === t.type) {
                r = r || t.nodes;
                var a = t.links || t.edges;
                if (a && !I(a)) for (var o = 0; o < a.length; o++) fs(a[o]);
                f(t.categories, function (t) {
                    cs(t)
                })
            }
            if (r && !I(r)) for (var o = 0; o < r.length; o++) fs(r[o]);
            var e = t.markPoint;
            if (e && e.data) for (var s = e.data, o = 0; o < s.length; o++) fs(s[o]);
            var n = t.markLine;
            if (n && n.data) for (var l = n.data, o = 0; o < l.length; o++) _(l[o]) ? (fs(l[o][0]), fs(l[o][1])) : fs(l[o]);
            "gauge" === t.type ? (ds(t, "axisLabel"), ds(t, "title"), ds(t, "detail")) : "treemap" === t.type ? (hs(t.breadcrumb, "itemStyle"), f(t.levels, function (t) {
                cs(t)
            })) : "tree" === t.type && cs(t.leaves)
        }
    }

    function gs(t) {
        return _(t) ? t : t ? [t] : []
    }

    function vs(t) {
        return (_(t) ? t[0] : t) || {}
    }

    function ms(t, e) {
        e = e.split(",");
        for (var n = t, i = 0; i < e.length && (n = n && n[e[i]], null != n); i++) ;
        return n
    }

    function ys(t, e, n, i) {
        e = e.split(",");
        for (var r, a = t, o = 0; o < e.length - 1; o++) r = e[o], null == a[r] && (a[r] = {}), a = a[r];
        (i || null == a[e[o]]) && (a[e[o]] = n)
    }

    function xs(t) {
        f(eb, function (e) {
            e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]])
        })
    }

    function _s(t) {
        f(t, function (e, n) {
            var i = [], r = [0 / 0, 0 / 0], a = [e.stackResultDimension, e.stackedOverDimension], o = e.data,
                s = e.isStackedByIndex, l = o.map(a, function (a, l, u) {
                    var h = o.get(e.stackedDimension, u);
                    if (isNaN(h)) return r;
                    var c, d;
                    s ? d = o.getRawIndex(u) : c = o.get(e.stackedByDimension, u);
                    for (var f = 0 / 0, p = n - 1; p >= 0; p--) {
                        var g = t[p];
                        if (s || (d = g.data.rawIndexOf(g.stackedByDimension, c)), d >= 0) {
                            var v = g.data.getByRawIndex(g.stackResultDimension, d);
                            if (h >= 0 && v > 0 || 0 >= h && 0 > v) {
                                h += v, f = v;
                                break
                            }
                        }
                    }
                    return i[0] = h, i[1] = f, i
                });
            o.hostModel.setData(l), e.data = l
        })
    }

    function ws(t, e) {
        Eo.isInstance(t) || (t = Eo.seriesDataToSource(t)), this._source = t;
        var n = this._data = t.data, i = t.sourceFormat;
        i === Nw && (this._offset = 0, this._dimSize = e, this._data = n);
        var r = ob[i === zw ? i + "_" + t.seriesLayoutBy : i];
        o(this, r)
    }

    function bs() {
        return this._data.length
    }

    function Ms(t) {
        return this._data[t]
    }

    function Ss(t) {
        for (var e = 0; e < t.length; e++) this._data.push(t[e])
    }

    function Is(t, e, n) {
        return null != n ? t[n] : t
    }

    function Ts(t, e, n, i) {
        return Cs(t[i], this._dimensionInfos[e])
    }

    function Cs(t, e) {
        var n = e && e.type;
        if ("ordinal" === n) {
            var i = e && e.ordinalMeta;
            return i ? i.parseAndCollect(t) : t
        }
        return "time" === n && "number" != typeof t && null != t && "-" !== t && (t = +oo(t)), null == t || "" === t ? 0 / 0 : +t
    }

    function As(t, e, n) {
        if (t) {
            var i = t.getRawDataItem(e);
            if (null != i) {
                var r, a, o = t.getProvider().getSource().sourceFormat, s = t.getDimensionInfo(n);
                return s && (r = s.name, a = s.index), sb[o](i, e, a, r)
            }
        }
    }

    function Ds(t, e, n) {
        if (t) {
            var i = t.getProvider().getSource().sourceFormat;
            if (i === Ow || i === Ew) {
                var r = t.getRawDataItem(e);
                return i !== Ow || M(r) || (r = null), r ? r[n] : void 0
            }
        }
    }

    function ks(t) {
        return new Ps(t)
    }

    function Ps(t) {
        t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0, this.context
    }

    function Ls(t, e, n, i, r, a) {
        db.reset(n, i, r, a), t._callingProgress = e, t._callingProgress({
            start: n,
            end: i,
            count: i - n,
            next: db.next
        }, t.context)
    }

    function Os(t, e) {
        t._dueIndex = t._outputDueEnd = t._dueEnd = 0, t._settedOutputEnd = null;
        var n, i;
        !e && t._reset && (n = t._reset(t.context), n && n.progress && (i = n.forceFirstProgress, n = n.progress), _(n) && !n.length && (n = null)), t._progress = n, t._modBy = t._modDataCount = null;
        var r = t._downstream;
        return r && r.dirty(), i
    }

    function zs(t) {
        var e = t.name;
        Wi(t) || (t.name = Es(t) || e)
    }

    function Es(t) {
        var e = t.getRawData(), n = e.mapDimension("seriesName", !0), i = [];
        return f(n, function (t) {
            var n = e.getDimensionInfo(t);
            n.displayName && i.push(n.displayName)
        }), i.join(" ")
    }

    function Rs(t) {
        return t.model.getRawData().count()
    }

    function Bs(t) {
        var e = t.model;
        return e.setData(e.getRawData().cloneShallow()), Ns
    }

    function Ns(t, e) {
        t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData)
    }

    function Vs(t, e) {
        f(t.CHANGABLE_METHODS, function (n) {
            t.wrapMethod(n, x(Fs, e))
        })
    }

    function Fs(t) {
        var e = Hs(t);
        e && e.setOutputEnd(this.count())
    }

    function Hs(t) {
        var e = (t.ecModel || {}).scheduler, n = e && e.getPipeline(t.uid);
        if (n) {
            var i = n.currentTask;
            if (i) {
                var r = i.agentStubMap;
                r && (i = r.get(t.uid))
            }
            return i
        }
    }

    function Gs() {
        this.group = new dy, this.uid = Ya("viewChart"), this.renderTask = ks({
            plan: Xs,
            reset: Ys
        }), this.renderTask.context = {view: this}
    }

    function Ws(t, e) {
        if (t && (t.trigger(e), "group" === t.type)) for (var n = 0; n < t.childCount(); n++) Ws(t.childAt(n), e)
    }

    function Zs(t, e, n) {
        var i = Yi(t, e);
        null != i ? f(Bi(i), function (e) {
            Ws(t.getItemGraphicEl(e), n)
        }) : t.eachItemGraphicEl(function (t) {
            Ws(t, n)
        })
    }

    function Xs(t) {
        return xb(t.model)
    }

    function Ys(t) {
        var e = t.model, n = t.ecModel, i = t.api, r = t.payload, a = e.pipelineContext.progressiveRender, o = t.view,
            s = r && yb(r).updateMethod, l = a ? "incrementalPrepareRender" : s && o[s] ? s : "render";
        return "render" !== l && o[l](e, n, i, r), wb[l]
    }

    function Us(t, e, n) {
        function i() {
            h = (new Date).getTime(), c = null, t.apply(o, s || [])
        }

        var r, a, o, s, l, u = 0, h = 0, c = null;
        e = e || 0;
        var d = function () {
            r = (new Date).getTime(), o = this, s = arguments;
            var t = l || e, d = l || n;
            l = null, a = r - (d ? u : h) - t, clearTimeout(c), d ? c = setTimeout(i, t) : a >= 0 ? i() : c = setTimeout(i, -a), u = r
        };
        return d.clear = function () {
            c && (clearTimeout(c), c = null)
        }, d.debounceNextCall = function (t) {
            l = t
        }, d
    }

    function js(t, e, n, i) {
        var r = t[e];
        if (r) {
            var a = r[bb] || r, o = r[Sb], s = r[Mb];
            if (s !== n || o !== i) {
                if (null == n || !i) return t[e] = a;
                r = t[e] = Us(a, n, "debounce" === i), r[bb] = a, r[Sb] = i, r[Mb] = n
            }
            return r
        }
    }

    function qs(t, e) {
        var n = t[e];
        n && n[bb] && (t[e] = n[bb])
    }

    function Ks(t, e, n, i) {
        this.ecInstance = t, this.api = e, this.unfinished;
        var n = this._dataProcessorHandlers = n.slice(), i = this._visualHandlers = i.slice();
        this._allHandlers = n.concat(i), this._stageTaskMap = N()
    }

    function $s(t, e, n, i, r) {
        function a(t, e) {
            return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id))
        }

        r = r || {};
        var o;
        f(e, function (e) {
            if (!r.visualType || r.visualType === e.visualType) {
                var s = t._stageTaskMap.get(e.uid), l = s.seriesTaskMap, u = s.overallTask;
                if (u) {
                    var h, c = u.agentStubMap;
                    c.each(function (t) {
                        a(r, t) && (t.dirty(), h = !0)
                    }), h && u.dirty(), Pb(u, i);
                    var d = t.getPerformArgs(u, r.block);
                    c.each(function (t) {
                        t.perform(d)
                    }), o |= u.perform(d)
                } else l && l.each(function (s) {
                    a(r, s) && s.dirty();
                    var l = t.getPerformArgs(s, r.block);
                    l.skip = !e.performRawSeries && n.isSeriesFiltered(s.context.model), Pb(s, i), o |= s.perform(l)
                })
            }
        }), t.unfinished |= o
    }

    function Qs(t, e, n, i, r) {
        function a(n) {
            var a = n.uid, s = o.get(a) || o.set(a, ks({plan: rl, reset: al, count: sl}));
            s.context = {
                model: n,
                ecModel: i,
                api: r,
                useClearVisual: e.isVisual && !e.isLayout,
                plan: e.plan,
                reset: e.reset,
                scheduler: t
            }, ll(t, n, s)
        }

        var o = n.seriesTaskMap || (n.seriesTaskMap = N()), s = e.seriesType, l = e.getTargetSeries;
        e.createOnAllSeries ? i.eachRawSeries(a) : s ? i.eachRawSeriesByType(s, a) : l && l(i, r).each(a);
        var u = t._pipelineMap;
        o.each(function (t, e) {
            u.get(e) || (t.dispose(), o.removeKey(e))
        })
    }

    function Js(t, e, n, i, r) {
        function a(e) {
            var n = e.uid, i = s.get(n);
            i || (i = s.set(n, ks({reset: el, onDirty: il})), o.dirty()), i.context = {
                model: e,
                overallProgress: h,
                modifyOutputEnd: c
            }, i.agent = o, i.__block = h, ll(t, e, i)
        }

        var o = n.overallTask = n.overallTask || ks({reset: tl});
        o.context = {ecModel: i, api: r, overallReset: e.overallReset, scheduler: t};
        var s = o.agentStubMap = o.agentStubMap || N(), l = e.seriesType, u = e.getTargetSeries, h = !0,
            c = e.modifyOutputEnd;
        l ? i.eachRawSeriesByType(l, a) : u ? u(i, r).each(a) : (h = !1, f(i.getSeries(), a));
        var d = t._pipelineMap;
        s.each(function (t, e) {
            d.get(e) || (t.dispose(), o.dirty(), s.removeKey(e))
        })
    }

    function tl(t) {
        t.overallReset(t.ecModel, t.api, t.payload)
    }

    function el(t) {
        return t.overallProgress && nl
    }

    function nl() {
        this.agent.dirty(), this.getDownstream().dirty()
    }

    function il() {
        this.agent && this.agent.dirty()
    }

    function rl(t) {
        return t.plan && t.plan(t.model, t.ecModel, t.api, t.payload)
    }

    function al(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = Bi(t.reset(t.model, t.ecModel, t.api, t.payload));
        return e.length > 1 ? p(e, function (t, e) {
            return ol(e)
        }) : Lb
    }

    function ol(t) {
        return function (e, n) {
            var i = n.data, r = n.resetDefines[t];
            if (r && r.dataEach) for (var a = e.start; a < e.end; a++) r.dataEach(i, a); else r && r.progress && r.progress(e, i)
        }
    }

    function sl(t) {
        return t.data.count()
    }

    function ll(t, e, n) {
        var i = e.uid, r = t._pipelineMap.get(i);
        !r.head && (r.head = n), r.tail && r.tail.pipe(n), r.tail = n, n.__idxInPipeline = r.count++, n.__pipeline = r
    }

    function ul(t) {
        Ob = null;
        try {
            t(zb, Eb)
        } catch (e) {
        }
        return Ob
    }

    function hl(t, e) {
        for (var n in e.prototype) t[n] = F
    }

    function cl(t) {
        if (b(t)) {
            var e = new DOMParser;
            t = e.parseFromString(t, "text/xml")
        }
        for (9 === t.nodeType && (t = t.firstChild); "svg" !== t.nodeName.toLowerCase() || 1 !== t.nodeType;) t = t.nextSibling;
        return t
    }

    function dl() {
        this._defs = {}, this._root = null, this._isDefine = !1, this._isText = !1
    }

    function fl(t, e) {
        for (var n = t.firstChild; n;) {
            if (1 === n.nodeType) {
                var i = n.getAttribute("offset");
                i = i.indexOf("%") > 0 ? parseInt(i, 10) / 100 : i ? parseFloat(i) : 0;
                var r = n.getAttribute("stop-color") || "#000000";
                e.addColorStop(i, r)
            }
            n = n.nextSibling
        }
    }

    function pl(t, e) {
        t && t.__inheritedStyle && (e.__inheritedStyle || (e.__inheritedStyle = {}), s(e.__inheritedStyle, t.__inheritedStyle))
    }

    function gl(t) {
        for (var e = z(t).split(Wb), n = [], i = 0; i < e.length; i += 2) {
            var r = parseFloat(e[i]), a = parseFloat(e[i + 1]);
            n.push([r, a])
        }
        return n
    }

    function vl(t, e, n, i) {
        var r = e.__inheritedStyle || {}, a = "text" === e.type;
        if (1 === t.nodeType && (yl(t, e), o(r, xl(t)), !i)) for (var s in Yb) if (Yb.hasOwnProperty(s)) {
            var l = t.getAttribute(s);
            null != l && (r[Yb[s]] = l)
        }
        var u = a ? "textFill" : "fill", h = a ? "textStroke" : "stroke";
        e.style = e.style || new wy;
        var c = e.style;
        null != r.fill && c.set(u, ml(r.fill, n)), null != r.stroke && c.set(h, ml(r.stroke, n)), f(["lineWidth", "opacity", "fillOpacity", "strokeOpacity", "miterLimit", "fontSize"], function (t) {
            var e = "lineWidth" === t && a ? "textStrokeWidth" : t;
            null != r[t] && c.set(e, parseFloat(r[t]))
        }), r.textBaseline && "auto" !== r.textBaseline || (r.textBaseline = "alphabetic"), "alphabetic" === r.textBaseline && (r.textBaseline = "bottom"), "start" === r.textAlign && (r.textAlign = "left"), "end" === r.textAlign && (r.textAlign = "right"), f(["lineDashOffset", "lineCap", "lineJoin", "fontWeight", "fontFamily", "fontStyle", "textAlign", "textBaseline"], function (t) {
            null != r[t] && c.set(t, r[t])
        }), r.lineDash && (e.style.lineDash = z(r.lineDash).split(Wb)), c[h] && "none" !== c[h] && (e[h] = !0), e.__inheritedStyle = r
    }

    function ml(t, e) {
        var n = e && t && t.match(Ub);
        if (n) {
            var i = z(n[1]), r = e[i];
            return r
        }
        return t
    }

    function yl(t, e) {
        var n = t.getAttribute("transform");
        if (n) {
            n = n.replace(/,/g, " ");
            var i = null, r = [];
            n.replace(jb, function (t, e, n) {
                r.push(e, n)
            });
            for (var a = r.length - 1; a > 0; a -= 2) {
                var o = r[a], s = r[a - 1];
                switch (i = i || Ie(), s) {
                    case"translate":
                        o = z(o).split(Wb), De(i, i, [parseFloat(o[0]), parseFloat(o[1] || 0)]);
                        break;
                    case"scale":
                        o = z(o).split(Wb), Pe(i, i, [parseFloat(o[0]), parseFloat(o[1] || o[0])]);
                        break;
                    case"rotate":
                        o = z(o).split(Wb), ke(i, i, parseFloat(o[0]));
                        break;
                    case"skew":
                        o = z(o).split(Wb), console.warn("Skew transform is not supported yet");
                        break;
                    case"matrix":
                        var o = z(o).split(Wb);
                        i[0] = parseFloat(o[0]), i[1] = parseFloat(o[1]), i[2] = parseFloat(o[2]), i[3] = parseFloat(o[3]), i[4] = parseFloat(o[4]), i[5] = parseFloat(o[5])
                }
            }
            e.setLocalTransform(i)
        }
    }

    function xl(t) {
        var e = t.getAttribute("style"), n = {};
        if (!e) return n;
        var i = {};
        qb.lastIndex = 0;
        for (var r; null != (r = qb.exec(e));) i[r[1]] = r[2];
        for (var a in Yb) Yb.hasOwnProperty(a) && null != i[a] && (n[Yb[a]] = i[a]);
        return n
    }

    function _l(t, e, n) {
        var i = e / t.width, r = n / t.height, a = Math.min(i, r), o = [a, a],
            s = [-(t.x + t.width / 2) * a + e / 2, -(t.y + t.height / 2) * a + n / 2];
        return {scale: o, position: s}
    }

    function wl(t) {
        return function (e, n, i) {
            e = e && e.toLowerCase(), Sm.prototype[t].call(this, e, n, i)
        }
    }

    function bl() {
        Sm.call(this)
    }

    function Ml(t, e, n) {
        function r(t, e) {
            return t.__prio - e.__prio
        }

        n = n || {}, "string" == typeof e && (e = CM[e]), this.id, this.group, this._dom = t;
        var a = "canvas", o = this._zr = Li(t, {
            renderer: n.renderer || a,
            devicePixelRatio: n.devicePixelRatio,
            width: n.width,
            height: n.height
        });
        this._throttledZrFlush = Us(y(o.flush, o), 17);
        var e = i(e);
        e && ib(e, !0), this._theme = e, this._chartsViews = [], this._chartsMap = {}, this._componentsViews = [], this._componentsMap = {}, this._coordSysMgr = new ns;
        var s = this._api = Hl(this);
        Cn(TM, r), Cn(MM, r), this._scheduler = new Ks(this, s, MM, TM), Sm.call(this, this._ecEventProcessor = new Gl), this._messageCenter = new bl, this._initEvents(), this.resize = y(this.resize, this), this._pendingActions = [], o.animation.on("frame", this._onframe, this), Pl(o, this), E(this)
    }

    function Sl(t, e, n) {
        var i, r = this._model, a = this._coordSysMgr.getCoordinateSystems();
        e = ji(r, e);
        for (var o = 0; o < a.length; o++) {
            var s = a[o];
            if (s[t] && null != (i = s[t](r, e, n))) return i
        }
    }

    function Il(t) {
        var e = t._model, n = t._scheduler;
        n.restorePipelines(e), n.prepareStageTasks(), Ll(t, "component", e, n), Ll(t, "chart", e, n), n.plan()
    }

    function Tl(t, e, n, i, r) {
        function a(i) {
            i && i.__alive && i[e] && i[e](i.__model, o, t._api, n)
        }

        var o = t._model;
        if (!i) return void tM(t._componentsViews.concat(t._chartsViews), a);
        var s = {};
        s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
        var l = {mainType: i, query: s};
        r && (l.subType = r);
        var u = n.excludeSeriesId;
        null != u && (u = N(Bi(u))), o && o.eachComponent(l, function (e) {
            u && null != u.get(e.id) || a(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId])
        }, t)
    }

    function Cl(t, e) {
        var n = t._chartsMap, i = t._scheduler;
        e.eachSeries(function (t) {
            i.updateStreamModes(t, n[t.__viewId])
        })
    }

    function Al(t, e) {
        var n = t.type, i = t.escapeConnect, r = wM[n], a = r.actionInfo, l = (a.update || "update").split(":"),
            u = l.pop();
        l = null != l[0] && iM(l[0]), this[gM] = !0;
        var h = [t], c = !1;
        t.batch && (c = !0, h = p(t.batch, function (e) {
            return e = s(o({}, e), t), e.batch = null, e
        }));
        var d, f = [], g = "highlight" === n || "downplay" === n;
        tM(h, function (t) {
            d = r.action(t, this._model, this._api), d = d || o({}, t), d.type = a.event || d.type, f.push(d), g ? Tl(this, u, t, "series") : l && Tl(this, u, t, l.main, l.sub)
        }, this), "none" === u || g || l || (this[vM] ? (Il(this), xM.update.call(this, t), this[vM] = !1) : xM[u].call(this, t)), d = c ? {
            type: a.event || n,
            escapeConnect: i,
            batch: f
        } : f[0], this[gM] = !1, !e && this._messageCenter.trigger(d.type, d)
    }

    function Dl(t) {
        for (var e = this._pendingActions; e.length;) {
            var n = e.shift();
            Al.call(this, n, t)
        }
    }

    function kl(t) {
        !t && this.trigger("updated")
    }

    function Pl(t, e) {
        t.on("rendered", function () {
            e.trigger("rendered"), !t.animation.isFinished() || e[vM] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished")
        })
    }

    function Ll(t, e, n, i) {
        function r(t) {
            var e = "_ec_" + t.id + "_" + t.type, r = s[e];
            if (!r) {
                var h = iM(t.type), c = a ? gb.getClass(h.main, h.sub) : Gs.getClass(h.sub);
                r = new c, r.init(n, u), s[e] = r, o.push(r), l.add(r.group)
            }
            t.__viewId = r.__id = e, r.__alive = !0, r.__model = t, r.group.__ecComponentInfo = {
                mainType: t.mainType,
                index: t.componentIndex
            }, !a && i.prepareView(r, t, n, u)
        }

        for (var a = "component" === e, o = a ? t._componentsViews : t._chartsViews, s = a ? t._componentsMap : t._chartsMap, l = t._zr, u = t._api, h = 0; h < o.length; h++) o[h].__alive = !1;
        a ? n.eachComponent(function (t, e) {
            "series" !== t && r(e)
        }) : n.eachSeries(r);
        for (var h = 0; h < o.length;) {
            var c = o[h];
            c.__alive ? h++ : (!a && c.renderTask.dispose(), l.remove(c.group), c.dispose(n, u), o.splice(h, 1), delete s[c.__id], c.__id = c.group.__ecComponentInfo = null)
        }
    }

    function Ol(t) {
        t.clearColorPalette(), t.eachSeries(function (t) {
            t.clearColorPalette()
        })
    }

    function zl(t, e, n, i) {
        El(t, e, n, i), tM(t._chartsViews, function (t) {
            t.__alive = !1
        }), Rl(t, e, n, i), tM(t._chartsViews, function (t) {
            t.__alive || t.remove(e, n)
        })
    }

    function El(t, e, n, i, r) {
        tM(r || t._componentsViews, function (t) {
            var r = t.__model;
            t.render(r, e, n, i), Fl(r, t)
        })
    }

    function Rl(t, e, n, i, r) {
        var a, o = t._scheduler;
        e.eachSeries(function (e) {
            var n = t._chartsMap[e.__viewId];
            n.__alive = !0;
            var s = n.renderTask;
            o.updatePayload(s, i), r && r.get(e.uid) && s.dirty(), a |= s.perform(o.getPerformArgs(s)), n.group.silent = !!e.get("silent"), Fl(e, n), Vl(e, n)
        }), o.unfinished |= a, Nl(t._zr, e), Cb(t._zr.dom, e)
    }

    function Bl(t, e) {
        tM(IM, function (n) {
            n(t, e)
        })
    }

    function Nl(t, e) {
        var n = t.storage, i = 0;
        n.traverse(function (t) {
            t.isGroup || i++
        }), i > e.get("hoverLayerThreshold") && !nm.node && n.traverse(function (t) {
            t.isGroup || (t.useHoverLayer = !0)
        })
    }

    function Vl(t, e) {
        var n = t.get("blendMode") || null;
        e.group.traverse(function (t) {
            t.isGroup || t.style.blend !== n && t.setStyle("blend", n), t.eachPendingDisplayable && t.eachPendingDisplayable(function (t) {
                t.setStyle("blend", n)
            })
        })
    }

    function Fl(t, e) {
        var n = t.get("z"), i = t.get("zlevel");
        e.group.traverse(function (t) {
            "group" !== t.type && (null != n && (t.z = n), null != i && (t.zlevel = i))
        })
    }

    function Hl(t) {
        var e = t._coordSysMgr;
        return o(new es(t), {
            getCoordinateSystems: y(e.getCoordinateSystems, e), getComponentByElement: function (e) {
                for (; e;) {
                    var n = e.__ecComponentInfo;
                    if (null != n) return t._model.getComponent(n.mainType, n.index);
                    e = e.parent
                }
            }
        })
    }

    function Gl() {
        this.eventInfo
    }

    function Wl(t) {
        function e(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i[a] = e
            }
        }

        var n = 0, i = 1, r = 2, a = "__connectUpdateStatus";
        tM(bM, function (o, s) {
            t._messageCenter.on(s, function (o) {
                if (kM[t.group] && t[a] !== n) {
                    if (o && o.escapeConnect) return;
                    var s = t.makeActionFromEvent(o), l = [];
                    tM(DM, function (e) {
                        e !== t && e.group === t.group && l.push(e)
                    }), e(l, n), tM(l, function (t) {
                        t[a] !== i && t.dispatchAction(s)
                    }), e(l, r)
                }
            })
        })
    }

    function Zl(t, e, n) {
        var i = jl(t);
        if (i) return i;
        var r = new Ml(t, e, n);
        return r.id = "ec_" + PM++, DM[r.id] = r, Ki(t, OM, r.id), Wl(r), r
    }

    function Xl(t) {
        if (_(t)) {
            var e = t;
            t = null, tM(e, function (e) {
                null != e.group && (t = e.group)
            }), t = t || "g_" + LM++, tM(e, function (e) {
                e.group = t
            })
        }
        return kM[t] = !0, t
    }

    function Yl(t) {
        kM[t] = !1
    }

    function Ul(t) {
        "string" == typeof t ? t = DM[t] : t instanceof Ml || (t = jl(t)), t instanceof Ml && !t.isDisposed() && t.dispose()
    }

    function jl(t) {
        return DM[$i(t, OM)]
    }

    function ql(t) {
        return DM[t]
    }

    function Kl(t, e) {
        CM[t] = e
    }

    function $l(t) {
        SM.push(t)
    }

    function Ql(t, e) {
        au(MM, t, e, sM)
    }

    function Jl(t) {
        IM.push(t)
    }

    function tu(t, e, n) {
        "function" == typeof e && (n = e, e = "");
        var i = nM(t) ? t.type : [t, t = {event: e}][0];
        t.event = (t.event || i).toLowerCase(), e = t.event, Jb(mM.test(i) && mM.test(e)), wM[i] || (wM[i] = {
            action: n,
            actionInfo: t
        }), bM[e] = i
    }

    function eu(t, e) {
        ns.register(t, e)
    }

    function nu(t) {
        var e = ns.get(t);
        return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0
    }

    function iu(t, e) {
        au(TM, t, e, uM, "layout")
    }

    function ru(t, e) {
        au(TM, t, e, cM, "visual")
    }

    function au(t, e, n, i, r) {
        (eM(e) || nM(e)) && (n = e, e = i);
        var a = Ks.wrapStageHandler(n, r);
        return a.__prio = e, a.__raw = n, t.push(a), a
    }

    function ou(t, e) {
        AM[t] = e
    }

    function su(t) {
        return Cw.extend(t)
    }

    function lu(t) {
        return gb.extend(t)
    }

    function uu(t) {
        return pb.extend(t)
    }

    function hu(t) {
        return Gs.extend(t)
    }

    function cu(t) {
        n("createCanvas", t)
    }

    function du(t, e, n) {
        $b.registerMap(t, e, n)
    }

    function fu(t) {
        var e = $b.retrieveMap(t);
        return e && e[0] && {geoJson: e[0].geoJSON, specialAreas: e[0].specialAreas}
    }

    function pu(t) {
        return t
    }

    function gu(t, e, n, i, r) {
        this._old = t, this._new = e, this._oldKeyGetter = n || pu, this._newKeyGetter = i || pu, this.context = r
    }

    function vu(t, e, n, i, r) {
        for (var a = 0; a < t.length; a++) {
            var o = "_ec_" + r[i](t[a], a), s = e[o];
            null == s ? (n.push(o), e[o] = a) : (s.length || (e[o] = s = [s]), s.push(a))
        }
    }

    function mu(t) {
        var e = {}, n = e.encode = {}, i = N(), r = [], a = [];
        f(t.dimensions, function (e) {
            var o = t.getDimensionInfo(e), s = o.coordDim;
            if (s) {
                var l = n[s];
                n.hasOwnProperty(s) || (l = n[s] = []), l[o.coordDimIndex] = e, o.isExtraCoord || (i.set(s, 1), xu(o.type) && (r[0] = e)), o.defaultTooltip && a.push(e)
            }
            RM.each(function (t, e) {
                var i = n[e];
                n.hasOwnProperty(e) || (i = n[e] = []);
                var r = o.otherDims[e];
                null != r && r !== !1 && (i[r] = o.name)
            })
        });
        var o = [], s = {};
        i.each(function (t, e) {
            var i = n[e];
            s[e] = i[0], o = o.concat(i)
        }), e.dataDimsOnCoord = o, e.encodeFirstDimNotExtra = s;
        var l = n.label;
        l && l.length && (r = l.slice());
        var u = n.tooltip;
        return u && u.length ? a = u.slice() : a.length || (a = r.slice()), n.defaultedLabel = r, n.defaultedTooltip = a, e
    }

    function yu(t) {
        return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
    }

    function xu(t) {
        return !("ordinal" === t || "time" === t)
    }

    function _u(t) {
        return t._rawCount > 65535 ? GM : ZM
    }

    function wu(t) {
        var e = t.constructor;
        return e === Array ? t.slice() : new e(t)
    }

    function bu(t, e) {
        f(XM.concat(e.__wrappedMethods || []), function (n) {
            e.hasOwnProperty(n) && (t[n] = e[n])
        }), t.__wrappedMethods = e.__wrappedMethods, f(YM, function (n) {
            t[n] = i(e[n])
        }), t._calculationInfo = o(e._calculationInfo)
    }

    function Mu(t, e, n, i, r) {
        var a = HM[e.type], o = i - 1, s = e.name, l = t[s][o];
        if (l && l.length < n) {
            for (var u = new a(Math.min(r - o * n, n)), h = 0; h < l.length; h++) u[h] = l[h];
            t[s][o] = u
        }
        for (var c = i * n; r > c; c += n) t[s].push(new a(Math.min(r - c, n)))
    }

    function Su(t) {
        var e = t._invertedIndicesMap;
        f(e, function (n, i) {
            var r = t._dimensionInfos[i], a = r.ordinalMeta;
            if (a) {
                n = e[i] = new WM(a.categories.length);
                for (var o = 0; o < n.length; o++) n[o] = VM;
                for (var o = 0; o < t._count; o++) n[t.get(i, o)] = o
            }
        })
    }

    function Iu(t, e, n) {
        var i;
        if (null != e) {
            var r = t._chunkSize, a = Math.floor(n / r), o = n % r, s = t.dimensions[e], l = t._storage[s][a];
            if (l) {
                i = l[o];
                var u = t._dimensionInfos[s].ordinalMeta;
                u && u.categories.length && (i = u.categories[i])
            }
        }
        return i
    }

    function Tu(t) {
        return t
    }

    function Cu(t) {
        return t < this._count && t >= 0 ? this._indices[t] : -1
    }

    function Au(t, e) {
        var n = t._idList[e];
        return null == n && (n = Iu(t, t._idDimIdx, e)), null == n && (n = FM + e), n
    }

    function Du(t) {
        return _(t) || (t = [t]), t
    }

    function ku(t, e) {
        var n = t.dimensions, i = new UM(p(n, t.getDimensionInfo, t), t.hostModel);
        bu(i, t);
        for (var r = i._storage = {}, a = t._storage, o = 0; o < n.length; o++) {
            var s = n[o];
            a[s] && (u(e, s) >= 0 ? (r[s] = Pu(a[s]), i._rawExtent[s] = Lu(), i._extent[s] = null) : r[s] = a[s])
        }
        return i
    }

    function Pu(t) {
        for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = wu(t[n]);
        return e
    }

    function Lu() {
        return [1 / 0, -1 / 0]
    }

    function Ou(t, e, n) {
        function r(t, e, n) {
            null != RM.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, h.set(e, !0))
        }

        Eo.isInstance(e) || (e = Eo.seriesDataToSource(e)), n = n || {}, t = (t || []).slice();
        for (var a = (n.dimsDef || []).slice(), l = N(n.encodeDef), u = N(), h = N(), c = [], d = zu(e, t, a, n.dimCount), p = 0; d > p; p++) {
            var g = a[p] = o({}, M(a[p]) ? a[p] : {name: a[p]}), v = g.name, m = c[p] = {otherDims: {}};
            null != v && null == u.get(v) && (m.name = m.displayName = v, u.set(v, p)), null != g.type && (m.type = g.type), null != g.displayName && (m.displayName = g.displayName)
        }
        l.each(function (t, e) {
            if (t = Bi(t).slice(), 1 === t.length && t[0] < 0) return void l.set(e, !1);
            var n = l.set(e, []);
            f(t, function (t, i) {
                b(t) && (t = u.get(t)), null != t && d > t && (n[i] = t, r(c[t], e, i))
            })
        });
        var y = 0;
        f(t, function (t) {
            var e, t, n, a;
            if (b(t)) e = t, t = {}; else {
                e = t.name;
                var o = t.ordinalMeta;
                t.ordinalMeta = null, t = i(t), t.ordinalMeta = o, n = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null
            }
            var u = l.get(e);
            if (u !== !1) {
                var u = Bi(u);
                if (!u.length) for (var h = 0; h < (n && n.length || 1); h++) {
                    for (; y < c.length && null != c[y].coordDim;) y++;
                    y < c.length && u.push(y++)
                }
                f(u, function (i, o) {
                    var l = c[i];
                    if (r(s(l, t), e, o), null == l.name && n) {
                        var u = n[o];
                        !M(u) && (u = {name: u}), l.name = l.displayName = u.name, l.defaultTooltip = u.defaultTooltip
                    }
                    a && s(l.otherDims, a)
                })
            }
        });
        var x = n.generateCoord, _ = n.generateCoordCount, w = null != _;
        _ = x ? _ || 1 : 0;
        for (var S = x || "value", I = 0; d > I; I++) {
            var m = c[I] = c[I] || {}, T = m.coordDim;
            null == T && (m.coordDim = Eu(S, h, w), m.coordDimIndex = 0, (!x || 0 >= _) && (m.isExtraCoord = !0), _--), null == m.name && (m.name = Eu(m.coordDim, u)), null == m.type && Yo(e, I, m.name) && (m.type = "ordinal")
        }
        return c
    }

    function zu(t, e, n, i) {
        var r = Math.max(t.dimensionsDetectCount || 1, e.length, n.length, i || 0);
        return f(e, function (t) {
            var e = t.dimsDef;
            e && (r = Math.max(r, e.length))
        }), r
    }

    function Eu(t, e, n) {
        if (n || null != e.get(t)) {
            for (var i = 0; null != e.get(t + i);) i++;
            t += i
        }
        return e.set(t, !0), t
    }

    function Ru(t, e, n) {
        n = n || {};
        var i, r, a, o, s = n.byIndex, l = n.stackedCoordDimension, u = !(!t || !t.get("stack"));
        if (f(e, function (t, n) {
            b(t) && (e[n] = t = {name: t}), u && !t.isExtraCoord && (s || i || !t.ordinalMeta || (i = t), r || "ordinal" === t.type || "time" === t.type || l && l !== t.coordDim || (r = t))
        }), !r || s || i || (s = !0), r) {
            a = "__\x00ecstackresult", o = "__\x00ecstackedover", i && (i.createInvertedIndices = !0);
            var h = r.coordDim, c = r.type, d = 0;
            f(e, function (t) {
                t.coordDim === h && d++
            }), e.push({
                name: a,
                coordDim: h,
                coordDimIndex: d,
                type: c,
                isExtraCoord: !0,
                isCalculationCoord: !0
            }), d++, e.push({name: o, coordDim: o, coordDimIndex: d, type: c, isExtraCoord: !0, isCalculationCoord: !0})
        }
        return {
            stackedDimension: r && r.name,
            stackedByDimension: i && i.name,
            isStackedByIndex: s,
            stackedOverDimension: o,
            stackResultDimension: a
        }
    }

    function Bu(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension")
    }

    function Nu(t, e) {
        return Bu(t, e) ? t.getCalculationInfo("stackResultDimension") : e
    }

    function Vu(t, e, n) {
        n = n || {}, Eo.isInstance(t) || (t = Eo.seriesDataToSource(t));
        var i, r = e.get("coordinateSystem"), a = ns.get(r), o = Oo(e);
        o && (i = p(o.coordSysDims, function (t) {
            var e = {name: t}, n = o.axisMap.get(t);
            if (n) {
                var i = n.get("type");
                e.type = yu(i)
            }
            return e
        })), i || (i = a && (a.getDimensionsInfo ? a.getDimensionsInfo() : a.dimensions.slice()) || ["x", "y"]);
        var s, l, u = KM(t, {coordDimensions: i, generateCoord: n.generateCoord});
        o && f(u, function (t, e) {
            var n = t.coordDim, i = o.categoryAxisMap.get(n);
            i && (null == s && (s = e), t.ordinalMeta = i.getOrdinalMeta()), null != t.otherDims.itemName && (l = !0)
        }), l || null == s || (u[s].otherDims.itemName = 0);
        var h = Ru(e, u), c = new UM(u, e);
        c.setCalculationInfo(h);
        var d = null != s && Fu(t) ? function (t, e, n, i) {
            return i === s ? n : this.defaultDimValueGetter(t, e, n, i)
        } : null;
        return c.hasItemOption = !1, c.initData(t, null, d), c
    }

    function Fu(t) {
        if (t.sourceFormat === Ow) {
            var e = Hu(t.data || []);
            return null != e && !_(Vi(e))
        }
    }

    function Hu(t) {
        for (var e = 0; e < t.length && null == t[e];) e++;
        return t[e]
    }

    function Gu(t) {
        this._setting = t || {}, this._extent = [1 / 0, -1 / 0], this._interval = 0, this.init && this.init.apply(this, arguments)
    }

    function Wu(t) {
        this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this._map
    }

    function Zu(t) {
        return t._map || (t._map = N(t.categories))
    }

    function Xu(t) {
        return M(t) && null != t.value ? t.value : t + ""
    }

    function Yu(t, e, n, i) {
        var r = {}, a = t[1] - t[0], o = r.interval = uo(a / e, !0);
        null != n && n > o && (o = r.interval = n), null != i && o > i && (o = r.interval = i);
        var s = r.intervalPrecision = Uu(o),
            l = r.niceTickExtent = [tS(Math.ceil(t[0] / o) * o, s), tS(Math.floor(t[1] / o) * o, s)];
        return qu(l, t), r
    }

    function Uu(t) {
        return eo(t) + 2
    }

    function ju(t, e, n) {
        t[e] = Math.max(Math.min(t[e], n[1]), n[0])
    }

    function qu(t, e) {
        !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), ju(t, 0, e), ju(t, 1, e), t[0] > t[1] && (t[0] = t[1])
    }

    function Ku(t, e, n, i) {
        var r = [];
        if (!t) return r;
        var a = 1e4;
        e[0] < n[0] && r.push(e[0]);
        for (var o = n[0]; o <= n[1] && (r.push(o), o = tS(o + t, i), o !== r[r.length - 1]);) if (r.length > a) return [];
        return e[1] > (r.length ? r[r.length - 1] : n[1]) && r.push(e[1]), r
    }

    function $u(t) {
        return t.get("stack") || iS + t.seriesIndex
    }

    function Qu(t) {
        return t.dim + t.index
    }

    function Ju(t, e) {
        var n = [];
        return e.eachSeriesByType(t, function (t) {
            rh(t) && !ah(t) && n.push(t)
        }), n
    }

    function th(t) {
        var e = [];
        return f(t, function (t) {
            var n = t.getData(), i = t.coordinateSystem, r = i.getBaseAxis(), a = r.getExtent(),
                o = "category" === r.type ? r.getBandWidth() : Math.abs(a[1] - a[0]) / n.count(),
                s = $a(t.get("barWidth"), o), l = $a(t.get("barMaxWidth"), o), u = t.get("barGap"),
                h = t.get("barCategoryGap");
            e.push({
                bandWidth: o,
                barWidth: s,
                barMaxWidth: l,
                barGap: u,
                barCategoryGap: h,
                axisKey: Qu(r),
                stackId: $u(t)
            })
        }), eh(e)
    }

    function eh(t) {
        var e = {};
        f(t, function (t) {
            var n = t.axisKey, i = t.bandWidth, r = e[n] || {
                bandWidth: i,
                remainedWidth: i,
                autoWidthCount: 0,
                categoryGap: "20%",
                gap: "30%",
                stacks: {}
            }, a = r.stacks;
            e[n] = r;
            var o = t.stackId;
            a[o] || r.autoWidthCount++, a[o] = a[o] || {width: 0, maxWidth: 0};
            var s = t.barWidth;
            s && !a[o].width && (a[o].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);
            var l = t.barMaxWidth;
            l && (a[o].maxWidth = l);
            var u = t.barGap;
            null != u && (r.gap = u);
            var h = t.barCategoryGap;
            null != h && (r.categoryGap = h)
        });
        var n = {};
        return f(e, function (t, e) {
            n[e] = {};
            var i = t.stacks, r = t.bandWidth, a = $a(t.categoryGap, r), o = $a(t.gap, 1), s = t.remainedWidth,
                l = t.autoWidthCount, u = (s - a) / (l + (l - 1) * o);
            u = Math.max(u, 0), f(i, function (t) {
                var e = t.maxWidth;
                e && u > e && (e = Math.min(e, s), t.width && (e = Math.min(e, t.width)), s -= e, t.width = e, l--)
            }), u = (s - a) / (l + (l - 1) * o), u = Math.max(u, 0);
            var h, c = 0;
            f(i, function (t) {
                t.width || (t.width = u), h = t, c += t.width * (1 + o)
            }), h && (c -= h.width * o);
            var d = -c / 2;
            f(i, function (t, i) {
                n[e][i] = n[e][i] || {offset: d, width: t.width}, d += t.width * (1 + o)
            })
        }), n
    }

    function nh(t, e, n) {
        if (t && e) {
            var i = t[Qu(e)];
            return null != i && null != n && (i = i[$u(n)]), i
        }
    }

    function ih(t, e) {
        var n = Ju(t, e), i = th(n), r = {};
        f(n, function (t) {
            var e = t.getData(), n = t.coordinateSystem, a = n.getBaseAxis(), o = $u(t), s = i[Qu(a)][o], l = s.offset,
                u = s.width, h = n.getOtherAxis(a), c = t.get("barMinHeight") || 0;
            r[o] = r[o] || [], e.setLayout({offset: l, size: u});
            for (var d = e.mapDimension(h.dim), f = e.mapDimension(a.dim), p = Bu(e, d), g = h.isHorizontal(), v = oh(a, h, p), m = 0, y = e.count(); y > m; m++) {
                var x = e.get(d, m), _ = e.get(f, m);
                if (!isNaN(x)) {
                    var w = x >= 0 ? "p" : "n", b = v;
                    p && (r[o][_] || (r[o][_] = {p: v, n: v}), b = r[o][_][w]);
                    var M, S, I, T;
                    if (g) {
                        var C = n.dataToPoint([x, _]);
                        M = b, S = C[1] + l, I = C[0] - v, T = u, Math.abs(I) < c && (I = (0 > I ? -1 : 1) * c), p && (r[o][_][w] += I)
                    } else {
                        var C = n.dataToPoint([_, x]);
                        M = C[0] + l, S = b, I = u, T = C[1] - v, Math.abs(T) < c && (T = (0 >= T ? -1 : 1) * c), p && (r[o][_][w] += T)
                    }
                    e.setItemLayout(m, {x: M, y: S, width: I, height: T})
                }
            }
        }, this)
    }

    function rh(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type
    }

    function ah(t) {
        return t.pipelineContext && t.pipelineContext.large
    }

    function oh(t, e) {
        var n, i, r = e.getGlobalExtent();
        r[0] > r[1] ? (n = r[1], i = r[0]) : (n = r[0], i = r[1]);
        var a = e.toGlobalCoord(e.dataToCoord(0));
        return n > a && (a = n), a > i && (a = i), a
    }

    function sh(t, e) {
        return _S(t, xS(e))
    }

    function lh(t, e) {
        var n, i, r, a = t.type, o = e.getMin(), s = e.getMax(), l = null != o, u = null != s, h = t.getExtent();
        "ordinal" === a ? n = e.getCategories().length : (i = e.get("boundaryGap"), _(i) || (i = [i || 0, i || 0]), "boolean" == typeof i[0] && (i = [0, 0]), i[0] = $a(i[0], 1), i[1] = $a(i[1], 1), r = h[1] - h[0] || Math.abs(h[0])), null == o && (o = "ordinal" === a ? n ? 0 : 0 / 0 : h[0] - i[0] * r), null == s && (s = "ordinal" === a ? n ? n - 1 : 0 / 0 : h[1] + i[1] * r), "dataMin" === o ? o = h[0] : "function" == typeof o && (o = o({
            min: h[0],
            max: h[1]
        })), "dataMax" === s ? s = h[1] : "function" == typeof s && (s = s({
            min: h[0],
            max: h[1]
        })), (null == o || !isFinite(o)) && (o = 0 / 0), (null == s || !isFinite(s)) && (s = 0 / 0), t.setBlank(C(o) || C(s) || "ordinal" === a && !t.getOrdinalMeta().categories.length), e.getNeedCrossZero() && (o > 0 && s > 0 && !l && (o = 0), 0 > o && 0 > s && !u && (s = 0));
        var c = e.ecModel;
        if (c && "time" === a) {
            var d, p = Ju("bar", c);
            if (f(p, function (t) {
                d |= t.getBaseAxis() === e.axis
            }), d) {
                var g = th(p), v = uh(o, s, e, g);
                o = v.min, s = v.max
            }
        }
        return [o, s]
    }

    function uh(t, e, n, i) {
        var r = n.axis.getExtent(), a = r[1] - r[0], o = nh(i, n.axis);
        if (void 0 === o) return {min: t, max: e};
        var s = 1 / 0;
        f(o, function (t) {
            s = Math.min(t.offset, s)
        });
        var l = -1 / 0;
        f(o, function (t) {
            l = Math.max(t.offset + t.width, l)
        }), s = Math.abs(s), l = Math.abs(l);
        var u = s + l, h = e - t, c = 1 - (s + l) / a, d = h / c - h;
        return e += d * (l / u), t -= d * (s / u), {min: t, max: e}
    }

    function hh(t, e) {
        var n = lh(t, e), i = null != e.getMin(), r = null != e.getMax(), a = e.get("splitNumber");
        "log" === t.type && (t.base = e.get("logBase"));
        var o = t.type;
        t.setExtent(n[0], n[1]), t.niceExtent({
            splitNumber: a,
            fixMin: i,
            fixMax: r,
            minInterval: "interval" === o || "time" === o ? e.get("minInterval") : null,
            maxInterval: "interval" === o || "time" === o ? e.get("maxInterval") : null
        });
        var s = e.get("interval");
        null != s && t.setInterval && t.setInterval(s)
    }

    function ch(t, e) {
        if (e = e || t.get("type")) switch (e) {
            case"category":
                return new JM(t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(), [1 / 0, -1 / 0]);
            case"value":
                return new nS;
            default:
                return (Gu.getClass(e) || nS).create(t)
        }
    }

    function dh(t) {
        var e = t.scale.getExtent(), n = e[0], i = e[1];
        return !(n > 0 && i > 0 || 0 > n && 0 > i)
    }

    function fh(t) {
        var e = t.getLabelModel().get("formatter"), n = "category" === t.type ? t.scale.getExtent()[0] : null;
        return "string" == typeof e ? e = function (e) {
            return function (n) {
                return n = t.scale.getLabel(n), e.replace("{value}", null != n ? n : "")
            }
        }(e) : "function" == typeof e ? function (i, r) {
            return null != n && (r = i - n), e(ph(t, i), r)
        } : function (e) {
            return t.scale.getLabel(e)
        }
    }

    function ph(t, e) {
        return "category" === t.type ? t.scale.getLabel(e) : e
    }

    function gh(t) {
        var e = t.model, n = t.scale;
        if (e.get("axisLabel.show") && !n.isBlank()) {
            var i, r, a = "category" === t.type, o = n.getExtent();
            a ? r = n.count() : (i = n.getTicks(), r = i.length);
            var s, l = t.getLabelModel(), u = fh(t), h = 1;
            r > 40 && (h = Math.ceil(r / 40));
            for (var c = 0; r > c; c += h) {
                var d = i ? i[c] : o[0] + c, f = u(d), p = l.getTextRect(f), g = vh(p, l.get("rotate") || 0);
                s ? s.union(g) : s = g
            }
            return s
        }
    }

    function vh(t, e) {
        var n = e * Math.PI / 180, i = t.plain(), r = i.width, a = i.height, o = r * Math.cos(n) + a * Math.sin(n),
            s = r * Math.sin(n) + a * Math.cos(n), l = new xn(i.x, i.y, o, s);
        return l
    }

    function mh(t) {
        var e = t.get("interval");
        return null == e ? "auto" : e
    }

    function yh(t) {
        return "category" === t.type && 0 === mh(t.getLabelModel())
    }

    function xh(t, e) {
        if ("image" !== this.type) {
            var n = this.style, i = this.shape;
            i && "line" === i.symbolType ? n.stroke = t : this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff") : (n.fill && (n.fill = t), n.stroke && (n.stroke = t)), this.dirty(!1)
        }
    }

    function _h(t, e, n, i, r, a, o) {
        var s = 0 === t.indexOf("empty");
        s && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
        var l;
        return l = 0 === t.indexOf("image://") ? na(t.slice(8), new xn(e, n, i, r), o ? "center" : "cover") : 0 === t.indexOf("path://") ? ea(t.slice(7), {}, new xn(e, n, i, r), o ? "center" : "cover") : new zS({
            shape: {
                symbolType: t,
                x: e,
                y: n,
                width: i,
                height: r
            }
        }), l.__isEmptyBrush = s, l.setColor = xh, l.setColor(a), l
    }

    function wh(t) {
        return Vu(t.getSource(), t)
    }

    function bh(t, e) {
        var n = e;
        Wa.isInstance(e) || (n = new Wa(e), c(n, TS));
        var i = ch(n);
        return i.setExtent(t[0], t[1]), hh(i, n), i
    }

    function Mh(t) {
        c(t, TS)
    }

    function Sh(t, e) {
        return Math.abs(t - e) < BS
    }

    function Ih(t, e, n) {
        var i = 0, r = t[0];
        if (!r) return !1;
        for (var a = 1; a < t.length; a++) {
            var o = t[a];
            i += kr(r[0], r[1], o[0], o[1], e, n), r = o
        }
        var s = t[0];
        return Sh(r[0], s[0]) && Sh(r[1], s[1]) || (i += kr(r[0], r[1], s[0], s[1], e, n)), 0 !== i
    }

    function Th(t, e, n) {
        if (this.name = t, this.geometries = e, n) n = [n[0], n[1]]; else {
            var i = this.getBoundingRect();
            n = [i.x + i.width / 2, i.y + i.height / 2]
        }
        this.center = n
    }

    function Ch(t) {
        if (!t.UTF8Encoding) return t;
        var e = t.UTF8Scale;
        null == e && (e = 1024);
        for (var n = t.features, i = 0; i < n.length; i++) for (var r = n[i], a = r.geometry, o = a.coordinates, s = a.encodeOffsets, l = 0; l < o.length; l++) {
            var u = o[l];
            if ("Polygon" === a.type) o[l] = Ah(u, s[l], e); else if ("MultiPolygon" === a.type) for (var h = 0; h < u.length; h++) {
                var c = u[h];
                u[h] = Ah(c, s[l][h], e)
            }
        }
        return t.UTF8Encoding = !1, t
    }

    function Ah(t, e, n) {
        for (var i = [], r = e[0], a = e[1], o = 0; o < t.length; o += 2) {
            var s = t.charCodeAt(o) - 64, l = t.charCodeAt(o + 1) - 64;
            s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), s += r, l += a, r = s, a = l, i.push([s / n, l / n])
        }
        return i
    }

    function Dh(t) {
        return "category" === t.type ? Ph(t) : zh(t)
    }

    function kh(t, e) {
        return "category" === t.type ? Oh(t, e) : {ticks: t.scale.getTicks()}
    }

    function Ph(t) {
        var e = t.getLabelModel(), n = Lh(t, e);
        return !e.get("show") || t.scale.isBlank() ? {labels: [], labelCategoryInterval: n.labelCategoryInterval} : n
    }

    function Lh(t, e) {
        var n = Eh(t, "labels"), i = mh(e), r = Rh(n, i);
        if (r) return r;
        var a, o;
        return w(i) ? a = Gh(t, i) : (o = "auto" === i ? Nh(t) : i, a = Hh(t, o)), Bh(n, i, {
            labels: a,
            labelCategoryInterval: o
        })
    }

    function Oh(t, e) {
        var n = Eh(t, "ticks"), i = mh(e), r = Rh(n, i);
        if (r) return r;
        var a, o;
        if ((!e.get("show") || t.scale.isBlank()) && (a = []), w(i)) a = Gh(t, i, !0); else if ("auto" === i) {
            var s = Lh(t, t.getLabelModel());
            o = s.labelCategoryInterval, a = p(s.labels, function (t) {
                return t.tickValue
            })
        } else o = i, a = Hh(t, o, !0);
        return Bh(n, i, {ticks: a, tickCategoryInterval: o})
    }

    function zh(t) {
        var e = t.scale.getTicks(), n = fh(t);
        return {
            labels: p(e, function (e, i) {
                return {formattedLabel: n(e, i), rawLabel: t.scale.getLabel(e), tickValue: e}
            })
        }
    }

    function Eh(t, e) {
        return VS(t)[e] || (VS(t)[e] = [])
    }

    function Rh(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value
    }

    function Bh(t, e, n) {
        return t.push({key: e, value: n}), n
    }

    function Nh(t) {
        var e = VS(t).autoInterval;
        return null != e ? e : VS(t).autoInterval = t.calculateCategoryInterval()
    }

    function Vh(t) {
        var e = Fh(t), n = fh(t), i = (e.axisRotate - e.labelRotate) / 180 * Math.PI, r = t.scale, a = r.getExtent(),
            o = r.count();
        if (a[1] - a[0] < 1) return 0;
        var s = 1;
        o > 40 && (s = Math.max(1, Math.floor(o / 40)));
        for (var l = a[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), d = 0, f = 0; l <= a[1]; l += s) {
            var p = 0, g = 0, v = Nn(n(l), e.font, "center", "top");
            p = 1.3 * v.width, g = 1.3 * v.height, d = Math.max(d, p, 7), f = Math.max(f, g, 7)
        }
        var m = d / h, y = f / c;
        isNaN(m) && (m = 1 / 0), isNaN(y) && (y = 1 / 0);
        var x = Math.max(0, Math.floor(Math.min(m, y))), _ = VS(t.model), w = _.lastAutoInterval, b = _.lastTickCount;
        return null != w && null != b && Math.abs(w - x) <= 1 && Math.abs(b - o) <= 1 && w > x ? x = w : (_.lastTickCount = o, _.lastAutoInterval = x), x
    }

    function Fh(t) {
        var e = t.getLabelModel();
        return {
            axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
            labelRotate: e.get("rotate") || 0,
            font: e.getFont()
        }
    }

    function Hh(t, e, n) {
        function i(t) {
            l.push(n ? t : {formattedLabel: r(t), rawLabel: a.getLabel(t), tickValue: t})
        }

        var r = fh(t), a = t.scale, o = a.getExtent(), s = t.getLabelModel(), l = [], u = Math.max((e || 0) + 1, 1),
            h = o[0], c = a.count();
        0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));
        var d = yh(t), f = s.get("showMinLabel") || d, p = s.get("showMaxLabel") || d;
        f && h !== o[0] && i(o[0]);
        for (var g = h; g <= o[1]; g += u) i(g);
        return p && g !== o[1] && i(o[1]), l
    }

    function Gh(t, e, n) {
        var i = t.scale, r = fh(t), a = [];
        return f(i.getTicks(), function (t) {
            var o = i.getLabel(t);
            e(t, o) && a.push(n ? t : {formattedLabel: r(t), rawLabel: o, tickValue: t})
        }), a
    }

    function Wh(t, e) {
        var n = t[1] - t[0], i = e, r = n / i / 2;
        t[0] += r, t[1] -= r
    }

    function Zh(t, e, n, i, r) {
        function a(t, e) {
            return h ? t > e : e > t
        }

        var o = e.length;
        if (t.onBand && !i && o) {
            var s, l = t.getExtent();
            if (1 === o) e[0].coord = l[0], s = e[1] = {coord: l[0]}; else {
                var u = e[1].coord - e[0].coord;
                f(e, function (t) {
                    t.coord -= u / 2;
                    var e = e || 0;
                    e % 2 > 0 && (t.coord -= u / (2 * (e + 1)))
                }), s = {coord: e[o - 1].coord + u}, e.push(s)
            }
            var h = l[0] > l[1];
            a(e[0].coord, l[0]) && (r ? e[0].coord = l[0] : e.shift()), r && a(l[0], e[0].coord) && e.unshift({coord: l[0]}), a(l[1], s.coord) && (r ? s.coord = l[1] : e.pop()), r && a(s.coord, l[1]) && e.push({coord: l[1]})
        }
    }

    function Xh(t) {
        return this._axes[t]
    }

    function Yh(t) {
        XS.call(this, t)
    }

    function Uh(t, e) {
        return e.type || (e.data ? "category" : "value")
    }

    function jh(t, e) {
        return t.getCoordSysModel() === e
    }

    function qh(t, e, n) {
        this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, this._axesList = [], this._initCartesian(t, e, n), this.model = t
    }

    function Kh(t, e, n, i) {
        function r(t) {
            return t.dim + "_" + t.index
        }

        n.getAxesOnZeroOf = function () {
            return a ? [a] : []
        };
        var a, o = t[e], s = n.model, l = s.get("axisLine.onZero"), u = s.get("axisLine.onZeroAxisIndex");
        if (l) {
            if (null != u) $h(o[u]) && (a = o[u]); else for (var h in o) if (o.hasOwnProperty(h) && $h(o[h]) && !i[r(o[h])]) {
                a = o[h];
                break
            }
            a && (i[r(a)] = !0)
        }
    }

    function $h(t) {
        return t && "category" !== t.type && "time" !== t.type && dh(t)
    }

    function Qh(t, e) {
        var n = t.getExtent(), i = n[0] + n[1];
        t.toGlobalCoord = "x" === t.dim ? function (t) {
            return t + e
        } : function (t) {
            return i - t + e
        }, t.toLocalCoord = "x" === t.dim ? function (t) {
            return t - e
        } : function (t) {
            return i - t + e
        }
    }

    function Jh(t) {
        return p(tI, function (e) {
            var n = t.getReferringComponents(e)[0];
            return n
        })
    }

    function tc(t) {
        return "cartesian2d" === t.get("coordinateSystem")
    }

    function ec(t, e) {
        var n = t.mapDimension("defaultedLabel", !0), i = n.length;
        if (1 === i) return As(t, e, n[0]);
        if (i) {
            for (var r = [], a = 0; a < n.length; a++) {
                var o = As(t, e, n[a]);
                r.push(o)
            }
            return r.join(" ")
        }
    }

    function nc(t, e, n, i, r, a) {
        var o = n.getModel("label"), s = n.getModel("emphasis.label");
        Ma(t, e, o, s, {
            labelFetcher: r,
            labelDataIndex: a,
            defaultText: ec(r.getData(), a),
            isRectText: !0,
            autoColor: i
        }), ic(t), ic(e)
    }

    function ic(t, e) {
        "outside" === t.textPosition && (t.textPosition = e)
    }

    function rc(t, e, n) {
        n.style.text = null, za(n, {shape: {width: 0}}, e, t, function () {
            n.parent && n.parent.remove(n)
        })
    }

    function ac(t, e, n) {
        n.style.text = null, za(n, {shape: {r: n.shape.r0}}, e, t, function () {
            n.parent && n.parent.remove(n)
        })
    }

    function oc(t, e, n, i, r, a, o, l) {
        var u = e.getItemVisual(n, "color"), h = e.getItemVisual(n, "opacity"), c = i.getModel("itemStyle"),
            d = i.getModel("emphasis.itemStyle").getBarItemStyle();
        l || t.setShape("r", c.get("barBorderRadius") || 0), t.useStyle(s({fill: u, opacity: h}, c.getBarItemStyle()));
        var f = i.getShallow("cursor");
        f && t.attr("cursor", f);
        var p = o ? r.height > 0 ? "bottom" : "top" : r.width > 0 ? "left" : "right";
        l || nc(t.style, d, i, u, a, n, p), wa(t, d)
    }

    function sc(t, e) {
        var n = t.get(rI) || 0;
        return Math.min(n, Math.abs(e.width), Math.abs(e.height))
    }

    function lc(t, e, n) {
        var i = t.getData(), r = [], a = i.getLayout("valueAxisHorizontal") ? 1 : 0;
        r[1 - a] = i.getLayout("valueAxisStart");
        var o = new sI({shape: {points: i.getLayout("largePoints")}, incremental: !!n, __startPoint: r, __valueIdx: a});
        e.add(o), uc(o, t, i)
    }

    function uc(t, e, n) {
        var i = n.getVisual("borderColor") || n.getVisual("color"),
            r = e.getModel("itemStyle").getItemStyle(["color", "borderColor"]);
        t.useStyle(r), t.style.fill = null, t.style.stroke = i, t.style.lineWidth = n.getLayout("barWidth")
    }

    function hc(t) {
        var e = {componentType: t.mainType, componentIndex: t.componentIndex};
        return e[t.mainType + "Index"] = t.componentIndex, e
    }

    function cc(t, e, n, i) {
        var r, a, o = ro(n - t.rotation), s = i[0] > i[1], l = "start" === e && !s || "start" !== e && s;
        return ao(o - lI / 2) ? (a = l ? "bottom" : "top", r = "center") : ao(o - 1.5 * lI) ? (a = l ? "top" : "bottom", r = "center") : (a = "middle", r = 1.5 * lI > o && o > lI / 2 ? l ? "left" : "right" : l ? "right" : "left"), {
            rotation: o,
            textAlign: r,
            textVerticalAlign: a
        }
    }

    function dc(t) {
        var e = t.get("tooltip");
        return t.get("silent") || !(t.get("triggerEvent") || e && e.show)
    }

    function fc(t, e, n) {
        if (!yh(t.axis)) {
            var i = t.get("axisLabel.showMinLabel"), r = t.get("axisLabel.showMaxLabel");
            e = e || [], n = n || [];
            var a = e[0], o = e[1], s = e[e.length - 1], l = e[e.length - 2], u = n[0], h = n[1], c = n[n.length - 1],
                d = n[n.length - 2];
            i === !1 ? (pc(a), pc(u)) : gc(a, o) && (i ? (pc(o), pc(h)) : (pc(a), pc(u))), r === !1 ? (pc(s), pc(c)) : gc(l, s) && (r ? (pc(l), pc(d)) : (pc(s), pc(c)))
        }
    }

    function pc(t) {
        t && (t.ignore = !0)
    }

    function gc(t, e) {
        var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
        if (n && i) {
            var r = Te([]);
            return ke(r, r, -t.rotation), n.applyTransform(Ae([], r, t.getLocalTransform())), i.applyTransform(Ae([], r, e.getLocalTransform())), n.intersect(i)
        }
    }

    function vc(t) {
        return "middle" === t || "center" === t
    }

    function mc(t, e, n) {
        var i = e.axis;
        if (e.get("axisTick.show") && !i.scale.isBlank()) {
            for (var r = e.getModel("axisTick"), a = r.getModel("lineStyle"), o = r.get("length"), l = i.getTicksCoords(), u = [], h = [], c = t._transform, d = [], f = 0; f < l.length; f++) {
                var p = l[f].coord;
                u[0] = p, u[1] = 0, h[0] = p, h[1] = n.tickDirection * o, c && (ae(u, u, c), ae(h, h, c));
                var g = new V_(aa({
                    anid: "tick_" + l[f].tickValue,
                    shape: {x1: u[0], y1: u[1], x2: h[0], y2: h[1]},
                    style: s(a.getLineStyle(), {stroke: e.get("axisLine.lineStyle.color")}),
                    z2: 2,
                    silent: !0
                }));
                t.group.add(g), d.push(g)
            }
            return d
        }
    }

    function yc(t, e, n) {
        var i = e.axis, r = A(n.axisLabelShow, e.get("axisLabel.show"));
        if (r && !i.scale.isBlank()) {
            var a = e.getModel("axisLabel"), o = a.get("margin"), s = i.getViewLabels(),
                l = (A(n.labelRotate, a.get("rotate")) || 0) * lI / 180, u = cI(n.rotation, l, n.labelDirection),
                h = e.getCategories(!0), c = [], d = dc(e), p = e.get("triggerEvent");
            return f(s, function (r, s) {
                var l = r.tickValue, f = r.formattedLabel, g = r.rawLabel, v = a;
                h && h[l] && h[l].textStyle && (v = new Wa(h[l].textStyle, a, e.ecModel));
                var m = v.getTextColor() || e.get("axisLine.lineStyle.color"), y = i.dataToCoord(l),
                    x = [y, n.labelOffset + n.labelDirection * o],
                    _ = new I_({anid: "label_" + l, position: x, rotation: u.rotation, silent: d, z2: 10});
                Sa(_.style, v, {
                    text: f,
                    textAlign: v.getShallow("align", !0) || u.textAlign,
                    textVerticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || u.textVerticalAlign,
                    textFill: "function" == typeof m ? m("category" === i.type ? g : "value" === i.type ? l + "" : l, s) : m
                }), p && (_.eventData = hc(e), _.eventData.targetType = "axisLabel", _.eventData.value = g), t._dumbGroup.add(_), _.updateTransform(), c.push(_), t.group.add(_), _.decomposeTransform()
            }), c
        }
    }

    function xc(t, e) {
        var n = {axesInfo: {}, seriesInvolved: !1, coordSysAxesInfo: {}, coordSysMap: {}};
        return _c(n, t, e), n.seriesInvolved && bc(n, t), n
    }

    function _c(t, e, n) {
        var i = e.getComponent("tooltip"), r = e.getComponent("axisPointer"), a = r.get("link", !0) || [], o = [];
        dI(n.getCoordinateSystems(), function (n) {
            function s(i, s, l) {
                var h = l.model.getModel("axisPointer", r), d = h.get("show");
                if (d && ("auto" !== d || i || Ac(h))) {
                    null == s && (s = h.get("triggerTooltip")), h = i ? wc(l, c, r, e, i, s) : h;
                    var f = h.get("snap"), p = Dc(l.model), g = s || f || "category" === l.type, v = t.axesInfo[p] = {
                        key: p,
                        axis: l,
                        coordSys: n,
                        axisPointerModel: h,
                        triggerTooltip: s,
                        involveSeries: g,
                        snap: f,
                        useHandle: Ac(h),
                        seriesModels: []
                    };
                    u[p] = v, t.seriesInvolved |= g;
                    var m = Mc(a, l);
                    if (null != m) {
                        var y = o[m] || (o[m] = {axesInfo: {}});
                        y.axesInfo[p] = v, y.mapper = a[m].mapper, v.linkGroup = y
                    }
                }
            }

            if (n.axisPointerEnabled) {
                var l = Dc(n.model), u = t.coordSysAxesInfo[l] = {};
                t.coordSysMap[l] = n;
                var h = n.model, c = h.getModel("tooltip", i);
                if (dI(n.getAxes(), fI(s, !1, null)), n.getTooltipAxes && i && c.get("show")) {
                    var d = "axis" === c.get("trigger"), f = "cross" === c.get("axisPointer.type"),
                        p = n.getTooltipAxes(c.get("axisPointer.axis"));
                    (d || f) && dI(p.baseAxes, fI(s, f ? "cross" : !0, d)), f && dI(p.otherAxes, fI(s, "cross", !1))
                }
            }
        })
    }

    function wc(t, e, n, r, a, o) {
        var l = e.getModel("axisPointer"), u = {};
        dI(["type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z"], function (t) {
            u[t] = i(l.get(t))
        }), u.snap = "category" !== t.type && !!o, "cross" === l.get("type") && (u.type = "line");
        var h = u.label || (u.label = {});
        if (null == h.show && (h.show = !1), "cross" === a) {
            var c = l.get("label.show");
            if (h.show = null != c ? c : !0, !o) {
                var d = u.lineStyle = l.get("crossStyle");
                d && s(h, d.textStyle)
            }
        }
        return t.model.getModel("axisPointer", new Wa(u, n, r))
    }

    function bc(t, e) {
        e.eachSeries(function (e) {
            var n = e.coordinateSystem, i = e.get("tooltip.trigger", !0), r = e.get("tooltip.show", !0);
            n && "none" !== i && i !== !1 && "item" !== i && r !== !1 && e.get("axisPointer.show", !0) !== !1 && dI(t.coordSysAxesInfo[Dc(n.model)], function (t) {
                var i = t.axis;
                n.getAxis(i.dim) === i && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), t.seriesDataCount += e.getData().count())
            })
        }, this)
    }

    function Mc(t, e) {
        for (var n = e.model, i = e.dim, r = 0; r < t.length; r++) {
            var a = t[r] || {};
            if (Sc(a[i + "AxisId"], n.id) || Sc(a[i + "AxisIndex"], n.componentIndex) || Sc(a[i + "AxisName"], n.name)) return r
        }
    }

    function Sc(t, e) {
        return "all" === t || _(t) && u(t, e) >= 0 || t === e
    }

    function Ic(t) {
        var e = Tc(t);
        if (e) {
            var n = e.axisPointerModel, i = e.axis.scale, r = n.option, a = n.get("status"), o = n.get("value");
            null != o && (o = i.parse(o));
            var s = Ac(n);
            null == a && (r.status = s ? "show" : "hide");
            var l = i.getExtent().slice();
            l[0] > l[1] && l.reverse(), (null == o || o > l[1]) && (o = l[1]), o < l[0] && (o = l[0]), r.value = o, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show")
        }
    }

    function Tc(t) {
        var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e && e.axesInfo[Dc(t)]
    }

    function Cc(t) {
        var e = Tc(t);
        return e && e.axisPointerModel
    }

    function Ac(t) {
        return !!t.get("handle.show")
    }

    function Dc(t) {
        return t.type + "||" + t.id
    }

    function kc(t, e, n, i, r, a) {
        var o = pI.getAxisPointerClass(t.axisPointerClass);
        if (o) {
            var s = Cc(e);
            s ? (t._axisPointer || (t._axisPointer = new o)).render(e, s, i, a) : Pc(t, i)
        }
    }

    function Pc(t, e, n) {
        var i = t._axisPointer;
        i && i.dispose(e, n), t._axisPointer = null
    }

    function Lc(t, e, n) {
        n = n || {};
        var i = t.coordinateSystem, r = e.axis, a = {}, o = r.getAxesOnZeroOf()[0], s = r.position,
            l = o ? "onZero" : s, u = r.dim, h = i.getRect(), c = [h.x, h.x + h.width, h.y, h.y + h.height],
            d = {left: 0, right: 1, top: 0, bottom: 1, onZero: 2}, f = e.get("offset") || 0,
            p = "x" === u ? [c[2] - f, c[3] + f] : [c[0] - f, c[1] + f];
        if (o) {
            var g = o.toGlobalCoord(o.dataToCoord(0));
            p[d.onZero] = Math.max(Math.min(g, p[1]), p[0])
        }
        a.position = ["y" === u ? p[d[l]] : c[0], "x" === u ? p[d[l]] : c[3]], a.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);
        var v = {top: -1, bottom: 1, left: -1, right: 1};
        a.labelDirection = a.tickDirection = a.nameDirection = v[s], a.labelOffset = o ? p[d[s]] - p[d.onZero] : 0, e.get("axisTick.inside") && (a.tickDirection = -a.tickDirection), A(n.labelInside, e.get("axisLabel.inside")) && (a.labelDirection = -a.labelDirection);
        var m = e.get("axisLabel.rotate");
        return a.labelRotate = "top" === l ? -m : m, a.z2 = 1, a
    }

    function Oc(t, e, n) {
        dy.call(this), this.updateData(t, e, n)
    }

    function zc(t) {
        return [t[0] / 2, t[1] / 2]
    }

    function Ec(t, e) {
        this.parent.drift(t, e)
    }

    function Rc() {
        !va(this) && Nc.call(this)
    }

    function Bc() {
        !va(this) && Vc.call(this)
    }

    function Nc() {
        if (!this.incremental && !this.useHoverLayer) {
            var t = this.__symbolOriginalScale, e = t[1] / t[0];
            this.animateTo({scale: [Math.max(1.1 * t[0], t[0] + 3), Math.max(1.1 * t[1], t[1] + 3 * e)]}, 400, "elasticOut")
        }
    }

    function Vc() {
        this.incremental || this.useHoverLayer || this.animateTo({scale: this.__symbolOriginalScale}, 400, "elasticOut")
    }

    function Fc(t) {
        this.group = new dy, this._symbolCtor = t || Oc
    }

    function Hc(t, e, n, i) {
        return !(!e || isNaN(e[0]) || isNaN(e[1]) || i.isIgnore && i.isIgnore(n) || i.clipShape && !i.clipShape.contain(e[0], e[1]) || "none" === t.getItemVisual(n, "symbol"))
    }

    function Gc(t) {
        return null == t || M(t) || (t = {isIgnore: t}), t || {}
    }

    function Wc(t) {
        var e = t.hostModel;
        return {
            itemStyle: e.getModel("itemStyle").getItemStyle(["color"]),
            hoverItemStyle: e.getModel("emphasis.itemStyle").getItemStyle(),
            symbolRotate: e.get("symbolRotate"),
            symbolOffset: e.get("symbolOffset"),
            hoverAnimation: e.get("hoverAnimation"),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label"),
            cursorStyle: e.get("cursor")
        }
    }

    function Zc(t, e, n) {
        var i, r = t.getBaseAxis(), a = t.getOtherAxis(r), o = Xc(a, n), s = r.dim, l = a.dim, u = e.mapDimension(l),
            h = e.mapDimension(s), c = "x" === l || "radius" === l ? 1 : 0, d = p(t.dimensions, function (t) {
                return e.mapDimension(t)
            }), f = e.getCalculationInfo("stackResultDimension");
        return (i |= Bu(e, d[0])) && (d[0] = f), (i |= Bu(e, d[1])) && (d[1] = f), {
            dataDimsForPoint: d,
            valueStart: o,
            valueAxisDim: l,
            baseAxisDim: s,
            stacked: !!i,
            valueDim: u,
            baseDim: h,
            baseDataOffset: c,
            stackedOverDimension: e.getCalculationInfo("stackedOverDimension")
        }
    }

    function Xc(t, e) {
        var n = 0, i = t.scale.getExtent();
        return "start" === e ? n = i[0] : "end" === e ? n = i[1] : i[0] > 0 ? n = i[0] : i[1] < 0 && (n = i[1]), n
    }

    function Yc(t, e, n, i) {
        var r = 0 / 0;
        t.stacked && (r = n.get(n.getCalculationInfo("stackedOverDimension"), i)), isNaN(r) && (r = t.valueStart);
        var a = t.baseDataOffset, o = [];
        return o[a] = n.get(t.baseDim, i), o[1 - a] = r, e.dataToPoint(o)
    }

    function Uc(t, e) {
        var n = [];
        return e.diff(t).add(function (t) {
            n.push({cmd: "+", idx: t})
        }).update(function (t, e) {
            n.push({cmd: "=", idx: e, idx1: t})
        }).remove(function (t) {
            n.push({cmd: "-", idx: t})
        }).execute(), n
    }

    function jc(t) {
        return isNaN(t[0]) || isNaN(t[1])
    }

    function qc(t, e, n, i, r, a, o, s, l, u) {
        return "none" !== u && u ? Kc.apply(this, arguments) : $c.apply(this, arguments)
    }

    function Kc(t, e, n, i, r, a, o, s, l, u, h) {
        for (var c = 0, d = n, f = 0; i > f; f++) {
            var p = e[d];
            if (d >= r || 0 > d) break;
            if (jc(p)) {
                if (h) {
                    d += a;
                    continue
                }
                break
            }
            if (d === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]); else if (l > 0) {
                var g = e[c], v = "y" === u ? 1 : 0, m = (p[v] - g[v]) * l;
                kI(LI, g), LI[v] = g[v] + m, kI(OI, p), OI[v] = p[v] - m, t.bezierCurveTo(LI[0], LI[1], OI[0], OI[1], p[0], p[1])
            } else t.lineTo(p[0], p[1]);
            c = d, d += a
        }
        return f
    }

    function $c(t, e, n, i, r, a, o, s, l, u, h) {
        for (var c = 0, d = n, f = 0; i > f; f++) {
            var p = e[d];
            if (d >= r || 0 > d) break;
            if (jc(p)) {
                if (h) {
                    d += a;
                    continue
                }
                break
            }
            if (d === n) t[a > 0 ? "moveTo" : "lineTo"](p[0], p[1]), kI(LI, p); else if (l > 0) {
                var g = d + a, v = e[g];
                if (h) for (; v && jc(e[g]);) g += a, v = e[g];
                var m = .5, y = e[c], v = e[g];
                if (!v || jc(v)) kI(OI, p); else {
                    jc(v) && !h && (v = p), U(PI, v, y);
                    var x, _;
                    if ("x" === u || "y" === u) {
                        var w = "x" === u ? 0 : 1;
                        x = Math.abs(p[w] - y[w]), _ = Math.abs(p[w] - v[w])
                    } else x = _m(p, y), _ = _m(p, v);
                    m = _ / (_ + x), DI(OI, p, PI, -l * (1 - m))
                }
                CI(LI, LI, s), AI(LI, LI, o), CI(OI, OI, s), AI(OI, OI, o), t.bezierCurveTo(LI[0], LI[1], OI[0], OI[1], p[0], p[1]), DI(LI, p, PI, l * m)
            } else t.lineTo(p[0], p[1]);
            c = d, d += a
        }
        return f
    }

    function Qc(t, e) {
        var n = [1 / 0, 1 / 0], i = [-1 / 0, -1 / 0];
        if (e) for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a[0] < n[0] && (n[0] = a[0]), a[1] < n[1] && (n[1] = a[1]), a[0] > i[0] && (i[0] = a[0]), a[1] > i[1] && (i[1] = a[1])
        }
        return {min: e ? n : i, max: e ? i : n}
    }

    function Jc(t, e) {
        if (t.length === e.length) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n], r = e[n];
                if (i[0] !== r[0] || i[1] !== r[1]) return
            }
            return !0
        }
    }

    function td(t) {
        return "number" == typeof t ? t : t ? .5 : 0
    }

    function ed(t) {
        var e = t.getGlobalExtent();
        if (t.onBand) {
            var n = t.getBandWidth() / 2 - 1, i = e[1] > e[0] ? 1 : -1;
            e[0] += i * n, e[1] -= i * n
        }
        return e
    }

    function nd(t, e, n) {
        if (!n.valueDim) return [];
        for (var i = [], r = 0, a = e.count(); a > r; r++) i.push(Yc(n, t, e, r));
        return i
    }

    function id(t, e, n, i) {
        var r = ed(t.getAxis("x")), a = ed(t.getAxis("y")), o = t.getBaseAxis().isHorizontal(),
            s = Math.min(r[0], r[1]), l = Math.min(a[0], a[1]), u = Math.max(r[0], r[1]) - s,
            h = Math.max(a[0], a[1]) - l;
        if (n) s -= .5, u += .5, l -= .5, h += .5; else {
            var c = i.get("lineStyle.width") || 2, d = i.get("clipOverflow") ? c / 2 : Math.max(u, h);
            o ? (l -= d, h += 2 * d) : (s -= d, u += 2 * d)
        }
        var f = new B_({shape: {x: s, y: l, width: u, height: h}});
        return e && (f.shape[o ? "width" : "height"] = 0, Ea(f, {shape: {width: u, height: h}}, i)), f
    }

    function rd(t, e, n, i) {
        var r = t.getAngleAxis(), a = t.getRadiusAxis(), o = a.getExtent().slice();
        o[0] > o[1] && o.reverse();
        var s = r.getExtent(), l = Math.PI / 180;
        n && (o[0] -= .5, o[1] += .5);
        var u = new D_({
            shape: {
                cx: Qa(t.cx, 1),
                cy: Qa(t.cy, 1),
                r0: Qa(o[0], 1),
                r: Qa(o[1], 1),
                startAngle: -s[0] * l,
                endAngle: -s[1] * l,
                clockwise: r.inverse
            }
        });
        return e && (u.shape.endAngle = -s[0] * l, Ea(u, {shape: {endAngle: -s[1] * l}}, i)), u
    }

    function ad(t, e, n, i) {
        return "polar" === t.type ? rd(t, e, n, i) : id(t, e, n, i)
    }

    function od(t, e, n) {
        for (var i = e.getBaseAxis(), r = "x" === i.dim || "radius" === i.dim ? 0 : 1, a = [], o = 0; o < t.length - 1; o++) {
            var s = t[o + 1], l = t[o];
            a.push(l);
            var u = [];
            switch (n) {
                case"end":
                    u[r] = s[r], u[1 - r] = l[1 - r], a.push(u);
                    break;
                case"middle":
                    var h = (l[r] + s[r]) / 2, c = [];
                    u[r] = c[r] = h, u[1 - r] = l[1 - r], c[1 - r] = s[1 - r], a.push(u), a.push(c);
                    break;
                default:
                    u[r] = l[r], u[1 - r] = s[1 - r], a.push(u)
            }
        }
        return t[o] && a.push(t[o]), a
    }

    function sd(t, e) {
        var n = t.getVisual("visualMeta");
        if (n && n.length && t.count() && "cartesian2d" === e.type) {
            for (var i, r, a = n.length - 1; a >= 0; a--) {
                var o = n[a].dimension, s = t.dimensions[o], l = t.getDimensionInfo(s);
                if (i = l && l.coordDim, "x" === i || "y" === i) {
                    r = n[a];
                    break
                }
            }
            if (r) {
                var u = e.getAxis(i), h = p(r.stops, function (t) {
                    return {coord: u.toGlobalCoord(u.dataToCoord(t.value)), color: t.color}
                }), c = h.length, d = r.outerColors.slice();
                c && h[0].coord > h[c - 1].coord && (h.reverse(), d.reverse());
                var g = 10, v = h[0].coord - g, m = h[c - 1].coord + g, y = m - v;
                if (.001 > y) return "transparent";
                f(h, function (t) {
                    t.offset = (t.coord - v) / y
                }), h.push({
                    offset: c ? h[c - 1].offset : .5,
                    color: d[1] || "transparent"
                }), h.unshift({offset: c ? h[0].offset : .5, color: d[0] || "transparent"});
                var x = new X_(0, 0, 0, 0, h, !0);
                return x[i] = v, x[i + "2"] = m, x
            }
        }
    }

    function ld(t, e, n) {
        var i = t.get("showAllSymbol"), r = "auto" === i;
        if (!i || r) {
            var a = n.getAxesByScale("ordinal")[0];
            if (a && (!r || !ud(a, e))) {
                var o = e.mapDimension(a.dim), s = {};
                return f(a.getViewLabels(), function (t) {
                    s[t.tickValue] = 1
                }), function (t) {
                    return !s.hasOwnProperty(e.get(o, t))
                }
            }
        }
    }

    function ud(t, e) {
        var n = t.getExtent(), i = Math.abs(n[1] - n[0]) / t.scale.count();
        isNaN(i) && (i = 0);
        for (var r = e.count(), a = Math.max(1, Math.round(r / 5)), o = 0; r > o; o += a) if (1.5 * Oc.getSymbolSize(e, o)[t.isHorizontal() ? 1 : 0] > i) return !1;
        return !0
    }

    function hd(t, e, n, i) {
        var r = e.getData(), a = this.dataIndex, o = r.getName(a), s = e.get("selectedOffset");
        i.dispatchAction({type: "pieToggleSelect", from: t, name: o, seriesId: e.id}), r.each(function (t) {
            cd(r.getItemGraphicEl(t), r.getItemLayout(t), e.isSelected(r.getName(t)), s, n)
        })
    }

    function cd(t, e, n, i, r) {
        var a = (e.startAngle + e.endAngle) / 2, o = Math.cos(a), s = Math.sin(a), l = n ? i : 0, u = [o * l, s * l];
        r ? t.animate().when(200, {position: u}).start("bounceOut") : t.attr("position", u)
    }

    function dd(t, e) {
        function n() {
            a.ignore = a.hoverIgnore, o.ignore = o.hoverIgnore
        }

        function i() {
            a.ignore = a.normalIgnore, o.ignore = o.normalIgnore
        }

        dy.call(this);
        var r = new D_({z2: 2}), a = new z_, o = new I_;
        this.add(r), this.add(a), this.add(o), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on("mouseover", n).on("mouseout", i)
    }

    function fd(t, e, n, i, r, a, o) {
        function s(e, n, i) {
            for (var r = e; n > r; r++) if (t[r].y += i, r > e && n > r + 1 && t[r + 1].y > t[r].y + t[r].height) return void l(r, i / 2);
            l(n - 1, i / 2)
        }

        function l(e, n) {
            for (var i = e; i >= 0 && (t[i].y -= n, !(i > 0 && t[i].y > t[i - 1].y + t[i - 1].height)); i--) ;
        }

        function u(t, e, n, i, r, a) {
            for (var o = a > 0 ? e ? Number.MAX_VALUE : 0 : e ? Number.MAX_VALUE : 0, s = 0, l = t.length; l > s; s++) {
                var u = Math.abs(t[s].y - i), h = t[s].len, c = t[s].len2,
                    d = r + h > u ? Math.sqrt((r + h + c) * (r + h + c) - u * u) : Math.abs(t[s].x - n);
                e && d >= o && (d = o - 10), !e && o >= d && (d = o + 10), t[s].x = n + d * a, o = d
            }
        }

        t.sort(function (t, e) {
            return t.y - e.y
        });
        for (var h, c = 0, d = t.length, f = [], p = [], g = 0; d > g; g++) h = t[g].y - c, 0 > h && s(g, d, -h, r), c = t[g].y + t[g].height;
        0 > o - c && l(d - 1, c - o);
        for (var g = 0; d > g; g++) t[g].y >= n ? p.push(t[g]) : f.push(t[g]);
        u(f, !1, e, n, i, r), u(p, !0, e, n, i, r)
    }

    function pd(t, e, n, i, r, a) {
        for (var o = [], s = [], l = 0; l < t.length; l++) gd(t[l]) || (t[l].x < e ? o.push(t[l]) : s.push(t[l]));
        fd(s, e, n, i, 1, r, a), fd(o, e, n, i, -1, r, a);
        for (var l = 0; l < t.length; l++) if (!gd(t[l])) {
            var u = t[l].linePoints;
            if (u) {
                var h = u[1][0] - u[2][0];
                u[2][0] = t[l].x < e ? t[l].x + 3 : t[l].x - 3, u[1][1] = u[2][1] = t[l].y, u[1][0] = u[2][0] + h
            }
        }
    }

    function gd(t) {
        return "center" === t.position
    }

    function vd(t) {
        var e = t.mainData, n = t.datas;
        n || (n = {main: e}, t.datasAttr = {main: "data"}), t.datas = t.mainData = null, bd(e, n, t), QI(n, function (n) {
            QI(e.TRANSFERABLE_METHODS, function (e) {
                n.wrapMethod(e, x(md, t))
            })
        }), e.wrapMethod("cloneShallow", x(xd, t)), QI(e.CHANGABLE_METHODS, function (n) {
            e.wrapMethod(n, x(yd, t))
        }), O(n[e.dataType] === e)
    }

    function md(t, e) {
        if (wd(this)) {
            var n = o({}, this[JI]);
            n[this.dataType] = e, bd(e, n, t)
        } else Md(e, this.dataType, this[tT], t);
        return e
    }

    function yd(t, e) {
        return t.struct && t.struct.update(this), e
    }

    function xd(t, e) {
        return QI(e[JI], function (n, i) {
            n !== e && Md(n.cloneShallow(), i, e, t)
        }), e
    }

    function _d(t) {
        var e = this[tT];
        return null == t || null == e ? e : e[JI][t]
    }

    function wd(t) {
        return t[tT] === t
    }

    function bd(t, e, n) {
        t[JI] = {}, QI(e, function (e, i) {
            Md(e, i, t, n)
        })
    }

    function Md(t, e, n, i) {
        n[JI][e] = t, t[tT] = n, t.dataType = e, i.struct && (t[i.structAttr] = i.struct, i.struct[i.datasAttr[e]] = t), t.getLinkedData = _d
    }

    function Sd(t, e, n) {
        this.root, this.data, this._nodes = [], this.hostModel = t, this.levelModels = p(e || [], function (e) {
            return new Wa(e, t, t.ecModel)
        }), this.leavesModel = new Wa(n || {}, t, t.ecModel)
    }

    function Id(t, e) {
        var n = e.children;
        t.parentNode !== e && (n.push(t), t.parentNode = e)
    }

    function Td(t, e, n) {
        if (t && u(e, t.type) >= 0) {
            var i = n.getData().tree.root, r = t.targetNode;
            if ("string" == typeof r && (r = i.getNodeById(r)), r && i.contains(r)) return {node: r};
            var a = t.targetNodeId;
            if (null != a && (r = i.getNodeById(a))) return {node: r}
        }
    }

    function Cd(t) {
        for (var e = []; t;) t = t.parentNode, t && e.push(t);
        return e.reverse()
    }

    function Ad(t, e) {
        var n = Cd(t);
        return u(n, e) >= 0
    }

    function Dd(t, e) {
        for (var n = []; t;) {
            var i = t.dataIndex;
            n.push({name: t.name, dataIndex: i, value: e.getRawValue(i)}), t = t.parentNode
        }
        return n.reverse(), n
    }

    function kd(t) {
        var e = 0;
        f(t.children, function (t) {
            kd(t);
            var n = t.value;
            _(n) && (n = n[0]), e += n
        });
        var n = t.value;
        _(n) && (n = n[0]), (null == n || isNaN(n)) && (n = e), 0 > n && (n = 0), _(t.value) ? t.value[0] = n : t.value = n
    }

    function Pd(t, e, n) {
        function i() {
            o.ignore = o.hoverIgnore
        }

        function r() {
            o.ignore = o.normalIgnore
        }

        dy.call(this);
        var a = new D_({z2: iT});
        a.seriesIndex = e.seriesIndex;
        var o = new I_({z2: rT, silent: t.getModel("label").get("silent")});
        this.add(a), this.add(o), this.updateData(!0, t, "normal", e, n), this.on("emphasis", i).on("normal", r).on("mouseover", i).on("mouseout", r)
    }

    function Ld(t, e, n) {
        var i = t.getVisual("color"), r = t.getVisual("visualMeta");
        r && 0 !== r.length || (i = null);
        var a = t.getModel("itemStyle").get("color");
        if (a) return a;
        if (i) return i;
        if (0 === t.depth) return n.option.color[0];
        var o = n.option.color.length;
        return a = n.option.color[Od(t) % o]
    }

    function Od(t) {
        for (var e = t; e.depth > 1;) e = e.parentNode;
        var n = t.getAncestors()[0];
        return u(n.children, e)
    }

    function zd(t, e, n) {
        return n === nT.NONE ? !1 : n === nT.SELF ? t === e : n === nT.ANCESTOR ? t === e || t.isAncestorOf(e) : t === e || t.isDescendantOf(e)
    }

    function Ed(t, e, n) {
        var i = e.getData();
        i.setItemVisual(t.dataIndex, "color", n)
    }

    function Rd(t, e) {
        var n = t.children || [];
        t.children = Bd(n, e), n.length && f(t.children, function (t) {
            Rd(t, e)
        })
    }

    function Bd(t, e) {
        if ("function" == typeof e) return t.sort(e);
        var n = "asc" === e;
        return t.sort(function (t, e) {
            var i = (t.getValue() - e.getValue()) * (n ? 1 : -1);
            return 0 === i ? (t.dataIndex - e.dataIndex) * (n ? -1 : 1) : i
        })
    }

    function Nd(t, e) {
        var n = t.get("center"), i = e.getWidth(), r = e.getHeight(), a = Math.min(i, r), o = $a(n[0], e.getWidth()),
            s = $a(n[1], e.getHeight()), l = $a(t.get("radius"), a / 2);
        return {cx: o, cy: s, r: l}
    }

    function Vd(t, e) {
        return e && ("string" == typeof e ? t = e.replace("{value}", null != t ? t : "") : "function" == typeof e && (t = e(t))), t
    }

    function Fd(t, e) {
        function n() {
            a.ignore = a.hoverIgnore, o.ignore = o.hoverIgnore
        }

        function i() {
            a.ignore = a.normalIgnore, o.ignore = o.normalIgnore
        }

        dy.call(this);
        var r = new O_, a = new z_, o = new I_;
        this.add(r), this.add(a), this.add(o), this.updateData(t, e, !0), this.on("emphasis", n).on("normal", i).on("mouseover", n).on("mouseout", i)
    }

    function Hd(t, e) {
        return To(t.getBoxLayoutParams(), {width: e.getWidth(), height: e.getHeight()})
    }

    function Gd(t, e) {
        for (var n = t.mapDimension("value"), i = t.mapArray(n, function (t) {
            return t
        }), r = [], a = "ascending" === e, o = 0, s = t.count(); s > o; o++) r[o] = o;
        return "function" == typeof e ? r.sort(e) : "none" !== e && r.sort(function (t, e) {
            return a ? i[t] - i[e] : i[e] - i[t]
        }), r
    }

    function Wd(t) {
        t.each(function (e) {
            var n, i, r, a, o = t.getItemModel(e), s = o.getModel("label"), l = s.get("position"),
                u = o.getModel("labelLine"), h = t.getItemLayout(e), c = h.points,
                d = "inner" === l || "inside" === l || "center" === l;
            if (d) i = (c[0][0] + c[1][0] + c[2][0] + c[3][0]) / 4, r = (c[0][1] + c[1][1] + c[2][1] + c[3][1]) / 4, n = "center", a = [[i, r], [i, r]]; else {
                var f, p, g, v = u.get("length");
                "left" === l ? (f = (c[3][0] + c[0][0]) / 2, p = (c[3][1] + c[0][1]) / 2, g = f - v, i = g - 5, n = "right") : (f = (c[1][0] + c[2][0]) / 2, p = (c[1][1] + c[2][1]) / 2, g = f + v, i = g + 5, n = "left");
                var m = p;
                a = [[f, p], [g, m]], r = m
            }
            h.label = {linePoints: a, x: i, y: r, verticalAlign: "middle", textAlign: n, inside: d}
        })
    }

    function Zd(t, e, n) {
        var i, r = {}, a = "toggleSelected" === t;
        return n.eachComponent("legend", function (n) {
            a && null != i ? n[i ? "select" : "unSelect"](e.name) : (n[t](e.name), i = n.isSelected(e.name));
            var o = n.getData();
            f(o, function (t) {
                var e = t.get("name");
                if ("\n" !== e && "" !== e) {
                    var i = n.isSelected(e);
                    r[e] = r.hasOwnProperty(e) ? r[e] && i : i
                }
            })
        }), {name: e.name, selected: r}
    }

    function Xd(t, e, n) {
        var i = e.getBoxLayoutParams(), r = e.get("padding"), a = {width: n.getWidth(), height: n.getHeight()},
            o = To(i, a, r);
        Sw(e.get("orient"), t, e.get("itemGap"), o.width, o.height), Co(t, i, a, r)
    }

    function Yd(t, e) {
        var n = pw(e.get("padding")), i = e.getItemStyle(["color", "opacity"]);
        i.fill = e.get("backgroundColor");
        var t = new B_({
            shape: {
                x: t.x - n[3],
                y: t.y - n[0],
                width: t.width + n[1] + n[3],
                height: t.height + n[0] + n[2],
                r: e.get("borderRadius")
            }, style: i, silent: !0, z2: -1
        });
        return t
    }

    function Ud(t, e) {
        e.dispatchAction({type: "legendToggleSelect", name: t})
    }

    function jd(t, e, n, i) {
        var r = n.getZr().storage.getDisplayList()[0];
        r && r.useHoverLayer || n.dispatchAction({type: "highlight", seriesName: t, name: e, excludeSeriesId: i})
    }

    function qd(t, e, n, i) {
        var r = n.getZr().storage.getDisplayList()[0];
        r && r.useHoverLayer || n.dispatchAction({type: "downplay", seriesName: t, name: e, excludeSeriesId: i})
    }

    function Kd(t, e, n) {
        var i = t.getOrient(), r = [1, 1];
        r[i.index] = 0, Ao(e, n, {type: "box", ignoreSize: r})
    }

    function $d(t, e, n, i, r) {
        var a = t.axis;
        if (!a.scale.isBlank() && a.containData(e)) {
            if (!t.involveSeries) return void n.showPointer(t, e);
            var s = Qd(e, t), l = s.payloadBatch, u = s.snapToValue;
            l[0] && null == r.seriesIndex && o(r, l[0]), !i && t.snap && a.containData(u) && null != u && (e = u), n.showPointer(t, e, l, r), n.showTooltip(t, s, u)
        }
    }

    function Qd(t, e) {
        var n = e.axis, i = n.dim, r = t, a = [], o = Number.MAX_VALUE, s = -1;
        return kT(e.seriesModels, function (e) {
            var l, u, h = e.getData().mapDimension(i, !0);
            if (e.getAxisTooltipData) {
                var c = e.getAxisTooltipData(h, t, n);
                u = c.dataIndices, l = c.nestestValue
            } else {
                if (u = e.getData().indicesOfNearest(h[0], t, "category" === n.type ? .5 : null), !u.length) return;
                l = e.getData().get(h[0], u[0])
            }
            if (null != l && isFinite(l)) {
                var d = t - l, f = Math.abs(d);
                o >= f && ((o > f || d >= 0 && 0 > s) && (o = f, s = d, r = l, a.length = 0), kT(u, function (t) {
                    a.push({seriesIndex: e.seriesIndex, dataIndexInside: t, dataIndex: e.getData().getRawIndex(t)})
                }))
            }
        }), {payloadBatch: a, snapToValue: r}
    }

    function Jd(t, e, n, i) {
        t[e.key] = {value: n, payloadBatch: i}
    }

    function tf(t, e, n, i) {
        var r = n.payloadBatch, a = e.axis, o = a.model, s = e.axisPointerModel;
        if (e.triggerTooltip && r.length) {
            var l = e.coordSys.model, u = Dc(l), h = t.map[u];
            h || (h = t.map[u] = {
                coordSysId: l.id,
                coordSysIndex: l.componentIndex,
                coordSysType: l.type,
                coordSysMainType: l.mainType,
                dataByAxis: []
            }, t.list.push(h)), h.dataByAxis.push({
                axisDim: a.dim,
                axisIndex: o.componentIndex,
                axisType: o.type,
                axisId: o.id,
                value: i,
                valueLabelOpt: {precision: s.get("label.precision"), formatter: s.get("label.formatter")},
                seriesDataIndices: r.slice()
            })
        }
    }

    function ef(t, e, n) {
        var i = n.axesInfo = [];
        kT(e, function (e, n) {
            var r = e.axisPointerModel.option, a = t[n];
            a ? (!e.useHandle && (r.status = "show"), r.value = a.value, r.seriesDataIndices = (a.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), "show" === r.status && i.push({
                axisDim: e.axis.dim,
                axisIndex: e.axis.model.componentIndex,
                value: r.value
            })
        })
    }

    function nf(t, e, n, i) {
        if (sf(e) || !t.list.length) return void i({type: "hideTip"});
        var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
        i({
            type: "showTip",
            escapeConnect: !0,
            x: e[0],
            y: e[1],
            tooltipOption: n.tooltipOption,
            position: n.position,
            dataIndexInside: r.dataIndexInside,
            dataIndex: r.dataIndex,
            seriesIndex: r.seriesIndex,
            dataByCoordSys: t.list
        })
    }

    function rf(t, e, n) {
        var i = n.getZr(), r = "axisPointerLastHighlights", a = LT(i)[r] || {}, o = LT(i)[r] = {};
        kT(t, function (t) {
            var e = t.axisPointerModel.option;
            "show" === e.status && kT(e.seriesDataIndices, function (t) {
                var e = t.seriesIndex + " | " + t.dataIndex;
                o[e] = t
            })
        });
        var s = [], l = [];
        f(a, function (t, e) {
            !o[e] && l.push(t)
        }), f(o, function (t, e) {
            !a[e] && s.push(t)
        }), l.length && n.dispatchAction({
            type: "downplay",
            escapeConnect: !0,
            batch: l
        }), s.length && n.dispatchAction({type: "highlight", escapeConnect: !0, batch: s})
    }

    function af(t, e) {
        for (var n = 0; n < (t || []).length; n++) {
            var i = t[n];
            if (e.axis.dim === i.axisDim && e.axis.model.componentIndex === i.axisIndex) return i
        }
    }

    function of(t) {
        var e = t.axis.model, n = {}, i = n.axisDim = t.axis.dim;
        return n.axisIndex = n[i + "AxisIndex"] = e.componentIndex, n.axisName = n[i + "AxisName"] = e.name, n.axisId = n[i + "AxisId"] = e.id, n
    }

    function sf(t) {
        return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1])
    }

    function lf(t, e, n) {
        if (!nm.node) {
            var i = e.getZr();
            zT(i).records || (zT(i).records = {}), uf(i, e);
            var r = zT(i).records[t] || (zT(i).records[t] = {});
            r.handler = n
        }
    }

    function uf(t, e) {
        function n(n, i) {
            t.on(n, function (n) {
                var r = ff(e);
                ET(zT(t).records, function (t) {
                    t && i(t, n, r.dispatchAction)
                }), hf(r.pendings, e)
            })
        }

        zT(t).initialized || (zT(t).initialized = !0, n("click", x(df, "click")), n("mousemove", x(df, "mousemove")), n("globalout", cf))
    }

    function hf(t, e) {
        var n, i = t.showTip.length, r = t.hideTip.length;
        i ? n = t.showTip[i - 1] : r && (n = t.hideTip[r - 1]), n && (n.dispatchAction = null, e.dispatchAction(n))
    }

    function cf(t, e, n) {
        t.handler("leave", null, n)
    }

    function df(t, e, n, i) {
        e.handler(t, n, i)
    }

    function ff(t) {
        var e = {showTip: [], hideTip: []}, n = function (i) {
            var r = e[i.type];
            r ? r.push(i) : (i.dispatchAction = n, t.dispatchAction(i))
        };
        return {dispatchAction: n, pendings: e}
    }

    function pf(t, e) {
        if (!nm.node) {
            var n = e.getZr(), i = (zT(n).records || {})[t];
            i && (zT(n).records[t] = null)
        }
    }

    function gf() {
    }

    function vf(t, e, n, i) {
        mf(BT(n).lastProp, i) || (BT(n).lastProp = i, e ? za(n, i, t) : (n.stopAnimation(), n.attr(i)))
    }

    function mf(t, e) {
        if (M(t) && M(e)) {
            var n = !0;
            return f(e, function (e, i) {
                n = n && mf(t[i], e)
            }), !!n
        }
        return t === e
    }

    function yf(t, e) {
        t[e.get("label.show") ? "show" : "hide"]()
    }

    function xf(t) {
        return {position: t.position.slice(), rotation: t.rotation || 0}
    }

    function _f(t, e, n) {
        var i = e.get("z"), r = e.get("zlevel");
        t && t.traverse(function (t) {
            "group" !== t.type && (null != i && (t.z = i), null != r && (t.zlevel = r), t.silent = n)
        })
    }

    function wf(t) {
        var e, n = t.get("type"), i = t.getModel(n + "Style");
        return "line" === n ? (e = i.getLineStyle(), e.fill = null) : "shadow" === n && (e = i.getAreaStyle(), e.stroke = null), e
    }

    function bf(t, e, n, i, r) {
        var a = n.get("value"), o = Sf(a, e.axis, e.ecModel, n.get("seriesDataIndices"), {
                precision: n.get("label.precision"),
                formatter: n.get("label.formatter")
            }), s = n.getModel("label"), l = pw(s.get("padding") || 0), u = s.getFont(), h = Nn(o, u), c = r.position,
            d = h.width + l[1] + l[3], f = h.height + l[0] + l[2], p = r.align;
        "right" === p && (c[0] -= d), "center" === p && (c[0] -= d / 2);
        var g = r.verticalAlign;
        "bottom" === g && (c[1] -= f), "middle" === g && (c[1] -= f / 2), Mf(c, d, f, i);
        var v = s.get("backgroundColor");
        v && "auto" !== v || (v = e.get("axisLine.lineStyle.color")), t.label = {
            shape: {
                x: 0,
                y: 0,
                width: d,
                height: f,
                r: s.get("borderRadius")
            },
            position: c.slice(),
            style: {
                text: o,
                textFont: u,
                textFill: s.getTextColor(),
                textPosition: "inside",
                fill: v,
                stroke: s.get("borderColor") || "transparent",
                lineWidth: s.get("borderWidth") || 0,
                shadowBlur: s.get("shadowBlur"),
                shadowColor: s.get("shadowColor"),
                shadowOffsetX: s.get("shadowOffsetX"),
                shadowOffsetY: s.get("shadowOffsetY")
            },
            z2: 10
        }
    }

    function Mf(t, e, n, i) {
        var r = i.getWidth(), a = i.getHeight();
        t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + n, a) - n, t[0] = Math.max(t[0], 0), t[1] = Math.max(t[1], 0)
    }

    function Sf(t, e, n, i, r) {
        t = e.scale.parse(t);
        var a = e.scale.getLabel(t, {precision: r.precision}), o = r.formatter;
        if (o) {
            var s = {value: ph(e, t), seriesData: []};
            f(i, function (t) {
                var e = n.getSeriesByIndex(t.seriesIndex), i = t.dataIndexInside, r = e && e.getDataParams(i);
                r && s.seriesData.push(r)
            }), b(o) ? a = o.replace("{value}", a) : w(o) && (a = o(s))
        }
        return a
    }

    function If(t, e, n) {
        var i = Ie();
        return ke(i, i, n.rotation), De(i, i, n.position), Ba([t.dataToCoord(e), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0)], i)
    }

    function Tf(t, e, n, i, r, a) {
        var o = uI.innerTextLayout(n.rotation, 0, n.labelDirection);
        n.labelMargin = r.get("label.margin"), bf(e, i, r, a, {
            position: If(i.axis, t, n),
            align: o.textAlign,
            verticalAlign: o.textVerticalAlign
        })
    }

    function Cf(t, e, n) {
        return n = n || 0, {x1: t[n], y1: t[1 - n], x2: e[n], y2: e[1 - n]}
    }

    function Af(t, e, n) {
        return n = n || 0, {x: t[n], y: t[1 - n], width: e[n], height: e[1 - n]}
    }

    function Df(t, e) {
        var n = {};
        return n[e.dim + "AxisIndex"] = e.index, t.getCartesian(n)
    }

    function kf(t) {
        return "x" === t.dim ? 0 : 1
    }

    function Pf(t) {
        var e = "cubic-bezier(0.23, 1, 0.32, 1)", n = "left " + t + "s " + e + ",top " + t + "s " + e;
        return p(ZT, function (t) {
            return t + "transition:" + n
        }).join(";")
    }

    function Lf(t) {
        var e = [], n = t.get("fontSize"), i = t.getTextColor();
        return i && e.push("color:" + i), e.push("font:" + t.getFont()), n && e.push("line-height:" + Math.round(3 * n / 2) + "px"), GT(["decoration", "align"], function (n) {
            var i = t.get(n);
            i && e.push("text-" + n + ":" + i)
        }), e.join(";")
    }

    function Of(t) {
        var e = [], n = t.get("transitionDuration"), i = t.get("backgroundColor"), r = t.getModel("textStyle"),
            a = t.get("padding");
        return n && e.push(Pf(n)), i && (nm.canvasSupported ? e.push("background-Color:" + i) : (e.push("background-Color:#" + Ke(i)), e.push("filter:alpha(opacity=70)"))), GT(["width", "color", "radius"], function (n) {
            var i = "border-" + n, r = WT(i), a = t.get(r);
            null != a && e.push(i + ":" + a + ("color" === n ? "" : "px"))
        }), e.push(Lf(r)), null != a && e.push("padding:" + pw(a).join("px ") + "px"), e.join(";") + ";"
    }

    function zf(t, e) {
        if (nm.wxa) return null;
        var n = document.createElement("div"), i = this._zr = e.getZr();
        this.el = n, this._x = e.getWidth() / 2, this._y = e.getHeight() / 2, t.appendChild(n), this._container = t, this._show = !1, this._hideTimeout;
        var r = this;
        n.onmouseenter = function () {
            r._enterable && (clearTimeout(r._hideTimeout), r._show = !0), r._inContent = !0
        }, n.onmousemove = function (e) {
            if (e = e || window.event, !r._enterable) {
                var n = i.handler;
                ge(t, e, !0), n.dispatch("mousemove", e)
            }
        }, n.onmouseleave = function () {
            r._enterable && r._show && r.hideLater(r._hideDelay), r._inContent = !1
        }
    }

    function Ef(t) {
        this._zr = t.getZr(), this._show = !1, this._hideTimeout
    }

    function Rf(t) {
        for (var e = t.pop(); t.length;) {
            var n = t.pop();
            n && (Wa.isInstance(n) && (n = n.get("tooltip", !0)), "string" == typeof n && (n = {formatter: n}), e = new Wa(n, e, e.ecModel))
        }
        return e
    }

    function Bf(t, e) {
        return t.dispatchAction || y(e.dispatchAction, e)
    }

    function Nf(t, e, n, i, r, a, o) {
        var s = n.getOuterSize(), l = s.width, u = s.height;
        return null != a && (t + l + a > i ? t -= l + a : t += a), null != o && (e + u + o > r ? e -= u + o : e += o), [t, e]
    }

    function Vf(t, e, n, i, r) {
        var a = n.getOuterSize(), o = a.width, s = a.height;
        return t = Math.min(t + o, i) - o, e = Math.min(e + s, r) - s, t = Math.max(t, 0), e = Math.max(e, 0), [t, e]
    }

    function Ff(t, e, n) {
        var i = n[0], r = n[1], a = 5, o = 0, s = 0, l = e.width, u = e.height;
        switch (t) {
            case"inside":
                o = e.x + l / 2 - i / 2, s = e.y + u / 2 - r / 2;
                break;
            case"top":
                o = e.x + l / 2 - i / 2, s = e.y - r - a;
                break;
            case"bottom":
                o = e.x + l / 2 - i / 2, s = e.y + u + a;
                break;
            case"left":
                o = e.x - i - a, s = e.y + u / 2 - r / 2;
                break;
            case"right":
                o = e.x + l + a, s = e.y + u / 2 - r / 2
        }
        return [o, s]
    }

    function Hf(t) {
        return "center" === t || "middle" === t
    }

    function Gf(t) {
        Ni(t, "label", ["show"])
    }

    function Wf(t) {
        return !(isNaN(parseFloat(t.x)) && isNaN(parseFloat(t.y)))
    }

    function Zf(t) {
        return !isNaN(parseFloat(t.x)) && !isNaN(parseFloat(t.y))
    }

    function Xf(t, e, n, i, r, a) {
        var o = [], s = Bu(e, i), l = s ? e.getCalculationInfo("stackResultDimension") : i, u = $f(e, l, t),
            h = e.indicesOfNearest(l, u)[0];
        o[r] = e.get(n, h), o[a] = e.get(i, h);
        var c = to(e.get(i, h));
        return c = Math.min(c, 20), c >= 0 && (o[a] = +o[a].toFixed(c)), o
    }

    function Yf(t, e) {
        var n = t.getData(), r = t.coordinateSystem;
        if (e && !Zf(e) && !_(e.coord) && r) {
            var a = r.dimensions, o = Uf(e, n, r, t);
            if (e = i(e), e.type && eC[e.type] && o.baseAxis && o.valueAxis) {
                var s = JT(a, o.baseAxis.dim), l = JT(a, o.valueAxis.dim);
                e.coord = eC[e.type](n, o.baseDataDim, o.valueDataDim, s, l), e.value = e.coord[l]
            } else {
                for (var u = [null != e.xAxis ? e.xAxis : e.radiusAxis, null != e.yAxis ? e.yAxis : e.angleAxis], h = 0; 2 > h; h++) eC[u[h]] && (u[h] = $f(n, n.mapDimension(a[h]), u[h]));
                e.coord = u
            }
        }
        return e
    }

    function Uf(t, e, n, i) {
        var r = {};
        return null != t.valueIndex || null != t.valueDim ? (r.valueDataDim = null != t.valueIndex ? e.getDimension(t.valueIndex) : t.valueDim, r.valueAxis = n.getAxis(jf(i, r.valueDataDim)), r.baseAxis = n.getOtherAxis(r.valueAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim)) : (r.baseAxis = i.getBaseAxis(), r.valueAxis = n.getOtherAxis(r.baseAxis), r.baseDataDim = e.mapDimension(r.baseAxis.dim), r.valueDataDim = e.mapDimension(r.valueAxis.dim)), r
    }

    function jf(t, e) {
        var n = t.getData(), i = n.dimensions;
        e = n.getDimension(e);
        for (var r = 0; r < i.length; r++) {
            var a = n.getDimensionInfo(i[r]);
            if (a.name === e) return a.coordDim
        }
    }

    function qf(t, e) {
        return t && t.containData && e.coord && !Wf(e) ? t.containData(e.coord) : !0
    }

    function Kf(t, e, n, i) {
        return 2 > i ? t.coord && t.coord[i] : t.value
    }

    function $f(t, e, n) {
        if ("average" === n) {
            var i = 0, r = 0;
            return t.each(e, function (t) {
                isNaN(t) || (i += t, r++)
            }), i / r
        }
        return "median" === n ? t.getMedian(e) : t.getDataExtent(e, !0)["max" === n ? 1 : 0]
    }

    function Qf(t, e, n) {
        var i = e.coordinateSystem;
        t.each(function (r) {
            var a, o = t.getItemModel(r), s = $a(o.get("x"), n.getWidth()), l = $a(o.get("y"), n.getHeight());
            if (isNaN(s) || isNaN(l)) {
                if (e.getMarkerPosition) a = e.getMarkerPosition(t.getValues(t.dimensions, r)); else if (i) {
                    var u = t.get(i.dimensions[0], r), h = t.get(i.dimensions[1], r);
                    a = i.dataToPoint([u, h])
                }
            } else a = [s, l];
            isNaN(s) || (a[0] = s), isNaN(l) || (a[1] = l), t.setItemLayout(r, a)
        })
    }

    function Jf(t, e, n) {
        var i;
        i = t ? p(t && t.dimensions, function (t) {
            var n = e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {};
            return s({name: t}, n)
        }) : [{name: "value", type: "float"}];
        var r = new UM(i, n), a = p(n.get("data"), x(Yf, e));
        return t && (a = v(a, x(qf, t))), r.initData(a, null, t ? Kf : function (t) {
            return t.value
        }), r
    }

    function tp(t) {
        return isNaN(+t.cpx1) || isNaN(+t.cpy1)
    }

    function ep(t) {
        return "_" + t + "Type"
    }

    function np(t, e, n) {
        var i = e.getItemVisual(n, "color"), r = e.getItemVisual(n, t), a = e.getItemVisual(n, t + "Size");
        if (r && "none" !== r) {
            _(a) || (a = [a, a]);
            var o = _h(r, -a[0] / 2, -a[1] / 2, a[0], a[1], i);
            return o.name = t, o
        }
    }

    function ip(t) {
        var e = new aC({name: "line"});
        return rp(e.shape, t), e
    }

    function rp(t, e) {
        var n = e[0], i = e[1], r = e[2];
        t.x1 = n[0], t.y1 = n[1], t.x2 = i[0], t.y2 = i[1], t.percent = 1, r ? (t.cpx1 = r[0], t.cpy1 = r[1]) : (t.cpx1 = 0 / 0, t.cpy1 = 0 / 0)
    }

    function ap() {
        var t = this, e = t.childOfName("fromSymbol"), n = t.childOfName("toSymbol"), i = t.childOfName("label");
        if (e || n || !i.ignore) {
            for (var r = 1, a = this.parent; a;) a.scale && (r /= a.scale[0]), a = a.parent;
            var o = t.childOfName("line");
            if (this.__dirty || o.__dirty) {
                var s = o.shape.percent, l = o.pointAt(0), u = o.pointAt(s), h = U([], u, l);
                if (te(h, h), e) {
                    e.attr("position", l);
                    var c = o.tangentAt(0);
                    e.attr("rotation", Math.PI / 2 - Math.atan2(c[1], c[0])), e.attr("scale", [r * s, r * s])
                }
                if (n) {
                    n.attr("position", u);
                    var c = o.tangentAt(1);
                    n.attr("rotation", -Math.PI / 2 - Math.atan2(c[1], c[0])), n.attr("scale", [r * s, r * s])
                }
                if (!i.ignore) {
                    i.attr("position", u);
                    var d, f, p, g = 5 * r;
                    if ("end" === i.__position) d = [h[0] * g + u[0], h[1] * g + u[1]], f = h[0] > .8 ? "left" : h[0] < -.8 ? "right" : "center", p = h[1] > .8 ? "top" : h[1] < -.8 ? "bottom" : "middle"; else if ("middle" === i.__position) {
                        var v = s / 2, c = o.tangentAt(v), m = [c[1], -c[0]], y = o.pointAt(v);
                        m[1] > 0 && (m[0] = -m[0], m[1] = -m[1]), d = [y[0] + m[0] * g, y[1] + m[1] * g], f = "center", p = "bottom";
                        var x = -Math.atan2(c[1], c[0]);
                        u[0] < l[0] && (x = Math.PI + x), i.attr("rotation", x)
                    } else d = [-h[0] * g + l[0], -h[1] * g + l[1]], f = h[0] > .8 ? "right" : h[0] < -.8 ? "left" : "center", p = h[1] > .8 ? "bottom" : h[1] < -.8 ? "top" : "middle";
                    i.attr({
                        style: {textVerticalAlign: i.__verticalAlign || p, textAlign: i.__textAlign || f},
                        position: d,
                        scale: [r, r]
                    })
                }
            }
        }
    }

    function op(t, e, n) {
        dy.call(this), this._createLine(t, e, n)
    }

    function sp(t) {
        this._ctor = t || op, this.group = new dy
    }

    function lp(t, e, n, i) {
        var r = e.getItemLayout(n);
        if (dp(r)) {
            var a = new t._ctor(e, n, i);
            e.setItemGraphicEl(n, a), t.group.add(a)
        }
    }

    function up(t, e, n, i, r, a) {
        var o = e.getItemGraphicEl(i);
        return dp(n.getItemLayout(r)) ? (o ? o.updateData(n, r, a) : o = new t._ctor(n, r, a), n.setItemGraphicEl(r, o), void t.group.add(o)) : void t.group.remove(o)
    }

    function hp(t) {
        var e = t.hostModel;
        return {
            lineStyle: e.getModel("lineStyle").getLineStyle(),
            hoverLineStyle: e.getModel("emphasis.lineStyle").getLineStyle(),
            labelModel: e.getModel("label"),
            hoverLabelModel: e.getModel("emphasis.label")
        }
    }

    function cp(t) {
        return isNaN(t[0]) || isNaN(t[1])
    }

    function dp(t) {
        return !cp(t[0]) && !cp(t[1])
    }

    function fp(t) {
        return !isNaN(t) && !isFinite(t)
    }

    function pp(t, e, n, i) {
        var r = 1 - t, a = i.dimensions[t];
        return fp(e[r]) && fp(n[r]) && e[t] === n[t] && i.getAxis(a).containData(e[t])
    }

    function gp(t, e) {
        if ("cartesian2d" === t.type) {
            var n = e[0].coord, i = e[1].coord;
            if (n && i && (pp(1, n, i, t) || pp(0, n, i, t))) return !0
        }
        return qf(t, e[0]) && qf(t, e[1])
    }

    function vp(t, e, n, i, r) {
        var a, o = i.coordinateSystem, s = t.getItemModel(e), l = $a(s.get("x"), r.getWidth()),
            u = $a(s.get("y"), r.getHeight());
        if (isNaN(l) || isNaN(u)) {
            if (i.getMarkerPosition) a = i.getMarkerPosition(t.getValues(t.dimensions, e)); else {
                var h = o.dimensions, c = t.get(h[0], e), d = t.get(h[1], e);
                a = o.dataToPoint([c, d])
            }
            if ("cartesian2d" === o.type) {
                var f = o.getAxis("x"), p = o.getAxis("y"), h = o.dimensions;
                fp(t.get(h[0], e)) ? a[0] = f.toGlobalCoord(f.getExtent()[n ? 0 : 1]) : fp(t.get(h[1], e)) && (a[1] = p.toGlobalCoord(p.getExtent()[n ? 0 : 1]))
            }
            isNaN(l) || (a[0] = l), isNaN(u) || (a[1] = u)
        } else a = [l, u];
        t.setItemLayout(e, a)
    }

    function mp(t, e, n) {
        var i;
        i = t ? p(t && t.dimensions, function (t) {
            var n = e.getData().getDimensionInfo(e.getData().mapDimension(t)) || {};
            return s({name: t}, n)
        }) : [{name: "value", type: "float"}];
        var r = new UM(i, n), a = new UM(i, n), o = new UM([], n), l = p(n.get("data"), x(uC, e, t, n));
        t && (l = v(l, x(gp, t)));
        var u = t ? Kf : function (t) {
            return t.value
        };
        return r.initData(p(l, function (t) {
            return t[0]
        }), null, u), a.initData(p(l, function (t) {
            return t[1]
        }), null, u), o.initData(p(l, function (t) {
            return t[2]
        })), o.hasItemOption = !0, {from: r, to: a, line: o}
    }

    function yp(t) {
        var e = t.type, n = {number: "value", time: "time"};
        if (n[e] && (t.axisType = n[e], delete t.type), xp(t), _p(t, "controlPosition")) {
            var i = t.controlStyle || (t.controlStyle = {});
            _p(i, "position") || (i.position = t.controlPosition), "none" !== i.position || _p(i, "show") || (i.show = !1, delete i.position), delete t.controlPosition
        }
        f(t.data || [], function (t) {
            M(t) && !_(t) && (!_p(t, "value") && _p(t, "name") && (t.value = t.name), xp(t))
        })
    }

    function xp(t) {
        var e = t.itemStyle || (t.itemStyle = {}), n = e.emphasis || (e.emphasis = {}), i = t.label || t.label || {},
            r = i.normal || (i.normal = {}), a = {normal: 1, emphasis: 1};
        f(i, function (t, e) {
            a[e] || _p(r, e) || (r[e] = t)
        }), n.label && !_p(i, "emphasis") && (i.emphasis = n.label, delete n.label)
    }

    function _p(t, e) {
        return t.hasOwnProperty(e)
    }

    function wp(t, e) {
        return To(t.getBoxLayoutParams(), {width: e.getWidth(), height: e.getHeight()}, t.get("padding"))
    }

    function bp(t, e, n, r) {
        var a = ea(t.get(e).replace(/^path:\/\//, ""), i(r || {}), new xn(n[0], n[1], n[2], n[3]), "center");
        return a
    }

    function Mp(t, e, n, i, a, o) {
        var s = e.get("color");
        if (a) a.setColor(s), n.add(a), o && o.onUpdate(a); else {
            var l = t.get("symbol");
            a = _h(l, -1, -1, 2, 2, s), a.setStyle("strokeNoScale", !0), n.add(a), o && o.onCreate(a)
        }
        var u = e.getItemStyle(["color", "symbol", "symbolSize"]);
        a.setStyle(u), i = r({rectHover: !0, z2: 100}, i, !0);
        var h = t.get("symbolSize");
        h = h instanceof Array ? h.slice() : [+h, +h], h[0] /= 2, h[1] /= 2, i.scale = h;
        var c = t.get("symbolOffset");
        if (c) {
            var d = i.position = i.position || [0, 0];
            d[0] += $a(c[0], h[0]), d[1] += $a(c[1], h[1])
        }
        var f = t.get("symbolRotate");
        return i.rotation = (f || 0) * Math.PI / 180 || 0, a.attr(i), a.updateTransform(), a
    }

    function Sp(t, e, n, i, r) {
        if (!t.dragging) {
            var a = i.getModel("checkpointStyle"), o = n.dataToCoord(i.getData().get(["value"], e));
            r || !a.get("animation", !0) ? t.attr({position: [o, 0]}) : (t.stopAnimation(!0), t.animateTo({position: [o, 0]}, a.get("animationDuration", !0), a.get("animationEasing", !0)))
        }
    }

    function Ip(t) {
        return u(xC, t) >= 0
    }

    function Tp(t, e) {
        t = t.slice();
        var n = p(t, bo);
        e = (e || []).slice();
        var i = p(e, bo);
        return function (r, a) {
            f(t, function (t, o) {
                for (var s = {name: t, capital: n[o]}, l = 0; l < e.length; l++) s[e[l]] = t + i[l];
                r.call(a, s)
            })
        }
    }

    function Cp(t, e, n) {
        function i(t, e) {
            return u(e.nodes, t) >= 0
        }

        function r(t, i) {
            var r = !1;
            return e(function (e) {
                f(n(t, e) || [], function (t) {
                    i.records[e.name][t] && (r = !0)
                })
            }), r
        }

        function a(t, i) {
            i.nodes.push(t), e(function (e) {
                f(n(t, e) || [], function (t) {
                    i.records[e.name][t] = !0
                })
            })
        }

        return function (n) {
            function o(t) {
                !i(t, s) && r(t, s) && (a(t, s), l = !0)
            }

            var s = {nodes: [], records: {}};
            if (e(function (t) {
                s.records[t.name] = {}
            }), !n) return s;
            a(n, s);
            var l;
            do l = !1, t(o); while (l);
            return s
        }
    }

    function Ap(t, e, n) {
        var i = [1 / 0, -1 / 0];
        return wC(n, function (t) {
            var n = t.getData();
            n && wC(n.mapDimension(e, !0), function (t) {
                var e = n.getApproximateExtent(t);
                e[0] < i[0] && (i[0] = e[0]), e[1] > i[1] && (i[1] = e[1])
            })
        }), i[1] < i[0] && (i = [0 / 0, 0 / 0]), Dp(t, i), i
    }

    function Dp(t, e) {
        var n = t.getAxisModel(), i = n.getMin(!0), r = "category" === n.get("type"), a = r && n.getCategories().length;
        null != i && "dataMin" !== i && "function" != typeof i ? e[0] = i : r && (e[0] = a > 0 ? 0 : 0 / 0);
        var o = n.getMax(!0);
        return null != o && "dataMax" !== o && "function" != typeof o ? e[1] = o : r && (e[1] = a > 0 ? a - 1 : 0 / 0), n.get("scale", !0) || (e[0] > 0 && (e[0] = 0), e[1] < 0 && (e[1] = 0)), e
    }

    function kp(t, e) {
        var n = t.getAxisModel(), i = t._percentWindow, r = t._valueWindow;
        if (i) {
            var a = no(r, [0, 500]);
            a = Math.min(a, 20);
            var o = e || 0 === i[0] && 100 === i[1];
            n.setRange(o ? null : +r[0].toFixed(a), o ? null : +r[1].toFixed(a))
        }
    }

    function Pp(t) {
        var e = t._minMaxSpan = {}, n = t._dataZoomModel;
        wC(["min", "max"], function (i) {
            e[i + "Span"] = n.get(i + "Span");
            var r = n.get(i + "ValueSpan");
            if (null != r && (e[i + "ValueSpan"] = r, r = t.getAxisModel().axis.scale.parse(r), null != r)) {
                var a = t._dataExtent;
                e[i + "Span"] = Ka(a[0] + r, a, [0, 100], !0)
            }
        })
    }

    function Lp(t) {
        var e = {};
        return SC(["start", "end", "startValue", "endValue", "throttle"], function (n) {
            t.hasOwnProperty(n) && (e[n] = t[n])
        }), e
    }

    function Op(t, e) {
        var n = t._rangePropMode, i = t.get("rangeMode");
        SC([["start", "startValue"], ["end", "endValue"]], function (t, r) {
            var a = null != e[t[0]], o = null != e[t[1]];
            a && !o ? n[r] = "percent" : !a && o ? n[r] = "value" : i ? n[r] = i[r] : a && (n[r] = "percent")
        })
    }

    function zp(t, e) {
        var n = t[e] - t[1 - e];
        return {span: Math.abs(n), sign: n > 0 ? -1 : 0 > n ? 1 : e ? -1 : 1}
    }

    function Ep(t, e) {
        return Math.min(e[1], Math.max(e[0], t))
    }

    function Rp(t) {
        var e = {x: "y", y: "x", radius: "angle", angle: "radius"};
        return e[t]
    }

    function Bp(t) {
        return "vertical" === t ? "ns-resize" : "ew-resize"
    }

    function Np(t, e, n) {
        var i = Hp(t);
        i[e] = n
    }

    function Vp(t, e, n) {
        var i = Hp(t), r = i[e];
        r === n && (i[e] = null)
    }

    function Fp(t, e) {
        return !!Hp(t)[e]
    }

    function Hp(t) {
        return t[GC] || (t[GC] = {})
    }

    function Gp(t) {
        this.pointerChecker, this._zr = t, this._opt = {};
        var e = y, n = e(Wp, this), r = e(Zp, this), a = e(Xp, this), o = e(Yp, this), l = e(Up, this);
        Sm.call(this), this.setPointerChecker = function (t) {
            this.pointerChecker = t
        }, this.enable = function (e, u) {
            this.disable(), this._opt = s(i(u) || {}, {
                zoomOnMouseWheel: !0,
                moveOnMouseMove: !0,
                moveOnMouseWheel: !1,
                preventDefaultMouseMove: !0
            }), null == e && (e = !0), (e === !0 || "move" === e || "pan" === e) && (t.on("mousedown", n), t.on("mousemove", r), t.on("mouseup", a)), (e === !0 || "scale" === e || "zoom" === e) && (t.on("mousewheel", o), t.on("pinch", l))
        }, this.disable = function () {
            t.off("mousedown", n), t.off("mousemove", r), t.off("mouseup", a), t.off("mousewheel", o), t.off("pinch", l)
        }, this.dispose = this.disable, this.isDragging = function () {
            return this._dragging
        }, this.isPinching = function () {
            return this._pinching
        }
    }

    function Wp(t) {
        if (!(ye(t) || t.target && t.target.draggable)) {
            var e = t.offsetX, n = t.offsetY;
            this.pointerChecker && this.pointerChecker(t, e, n) && (this._x = e, this._y = n, this._dragging = !0)
        }
    }

    function Zp(t) {
        if (this._dragging && Kp("moveOnMouseMove", t, this._opt) && "pinch" !== t.gestureEvent && !Fp(this._zr, "globalPan")) {
            var e = t.offsetX, n = t.offsetY, i = this._x, r = this._y, a = e - i, o = n - r;
            this._x = e, this._y = n, this._opt.preventDefaultMouseMove && Cm(t.event), qp(this, "pan", "moveOnMouseMove", t, {
                dx: a,
                dy: o,
                oldX: i,
                oldY: r,
                newX: e,
                newY: n
            })
        }
    }

    function Xp(t) {
        ye(t) || (this._dragging = !1)
    }

    function Yp(t) {
        var e = Kp("zoomOnMouseWheel", t, this._opt), n = Kp("moveOnMouseWheel", t, this._opt), i = t.wheelDelta,
            r = Math.abs(i), a = t.offsetX, o = t.offsetY;
        if (0 !== i && (e || n)) {
            if (e) {
                var s = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1, l = i > 0 ? s : 1 / s;
                jp(this, "zoom", "zoomOnMouseWheel", t, {scale: l, originX: a, originY: o})
            }
            if (n) {
                var u = Math.abs(i), h = (i > 0 ? 1 : -1) * (u > 3 ? .4 : u > 1 ? .15 : .05);
                jp(this, "scrollMove", "moveOnMouseWheel", t, {scrollDelta: h, originX: a, originY: o})
            }
        }
    }

    function Up(t) {
        if (!Fp(this._zr, "globalPan")) {
            var e = t.pinchScale > 1 ? 1.1 : 1 / 1.1;
            jp(this, "zoom", null, t, {scale: e, originX: t.pinchX, originY: t.pinchY})
        }
    }

    function jp(t, e, n, i, r) {
        t.pointerChecker && t.pointerChecker(i, r.originX, r.originY) && (Cm(i.event), qp(t, e, n, i, r))
    }

    function qp(t, e, n, i, r) {
        r.isAvailableBehavior = y(Kp, null, n, i), t.trigger(e, r)
    }

    function Kp(t, e, n) {
        var i = n[t];
        return !t || i && (!b(i) || e.event[i + "Key"])
    }

    function $p(t, e) {
        var n = tg(t), i = e.dataZoomId, r = e.coordId;
        f(n, function (t) {
            var n = t.dataZoomInfos;
            n[i] && u(e.allCoordIds, r) < 0 && (delete n[i], t.count--)
        }), ng(n);
        var a = n[r];
        a || (a = n[r] = {
            coordId: r,
            dataZoomInfos: {},
            count: 0
        }, a.controller = eg(t, a), a.dispatchAction = x(ig, t)), !a.dataZoomInfos[i] && a.count++, a.dataZoomInfos[i] = e;
        var o = rg(a.dataZoomInfos);
        a.controller.enable(o.controlType, o.opt), a.controller.setPointerChecker(e.containsPoint), js(a, "dispatchAction", e.dataZoomModel.get("throttle", !0), "fixRate")
    }

    function Qp(t, e) {
        var n = tg(t);
        f(n, function (t) {
            t.controller.dispose();
            var n = t.dataZoomInfos;
            n[e] && (delete n[e], t.count--)
        }), ng(n)
    }

    function Jp(t) {
        return t.type + "\x00_" + t.id
    }

    function tg(t) {
        var e = t.getZr();
        return e[WC] || (e[WC] = {})
    }

    function eg(t, e) {
        var n = new Gp(t.getZr());
        return f(["pan", "zoom", "scrollMove"], function (t) {
            n.on(t, function (n) {
                var i = [];
                f(e.dataZoomInfos, function (r) {
                    if (n.isAvailableBehavior(r.dataZoomModel.option)) {
                        var a = (r.getRange || {})[t], o = a && a(e.controller, n);
                        !r.dataZoomModel.get("disabled", !0) && o && i.push({
                            dataZoomId: r.dataZoomId,
                            start: o[0],
                            end: o[1]
                        })
                    }
                }), i.length && e.dispatchAction(i)
            })
        }), n
    }

    function ng(t) {
        f(t, function (e, n) {
            e.count || (e.controller.dispose(), delete t[n])
        })
    }

    function ig(t, e) {
        t.dispatchAction({type: "dataZoom", batch: e})
    }

    function rg(t) {
        var e, n = "type_", i = {type_true: 2, type_move: 1, type_false: 0, type_undefined: -1}, r = !0;
        return f(t, function (t) {
            var a = t.dataZoomModel, o = a.get("disabled", !0) ? !1 : a.get("zoomLock", !0) ? "move" : !0;
            i[n + o] > i[n + e] && (e = o), r &= a.get("preventDefaultMouseMove", !0)
        }), {
            controlType: e,
            opt: {zoomOnMouseWheel: !0, moveOnMouseMove: !0, moveOnMouseWheel: !0, preventDefaultMouseMove: !!r}
        }
    }

    function ag(t) {
        return function (e, n, i, r) {
            var a = this._range, o = a.slice(), s = e.axisModels[0];
            if (s) {
                var l = t(o, s, e, n, i, r);
                return AC(l, o, [0, 100], "all"), this._range = o, a[0] !== o[0] || a[1] !== o[1] ? o : void 0
            }
        }
    }

    function og(t, e) {
        return t && t.hasOwnProperty && t.hasOwnProperty(e)
    }

    function sg(t) {
        var e = t.pieceList;
        t.hasSpecialVisual = !1, f(e, function (e, n) {
            e.originIndex = n, null != e.visual && (t.hasSpecialVisual = !0)
        })
    }

    function lg(t) {
        var e = t.categories, n = t.visual, i = t.categoryMap = {};
        if (KC(e, function (t, e) {
            i[t] = e
        }), !_(n)) {
            var r = [];
            M(n) ? KC(n, function (t, e) {
                var n = i[e];
                r[null != n ? n : QC] = t
            }) : r[QC] = n, n = mg(t, r)
        }
        for (var a = e.length - 1; a >= 0; a--) null == n[a] && (delete i[e[a]], e.pop())
    }

    function ug(t, e) {
        var n = t.visual, i = [];
        M(n) ? KC(n, function (t) {
            i.push(t)
        }) : null != n && i.push(n);
        var r = {color: 1, symbol: 1};
        e || 1 !== i.length || r.hasOwnProperty(t.type) || (i[1] = i[0]), mg(t, i)
    }

    function hg(t) {
        return {
            applyVisual: function (e, n, i) {
                e = this.mapValueToVisual(e), i("color", t(n("color"), e))
            }, _doMap: gg([0, 1])
        }
    }

    function cg(t) {
        var e = this.option.visual;
        return e[Math.round(Ka(t, [0, 1], [0, e.length - 1], !0))] || {}
    }

    function dg(t) {
        return function (e, n, i) {
            i(t, this.mapValueToVisual(e))
        }
    }

    function fg(t) {
        var e = this.option.visual;
        return e[this.option.loop && t !== QC ? t % e.length : t]
    }

    function pg() {
        return this.option.visual[0]
    }

    function gg(t) {
        return {
            linear: function (e) {
                return Ka(e, t, this.option.visual, !0)
            }, category: fg, piecewise: function (e, n) {
                var i = vg.call(this, n);
                return null == i && (i = Ka(e, t, this.option.visual, !0)), i
            }, fixed: pg
        }
    }

    function vg(t) {
        var e = this.option, n = e.pieceList;
        if (e.hasSpecialVisual) {
            var i = JC.findPieceIndex(t, n), r = n[i];
            if (r && r.visual) return r.visual[this.type]
        }
    }

    function mg(t, e) {
        return t.visual = e, "color" === t.type && (t.parsedVisual = p(e, function (t) {
            return Ye(t)
        })), e
    }

    function yg(t, e, n) {
        return t ? n >= e : n > e
    }

    function xg(t) {
        if (t) for (var e in t) if (t.hasOwnProperty(e)) return !0
    }

    function _g(t, e, n) {
        function r() {
            var t = function () {
            };
            t.prototype.__hidden = t.prototype;
            var e = new t;
            return e
        }

        var a = {};
        return nA(e, function (e) {
            var o = a[e] = r();
            nA(t[e], function (t, r) {
                if (JC.isValidType(r)) {
                    var a = {type: r, visual: t};
                    n && n(a, e), o[r] = new JC(a), "opacity" === r && (a = i(a), a.type = "colorAlpha", o.__hidden.__alphaForOpacity = new JC(a))
                }
            })
        }), a
    }

    function wg(t, e, n) {
        var r;
        f(n, function (t) {
            e.hasOwnProperty(t) && xg(e[t]) && (r = !0)
        }), r && f(n, function (n) {
            e.hasOwnProperty(n) && xg(e[n]) ? t[n] = i(e[n]) : delete t[n]
        })
    }

    function bg(t, e, n, i) {
        function r(t, r) {
            function o(t) {
                return r.getItemVisual(l, t)
            }

            function s(t, e) {
                r.setItemVisual(l, t, e)
            }

            null != i && (i = r.getDimension(i));
            for (var l; null != (l = t.next());) {
                var u = r.getRawDataItem(l);
                if (!u || u.visualMap !== !1) for (var h = null != i ? r.get(i, l, !0) : l, c = n(h), d = e[c], f = a[c], p = 0, g = f.length; g > p; p++) {
                    var v = f[p];
                    d[v] && d[v].applyVisual(h, o, s)
                }
            }
        }

        var a = {};
        return f(t, function (t) {
            var n = JC.prepareVisualTypes(e[t]);
            a[t] = n
        }), {progress: r}
    }

    function Mg(t, e, n, i) {
        function r(t) {
            return l[t]
        }

        function a(t, e) {
            l[t] = e
        }

        for (var o = e.targetVisuals[i], s = JC.prepareVisualTypes(o), l = {color: t.getData().getVisual("color")}, u = 0, h = s.length; h > u; u++) {
            var c = s[u], d = o["opacity" === c ? "__alphaForOpacity" : c];
            d && d.applyVisual(n, r, a)
        }
        return l.color
    }

    function Sg(t, e, n) {
        if (n[0] === n[1]) return n.slice();
        for (var i = 200, r = (n[1] - n[0]) / i, a = n[0], o = [], s = 0; i >= s && a < n[1]; s++) o.push(a), a += r;
        return o.push(n[1]), o
    }

    function Ig(t, e, n) {
        var i = t.option, r = i.align;
        if (null != r && "auto" !== r) return r;
        for (var a = {
            width: e.getWidth(),
            height: e.getHeight()
        }, o = "horizontal" === i.orient ? 1 : 0, s = [["left", "right", "width"], ["top", "bottom", "height"]], l = s[o], u = [0, null, 10], h = {}, c = 0; 3 > c; c++) h[s[1 - o][c]] = u[c], h[l[c]] = 2 === c ? n[0] : i[l[c]];
        var d = [["x", "width", 3], ["y", "height", 0]][o], f = To(h, a, i.padding);
        return l[(f.margin[d[2]] || 0) + f[d[0]] + .5 * f[d[1]] < .5 * a[d[1]] ? 0 : 1]
    }

    function Tg(t) {
        return f(t || [], function () {
            null != t.dataIndex && (t.dataIndexInside = t.dataIndex, t.dataIndex = null)
        }), t
    }

    function Cg(t, e, n, i) {
        return new O_({
            shape: {points: t}, draggable: !!n, cursor: e, drift: n, onmousemove: function (t) {
                Cm(t.event)
            }, ondragend: i
        })
    }

    function Ag(t, e) {
        return 0 === t ? [[0, 0], [e, 0], [e, -e]] : [[0, 0], [e, 0], [e, e]]
    }

    function Dg(t, e, n, i) {
        return t ? [[0, -xA(e, _A(n, 0))], [bA, 0], [0, xA(e, _A(i - n, 0))]] : [[0, 0], [5, -5], [5, 5]]
    }

    function kg(t, e, n) {
        var i = wA / 2, r = t.get("hoverLinkDataSize");
        return r && (i = mA(r, e, n, !0) / 2), i
    }

    function Pg(t) {
        var e = t.get("hoverLinkOnHandle");
        return !!(null == e ? t.get("realtime") : e)
    }

    function Lg(t) {
        return "vertical" === t ? "ns-resize" : "ew-resize"
    }

    function Og(t, e) {
        var n = t.inverse;
        ("vertical" === t.orient ? !n : n) && e.reverse()
    }

    function zg(t, e) {
        CA[t] = e
    }

    function Eg(t) {
        return CA[t]
    }

    function Rg(t) {
        return 0 === t.indexOf("my")
    }

    function Bg(t) {
        this.model = t
    }

    function Ng(t) {
        this.model = t
    }

    function Vg(t) {
        var e = {}, n = [], i = [];
        return t.eachRawSeries(function (t) {
            var r = t.coordinateSystem;
            if (!r || "cartesian2d" !== r.type && "polar" !== r.type) n.push(t); else {
                var a = r.getBaseAxis();
                if ("category" === a.type) {
                    var o = a.dim + "_" + a.index;
                    e[o] || (e[o] = {categoryAxis: a, valueAxis: r.getOtherAxis(a), series: []}, i.push({
                        axisDim: a.dim,
                        axisIndex: a.index
                    })), e[o].series.push(t)
                } else n.push(t)
            }
        }), {seriesGroupByCategoryAxis: e, other: n, meta: i}
    }

    function Fg(t) {
        var e = [];
        return f(t, function (t) {
            var n = t.categoryAxis, i = t.valueAxis, r = i.dim, a = [" "].concat(p(t.series, function (t) {
                return t.name
            })), o = [n.model.getCategories()];
            f(t.series, function (t) {
                o.push(t.getRawData().mapArray(r, function (t) {
                    return t
                }))
            });
            for (var s = [a.join(BA)], l = 0; l < o[0].length; l++) {
                for (var u = [], h = 0; h < o.length; h++) u.push(o[h][l]);
                s.push(u.join(BA))
            }
            e.push(s.join("\n"))
        }), e.join("\n\n" + RA + "\n\n")
    }

    function Hg(t) {
        return p(t, function (t) {
            var e = t.getRawData(), n = [t.name], i = [];
            return e.each(e.dimensions, function () {
                for (var t = arguments.length, r = arguments[t - 1], a = e.getName(r), o = 0; t - 1 > o; o++) i[o] = arguments[o];
                n.push((a ? a + BA : "") + i.join(BA))
            }), n.join("\n")
        }).join("\n\n" + RA + "\n\n")
    }

    function Gg(t) {
        var e = Vg(t);
        return {
            value: v([Fg(e.seriesGroupByCategoryAxis), Hg(e.other)], function (t) {
                return t.replace(/[\n\t\s]/g, "")
            }).join("\n\n" + RA + "\n\n"), meta: e.meta
        }
    }

    function Wg(t) {
        return t.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }

    function Zg(t) {
        var e = t.slice(0, t.indexOf("\n"));
        return e.indexOf(BA) >= 0 ? !0 : void 0
    }

    function Xg(t) {
        for (var e = t.split(/\n+/g), n = Wg(e.shift()).split(NA), i = [], r = p(n, function (t) {
            return {name: t, data: []}
        }), a = 0; a < e.length; a++) {
            var o = Wg(e[a]).split(NA);
            i.push(o.shift());
            for (var s = 0; s < o.length; s++) r[s] && (r[s].data[a] = o[s])
        }
        return {series: r, categories: i}
    }

    function Yg(t) {
        for (var e = t.split(/\n+/g), n = Wg(e.shift()), i = [], r = 0; r < e.length; r++) {
            var a, o = Wg(e[r]).split(NA), s = "", l = !1;
            isNaN(o[0]) ? (l = !0, s = o[0], o = o.slice(1), i[r] = {
                name: s,
                value: []
            }, a = i[r].value) : a = i[r] = [];
            for (var u = 0; u < o.length; u++) a.push(+o[u]);
            1 === a.length && (l ? i[r].value = a[0] : i[r] = a[0])
        }
        return {name: n, data: i}
    }

    function Ug(t, e) {
        var n = t.split(new RegExp("\n*" + RA + "\n*", "g")), i = {series: []};
        return f(n, function (t, n) {
            if (Zg(t)) {
                var r = Xg(t), a = e[n], o = a.axisDim + "Axis";
                a && (i[o] = i[o] || [], i[o][a.axisIndex] = {data: r.categories}, i.series = i.series.concat(r.series))
            } else {
                var r = Yg(t);
                i.series.push(r)
            }
        }), i
    }

    function jg(t) {
        this._dom = null, this.model = t
    }

    function qg(t, e) {
        return p(t, function (t, n) {
            var i = e && e[n];
            return M(i) && !_(i) ? (M(t) && !_(t) && (t = t.value), s({value: t}, i)) : t
        })
    }

    function Kg(t) {
        Sm.call(this), this._zr = t, this.group = new dy, this._brushType, this._brushOption, this._panels, this._track = [], this._dragging, this._covers = [], this._creatingCover, this._creatingPanel, this._enableGlobalPan, this._uid = "brushController_" + QA++, this._handlers = {}, FA(JA, function (t, e) {
            this._handlers[e] = y(t, this)
        }, this)
    }

    function $g(t, e) {
        var n = t._zr;
        t._enableGlobalPan || Np(n, jA, t._uid), FA(t._handlers, function (t, e) {
            n.on(e, t)
        }), t._brushType = e.brushType, t._brushOption = r(i($A), e, !0)
    }

    function Qg(t) {
        var e = t._zr;
        Vp(e, jA, t._uid), FA(t._handlers, function (t, n) {
            e.off(n, t)
        }), t._brushType = t._brushOption = null
    }

    function Jg(t, e) {
        var n = tD[e.brushType].createCover(t, e);
        return n.__brushOption = e, nv(n, e), t.group.add(n), n
    }

    function tv(t, e) {
        var n = rv(e);
        return n.endCreating && (n.endCreating(t, e), nv(e, e.__brushOption)), e
    }

    function ev(t, e) {
        var n = e.__brushOption;
        rv(e).updateCoverShape(t, e, n.range, n)
    }

    function nv(t, e) {
        var n = e.z;
        null == n && (n = XA), t.traverse(function (t) {
            t.z = n, t.z2 = n
        })
    }

    function iv(t, e) {
        rv(e).updateCommon(t, e), ev(t, e)
    }

    function rv(t) {
        return tD[t.__brushOption.brushType]
    }

    function av(t, e, n) {
        var i = t._panels;
        if (!i) return !0;
        var r, a = t._transform;
        return FA(i, function (t) {
            t.isTargetByCursor(e, n, a) && (r = t)
        }), r
    }

    function ov(t, e) {
        var n = t._panels;
        if (!n) return !0;
        var i = e.__brushOption.panelId;
        return null != i ? n[i] : !0
    }

    function sv(t) {
        var e = t._covers, n = e.length;
        return FA(e, function (e) {
            t.group.remove(e)
        }, t), e.length = 0, !!n
    }

    function lv(t, e) {
        var n = HA(t._covers, function (t) {
            var e = t.__brushOption, n = i(e.range);
            return {brushType: e.brushType, panelId: e.panelId, range: n}
        });
        t.trigger("brush", n, {isEnd: !!e.isEnd, removeOnClick: !!e.removeOnClick})
    }

    function uv(t) {
        var e = t._track;
        if (!e.length) return !1;
        var n = e[e.length - 1], i = e[0], r = n[0] - i[0], a = n[1] - i[1], o = ZA(r * r + a * a, .5);
        return o > YA
    }

    function hv(t) {
        var e = t.length - 1;
        return 0 > e && (e = 0), [t[0], t[e]]
    }

    function cv(t, e, n, i) {
        var r = new dy;
        return r.add(new B_({
            name: "main",
            style: gv(n),
            silent: !0,
            draggable: !0,
            cursor: "move",
            drift: VA(t, e, r, "nswe"),
            ondragend: VA(lv, e, {isEnd: !0})
        })), FA(i, function (n) {
            r.add(new B_({
                name: n,
                style: {opacity: 0},
                draggable: !0,
                silent: !0,
                invisible: !0,
                drift: VA(t, e, r, n),
                ondragend: VA(lv, e, {isEnd: !0})
            }))
        }), r
    }

    function dv(t, e, n, i) {
        var r = i.brushStyle.lineWidth || 0, a = WA(r, UA), o = n[0][0], s = n[1][0], l = o - r / 2, u = s - r / 2,
            h = n[0][1], c = n[1][1], d = h - a + r / 2, f = c - a + r / 2, p = h - o, g = c - s, v = p + r, m = g + r;
        pv(t, e, "main", o, s, p, g), i.transformable && (pv(t, e, "w", l, u, a, m), pv(t, e, "e", d, u, a, m), pv(t, e, "n", l, u, v, a), pv(t, e, "s", l, f, v, a), pv(t, e, "nw", l, u, a, a), pv(t, e, "ne", d, u, a, a), pv(t, e, "sw", l, f, a, a), pv(t, e, "se", d, f, a, a))
    }

    function fv(t, e) {
        var n = e.__brushOption, i = n.transformable, r = e.childAt(0);
        r.useStyle(gv(n)), r.attr({
            silent: !i,
            cursor: i ? "move" : "default"
        }), FA(["w", "e", "n", "s", "se", "sw", "ne", "nw"], function (n) {
            var r = e.childOfName(n), a = yv(t, n);
            r && r.attr({silent: !i, invisible: !i, cursor: i ? KA[a] + "-resize" : null})
        })
    }

    function pv(t, e, n, i, r, a, o) {
        var s = e.childOfName(n);
        s && s.setShape(Mv(bv(t, e, [[i, r], [i + a, r + o]])))
    }

    function gv(t) {
        return s({strokeNoScale: !0}, t.brushStyle)
    }

    function vv(t, e, n, i) {
        var r = [GA(t, n), GA(e, i)], a = [WA(t, n), WA(e, i)];
        return [[r[0], a[0]], [r[1], a[1]]]
    }

    function mv(t) {
        return Ra(t.group)
    }

    function yv(t, e) {
        if (e.length > 1) {
            e = e.split("");
            var n = [yv(t, e[0]), yv(t, e[1])];
            return ("e" === n[0] || "w" === n[0]) && n.reverse(), n.join("")
        }
        var i = {w: "left", e: "right", n: "top", s: "bottom"}, r = {left: "w", right: "e", top: "n", bottom: "s"},
            n = Na(i[e], mv(t));
        return r[n]
    }

    function xv(t, e, n, i, r, a, o) {
        var s = i.__brushOption, l = t(s.range), u = wv(n, a, o);
        FA(r.split(""), function (t) {
            var e = qA[t];
            l[e[0]][e[1]] += u[e[0]]
        }), s.range = e(vv(l[0][0], l[1][0], l[0][1], l[1][1])), iv(n, i), lv(n, {isEnd: !1})
    }

    function _v(t, e, n, i) {
        var r = e.__brushOption.range, a = wv(t, n, i);
        FA(r, function (t) {
            t[0] += a[0], t[1] += a[1]
        }), iv(t, e), lv(t, {isEnd: !1})
    }

    function wv(t, e, n) {
        var i = t.group, r = i.transformCoordToLocal(e, n), a = i.transformCoordToLocal(0, 0);
        return [r[0] - a[0], r[1] - a[1]]
    }

    function bv(t, e, n) {
        var r = ov(t, e);
        return r && r !== !0 ? r.clipPath(n, t._transform) : i(n)
    }

    function Mv(t) {
        var e = GA(t[0][0], t[1][0]), n = GA(t[0][1], t[1][1]), i = WA(t[0][0], t[1][0]), r = WA(t[0][1], t[1][1]);
        return {x: e, y: n, width: i - e, height: r - n}
    }

    function Sv(t, e, n) {
        if (t._brushType) {
            var i = t._zr, r = t._covers, a = av(t, e, n);
            if (!t._dragging) for (var o = 0; o < r.length; o++) {
                var s = r[o].__brushOption;
                if (a && (a === !0 || s.panelId === a.panelId) && tD[s.brushType].contain(r[o], n[0], n[1])) return
            }
            a && i.setCursorStyle("crosshair")
        }
    }

    function Iv(t) {
        var e = t.event;
        e.preventDefault && e.preventDefault()
    }

    function Tv(t, e, n) {
        return t.childOfName("main").contain(e, n)
    }

    function Cv(t, e, n, r) {
        var a, o = t._creatingCover, s = t._creatingPanel, l = t._brushOption;
        if (t._track.push(n.slice()), uv(t) || o) {
            if (s && !o) {
                "single" === l.brushMode && sv(t);
                var u = i(l);
                u.brushType = Av(u.brushType, s), u.panelId = s === !0 ? null : s.panelId, o = t._creatingCover = Jg(t, u), t._covers.push(o)
            }
            if (o) {
                var h = tD[Av(t._brushType, s)], c = o.__brushOption;
                c.range = h.getCreatingRange(bv(t, o, t._track)), r && (tv(t, o), h.updateCommon(t, o)), ev(t, o), a = {isEnd: r}
            }
        } else r && "single" === l.brushMode && l.removeOnClick && av(t, e, n) && sv(t) && (a = {
            isEnd: r,
            removeOnClick: !0
        });
        return a
    }

    function Av(t, e) {
        return "auto" === t ? e.defaultBrushType : t
    }

    function Dv(t) {
        if (this._dragging) {
            Iv(t);
            var e = this.group.transformCoordToLocal(t.offsetX, t.offsetY), n = Cv(this, t, e, !0);
            this._dragging = !1, this._track = [], this._creatingCover = null, n && lv(this, n)
        }
    }

    function kv(t) {
        return {
            createCover: function (e, n) {
                return cv(VA(xv, function (e) {
                    var n = [e, [0, 100]];
                    return t && n.reverse(), n
                }, function (e) {
                    return e[t]
                }), e, n, [["w", "e"], ["n", "s"]][t])
            }, getCreatingRange: function (e) {
                var n = hv(e), i = GA(n[0][t], n[1][t]), r = WA(n[0][t], n[1][t]);
                return [i, r]
            }, updateCoverShape: function (e, n, i, r) {
                var a, o = ov(e, n);
                if (o !== !0 && o.getLinearBrushOtherExtent) a = o.getLinearBrushOtherExtent(t, e._transform); else {
                    var s = e._zr;
                    a = [0, [s.getWidth(), s.getHeight()][1 - t]]
                }
                var l = [i, a];
                t && l.reverse(), dv(e, n, l, r)
            }, updateCommon: fv, contain: Tv
        }
    }

    function Pv(t, e, n) {
        var i = e.getComponentByElement(t.topTarget), r = i && i.coordinateSystem;
        return i && i !== n && !eD[i.mainType] && r && r.model !== n
    }

    function Lv(t) {
        return t = Ev(t), function (e) {
            return Fa(e, t)
        }
    }

    function Ov(t, e) {
        return t = Ev(t), function (n) {
            var i = null != e ? e : n, r = i ? t.width : t.height, a = i ? t.x : t.y;
            return [a, a + (r || 0)]
        }
    }

    function zv(t, e, n) {
        return t = Ev(t), function (i, r) {
            return t.contain(r[0], r[1]) && !Pv(i, e, n)
        }
    }

    function Ev(t) {
        return xn.create(t)
    }

    function Rv(t, e, n) {
        var i = this._targetInfoList = [], r = {}, a = Nv(e, t);
        nD(lD, function (t, e) {
            (!n || !n.include || iD(n.include, e) >= 0) && t(a, i, r)
        })
    }

    function Bv(t) {
        return t[0] > t[1] && t.reverse(), t
    }

    function Nv(t, e) {
        return ji(t, e, {includeMainTypes: oD})
    }

    function Vv(t, e, n, i) {
        var r = n.getAxis(["x", "y"][t]), a = Bv(p([0, 1], function (t) {
            return e ? r.coordToData(r.toLocalCoord(i[t])) : r.toGlobalCoord(r.dataToCoord(i[t]))
        })), o = [];
        return o[t] = a, o[1 - t] = [0 / 0, 0 / 0], {values: a, xyMinMax: o}
    }

    function Fv(t, e, n, i) {
        return [e[0] - i[t] * n[0], e[1] - i[t] * n[1]]
    }

    function Hv(t, e) {
        var n = Gv(t), i = Gv(e), r = [n[0] / i[0], n[1] / i[1]];
        return isNaN(r[0]) && (r[0] = 1), isNaN(r[1]) && (r[1] = 1), r
    }

    function Gv(t) {
        return t ? [t[0][1] - t[0][0], t[1][1] - t[1][0]] : [0 / 0, 0 / 0]
    }

    function Wv(t, e) {
        var n = Uv(t);
        fD(e, function (e, i) {
            for (var r = n.length - 1; r >= 0; r--) {
                var a = n[r];
                if (a[i]) break
            }
            if (0 > r) {
                var o = t.queryComponents({mainType: "dataZoom", subType: "select", id: i})[0];
                if (o) {
                    var s = o.getPercentRange();
                    n[0][i] = {dataZoomId: i, start: s[0], end: s[1]}
                }
            }
        }), n.push(e)
    }

    function Zv(t) {
        var e = Uv(t), n = e[e.length - 1];
        e.length > 1 && e.pop();
        var i = {};
        return fD(n, function (t, n) {
            for (var r = e.length - 1; r >= 0; r--) {
                var t = e[r][n];
                if (t) {
                    i[n] = t;
                    break
                }
            }
        }), i
    }

    function Xv(t) {
        t[pD] = null
    }

    function Yv(t) {
        return Uv(t).length
    }

    function Uv(t) {
        var e = t[pD];
        return e || (e = t[pD] = [{}]), e
    }

    function jv(t, e, n) {
        (this._brushController = new Kg(n.getZr())).on("brush", y(this._onBrush, this)).mount(), this._isZoomActive
    }

    function qv(t) {
        var e = {};
        return f(["xAxisIndex", "yAxisIndex"], function (n) {
            e[n] = t[n], null == e[n] && (e[n] = "all"), (e[n] === !1 || "none" === e[n]) && (e[n] = [])
        }), e
    }

    function Kv(t, e) {
        t.setIconStatus("back", Yv(e) > 1 ? "emphasis" : "normal")
    }

    function $v(t, e, n, i, r) {
        var a = n._isZoomActive;
        i && "takeGlobalCursor" === i.type && (a = "dataZoomSelect" === i.key ? i.dataZoomSelectActive : !1), n._isZoomActive = a, t.setIconStatus("zoom", a ? "emphasis" : "normal");
        var o = new Rv(qv(t.option), e, {include: ["grid"]});
        n._brushController.setPanels(o.makePanelOpts(r, function (t) {
            return t.xAxisDeclared && !t.yAxisDeclared ? "lineX" : !t.xAxisDeclared && t.yAxisDeclared ? "lineY" : "rect"
        })).enableBrush(a ? {brushType: "auto", brushStyle: {lineWidth: 0, fill: "rgba(0,0,0,0.2)"}} : !1)
    }

    function Qv(t) {
        this.model = t
    }

    var Jv = 2311, tm = function () {
        return Jv++
    }, em = {};
    em = "object" == typeof wx && "function" == typeof wx.getSystemInfoSync ? {
        browser: {},
        os: {},
        node: !1,
        wxa: !0,
        canvasSupported: !0,
        svgSupported: !1,
        touchEventsSupported: !0,
        domSupported: !1
    } : "undefined" == typeof document && "undefined" != typeof self ? {
        browser: {},
        os: {},
        node: !1,
        worker: !0,
        canvasSupported: !0,
        domSupported: !1
    } : "undefined" == typeof navigator ? {
        browser: {},
        os: {},
        node: !0,
        worker: !1,
        canvasSupported: !0,
        svgSupported: !0,
        domSupported: !1
    } : e(navigator.userAgent);
    var nm = em, im = {
            "[object Function]": 1,
            "[object RegExp]": 1,
            "[object Date]": 1,
            "[object Error]": 1,
            "[object CanvasGradient]": 1,
            "[object CanvasPattern]": 1,
            "[object Image]": 1,
            "[object Canvas]": 1
        }, rm = {
            "[object Int8Array]": 1,
            "[object Uint8Array]": 1,
            "[object Uint8ClampedArray]": 1,
            "[object Int16Array]": 1,
            "[object Uint16Array]": 1,
            "[object Int32Array]": 1,
            "[object Uint32Array]": 1,
            "[object Float32Array]": 1,
            "[object Float64Array]": 1
        }, am = Object.prototype.toString, om = Array.prototype, sm = om.forEach, lm = om.filter, um = om.slice,
        hm = om.map, cm = om.reduce, dm = {}, fm = function () {
            return dm.createCanvas()
        };
    dm.createCanvas = function () {
        return document.createElement("canvas")
    };
    var pm, gm = "__ec_primitive__";
    B.prototype = {
        constructor: B, get: function (t) {
            return this.data.hasOwnProperty(t) ? this.data[t] : null
        }, set: function (t, e) {
            return this.data[t] = e
        }, each: function (t, e) {
            void 0 !== e && (t = y(t, e));
            for (var n in this.data) this.data.hasOwnProperty(n) && t(this.data[n], n)
        }, removeKey: function (t) {
            delete this.data[t]
        }
    };
    var vm = (Object.freeze || Object)({
            $override: n,
            clone: i,
            merge: r,
            mergeAll: a,
            extend: o,
            defaults: s,
            createCanvas: fm,
            getContext: l,
            indexOf: u,
            inherits: h,
            mixin: c,
            isArrayLike: d,
            each: f,
            map: p,
            reduce: g,
            filter: v,
            find: m,
            bind: y,
            curry: x,
            isArray: _,
            isFunction: w,
            isString: b,
            isObject: M,
            isBuiltInObject: S,
            isTypedArray: I,
            isDom: T,
            eqNaN: C,
            retrieve: A,
            retrieve2: D,
            retrieve3: k,
            slice: P,
            normalizeCssArray: L,
            assert: O,
            trim: z,
            setAsPrimitive: E,
            isPrimitive: R,
            createHashMap: N,
            concatArray: V,
            noop: F
        }), mm = "undefined" == typeof Float32Array ? Array : Float32Array, ym = j, xm = q, _m = ee, wm = ne,
        bm = (Object.freeze || Object)({
            create: H,
            copy: G,
            clone: W,
            set: Z,
            add: X,
            scaleAndAdd: Y,
            sub: U,
            len: j,
            length: ym,
            lenSquare: q,
            lengthSquare: xm,
            mul: K,
            div: $,
            dot: Q,
            scale: J,
            normalize: te,
            distance: ee,
            dist: _m,
            distanceSquare: ne,
            distSquare: wm,
            negate: ie,
            lerp: re,
            applyTransform: ae,
            min: oe,
            max: se
        });
    le.prototype = {
        constructor: le, _dragStart: function (t) {
            var e = t.target;
            e && e.draggable && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, this.dispatchToElement(ue(e, t), "dragstart", t.event))
        }, _drag: function (t) {
            var e = this._draggingTarget;
            if (e) {
                var n = t.offsetX, i = t.offsetY, r = n - this._x, a = i - this._y;
                this._x = n, this._y = i, e.drift(r, a, t), this.dispatchToElement(ue(e, t), "drag", t.event);
                var o = this.findHover(n, i, e).target, s = this._dropTarget;
                this._dropTarget = o, e !== o && (s && o !== s && this.dispatchToElement(ue(s, t), "dragleave", t.event), o && o !== s && this.dispatchToElement(ue(o, t), "dragenter", t.event))
            }
        }, _dragEnd: function (t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.dispatchToElement(ue(e, t), "dragend", t.event), this._dropTarget && this.dispatchToElement(ue(this._dropTarget, t), "drop", t.event), this._draggingTarget = null, this._dropTarget = null
        }
    };
    var Mm = Array.prototype.slice, Sm = function (t) {
        this._$handlers = {}, this._$eventProcessor = t
    };
    Sm.prototype = {
        constructor: Sm, one: function (t, e, n, i) {
            return ce(this, t, e, n, i, !0)
        }, on: function (t, e, n, i) {
            return ce(this, t, e, n, i, !1)
        }, isSilent: function (t) {
            var e = this._$handlers;
            return !e[t] || !e[t].length
        }, off: function (t, e) {
            var n = this._$handlers;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (n[t]) {
                    for (var i = [], r = 0, a = n[t].length; a > r; r++) n[t][r].h !== e && i.push(n[t][r]);
                    n[t] = i
                }
                n[t] && 0 === n[t].length && delete n[t]
            } else delete n[t];
            return this
        }, trigger: function (t) {
            var e = this._$handlers[t], n = this._$eventProcessor;
            if (e) {
                var i = arguments, r = i.length;
                r > 3 && (i = Mm.call(i, 1));
                for (var a = e.length, o = 0; a > o;) {
                    var s = e[o];
                    if (n && n.filter && null != s.query && !n.filter(t, s.query)) o++; else {
                        switch (r) {
                            case 1:
                                s.h.call(s.ctx);
                                break;
                            case 2:
                                s.h.call(s.ctx, i[1]);
                                break;
                            case 3:
                                s.h.call(s.ctx, i[1], i[2]);
                                break;
                            default:
                                s.h.apply(s.ctx, i)
                        }
                        s.one ? (e.splice(o, 1), a--) : o++
                    }
                }
            }
            return n && n.afterTrigger && n.afterTrigger(t), this
        }, triggerWithContext: function (t) {
            var e = this._$handlers[t], n = this._$eventProcessor;
            if (e) {
                var i = arguments, r = i.length;
                r > 4 && (i = Mm.call(i, 1, i.length - 1));
                for (var a = i[i.length - 1], o = e.length, s = 0; o > s;) {
                    var l = e[s];
                    if (n && n.filter && null != l.query && !n.filter(t, l.query)) s++; else {
                        switch (r) {
                            case 1:
                                l.h.call(a);
                                break;
                            case 2:
                                l.h.call(a, i[1]);
                                break;
                            case 3:
                                l.h.call(a, i[1], i[2]);
                                break;
                            default:
                                l.h.apply(a, i)
                        }
                        l.one ? (e.splice(s, 1), o--) : s++
                    }
                }
            }
            return n && n.afterTrigger && n.afterTrigger(t), this
        }
    };
    var Im = "undefined" != typeof window && !!window.addEventListener,
        Tm = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Cm = Im ? function (t) {
            t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0
        } : function (t) {
            t.returnValue = !1, t.cancelBubble = !0
        }, Am = function () {
            this._track = []
        };
    Am.prototype = {
        constructor: Am, recognize: function (t, e, n) {
            return this._doTrack(t, e, n), this._recognize(t)
        }, clear: function () {
            return this._track.length = 0, this
        }, _doTrack: function (t, e, n) {
            var i = t.touches;
            if (i) {
                for (var r = {points: [], touches: [], target: e, event: t}, a = 0, o = i.length; o > a; a++) {
                    var s = i[a], l = fe(n, s, {});
                    r.points.push([l.zrX, l.zrY]), r.touches.push(s)
                }
                this._track.push(r)
            }
        }, _recognize: function (t) {
            for (var e in Dm) if (Dm.hasOwnProperty(e)) {
                var n = Dm[e](this._track, t);
                if (n) return n
            }
        }
    };
    var Dm = {
        pinch: function (t, e) {
            var n = t.length;
            if (n) {
                var i = (t[n - 1] || {}).points, r = (t[n - 2] || {}).points || i;
                if (r && r.length > 1 && i && i.length > 1) {
                    var a = xe(i) / xe(r);
                    !isFinite(a) && (a = 1), e.pinchScale = a;
                    var o = _e(i);
                    return e.pinchX = o[0], e.pinchY = o[1], {type: "pinch", target: t[0].target, event: e}
                }
            }
        }
    }, km = "silent";
    Me.prototype.dispose = function () {
    };
    var Pm = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
        Lm = function (t, e, n, i) {
            Sm.call(this), this.storage = t, this.painter = e, this.painterRoot = i, n = n || new Me, this.proxy = null, this._hovered = {}, this._lastTouchMoment, this._lastX, this._lastY, this._gestureMgr, le.call(this), this.setHandlerProxy(n)
        };
    Lm.prototype = {
        constructor: Lm, setHandlerProxy: function (t) {
            this.proxy && this.proxy.dispose(), t && (f(Pm, function (e) {
                t.on && t.on(e, this[e], this)
            }, this), t.handler = this), this.proxy = t
        }, mousemove: function (t) {
            var e = t.zrX, n = t.zrY, i = this._hovered, r = i.target;
            r && !r.__zr && (i = this.findHover(i.x, i.y), r = i.target);
            var a = this._hovered = this.findHover(e, n), o = a.target, s = this.proxy;
            s.setCursor && s.setCursor(o ? o.cursor : "default"), r && o !== r && this.dispatchToElement(i, "mouseout", t), this.dispatchToElement(a, "mousemove", t), o && o !== r && this.dispatchToElement(a, "mouseover", t)
        }, mouseout: function (t) {
            this.dispatchToElement(this._hovered, "mouseout", t);
            var e, n = t.toElement || t.relatedTarget;
            do n = n && n.parentNode; while (n && 9 !== n.nodeType && !(e = n === this.painterRoot));
            !e && this.trigger("globalout", {event: t})
        }, resize: function () {
            this._hovered = {}
        }, dispatch: function (t, e) {
            var n = this[t];
            n && n.call(this, e)
        }, dispose: function () {
            this.proxy.dispose(), this.storage = this.proxy = this.painter = null
        }, setCursorStyle: function (t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t)
        }, dispatchToElement: function (t, e, n) {
            t = t || {};
            var i = t.target;
            if (!i || !i.silent) {
                for (var r = "on" + e, a = we(e, t, n); i && (i[r] && (a.cancelBubble = i[r].call(i, a)), i.trigger(e, a), i = i.parent, !a.cancelBubble);) ;
                a.cancelBubble || (this.trigger(e, a), this.painter && this.painter.eachOtherLayer(function (t) {
                    "function" == typeof t[r] && t[r].call(t, a), t.trigger && t.trigger(e, a)
                }))
            }
        }, findHover: function (t, e, n) {
            for (var i = this.storage.getDisplayList(), r = {x: t, y: e}, a = i.length - 1; a >= 0; a--) {
                var o;
                if (i[a] !== n && !i[a].ignore && (o = Se(i[a], t, e)) && (!r.topTarget && (r.topTarget = i[a]), o !== km)) {
                    r.target = i[a];
                    break
                }
            }
            return r
        }, processGesture: function (t, e) {
            this._gestureMgr || (this._gestureMgr = new Am);
            var n = this._gestureMgr;
            "start" === e && n.clear();
            var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
            if ("end" === e && n.clear(), i) {
                var r = i.type;
                t.gestureEvent = r, this.dispatchToElement({target: i.target}, r, i.event)
            }
        }
    }, f(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
        Lm.prototype[t] = function (e) {
            var n = this.findHover(e.zrX, e.zrY), i = n.target;
            if ("mousedown" === t) this._downEl = i, this._downPoint = [e.zrX, e.zrY], this._upEl = i; else if ("mouseup" === t) this._upEl = i; else if ("click" === t) {
                if (this._downEl !== this._upEl || !this._downPoint || _m(this._downPoint, [e.zrX, e.zrY]) > 4) return;
                this._downPoint = null
            }
            this.dispatchToElement(n, t, e)
        }
    }), c(Lm, Sm), c(Lm, le);
    var Om = "undefined" == typeof Float32Array ? Array : Float32Array, zm = (Object.freeze || Object)({
        create: Ie,
        identity: Te,
        copy: Ce,
        mul: Ae,
        translate: De,
        rotate: ke,
        scale: Pe,
        invert: Le,
        clone: Oe
    }), Em = Te, Rm = 5e-5, Bm = function (t) {
        t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
    }, Nm = Bm.prototype;
    Nm.transform = null, Nm.needLocalTransform = function () {
        return ze(this.rotation) || ze(this.position[0]) || ze(this.position[1]) || ze(this.scale[0] - 1) || ze(this.scale[1] - 1)
    };
    var Vm = [];
    Nm.updateTransform = function () {
        var t = this.parent, e = t && t.transform, n = this.needLocalTransform(), i = this.transform;
        if (!n && !e) return void (i && Em(i));
        i = i || Ie(), n ? this.getLocalTransform(i) : Em(i), e && (n ? Ae(i, t.transform, i) : Ce(i, t.transform)), this.transform = i;
        var r = this.globalScaleRatio;
        if (null != r && 1 !== r) {
            this.getGlobalScale(Vm);
            var a = Vm[0] < 0 ? -1 : 1, o = Vm[1] < 0 ? -1 : 1, s = ((Vm[0] - a) * r + a) / Vm[0] || 0,
                l = ((Vm[1] - o) * r + o) / Vm[1] || 0;
            i[0] *= s, i[1] *= s, i[2] *= l, i[3] *= l
        }
        this.invTransform = this.invTransform || Ie(), Le(this.invTransform, i)
    }, Nm.getLocalTransform = function (t) {
        return Bm.getLocalTransform(this, t)
    }, Nm.setTransform = function (t) {
        var e = this.transform, n = t.dpr || 1;
        e ? t.setTransform(n * e[0], n * e[1], n * e[2], n * e[3], n * e[4], n * e[5]) : t.setTransform(n, 0, 0, n, 0, 0)
    }, Nm.restoreTransform = function (t) {
        var e = t.dpr || 1;
        t.setTransform(e, 0, 0, e, 0, 0)
    };
    var Fm = [], Hm = Ie();
    Nm.setLocalTransform = function (t) {
        if (t) {
            var e = t[0] * t[0] + t[1] * t[1], n = t[2] * t[2] + t[3] * t[3], i = this.position, r = this.scale;
            ze(e - 1) && (e = Math.sqrt(e)), ze(n - 1) && (n = Math.sqrt(n)), t[0] < 0 && (e = -e), t[3] < 0 && (n = -n), i[0] = t[4], i[1] = t[5], r[0] = e, r[1] = n, this.rotation = Math.atan2(-t[1] / n, t[0] / e)
        }
    }, Nm.decomposeTransform = function () {
        if (this.transform) {
            var t = this.parent, e = this.transform;
            t && t.transform && (Ae(Fm, t.invTransform, e), e = Fm);
            var n = this.origin;
            n && (n[0] || n[1]) && (Hm[4] = n[0], Hm[5] = n[1], Ae(Fm, e, Hm), Fm[4] -= n[0], Fm[5] -= n[1], e = Fm), this.setLocalTransform(e)
        }
    }, Nm.getGlobalScale = function (t) {
        var e = this.transform;
        return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t)
    }, Nm.transformCoordToLocal = function (t, e) {
        var n = [t, e], i = this.invTransform;
        return i && ae(n, n, i), n
    }, Nm.transformCoordToGlobal = function (t, e) {
        var n = [t, e], i = this.transform;
        return i && ae(n, n, i), n
    }, Bm.getLocalTransform = function (t, e) {
        e = e || [], Em(e);
        var n = t.origin, i = t.scale || [1, 1], r = t.rotation || 0, a = t.position || [0, 0];
        return n && (e[4] -= n[0], e[5] -= n[1]), Pe(e, e, i), r && ke(e, e, r), n && (e[4] += n[0], e[5] += n[1]), e[4] += a[0], e[5] += a[1], e
    };
    var Gm = {
        linear: function (t) {
            return t
        }, quadraticIn: function (t) {
            return t * t
        }, quadraticOut: function (t) {
            return t * (2 - t)
        }, quadraticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
        }, cubicIn: function (t) {
            return t * t * t
        }, cubicOut: function (t) {
            return --t * t * t + 1
        }, cubicInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        }, quarticIn: function (t) {
            return t * t * t * t
        }, quarticOut: function (t) {
            return 1 - --t * t * t * t
        }, quarticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
        }, quinticIn: function (t) {
            return t * t * t * t * t
        }, quinticOut: function (t) {
            return --t * t * t * t * t + 1
        }, quinticInOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        }, sinusoidalIn: function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
        }, sinusoidalOut: function (t) {
            return Math.sin(t * Math.PI / 2)
        }, sinusoidalInOut: function (t) {
            return .5 * (1 - Math.cos(Math.PI * t))
        }, exponentialIn: function (t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
        }, exponentialOut: function (t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
        }, exponentialInOut: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
        }, circularIn: function (t) {
            return 1 - Math.sqrt(1 - t * t)
        }, circularOut: function (t) {
            return Math.sqrt(1 - --t * t)
        }, circularInOut: function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        }, elasticIn: function (t) {
            var e, n = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i)))
        }, elasticOut: function (t) {
            var e, n = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / i) + 1)
        }, elasticInOut: function (t) {
            var e, n = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = i / 4) : e = i * Math.asin(1 / n) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1)
        }, backIn: function (t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
        }, backOut: function (t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1
        }, backInOut: function (t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
        }, bounceIn: function (t) {
            return 1 - Gm.bounceOut(1 - t)
        }, bounceOut: function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }, bounceInOut: function (t) {
            return .5 > t ? .5 * Gm.bounceIn(2 * t) : .5 * Gm.bounceOut(2 * t - 1) + .5
        }
    };
    Ee.prototype = {
        constructor: Ee, step: function (t, e) {
            if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void (this._pausedTime += e);
            var n = (t - this._startTime - this._pausedTime) / this._life;
            if (!(0 > n)) {
                n = Math.min(n, 1);
                var i = this.easing, r = "string" == typeof i ? Gm[i] : i, a = "function" == typeof r ? r(n) : n;
                return this.fire("frame", a), 1 === n ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
            }
        }, restart: function (t) {
            var e = (t - this._startTime - this._pausedTime) % this._life;
            this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
        }, fire: function (t, e) {
            t = "on" + t, this[t] && this[t](this._target, e)
        }, pause: function () {
            this._paused = !0
        }, resume: function () {
            this._paused = !1
        }
    };
    var Wm = function () {
        this.head = null, this.tail = null, this._len = 0
    }, Zm = Wm.prototype;
    Zm.insert = function (t) {
        var e = new Xm(t);
        return this.insertEntry(e), e
    }, Zm.insertEntry = function (t) {
        this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
    }, Zm.remove = function (t) {
        var e = t.prev, n = t.next;
        e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, this._len--
    }, Zm.len = function () {
        return this._len
    }, Zm.clear = function () {
        this.head = this.tail = null, this._len = 0
    };
    var Xm = function (t) {
        this.value = t, this.next, this.prev
    }, Ym = function (t) {
        this._list = new Wm, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
    }, Um = Ym.prototype;
    Um.put = function (t, e) {
        var n = this._list, i = this._map, r = null;
        if (null == i[t]) {
            var a = n.len(), o = this._lastRemovedEntry;
            if (a >= this._maxSize && a > 0) {
                var s = n.head;
                n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s
            }
            o ? o.value = e : o = new Xm(e), o.key = t, n.insertEntry(o), i[t] = o
        }
        return r
    }, Um.get = function (t) {
        var e = this._map[t], n = this._list;
        return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0
    }, Um.clear = function () {
        this._list.clear(), this._map = {}
    };
    var jm = {
        transparent: [0, 0, 0, 0],
        aliceblue: [240, 248, 255, 1],
        antiquewhite: [250, 235, 215, 1],
        aqua: [0, 255, 255, 1],
        aquamarine: [127, 255, 212, 1],
        azure: [240, 255, 255, 1],
        beige: [245, 245, 220, 1],
        bisque: [255, 228, 196, 1],
        black: [0, 0, 0, 1],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        blueviolet: [138, 43, 226, 1],
        brown: [165, 42, 42, 1],
        burlywood: [222, 184, 135, 1],
        cadetblue: [95, 158, 160, 1],
        chartreuse: [127, 255, 0, 1],
        chocolate: [210, 105, 30, 1],
        coral: [255, 127, 80, 1],
        cornflowerblue: [100, 149, 237, 1],
        cornsilk: [255, 248, 220, 1],
        crimson: [220, 20, 60, 1],
        cyan: [0, 255, 255, 1],
        darkblue: [0, 0, 139, 1],
        darkcyan: [0, 139, 139, 1],
        darkgoldenrod: [184, 134, 11, 1],
        darkgray: [169, 169, 169, 1],
        darkgreen: [0, 100, 0, 1],
        darkgrey: [169, 169, 169, 1],
        darkkhaki: [189, 183, 107, 1],
        darkmagenta: [139, 0, 139, 1],
        darkolivegreen: [85, 107, 47, 1],
        darkorange: [255, 140, 0, 1],
        darkorchid: [153, 50, 204, 1],
        darkred: [139, 0, 0, 1],
        darksalmon: [233, 150, 122, 1],
        darkseagreen: [143, 188, 143, 1],
        darkslateblue: [72, 61, 139, 1],
        darkslategray: [47, 79, 79, 1],
        darkslategrey: [47, 79, 79, 1],
        darkturquoise: [0, 206, 209, 1],
        darkviolet: [148, 0, 211, 1],
        deeppink: [255, 20, 147, 1],
        deepskyblue: [0, 191, 255, 1],
        dimgray: [105, 105, 105, 1],
        dimgrey: [105, 105, 105, 1],
        dodgerblue: [30, 144, 255, 1],
        firebrick: [178, 34, 34, 1],
        floralwhite: [255, 250, 240, 1],
        forestgreen: [34, 139, 34, 1],
        fuchsia: [255, 0, 255, 1],
        gainsboro: [220, 220, 220, 1],
        ghostwhite: [248, 248, 255, 1],
        gold: [255, 215, 0, 1],
        goldenrod: [218, 165, 32, 1],
        gray: [128, 128, 128, 1],
        green: [0, 128, 0, 1],
        greenyellow: [173, 255, 47, 1],
        grey: [128, 128, 128, 1],
        honeydew: [240, 255, 240, 1],
        hotpink: [255, 105, 180, 1],
        indianred: [205, 92, 92, 1],
        indigo: [75, 0, 130, 1],
        ivory: [255, 255, 240, 1],
        khaki: [240, 230, 140, 1],
        lavender: [230, 230, 250, 1],
        lavenderblush: [255, 240, 245, 1],
        lawngreen: [124, 252, 0, 1],
        lemonchiffon: [255, 250, 205, 1],
        lightblue: [173, 216, 230, 1],
        lightcoral: [240, 128, 128, 1],
        lightcyan: [224, 255, 255, 1],
        lightgoldenrodyellow: [250, 250, 210, 1],
        lightgray: [211, 211, 211, 1],
        lightgreen: [144, 238, 144, 1],
        lightgrey: [211, 211, 211, 1],
        lightpink: [255, 182, 193, 1],
        lightsalmon: [255, 160, 122, 1],
        lightseagreen: [32, 178, 170, 1],
        lightskyblue: [135, 206, 250, 1],
        lightslategray: [119, 136, 153, 1],
        lightslategrey: [119, 136, 153, 1],
        lightsteelblue: [176, 196, 222, 1],
        lightyellow: [255, 255, 224, 1],
        lime: [0, 255, 0, 1],
        limegreen: [50, 205, 50, 1],
        linen: [250, 240, 230, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        mediumaquamarine: [102, 205, 170, 1],
        mediumblue: [0, 0, 205, 1],
        mediumorchid: [186, 85, 211, 1],
        mediumpurple: [147, 112, 219, 1],
        mediumseagreen: [60, 179, 113, 1],
        mediumslateblue: [123, 104, 238, 1],
        mediumspringgreen: [0, 250, 154, 1],
        mediumturquoise: [72, 209, 204, 1],
        mediumvioletred: [199, 21, 133, 1],
        midnightblue: [25, 25, 112, 1],
        mintcream: [245, 255, 250, 1],
        mistyrose: [255, 228, 225, 1],
        moccasin: [255, 228, 181, 1],
        navajowhite: [255, 222, 173, 1],
        navy: [0, 0, 128, 1],
        oldlace: [253, 245, 230, 1],
        olive: [128, 128, 0, 1],
        olivedrab: [107, 142, 35, 1],
        orange: [255, 165, 0, 1],
        orangered: [255, 69, 0, 1],
        orchid: [218, 112, 214, 1],
        palegoldenrod: [238, 232, 170, 1],
        palegreen: [152, 251, 152, 1],
        paleturquoise: [175, 238, 238, 1],
        palevioletred: [219, 112, 147, 1],
        papayawhip: [255, 239, 213, 1],
        peachpuff: [255, 218, 185, 1],
        peru: [205, 133, 63, 1],
        pink: [255, 192, 203, 1],
        plum: [221, 160, 221, 1],
        powderblue: [176, 224, 230, 1],
        purple: [128, 0, 128, 1],
        red: [255, 0, 0, 1],
        rosybrown: [188, 143, 143, 1],
        royalblue: [65, 105, 225, 1],
        saddlebrown: [139, 69, 19, 1],
        salmon: [250, 128, 114, 1],
        sandybrown: [244, 164, 96, 1],
        seagreen: [46, 139, 87, 1],
        seashell: [255, 245, 238, 1],
        sienna: [160, 82, 45, 1],
        silver: [192, 192, 192, 1],
        skyblue: [135, 206, 235, 1],
        slateblue: [106, 90, 205, 1],
        slategray: [112, 128, 144, 1],
        slategrey: [112, 128, 144, 1],
        snow: [255, 250, 250, 1],
        springgreen: [0, 255, 127, 1],
        steelblue: [70, 130, 180, 1],
        tan: [210, 180, 140, 1],
        teal: [0, 128, 128, 1],
        thistle: [216, 191, 216, 1],
        tomato: [255, 99, 71, 1],
        turquoise: [64, 224, 208, 1],
        violet: [238, 130, 238, 1],
        wheat: [245, 222, 179, 1],
        white: [255, 255, 255, 1],
        whitesmoke: [245, 245, 245, 1],
        yellow: [255, 255, 0, 1],
        yellowgreen: [154, 205, 50, 1]
    }, qm = new Ym(20), Km = null, $m = $e, Qm = Qe, Jm = (Object.freeze || Object)({
        parse: Ye,
        lift: qe,
        toHex: Ke,
        fastLerp: $e,
        fastMapToColor: $m,
        lerp: Qe,
        mapToColor: Qm,
        modifyHSL: Je,
        modifyAlpha: tn,
        stringify: en
    }), ty = Array.prototype.slice, ey = function (t, e, n, i) {
        this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = n || nn, this._setter = i || rn, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
    };
    ey.prototype = {
        when: function (t, e) {
            var n = this._tracks;
            for (var i in e) if (e.hasOwnProperty(i)) {
                if (!n[i]) {
                    n[i] = [];
                    var r = this._getter(this._target, i);
                    if (null == r) continue;
                    0 !== t && n[i].push({time: 0, value: dn(r)})
                }
                n[i].push({time: t, value: e[i]})
            }
            return this
        }, during: function (t) {
            return this._onframeList.push(t), this
        }, pause: function () {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
            this._paused = !0
        }, resume: function () {
            for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
            this._paused = !1
        }, isPaused: function () {
            return !!this._paused
        }, _doneCallback: function () {
            this._tracks = {}, this._clipList.length = 0;
            for (var t = this._doneList, e = t.length, n = 0; e > n; n++) t[n].call(this)
        }, start: function (t, e) {
            var n, i = this, r = 0, a = function () {
                r--, r || i._doneCallback()
            };
            for (var o in this._tracks) if (this._tracks.hasOwnProperty(o)) {
                var s = gn(this, t, a, this._tracks[o], o, e);
                s && (this._clipList.push(s), r++, this.animation && this.animation.addClip(s), n = s)
            }
            if (n) {
                var l = n.onframe;
                n.onframe = function (t, e) {
                    l(t, e);
                    for (var n = 0; n < i._onframeList.length; n++) i._onframeList[n](t, e)
                }
            }
            return r || this._doneCallback(), this
        }, stop: function (t) {
            for (var e = this._clipList, n = this.animation, i = 0; i < e.length; i++) {
                var r = e[i];
                t && r.onframe(this._target, 1), n && n.removeClip(r)
            }
            e.length = 0
        }, delay: function (t) {
            return this._delay = t, this
        }, done: function (t) {
            return t && this._doneList.push(t), this
        }, getClips: function () {
            return this._clipList
        }
    };
    var ny = 1;
    "undefined" != typeof window && (ny = Math.max(window.devicePixelRatio || 1, 1));
    var iy = 0, ry = ny, ay = function () {
    };
    1 === iy ? ay = function () {
        for (var t in arguments) throw new Error(arguments[t])
    } : iy > 1 && (ay = function () {
        for (var t in arguments) console.log(arguments[t])
    });
    var oy = ay, sy = function () {
        this.animators = []
    };
    sy.prototype = {
        constructor: sy, animate: function (t, e) {
            var n, i = !1, r = this, a = this.__zr;
            if (t) {
                var o = t.split("."), s = r;
                i = "shape" === o[0];
                for (var l = 0, h = o.length; h > l; l++) s && (s = s[o[l]]);
                s && (n = s)
            } else n = r;
            if (!n) return void oy('Property "' + t + '" is not existed in element ' + r.id);
            var c = r.animators, d = new ey(n, e);
            return d.during(function () {
                r.dirty(i)
            }).done(function () {
                c.splice(u(c, d), 1)
            }), c.push(d), a && a.animation.addAnimator(d), d
        }, stopAnimation: function (t) {
            for (var e = this.animators, n = e.length, i = 0; n > i; i++) e[i].stop(t);
            return e.length = 0, this
        }, animateTo: function (t, e, n, i, r, a) {
            vn(this, t, e, n, i, r, a)
        }, animateFrom: function (t, e, n, i, r, a) {
            vn(this, t, e, n, i, r, a, !0)
        }
    };
    var ly = function (t) {
        Bm.call(this, t), Sm.call(this, t), sy.call(this, t), this.id = t.id || tm()
    };
    ly.prototype = {
        type: "element", name: "", __zr: null, ignore: !1, clipPath: null, isGroup: !1, drift: function (t, e) {
            switch (this.draggable) {
                case"horizontal":
                    e = 0;
                    break;
                case"vertical":
                    t = 0
            }
            var n = this.transform;
            n || (n = this.transform = [1, 0, 0, 1, 0, 0]), n[4] += t, n[5] += e, this.decomposeTransform(), this.dirty(!1)
        }, beforeUpdate: function () {
        }, afterUpdate: function () {
        }, update: function () {
            this.updateTransform()
        }, traverse: function () {
        }, attrKV: function (t, e) {
            if ("position" === t || "scale" === t || "origin" === t) {
                if (e) {
                    var n = this[t];
                    n || (n = this[t] = []), n[0] = e[0], n[1] = e[1]
                }
            } else this[t] = e
        }, hide: function () {
            this.ignore = !0, this.__zr && this.__zr.refresh()
        }, show: function () {
            this.ignore = !1, this.__zr && this.__zr.refresh()
        }, attr: function (t, e) {
            if ("string" == typeof t) this.attrKV(t, e); else if (M(t)) for (var n in t) t.hasOwnProperty(n) && this.attrKV(n, t[n]);
            return this.dirty(!1), this
        }, setClipPath: function (t) {
            var e = this.__zr;
            e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
        }, removeClipPath: function () {
            var t = this.clipPath;
            t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
        }, addSelfToZr: function (t) {
            this.__zr = t;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
            this.clipPath && this.clipPath.addSelfToZr(t)
        }, removeSelfFromZr: function (t) {
            this.__zr = null;
            var e = this.animators;
            if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
            this.clipPath && this.clipPath.removeSelfFromZr(t)
        }
    }, c(ly, sy), c(ly, Bm), c(ly, Sm);
    var uy = ae, hy = Math.min, cy = Math.max;
    xn.prototype = {
        constructor: xn, union: function (t) {
            var e = hy(t.x, this.x), n = hy(t.y, this.y);
            this.width = cy(t.x + t.width, this.x + this.width) - e, this.height = cy(t.y + t.height, this.y + this.height) - n, this.x = e, this.y = n
        }, applyTransform: function () {
            var t = [], e = [], n = [], i = [];
            return function (r) {
                if (r) {
                    t[0] = n[0] = this.x, t[1] = i[1] = this.y, e[0] = i[0] = this.x + this.width, e[1] = n[1] = this.y + this.height, uy(t, t, r), uy(e, e, r), uy(n, n, r), uy(i, i, r), this.x = hy(t[0], e[0], n[0], i[0]), this.y = hy(t[1], e[1], n[1], i[1]);
                    var a = cy(t[0], e[0], n[0], i[0]), o = cy(t[1], e[1], n[1], i[1]);
                    this.width = a - this.x, this.height = o - this.y
                }
            }
        }(), calculateTransform: function (t) {
            var e = this, n = t.width / e.width, i = t.height / e.height, r = Ie();
            return De(r, r, [-e.x, -e.y]), Pe(r, r, [n, i]), De(r, r, [t.x, t.y]), r
        }, intersect: function (t) {
            if (!t) return !1;
            t instanceof xn || (t = xn.create(t));
            var e = this, n = e.x, i = e.x + e.width, r = e.y, a = e.y + e.height, o = t.x, s = t.x + t.width, l = t.y,
                u = t.y + t.height;
            return !(o > i || n > s || l > a || r > u)
        }, contain: function (t, e) {
            var n = this;
            return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height
        }, clone: function () {
            return new xn(this.x, this.y, this.width, this.height)
        }, copy: function (t) {
            this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
        }, plain: function () {
            return {x: this.x, y: this.y, width: this.width, height: this.height}
        }
    }, xn.create = function (t) {
        return new xn(t.x, t.y, t.width, t.height)
    };
    var dy = function (t) {
        t = t || {}, ly.call(this, t);
        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
        this._children = [], this.__storage = null, this.__dirty = !0
    };
    dy.prototype = {
        constructor: dy, isGroup: !0, type: "group", silent: !1, children: function () {
            return this._children.slice()
        }, childAt: function (t) {
            return this._children[t]
        }, childOfName: function (t) {
            for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n]
        }, childCount: function () {
            return this._children.length
        }, add: function (t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
        }, addBefore: function (t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var n = this._children, i = n.indexOf(e);
                i >= 0 && (n.splice(i, 0, t), this._doAdd(t))
            }
            return this
        }, _doAdd: function (t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__storage, n = this.__zr;
            e && e !== t.__storage && (e.addToStorage(t), t instanceof dy && t.addChildrenToStorage(e)), n && n.refresh()
        }, remove: function (t) {
            var e = this.__zr, n = this.__storage, i = this._children, r = u(i, t);
            return 0 > r ? this : (i.splice(r, 1), t.parent = null, n && (n.delFromStorage(t), t instanceof dy && t.delChildrenFromStorage(n)), e && e.refresh(), this)
        }, removeAll: function () {
            var t, e, n = this._children, i = this.__storage;
            for (e = 0; e < n.length; e++) t = n[e], i && (i.delFromStorage(t), t instanceof dy && t.delChildrenFromStorage(i)), t.parent = null;
            return n.length = 0, this
        }, eachChild: function (t, e) {
            for (var n = this._children, i = 0; i < n.length; i++) {
                var r = n[i];
                t.call(e, r, i)
            }
            return this
        }, traverse: function (t, e) {
            for (var n = 0; n < this._children.length; n++) {
                var i = this._children[n];
                t.call(e, i), "group" === i.type && i.traverse(t, e)
            }
            return this
        }, addChildrenToStorage: function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.addToStorage(n), n instanceof dy && n.addChildrenToStorage(t)
            }
        }, delChildrenFromStorage: function (t) {
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                t.delFromStorage(n), n instanceof dy && n.delChildrenFromStorage(t)
            }
        }, dirty: function () {
            return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
        }, getBoundingRect: function (t) {
            for (var e = null, n = new xn(0, 0, 0, 0), i = t || this._children, r = [], a = 0; a < i.length; a++) {
                var o = i[a];
                if (!o.ignore && !o.invisible) {
                    var s = o.getBoundingRect(), l = o.getLocalTransform(r);
                    l ? (n.copy(s), n.applyTransform(l), e = e || n.clone(), e.union(n)) : (e = e || s.clone(), e.union(s))
                }
            }
            return e || n
        }
    }, h(dy, ly);
    var fy = 32, py = 7, gy = function () {
        this._roots = [], this._displayList = [], this._displayListLen = 0
    };
    gy.prototype = {
        constructor: gy, traverse: function (t, e) {
            for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e)
        }, getDisplayList: function (t, e) {
            return e = e || !1, t && this.updateDisplayList(e), this._displayList
        }, updateDisplayList: function (t) {
            this._displayListLen = 0;
            for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);
            n.length = this._displayListLen, nm.canvasSupported && Cn(n, An)
        }, _updateAndAddDisplayable: function (t, e, n) {
            if (!t.ignore || n) {
                t.beforeUpdate(), t.__dirty && t.update(), t.afterUpdate();
                var i = t.clipPath;
                if (i) {
                    e = e ? e.slice() : [];
                    for (var r = i, a = t; r;) r.parent = a, r.updateTransform(), e.push(r), a = r, r = r.clipPath
                }
                if (t.isGroup) {
                    for (var o = t._children, s = 0; s < o.length; s++) {
                        var l = o[s];
                        t.__dirty && (l.__dirty = !0), this._updateAndAddDisplayable(l, e, n)
                    }
                    t.__dirty = !1
                } else t.__clipPaths = e, this._displayList[this._displayListLen++] = t
            }
        }, addRoot: function (t) {
            t.__storage !== this && (t instanceof dy && t.addChildrenToStorage(this), this.addToStorage(t), this._roots.push(t))
        }, delRoot: function (t) {
            if (null == t) {
                for (var e = 0; e < this._roots.length; e++) {
                    var n = this._roots[e];
                    n instanceof dy && n.delChildrenFromStorage(this)
                }
                return this._roots = [], this._displayList = [], void (this._displayListLen = 0)
            }
            if (t instanceof Array) for (var e = 0, i = t.length; i > e; e++) this.delRoot(t[e]); else {
                var r = u(this._roots, t);
                r >= 0 && (this.delFromStorage(t), this._roots.splice(r, 1), t instanceof dy && t.delChildrenFromStorage(this))
            }
        }, addToStorage: function (t) {
            return t && (t.__storage = this, t.dirty(!1)), this
        }, delFromStorage: function (t) {
            return t && (t.__storage = null), this
        }, dispose: function () {
            this._renderList = this._roots = null
        }, displayableSortFunc: An
    };
    var vy = {
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            textShadowBlur: 1,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            textBoxShadowBlur: 1,
            textBoxShadowOffsetX: 1,
            textBoxShadowOffsetY: 1
        }, my = function (t, e, n) {
            return vy.hasOwnProperty(e) ? n *= t.dpr : n
        }, yy = {NONE: 0, STYLE_BIND: 1, PLAIN_TEXT: 2}, xy = 9,
        _y = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],
        wy = function (t) {
            this.extendFrom(t, !1)
        };
    wy.prototype = {
        constructor: wy,
        fill: "#000",
        stroke: null,
        opacity: 1,
        fillOpacity: null,
        strokeOpacity: null,
        lineDash: null,
        lineDashOffset: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineWidth: 1,
        strokeNoScale: !1,
        text: null,
        font: null,
        textFont: null,
        fontStyle: null,
        fontWeight: null,
        fontSize: null,
        fontFamily: null,
        textTag: null,
        textFill: "#000",
        textStroke: null,
        textWidth: null,
        textHeight: null,
        textStrokeWidth: 0,
        textLineHeight: null,
        textPosition: "inside",
        textRect: null,
        textOffset: null,
        textAlign: null,
        textVerticalAlign: null,
        textDistance: 5,
        textShadowColor: "transparent",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        textBoxShadowColor: "transparent",
        textBoxShadowBlur: 0,
        textBoxShadowOffsetX: 0,
        textBoxShadowOffsetY: 0,
        transformText: !1,
        textRotation: 0,
        textOrigin: null,
        textBackgroundColor: null,
        textBorderColor: null,
        textBorderWidth: 0,
        textBorderRadius: 0,
        textPadding: null,
        rich: null,
        truncate: null,
        blend: null,
        bind: function (t, e, n) {
            var i = this, r = n && n.style, a = !r || t.__attrCachedBy !== yy.STYLE_BIND;
            t.__attrCachedBy = yy.STYLE_BIND;
            for (var o = 0; o < _y.length; o++) {
                var s = _y[o], l = s[0];
                (a || i[l] !== r[l]) && (t[l] = my(t, l, i[l] || s[1]))
            }
            if ((a || i.fill !== r.fill) && (t.fillStyle = i.fill), (a || i.stroke !== r.stroke) && (t.strokeStyle = i.stroke), (a || i.opacity !== r.opacity) && (t.globalAlpha = null == i.opacity ? 1 : i.opacity), (a || i.blend !== r.blend) && (t.globalCompositeOperation = i.blend || "source-over"), this.hasStroke()) {
                var u = i.lineWidth;
                t.lineWidth = u / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
            }
        },
        hasFill: function () {
            var t = this.fill;
            return null != t && "none" !== t
        },
        hasStroke: function () {
            var t = this.stroke;
            return null != t && "none" !== t && this.lineWidth > 0
        },
        extendFrom: function (t, e) {
            if (t) for (var n in t) !t.hasOwnProperty(n) || e !== !0 && (e === !1 ? this.hasOwnProperty(n) : null == t[n]) || (this[n] = t[n])
        },
        set: function (t, e) {
            "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
        },
        clone: function () {
            var t = new this.constructor;
            return t.extendFrom(this, !0), t
        },
        getGradient: function (t, e, n) {
            for (var i = "radial" === e.type ? kn : Dn, r = i(t, e, n), a = e.colorStops, o = 0; o < a.length; o++) r.addColorStop(a[o].offset, a[o].color);
            return r
        }
    };
    for (var by = wy.prototype, My = 0; My < _y.length; My++) {
        var Sy = _y[My];
        Sy[0] in by || (by[Sy[0]] = Sy[1])
    }
    wy.getGradient = by.getGradient;
    var Iy = function (t, e) {
        this.image = t, this.repeat = e, this.type = "pattern"
    };
    Iy.prototype.getCanvasPattern = function (t) {
        return t.createPattern(this.image, this.repeat || "repeat")
    };
    var Ty = function (t, e, n) {
        var i;
        n = n || ry, "string" == typeof t ? i = Ln(t, e, n) : M(t) && (i = t, t = i.id), this.id = t, this.dom = i;
        var r = i.style;
        r && (i.onselectstart = Pn, r["-webkit-user-select"] = "none", r["user-select"] = "none", r["-webkit-touch-callout"] = "none", r["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)", r.padding = 0, r.margin = 0, r["border-width"] = 0), this.domBack = null, this.ctxBack = null, this.painter = e, this.config = null, this.clearColor = 0, this.motionBlur = !1, this.lastFrameAlpha = .7, this.dpr = n
    };
    Ty.prototype = {
        constructor: Ty,
        __dirty: !0,
        __used: !1,
        __drawIndex: 0,
        __startIndex: 0,
        __endIndex: 0,
        incremental: !1,
        getElementCount: function () {
            return this.__endIndex - this.__startIndex
        },
        initContext: function () {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr
        },
        createBackBuffer: function () {
            var t = this.dpr;
            this.domBack = Ln("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 1 !== t && this.ctxBack.scale(t, t)
        },
        resize: function (t, e) {
            var n = this.dpr, i = this.dom, r = i.style, a = this.domBack;
            r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, a && (a.width = t * n, a.height = e * n, 1 !== n && this.ctxBack.scale(n, n))
        },
        clear: function (t, e) {
            var n = this.dom, i = this.ctx, r = n.width, a = n.height, e = e || this.clearColor,
                o = this.motionBlur && !t, s = this.lastFrameAlpha, l = this.dpr;
            if (o && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(n, 0, 0, r / l, a / l)), i.clearRect(0, 0, r, a), e && "transparent" !== e) {
                var u;
                e.colorStops ? (u = e.__canvasGradient || wy.getGradient(i, e, {
                    x: 0,
                    y: 0,
                    width: r,
                    height: a
                }), e.__canvasGradient = u) : e.image && (u = Iy.prototype.getCanvasPattern.call(e, i)), i.save(), i.fillStyle = u || e, i.fillRect(0, 0, r, a), i.restore()
            }
            if (o) {
                var h = this.domBack;
                i.save(), i.globalAlpha = s, i.drawImage(h, 0, 0, r, a), i.restore()
            }
        }
    };
    var Cy = "undefined" != typeof window && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (t) {
            setTimeout(t, 16)
        }, Ay = new Ym(50), Dy = {}, ky = 0, Py = 5e3, Ly = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, Oy = "12px sans-serif",
        zy = {};
    zy.measureText = function (t, e) {
        var n = l();
        return n.font = e || Oy, n.measureText(t)
    };
    var Ey = Oy, Ry = {left: 1, right: 1, center: 1}, By = {top: 1, bottom: 1, middle: 1},
        Ny = [["textShadowBlur", "shadowBlur", 0], ["textShadowOffsetX", "shadowOffsetX", 0], ["textShadowOffsetY", "shadowOffsetY", 0], ["textShadowColor", "shadowColor", "transparent"]],
        Vy = new xn, Fy = function () {
        };
    Fy.prototype = {
        constructor: Fy, drawRectText: function (t, e) {
            var n = this.style;
            e = n.textRect || e, this.__dirty && ei(n, !0);
            var i = n.text;
            if (null != i && (i += ""), yi(i, n)) {
                t.save();
                var r = this.transform;
                n.transformText ? this.setTransform(t) : r && (Vy.copy(e), Vy.applyTransform(r), e = Vy), ii(this, t, i, n, e, xy), t.restore()
            }
        }
    }, xi.prototype = {
        constructor: xi,
        type: "displayable",
        __dirty: !0,
        invisible: !1,
        z: 0,
        z2: 0,
        zlevel: 0,
        draggable: !1,
        dragging: !1,
        silent: !1,
        culling: !1,
        cursor: "pointer",
        rectHover: !1,
        progressive: !1,
        incremental: !1,
        globalScaleRatio: 1,
        beforeBrush: function () {
        },
        afterBrush: function () {
        },
        brush: function () {
        },
        getBoundingRect: function () {
        },
        contain: function (t, e) {
            return this.rectContain(t, e)
        },
        traverse: function (t, e) {
            t.call(e, this)
        },
        rectContain: function (t, e) {
            var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect();
            return i.contain(n[0], n[1])
        },
        dirty: function () {
            this.__dirty = this.__dirtyText = !0, this._rect = null, this.__zr && this.__zr.refresh()
        },
        animateStyle: function (t) {
            return this.animate("style", t)
        },
        attrKV: function (t, e) {
            "style" !== t ? ly.prototype.attrKV.call(this, t, e) : this.style.set(e)
        },
        setStyle: function (t, e) {
            return this.style.set(t, e), this.dirty(!1), this
        },
        useStyle: function (t) {
            return this.style = new wy(t, this), this.dirty(!1), this
        }
    }, h(xi, ly), c(xi, Fy), _i.prototype = {
        constructor: _i, type: "image", brush: function (t, e) {
            var n = this.style, i = n.image;
            n.bind(t, this, e);
            var r = this._image = zn(i, this._image, this, this.onload);
            if (r && Rn(r)) {
                var a = n.x || 0, o = n.y || 0, s = n.width, l = n.height, u = r.width / r.height;
                if (null == s && null != l ? s = l * u : null == l && null != s ? l = s / u : null == s && null == l && (s = r.width, l = r.height), this.setTransform(t), n.sWidth && n.sHeight) {
                    var h = n.sx || 0, c = n.sy || 0;
                    t.drawImage(r, h, c, n.sWidth, n.sHeight, a, o, s, l)
                } else if (n.sx && n.sy) {
                    var h = n.sx, c = n.sy, d = s - h, f = l - c;
                    t.drawImage(r, h, c, d, f, a, o, s, l)
                } else t.drawImage(r, a, o, s, l);
                null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
            }
        }, getBoundingRect: function () {
            var t = this.style;
            return this._rect || (this._rect = new xn(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
        }
    }, h(_i, xi);
    var Hy = 1e5, Gy = 314159, Wy = .01, Zy = .001, Xy = new xn(0, 0, 0, 0), Yy = new xn(0, 0, 0, 0),
        Uy = function (t, e, n) {
            this.type = "canvas";
            var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
            this._opts = n = o({}, n || {}), this.dpr = n.devicePixelRatio || ry, this._singleCanvas = i, this.root = t;
            var r = t.style;
            r && (r["-webkit-tap-highlight-color"] = "transparent", r["-webkit-user-select"] = r["user-select"] = r["-webkit-touch-callout"] = "none", t.innerHTML = ""), this.storage = e;
            var a = this._zlevelList = [], s = this._layers = {};
            if (this._layerConfig = {}, this._needsManuallyCompositing = !1, i) {
                var l = t.width, u = t.height;
                null != n.width && (l = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, t.width = l * this.dpr, t.height = u * this.dpr, this._width = l, this._height = u;
                var h = new Ty(t, this, this.dpr);
                h.__builtin__ = !0, h.initContext(), s[Gy] = h, h.zlevel = Gy, a.push(Gy), this._domRoot = t
            } else {
                this._width = this._getSize(0), this._height = this._getSize(1);
                var c = this._domRoot = Ti(this._width, this._height);
                t.appendChild(c)
            }
            this._hoverlayer = null, this._hoverElements = []
        };
    Uy.prototype = {
        constructor: Uy, getType: function () {
            return "canvas"
        }, isSingleCanvas: function () {
            return this._singleCanvas
        }, getViewportRoot: function () {
            return this._domRoot
        }, getViewportRootOffset: function () {
            var t = this.getViewportRoot();
            return t ? {offsetLeft: t.offsetLeft || 0, offsetTop: t.offsetTop || 0} : void 0
        }, refresh: function (t) {
            var e = this.storage.getDisplayList(!0), n = this._zlevelList;
            this._redrawId = Math.random(), this._paintList(e, t, this._redrawId);
            for (var i = 0; i < n.length; i++) {
                var r = n[i], a = this._layers[r];
                if (!a.__builtin__ && a.refresh) {
                    var o = 0 === i ? this._backgroundColor : null;
                    a.refresh(o)
                }
            }
            return this.refreshHover(), this
        }, addHover: function (t, e) {
            if (!t.__hoverMir) {
                var n = new t.constructor({style: t.style, shape: t.shape, z: t.z, z2: t.z2, silent: t.silent});
                return n.__from = t, t.__hoverMir = n, e && n.setStyle(e), this._hoverElements.push(n), n
            }
        }, removeHover: function (t) {
            var e = t.__hoverMir, n = this._hoverElements, i = u(n, e);
            i >= 0 && n.splice(i, 1), t.__hoverMir = null
        }, clearHover: function () {
            for (var t = this._hoverElements, e = 0; e < t.length; e++) {
                var n = t[e].__from;
                n && (n.__hoverMir = null)
            }
            t.length = 0
        }, refreshHover: function () {
            var t = this._hoverElements, e = t.length, n = this._hoverlayer;
            if (n && n.clear(), e) {
                Cn(t, this.storage.displayableSortFunc), n || (n = this._hoverlayer = this.getLayer(Hy));
                var i = {};
                n.ctx.save();
                for (var r = 0; e > r;) {
                    var a = t[r], o = a.__from;
                    o && o.__zr ? (r++, o.invisible || (a.transform = o.transform, a.invTransform = o.invTransform, a.__clipPaths = o.__clipPaths, this._doPaintEl(a, n, !0, i))) : (t.splice(r, 1), o.__hoverMir = null, e--)
                }
                n.ctx.restore()
            }
        }, getHoverLayer: function () {
            return this.getLayer(Hy)
        }, _paintList: function (t, e, n) {
            if (this._redrawId === n) {
                e = e || !1, this._updateLayerStatus(t);
                var i = this._doPaintList(t, e);
                if (this._needsManuallyCompositing && this._compositeManually(), !i) {
                    var r = this;
                    Cy(function () {
                        r._paintList(t, e, n)
                    })
                }
            }
        }, _compositeManually: function () {
            var t = this.getLayer(Gy).ctx, e = this._domRoot.width, n = this._domRoot.height;
            t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function (i) {
                i.virtual && t.drawImage(i.dom, 0, 0, e, n)
            })
        }, _doPaintList: function (t, e) {
            for (var n = [], i = 0; i < this._zlevelList.length; i++) {
                var r = this._zlevelList[i], a = this._layers[r];
                a.__builtin__ && a !== this._hoverlayer && (a.__dirty || e) && n.push(a)
            }
            for (var o = !0, s = 0; s < n.length; s++) {
                var a = n[s], l = a.ctx, u = {};
                l.save();
                var h = e ? a.__startIndex : a.__drawIndex, c = !e && a.incremental && Date.now, d = c && Date.now(),
                    p = a.zlevel === this._zlevelList[0] ? this._backgroundColor : null;
                if (a.__startIndex === a.__endIndex) a.clear(!1, p); else if (h === a.__startIndex) {
                    var g = t[h];
                    g.incremental && g.notClear && !e || a.clear(!1, p)
                }
                -1 === h && (console.error("For some unknown reason. drawIndex is -1"), h = a.__startIndex);
                for (var v = h; v < a.__endIndex; v++) {
                    var m = t[v];
                    if (this._doPaintEl(m, a, e, u), m.__dirty = m.__dirtyText = !1, c) {
                        var y = Date.now() - d;
                        if (y > 15) break
                    }
                }
                a.__drawIndex = v, a.__drawIndex < a.__endIndex && (o = !1), u.prevElClipPaths && l.restore(), l.restore()
            }
            return nm.wxa && f(this._layers, function (t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw()
            }), o
        }, _doPaintEl: function (t, e, n, i) {
            var r = e.ctx, a = t.transform;
            if (!(!e.__dirty && !n || t.invisible || 0 === t.style.opacity || a && !a[0] && !a[3] || t.culling && Mi(t, this._width, this._height))) {
                var o = t.__clipPaths;
                (!i.prevElClipPaths || Si(o, i.prevElClipPaths)) && (i.prevElClipPaths && (e.ctx.restore(), i.prevElClipPaths = null, i.prevEl = null), o && (r.save(), Ii(o, r), i.prevElClipPaths = o)), t.beforeBrush && t.beforeBrush(r), t.brush(r, i.prevEl || null), i.prevEl = t, t.afterBrush && t.afterBrush(r)
            }
        }, getLayer: function (t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = Gy);
            var n = this._layers[t];
            return n || (n = new Ty("zr_" + t, this, this.dpr), n.zlevel = t, n.__builtin__ = !0, this._layerConfig[t] && r(n, this._layerConfig[t], !0), e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n
        }, insertLayer: function (t, e) {
            var n = this._layers, i = this._zlevelList, r = i.length, a = null, o = -1, s = this._domRoot;
            if (n[t]) return void oy("ZLevel " + t + " has been used already");
            if (!bi(e)) return void oy("Layer of zlevel " + t + " is not valid");
            if (r > 0 && t > i[0]) {
                for (o = 0; r - 1 > o && !(i[o] < t && i[o + 1] > t); o++) ;
                a = n[i[o]]
            }
            if (i.splice(o + 1, 0, t), n[t] = e, !e.virtual) if (a) {
                var l = a.dom;
                l.nextSibling ? s.insertBefore(e.dom, l.nextSibling) : s.appendChild(e.dom)
            } else s.firstChild ? s.insertBefore(e.dom, s.firstChild) : s.appendChild(e.dom)
        }, eachLayer: function (t, e) {
            var n, i, r = this._zlevelList;
            for (i = 0; i < r.length; i++) n = r[i], t.call(e, this._layers[n], n)
        }, eachBuiltinLayer: function (t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ && t.call(e, n, i)
        }, eachOtherLayer: function (t, e) {
            var n, i, r, a = this._zlevelList;
            for (r = 0; r < a.length; r++) i = a[r], n = this._layers[i], n.__builtin__ || t.call(e, n, i)
        }, getLayers: function () {
            return this._layers
        }, _updateLayerStatus: function (t) {
            function e(t) {
                r && (r.__endIndex !== t && (r.__dirty = !0), r.__endIndex = t)
            }

            if (this.eachBuiltinLayer(function (t) {
                t.__dirty = t.__used = !1
            }), this._singleCanvas) for (var n = 1; n < t.length; n++) {
                var i = t[n];
                if (i.zlevel !== t[n - 1].zlevel || i.incremental) {
                    this._needsManuallyCompositing = !0;
                    break
                }
            }
            for (var r = null, a = 0, n = 0; n < t.length; n++) {
                var o, i = t[n], s = i.zlevel;
                i.incremental ? (o = this.getLayer(s + Zy, this._needsManuallyCompositing), o.incremental = !0, a = 1) : o = this.getLayer(s + (a > 0 ? Wy : 0), this._needsManuallyCompositing), o.__builtin__ || oy("ZLevel " + s + " has been used by unkown layer " + o.id), o !== r && (o.__used = !0, o.__startIndex !== n && (o.__dirty = !0), o.__startIndex = n, o.__drawIndex = o.incremental ? -1 : n, e(n), r = o), i.__dirty && (o.__dirty = !0, o.incremental && o.__drawIndex < 0 && (o.__drawIndex = n))
            }
            e(n), this.eachBuiltinLayer(function (t) {
                !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex)
            })
        }, clear: function () {
            return this.eachBuiltinLayer(this._clearLayer), this
        }, _clearLayer: function (t) {
            t.clear()
        }, setBackgroundColor: function (t) {
            this._backgroundColor = t
        }, configLayer: function (t, e) {
            if (e) {
                var n = this._layerConfig;
                n[t] ? r(n[t], e, !0) : n[t] = e;
                for (var i = 0; i < this._zlevelList.length; i++) {
                    var a = this._zlevelList[i];
                    if (a === t || a === t + Wy) {
                        var o = this._layers[a];
                        r(o, n[t], !0)
                    }
                }
            }
        }, delLayer: function (t) {
            var e = this._layers, n = this._zlevelList, i = e[t];
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(u(n, t), 1))
        }, resize: function (t, e) {
            if (this._domRoot.style) {
                var n = this._domRoot;
                n.style.display = "none";
                var i = this._opts;
                if (null != t && (i.width = t), null != e && (i.height = e), t = this._getSize(0), e = this._getSize(1), n.style.display = "", this._width !== t || e !== this._height) {
                    n.style.width = t + "px", n.style.height = e + "px";
                    for (var r in this._layers) this._layers.hasOwnProperty(r) && this._layers[r].resize(t, e);
                    f(this._progressiveLayers, function (n) {
                        n.resize(t, e)
                    }), this.refresh(!0)
                }
                this._width = t, this._height = e
            } else {
                if (null == t || null == e) return;
                this._width = t, this._height = e, this.getLayer(Gy).resize(t, e)
            }
            return this
        }, clearLayer: function (t) {
            var e = this._layers[t];
            e && e.clear()
        }, dispose: function () {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null
        }, getRenderedCanvas: function (t) {
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[Gy].dom;
            var e = new Ty("image", this, t.pixelRatio || this.dpr);
            if (e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor), t.pixelRatio <= this.dpr) {
                this.refresh();
                var n = e.dom.width, i = e.dom.height, r = e.ctx;
                this.eachLayer(function (t) {
                    t.__builtin__ ? r.drawImage(t.dom, 0, 0, n, i) : t.renderToCanvas && (e.ctx.save(), t.renderToCanvas(e.ctx), e.ctx.restore())
                })
            } else for (var a = {}, o = this.storage.getDisplayList(!0), s = 0; s < o.length; s++) {
                var l = o[s];
                this._doPaintEl(l, e, !0, a)
            }
            return e.dom
        }, getWidth: function () {
            return this._width
        }, getHeight: function () {
            return this._height
        }, _getSize: function (t) {
            var e = this._opts, n = ["width", "height"][t], i = ["clientWidth", "clientHeight"][t],
                r = ["paddingLeft", "paddingTop"][t], a = ["paddingRight", "paddingBottom"][t];
            if (null != e[n] && "auto" !== e[n]) return parseFloat(e[n]);
            var o = this.root, s = document.defaultView.getComputedStyle(o);
            return (o[i] || wi(s[n]) || wi(o.style[n])) - (wi(s[r]) || 0) - (wi(s[a]) || 0) | 0
        }, pathToImage: function (t, e) {
            e = e || this.dpr;
            var n = document.createElement("canvas"), i = n.getContext("2d"), r = t.getBoundingRect(), a = t.style,
                o = a.shadowBlur * e, s = a.shadowOffsetX * e, l = a.shadowOffsetY * e,
                u = a.hasStroke() ? a.lineWidth : 0, h = Math.max(u / 2, -s + o), c = Math.max(u / 2, s + o),
                d = Math.max(u / 2, -l + o), f = Math.max(u / 2, l + o), p = r.width + h + c, g = r.height + d + f;
            n.width = p * e, n.height = g * e, i.scale(e, e), i.clearRect(0, 0, p, g), i.dpr = e;
            var v = {position: t.position, rotation: t.rotation, scale: t.scale};
            t.position = [h - r.x, d - r.y], t.rotation = 0, t.scale = [1, 1], t.updateTransform(), t && t.brush(i);
            var m = _i, y = new m({style: {x: 0, y: 0, image: n}});
            return null != v.position && (y.position = t.position = v.position), null != v.rotation && (y.rotation = t.rotation = v.rotation), null != v.scale && (y.scale = t.scale = v.scale), y
        }
    };
    var jy = function (t) {
        t = t || {}, this.stage = t.stage || {}, this.onframe = t.onframe || function () {
        }, this._clips = [], this._running = !1, this._time, this._pausedTime, this._pauseStart, this._paused = !1, Sm.call(this)
    };
    jy.prototype = {
        constructor: jy, addClip: function (t) {
            this._clips.push(t)
        }, addAnimator: function (t) {
            t.animation = this;
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.addClip(e[n])
        }, removeClip: function (t) {
            var e = u(this._clips, t);
            e >= 0 && this._clips.splice(e, 1)
        }, removeAnimator: function (t) {
            for (var e = t.getClips(), n = 0; n < e.length; n++) this.removeClip(e[n]);
            t.animation = null
        }, _update: function () {
            for (var t = (new Date).getTime() - this._pausedTime, e = t - this._time, n = this._clips, i = n.length, r = [], a = [], o = 0; i > o; o++) {
                var s = n[o], l = s.step(t, e);
                l && (r.push(l), a.push(s))
            }
            for (var o = 0; i > o;) n[o]._needsRemove ? (n[o] = n[i - 1], n.pop(), i--) : o++;
            i = r.length;
            for (var o = 0; i > o; o++) a[o].fire(r[o]);
            this._time = t, this.onframe(e), this.trigger("frame", e), this.stage.update && this.stage.update()
        }, _startLoop: function () {
            function t() {
                e._running && (Cy(t), !e._paused && e._update())
            }

            var e = this;
            this._running = !0, Cy(t)
        }, start: function () {
            this._time = (new Date).getTime(), this._pausedTime = 0, this._startLoop()
        }, stop: function () {
            this._running = !1
        }, pause: function () {
            this._paused || (this._pauseStart = (new Date).getTime(), this._paused = !0)
        }, resume: function () {
            this._paused && (this._pausedTime += (new Date).getTime() - this._pauseStart, this._paused = !1)
        }, clear: function () {
            this._clips = []
        }, isFinished: function () {
            return !this._clips.length
        }, animate: function (t, e) {
            e = e || {};
            var n = new ey(t, e.loop, e.getter, e.setter);
            return this.addAnimator(n), n
        }
    }, c(jy, Sm);
    var qy = 300,
        Ky = ["click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu"],
        $y = ["touchstart", "touchend", "touchmove"],
        Qy = {pointerdown: 1, pointerup: 1, pointermove: 1, pointerout: 1}, Jy = p(Ky, function (t) {
            var e = t.replace("mouse", "pointer");
            return Qy[e] ? e : t
        }), tx = {
            mousemove: function (t) {
                t = ge(this.dom, t), this.trigger("mousemove", t)
            }, mouseout: function (t) {
                t = ge(this.dom, t);
                var e = t.toElement || t.relatedTarget;
                if (e !== this.dom) for (; e && 9 !== e.nodeType;) {
                    if (e === this.dom) return;
                    e = e.parentNode
                }
                this.trigger("mouseout", t)
            }, touchstart: function (t) {
                t = ge(this.dom, t), t.zrByTouch = !0, this._lastTouchMoment = new Date, this.handler.processGesture(this, t, "start"), tx.mousemove.call(this, t), tx.mousedown.call(this, t), Ai(this)
            }, touchmove: function (t) {
                t = ge(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "change"), tx.mousemove.call(this, t), Ai(this)
            }, touchend: function (t) {
                t = ge(this.dom, t), t.zrByTouch = !0, this.handler.processGesture(this, t, "end"), tx.mouseup.call(this, t), +new Date - this._lastTouchMoment < qy && tx.click.call(this, t), Ai(this)
            }, pointerdown: function (t) {
                tx.mousedown.call(this, t)
            }, pointermove: function (t) {
                Di(t) || tx.mousemove.call(this, t)
            }, pointerup: function (t) {
                tx.mouseup.call(this, t)
            }, pointerout: function (t) {
                Di(t) || tx.mouseout.call(this, t)
            }
        };
    f(["click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu"], function (t) {
        tx[t] = function (e) {
            e = ge(this.dom, e), this.trigger(t, e)
        }
    });
    var ex = Pi.prototype;
    ex.dispose = function () {
        for (var t = Ky.concat($y), e = 0; e < t.length; e++) {
            var n = t[e];
            me(this.dom, Ci(n), this._handlers[n])
        }
    }, ex.setCursor = function (t) {
        this.dom.style && (this.dom.style.cursor = t || "default")
    }, c(Pi, Sm);
    var nx = !nm.canvasSupported, ix = {canvas: Uy}, rx = {}, ax = "4.0.7", ox = function (t, e, n) {
        n = n || {}, this.dom = e, this.id = t;
        var i = this, r = new gy, a = n.renderer;
        if (nx) {
            if (!ix.vml) throw new Error("You need to require 'zrender/vml/vml' to support IE8");
            a = "vml"
        } else a && ix[a] || (a = "canvas");
        var o = new ix[a](e, r, n, t);
        this.storage = r, this.painter = o;
        var s = nm.node || nm.worker ? null : new Pi(o.getViewportRoot());
        this.handler = new Lm(r, o, s, o.root), this.animation = new jy({stage: {update: y(this.flush, this)}}), this.animation.start(), this._needsRefresh;
        var l = r.delFromStorage, u = r.addToStorage;
        r.delFromStorage = function (t) {
            l.call(r, t), t && t.removeSelfFromZr(i)
        }, r.addToStorage = function (t) {
            u.call(r, t), t.addSelfToZr(i)
        }
    };
    ox.prototype = {
        constructor: ox, getId: function () {
            return this.id
        }, add: function (t) {
            this.storage.addRoot(t), this._needsRefresh = !0
        }, remove: function (t) {
            this.storage.delRoot(t), this._needsRefresh = !0
        }, configLayer: function (t, e) {
            this.painter.configLayer && this.painter.configLayer(t, e), this._needsRefresh = !0
        }, setBackgroundColor: function (t) {
            this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this._needsRefresh = !0
        }, refreshImmediately: function () {
            this._needsRefresh = !1, this.painter.refresh(), this._needsRefresh = !1
        }, refresh: function () {
            this._needsRefresh = !0
        }, flush: function () {
            var t;
            this._needsRefresh && (t = !0, this.refreshImmediately()), this._needsRefreshHover && (t = !0, this.refreshHoverImmediately()), t && this.trigger("rendered")
        }, addHover: function (t, e) {
            if (this.painter.addHover) {
                var n = this.painter.addHover(t, e);
                return this.refreshHover(), n
            }
        }, removeHover: function (t) {
            this.painter.removeHover && (this.painter.removeHover(t), this.refreshHover())
        }, clearHover: function () {
            this.painter.clearHover && (this.painter.clearHover(), this.refreshHover())
        }, refreshHover: function () {
            this._needsRefreshHover = !0
        }, refreshHoverImmediately: function () {
            this._needsRefreshHover = !1, this.painter.refreshHover && this.painter.refreshHover()
        }, resize: function (t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize()
        }, clearAnimation: function () {
            this.animation.clear()
        }, getWidth: function () {
            return this.painter.getWidth()
        }, getHeight: function () {
            return this.painter.getHeight()
        }, pathToImage: function (t, e) {
            return this.painter.pathToImage(t, e)
        }, setCursorStyle: function (t) {
            this.handler.setCursorStyle(t)
        }, findHover: function (t, e) {
            return this.handler.findHover(t, e)
        }, on: function (t, e, n) {
            this.handler.on(t, e, n)
        }, off: function (t, e) {
            this.handler.off(t, e)
        }, trigger: function (t, e) {
            this.handler.trigger(t, e)
        }, clear: function () {
            this.storage.delRoot(), this.painter.clear()
        }, dispose: function () {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, Ri(this.id)
        }
    };
    var sx = (Object.freeze || Object)({version: ax, init: Li, dispose: Oi, getInstance: zi, registerPainter: Ei}),
        lx = f, ux = M, hx = _, cx = "series\x00",
        dx = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],
        fx = 0, px = ".", gx = "___EC__COMPONENT__CONTAINER___", vx = 0, mx = function (t) {
            for (var e = 0; e < t.length; e++) t[e][1] || (t[e][1] = t[e][0]);
            return function (e, n, i) {
                for (var r = {}, a = 0; a < t.length; a++) {
                    var o = t[a][1];
                    if (!(n && u(n, o) >= 0 || i && u(i, o) < 0)) {
                        var s = e.getShallow(o);
                        null != s && (r[t[a][0]] = s)
                    }
                }
                return r
            }
        },
        yx = mx([["lineWidth", "width"], ["stroke", "color"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),
        xx = {
            getLineStyle: function (t) {
                var e = yx(this, t), n = this.getLineDash(e.lineWidth);
                return n && (e.lineDash = n), e
            }, getLineDash: function (t) {
                null == t && (t = 1);
                var e = this.get("type"), n = Math.max(t, 2), i = 4 * t;
                return "solid" === e || null == e ? null : "dashed" === e ? [i, i] : [n, n]
            }
        },
        _x = mx([["fill", "color"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["opacity"], ["shadowColor"]]),
        bx = {
            getAreaStyle: function (t, e) {
                return _x(this, t, e)
            }
        }, Mx = Math.pow, Sx = Math.sqrt, Ix = 1e-8, Tx = 1e-4, Cx = Sx(3), Ax = 1 / 3, Dx = H(), kx = H(), Px = H(),
        Lx = Math.min, Ox = Math.max, zx = Math.sin, Ex = Math.cos, Rx = 2 * Math.PI, Bx = H(), Nx = H(), Vx = H(),
        Fx = [], Hx = [], Gx = {M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7}, Wx = [], Zx = [], Xx = [], Yx = [],
        Ux = Math.min, jx = Math.max, qx = Math.cos, Kx = Math.sin, $x = Math.sqrt, Qx = Math.abs,
        Jx = "undefined" != typeof Float32Array, t_ = function (t) {
            this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
        };
    t_.prototype = {
        constructor: t_,
        _xi: 0,
        _yi: 0,
        _x0: 0,
        _y0: 0,
        _ux: 0,
        _uy: 0,
        _len: 0,
        _lineDash: null,
        _dashOffset: 0,
        _dashIdx: 0,
        _dashSum: 0,
        setScale: function (t, e) {
            this._ux = Qx(1 / ry / t) || 0, this._uy = Qx(1 / ry / e) || 0
        },
        getContext: function () {
            return this._ctx
        },
        beginPath: function (t) {
            return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
        },
        moveTo: function (t, e) {
            return this.addData(Gx.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
        },
        lineTo: function (t, e) {
            var n = Qx(t - this._xi) > this._ux || Qx(e - this._yi) > this._uy || this._len < 5;
            return this.addData(Gx.L, t, e), this._ctx && n && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), n && (this._xi = t, this._yi = e), this
        },
        bezierCurveTo: function (t, e, n, i, r, a) {
            return this.addData(Gx.C, t, e, n, i, r, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, n, i, r, a) : this._ctx.bezierCurveTo(t, e, n, i, r, a)), this._xi = r, this._yi = a, this
        },
        quadraticCurveTo: function (t, e, n, i) {
            return this.addData(Gx.Q, t, e, n, i), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, n, i) : this._ctx.quadraticCurveTo(t, e, n, i)), this._xi = n, this._yi = i, this
        },
        arc: function (t, e, n, i, r, a) {
            return this.addData(Gx.A, t, e, n, n, i, r - i, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, a), this._xi = qx(r) * n + t, this._yi = Kx(r) * n + e, this
        },
        arcTo: function (t, e, n, i, r) {
            return this._ctx && this._ctx.arcTo(t, e, n, i, r), this
        },
        rect: function (t, e, n, i) {
            return this._ctx && this._ctx.rect(t, e, n, i), this.addData(Gx.R, t, e, n, i), this
        },
        closePath: function () {
            this.addData(Gx.Z);
            var t = this._ctx, e = this._x0, n = this._y0;
            return t && (this._needsDash() && this._dashedLineTo(e, n), t.closePath()), this._xi = e, this._yi = n, this
        },
        fill: function (t) {
            t && t.fill(), this.toStatic()
        },
        stroke: function (t) {
            t && t.stroke(), this.toStatic()
        },
        setLineDash: function (t) {
            if (t instanceof Array) {
                this._lineDash = t, this._dashIdx = 0;
                for (var e = 0, n = 0; n < t.length; n++) e += t[n];
                this._dashSum = e
            }
            return this
        },
        setLineDashOffset: function (t) {
            return this._dashOffset = t, this
        },
        len: function () {
            return this._len
        },
        setData: function (t) {
            var e = t.length;
            this.data && this.data.length === e || !Jx || (this.data = new Float32Array(e));
            for (var n = 0; e > n; n++) this.data[n] = t[n];
            this._len = e
        },
        appendPath: function (t) {
            t instanceof Array || (t = [t]);
            for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
            Jx && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
            for (var r = 0; e > r; r++) for (var a = t[r].data, o = 0; o < a.length; o++) this.data[i++] = a[o];
            this._len = i
        },
        addData: function (t) {
            if (this._saveData) {
                var e = this.data;
                this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                for (var n = 0; n < arguments.length; n++) e[this._len++] = arguments[n];
                this._prevCmd = t
            }
        },
        _expandData: function () {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t
            }
        },
        _needsDash: function () {
            return this._lineDash
        },
        _dashedLineTo: function (t, e) {
            var n, i, r = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi,
                u = this._yi, h = t - l, c = e - u, d = $x(h * h + c * c), f = l, p = u, g = o.length;
            for (h /= d, c /= d, 0 > a && (a = r + a), a %= r, f -= a * h, p -= a * c; h > 0 && t >= f || 0 > h && f >= t || 0 === h && (c > 0 && e >= p || 0 > c && p >= e);) i = this._dashIdx, n = o[i], f += h * n, p += c * n, this._dashIdx = (i + 1) % g, h > 0 && l > f || 0 > h && f > l || c > 0 && u > p || 0 > c && p > u || s[i % 2 ? "moveTo" : "lineTo"](h >= 0 ? Ux(f, t) : jx(f, t), c >= 0 ? Ux(p, e) : jx(p, e));
            h = f - t, c = p - e, this._dashOffset = -$x(h * h + c * c)
        },
        _dashedBezierTo: function (t, e, n, i, r, a) {
            var o, s, l, u, h, c = this._dashSum, d = this._dashOffset, f = this._lineDash, p = this._ctx, g = this._xi,
                v = this._yi, m = lr, y = 0, x = this._dashIdx, _ = f.length, w = 0;
            for (0 > d && (d = c + d), d %= c, o = 0; 1 > o; o += .1) s = m(g, t, n, r, o + .1) - m(g, t, n, r, o), l = m(v, e, i, a, o + .1) - m(v, e, i, a, o), y += $x(s * s + l * l);
            for (; _ > x && (w += f[x], !(w > d)); x++) ;
            for (o = (w - d) / y; 1 >= o;) u = m(g, t, n, r, o), h = m(v, e, i, a, o), x % 2 ? p.moveTo(u, h) : p.lineTo(u, h), o += f[x] / y, x = (x + 1) % _;
            x % 2 !== 0 && p.lineTo(r, a), s = r - u, l = a - h, this._dashOffset = -$x(s * s + l * l)
        },
        _dashedQuadraticTo: function (t, e, n, i) {
            var r = n, a = i;
            n = (n + 2 * t) / 3, i = (i + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, n, i, r, a)
        },
        toStatic: function () {
            var t = this.data;
            t instanceof Array && (t.length = this._len, Jx && (this.data = new Float32Array(t)))
        },
        getBoundingRect: function () {
            Wx[0] = Wx[1] = Xx[0] = Xx[1] = Number.MAX_VALUE, Zx[0] = Zx[1] = Yx[0] = Yx[1] = -Number.MAX_VALUE;
            for (var t = this.data, e = 0, n = 0, i = 0, r = 0, a = 0; a < t.length;) {
                var o = t[a++];
                switch (1 === a && (e = t[a], n = t[a + 1], i = e, r = n), o) {
                    case Gx.M:
                        i = t[a++], r = t[a++], e = i, n = r, Xx[0] = i, Xx[1] = r, Yx[0] = i, Yx[1] = r;
                        break;
                    case Gx.L:
                        wr(e, n, t[a], t[a + 1], Xx, Yx), e = t[a++], n = t[a++];
                        break;
                    case Gx.C:
                        br(e, n, t[a++], t[a++], t[a++], t[a++], t[a], t[a + 1], Xx, Yx), e = t[a++], n = t[a++];
                        break;
                    case Gx.Q:
                        Mr(e, n, t[a++], t[a++], t[a], t[a + 1], Xx, Yx), e = t[a++], n = t[a++];
                        break;
                    case Gx.A:
                        var s = t[a++], l = t[a++], u = t[a++], h = t[a++], c = t[a++], d = t[a++] + c;
                        a += 1;
                        var f = 1 - t[a++];
                        1 === a && (i = qx(c) * u + s, r = Kx(c) * h + l), Sr(s, l, u, h, c, d, f, Xx, Yx), e = qx(d) * u + s, n = Kx(d) * h + l;
                        break;
                    case Gx.R:
                        i = e = t[a++], r = n = t[a++];
                        var p = t[a++], g = t[a++];
                        wr(i, r, i + p, r + g, Xx, Yx);
                        break;
                    case Gx.Z:
                        e = i, n = r
                }
                oe(Wx, Wx, Xx), se(Zx, Zx, Yx)
            }
            return 0 === a && (Wx[0] = Wx[1] = Zx[0] = Zx[1] = 0), new xn(Wx[0], Wx[1], Zx[0] - Wx[0], Zx[1] - Wx[1])
        },
        rebuildPath: function (t) {
            for (var e, n, i, r, a, o, s = this.data, l = this._ux, u = this._uy, h = this._len, c = 0; h > c;) {
                var d = s[c++];
                switch (1 === c && (i = s[c], r = s[c + 1], e = i, n = r), d) {
                    case Gx.M:
                        e = i = s[c++], n = r = s[c++], t.moveTo(i, r);
                        break;
                    case Gx.L:
                        a = s[c++], o = s[c++], (Qx(a - i) > l || Qx(o - r) > u || c === h - 1) && (t.lineTo(a, o), i = a, r = o);
                        break;
                    case Gx.C:
                        t.bezierCurveTo(s[c++], s[c++], s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                        break;
                    case Gx.Q:
                        t.quadraticCurveTo(s[c++], s[c++], s[c++], s[c++]), i = s[c - 2], r = s[c - 1];
                        break;
                    case Gx.A:
                        var f = s[c++], p = s[c++], g = s[c++], v = s[c++], m = s[c++], y = s[c++], x = s[c++],
                            _ = s[c++], w = g > v ? g : v, b = g > v ? 1 : g / v, M = g > v ? v / g : 1,
                            S = Math.abs(g - v) > .001, I = m + y;
                        S ? (t.translate(f, p), t.rotate(x), t.scale(b, M), t.arc(0, 0, w, m, I, 1 - _), t.scale(1 / b, 1 / M), t.rotate(-x), t.translate(-f, -p)) : t.arc(f, p, w, m, I, 1 - _), 1 === c && (e = qx(m) * g + f, n = Kx(m) * v + p), i = qx(I) * g + f, r = Kx(I) * v + p;
                        break;
                    case Gx.R:
                        e = i = s[c], n = r = s[c + 1], t.rect(s[c++], s[c++], s[c++], s[c++]);
                        break;
                    case Gx.Z:
                        t.closePath(), i = e, r = n
                }
            }
        }
    }, t_.CMD = Gx;
    var e_ = 2 * Math.PI, n_ = 2 * Math.PI, i_ = t_.CMD, r_ = 2 * Math.PI, a_ = 1e-4, o_ = [-1, -1, -1], s_ = [-1, -1],
        l_ = Iy.prototype.getCanvasPattern, u_ = Math.abs, h_ = new t_(!0);
    Vr.prototype = {
        constructor: Vr,
        type: "path",
        __dirtyPath: !0,
        strokeContainThreshold: 5,
        subPixelOptimize: !1,
        brush: function (t, e) {
            var n = this.style, i = this.path || h_, r = n.hasStroke(), a = n.hasFill(), o = n.fill, s = n.stroke,
                l = a && !!o.colorStops, u = r && !!s.colorStops, h = a && !!o.image, c = r && !!s.image;
            if (n.bind(t, this, e), this.setTransform(t), this.__dirty) {
                var d;
                l && (d = d || this.getBoundingRect(), this._fillGradient = n.getGradient(t, o, d)), u && (d = d || this.getBoundingRect(), this._strokeGradient = n.getGradient(t, s, d))
            }
            l ? t.fillStyle = this._fillGradient : h && (t.fillStyle = l_.call(o, t)), u ? t.strokeStyle = this._strokeGradient : c && (t.strokeStyle = l_.call(s, t));
            var f = n.lineDash, p = n.lineDashOffset, g = !!t.setLineDash, v = this.getGlobalScale();
            if (i.setScale(v[0], v[1]), this.__dirtyPath || f && !g && r ? (i.beginPath(t), f && !g && (i.setLineDash(f), i.setLineDashOffset(p)), this.buildPath(i, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a) if (null != n.fillOpacity) {
                var m = t.globalAlpha;
                t.globalAlpha = n.fillOpacity * n.opacity, i.fill(t), t.globalAlpha = m
            } else i.fill(t);
            if (f && g && (t.setLineDash(f), t.lineDashOffset = p), r) if (null != n.strokeOpacity) {
                var m = t.globalAlpha;
                t.globalAlpha = n.strokeOpacity * n.opacity, i.stroke(t), t.globalAlpha = m
            } else i.stroke(t);
            f && g && t.setLineDash([]), null != n.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
        },
        buildPath: function () {
        },
        createPathProxy: function () {
            this.path = new t_
        },
        getBoundingRect: function () {
            var t = this._rect, e = this.style, n = !t;
            if (n) {
                var i = this.path;
                i || (i = this.path = new t_), this.__dirtyPath && (i.beginPath(), this.buildPath(i, this.shape, !1)), t = i.getBoundingRect()
            }
            if (this._rect = t, e.hasStroke()) {
                var r = this._rectWithStroke || (this._rectWithStroke = t.clone());
                if (this.__dirty || n) {
                    r.copy(t);
                    var a = e.lineWidth, o = e.strokeNoScale ? this.getLineScale() : 1;
                    e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), o > 1e-10 && (r.width += a / o, r.height += a / o, r.x -= a / o / 2, r.y -= a / o / 2)
                }
                return r
            }
            return t
        },
        contain: function (t, e) {
            var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), r = this.style;
            if (t = n[0], e = n[1], i.contain(t, e)) {
                var a = this.path.data;
                if (r.hasStroke()) {
                    var o = r.lineWidth, s = r.strokeNoScale ? this.getLineScale() : 1;
                    if (s > 1e-10 && (r.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), Nr(a, o / s, t, e))) return !0
                }
                if (r.hasFill()) return Br(a, t, e)
            }
            return !1
        },
        dirty: function (t) {
            null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = this.__dirtyText = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
        },
        animateShape: function (t) {
            return this.animate("shape", t)
        },
        attrKV: function (t, e) {
            "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : xi.prototype.attrKV.call(this, t, e)
        },
        setShape: function (t, e) {
            var n = this.shape;
            if (n) {
                if (M(t)) for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]); else n[t] = e;
                this.dirty(!0)
            }
            return this
        },
        getLineScale: function () {
            var t = this.transform;
            return t && u_(t[0] - 1) > 1e-10 && u_(t[3] - 1) > 1e-10 ? Math.sqrt(u_(t[0] * t[3] - t[2] * t[1])) : 1
        }
    }, Vr.extend = function (t) {
        var e = function (e) {
            Vr.call(this, e), t.style && this.style.extendFrom(t.style, !1);
            var n = t.shape;
            if (n) {
                this.shape = this.shape || {};
                var i = this.shape;
                for (var r in n) !i.hasOwnProperty(r) && n.hasOwnProperty(r) && (i[r] = n[r])
            }
            t.init && t.init.call(this, e)
        };
        h(e, Vr);
        for (var n in t) "style" !== n && "shape" !== n && (e.prototype[n] = t[n]);
        return e
    }, h(Vr, xi);
    var c_ = t_.CMD, d_ = [[], [], []], f_ = Math.sqrt, p_ = Math.atan2, g_ = function (t, e) {
        var n, i, r, a, o, s, l = t.data, u = c_.M, h = c_.C, c = c_.L, d = c_.R, f = c_.A, p = c_.Q;
        for (r = 0, a = 0; r < l.length;) {
            switch (n = l[r++], a = r, i = 0, n) {
                case u:
                    i = 1;
                    break;
                case c:
                    i = 1;
                    break;
                case h:
                    i = 3;
                    break;
                case p:
                    i = 2;
                    break;
                case f:
                    var g = e[4], v = e[5], m = f_(e[0] * e[0] + e[1] * e[1]), y = f_(e[2] * e[2] + e[3] * e[3]),
                        x = p_(-e[1] / y, e[0] / m);
                    l[r] *= m, l[r++] += g, l[r] *= y, l[r++] += v, l[r++] *= m, l[r++] *= y, l[r++] += x, l[r++] += x, r += 2, a = r;
                    break;
                case d:
                    s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1], s[0] += l[r++], s[1] += l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1]
            }
            for (o = 0; i > o; o++) {
                var s = d_[o];
                s[0] = l[r++], s[1] = l[r++], ae(s, s, e), l[a++] = s[0], l[a++] = s[1]
            }
        }
    }, v_ = Math.sqrt, m_ = Math.sin, y_ = Math.cos, x_ = Math.PI, __ = function (t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1])
    }, w_ = function (t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (__(t) * __(e))
    }, b_ = function (t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(w_(t, e))
    }, M_ = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, S_ = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g, I_ = function (t) {
        xi.call(this, t)
    };
    I_.prototype = {
        constructor: I_, type: "text", brush: function (t, e) {
            var n = this.style;
            this.__dirty && ei(n, !0), n.fill = n.stroke = n.shadowBlur = n.shadowColor = n.shadowOffsetX = n.shadowOffsetY = null;
            var i = n.text;
            return null != i && (i += ""), yi(i, n) ? (this.setTransform(t), ii(this, t, i, n, null, e), void this.restoreTransform(t)) : void (t.__attrCachedBy = yy.NONE)
        }, getBoundingRect: function () {
            var t = this.style;
            if (this.__dirty && ei(t, !0), !this._rect) {
                var e = t.text;
                null != e ? e += "" : e = "";
                var n = Nn(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.textLineHeight, t.rich);
                if (n.x += t.x || 0, n.y += t.y || 0, pi(t.textStroke, t.textStrokeWidth)) {
                    var i = t.textStrokeWidth;
                    n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i
                }
                this._rect = n
            }
            return this._rect
        }
    }, h(I_, xi);
    var T_ = Vr.extend({
            type: "circle", shape: {cx: 0, cy: 0, r: 0}, buildPath: function (t, e, n) {
                n && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
            }
        }), C_ = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]],
        A_ = function (t) {
            return nm.browser.ie && nm.browser.version >= 11 ? function () {
                var e, n = this.__clipPaths, i = this.style;
                if (n) for (var r = 0; r < n.length; r++) {
                    var a = n[r], o = a && a.shape, s = a && a.type;
                    if (o && ("sector" === s && o.startAngle === o.endAngle || "rect" === s && (!o.width || !o.height))) {
                        for (var l = 0; l < C_.length; l++) C_[l][2] = i[C_[l][0]], i[C_[l][0]] = C_[l][1];
                        e = !0;
                        break
                    }
                }
                if (t.apply(this, arguments), e) for (var l = 0; l < C_.length; l++) i[C_[l][0]] = C_[l][2]
            } : t
        }, D_ = Vr.extend({
            type: "sector",
            shape: {cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            brush: A_(Vr.prototype.brush),
            buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle, s = e.endAngle,
                    l = e.clockwise, u = Math.cos(o), h = Math.sin(o);
                t.moveTo(u * r + n, h * r + i), t.lineTo(u * a + n, h * a + i), t.arc(n, i, a, o, s, !l), t.lineTo(Math.cos(s) * r + n, Math.sin(s) * r + i), 0 !== r && t.arc(n, i, r, s, o, l), t.closePath()
            }
        }), k_ = Vr.extend({
            type: "ring", shape: {cx: 0, cy: 0, r: 0, r0: 0}, buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = 2 * Math.PI;
                t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0)
            }
        }), P_ = function (t, e) {
            for (var n = t.length, i = [], r = 0, a = 1; n > a; a++) r += ee(t[a - 1], t[a]);
            var o = r / 2;
            o = n > o ? n : o;
            for (var a = 0; o > a; a++) {
                var s, l, u, h = a / (o - 1) * (e ? n : n - 1), c = Math.floor(h), d = h - c, f = t[c % n];
                e ? (s = t[(c - 1 + n) % n], l = t[(c + 1) % n], u = t[(c + 2) % n]) : (s = t[0 === c ? c : c - 1], l = t[c > n - 2 ? n - 1 : c + 1], u = t[c > n - 3 ? n - 1 : c + 2]);
                var p = d * d, g = d * p;
                i.push([Yr(s[0], f[0], l[0], u[0], d, p, g), Yr(s[1], f[1], l[1], u[1], d, p, g)])
            }
            return i
        }, L_ = function (t, e, n, i) {
            var r, a, o, s, l = [], u = [], h = [], c = [];
            if (i) {
                o = [1 / 0, 1 / 0], s = [-1 / 0, -1 / 0];
                for (var d = 0, f = t.length; f > d; d++) oe(o, o, t[d]), se(s, s, t[d]);
                oe(o, o, i[0]), se(s, s, i[1])
            }
            for (var d = 0, f = t.length; f > d; d++) {
                var p = t[d];
                if (n) r = t[d ? d - 1 : f - 1], a = t[(d + 1) % f]; else {
                    if (0 === d || d === f - 1) {
                        l.push(W(t[d]));
                        continue
                    }
                    r = t[d - 1], a = t[d + 1]
                }
                U(u, a, r), J(u, u, e);
                var g = ee(p, r), v = ee(p, a), m = g + v;
                0 !== m && (g /= m, v /= m), J(h, u, -g), J(c, u, v);
                var y = X([], p, h), x = X([], p, c);
                i && (se(y, y, o), oe(y, y, s), se(x, x, o), oe(x, x, s)), l.push(y), l.push(x)
            }
            return n && l.push(l.shift()), l
        }, O_ = Vr.extend({
            type: "polygon",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            buildPath: function (t, e) {
                Ur(t, e, !0)
            }
        }), z_ = Vr.extend({
            type: "polyline",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                Ur(t, e, !1)
            }
        }), E_ = Math.round, R_ = {}, B_ = Vr.extend({
            type: "rect", shape: {r: 0, x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n, i, r, a;
                this.subPixelOptimize ? (qr(R_, e, this.style), n = R_.x, i = R_.y, r = R_.width, a = R_.height, R_.r = e.r, e = R_) : (n = e.x, i = e.y, r = e.width, a = e.height), e.r ? ti(t, e) : t.rect(n, i, r, a), t.closePath()
            }
        }), N_ = {}, V_ = Vr.extend({
            type: "line",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n, i, r, a;
                this.subPixelOptimize ? (jr(N_, e, this.style), n = N_.x1, i = N_.y1, r = N_.x2, a = N_.y2) : (n = e.x1, i = e.y1, r = e.x2, a = e.y2);
                var o = e.percent;
                0 !== o && (t.moveTo(n, i), 1 > o && (r = n * (1 - o) + r * o, a = i * (1 - o) + a * o), t.lineTo(r, a))
            },
            pointAt: function (t) {
                var e = this.shape;
                return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
            }
        }), F_ = [], H_ = Vr.extend({
            type: "bezier-curve",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n = e.x1, i = e.y1, r = e.x2, a = e.y2, o = e.cpx1, s = e.cpy1, l = e.cpx2, u = e.cpy2, h = e.percent;
                0 !== h && (t.moveTo(n, i), null == l || null == u ? (1 > h && (yr(n, o, r, h, F_), o = F_[1], r = F_[2], yr(i, s, a, h, F_), s = F_[1], a = F_[2]), t.quadraticCurveTo(o, s, r, a)) : (1 > h && (dr(n, o, l, r, h, F_), o = F_[1], l = F_[2], r = F_[3], dr(i, s, u, a, h, F_), s = F_[1], u = F_[2], a = F_[3]), t.bezierCurveTo(o, s, l, u, r, a)))
            },
            pointAt: function (t) {
                return $r(this.shape, t, !1)
            },
            tangentAt: function (t) {
                var e = $r(this.shape, t, !0);
                return te(e, e)
            }
        }), G_ = Vr.extend({
            type: "arc",
            shape: {cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise,
                    l = Math.cos(a), u = Math.sin(a);
                t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, a, o, !s)
            }
        }), W_ = Vr.extend({
            type: "compound", shape: {paths: null}, _updatePathDirty: function () {
                for (var t = this.__dirtyPath, e = this.shape.paths, n = 0; n < e.length; n++) t = t || e[n].__dirtyPath;
                this.__dirtyPath = t, this.__dirty = this.__dirty || t
            }, beforeBrush: function () {
                this._updatePathDirty();
                for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), t[n].path.setScale(e[0], e[1])
            }, buildPath: function (t, e) {
                for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0)
            }, afterBrush: function () {
                for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
            }, getBoundingRect: function () {
                return this._updatePathDirty(), Vr.prototype.getBoundingRect.call(this)
            }
        }), Z_ = function (t) {
            this.colorStops = t || []
        };
    Z_.prototype = {
        constructor: Z_, addColorStop: function (t, e) {
            this.colorStops.push({offset: t, color: e})
        }
    };
    var X_ = function (t, e, n, i, r, a) {
        this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == n ? 1 : n, this.y2 = null == i ? 0 : i, this.type = "linear", this.global = a || !1, Z_.call(this, r)
    };
    X_.prototype = {constructor: X_}, h(X_, Z_);
    var Y_ = function (t, e, n, i, r) {
        this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == n ? .5 : n, this.type = "radial", this.global = r || !1, Z_.call(this, i)
    };
    Y_.prototype = {constructor: Y_}, h(Y_, Z_), Qr.prototype.incremental = !0, Qr.prototype.clearDisplaybles = function () {
        this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
    }, Qr.prototype.addDisplayable = function (t, e) {
        e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
    }, Qr.prototype.addDisplayables = function (t, e) {
        e = e || !1;
        for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e)
    }, Qr.prototype.eachPendingDisplayable = function (t) {
        for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
        for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
    }, Qr.prototype.update = function () {
        this.updateTransform();
        for (var t = this._cursor; t < this._displayables.length; t++) {
            var e = this._displayables[t];
            e.parent = this, e.update(), e.parent = null
        }
        for (var t = 0; t < this._temporaryDisplayables.length; t++) {
            var e = this._temporaryDisplayables[t];
            e.parent = this, e.update(), e.parent = null
        }
    }, Qr.prototype.brush = function (t) {
        for (var e = this._cursor; e < this._displayables.length; e++) {
            var n = this._displayables[e];
            n.beforeBrush && n.beforeBrush(t), n.brush(t, e === this._cursor ? null : this._displayables[e - 1]), n.afterBrush && n.afterBrush(t)
        }
        this._cursor = e;
        for (var e = 0; e < this._temporaryDisplayables.length; e++) {
            var n = this._temporaryDisplayables[e];
            n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === e ? null : this._temporaryDisplayables[e - 1]), n.afterBrush && n.afterBrush(t)
        }
        this._temporaryDisplayables = [], this.notClear = !0
    };
    var U_ = [];
    Qr.prototype.getBoundingRect = function () {
        if (!this._rect) {
            for (var t = new xn(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                var n = this._displayables[e], i = n.getBoundingRect().clone();
                n.needLocalTransform() && i.applyTransform(n.getLocalTransform(U_)), t.union(i)
            }
            this._rect = t
        }
        return this._rect
    }, Qr.prototype.contain = function (t, e) {
        var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect();
        if (i.contain(n[0], n[1])) for (var r = 0; r < this._displayables.length; r++) {
            var a = this._displayables[r];
            if (a.contain(t, e)) return !0
        }
        return !1
    }, h(Qr, xi);
    var j_ = Math.round, q_ = Math.max, K_ = Math.min, $_ = {}, Q_ = 1, J_ = Xr, tw = N(), ew = 0,
        nw = (Object.freeze || Object)({
            Z2_EMPHASIS_LIFT: Q_,
            extendShape: Jr,
            extendPath: ta,
            makePath: ea,
            makeImage: na,
            mergePath: J_,
            resizePath: ra,
            subPixelOptimizeLine: aa,
            subPixelOptimizeRect: oa,
            subPixelOptimize: sa,
            setElementHoverStyle: ga,
            isInEmphasis: va,
            setHoverStyle: wa,
            setAsHoverStyleTrigger: ba,
            setLabelStyle: Ma,
            setTextStyle: Sa,
            setText: Ia,
            getFont: La,
            updateProps: za,
            initProps: Ea,
            getTransform: Ra,
            applyTransform: Ba,
            transformDirection: Na,
            groupTransition: Va,
            clipPointsByRect: Fa,
            clipRectByRect: Ha,
            createIcon: Ga,
            Group: dy,
            Image: _i,
            Text: I_,
            Circle: T_,
            Sector: D_,
            Ring: k_,
            Polygon: O_,
            Polyline: z_,
            Rect: B_,
            Line: V_,
            BezierCurve: H_,
            Arc: G_,
            IncrementalDisplayable: Qr,
            CompoundPath: W_,
            LinearGradient: X_,
            RadialGradient: Y_,
            BoundingRect: xn
        }), iw = ["textStyle", "color"], rw = {
            getTextColor: function (t) {
                var e = this.ecModel;
                return this.getShallow("color") || (!t && e ? e.get(iw) : null)
            }, getFont: function () {
                return La({
                    fontStyle: this.getShallow("fontStyle"),
                    fontWeight: this.getShallow("fontWeight"),
                    fontSize: this.getShallow("fontSize"),
                    fontFamily: this.getShallow("fontFamily")
                }, this.ecModel)
            }, getTextRect: function (t) {
                return Nn(t, this.getFont(), this.getShallow("align"), this.getShallow("verticalAlign") || this.getShallow("baseline"), this.getShallow("padding"), this.getShallow("lineHeight"), this.getShallow("rich"), this.getShallow("truncateText"))
            }
        },
        aw = mx([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"], ["textPosition"], ["textAlign"]]),
        ow = {
            getItemStyle: function (t, e) {
                var n = aw(this, t, e), i = this.getBorderLineDash();
                return i && (n.lineDash = i), n
            }, getBorderLineDash: function () {
                var t = this.get("borderType");
                return "solid" === t || null == t ? null : "dashed" === t ? [5, 5] : [1, 1]
            }
        }, sw = c, lw = Ui();
    Wa.prototype = {
        constructor: Wa, init: null, mergeOption: function (t) {
            r(this.option, t, !0)
        }, get: function (t, e) {
            return null == t ? this.option : Za(this.option, this.parsePath(t), !e && Xa(this, t))
        }, getShallow: function (t, e) {
            var n = this.option, i = null == n ? n : n[t], r = !e && Xa(this, t);
            return null == i && r && (i = r.getShallow(t)), i
        }, getModel: function (t, e) {
            var n, i = null == t ? this.option : Za(this.option, t = this.parsePath(t));
            return e = e || (n = Xa(this, t)) && n.getModel(t), new Wa(i, e, this.ecModel)
        }, isEmpty: function () {
            return null == this.option
        }, restoreData: function () {
        }, clone: function () {
            var t = this.constructor;
            return new t(i(this.option))
        }, setReadOnly: function () {
        }, parsePath: function (t) {
            return "string" == typeof t && (t = t.split(".")), t
        }, customizeGetParent: function (t) {
            lw(this).getParent = t
        }, isAnimationEnabled: function () {
            if (!nm.node) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled()
            }
        }
    }, er(Wa), nr(Wa), sw(Wa, xx), sw(Wa, bx), sw(Wa, rw), sw(Wa, ow);
    var uw = 0, hw = 1e-4, cw = 9007199254740991,
        dw = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,
        fw = (Object.freeze || Object)({
            linearMap: Ka,
            parsePercent: $a,
            round: Qa,
            asc: Ja,
            getPrecision: to,
            getPrecisionSafe: eo,
            getPixelPrecision: no,
            getPercentWithPrecision: io,
            MAX_SAFE_INTEGER: cw,
            remRadian: ro,
            isRadianAroundZero: ao,
            parseDate: oo,
            quantity: so,
            nice: uo,
            quantile: ho,
            reformIntervals: co,
            isNumeric: fo
        }), pw = L, gw = /([&<>"'])/g, vw = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"},
        mw = ["a", "b", "c", "d", "e", "f", "g"], yw = function (t, e) {
            return "{" + t + (null == e ? "" : e) + "}"
        }, xw = Zn, _w = (Object.freeze || Object)({
            addCommas: po,
            toCamelCase: go,
            normalizeCssArray: pw,
            encodeHTML: vo,
            formatTpl: mo,
            formatTplSimple: yo,
            getTooltipMarker: xo,
            formatTime: wo,
            capitalFirst: bo,
            truncateText: xw,
            getTextBoundingRect: Mo,
            getTextRect: So
        }), ww = f, bw = ["left", "right", "top", "bottom", "width", "height"],
        Mw = [["width", "left", "right"], ["height", "top", "bottom"]], Sw = Io,
        Iw = (x(Io, "vertical"), x(Io, "horizontal"), {
            getBoxLayoutParams: function () {
                return {
                    left: this.get("left"),
                    top: this.get("top"),
                    right: this.get("right"),
                    bottom: this.get("bottom"),
                    width: this.get("width"),
                    height: this.get("height")
                }
            }
        }), Tw = Ui(), Cw = Wa.extend({
            type: "component",
            id: "",
            name: "",
            mainType: "",
            subType: "",
            componentIndex: 0,
            defaultOption: null,
            ecModel: null,
            dependentModels: [],
            uid: null,
            layoutMode: null,
            $constructor: function (t, e, n, i) {
                Wa.call(this, t, e, n, i), this.uid = Ya("ec_cpt_model")
            },
            init: function (t, e, n) {
                this.mergeDefaultAndTheme(t, n)
            },
            mergeDefaultAndTheme: function (t, e) {
                var n = this.layoutMode, i = n ? Do(t) : {}, a = e.getTheme();
                r(t, a.get(this.mainType)), r(t, this.getDefaultOption()), n && Ao(t, i, n)
            },
            mergeOption: function (t) {
                r(this.option, t, !0);
                var e = this.layoutMode;
                e && Ao(this.option, t, e)
            },
            optionUpdated: function () {
            },
            getDefaultOption: function () {
                var t = Tw(this);
                if (!t.defaultOption) {
                    for (var e = [], n = this.constructor; n;) {
                        var i = n.prototype.defaultOption;
                        i && e.push(i), n = n.superClass
                    }
                    for (var a = {}, o = e.length - 1; o >= 0; o--) a = r(a, e[o], !0);
                    t.defaultOption = a
                }
                return t.defaultOption
            },
            getReferringComponents: function (t) {
                return this.ecModel.queryComponents({
                    mainType: t,
                    index: this.get(t + "Index", !0),
                    id: this.get(t + "Id", !0)
                })
            }
        });
    ar(Cw, {registerWhenExtend: !0}), Ua(Cw), ja(Cw, Po), c(Cw, Iw);
    var Aw = "";
    "undefined" != typeof navigator && (Aw = navigator.platform || "");
    var Dw = {
            color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#546570", "#c4ccd3"],
            gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
            textStyle: {
                fontFamily: Aw.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: "normal"
            },
            blendMode: null,
            animation: "auto",
            animationDuration: 1e3,
            animationDurationUpdate: 300,
            animationEasing: "exponentialOut",
            animationEasingUpdate: "cubicOut",
            animationThreshold: 2e3,
            progressiveThreshold: 3e3,
            progressive: 400,
            hoverLayerThreshold: 3e3,
            useUTC: !1
        }, kw = Ui(), Pw = {
            clearColorPalette: function () {
                kw(this).colorIdx = 0, kw(this).colorNameMap = {}
            }, getColorFromPalette: function (t, e, n) {
                e = e || this;
                var i = kw(e), r = i.colorIdx || 0, a = i.colorNameMap = i.colorNameMap || {};
                if (a.hasOwnProperty(t)) return a[t];
                var o = Bi(this.get("color", !0)), s = this.get("colorLayer", !0), l = null != n && s ? Lo(s, n) : o;
                if (l = l || o, l && l.length) {
                    var u = l[r];
                    return t && (a[t] = u), i.colorIdx = (r + 1) % l.length, u
                }
            }
        }, Lw = {
            cartesian2d: function (t, e, n, i) {
                var r = t.getReferringComponents("xAxis")[0], a = t.getReferringComponents("yAxis")[0];
                e.coordSysDims = ["x", "y"], n.set("x", r), n.set("y", a), zo(r) && (i.set("x", r), e.firstCategoryDimIndex = 0), zo(a) && (i.set("y", a), e.firstCategoryDimIndex = 1)
            }, singleAxis: function (t, e, n, i) {
                var r = t.getReferringComponents("singleAxis")[0];
                e.coordSysDims = ["single"], n.set("single", r), zo(r) && (i.set("single", r), e.firstCategoryDimIndex = 0)
            }, polar: function (t, e, n, i) {
                var r = t.getReferringComponents("polar")[0], a = r.findAxisModel("radiusAxis"),
                    o = r.findAxisModel("angleAxis");
                e.coordSysDims = ["radius", "angle"], n.set("radius", a), n.set("angle", o), zo(a) && (i.set("radius", a), e.firstCategoryDimIndex = 0), zo(o) && (i.set("angle", o), e.firstCategoryDimIndex = 1)
            }, geo: function (t, e) {
                e.coordSysDims = ["lng", "lat"]
            }, parallel: function (t, e, n, i) {
                var r = t.ecModel, a = r.getComponent("parallel", t.get("parallelIndex")),
                    o = e.coordSysDims = a.dimensions.slice();
                f(a.parallelAxisIndex, function (t, a) {
                    var s = r.getComponent("parallelAxis", t), l = o[a];
                    n.set(l, s), zo(s) && null == e.firstCategoryDimIndex && (i.set(l, s), e.firstCategoryDimIndex = a)
                })
            }
        }, Ow = "original", zw = "arrayRows", Ew = "objectRows", Rw = "keyedColumns", Bw = "unknown", Nw = "typedArray",
        Vw = "column", Fw = "row";
    Eo.seriesDataToSource = function (t) {
        return new Eo({data: t, sourceFormat: I(t) ? Nw : Ow, fromDataset: !1})
    }, nr(Eo);
    var Hw = Ui(), Gw = "\x00_ec_inner", Ww = Wa.extend({
        init: function (t, e, n, i) {
            n = n || {}, this.option = null, this._theme = new Wa(n), this._optionManager = i
        }, setOption: function (t, e) {
            O(!(Gw in t), "please use chart.getOption()"), this._optionManager.setOption(t, e), this.resetOption(null)
        }, resetOption: function (t) {
            var e = !1, n = this._optionManager;
            if (!t || "recreate" === t) {
                var i = n.mountOption("recreate" === t);
                this.option && "recreate" !== t ? (this.restoreData(), this.mergeOption(i)) : Ko.call(this, i), e = !0
            }
            if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                var r = n.getTimelineOption(this);
                r && (this.mergeOption(r), e = !0)
            }
            if (!t || "recreate" === t || "media" === t) {
                var a = n.getMediaOption(this, this._api);
                a.length && f(a, function (t) {
                    this.mergeOption(t, e = !0)
                }, this)
            }
            return e
        }, mergeOption: function (t) {
            function e(e, i) {
                var r = Bi(t[e]), s = Hi(a.get(e), r);
                Gi(s), f(s, function (t) {
                    var n = t.option;
                    M(n) && (t.keyInfo.mainType = e, t.keyInfo.subType = Qo(e, n, t.exist))
                });
                var l = $o(a, i);
                n[e] = [], a.set(e, []), f(s, function (t, i) {
                    var r = t.exist, s = t.option;
                    if (O(M(s) || r, "Empty component definition"), s) {
                        var u = Cw.getClass(e, t.keyInfo.subType, !0);
                        if (r && r instanceof u) r.name = t.keyInfo.name, r.mergeOption(s, this), r.optionUpdated(s, !1); else {
                            var h = o({dependentModels: l, componentIndex: i}, t.keyInfo);
                            r = new u(s, this, this, h), o(r, h), r.init(s, this, this, h), r.optionUpdated(null, !0)
                        }
                    } else r.mergeOption({}, this), r.optionUpdated({}, !1);
                    a.get(e)[i] = r, n[e][i] = r.option
                }, this), "series" === e && Jo(this, a.get("series"))
            }

            var n = this.option, a = this._componentsMap, s = [];
            No(this), f(t, function (t, e) {
                null != t && (Cw.hasClass(e) ? e && s.push(e) : n[e] = null == n[e] ? i(t) : r(n[e], t, !0))
            }), Cw.topologicalTravel(s, Cw.getAllClassMainTypes(), e, this), this._seriesIndicesMap = N(this._seriesIndices = this._seriesIndices || [])
        }, getOption: function () {
            var t = i(this.option);
            return f(t, function (e, n) {
                if (Cw.hasClass(n)) {
                    for (var e = Bi(e), i = e.length - 1; i >= 0; i--) Zi(e[i]) && e.splice(i, 1);
                    t[n] = e
                }
            }), delete t[Gw], t
        }, getTheme: function () {
            return this._theme
        }, getComponent: function (t, e) {
            var n = this._componentsMap.get(t);
            return n ? n[e || 0] : void 0
        }, queryComponents: function (t) {
            var e = t.mainType;
            if (!e) return [];
            var n = t.index, i = t.id, r = t.name, a = this._componentsMap.get(e);
            if (!a || !a.length) return [];
            var o;
            if (null != n) _(n) || (n = [n]), o = v(p(n, function (t) {
                return a[t]
            }), function (t) {
                return !!t
            }); else if (null != i) {
                var s = _(i);
                o = v(a, function (t) {
                    return s && u(i, t.id) >= 0 || !s && t.id === i
                })
            } else if (null != r) {
                var l = _(r);
                o = v(a, function (t) {
                    return l && u(r, t.name) >= 0 || !l && t.name === r
                })
            } else o = a.slice();
            return ts(o, t)
        }, findComponents: function (t) {
            function e(t) {
                var e = r + "Index", n = r + "Id", i = r + "Name";
                return !t || null == t[e] && null == t[n] && null == t[i] ? null : {
                    mainType: r,
                    index: t[e],
                    id: t[n],
                    name: t[i]
                }
            }

            function n(e) {
                return t.filter ? v(e, t.filter) : e
            }

            var i = t.query, r = t.mainType, a = e(i), o = a ? this.queryComponents(a) : this._componentsMap.get(r);
            return n(ts(o, t))
        }, eachComponent: function (t, e, n) {
            var i = this._componentsMap;
            if ("function" == typeof t) n = e, e = t, i.each(function (t, i) {
                f(t, function (t, r) {
                    e.call(n, i, t, r)
                })
            }); else if (b(t)) f(i.get(t), e, n); else if (M(t)) {
                var r = this.findComponents(t);
                f(r, e, n)
            }
        }, getSeriesByName: function (t) {
            var e = this._componentsMap.get("series");
            return v(e, function (e) {
                return e.name === t
            })
        }, getSeriesByIndex: function (t) {
            return this._componentsMap.get("series")[t]
        }, getSeriesByType: function (t) {
            var e = this._componentsMap.get("series");
            return v(e, function (e) {
                return e.subType === t
            })
        }, getSeries: function () {
            return this._componentsMap.get("series").slice()
        }, getSeriesCount: function () {
            return this._componentsMap.get("series").length
        }, eachSeries: function (t, e) {
            f(this._seriesIndices, function (n) {
                var i = this._componentsMap.get("series")[n];
                t.call(e, i, n)
            }, this)
        }, eachRawSeries: function (t, e) {
            f(this._componentsMap.get("series"), t, e)
        }, eachSeriesByType: function (t, e, n) {
            f(this._seriesIndices, function (i) {
                var r = this._componentsMap.get("series")[i];
                r.subType === t && e.call(n, r, i)
            }, this)
        }, eachRawSeriesByType: function (t, e, n) {
            return f(this.getSeriesByType(t), e, n)
        }, isSeriesFiltered: function (t) {
            return null == this._seriesIndicesMap.get(t.componentIndex)
        }, getCurrentSeriesIndices: function () {
            return (this._seriesIndices || []).slice()
        }, filterSeries: function (t, e) {
            var n = v(this._componentsMap.get("series"), t, e);
            Jo(this, n)
        }, restoreData: function (t) {
            var e = this._componentsMap;
            Jo(this, e.get("series"));
            var n = [];
            e.each(function (t, e) {
                n.push(e)
            }), Cw.topologicalTravel(n, Cw.getAllClassMainTypes(), function (n) {
                f(e.get(n), function (e) {
                    ("series" !== n || !jo(e, t)) && e.restoreData()
                })
            })
        }
    });
    c(Ww, Pw);
    var Zw = ["getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getModel", "getOption", "getViewOfComponentModel", "getViewOfSeriesModel"],
        Xw = {};
    ns.prototype = {
        constructor: ns, create: function (t, e) {
            var n = [];
            f(Xw, function (i) {
                var r = i.create(t, e);
                n = n.concat(r || [])
            }), this._coordinateSystems = n
        }, update: function (t, e) {
            f(this._coordinateSystems, function (n) {
                n.update && n.update(t, e)
            })
        }, getCoordinateSystems: function () {
            return this._coordinateSystems.slice()
        }
    }, ns.register = function (t, e) {
        Xw[t] = e
    }, ns.get = function (t) {
        return Xw[t]
    };
    var Yw = f, Uw = i, jw = p, qw = r, Kw = /^(min|max)?(.+)$/;
    is.prototype = {
        constructor: is, setOption: function (t, e) {
            t && f(Bi(t.series), function (t) {
                t && t.data && I(t.data) && E(t.data)
            }), t = Uw(t, !0);
            var n = this._optionBackup, i = rs.call(this, t, e, !n);
            this._newBaseOption = i.baseOption, n ? (ls(n.baseOption, i.baseOption), i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i
        }, mountOption: function (t) {
            var e = this._optionBackup;
            return this._timelineOptions = jw(e.timelineOptions, Uw), this._mediaList = jw(e.mediaList, Uw), this._mediaDefault = Uw(e.mediaDefault), this._currentMediaIndices = [], Uw(t ? e.baseOption : this._newBaseOption)
        }, getTimelineOption: function (t) {
            var e, n = this._timelineOptions;
            if (n.length) {
                var i = t.getComponent("timeline");
                i && (e = Uw(n[i.getCurrentIndex()], !0))
            }
            return e
        }, getMediaOption: function () {
            var t = this._api.getWidth(), e = this._api.getHeight(), n = this._mediaList, i = this._mediaDefault,
                r = [], a = [];
            if (!n.length && !i) return a;
            for (var o = 0, s = n.length; s > o; o++) as(n[o].query, t, e) && r.push(o);
            return !r.length && i && (r = [-1]), r.length && !ss(r, this._currentMediaIndices) && (a = jw(r, function (t) {
                return Uw(-1 === t ? i.option : n[t].option)
            })), this._currentMediaIndices = r, a
        }
    };
    var $w = f, Qw = M, Jw = ["areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine"],
        tb = function (t, e) {
            $w(gs(t.series), function (t) {
                Qw(t) && ps(t)
            });
            var n = ["xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar"];
            e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), $w(n, function (e) {
                $w(gs(t[e]), function (t) {
                    t && (ds(t, "axisLabel"), ds(t.axisPointer, "label"))
                })
            }), $w(gs(t.parallel), function (t) {
                var e = t && t.parallelAxisDefault;
                ds(e, "axisLabel"), ds(e && e.axisPointer, "label")
            }), $w(gs(t.calendar), function (t) {
                hs(t, "itemStyle"), ds(t, "dayLabel"), ds(t, "monthLabel"), ds(t, "yearLabel")
            }), $w(gs(t.radar), function (t) {
                ds(t, "name")
            }), $w(gs(t.geo), function (t) {
                Qw(t) && (fs(t), $w(gs(t.regions), function (t) {
                    fs(t)
                }))
            }), $w(gs(t.timeline), function (t) {
                fs(t), hs(t, "label"), hs(t, "itemStyle"), hs(t, "controlStyle", !0);
                var e = t.data;
                _(e) && f(e, function (t) {
                    M(t) && (hs(t, "label"), hs(t, "itemStyle"))
                })
            }), $w(gs(t.toolbox), function (t) {
                hs(t, "iconStyle"), $w(t.feature, function (t) {
                    hs(t, "iconStyle")
                })
            }), ds(vs(t.axisPointer), "label"), ds(vs(t.tooltip).axisPointer, "label")
        }, eb = [["x", "left"], ["y", "top"], ["x2", "right"], ["y2", "bottom"]],
        nb = ["grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline"],
        ib = function (t, e) {
            tb(t, e), t.series = Bi(t.series), f(t.series, function (t) {
                if (M(t)) {
                    var e = t.type;
                    if (("pie" === e || "gauge" === e) && null != t.clockWise && (t.clockwise = t.clockWise), "gauge" === e) {
                        var n = ms(t, "pointer.color");
                        null != n && ys(t, "itemStyle.normal.color", n)
                    }
                    xs(t)
                }
            }), t.dataRange && (t.visualMap = t.dataRange), f(nb, function (e) {
                var n = t[e];
                n && (_(n) || (n = [n]), f(n, function (t) {
                    xs(t)
                }))
            })
        }, rb = function (t) {
            var e = N();
            t.eachSeries(function (t) {
                var n = t.get("stack");
                if (n) {
                    var i = e.get(n) || e.set(n, []), r = t.getData(), a = {
                        stackResultDimension: r.getCalculationInfo("stackResultDimension"),
                        stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
                        stackedDimension: r.getCalculationInfo("stackedDimension"),
                        stackedByDimension: r.getCalculationInfo("stackedByDimension"),
                        isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
                        data: r,
                        seriesModel: t
                    };
                    if (!a.stackedDimension || !a.isStackedByIndex && !a.stackedByDimension) return;
                    i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), i.push(a)
                }
            }), e.each(_s)
        }, ab = ws.prototype;
    ab.pure = !1, ab.persistent = !0, ab.getSource = function () {
        return this._source
    };
    var ob = {
        arrayRows_column: {
            pure: !0, count: function () {
                return Math.max(0, this._data.length - this._source.startIndex)
            }, getItem: function (t) {
                return this._data[t + this._source.startIndex]
            }, appendData: Ss
        },
        arrayRows_row: {
            pure: !0, count: function () {
                var t = this._data[0];
                return t ? Math.max(0, t.length - this._source.startIndex) : 0
            }, getItem: function (t) {
                t += this._source.startIndex;
                for (var e = [], n = this._data, i = 0; i < n.length; i++) {
                    var r = n[i];
                    e.push(r ? r[t] : null)
                }
                return e
            }, appendData: function () {
                throw new Error('Do not support appendData when set seriesLayoutBy: "row".')
            }
        },
        objectRows: {pure: !0, count: bs, getItem: Ms, appendData: Ss},
        keyedColumns: {
            pure: !0, count: function () {
                var t = this._source.dimensionsDefine[0].name, e = this._data[t];
                return e ? e.length : 0
            }, getItem: function (t) {
                for (var e = [], n = this._source.dimensionsDefine, i = 0; i < n.length; i++) {
                    var r = this._data[n[i].name];
                    e.push(r ? r[t] : null)
                }
                return e
            }, appendData: function (t) {
                var e = this._data;
                f(t, function (t, n) {
                    for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r])
                })
            }
        },
        original: {count: bs, getItem: Ms, appendData: Ss},
        typedArray: {
            persistent: !1, pure: !0, count: function () {
                return this._data ? this._data.length / this._dimSize : 0
            }, getItem: function (t, e) {
                t -= this._offset, e = e || [];
                for (var n = this._dimSize * t, i = 0; i < this._dimSize; i++) e[i] = this._data[n + i];
                return e
            }, appendData: function (t) {
                this._data = t
            }, clean: function () {
                this._offset += this.count(), this._data = null
            }
        }
    }, sb = {
        arrayRows: Is, objectRows: function (t, e, n, i) {
            return null != n ? t[i] : t
        }, keyedColumns: Is, original: function (t, e, n) {
            var i = Vi(t);
            return null != n && i instanceof Array ? i[n] : i
        }, typedArray: Is
    }, lb = {
        arrayRows: Ts, objectRows: function (t, e) {
            return Cs(t[e], this._dimensionInfos[e])
        }, keyedColumns: Ts, original: function (t, e, n, i) {
            var r = t && (null == t.value ? t : t.value);
            return !this._rawData.pure && Fi(t) && (this.hasItemOption = !0), Cs(r instanceof Array ? r[i] : r, this._dimensionInfos[e])
        }, typedArray: function (t, e, n, i) {
            return t[i]
        }
    }, ub = /\{@(.+?)\}/g, hb = {
        getDataParams: function (t, e) {
            var n = this.getData(e), i = this.getRawValue(t, e), r = n.getRawIndex(t), a = n.getName(t),
                o = n.getRawDataItem(t), s = n.getItemVisual(t, "color"), l = this.ecModel.getComponent("tooltip"),
                u = l && l.get("renderMode"), h = Qi(u), c = this.mainType, d = "series" === c;
            return {
                componentType: c,
                componentSubType: this.subType,
                componentIndex: this.componentIndex,
                seriesType: d ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: d ? this.id : null,
                seriesName: d ? this.name : null,
                name: a,
                dataIndex: r,
                data: o,
                dataType: e,
                value: i,
                color: s,
                marker: xo({color: s, renderMode: h}),
                $vars: ["seriesName", "name", "value"]
            }
        }, getFormattedLabel: function (t, e, n, i, r) {
            e = e || "normal";
            var a = this.getData(n), o = a.getItemModel(t), s = this.getDataParams(t, n);
            null != i && s.value instanceof Array && (s.value = s.value[i]);
            var l = o.get("normal" === e ? [r || "label", "formatter"] : [e, r || "label", "formatter"]);
            if ("function" == typeof l) return s.status = e, l(s);
            if ("string" == typeof l) {
                var u = mo(l, s);
                return u.replace(ub, function (e, n) {
                    var i = n.length;
                    return "[" === n.charAt(0) && "]" === n.charAt(i - 1) && (n = +n.slice(1, i - 1)), As(a, t, n)
                })
            }
        }, getRawValue: function (t, e) {
            return As(this.getData(e), t)
        }, formatTooltip: function () {
        }
    }, cb = Ps.prototype;
    cb.perform = function (t) {
        function e(t) {
            return !(t >= 1) && (t = 1), t
        }

        var n = this._upstream, i = t && t.skip;
        if (this._dirty && n) {
            var r = this.context;
            r.data = r.outputData = n.context.outputData
        }
        this.__pipeline && (this.__pipeline.currentTask = this);
        var a;
        this._plan && !i && (a = this._plan(this.context));
        var o = e(this._modBy), s = this._modDataCount || 0, l = e(t && t.modBy), u = t && t.modDataCount || 0;
        (o !== l || s !== u) && (a = "reset");
        var h;
        (this._dirty || "reset" === a) && (this._dirty = !1, h = Os(this, i)), this._modBy = l, this._modDataCount = u;
        var c = t && t.step;
        if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
            var d = this._dueIndex, f = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
            if (!i && (h || f > d)) {
                var p = this._progress;
                if (_(p)) for (var g = 0; g < p.length; g++) Ls(this, p[g], d, f, l, u); else Ls(this, p, d, f, l, u)
            }
            this._dueIndex = f;
            var v = null != this._settedOutputEnd ? this._settedOutputEnd : f;
            this._outputDueEnd = v
        } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
        return this.unfinished()
    };
    var db = function () {
        function t() {
            return n > i ? i++ : null
        }

        function e() {
            var t = i % o * r + Math.ceil(i / o), e = i >= n ? null : a > t ? t : i;
            return i++, e
        }

        var n, i, r, a, o, s = {
            reset: function (l, u, h, c) {
                i = l, n = u, r = h, a = c, o = Math.ceil(a / r), s.next = r > 1 && a > 0 ? e : t
            }
        };
        return s
    }();
    cb.dirty = function () {
        this._dirty = !0, this._onDirty && this._onDirty(this.context)
    }, cb.unfinished = function () {
        return this._progress && this._dueIndex < this._dueEnd
    }, cb.pipe = function (t) {
        (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty())
    }, cb.dispose = function () {
        this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0)
    }, cb.getUpstream = function () {
        return this._upstream
    }, cb.getDownstream = function () {
        return this._downstream
    }, cb.setOutputEnd = function (t) {
        this._outputDueEnd = this._settedOutputEnd = t
    };
    var fb = Ui(), pb = Cw.extend({
        type: "series.__base__",
        seriesIndex: 0,
        coordinateSystem: null,
        defaultOption: null,
        legendDataProvider: null,
        visualColorAccessPath: "itemStyle.color",
        layoutMode: null,
        init: function (t, e, n) {
            this.seriesIndex = this.componentIndex, this.dataTask = ks({
                count: Rs,
                reset: Bs
            }), this.dataTask.context = {model: this}, this.mergeDefaultAndTheme(t, n), Vo(this);
            var i = this.getInitialData(t, n);
            Vs(i, this), this.dataTask.context.data = i, fb(this).dataBeforeProcessed = i, zs(this)
        },
        mergeDefaultAndTheme: function (t, e) {
            var n = this.layoutMode, i = n ? Do(t) : {}, a = this.subType;
            Cw.hasClass(a) && (a += "Series"), r(t, e.getTheme().get(this.subType)), r(t, this.getDefaultOption()), Ni(t, "label", ["show"]), this.fillDataTextStyle(t.data), n && Ao(t, i, n)
        },
        mergeOption: function (t, e) {
            t = r(this.option, t, !0), this.fillDataTextStyle(t.data);
            var n = this.layoutMode;
            n && Ao(this.option, t, n), Vo(this);
            var i = this.getInitialData(t, e);
            Vs(i, this), this.dataTask.dirty(), this.dataTask.context.data = i, fb(this).dataBeforeProcessed = i, zs(this)
        },
        fillDataTextStyle: function (t) {
            if (t && !I(t)) for (var e = ["show"], n = 0; n < t.length; n++) t[n] && t[n].label && Ni(t[n], "label", e)
        },
        getInitialData: function () {
        },
        appendData: function (t) {
            var e = this.getRawData();
            e.appendData(t.data)
        },
        getData: function (t) {
            var e = Hs(this);
            if (e) {
                var n = e.context.data;
                return null == t ? n : n.getLinkedData(t)
            }
            return fb(this).data
        },
        setData: function (t) {
            var e = Hs(this);
            if (e) {
                var n = e.context;
                n.data !== t && e.modifyOutputEnd && e.setOutputEnd(t.count()), n.outputData = t, e !== this.dataTask && (n.data = t)
            }
            fb(this).data = t
        },
        getSource: function () {
            return Bo(this)
        },
        getRawData: function () {
            return fb(this).dataBeforeProcessed
        },
        getBaseAxis: function () {
            var t = this.coordinateSystem;
            return t && t.getBaseAxis && t.getBaseAxis()
        },
        formatTooltip: function (t, e, n, i) {
            function r(n) {
                function r(t, n) {
                    var r = c.getDimensionInfo(n);
                    if (r && r.otherDims.tooltip !== !1) {
                        var d = r.type, f = "sub" + o.seriesIndex + "at" + h,
                            p = xo({color: y, type: "subItem", renderMode: i, markerId: f}),
                            g = "string" == typeof p ? p : p.content,
                            v = (a ? g + vo(r.displayName || "-") + ": " : "") + vo("ordinal" === d ? t + "" : "time" === d ? e ? "" : wo("yyyy/MM/dd hh:mm:ss", t) : po(t));
                        v && s.push(v), l && (u[f] = y, ++h)
                    }
                }

                var a = g(n, function (t, e, n) {
                    var i = c.getDimensionInfo(n);
                    return t |= i && i.tooltip !== !1 && null != i.displayName
                }, 0), s = [];
                d.length ? f(d, function (e) {
                    r(As(c, t, e), e)
                }) : f(n, r);
                var p = a ? l ? "\n" : "<br/>" : "", v = p + s.join(p || ", ");
                return {renderMode: i, content: v, style: u}
            }

            function a(t) {
                return {renderMode: i, content: vo(po(t)), style: u}
            }

            var o = this;
            i = i || "html";
            var s = "html" === i ? "<br/>" : "\n", l = "richText" === i, u = {}, h = 0, c = this.getData(),
                d = c.mapDimension("defaultedTooltip", !0), p = d.length, v = this.getRawValue(t), m = _(v),
                y = c.getItemVisual(t, "color");
            M(y) && y.colorStops && (y = (y.colorStops[0] || {}).color), y = y || "transparent";
            var x = p > 1 || m && !p ? r(v) : a(p ? As(c, t, d[0]) : m ? v[0] : v), w = x.content,
                b = o.seriesIndex + "at" + h, S = xo({color: y, type: "item", renderMode: i, markerId: b});
            u[b] = y, ++h;
            var I = c.getName(t), T = this.name;
            Wi(this) || (T = ""), T = T ? vo(T) + (e ? ": " : s) : "";
            var C = "string" == typeof S ? S : S.content, A = e ? C + T + w : T + C + (I ? vo(I) + ": " + w : w);
            return {html: A, markers: u}
        },
        isAnimationEnabled: function () {
            if (nm.node) return !1;
            var t = this.getShallow("animation");
            return t && this.getData().count() > this.getShallow("animationThreshold") && (t = !1), t
        },
        restoreData: function () {
            this.dataTask.dirty()
        },
        getColorFromPalette: function (t, e, n) {
            var i = this.ecModel, r = Pw.getColorFromPalette.call(this, t, e, n);
            return r || (r = i.getColorFromPalette(t, e, n)), r
        },
        coordDimToDataDim: function (t) {
            return this.getRawData().mapDimension(t, !0)
        },
        getProgressive: function () {
            return this.get("progressive")
        },
        getProgressiveThreshold: function () {
            return this.get("progressiveThreshold")
        },
        getAxisTooltipData: null,
        getTooltipPosition: null,
        pipeTask: null,
        preventIncremental: null,
        pipelineContext: null
    });
    c(pb, hb), c(pb, Pw);
    var gb = function () {
        this.group = new dy, this.uid = Ya("viewComponent")
    };
    gb.prototype = {
        constructor: gb, init: function () {
        }, render: function () {
        }, dispose: function () {
        }, filterForExposedEvent: null
    };
    var vb = gb.prototype;
    vb.updateView = vb.updateLayout = vb.updateVisual = function () {
    }, er(gb), ar(gb, {registerWhenExtend: !0});
    var mb = function () {
        var t = Ui();
        return function (e) {
            var n = t(e), i = e.pipelineContext, r = n.large, a = n.progressiveRender, o = n.large = i.large,
                s = n.progressiveRender = i.progressiveRender;
            return !!(r ^ o || a ^ s) && "reset"
        }
    }, yb = Ui(), xb = mb();
    Gs.prototype = {
        type: "chart", init: function () {
        }, render: function () {
        }, highlight: function (t, e, n, i) {
            Zs(t.getData(), i, "emphasis")
        }, downplay: function (t, e, n, i) {
            Zs(t.getData(), i, "normal")
        }, remove: function () {
            this.group.removeAll()
        }, dispose: function () {
        }, incrementalPrepareRender: null, incrementalRender: null, updateTransform: null, filterForExposedEvent: null
    };
    var _b = Gs.prototype;
    _b.updateView = _b.updateLayout = _b.updateVisual = function (t, e, n, i) {
        this.render(t, e, n, i)
    }, er(Gs, ["dispose"]), ar(Gs, {registerWhenExtend: !0}), Gs.markUpdateMethod = function (t, e) {
        yb(t).updateMethod = e
    };
    var wb = {
        incrementalPrepareRender: {
            progress: function (t, e) {
                e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload)
            }
        }, render: {
            forceFirstProgress: !0, progress: function (t, e) {
                e.view.render(e.model, e.ecModel, e.api, e.payload)
            }
        }
    }, bb = "\x00__throttleOriginMethod", Mb = "\x00__throttleRate", Sb = "\x00__throttleType", Ib = {
        createOnAllSeries: !0, performRawSeries: !0, reset: function (t, e) {
            var n = t.getData(), i = (t.visualColorAccessPath || "itemStyle.color").split("."),
                r = t.get(i) || t.getColorFromPalette(t.name, null, e.getSeriesCount());
            if (n.setVisual("color", r), !e.isSeriesFiltered(t)) {
                "function" != typeof r || r instanceof Z_ || n.each(function (e) {
                    n.setItemVisual(e, "color", r(t.getDataParams(e)))
                });
                var a = function (t, e) {
                    var n = t.getItemModel(e), r = n.get(i, !0);
                    null != r && t.setItemVisual(e, "color", r)
                };
                return {dataEach: n.hasItemOption ? a : null}
            }
        }
    }, Tb = {
        toolbox: {
            brush: {
                title: {
                    rect: "矩形选择",
                    polygon: "圈选",
                    lineX: "横向选择",
                    lineY: "纵向选择",
                    keep: "保持选择",
                    clear: "清除选择"
                }
            },
            dataView: {title: "数据视图", lang: ["数据视图", "关闭", "刷新"]},
            dataZoom: {title: {zoom: "区域缩放", back: "区域缩放还原"}},
            magicType: {title: {line: "切换为折线图", bar: "切换为柱状图", stack: "切换为堆叠", tiled: "切换为平铺"}},
            restore: {title: "还原"},
            saveAsImage: {title: "保存为图片", lang: ["右键另存为图片"]}
        },
        series: {
            typeNames: {
                pie: "饼图",
                bar: "柱状图",
                line: "折线图",
                scatter: "散点图",
                effectScatter: "涟漪散点图",
                radar: "雷达图",
                tree: "树图",
                treemap: "矩形树图",
                boxplot: "箱型图",
                candlestick: "K线图",
                k: "K线图",
                heatmap: "热力图",
                map: "地图",
                parallel: "平行坐标图",
                lines: "线图",
                graph: "关系图",
                sankey: "桑基图",
                funnel: "漏斗图",
                gauge: "仪表盘图",
                pictorialBar: "象形柱图",
                themeRiver: "主题河流图",
                sunburst: "旭日图"
            }
        },
        aria: {
            general: {withTitle: "这是一个关于“{title}”的图表。", withoutTitle: "这是一个图表，"},
            series: {
                single: {
                    prefix: "",
                    withName: "图表类型是{seriesType}，表示{seriesName}。",
                    withoutName: "图表类型是{seriesType}。"
                },
                multiple: {
                    prefix: "它由{seriesCount}个图表系列组成。",
                    withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                    withoutName: "第{seriesId}个系列是一个{seriesType}，",
                    separator: {middle: "；", end: "。"}
                }
            },
            data: {
                allData: "其数据是——",
                partialData: "其中，前{displayCnt}项是——",
                withName: "{name}的数据是{value}",
                withoutName: "{value}",
                separator: {middle: "，", end: ""}
            }
        }
    }, Cb = function (t, e) {
        function n(t, e) {
            if ("string" != typeof t) return t;
            var n = t;
            return f(e, function (t, e) {
                n = n.replace(new RegExp("\\{\\s*" + e + "\\s*\\}", "g"), t)
            }), n
        }

        function i(t) {
            var e = o.get(t);
            if (null == e) {
                for (var n = t.split("."), i = Tb.aria, r = 0; r < n.length; ++r) i = i[n[r]];
                return i
            }
            return e
        }

        function r() {
            var t = e.getModel("title").option;
            return t && t.length && (t = t[0]), t && t.text
        }

        function a(t) {
            return Tb.series.typeNames[t] || "自定义图"
        }

        var o = e.getModel("aria");
        if (o.get("show")) {
            if (o.get("description")) return void t.setAttribute("aria-label", o.get("description"));
            var s = 0;
            e.eachSeries(function () {
                ++s
            }, this);
            var l, u = o.get("data.maxCount") || 10, h = o.get("series.maxCount") || 10, c = Math.min(s, h);
            if (!(1 > s)) {
                var d = r();
                l = d ? n(i("general.withTitle"), {title: d}) : i("general.withoutTitle");
                var p = [], g = s > 1 ? "series.multiple.prefix" : "series.single.prefix";
                l += n(i(g), {seriesCount: s}), e.eachSeries(function (t, e) {
                    if (c > e) {
                        var r, o = t.get("name"), l = "series." + (s > 1 ? "multiple" : "single") + ".";
                        r = i(o ? l + "withName" : l + "withoutName"), r = n(r, {
                            seriesId: t.seriesIndex,
                            seriesName: t.get("name"),
                            seriesType: a(t.subType)
                        });
                        var h = t.getData();
                        window.data = h, r += h.count() > u ? n(i("data.partialData"), {displayCnt: u}) : i("data.allData");
                        for (var d = [], f = 0; f < h.count(); f++) if (u > f) {
                            var g = h.getName(f), v = As(h, f);
                            d.push(n(i(g ? "data.withName" : "data.withoutName"), {name: g, value: v}))
                        }
                        r += d.join(i("data.separator.middle")) + i("data.separator.end"), p.push(r)
                    }
                }), l += p.join(i("series.multiple.separator.middle")) + i("series.multiple.separator.end"), t.setAttribute("aria-label", l)
            }
        }
    }, Ab = Math.PI, Db = function (t, e) {
        e = e || {}, s(e, {
            text: "loading",
            color: "#c23531",
            textColor: "#000",
            maskColor: "rgba(255, 255, 255, 0.8)",
            zlevel: 0
        });
        var n = new B_({style: {fill: e.maskColor}, zlevel: e.zlevel, z: 1e4}), i = new G_({
            shape: {startAngle: -Ab / 2, endAngle: -Ab / 2 + .1, r: 10},
            style: {stroke: e.color, lineCap: "round", lineWidth: 5},
            zlevel: e.zlevel,
            z: 10001
        }), r = new B_({
            style: {
                fill: "none",
                text: e.text,
                textPosition: "right",
                textDistance: 10,
                textFill: e.textColor
            }, zlevel: e.zlevel, z: 10001
        });
        i.animateShape(!0).when(1e3, {endAngle: 3 * Ab / 2}).start("circularInOut"), i.animateShape(!0).when(1e3, {startAngle: 3 * Ab / 2}).delay(300).start("circularInOut");
        var a = new dy;
        return a.add(i), a.add(r), a.add(n), a.resize = function () {
            var e = t.getWidth() / 2, a = t.getHeight() / 2;
            i.setShape({cx: e, cy: a});
            var o = i.shape.r;
            r.setShape({x: e - o, y: a - o, width: 2 * o, height: 2 * o}), n.setShape({
                x: 0,
                y: 0,
                width: t.getWidth(),
                height: t.getHeight()
            })
        }, a.resize(), a
    }, kb = Ks.prototype;
    kb.restoreData = function (t, e) {
        t.restoreData(e), this._stageTaskMap.each(function (t) {
            var e = t.overallTask;
            e && e.dirty()
        })
    }, kb.getPerformArgs = function (t, e) {
        if (t.__pipeline) {
            var n = this._pipelineMap.get(t.__pipeline.id), i = n.context,
                r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex,
                a = r ? n.step : null, o = i && i.modDataCount, s = null != o ? Math.ceil(o / a) : null;
            return {step: a, modBy: s, modDataCount: o}
        }
    }, kb.getPipeline = function (t) {
        return this._pipelineMap.get(t)
    }, kb.updateStreamModes = function (t, e) {
        var n = this._pipelineMap.get(t.uid), i = t.getData(), r = i.count(),
            a = n.progressiveEnabled && e.incrementalPrepareRender && r >= n.threshold,
            o = t.get("large") && r >= t.get("largeThreshold"), s = "mod" === t.get("progressiveChunkMode") ? r : null;
        t.pipelineContext = n.context = {progressiveRender: a, modDataCount: s, large: o}
    }, kb.restorePipelines = function (t) {
        var e = this, n = e._pipelineMap = N();
        t.eachSeries(function (t) {
            var i = t.getProgressive(), r = t.uid;
            n.set(r, {
                id: r,
                head: null,
                tail: null,
                threshold: t.getProgressiveThreshold(),
                progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
                blockIndex: -1,
                step: Math.round(i || 700),
                count: 0
            }), ll(e, t, t.dataTask)
        })
    }, kb.prepareStageTasks = function () {
        var t = this._stageTaskMap, e = this.ecInstance.getModel(), n = this.api;
        f(this._allHandlers, function (i) {
            var r = t.get(i.uid) || t.set(i.uid, []);
            i.reset && Qs(this, i, r, e, n), i.overallReset && Js(this, i, r, e, n)
        }, this)
    }, kb.prepareView = function (t, e, n, i) {
        var r = t.renderTask, a = r.context;
        a.model = e, a.ecModel = n, a.api = i, r.__block = !t.incrementalPrepareRender, ll(this, e, r)
    }, kb.performDataProcessorTasks = function (t, e) {
        $s(this, this._dataProcessorHandlers, t, e, {block: !0})
    }, kb.performVisualTasks = function (t, e, n) {
        $s(this, this._visualHandlers, t, e, n)
    }, kb.performSeriesTasks = function (t) {
        var e;
        t.eachSeries(function (t) {
            e |= t.dataTask.perform()
        }), this.unfinished |= e
    }, kb.plan = function () {
        this._pipelineMap.each(function (t) {
            var e = t.tail;
            do {
                if (e.__block) {
                    t.blockIndex = e.__idxInPipeline;
                    break
                }
                e = e.getUpstream()
            } while (e)
        })
    };
    var Pb = kb.updatePayload = function (t, e) {
        "remain" !== e && (t.context.payload = e)
    }, Lb = ol(0);
    Ks.wrapStageHandler = function (t, e) {
        return w(t) && (t = {
            overallReset: t,
            seriesType: ul(t)
        }), t.uid = Ya("stageHandler"), e && (t.visualType = e), t
    };
    var Ob, zb = {}, Eb = {};
    hl(zb, Ww), hl(Eb, es), zb.eachSeriesByType = zb.eachRawSeriesByType = function (t) {
        Ob = t
    }, zb.eachComponent = function (t) {
        "series" === t.mainType && t.subType && (Ob = t.subType)
    };
    var Rb = ["#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
        Bb = {
            color: Rb,
            colorLayer: [["#37A2DA", "#ffd85c", "#fd7b5f"], ["#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5"], ["#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF"], Rb]
        }, Nb = "#eee", Vb = function () {
            return {
                axisLine: {lineStyle: {color: Nb}},
                axisTick: {lineStyle: {color: Nb}},
                axisLabel: {textStyle: {color: Nb}},
                splitLine: {lineStyle: {type: "dashed", color: "#aaa"}},
                splitArea: {areaStyle: {color: Nb}}
            }
        },
        Fb = ["#dd6b66", "#759aa0", "#e69d87", "#8dc1a9", "#ea7e53", "#eedd78", "#73a373", "#73b9bc", "#7289ab", "#91ca8c", "#f49f42"],
        Hb = {
            color: Fb,
            backgroundColor: "#333",
            tooltip: {axisPointer: {lineStyle: {color: Nb}, crossStyle: {color: Nb}}},
            legend: {textStyle: {color: Nb}},
            textStyle: {color: Nb},
            title: {textStyle: {color: Nb}},
            toolbox: {iconStyle: {normal: {borderColor: Nb}}},
            dataZoom: {textStyle: {color: Nb}},
            visualMap: {textStyle: {color: Nb}},
            timeline: {
                lineStyle: {color: Nb},
                itemStyle: {normal: {color: Fb[1]}},
                label: {normal: {textStyle: {color: Nb}}},
                controlStyle: {normal: {color: Nb, borderColor: Nb}}
            },
            timeAxis: Vb(),
            logAxis: Vb(),
            valueAxis: Vb(),
            categoryAxis: Vb(),
            line: {symbol: "circle"},
            graph: {color: Fb},
            gauge: {title: {textStyle: {color: Nb}}},
            candlestick: {
                itemStyle: {
                    normal: {
                        color: "#FD1050",
                        color0: "#0CF49B",
                        borderColor: "#FD1050",
                        borderColor0: "#0CF49B"
                    }
                }
            }
        };
    Hb.categoryAxis.splitLine.show = !1, Cw.extend({
        type: "dataset",
        defaultOption: {seriesLayoutBy: Vw, sourceHeader: null, dimensions: null, source: null},
        optionUpdated: function () {
            Ro(this)
        }
    }), gb.extend({type: "dataset"});
    var Gb = Vr.extend({
        type: "ellipse", shape: {cx: 0, cy: 0, rx: 0, ry: 0}, buildPath: function (t, e) {
            var n = .5522848, i = e.cx, r = e.cy, a = e.rx, o = e.ry, s = a * n, l = o * n;
            t.moveTo(i - a, r), t.bezierCurveTo(i - a, r - l, i - s, r - o, i, r - o), t.bezierCurveTo(i + s, r - o, i + a, r - l, i + a, r), t.bezierCurveTo(i + a, r + l, i + s, r + o, i, r + o), t.bezierCurveTo(i - s, r + o, i - a, r + l, i - a, r), t.closePath()
        }
    }), Wb = /[\s,]+/;
    dl.prototype.parse = function (t, e) {
        e = e || {};
        var n = cl(t);
        if (!n) throw new Error("Illegal svg");
        var i = new dy;
        this._root = i;
        var r = n.getAttribute("viewBox") || "", a = parseFloat(n.getAttribute("width") || e.width),
            o = parseFloat(n.getAttribute("height") || e.height);
        isNaN(a) && (a = null), isNaN(o) && (o = null), vl(n, i, null, !0);
        for (var s = n.firstChild; s;) this._parseNode(s, i), s = s.nextSibling;
        var l, u;
        if (r) {
            var h = z(r).split(Wb);
            h.length >= 4 && (l = {
                x: parseFloat(h[0] || 0),
                y: parseFloat(h[1] || 0),
                width: parseFloat(h[2]),
                height: parseFloat(h[3])
            })
        }
        if (l && null != a && null != o && (u = _l(l, a, o), !e.ignoreViewBox)) {
            var c = i;
            i = new dy, i.add(c), c.scale = u.scale.slice(), c.position = u.position.slice()
        }
        return e.ignoreRootClip || null == a || null == o || i.setClipPath(new B_({
            shape: {
                x: 0,
                y: 0,
                width: a,
                height: o
            }
        })), {root: i, width: a, height: o, viewBoxRect: l, viewBoxTransform: u}
    }, dl.prototype._parseNode = function (t, e) {
        var n = t.nodeName.toLowerCase();
        "defs" === n ? this._isDefine = !0 : "text" === n && (this._isText = !0);
        var i;
        if (this._isDefine) {
            var r = Xb[n];
            if (r) {
                var a = r.call(this, t), o = t.getAttribute("id");
                o && (this._defs[o] = a)
            }
        } else {
            var r = Zb[n];
            r && (i = r.call(this, t, e), e.add(i))
        }
        for (var s = t.firstChild; s;) 1 === s.nodeType && this._parseNode(s, i), 3 === s.nodeType && this._isText && this._parseText(s, i), s = s.nextSibling;
        "defs" === n ? this._isDefine = !1 : "text" === n && (this._isText = !1)
    }, dl.prototype._parseText = function (t, e) {
        if (1 === t.nodeType) {
            var n = t.getAttribute("dx") || 0, i = t.getAttribute("dy") || 0;
            this._textX += parseFloat(n), this._textY += parseFloat(i)
        }
        var r = new I_({
            style: {text: t.textContent, transformText: !0},
            position: [this._textX || 0, this._textY || 0]
        });
        pl(e, r), vl(t, r, this._defs);
        var a = r.style.fontSize;
        a && 9 > a && (r.style.fontSize = 9, r.scale = r.scale || [1, 1], r.scale[0] *= a / 9, r.scale[1] *= a / 9);
        var o = r.getBoundingRect();
        return this._textX += o.width, e.add(r), r
    };
    var Zb = {
            g: function (t, e) {
                var n = new dy;
                return pl(e, n), vl(t, n, this._defs), n
            }, rect: function (t, e) {
                var n = new B_;
                return pl(e, n), vl(t, n, this._defs), n.setShape({
                    x: parseFloat(t.getAttribute("x") || 0),
                    y: parseFloat(t.getAttribute("y") || 0),
                    width: parseFloat(t.getAttribute("width") || 0),
                    height: parseFloat(t.getAttribute("height") || 0)
                }), n
            }, circle: function (t, e) {
                var n = new T_;
                return pl(e, n), vl(t, n, this._defs), n.setShape({
                    cx: parseFloat(t.getAttribute("cx") || 0),
                    cy: parseFloat(t.getAttribute("cy") || 0),
                    r: parseFloat(t.getAttribute("r") || 0)
                }), n
            }, line: function (t, e) {
                var n = new V_;
                return pl(e, n), vl(t, n, this._defs), n.setShape({
                    x1: parseFloat(t.getAttribute("x1") || 0),
                    y1: parseFloat(t.getAttribute("y1") || 0),
                    x2: parseFloat(t.getAttribute("x2") || 0),
                    y2: parseFloat(t.getAttribute("y2") || 0)
                }), n
            }, ellipse: function (t, e) {
                var n = new Gb;
                return pl(e, n), vl(t, n, this._defs), n.setShape({
                    cx: parseFloat(t.getAttribute("cx") || 0),
                    cy: parseFloat(t.getAttribute("cy") || 0),
                    rx: parseFloat(t.getAttribute("rx") || 0),
                    ry: parseFloat(t.getAttribute("ry") || 0)
                }), n
            }, polygon: function (t, e) {
                var n = t.getAttribute("points");
                n && (n = gl(n));
                var i = new O_({shape: {points: n || []}});
                return pl(e, i), vl(t, i, this._defs), i
            }, polyline: function (t, e) {
                var n = new Vr;
                pl(e, n), vl(t, n, this._defs);
                var i = t.getAttribute("points");
                i && (i = gl(i));
                var r = new z_({shape: {points: i || []}});
                return r
            }, image: function (t, e) {
                var n = new _i;
                return pl(e, n), vl(t, n, this._defs), n.setStyle({
                    image: t.getAttribute("xlink:href"),
                    x: t.getAttribute("x"),
                    y: t.getAttribute("y"),
                    width: t.getAttribute("width"),
                    height: t.getAttribute("height")
                }), n
            }, text: function (t, e) {
                var n = t.getAttribute("x") || 0, i = t.getAttribute("y") || 0, r = t.getAttribute("dx") || 0,
                    a = t.getAttribute("dy") || 0;
                this._textX = parseFloat(n) + parseFloat(r), this._textY = parseFloat(i) + parseFloat(a);
                var o = new dy;
                return pl(e, o), vl(t, o, this._defs), o
            }, tspan: function (t, e) {
                var n = t.getAttribute("x"), i = t.getAttribute("y");
                null != n && (this._textX = parseFloat(n)), null != i && (this._textY = parseFloat(i));
                var r = t.getAttribute("dx") || 0, a = t.getAttribute("dy") || 0, o = new dy;
                return pl(e, o), vl(t, o, this._defs), this._textX += r, this._textY += a, o
            }, path: function (t, e) {
                var n = t.getAttribute("d") || "", i = Wr(n);
                return pl(e, i), vl(t, i, this._defs), i
            }
        }, Xb = {
            lineargradient: function (t) {
                var e = parseInt(t.getAttribute("x1") || 0, 10), n = parseInt(t.getAttribute("y1") || 0, 10),
                    i = parseInt(t.getAttribute("x2") || 10, 10), r = parseInt(t.getAttribute("y2") || 0, 10),
                    a = new X_(e, n, i, r);
                return fl(t, a), a
            }, radialgradient: function () {
            }
        }, Yb = {
            fill: "fill",
            stroke: "stroke",
            "stroke-width": "lineWidth",
            opacity: "opacity",
            "fill-opacity": "fillOpacity",
            "stroke-opacity": "strokeOpacity",
            "stroke-dasharray": "lineDash",
            "stroke-dashoffset": "lineDashOffset",
            "stroke-linecap": "lineCap",
            "stroke-linejoin": "lineJoin",
            "stroke-miterlimit": "miterLimit",
            "font-family": "fontFamily",
            "font-size": "fontSize",
            "font-style": "fontStyle",
            "font-weight": "fontWeight",
            "text-align": "textAlign",
            "alignment-baseline": "textBaseline"
        }, Ub = /url\(\s*#(.*?)\)/, jb = /(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.e,]*)\)/g,
        qb = /([^\s:;]+)\s*:\s*([^:;]+)/g, Kb = N(), $b = {
            registerMap: function (t, e, n) {
                var i;
                return _(e) ? i = e : e.svg ? i = [{
                    type: "svg",
                    source: e.svg,
                    specialAreas: e.specialAreas
                }] : (e.geoJson && !e.features && (n = e.specialAreas, e = e.geoJson), i = [{
                    type: "geoJSON",
                    source: e,
                    specialAreas: n
                }]), f(i, function (t) {
                    var e = t.type;
                    "geoJson" === e && (e = t.type = "geoJSON");
                    var n = Qb[e];
                    n(t)
                }), Kb.set(t, i)
            }, retrieveMap: function (t) {
                return Kb.get(t)
            }
        }, Qb = {
            geoJSON: function (t) {
                var e = t.source;
                t.geoJSON = b(e) ? "undefined" != typeof JSON && JSON.parse ? JSON.parse(e) : new Function("return (" + e + ");")() : e
            }, svg: function (t) {
                t.svgXML = cl(t.source)
            }
        }, Jb = O, tM = f, eM = w, nM = M, iM = Cw.parseClassType, rM = "4.2.1", aM = {zrender: "4.0.6"}, oM = 1, sM = 1e3,
        lM = 5e3, uM = 1e3, hM = 2e3, cM = 3e3, dM = 4e3, fM = 5e3, pM = {
            PROCESSOR: {FILTER: sM, STATISTIC: lM},
            VISUAL: {LAYOUT: uM, GLOBAL: hM, CHART: cM, COMPONENT: dM, BRUSH: fM}
        }, gM = "__flagInMainProcess", vM = "__optionUpdated", mM = /^[a-zA-Z0-9_]+$/;
    bl.prototype.on = wl("on"), bl.prototype.off = wl("off"), bl.prototype.one = wl("one"), c(bl, Sm);
    var yM = Ml.prototype;
    yM._onframe = function () {
        if (!this._disposed) {
            var t = this._scheduler;
            if (this[vM]) {
                var e = this[vM].silent;
                this[gM] = !0, Il(this), xM.update.call(this), this[gM] = !1, this[vM] = !1, Dl.call(this, e), kl.call(this, e)
            } else if (t.unfinished) {
                var n = oM, i = this._model, r = this._api;
                t.unfinished = !1;
                do {
                    var a = +new Date;
                    t.performSeriesTasks(i), t.performDataProcessorTasks(i), Cl(this, i), t.performVisualTasks(i), Rl(this, this._model, r, "remain"), n -= +new Date - a
                } while (n > 0 && t.unfinished);
                t.unfinished || this._zr.flush()
            }
        }
    }, yM.getDom = function () {
        return this._dom
    }, yM.getZr = function () {
        return this._zr
    }, yM.setOption = function (t, e, n) {
        var i;
        if (nM(e) && (n = e.lazyUpdate, i = e.silent, e = e.notMerge), this[gM] = !0, !this._model || e) {
            var r = new is(this._api), a = this._theme, o = this._model = new Ww(null, null, a, r);
            o.scheduler = this._scheduler, o.init(null, null, a, r)
        }
        this._model.setOption(t, SM), n ? (this[vM] = {silent: i}, this[gM] = !1) : (Il(this), xM.update.call(this), this._zr.flush(), this[vM] = !1, this[gM] = !1, Dl.call(this, i), kl.call(this, i))
    }, yM.setTheme = function () {
        console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0")
    }, yM.getModel = function () {
        return this._model
    }, yM.getOption = function () {
        return this._model && this._model.getOption()
    }, yM.getWidth = function () {
        return this._zr.getWidth()
    }, yM.getHeight = function () {
        return this._zr.getHeight()
    }, yM.getDevicePixelRatio = function () {
        return this._zr.painter.dpr || window.devicePixelRatio || 1
    }, yM.getRenderedCanvas = function (t) {
        if (nm.canvasSupported) {
            t = t || {}, t.pixelRatio = t.pixelRatio || 1, t.backgroundColor = t.backgroundColor || this._model.get("backgroundColor");
            var e = this._zr;
            return e.painter.getRenderedCanvas(t)
        }
    }, yM.getSvgDataUrl = function () {
        if (nm.svgSupported) {
            var t = this._zr, e = t.storage.getDisplayList();
            return f(e, function (t) {
                t.stopAnimation(!0)
            }), t.painter.pathToDataUrl()
        }
    }, yM.getDataURL = function (t) {
        t = t || {};
        var e = t.excludeComponents, n = this._model, i = [], r = this;
        tM(e, function (t) {
            n.eachComponent({mainType: t}, function (t) {
                var e = r._componentsMap[t.__viewId];
                e.group.ignore || (i.push(e), e.group.ignore = !0)
            })
        });
        var a = "svg" === this._zr.painter.getType() ? this.getSvgDataUrl() : this.getRenderedCanvas(t).toDataURL("image/" + (t && t.type || "png"));
        return tM(i, function (t) {
            t.group.ignore = !1
        }), a
    }, yM.getConnectedDataURL = function (t) {
        if (nm.canvasSupported) {
            var e = this.group, n = Math.min, r = Math.max, a = 1 / 0;
            if (kM[e]) {
                var o = a, s = a, l = -a, u = -a, h = [], c = t && t.pixelRatio || 1;
                f(DM, function (a) {
                    if (a.group === e) {
                        var c = a.getRenderedCanvas(i(t)), d = a.getDom().getBoundingClientRect();
                        o = n(d.left, o), s = n(d.top, s), l = r(d.right, l), u = r(d.bottom, u), h.push({
                            dom: c,
                            left: d.left,
                            top: d.top
                        })
                    }
                }), o *= c, s *= c, l *= c, u *= c;
                var d = l - o, p = u - s, g = fm();
                g.width = d, g.height = p;
                var v = Li(g);
                return tM(h, function (t) {
                    var e = new _i({style: {x: t.left * c - o, y: t.top * c - s, image: t.dom}});
                    v.add(e)
                }), v.refreshImmediately(), g.toDataURL("image/" + (t && t.type || "png"))
            }
            return this.getDataURL(t)
        }
    }, yM.convertToPixel = x(Sl, "convertToPixel"), yM.convertFromPixel = x(Sl, "convertFromPixel"), yM.containPixel = function (t, e) {
        var n, i = this._model;
        return t = ji(i, t), f(t, function (t, i) {
            i.indexOf("Models") >= 0 && f(t, function (t) {
                var r = t.coordinateSystem;
                if (r && r.containPoint) n |= !!r.containPoint(e); else if ("seriesModels" === i) {
                    var a = this._chartsMap[t.__viewId];
                    a && a.containPoint && (n |= a.containPoint(e, t))
                }
            }, this)
        }, this), !!n
    }, yM.getVisual = function (t, e) {
        var n = this._model;
        t = ji(n, t, {defaultMainType: "series"});
        var i = t.seriesModel, r = i.getData(),
            a = t.hasOwnProperty("dataIndexInside") ? t.dataIndexInside : t.hasOwnProperty("dataIndex") ? r.indexOfRawIndex(t.dataIndex) : null;
        return null != a ? r.getItemVisual(a, e) : r.getVisual(e)
    }, yM.getViewOfComponentModel = function (t) {
        return this._componentsMap[t.__viewId]
    }, yM.getViewOfSeriesModel = function (t) {
        return this._chartsMap[t.__viewId]
    };
    var xM = {
        prepareAndUpdate: function (t) {
            Il(this), xM.update.call(this, t)
        }, update: function (t) {
            var e = this._model, n = this._api, i = this._zr, r = this._coordSysMgr, a = this._scheduler;
            if (e) {
                a.restoreData(e, t), a.performSeriesTasks(e), r.create(e, n), a.performDataProcessorTasks(e, t), Cl(this, e), r.update(e, n), Ol(e), a.performVisualTasks(e, t), zl(this, e, n, t);
                var o = e.get("backgroundColor") || "transparent";
                if (nm.canvasSupported) i.setBackgroundColor(o); else {
                    var s = Ye(o);
                    o = en(s, "rgb"), 0 === s[3] && (o = "transparent")
                }
                Bl(e, n)
            }
        }, updateTransform: function (t) {
            var e = this._model, n = this, i = this._api;
            if (e) {
                var r = [];
                e.eachComponent(function (a, o) {
                    var s = n.getViewOfComponentModel(o);
                    if (s && s.__alive) if (s.updateTransform) {
                        var l = s.updateTransform(o, e, i, t);
                        l && l.update && r.push(s)
                    } else r.push(s)
                });
                var a = N();
                e.eachSeries(function (r) {
                    var o = n._chartsMap[r.__viewId];
                    if (o.updateTransform) {
                        var s = o.updateTransform(r, e, i, t);
                        s && s.update && a.set(r.uid, 1)
                    } else a.set(r.uid, 1)
                }), Ol(e), this._scheduler.performVisualTasks(e, t, {
                    setDirty: !0,
                    dirtyMap: a
                }), Rl(n, e, i, t, a), Bl(e, this._api)
            }
        }, updateView: function (t) {
            var e = this._model;
            e && (Gs.markUpdateMethod(t, "updateView"), Ol(e), this._scheduler.performVisualTasks(e, t, {setDirty: !0}), zl(this, this._model, this._api, t), Bl(e, this._api))
        }, updateVisual: function (t) {
            xM.update.call(this, t)
        }, updateLayout: function (t) {
            xM.update.call(this, t)
        }
    };
    yM.resize = function (t) {
        this._zr.resize(t);
        var e = this._model;
        if (this._loadingFX && this._loadingFX.resize(), e) {
            var n = e.resetOption("media"), i = t && t.silent;
            this[gM] = !0, n && Il(this), xM.update.call(this), this[gM] = !1, Dl.call(this, i), kl.call(this, i)
        }
    }, yM.showLoading = function (t, e) {
        if (nM(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), AM[t]) {
            var n = AM[t](this._api, e), i = this._zr;
            this._loadingFX = n, i.add(n)
        }
    }, yM.hideLoading = function () {
        this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null
    }, yM.makeActionFromEvent = function (t) {
        var e = o({}, t);
        return e.type = bM[t.type], e
    }, yM.dispatchAction = function (t, e) {
        if (nM(e) || (e = {silent: !!e}), wM[t.type] && this._model) {
            if (this[gM]) return void this._pendingActions.push(t);
            Al.call(this, t, e.silent), e.flush ? this._zr.flush(!0) : e.flush !== !1 && nm.browser.weChat && this._throttledZrFlush(), Dl.call(this, e.silent), kl.call(this, e.silent)
        }
    }, yM.appendData = function (t) {
        var e = t.seriesIndex, n = this.getModel(), i = n.getSeriesByIndex(e);
        i.appendData(t), this._scheduler.unfinished = !0
    }, yM.on = wl("on"), yM.off = wl("off"), yM.one = wl("one");
    var _M = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu"];
    yM._initEvents = function () {
        tM(_M, function (t) {
            var e = function (e) {
                var n, i = this.getModel(), r = e.target, a = "globalout" === t;
                if (a) n = {}; else if (r && null != r.dataIndex) {
                    var s = r.dataModel || i.getSeriesByIndex(r.seriesIndex);
                    n = s && s.getDataParams(r.dataIndex, r.dataType, r) || {}
                } else r && r.eventData && (n = o({}, r.eventData));
                if (n) {
                    var l = n.componentType, u = n.componentIndex;
                    ("markLine" === l || "markPoint" === l || "markArea" === l) && (l = "series", u = n.seriesIndex);
                    var h = l && null != u && i.getComponent(l, u),
                        c = h && this["series" === h.mainType ? "_chartsMap" : "_componentsMap"][h.__viewId];
                    n.event = e, n.type = t, this._ecEventProcessor.eventInfo = {
                        targetEl: r,
                        packedEvent: n,
                        model: h,
                        view: c
                    }, this.trigger(t, n)
                }
            };
            e.zrEventfulCallAtLast = !0, this._zr.on(t, e, this)
        }, this), tM(bM, function (t, e) {
            this._messageCenter.on(e, function (t) {
                this.trigger(e, t)
            }, this)
        }, this)
    }, yM.isDisposed = function () {
        return this._disposed
    }, yM.clear = function () {
        this.setOption({series: []}, !0)
    }, yM.dispose = function () {
        if (!this._disposed) {
            this._disposed = !0, Ki(this.getDom(), OM, "");
            var t = this._api, e = this._model;
            tM(this._componentsViews, function (n) {
                n.dispose(e, t)
            }), tM(this._chartsViews, function (n) {
                n.dispose(e, t)
            }), this._zr.dispose(), delete DM[this.id]
        }
    }, c(Ml, Sm), Gl.prototype = {
        constructor: Gl, normalizeQuery: function (t) {
            var e = {}, n = {}, i = {};
            if (b(t)) {
                var r = iM(t);
                e.mainType = r.main || null, e.subType = r.sub || null
            } else {
                var a = ["Index", "Name", "Id"], o = {name: 1, dataIndex: 1, dataType: 1};
                f(t, function (t, r) {
                    for (var s = !1, l = 0; l < a.length; l++) {
                        var u = a[l], h = r.lastIndexOf(u);
                        if (h > 0 && h === r.length - u.length) {
                            var c = r.slice(0, h);
                            "data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0)
                        }
                    }
                    o.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t)
                })
            }
            return {cptQuery: e, dataQuery: n, otherQuery: i}
        }, filter: function (t, e) {
            function n(t, e, n, i) {
                return null == t[n] || e[i || n] === t[n]
            }

            var i = this.eventInfo;
            if (!i) return !0;
            var r = i.targetEl, a = i.packedEvent, o = i.model, s = i.view;
            if (!o || !s) return !0;
            var l = e.cptQuery, u = e.dataQuery;
            return n(l, o, "mainType") && n(l, o, "subType") && n(l, o, "index", "componentIndex") && n(l, o, "name") && n(l, o, "id") && n(u, a, "name") && n(u, a, "dataIndex") && n(u, a, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, a))
        }, afterTrigger: function () {
            this.eventInfo = null
        }
    };
    var wM = {}, bM = {}, MM = [], SM = [], IM = [], TM = [], CM = {}, AM = {}, DM = {}, kM = {}, PM = new Date - 0,
        LM = new Date - 0, OM = "_echarts_instance_", zM = Yl;
    ru(hM, Ib), $l(ib), Ql(lM, rb), ou("default", Db), tu({
        type: "highlight",
        event: "highlight",
        update: "highlight"
    }, F), tu({type: "downplay", event: "downplay", update: "downplay"}, F), Kl("light", Bb), Kl("dark", Hb);
    var EM = {};
    gu.prototype = {
        constructor: gu, add: function (t) {
            return this._add = t, this
        }, update: function (t) {
            return this._update = t, this
        }, remove: function (t) {
            return this._remove = t, this
        }, execute: function () {
            var t, e = this._old, n = this._new, i = {}, r = {}, a = [], o = [];
            for (vu(e, i, a, "_oldKeyGetter", this), vu(n, r, o, "_newKeyGetter", this), t = 0; t < e.length; t++) {
                var s = a[t], l = r[s];
                if (null != l) {
                    var u = l.length;
                    u ? (1 === u && (r[s] = null), l = l.unshift()) : r[s] = null, this._update && this._update(l, t)
                } else this._remove && this._remove(t)
            }
            for (var t = 0; t < o.length; t++) {
                var s = o[t];
                if (r.hasOwnProperty(s)) {
                    var l = r[s];
                    if (null == l) continue;
                    if (l.length) for (var h = 0, u = l.length; u > h; h++) this._add && this._add(l[h]); else this._add && this._add(l)
                }
            }
        }
    };
    var RM = N(["tooltip", "label", "itemName", "itemId", "seriesName"]), BM = M, NM = "undefined", VM = -1,
        FM = "e\x00\x00", HM = {
            "float": typeof Float64Array === NM ? Array : Float64Array,
            "int": typeof Int32Array === NM ? Array : Int32Array,
            ordinal: Array,
            number: Array,
            time: Array
        }, GM = typeof Uint32Array === NM ? Array : Uint32Array, WM = typeof Int32Array === NM ? Array : Int32Array,
        ZM = typeof Uint16Array === NM ? Array : Uint16Array,
        XM = ["hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_rawData", "_chunkSize", "_chunkCount", "_dimValueGetter", "_count", "_rawCount", "_nameDimIdx", "_idDimIdx"],
        YM = ["_extent", "_approximateExtent", "_rawExtent"], UM = function (t, e) {
            t = t || ["x", "y"];
            for (var n = {}, i = [], r = {}, a = 0; a < t.length; a++) {
                var o = t[a];
                b(o) && (o = {name: o});
                var s = o.name;
                o.type = o.type || "float", o.coordDim || (o.coordDim = s, o.coordDimIndex = 0), o.otherDims = o.otherDims || {}, i.push(s), n[s] = o, o.index = a, o.createInvertedIndices && (r[s] = [])
            }
            this.dimensions = i, this._dimensionInfos = n, this.hostModel = e, this.dataType, this._indices = null, this._count = 0, this._rawCount = 0, this._storage = {}, this._nameList = [], this._idList = [], this._optionModels = [], this._visual = {}, this._layout = {}, this._itemVisuals = [], this.hasItemVisual = {}, this._itemLayouts = [], this._graphicEls = [], this._chunkSize = 1e5, this._chunkCount = 0, this._rawData, this._rawExtent = {}, this._extent = {}, this._approximateExtent = {}, this._dimensionsSummary = mu(this), this._invertedIndicesMap = r, this._calculationInfo = {}
        }, jM = UM.prototype;
    jM.type = "list", jM.hasItemOption = !0, jM.getDimension = function (t) {
        return isNaN(t) || (t = this.dimensions[t] || t), t
    }, jM.getDimensionInfo = function (t) {
        return this._dimensionInfos[this.getDimension(t)]
    }, jM.getDimensionsOnCoord = function () {
        return this._dimensionsSummary.dataDimsOnCoord.slice()
    }, jM.mapDimension = function (t, e) {
        var n = this._dimensionsSummary;
        if (null == e) return n.encodeFirstDimNotExtra[t];
        var i = n.encode[t];
        return e === !0 ? (i || []).slice() : i && i[e]
    }, jM.initData = function (t, e, n) {
        var i = Eo.isInstance(t) || d(t);
        i && (t = new ws(t, this.dimensions.length)), this._rawData = t, this._storage = {}, this._indices = null, this._nameList = e || [], this._idList = [], this._nameRepeatCount = {}, n || (this.hasItemOption = !1), this.defaultDimValueGetter = lb[this._rawData.getSource().sourceFormat], this._dimValueGetter = n = n || this.defaultDimValueGetter, this._dimValueGetterArrayRows = lb.arrayRows, this._rawExtent = {}, this._initDataFromProvider(0, t.count()), t.pure && (this.hasItemOption = !1)
    }, jM.getProvider = function () {
        return this._rawData
    }, jM.appendData = function (t) {
        var e = this._rawData, n = this.count();
        e.appendData(t);
        var i = e.count();
        e.persistent || (i += n), this._initDataFromProvider(n, i)
    }, jM.appendValues = function (t, e) {
        for (var n = this._chunkSize, i = this._storage, r = this.dimensions, a = r.length, o = this._rawExtent, s = this.count(), l = s + Math.max(t.length, e ? e.length : 0), u = this._chunkCount, h = 0; a > h; h++) {
            var c = r[h];
            o[c] || (o[c] = Lu()), i[c] || (i[c] = []), Mu(i, this._dimensionInfos[c], n, u, l), this._chunkCount = i[c].length
        }
        for (var d = new Array(a), f = s; l > f; f++) {
            for (var p = f - s, g = Math.floor(f / n), v = f % n, m = 0; a > m; m++) {
                var c = r[m], y = this._dimValueGetterArrayRows(t[p] || d, c, p, m);
                i[c][g][v] = y;
                var x = o[c];
                y < x[0] && (x[0] = y), y > x[1] && (x[1] = y)
            }
            e && (this._nameList[f] = e[p])
        }
        this._rawCount = this._count = l, this._extent = {}, Su(this)
    }, jM._initDataFromProvider = function (t, e) {
        if (!(t >= e)) {
            for (var n, i = this._chunkSize, r = this._rawData, a = this._storage, o = this.dimensions, s = o.length, l = this._dimensionInfos, u = this._nameList, h = this._idList, c = this._rawExtent, d = this._nameRepeatCount = {}, f = this._chunkCount, p = 0; s > p; p++) {
                var g = o[p];
                c[g] || (c[g] = Lu());
                var v = l[g];
                0 === v.otherDims.itemName && (n = this._nameDimIdx = p), 0 === v.otherDims.itemId && (this._idDimIdx = p), a[g] || (a[g] = []), Mu(a, v, i, f, e), this._chunkCount = a[g].length
            }
            for (var m = new Array(s), y = t; e > y; y++) {
                m = r.getItem(y, m);
                for (var x = Math.floor(y / i), _ = y % i, w = 0; s > w; w++) {
                    var g = o[w], b = a[g][x], M = this._dimValueGetter(m, g, y, w);
                    b[_] = M;
                    var S = c[g];
                    M < S[0] && (S[0] = M), M > S[1] && (S[1] = M)
                }
                if (!r.pure) {
                    var I = u[y];
                    if (m && null == I) if (null != m.name) u[y] = I = m.name; else if (null != n) {
                        var T = o[n], C = a[T][x];
                        if (C) {
                            I = C[_];
                            var A = l[T].ordinalMeta;
                            A && A.categories.length && (I = A.categories[I])
                        }
                    }
                    var D = null == m ? null : m.id;
                    null == D && null != I && (d[I] = d[I] || 0, D = I, d[I] > 0 && (D += "__ec__" + d[I]), d[I]++), null != D && (h[y] = D)
                }
            }
            !r.persistent && r.clean && r.clean(), this._rawCount = this._count = e, this._extent = {}, Su(this)
        }
    }, jM.count = function () {
        return this._count
    }, jM.getIndices = function () {
        var t, e = this._indices;
        if (e) {
            var n = e.constructor, i = this._count;
            if (n === Array) {
                t = new n(i);
                for (var r = 0; i > r; r++) t[r] = e[r]
            } else t = new n(e.buffer, 0, i)
        } else for (var n = _u(this), t = new n(this.count()), r = 0; r < t.length; r++) t[r] = r;
        return t
    }, jM.get = function (t, e) {
        if (!(e >= 0 && e < this._count)) return 0 / 0;
        var n = this._storage;
        if (!n[t]) return 0 / 0;
        e = this.getRawIndex(e);
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize, a = n[t][i], o = a[r];
        return o
    }, jM.getByRawIndex = function (t, e) {
        if (!(e >= 0 && e < this._rawCount)) return 0 / 0;
        var n = this._storage[t];
        if (!n) return 0 / 0;
        var i = Math.floor(e / this._chunkSize), r = e % this._chunkSize, a = n[i];
        return a[r]
    }, jM._getFast = function (t, e) {
        var n = Math.floor(e / this._chunkSize), i = e % this._chunkSize, r = this._storage[t][n];
        return r[i]
    }, jM.getValues = function (t, e) {
        var n = [];
        _(t) || (e = t, t = this.dimensions);
        for (var i = 0, r = t.length; r > i; i++) n.push(this.get(t[i], e));
        return n
    }, jM.hasValue = function (t) {
        for (var e = this._dimensionsSummary.dataDimsOnCoord, n = this._dimensionInfos, i = 0, r = e.length; r > i; i++) if ("ordinal" !== n[e[i]].type && isNaN(this.get(e[i], t))) return !1;
        return !0
    }, jM.getDataExtent = function (t) {
        t = this.getDimension(t);
        var e = this._storage[t], n = Lu();
        if (!e) return n;
        var i, r = this.count(), a = !this._indices;
        if (a) return this._rawExtent[t].slice();
        if (i = this._extent[t]) return i.slice();
        i = n;
        for (var o = i[0], s = i[1], l = 0; r > l; l++) {
            var u = this._getFast(t, this.getRawIndex(l));
            o > u && (o = u), u > s && (s = u)
        }
        return i = [o, s], this._extent[t] = i, i
    }, jM.getApproximateExtent = function (t) {
        return t = this.getDimension(t), this._approximateExtent[t] || this.getDataExtent(t)
    }, jM.setApproximateExtent = function (t, e) {
        e = this.getDimension(e), this._approximateExtent[e] = t.slice()
    }, jM.getCalculationInfo = function (t) {
        return this._calculationInfo[t]
    }, jM.setCalculationInfo = function (t, e) {
        BM(t) ? o(this._calculationInfo, t) : this._calculationInfo[t] = e
    }, jM.getSum = function (t) {
        var e = this._storage[t], n = 0;
        if (e) for (var i = 0, r = this.count(); r > i; i++) {
            var a = this.get(t, i);
            isNaN(a) || (n += a)
        }
        return n
    }, jM.getMedian = function (t) {
        var e = [];
        this.each(t, function (t) {
            isNaN(t) || e.push(t)
        });
        var n = [].concat(e).sort(function (t, e) {
            return t - e
        }), i = this.count();
        return 0 === i ? 0 : i % 2 === 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2
    }, jM.rawIndexOf = function (t, e) {
        var n = t && this._invertedIndicesMap[t], i = n[e];
        return null == i || isNaN(i) ? VM : i
    }, jM.indexOfName = function (t) {
        for (var e = 0, n = this.count(); n > e; e++) if (this.getName(e) === t) return e;
        return -1
    }, jM.indexOfRawIndex = function (t) {
        if (!this._indices) return t;
        if (t >= this._rawCount || 0 > t) return -1;
        var e = this._indices, n = e[t];
        if (null != n && n < this._count && n === t) return t;
        for (var i = 0, r = this._count - 1; r >= i;) {
            var a = (i + r) / 2 | 0;
            if (e[a] < t) i = a + 1; else {
                if (!(e[a] > t)) return a;
                r = a - 1
            }
        }
        return -1
    }, jM.indicesOfNearest = function (t, e, n) {
        var i = this._storage, r = i[t], a = [];
        if (!r) return a;
        null == n && (n = 1 / 0);
        for (var o = Number.MAX_VALUE, s = -1, l = 0, u = this.count(); u > l; l++) {
            var h = e - this.get(t, l), c = Math.abs(h);
            n >= h && o >= c && ((o > c || h >= 0 && 0 > s) && (o = c, s = h, a.length = 0), a.push(l))
        }
        return a
    }, jM.getRawIndex = Tu, jM.getRawDataItem = function (t) {
        if (this._rawData.persistent) return this._rawData.getItem(this.getRawIndex(t));
        for (var e = [], n = 0; n < this.dimensions.length; n++) {
            var i = this.dimensions[n];
            e.push(this.get(i, t))
        }
        return e
    }, jM.getName = function (t) {
        var e = this.getRawIndex(t);
        return this._nameList[e] || Iu(this, this._nameDimIdx, e) || ""
    }, jM.getId = function (t) {
        return Au(this, this.getRawIndex(t))
    }, jM.each = function (t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Du(t), this.getDimension, this);
            for (var r = t.length, a = 0; a < this.count(); a++) switch (r) {
                case 0:
                    e.call(n, a);
                    break;
                case 1:
                    e.call(n, this.get(t[0], a), a);
                    break;
                case 2:
                    e.call(n, this.get(t[0], a), this.get(t[1], a), a);
                    break;
                default:
                    for (var o = 0, s = []; r > o; o++) s[o] = this.get(t[o], a);
                    s[o] = a, e.apply(n, s)
            }
        }
    }, jM.filterSelf = function (t, e, n, i) {
        if (this._count) {
            "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this, t = p(Du(t), this.getDimension, this);
            for (var r = this.count(), a = _u(this), o = new a(r), s = [], l = t.length, u = 0, h = t[0], c = 0; r > c; c++) {
                var d, f = this.getRawIndex(c);
                if (0 === l) d = e.call(n, c); else if (1 === l) {
                    var g = this._getFast(h, f);
                    d = e.call(n, g, c)
                } else {
                    for (var v = 0; l > v; v++) s[v] = this._getFast(h, f);
                    s[v] = c, d = e.apply(n, s)
                }
                d && (o[u++] = f)
            }
            return r > u && (this._indices = o), this._count = u, this._extent = {}, this.getRawIndex = this._indices ? Cu : Tu, this
        }
    }, jM.selectRange = function (t) {
        if (this._count) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            var i = e.length;
            if (i) {
                var r = this.count(), a = _u(this), o = new a(r), s = 0, l = e[0], u = t[l][0], h = t[l][1], c = !1;
                if (!this._indices) {
                    var d = 0;
                    if (1 === i) {
                        for (var f = this._storage[e[0]], p = 0; p < this._chunkCount; p++) for (var g = f[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
                            var y = g[m];
                            (y >= u && h >= y || isNaN(y)) && (o[s++] = d), d++
                        }
                        c = !0
                    } else if (2 === i) {
                        for (var f = this._storage[l], x = this._storage[e[1]], _ = t[e[1]][0], w = t[e[1]][1], p = 0; p < this._chunkCount; p++) for (var g = f[p], b = x[p], v = Math.min(this._count - p * this._chunkSize, this._chunkSize), m = 0; v > m; m++) {
                            var y = g[m], M = b[m];
                            (y >= u && h >= y || isNaN(y)) && (M >= _ && w >= M || isNaN(M)) && (o[s++] = d), d++
                        }
                        c = !0
                    }
                }
                if (!c) if (1 === i) for (var m = 0; r > m; m++) {
                    var S = this.getRawIndex(m), y = this._getFast(l, S);
                    (y >= u && h >= y || isNaN(y)) && (o[s++] = S)
                } else for (var m = 0; r > m; m++) {
                    for (var I = !0, S = this.getRawIndex(m), p = 0; i > p; p++) {
                        var T = e[p], y = this._getFast(n, S);
                        (y < t[T][0] || y > t[T][1]) && (I = !1)
                    }
                    I && (o[s++] = this.getRawIndex(m))
                }
                return r > s && (this._indices = o), this._count = s, this._extent = {}, this.getRawIndex = this._indices ? Cu : Tu, this
            }
        }
    }, jM.mapArray = function (t, e, n, i) {
        "function" == typeof t && (i = n, n = e, e = t, t = []), n = n || i || this;
        var r = [];
        return this.each(t, function () {
            r.push(e && e.apply(this, arguments))
        }, n), r
    }, jM.map = function (t, e, n, i) {
        n = n || i || this, t = p(Du(t), this.getDimension, this);
        var r = ku(this, t);
        r._indices = this._indices, r.getRawIndex = r._indices ? Cu : Tu;
        for (var a = r._storage, o = [], s = this._chunkSize, l = t.length, u = this.count(), h = [], c = r._rawExtent, d = 0; u > d; d++) {
            for (var f = 0; l > f; f++) h[f] = this.get(t[f], d);
            h[l] = d;
            var g = e && e.apply(n, h);
            if (null != g) {
                "object" != typeof g && (o[0] = g, g = o);
                for (var v = this.getRawIndex(d), m = Math.floor(v / s), y = v % s, x = 0; x < g.length; x++) {
                    var _ = t[x], w = g[x], b = c[_], M = a[_];
                    M && (M[m][y] = w), w < b[0] && (b[0] = w), w > b[1] && (b[1] = w)
                }
            }
        }
        return r
    }, jM.downSample = function (t, e, n, i) {
        for (var r = ku(this, [t]), a = r._storage, o = [], s = Math.floor(1 / e), l = a[t], u = this.count(), h = this._chunkSize, c = r._rawExtent[t], d = new (_u(this))(u), f = 0, p = 0; u > p; p += s) {
            s > u - p && (s = u - p, o.length = s);
            for (var g = 0; s > g; g++) {
                var v = this.getRawIndex(p + g), m = Math.floor(v / h), y = v % h;
                o[g] = l[m][y]
            }
            var x = n(o), _ = this.getRawIndex(Math.min(p + i(o, x) || 0, u - 1)), w = Math.floor(_ / h), b = _ % h;
            l[w][b] = x, x < c[0] && (c[0] = x), x > c[1] && (c[1] = x), d[f++] = _
        }
        return r._count = f, r._indices = d, r.getRawIndex = Cu, r
    }, jM.getItemModel = function (t) {
        var e = this.hostModel;
        return new Wa(this.getRawDataItem(t), e, e && e.ecModel)
    }, jM.diff = function (t) {
        var e = this;
        return new gu(t ? t.getIndices() : [], this.getIndices(), function (e) {
            return Au(t, e)
        }, function (t) {
            return Au(e, t)
        })
    }, jM.getVisual = function (t) {
        var e = this._visual;
        return e && e[t]
    }, jM.setVisual = function (t, e) {
        if (BM(t)) for (var n in t) t.hasOwnProperty(n) && this.setVisual(n, t[n]); else this._visual = this._visual || {}, this._visual[t] = e
    }, jM.setLayout = function (t, e) {
        if (BM(t)) for (var n in t) t.hasOwnProperty(n) && this.setLayout(n, t[n]); else this._layout[t] = e
    }, jM.getLayout = function (t) {
        return this._layout[t]
    }, jM.getItemLayout = function (t) {
        return this._itemLayouts[t]
    }, jM.setItemLayout = function (t, e, n) {
        this._itemLayouts[t] = n ? o(this._itemLayouts[t] || {}, e) : e
    }, jM.clearItemLayouts = function () {
        this._itemLayouts.length = 0
    }, jM.getItemVisual = function (t, e, n) {
        var i = this._itemVisuals[t], r = i && i[e];
        return null != r || n ? r : this.getVisual(e)
    }, jM.setItemVisual = function (t, e, n) {
        var i = this._itemVisuals[t] || {}, r = this.hasItemVisual;
        if (this._itemVisuals[t] = i, BM(e)) for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a], r[a] = !0); else i[e] = n, r[e] = !0
    }, jM.clearAllVisual = function () {
        this._visual = {}, this._itemVisuals = [], this.hasItemVisual = {}
    };
    var qM = function (t) {
        t.seriesIndex = this.seriesIndex, t.dataIndex = this.dataIndex, t.dataType = this.dataType
    };
    jM.setItemGraphicEl = function (t, e) {
        var n = this.hostModel;
        e && (e.dataIndex = t, e.dataType = this.dataType, e.seriesIndex = n && n.seriesIndex, "group" === e.type && e.traverse(qM, e)), this._graphicEls[t] = e
    }, jM.getItemGraphicEl = function (t) {
        return this._graphicEls[t]
    }, jM.eachItemGraphicEl = function (t, e) {
        f(this._graphicEls, function (n, i) {
            n && t && t.call(e, n, i)
        })
    }, jM.cloneShallow = function (t) {
        if (!t) {
            var e = p(this.dimensions, this.getDimensionInfo, this);
            t = new UM(e, this.hostModel)
        }
        if (t._storage = this._storage, bu(t, this), this._indices) {
            var n = this._indices.constructor;
            t._indices = new n(this._indices)
        } else t._indices = null;
        return t.getRawIndex = t._indices ? Cu : Tu, t
    }, jM.wrapMethod = function (t, e) {
        var n = this[t];
        "function" == typeof n && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function () {
            var t = n.apply(this, arguments);
            return e.apply(this, [t].concat(P(arguments)))
        })
    }, jM.TRANSFERABLE_METHODS = ["cloneShallow", "downSample", "map"], jM.CHANGABLE_METHODS = ["filterSelf", "selectRange"];
    var KM = function (t, e) {
        return e = e || {}, Ou(e.coordDimensions || [], t, {
            dimsDef: e.dimensionsDefine || t.dimensionsDefine,
            encodeDef: e.encodeDefine || t.encodeDefine,
            dimCount: e.dimensionsCount,
            generateCoord: e.generateCoord,
            generateCoordCount: e.generateCoordCount
        })
    };
    Gu.prototype.parse = function (t) {
        return t
    }, Gu.prototype.getSetting = function (t) {
        return this._setting[t]
    }, Gu.prototype.contain = function (t) {
        var e = this._extent;
        return t >= e[0] && t <= e[1]
    }, Gu.prototype.normalize = function (t) {
        var e = this._extent;
        return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0])
    }, Gu.prototype.scale = function (t) {
        var e = this._extent;
        return t * (e[1] - e[0]) + e[0]
    }, Gu.prototype.unionExtent = function (t) {
        var e = this._extent;
        t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1])
    }, Gu.prototype.unionExtentFromData = function (t, e) {
        this.unionExtent(t.getApproximateExtent(e))
    }, Gu.prototype.getExtent = function () {
        return this._extent.slice()
    }, Gu.prototype.setExtent = function (t, e) {
        var n = this._extent;
        isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e)
    }, Gu.prototype.isBlank = function () {
        return this._isBlank
    }, Gu.prototype.setBlank = function (t) {
        this._isBlank = t
    }, Gu.prototype.getLabel = null, er(Gu), ar(Gu, {registerWhenExtend: !0}), Wu.createByAxisModel = function (t) {
        var e = t.option, n = e.data, i = n && p(n, Xu);
        return new Wu({categories: i, needCollect: !i, deduplication: e.dedplication !== !1})
    };
    var $M = Wu.prototype;
    $M.getOrdinal = function (t) {
        return Zu(this).get(t)
    }, $M.parseAndCollect = function (t) {
        var e, n = this._needCollect;
        if ("string" != typeof t && !n) return t;
        if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, e;
        var i = Zu(this);
        return e = i.get(t), null == e && (n ? (e = this.categories.length, this.categories[e] = t, i.set(t, e)) : e = 0 / 0), e
    };
    var QM = Gu.prototype, JM = Gu.extend({
        type: "ordinal", init: function (t, e) {
            (!t || _(t)) && (t = new Wu({categories: t})), this._ordinalMeta = t, this._extent = e || [0, t.categories.length - 1]
        }, parse: function (t) {
            return "string" == typeof t ? this._ordinalMeta.getOrdinal(t) : Math.round(t)
        }, contain: function (t) {
            return t = this.parse(t), QM.contain.call(this, t) && null != this._ordinalMeta.categories[t]
        }, normalize: function (t) {
            return QM.normalize.call(this, this.parse(t))
        }, scale: function (t) {
            return Math.round(QM.scale.call(this, t))
        }, getTicks: function () {
            for (var t = [], e = this._extent, n = e[0]; n <= e[1];) t.push(n), n++;
            return t
        }, getLabel: function (t) {
            return this.isBlank() ? void 0 : this._ordinalMeta.categories[t]
        }, count: function () {
            return this._extent[1] - this._extent[0] + 1
        }, unionExtentFromData: function (t, e) {
            this.unionExtent(t.getApproximateExtent(e))
        }, getOrdinalMeta: function () {
            return this._ordinalMeta
        }, niceTicks: F, niceExtent: F
    });
    JM.create = function () {
        return new JM
    };
    var tS = Qa, eS = Qa, nS = Gu.extend({
        type: "interval", _interval: 0, _intervalPrecision: 2, setExtent: function (t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e))
        }, unionExtent: function (t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), nS.prototype.setExtent.call(this, e[0], e[1])
        }, getInterval: function () {
            return this._interval
        }, setInterval: function (t) {
            this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Uu(t)
        }, getTicks: function () {
            return Ku(this._interval, this._extent, this._niceExtent, this._intervalPrecision)
        }, getLabel: function (t, e) {
            if (null == t) return "";
            var n = e && e.precision;
            return null == n ? n = eo(t) || 0 : "auto" === n && (n = this._intervalPrecision), t = eS(t, n, !0), po(t)
        }, niceTicks: function (t, e, n) {
            t = t || 5;
            var i = this._extent, r = i[1] - i[0];
            if (isFinite(r)) {
                0 > r && (r = -r, i.reverse());
                var a = Yu(i, t, e, n);
                this._intervalPrecision = a.intervalPrecision, this._interval = a.interval, this._niceExtent = a.niceTickExtent
            }
        }, niceExtent: function (t) {
            var e = this._extent;
            if (e[0] === e[1]) if (0 !== e[0]) {
                var n = e[0];
                t.fixMax ? e[0] -= n / 2 : (e[1] += n / 2, e[0] -= n / 2)
            } else e[1] = 1;
            var i = e[1] - e[0];
            isFinite(i) || (e[0] = 0, e[1] = 1), this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var r = this._interval;
            t.fixMin || (e[0] = eS(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = eS(Math.ceil(e[1] / r) * r))
        }
    });
    nS.create = function () {
        return new nS
    };
    var iS = "__ec_stack_", rS = .5, aS = "undefined" != typeof Float32Array ? Float32Array : Array, oS = {
            seriesType: "bar", plan: mb(), reset: function (t) {
                function e(t, e) {
                    for (var n, c = new aS(2 * t.count), d = [], f = [], p = 0; null != (n = t.next());) f[u] = e.get(o, n), f[1 - u] = e.get(s, n), d = i.dataToPoint(f, null, d), c[p++] = d[0], c[p++] = d[1];
                    e.setLayout({largePoints: c, barWidth: h, valueAxisStart: oh(r, a, !1), valueAxisHorizontal: l})
                }

                if (rh(t) && ah(t)) {
                    var n = t.getData(), i = t.coordinateSystem, r = i.getBaseAxis(), a = i.getOtherAxis(r),
                        o = n.mapDimension(a.dim), s = n.mapDimension(r.dim), l = a.isHorizontal(), u = l ? 0 : 1,
                        h = nh(th([t]), r, t).width;
                    return h > rS || (h = rS), {progress: e}
                }
            }
        }, sS = nS.prototype, lS = Math.ceil, uS = Math.floor, hS = 1e3, cS = 60 * hS, dS = 60 * cS, fS = 24 * dS,
        pS = function (t, e, n, i) {
            for (; i > n;) {
                var r = n + i >>> 1;
                t[r][1] < e ? n = r + 1 : i = r
            }
            return n
        }, gS = nS.extend({
            type: "time", getLabel: function (t) {
                var e = this._stepLvl, n = new Date(t);
                return wo(e[0], n, this.getSetting("useUTC"))
            }, niceExtent: function (t) {
                var e = this._extent;
                if (e[0] === e[1] && (e[0] -= fS, e[1] += fS), e[1] === -1 / 0 && 1 / 0 === e[0]) {
                    var n = new Date;
                    e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - fS
                }
                this.niceTicks(t.splitNumber, t.minInterval, t.maxInterval);
                var i = this._interval;
                t.fixMin || (e[0] = Qa(uS(e[0] / i) * i)), t.fixMax || (e[1] = Qa(lS(e[1] / i) * i))
            }, niceTicks: function (t, e, n) {
                t = t || 10;
                var i = this._extent, r = i[1] - i[0], a = r / t;
                null != e && e > a && (a = e), null != n && a > n && (a = n);
                var o = vS.length, s = pS(vS, a, 0, o), l = vS[Math.min(s, o - 1)], u = l[1];
                if ("year" === l[0]) {
                    var h = r / u, c = uo(h / t, !0);
                    u *= c
                }
                var d = this.getSetting("useUTC") ? 0 : 60 * new Date(+i[0] || +i[1]).getTimezoneOffset() * 1e3,
                    f = [Math.round(lS((i[0] - d) / u) * u + d), Math.round(uS((i[1] - d) / u) * u + d)];
                qu(f, i), this._stepLvl = l, this._interval = u, this._niceExtent = f
            }, parse: function (t) {
                return +oo(t)
            }
        });
    f(["contain", "normalize"], function (t) {
        gS.prototype[t] = function (e) {
            return sS[t].call(this, this.parse(e))
        }
    });
    var vS = [["hh:mm:ss", hS], ["hh:mm:ss", 5 * hS], ["hh:mm:ss", 10 * hS], ["hh:mm:ss", 15 * hS], ["hh:mm:ss", 30 * hS], ["hh:mm\nMM-dd", cS], ["hh:mm\nMM-dd", 5 * cS], ["hh:mm\nMM-dd", 10 * cS], ["hh:mm\nMM-dd", 15 * cS], ["hh:mm\nMM-dd", 30 * cS], ["hh:mm\nMM-dd", dS], ["hh:mm\nMM-dd", 2 * dS], ["hh:mm\nMM-dd", 6 * dS], ["hh:mm\nMM-dd", 12 * dS], ["MM-dd\nyyyy", fS], ["MM-dd\nyyyy", 2 * fS], ["MM-dd\nyyyy", 3 * fS], ["MM-dd\nyyyy", 4 * fS], ["MM-dd\nyyyy", 5 * fS], ["MM-dd\nyyyy", 6 * fS], ["week", 7 * fS], ["MM-dd\nyyyy", 10 * fS], ["week", 14 * fS], ["week", 21 * fS], ["month", 31 * fS], ["week", 42 * fS], ["month", 62 * fS], ["week", 70 * fS], ["quarter", 95 * fS], ["month", 31 * fS * 4], ["month", 31 * fS * 5], ["half-year", 380 * fS / 2], ["month", 31 * fS * 8], ["month", 31 * fS * 10], ["year", 380 * fS]];
    gS.create = function (t) {
        return new gS({useUTC: t.ecModel.get("useUTC")})
    };
    var mS = Gu.prototype, yS = nS.prototype, xS = eo, _S = Qa, wS = Math.floor, bS = Math.ceil, MS = Math.pow,
        SS = Math.log, IS = Gu.extend({
            type: "log", base: 10, $constructor: function () {
                Gu.apply(this, arguments), this._originalScale = new nS
            }, getTicks: function () {
                var t = this._originalScale, e = this._extent, n = t.getExtent();
                return p(yS.getTicks.call(this), function (i) {
                    var r = Qa(MS(this.base, i));
                    return r = i === e[0] && t.__fixMin ? sh(r, n[0]) : r, r = i === e[1] && t.__fixMax ? sh(r, n[1]) : r
                }, this)
            }, getLabel: yS.getLabel, scale: function (t) {
                return t = mS.scale.call(this, t), MS(this.base, t)
            }, setExtent: function (t, e) {
                var n = this.base;
                t = SS(t) / SS(n), e = SS(e) / SS(n), yS.setExtent.call(this, t, e)
            }, getExtent: function () {
                var t = this.base, e = mS.getExtent.call(this);
                e[0] = MS(t, e[0]), e[1] = MS(t, e[1]);
                var n = this._originalScale, i = n.getExtent();
                return n.__fixMin && (e[0] = sh(e[0], i[0])), n.__fixMax && (e[1] = sh(e[1], i[1])), e
            }, unionExtent: function (t) {
                this._originalScale.unionExtent(t);
                var e = this.base;
                t[0] = SS(t[0]) / SS(e), t[1] = SS(t[1]) / SS(e), mS.unionExtent.call(this, t)
            }, unionExtentFromData: function (t, e) {
                this.unionExtent(t.getApproximateExtent(e))
            }, niceTicks: function (t) {
                t = t || 10;
                var e = this._extent, n = e[1] - e[0];
                if (!(1 / 0 === n || 0 >= n)) {
                    var i = so(n), r = t / n * i;
                    for (.5 >= r && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0;) i *= 10;
                    var a = [Qa(bS(e[0] / i) * i), Qa(wS(e[1] / i) * i)];
                    this._interval = i, this._niceExtent = a
                }
            }, niceExtent: function (t) {
                yS.niceExtent.call(this, t);
                var e = this._originalScale;
                e.__fixMin = t.fixMin, e.__fixMax = t.fixMax
            }
        });
    f(["contain", "normalize"], function (t) {
        IS.prototype[t] = function (e) {
            return e = SS(e) / SS(this.base), mS[t].call(this, e)
        }
    }), IS.create = function () {
        return new IS
    };
    var TS = {
            getMin: function (t) {
                var e = this.option, n = t || null == e.rangeStart ? e.min : e.rangeStart;
                return this.axis && null != n && "dataMin" !== n && "function" != typeof n && !C(n) && (n = this.axis.scale.parse(n)), n
            }, getMax: function (t) {
                var e = this.option, n = t || null == e.rangeEnd ? e.max : e.rangeEnd;
                return this.axis && null != n && "dataMax" !== n && "function" != typeof n && !C(n) && (n = this.axis.scale.parse(n)), n
            }, getNeedCrossZero: function () {
                var t = this.option;
                return null != t.rangeStart || null != t.rangeEnd ? !1 : !t.scale
            }, getCoordSysModel: F, setRange: function (t, e) {
                this.option.rangeStart = t, this.option.rangeEnd = e
            }, resetRange: function () {
                this.option.rangeStart = this.option.rangeEnd = null
            }
        }, CS = Jr({
            type: "triangle", shape: {cx: 0, cy: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
                t.moveTo(n, i - a), t.lineTo(n + r, i + a), t.lineTo(n - r, i + a), t.closePath()
            }
        }), AS = Jr({
            type: "diamond", shape: {cx: 0, cy: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.cx, i = e.cy, r = e.width / 2, a = e.height / 2;
                t.moveTo(n, i - a), t.lineTo(n + r, i), t.lineTo(n, i + a), t.lineTo(n - r, i), t.closePath()
            }
        }), DS = Jr({
            type: "pin", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.x, i = e.y, r = e.width / 5 * 3, a = Math.max(r, e.height), o = r / 2, s = o * o / (a - o),
                    l = i - a + o + s, u = Math.asin(s / o), h = Math.cos(u) * o, c = Math.sin(u), d = Math.cos(u),
                    f = .6 * o, p = .7 * o;
                t.moveTo(n - h, l + s), t.arc(n, l, o, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * f, l + s + d * f, n, i - p, n, i), t.bezierCurveTo(n, i - p, n - h + c * f, l + s + d * f, n - h, l + s), t.closePath()
            }
        }), kS = Jr({
            type: "arrow", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var n = e.height, i = e.width, r = e.x, a = e.y, o = i / 3 * 2;
                t.moveTo(r, a), t.lineTo(r + o, a + n), t.lineTo(r, a + n / 4 * 3), t.lineTo(r - o, a + n), t.lineTo(r, a), t.closePath()
            }
        }), PS = {line: V_, rect: B_, roundRect: B_, square: B_, circle: T_, diamond: AS, pin: DS, arrow: kS, triangle: CS},
        LS = {
            line: function (t, e, n, i, r) {
                r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2
            }, rect: function (t, e, n, i, r) {
                r.x = t, r.y = e, r.width = n, r.height = i
            }, roundRect: function (t, e, n, i, r) {
                r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4
            }, square: function (t, e, n, i, r) {
                var a = Math.min(n, i);
                r.x = t, r.y = e, r.width = a, r.height = a
            }, circle: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2
            }, diamond: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
            }, pin: function (t, e, n, i, r) {
                r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
            }, arrow: function (t, e, n, i, r) {
                r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i
            }, triangle: function (t, e, n, i, r) {
                r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i
            }
        }, OS = {};
    f(PS, function (t, e) {
        OS[e] = new t
    });
    var zS = Jr({
        type: "symbol", shape: {symbolType: "", x: 0, y: 0, width: 0, height: 0}, beforeBrush: function () {
            var t = this.style, e = this.shape;
            "pin" === e.symbolType && "inside" === t.textPosition && (t.textPosition = ["50%", "40%"], t.textAlign = "center", t.textVerticalAlign = "middle")
        }, buildPath: function (t, e, n) {
            var i = e.symbolType, r = OS[i];
            "none" !== e.symbolType && (r || (i = "rect", r = OS[i]), LS[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n))
        }
    }), ES = {isDimensionStacked: Bu, enableDataStack: Ru, getStackedDimension: Nu}, RS = (Object.freeze || Object)({
        createList: wh,
        getLayoutRect: To,
        dataStack: ES,
        createScale: bh,
        mixinAxisModelCommonMethods: Mh,
        completeDimensions: Ou,
        createDimensions: KM,
        createSymbol: _h
    }), BS = 1e-8;
    Th.prototype = {
        constructor: Th, properties: null, getBoundingRect: function () {
            var t = this._rect;
            if (t) return t;
            for (var e = Number.MAX_VALUE, n = [e, e], i = [-e, -e], r = [], a = [], o = this.geometries, s = 0; s < o.length; s++) if ("polygon" === o[s].type) {
                var l = o[s].exterior;
                _r(l, r, a), oe(n, n, r), se(i, i, a)
            }
            return 0 === s && (n[0] = n[1] = i[0] = i[1] = 0), this._rect = new xn(n[0], n[1], i[0] - n[0], i[1] - n[1])
        }, contain: function (t) {
            var e = this.getBoundingRect(), n = this.geometries;
            if (!e.contain(t[0], t[1])) return !1;
            t:for (var i = 0, r = n.length; r > i; i++) if ("polygon" === n[i].type) {
                var a = n[i].exterior, o = n[i].interiors;
                if (Ih(a, t[0], t[1])) {
                    for (var s = 0; s < (o ? o.length : 0); s++) if (Ih(o[s])) continue t;
                    return !0
                }
            }
            return !1
        }, transformTo: function (t, e, n, i) {
            var r = this.getBoundingRect(), a = r.width / r.height;
            n ? i || (i = n / a) : n = a * i;
            for (var o = new xn(t, e, n, i), s = r.calculateTransform(o), l = this.geometries, u = 0; u < l.length; u++) if ("polygon" === l[u].type) {
                for (var h = l[u].exterior, c = l[u].interiors, d = 0; d < h.length; d++) ae(h[d], h[d], s);
                for (var f = 0; f < (c ? c.length : 0); f++) for (var d = 0; d < c[f].length; d++) ae(c[f][d], c[f][d], s)
            }
            r = this._rect, r.copy(o), this.center = [r.x + r.width / 2, r.y + r.height / 2]
        }, cloneShallow: function (t) {
            null == t && (t = this.name);
            var e = new Th(t, this.geometries, this.center);
            return e._rect = this._rect, e.transformTo = null, e
        }
    };
    var NS = function (t) {
        return Ch(t), p(v(t.features, function (t) {
            return t.geometry && t.properties && t.geometry.coordinates.length > 0
        }), function (t) {
            var e = t.properties, n = t.geometry, i = n.coordinates, r = [];
            "Polygon" === n.type && r.push({
                type: "polygon",
                exterior: i[0],
                interiors: i.slice(1)
            }), "MultiPolygon" === n.type && f(i, function (t) {
                t[0] && r.push({type: "polygon", exterior: t[0], interiors: t.slice(1)})
            });
            var a = new Th(e.name, r, e.cp);
            return a.properties = e, a
        })
    }, VS = Ui(), FS = [0, 1], HS = function (t, e, n) {
        this.dim = t, this.scale = e, this._extent = n || [0, 0], this.inverse = !1, this.onBand = !1
    };
    HS.prototype = {
        constructor: HS, contain: function (t) {
            var e = this._extent, n = Math.min(e[0], e[1]), i = Math.max(e[0], e[1]);
            return t >= n && i >= t
        }, containData: function (t) {
            return this.contain(this.dataToCoord(t))
        }, getExtent: function () {
            return this._extent.slice()
        }, getPixelPrecision: function (t) {
            return no(t || this.scale.getExtent(), this._extent)
        }, setExtent: function (t, e) {
            var n = this._extent;
            n[0] = t, n[1] = e
        }, dataToCoord: function (t, e) {
            var n = this._extent, i = this.scale;
            return t = i.normalize(t), this.onBand && "ordinal" === i.type && (n = n.slice(), Wh(n, i.count())), Ka(t, FS, n, e)
        }, coordToData: function (t, e) {
            var n = this._extent, i = this.scale;
            this.onBand && "ordinal" === i.type && (n = n.slice(), Wh(n, i.count()));
            var r = Ka(t, n, FS, e);
            return this.scale.scale(r)
        }, pointToData: function () {
        }, getTicksCoords: function (t) {
            t = t || {};
            var e = t.tickModel || this.getTickModel(), n = kh(this, e), i = n.ticks, r = p(i, function (t) {
                return {coord: this.dataToCoord(t), tickValue: t}
            }, this), a = e.get("alignWithLabel");
            return Zh(this, r, n.tickCategoryInterval, a, t.clamp), r
        }, getViewLabels: function () {
            return Dh(this).labels
        }, getLabelModel: function () {
            return this.model.getModel("axisLabel")
        }, getTickModel: function () {
            return this.model.getModel("axisTick")
        }, getBandWidth: function () {
            var t = this._extent, e = this.scale.getExtent(), n = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === n && (n = 1);
            var i = Math.abs(t[1] - t[0]);
            return Math.abs(i) / n
        }, isHorizontal: null, getRotate: null, calculateCategoryInterval: function () {
            return Vh(this)
        }
    };
    var GS = NS, WS = {};
    f(["map", "each", "filter", "indexOf", "inherits", "reduce", "filter", "bind", "curry", "isArray", "isString", "isObject", "isFunction", "extend", "defaults", "clone", "merge"], function (t) {
        WS[t] = vm[t]
    });
    var ZS = {};
    f(["extendShape", "extendPath", "makePath", "makeImage", "mergePath", "resizePath", "createIcon", "setHoverStyle", "setLabelStyle", "setTextStyle", "setText", "getFont", "updateProps", "initProps", "getTransform", "clipPointsByRect", "clipRectByRect", "Group", "Image", "Text", "Circle", "Sector", "Ring", "Polygon", "Polyline", "Rect", "Line", "BezierCurve", "Arc", "IncrementalDisplayable", "CompoundPath", "LinearGradient", "RadialGradient", "BoundingRect"], function (t) {
        ZS[t] = nw[t]
    });
    var XS = function (t) {
        this._axes = {}, this._dimList = [], this.name = t || ""
    };
    XS.prototype = {
        constructor: XS, type: "cartesian", getAxis: function (t) {
            return this._axes[t]
        }, getAxes: function () {
            return p(this._dimList, Xh, this)
        }, getAxesByScale: function (t) {
            return t = t.toLowerCase(), v(this.getAxes(), function (e) {
                return e.scale.type === t
            })
        }, addAxis: function (t) {
            var e = t.dim;
            this._axes[e] = t, this._dimList.push(e)
        }, dataToCoord: function (t) {
            return this._dataCoordConvert(t, "dataToCoord")
        }, coordToData: function (t) {
            return this._dataCoordConvert(t, "coordToData")
        }, _dataCoordConvert: function (t, e) {
            for (var n = this._dimList, i = t instanceof Array ? [] : {}, r = 0; r < n.length; r++) {
                var a = n[r], o = this._axes[a];
                i[a] = o[e](t[a])
            }
            return i
        }
    }, Yh.prototype = {
        constructor: Yh, type: "cartesian2d", dimensions: ["x", "y"], getBaseAxis: function () {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x")
        }, containPoint: function (t) {
            var e = this.getAxis("x"), n = this.getAxis("y");
            return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]))
        }, containData: function (t) {
            return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1])
        }, dataToPoint: function (t, e, n) {
            var i = this.getAxis("x"), r = this.getAxis("y");
            return n = n || [], n[0] = i.toGlobalCoord(i.dataToCoord(t[0])), n[1] = r.toGlobalCoord(r.dataToCoord(t[1])), n
        }, clampData: function (t, e) {
            var n = this.getAxis("x").scale, i = this.getAxis("y").scale, r = n.getExtent(), a = i.getExtent(),
                o = n.parse(t[0]), s = i.parse(t[1]);
            return e = e || [], e[0] = Math.min(Math.max(Math.min(r[0], r[1]), o), Math.max(r[0], r[1])), e[1] = Math.min(Math.max(Math.min(a[0], a[1]), s), Math.max(a[0], a[1])), e
        }, pointToData: function (t, e) {
            var n = this.getAxis("x"), i = this.getAxis("y");
            return e = e || [], e[0] = n.coordToData(n.toLocalCoord(t[0])), e[1] = i.coordToData(i.toLocalCoord(t[1])), e
        }, getOtherAxis: function (t) {
            return this.getAxis("x" === t.dim ? "y" : "x")
        }
    }, h(Yh, XS);
    var YS = function (t, e, n, i, r) {
        HS.call(this, t, e, n), this.type = i || "value", this.position = r || "bottom"
    };
    YS.prototype = {
        constructor: YS, index: 0, getAxesOnZeroOf: null, model: null, isHorizontal: function () {
            var t = this.position;
            return "top" === t || "bottom" === t
        }, getGlobalExtent: function (t) {
            var e = this.getExtent();
            return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), e
        }, getOtherAxis: function () {
            this.grid.getOtherAxis()
        }, pointToData: function (t, e) {
            return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e)
        }, toLocalCoord: null, toGlobalCoord: null
    }, h(YS, HS);
    var US = {
        show: !0,
        zlevel: 0,
        z: 0,
        inverse: !1,
        name: "",
        nameLocation: "end",
        nameRotate: null,
        nameTruncate: {maxWidth: null, ellipsis: "...", placeholder: "."},
        nameTextStyle: {},
        nameGap: 15,
        silent: !1,
        triggerEvent: !1,
        tooltip: {show: !1},
        axisPointer: {},
        axisLine: {
            show: !0,
            onZero: !0,
            onZeroAxisIndex: null,
            lineStyle: {color: "#333", width: 1, type: "solid"},
            symbol: ["none", "none"],
            symbolSize: [10, 15]
        },
        axisTick: {show: !0, inside: !1, length: 5, lineStyle: {width: 1}},
        axisLabel: {show: !0, inside: !1, rotate: 0, showMinLabel: null, showMaxLabel: null, margin: 8, fontSize: 12},
        splitLine: {show: !0, lineStyle: {color: ["#ccc"], width: 1, type: "solid"}},
        splitArea: {show: !1, areaStyle: {color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]}}
    }, jS = {};
    jS.categoryAxis = r({
        boundaryGap: !0,
        deduplication: null,
        splitLine: {show: !1},
        axisTick: {alignWithLabel: !1, interval: "auto"},
        axisLabel: {interval: "auto"}
    }, US), jS.valueAxis = r({boundaryGap: [0, 0], splitNumber: 5}, US), jS.timeAxis = s({
        scale: !0,
        min: "dataMin",
        max: "dataMax"
    }, jS.valueAxis), jS.logAxis = s({scale: !0, logBase: 10}, jS.valueAxis);
    var qS = ["value", "category", "time", "log"], KS = function (t, e, n, i) {
        f(qS, function (o) {
            e.extend({
                type: t + "Axis." + o, mergeDefaultAndTheme: function (e, i) {
                    var a = this.layoutMode, s = a ? Do(e) : {}, l = i.getTheme();
                    r(e, l.get(o + "Axis")), r(e, this.getDefaultOption()), e.type = n(t, e), a && Ao(e, s, a)
                }, optionUpdated: function () {
                    var t = this.option;
                    "category" === t.type && (this.__ordinalMeta = Wu.createByAxisModel(this))
                }, getCategories: function (t) {
                    var e = this.option;
                    return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0
                }, getOrdinalMeta: function () {
                    return this.__ordinalMeta
                }, defaultOption: a([{}, jS[o + "Axis"], i], !0)
            })
        }), Cw.registerSubTypeDefaulter(t + "Axis", x(n, t))
    }, $S = Cw.extend({
        type: "cartesian2dAxis", axis: null, init: function () {
            $S.superApply(this, "init", arguments), this.resetRange()
        }, mergeOption: function () {
            $S.superApply(this, "mergeOption", arguments), this.resetRange()
        }, restoreData: function () {
            $S.superApply(this, "restoreData", arguments), this.resetRange()
        }, getCoordSysModel: function () {
            return this.ecModel.queryComponents({
                mainType: "grid",
                index: this.option.gridIndex,
                id: this.option.gridId
            })[0]
        }
    });
    r($S.prototype, TS);
    var QS = {offset: 0};
    KS("x", $S, Uh, QS), KS("y", $S, Uh, QS), Cw.extend({
        type: "grid",
        dependencies: ["xAxis", "yAxis"],
        layoutMode: "box",
        coordinateSystem: null,
        defaultOption: {
            show: !1,
            zlevel: 0,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 60,
            containLabel: !1,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
        }
    });
    var JS = qh.prototype;
    JS.type = "grid", JS.axisPointerEnabled = !0, JS.getRect = function () {
        return this._rect
    }, JS.update = function (t, e) {
        var n = this._axesMap;
        this._updateScale(t, this.model), f(n.x, function (t) {
            hh(t.scale, t.model)
        }), f(n.y, function (t) {
            hh(t.scale, t.model)
        });
        var i = {};
        f(n.x, function (t) {
            Kh(n, "y", t, i)
        }), f(n.y, function (t) {
            Kh(n, "x", t, i)
        }), this.resize(this.model, e)
    }, JS.resize = function (t, e, n) {
        function i() {
            f(a, function (t) {
                var e = t.isHorizontal(), n = e ? [0, r.width] : [0, r.height], i = t.inverse ? 1 : 0;
                t.setExtent(n[i], n[1 - i]), Qh(t, e ? r.x : r.y)
            })
        }

        var r = To(t.getBoxLayoutParams(), {width: e.getWidth(), height: e.getHeight()});
        this._rect = r;
        var a = this._axesList;
        i(), !n && t.get("containLabel") && (f(a, function (t) {
            if (!t.model.get("axisLabel.inside")) {
                var e = gh(t);
                if (e) {
                    var n = t.isHorizontal() ? "height" : "width", i = t.model.get("axisLabel.margin");
                    r[n] -= e[n] + i, "top" === t.position ? r.y += e.height + i : "left" === t.position && (r.x += e.width + i)
                }
            }
        }), i())
    }, JS.getAxis = function (t, e) {
        var n = this._axesMap[t];
        if (null != n) {
            if (null == e) for (var i in n) if (n.hasOwnProperty(i)) return n[i];
            return n[e]
        }
    }, JS.getAxes = function () {
        return this._axesList.slice()
    }, JS.getCartesian = function (t, e) {
        if (null != t && null != e) {
            var n = "x" + t + "y" + e;
            return this._coordsMap[n]
        }
        M(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
        for (var i = 0, r = this._coordsList; i < r.length; i++) if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i]
    }, JS.getCartesians = function () {
        return this._coordsList.slice()
    }, JS.convertToPixel = function (t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null
    }, JS.convertFromPixel = function (t, e, n) {
        var i = this._findConvertTarget(t, e);
        return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null
    }, JS._findConvertTarget = function (t, e) {
        var n, i, r = e.seriesModel, a = e.xAxisModel || r && r.getReferringComponents("xAxis")[0],
            o = e.yAxisModel || r && r.getReferringComponents("yAxis")[0], s = e.gridModel, l = this._coordsList;
        if (r) n = r.coordinateSystem, u(l, n) < 0 && (n = null); else if (a && o) n = this.getCartesian(a.componentIndex, o.componentIndex); else if (a) i = this.getAxis("x", a.componentIndex); else if (o) i = this.getAxis("y", o.componentIndex); else if (s) {
            var h = s.coordinateSystem;
            h === this && (n = this._coordsList[0])
        }
        return {cartesian: n, axis: i}
    }, JS.containPoint = function (t) {
        var e = this._coordsList[0];
        return e ? e.containPoint(t) : void 0
    }, JS._initCartesian = function (t, e) {
        function n(n) {
            return function (o, s) {
                if (jh(o, t, e)) {
                    var l = o.get("position");
                    "x" === n ? "top" !== l && "bottom" !== l && (l = "bottom", i[l] && (l = "top" === l ? "bottom" : "top")) : "left" !== l && "right" !== l && (l = "left", i[l] && (l = "left" === l ? "right" : "left")), i[l] = !0;
                    var u = new YS(n, ch(o), [0, 0], o.get("type"), l), h = "category" === u.type;
                    u.onBand = h && o.get("boundaryGap"), u.inverse = o.get("inverse"), o.axis = u, u.model = o, u.grid = this, u.index = s, this._axesList.push(u), r[n][s] = u, a[n]++
                }
            }
        }

        var i = {left: !1, right: !1, top: !1, bottom: !1}, r = {x: {}, y: {}}, a = {x: 0, y: 0};
        return e.eachComponent("xAxis", n("x"), this), e.eachComponent("yAxis", n("y"), this), a.x && a.y ? (this._axesMap = r, void f(r.x, function (e, n) {
            f(r.y, function (i, r) {
                var a = "x" + n + "y" + r, o = new Yh(a);
                o.grid = this, o.model = t, this._coordsMap[a] = o, this._coordsList.push(o), o.addAxis(e), o.addAxis(i)
            }, this)
        }, this)) : (this._axesMap = {}, void (this._axesList = []))
    }, JS._updateScale = function (t, e) {
        function n(t, e) {
            f(t.mapDimension(e.dim, !0), function (n) {
                e.scale.unionExtentFromData(t, Nu(t, n))
            })
        }

        f(this._axesList, function (t) {
            t.scale.setExtent(1 / 0, -1 / 0)
        }), t.eachSeries(function (i) {
            if (tc(i)) {
                var r = Jh(i, t), a = r[0], o = r[1];
                if (!jh(a, e, t) || !jh(o, e, t)) return;
                var s = this.getCartesian(a.componentIndex, o.componentIndex), l = i.getData(), u = s.getAxis("x"),
                    h = s.getAxis("y");
                "list" === l.type && (n(l, u, i), n(l, h, i))
            }
        }, this)
    }, JS.getTooltipAxes = function (t) {
        var e = [], n = [];
        return f(this.getCartesians(), function (i) {
            var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(), a = i.getOtherAxis(r);
            u(e, r) < 0 && e.push(r), u(n, a) < 0 && n.push(a)
        }), {baseAxes: e, otherAxes: n}
    };
    var tI = ["xAxis", "yAxis"];
    qh.create = function (t, e) {
        var n = [];
        return t.eachComponent("grid", function (i, r) {
            var a = new qh(i, t, e);
            a.name = "grid_" + r, a.resize(i, e, !0), i.coordinateSystem = a, n.push(a)
        }), t.eachSeries(function (e) {
            if (tc(e)) {
                var n = Jh(e, t), i = n[0], r = n[1], a = i.getCoordSysModel(), o = a.coordinateSystem;
                e.coordinateSystem = o.getCartesian(i.componentIndex, r.componentIndex)
            }
        }), n
    }, qh.dimensions = qh.prototype.dimensions = Yh.prototype.dimensions, ns.register("cartesian2d", qh);
    var eI = pb.extend({
        type: "series.__base_bar__",
        getInitialData: function () {
            return Vu(this.getSource(), this)
        },
        getMarkerPosition: function (t) {
            var e = this.coordinateSystem;
            if (e) {
                var n = e.dataToPoint(e.clampData(t)), i = this.getData(), r = i.getLayout("offset"),
                    a = i.getLayout("size"), o = e.getBaseAxis().isHorizontal() ? 0 : 1;
                return n[o] += r + a / 2, n
            }
            return [0 / 0, 0 / 0]
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            barMinHeight: 0,
            barMinAngle: 0,
            large: !1,
            largeThreshold: 400,
            progressive: 3e3,
            progressiveChunkMode: "mod",
            itemStyle: {},
            emphasis: {}
        }
    });
    eI.extend({
        type: "series.bar", dependencies: ["grid", "polar"], brushSelector: "rect", getProgressive: function () {
            return this.get("large") ? this.get("progressive") : !1
        }, getProgressiveThreshold: function () {
            var t = this.get("progressiveThreshold"), e = this.get("largeThreshold");
            return e > t && (t = e), t
        }
    });
    var nI = mx([["fill", "color"], ["stroke", "borderColor"], ["lineWidth", "borderWidth"], ["stroke", "barBorderColor"], ["lineWidth", "barBorderWidth"], ["opacity"], ["shadowBlur"], ["shadowOffsetX"], ["shadowOffsetY"], ["shadowColor"]]),
        iI = {
            getBarItemStyle: function (t) {
                var e = nI(this, t);
                if (this.getBorderLineDash) {
                    var n = this.getBorderLineDash();
                    n && (e.lineDash = n)
                }
                return e
            }
        }, rI = ["itemStyle", "barBorderWidth"];
    o(Wa.prototype, iI), hu({
        type: "bar", render: function (t, e, n) {
            this._updateDrawMode(t);
            var i = t.get("coordinateSystem");
            return ("cartesian2d" === i || "polar" === i) && (this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n)), this.group
        }, incrementalPrepareRender: function (t) {
            this._clear(), this._updateDrawMode(t)
        }, incrementalRender: function (t, e) {
            this._incrementalRenderLarge(t, e)
        }, _updateDrawMode: function (t) {
            var e = t.pipelineContext.large;
            (null == this._isLargeDraw || e ^ this._isLargeDraw) && (this._isLargeDraw = e, this._clear())
        }, _renderNormal: function (t) {
            var e, n = this.group, i = t.getData(), r = this._data, a = t.coordinateSystem, o = a.getBaseAxis();
            "cartesian2d" === a.type ? e = o.isHorizontal() : "polar" === a.type && (e = "angle" === o.dim);
            var s = t.isAnimationEnabled() ? t : null;
            i.diff(r).add(function (r) {
                if (i.hasValue(r)) {
                    var o = i.getItemModel(r), l = oI[a.type](i, r, o), u = aI[a.type](i, r, o, l, e, s);
                    i.setItemGraphicEl(r, u), n.add(u), oc(u, i, r, o, l, t, e, "polar" === a.type)
                }
            }).update(function (o, l) {
                var u = r.getItemGraphicEl(l);
                if (!i.hasValue(o)) return void n.remove(u);
                var h = i.getItemModel(o), c = oI[a.type](i, o, h);
                u ? za(u, {shape: c}, s, o) : u = aI[a.type](i, o, h, c, e, s, !0), i.setItemGraphicEl(o, u), n.add(u), oc(u, i, o, h, c, t, e, "polar" === a.type)
            }).remove(function (t) {
                var e = r.getItemGraphicEl(t);
                "cartesian2d" === a.type ? e && rc(t, s, e) : e && ac(t, s, e)
            }).execute(), this._data = i
        }, _renderLarge: function (t) {
            this._clear(), lc(t, this.group)
        }, _incrementalRenderLarge: function (t, e) {
            lc(e, this.group, !0)
        }, dispose: F, remove: function (t) {
            this._clear(t)
        }, _clear: function (t) {
            var e = this.group, n = this._data;
            t && t.get("animation") && n && !this._isLargeDraw ? n.eachItemGraphicEl(function (e) {
                "sector" === e.type ? ac(e.dataIndex, t, e) : rc(e.dataIndex, t, e)
            }) : e.removeAll(), this._data = null
        }
    });
    var aI = {
        cartesian2d: function (t, e, n, i, r, a, s) {
            var l = new B_({shape: o({}, i)});
            if (a) {
                var u = l.shape, h = r ? "height" : "width", c = {};
                u[h] = 0, c[h] = i[h], nw[s ? "updateProps" : "initProps"](l, {shape: c}, a, e)
            }
            return l
        }, polar: function (t, e, n, i, r, a, o) {
            var l = i.startAngle < i.endAngle, u = new D_({shape: s({clockwise: l}, i)});
            if (a) {
                var h = u.shape, c = r ? "r" : "endAngle", d = {};
                h[c] = r ? 0 : i.startAngle, d[c] = i[c], nw[o ? "updateProps" : "initProps"](u, {shape: d}, a, e)
            }
            return u
        }
    }, oI = {
        cartesian2d: function (t, e, n) {
            var i = t.getItemLayout(e), r = sc(n, i), a = i.width > 0 ? 1 : -1, o = i.height > 0 ? 1 : -1;
            return {x: i.x + a * r / 2, y: i.y + o * r / 2, width: i.width - a * r, height: i.height - o * r}
        }, polar: function (t, e) {
            var n = t.getItemLayout(e);
            return {cx: n.cx, cy: n.cy, r0: n.r0, r: n.r, startAngle: n.startAngle, endAngle: n.endAngle}
        }
    }, sI = Vr.extend({
        type: "largeBar", shape: {points: []}, buildPath: function (t, e) {
            for (var n = e.points, i = this.__startPoint, r = this.__valueIdx, a = 0; a < n.length; a += 2) i[this.__valueIdx] = n[a + r], t.moveTo(i[0], i[1]), t.lineTo(n[a], n[a + 1])
        }
    }), lI = Math.PI, uI = function (t, e) {
        this.opt = e, this.axisModel = t, s(e, {
            labelOffset: 0,
            nameDirection: 1,
            tickDirection: 1,
            labelDirection: 1,
            silent: !0
        }), this.group = new dy;
        var n = new dy({position: e.position.slice(), rotation: e.rotation});
        n.updateTransform(), this._transform = n.transform, this._dumbGroup = n
    };
    uI.prototype = {
        constructor: uI, hasBuilder: function (t) {
            return !!hI[t]
        }, add: function (t) {
            hI[t].call(this)
        }, getGroup: function () {
            return this.group
        }
    };
    var hI = {
        axisLine: function () {
            var t = this.opt, e = this.axisModel;
            if (e.get("axisLine.show")) {
                var n = this.axisModel.axis.getExtent(), i = this._transform, r = [n[0], 0], a = [n[1], 0];
                i && (ae(r, r, i), ae(a, a, i));
                var s = o({lineCap: "round"}, e.getModel("axisLine.lineStyle").getLineStyle());
                this.group.add(new V_(aa({
                    anid: "line",
                    shape: {x1: r[0], y1: r[1], x2: a[0], y2: a[1]},
                    style: s,
                    strokeContainThreshold: t.strokeContainThreshold || 5,
                    silent: !0,
                    z2: 1
                })));
                var l = e.get("axisLine.symbol"), u = e.get("axisLine.symbolSize"),
                    h = e.get("axisLine.symbolOffset") || 0;
                if ("number" == typeof h && (h = [h, h]), null != l) {
                    "string" == typeof l && (l = [l, l]), ("string" == typeof u || "number" == typeof u) && (u = [u, u]);
                    var c = u[0], d = u[1];
                    f([{rotate: t.rotation + Math.PI / 2, offset: h[0], r: 0}, {
                        rotate: t.rotation - Math.PI / 2,
                        offset: h[1],
                        r: Math.sqrt((r[0] - a[0]) * (r[0] - a[0]) + (r[1] - a[1]) * (r[1] - a[1]))
                    }], function (e, n) {
                        if ("none" !== l[n] && null != l[n]) {
                            var i = _h(l[n], -c / 2, -d / 2, c, d, s.stroke, !0), a = e.r + e.offset,
                                o = [r[0] + a * Math.cos(t.rotation), r[1] - a * Math.sin(t.rotation)];
                            i.attr({rotation: e.rotate, position: o, silent: !0, z2: 11}), this.group.add(i)
                        }
                    }, this)
                }
            }
        }, axisTickLabel: function () {
            var t = this.axisModel, e = this.opt, n = mc(this, t, e), i = yc(this, t, e);
            fc(t, i, n)
        }, axisName: function () {
            var t = this.opt, e = this.axisModel, n = A(t.axisName, e.get("name"));
            if (n) {
                var i, r = e.get("nameLocation"), a = t.nameDirection, s = e.getModel("nameTextStyle"),
                    l = e.get("nameGap") || 0, u = this.axisModel.axis.getExtent(), h = u[0] > u[1] ? -1 : 1,
                    c = ["start" === r ? u[0] - h * l : "end" === r ? u[1] + h * l : (u[0] + u[1]) / 2, vc(r) ? t.labelOffset + a * l : 0],
                    d = e.get("nameRotate");
                null != d && (d = d * lI / 180);
                var f;
                vc(r) ? i = cI(t.rotation, null != d ? d : t.rotation, a) : (i = cc(t, r, d || 0, u), f = t.axisNameAvailableWidth, null != f && (f = Math.abs(f / Math.sin(i.rotation)), !isFinite(f) && (f = null)));
                var p = s.getFont(), g = e.get("nameTruncate", !0) || {}, v = g.ellipsis,
                    m = A(t.nameTruncateMaxWidth, g.maxWidth, f),
                    y = null != v && null != m ? xw(n, m, p, v, {minChar: 2, placeholder: g.placeholder}) : n,
                    x = e.get("tooltip", !0), _ = e.mainType, w = {componentType: _, name: n, $vars: ["name"]};
                w[_ + "Index"] = e.componentIndex;
                var b = new I_({
                    anid: "name",
                    __fullText: n,
                    __truncatedText: y,
                    position: c,
                    rotation: i.rotation,
                    silent: dc(e),
                    z2: 1,
                    tooltip: x && x.show ? o({
                        content: n, formatter: function () {
                            return n
                        }, formatterParams: w
                    }, x) : null
                });
                Sa(b.style, s, {
                    text: y,
                    textFont: p,
                    textFill: s.getTextColor() || e.get("axisLine.lineStyle.color"),
                    textAlign: i.textAlign,
                    textVerticalAlign: i.textVerticalAlign
                }), e.get("triggerEvent") && (b.eventData = hc(e), b.eventData.targetType = "axisName", b.eventData.name = n), this._dumbGroup.add(b), b.updateTransform(), this.group.add(b), b.decomposeTransform()
            }
        }
    }, cI = uI.innerTextLayout = function (t, e, n) {
        var i, r, a = ro(e - t);
        return ao(a) ? (r = n > 0 ? "top" : "bottom", i = "center") : ao(a - lI) ? (r = n > 0 ? "bottom" : "top", i = "center") : (r = "middle", i = a > 0 && lI > a ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), {
            rotation: a,
            textAlign: i,
            textVerticalAlign: r
        }
    }, dI = f, fI = x, pI = lu({
        type: "axis", _axisPointer: null, axisPointerClass: null, render: function (t, e, n, i) {
            this.axisPointerClass && Ic(t), pI.superApply(this, "render", arguments), kc(this, t, e, n, i, !0)
        }, updateAxisPointer: function (t, e, n, i) {
            kc(this, t, e, n, i, !1)
        }, remove: function (t, e) {
            var n = this._axisPointer;
            n && n.remove(e), pI.superApply(this, "remove", arguments)
        }, dispose: function (t, e) {
            Pc(this, e), pI.superApply(this, "dispose", arguments)
        }
    }), gI = [];
    pI.registerAxisPointerClass = function (t, e) {
        gI[t] = e
    }, pI.getAxisPointerClass = function (t) {
        return t && gI[t]
    };
    var vI = ["axisLine", "axisTickLabel", "axisName"], mI = ["splitArea", "splitLine"], yI = pI.extend({
        type: "cartesianAxis", axisPointerClass: "CartesianAxisPointer", render: function (t, e, n, i) {
            this.group.removeAll();
            var r = this._axisGroup;
            if (this._axisGroup = new dy, this.group.add(this._axisGroup), t.get("show")) {
                var a = t.getCoordSysModel(), o = Lc(a, t), s = new uI(t, o);
                f(vI, s.add, s), this._axisGroup.add(s.getGroup()), f(mI, function (e) {
                    t.get(e + ".show") && this["_" + e](t, a)
                }, this), Va(r, this._axisGroup, t), yI.superCall(this, "render", t, e, n, i)
            }
        }, remove: function () {
            this._splitAreaColors = null
        }, _splitLine: function (t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitLine"), r = i.getModel("lineStyle"), a = r.get("color");
                a = _(a) ? a : [a];
                for (var o = e.coordinateSystem.getRect(), l = n.isHorizontal(), u = 0, h = n.getTicksCoords({tickModel: i}), c = [], d = [], f = r.getLineStyle(), p = 0; p < h.length; p++) {
                    var g = n.toGlobalCoord(h[p].coord);
                    l ? (c[0] = g, c[1] = o.y, d[0] = g, d[1] = o.y + o.height) : (c[0] = o.x, c[1] = g, d[0] = o.x + o.width, d[1] = g);
                    var v = u++ % a.length, m = h[p].tickValue;
                    this._axisGroup.add(new V_(aa({
                        anid: null != m ? "line_" + h[p].tickValue : null,
                        shape: {x1: c[0], y1: c[1], x2: d[0], y2: d[1]},
                        style: s({stroke: a[v]}, f),
                        silent: !0
                    })))
                }
            }
        }, _splitArea: function (t, e) {
            var n = t.axis;
            if (!n.scale.isBlank()) {
                var i = t.getModel("splitArea"), r = i.getModel("areaStyle"), a = r.get("color"),
                    o = e.coordinateSystem.getRect(), l = n.getTicksCoords({tickModel: i, clamp: !0});
                if (l.length) {
                    var u = a.length, h = this._splitAreaColors, c = N(), d = 0;
                    if (h) for (var f = 0; f < l.length; f++) {
                        var p = h.get(l[f].tickValue);
                        if (null != p) {
                            d = (p + (u - 1) * f) % u;
                            break
                        }
                    }
                    var g = n.toGlobalCoord(l[0].coord), v = r.getAreaStyle();
                    a = _(a) ? a : [a];
                    for (var f = 1; f < l.length; f++) {
                        var m, y, x, w, b = n.toGlobalCoord(l[f].coord);
                        n.isHorizontal() ? (m = g, y = o.y, x = b - m, w = o.height, g = m + x) : (m = o.x, y = g, x = o.width, w = b - y, g = y + w);
                        var M = l[f - 1].tickValue;
                        null != M && c.set(M, d), this._axisGroup.add(new B_({
                            anid: null != M ? "area_" + M : null,
                            shape: {x: m, y: y, width: x, height: w},
                            style: s({fill: a[d]}, v),
                            silent: !0
                        })), d = (d + 1) % u
                    }
                    this._splitAreaColors = c
                }
            }
        }
    });
    yI.extend({type: "xAxis"}), yI.extend({type: "yAxis"}), lu({
        type: "grid", render: function (t) {
            this.group.removeAll(), t.get("show") && this.group.add(new B_({
                shape: t.coordinateSystem.getRect(),
                style: s({fill: t.get("backgroundColor")}, t.getItemStyle()),
                silent: !0,
                z2: -1
            }))
        }
    }), $l(function (t) {
        t.xAxis && t.yAxis && !t.grid && (t.grid = {})
    }), iu(x(ih, "bar")), iu(oS), ru({
        seriesType: "bar", reset: function (t) {
            t.getData().setVisual("legendSymbol", "roundRect")
        }
    }), pb.extend({
        type: "series.line",
        dependencies: ["grid", "polar"],
        getInitialData: function () {
            return Vu(this.getSource(), this)
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            hoverAnimation: !0,
            clipOverflow: !0,
            label: {position: "top"},
            lineStyle: {width: 2, type: "solid"},
            step: !1,
            smooth: !1,
            smoothMonotone: null,
            symbol: "emptyCircle",
            symbolSize: 4,
            symbolRotate: null,
            showSymbol: !0,
            showAllSymbol: "auto",
            connectNulls: !1,
            sampling: "none",
            animationEasing: "linear",
            progressive: 0,
            hoverLayerThreshold: 1 / 0
        }
    });
    var xI = Oc.prototype, _I = Oc.getSymbolSize = function (t, e) {
        var n = t.getItemVisual(e, "symbolSize");
        return n instanceof Array ? n.slice() : [+n, +n]
    };
    xI._createSymbol = function (t, e, n, i, r) {
        this.removeAll();
        var a = e.getItemVisual(n, "color"), o = _h(t, -1, -1, 2, 2, a, r);
        o.attr({z2: 100, culling: !0, scale: zc(i)}), o.drift = Ec, this._symbolType = t, this.add(o)
    }, xI.stopSymbolAnimation = function (t) {
        this.childAt(0).stopAnimation(t)
    }, xI.getSymbolPath = function () {
        return this.childAt(0)
    }, xI.getScale = function () {
        return this.childAt(0).scale
    }, xI.highlight = function () {
        this.childAt(0).trigger("emphasis")
    }, xI.downplay = function () {
        this.childAt(0).trigger("normal")
    }, xI.setZ = function (t, e) {
        var n = this.childAt(0);
        n.zlevel = t, n.z = e
    }, xI.setDraggable = function (t) {
        var e = this.childAt(0);
        e.draggable = t, e.cursor = t ? "move" : "pointer"
    }, xI.updateData = function (t, e, n) {
        this.silent = !1;
        var i = t.getItemVisual(e, "symbol") || "circle", r = t.hostModel, a = _I(t, e), o = i !== this._symbolType;
        if (o) {
            var s = t.getItemVisual(e, "symbolKeepAspect");
            this._createSymbol(i, t, e, a, s)
        } else {
            var l = this.childAt(0);
            l.silent = !1, za(l, {scale: zc(a)}, r, e)
        }
        if (this._updateCommon(t, e, a, n), o) {
            var l = this.childAt(0), u = n && n.fadeIn, h = {scale: l.scale.slice()};
            u && (h.style = {opacity: l.style.opacity}), l.scale = [0, 0], u && (l.style.opacity = 0), Ea(l, h, r, e)
        }
        this._seriesModel = r
    };
    var wI = ["itemStyle"], bI = ["emphasis", "itemStyle"], MI = ["label"], SI = ["emphasis", "label"];
    xI._updateCommon = function (t, e, n, i) {
        function r(e) {
            return b ? t.getName(e) : ec(t, e)
        }

        var a = this.childAt(0), s = t.hostModel, l = t.getItemVisual(e, "color");
        "image" !== a.type && a.useStyle({strokeNoScale: !0});
        var u = i && i.itemStyle, h = i && i.hoverItemStyle, c = i && i.symbolRotate, d = i && i.symbolOffset,
            f = i && i.labelModel, p = i && i.hoverLabelModel, g = i && i.hoverAnimation, v = i && i.cursorStyle;
        if (!i || t.hasItemOption) {
            var m = i && i.itemModel ? i.itemModel : t.getItemModel(e);
            u = m.getModel(wI).getItemStyle(["color"]), h = m.getModel(bI).getItemStyle(), c = m.getShallow("symbolRotate"), d = m.getShallow("symbolOffset"), f = m.getModel(MI), p = m.getModel(SI), g = m.getShallow("hoverAnimation"), v = m.getShallow("cursor")
        } else h = o({}, h);
        var y = a.style;
        a.attr("rotation", (c || 0) * Math.PI / 180 || 0), d && a.attr("position", [$a(d[0], n[0]), $a(d[1], n[1])]), v && a.attr("cursor", v), a.setColor(l, i && i.symbolInnerColor), a.setStyle(u);
        var x = t.getItemVisual(e, "opacity");
        null != x && (y.opacity = x);
        var _ = t.getItemVisual(e, "liftZ"), w = a.__z2Origin;
        null != _ ? null == w && (a.__z2Origin = a.z2, a.z2 += _) : null != w && (a.z2 = w, a.__z2Origin = null);
        var b = i && i.useNameLabel;
        Ma(y, h, f, p, {
            labelFetcher: s,
            labelDataIndex: e,
            defaultText: r,
            isRectText: !0,
            autoColor: l
        }), a.off("mouseover").off("mouseout").off("emphasis").off("normal"), a.hoverStyle = h, wa(a), a.__symbolOriginalScale = zc(n), g && s.isAnimationEnabled() && a.on("mouseover", Rc).on("mouseout", Bc).on("emphasis", Nc).on("normal", Vc)
    }, xI.fadeOut = function (t, e) {
        var n = this.childAt(0);
        this.silent = n.silent = !0, !(e && e.keepLabel) && (n.style.text = null), za(n, {
            style: {opacity: 0},
            scale: [0, 0]
        }, this._seriesModel, this.dataIndex, t)
    }, h(Oc, dy);
    var II = Fc.prototype;
    II.updateData = function (t, e) {
        e = Gc(e);
        var n = this.group, i = t.hostModel, r = this._data, a = this._symbolCtor, o = Wc(t);
        r || n.removeAll(), t.diff(r).add(function (i) {
            var r = t.getItemLayout(i);
            if (Hc(t, r, i, e)) {
                var s = new a(t, i, o);
                s.attr("position", r), t.setItemGraphicEl(i, s), n.add(s)
            }
        }).update(function (s, l) {
            var u = r.getItemGraphicEl(l), h = t.getItemLayout(s);
            return Hc(t, h, s, e) ? (u ? (u.updateData(t, s, o), za(u, {position: h}, i)) : (u = new a(t, s), u.attr("position", h)), n.add(u), void t.setItemGraphicEl(s, u)) : void n.remove(u)
        }).remove(function (t) {
            var e = r.getItemGraphicEl(t);
            e && e.fadeOut(function () {
                n.remove(e)
            })
        }).execute(), this._data = t
    }, II.isPersistent = function () {
        return !0
    }, II.updateLayout = function () {
        var t = this._data;
        t && t.eachItemGraphicEl(function (e, n) {
            var i = t.getItemLayout(n);
            e.attr("position", i)
        })
    }, II.incrementalPrepareUpdate = function (t) {
        this._seriesScope = Wc(t), this._data = null, this.group.removeAll()
    }, II.incrementalUpdate = function (t, e, n) {
        function i(t) {
            t.isGroup || (t.incremental = t.useHoverLayer = !0)
        }

        n = Gc(n);
        for (var r = t.start; r < t.end; r++) {
            var a = e.getItemLayout(r);
            if (Hc(e, a, r, n)) {
                var o = new this._symbolCtor(e, r, this._seriesScope);
                o.traverse(i), o.attr("position", a), this.group.add(o), e.setItemGraphicEl(r, o)
            }
        }
    }, II.remove = function (t) {
        var e = this.group, n = this._data;
        n && t ? n.eachItemGraphicEl(function (t) {
            t.fadeOut(function () {
                e.remove(t)
            })
        }) : e.removeAll()
    };
    var TI = function (t, e, n, i, r, a, o, s) {
        for (var l = Uc(t, e), u = [], h = [], c = [], d = [], f = [], p = [], g = [], v = Zc(r, e, o), m = Zc(a, t, s), y = 0; y < l.length; y++) {
            var x = l[y], _ = !0;
            switch (x.cmd) {
                case"=":
                    var w = t.getItemLayout(x.idx), b = e.getItemLayout(x.idx1);
                    (isNaN(w[0]) || isNaN(w[1])) && (w = b.slice()), u.push(w), h.push(b), c.push(n[x.idx]), d.push(i[x.idx1]), g.push(e.getRawIndex(x.idx1));
                    break;
                case"+":
                    var M = x.idx;
                    u.push(r.dataToPoint([e.get(v.dataDimsForPoint[0], M), e.get(v.dataDimsForPoint[1], M)])), h.push(e.getItemLayout(M).slice()), c.push(Yc(v, r, e, M)), d.push(i[M]), g.push(e.getRawIndex(M));
                    break;
                case"-":
                    var M = x.idx, S = t.getRawIndex(M);
                    S !== M ? (u.push(t.getItemLayout(M)), h.push(a.dataToPoint([t.get(m.dataDimsForPoint[0], M), t.get(m.dataDimsForPoint[1], M)])), c.push(n[M]), d.push(Yc(m, a, t, M)), g.push(S)) : _ = !1
            }
            _ && (f.push(x), p.push(p.length))
        }
        p.sort(function (t, e) {
            return g[t] - g[e]
        });
        for (var I = [], T = [], C = [], A = [], D = [], y = 0; y < p.length; y++) {
            var M = p[y];
            I[y] = u[M], T[y] = h[M], C[y] = c[M], A[y] = d[M], D[y] = f[M]
        }
        return {current: I, next: T, stackedOnCurrent: C, stackedOnNext: A, status: D}
    }, CI = oe, AI = se, DI = Y, kI = G, PI = [], LI = [], OI = [], zI = Vr.extend({
        type: "ec-polyline",
        shape: {points: [], smooth: 0, smoothConstraint: !0, smoothMonotone: null, connectNulls: !1},
        style: {fill: null, stroke: "#000"},
        brush: A_(Vr.prototype.brush),
        buildPath: function (t, e) {
            var n = e.points, i = 0, r = n.length, a = Qc(n, e.smoothConstraint);
            if (e.connectNulls) {
                for (; r > 0 && jc(n[r - 1]); r--) ;
                for (; r > i && jc(n[i]); i++) ;
            }
            for (; r > i;) i += qc(t, n, i, r, r, 1, a.min, a.max, e.smooth, e.smoothMonotone, e.connectNulls) + 1
        }
    }), EI = Vr.extend({
        type: "ec-polygon",
        shape: {
            points: [],
            stackedOnPoints: [],
            smooth: 0,
            stackedOnSmooth: 0,
            smoothConstraint: !0,
            smoothMonotone: null,
            connectNulls: !1
        },
        brush: A_(Vr.prototype.brush),
        buildPath: function (t, e) {
            var n = e.points, i = e.stackedOnPoints, r = 0, a = n.length, o = e.smoothMonotone,
                s = Qc(n, e.smoothConstraint), l = Qc(i, e.smoothConstraint);
            if (e.connectNulls) {
                for (; a > 0 && jc(n[a - 1]); a--) ;
                for (; a > r && jc(n[r]); r++) ;
            }
            for (; a > r;) {
                var u = qc(t, n, r, a, a, 1, s.min, s.max, e.smooth, o, e.connectNulls);
                qc(t, i, r + u - 1, u, a, -1, l.min, l.max, e.stackedOnSmooth, o, e.connectNulls), r += u + 1, t.closePath()
            }
        }
    });
    Gs.extend({
        type: "line", init: function () {
            var t = new dy, e = new Fc;
            this.group.add(e.group), this._symbolDraw = e, this._lineGroup = t
        }, render: function (t, e, n) {
            var i = t.coordinateSystem, r = this.group, a = t.getData(), o = t.getModel("lineStyle"),
                l = t.getModel("areaStyle"), u = a.mapArray(a.getItemLayout), h = "polar" === i.type,
                c = this._coordSys, d = this._symbolDraw, f = this._polyline, p = this._polygon, g = this._lineGroup,
                v = t.get("animation"), m = !l.isEmpty(), y = l.get("origin"), x = Zc(i, a, y), _ = nd(i, a, x),
                w = t.get("showSymbol"), b = w && !h && ld(t, a, i), M = this._data;
            M && M.eachItemGraphicEl(function (t, e) {
                t.__temp && (r.remove(t), M.setItemGraphicEl(e, null))
            }), w || d.remove(), r.add(g);
            var S = !h && t.get("step");
            f && c.type === i.type && S === this._step ? (m && !p ? p = this._newPolygon(u, _, i, v) : p && !m && (g.remove(p), p = this._polygon = null), g.setClipPath(ad(i, !1, !1, t)), w && d.updateData(a, {
                isIgnore: b,
                clipShape: ad(i, !1, !0, t)
            }), a.eachItemGraphicEl(function (t) {
                t.stopAnimation(!0)
            }), Jc(this._stackedOnPoints, _) && Jc(this._points, u) || (v ? this._updateAnimation(a, _, i, n, S, y) : (S && (u = od(u, i, S), _ = od(_, i, S)), f.setShape({points: u}), p && p.setShape({
                points: u,
                stackedOnPoints: _
            })))) : (w && d.updateData(a, {
                isIgnore: b,
                clipShape: ad(i, !1, !0, t)
            }), S && (u = od(u, i, S), _ = od(_, i, S)), f = this._newPolyline(u, i, v), m && (p = this._newPolygon(u, _, i, v)), g.setClipPath(ad(i, !0, !1, t)));
            var I = sd(a, i) || a.getVisual("color");
            f.useStyle(s(o.getLineStyle(), {fill: "none", stroke: I, lineJoin: "bevel"}));
            var T = t.get("smooth");
            if (T = td(t.get("smooth")), f.setShape({
                smooth: T,
                smoothMonotone: t.get("smoothMonotone"),
                connectNulls: t.get("connectNulls")
            }), p) {
                var C = a.getCalculationInfo("stackedOnSeries"), A = 0;
                p.useStyle(s(l.getAreaStyle(), {
                    fill: I,
                    opacity: .7,
                    lineJoin: "bevel"
                })), C && (A = td(C.get("smooth"))), p.setShape({
                    smooth: T,
                    stackedOnSmooth: A,
                    smoothMonotone: t.get("smoothMonotone"),
                    connectNulls: t.get("connectNulls")
                })
            }
            this._data = a, this._coordSys = i, this._stackedOnPoints = _, this._points = u, this._step = S, this._valueOrigin = y
        }, dispose: function () {
        }, highlight: function (t, e, n, i) {
            var r = t.getData(), a = Yi(r, i);
            if (!(a instanceof Array) && null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                if (!o) {
                    var s = r.getItemLayout(a);
                    if (!s) return;
                    o = new Oc(r, a), o.position = s, o.setZ(t.get("zlevel"), t.get("z")), o.ignore = isNaN(s[0]) || isNaN(s[1]), o.__temp = !0, r.setItemGraphicEl(a, o), o.stopSymbolAnimation(!0), this.group.add(o)
                }
                o.highlight()
            } else Gs.prototype.highlight.call(this, t, e, n, i)
        }, downplay: function (t, e, n, i) {
            var r = t.getData(), a = Yi(r, i);
            if (null != a && a >= 0) {
                var o = r.getItemGraphicEl(a);
                o && (o.__temp ? (r.setItemGraphicEl(a, null), this.group.remove(o)) : o.downplay())
            } else Gs.prototype.downplay.call(this, t, e, n, i)
        }, _newPolyline: function (t) {
            var e = this._polyline;
            return e && this._lineGroup.remove(e), e = new zI({
                shape: {points: t},
                silent: !0,
                z2: 10
            }), this._lineGroup.add(e), this._polyline = e, e
        }, _newPolygon: function (t, e) {
            var n = this._polygon;
            return n && this._lineGroup.remove(n), n = new EI({
                shape: {points: t, stackedOnPoints: e},
                silent: !0
            }), this._lineGroup.add(n), this._polygon = n, n
        }, _updateAnimation: function (t, e, n, i, r, a) {
            var o = this._polyline, s = this._polygon, l = t.hostModel,
                u = TI(this._data, t, this._stackedOnPoints, e, this._coordSys, n, this._valueOrigin, a), h = u.current,
                c = u.stackedOnCurrent, d = u.next, f = u.stackedOnNext;
            r && (h = od(u.current, n, r), c = od(u.stackedOnCurrent, n, r), d = od(u.next, n, r), f = od(u.stackedOnNext, n, r)), o.shape.__points = u.current, o.shape.points = h, za(o, {shape: {points: d}}, l), s && (s.setShape({
                points: h,
                stackedOnPoints: c
            }), za(s, {shape: {points: d, stackedOnPoints: f}}, l));
            for (var p = [], g = u.status, v = 0; v < g.length; v++) {
                var m = g[v].cmd;
                if ("=" === m) {
                    var y = t.getItemGraphicEl(g[v].idx1);
                    y && p.push({el: y, ptIdx: v})
                }
            }
            o.animators && o.animators.length && o.animators[0].during(function () {
                for (var t = 0; t < p.length; t++) {
                    var e = p[t].el;
                    e.attr("position", o.shape.__points[p[t].ptIdx])
                }
            })
        }, remove: function () {
            var t = this.group, e = this._data;
            this._lineGroup.removeAll(), this._symbolDraw.remove(!0), e && e.eachItemGraphicEl(function (n, i) {
                n.__temp && (t.remove(n), e.setItemGraphicEl(i, null))
            }), this._polyline = this._polygon = this._coordSys = this._points = this._stackedOnPoints = this._data = null
        }
    });
    var RI = function (t, e, n) {
        return {
            seriesType: t, performRawSeries: !0, reset: function (t, i) {
                function r(e, n) {
                    if ("function" == typeof s) {
                        var i = t.getRawValue(n), r = t.getDataParams(n);
                        e.setItemVisual(n, "symbolSize", s(i, r))
                    }
                    if (e.hasItemOption) {
                        var a = e.getItemModel(n), o = a.getShallow("symbol", !0), l = a.getShallow("symbolSize", !0),
                            u = a.getShallow("symbolKeepAspect", !0);
                        null != o && e.setItemVisual(n, "symbol", o), null != l && e.setItemVisual(n, "symbolSize", l), null != u && e.setItemVisual(n, "symbolKeepAspect", u)
                    }
                }

                var a = t.getData(), o = t.get("symbol") || e, s = t.get("symbolSize"), l = t.get("symbolKeepAspect");
                if (a.setVisual({
                    legendSymbol: n || o,
                    symbol: o,
                    symbolSize: s,
                    symbolKeepAspect: l
                }), !i.isSeriesFiltered(t)) {
                    var u = "function" == typeof s;
                    return {dataEach: a.hasItemOption || u ? r : null}
                }
            }
        }
    }, BI = function (t) {
        return {
            seriesType: t, plan: mb(), reset: function (t) {
                function e(t, e) {
                    for (var n = t.end - t.start, r = a && new Float32Array(n * s), l = t.start, u = 0, h = [], c = []; l < t.end; l++) {
                        var d;
                        if (1 === s) {
                            var f = e.get(o[0], l);
                            d = !isNaN(f) && i.dataToPoint(f, null, c)
                        } else {
                            var f = h[0] = e.get(o[0], l), p = h[1] = e.get(o[1], l);
                            d = !isNaN(f) && !isNaN(p) && i.dataToPoint(h, null, c)
                        }
                        a ? (r[u++] = d ? d[0] : 0 / 0, r[u++] = d ? d[1] : 0 / 0) : e.setItemLayout(l, d && d.slice() || [0 / 0, 0 / 0])
                    }
                    a && e.setLayout("symbolPoints", r)
                }

                var n = t.getData(), i = t.coordinateSystem, r = t.pipelineContext, a = r.large;
                if (i) {
                    var o = p(i.dimensions, function (t) {
                        return n.mapDimension(t)
                    }).slice(0, 2), s = o.length, l = n.getCalculationInfo("stackResultDimension");
                    return Bu(n, o[0]) && (o[0] = l), Bu(n, o[1]) && (o[1] = l), s && {progress: e}
                }
            }
        }
    }, NI = {
        average: function (t) {
            for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
            return 0 === n ? 0 / 0 : e / n
        }, sum: function (t) {
            for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
            return e
        }, max: function (t) {
            for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
            return isFinite(e) ? e : 0 / 0
        }, min: function (t) {
            for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
            return isFinite(e) ? e : 0 / 0
        }, nearest: function (t) {
            return t[0]
        }
    }, VI = function (t) {
        return Math.round(t.length / 2)
    }, FI = function (t) {
        return {
            seriesType: t, modifyOutputEnd: !0, reset: function (t) {
                var e = t.getData(), n = t.get("sampling"), i = t.coordinateSystem;
                if ("cartesian2d" === i.type && n) {
                    var r = i.getBaseAxis(), a = i.getOtherAxis(r), o = r.getExtent(), s = o[1] - o[0],
                        l = Math.round(e.count() / s);
                    if (l > 1) {
                        var u;
                        "string" == typeof n ? u = NI[n] : "function" == typeof n && (u = n), u && t.setData(e.downSample(e.mapDimension(a.dim), 1 / l, u, VI))
                    }
                }
            }
        }
    };
    ru(RI("line", "circle", "line")), iu(BI("line")), Ql(pM.PROCESSOR.STATISTIC, FI("line"));
    var HI = function (t, e, n) {
        e = _(e) && {coordDimensions: e} || o({}, e);
        var i = t.getSource(), r = KM(i, e), a = new UM(r, t);
        return a.initData(i, n), a
    }, GI = {
        updateSelectedMap: function (t) {
            this._targetList = _(t) ? t.slice() : [], this._selectTargetMap = g(t || [], function (t, e) {
                return t.set(e.name, e), t
            }, N())
        }, select: function (t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t), i = this.get("selectedMode");
            "single" === i && this._selectTargetMap.each(function (t) {
                t.selected = !1
            }), n && (n.selected = !0)
        }, unSelect: function (t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            n && (n.selected = !1)
        }, toggleSelected: function (t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return null != n ? (this[n.selected ? "unSelect" : "select"](t, e), n.selected) : void 0
        }, isSelected: function (t, e) {
            var n = null != e ? this._targetList[e] : this._selectTargetMap.get(t);
            return n && n.selected
        }
    }, WI = uu({
        type: "series.pie",
        init: function (t) {
            WI.superApply(this, "init", arguments), this.legendDataProvider = function () {
                return this.getRawData()
            }, this.updateSelectedMap(this._createSelectableList()), this._defaultLabelLine(t)
        },
        mergeOption: function (t) {
            WI.superCall(this, "mergeOption", t), this.updateSelectedMap(this._createSelectableList())
        },
        getInitialData: function () {
            return HI(this, ["value"])
        },
        _createSelectableList: function () {
            for (var t = this.getRawData(), e = t.mapDimension("value"), n = [], i = 0, r = t.count(); r > i; i++) n.push({
                name: t.getName(i),
                value: t.get(e, i),
                selected: Ds(t, i, "selected")
            });
            return n
        },
        getDataParams: function (t) {
            var e = this.getData(), n = WI.superCall(this, "getDataParams", t), i = [];
            return e.each(e.mapDimension("value"), function (t) {
                i.push(t)
            }), n.percent = io(i, t, e.hostModel.get("percentPrecision")), n.$vars.push("percent"), n
        },
        _defaultLabelLine: function (t) {
            Ni(t, "labelLine", ["show"]);
            var e = t.labelLine, n = t.emphasis.labelLine;
            e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            hoverAnimation: !0,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            selectedOffset: 10,
            hoverOffset: 10,
            avoidLabelOverlap: !0,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            label: {rotate: !1, show: !0, position: "outer"},
            labelLine: {show: !0, length: 15, length2: 15, smooth: !1, lineStyle: {width: 1, type: "solid"}},
            itemStyle: {borderWidth: 1},
            animationType: "expansion",
            animationEasing: "cubicOut"
        }
    });
    c(WI, GI);
    var ZI = dd.prototype;
    ZI.updateData = function (t, e, n) {
        function i() {
            a.stopAnimation(!0), a.animateTo({shape: {r: h.r + l.get("hoverOffset")}}, 300, "elasticOut")
        }

        function r() {
            a.stopAnimation(!0), a.animateTo({shape: {r: h.r}}, 300, "elasticOut")
        }

        var a = this.childAt(0), l = t.hostModel, u = t.getItemModel(e), h = t.getItemLayout(e), c = o({}, h);
        if (c.label = null, n) {
            a.setShape(c);
            var d = l.getShallow("animationType");
            "scale" === d ? (a.shape.r = h.r0, Ea(a, {shape: {r: h.r}}, l, e)) : (a.shape.endAngle = h.startAngle, za(a, {shape: {endAngle: h.endAngle}}, l, e))
        } else za(a, {shape: c}, l, e);
        var f = t.getItemVisual(e, "color");
        a.useStyle(s({
            lineJoin: "bevel",
            fill: f
        }, u.getModel("itemStyle").getItemStyle())), a.hoverStyle = u.getModel("emphasis.itemStyle").getItemStyle();
        var p = u.getShallow("cursor");
        p && a.attr("cursor", p), cd(this, t.getItemLayout(e), l.isSelected(null, e), l.get("selectedOffset"), l.get("animation")), a.off("mouseover").off("mouseout").off("emphasis").off("normal"), u.get("hoverAnimation") && l.isAnimationEnabled() && a.on("mouseover", i).on("mouseout", r).on("emphasis", i).on("normal", r), this._updateLabel(t, e), wa(this)
    }, ZI._updateLabel = function (t, e) {
        var n = this.childAt(1), i = this.childAt(2), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e),
            s = o.label, l = t.getItemVisual(e, "color");
        za(n, {shape: {points: s.linePoints || [[s.x, s.y], [s.x, s.y], [s.x, s.y]]}}, r, e), za(i, {
            style: {
                x: s.x,
                y: s.y
            }
        }, r, e), i.attr({rotation: s.rotation, origin: [s.x, s.y], z2: 10});
        var u = a.getModel("label"), h = a.getModel("emphasis.label"), c = a.getModel("labelLine"),
            d = a.getModel("emphasis.labelLine"), l = t.getItemVisual(e, "color");
        Ma(i.style, i.hoverStyle = {}, u, h, {
            labelFetcher: t.hostModel,
            labelDataIndex: e,
            defaultText: t.getName(e),
            autoColor: l,
            useInsideStyle: !!s.inside
        }, {
            textAlign: s.textAlign,
            textVerticalAlign: s.verticalAlign,
            opacity: t.getItemVisual(e, "opacity")
        }), i.ignore = i.normalIgnore = !u.get("show"), i.hoverIgnore = !h.get("show"), n.ignore = n.normalIgnore = !c.get("show"), n.hoverIgnore = !d.get("show"), n.setStyle({
            stroke: l,
            opacity: t.getItemVisual(e, "opacity")
        }), n.setStyle(c.getModel("lineStyle").getLineStyle()), n.hoverStyle = d.getModel("lineStyle").getLineStyle();
        var f = c.get("smooth");
        f && f === !0 && (f = .4), n.setShape({smooth: f})
    }, h(dd, dy);
    var XI = (Gs.extend({
        type: "pie", init: function () {
            var t = new dy;
            this._sectorGroup = t
        }, render: function (t, e, n, i) {
            if (!i || i.from !== this.uid) {
                var r = t.getData(), a = this._data, o = this.group, s = e.get("animation"), l = !a,
                    u = t.get("animationType"), h = x(hd, this.uid, t, s, n), c = t.get("selectedMode");
                if (r.diff(a).add(function (t) {
                    var e = new dd(r, t);
                    l && "scale" !== u && e.eachChild(function (t) {
                        t.stopAnimation(!0)
                    }), c && e.on("click", h), r.setItemGraphicEl(t, e), o.add(e)
                }).update(function (t, e) {
                    var n = a.getItemGraphicEl(e);
                    n.updateData(r, t), n.off("click"), c && n.on("click", h), o.add(n), r.setItemGraphicEl(t, n)
                }).remove(function (t) {
                    var e = a.getItemGraphicEl(t);
                    o.remove(e)
                }).execute(), s && l && r.count() > 0 && "scale" !== u) {
                    var d = r.getItemLayout(0), f = Math.max(n.getWidth(), n.getHeight()) / 2,
                        p = y(o.removeClipPath, o);
                    o.setClipPath(this._createClipPath(d.cx, d.cy, f, d.startAngle, d.clockwise, p, t))
                } else o.removeClipPath();
                this._data = r
            }
        }, dispose: function () {
        }, _createClipPath: function (t, e, n, i, r, a, o) {
            var s = new D_({shape: {cx: t, cy: e, r0: 0, r: n, startAngle: i, endAngle: i, clockwise: r}});
            return Ea(s, {shape: {endAngle: i + (r ? 1 : -1) * Math.PI * 2}}, o, a), s
        }, containPoint: function (t, e) {
            var n = e.getData(), i = n.getItemLayout(0);
            if (i) {
                var r = t[0] - i.cx, a = t[1] - i.cy, o = Math.sqrt(r * r + a * a);
                return o <= i.r && o >= i.r0
            }
        }
    }), function (t, e) {
        f(e, function (e) {
            e.update = "updateView", tu(e, function (n, i) {
                var r = {};
                return i.eachComponent({mainType: "series", subType: t, query: n}, function (t) {
                    t[e.method] && t[e.method](n.name, n.dataIndex);
                    var i = t.getData();
                    i.each(function (e) {
                        var n = i.getName(e);
                        r[n] = t.isSelected(n) || !1
                    })
                }), {name: n.name, selected: r}
            })
        })
    }), YI = function (t) {
        return {
            getTargetSeries: function (e) {
                var n = {}, i = N();
                return e.eachSeriesByType(t, function (t) {
                    t.__paletteScope = n, i.set(t.uid, t)
                }), i
            }, reset: function (t) {
                var e = t.getRawData(), n = {}, i = t.getData();
                i.each(function (t) {
                    var e = i.getRawIndex(t);
                    n[e] = t
                }), e.each(function (r) {
                    var a = n[r], o = null != a && i.getItemVisual(a, "color", !0);
                    if (o) e.setItemVisual(r, "color", o); else {
                        var s = e.getItemModel(r),
                            l = s.get("itemStyle.color") || t.getColorFromPalette(e.getName(r) || r + "", t.__paletteScope, e.count());
                        e.setItemVisual(r, "color", l), null != a && i.setItemVisual(a, "color", l)
                    }
                })
            }
        }
    }, UI = function (t, e, n, i) {
        var r, a, o = t.getData(), s = [], l = !1;
        o.each(function (n) {
            var i, u, h, c, d = o.getItemLayout(n), f = o.getItemModel(n), p = f.getModel("label"),
                g = p.get("position") || f.get("emphasis.label.position"), v = f.getModel("labelLine"),
                m = v.get("length"), y = v.get("length2"), x = (d.startAngle + d.endAngle) / 2, _ = Math.cos(x),
                w = Math.sin(x);
            r = d.cx, a = d.cy;
            var b = "inside" === g || "inner" === g;
            if ("center" === g) i = d.cx, u = d.cy, c = "center"; else {
                var M = (b ? (d.r + d.r0) / 2 * _ : d.r * _) + r, S = (b ? (d.r + d.r0) / 2 * w : d.r * w) + a;
                if (i = M + 3 * _, u = S + 3 * w, !b) {
                    var I = M + _ * (m + e - d.r), T = S + w * (m + e - d.r), C = I + (0 > _ ? -1 : 1) * y, A = T;
                    i = C + (0 > _ ? -5 : 5), u = A, h = [[M, S], [I, T], [C, A]]
                }
                c = b ? "center" : _ > 0 ? "left" : "right"
            }
            var D = p.getFont(), k = p.get("rotate") ? 0 > _ ? -x + Math.PI : -x : 0,
                P = t.getFormattedLabel(n, "normal") || o.getName(n), L = Nn(P, D, c, "top");
            l = !!k, d.label = {
                x: i,
                y: u,
                position: g,
                height: L.height,
                len: m,
                len2: y,
                linePoints: h,
                textAlign: c,
                verticalAlign: "middle",
                rotation: k,
                inside: b
            }, b || s.push(d.label)
        }), !l && t.get("avoidLabelOverlap") && pd(s, r, a, e, n, i)
    }, jI = 2 * Math.PI, qI = Math.PI / 180, KI = function (t, e, n) {
        e.eachSeriesByType(t, function (t) {
            var e = t.getData(), i = e.mapDimension("value"), r = t.get("center"), a = t.get("radius");
            _(a) || (a = [0, a]), _(r) || (r = [r, r]);
            var o = n.getWidth(), s = n.getHeight(), l = Math.min(o, s), u = $a(r[0], o), h = $a(r[1], s),
                c = $a(a[0], l / 2), d = $a(a[1], l / 2), f = -t.get("startAngle") * qI, p = t.get("minAngle") * qI,
                g = 0;
            e.each(i, function (t) {
                !isNaN(t) && g++
            });
            var v = e.getSum(i), m = Math.PI / (v || g) * 2, y = t.get("clockwise"), x = t.get("roseType"),
                w = t.get("stillShowZeroSum"), b = e.getDataExtent(i);
            b[0] = 0;
            var M = jI, S = 0, I = f, T = y ? 1 : -1;
            if (e.each(i, function (t, n) {
                var i;
                if (isNaN(t)) return void e.setItemLayout(n, {
                    angle: 0 / 0,
                    startAngle: 0 / 0,
                    endAngle: 0 / 0,
                    clockwise: y,
                    cx: u,
                    cy: h,
                    r0: c,
                    r: x ? 0 / 0 : d
                });
                i = "area" !== x ? 0 === v && w ? m : t * m : jI / g, p > i ? (i = p, M -= p) : S += t;
                var r = I + T * i;
                e.setItemLayout(n, {
                    angle: i,
                    startAngle: I,
                    endAngle: r,
                    clockwise: y,
                    cx: u,
                    cy: h,
                    r0: c,
                    r: x ? Ka(t, b, [c, d]) : d
                }), I = r
            }), jI > M && g) if (.001 >= M) {
                var C = jI / g;
                e.each(i, function (t, n) {
                    if (!isNaN(t)) {
                        var i = e.getItemLayout(n);
                        i.angle = C, i.startAngle = f + T * n * C, i.endAngle = f + T * (n + 1) * C
                    }
                })
            } else m = M / S, I = f, e.each(i, function (t, n) {
                if (!isNaN(t)) {
                    var i = e.getItemLayout(n), r = i.angle === p ? p : t * m;
                    i.startAngle = I, i.endAngle = I + T * r, I += T * r
                }
            });
            UI(t, d, o, s)
        })
    }, $I = function (t) {
        return {
            seriesType: t, reset: function (t, e) {
                var n = e.findComponents({mainType: "legend"});
                if (n && n.length) {
                    var i = t.getData();
                    i.filterSelf(function (t) {
                        for (var e = i.getName(t), r = 0; r < n.length; r++) if (!n[r].isSelected(e)) return !1;
                        return !0
                    })
                }
            }
        }
    };
    XI("pie", [{type: "pieToggleSelect", event: "pieselectchanged", method: "toggleSelected"}, {
        type: "pieSelect",
        event: "pieselected",
        method: "select"
    }, {
        type: "pieUnSelect",
        event: "pieunselected",
        method: "unSelect"
    }]), ru(YI("pie")), iu(x(KI, "pie")), Ql($I("pie"));
    var QI = f, JI = "\x00__link_datas", tT = "\x00__link_mainData", eT = function (t, e) {
        this.name = t || "", this.depth = 0, this.height = 0, this.parentNode = null, this.dataIndex = -1, this.children = [], this.viewChildren = [], this.hostTree = e
    };
    eT.prototype = {
        constructor: eT, isRemoved: function () {
            return this.dataIndex < 0
        }, eachNode: function (t, e, n) {
            "function" == typeof t && (n = e, e = t, t = null), t = t || {}, b(t) && (t = {order: t});
            var i, r = t.order || "preorder", a = this[t.attr || "children"];
            "preorder" === r && (i = e.call(n, this));
            for (var o = 0; !i && o < a.length; o++) a[o].eachNode(t, e, n);
            "postorder" === r && e.call(n, this)
        }, updateDepthAndHeight: function (t) {
            var e = 0;
            this.depth = t;
            for (var n = 0; n < this.children.length; n++) {
                var i = this.children[n];
                i.updateDepthAndHeight(t + 1), i.height > e && (e = i.height)
            }
            this.height = e + 1
        }, getNodeById: function (t) {
            if (this.getId() === t) return this;
            for (var e = 0, n = this.children, i = n.length; i > e; e++) {
                var r = n[e].getNodeById(t);
                if (r) return r
            }
        }, contains: function (t) {
            if (t === this) return !0;
            for (var e = 0, n = this.children, i = n.length; i > e; e++) {
                var r = n[e].contains(t);
                if (r) return r
            }
        }, getAncestors: function (t) {
            for (var e = [], n = t ? this : this.parentNode; n;) e.push(n), n = n.parentNode;
            return e.reverse(), e
        }, getValue: function (t) {
            var e = this.hostTree.data;
            return e.get(e.getDimension(t || "value"), this.dataIndex)
        }, setLayout: function (t, e) {
            this.dataIndex >= 0 && this.hostTree.data.setItemLayout(this.dataIndex, t, e)
        }, getLayout: function () {
            return this.hostTree.data.getItemLayout(this.dataIndex)
        }, getModel: function (t) {
            if (!(this.dataIndex < 0)) {
                var e, n = this.hostTree, i = n.data.getItemModel(this.dataIndex), r = this.getLevelModel();
                return r || 0 !== this.children.length && (0 === this.children.length || this.isExpand !== !1) || (e = this.getLeavesModel()), i.getModel(t, (r || e || n.hostModel).getModel(t))
            }
        }, getLevelModel: function () {
            return (this.hostTree.levelModels || [])[this.depth]
        }, getLeavesModel: function () {
            return this.hostTree.leavesModel
        }, setVisual: function (t, e) {
            this.dataIndex >= 0 && this.hostTree.data.setItemVisual(this.dataIndex, t, e)
        }, getVisual: function (t, e) {
            return this.hostTree.data.getItemVisual(this.dataIndex, t, e)
        }, getRawIndex: function () {
            return this.hostTree.data.getRawIndex(this.dataIndex)
        }, getId: function () {
            return this.hostTree.data.getId(this.dataIndex)
        }, isAncestorOf: function (t) {
            for (var e = t.parentNode; e;) {
                if (e === this) return !0;
                e = e.parentNode
            }
            return !1
        }, isDescendantOf: function (t) {
            return t !== this && t.isAncestorOf(this)
        }
    }, Sd.prototype = {
        constructor: Sd, type: "tree", eachNode: function (t, e, n) {
            this.root.eachNode(t, e, n)
        }, getNodeByDataIndex: function (t) {
            var e = this.data.getRawIndex(t);
            return this._nodes[e]
        }, getNodeByName: function (t) {
            return this.root.getNodeByName(t)
        }, update: function () {
            for (var t = this.data, e = this._nodes, n = 0, i = e.length; i > n; n++) e[n].dataIndex = -1;
            for (var n = 0, i = t.count(); i > n; n++) e[t.getRawIndex(n)].dataIndex = n
        }, clearLayouts: function () {
            this.data.clearItemLayouts()
        }
    }, Sd.createTree = function (t, e, n) {
        function i(t, e) {
            var n = t.value;
            o = Math.max(o, _(n) ? n.length : 1), a.push(t);
            var s = new eT(t.name, r);
            e ? Id(s, e) : r.root = s, r._nodes.push(s);
            var l = t.children;
            if (l) for (var u = 0; u < l.length; u++) i(l[u], s)
        }

        var r = new Sd(e, n.levels, n.leaves), a = [], o = 1;
        i(t), r.root.updateDepthAndHeight(0);
        var s = KM(a, {coordDimensions: ["value"], dimensionsCount: o}), l = new UM(s, e);
        return l.initData(a), vd({mainData: l, struct: r, structAttr: "tree"}), r.update(), r
    }, pb.extend({
        type: "series.sunburst",
        _viewRoot: null,
        getInitialData: function (t) {
            var e = {name: t.name, children: t.data};
            kd(e);
            var n = t.levels || [], i = {};
            return i.levels = n, Sd.createTree(e, this, i).data
        },
        optionUpdated: function () {
            this.resetViewRoot()
        },
        getDataParams: function (t) {
            var e = pb.prototype.getDataParams.apply(this, arguments), n = this.getData().tree.getNodeByDataIndex(t);
            return e.treePathInfo = Dd(n, this), e
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            center: ["50%", "50%"],
            radius: [0, "75%"],
            clockwise: !0,
            startAngle: 90,
            minAngle: 0,
            percentPrecision: 2,
            stillShowZeroSum: !0,
            highlightPolicy: "descendant",
            nodeClick: "rootToNode",
            renderLabelForZeroData: !1,
            label: {
                rotate: "radial",
                show: !0,
                opacity: 1,
                align: "center",
                position: "inside",
                distance: 5,
                silent: !0,
                emphasis: {}
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: "white",
                borderType: "solid",
                shadowBlur: 0,
                shadowColor: "rgba(0, 0, 0, 0.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
                emphasis: {},
                highlight: {opacity: 1},
                downplay: {opacity: .9}
            },
            animationType: "expansion",
            animationDuration: 1e3,
            animationDurationUpdate: 500,
            animationEasing: "cubicOut",
            data: [],
            levels: [],
            sort: "desc"
        },
        getViewRoot: function () {
            return this._viewRoot
        },
        resetViewRoot: function (t) {
            t ? this._viewRoot = t : t = this._viewRoot;
            var e = this.getRawData().tree.root;
            (!t || t !== e && !e.contains(t)) && (this._viewRoot = e)
        }
    });
    var nT = {NONE: "none", DESCENDANT: "descendant", ANCESTOR: "ancestor", SELF: "self"}, iT = 2, rT = 4,
        aT = Pd.prototype;
    aT.updateData = function (t, e, n, i, a) {
        this.node = e, e.piece = this, i = i || this._seriesModel, a = a || this._ecModel;
        var l = this.childAt(0);
        l.dataIndex = e.dataIndex;
        var u = e.getModel(), h = e.getLayout(), c = o({}, h);
        c.label = null;
        var d = Ld(e, i, a);
        Ed(e, i, d);
        var f, p = u.getModel("itemStyle").getItemStyle();
        if ("normal" === n) f = p; else {
            var g = u.getModel(n + ".itemStyle").getItemStyle();
            f = r(g, p)
        }
        f = s({
            lineJoin: "bevel",
            fill: f.fill || d
        }, f), t ? (l.setShape(c), l.shape.r = h.r0, za(l, {shape: {r: h.r}}, i, e.dataIndex), l.useStyle(f)) : "object" == typeof f.fill && f.fill.type || "object" == typeof l.style.fill && l.style.fill.type ? (za(l, {shape: c}, i), l.useStyle(f)) : za(l, {
            shape: c,
            style: f
        }, i), this._updateLabel(i, d, n);
        var v = u.getShallow("cursor");
        if (v && l.attr("cursor", v), t) {
            var m = i.getShallow("highlightPolicy");
            this._initEvents(l, e, i, m)
        }
        this._seriesModel = i || this._seriesModel, this._ecModel = a || this._ecModel
    }, aT.onEmphasis = function (t) {
        var e = this;
        this.node.hostTree.root.eachNode(function (n) {
            n.piece && (e.node === n ? n.piece.updateData(!1, n, "emphasis") : zd(n, e.node, t) ? n.piece.childAt(0).trigger("highlight") : t !== nT.NONE && n.piece.childAt(0).trigger("downplay"))
        })
    }, aT.onNormal = function () {
        this.node.hostTree.root.eachNode(function (t) {
            t.piece && t.piece.updateData(!1, t, "normal")
        })
    }, aT.onHighlight = function () {
        this.updateData(!1, this.node, "highlight")
    }, aT.onDownplay = function () {
        this.updateData(!1, this.node, "downplay")
    }, aT._updateLabel = function (t, e, n) {
        function i(t) {
            var e = o.get(t);
            return null == e ? a.get(t) : e
        }

        var r = this.node.getModel(), a = r.getModel("label"),
            o = "normal" === n || "emphasis" === n ? a : r.getModel(n + ".label"), s = r.getModel("emphasis.label"),
            l = A(t.getFormattedLabel(this.node.dataIndex, "normal", null, null, "label"), this.node.name);
        i("show") === !1 && (l = "");
        var u = this.node.getLayout(), h = o.get("minAngle");
        null == h && (h = a.get("minAngle")), h = h / 180 * Math.PI;
        var c = u.endAngle - u.startAngle;
        null != h && Math.abs(c) < h && (l = "");
        var d = this.childAt(1);
        Ma(d.style, d.hoverStyle || {}, a, s, {
            defaultText: o.getShallow("show") ? l : null,
            autoColor: e,
            useInsideStyle: !0
        });
        var f, p = (u.startAngle + u.endAngle) / 2, g = Math.cos(p), v = Math.sin(p), m = i("position"),
            y = i("distance") || 0, x = i("align");
        "outside" === m ? (f = u.r + y, x = p > Math.PI / 2 ? "right" : "left") : x && "center" !== x ? "left" === x ? (f = u.r0 + y, p > Math.PI / 2 && (x = "right")) : "right" === x && (f = u.r - y, p > Math.PI / 2 && (x = "left")) : (f = (u.r + u.r0) / 2, x = "center"), d.attr("style", {
            text: l,
            textAlign: x,
            textVerticalAlign: i("verticalAlign") || "middle",
            opacity: i("opacity")
        });
        var _ = f * g + u.cx, w = f * v + u.cy;
        d.attr("position", [_, w]);
        var b = i("rotate"), M = 0;
        "radial" === b ? (M = -p, M < -Math.PI / 2 && (M += Math.PI)) : "tangential" === b ? (M = Math.PI / 2 - p, M > Math.PI / 2 ? M -= Math.PI : M < -Math.PI / 2 && (M += Math.PI)) : "number" == typeof b && (M = b * Math.PI / 180), d.attr("rotation", M)
    }, aT._initEvents = function (t, e, n, i) {
        t.off("mouseover").off("mouseout").off("emphasis").off("normal");
        var r = this, a = function () {
            r.onEmphasis(i)
        }, o = function () {
            r.onNormal()
        }, s = function () {
            r.onDownplay()
        }, l = function () {
            r.onHighlight()
        };
        n.isAnimationEnabled() && t.on("mouseover", a).on("mouseout", o).on("emphasis", a).on("normal", o).on("downplay", s).on("highlight", l)
    }, h(Pd, dy);
    var oT = "sunburstRootToNode", sT = (Gs.extend({
        type: "sunburst", init: function () {
        }, render: function (t, e, n, i) {
            function r(t, e) {
                function n(t) {
                    return t.getId()
                }

                function i(n, i) {
                    var r = null == n ? null : t[n], o = null == i ? null : e[i];
                    a(r, o)
                }

                (0 !== t.length || 0 !== e.length) && new gu(e, t, n, n).add(i).update(i).remove(x(i, null)).execute()
            }

            function a(n, i) {
                if (f || !n || n.getValue() || (n = null), n !== h && i !== h) if (i && i.piece) n ? (i.piece.updateData(!1, n, "normal", t, e), u.setItemGraphicEl(n.dataIndex, i.piece)) : o(i); else if (n) {
                    var r = new Pd(n, t, e);
                    d.add(r), u.setItemGraphicEl(n.dataIndex, r)
                }
            }

            function o(t) {
                t && t.piece && (d.remove(t.piece), t.piece = null)
            }

            function s(n, i) {
                if (i.depth > 0) {
                    l.virtualPiece ? l.virtualPiece.updateData(!1, n, "normal", t, e) : (l.virtualPiece = new Pd(n, t, e), d.add(l.virtualPiece)), i.piece._onclickEvent && i.piece.off("click", i.piece._onclickEvent);
                    var r = function () {
                        l._rootToNode(i.parentNode)
                    };
                    i.piece._onclickEvent = r, l.virtualPiece.on("click", r)
                } else l.virtualPiece && (d.remove(l.virtualPiece), l.virtualPiece = null)
            }

            var l = this;
            this.seriesModel = t, this.api = n, this.ecModel = e;
            var u = t.getData(), h = u.tree.root, c = t.getViewRoot(), d = this.group,
                f = t.get("renderLabelForZeroData"), p = [];
            c.eachNode(function (t) {
                p.push(t)
            });
            var g = this._oldChildren || [];
            if (r(p, g), s(h, c), i && i.highlight && i.highlight.piece) {
                var v = t.getShallow("highlightPolicy");
                i.highlight.piece.onEmphasis(v)
            } else if (i && i.unhighlight) {
                var m = this.virtualPiece;
                !m && h.children.length && (m = h.children[0].piece), m && m.onNormal()
            }
            this._initEvents(), this._oldChildren = p
        }, dispose: function () {
        }, _initEvents: function () {
            var t = this, e = function (e) {
                var n = !1, i = t.seriesModel.getViewRoot();
                i.eachNode(function (i) {
                    if (!n && i.piece && i.piece.childAt(0) === e.target) {
                        var r = i.getModel().get("nodeClick");
                        if ("rootToNode" === r) t._rootToNode(i); else if ("link" === r) {
                            var a = i.getModel(), o = a.get("link");
                            if (o) {
                                var s = a.get("target", !0) || "_blank";
                                window.open(o, s)
                            }
                        }
                        n = !0
                    }
                })
            };
            this.group._onclickEvent && this.group.off("click", this.group._onclickEvent), this.group.on("click", e), this.group._onclickEvent = e
        }, _rootToNode: function (t) {
            t !== this.seriesModel.getViewRoot() && this.api.dispatchAction({
                type: oT,
                from: this.uid,
                seriesId: this.seriesModel.id,
                targetNode: t
            })
        }, containPoint: function (t, e) {
            var n = e.getData(), i = n.getItemLayout(0);
            if (i) {
                var r = t[0] - i.cx, a = t[1] - i.cy, o = Math.sqrt(r * r + a * a);
                return o <= i.r && o >= i.r0
            }
        }
    }), "sunburstRootToNode");
    tu({type: sT, update: "updateView"}, function (t, e) {
        function n(e) {
            var n = Td(t, [sT], e);
            if (n) {
                var i = e.getViewRoot();
                i && (t.direction = Ad(i, n.node) ? "rollUp" : "drillDown"), e.resetViewRoot(n.node)
            }
        }

        e.eachComponent({mainType: "series", subType: "sunburst", query: t}, n)
    });
    var lT = "sunburstHighlight";
    tu({type: lT, update: "updateView"}, function (t, e) {
        function n(e) {
            var n = Td(t, [lT], e);
            n && (t.highlight = n.node)
        }

        e.eachComponent({mainType: "series", subType: "sunburst", query: t}, n)
    });
    var uT = "sunburstUnhighlight";
    tu({type: uT, update: "updateView"}, function (t, e) {
        function n() {
            t.unhighlight = !0
        }

        e.eachComponent({mainType: "series", subType: "sunburst", query: t}, n)
    });
    var hT = Math.PI / 180, cT = function (t, e, n) {
        e.eachSeriesByType(t, function (t) {
            var e = t.get("center"), i = t.get("radius");
            _(i) || (i = [0, i]), _(e) || (e = [e, e]);
            var r = n.getWidth(), a = n.getHeight(), o = Math.min(r, a), s = $a(e[0], r), l = $a(e[1], a),
                u = $a(i[0], o / 2), h = $a(i[1], o / 2), c = -t.get("startAngle") * hT, d = t.get("minAngle") * hT,
                p = t.getData().tree.root, g = t.getViewRoot(), v = g.depth, m = t.get("sort");
            null != m && Rd(g, m);
            var y = 0;
            f(g.children, function (t) {
                !isNaN(t.getValue()) && y++
            });
            var x = g.getValue(), w = Math.PI / (x || y) * 2, b = g.depth > 0, M = g.height - (b ? -1 : 1),
                S = (h - u) / (M || 1), I = t.get("clockwise"), T = t.get("stillShowZeroSum"), C = I ? 1 : -1,
                A = function (t, e) {
                    if (t) {
                        var n = e;
                        if (t !== p) {
                            var i = t.getValue(), r = 0 === x && T ? w : i * w;
                            d > r && (r = d), n = e + C * r;
                            var a = t.depth - v - (b ? -1 : 1), h = u + S * a, c = u + S * (a + 1), g = t.getModel();
                            null != g.get("r0") && (h = $a(g.get("r0"), o / 2)), null != g.get("r") && (c = $a(g.get("r"), o / 2)), t.setLayout({
                                angle: r,
                                startAngle: e,
                                endAngle: n,
                                clockwise: I,
                                cx: s,
                                cy: l,
                                r0: h,
                                r: c
                            })
                        }
                        if (t.children && t.children.length) {
                            var m = 0;
                            f(t.children, function (t) {
                                m += A(t, e + m)
                            })
                        }
                        return n - e
                    }
                };
            if (b) {
                var D = u, k = u + S, P = 2 * Math.PI;
                p.setLayout({angle: P, startAngle: c, endAngle: c + P, clockwise: I, cx: s, cy: l, r0: D, r: k})
            }
            A(g, c)
        })
    };
    ru(x(YI, "sunburst")), iu(x(cT, "sunburst")), Ql(x($I, "sunburst"));
    var dT = (pb.extend({
        type: "series.gauge",
        getInitialData: function (t) {
            var e = t.data || [];
            return _(e) || (e = [e]), t.data = e, HI(this, ["value"])
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            center: ["50%", "50%"],
            legendHoverLink: !0,
            radius: "75%",
            startAngle: 225,
            endAngle: -45,
            clockwise: !0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {show: !0, lineStyle: {color: [[.2, "#91c7ae"], [.8, "#63869e"], [1, "#c23531"]], width: 30}},
            splitLine: {show: !0, length: 30, lineStyle: {color: "#eee", width: 2, type: "solid"}},
            axisTick: {show: !0, splitNumber: 5, length: 8, lineStyle: {color: "#eee", width: 1, type: "solid"}},
            axisLabel: {show: !0, distance: 5, color: "auto"},
            pointer: {show: !0, length: "80%", width: 8},
            itemStyle: {color: "auto"},
            title: {show: !0, offsetCenter: [0, "-40%"], color: "#333", fontSize: 15},
            detail: {
                show: !0,
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "#ccc",
                width: 100,
                height: null,
                padding: [5, 10],
                offsetCenter: [0, "40%"],
                color: "auto",
                fontSize: 30
            }
        }
    }), Vr.extend({
        type: "echartsGaugePointer",
        shape: {angle: 0, width: 10, r: 10, x: 0, y: 0},
        buildPath: function (t, e) {
            var n = Math.cos, i = Math.sin, r = e.r, a = e.width, o = e.angle,
                s = e.x - n(o) * a * (a >= r / 3 ? 1 : 2), l = e.y - i(o) * a * (a >= r / 3 ? 1 : 2);
            o = e.angle - Math.PI / 2, t.moveTo(s, l), t.lineTo(e.x + n(o) * a, e.y + i(o) * a), t.lineTo(e.x + n(e.angle) * r, e.y + i(e.angle) * r), t.lineTo(e.x - n(o) * a, e.y - i(o) * a), t.lineTo(s, l)
        }
    })), fT = 2 * Math.PI, pT = (Gs.extend({
        type: "gauge", render: function (t, e, n) {
            this.group.removeAll();
            var i = t.get("axisLine.lineStyle.color"), r = Nd(t, n);
            this._renderMain(t, e, n, i, r)
        }, dispose: function () {
        }, _renderMain: function (t, e, n, i, r) {
            for (var a = this.group, o = t.getModel("axisLine"), s = o.getModel("lineStyle"), l = t.get("clockwise"), u = -t.get("startAngle") / 180 * Math.PI, h = -t.get("endAngle") / 180 * Math.PI, c = (h - u) % fT, d = u, f = s.get("width"), p = 0; p < i.length; p++) {
                var g = Math.min(Math.max(i[p][0], 0), 1), h = u + c * g, v = new D_({
                    shape: {
                        startAngle: d,
                        endAngle: h,
                        cx: r.cx,
                        cy: r.cy,
                        clockwise: l,
                        r0: r.r - f,
                        r: r.r
                    }, silent: !0
                });
                v.setStyle({fill: i[p][1]}), v.setStyle(s.getLineStyle(["color", "borderWidth", "borderColor"])), a.add(v), d = h
            }
            var m = function (t) {
                if (0 >= t) return i[0][1];
                for (var e = 0; e < i.length; e++) if (i[e][0] >= t && (0 === e ? 0 : i[e - 1][0]) < t) return i[e][1];
                return i[e - 1][1]
            };
            if (!l) {
                var y = u;
                u = h, h = y
            }
            this._renderTicks(t, e, n, m, r, u, h, l), this._renderPointer(t, e, n, m, r, u, h, l), this._renderTitle(t, e, n, m, r), this._renderDetail(t, e, n, m, r)
        }, _renderTicks: function (t, e, n, i, r, a, o) {
            for (var s = this.group, l = r.cx, u = r.cy, h = r.r, c = +t.get("min"), d = +t.get("max"), f = t.getModel("splitLine"), p = t.getModel("axisTick"), g = t.getModel("axisLabel"), v = t.get("splitNumber"), m = p.get("splitNumber"), y = $a(f.get("length"), h), x = $a(p.get("length"), h), _ = a, w = (o - a) / v, b = w / m, M = f.getModel("lineStyle").getLineStyle(), S = p.getModel("lineStyle").getLineStyle(), I = 0; v >= I; I++) {
                var T = Math.cos(_), C = Math.sin(_);
                if (f.get("show")) {
                    var A = new V_({
                        shape: {x1: T * h + l, y1: C * h + u, x2: T * (h - y) + l, y2: C * (h - y) + u},
                        style: M,
                        silent: !0
                    });
                    "auto" === M.stroke && A.setStyle({stroke: i(I / v)}), s.add(A)
                }
                if (g.get("show")) {
                    var D = Vd(Qa(I / v * (d - c) + c), g.get("formatter")), k = g.get("distance"), P = i(I / v);
                    s.add(new I_({
                        style: Sa({}, g, {
                            text: D,
                            x: T * (h - y - k) + l,
                            y: C * (h - y - k) + u,
                            textVerticalAlign: -.4 > C ? "top" : C > .4 ? "bottom" : "middle",
                            textAlign: -.4 > T ? "left" : T > .4 ? "right" : "center"
                        }, {autoColor: P}), silent: !0
                    }))
                }
                if (p.get("show") && I !== v) {
                    for (var L = 0; m >= L; L++) {
                        var T = Math.cos(_), C = Math.sin(_), O = new V_({
                            shape: {x1: T * h + l, y1: C * h + u, x2: T * (h - x) + l, y2: C * (h - x) + u},
                            silent: !0,
                            style: S
                        });
                        "auto" === S.stroke && O.setStyle({stroke: i((I + L / m) / v)}), s.add(O), _ += b
                    }
                    _ -= b
                } else _ += w
            }
        }, _renderPointer: function (t, e, n, i, r, a, o) {
            var s = this.group, l = this._data;
            if (!t.get("pointer.show")) return void (l && l.eachItemGraphicEl(function (t) {
                s.remove(t)
            }));
            var u = [+t.get("min"), +t.get("max")], h = [a, o], c = t.getData(), d = c.mapDimension("value");
            c.diff(l).add(function (e) {
                var n = new dT({shape: {angle: a}});
                Ea(n, {shape: {angle: Ka(c.get(d, e), u, h, !0)}}, t), s.add(n), c.setItemGraphicEl(e, n)
            }).update(function (e, n) {
                var i = l.getItemGraphicEl(n);
                za(i, {shape: {angle: Ka(c.get(d, e), u, h, !0)}}, t), s.add(i), c.setItemGraphicEl(e, i)
            }).remove(function (t) {
                var e = l.getItemGraphicEl(t);
                s.remove(e)
            }).execute(), c.eachItemGraphicEl(function (t, e) {
                var n = c.getItemModel(e), a = n.getModel("pointer");
                t.setShape({
                    x: r.cx,
                    y: r.cy,
                    width: $a(a.get("width"), r.r),
                    r: $a(a.get("length"), r.r)
                }), t.useStyle(n.getModel("itemStyle").getItemStyle()), "auto" === t.style.fill && t.setStyle("fill", i(Ka(c.get(d, e), u, [0, 1], !0))), wa(t, n.getModel("emphasis.itemStyle").getItemStyle())
            }), this._data = c
        }, _renderTitle: function (t, e, n, i, r) {
            var a = t.getData(), o = a.mapDimension("value"), s = t.getModel("title");
            if (s.get("show")) {
                var l = s.get("offsetCenter"), u = r.cx + $a(l[0], r.r), h = r.cy + $a(l[1], r.r), c = +t.get("min"),
                    d = +t.get("max"), f = t.getData().get(o, 0), p = i(Ka(f, [c, d], [0, 1], !0));
                this.group.add(new I_({
                    silent: !0,
                    style: Sa({}, s, {
                        x: u,
                        y: h,
                        text: a.getName(0),
                        textAlign: "center",
                        textVerticalAlign: "middle"
                    }, {autoColor: p, forceRich: !0})
                }))
            }
        }, _renderDetail: function (t, e, n, i, r) {
            var a = t.getModel("detail"), o = +t.get("min"), s = +t.get("max");
            if (a.get("show")) {
                var l = a.get("offsetCenter"), u = r.cx + $a(l[0], r.r), h = r.cy + $a(l[1], r.r),
                    c = $a(a.get("width"), r.r), d = $a(a.get("height"), r.r), f = t.getData(),
                    p = f.get(f.mapDimension("value"), 0), g = i(Ka(p, [o, s], [0, 1], !0));
                this.group.add(new I_({
                    silent: !0,
                    style: Sa({}, a, {
                        x: u,
                        y: h,
                        text: Vd(p, a.get("formatter")),
                        textWidth: isNaN(c) ? null : c,
                        textHeight: isNaN(d) ? null : d,
                        textAlign: "center",
                        textVerticalAlign: "middle"
                    }, {autoColor: g, forceRich: !0})
                }))
            }
        }
    }), uu({
        type: "series.funnel",
        init: function (t) {
            pT.superApply(this, "init", arguments), this.legendDataProvider = function () {
                return this.getRawData()
            }, this._defaultLabelLine(t)
        },
        getInitialData: function () {
            return HI(this, ["value"])
        },
        _defaultLabelLine: function (t) {
            Ni(t, "labelLine", ["show"]);
            var e = t.labelLine, n = t.emphasis.labelLine;
            e.show = e.show && t.label.show, n.show = n.show && t.emphasis.label.show
        },
        getDataParams: function (t) {
            var e = this.getData(), n = pT.superCall(this, "getDataParams", t), i = e.mapDimension("value"),
                r = e.getSum(i);
            return n.percent = r ? +(e.get(i, t) / r * 100).toFixed(2) : 0, n.$vars.push("percent"), n
        },
        defaultOption: {
            zlevel: 0,
            z: 2,
            legendHoverLink: !0,
            left: 80,
            top: 60,
            right: 80,
            bottom: 60,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 0,
            funnelAlign: "center",
            label: {show: !0, position: "outer"},
            labelLine: {show: !0, length: 20, lineStyle: {width: 1, type: "solid"}},
            itemStyle: {borderColor: "#fff", borderWidth: 1},
            emphasis: {label: {show: !0}}
        }
    })), gT = Fd.prototype, vT = ["itemStyle", "opacity"];
    gT.updateData = function (t, e, n) {
        var i = this.childAt(0), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e),
            l = t.getItemModel(e).get(vT);
        l = null == l ? 1 : l, i.useStyle({}), n ? (i.setShape({points: o.points}), i.setStyle({opacity: 0}), Ea(i, {style: {opacity: l}}, r, e)) : za(i, {
            style: {opacity: l},
            shape: {points: o.points}
        }, r, e);
        var u = a.getModel("itemStyle"), h = t.getItemVisual(e, "color");
        i.setStyle(s({
            lineJoin: "round",
            fill: h
        }, u.getItemStyle(["opacity"]))), i.hoverStyle = u.getModel("emphasis").getItemStyle(), this._updateLabel(t, e), wa(this)
    }, gT._updateLabel = function (t, e) {
        var n = this.childAt(1), i = this.childAt(2), r = t.hostModel, a = t.getItemModel(e), o = t.getItemLayout(e),
            s = o.label, l = t.getItemVisual(e, "color");
        za(n, {shape: {points: s.linePoints || s.linePoints}}, r, e), za(i, {
            style: {
                x: s.x,
                y: s.y
            }
        }, r, e), i.attr({rotation: s.rotation, origin: [s.x, s.y], z2: 10});
        var u = a.getModel("label"), h = a.getModel("emphasis.label"), c = a.getModel("labelLine"),
            d = a.getModel("emphasis.labelLine"), l = t.getItemVisual(e, "color");
        Ma(i.style, i.hoverStyle = {}, u, h, {
            labelFetcher: t.hostModel,
            labelDataIndex: e,
            defaultText: t.getName(e),
            autoColor: l,
            useInsideStyle: !!s.inside
        }, {
            textAlign: s.textAlign,
            textVerticalAlign: s.verticalAlign
        }), i.ignore = i.normalIgnore = !u.get("show"), i.hoverIgnore = !h.get("show"), n.ignore = n.normalIgnore = !c.get("show"), n.hoverIgnore = !d.get("show"), n.setStyle({stroke: l}), n.setStyle(c.getModel("lineStyle").getLineStyle()), n.hoverStyle = d.getModel("lineStyle").getLineStyle()
    }, h(Fd, dy);
    var mT = (Gs.extend({
        type: "funnel", render: function (t) {
            var e = t.getData(), n = this._data, i = this.group;
            e.diff(n).add(function (t) {
                var n = new Fd(e, t);
                e.setItemGraphicEl(t, n), i.add(n)
            }).update(function (t, r) {
                var a = n.getItemGraphicEl(r);
                a.updateData(e, t), i.add(a), e.setItemGraphicEl(t, a)
            }).remove(function (t) {
                var e = n.getItemGraphicEl(t);
                i.remove(e)
            }).execute(), this._data = e
        }, remove: function () {
            this.group.removeAll(), this._data = null
        }, dispose: function () {
        }
    }), function (t, e) {
        t.eachSeriesByType("funnel", function (t) {
            var n = t.getData(), i = n.mapDimension("value"), r = t.get("sort"), a = Hd(t, e), o = Gd(n, r),
                s = [$a(t.get("minSize"), a.width), $a(t.get("maxSize"), a.width)], l = n.getDataExtent(i),
                u = t.get("min"), h = t.get("max");
            null == u && (u = Math.min(l[0], 0)), null == h && (h = l[1]);
            var c = t.get("funnelAlign"), d = t.get("gap"), f = (a.height - d * (n.count() - 1)) / n.count(), p = a.y,
                g = function (t, e) {
                    var r, o = n.get(i, t) || 0, l = Ka(o, [u, h], s, !0);
                    switch (c) {
                        case"left":
                            r = a.x;
                            break;
                        case"center":
                            r = a.x + (a.width - l) / 2;
                            break;
                        case"right":
                            r = a.x + a.width - l
                    }
                    return [[r, e], [r + l, e]]
                };
            "ascending" === r && (f = -f, d = -d, p += a.height, o = o.reverse());
            for (var v = 0; v < o.length; v++) {
                var m = o[v], y = o[v + 1], x = n.getItemModel(m), _ = x.get("itemStyle.height");
                null == _ ? _ = f : (_ = $a(_, a.height), "ascending" === r && (_ = -_));
                var w = g(m, p), b = g(y, p + _);
                p += _ + d, n.setItemLayout(m, {points: w.concat(b.slice().reverse())})
            }
            Wd(n)
        })
    });
    ru(YI("funnel")), iu(mT), Ql($I("funnel")), su({
        type: "title",
        layoutMode: {type: "box", ignoreSize: !0},
        defaultOption: {
            zlevel: 0,
            z: 6,
            show: !0,
            text: "",
            target: "blank",
            subtext: "",
            subtarget: "blank",
            left: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            textStyle: {fontSize: 18, fontWeight: "bolder", color: "#333"},
            subtextStyle: {color: "#aaa"}
        }
    }), lu({
        type: "title", render: function (t, e, n) {
            if (this.group.removeAll(), t.get("show")) {
                var i = this.group, r = t.getModel("textStyle"), a = t.getModel("subtextStyle"), o = t.get("textAlign"),
                    s = t.get("textBaseline"), l = new I_({
                        style: Sa({}, r, {text: t.get("text"), textFill: r.getTextColor()}, {disableBox: !0}),
                        z2: 10
                    }), u = l.getBoundingRect(), h = t.get("subtext"), c = new I_({
                        style: Sa({}, a, {
                            text: h,
                            textFill: a.getTextColor(),
                            y: u.height + t.get("itemGap"),
                            textVerticalAlign: "top"
                        }, {disableBox: !0}), z2: 10
                    }), d = t.get("link"), f = t.get("sublink"), p = t.get("triggerEvent", !0);
                l.silent = !d && !p, c.silent = !f && !p, d && l.on("click", function () {
                    window.open(d, "_" + t.get("target"))
                }), f && c.on("click", function () {
                    window.open(f, "_" + t.get("subtarget"))
                }), l.eventData = c.eventData = p ? {
                    componentType: "title",
                    componentIndex: t.componentIndex
                } : null, i.add(l), h && i.add(c);
                var g = i.getBoundingRect(), v = t.getBoxLayoutParams();
                v.width = g.width, v.height = g.height;
                var m = To(v, {width: n.getWidth(), height: n.getHeight()}, t.get("padding"));
                o || (o = t.get("left") || t.get("right"), "middle" === o && (o = "center"), "right" === o ? m.x += m.width : "center" === o && (m.x += m.width / 2)), s || (s = t.get("top") || t.get("bottom"), "center" === s && (s = "middle"), "bottom" === s ? m.y += m.height : "middle" === s && (m.y += m.height / 2), s = s || "top"), i.attr("position", [m.x, m.y]);
                var y = {textAlign: o, textVerticalAlign: s};
                l.setStyle(y), c.setStyle(y), g = i.getBoundingRect();
                var x = m.margin, _ = t.getItemStyle(["color", "opacity"]);
                _.fill = t.get("backgroundColor");
                var w = new B_({
                    shape: {
                        x: g.x - x[3],
                        y: g.y - x[0],
                        width: g.width + x[1] + x[3],
                        height: g.height + x[0] + x[2],
                        r: t.get("borderRadius")
                    }, style: _, silent: !0
                });
                oa(w), i.add(w)
            }
        }
    });
    var yT = su({
        type: "legend.plain",
        dependencies: ["series"],
        layoutMode: {type: "box", ignoreSize: !0},
        init: function (t, e, n) {
            this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {}
        },
        mergeOption: function (t) {
            yT.superCall(this, "mergeOption", t)
        },
        optionUpdated: function () {
            this._updateData(this.ecModel);
            var t = this._data;
            if (t[0] && "single" === this.get("selectedMode")) {
                for (var e = !1, n = 0; n < t.length; n++) {
                    var i = t[n].get("name");
                    if (this.isSelected(i)) {
                        this.select(i), e = !0;
                        break
                    }
                }
                !e && this.select(t[0].get("name"))
            }
        },
        _updateData: function (t) {
            var e = [], n = [];
            t.eachRawSeries(function (i) {
                var r = i.name;
                n.push(r);
                var a;
                if (i.legendDataProvider) {
                    var o = i.legendDataProvider(), s = o.mapArray(o.getName);
                    t.isSeriesFiltered(i) || (n = n.concat(s)), s.length ? e = e.concat(s) : a = !0
                } else a = !0;
                a && Wi(i) && e.push(i.name)
            }), this._availableNames = n;
            var i = this.get("data") || e, r = p(i, function (t) {
                return ("string" == typeof t || "number" == typeof t) && (t = {name: t}), new Wa(t, this, this.ecModel)
            }, this);
            this._data = r
        },
        getData: function () {
            return this._data
        },
        select: function (t) {
            var e = this.option.selected, n = this.get("selectedMode");
            if ("single" === n) {
                var i = this._data;
                f(i, function (t) {
                    e[t.get("name")] = !1
                })
            }
            e[t] = !0
        },
        unSelect: function (t) {
            "single" !== this.get("selectedMode") && (this.option.selected[t] = !1)
        },
        toggleSelected: function (t) {
            var e = this.option.selected;
            e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t)
        },
        isSelected: function (t) {
            var e = this.option.selected;
            return !(e.hasOwnProperty(t) && !e[t]) && u(this._availableNames, t) >= 0
        },
        defaultOption: {
            zlevel: 0,
            z: 4,
            show: !0,
            orient: "horizontal",
            left: "center",
            top: 0,
            align: "auto",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            inactiveColor: "#ccc",
            textStyle: {color: "#333"},
            selectedMode: !0,
            tooltip: {show: !1}
        }
    });
    tu("legendToggleSelect", "legendselectchanged", x(Zd, "toggleSelected")), tu("legendSelect", "legendselected", x(Zd, "select")), tu("legendUnSelect", "legendunselected", x(Zd, "unSelect"));
    var xT = x, _T = f, wT = dy, bT = lu({
        type: "legend.plain", newlineDisabled: !1, init: function () {
            this.group.add(this._contentGroup = new wT), this._backgroundEl, this._isFirstRender = !0
        }, getContentGroup: function () {
            return this._contentGroup
        }, render: function (t, e, n) {
            var i = this._isFirstRender;
            if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {
                var r = t.get("align");
                r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === t.get("orient") ? "right" : "left"), this.renderInner(r, t, e, n);
                var a = t.getBoxLayoutParams(), o = {width: n.getWidth(), height: n.getHeight()}, l = t.get("padding"),
                    u = To(a, o, l), h = this.layoutInner(t, r, u, i),
                    c = To(s({width: h.width, height: h.height}, a), o, l);
                this.group.attr("position", [c.x - h.x, c.y - h.y]), this.group.add(this._backgroundEl = Yd(h, t))
            }
        }, resetInner: function () {
            this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl)
        }, renderInner: function (t, e, n, i) {
            var r = this.getContentGroup(), a = N(), o = e.get("selectedMode"), s = [];
            n.eachRawSeries(function (t) {
                !t.get("legendHoverLink") && s.push(t.id)
            }), _T(e.getData(), function (l, u) {
                var h = l.get("name");
                if (!this.newlineDisabled && ("" === h || "\n" === h)) return void r.add(new wT({newline: !0}));
                var c = n.getSeriesByName(h)[0];
                if (!a.get(h)) if (c) {
                    var d = c.getData(), f = d.getVisual("color");
                    "function" == typeof f && (f = f(c.getDataParams(0)));
                    var p = d.getVisual("legendSymbol") || "roundRect", g = d.getVisual("symbol"),
                        v = this._createItem(h, u, l, e, p, g, t, f, o);
                    v.on("click", xT(Ud, h, i)).on("mouseover", xT(jd, c.name, null, i, s)).on("mouseout", xT(qd, c.name, null, i, s)), a.set(h, !0)
                } else n.eachRawSeries(function (n) {
                    if (!a.get(h) && n.legendDataProvider) {
                        var r = n.legendDataProvider(), c = r.indexOfName(h);
                        if (0 > c) return;
                        var d = r.getItemVisual(c, "color"), f = "roundRect",
                            p = this._createItem(h, u, l, e, f, null, t, d, o);
                        p.on("click", xT(Ud, h, i)).on("mouseover", xT(jd, null, h, i, s)).on("mouseout", xT(qd, null, h, i, s)), a.set(h, !0)
                    }
                }, this)
            }, this)
        }, _createItem: function (t, e, n, i, r, a, s, l, u) {
            var h = i.get("itemWidth"), c = i.get("itemHeight"), d = i.get("inactiveColor"),
                f = i.get("symbolKeepAspect"), p = i.isSelected(t), g = new wT, v = n.getModel("textStyle"),
                m = n.get("icon"), y = n.getModel("tooltip"), x = y.parentModel;
            if (r = m || r, g.add(_h(r, 0, 0, h, c, p ? l : d, null == f ? !0 : f)), !m && a && (a !== r || "none" === a)) {
                var _ = .8 * c;
                "none" === a && (a = "circle"), g.add(_h(a, (h - _) / 2, (c - _) / 2, _, _, p ? l : d, null == f ? !0 : f))
            }
            var w = "left" === s ? h + 5 : -5, b = s, M = i.get("formatter"), S = t;
            "string" == typeof M && M ? S = M.replace("{name}", null != t ? t : "") : "function" == typeof M && (S = M(t)), g.add(new I_({
                style: Sa({}, v, {
                    text: S,
                    x: w,
                    y: c / 2,
                    textFill: p ? v.getTextColor() : d,
                    textAlign: b,
                    textVerticalAlign: "middle"
                })
            }));
            var I = new B_({
                shape: g.getBoundingRect(),
                invisible: !0,
                tooltip: y.get("show") ? o({
                    content: t,
                    formatter: x.get("formatter", !0) || function () {
                        return t
                    },
                    formatterParams: {componentType: "legend", legendIndex: i.componentIndex, name: t, $vars: ["name"]}
                }, y.option) : null
            });
            return g.add(I), g.eachChild(function (t) {
                t.silent = !0
            }), I.silent = !u, this.getContentGroup().add(g), wa(g), g.__legendDataIndex = e, g
        }, layoutInner: function (t, e, n) {
            var i = this.getContentGroup();
            Sw(t.get("orient"), i, t.get("itemGap"), n.width, n.height);
            var r = i.getBoundingRect();
            return i.attr("position", [-r.x, -r.y]), this.group.getBoundingRect()
        }, remove: function () {
            this.getContentGroup().removeAll(), this._isFirstRender = !0
        }
    }), MT = function (t) {
        var e = t.findComponents({mainType: "legend"});
        e && e.length && t.filterSeries(function (t) {
            for (var n = 0; n < e.length; n++) if (!e[n].isSelected(t.name)) return !1;
            return !0
        })
    };
    Ql(MT), Cw.registerSubTypeDefaulter("legend", function () {
        return "plain"
    });
    var ST = yT.extend({
        type: "legend.scroll",
        setScrollDataIndex: function (t) {
            this.option.scrollDataIndex = t
        },
        defaultOption: {
            scrollDataIndex: 0,
            pageButtonItemGap: 5,
            pageButtonGap: null,
            pageButtonPosition: "end",
            pageFormatter: "{current}/{total}",
            pageIcons: {
                horizontal: ["M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z"],
                vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"]
            },
            pageIconColor: "#2f4554",
            pageIconInactiveColor: "#aaa",
            pageIconSize: 15,
            pageTextStyle: {color: "#333"},
            animationDurationUpdate: 800
        },
        init: function (t, e, n, i) {
            var r = Do(t);
            ST.superCall(this, "init", t, e, n, i), Kd(this, t, r)
        },
        mergeOption: function (t, e) {
            ST.superCall(this, "mergeOption", t, e), Kd(this, this.option, t)
        },
        getOrient: function () {
            return "vertical" === this.get("orient") ? {index: 1, name: "vertical"} : {index: 0, name: "horizontal"}
        }
    }), IT = dy, TT = ["width", "height"], CT = ["x", "y"], AT = bT.extend({
        type: "legend.scroll", newlineDisabled: !0, init: function () {
            AT.superCall(this, "init"), this._currentIndex = 0, this.group.add(this._containerGroup = new IT), this._containerGroup.add(this.getContentGroup()), this.group.add(this._controllerGroup = new IT), this._showController
        }, resetInner: function () {
            AT.superCall(this, "resetInner"), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), this._containerGroup.__rectSize = null
        }, renderInner: function (t, e, n, i) {
            function r(t, n) {
                var r = t + "DataIndex",
                    l = Ga(e.get("pageIcons", !0)[e.getOrient().name][n], {onclick: y(a._pageGo, a, r, e, i)}, {
                        x: -s[0] / 2,
                        y: -s[1] / 2,
                        width: s[0],
                        height: s[1]
                    });
                l.name = t, o.add(l)
            }

            var a = this;
            AT.superCall(this, "renderInner", t, e, n, i);
            var o = this._controllerGroup, s = e.get("pageIconSize", !0);
            _(s) || (s = [s, s]), r("pagePrev", 0);
            var l = e.getModel("pageTextStyle");
            o.add(new I_({
                name: "pageText",
                style: {
                    textFill: l.getTextColor(),
                    font: l.getFont(),
                    textVerticalAlign: "middle",
                    textAlign: "center"
                },
                silent: !0
            })), r("pageNext", 1)
        }, layoutInner: function (t, e, n, i) {
            var r = this.getContentGroup(), a = this._containerGroup, o = this._controllerGroup,
                s = t.getOrient().index, l = TT[s], u = TT[1 - s], h = CT[1 - s];
            Sw(t.get("orient"), r, t.get("itemGap"), s ? n.width : null, s ? null : n.height), Sw("horizontal", o, t.get("pageButtonItemGap", !0));
            var c = r.getBoundingRect(), d = o.getBoundingRect(), f = this._showController = c[l] > n[l],
                p = [-c.x, -c.y];
            i || (p[s] = r.position[s]);
            var g = [0, 0], v = [-d.x, -d.y], m = D(t.get("pageButtonGap", !0), t.get("itemGap", !0));
            if (f) {
                var y = t.get("pageButtonPosition", !0);
                "end" === y ? v[s] += n[l] - d[l] : g[s] += d[l] + m
            }
            v[1 - s] += c[u] / 2 - d[u] / 2, r.attr("position", p), a.attr("position", g), o.attr("position", v);
            var x = this.group.getBoundingRect(), x = {x: 0, y: 0};
            if (x[l] = f ? n[l] : c[l], x[u] = Math.max(c[u], d[u]), x[h] = Math.min(0, d[h] + v[1 - s]), a.__rectSize = n[l], f) {
                var _ = {x: 0, y: 0};
                _[l] = Math.max(n[l] - d[l] - m, 0), _[u] = x[u], a.setClipPath(new B_({shape: _})), a.__rectSize = _[l]
            } else o.eachChild(function (t) {
                t.attr({invisible: !0, silent: !0})
            });
            var w = this._getPageInfo(t);
            return null != w.pageIndex && za(r, {position: w.contentPosition}, f ? t : !1), this._updatePageInfoView(t, w), x
        }, _pageGo: function (t, e, n) {
            var i = this._getPageInfo(e)[t];
            null != i && n.dispatchAction({type: "legendScroll", scrollDataIndex: i, legendId: e.id})
        }, _updatePageInfoView: function (t, e) {
            var n = this._controllerGroup;
            f(["pagePrev", "pageNext"], function (i) {
                var r = null != e[i + "DataIndex"], a = n.childOfName(i);
                a && (a.setStyle("fill", r ? t.get("pageIconColor", !0) : t.get("pageIconInactiveColor", !0)), a.cursor = r ? "pointer" : "default")
            });
            var i = n.childOfName("pageText"), r = t.get("pageFormatter"), a = e.pageIndex, o = null != a ? a + 1 : 0,
                s = e.pageCount;
            i && r && i.setStyle("text", b(r) ? r.replace("{current}", o).replace("{total}", s) : r({
                current: o,
                total: s
            }))
        }, _getPageInfo: function (t) {
            function e(t) {
                if (t) {
                    var e = t.getBoundingRect(), n = e[l] + t.position[o];
                    return {s: n, e: n + e[s], i: t.__legendDataIndex}
                }
            }

            function n(t, e) {
                return t.e >= e && t.s <= e + a
            }

            var i = t.get("scrollDataIndex", !0), r = this.getContentGroup(), a = this._containerGroup.__rectSize,
                o = t.getOrient().index, s = TT[o], l = CT[o], u = this._findTargetItemIndex(i), h = r.children(),
                c = h[u], d = h.length, f = d ? 1 : 0, p = {
                    contentPosition: r.position.slice(),
                    pageCount: f,
                    pageIndex: f - 1,
                    pagePrevDataIndex: null,
                    pageNextDataIndex: null
                };
            if (!c) return p;
            var g = e(c);
            p.contentPosition[o] = -g.s;
            for (var v = u + 1, m = g, y = g, x = null; d >= v; ++v) x = e(h[v]), (!x && y.e > m.s + a || x && !n(x, m.s)) && (m = y.i > m.i ? y : x, m && (null == p.pageNextDataIndex && (p.pageNextDataIndex = m.i), ++p.pageCount)), y = x;
            for (var v = u - 1, m = g, y = g, x = null; v >= -1; --v) x = e(h[v]), x && n(y, x.s) || !(m.i < y.i) || (y = m, null == p.pagePrevDataIndex && (p.pagePrevDataIndex = m.i), ++p.pageCount, ++p.pageIndex), m = x;
            return p
        }, _findTargetItemIndex: function (t) {
            var e, n = this.getContentGroup();
            return this._showController ? n.eachChild(function (n, i) {
                n.__legendDataIndex === t && (e = i)
            }) : e = 0, e
        }
    });
    tu("legendScroll", "legendscroll", function (t, e) {
        var n = t.scrollDataIndex;
        null != n && e.eachComponent({mainType: "legend", subType: "scroll", query: t}, function (t) {
            t.setScrollDataIndex(n)
        })
    });
    var DT = function (t, e) {
        var n, i = [], r = t.seriesIndex;
        if (null == r || !(n = e.getSeriesByIndex(r))) return {point: []};
        var a = n.getData(), o = Yi(a, t);
        if (null == o || 0 > o || _(o)) return {point: []};
        var s = a.getItemGraphicEl(o), l = n.coordinateSystem;
        if (n.getTooltipPosition) i = n.getTooltipPosition(o) || []; else if (l && l.dataToPoint) i = l.dataToPoint(a.getValues(p(l.dimensions, function (t) {
            return a.mapDimension(t)
        }), o, !0)) || []; else if (s) {
            var u = s.getBoundingRect().clone();
            u.applyTransform(s.transform), i = [u.x + u.width / 2, u.y + u.height / 2]
        }
        return {point: i, el: s}
    }, kT = f, PT = x, LT = Ui(), OT = function (t, e, n) {
        var i = t.currTrigger, r = [t.x, t.y], a = t, o = t.dispatchAction || y(n.dispatchAction, n),
            s = e.getComponent("axisPointer").coordSysAxesInfo;
        if (s) {
            sf(r) && (r = DT({seriesIndex: a.seriesIndex, dataIndex: a.dataIndex}, e).point);
            var l = sf(r), u = a.axesInfo, h = s.axesInfo, c = "leave" === i || sf(r), d = {}, f = {},
                p = {list: [], map: {}}, g = {showPointer: PT(Jd, f), showTooltip: PT(tf, p)};
            kT(s.coordSysMap, function (t, e) {
                var n = l || t.containPoint(r);
                kT(s.coordSysAxesInfo[e], function (t) {
                    var e = t.axis, i = af(u, t);
                    if (!c && n && (!u || i)) {
                        var a = i && i.value;
                        null != a || l || (a = e.pointToData(r)), null != a && $d(t, a, g, !1, d)
                    }
                })
            });
            var v = {};
            return kT(h, function (t, e) {
                var n = t.linkGroup;
                n && !f[e] && kT(n.axesInfo, function (e, i) {
                    var r = f[i];
                    if (e !== t && r) {
                        var a = r.value;
                        n.mapper && (a = t.axis.scale.parse(n.mapper(a, of(e), of(t)))), v[t.key] = a
                    }
                })
            }), kT(v, function (t, e) {
                $d(h[e], t, g, !0, d)
            }), ef(f, h, d), nf(p, r, t, o), rf(h, o, n), d
        }
    }, zT = (su({
        type: "axisPointer",
        coordSysAxesInfo: null,
        defaultOption: {
            show: "auto",
            triggerOn: null,
            zlevel: 0,
            z: 50,
            type: "line",
            snap: !1,
            triggerTooltip: !0,
            value: null,
            status: null,
            link: [],
            animation: null,
            animationDurationUpdate: 200,
            lineStyle: {color: "#aaa", width: 1, type: "solid"},
            shadowStyle: {color: "rgba(150,150,150,0.3)"},
            label: {
                show: !0,
                formatter: null,
                precision: "auto",
                margin: 3,
                color: "#fff",
                padding: [5, 7, 5, 7],
                backgroundColor: "auto",
                borderColor: null,
                borderWidth: 0,
                shadowBlur: 3,
                shadowColor: "#aaa"
            },
            handle: {
                show: !1,
                icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                size: 45,
                margin: 50,
                color: "#333",
                shadowBlur: 3,
                shadowColor: "#aaa",
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                throttle: 40
            }
        }
    }), Ui()), ET = f, RT = lu({
        type: "axisPointer", render: function (t, e, n) {
            var i = e.getComponent("tooltip"), r = t.get("triggerOn") || i && i.get("triggerOn") || "mousemove|click";
            lf("axisPointer", n, function (t, e, n) {
                "none" !== r && ("leave" === t || r.indexOf(t) >= 0) && n({
                    type: "updateAxisPointer",
                    currTrigger: t,
                    x: e && e.offsetX,
                    y: e && e.offsetY
                })
            })
        }, remove: function (t, e) {
            pf(e.getZr(), "axisPointer"), RT.superApply(this._model, "remove", arguments)
        }, dispose: function (t, e) {
            pf("axisPointer", e), RT.superApply(this._model, "dispose", arguments)
        }
    }), BT = Ui(), NT = i, VT = y;
    gf.prototype = {
        _group: null,
        _lastGraphicKey: null,
        _handle: null,
        _dragging: !1,
        _lastValue: null,
        _lastStatus: null,
        _payloadInfo: null,
        animationThreshold: 15,
        render: function (t, e, n, i) {
            var r = e.get("value"), a = e.get("status");
            if (this._axisModel = t, this._axisPointerModel = e, this._api = n, i || this._lastValue !== r || this._lastStatus !== a) {
                this._lastValue = r, this._lastStatus = a;
                var o = this._group, s = this._handle;
                if (!a || "hide" === a) return o && o.hide(), void (s && s.hide());
                o && o.show(), s && s.show();
                var l = {};
                this.makeElOption(l, r, t, e, n);
                var u = l.graphicKey;
                u !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = u;
                var h = this._moveAnimation = this.determineAnimation(t, e);
                if (o) {
                    var c = x(vf, e, h);
                    this.updatePointerEl(o, l, c, e), this.updateLabelEl(o, l, c, e)
                } else o = this._group = new dy, this.createPointerEl(o, l, t, e), this.createLabelEl(o, l, t, e), n.getZr().add(o);
                _f(o, e, !0), this._renderHandle(r)
            }
        },
        remove: function (t) {
            this.clear(t)
        },
        dispose: function (t) {
            this.clear(t)
        },
        determineAnimation: function (t, e) {
            var n = e.get("animation"), i = t.axis, r = "category" === i.type, a = e.get("snap");
            if (!a && !r) return !1;
            if ("auto" === n || null == n) {
                var o = this.animationThreshold;
                if (r && i.getBandWidth() > o) return !0;
                if (a) {
                    var s = Tc(t).seriesDataCount, l = i.getExtent();
                    return Math.abs(l[0] - l[1]) / s > o
                }
                return !1
            }
            return n === !0
        },
        makeElOption: function () {
        },
        createPointerEl: function (t, e) {
            var n = e.pointer;
            if (n) {
                var i = BT(t).pointerEl = new nw[n.type](NT(e.pointer));
                t.add(i)
            }
        },
        createLabelEl: function (t, e, n, i) {
            if (e.label) {
                var r = BT(t).labelEl = new B_(NT(e.label));
                t.add(r), yf(r, i)
            }
        },
        updatePointerEl: function (t, e, n) {
            var i = BT(t).pointerEl;
            i && (i.setStyle(e.pointer.style), n(i, {shape: e.pointer.shape}))
        },
        updateLabelEl: function (t, e, n, i) {
            var r = BT(t).labelEl;
            r && (r.setStyle(e.label.style), n(r, {shape: e.label.shape, position: e.label.position}), yf(r, i))
        },
        _renderHandle: function (t) {
            if (!this._dragging && this.updateHandleTransform) {
                var e = this._axisPointerModel, n = this._api.getZr(), i = this._handle, r = e.getModel("handle"),
                    a = e.get("status");
                if (!r.get("show") || !a || "hide" === a) return i && n.remove(i), void (this._handle = null);
                var o;
                this._handle || (o = !0, i = this._handle = Ga(r.get("icon"), {
                    cursor: "move",
                    draggable: !0,
                    onmousemove: function (t) {
                        Cm(t.event)
                    },
                    onmousedown: VT(this._onHandleDragMove, this, 0, 0),
                    drift: VT(this._onHandleDragMove, this),
                    ondragend: VT(this._onHandleDragEnd, this)
                }), n.add(i)), _f(i, e, !1);
                var s = ["color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY"];
                i.setStyle(r.getItemStyle(null, s));
                var l = r.get("size");
                _(l) || (l = [l, l]), i.attr("scale", [l[0] / 2, l[1] / 2]), js(this, "_doDispatchAxisPointer", r.get("throttle") || 0, "fixRate"), this._moveHandleToValue(t, o)
            }
        },
        _moveHandleToValue: function (t, e) {
            vf(this._axisPointerModel, !e && this._moveAnimation, this._handle, xf(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)))
        },
        _onHandleDragMove: function (t, e) {
            var n = this._handle;
            if (n) {
                this._dragging = !0;
                var i = this.updateHandleTransform(xf(n), [t, e], this._axisModel, this._axisPointerModel);
                this._payloadInfo = i, n.stopAnimation(), n.attr(xf(i)), BT(n).lastProp = null, this._doDispatchAxisPointer()
            }
        },
        _doDispatchAxisPointer: function () {
            var t = this._handle;
            if (t) {
                var e = this._payloadInfo, n = this._axisModel;
                this._api.dispatchAction({
                    type: "updateAxisPointer",
                    x: e.cursorPoint[0],
                    y: e.cursorPoint[1],
                    tooltipOption: e.tooltipOption,
                    axesInfo: [{axisDim: n.axis.dim, axisIndex: n.componentIndex}]
                })
            }
        },
        _onHandleDragEnd: function () {
            this._dragging = !1;
            var t = this._handle;
            if (t) {
                var e = this._axisPointerModel.get("value");
                this._moveHandleToValue(e), this._api.dispatchAction({type: "hideTip"})
            }
        },
        getHandleTransform: null,
        updateHandleTransform: null,
        clear: function (t) {
            this._lastValue = null, this._lastStatus = null;
            var e = t.getZr(), n = this._group, i = this._handle;
            e && n && (this._lastGraphicKey = null, n && e.remove(n), i && e.remove(i), this._group = null, this._handle = null, this._payloadInfo = null)
        },
        doClear: function () {
        },
        buildLabel: function (t, e, n) {
            return n = n || 0, {x: t[n], y: t[1 - n], width: e[n], height: e[1 - n]}
        }
    }, gf.prototype.constructor = gf, er(gf);
    var FT = gf.extend({
        makeElOption: function (t, e, n, i, r) {
            var a = n.axis, o = a.grid, s = i.get("type"), l = Df(o, a).getOtherAxis(a).getGlobalExtent(),
                u = a.toGlobalCoord(a.dataToCoord(e, !0));
            if (s && "none" !== s) {
                var h = wf(i), c = HT[s](a, u, l, h);
                c.style = h, t.graphicKey = c.type, t.pointer = c
            }
            var d = Lc(o.model, n);
            Tf(e, t, d, n, i, r)
        }, getHandleTransform: function (t, e, n) {
            var i = Lc(e.axis.grid.model, e, {labelInside: !1});
            return i.labelMargin = n.get("handle.margin"), {
                position: If(e.axis, t, i),
                rotation: i.rotation + (i.labelDirection < 0 ? Math.PI : 0)
            }
        }, updateHandleTransform: function (t, e, n) {
            var i = n.axis, r = i.grid, a = i.getGlobalExtent(!0), o = Df(r, i).getOtherAxis(i).getGlobalExtent(),
                s = "x" === i.dim ? 0 : 1, l = t.position;
            l[s] += e[s], l[s] = Math.min(a[1], l[s]), l[s] = Math.max(a[0], l[s]);
            var u = (o[1] + o[0]) / 2, h = [u, u];
            h[s] = l[s];
            var c = [{verticalAlign: "middle"}, {align: "center"}];
            return {position: l, rotation: t.rotation, cursorPoint: h, tooltipOption: c[s]}
        }
    }), HT = {
        line: function (t, e, n, i) {
            var r = Cf([e, n[0]], [e, n[1]], kf(t));
            return aa({shape: r, style: i}), {type: "Line", shape: r}
        }, shadow: function (t, e, n) {
            var i = Math.max(1, t.getBandWidth()), r = n[1] - n[0];
            return {type: "Rect", shape: Af([e - i / 2, n[0]], [i, r], kf(t))}
        }
    };
    pI.registerAxisPointerClass("CartesianAxisPointer", FT), $l(function (t) {
        if (t) {
            (!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});
            var e = t.axisPointer.link;
            e && !_(e) && (t.axisPointer.link = [e])
        }
    }), Ql(pM.PROCESSOR.STATISTIC, function (t, e) {
        t.getComponent("axisPointer").coordSysAxesInfo = xc(t, e)
    }), tu({
        type: "updateAxisPointer",
        event: "updateAxisPointer",
        update: ":updateAxisPointer"
    }, OT), su({
        type: "tooltip",
        dependencies: ["axisPointer"],
        defaultOption: {
            zlevel: 0,
            z: 60,
            show: !0,
            showContent: !0,
            trigger: "item",
            triggerOn: "mousemove|click",
            alwaysShowContent: !1,
            displayMode: "single",
            renderMode: "auto",
            confine: !1,
            showDelay: 0,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "rgba(50,50,50,0.7)",
            borderColor: "#333",
            borderRadius: 4,
            borderWidth: 0,
            padding: 5,
            extraCssText: "",
            axisPointer: {
                type: "line",
                axis: "auto",
                animation: "auto",
                animationDurationUpdate: 200,
                animationEasingUpdate: "exponentialOut",
                crossStyle: {color: "#999", width: 1, type: "dashed", textStyle: {}}
            },
            textStyle: {color: "#fff", fontSize: 14}
        }
    });
    var GT = f, WT = go, ZT = ["", "-webkit-", "-moz-", "-o-"],
        XT = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;";
    zf.prototype = {
        constructor: zf, _enterable: !0, update: function () {
            var t = this._container, e = t.currentStyle || document.defaultView.getComputedStyle(t), n = t.style;
            "absolute" !== n.position && "absolute" !== e.position && (n.position = "relative")
        }, show: function (t) {
            clearTimeout(this._hideTimeout);
            var e = this.el;
            e.style.cssText = XT + Of(t) + ";left:" + this._x + "px;top:" + this._y + "px;" + (t.get("extraCssText") || ""), e.style.display = e.innerHTML ? "block" : "none", e.style.pointerEvents = this._enterable ? "auto" : "none", this._show = !0
        }, setContent: function (t) {
            this.el.innerHTML = null == t ? "" : t
        }, setEnterable: function (t) {
            this._enterable = t
        }, getSize: function () {
            var t = this.el;
            return [t.clientWidth, t.clientHeight]
        }, moveTo: function (t, e) {
            var n, i = this._zr;
            i && i.painter && (n = i.painter.getViewportRootOffset()) && (t += n.offsetLeft, e += n.offsetTop);
            var r = this.el.style;
            r.left = t + "px", r.top = e + "px", this._x = t, this._y = e
        }, hide: function () {
            this.el.style.display = "none", this._show = !1
        }, hideLater: function (t) {
            !this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide())
        }, isShow: function () {
            return this._show
        }, getOuterSize: function () {
            var t = this.el.clientWidth, e = this.el.clientHeight;
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var n = document.defaultView.getComputedStyle(this.el);
                n && (t += parseInt(n.paddingLeft, 10) + parseInt(n.paddingRight, 10) + parseInt(n.borderLeftWidth, 10) + parseInt(n.borderRightWidth, 10), e += parseInt(n.paddingTop, 10) + parseInt(n.paddingBottom, 10) + parseInt(n.borderTopWidth, 10) + parseInt(n.borderBottomWidth, 10))
            }
            return {width: t, height: e}
        }
    }, Ef.prototype = {
        constructor: Ef, _enterable: !0, update: function () {
        }, show: function () {
            this._hideTimeout && clearTimeout(this._hideTimeout), this.el.attr("show", !0), this._show = !0
        }, setContent: function (t, e, n) {
            this.el && this._zr.remove(this.el);
            for (var i = {}, r = t, a = "{marker", o = "|}", s = r.indexOf(a); s >= 0;) {
                var l = r.indexOf(o), u = r.substr(s + a.length, l - s - a.length);
                i["marker" + u] = u.indexOf("sub") > -1 ? {
                    textWidth: 4,
                    textHeight: 4,
                    textBorderRadius: 2,
                    textBackgroundColor: e[u],
                    textOffset: [3, 0]
                } : {
                    textWidth: 10,
                    textHeight: 10,
                    textBorderRadius: 5,
                    textBackgroundColor: e[u]
                }, r = r.substr(l + 1), s = r.indexOf("{marker")
            }
            this.el = new I_({
                style: {
                    rich: i,
                    text: t,
                    textLineHeight: 20,
                    textBackgroundColor: n.get("backgroundColor"),
                    textBorderRadius: n.get("borderRadius"),
                    textFill: n.get("textStyle.color"),
                    textPadding: n.get("padding")
                }, z: n.get("z")
            }), this._zr.add(this.el);
            var h = this;
            this.el.on("mouseover", function () {
                h._enterable && (clearTimeout(h._hideTimeout), h._show = !0), h._inContent = !0
            }), this.el.on("mouseout", function () {
                h._enterable && h._show && h.hideLater(h._hideDelay), h._inContent = !1
            })
        }, setEnterable: function (t) {
            this._enterable = t
        }, getSize: function () {
            var t = this.el.getBoundingRect();
            return [t.width, t.height]
        }, moveTo: function (t, e) {
            this.el && this.el.attr("position", [t, e])
        }, hide: function () {
            this.el.hide(), this._show = !1
        }, hideLater: function (t) {
            !this._show || this._inContent && this._enterable || (t ? (this._hideDelay = t, this._show = !1, this._hideTimeout = setTimeout(y(this.hide, this), t)) : this.hide())
        }, isShow: function () {
            return this._show
        }, getOuterSize: function () {
            return this.getSize()
        }
    };
    var YT = y, UT = f, jT = $a, qT = new B_({shape: {x: -1, y: -1, width: 2, height: 2}});
    lu({
        type: "tooltip", init: function (t, e) {
            if (!nm.node) {
                var n = t.getComponent("tooltip"), i = n.get("renderMode");
                this._renderMode = Qi(i);
                var r;
                "html" === this._renderMode ? (r = new zf(e.getDom(), e), this._newLine = "<br/>") : (r = new Ef(e), this._newLine = "\n"), this._tooltipContent = r
            }
        }, render: function (t, e, n) {
            if (!nm.node) {
                this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = n, this._lastDataByCoordSys = null, this._alwaysShowContent = t.get("alwaysShowContent");
                var i = this._tooltipContent;
                i.update(), i.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow()
            }
        }, _initGlobalListener: function () {
            var t = this._tooltipModel, e = t.get("triggerOn");
            lf("itemTooltip", this._api, YT(function (t, n, i) {
                "none" !== e && (e.indexOf(t) >= 0 ? this._tryShow(n, i) : "leave" === t && this._hide(i))
            }, this))
        }, _keepShow: function () {
            var t = this._tooltipModel, e = this._ecModel, n = this._api;
            if (null != this._lastX && null != this._lastY && "none" !== t.get("triggerOn")) {
                var i = this;
                clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function () {
                    i.manuallyShowTip(t, e, n, {x: i._lastX, y: i._lastY})
                })
            }
        }, manuallyShowTip: function (t, e, n, i) {
            if (i.from !== this.uid && !nm.node) {
                var r = Bf(i, n);
                this._ticket = "";
                var a = i.dataByCoordSys;
                if (i.tooltip && null != i.x && null != i.y) {
                    var o = qT;
                    o.position = [i.x, i.y], o.update(), o.tooltip = i.tooltip, this._tryShow({
                        offsetX: i.x,
                        offsetY: i.y,
                        target: o
                    }, r)
                } else if (a) this._tryShow({
                    offsetX: i.x,
                    offsetY: i.y,
                    position: i.position,
                    event: {},
                    dataByCoordSys: i.dataByCoordSys,
                    tooltipOption: i.tooltipOption
                }, r); else if (null != i.seriesIndex) {
                    if (this._manuallyAxisShowTip(t, e, n, i)) return;
                    var s = DT(i, e), l = s.point[0], u = s.point[1];
                    null != l && null != u && this._tryShow({
                        offsetX: l,
                        offsetY: u,
                        position: i.position,
                        target: s.el,
                        event: {}
                    }, r)
                } else null != i.x && null != i.y && (n.dispatchAction({
                    type: "updateAxisPointer",
                    x: i.x,
                    y: i.y
                }), this._tryShow({
                    offsetX: i.x,
                    offsetY: i.y,
                    position: i.position,
                    target: n.getZr().findHover(i.x, i.y).target,
                    event: {}
                }, r))
            }
        }, manuallyHideTip: function (t, e, n, i) {
            var r = this._tooltipContent;
            !this._alwaysShowContent && this._tooltipModel && r.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = null, i.from !== this.uid && this._hide(Bf(i, n))
        }, _manuallyAxisShowTip: function (t, e, n, i) {
            var r = i.seriesIndex, a = i.dataIndex, o = e.getComponent("axisPointer").coordSysAxesInfo;
            if (null != r && null != a && null != o) {
                var s = e.getSeriesByIndex(r);
                if (s) {
                    var l = s.getData(), t = Rf([l.getItemModel(a), s, (s.coordinateSystem || {}).model, t]);
                    if ("axis" === t.get("trigger")) return n.dispatchAction({
                        type: "updateAxisPointer",
                        seriesIndex: r,
                        dataIndex: a,
                        position: i.position
                    }), !0
                }
            }
        }, _tryShow: function (t, e) {
            var n = t.target, i = this._tooltipModel;
            if (i) {
                this._lastX = t.offsetX, this._lastY = t.offsetY;
                var r = t.dataByCoordSys;
                r && r.length ? this._showAxisTooltip(r, t) : n && null != n.dataIndex ? (this._lastDataByCoordSys = null, this._showSeriesItemTooltip(t, n, e)) : n && n.tooltip ? (this._lastDataByCoordSys = null, this._showComponentItemTooltip(t, n, e)) : (this._lastDataByCoordSys = null, this._hide(e))
            }
        }, _showOrMove: function (t, e) {
            var n = t.get("showDelay");
            e = y(e, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(e, n) : e()
        }, _showAxisTooltip: function (t, e) {
            var n = this._ecModel, i = this._tooltipModel, a = [e.offsetX, e.offsetY], o = [], s = [],
                l = Rf([e.tooltipOption, i]), u = this._renderMode, h = this._newLine, c = {};
            UT(t, function (t) {
                UT(t.dataByAxis, function (t) {
                    var e = n.getComponent(t.axisDim + "Axis", t.axisIndex), i = t.value, a = [];
                    if (e && null != i) {
                        var l = Sf(i, e.axis, n, t.seriesDataIndices, t.valueLabelOpt);
                        f(t.seriesDataIndices, function (o) {
                            var h = n.getSeriesByIndex(o.seriesIndex), d = o.dataIndexInside,
                                f = h && h.getDataParams(d);
                            if (f.axisDim = t.axisDim, f.axisIndex = t.axisIndex, f.axisType = t.axisType, f.axisId = t.axisId, f.axisValue = ph(e.axis, i), f.axisValueLabel = l, f) {
                                s.push(f);
                                var p, g = h.formatTooltip(d, !0, null, u);
                                if (M(g)) {
                                    p = g.html;
                                    var v = g.markers;
                                    r(c, v)
                                } else p = g;
                                a.push(p)
                            }
                        });
                        var d = l;
                        o.push("html" !== u ? a.join(h) : (d ? vo(d) + h : "") + a.join(h))
                    }
                })
            }, this), o.reverse(), o = o.join(this._newLine + this._newLine);
            var d = e.position;
            this._showOrMove(l, function () {
                this._updateContentNotChangedOnAxis(t) ? this._updatePosition(l, d, a[0], a[1], this._tooltipContent, s) : this._showTooltipContent(l, o, s, Math.random(), a[0], a[1], d, void 0, c)
            })
        }, _showSeriesItemTooltip: function (t, e, n) {
            var i = this._ecModel, r = e.seriesIndex, a = i.getSeriesByIndex(r), o = e.dataModel || a, s = e.dataIndex,
                l = e.dataType, u = o.getData(),
                h = Rf([u.getItemModel(s), o, a && (a.coordinateSystem || {}).model, this._tooltipModel]),
                c = h.get("trigger");
            if (null == c || "item" === c) {
                var d, f, p = o.getDataParams(s, l), g = o.formatTooltip(s, !1, l, this._renderMode);
                M(g) ? (d = g.html, f = g.markers) : (d = g, f = null);
                var v = "item_" + o.name + "_" + s;
                this._showOrMove(h, function () {
                    this._showTooltipContent(h, d, p, v, t.offsetX, t.offsetY, t.position, t.target, f)
                }), n({
                    type: "showTip",
                    dataIndexInside: s,
                    dataIndex: u.getRawIndex(s),
                    seriesIndex: r,
                    from: this.uid
                })
            }
        }, _showComponentItemTooltip: function (t, e, n) {
            var i = e.tooltip;
            if ("string" == typeof i) {
                var r = i;
                i = {content: r, formatter: r}
            }
            var a = new Wa(i, this._tooltipModel, this._ecModel), o = a.get("content"), s = Math.random();
            this._showOrMove(a, function () {
                this._showTooltipContent(a, o, a.get("formatterParams") || {}, s, t.offsetX, t.offsetY, t.position, e)
            }), n({type: "showTip", from: this.uid})
        }, _showTooltipContent: function (t, e, n, i, r, a, o, s, l) {
            if (this._ticket = "", t.get("showContent") && t.get("show")) {
                var u = this._tooltipContent, h = t.get("formatter");
                o = o || t.get("position");
                var c = e;
                if (h && "string" == typeof h) c = mo(h, n, !0); else if ("function" == typeof h) {
                    var d = YT(function (e, i) {
                        e === this._ticket && (u.setContent(i, l, t), this._updatePosition(t, o, r, a, u, n, s))
                    }, this);
                    this._ticket = i, c = h(n, i, d)
                }
                u.setContent(c, l, t), u.show(t), this._updatePosition(t, o, r, a, u, n, s)
            }
        }, _updatePosition: function (t, e, n, i, r, a, o) {
            var s = this._api.getWidth(), l = this._api.getHeight();
            e = e || t.get("position");
            var u = r.getSize(), h = t.get("align"), c = t.get("verticalAlign"), d = o && o.getBoundingRect().clone();
            if (o && d.applyTransform(o.transform), "function" == typeof e && (e = e([n, i], a, r.el, d, {
                viewSize: [s, l],
                contentSize: u.slice()
            })), _(e)) n = jT(e[0], s), i = jT(e[1], l); else if (M(e)) {
                e.width = u[0], e.height = u[1];
                var f = To(e, {width: s, height: l});
                n = f.x, i = f.y, h = null, c = null
            } else if ("string" == typeof e && o) {
                var p = Ff(e, d, u);
                n = p[0], i = p[1]
            } else {
                var p = Nf(n, i, r, s, l, h ? null : 20, c ? null : 20);
                n = p[0], i = p[1]
            }
            if (h && (n -= Hf(h) ? u[0] / 2 : "right" === h ? u[0] : 0), c && (i -= Hf(c) ? u[1] / 2 : "bottom" === c ? u[1] : 0), t.get("confine")) {
                var p = Vf(n, i, r, s, l);
                n = p[0], i = p[1]
            }
            r.moveTo(n, i)
        }, _updateContentNotChangedOnAxis: function (t) {
            var e = this._lastDataByCoordSys, n = !!e && e.length === t.length;
            return n && UT(e, function (e, i) {
                var r = e.dataByAxis || {}, a = t[i] || {}, o = a.dataByAxis || [];
                n &= r.length === o.length, n && UT(r, function (t, e) {
                    var i = o[e] || {}, r = t.seriesDataIndices || [], a = i.seriesDataIndices || [];
                    n &= t.value === i.value && t.axisType === i.axisType && t.axisId === i.axisId && r.length === a.length, n && UT(r, function (t, e) {
                        var i = a[e];
                        n &= t.seriesIndex === i.seriesIndex && t.dataIndex === i.dataIndex
                    })
                })
            }), this._lastDataByCoordSys = t, !!n
        }, _hide: function (t) {
            this._lastDataByCoordSys = null, t({type: "hideTip", from: this.uid})
        }, dispose: function (t, e) {
            nm.node || (this._tooltipContent.hide(), pf("itemTooltip", e))
        }
    }), tu({type: "showTip", event: "showTip", update: "tooltip:manuallyShowTip"}, function () {
    }), tu({type: "hideTip", event: "hideTip", update: "tooltip:manuallyHideTip"}, function () {
    });
    var KT = po, $T = vo, QT = su({
        type: "marker", dependencies: ["series", "grid", "polar", "geo"], init: function (t, e, n, i) {
            this.mergeDefaultAndTheme(t, n), this.mergeOption(t, n, i.createdBySelf, !0)
        }, isAnimationEnabled: function () {
            if (nm.node) return !1;
            var t = this.__hostSeries;
            return this.getShallow("animation") && t && t.isAnimationEnabled()
        }, mergeOption: function (t, e, n, i) {
            var r = this.constructor, a = this.mainType + "Model";
            n || e.eachSeries(function (t) {
                var n = t.get(this.mainType, !0), s = t[a];
                return n && n.data ? (s ? s.mergeOption(n, e, !0) : (i && Gf(n), f(n.data, function (t) {
                    t instanceof Array ? (Gf(t[0]), Gf(t[1])) : Gf(t)
                }), s = new r(n, this, e), o(s, {
                    mainType: this.mainType,
                    seriesIndex: t.seriesIndex,
                    name: t.name,
                    createdBySelf: !0
                }), s.__hostSeries = t), void (t[a] = s)) : void (t[a] = null)
            }, this)
        }, formatTooltip: function (t) {
            var e = this.getData(), n = this.getRawValue(t), i = _(n) ? p(n, KT).join(", ") : KT(n), r = e.getName(t),
                a = $T(this.name);
            return (null != n || r) && (a += "<br />"), r && (a += $T(r), null != n && (a += " : ")), null != n && (a += $T(i)), a
        }, getData: function () {
            return this._data
        }, setData: function (t) {
            this._data = t
        }
    });
    c(QT, hb), QT.extend({
        type: "markPoint",
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: "pin",
            symbolSize: 50,
            tooltip: {trigger: "item"},
            label: {show: !0, position: "inside"},
            itemStyle: {borderWidth: 2},
            emphasis: {label: {show: !0}}
        }
    });
    var JT = u, tC = x, eC = {min: tC(Xf, "min"), max: tC(Xf, "max"), average: tC(Xf, "average")}, nC = lu({
        type: "marker", init: function () {
            this.markerGroupMap = N()
        }, render: function (t, e, n) {
            var i = this.markerGroupMap;
            i.each(function (t) {
                t.__keep = !1
            });
            var r = this.type + "Model";
            e.eachSeries(function (t) {
                var i = t[r];
                i && this.renderSeries(t, i, e, n)
            }, this), i.each(function (t) {
                !t.__keep && this.group.remove(t.group)
            }, this)
        }, renderSeries: function () {
        }
    });
    nC.extend({
        type: "markPoint", updateTransform: function (t, e, n) {
            e.eachSeries(function (t) {
                var e = t.markPointModel;
                e && (Qf(e.getData(), t, n), this.markerGroupMap.get(t.id).updateLayout(e))
            }, this)
        }, renderSeries: function (t, e, n, i) {
            var r = t.coordinateSystem, a = t.id, o = t.getData(), s = this.markerGroupMap,
                l = s.get(a) || s.set(a, new Fc), u = Jf(r, t, e);
            e.setData(u), Qf(e.getData(), t, i), u.each(function (t) {
                var n = u.getItemModel(t), i = n.getShallow("symbolSize");
                "function" == typeof i && (i = i(e.getRawValue(t), e.getDataParams(t))), u.setItemVisual(t, {
                    symbolSize: i,
                    color: n.get("itemStyle.color") || o.getVisual("color"),
                    symbol: n.getShallow("symbol")
                })
            }), l.updateData(u), this.group.add(l.group), u.eachItemGraphicEl(function (t) {
                t.traverse(function (t) {
                    t.dataModel = e
                })
            }), l.__keep = !0, l.group.silent = e.get("silent") || t.get("silent")
        }
    }), $l(function (t) {
        t.markPoint = t.markPoint || {}
    }), QT.extend({
        type: "markLine",
        defaultOption: {
            zlevel: 0,
            z: 5,
            symbol: ["circle", "arrow"],
            symbolSize: [8, 16],
            precision: 2,
            tooltip: {trigger: "item"},
            label: {show: !0, position: "end"},
            lineStyle: {type: "dashed"},
            emphasis: {label: {show: !0}, lineStyle: {width: 3}},
            animationEasing: "linear"
        }
    });
    var iC = V_.prototype, rC = H_.prototype, aC = Jr({
        type: "ec-line",
        style: {stroke: "#000", fill: null},
        shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1, cpx1: null, cpy1: null},
        buildPath: function (t, e) {
            (tp(e) ? iC : rC).buildPath(t, e)
        },
        pointAt: function (t) {
            return tp(this.shape) ? iC.pointAt.call(this, t) : rC.pointAt.call(this, t)
        },
        tangentAt: function (t) {
            var e = this.shape, n = tp(e) ? [e.x2 - e.x1, e.y2 - e.y1] : rC.tangentAt.call(this, t);
            return te(n, n)
        }
    }), oC = ["fromSymbol", "toSymbol"], sC = op.prototype;
    sC.beforeUpdate = ap, sC._createLine = function (t, e, n) {
        var i = t.hostModel, r = t.getItemLayout(e), a = ip(r);
        a.shape.percent = 0, Ea(a, {shape: {percent: 1}}, i, e), this.add(a);
        var o = new I_({name: "label", lineLabelOriginalOpacity: 1});
        this.add(o), f(oC, function (n) {
            var i = np(n, t, e);
            this.add(i), this[ep(n)] = t.getItemVisual(e, n)
        }, this), this._updateCommonStl(t, e, n)
    }, sC.updateData = function (t, e, n) {
        var i = t.hostModel, r = this.childOfName("line"), a = t.getItemLayout(e), o = {shape: {}};
        rp(o.shape, a), za(r, o, i, e), f(oC, function (n) {
            var i = t.getItemVisual(e, n), r = ep(n);
            if (this[r] !== i) {
                this.remove(this.childOfName(n));
                var a = np(n, t, e);
                this.add(a)
            }
            this[r] = i
        }, this), this._updateCommonStl(t, e, n)
    }, sC._updateCommonStl = function (t, e, n) {
        var i = t.hostModel, r = this.childOfName("line"), a = n && n.lineStyle, o = n && n.hoverLineStyle,
            l = n && n.labelModel, u = n && n.hoverLabelModel;
        if (!n || t.hasItemOption) {
            var h = t.getItemModel(e);
            a = h.getModel("lineStyle").getLineStyle(), o = h.getModel("emphasis.lineStyle").getLineStyle(), l = h.getModel("label"), u = h.getModel("emphasis.label")
        }
        var c = t.getItemVisual(e, "color"), d = k(t.getItemVisual(e, "opacity"), a.opacity, 1);
        r.useStyle(s({
            strokeNoScale: !0,
            fill: "none",
            stroke: c,
            opacity: d
        }, a)), r.hoverStyle = o, f(oC, function (t) {
            var e = this.childOfName(t);
            e && (e.setColor(c), e.setStyle({opacity: d}))
        }, this);
        var p, g, v = l.getShallow("show"), m = u.getShallow("show"), y = this.childOfName("label");
        if ((v || m) && (p = c || "#000", g = i.getFormattedLabel(e, "normal", t.dataType), null == g)) {
            var x = i.getRawValue(e);
            g = null == x ? t.getName(e) : isFinite(x) ? Qa(x) : x
        }
        var _ = v ? g : null, w = m ? D(i.getFormattedLabel(e, "emphasis", t.dataType), g) : null, b = y.style;
        (null != _ || null != w) && (Sa(y.style, l, {text: _}, {autoColor: p}), y.__textAlign = b.textAlign, y.__verticalAlign = b.textVerticalAlign, y.__position = l.get("position") || "middle"), y.hoverStyle = null != w ? {
            text: w,
            textFill: u.getTextColor(!0),
            fontStyle: u.getShallow("fontStyle"),
            fontWeight: u.getShallow("fontWeight"),
            fontSize: u.getShallow("fontSize"),
            fontFamily: u.getShallow("fontFamily")
        } : {text: null}, y.ignore = !v && !m, wa(this)
    }, sC.highlight = function () {
        this.trigger("emphasis")
    }, sC.downplay = function () {
        this.trigger("normal")
    }, sC.updateLayout = function (t, e) {
        this.setLinePoints(t.getItemLayout(e))
    }, sC.setLinePoints = function (t) {
        var e = this.childOfName("line");
        rp(e.shape, t), e.dirty()
    }, h(op, dy);
    var lC = sp.prototype;
    lC.isPersistent = function () {
        return !0
    }, lC.updateData = function (t) {
        var e = this, n = e.group, i = e._lineData;
        e._lineData = t, i || n.removeAll();
        var r = hp(t);
        t.diff(i).add(function (n) {
            lp(e, t, n, r)
        }).update(function (n, a) {
            up(e, i, t, a, n, r)
        }).remove(function (t) {
            n.remove(i.getItemGraphicEl(t))
        }).execute()
    }, lC.updateLayout = function () {
        var t = this._lineData;
        t && t.eachItemGraphicEl(function (e, n) {
            e.updateLayout(t, n)
        }, this)
    }, lC.incrementalPrepareUpdate = function (t) {
        this._seriesScope = hp(t), this._lineData = null, this.group.removeAll()
    }, lC.incrementalUpdate = function (t, e) {
        function n(t) {
            t.isGroup || (t.incremental = t.useHoverLayer = !0)
        }

        for (var i = t.start; i < t.end; i++) {
            var r = e.getItemLayout(i);
            if (dp(r)) {
                var a = new this._ctor(e, i, this._seriesScope);
                a.traverse(n), this.group.add(a), e.setItemGraphicEl(i, a)
            }
        }
    }, lC.remove = function () {
        this._clearIncremental(), this._incremental = null, this.group.removeAll()
    }, lC._clearIncremental = function () {
        var t = this._incremental;
        t && t.clearDisplaybles()
    };
    var uC = function (t, e, n, a) {
        var s = t.getData(), l = a.type;
        if (!_(a) && ("min" === l || "max" === l || "average" === l || "median" === l || null != a.xAxis || null != a.yAxis)) {
            var u, h, c;
            if (null != a.yAxis || null != a.xAxis) h = null != a.yAxis ? "y" : "x", u = e.getAxis(h), c = A(a.yAxis, a.xAxis); else {
                var d = Uf(a, s, e, t);
                h = d.valueDataDim, u = d.valueAxis, c = $f(s, h, l)
            }
            var f = "x" === h ? 0 : 1, p = 1 - f, g = i(a), v = {};
            g.type = null, g.coord = [], v.coord = [], g.coord[p] = -1 / 0, v.coord[p] = 1 / 0;
            var m = n.get("precision");
            m >= 0 && "number" == typeof c && (c = +c.toFixed(Math.min(m, 20))), g.coord[f] = v.coord[f] = c, a = [g, v, {
                type: l,
                valueIndex: a.valueIndex,
                value: c
            }]
        }
        return a = [Yf(t, a[0]), Yf(t, a[1]), o({}, a[2])], a[2].type = a[2].type || "", r(a[2], a[0]), r(a[2], a[1]), a
    };
    nC.extend({
        type: "markLine", updateTransform: function (t, e, n) {
            e.eachSeries(function (t) {
                var e = t.markLineModel;
                if (e) {
                    var i = e.getData(), r = e.__from, a = e.__to;
                    r.each(function (e) {
                        vp(r, e, !0, t, n), vp(a, e, !1, t, n)
                    }), i.each(function (t) {
                        i.setItemLayout(t, [r.getItemLayout(t), a.getItemLayout(t)])
                    }), this.markerGroupMap.get(t.id).updateLayout()
                }
            }, this)
        }, renderSeries: function (t, e, n, i) {
            function r(e, n, r) {
                var a = e.getItemModel(n);
                vp(e, n, r, t, i), e.setItemVisual(n, {
                    symbolSize: a.get("symbolSize") || g[r ? 0 : 1],
                    symbol: a.get("symbol", !0) || p[r ? 0 : 1],
                    color: a.get("itemStyle.color") || s.getVisual("color")
                })
            }

            var a = t.coordinateSystem, o = t.id, s = t.getData(), l = this.markerGroupMap,
                u = l.get(o) || l.set(o, new sp);
            this.group.add(u.group);
            var h = mp(a, t, e), c = h.from, d = h.to, f = h.line;
            e.__from = c, e.__to = d, e.setData(f);
            var p = e.get("symbol"), g = e.get("symbolSize");
            _(p) || (p = [p, p]), "number" == typeof g && (g = [g, g]), h.from.each(function (t) {
                r(c, t, !0), r(d, t, !1)
            }), f.each(function (t) {
                var e = f.getItemModel(t).get("lineStyle.color");
                f.setItemVisual(t, {color: e || c.getItemVisual(t, "color")}), f.setItemLayout(t, [c.getItemLayout(t), d.getItemLayout(t)]), f.setItemVisual(t, {
                    fromSymbolSize: c.getItemVisual(t, "symbolSize"),
                    fromSymbol: c.getItemVisual(t, "symbol"),
                    toSymbolSize: d.getItemVisual(t, "symbolSize"),
                    toSymbol: d.getItemVisual(t, "symbol")
                })
            }), u.updateData(f), h.line.eachItemGraphicEl(function (t) {
                t.traverse(function (t) {
                    t.dataModel = e
                })
            }), u.__keep = !0, u.group.silent = e.get("silent") || t.get("silent")
        }
    }), $l(function (t) {
        t.markLine = t.markLine || {}
    });
    var hC = function (t) {
        var e = t && t.timeline;
        _(e) || (e = e ? [e] : []), f(e, function (t) {
            t && yp(t)
        })
    };
    Cw.registerSubTypeDefaulter("timeline", function () {
        return "slider"
    }), tu({type: "timelineChange", event: "timelineChanged", update: "prepareAndUpdate"}, function (t, e) {
        var n = e.getComponent("timeline");
        return n && null != t.currentIndex && (n.setCurrentIndex(t.currentIndex), !n.get("loop", !0) && n.isIndexMax() && n.setPlayState(!1)), e.resetOption("timeline"), s({currentIndex: n.option.currentIndex}, t)
    }), tu({type: "timelinePlayChange", event: "timelinePlayChanged", update: "update"}, function (t, e) {
        var n = e.getComponent("timeline");
        n && null != t.playState && n.setPlayState(t.playState)
    });
    var cC = Cw.extend({
        type: "timeline",
        layoutMode: "box",
        defaultOption: {
            zlevel: 0,
            z: 4,
            show: !0,
            axisType: "time",
            realtime: !0,
            left: "20%",
            top: null,
            right: "20%",
            bottom: 0,
            width: null,
            height: 40,
            padding: 5,
            controlPosition: "left",
            autoPlay: !1,
            rewind: !1,
            loop: !0,
            playInterval: 2e3,
            currentIndex: 0,
            itemStyle: {},
            label: {color: "#000"},
            data: []
        },
        init: function (t, e, n) {
            this._data, this._names, this.mergeDefaultAndTheme(t, n), this._initData()
        },
        mergeOption: function () {
            cC.superApply(this, "mergeOption", arguments), this._initData()
        },
        setCurrentIndex: function (t) {
            null == t && (t = this.option.currentIndex);
            var e = this._data.count();
            this.option.loop ? t = (t % e + e) % e : (t >= e && (t = e - 1), 0 > t && (t = 0)), this.option.currentIndex = t
        },
        getCurrentIndex: function () {
            return this.option.currentIndex
        },
        isIndexMax: function () {
            return this.getCurrentIndex() >= this._data.count() - 1
        },
        setPlayState: function (t) {
            this.option.autoPlay = !!t
        },
        getPlayState: function () {
            return !!this.option.autoPlay
        },
        _initData: function () {
            var t = this.option, e = t.data || [], n = t.axisType, r = this._names = [];
            if ("category" === n) {
                var a = [];
                f(e, function (t, e) {
                    var n, o = Vi(t);
                    M(t) ? (n = i(t), n.value = e) : n = e, a.push(n), b(o) || null != o && !isNaN(o) || (o = ""), r.push(o + "")
                }), e = a
            }
            var o = {category: "ordinal", time: "time"}[n] || "number",
                s = this._data = new UM([{name: "value", type: o}], this);
            s.initData(e, r)
        },
        getData: function () {
            return this._data
        },
        getCategories: function () {
            return "category" === this.get("axisType") ? this._names.slice() : void 0
        }
    }), dC = cC.extend({
        type: "timeline.slider", defaultOption: {
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            orient: "horizontal",
            inverse: !1,
            tooltip: {trigger: "item"},
            symbol: "emptyCircle",
            symbolSize: 10,
            lineStyle: {show: !0, width: 2, color: "#304654"},
            label: {position: "auto", show: !0, interval: "auto", rotate: 0, color: "#304654"},
            itemStyle: {color: "#304654", borderWidth: 1},
            checkpointStyle: {
                symbol: "circle",
                symbolSize: 13,
                color: "#c23531",
                borderWidth: 5,
                borderColor: "rgba(194,53,49, 0.5)",
                animation: !0,
                animationDuration: 300,
                animationEasing: "quinticInOut"
            },
            controlStyle: {
                show: !0,
                showPlayBtn: !0,
                showPrevBtn: !0,
                showNextBtn: !0,
                itemSize: 22,
                itemGap: 12,
                position: "left",
                playIcon: "path://M31.6,53C17.5,53,6,41.5,6,27.4S17.5,1.8,31.6,1.8C45.7,1.8,57.2,13.3,57.2,27.4S45.7,53,31.6,53z M31.6,3.3 C18.4,3.3,7.5,14.1,7.5,27.4c0,13.3,10.8,24.1,24.1,24.1C44.9,51.5,55.7,40.7,55.7,27.4C55.7,14.1,44.9,3.3,31.6,3.3z M24.9,21.3 c0-2.2,1.6-3.1,3.5-2l10.5,6.1c1.899,1.1,1.899,2.9,0,4l-10.5,6.1c-1.9,1.1-3.5,0.2-3.5-2V21.3z",
                stopIcon: "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
                nextIcon: "path://M18.6,50.8l22.5-22.5c0.2-0.2,0.3-0.4,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7L18.7,4.4c-0.1-0.1-0.2-0.3-0.2-0.5 c0-0.4,0.3-0.8,0.8-0.8c0.2,0,0.5,0.1,0.6,0.3l23.5,23.5l0,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-0.1,0.1L19.7,52 c-0.1,0.1-0.3,0.2-0.5,0.2c-0.4,0-0.8-0.3-0.8-0.8C18.4,51.2,18.5,51,18.6,50.8z",
                prevIcon: "path://M43,52.8L20.4,30.3c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.3-0.7L42.9,6.4c0.1-0.1,0.2-0.3,0.2-0.5 c0-0.4-0.3-0.8-0.8-0.8c-0.2,0-0.5,0.1-0.6,0.3L18.3,28.8l0,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l0.1,0.1L41.9,54 c0.1,0.1,0.3,0.2,0.5,0.2c0.4,0,0.8-0.3,0.8-0.8C43.2,53.2,43.1,53,43,52.8z",
                color: "#304654",
                borderColor: "#304654",
                borderWidth: 1
            },
            emphasis: {
                label: {show: !0, color: "#c23531"},
                itemStyle: {color: "#c23531"},
                controlStyle: {color: "#c23531", borderColor: "#c23531", borderWidth: 2}
            },
            data: []
        }
    });
    c(dC, hb);
    var fC = gb.extend({type: "timeline"}), pC = function (t, e, n, i) {
        HS.call(this, t, e, n), this.type = i || "value", this.model = null
    };
    pC.prototype = {
        constructor: pC, getLabelModel: function () {
            return this.model.getModel("label")
        }, isHorizontal: function () {
            return "horizontal" === this.model.get("orient")
        }
    }, h(pC, HS);
    var gC = y, vC = f, mC = Math.PI;
    fC.extend({
        type: "timeline.slider", init: function (t, e) {
            this.api = e, this._axis, this._viewRect, this._timer, this._currentPointer, this._mainGroup, this._labelGroup
        }, render: function (t, e, n) {
            if (this.model = t, this.api = n, this.ecModel = e, this.group.removeAll(), t.get("show", !0)) {
                var i = this._layout(t, n), r = this._createGroup("mainGroup"), a = this._createGroup("labelGroup"),
                    o = this._axis = this._createAxis(i, t);
                t.formatTooltip = function (t) {
                    return vo(o.scale.getLabel(t))
                }, vC(["AxisLine", "AxisTick", "Control", "CurrentPointer"], function (e) {
                    this["_render" + e](i, r, o, t)
                }, this), this._renderAxisLabel(i, a, o, t), this._position(i, t)
            }
            this._doPlayStop()
        }, remove: function () {
            this._clearTimer(), this.group.removeAll()
        }, dispose: function () {
            this._clearTimer()
        }, _layout: function (t, e) {
            var n = t.get("label.position"), i = t.get("orient"), r = wp(t, e);
            null == n || "auto" === n ? n = "horizontal" === i ? r.y + r.height / 2 < e.getHeight() / 2 ? "-" : "+" : r.x + r.width / 2 < e.getWidth() / 2 ? "+" : "-" : isNaN(n) && (n = {
                horizontal: {
                    top: "-",
                    bottom: "+"
                }, vertical: {left: "-", right: "+"}
            }[i][n]);
            var a = {horizontal: "center", vertical: n >= 0 || "+" === n ? "left" : "right"},
                o = {horizontal: n >= 0 || "+" === n ? "top" : "bottom", vertical: "middle"},
                s = {horizontal: 0, vertical: mC / 2}, l = "vertical" === i ? r.height : r.width,
                u = t.getModel("controlStyle"), h = u.get("show", !0), c = h ? u.get("itemSize") : 0,
                d = h ? u.get("itemGap") : 0, f = c + d, p = t.get("label.rotate") || 0;
            p = p * mC / 180;
            var g, v, m, y, x = u.get("position", !0), _ = h && u.get("showPlayBtn", !0),
                w = h && u.get("showPrevBtn", !0), b = h && u.get("showNextBtn", !0), M = 0, S = l;
            return "left" === x || "bottom" === x ? (_ && (g = [0, 0], M += f), w && (v = [M, 0], M += f), b && (m = [S - c, 0], S -= f)) : (_ && (g = [S - c, 0], S -= f), w && (v = [0, 0], M += f), b && (m = [S - c, 0], S -= f)), y = [M, S], t.get("inverse") && y.reverse(), {
                viewRect: r,
                mainLength: l,
                orient: i,
                rotation: s[i],
                labelRotation: p,
                labelPosOpt: n,
                labelAlign: t.get("label.align") || a[i],
                labelBaseline: t.get("label.verticalAlign") || t.get("label.baseline") || o[i],
                playPosition: g,
                prevBtnPosition: v,
                nextBtnPosition: m,
                axisExtent: y,
                controlSize: c,
                controlGap: d
            }
        }, _position: function (t) {
            function e(t) {
                var e = t.position;
                t.origin = [h[0][0] - e[0], h[1][0] - e[1]]
            }

            function n(t) {
                return [[t.x, t.x + t.width], [t.y, t.y + t.height]]
            }

            function i(t, e, n, i, r) {
                t[i] += n[i][r] - e[i][r]
            }

            var r = this._mainGroup, a = this._labelGroup, o = t.viewRect;
            if ("vertical" === t.orient) {
                var s = Ie(), l = o.x, u = o.y + o.height;
                De(s, s, [-l, -u]), ke(s, s, -mC / 2), De(s, s, [l, u]), o = o.clone(), o.applyTransform(s)
            }
            var h = n(o), c = n(r.getBoundingRect()), d = n(a.getBoundingRect()), f = r.position, p = a.position;
            p[0] = f[0] = h[0][0];
            var g = t.labelPosOpt;
            if (isNaN(g)) {
                var v = "+" === g ? 0 : 1;
                i(f, c, h, 1, v), i(p, d, h, 1, 1 - v)
            } else {
                var v = g >= 0 ? 0 : 1;
                i(f, c, h, 1, v), p[1] = f[1] + g
            }
            r.attr("position", f), a.attr("position", p), r.rotation = a.rotation = t.rotation, e(r), e(a)
        }, _createAxis: function (t, e) {
            var n = e.getData(), i = e.get("axisType"), r = ch(e, i);
            r.getTicks = function () {
                return n.mapArray(["value"], function (t) {
                    return t
                })
            };
            var a = n.getDataExtent("value");
            r.setExtent(a[0], a[1]), r.niceTicks();
            var o = new pC("value", r, t.axisExtent, i);
            return o.model = e, o
        }, _createGroup: function (t) {
            var e = this["_" + t] = new dy;
            return this.group.add(e), e
        }, _renderAxisLine: function (t, e, n, i) {
            var r = n.getExtent();
            i.get("lineStyle.show") && e.add(new V_({
                shape: {x1: r[0], y1: 0, x2: r[1], y2: 0},
                style: o({lineCap: "round"}, i.getModel("lineStyle").getLineStyle()),
                silent: !0,
                z2: 1
            }))
        }, _renderAxisTick: function (t, e, n, i) {
            var r = i.getData(), a = n.scale.getTicks();
            vC(a, function (t) {
                var a = n.dataToCoord(t), o = r.getItemModel(t), s = o.getModel("itemStyle"),
                    l = o.getModel("emphasis.itemStyle"),
                    u = {position: [a, 0], onclick: gC(this._changeTimeline, this, t)}, h = Mp(o, s, e, u);
                wa(h, l.getItemStyle()), o.get("tooltip") ? (h.dataIndex = t, h.dataModel = i) : h.dataIndex = h.dataModel = null
            }, this)
        }, _renderAxisLabel: function (t, e, n, i) {
            var r = n.getLabelModel();
            if (r.get("show")) {
                var a = i.getData(), o = n.getViewLabels();
                vC(o, function (i) {
                    var r = i.tickValue, o = a.getItemModel(r), s = o.getModel("label"),
                        l = o.getModel("emphasis.label"), u = n.dataToCoord(i.tickValue), h = new I_({
                            position: [u, 0],
                            rotation: t.labelRotation - t.rotation,
                            onclick: gC(this._changeTimeline, this, r),
                            silent: !1
                        });
                    Sa(h.style, s, {
                        text: i.formattedLabel,
                        textAlign: t.labelAlign,
                        textVerticalAlign: t.labelBaseline
                    }), e.add(h), wa(h, Sa({}, l))
                }, this)
            }
        }, _renderControl: function (t, e, n, i) {
            function r(t, n, r, h) {
                if (t) {
                    var c = {
                        position: t,
                        origin: [a / 2, 0],
                        rotation: h ? -o : 0,
                        rectHover: !0,
                        style: s,
                        onclick: r
                    }, d = bp(i, n, u, c);
                    e.add(d), wa(d, l)
                }
            }

            var a = t.controlSize, o = t.rotation, s = i.getModel("controlStyle").getItemStyle(),
                l = i.getModel("emphasis.controlStyle").getItemStyle(), u = [0, -a / 2, a, a], h = i.getPlayState(),
                c = i.get("inverse", !0);
            r(t.nextBtnPosition, "controlStyle.nextIcon", gC(this._changeTimeline, this, c ? "-" : "+")), r(t.prevBtnPosition, "controlStyle.prevIcon", gC(this._changeTimeline, this, c ? "+" : "-")), r(t.playPosition, "controlStyle." + (h ? "stopIcon" : "playIcon"), gC(this._handlePlayClick, this, !h), !0)
        }, _renderCurrentPointer: function (t, e, n, i) {
            var r = i.getData(), a = i.getCurrentIndex(), o = r.getItemModel(a).getModel("checkpointStyle"), s = this,
                l = {
                    onCreate: function (t) {
                        t.draggable = !0, t.drift = gC(s._handlePointerDrag, s), t.ondragend = gC(s._handlePointerDragend, s), Sp(t, a, n, i, !0)
                    }, onUpdate: function (t) {
                        Sp(t, a, n, i)
                    }
                };
            this._currentPointer = Mp(o, o, this._mainGroup, {}, this._currentPointer, l)
        }, _handlePlayClick: function (t) {
            this._clearTimer(), this.api.dispatchAction({type: "timelinePlayChange", playState: t, from: this.uid})
        }, _handlePointerDrag: function (t, e, n) {
            this._clearTimer(), this._pointerChangeTimeline([n.offsetX, n.offsetY])
        }, _handlePointerDragend: function (t) {
            this._pointerChangeTimeline([t.offsetX, t.offsetY], !0)
        }, _pointerChangeTimeline: function (t, e) {
            var n = this._toAxisCoord(t)[0], i = this._axis, r = Ja(i.getExtent().slice());
            n > r[1] && (n = r[1]), n < r[0] && (n = r[0]), this._currentPointer.position[0] = n, this._currentPointer.dirty();
            var a = this._findNearestTick(n), o = this.model;
            (e || a !== o.getCurrentIndex() && o.get("realtime")) && this._changeTimeline(a)
        }, _doPlayStop: function () {
            function t() {
                var t = this.model;
                this._changeTimeline(t.getCurrentIndex() + (t.get("rewind", !0) ? -1 : 1))
            }

            this._clearTimer(), this.model.getPlayState() && (this._timer = setTimeout(gC(t, this), this.model.get("playInterval")))
        }, _toAxisCoord: function (t) {
            var e = this._mainGroup.getLocalTransform();
            return Ba(t, e, !0)
        }, _findNearestTick: function (t) {
            var e, n = this.model.getData(), i = 1 / 0, r = this._axis;
            return n.each(["value"], function (n, a) {
                var o = r.dataToCoord(n), s = Math.abs(o - t);
                i > s && (i = s, e = a)
            }), e
        }, _clearTimer: function () {
            this._timer && (clearTimeout(this._timer), this._timer = null)
        }, _changeTimeline: function (t) {
            var e = this.model.getCurrentIndex();
            "+" === t ? t = e + 1 : "-" === t && (t = e - 1), this.api.dispatchAction({
                type: "timelineChange",
                currentIndex: t,
                from: this.uid
            })
        }
    }), $l(hC), Cw.registerSubTypeDefaulter("dataZoom", function () {
        return "slider"
    });
    var yC = ["x", "y", "z", "radius", "angle", "single"], xC = ["cartesian2d", "polar", "singleAxis"],
        _C = Tp(yC, ["axisIndex", "axis", "index", "id"]), wC = f, bC = Ja, MC = function (t, e, n, i) {
            this._dimName = t, this._axisIndex = e, this._valueWindow, this._percentWindow, this._dataExtent, this._minMaxSpan, this.ecModel = i, this._dataZoomModel = n
        };
    MC.prototype = {
        constructor: MC, hostedBy: function (t) {
            return this._dataZoomModel === t
        }, getDataValueWindow: function () {
            return this._valueWindow.slice()
        }, getDataPercentWindow: function () {
            return this._percentWindow.slice()
        }, getTargetSeriesModels: function () {
            var t = [], e = this.ecModel;
            return e.eachSeries(function (n) {
                if (Ip(n.get("coordinateSystem"))) {
                    var i = this._dimName, r = e.queryComponents({
                        mainType: i + "Axis",
                        index: n.get(i + "AxisIndex"),
                        id: n.get(i + "AxisId")
                    })[0];
                    this._axisIndex === (r && r.componentIndex) && t.push(n)
                }
            }, this), t
        }, getAxisModel: function () {
            return this.ecModel.getComponent(this._dimName + "Axis", this._axisIndex)
        }, getOtherAxisModel: function () {
            var t, e, n = this._dimName, i = this.ecModel, r = this.getAxisModel(), a = "x" === n || "y" === n;
            a ? (e = "gridIndex", t = "x" === n ? "y" : "x") : (e = "polarIndex", t = "angle" === n ? "radius" : "angle");
            var o;
            return i.eachComponent(t + "Axis", function (t) {
                (t.get(e) || 0) === (r.get(e) || 0) && (o = t)
            }), o
        }, getMinMaxSpan: function () {
            return i(this._minMaxSpan)
        }, calculateDataWindow: function (t) {
            var e = this._dataExtent, n = this.getAxisModel(), i = n.axis.scale,
                r = this._dataZoomModel.getRangePropMode(), a = [0, 100], o = [t.start, t.end], s = [];
            return wC(["startValue", "endValue"], function (e) {
                s.push(null != t[e] ? i.parse(t[e]) : null)
            }), wC([0, 1], function (t) {
                var n = s[t], l = o[t];
                "percent" === r[t] ? (null == l && (l = a[t]), n = i.parse(Ka(l, a, e, !0))) : l = Ka(n, e, a, !0), s[t] = n, o[t] = l
            }), {valueWindow: bC(s), percentWindow: bC(o)}
        }, reset: function (t) {
            if (t === this._dataZoomModel) {
                var e = this.getTargetSeriesModels();
                this._dataExtent = Ap(this, this._dimName, e);
                var n = this.calculateDataWindow(t.option);
                this._valueWindow = n.valueWindow, this._percentWindow = n.percentWindow, Pp(this), kp(this)
            }
        }, restore: function (t) {
            t === this._dataZoomModel && (this._valueWindow = this._percentWindow = null, kp(this, !0))
        }, filterData: function (t) {
            function e(t) {
                return t >= a[0] && t <= a[1]
            }

            if (t === this._dataZoomModel) {
                var n = this._dimName, i = this.getTargetSeriesModels(), r = t.get("filterMode"), a = this._valueWindow;
                "none" !== r && wC(i, function (t) {
                    var i = t.getData(), o = i.mapDimension(n, !0);
                    o.length && ("weakFilter" === r ? i.filterSelf(function (t) {
                        for (var e, n, r, s = 0; s < o.length; s++) {
                            var l = i.get(o[s], t), u = !isNaN(l), h = l < a[0], c = l > a[1];
                            if (u && !h && !c) return !0;
                            u && (r = !0), h && (e = !0), c && (n = !0)
                        }
                        return r && e && n
                    }) : wC(o, function (n) {
                        if ("empty" === r) t.setData(i.map(n, function (t) {
                            return e(t) ? t : 0 / 0
                        })); else {
                            var o = {};
                            o[n] = a, i.selectRange(o)
                        }
                    }), wC(o, function (t) {
                        i.setApproximateExtent(a, t)
                    }))
                })
            }
        }
    };
    var SC = f, IC = _C, TC = su({
            type: "dataZoom",
            dependencies: ["xAxis", "yAxis", "zAxis", "radiusAxis", "angleAxis", "singleAxis", "series"],
            defaultOption: {
                zlevel: 0,
                z: 4,
                orient: null,
                xAxisIndex: null,
                yAxisIndex: null,
                filterMode: "filter",
                throttle: null,
                start: 0,
                end: 100,
                startValue: null,
                endValue: null,
                minSpan: null,
                maxSpan: null,
                minValueSpan: null,
                maxValueSpan: null,
                rangeMode: null
            },
            init: function (t, e, n) {
                this._dataIntervalByAxis = {}, this._dataInfo = {}, this._axisProxies = {}, this.textStyleModel, this._autoThrottle = !0, this._rangePropMode = ["percent", "percent"];
                var i = Lp(t);
                this.mergeDefaultAndTheme(t, n), this.doInit(i)
            },
            mergeOption: function (t) {
                var e = Lp(t);
                r(this.option, t, !0), this.doInit(e)
            },
            doInit: function (t) {
                var e = this.option;
                nm.canvasSupported || (e.realtime = !1), this._setDefaultThrottle(t), Op(this, t), SC([["start", "startValue"], ["end", "endValue"]], function (t, n) {
                    "value" === this._rangePropMode[n] && (e[t[0]] = null)
                }, this), this.textStyleModel = this.getModel("textStyle"), this._resetTarget(), this._giveAxisProxies()
            },
            _giveAxisProxies: function () {
                var t = this._axisProxies;
                this.eachTargetAxis(function (e, n, i, r) {
                    var a = this.dependentModels[e.axis][n],
                        o = a.__dzAxisProxy || (a.__dzAxisProxy = new MC(e.name, n, this, r));
                    t[e.name + "_" + n] = o
                }, this)
            },
            _resetTarget: function () {
                var t = this.option, e = this._judgeAutoMode();
                IC(function (e) {
                    var n = e.axisIndex;
                    t[n] = Bi(t[n])
                }, this), "axisIndex" === e ? this._autoSetAxisIndex() : "orient" === e && this._autoSetOrient()
            },
            _judgeAutoMode: function () {
                var t = this.option, e = !1;
                IC(function (n) {
                    null != t[n.axisIndex] && (e = !0)
                }, this);
                var n = t.orient;
                return null == n && e ? "orient" : e ? void 0 : (null == n && (t.orient = "horizontal"), "axisIndex")
            },
            _autoSetAxisIndex: function () {
                var t = !0, e = this.get("orient", !0), n = this.option, i = this.dependentModels;
                if (t) {
                    var r = "vertical" === e ? "y" : "x";
                    i[r + "Axis"].length ? (n[r + "AxisIndex"] = [0], t = !1) : SC(i.singleAxis, function (i) {
                        t && i.get("orient", !0) === e && (n.singleAxisIndex = [i.componentIndex], t = !1)
                    })
                }
                t && IC(function (e) {
                    if (t) {
                        var i = [], r = this.dependentModels[e.axis];
                        if (r.length && !i.length) for (var a = 0, o = r.length; o > a; a++) "category" === r[a].get("type") && i.push(a);
                        n[e.axisIndex] = i, i.length && (t = !1)
                    }
                }, this), t && this.ecModel.eachSeries(function (t) {
                    this._isSeriesHasAllAxesTypeOf(t, "value") && IC(function (e) {
                        var i = n[e.axisIndex], r = t.get(e.axisIndex), a = t.get(e.axisId),
                            o = t.ecModel.queryComponents({mainType: e.axis, index: r, id: a})[0];
                        r = o.componentIndex, u(i, r) < 0 && i.push(r)
                    })
                }, this)
            },
            _autoSetOrient: function () {
                var t;
                this.eachTargetAxis(function (e) {
                    !t && (t = e.name)
                }, this), this.option.orient = "y" === t ? "vertical" : "horizontal"
            },
            _isSeriesHasAllAxesTypeOf: function (t, e) {
                var n = !0;
                return IC(function (i) {
                    var r = t.get(i.axisIndex), a = this.dependentModels[i.axis][r];
                    a && a.get("type") === e || (n = !1)
                }, this), n
            },
            _setDefaultThrottle: function (t) {
                if (t.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
                    var e = this.ecModel.option;
                    this.option.throttle = e.animation && e.animationDurationUpdate > 0 ? 100 : 20
                }
            },
            getFirstTargetAxisModel: function () {
                var t;
                return IC(function (e) {
                    if (null == t) {
                        var n = this.get(e.axisIndex);
                        n.length && (t = this.dependentModels[e.axis][n[0]])
                    }
                }, this), t
            },
            eachTargetAxis: function (t, e) {
                var n = this.ecModel;
                IC(function (i) {
                    SC(this.get(i.axisIndex), function (r) {
                        t.call(e, i, r, this, n)
                    }, this)
                }, this)
            },
            getAxisProxy: function (t, e) {
                return this._axisProxies[t + "_" + e]
            },
            getAxisModel: function (t, e) {
                var n = this.getAxisProxy(t, e);
                return n && n.getAxisModel()
            },
            setRawRange: function (t, e) {
                var n = this.option;
                SC([["start", "startValue"], ["end", "endValue"]], function (e) {
                    (null != t[e[0]] || null != t[e[1]]) && (n[e[0]] = t[e[0]], n[e[1]] = t[e[1]])
                }, this), !e && Op(this, t)
            },
            getPercentRange: function () {
                var t = this.findRepresentativeAxisProxy();
                return t ? t.getDataPercentWindow() : void 0
            },
            getValueRange: function (t, e) {
                if (null != t || null != e) return this.getAxisProxy(t, e).getDataValueWindow();
                var n = this.findRepresentativeAxisProxy();
                return n ? n.getDataValueWindow() : void 0
            },
            findRepresentativeAxisProxy: function (t) {
                if (t) return t.__dzAxisProxy;
                var e = this._axisProxies;
                for (var n in e) if (e.hasOwnProperty(n) && e[n].hostedBy(this)) return e[n];
                for (var n in e) if (e.hasOwnProperty(n) && !e[n].hostedBy(this)) return e[n]
            },
            getRangePropMode: function () {
                return this._rangePropMode.slice()
            }
        }), CC = gb.extend({
            type: "dataZoom", render: function (t, e, n) {
                this.dataZoomModel = t, this.ecModel = e, this.api = n
            }, getTargetCoordInfo: function () {
                function t(t, e, n, i) {
                    for (var r, a = 0; a < n.length; a++) if (n[a].model === t) {
                        r = n[a];
                        break
                    }
                    r || n.push(r = {model: t, axisModels: [], coordIndex: i}), r.axisModels.push(e)
                }

                var e = this.dataZoomModel, n = this.ecModel, i = {};
                return e.eachTargetAxis(function (e, r) {
                    var a = n.getComponent(e.axis, r);
                    if (a) {
                        var o = a.getCoordSysModel();
                        o && t(o, a, i[o.mainType] || (i[o.mainType] = []), o.componentIndex)
                    }
                }, this), i
            }
        }), AC = (TC.extend({
            type: "dataZoom.slider",
            layoutMode: "box",
            defaultOption: {
                show: !0,
                right: "ph",
                top: "ph",
                width: "ph",
                height: "ph",
                left: null,
                bottom: null,
                backgroundColor: "rgba(47,69,84,0)",
                dataBackground: {
                    lineStyle: {color: "#2f4554", width: .5, opacity: .3},
                    areaStyle: {color: "rgba(47,69,84,0.3)", opacity: .3}
                },
                borderColor: "#ddd",
                fillerColor: "rgba(167,183,204,0.4)",
                handleIcon: "M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z",
                handleSize: "100%",
                handleStyle: {color: "#a7b7cc"},
                labelPrecision: null,
                labelFormatter: null,
                showDetail: !0,
                showDataShadow: "auto",
                realtime: !0,
                zoomLock: !1,
                textStyle: {color: "#333"}
            }
        }), function (t, e, n, i, r, a) {
            e[0] = Ep(e[0], n), e[1] = Ep(e[1], n), t = t || 0;
            var o = n[1] - n[0];
            null != r && (r = Ep(r, [0, o])), null != a && (a = Math.max(a, null != r ? r : 0)), "all" === i && (r = a = Math.abs(e[1] - e[0]), i = 0);
            var s = zp(e, i);
            e[i] += t;
            var l = r || 0, u = n.slice();
            s.sign < 0 ? u[0] += l : u[1] -= l, e[i] = Ep(e[i], u);
            var h = zp(e, i);
            null != r && (h.sign !== s.sign || h.span < r) && (e[1 - i] = e[i] + s.sign * r);
            var h = zp(e, i);
            return null != a && h.span > a && (e[1 - i] = e[i] + h.sign * a), e
        }), DC = B_, kC = Ka, PC = Ja, LC = y, OC = f, zC = 7, EC = 1, RC = 30, BC = "horizontal", NC = "vertical", VC = 5,
        FC = ["line", "bar", "candlestick", "scatter"], HC = CC.extend({
            type: "dataZoom.slider", init: function (t, e) {
                this._displayables = {}, this._orient, this._range, this._handleEnds, this._size, this._handleWidth, this._handleHeight, this._location, this._dragging, this._dataShadowInfo, this.api = e
            }, render: function (t, e, n, i) {
                return HC.superApply(this, "render", arguments), js(this, "_dispatchZoomAction", this.dataZoomModel.get("throttle"), "fixRate"), this._orient = t.get("orient"), this.dataZoomModel.get("show") === !1 ? void this.group.removeAll() : (i && "dataZoom" === i.type && i.from === this.uid || this._buildView(), void this._updateView())
            }, remove: function () {
                HC.superApply(this, "remove", arguments), qs(this, "_dispatchZoomAction")
            }, dispose: function () {
                HC.superApply(this, "dispose", arguments), qs(this, "_dispatchZoomAction")
            }, _buildView: function () {
                var t = this.group;
                t.removeAll(), this._resetLocation(), this._resetInterval();
                var e = this._displayables.barGroup = new dy;
                this._renderBackground(), this._renderHandle(), this._renderDataShadow(), t.add(e), this._positionGroup()
            }, _resetLocation: function () {
                var t = this.dataZoomModel, e = this.api, n = this._findCoordRect(),
                    i = {width: e.getWidth(), height: e.getHeight()}, r = this._orient === BC ? {
                        right: i.width - n.x - n.width,
                        top: i.height - RC - zC,
                        width: n.width,
                        height: RC
                    } : {right: zC, top: n.y, width: RC, height: n.height}, a = Do(t.option);
                f(["right", "top", "width", "height"], function (t) {
                    "ph" === a[t] && (a[t] = r[t])
                });
                var o = To(a, i, t.padding);
                this._location = {
                    x: o.x,
                    y: o.y
                }, this._size = [o.width, o.height], this._orient === NC && this._size.reverse()
            }, _positionGroup: function () {
                var t = this.group, e = this._location, n = this._orient, i = this.dataZoomModel.getFirstTargetAxisModel(),
                    r = i && i.get("inverse"), a = this._displayables.barGroup,
                    o = (this._dataShadowInfo || {}).otherAxisInverse;
                a.attr(n !== BC || r ? n === BC && r ? {scale: o ? [-1, 1] : [-1, -1]} : n !== NC || r ? {
                    scale: o ? [-1, -1] : [-1, 1],
                    rotation: Math.PI / 2
                } : {scale: o ? [1, -1] : [1, 1], rotation: Math.PI / 2} : {scale: o ? [1, 1] : [1, -1]});
                var s = t.getBoundingRect([a]);
                t.attr("position", [e.x - s.x, e.y - s.y])
            }, _getViewExtent: function () {
                return [0, this._size[0]]
            }, _renderBackground: function () {
                var t = this.dataZoomModel, e = this._size, n = this._displayables.barGroup;
                n.add(new DC({
                    silent: !0,
                    shape: {x: 0, y: 0, width: e[0], height: e[1]},
                    style: {fill: t.get("backgroundColor")},
                    z2: -40
                })), n.add(new DC({
                    shape: {x: 0, y: 0, width: e[0], height: e[1]},
                    style: {fill: "transparent"},
                    z2: 0,
                    onclick: y(this._onClickPanelClick, this)
                }))
            }, _renderDataShadow: function () {
                var t = this._dataShadowInfo = this._prepareDataShadowInfo();
                if (t) {
                    var e = this._size, n = t.series, i = n.getRawData(),
                        r = n.getShadowDim ? n.getShadowDim() : t.otherDim;
                    if (null != r) {
                        var a = i.getDataExtent(r), o = .3 * (a[1] - a[0]);
                        a = [a[0] - o, a[1] + o];
                        var l, u = [0, e[1]], h = [0, e[0]], c = [[e[0], 0], [0, 0]], d = [], f = h[1] / (i.count() - 1),
                            p = 0, g = Math.round(i.count() / e[0]);
                        i.each([r], function (t, e) {
                            if (g > 0 && e % g) return void (p += f);
                            var n = null == t || isNaN(t) || "" === t, i = n ? 0 : kC(t, a, u, !0);
                            n && !l && e ? (c.push([c[c.length - 1][0], 0]), d.push([d[d.length - 1][0], 0])) : !n && l && (c.push([p, 0]), d.push([p, 0])), c.push([p, i]), d.push([p, i]), p += f, l = n
                        });
                        var v = this.dataZoomModel;
                        this._displayables.barGroup.add(new O_({
                            shape: {points: c},
                            style: s({fill: v.get("dataBackgroundColor")}, v.getModel("dataBackground.areaStyle").getAreaStyle()),
                            silent: !0,
                            z2: -20
                        })), this._displayables.barGroup.add(new z_({
                            shape: {points: d},
                            style: v.getModel("dataBackground.lineStyle").getLineStyle(),
                            silent: !0,
                            z2: -19
                        }))
                    }
                }
            }, _prepareDataShadowInfo: function () {
                var t = this.dataZoomModel, e = t.get("showDataShadow");
                if (e !== !1) {
                    var n, i = this.ecModel;
                    return t.eachTargetAxis(function (r, a) {
                        var o = t.getAxisProxy(r.name, a).getTargetSeriesModels();
                        f(o, function (t) {
                            if (!(n || e !== !0 && u(FC, t.get("type")) < 0)) {
                                var o, s = i.getComponent(r.axis, a).axis, l = Rp(r.name), h = t.coordinateSystem;
                                null != l && h.getOtherAxis && (o = h.getOtherAxis(s).inverse), l = t.getData().mapDimension(l), n = {
                                    thisAxis: s,
                                    series: t,
                                    thisDim: r.name,
                                    otherDim: l,
                                    otherAxisInverse: o
                                }
                            }
                        }, this)
                    }, this), n
                }
            }, _renderHandle: function () {
                var t = this._displayables, e = t.handles = [], n = t.handleLabels = [], i = this._displayables.barGroup,
                    r = this._size, a = this.dataZoomModel;
                i.add(t.filler = new DC({
                    draggable: !0,
                    cursor: Bp(this._orient),
                    drift: LC(this._onDragMove, this, "all"),
                    onmousemove: function (t) {
                        Cm(t.event)
                    },
                    ondragstart: LC(this._showDataInfo, this, !0),
                    ondragend: LC(this._onDragEnd, this),
                    onmouseover: LC(this._showDataInfo, this, !0),
                    onmouseout: LC(this._showDataInfo, this, !1),
                    style: {fill: a.get("fillerColor"), textPosition: "inside"}
                })), i.add(new DC(oa({
                    silent: !0,
                    shape: {x: 0, y: 0, width: r[0], height: r[1]},
                    style: {
                        stroke: a.get("dataBackgroundColor") || a.get("borderColor"),
                        lineWidth: EC,
                        fill: "rgba(0,0,0,0)"
                    }
                }))), OC([0, 1], function (t) {
                    var r = Ga(a.get("handleIcon"), {
                        cursor: Bp(this._orient),
                        draggable: !0,
                        drift: LC(this._onDragMove, this, t),
                        onmousemove: function (t) {
                            Cm(t.event)
                        },
                        ondragend: LC(this._onDragEnd, this),
                        onmouseover: LC(this._showDataInfo, this, !0),
                        onmouseout: LC(this._showDataInfo, this, !1)
                    }, {x: -1, y: 0, width: 2, height: 2}), o = r.getBoundingRect();
                    this._handleHeight = $a(a.get("handleSize"), this._size[1]), this._handleWidth = o.width / o.height * this._handleHeight, r.setStyle(a.getModel("handleStyle").getItemStyle());
                    var s = a.get("handleColor");
                    null != s && (r.style.fill = s), i.add(e[t] = r);
                    var l = a.textStyleModel;
                    this.group.add(n[t] = new I_({
                        silent: !0,
                        invisible: !0,
                        style: {
                            x: 0,
                            y: 0,
                            text: "",
                            textVerticalAlign: "middle",
                            textAlign: "center",
                            textFill: l.getTextColor(),
                            textFont: l.getFont()
                        },
                        z2: 10
                    }))
                }, this)
            }, _resetInterval: function () {
                var t = this._range = this.dataZoomModel.getPercentRange(), e = this._getViewExtent();
                this._handleEnds = [kC(t[0], [0, 100], e, !0), kC(t[1], [0, 100], e, !0)]
            }, _updateInterval: function (t, e) {
                var n = this.dataZoomModel, i = this._handleEnds, r = this._getViewExtent(),
                    a = n.findRepresentativeAxisProxy().getMinMaxSpan(), o = [0, 100];
                AC(e, i, r, n.get("zoomLock") ? "all" : t, null != a.minSpan ? kC(a.minSpan, o, r, !0) : null, null != a.maxSpan ? kC(a.maxSpan, o, r, !0) : null);
                var s = this._range, l = this._range = PC([kC(i[0], r, o, !0), kC(i[1], r, o, !0)]);
                return !s || s[0] !== l[0] || s[1] !== l[1]
            }, _updateView: function (t) {
                var e = this._displayables, n = this._handleEnds, i = PC(n.slice()), r = this._size;
                OC([0, 1], function (t) {
                    var i = e.handles[t], a = this._handleHeight;
                    i.attr({scale: [a / 2, a / 2], position: [n[t], r[1] / 2 - a / 2]})
                }, this), e.filler.setShape({x: i[0], y: 0, width: i[1] - i[0], height: r[1]}), this._updateDataInfo(t)
            }, _updateDataInfo: function (t) {
                function e(t) {
                    var e = Ra(i.handles[t].parent, this.group), n = Na(0 === t ? "right" : "left", e),
                        s = this._handleWidth / 2 + VC, l = Ba([c[t] + (0 === t ? -s : s), this._size[1] / 2], e);
                    r[t].setStyle({
                        x: l[0],
                        y: l[1],
                        textVerticalAlign: a === BC ? "middle" : n,
                        textAlign: a === BC ? n : "center",
                        text: o[t]
                    })
                }

                var n = this.dataZoomModel, i = this._displayables, r = i.handleLabels, a = this._orient, o = ["", ""];
                if (n.get("showDetail")) {
                    var s = n.findRepresentativeAxisProxy();
                    if (s) {
                        var l = s.getAxisModel().axis, u = this._range,
                            h = t ? s.calculateDataWindow({start: u[0], end: u[1]}).valueWindow : s.getDataValueWindow();
                        o = [this._formatLabel(h[0], l), this._formatLabel(h[1], l)]
                    }
                }
                var c = PC(this._handleEnds.slice());
                e.call(this, 0), e.call(this, 1)
            }, _formatLabel: function (t, e) {
                var n = this.dataZoomModel, i = n.get("labelFormatter"), r = n.get("labelPrecision");
                (null == r || "auto" === r) && (r = e.getPixelPrecision());
                var a = null == t || isNaN(t) ? "" : "category" === e.type || "time" === e.type ? e.scale.getLabel(Math.round(t)) : t.toFixed(Math.min(r, 20));
                return w(i) ? i(t, a) : b(i) ? i.replace("{value}", a) : a
            }, _showDataInfo: function (t) {
                t = this._dragging || t;
                var e = this._displayables.handleLabels;
                e[0].attr("invisible", !t), e[1].attr("invisible", !t)
            }, _onDragMove: function (t, e, n) {
                this._dragging = !0;
                var i = this._displayables.barGroup.getLocalTransform(), r = Ba([e, n], i, !0),
                    a = this._updateInterval(t, r[0]), o = this.dataZoomModel.get("realtime");
                this._updateView(!o), a && o && this._dispatchZoomAction()
            }, _onDragEnd: function () {
                this._dragging = !1, this._showDataInfo(!1);
                var t = this.dataZoomModel.get("realtime");
                !t && this._dispatchZoomAction()
            }, _onClickPanelClick: function (t) {
                var e = this._size, n = this._displayables.barGroup.transformCoordToLocal(t.offsetX, t.offsetY);
                if (!(n[0] < 0 || n[0] > e[0] || n[1] < 0 || n[1] > e[1])) {
                    var i = this._handleEnds, r = (i[0] + i[1]) / 2, a = this._updateInterval("all", n[0] - r);
                    this._updateView(), a && this._dispatchZoomAction()
                }
            }, _dispatchZoomAction: function () {
                var t = this._range;
                this.api.dispatchAction({
                    type: "dataZoom",
                    from: this.uid,
                    dataZoomId: this.dataZoomModel.id,
                    start: t[0],
                    end: t[1]
                })
            }, _findCoordRect: function () {
                var t;
                if (OC(this.getTargetCoordInfo(), function (e) {
                    if (!t && e.length) {
                        var n = e[0].model.coordinateSystem;
                        t = n.getRect && n.getRect()
                    }
                }), !t) {
                    var e = this.api.getWidth(), n = this.api.getHeight();
                    t = {x: .2 * e, y: .2 * n, width: .6 * e, height: .6 * n}
                }
                return t
            }
        });
    TC.extend({
        type: "dataZoom.inside",
        defaultOption: {
            disabled: !1,
            zoomLock: !1,
            zoomOnMouseWheel: !0,
            moveOnMouseMove: !0,
            moveOnMouseWheel: !1,
            preventDefaultMouseMove: !0
        }
    });
    var GC = "\x00_ec_interaction_mutex";
    tu({type: "takeGlobalCursor", event: "globalCursorTaken", update: "update"}, function () {
    }), c(Gp, Sm);
    var WC = "\x00_ec_dataZoom_roams", ZC = y, XC = CC.extend({
        type: "dataZoom.inside", init: function () {
            this._range
        }, render: function (t, e, n) {
            XC.superApply(this, "render", arguments), this._range = t.getPercentRange(), f(this.getTargetCoordInfo(), function (e, i) {
                var r = p(e, function (t) {
                    return Jp(t.model)
                });
                f(e, function (e) {
                    var a = e.model, o = {};
                    f(["pan", "zoom", "scrollMove"], function (t) {
                        o[t] = ZC(YC[t], this, e, i)
                    }, this), $p(n, {
                        coordId: Jp(a), allCoordIds: r, containsPoint: function (t, e, n) {
                            return a.coordinateSystem.containPoint([e, n])
                        }, dataZoomId: t.id, dataZoomModel: t, getRange: o
                    })
                }, this)
            }, this)
        }, dispose: function () {
            Qp(this.api, this.dataZoomModel.id), XC.superApply(this, "dispose", arguments), this._range = null
        }
    }), YC = {
        zoom: function (t, e, n, i) {
            var r = this._range, a = r.slice(), o = t.axisModels[0];
            if (o) {
                var s = UC[e](null, [i.originX, i.originY], o, n, t),
                    l = (s.signal > 0 ? s.pixelStart + s.pixelLength - s.pixel : s.pixel - s.pixelStart) / s.pixelLength * (a[1] - a[0]) + a[0],
                    u = Math.max(1 / i.scale, 0);
                a[0] = (a[0] - l) * u + l, a[1] = (a[1] - l) * u + l;
                var h = this.dataZoomModel.findRepresentativeAxisProxy().getMinMaxSpan();
                return AC(0, a, [0, 100], 0, h.minSpan, h.maxSpan), this._range = a, r[0] !== a[0] || r[1] !== a[1] ? a : void 0
            }
        }, pan: ag(function (t, e, n, i, r, a) {
            var o = UC[i]([a.oldX, a.oldY], [a.newX, a.newY], e, r, n);
            return o.signal * (t[1] - t[0]) * o.pixel / o.pixelLength
        }), scrollMove: ag(function (t, e, n, i, r, a) {
            var o = UC[i]([0, 0], [a.scrollDelta, a.scrollDelta], e, r, n);
            return o.signal * (t[1] - t[0]) * a.scrollDelta
        })
    }, UC = {
        grid: function (t, e, n, i, r) {
            var a = n.axis, o = {}, s = r.model.coordinateSystem.getRect();
            return t = t || [0, 0], "x" === a.dim ? (o.pixel = e[0] - t[0], o.pixelLength = s.width, o.pixelStart = s.x, o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = s.height, o.pixelStart = s.y, o.signal = a.inverse ? -1 : 1), o
        }, polar: function (t, e, n, i, r) {
            var a = n.axis, o = {}, s = r.model.coordinateSystem, l = s.getRadiusAxis().getExtent(),
                u = s.getAngleAxis().getExtent();
            return t = t ? s.pointToCoord(t) : [0, 0], e = s.pointToCoord(e), "radiusAxis" === n.mainType ? (o.pixel = e[0] - t[0], o.pixelLength = l[1] - l[0], o.pixelStart = l[0], o.signal = a.inverse ? 1 : -1) : (o.pixel = e[1] - t[1], o.pixelLength = u[1] - u[0], o.pixelStart = u[0], o.signal = a.inverse ? -1 : 1), o
        }, singleAxis: function (t, e, n, i, r) {
            var a = n.axis, o = r.model.coordinateSystem.getRect(), s = {};
            return t = t || [0, 0], "horizontal" === a.orient ? (s.pixel = e[0] - t[0], s.pixelLength = o.width, s.pixelStart = o.x, s.signal = a.inverse ? 1 : -1) : (s.pixel = e[1] - t[1], s.pixelLength = o.height, s.pixelStart = o.y, s.signal = a.inverse ? -1 : 1), s
        }
    };
    Ql({
        getTargetSeries: function (t) {
            var e = N();
            return t.eachComponent("dataZoom", function (t) {
                t.eachTargetAxis(function (t, n, i) {
                    var r = i.getAxisProxy(t.name, n);
                    f(r.getTargetSeriesModels(), function (t) {
                        e.set(t.uid, t)
                    })
                })
            }), e
        }, modifyOutputEnd: !0, overallReset: function (t, e) {
            t.eachComponent("dataZoom", function (t) {
                t.eachTargetAxis(function (t, n, i) {
                    i.getAxisProxy(t.name, n).reset(i, e)
                }), t.eachTargetAxis(function (t, n, i) {
                    i.getAxisProxy(t.name, n).filterData(i, e)
                })
            }), t.eachComponent("dataZoom", function (t) {
                var e = t.findRepresentativeAxisProxy(), n = e.getDataPercentWindow(), i = e.getDataValueWindow();
                t.setRawRange({start: n[0], end: n[1], startValue: i[0], endValue: i[1]}, !0)
            })
        }
    }), tu("dataZoom", function (t, e) {
        var n = Cp(y(e.eachComponent, e, "dataZoom"), _C, function (t, e) {
            return t.get(e.axisIndex)
        }), i = [];
        e.eachComponent({mainType: "dataZoom", query: t}, function (t) {
            i.push.apply(i, n(t).nodes)
        }), f(i, function (e) {
            e.setRawRange({start: t.start, end: t.end, startValue: t.startValue, endValue: t.endValue})
        })
    });
    var jC = f, qC = function (t) {
        var e = t && t.visualMap;
        _(e) || (e = e ? [e] : []), jC(e, function (t) {
            if (t) {
                og(t, "splitList") && !og(t, "pieces") && (t.pieces = t.splitList, delete t.splitList);
                var e = t.pieces;
                e && _(e) && jC(e, function (t) {
                    M(t) && (og(t, "start") && !og(t, "min") && (t.min = t.start), og(t, "end") && !og(t, "max") && (t.max = t.end))
                })
            }
        })
    };
    Cw.registerSubTypeDefaulter("visualMap", function (t) {
        return t.categories || (t.pieces ? t.pieces.length > 0 : t.splitNumber > 0) && !t.calculable ? "piecewise" : "continuous"
    });
    var KC = f, $C = M, QC = -1, JC = function (t) {
        var e = t.mappingMethod, n = t.type, r = this.option = i(t);
        this.type = n, this.mappingMethod = e, this._normalizeData = eA[e];
        var a = tA[n];
        this.applyVisual = a.applyVisual, this.getColorMapper = a.getColorMapper, this._doMap = a._doMap[e], "piecewise" === e ? (ug(r), sg(r)) : "category" === e ? r.categories ? lg(r) : ug(r, !0) : (O("linear" !== e || r.dataExtent), ug(r))
    };
    JC.prototype = {
        constructor: JC, mapValueToVisual: function (t) {
            var e = this._normalizeData(t);
            return this._doMap(e, t)
        }, getNormalizer: function () {
            return y(this._normalizeData, this)
        }
    };
    var tA = JC.visualHandlers = {
        color: {
            applyVisual: dg("color"), getColorMapper: function () {
                var t = this.option;
                return y("category" === t.mappingMethod ? function (t, e) {
                    return !e && (t = this._normalizeData(t)), fg.call(this, t)
                } : function (e, n, i) {
                    var r = !!i;
                    return !n && (e = this._normalizeData(e)), i = $e(e, t.parsedVisual, i), r ? i : en(i, "rgba")
                }, this)
            }, _doMap: {
                linear: function (t) {
                    return en($e(t, this.option.parsedVisual), "rgba")
                }, category: fg, piecewise: function (t, e) {
                    var n = vg.call(this, e);
                    return null == n && (n = en($e(t, this.option.parsedVisual), "rgba")), n
                }, fixed: pg
            }
        },
        colorHue: hg(function (t, e) {
            return Je(t, e)
        }),
        colorSaturation: hg(function (t, e) {
            return Je(t, null, e)
        }),
        colorLightness: hg(function (t, e) {
            return Je(t, null, null, e)
        }),
        colorAlpha: hg(function (t, e) {
            return tn(t, e)
        }),
        opacity: {applyVisual: dg("opacity"), _doMap: gg([0, 1])},
        liftZ: {applyVisual: dg("liftZ"), _doMap: {linear: pg, category: pg, piecewise: pg, fixed: pg}},
        symbol: {
            applyVisual: function (t, e, n) {
                var i = this.mapValueToVisual(t);
                if (b(i)) n("symbol", i); else if ($C(i)) for (var r in i) i.hasOwnProperty(r) && n(r, i[r])
            }, _doMap: {
                linear: cg, category: fg, piecewise: function (t, e) {
                    var n = vg.call(this, e);
                    return null == n && (n = cg.call(this, t)), n
                }, fixed: pg
            }
        },
        symbolSize: {applyVisual: dg("symbolSize"), _doMap: gg([0, 1])}
    }, eA = {
        linear: function (t) {
            return Ka(t, this.option.dataExtent, [0, 1], !0)
        }, piecewise: function (t) {
            var e = this.option.pieceList, n = JC.findPieceIndex(t, e, !0);
            return null != n ? Ka(n, [0, e.length - 1], [0, 1], !0) : void 0
        }, category: function (t) {
            var e = this.option.categories ? this.option.categoryMap[t] : t;
            return null == e ? QC : e
        }, fixed: F
    };
    JC.listVisualTypes = function () {
        var t = [];
        return f(tA, function (e, n) {
            t.push(n)
        }), t
    }, JC.addVisualHandler = function (t, e) {
        tA[t] = e
    }, JC.isValidType = function (t) {
        return tA.hasOwnProperty(t)
    }, JC.eachVisual = function (t, e, n) {
        M(t) ? f(t, e, n) : e.call(n, t)
    }, JC.mapVisual = function (t, e, n) {
        var i, r = _(t) ? [] : M(t) ? {} : (i = !0, null);
        return JC.eachVisual(t, function (t, a) {
            var o = e.call(n, t, a);
            i ? r = o : r[a] = o
        }), r
    }, JC.retrieveVisuals = function (t) {
        var e, n = {};
        return t && KC(tA, function (i, r) {
            t.hasOwnProperty(r) && (n[r] = t[r], e = !0)
        }), e ? n : null
    }, JC.prepareVisualTypes = function (t) {
        if ($C(t)) {
            var e = [];
            KC(t, function (t, n) {
                e.push(n)
            }), t = e
        } else {
            if (!_(t)) return [];
            t = t.slice()
        }
        return t.sort(function (t, e) {
            return "color" === e && "color" !== t && 0 === t.indexOf("color") ? 1 : -1
        }), t
    }, JC.dependsOn = function (t, e) {
        return "color" === e ? !(!t || 0 !== t.indexOf(e)) : t === e
    }, JC.findPieceIndex = function (t, e, n) {
        function i(e, n) {
            var i = Math.abs(e - t);
            a > i && (a = i, r = n)
        }

        for (var r, a = 1 / 0, o = 0, s = e.length; s > o; o++) {
            var l = e[o].value;
            if (null != l) {
                if (l === t || "string" == typeof l && l === t + "") return o;
                n && i(l, o)
            }
        }
        for (var o = 0, s = e.length; s > o; o++) {
            var u = e[o], h = u.interval, c = u.close;
            if (h) {
                if (h[0] === -1 / 0) {
                    if (yg(c[1], t, h[1])) return o
                } else if (1 / 0 === h[1]) {
                    if (yg(c[0], h[0], t)) return o
                } else if (yg(c[0], h[0], t) && yg(c[1], t, h[1])) return o;
                n && i(h[0], o), n && i(h[1], o)
            }
        }
        return n ? 1 / 0 === t ? e.length - 1 : t === -1 / 0 ? 0 : r : void 0
    };
    var nA = f, iA = pM.VISUAL.COMPONENT;
    ru(iA, {
        createOnAllSeries: !0, reset: function (t, e) {
            var n = [];
            return e.eachComponent("visualMap", function (e) {
                var i = t.pipelineContext;
                !e.isTargetSeries(t) || i && i.large || n.push(bg(e.stateList, e.targetVisuals, y(e.getValueState, e), e.getDataDimension(t.getData())))
            }), n
        }
    }), ru(iA, {
        createOnAllSeries: !0, reset: function (t, e) {
            var n = t.getData(), i = [];
            e.eachComponent("visualMap", function (e) {
                if (e.isTargetSeries(t)) {
                    var r = e.getVisualMeta(y(Mg, null, t, e)) || {stops: [], outerColors: []},
                        a = e.getDataDimension(n), o = n.getDimensionInfo(a);
                    null != o && (r.dimension = o.index, i.push(r))
                }
            }), t.getData().setVisual("visualMeta", i)
        }
    });
    var rA = {
        get: function (t, e, n) {
            var r = i((aA[t] || {})[e]);
            return n && _(r) ? r[r.length - 1] : r
        }
    }, aA = {
        color: {active: ["#006edd", "#e0ffff"], inactive: ["rgba(0,0,0,0)"]},
        colorHue: {active: [0, 360], inactive: [0, 0]},
        colorSaturation: {active: [.3, 1], inactive: [0, 0]},
        colorLightness: {active: [.9, .5], inactive: [0, 0]},
        colorAlpha: {active: [.3, 1], inactive: [0, 0]},
        opacity: {active: [.3, 1], inactive: [0, 0]},
        symbol: {active: ["circle", "roundRect", "diamond"], inactive: ["none"]},
        symbolSize: {active: [10, 50], inactive: [0, 0]}
    }, oA = JC.mapVisual, sA = JC.eachVisual, lA = _, uA = f, hA = Ja, cA = Ka, dA = F, fA = su({
        type: "visualMap",
        dependencies: ["series"],
        stateList: ["inRange", "outOfRange"],
        replacableOptionKeys: ["inRange", "outOfRange", "target", "controller", "color"],
        dataBound: [-1 / 0, 1 / 0],
        layoutMode: {type: "box", ignoreSize: !0},
        defaultOption: {
            show: !0,
            zlevel: 0,
            z: 4,
            seriesIndex: "all",
            min: 0,
            max: 200,
            dimension: null,
            inRange: null,
            outOfRange: null,
            left: 0,
            right: null,
            top: null,
            bottom: 0,
            itemWidth: null,
            itemHeight: null,
            inverse: !1,
            orient: "vertical",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            contentColor: "#5793f3",
            inactiveColor: "#aaa",
            borderWidth: 0,
            padding: 5,
            textGap: 10,
            precision: 0,
            color: null,
            formatter: null,
            text: null,
            textStyle: {color: "#333"}
        },
        init: function (t, e, n) {
            this._dataExtent, this.targetVisuals = {}, this.controllerVisuals = {}, this.textStyleModel, this.itemSize, this.mergeDefaultAndTheme(t, n)
        },
        optionUpdated: function (t, e) {
            var n = this.option;
            nm.canvasSupported || (n.realtime = !1), !e && wg(n, t, this.replacableOptionKeys), this.textStyleModel = this.getModel("textStyle"), this.resetItemSize(), this.completeVisualOption()
        },
        resetVisual: function (t) {
            var e = this.stateList;
            t = y(t, this), this.controllerVisuals = _g(this.option.controller, e, t), this.targetVisuals = _g(this.option.target, e, t)
        },
        getTargetSeriesIndices: function () {
            var t = this.option.seriesIndex, e = [];
            return null == t || "all" === t ? this.ecModel.eachSeries(function (t, n) {
                e.push(n)
            }) : e = Bi(t), e
        },
        eachTargetSeries: function (t, e) {
            f(this.getTargetSeriesIndices(), function (n) {
                t.call(e, this.ecModel.getSeriesByIndex(n))
            }, this)
        },
        isTargetSeries: function (t) {
            var e = !1;
            return this.eachTargetSeries(function (n) {
                n === t && (e = !0)
            }), e
        },
        formatValueText: function (t, e, n) {
            function i(t) {
                return t === l[0] ? "min" : t === l[1] ? "max" : (+t).toFixed(Math.min(s, 20))
            }

            var r, a, o = this.option, s = o.precision, l = this.dataBound, u = o.formatter;
            return n = n || ["<", ">"], _(t) && (t = t.slice(), r = !0), a = e ? t : r ? [i(t[0]), i(t[1])] : i(t), b(u) ? u.replace("{value}", r ? a[0] : a).replace("{value2}", r ? a[1] : a) : w(u) ? r ? u(t[0], t[1]) : u(t) : r ? t[0] === l[0] ? n[0] + " " + a[1] : t[1] === l[1] ? n[1] + " " + a[0] : a[0] + " - " + a[1] : a
        },
        resetExtent: function () {
            var t = this.option, e = hA([t.min, t.max]);
            this._dataExtent = e
        },
        getDataDimension: function (t) {
            var e = this.option.dimension, n = t.dimensions;
            if (null != e || n.length) {
                if (null != e) return t.getDimension(e);
                for (var i = t.dimensions, r = i.length - 1; r >= 0; r--) {
                    var a = i[r], o = t.getDimensionInfo(a);
                    if (!o.isCalculationCoord) return a
                }
            }
        },
        getExtent: function () {
            return this._dataExtent.slice()
        },
        completeVisualOption: function () {
            function t(t) {
                lA(o.color) && !t.inRange && (t.inRange = {color: o.color.slice().reverse()}), t.inRange = t.inRange || {color: a.get("gradientColor")}, uA(this.stateList, function (e) {
                    var n = t[e];
                    if (b(n)) {
                        var i = rA.get(n, "active", h);
                        i ? (t[e] = {}, t[e][n] = i) : delete t[e]
                    }
                }, this)
            }

            function e(t, e, n) {
                var i = t[e], r = t[n];
                i && !r && (r = t[n] = {}, uA(i, function (t, e) {
                    if (JC.isValidType(e)) {
                        var n = rA.get(e, "inactive", h);
                        null != n && (r[e] = n, "color" !== e || r.hasOwnProperty("opacity") || r.hasOwnProperty("colorAlpha") || (r.opacity = [0, 0]))
                    }
                }))
            }

            function n(t) {
                var e = (t.inRange || {}).symbol || (t.outOfRange || {}).symbol,
                    n = (t.inRange || {}).symbolSize || (t.outOfRange || {}).symbolSize, r = this.get("inactiveColor");
                uA(this.stateList, function (a) {
                    var o = this.itemSize, s = t[a];
                    s || (s = t[a] = {color: h ? r : [r]}), null == s.symbol && (s.symbol = e && i(e) || (h ? "roundRect" : ["roundRect"])), null == s.symbolSize && (s.symbolSize = n && i(n) || (h ? o[0] : [o[0], o[0]])), s.symbol = oA(s.symbol, function (t) {
                        return "none" === t || "square" === t ? "roundRect" : t
                    });
                    var l = s.symbolSize;
                    if (null != l) {
                        var u = -1 / 0;
                        sA(l, function (t) {
                            t > u && (u = t)
                        }), s.symbolSize = oA(l, function (t) {
                            return cA(t, [0, u], [0, o[0]], !0)
                        })
                    }
                }, this)
            }

            var a = this.ecModel, o = this.option, s = {inRange: o.inRange, outOfRange: o.outOfRange},
                l = o.target || (o.target = {}), u = o.controller || (o.controller = {});
            r(l, s), r(u, s);
            var h = this.isCategory();
            t.call(this, l), t.call(this, u), e.call(this, l, "inRange", "outOfRange"), n.call(this, u)
        },
        resetItemSize: function () {
            this.itemSize = [parseFloat(this.get("itemWidth")), parseFloat(this.get("itemHeight"))]
        },
        isCategory: function () {
            return !!this.option.categories
        },
        setSelected: dA,
        getValueState: dA,
        getVisualMeta: dA
    }), pA = [20, 140], gA = fA.extend({
        type: "visualMap.continuous",
        defaultOption: {
            align: "auto",
            calculable: !1,
            range: null,
            realtime: !0,
            itemHeight: null,
            itemWidth: null,
            hoverLink: !0,
            hoverLinkDataSize: null,
            hoverLinkOnHandle: null
        },
        optionUpdated: function () {
            gA.superApply(this, "optionUpdated", arguments), this.resetExtent(), this.resetVisual(function (t) {
                t.mappingMethod = "linear", t.dataExtent = this.getExtent()
            }), this._resetRange()
        },
        resetItemSize: function () {
            gA.superApply(this, "resetItemSize", arguments);
            var t = this.itemSize;
            "horizontal" === this._orient && t.reverse(), (null == t[0] || isNaN(t[0])) && (t[0] = pA[0]), (null == t[1] || isNaN(t[1])) && (t[1] = pA[1])
        },
        _resetRange: function () {
            var t = this.getExtent(), e = this.option.range;
            !e || e.auto ? (t.auto = 1, this.option.range = t) : _(e) && (e[0] > e[1] && e.reverse(), e[0] = Math.max(e[0], t[0]), e[1] = Math.min(e[1], t[1]))
        },
        completeVisualOption: function () {
            fA.prototype.completeVisualOption.apply(this, arguments), f(this.stateList, function (t) {
                var e = this.option.controller[t].symbolSize;
                e && e[0] !== e[1] && (e[0] = 0)
            }, this)
        },
        setSelected: function (t) {
            this.option.range = t.slice(), this._resetRange()
        },
        getSelected: function () {
            var t = this.getExtent(), e = Ja((this.get("range") || []).slice());
            return e[0] > t[1] && (e[0] = t[1]), e[1] > t[1] && (e[1] = t[1]), e[0] < t[0] && (e[0] = t[0]), e[1] < t[0] && (e[1] = t[0]), e
        },
        getValueState: function (t) {
            var e = this.option.range, n = this.getExtent();
            return (e[0] <= n[0] || e[0] <= t) && (e[1] >= n[1] || t <= e[1]) ? "inRange" : "outOfRange"
        },
        findTargetDataIndices: function (t) {
            var e = [];
            return this.eachTargetSeries(function (n) {
                var i = [], r = n.getData();
                r.each(this.getDataDimension(r), function (e, n) {
                    t[0] <= e && e <= t[1] && i.push(n)
                }, this), e.push({seriesId: n.id, dataIndex: i})
            }, this), e
        },
        getVisualMeta: function (t) {
            function e(e, n) {
                r.push({value: e, color: t(e, n)})
            }

            for (var n = Sg(this, "outOfRange", this.getExtent()), i = Sg(this, "inRange", this.option.range.slice()), r = [], a = 0, o = 0, s = i.length, l = n.length; l > o && (!i.length || n[o] <= i[0]); o++) n[o] < i[a] && e(n[o], "outOfRange");
            for (var u = 1; s > a; a++, u = 0) u && r.length && e(i[a], "outOfRange"), e(i[a], "inRange");
            for (var u = 1; l > o; o++) (!i.length || i[i.length - 1] < n[o]) && (u && (r.length && e(r[r.length - 1].value, "outOfRange"), u = 0), e(n[o], "outOfRange"));
            var h = r.length;
            return {stops: r, outerColors: [h ? r[0].color : "transparent", h ? r[h - 1].color : "transparent"]}
        }
    }), vA = lu({
        type: "visualMap", autoPositionValues: {left: 1, right: 1, top: 1, bottom: 1}, init: function (t, e) {
            this.ecModel = t, this.api = e, this.visualMapModel
        }, render: function (t) {
            return this.visualMapModel = t, t.get("show") === !1 ? void this.group.removeAll() : void this.doRender.apply(this, arguments)
        }, renderBackground: function (t) {
            var e = this.visualMapModel, n = pw(e.get("padding") || 0), i = t.getBoundingRect();
            t.add(new B_({
                z2: -1,
                silent: !0,
                shape: {x: i.x - n[3], y: i.y - n[0], width: i.width + n[3] + n[1], height: i.height + n[0] + n[2]},
                style: {fill: e.get("backgroundColor"), stroke: e.get("borderColor"), lineWidth: e.get("borderWidth")}
            }))
        }, getControllerVisual: function (t, e, n) {
            function i(t) {
                return s[t]
            }

            function r(t, e) {
                s[t] = e
            }

            n = n || {};
            var a = n.forceState, o = this.visualMapModel, s = {};
            if ("symbol" === e && (s.symbol = o.get("itemSymbol")), "color" === e) {
                var l = o.get("contentColor");
                s.color = l
            }
            var u = o.controllerVisuals[a || o.getValueState(t)], h = JC.prepareVisualTypes(u);
            return f(h, function (a) {
                var o = u[a];
                n.convertOpacityToAlpha && "opacity" === a && (a = "colorAlpha", o = u.__alphaForOpacity), JC.dependsOn(a, e) && o && o.applyVisual(t, i, r)
            }), s[e]
        }, positionGroup: function (t) {
            var e = this.visualMapModel, n = this.api;
            Co(t, e.getBoxLayoutParams(), {width: n.getWidth(), height: n.getHeight()})
        }, doRender: F
    }), mA = Ka, yA = f, xA = Math.min, _A = Math.max, wA = 12, bA = 6, MA = vA.extend({
        type: "visualMap.continuous", init: function () {
            MA.superApply(this, "init", arguments), this._shapes = {}, this._dataInterval = [], this._handleEnds = [], this._orient, this._useHandle, this._hoverLinkDataIndices = [], this._dragging, this._hovering
        }, doRender: function (t, e, n, i) {
            i && "selectDataRange" === i.type && i.from === this.uid || this._buildView()
        }, _buildView: function () {
            this.group.removeAll();
            var t = this.visualMapModel, e = this.group;
            this._orient = t.get("orient"), this._useHandle = t.get("calculable"), this._resetInterval(), this._renderBar(e);
            var n = t.get("text");
            this._renderEndsText(e, n, 0), this._renderEndsText(e, n, 1), this._updateView(!0), this.renderBackground(e), this._updateView(), this._enableHoverLinkToSeries(), this._enableHoverLinkFromSeries(), this.positionGroup(e)
        }, _renderEndsText: function (t, e, n) {
            if (e) {
                var i = e[1 - n];
                i = null != i ? i + "" : "";
                var r = this.visualMapModel, a = r.get("textGap"), o = r.itemSize, s = this._shapes.barGroup,
                    l = this._applyTransform([o[0] / 2, 0 === n ? -a : o[1] + a], s),
                    u = this._applyTransform(0 === n ? "bottom" : "top", s), h = this._orient,
                    c = this.visualMapModel.textStyleModel;
                this.group.add(new I_({
                    style: {
                        x: l[0],
                        y: l[1],
                        textVerticalAlign: "horizontal" === h ? "middle" : u,
                        textAlign: "horizontal" === h ? u : "center",
                        text: i,
                        textFont: c.getFont(),
                        textFill: c.getTextColor()
                    }
                }))
            }
        }, _renderBar: function (t) {
            var e = this.visualMapModel, n = this._shapes, i = e.itemSize, r = this._orient, a = this._useHandle,
                o = Ig(e, this.api, i), s = n.barGroup = this._createBarGroup(o);
            s.add(n.outOfRange = Cg()), s.add(n.inRange = Cg(null, a ? Lg(this._orient) : null, y(this._dragHandle, this, "all", !1), y(this._dragHandle, this, "all", !0)));
            var l = e.textStyleModel.getTextRect("国"), u = _A(l.width, l.height);
            a && (n.handleThumbs = [], n.handleLabels = [], n.handleLabelPoints = [], this._createHandle(s, 0, i, u, r, o), this._createHandle(s, 1, i, u, r, o)), this._createIndicator(s, i, u, r), t.add(s)
        }, _createHandle: function (t, e, n, i, r) {
            var a = y(this._dragHandle, this, e, !1), o = y(this._dragHandle, this, e, !0),
                s = Cg(Ag(e, i), Lg(this._orient), a, o);
            s.position[0] = n[0], t.add(s);
            var l = this.visualMapModel.textStyleModel, u = new I_({
                draggable: !0, drift: a, onmousemove: function (t) {
                    Cm(t.event)
                }, ondragend: o, style: {x: 0, y: 0, text: "", textFont: l.getFont(), textFill: l.getTextColor()}
            });
            this.group.add(u);
            var h = ["horizontal" === r ? i / 2 : 1.5 * i, "horizontal" === r ? 0 === e ? -(1.5 * i) : 1.5 * i : 0 === e ? -i / 2 : i / 2],
                c = this._shapes;
            c.handleThumbs[e] = s, c.handleLabelPoints[e] = h, c.handleLabels[e] = u
        }, _createIndicator: function (t, e, n, i) {
            var r = Cg([[0, 0]], "move");
            r.position[0] = e[0], r.attr({invisible: !0, silent: !0}), t.add(r);
            var a = this.visualMapModel.textStyleModel, o = new I_({
                silent: !0,
                invisible: !0,
                style: {x: 0, y: 0, text: "", textFont: a.getFont(), textFill: a.getTextColor()}
            });
            this.group.add(o);
            var s = ["horizontal" === i ? n / 2 : bA + 3, 0], l = this._shapes;
            l.indicator = r, l.indicatorLabel = o, l.indicatorLabelPoint = s
        }, _dragHandle: function (t, e, n, i) {
            if (this._useHandle) {
                if (this._dragging = !e, !e) {
                    var r = this._applyTransform([n, i], this._shapes.barGroup, !0);
                    this._updateInterval(t, r[1]), this._updateView()
                }
                e === !this.visualMapModel.get("realtime") && this.api.dispatchAction({
                    type: "selectDataRange",
                    from: this.uid,
                    visualMapId: this.visualMapModel.id,
                    selected: this._dataInterval.slice()
                }), e ? !this._hovering && this._clearHoverLinkToSeries() : Pg(this.visualMapModel) && this._doHoverLinkToSeries(this._handleEnds[t], !1)
            }
        }, _resetInterval: function () {
            var t = this.visualMapModel, e = this._dataInterval = t.getSelected(), n = t.getExtent(),
                i = [0, t.itemSize[1]];
            this._handleEnds = [mA(e[0], n, i, !0), mA(e[1], n, i, !0)]
        }, _updateInterval: function (t, e) {
            e = e || 0;
            var n = this.visualMapModel, i = this._handleEnds, r = [0, n.itemSize[1]];
            AC(e, i, r, t, 0);
            var a = n.getExtent();
            this._dataInterval = [mA(i[0], r, a, !0), mA(i[1], r, a, !0)]
        }, _updateView: function (t) {
            var e = this.visualMapModel, n = e.getExtent(), i = this._shapes, r = [0, e.itemSize[1]],
                a = t ? r : this._handleEnds, o = this._createBarVisual(this._dataInterval, n, a, "inRange"),
                s = this._createBarVisual(n, n, r, "outOfRange");
            i.inRange.setStyle({
                fill: o.barColor,
                opacity: o.opacity
            }).setShape("points", o.barPoints), i.outOfRange.setStyle({
                fill: s.barColor,
                opacity: s.opacity
            }).setShape("points", s.barPoints), this._updateHandle(a, o)
        }, _createBarVisual: function (t, e, n, i) {
            var r = {forceState: i, convertOpacityToAlpha: !0}, a = this._makeColorGradient(t, r),
                o = [this.getControllerVisual(t[0], "symbolSize", r), this.getControllerVisual(t[1], "symbolSize", r)],
                s = this._createBarPoints(n, o);
            return {barColor: new X_(0, 0, 0, 1, a), barPoints: s, handlesColor: [a[0].color, a[a.length - 1].color]}
        }, _makeColorGradient: function (t, e) {
            var n = 100, i = [], r = (t[1] - t[0]) / n;
            i.push({color: this.getControllerVisual(t[0], "color", e), offset: 0});
            for (var a = 1; n > a; a++) {
                var o = t[0] + r * a;
                if (o > t[1]) break;
                i.push({color: this.getControllerVisual(o, "color", e), offset: a / n})
            }
            return i.push({color: this.getControllerVisual(t[1], "color", e), offset: 1}), i
        }, _createBarPoints: function (t, e) {
            var n = this.visualMapModel.itemSize;
            return [[n[0] - e[0], t[0]], [n[0], t[0]], [n[0], t[1]], [n[0] - e[1], t[1]]]
        }, _createBarGroup: function (t) {
            var e = this._orient, n = this.visualMapModel.get("inverse");
            return new dy("horizontal" !== e || n ? "horizontal" === e && n ? {
                scale: "bottom" === t ? [-1, 1] : [1, 1],
                rotation: -Math.PI / 2
            } : "vertical" !== e || n ? {scale: "left" === t ? [1, 1] : [-1, 1]} : {scale: "left" === t ? [1, -1] : [-1, -1]} : {
                scale: "bottom" === t ? [1, 1] : [-1, 1],
                rotation: Math.PI / 2
            })
        }, _updateHandle: function (t, e) {
            if (this._useHandle) {
                var n = this._shapes, i = this.visualMapModel, r = n.handleThumbs, a = n.handleLabels;
                yA([0, 1], function (o) {
                    var s = r[o];
                    s.setStyle("fill", e.handlesColor[o]), s.position[1] = t[o];
                    var l = Ba(n.handleLabelPoints[o], Ra(s, this.group));
                    a[o].setStyle({
                        x: l[0],
                        y: l[1],
                        text: i.formatValueText(this._dataInterval[o]),
                        textVerticalAlign: "middle",
                        textAlign: this._applyTransform("horizontal" === this._orient ? 0 === o ? "bottom" : "top" : "left", n.barGroup)
                    })
                }, this)
            }
        }, _showIndicator: function (t, e, n, i) {
            var r = this.visualMapModel, a = r.getExtent(), o = r.itemSize, s = [0, o[1]], l = mA(t, a, s, !0),
                u = this._shapes, h = u.indicator;
            if (h) {
                h.position[1] = l, h.attr("invisible", !1), h.setShape("points", Dg(!!n, i, l, o[1]));
                var c = {convertOpacityToAlpha: !0}, d = this.getControllerVisual(t, "color", c);
                h.setStyle("fill", d);
                var f = Ba(u.indicatorLabelPoint, Ra(h, this.group)), p = u.indicatorLabel;
                p.attr("invisible", !1);
                var g = this._applyTransform("left", u.barGroup), v = this._orient;
                p.setStyle({
                    text: (n ? n : "") + r.formatValueText(e),
                    textVerticalAlign: "horizontal" === v ? g : "middle",
                    textAlign: "horizontal" === v ? "center" : g,
                    x: f[0],
                    y: f[1]
                })
            }
        }, _enableHoverLinkToSeries: function () {
            var t = this;
            this._shapes.barGroup.on("mousemove", function (e) {
                if (t._hovering = !0, !t._dragging) {
                    var n = t.visualMapModel.itemSize,
                        i = t._applyTransform([e.offsetX, e.offsetY], t._shapes.barGroup, !0, !0);
                    i[1] = xA(_A(0, i[1]), n[1]), t._doHoverLinkToSeries(i[1], 0 <= i[0] && i[0] <= n[0])
                }
            }).on("mouseout", function () {
                t._hovering = !1, !t._dragging && t._clearHoverLinkToSeries()
            })
        }, _enableHoverLinkFromSeries: function () {
            var t = this.api.getZr();
            this.visualMapModel.option.hoverLink ? (t.on("mouseover", this._hoverLinkFromSeriesMouseOver, this), t.on("mouseout", this._hideIndicator, this)) : this._clearHoverLinkFromSeries()
        }, _doHoverLinkToSeries: function (t, e) {
            var n = this.visualMapModel, i = n.itemSize;
            if (n.option.hoverLink) {
                var r = [0, i[1]], a = n.getExtent();
                t = xA(_A(r[0], t), r[1]);
                var o = kg(n, a, r), s = [t - o, t + o], l = mA(t, r, a, !0),
                    u = [mA(s[0], r, a, !0), mA(s[1], r, a, !0)];
                s[0] < r[0] && (u[0] = -1 / 0), s[1] > r[1] && (u[1] = 1 / 0), e && (u[0] === -1 / 0 ? this._showIndicator(l, u[1], "< ", o) : 1 / 0 === u[1] ? this._showIndicator(l, u[0], "> ", o) : this._showIndicator(l, l, "≈ ", o));
                var h = this._hoverLinkDataIndices, c = [];
                (e || Pg(n)) && (c = this._hoverLinkDataIndices = n.findTargetDataIndices(u));
                var d = Xi(h, c);
                this._dispatchHighDown("downplay", Tg(d[0])), this._dispatchHighDown("highlight", Tg(d[1]))
            }
        }, _hoverLinkFromSeriesMouseOver: function (t) {
            var e = t.target, n = this.visualMapModel;
            if (e && null != e.dataIndex) {
                var i = this.ecModel.getSeriesByIndex(e.seriesIndex);
                if (n.isTargetSeries(i)) {
                    var r = i.getData(e.dataType), a = r.get(n.getDataDimension(r), e.dataIndex, !0);
                    isNaN(a) || this._showIndicator(a, a)
                }
            }
        }, _hideIndicator: function () {
            var t = this._shapes;
            t.indicator && t.indicator.attr("invisible", !0), t.indicatorLabel && t.indicatorLabel.attr("invisible", !0)
        }, _clearHoverLinkToSeries: function () {
            this._hideIndicator();
            var t = this._hoverLinkDataIndices;
            this._dispatchHighDown("downplay", Tg(t)), t.length = 0
        }, _clearHoverLinkFromSeries: function () {
            this._hideIndicator();
            var t = this.api.getZr();
            t.off("mouseover", this._hoverLinkFromSeriesMouseOver), t.off("mouseout", this._hideIndicator)
        }, _applyTransform: function (t, e, n, i) {
            var r = Ra(e, i ? null : this.group);
            return nw[_(t) ? "applyTransform" : "transformDirection"](t, r, n)
        }, _dispatchHighDown: function (t, e) {
            e && e.length && this.api.dispatchAction({type: t, batch: e})
        }, dispose: function () {
            this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries()
        }, remove: function () {
            this._clearHoverLinkFromSeries(), this._clearHoverLinkToSeries()
        }
    }), SA = {type: "selectDataRange", event: "dataRangeSelected", update: "update"};
    tu(SA, function (t, e) {
        e.eachComponent({mainType: "visualMap", query: t}, function (e) {
            e.setSelected(t.selected)
        })
    }), $l(qC);
    {
        var IA = fA.extend({
            type: "visualMap.piecewise",
            defaultOption: {
                selected: null,
                minOpen: !1,
                maxOpen: !1,
                align: "auto",
                itemWidth: 20,
                itemHeight: 14,
                itemSymbol: "roundRect",
                pieceList: null,
                categories: null,
                splitNumber: 5,
                selectedMode: "multiple",
                itemGap: 10,
                hoverLink: !0,
                showLabel: null
            },
            optionUpdated: function (t, e) {
                IA.superApply(this, "optionUpdated", arguments), this._pieceList = [], this.resetExtent();
                var n = this._mode = this._determineMode();
                TA[this._mode].call(this), this._resetSelected(t, e);
                var r = this.option.categories;
                this.resetVisual(function (t, e) {
                    "categories" === n ? (t.mappingMethod = "category", t.categories = i(r)) : (t.dataExtent = this.getExtent(), t.mappingMethod = "piecewise", t.pieceList = p(this._pieceList, function (t) {
                        var t = i(t);
                        return "inRange" !== e && (t.visual = null), t
                    }))
                })
            },
            completeVisualOption: function () {
                function t(t, e, n) {
                    return t && t[e] && (M(t[e]) ? t[e].hasOwnProperty(n) : t[e] === n)
                }

                var e = this.option, n = {}, i = JC.listVisualTypes(), r = this.isCategory();
                f(e.pieces, function (t) {
                    f(i, function (e) {
                        t.hasOwnProperty(e) && (n[e] = 1)
                    })
                }), f(n, function (n, i) {
                    var a = 0;
                    f(this.stateList, function (n) {
                        a |= t(e, n, i) || t(e.target, n, i)
                    }, this), !a && f(this.stateList, function (t) {
                        (e[t] || (e[t] = {}))[i] = rA.get(i, "inRange" === t ? "active" : "inactive", r)
                    })
                }, this), fA.prototype.completeVisualOption.apply(this, arguments)
            },
            _resetSelected: function (t, e) {
                var n = this.option, i = this._pieceList, r = (e ? n : t).selected || {};
                if (n.selected = r, f(i, function (t) {
                    var e = this.getSelectedMapKey(t);
                    r.hasOwnProperty(e) || (r[e] = !0)
                }, this), "single" === n.selectedMode) {
                    var a = !1;
                    f(i, function (t) {
                        var e = this.getSelectedMapKey(t);
                        r[e] && (a ? r[e] = !1 : a = !0)
                    }, this)
                }
            },
            getSelectedMapKey: function (t) {
                return "categories" === this._mode ? t.value + "" : t.index + ""
            },
            getPieceList: function () {
                return this._pieceList
            },
            _determineMode: function () {
                var t = this.option;
                return t.pieces && t.pieces.length > 0 ? "pieces" : this.option.categories ? "categories" : "splitNumber"
            },
            setSelected: function (t) {
                this.option.selected = i(t)
            },
            getValueState: function (t) {
                var e = JC.findPieceIndex(t, this._pieceList);
                return null != e && this.option.selected[this.getSelectedMapKey(this._pieceList[e])] ? "inRange" : "outOfRange"
            },
            findTargetDataIndices: function (t) {
                var e = [];
                return this.eachTargetSeries(function (n) {
                    var i = [], r = n.getData();
                    r.each(this.getDataDimension(r), function (e, n) {
                        var r = JC.findPieceIndex(e, this._pieceList);
                        r === t && i.push(n)
                    }, this), e.push({seriesId: n.id, dataIndex: i})
                }, this), e
            },
            getRepresentValue: function (t) {
                var e;
                if (this.isCategory()) e = t.value; else if (null != t.value) e = t.value; else {
                    var n = t.interval || [];
                    e = n[0] === -1 / 0 && 1 / 0 === n[1] ? 0 : (n[0] + n[1]) / 2
                }
                return e
            },
            getVisualMeta: function (t) {
                function e(e, a) {
                    var o = r.getRepresentValue({interval: e});
                    a || (a = r.getValueState(o));
                    var s = t(o, a);
                    e[0] === -1 / 0 ? i[0] = s : 1 / 0 === e[1] ? i[1] = s : n.push({
                        value: e[0],
                        color: s
                    }, {value: e[1], color: s})
                }

                if (!this.isCategory()) {
                    var n = [], i = [], r = this, a = this._pieceList.slice();
                    if (a.length) {
                        var o = a[0].interval[0];
                        o !== -1 / 0 && a.unshift({interval: [-1 / 0, o]}), o = a[a.length - 1].interval[1], 1 / 0 !== o && a.push({interval: [o, 1 / 0]})
                    } else a.push({interval: [-1 / 0, 1 / 0]});
                    var s = -1 / 0;
                    return f(a, function (t) {
                        var n = t.interval;
                        n && (n[0] > s && e([s, n[0]], "outOfRange"), e(n.slice()), s = n[1])
                    }, this), {stops: n, outerColors: i}
                }
            }
        }), TA = {
            splitNumber: function () {
                var t = this.option, e = this._pieceList, n = Math.min(t.precision, 20), i = this.getExtent(),
                    r = t.splitNumber;
                r = Math.max(parseInt(r, 10), 1), t.splitNumber = r;
                for (var a = (i[1] - i[0]) / r; +a.toFixed(n) !== a && 5 > n;) n++;
                t.precision = n, a = +a.toFixed(n);
                var o = 0;
                t.minOpen && e.push({index: o++, interval: [-1 / 0, i[0]], close: [0, 0]});
                for (var s = i[0], l = o + r; l > o; s += a) {
                    var u = o === r - 1 ? i[1] : s + a;
                    e.push({index: o++, interval: [s, u], close: [1, 1]})
                }
                t.maxOpen && e.push({index: o++, interval: [i[1], 1 / 0], close: [0, 0]}), co(e), f(e, function (t) {
                    t.text = this.formatValueText(t.interval)
                }, this)
            }, categories: function () {
                var t = this.option;
                f(t.categories, function (t) {
                    this._pieceList.push({text: this.formatValueText(t, !0), value: t})
                }, this), Og(t, this._pieceList)
            }, pieces: function () {
                var t = this.option, e = this._pieceList;
                f(t.pieces, function (t, n) {
                    M(t) || (t = {value: t});
                    var i = {text: "", index: n};
                    if (null != t.label && (i.text = t.label), t.hasOwnProperty("value")) {
                        var r = i.value = t.value;
                        i.interval = [r, r], i.close = [1, 1]
                    } else {
                        for (var a = i.interval = [], o = i.close = [0, 0], s = [1, 0, 1], l = [-1 / 0, 1 / 0], u = [], h = 0; 2 > h; h++) {
                            for (var c = [["gte", "gt", "min"], ["lte", "lt", "max"]][h], d = 0; 3 > d && null == a[h]; d++) a[h] = t[c[d]], o[h] = s[d], u[h] = 2 === d;
                            null == a[h] && (a[h] = l[h])
                        }
                        u[0] && 1 / 0 === a[1] && (o[0] = 0), u[1] && a[0] === -1 / 0 && (o[1] = 0), a[0] === a[1] && o[0] && o[1] && (i.value = a[0])
                    }
                    i.visual = JC.retrieveVisuals(t), e.push(i)
                }, this), Og(t, e), co(e), f(e, function (t) {
                    var e = t.close, n = [["<", "≤"][e[1]], [">", "≥"][e[0]]];
                    t.text = t.text || this.formatValueText(null != t.value ? t.value : t.interval, !1, n)
                }, this)
            }
        };
        vA.extend({
            type: "visualMap.piecewise", doRender: function () {
                function t(t) {
                    var r = t.piece, u = new dy;
                    u.onclick = y(this._onItemClick, this, r), this._enableHoverLink(u, t.indexInModelPieceList);
                    var h = n.getRepresentValue(r);
                    if (this._createItemSymbol(u, h, [0, 0, l[0], l[1]]), c) {
                        var d = this.visualMapModel.getValueState(h);
                        u.add(new I_({
                            style: {
                                x: "right" === s ? -i : l[0] + i,
                                y: l[1] / 2,
                                text: r.text,
                                textVerticalAlign: "middle",
                                textAlign: s,
                                textFont: a,
                                textFill: o,
                                opacity: "outOfRange" === d ? .5 : 1
                            }
                        }))
                    }
                    e.add(u)
                }

                var e = this.group;
                e.removeAll();
                var n = this.visualMapModel, i = n.get("textGap"), r = n.textStyleModel, a = r.getFont(),
                    o = r.getTextColor(), s = this._getItemAlign(), l = n.itemSize, u = this._getViewData(),
                    h = u.endsText, c = A(n.get("showLabel", !0), !h);
                h && this._renderEndsText(e, h[0], l, c, s), f(u.viewPieceList, t, this), h && this._renderEndsText(e, h[1], l, c, s), Sw(n.get("orient"), e, n.get("itemGap")), this.renderBackground(e), this.positionGroup(e)
            }, _enableHoverLink: function (t, e) {
                function n(t) {
                    var n = this.visualMapModel;
                    n.option.hoverLink && this.api.dispatchAction({type: t, batch: Tg(n.findTargetDataIndices(e))})
                }

                t.on("mouseover", y(n, this, "highlight")).on("mouseout", y(n, this, "downplay"))
            }, _getItemAlign: function () {
                var t = this.visualMapModel, e = t.option;
                if ("vertical" === e.orient) return Ig(t, this.api, t.itemSize);
                var n = e.align;
                return n && "auto" !== n || (n = "left"), n
            }, _renderEndsText: function (t, e, n, i, r) {
                if (e) {
                    var a = new dy, o = this.visualMapModel.textStyleModel;
                    a.add(new I_({
                        style: {
                            x: i ? "right" === r ? n[0] : 0 : n[0] / 2,
                            y: n[1] / 2,
                            textVerticalAlign: "middle",
                            textAlign: i ? r : "center",
                            text: e,
                            textFont: o.getFont(),
                            textFill: o.getTextColor()
                        }
                    })), t.add(a)
                }
            }, _getViewData: function () {
                var t = this.visualMapModel, e = p(t.getPieceList(), function (t, e) {
                    return {piece: t, indexInModelPieceList: e}
                }), n = t.get("text"), i = t.get("orient"), r = t.get("inverse");
                return ("horizontal" === i ? r : !r) ? e.reverse() : n && (n = n.slice().reverse()), {
                    viewPieceList: e,
                    endsText: n
                }
            }, _createItemSymbol: function (t, e, n) {
                t.add(_h(this.getControllerVisual(e, "symbol"), n[0], n[1], n[2], n[3], this.getControllerVisual(e, "color")))
            }, _onItemClick: function (t) {
                var e = this.visualMapModel, n = e.option, r = i(n.selected), a = e.getSelectedMapKey(t);
                "single" === n.selectedMode ? (r[a] = !0, f(r, function (t, e) {
                    r[e] = e === a
                })) : r[a] = !r[a], this.api.dispatchAction({
                    type: "selectDataRange",
                    from: this.uid,
                    visualMapId: this.visualMapModel.id,
                    selected: r
                })
            }
        })
    }
    $l(qC);
    var CA = {}, AA = su({
        type: "toolbox",
        layoutMode: {type: "box", ignoreSize: !0},
        optionUpdated: function () {
            AA.superApply(this, "optionUpdated", arguments), f(this.option.feature, function (t, e) {
                var n = Eg(e);
                n && r(t, n.defaultOption)
            })
        },
        defaultOption: {
            show: !0,
            z: 6,
            zlevel: 0,
            orient: "horizontal",
            left: "right",
            top: "top",
            backgroundColor: "transparent",
            borderColor: "#ccc",
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemSize: 15,
            itemGap: 8,
            showTitle: !0,
            iconStyle: {borderColor: "#666", color: "none"},
            emphasis: {iconStyle: {borderColor: "#3E98C5"}}
        }
    });
    lu({
        type: "toolbox", render: function (t, e, n, i) {
            function r(r, o) {
                var s, c = h[r], d = h[o], f = l[c], p = new Wa(f, t, t.ecModel);
                if (c && !d) {
                    if (Rg(c)) s = {model: p, onclick: p.option.onclick, featureName: c}; else {
                        var g = Eg(c);
                        if (!g) return;
                        s = new g(p, e, n)
                    }
                    u[c] = s
                } else {
                    if (s = u[d], !s) return;
                    s.model = p, s.ecModel = e, s.api = n
                }
                return !c && d ? void (s.dispose && s.dispose(e, n)) : !p.get("show") || s.unusable ? void (s.remove && s.remove(e, n)) : (a(p, s, c), p.setIconStatus = function (t, e) {
                    var n = this.option, i = this.iconPaths;
                    n.iconStatus = n.iconStatus || {}, n.iconStatus[t] = e, i[t] && i[t].trigger(e)
                }, void (s.render && s.render(p, e, n, i)))
            }

            function a(i, r, a) {
                var l = i.getModel("iconStyle"), u = i.getModel("emphasis.iconStyle"),
                    h = r.getIcons ? r.getIcons() : i.get("icon"), c = i.get("title") || {};
                if ("string" == typeof h) {
                    var d = h, p = c;
                    h = {}, c = {}, h[a] = d, c[a] = p
                }
                var g = i.iconPaths = {};
                f(h, function (a, h) {
                    var d = Ga(a, {}, {x: -s / 2, y: -s / 2, width: s, height: s});
                    d.setStyle(l.getItemStyle()), d.hoverStyle = u.getItemStyle(), wa(d), t.get("showTitle") && (d.__title = c[h], d.on("mouseover", function () {
                        var t = u.getItemStyle();
                        d.setStyle({
                            text: c[h],
                            textPosition: t.textPosition || "bottom",
                            textFill: t.fill || t.stroke || "#000",
                            textAlign: t.textAlign || "center"
                        })
                    }).on("mouseout", function () {
                        d.setStyle({textFill: null})
                    })), d.trigger(i.get("iconStatus." + h) || "normal"), o.add(d), d.on("click", y(r.onclick, r, e, n, h)), g[h] = d
                })
            }

            var o = this.group;
            if (o.removeAll(), t.get("show")) {
                var s = +t.get("itemSize"), l = t.get("feature") || {}, u = this._features || (this._features = {}),
                    h = [];
                f(l, function (t, e) {
                    h.push(e)
                }), new gu(this._featureNames || [], h).add(r).update(r).remove(x(r, null)).execute(), this._featureNames = h, Xd(o, t, n), o.add(Yd(o.getBoundingRect(), t)), o.eachChild(function (t) {
                    var e = t.__title, i = t.hoverStyle;
                    if (i && e) {
                        var r = Nn(e, Jn(i)), a = t.position[0] + o.position[0], l = t.position[1] + o.position[1] + s,
                            u = !1;
                        l + r.height > n.getHeight() && (i.textPosition = "top", u = !0);
                        var h = u ? -5 - r.height : s + 8;
                        a + r.width / 2 > n.getWidth() ? (i.textPosition = ["100%", h], i.textAlign = "right") : a - r.width / 2 < 0 && (i.textPosition = [0, h], i.textAlign = "left")
                    }
                })
            }
        }, updateView: function (t, e, n, i) {
            f(this._features, function (t) {
                t.updateView && t.updateView(t.model, e, n, i)
            })
        }, remove: function (t, e) {
            f(this._features, function (n) {
                n.remove && n.remove(t, e)
            }), this.group.removeAll()
        }, dispose: function (t, e) {
            f(this._features, function (n) {
                n.dispose && n.dispose(t, e)
            })
        }
    });
    var DA = Tb.toolbox.saveAsImage;
    Bg.defaultOption = {
        show: !0,
        icon: "M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0",
        title: DA.title,
        type: "png",
        name: "",
        excludeComponents: ["toolbox"],
        pixelRatio: 1,
        lang: DA.lang.slice()
    }, Bg.prototype.unusable = !nm.canvasSupported;
    var kA = Bg.prototype;
    kA.onclick = function (t, e) {
        var n = this.model, i = n.get("name") || t.get("title.0.text") || "echarts", r = document.createElement("a"),
            a = n.get("type", !0) || "png";
        r.download = i + "." + a, r.target = "_blank";
        var o = e.getConnectedDataURL({
            type: a,
            backgroundColor: n.get("backgroundColor", !0) || t.get("backgroundColor") || "#fff",
            excludeComponents: n.get("excludeComponents"),
            pixelRatio: n.get("pixelRatio")
        });
        if (r.href = o, "function" != typeof MouseEvent || nm.browser.ie || nm.browser.edge) if (window.navigator.msSaveOrOpenBlob) {
            for (var s = atob(o.split(",")[1]), l = s.length, u = new Uint8Array(l); l--;) u[l] = s.charCodeAt(l);
            var h = new Blob([u]);
            window.navigator.msSaveOrOpenBlob(h, i + "." + a)
        } else {
            var c = n.get("lang"),
                d = '<body style="margin:0;"><img src="' + o + '" style="max-width:100%;" title="' + (c && c[0] || "") + '" /></body>',
                f = window.open();
            f.document.write(d)
        } else {
            var p = new MouseEvent("click", {view: window, bubbles: !0, cancelable: !1});
            r.dispatchEvent(p)
        }
    }, zg("saveAsImage", Bg);
    var PA = Tb.toolbox.magicType;
    Ng.defaultOption = {
        show: !0,
        type: [],
        icon: {
            line: "M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
            bar: "M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
            stack: "M8.2,38.4l-8.4,4.1l30.6,15.3L60,42.5l-8.1-4.1l-21.5,11L8.2,38.4z M51.9,30l-8.1,4.2l-13.4,6.9l-13.9-6.9L8.2,30l-8.4,4.2l8.4,4.2l22.2,11l21.5-11l8.1-4.2L51.9,30z M51.9,21.7l-8.1,4.2L35.7,30l-5.3,2.8L24.9,30l-8.4-4.1l-8.3-4.2l-8.4,4.2L8.2,30l8.3,4.2l13.9,6.9l13.4-6.9l8.1-4.2l8.1-4.1L51.9,21.7zM30.4,2.2L-0.2,17.5l8.4,4.1l8.3,4.2l8.4,4.2l5.5,2.7l5.3-2.7l8.1-4.2l8.1-4.2l8.1-4.1L30.4,2.2z",
            tiled: "M2.3,2.2h22.8V25H2.3V2.2z M35,2.2h22.8V25H35V2.2zM2.3,35h22.8v22.8H2.3V35z M35,35h22.8v22.8H35V35z"
        },
        title: i(PA.title),
        option: {},
        seriesIndex: {}
    };
    var LA = Ng.prototype;
    LA.getIcons = function () {
        var t = this.model, e = t.get("icon"), n = {};
        return f(t.get("type"), function (t) {
            e[t] && (n[t] = e[t])
        }), n
    };
    var OA = {
        line: function (t, e, n, i) {
            return "bar" === t ? r({
                id: e,
                type: "line",
                data: n.get("data"),
                stack: n.get("stack"),
                markPoint: n.get("markPoint"),
                markLine: n.get("markLine")
            }, i.get("option.line") || {}, !0) : void 0
        }, bar: function (t, e, n, i) {
            return "line" === t ? r({
                id: e,
                type: "bar",
                data: n.get("data"),
                stack: n.get("stack"),
                markPoint: n.get("markPoint"),
                markLine: n.get("markLine")
            }, i.get("option.bar") || {}, !0) : void 0
        }, stack: function (t, e, n, i) {
            return "line" === t || "bar" === t ? r({
                id: e,
                stack: "__ec_magicType_stack__"
            }, i.get("option.stack") || {}, !0) : void 0
        }, tiled: function (t, e, n, i) {
            return "line" === t || "bar" === t ? r({id: e, stack: ""}, i.get("option.tiled") || {}, !0) : void 0
        }
    }, zA = [["line", "bar"], ["stack", "tiled"]];
    LA.onclick = function (t, e, n) {
        var i = this.model, r = i.get("seriesIndex." + n);
        if (OA[n]) {
            var a = {series: []}, o = function (e) {
                var r = e.subType, o = e.id, l = OA[n](r, o, e, i);
                l && (s(l, e.option), a.series.push(l));
                var u = e.coordinateSystem;
                if (u && "cartesian2d" === u.type && ("line" === n || "bar" === n)) {
                    var h = u.getAxesByScale("ordinal")[0];
                    if (h) {
                        var c = h.dim, d = c + "Axis", f = t.queryComponents({
                            mainType: d,
                            index: e.get(name + "Index"),
                            id: e.get(name + "Id")
                        })[0], p = f.componentIndex;
                        a[d] = a[d] || [];
                        for (var g = 0; p >= g; g++) a[d][p] = a[d][p] || {};
                        a[d][p].boundaryGap = "bar" === n
                    }
                }
            };
            f(zA, function (t) {
                u(t, n) >= 0 && f(t, function (t) {
                    i.setIconStatus(t, "normal")
                })
            }), i.setIconStatus(n, "emphasis"), t.eachComponent({
                mainType: "series",
                query: null == r ? null : {seriesIndex: r}
            }, o), e.dispatchAction({type: "changeMagicType", currentType: n, newOption: a})
        }
    }, tu({type: "changeMagicType", event: "magicTypeChanged", update: "prepareAndUpdate"}, function (t, e) {
        e.mergeOption(t.newOption)
    }), zg("magicType", Ng);
    var EA = Tb.toolbox.dataView, RA = new Array(60).join("-"), BA = "    ", NA = new RegExp("[" + BA + "]+", "g");
    jg.defaultOption = {
        show: !0,
        readOnly: !1,
        optionToContent: null,
        contentToOption: null,
        icon: "M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28",
        title: i(EA.title),
        lang: i(EA.lang),
        backgroundColor: "#fff",
        textColor: "#000",
        textareaColor: "#fff",
        textareaBorderColor: "#333",
        buttonColor: "#c23531",
        buttonTextColor: "#fff"
    }, jg.prototype.onclick = function (t, e) {
        function n() {
            i.removeChild(a), x._dom = null
        }

        var i = e.getDom(), r = this.model;
        this._dom && i.removeChild(this._dom);
        var a = document.createElement("div");
        a.style.cssText = "position:absolute;left:5px;top:5px;bottom:5px;right:5px;", a.style.backgroundColor = r.get("backgroundColor") || "#fff";
        var o = document.createElement("h4"), s = r.get("lang") || [];
        o.innerHTML = s[0] || r.get("title"), o.style.cssText = "margin: 10px 20px;", o.style.color = r.get("textColor");
        var l = document.createElement("div"), u = document.createElement("textarea");
        l.style.cssText = "display:block;width:100%;overflow:auto;";
        var h = r.get("optionToContent"), c = r.get("contentToOption"), d = Gg(t);
        if ("function" == typeof h) {
            var f = h(e.getOption());
            "string" == typeof f ? l.innerHTML = f : T(f) && l.appendChild(f)
        } else l.appendChild(u), u.readOnly = r.get("readOnly"), u.style.cssText = "width:100%;height:100%;font-family:monospace;font-size:14px;line-height:1.6rem;", u.style.color = r.get("textColor"), u.style.borderColor = r.get("textareaBorderColor"), u.style.backgroundColor = r.get("textareaColor"), u.value = d.value;
        var p = d.meta, g = document.createElement("div");
        g.style.cssText = "position:absolute;bottom:0;left:0;right:0;";
        var v = "float:right;margin-right:20px;border:none;cursor:pointer;padding:2px 5px;font-size:12px;border-radius:3px",
            m = document.createElement("div"), y = document.createElement("div");
        v += ";background-color:" + r.get("buttonColor"), v += ";color:" + r.get("buttonTextColor");
        var x = this;
        ve(m, "click", n), ve(y, "click", function () {
            var t;
            try {
                t = "function" == typeof c ? c(l, e.getOption()) : Ug(u.value, p)
            } catch (i) {
                throw n(), new Error("Data view format error " + i)
            }
            t && e.dispatchAction({type: "changeDataView", newOption: t}), n()
        }), m.innerHTML = s[1], y.innerHTML = s[2], y.style.cssText = v, m.style.cssText = v, !r.get("readOnly") && g.appendChild(y), g.appendChild(m), ve(u, "keydown", function (t) {
            if (9 === (t.keyCode || t.which)) {
                var e = this.value, n = this.selectionStart, i = this.selectionEnd;
                this.value = e.substring(0, n) + BA + e.substring(i), this.selectionStart = this.selectionEnd = n + 1, Cm(t)
            }
        }), a.appendChild(o), a.appendChild(l), a.appendChild(g), l.style.height = i.clientHeight - 80 + "px", i.appendChild(a), this._dom = a
    }, jg.prototype.remove = function (t, e) {
        this._dom && e.getDom().removeChild(this._dom)
    }, jg.prototype.dispose = function (t, e) {
        this.remove(t, e)
    }, zg("dataView", jg), tu({
        type: "changeDataView",
        event: "dataViewChanged",
        update: "prepareAndUpdate"
    }, function (t, e) {
        var n = [];
        f(t.newOption.series, function (t) {
            var i = e.getSeriesByName(t.name)[0];
            if (i) {
                var r = i.get("data");
                n.push({name: t.name, data: qg(t.data, r)})
            } else n.push(o({type: "scatter"}, t))
        }), e.mergeOption(s({series: n}, t.newOption))
    });
    var VA = x, FA = f, HA = p, GA = Math.min, WA = Math.max, ZA = Math.pow, XA = 1e4, YA = 6, UA = 6, jA = "globalPan",
        qA = {w: [0, 0], e: [0, 1], n: [1, 0], s: [1, 1]},
        KA = {w: "ew", e: "ew", n: "ns", s: "ns", ne: "nesw", sw: "nesw", nw: "nwse", se: "nwse"}, $A = {
            brushStyle: {lineWidth: 2, stroke: "rgba(0,0,0,0.3)", fill: "rgba(0,0,0,0.1)"},
            transformable: !0,
            brushMode: "single",
            removeOnClick: !1
        }, QA = 0;
    Kg.prototype = {
        constructor: Kg, enableBrush: function (t) {
            return this._brushType && Qg(this), t.brushType && $g(this, t), this
        }, setPanels: function (t) {
            if (t && t.length) {
                var e = this._panels = {};
                f(t, function (t) {
                    e[t.panelId] = i(t)
                })
            } else this._panels = null;
            return this
        }, mount: function (t) {
            t = t || {}, this._enableGlobalPan = t.enableGlobalPan;
            var e = this.group;
            return this._zr.add(e), e.attr({
                position: t.position || [0, 0],
                rotation: t.rotation || 0,
                scale: t.scale || [1, 1]
            }), this._transform = e.getLocalTransform(), this
        }, eachCover: function (t, e) {
            FA(this._covers, t, e)
        }, updateCovers: function (t) {
            function e(t, e) {
                return (null != t.id ? t.id : s + e) + "-" + t.brushType
            }

            function n(t, n) {
                return e(t.__brushOption, n)
            }

            function a(e, n) {
                var i = t[e];
                if (null != n && l[n] === c) u[e] = l[n]; else {
                    var r = u[e] = null != n ? (l[n].__brushOption = i, l[n]) : tv(h, Jg(h, i));
                    iv(h, r)
                }
            }

            function o(t) {
                l[t] !== c && h.group.remove(l[t])
            }

            t = p(t, function (t) {
                return r(i($A), t, !0)
            });
            var s = "\x00-brush-index-", l = this._covers, u = this._covers = [], h = this, c = this._creatingCover;
            return new gu(l, t, n, e).add(a).update(a).remove(o).execute(), this
        }, unmount: function () {
            return this.enableBrush(!1), sv(this), this._zr.remove(this.group), this
        }, dispose: function () {
            this.unmount(), this.off()
        }
    }, c(Kg, Sm);
    var JA = {
            mousedown: function (t) {
                if (this._dragging) Dv.call(this, t); else if (!t.target || !t.target.draggable) {
                    Iv(t);
                    var e = this.group.transformCoordToLocal(t.offsetX, t.offsetY);
                    this._creatingCover = null;
                    var n = this._creatingPanel = av(this, t, e);
                    n && (this._dragging = !0, this._track = [e.slice()])
                }
            }, mousemove: function (t) {
                var e = this.group.transformCoordToLocal(t.offsetX, t.offsetY);
                if (Sv(this, t, e), this._dragging) {
                    Iv(t);
                    var n = Cv(this, t, e, !1);
                    n && lv(this, n)
                }
            }, mouseup: Dv
        }, tD = {
            lineX: kv(0), lineY: kv(1), rect: {
                createCover: function (t, e) {
                    return cv(VA(xv, function (t) {
                        return t
                    }, function (t) {
                        return t
                    }), t, e, ["w", "e", "n", "s", "se", "sw", "ne", "nw"])
                }, getCreatingRange: function (t) {
                    var e = hv(t);
                    return vv(e[1][0], e[1][1], e[0][0], e[0][1])
                }, updateCoverShape: function (t, e, n, i) {
                    dv(t, e, n, i)
                }, updateCommon: fv, contain: Tv
            }, polygon: {
                createCover: function (t, e) {
                    var n = new dy;
                    return n.add(new z_({name: "main", style: gv(e), silent: !0})), n
                }, getCreatingRange: function (t) {
                    return t
                }, endCreating: function (t, e) {
                    e.remove(e.childAt(0)), e.add(new O_({
                        name: "main",
                        draggable: !0,
                        drift: VA(_v, t, e),
                        ondragend: VA(lv, t, {isEnd: !0})
                    }))
                }, updateCoverShape: function (t, e, n) {
                    e.childAt(0).setShape({points: bv(t, e, n)})
                }, updateCommon: fv, contain: Tv
            }
        }, eD = {axisPointer: 1, tooltip: 1, brush: 1}, nD = f, iD = u, rD = x, aD = ["dataToPoint", "pointToData"],
        oD = ["grid", "xAxis", "yAxis", "geo", "graph", "polar", "radiusAxis", "angleAxis", "bmap"], sD = Rv.prototype;
    sD.setOutputRanges = function (t, e) {
        this.matchOutputRanges(t, e, function (t, e, n) {
            if ((t.coordRanges || (t.coordRanges = [])).push(e), !t.coordRange) {
                t.coordRange = e;
                var i = cD[t.brushType](0, n, e);
                t.__rangeOffset = {offset: dD[t.brushType](i.values, t.range, [1, 1]), xyMinMax: i.xyMinMax}
            }
        })
    }, sD.matchOutputRanges = function (t, e, n) {
        nD(t, function (t) {
            var i = this.findTargetInfo(t, e);
            i && i !== !0 && f(i.coordSyses, function (i) {
                var r = cD[t.brushType](1, i, t.range);
                n(t, r.values, i, e)
            })
        }, this)
    }, sD.setInputRanges = function (t, e) {
        nD(t, function (t) {
            var n = this.findTargetInfo(t, e);
            if (t.range = t.range || [], n && n !== !0) {
                t.panelId = n.panelId;
                var i = cD[t.brushType](0, n.coordSys, t.coordRange), r = t.__rangeOffset;
                t.range = r ? dD[t.brushType](i.values, r.offset, Hv(i.xyMinMax, r.xyMinMax)) : i.values
            }
        }, this)
    }, sD.makePanelOpts = function (t, e) {
        return p(this._targetInfoList, function (n) {
            var i = n.getPanelRect();
            return {
                panelId: n.panelId,
                defaultBrushType: e && e(n),
                clipPath: Lv(i),
                isTargetByCursor: zv(i, t, n.coordSysModel),
                getLinearBrushOtherExtent: Ov(i)
            }
        })
    }, sD.controlSeries = function (t, e, n) {
        var i = this.findTargetInfo(t, n);
        return i === !0 || i && iD(i.coordSyses, e.coordinateSystem) >= 0
    }, sD.findTargetInfo = function (t, e) {
        for (var n = this._targetInfoList, i = Nv(e, t), r = 0; r < n.length; r++) {
            var a = n[r], o = t.panelId;
            if (o) {
                if (a.panelId === o) return a
            } else for (var r = 0; r < uD.length; r++) if (uD[r](i, a)) return a
        }
        return !0
    };
    var lD = {
        grid: function (t, e) {
            var n = t.xAxisModels, i = t.yAxisModels, r = t.gridModels, a = N(), o = {}, s = {};
            (n || i || r) && (nD(n, function (t) {
                var e = t.axis.grid.model;
                a.set(e.id, e), o[e.id] = !0
            }), nD(i, function (t) {
                var e = t.axis.grid.model;
                a.set(e.id, e), s[e.id] = !0
            }), nD(r, function (t) {
                a.set(t.id, t), o[t.id] = !0, s[t.id] = !0
            }), a.each(function (t) {
                var r = t.coordinateSystem, a = [];
                nD(r.getCartesians(), function (t) {
                    (iD(n, t.getAxis("x").model) >= 0 || iD(i, t.getAxis("y").model) >= 0) && a.push(t)
                }), e.push({
                    panelId: "grid--" + t.id,
                    gridModel: t,
                    coordSysModel: t,
                    coordSys: a[0],
                    coordSyses: a,
                    getPanelRect: hD.grid,
                    xAxisDeclared: o[t.id],
                    yAxisDeclared: s[t.id]
                })
            }))
        }, geo: function (t, e) {
            nD(t.geoModels, function (t) {
                var n = t.coordinateSystem;
                e.push({
                    panelId: "geo--" + t.id,
                    geoModel: t,
                    coordSysModel: t,
                    coordSys: n,
                    coordSyses: [n],
                    getPanelRect: hD.geo
                })
            })
        }
    }, uD = [function (t, e) {
        var n = t.xAxisModel, i = t.yAxisModel, r = t.gridModel;
        return !r && n && (r = n.axis.grid.model), !r && i && (r = i.axis.grid.model), r && r === e.gridModel
    }, function (t, e) {
        var n = t.geoModel;
        return n && n === e.geoModel
    }], hD = {
        grid: function () {
            return this.coordSys.grid.getRect().clone()
        }, geo: function () {
            var t = this.coordSys, e = t.getBoundingRect().clone();
            return e.applyTransform(Ra(t)), e
        }
    }, cD = {
        lineX: rD(Vv, 0), lineY: rD(Vv, 1), rect: function (t, e, n) {
            var i = e[aD[t]]([n[0][0], n[1][0]]), r = e[aD[t]]([n[0][1], n[1][1]]),
                a = [Bv([i[0], r[0]]), Bv([i[1], r[1]])];
            return {values: a, xyMinMax: a}
        }, polygon: function (t, e, n) {
            var i = [[1 / 0, -1 / 0], [1 / 0, -1 / 0]], r = p(n, function (n) {
                var r = e[aD[t]](n);
                return i[0][0] = Math.min(i[0][0], r[0]), i[1][0] = Math.min(i[1][0], r[1]), i[0][1] = Math.max(i[0][1], r[0]), i[1][1] = Math.max(i[1][1], r[1]), r
            });
            return {values: r, xyMinMax: i}
        }
    }, dD = {
        lineX: rD(Fv, 0), lineY: rD(Fv, 1), rect: function (t, e, n) {
            return [[t[0][0] - n[0] * e[0][0], t[0][1] - n[0] * e[0][1]], [t[1][0] - n[1] * e[1][0], t[1][1] - n[1] * e[1][1]]]
        }, polygon: function (t, e, n) {
            return p(t, function (t, i) {
                return [t[0] - n[0] * e[i][0], t[1] - n[1] * e[i][1]]
            })
        }
    }, fD = f, pD = "\x00_ec_hist_store";
    TC.extend({type: "dataZoom.select"}), CC.extend({type: "dataZoom.select"});
    var gD = Tb.toolbox.dataZoom, vD = f, mD = "\x00_ec_\x00toolbox-dataZoom_";
    jv.defaultOption = {
        show: !0,
        icon: {
            zoom: "M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1",
            back: "M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26"
        },
        title: i(gD.title)
    };
    var yD = jv.prototype;
    yD.render = function (t, e, n, i) {
        this.model = t, this.ecModel = e, this.api = n, $v(t, e, this, i, n), Kv(t, e)
    }, yD.onclick = function (t, e, n) {
        xD[n].call(this)
    }, yD.remove = function () {
        this._brushController.unmount()
    }, yD.dispose = function () {
        this._brushController.dispose()
    };
    var xD = {
        zoom: function () {
            var t = !this._isZoomActive;
            this.api.dispatchAction({type: "takeGlobalCursor", key: "dataZoomSelect", dataZoomSelectActive: t})
        }, back: function () {
            this._dispatchZoomAction(Zv(this.ecModel))
        }
    };
    yD._onBrush = function (t, e) {
        function n(t, e, n) {
            var o = e.getAxis(t), s = o.model, l = i(t, s, a), u = l.findRepresentativeAxisProxy(s).getMinMaxSpan();
            (null != u.minValueSpan || null != u.maxValueSpan) && (n = AC(0, n.slice(), o.scale.getExtent(), 0, u.minValueSpan, u.maxValueSpan)), l && (r[l.id] = {
                dataZoomId: l.id,
                startValue: n[0],
                endValue: n[1]
            })
        }

        function i(t, e, n) {
            var i;
            return n.eachComponent({mainType: "dataZoom", subType: "select"}, function (n) {
                var r = n.getAxisModel(t, e.componentIndex);
                r && (i = n)
            }), i
        }

        if (e.isEnd && t.length) {
            var r = {}, a = this.ecModel;
            this._brushController.updateCovers([]);
            var o = new Rv(qv(this.model.option), a, {include: ["grid"]});
            o.matchOutputRanges(t, a, function (t, e, i) {
                if ("cartesian2d" === i.type) {
                    var r = t.brushType;
                    "rect" === r ? (n("x", i, e[0]), n("y", i, e[1])) : n({lineX: "x", lineY: "y"}[r], i, e)
                }
            }), Wv(a, r), this._dispatchZoomAction(r)
        }
    }, yD._dispatchZoomAction = function (t) {
        var e = [];
        vD(t, function (t) {
            e.push(i(t))
        }), e.length && this.api.dispatchAction({type: "dataZoom", from: this.uid, batch: e})
    }, zg("dataZoom", jv), $l(function (t) {
        function e(t, e) {
            if (e) {
                var r = t + "Index", a = e[r];
                null == a || "all" === a || _(a) || (a = a === !1 || "none" === a ? [] : [a]), n(t, function (e, n) {
                    if (null == a || "all" === a || -1 !== u(a, n)) {
                        var o = {type: "select", $fromToolbox: !0, id: mD + t + n};
                        o[r] = n, i.push(o)
                    }
                })
            }
        }

        function n(e, n) {
            var i = t[e];
            _(i) || (i = i ? [i] : []), vD(i, n)
        }

        if (t) {
            var i = t.dataZoom || (t.dataZoom = []);
            _(i) || (t.dataZoom = i = [i]);
            var r = t.toolbox;
            if (r && (_(r) && (r = r[0]), r && r.feature)) {
                var a = r.feature.dataZoom;
                e("xAxis", a), e("yAxis", a)
            }
        }
    });
    var _D = Tb.toolbox.restore;
    Qv.defaultOption = {
        show: !0,
        icon: "M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5",
        title: _D.title
    };
    var wD = Qv.prototype;
    wD.onclick = function (t, e) {
        Xv(t), e.dispatchAction({type: "restore", from: this.uid})
    }, zg("restore", Qv), tu({type: "restore", event: "restore", update: "prepareAndUpdate"}, function (t, e) {
        e.resetOption("recreate")
    }), t.version = rM, t.dependencies = aM, t.PRIORITY = pM, t.init = Zl, t.connect = Xl, t.disConnect = Yl, t.disconnect = zM, t.dispose = Ul, t.getInstanceByDom = jl, t.getInstanceById = ql, t.registerTheme = Kl, t.registerPreprocessor = $l, t.registerProcessor = Ql, t.registerPostUpdate = Jl, t.registerAction = tu, t.registerCoordinateSystem = eu, t.getCoordinateSystemDimensions = nu, t.registerLayout = iu, t.registerVisual = ru, t.registerLoading = ou, t.extendComponentModel = su, t.extendComponentView = lu, t.extendSeriesModel = uu, t.extendChartView = hu, t.setCanvasCreator = cu, t.registerMap = du, t.getMap = fu, t.dataTool = EM, t.zrender = sx, t.number = fw, t.format = _w, t.throttle = Us, t.helper = RS, t.matrix = zm, t.vector = bm, t.color = Jm, t.parseGeoJSON = NS, t.parseGeoJson = GS, t.util = WS, t.graphic = ZS, t.List = UM, t.Model = Wa, t.Axis = HS, t.env = nm
});