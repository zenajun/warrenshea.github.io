/*! Copyright Squiz - for licence information please see licence.txt */
var HTMLCS_Section508_Sniffs_A = {
        register: function() {
            return ["img", "input", "area", "object", "applet", "bgsound", "audio"]
        },
        process: function(a, b) {
            if (a === b) this.addMediaAlternativesResults(b);
            else {
                var c = a.nodeName.toLowerCase();
                ("object" === c || "bgsound" === c || "audio" === c) && HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing audio only, ensure an alternative is available, such as a full text transcript.", "Audio")
            }
        },
        testNullAltText: function(a) {
            var b = { img: { generalAlt: [], missingAlt: [], ignored: [], nullAltWithTitle: [], emptyAltInLink: [] }, inputImage: { generalAlt: [], missingAlt: [] }, area: { generalAlt: [], missingAlt: [] } };
            elements = a.querySelectorAll('img, area, input[type="image"]');
            for (var c = 0; c < elements.length; c++) {
                var d = elements[c],
                    e = d.nodeName.toLowerCase(),
                    f = !1,
                    g = !1,
                    h = !1;
                if ("a" === d.parentNode.nodeName.toLowerCase()) {
                    var i = this._getPreviousSiblingElement(d, null),
                        j = this._getNextSiblingElement(d, null);
                    if (null === i && null === j) {
                        var k = d.parentNode.textContent;
                        if (void 0 !== d.parentNode.textContent) var k = d.parentNode.textContent;
                        else var k = d.parentNode.innerText;
                        HTMLCS.util.isStringEmpty(k) === !0 && (f = !0)
                    }
                }
                switch (d.hasAttribute("alt") === !1 ? g = !0 : d.getAttribute("alt") && HTMLCS.util.isStringEmpty(d.getAttribute("alt")) !== !0 || (h = !0), e) {
                    case "img":
                        f !== !0 || g !== !0 && h !== !0 ? g === !0 ? b.img.missingAlt.push(d) : h === !0 ? d.hasAttribute("title") === !0 && HTMLCS.util.isStringEmpty(d.getAttribute("title")) === !1 ? b.img.nullAltWithTitle.push(d) : b.img.ignored.push(d) : b.img.generalAlt.push(d) : b.img.emptyAltInLink.push(d.parentNode);
                        break;
                    case "input":
                        g === !0 || h === !0 ? b.inputImage.missingAlt.push(d) : b.inputImage.generalAlt.push(d);
                        break;
                    case "area":
                        g === !0 || h === !0 ? b.area.missingAlt.push(d) : b.inputImage.generalAlt.push(d)
                }
            }
            return b
        },
        testMediaTextAlternatives: function(a) {
            for (var b = { object: { missingBody: [], generalAlt: [] }, applet: { missingBody: [], missingAlt: [], generalAlt: [] } }, c = a.querySelectorAll("object"), d = 0; d < c.length; d++) {
                var e = c[d],
                    f = (e.nodeName.toLowerCase(), e.querySelector("object"));
                if (null === f) {
                    var g = HTMLCS.util.getElementTextContent(e, !0);
                    "" === g ? b.object.missingBody.push(e) : b.object.generalAlt.push(e)
                }
            }
            for (var c = a.querySelectorAll("applet"), d = 0; d < c.length; d++) {
                var f = e.querySelector("object"),
                    h = !1;
                if (null === f) {
                    var g = HTMLCS.util.getElementTextContent(e, !0);
                    HTMLCS.util.isStringEmpty(g) === !0 && (b.applet.missingBody.push(e), h = !0)
                }
                var i = e.getAttribute("alt") || "";
                HTMLCS.util.isStringEmpty(i) === !0 && (b.applet.missingAlt.push(e), h = !0), h === !1 && b.applet.generalAlt.push(e)
            }
            return b
        },
        addMediaAlternativesResults: function(a) {
            for (var b = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1.testMediaTextAlternatives(a), c = 0; c < b.object.missingBody.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.object.missingBody[c], "Object elements must contain a text alternative after all other alternatives are exhausted.", "Object.MissingBody");
            for (var c = 0; c < b.object.generalAlt.length; c++) HTMLCS.addMessage(HTMLCS.NOTICE, b.object.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "Object.GeneralAlt");
            for (var c = 0; c < b.applet.missingBody.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingBody[c], "Applet elements must contain a text alternative in the element's body, for browsers without support for the applet element.", "Applet.MissingBody");
            for (var c = 0; c < b.applet.missingAlt.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.applet.missingAlt[c], "Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.", "Applet.MissingAlt");
            for (var c = 0; c < b.applet.generalAlt.length; c++) HTMLCS.addMessage(HTMLCS.NOTICE, b.applet.generalAlt[c], "Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.", "Applet.GeneralAlt")
        }
    },
    HTMLCS_Section508_Sniffs_B = {
        register: function() {
            return ["object", "applet", "embed", "video"]
        },
        process: function(a, b) {
            a.nodeName.toLowerCase();
            HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing video, ensure a synchronised audio description or text alternative for the video portion is provided.", "Video"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "For multimedia containing synchronised audio and video, ensure synchronised captions are provided for the audio portion.", "Captions")
        }
    },
    HTMLCS_Section508_Sniffs_C = {
        register: function() {
            return ["_top"]
        },
        process: function(a, b) { HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any information conveyed using colour alone is also available without colour, such as through context or markup.", "Colour") }
    },
    HTMLCS_Section508_Sniffs_D = {
        register: function() {
            return ["_top"]
        },
        process: function(a, b) {
            if (a === b) {
                HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that content is ordered in a meaningful sequence when linearised, such as when style sheets are disabled.", "Linearised"), this.testPresentationMarkup(b), this.testHeadingOrder(b);
                var c = b.querySelectorAll('script, link[rel="stylesheet"]');
                c.length > 0 && HTMLCS.addMessage(HTMLCS.NOTICE, b, 'If content is hidden and made visible using scripting (such as "click to expand" sections), ensure this content is readable when scripts and style sheets are disabled.', "HiddenText")
            }
        },
        testPresentationMarkup: function(a) {
            for (var b = a.querySelectorAll("b, i, u, s, strike, tt, big, small, center, font"), c = 0; c < b.length; c++) {
                var d = "PresMarkup." + b[c].nodeName.substr(0, 1).toUpperCase() + b[c].nodeName.substr(1).toLowerCase();
                HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d)
            }
            for (var b = a.querySelectorAll("*[align]"), c = 0; c < b.length; c++) {
                var d = "PresMarkup.AlignAttr";
                HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.", d)
            }
        },
        testHeadingOrder: function(a) {
            for (var b = 0, c = a.querySelectorAll("h1, h2, h3, h4, h5, h6"), d = 0; d < c.length; d++) {
                var e = parseInt(c[d].nodeName.substr(1, 1));
                if (e - b > 1) {
                    var f = "should be an h" + (b + 1) + " to be properly nested";
                    0 === b && (f = "appears to be the primary document heading, so should be an h1 element"), HTMLCS.addMessage(HTMLCS.ERROR, c[d], "The heading structure is not logically nested. This h" + e + " element " + f + ".", "HeadingOrder")
                }
                b = e
            }
        }
    },
    HTMLCS_Section508_Sniffs_G = {
        register: function() {
            return ["table"]
        },
        process: function(a, b) { HTMLCS.util.isLayoutTable(a) === !0 && HTMLCS.addMessage(HTMLCS.NOTICE, a, "This table has no headers. If this is a data table, ensure row and column headers are identified using th elements.", "TableHeaders") }
    },
    HTMLCS_Section508_Sniffs_H = {
        register: function() {
            return ["table"]
        },
        process: function(a, b) {
            for (var c = HTMLCS.util.testTableHeaders(a), d = 0; d < c.wrongHeaders.length; d++) HTMLCS.addMessage(HTMLCS.ERROR, c.wrongHeaders[d].element, 'Incorrect headers attribute on this td element. Expected "' + c.wrongHeaders[d].expected + '" but found "' + c.wrongHeaders[d].actual + '"', "IncorrectHeadersAttr");
            c.required === !0 && c.allowScope === !1 && (c.used === !1 ? HTMLCS.addMessage(HTMLCS.ERROR, a, "The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.", "MissingHeadersAttrs") : (c.missingThId.length > 0 && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements' headers attributes.", "MissingHeaderIds"), c.missingTd.length > 0 && HTMLCS.addMessage(HTMLCS.ERROR, a, "Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.", "IncompleteHeadersAttrs")))
        }
    },
    HTMLCS_Section508_Sniffs_I = {
        register: function() {
            return ["frame", "iframe", "object"]
        },
        process: function(a, b) {
            var c = a.nodeName.toLowerCase(),
                d = a.hasAttribute("title"),
                e = !0;
            d === !0 && (e = HTMLCS.util.isStringEmpty(a.getAttribute("title"))), e === !0 && HTMLCS.addMessage(HTMLCS.ERROR, b, "This " + c + " element is missing title text. Frames should be titled with text that facilitates frame identification and navigation.", "Frames")
        }
    },
    HTMLCS_Section508_Sniffs_J = {
        register: function() {
            return ["_top"]
        },
        process: function(a, b) { HTMLCS.addMessage(HTMLCS.NOTICE, b, "Check that no component of the content flickers at a rate of greater than 2 and less than 55 times per second.", "Flicker") }
    },
    HTMLCS_Section508_Sniffs_K = {
        register: function() {
            return ["_top"]
        },
        process: function(a, b) { HTMLCS.addMessage(HTMLCS.NOTICE, b, "If this page cannot be made compliant, a text-only page with equivalent information or functionality should be provided. The alternative page needs to be updated in line with this page's content.", "AltVersion") }
    },
    HTMLCS_Section508_Sniffs_L = {
        register: function() {
            return ["_top"]
        },
        process: function(a, b) { a === b && (this.addProcessLinksMessages(b), this.testKeyboard(b)) },
        addProcessLinksMessages: function(a) {
            for (var b = this.processLinks(a), c = 0; c < b.emptyNoId.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.emptyNoId[c], "Anchor element found with no link content and no name and/or ID attribute.", "EmptyAnchorNoId");
            for (var c = 0; c < b.placeholder.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b.placeholder[c], "Anchor element found with link content, but no href, ID, or name attribute has been supplied.", "PlaceholderAnchor");
            for (var c = 0; c < b.noContent.length; c++) HTMLCS.addMessage(HTMLCS.ERROR, b.noContent[c], "Anchor element found with a valid href attribute, but no link content has been supplied.", "NoContentAnchor")
        },
        processLinks: function(a) {
            for (var b = { empty: [], emptyWithName: [], emptyNoId: [], noHref: [], placeholder: [], noContent: [] }, c = a.querySelectorAll("a"), d = 0; d < c.length; d++) {
                var e = c[d],
                    f = !1,
                    g = !1,
                    h = HTMLCS.util.getElementTextContent(e);
                e.hasAttribute("title") === !0 && /^\s*$/.test(e.getAttribute("title")) === !1 ? f = !0 : /^\s*$/.test(h) === !1 && (f = !0), e.hasAttribute("href") === !0 && /^\s*$/.test(e.getAttribute("href")) === !1 && (g = !0), g === !1 ? /^\s*$/.test(h) === !0 ? e.hasAttribute("id") === !0 ? b.empty.push(e) : e.hasAttribute("name") === !0 ? b.emptyWithName.push(e) : b.emptyNoId.push(e) : e.hasAttribute("id") === !0 || e.hasAttribute("name") === !0 ? b.noHref.push(e) : b.placeholder.push(e) : /^\s*$/.test(h) === !0 && 0 === e.querySelectorAll("img").length && b.noContent.push(e)
            }
            return b
        },
        testKeyboard: function(a) {
            for (var b = a.querySelectorAll("*[ondblclick]"), c = 0; c < b.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, b[c], "Ensure the functionality provided by double-clicking on this element is available through the keyboard.", "DblClick");
            for (var d = a.querySelectorAll("*[onmouseover]"), c = 0; c < d.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, d[c], "Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.", "MouseOver");
            for (var e = a.querySelectorAll("*[onmouseout]"), c = 0; c < e.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, e[c], "Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.", "MouseOut");
            for (var f = a.querySelectorAll("*[onmousemove]"), c = 0; c < f.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, f[c], "Ensure the functionality provided by moving the mouse on this element is available through the keyboard.", "MouseMove");
            for (var g = a.querySelectorAll("*[onmousedown]"), c = 0; c < g.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, g[c], "Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.", "MouseDown");
            for (var h = a.querySelectorAll("*[onmouseup]"), c = 0; c < h.length; c++) HTMLCS.addMessage(HTMLCS.WARNING, h[c], "Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.", "MouseUp")
        }
    },
    HTMLCS_Section508_Sniffs_M = {
        register: function() {
            return ["object", "applet", "bgsound", "embed", "audio", "video"]
        },
        process: function(a, b) { HTMLCS.addMessage(HTMLCS.NOTICE, a, "If external media requires a plugin or application to view, ensure a link is provided to a plugin or application that complies with Section 508 accessibility requirements for applications.", "PluginLink") }
    },
    HTMLCS_Section508_Sniffs_N = {
        register: function() {
            return ["form"]
        },
        process: function(a, b) {
            var c = a.nodeName.toLowerCase();
            "form" === c && (HTMLCS.addMessage(HTMLCS.NOTICE, a, "If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.", "Errors"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.", "Labels"), HTMLCS.addMessage(HTMLCS.NOTICE, a, "Ensure that this form can be navigated using the keyboard and other accessibility tools.", "KeyboardNav"))
        }
    },
    HTMLCS_Section508_Sniffs_O = {
        register: function() {
            return ["_top", "a", "area"]
        },
        process: function(a, b) {
            if (a === b) HTMLCS.addMessage(HTMLCS.NOTICE, b, "Ensure that any common navigation elements can be bypassed; for instance, by use of skip links, header elements, or ARIA landmark roles.", "SkipLinks");
            else if (a.hasAttribute("href") === !0) {
                var c = a.getAttribute("href");
                if (c = HTMLCS.util.trim(c), c.length > 1 && "#" === c.charAt(0)) {
                    var d = c.substr(1);
                    try {
                        var e = b;
                        e.ownerDocument && (e = e.ownerDocument);
                        var f = e.getElementById(d);
                        null === f && (f = e.querySelector('a[name="' + d + '"]')), (null === f || HTMLCS.util.contains(b, f) === !1) && (HTMLCS.isFullDoc(b) === !0 || "body" === b.nodeName.toLowerCase() ? HTMLCS.addMessage(HTMLCS.ERROR, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name.', "NoSuchID") : HTMLCS.addMessage(HTMLCS.WARNING, a, 'This link points to a named anchor "' + d + '" within the document, but no anchor exists with that name in the fragment tested.', "NoSuchIDFragment"))
                    } catch (g) {}
                }
            }
        }
    },
    HTMLCS_Section508_Sniffs_P = {
        register: function() {
            return ["_top", "meta"]
        },
        process: function(a, b) { a === b ? HTMLCS.addMessage(HTMLCS.NOTICE, b, "If a timed response is required on this page, alert the user and provide sufficient time to allow them to indicate that more time is required.", "TimeLimit") : a.hasAttribute("http-equiv") === !0 && "refresh" === String(a.getAttribute("http-equiv")).toLowerCase() && /^[1-9]\d*/.test(a.getAttribute("content").toLowerCase()) === !0 && (/url=/.test(a.getAttribute("content").toLowerCase()) === !0 ? HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to redirect to another page, with a time limit that is not zero. Users cannot control this time limit.", "MetaRedirect") : HTMLCS.addMessage(HTMLCS.ERROR, a, "Meta refresh tag used to refresh the current page. Users cannot control the time limit for this refresh.", "MetaRefresh")) }
    };
window.HTMLCS_Section508 = {
    name: "Section508",
    description: "U.S. Section 508 Standard",
    sniffs: ["A", "B", "C", "D", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"],
    getMsgInfo: function(a) {
        var b = a.split(".", 3),
            c = b[1].toLowerCase(),
            d = [
                ["Section", "1194.22 (" + c + ")"]
            ];
        return d
    }
}, window.HTMLCS_WCAG2A = {
    name: "WCAG2A",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 A",
    sniffs: [{ standard: "WCAG2AAA", include: [] }],
    getMsgInfo: function(a) {
        return HTMLCS_WCAG2AAA.getMsgInfo(a)
    }
}, window.HTMLCS_WCAG2AA = {
    name: "WCAG2AA",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 AA",
    sniffs: [{ standard: "WCAG2AAA", include: [] }],
    getMsgInfo: function(a) {
        return HTMLCS_WCAG2AAA.getMsgInfo(a)
    }
};
window.HTMLCS_WCAG2AAA = {
    name: "WCAG2AAA",
    description: "Web Content Accessibility Guidelines (WCAG) 2.0 AAA",
    sniffs: [],
    getMsgInfo: function(a) {
        for (var b = { Principle1: { name: "Perceivable", link: "http://www.w3.org/TR/WCAG20/#perceivable" }, Principle2: { name: "Operable", link: "http://www.w3.org/TR/WCAG20/#operable" }, Principle3: { name: "Understandable", link: "http://www.w3.org/TR/WCAG20/#understandable" }, Principle4: { name: "Robust", link: "http://www.w3.org/TR/WCAG20/#robust" } }, c = a.split(".", 5), d = c[1], e = c[4].split(","), f = [], g = 0; g < e.length; g++) e[g] = e[g].split("."), f.push('<a href="http://www.w3.org/TR/WCAG20-TECHS/' + e[g][0] + '" target="_blank">' + e[g][0] + "</a>");
        var h = ['<a href="', b[d].link, '" target="_blank">', b[d].name, "</a>"].join(""),
            i = [
                ["Principle", h],
                ["Techniques", f.join(" ")]
            ];
        return i
    }
};
var HTMLCS = new function() {
        var a = {},
            b = [],
            c = {},
            d = null,
            e = null,
            f = [],
            g = {};
        this.ERROR = 1, this.WARNING = 2, this.NOTICE = 3, this.process = function(e, f, g, h) {
            return a = {}, b = [], c = {}, d = null, f ? void(a[p(e)] ? HTMLCS.run(g, f) : this.loadStandard(e, function() { HTMLCS.run(g, f) }, h)) : !1
        }, this.loadStandard = function(a, b, c) {
            return a ? void j(a, function() { d = a, b.call(this) }, c) : !1
        }, this.run = function(a, b) {
            var c = null,
                d = !1;
            if ("string" == typeof b) {
                d = !0;
                var e = document.createElement("iframe");
                e.style.display = "none", e = document.body.insertBefore(e, null), e.contentDocument ? c = e.contentDocument : c.contentWindow && (c = e.contentWindow.document), e.load = function() {
                    if (this.onreadystatechange = null, this.onload = null, HTMLCS.isFullDoc(b) === !1) {
                        c = c.getElementsByTagName("body")[0];
                        var d = c.getElementsByTagName("div")[0];
                        d && "__HTMLCS-source-wrap" === d.id && (d.id = "", c = d)
                    }
                    var e = t(c);
                    e.unshift(c), h(e, c, a)
                }, e.onreadystatechange = function() { /^(complete|loaded)$/.test(this.readyState) === !0 && (this.onreadystatechange = null, this.load()) }, e.onload = e.load, HTMLCS.isFullDoc(b) === !1 && -1 === b.indexOf("<body") ? c.write('<div id="__HTMLCS-source-wrap">' + b + "</div>") : c.write(b), c.close()
            } else c = b;
            if (!c) return void a.call(this);
            a = a || function() {}, f = [];
            var g = t(c);
            g.unshift(c), d === !1 && h(g, c, a)
        }, this.isFullDoc = function(a) {
            var b = !1;
            return "string" == typeof a ? -1 !== a.toLowerCase().indexOf("<html") ? b = !0 : -1 !== a.toLowerCase().indexOf("<head") && -1 !== a.toLowerCase().indexOf("<body") && (b = !0) : ("html" === a.nodeName.toLowerCase() || a.documentElement) && (b = !0), b
        }, this.addMessage = function(a, b, c, d, e) { d = r(d), f.push({ type: a, element: b, msg: g[d] || c, code: d, data: e }) }, this.getMessages = function() {
            return f.concat([])
        };
        var h = function(a, b, d) {
                for (var e = []; a.length > 0;) {
                    var g = a.shift();
                    if (g === b) var h = "_top";
                    else var h = g.tagName.toLowerCase();
                    for (var j = 0; j < e.length;) g === e[j].element ? (f.push(e[j]), e.splice(j, 1)) : j++;
                    c[h] && c[h].length > 0 && (i(g, c[h].concat([]), b), "_top" === h && (e = f, f = []))
                }
                d instanceof Function == !0 && d.call(this)
            },
            i = function(a, b, c, d) {
                for (; b.length > 0;) {
                    var f = b.shift();
                    e = f, f.useCallback === !0 ? f.process(a, c, function() { i(a, b, c), b = [] }) : f.process(a, c)
                }
                d instanceof Function == !0 && d.call(this)
            },
            j = function(a, b, c, d) {
                0 !== a.indexOf("http") && (a = p(a));
                var e = a.split("/"),
                    f = window["HTMLCS_" + e[e.length - 2]];
                f ? k(a, b, c, d) : s(a, function() { k(a, b, c, d) }, c)
            },
            k = function(b, c, d, e) {
                var f = b.split("/"),
                    g = window["HTMLCS_" + f[f.length - 2]],
                    h = {};
                for (var i in g) g.hasOwnProperty(i) === !0 && (h[i] = g[i]);
                if (!h) return !1;
                if (a[b] = h, e)
                    if (e.include && e.include.length > 0) h.sniffs = e.include;
                    else if (e.exclude)
                    for (var j = 0; j < e.exclude.length; j++) {
                        var k = h.sniffs.find(e.exclude[j]);
                        k >= 0 && h.sniffs.splice(k, 1)
                    }
                var m = h.sniffs.slice(0, h.sniffs.length);
                l(b, m, c, d)
            },
            l = function(a, b, c, d) {
                if (0 === b.length) return void c.call(this);
                var e = b.shift();
                m(a, e, function() { l(a, b, c, d) }, d)
            },
            m = function(a, b, c, d) {
                if ("string" == typeof b) {
                    var e = q(a, b),
                        f = function() { n(a, b), c.call(this) };
                    e ? f() : s(o(a, b), f, d)
                } else j(b.standard, function() {
                    if (b.messages)
                        for (var a in b.messages) g[a] = b.messages[a];
                    c.call(this)
                }, d, { exclude: b.exclude, include: b.include })
            },
            n = function(a, d) {
                var e = q(a, d);
                if (!e) return !1;
                if (e.register) var f = e.register();
                if (f && f.length > 0)
                    for (var g = 0; g < f.length; g++) c[f[g]] || (c[f[g]] = []), c[f[g]].push(e);
                b.push(e)
            },
            o = function(a, b) {
                var c = a.split("/");
                c.pop();
                var d = c.join("/") + "/Sniffs/" + b.replace(/\./g, "/") + ".js";
                return d
            },
            p = function(a) {
                for (var b = document.getElementsByTagName("script"), c = null, d = 0; d < b.length; d++)
                    if (b[d].src && b[d].src.match(/HTMLCS\.js/)) {
                        c = b[d].src.replace(/HTMLCS\.js/, "");
                        break
                    }
                return c + "Standards/" + a + "/ruleset.js"
            },
            q = function(b, c) {
                var d = "HTMLCS_";
                return d += a[b].name + "_Sniffs_", d += c.split(".").join("_"), window[d] ? (window[d]._name = c, window[d]) : null
            },
            r = function(a) {
                return a = d + "." + e._name + "." + a
            },
            s = function(a, b, c) {
                var d = document.createElement("script");
                d.onload = function() { d.onload = null, d.onreadystatechange = null, b.call(this) }, d.onerror = function() { d.onload = null, d.onreadystatechange = null, c && c.call(this) }, d.onreadystatechange = function() { /^(complete|loaded)$/.test(this.readyState) === !0 && (d.onreadystatechange = null, d.onload()) }, d.src = a, document.head ? document.head.appendChild(d) : document.getElementsByTagName("head")[0].appendChild(d)
            },
            t = function(a) {
                a = a || document;
                for (var b = a.getElementsByTagName("*"), c = [], d = 0; d < b.length; d++) c.push(b[d]);
                return c
            };
        this.util = new function() {
            this.trim = function(a) {
                return a.replace(/^\s*(.*)\s*$/g, "$1")
            }, this.isStringEmpty = function(a) {
                if ("string" != typeof a) return !0;
                var b = !0;
                return -1 !== a.indexOf(String.fromCharCode(160)) ? b = !1 : /^\s*$/.test(a) === !1 && (b = !1), b
            }, this.getElementWindow = function(a) {
                if (a.ownerDocument) var b = a.ownerDocument;
                else var b = a;
                var c = null;
                return c = b.defaultView ? b.defaultView : b.parentWindow
            }, this.style = function(a) {
                var b = null,
                    c = this.getElementWindow(a);
                return a.currentStyle ? b = a.currentStyle : c.getComputedStyle && (b = c.getComputedStyle(a, null)), b
            }, this.isHidden = function(a) {
                var b = !1,
                    c = this.style(a);
                return null !== c && (("hidden" === c.visibility || "none" === c.display) && (b = !0), parseInt(c.left, 10) + parseInt(c.width, 10) < 0 && (b = !0), parseInt(c.top, 10) + parseInt(c.height, 10) < 0 && (b = !0)), b
            }, this.isDisabled = function(a) {
                var b = !1;
                return (a.disabled === !0 || "true" === a.getAttribute("aria-disabled")) && (b = !0), b
            }, this.isInDocument = function(a) {
                for (var b = a.parentNode; b && b.ownerDocument;) b = b.parentNode;
                return null === b ? !1 : !0
            }, this.contains = function(a, b) {
                var c = !1;
                return a !== b && (a.ownerDocument ? a.contains && a.contains(b) === !0 ? c = !0 : a.compareDocumentPosition && (16 & a.compareDocumentPosition(b)) > 0 && (c = !0) : b.ownerDocument && b.ownerDocument === a && (c = !0)), c
            }, this.isLayoutTable = function(a) {
                var b = a.querySelector("th");
                return null === b ? !0 : !1
            }, this.contrastRatio = function(a, b) {
                var c = (.05 + this.relativeLum(a)) / (.05 + this.relativeLum(b));
                return 1 > c && (c = 1 / c), c
            }, this.relativeLum = function(a) {
                if (a.charAt) var a = this.colourStrToRGB(a);
                var b = {};
                for (var c in a) a[c] <= .03928 ? b[c] = a[c] / 12.92 : b[c] = Math.pow((a[c] + .055) / 1.055, 2.4);
                var d = .2126 * b.red + .7152 * b.green + .0722 * b.blue;
                return d
            }, this.colourStrToRGB = function(a) {
                if (a = a.toLowerCase(), "rgb" === a.substring(0, 3)) {
                    var b = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(a);
                    a = { red: b[1] / 255, green: b[2] / 255, blue: b[3] / 255 }
                } else "#" === a.charAt(0) && (a = a.substr(1)), 3 === a.length && (a = a.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")), a = { red: parseInt(a.substr(0, 2), 16) / 255, green: parseInt(a.substr(2, 2), 16) / 255, blue: parseInt(a.substr(4, 2), 16) / 255 };
                return a
            }, this.RGBtoColourStr = function(a) {
                return colourStr = "#", a.red = Math.round(255 * a.red), a.green = Math.round(255 * a.green), a.blue = Math.round(255 * a.blue), a.red % 17 === 0 && a.green % 17 === 0 && a.blue % 17 === 0 ? (colourStr += (a.red / 17).toString(16), colourStr += (a.green / 17).toString(16), colourStr += (a.blue / 17).toString(16)) : (a.red < 16 && (colourStr += "0"), colourStr += a.red.toString(16), a.green < 16 && (colourStr += "0"), colourStr += a.green.toString(16), a.blue < 16 && (colourStr += "0"), colourStr += a.blue.toString(16)), colourStr
            }, this.sRGBtoHSV = function(a) {
                a.charAt && (a = this.colourStrToRGB(a));
                var b = { hue: 0, saturation: 0, value: 0 },
                    c = Math.max(a.red, a.green, a.blue),
                    d = Math.min(a.red, a.green, a.blue),
                    e = c - d;
                return 0 === e ? b.value = a.red : (b.value = c, c === a.red ? b.hue = (a.green - a.blue) / e : c === a.green ? b.hue = 2 + (a.blue - a.red) / e : b.hue = 4 + (a.red - a.green) / e, b.hue = 60 * b.hue, b.hue >= 360 && (b.hue -= 360), b.saturation = e / b.value), b
            }, this.HSVtosRGB = function(a) {
                var b = { red: 0, green: 0, blue: 0 };
                if (0 === a.saturation) b.red = a.value, b.green = a.value, b.blue = a.value;
                else {
                    var c = a.value * a.saturation,
                        d = a.value - c,
                        e = a.hue / 60,
                        f = e - 2 * Math.floor(e / 2),
                        g = c * (1 - Math.abs(f - 1));
                    switch (Math.floor(e)) {
                        case 0:
                            b.red = c, b.green = g;
                            break;
                        case 1:
                            b.green = c, b.red = g;
                            break;
                        case 2:
                            b.green = c, b.blue = g;
                            break;
                        case 3:
                            b.blue = c, b.green = g;
                            break;
                        case 4:
                            b.blue = c, b.red = g;
                            break;
                        case 5:
                            b.red = c, b.blue = g
                    }
                    b.red = b.red + d, b.green = b.green + d, b.blue = b.blue + d
                }
                return b
            }, this.getElementTextContent = function(a, b) {
                void 0 === b && (b = !0);
                for (var a = a.cloneNode(!0), c = [], d = 0; d < a.childNodes.length; d++) c.push(a.childNodes[d]);
                for (var e = []; c.length > 0;) {
                    var f = c.shift();
                    if (1 === f.nodeType)
                        if ("img" === f.nodeName.toLowerCase()) b === !0 && f.hasAttribute("alt") === !0 && e.push(f.getAttribute("alt"));
                        else
                            for (var d = 0; d < f.childNodes.length; d++) c.push(f.childNodes[d]);
                    else 3 === f.nodeType && e.push(f.nodeValue)
                }
                return e = e.join("").replace(/^\s+|\s+$/g, "")
            }, this.testTableHeaders = function(a) {
                for (var b = { required: !0, used: !1, correct: !0, allowScope: !0, missingThId: [], missingTd: [], wrongHeaders: [] }, c = a.getElementsByTagName("tr"), d = [], e = { rows: [], cols: [] }, f = { rows: 0, cols: 0 }, g = 0; g < c.length; g++)
                    for (var h = c[g], i = 0, j = 0; j < h.childNodes.length; j++) {
                        var k = h.childNodes[j];
                        if (1 === k.nodeType) {
                            if (d[g])
                                for (; d[g][0] === i;) d[g].shift(), i++;
                            var l = k.nodeName.toLowerCase(),
                                m = Number(k.getAttribute("rowspan")) || 1,
                                n = Number(k.getAttribute("colspan")) || 1;
                            if (m > 1)
                                for (var o = g + 1; g + m > o; o++) {
                                    d[o] || (d[o] = []);
                                    for (var p = i; i + n > p; p++) d[o].push(p)
                                }
                            if ("th" === l) {
                                var q = k.getAttribute("id") || "";
                                "" === q && (b.correct = !1, b.missingThId.push(k)), m > 1 && n > 1 ? b.allowScope = !1 : b.allowScope === !0 && (void 0 === e.cols[i] && (e.cols[i] = 0), void 0 === e.rows[g] && (e.rows[g] = 0), e.rows[g] += n, e.cols[i] += m)
                            } else "td" === l && k.hasAttribute("headers") === !0 && /^\s*$/.test(k.getAttribute("headers")) === !1 && (b.used = !0);
                            i += n
                        }
                    }
                for (var o = 0; o < e.rows.length; o++) e.rows[o] > 1 && f.rows++;
                for (var o = 0; o < e.cols.length; o++) e.cols[o] > 1 && f.cols++;
                f.rows > 1 || f.cols > 1 ? b.allowScope = !1 : b.allowScope !== !0 || 0 !== f.rows && 0 !== f.cols || (b.required = !1);
                for (var r = HTMLCS.util.getCellHeaders(a), o = 0; o < r.length; o++) {
                    var k = r[o].cell,
                        s = r[o].headers;
                    if (k.hasAttribute("headers") === !1) b.correct = !1, b.missingTd.push(k);
                    else {
                        var t = (k.getAttribute("headers") || "").split(/\s+/);
                        if (0 === t.length) b.correct = !1, b.missingTd.push(k);
                        else if (t = " " + t.sort().join(" ") + " ", t = t.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1"), s !== t) {
                            b.correct = !1;
                            var u = { element: k, expected: s, actual: k.getAttribute("headers") || "" };
                            b.wrongHeaders.push(u)
                        }
                    }
                }
                return b
            }, this.getCellHeaders = function(a) {
                if ("object" != typeof a) return null;
                if ("table" !== a.nodeName.toLowerCase()) return null;
                for (var b = a.getElementsByTagName("tr"), c = [], d = { rows: {}, cols: {} }, e = [], f = ["th", "td"], g = 0; g < f.length; g++)
                    for (var h = f[g], i = 0; i < b.length; i++)
                        for (var j = b[i], k = 0, l = 0; l < j.childNodes.length; l++) {
                            var m = j.childNodes[l];
                            if (1 === m.nodeType) {
                                if (c[i])
                                    for (; c[i][0] === k;) c[i].shift(), k++;
                                var n = m.nodeName.toLowerCase(),
                                    o = Number(m.getAttribute("rowspan")) || 1,
                                    p = Number(m.getAttribute("colspan")) || 1;
                                if (o > 1)
                                    for (var q = i + 1; i + o > q; q++) {
                                        c[q] || (c[q] = []);
                                        for (var r = k; k + p > r; r++) c[q].push(r)
                                    }
                                if (n === h)
                                    if ("th" === n) {
                                        for (var s = m.getAttribute("id") || "", q = i; i + o > q; q++) d.rows[q] = d.rows[q] || { first: k, ids: [] }, d.rows[q].ids.push(s);
                                        for (var q = k; k + p > q; q++) d.cols[q] = d.cols[q] || { first: i, ids: [] }, d.cols[q].ids.push(s)
                                    } else if ("td" === n) {
                                    for (var t = [], q = i; i + o > q; q++)
                                        for (var r = k; k + p > r; r++) d.rows[q] && r >= d.rows[q].first && (t = t.concat(d.rows[q].ids)), d.cols[r] && q >= d.cols[r].first && (t = t.concat(d.cols[r].ids));
                                    t.length > 0 && (t = " " + t.sort().join(" ") + " ", t = t.replace(/\s+/g, " ").replace(/(\w+\s)\1+/g, "$1").replace(/^\s*(.*?)\s*$/g, "$1"), e.push({ cell: m, headers: t }))
                                }
                                k += p
                            }
                        }
                return e
            }
        }
    },
    HTMLCSAuditor = new function() {
        var a = "HTMLCS-",
            b = "",
            c = "",
            d = [],
            e = {},
            f = null,
            g = null,
            h = [],
            j = 1,
            k = null,
            l = this;
        this.pointerContainer = null;
        var m = function(b, c, d, e) {
                var g = f.createElement("div");
                g.id = b, g.className = a + "button", g.setAttribute("title", d);
                var h = f.createElement("span");
                h.className = a + "button-icon " + a + "button-" + c, g.appendChild(h);
                var i = f.createTextNode(String.fromCharCode(160));
                return g.appendChild(i), e instanceof Function == !0 && (g.onclick = function() { /disabled/.test(g.className) === !1 && e(g) }), g
            },
            n = function(b, c, d, e, g) {
                void 0 === d && (d = !1);
                var h = f.createElement("label"),
                    i = "";
                h.className = a + "checkbox", i += '<span class="' + a + 'checkbox-switch">', i += '<span class="' + a + 'checkbox-slider"></span>', i += '<input id="' + b + '" type="checkbox"', d === !0 && (i += ' checked="checked"', h.className += " active"), e === !0 && (i += ' disabled="disabled"', h.className += " disabled"), i += ' title="' + c + '" /></span>', h.innerHTML = i;
                var j = h.getElementsByTagName("input")[0];
                return h.onclick = function(a) {
                    return e === !1 && (j.checked = !j.checked, j.checked === !0 ? h.className += " active" : h.className = h.className.replace("active", ""), g instanceof Function == !0 && g(j)), !1
                }, h
            },
            o = function(b, c) {
                var d = f.createElement("div");
                d.className = a + "header", d.innerHTML = "HTML_CodeSniffer by Squiz", d.setAttribute("title", "Using standard " + b);
                var e = !1,
                    g = 0,
                    h = 0;
                d.onmousedown = function(a) {
                    return a = a || window.event, e = !0, g = a.clientX, h = a.clientY, !1
                }, f.onmousemove = function(a) {
                    if (a = a || window.event, e === !0) {
                        var b = c.offsetTop,
                            d = c.offsetLeft;
                        h < a.clientY ? (b += a.clientY - h, c.style.top = b + "px") : h > a.clientY && (b -= h - a.clientY, c.style.top = b + "px"), g < a.clientX ? (d += a.clientX - g, c.style.left = d + "px") : g > a.clientX && (d -= g - a.clientX, c.style.left = d + "px"), g = a.clientX, h = a.clientY
                    }
                }, f.onmouseup = function(a) {
                    e = !1
                };
                var i = f.createElement("div");
                return i.className = a + "close", i.setAttribute("title", "Close"), i.onmousedown = function() { l.close.call(l) }, d.appendChild(i), d
            },
            p = function(b, g, h) {
                var i = f.createElement("div");
                i.className = a + "summary";
                var j = f.createElement("div");
                j.className = a + "summary-left", i.appendChild(j);
                var k = f.createElement("div");
                k.className = a + "summary-right", i.appendChild(k);
                var m = [],
                    n = ', &#160;<span class="' + a + 'divider"></span>';
                if (b > 0) {
                    var o = "Errors";
                    1 === b && (o = "Error"), m.push("<strong>" + b + "</strong> " + o)
                }
                if (g > 0) {
                    var o = "Warnings";
                    1 === g && (o = "Warning"), m.push("<strong>" + g + "</strong> " + o)
                }
                if (h > 0) {
                    var o = "Notices";
                    1 === h && (o = "Notice"), m.push("<strong>" + h + "</strong> " + o)
                }
                var p = f.createElement("ol");
                p.className = a + "lineage";
                var q = f.createElement("li");
                q.className = a + "lineage-item";
                var r = f.createElement("a");
                r.className = a + "lineage-link", r.href = "javascript:";
                var s = f.createElement("span");
                s.innerHTML = "Home", r.appendChild(s), r.onmousedown = function() { l.run(c, d, e) };
                var t = f.createElement("li");
                return t.className = a + "lineage-item", t.innerHTML = m.join(n), q.appendChild(r), p.appendChild(q), p.appendChild(t), j.appendChild(p), k.appendChild(f.createTextNode(String.fromCharCode(160))), i
            },
            q = function(b, g) {
                var i = f.createElement("div");
                i.className = a + "summary-detail";
                var j = f.createElement("div");
                j.className = a + "summary-left";
                var k = f.createElement("div");
                k.className = a + "summary-right";
                var n = f.createElement("ol");
                n.className = a + "lineage";
                var o = f.createElement("li");
                o.className = a + "lineage-item";
                var p = f.createElement("a");
                p.className = a + "lineage-link", p.href = "javascript:";
                var r = f.createElement("span");
                r.innerHTML = "Home", p.appendChild(r), p.onmousedown = function() { l.run(c, d, e) };
                var s = f.createElement("li");
                s.className = a + "lineage-item";
                var t = f.createElement("a");
                t.className = a + "lineage-link", t.href = "javascript:", t.innerHTML = "Report", t.setAttribute("title", "Back to Report"), t.onmousedown = function() {
                    var a = f.querySelectorAll(".HTMLCS-inner-wrapper")[0];
                    a.style.marginLeft = "0px", a.style.maxHeight = null, i.style.display = "none";
                    var b = f.querySelectorAll(".HTMLCS-summary")[0];
                    b.style.display = "block"
                };
                var u = f.createElement("li");
                u.className = a + "lineage-item", u.innerHTML = "Issue " + b + " of " + g, o.appendChild(p), s.appendChild(t), n.appendChild(o), n.appendChild(s), n.appendChild(u), j.appendChild(n);
                var w = f.createElement("div");
                w.className = a + "button-group";
                var x = m(a + "button-previous-issue", "previous", "Previous Issue", function(a) {
                        var c = Number(b) - 1;
                        if (c >= 1) {
                            v(c - 1), wrapper = i.parentNode;
                            var d = q(c, g);
                            wrapper.replaceChild(d, i), d.style.display = "block";
                            var e = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                            e.firstChild.style.marginLeft = parseInt(e.firstChild.style.marginLeft, 10) + 300 + "px", y(c - 1)
                        }
                    }),
                    z = m(a + "button-next-issue", "next", "Next Issue", function(a) {
                        var c = Number(b) + 1;
                        if (c <= h.length) {
                            v(c - 1), wrapper = i.parentNode;
                            var d = q(c, g);
                            wrapper.replaceChild(d, i), d.style.display = "block";
                            var e = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                            e.firstChild.style.marginLeft = parseInt(e.firstChild.style.marginLeft, 10) - 300 + "px", y(c - 1)
                        }
                    });
                return 1 === b && (x.className += " disabled"), b === g && (z.className += " disabled"), w.appendChild(x), w.appendChild(z), k.appendChild(w), i.appendChild(j), i.appendChild(k), i
            },
            r = function(b) {
                var c = 300 * Math.ceil(b.length / 5),
                    d = f.createElement("div");
                d.id = a + "issues", d.className = a + "details", d.setAttribute("style", "width: " + c + "px");
                var e = f.createElement("ol");
                e.className = a + "issue-list", e.setAttribute("style", "margin-left: 0");
                for (var g = 0; g < b.length; g++) {
                    if (g > 0 && g % 5 === 0) {
                        d.appendChild(e);
                        var e = f.createElement("ol");
                        e.className = a + "issue-list"
                    }
                    var h = u(g, b[g]);
                    e.appendChild(h)
                }
                return d.appendChild(e), d
            },
            s = function(b) {
                var c = 300 * b.length,
                    d = f.createElement("div");
                d.id = a + "issues-detail", d.className = a + "details", d.setAttribute("style", "width: " + c + "px");
                var e = f.createElement("ol");
                e.className = a + "issue-detail-list", e.setAttribute("style", "margin-left: 0");
                for (var g = 0; g < b.length; g++) {
                    var h = w(g, b[g]);
                    e.appendChild(h)
                }
                return d.appendChild(e), d
            },
            t = function() {
                var b = f.createElement("div");
                b.className = a + "settings";
                var g = f.createElement("div");
                g.id = a + "settings-use-standard";
                var i = f.createElement("label");
                i.innerHTML = "Standards:", i.setAttribute("for", a + "settings-use-standard-select");
                var j = f.createElement("select");
                j.id = a + "settings-use-standard-select", j.innerHTML = "";
                for (var k = HTMLCSAuditor.getStandardList(), m = 0; m < k.length; m++) {
                    var o = k[m],
                        p = f.createElement("option");
                    p.value = o, p.innerHTML = window["HTMLCS_" + o].name, o === c && (p.selected = !0), j.appendChild(p), j.onchange = function() { c = this.options[this.selectedIndex].value, l.run(c, d, e) }
                }
                var q = f.createElement("div");
                q.id = a + "settings-issue-count";
                var r = f.createElement("div");
                r.id = a + "settings-issue-count-help", r.innerHTML = "Select the types of issues to include in the report";
                var s = f.createElement("div");
                s.id = a + "settings-view-report", s.innerHTML = "View Report", s.onclick = function() {
                    if (/disabled/.test(this.className) === !1) {
                        e.show = { error: f.getElementById(a + "include-error").checked, warning: f.getElementById(a + "include-warning").checked, notice: f.getElementById(a + "include-notice").checked };
                        var b = f.getElementById(a + "wrapper"),
                            d = l.build(c, h, e);
                        e.parentElement ? e.parentElement.replaceChild(d, b) : (d.style.left = b.style.left, d.style.top = b.style.top, f.body.replaceChild(d, b)), e.listUpdateCallback && e.listUpdateCallback.call(this, h)
                    }
                };
                var t = (f.getElementById(a + "wrapper"), l.countIssues(h));
                void 0 === e.show && h.length > 0 && (e.show = { error: !0, warning: !0, notice: !1 }, 0 === t.error && 0 === t.warning && (e.show.notice = !0));
                for (var u in t) {
                    var v = t[u],
                        w = f.createElement("div");
                    w.className = a + "issue-tile " + a + u.toLowerCase();
                    var x = f.createElement("div");
                    x.className = "HTMLCS-tile-text";
                    var y = "<strong>" + v + "</strong> " + u.substr(0, 1).toUpperCase() + u.substr(1);
                    if (1 !== v && (y += "s"), x.innerHTML = y, void 0 === e.show) var z = !1,
                        A = !0;
                    else {
                        var z = e.show[u],
                            A = !1;
                        0 === v && (z = !1, A = !0)
                    }
                    var B = n(a + "include-" + u, "Toggle display of " + u + " messages", z, A, function(b) {
                        var c = !1;
                        f.getElementById(a + "include-error").disabled === !1 && (e.show.error = f.getElementById(a + "include-error").checked, c = c || e.show.error), f.getElementById(a + "include-warning").disabled === !1 && (e.show.warning = f.getElementById(a + "include-warning").checked, c = c || e.show.warning), f.getElementById(a + "include-notice").disabled === !1 && (e.show.notice = f.getElementById(a + "include-notice").checked, c = c || e.show.notice), c === !0 ? s.className = s.className.replace(/ disabled/g, "") : s.className += " disabled"
                    });
                    w.appendChild(x), w.appendChild(B), q.appendChild(w)
                }
                if (void 0 !== e.show) {
                    var C = e.show.error || e.show.warning || e.show.notice;
                    C === !1 && (s.className += " disabled")
                } else s.className += " disabled";
                return g.appendChild(i), g.appendChild(j), b.appendChild(g), b.appendChild(q), b.appendChild(r), b.appendChild(s), b
            },
            u = function(b, c) {
                var d = "",
                    e = "",
                    g = "";
                switch (c.type) {
                    case HTMLCS.ERROR:
                        e = "Error";
                        break;
                    case HTMLCS.WARNING:
                        e = "Warning";
                        break;
                    case HTMLCS.NOTICE:
                        e = "Notice"
                }
                var g = e.toLowerCase(),
                    i = c.msg;
                i.length > 115 && (i = i.substr(0, 115) + "...");
                var d = f.createElement("li");
                d.id = a + "msg-" + b;
                var j = f.createElement("span");
                j.className = a + "issue-type " + a + g, j.setAttribute("title", e), d.appendChild(j);
                var k = f.createElement("span");
                return k.className = a + "issue-title", k.innerHTML = i, d.appendChild(k), d.onclick = function() {
                    var b = this.id.replace(new RegExp(a + "msg-"), "");
                    v(b);
                    var c = f.querySelectorAll(".HTMLCS-issue-detail-list")[0];
                    c.className += " " + a + "transition-disabled", c.firstChild.style.marginLeft = -300 * b + "px", y(b), setTimeout(function() { c.className = c.className.replace(new RegExp(" " + a + "transition-disabled"), "") }, 500);
                    var d = f.querySelectorAll(".HTMLCS-inner-wrapper")[0];
                    d.style.marginLeft = "-300px", d.style.maxHeight = "15em", summary = f.querySelectorAll(".HTMLCS-summary-detail")[0];
                    var e = q(parseInt(b) + 1, h.length);
                    summary.parentNode.replaceChild(e, summary), e.style.display = "block";
                    var g = f.querySelectorAll(".HTMLCS-summary")[0];
                    g.style.display = "none"
                }, d
            },
            v = function(b) {
                for (var c = f.querySelectorAll(".HTMLCS-issue-detail-list")[0], d = c.getElementsByTagName("li"), g = 0; g < d.length; g++) d[g].className = d[g].className.replace(new RegExp(" " + a + "current"), "");
                var h = f.getElementById("HTMLCS-msg-detail-" + b);
                h.className += " " + a + "current", e.showIssueCallback && e.showIssueCallback.call(this, b)
            },
            w = function(b, d, h) {
                void 0 === h && (h = c);
                var i = "";
                switch (d.type) {
                    case HTMLCS.ERROR:
                        i = "Error";
                        break;
                    case HTMLCS.WARNING:
                        i = "Warning";
                        break;
                    case HTMLCS.NOTICE:
                        i = "Notice"
                }
                var j = a + i.toLowerCase(),
                    k = HTMLCS.util.getElementWindow(f)["HTMLCS_" + h],
                    k = g["HTMLCS_" + h],
                    n = [];
                k.getMsgInfo && (n = k.getMsgInfo(d.code));
                var o = f.createElement("li");
                o.id = a + "msg-detail-" + b;
                var p = f.createElement("div");
                p.className = a + "issue-details";
                var q = f.createElement("span");
                q.className = a + "issue-type " + j, q.setAttribute("title", i);
                var r = f.createElement("div");
                r.className = a + "issue-title", r.innerHTML = d.msg;
                var s = f.createElement("div");
                s.className = a + "issue-wcag-ref";
                for (var t = "", u = 0; u < n.length; u++) t += "<em>" + n[u][0] + ":</em> " + n[u][1] + "<br/>";
                if (s.innerHTML = t, p.appendChild(q), p.appendChild(r), p.appendChild(s), o.appendChild(p), A.isPointable(d.element) === !1) {
                    var v = f.createElement("div");
                    v.className = a + "issue-source", o.appendChild(v);
                    var w = f.createElement("div");
                    w.className = a + "issue-source-inner-u2p";
                    var x = "Unable to point to the element associated with this issue.";
                    if (null === d.element.ownerDocument) x = "Unable to point to this issue, as it relates to the entire document.";
                    else {
                        var y = d.element.ownerDocument.getElementsByTagName("body")[0];
                        HTMLCS.util.isInDocument(d.element) === !1 ? x += "Unable to point to this element as it has been removed from the document since the report was generated." : HTMLCS.util.contains(y, d.element) === !1 ? x = "Unable to point to this element because it is located outside the document's body element." : x += "Unable to point to this element because it is hidden from view, or does not have a visual representation."
                    }
                    void 0 !== w.textContent ? w.textContent = x : w.innerText = x, v.appendChild(w)
                }
                if (e.customIssueSource) {
                    var v = f.createElement("div");
                    v.className = a + "issue-source", o.appendChild(v), e.customIssueSource.call(this, b, d, h, v, p)
                } else {
                    var v = f.createElement("div");
                    v.className = a + "issue-source";
                    var z = f.createElement("div");
                    z.className = a + "issue-source-header";
                    var B = f.createElement("strong");
                    B.innerHTML = "Code Snippet";
                    var C = m(a + "button-point-to-element-" + b, "pointer", "Point to Element", function() { l.pointToElement(d.element) });
                    if (z.appendChild(B), z.appendChild(C), v.appendChild(z), d.element.outerHTML) {
                        var D = "",
                            E = "";
                        if (d.element.innerHTML.length > 31) var F = d.element.outerHTML.replace(d.element.innerHTML, d.element.innerHTML.substr(0, 31) + "...");
                        else var F = d.element.outerHTML;
                        for (var G = d.element.previousSibling; D.length <= 31 && null !== G;) 1 === G.nodeType ? D = G.outerHTML : 3 === G.nodeType && (D = void 0 !== G.textContent ? G.textContent + D : G.nodeValue + D), D.length > 31 && (D = "..." + D.substr(D.length - 31)), G = G.previousSibling;
                        for (var H = d.element.nextSibling; E.length <= 31 && null !== H;) 1 === H.nodeType ? E += H.outerHTML : 3 === H.nodeType && (E += void 0 !== H.textContent ? H.textContent : H.nodeValue), E.length > 31 && (E = E.substr(0, 31) + "..."), H = H.nextSibling;
                        var w = f.createElement("div");
                        w.className = a + "issue-source-inner";
                        var I = f.createElement("strong");
                        void 0 !== I.textContent ? I.textContent = F : I.innerText = F, w.appendChild(f.createTextNode(D)), w.appendChild(I), w.appendChild(f.createTextNode(E)), v.appendChild(w)
                    } else {
                        var w = f.createElement("div");
                        w.className = a + "issue-source-not-supported";
                        var J = "The code snippet functionality is not supported in this browser.";
                        w.appendChild(f.createTextNode(J)), v.appendChild(w)
                    }
                    o.appendChild(v)
                }
                return o
            },
            x = function(b, c) {
                var d = f.createElement("div");
                d.className = a + "navigation";
                var e = f.createElement("span");
                e.className = a + "nav-button " + a + "previous", e.innerHTML = String.fromCharCode(160), 1 === b && (e.className += " " + a + "disabled"), d.appendChild(e);
                var g = f.createElement("span");
                g.className = a + "page-number", g.innerHTML = "Page " + b + " of " + c, d.appendChild(g);
                var h = f.createElement("span");
                return h.className = a + "nav-button " + a + "next", h.innerHTML = String.fromCharCode(160), b === c && (h.className += " " + a + "disabled"), d.appendChild(h), e.onclick = function() {
                    j > 1 && (j--, 1 === j && (e.className += " " + a + "disabled")), c > 1 && (h.className = h.className.replace(new RegExp(" " + a + "disabled"), "")), g.innerHTML = "", g.appendChild(document.createTextNode("Page " + j + " of " + c));
                    var b = f.querySelectorAll(".HTMLCS-issue-list")[0];
                    b.style.marginLeft = -300 * (j - 1) + "px"
                }, h.onclick = function() {
                    c > j && (j++, j === c && (h.className += " " + a + "disabled")), c > 1 && (e.className = e.className.replace(new RegExp(" " + a + "disabled"), "")), g.innerHTML = "", g.appendChild(document.createTextNode("Page " + j + " of " + c));
                    var b = f.querySelectorAll(".HTMLCS-issue-list")[0];
                    b.style.marginLeft = -300 * (j - 1) + "px"
                }, d
            },
            y = function(b) {
                var c = h[Number(b)];
                if (c.element) {
                    var d = f.getElementById(a + "button-point-to-element-" + b);
                    if (A.container = l.pointerContainer || f.getElementById("HTMLCS-wrapper"), A.isPointable(c.element) === !1) {
                        var e = A.getPointer(c.element);
                        A.pointer && (e.className += " HTMLCS-pointer-hidden"), d && (d.className += " disabled")
                    } else d && (d.className = d.className.replace(" disabled", "")), A.pointTo(c.element)
                }
            },
            z = function(a, b) {
                if (0 === a.length) return void b.call(this);
                var c = a.shift();
                HTMLCS.loadStandard(c, function() { z(a, b) })
            };
        this.setOption = function(a, b) { e[a] = b }, this.getIssue = function(a) {
            return h[a]
        }, this.countIssues = function(a) {
            for (var b = { error: 0, warning: 0, notice: 0 }, c = 0; c < a.length; c++) switch (a[c].type) {
                case HTMLCS.ERROR:
                    b.error++;
                    break;
                case HTMLCS.WARNING:
                    b.warning++;
                    break;
                case HTMLCS.NOTICE:
                    b.notice++
            }
            return b
        }, this.build = function(b, c, d) {
            var g = null;
            if (f) var g = f.getElementById(a + "wrapper");
            for (var i = 0, j = 0, k = 0, l = 0; l < c.length; l++) {
                var m = !1;
                switch (c[l].type) {
                    case HTMLCS.ERROR:
                        e.show.error === !1 ? m = !0 : i++;
                        break;
                    case HTMLCS.WARNING:
                        e.show.warning === !1 ? m = !0 : j++;
                        break;
                    case HTMLCS.NOTICE:
                        e.show.notice === !1 ? m = !0 : k++
                }
                m === !0 && (c.splice(l, 1), l--)
            }
            h = c;
            for (var n = "", t = "", l = 0; l < c.length; l++) l % 5 === 0 && (n += '<ol class="HTMLCS-issue-list"', 0 === l && (n += 'style="margin-left: 0em"'), n += ">"), n += u(l, c[l]), (l % 5 === 4 || l === c.length - 1) && (n += "</ol>"), t += w(l, c[l], b);
            var g = f.createElement("div");
            if (g.id = a + "wrapper", g.className = "showing-issue-list", e.noHeader !== !0) {
                var v = o(b, g);
                g.appendChild(v)
            }
            var y = p(i, j, k),
                z = q(1, c.length),
                A = f.createElement("div");
            A.id = a + "issues-wrapper", A.className = a + "inner-wrapper";
            var B = r(c);
            A.appendChild(B);
            var C = Math.ceil(c.length / 5),
                D = x(1, C);
            A.appendChild(D);
            var E = f.createElement("div");
            E.className = a + "outer-wrapper", E.appendChild(A);
            var A = f.createElement("div");
            A.id = a + "issues-detail-wrapper", A.className = a + "inner-wrapper";
            var F = s(c);
            return A.appendChild(F), E.appendChild(A), g.appendChild(y), g.appendChild(z), g.appendChild(E), g
        }, this.buildSummaryPage = function() {
            var b = f.createElement("div");
            if (b.id = a + "wrapper", b.className = "showing-settings", e.noHeader !== !0) {
                var d = o(c, b);
                b.appendChild(d)
            }
            var g = t();
            return b.appendChild(g), b
        }, this.changeScreen = function(c) {
            var d = f.getElementById(a + "wrapper");
            d.className = d.className.replace(new RegExp("showing-" + b), ""), d.className += " showing-" + c, d.className = d.className.replace(/\s+/, " "), b = c
        }, this.includeCss = function(a, b) {
            if (e.includeCss !== !1) {
                void 0 === b && (b = f);
                for (var c = b.querySelector("head"), d = c.getElementsByTagName("link"), g = !1, h = 0; h < d.length; h++)
                    if (new RegExp(a + ".css").test(d[h].getAttribute("href")) === !0) {
                        g = !0;
                        break
                    }
                if (g === !1) {
                    var i = b.createElement("link");
                    i.rel = "stylesheet", i.type = "text/css", i.href = e.path + a + ".css", c.appendChild(i)
                }
            }
        }, this.getStandardList = function() {
            var a = /^HTMLCS_[^_]+$/,
                b = [];
            for (i in window)
                if (a.test(i) === !0) {
                    var c = window[i];
                    c.sniffs && c.name && b.push(i.substr(7))
                }
            return b
        }, this.getParentElement = function() {
            var a = null;
            if (e.parentElement) a = e.parentElement;
            else if (g.frames.length > 0) {
                for (var b = -1, c = null, d = 0; d < g.frames.length; d++) try {
                    if ("frame" === window.frames[d].frameElement.nodeName.toLowerCase() && window.frames[d].document) {
                        var f = window.frames[d].innerWidth * window.frames[d].innerHeight;
                        f > b && (b = f, c = window.frames[d].document.body)
                    }
                } catch (h) {}
                a = null === c ? document.body : c
            } else a = document.body;
            return a
        }, this.getOwnerDocument = function() {
            var a = this.getParentElement();
            return a.ownerDocument && (a = a.ownerDocument), a
        }, this.run = function(i, k, m) {
            g = window;
            for (var n = this.getStandardList(), o = [], p = 0; p < n.length; p++) window["HTMLCS_" + n[p]] || o.push(n[p]);
            if (o.length > 0) return void z(o, function() { l.run(i, k, m) });
            if (null === k || void 0 === k) {
                if (k = [], 0 === document.querySelectorAll("frameset").length && k.push(document), g.frames.length > 0)
                    for (var p = 0; p < g.frames.length; p++) try { k.push(g.frames[p].document) } catch (q) {}
            } else if (k.nodeName)
                if ("input" === k.nodeName.toLowerCase())
                    if (k.hasAttribute("type") === !1) k = k.value;
                    else {
                        var r = k.getAttribute("type").toLowerCase();
                        "text" === r && (k = k.value)
                    }
            else "textarea" === k.nodeName.toLowerCase() && (k = k.value);
            k instanceof Array == !1 && (k = [k]), void 0 === m && (m = {}), c = i, d = k, e = m, j = 1, b = "", h = [];
            var s = this.getParentElement();
            f = this.getOwnerDocument(), e.path || (e.path = "./"), void 0 === e.includeCss && (e.includeCss = !0), void 0 === e.ignoreMsgCodes && (e.ignoreMsgCodes = []), this.includeCss("HTMLCS");
            var t = f.getElementById(a + "wrapper"),
                u = !1,
                v = l.buildSummaryPage();
            v.className += " HTMLCS-processing", t ? (v.style.left = t.style.left, v.style.top = t.style.top, s.replaceChild(v, t)) : (e.openCallback && e.openCallback.call(this), u = !0, s.appendChild(v));
            var w = function() {
                    for (var b = 0; b < h.length; b++) {
                        var c = !1;
                        v && (v === h[b].element ? c = !0 : h[b].element.documentElement ? c = !1 : v.contains && v.contains(h[b].element) === !0 ? c = !0 : v.compareDocumentPosition && (16 & v.compareDocumentPosition(h[b].element)) > 0 && (c = !0));
                        for (var d = 0; d < m.ignoreMsgCodes.length; d++)
                            if (new RegExp(m.ignoreMsgCodes[d]).test(h[b].code) === !0) {
                                c = !0;
                                break
                            }
                        c === !0 && (h.splice(b, 1), b--)
                    }
                    if (e.runCallback) {
                        var g = e.runCallback.call(this, h, u);
                        g instanceof Array == !0 && (h = g)
                    }
                    setTimeout(function() {
                        var b = f.getElementById(a + "wrapper"),
                            c = l.buildSummaryPage();
                        c.style.left = b.style.left, c.style.top = b.style.top, s.replaceChild(c, b)
                    }, 400)
                },
                x = function(a, b) {
                    for (var c = b.shift(); !c;) {
                        if (0 === b.length) return void w();
                        c = b.shift()
                    }
                    HTMLCS.process(a, c, function() { h = h.concat(HTMLCS.getMessages()), 0 === b.length ? w() : x(a, b) })
                };
            x(i, d.concat([]))
        }, this.versionCheck = function(b) {
            if (b && null !== b.currentVersion && b.newVersion > b.currentVersion) {
                var c = f.createElement("div");
                c.id = a + "settings-updated-notification", f.documentElement.querySelector(".HTMLCS-settings").appendChild(c);
                var d = "HTML_CodeSniffer has been updated to version " + b.newVersion + ".";
                d += ' <a href="http://squizlabs.github.io/HTML_CodeSniffer/patches/' + b.newVersion + '">View the changelog</a>', c.innerHTML = d
            }
        }, this.close = function() {
            if (f) {
                var a = f.getElementById("HTMLCS-wrapper");
                if (a) {
                    var b = A.getPointer(a);
                    b && b.parentNode && b.parentNode.removeChild(b), a.parentNode.removeChild(a), e.closeCallback && (h = e.closeCallback.call(this))
                }
            }
        }, this.pointToElement = function(a) { A.container = l.pointerContainer || f.getElementById("HTMLCS-wrapper"), A.pointTo(a) }, this.getCurrentStandard = function() {
            return c
        };
        var A = {
            pointerDim: {},
            container: null,
            getBoundingRectangle: function(a) {
                if (!a) return null;
                var b = this.getElementCoords(a),
                    c = this.getElementDimensions(a),
                    d = { x1: b.x, y1: b.y, x2: b.x + c.width, y2: b.y + c.height };
                return d
            },
            getElementDimensions: function(a) {
                var b = { width: a.offsetWidth, height: a.offsetHeight };
                return b
            },
            getElementCoords: function(a, b) {
                var c = 0,
                    d = 0,
                    e = HTMLCS.util.getElementWindow(a);
                if (b === !0) var f = e.top;
                else var f = e;
                for (;;) {
                    do c += a.offsetLeft, d += a.offsetTop; while (a = a.offsetParent);
                    if (e === f) break;
                    if (a = e.frameElement, e = e.parent, "frame" === a.nodeName.toLowerCase()) break
                }
                return { x: c, y: d }
            },
            getWindowDimensions: function(a) {
                var b = HTMLCS.util.getElementWindow(a),
                    c = a.ownerDocument,
                    d = 0,
                    e = 0;
                if (b.innerWidth) {
                    d = b.innerWidth, e = b.innerHeight;
                    var f = this.getScrollbarWidth(a);
                    c.documentElement.scrollHeight > e && "number" == typeof f && (d -= f), c.body.scrollWidth > d && "number" == typeof f && (e -= f)
                } else c.documentElement && (c.documentElement.clientWidth || c.documentElement.clientHeight) ? (d = c.documentElement.clientWidth, e = c.documentElement.clientHeight) : c.body && (c.body.clientWidth || c.body.clientHeight) && (d = c.body.clientWidth, e = c.body.clientHeight);
                var g = { width: d, height: e };
                return g
            },
            getScrollbarWidth: function(a) {
                if (null !== k) return k;
                doc = a.ownerDocument;
                var b = null,
                    c = null,
                    d = 0,
                    e = 0;
                b = doc.createElement("div"), b.style.position = "absolute", b.style.top = "-1000px", b.style.left = "-1000px", b.style.width = "100px", b.style.height = "50px", b.style.overflow = "hidden", c = doc.createElement("div"), c.style.width = "100%", c.style.height = "200px", b.appendChild(c), f.body.appendChild(b), d = c.offsetWidth, b.style.overflow = "auto", e = c.offsetWidth, doc.body.removeChild(doc.body.lastChild);
                var g = d - e;
                return k = g, g
            },
            getScrollCoords: function(a) {
                var b = HTMLCS.util.getElementWindow(a);
                doc = a.ownerDocument;
                var c = 0,
                    d = 0;
                b.pageYOffset ? (c = b.pageXOffset, d = b.pageYOffset) : doc.body && (doc.body.scrollLeft || doc.body.scrollTop) ? (c = doc.body.scrollLeft, d = doc.body.scrollTop) : (c = doc.documentElement.scrollLeft, d = doc.documentElement.scrollTop);
                var e = { x: c, y: d };
                return e
            },
            isPointable: function(a) {
                if (null === a.ownerDocument) return !1;
                for (var b = a.parentNode; b && b.ownerDocument;) b = b.parentNode;
                return null === b ? !1 : HTMLCS.util.isHidden(a) === !0 ? !1 : null === this.getPointerDirection(a) ? !1 : !0
            },
            getPointerDirection: function(a) {
                var b = null,
                    c = this.getBoundingRectangle(a),
                    d = this.getPointer(a),
                    e = a.ownerDocument;
                d.className = d.className.replace("HTMLCS-pointer-hidden", ""), d.className += " HTMLCS-pointer-hidden-block", this.pointerDim.height = 62, this.pointerDim.width = 62;
                var f = 20,
                    g = this.getWindowDimensions(a),
                    h = (HTMLCS.util.getElementWindow(a), Math.max(0, Math.min(c.y1 - 100, e.documentElement.offsetHeight - g.height)));
                return c.y1 - this.pointerDim.height - f > h ? b = "down" : c.y2 + this.pointerDim.height < g.height - h ? b = "up" : c.x2 + this.pointerDim.width < g.width ? b = "left" : c.x1 - this.pointerDim.width > 0 && (b = "right"), d.className = d.className.replace("HTMLCS-pointer-hidden-block", ""), d.className += " HTMLCS-pointer-hidden", b
            },
            pointTo: function(a) {
                if (a.ownerDocument) var b = a.ownerDocument;
                else var b = a;
                var c = b.getElementById("HTMLCS-pointer");
                if (c && c.parentNode.removeChild(c), this.isPointable(a) !== !1) {
                    var d = HTMLCS.util.getElementWindow(a).top,
                        e = (this.getWindowDimensions(d.document.documentElement), this.getPointerDirection(a)),
                        f = this.getPointer(a);
                    if (f.className = f.className.replace("HTMLCS-pointer-hidden-block", ""), null === e) f.className += " HTMLCS-pointer-hidden";
                    else {
                        var g = !1;
                        if ("fixed" === HTMLCS.util.style(a).position) var g = !0;
                        for (var h = a.parentNode; h.ownerDocument;) {
                            if ("fixed" === HTMLCS.util.style(h).position) {
                                g = !0;
                                break
                            }
                            h = h.parentNode
                        }
                        if (g === !0) f.style.position = "fixed";
                        else {
                            f.style.position = "absolute";
                            for (var i = this.getElementCoords(a, !0), j = HTMLCS.util.getElementWindow(a), k = Math.max(i.y - 100, 0); k >= 0;) {
                                j.scrollTo(0, k);
                                var l = this.getScrollCoords(j.document.documentElement);
                                if (k -= l.y, k = Math.max(k, 0), j === d) break;
                                j = j.parent
                            }
                        }
                        this.showPointer(a, e)
                    }
                }
            },
            getPointer: function(a) {
                try {
                    var b = a.ownerDocument;
                    HTMLCSAuditor.includeCss("HTMLCS", b);
                    var c = "HTMLCS",
                        d = b.getElementById(c + "-pointer");
                    d || (d = b.createElement("div"), d.id = c + "-pointer", d.className = c + "-pointer " + c + "-pointer-hidden", b.body.appendChild(d))
                } catch (e) {}
                return d
            },
            showPointer: function(a, b) {
                var c = "HTMLCS",
                    d = this.getPointer(a);
                this._removeDirectionClasses(d), d.className += " " + c + "-pointer-" + b, d.className = d.className.replace(c + "-pointer-hidden", "");
                var e = this.getBoundingRectangle(a),
                    f = 0,
                    g = 0,
                    h = 20;
                switch (b) {
                    case "up":
                        h = -h, f = e.y2, g = e.x2 - e.x1 < 250 ? this.getRectMidPnt(e) - this.pointerDim.width / 2 : e.x1;
                        break;
                    case "down":
                    default:
                        f = e.y1 - this.pointerDim.height, g = e.x2 - e.x1 < 250 ? this.getRectMidPnt(e) - this.pointerDim.width / 2 : e.x1;
                        break;
                    case "left":
                        g = e.x2, f = this.getRectMidPnt(e, !0) - this.pointerDim.height / 2;
                        break;
                    case "right":
                        h = -h, g = e.x1 - this.pointerDim.width, f = this.getRectMidPnt(e, !0) - this.pointerDim.height / 2
                }
                var i = this.getScrollCoords(a);
                d.style.top = f + "px", d.style.left = g + "px";
                var j = this.getBoundingRectangle(this.container);
                e = this.getBoundingRectangle(d);
                var k = e.x1 + (e.x2 - e.x1) / 2,
                    l = e.y1 + (e.y2 - e.y1) / 2;
                if ("fixed" !== HTMLCS.util.style(d).position && (l -= i.y), j.x1 <= k && j.x2 >= k && j.y1 <= l && j.y2 >= l) {
                    var m = this;
                    this.container.className += " HTMLCS-translucent", setTimeout(function() { m.container.className = m.container.className.replace("HTMLCS-translucent", "") }, 4e3)
                }
                this.bounce(d, function() { setTimeout(function() { d.parentNode && d.parentNode.removeChild(d) }, 1500) }, b)
            },
            bounce: function(a, b, c) {
                var d = c,
                    e = 0,
                    f = "",
                    g = 0,
                    h = 30,
                    i = 5;
                switch (c) {
                    case "up":
                        d = c + "-op", g = h;
                    case "down":
                        f = "top";
                        break;
                    case "left":
                        d = c + "-op", g = h;
                    case "right":
                        f = "left"
                }
                e = Number(a.style[f].replace("px", "")) + g;
                var j = e,
                    k = e - h,
                    l = 0,
                    m = setInterval(function() {
                        if (d === c) {
                            if (j--, a.style[f] = j + "px", k > j && (d = c + "-op", l === i && 0 !== g)) return clearInterval(m), void b.call(this)
                        } else if (j++, a.style[f] = j + "px", j >= e && (d = c, l++, l === i && 0 === g)) return clearInterval(m), void b.call(this)
                    }, 10)
            },
            getRectMidPnt: function(a, b) {
                var c = 0;
                return c = b === !0 ? a.y1 + (a.y2 - a.y1) / 2 : a.x1 + (a.x2 - a.x1) / 2
            },
            _removeDirectionClasses: function(a) {
                for (var b = "HTMLCS", c = ["down", "up", "left", "right"], d = c.length, e = 0; d > e; e++) a.className = a.className.replace(b + "-pointer-" + c[e], "")
            }
        }
    },
    _run = HTMLCSAuditor.run;
HTMLCSAuditor.run = function(a, b, c) {
    var d = function(b, c) {
            var d = {
                    uaAcct: "359178.17",
                    self: this,
                    domainHash: function(a) {
                        for (var b = 0, c = 0, d = a.length - 1; d >= 0; d--) {
                            var e = a.charCodeAt(d);
                            b = (b << 6 & 268435455) + e + (e << 14), c = 266338304 & b, b = 0 !== c ? b ^ c >> 21 : b
                        }
                        return b
                    },
                    rand: function() {
                        return Math.floor(2147483648 * Math.random())
                    },
                    buildUtma: function() {
                        var a = [];
                        return a.push(this.domainHash(document.location.hostname)), a.push(this.rand()), a.push(Math.floor((new Date).getTime() / 1e3)), a.push(a[2]), a.push(a[2]), a.push(1), a.join(".")
                    },
                    renewUtma: function(a, b) {
                        var c = this.getCookie("utmc");
                        return b !== !0 && c || (a = a.split("."), a[5]++, a[3] = a[4], a[4] = Math.floor((new Date).getTime() / 1e3), a = a.join(".")), a
                    },
                    buildCustomVars: function(a, b, c, d) {
                        var e = ["Standard", "Errors", "Warnings", "Notices"],
                            f = [a, b, c, d],
                            g = "";
                        return g += "8(" + e.join("*") + ")", g += "9(" + f.join("*") + ")"
                    },
                    url: function(a, b, c, d, e) {
                        var f = "http://www.google-analytics.com/__utm.gif?",
                            g = HTMLCSAuditor.getOwnerDocument();
                        g.defaultView && "https:" === g.defaultView.location.protocol && (f = "https://ssl.google-analytics.com/__utm.gif?");
                        var h = this.getCookie("utma");
                        h = h ? this.renewUtma(h, e) : this.buildUtma();
                        var i = new Date;
                        i.setFullYear(i.getFullYear() + 2), this.setCookie("utma", h, i), this.setCookie("utmc", this.domainHash(document.location.hostname));
                        var j = { utmwv: "0.0", utmn: this.rand(), utmhn: document.location.hostname, utmp: document.location.pathname, utmac: "UA-" + this.uaAcct.split(".").join("-"), utme: this.buildCustomVars(a, b, c, d), utmcc: "__utma=" + h + ";" };
                        for (var k in j) f += escape(k) + "=" + escape(j[k]) + "&";
                        return f
                    },
                    setCookie: function(a, b, c) {
                        a = "__htmlcs." + a;
                        var d = a + "=" + b;
                        d += ";path=/", c && (d += ";expires=" + escape(c.toString())), document.cookie = d
                    },
                    cookieExists: function(a) {
                        return a = "__htmlcs." + a, new RegExp("(?:^|;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                    },
                    getCookie: function(a) {
                        return this.cookieExists(a) === !1 ? null : (a = "__htmlcs." + a, unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")))
                    }
                },
                e = HTMLCSAuditor.countIssues(b),
                f = HTMLCSAuditor.getOwnerDocument().createElement("img");
            f.src = d.url(a, e.error, e.warning, e.notice, c)
        },
        e = c.runCallback;
    c.runCallback = function(a, b) { d(a, b), e && e(a) }, _run.call(HTMLCSAuditor, a, b, c)
};
