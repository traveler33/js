$(function () {
    $('.toggle').hide();
});
/* color */
(function (Raphael) {
    Raphael.fn.colorPickerIcon = function (x, y, r, w) {
        var segments = pi * r * 2 / Math.min(r / 8, 4);
        var a = pi / 2 - pi * 2 / segments * 1.5;
        var x1 = x, y1 = y - r, x2 = r * Math.cos(a) + x, y2 = y - r * Math.sin(a);
        var x3 = w * (x - x2) + x2, y3 = w * (y - y2) + y2, x4 = w * (x - x1) + x1, y4 = w * (y - y1) + y1;
        var path = ["M", x1, y1, "A", r, r, 0, 0, 1, x2, y2, "L", x3, y3, "A", r / 2, r / 2, 0, 0, 0, x4, y4, "z"].join();
        for (var i = 0; i < segments; i++) {
            this.path(path).attr({
                stroke: "none",
                //fill: "hsb(" + (segments - i) * (360 / segments) + ", 100, 100)",
                fill: "hsl(" + (segments - i) * (360 / segments) + ", 100, 50)",
                //fill: "hsl(" + i * (360 / segments) + ", 100, 50)",
                rotation: [90 + (360 / segments) * i, x, y]
            });
        }
        this.circle(x, y, r + 2).attr({
            fill: "r#fff-#fff",
            "fill-opacity": 0,
            "stroke-width": 2,
            stroke: "#fff"
        });
        return this.circle(x, y, r * (1 - w)).attr({
            fill: "r#fff-#fff",
            "fill-opacity": 0,
            "stroke-width": 2,
            stroke: "#fff"
        });
    };
    var pi = Math.PI;
})(window.Raphael);
var items = new Array(), items2 = new Array();
var global = {
    mode: 'hsl',
    canvasWidth: 260, canvasHeight: 220,
    x0: 130, y0: 110, r: 100, w: 0.6,
    lightnessMin: 0.2, lightnessMax: 0.6,
    sampleStart: 5, sampleWidth: 200,
    tMenu: false, tTBar: false, tStat: false, tButn: false,
    initial: function () {
        this.container = $('#colorwheel_container')[0];
        this.paper = new Raphael(this.container, this.canvasWidth, this.canvasHeight);
        this.wheel = this.paper.colorPickerIcon(this.x0, this.y0, this.r, this.w);
        this.method = $('.methods input:radio[name=group1]:checked').val();
    }
}
function drawsItem() {
    this.color = {
        initial: function (color) {
            var r = 0, g = 0, b = 0;
            if (color.indexOf('rgb') == 0) {
                var i1 = color.indexOf("("), i2 = color.indexOf(")");
                var splited = color.substring(i1 + 1, i2).split(',');
                r = splited[0], g = splited[1], b = splited[2];
            }
            else if (color.length == 4) {
                r = parseInt(color.substr(1, 1), 16), g = parseInt(color.substr(2, 1), 16), b = parseInt(color.substr(3, 1), 16);
                r = r * 16 + r, g = g * 16 + g, b = b * 16 + b;
            }
            else if (color.length == 7)
                r = parseInt(color.substr(1, 2), 16), g = parseInt(color.substr(3, 2), 16), b = parseInt(color.substr(5, 2), 16);
            var t = this;
            t.hsl = Raphael.rgb2hsl(r, g, b);
            t.color = Raphael.hsl2rgb(t.hsl.h, t.hsl.s, t.hsl.l).toString().toUpperCase();
            t.color1 = Raphael.hsl2rgb(t.hsl.h, t.hsl.s, global.lightnessMin).toString().toUpperCase();
            t.color2 = Raphael.hsl2rgb(t.hsl.h, t.hsl.s, global.lightnessMax).toString().toUpperCase();
            t.radian = t.hsl.h * Math.PI * 2, t.radius = t.hsl.s * 2 * global.r, t.x = t.radius * Math.cos(t.radian), t.y = -t.radius * Math.sin(t.radian);
            var org = {}, o = org;
            o.hsl = {}, $.extend(true, o.hsl, t.hsl);
            o.color = t.color, o.color1 = t.color1, o.color2 = t.color2, o.radian = t.radian, o.radius = t.radius, o.x = t.x, o.y = t.y;
            t.org = o;
            return $(this);
        },
        shiftLightness: function (val) {
            var hsl = this.hsl, g = global;
            hsl.l = g.lightnessMin + (g.lightnessMax - g.lightnessMin) * val;
            this.color = Raphael.hsl2rgb(hsl.h, hsl.s, hsl.l).toString().toUpperCase();
        },
        shiftHue: function (val) {
            var t = this;
            t.hsl.h = t.org.hsl.h + val; while (t.hsl.h > 1) t.hsl.h -= 1; while (t.hsl.h < 0) t.hsl.h += 1;
            t.setColorByHsl(t.hsl.h, t.hsl.s, t.hsl.l);
            t.radian = t.hsl.h * Math.PI * 2, t.radius = t.hsl.s * 2 * global.r, t.x = t.radius * Math.cos(t.radian), t.y = -t.radius * Math.sin(t.radian);
        },
        shift: function (r, x, y) {
            var h = Math.atan2(-y, x) / Math.PI / 2;
            if (h < 0) h += 1;
            var s = Math.min(r / 2 / global.r, 1);
            this.setColorByHsl(h, s, this.hsl.l);
            this.radian = this.hsl.h * Math.PI * 2, this.radius = r, this.x = x, this.y = y;
        },
        setColorByHsl: function (h, s, l) {
            this.hsl.h = h, this.hsl.s = s, this.hsl.l = l;
            this.color = Raphael.hsl2rgb(h, s, l).toString().toUpperCase();
            this.color1 = Raphael.hsl2rgb(h, s, global.lightnessMin).toString().toUpperCase(), this.color2 = Raphael.hsl2rgb(h, s, global.lightnessMax).toString().toUpperCase();
        },
        save: function () {
            var o = this.org, c = this;
            var radian = c.hsl.h * Math.PI * 2;
            o.x = c.hsl.s * Math.cos(radian) * 2 * global.r, o.y = -c.hsl.s * Math.sin(radian) * 2 * global.r;
            o.d = Math.atan2(o.y, o.x);
            o.color = c.color, o.color1 = c.color1, o.color2 = c.color2, o.hsl = c.hsl; //, o.d = -c.hsl.h * 2 * Math.PI;
        }
    };
    this.bar = {
        draw: function (container, color) {
            if (!this.paper) {
                this.container = container;
                this.paper = new Raphael(this.container, global.sampleWidth + 10, 20);
            }
            this.start = global.sampleStart, this.end = this.start + global.sampleWidth;
            this.o = this.paper.rect(this.start, 5, global.sampleWidth, 8, 2).attr({ fill: '0-' + color.color1 + '-' + color.color2, 'stroke-width': 0 });
        }
    };
    this.triangle = {
        draw: function (color, bar) {
            var x = bar.start + global.sampleWidth / (global.lightnessMax - global.lightnessMin) * (color.hsl.l - global.lightnessMin);
            x = Math.min(Math.max(bar.start, x), bar.end);
            var o = bar.paper.path('M ' + x + ',11 L ' + (x - 5) + ',18 L ' + (x + 5) + ',18 z').attr({ fill: '#000', 'stroke-width': 0 });
            o.node.onmouseover = function () { this.style.cursor = 'pointer'; }
            var item = this.item;
            $(o.node).mousedown(function (e) {
                registerMouseMove('bar', item);
            });
            this.x = x, this.o = o;
        },
        move: function (x, item) {
            var bar = item.bar;
            x = Math.min(Math.max(bar.start, x), bar.end);
            this.o.translate(x - this.x, 0);
            this.x = x;
            item.color.shiftLightness((x - bar.start) / global.sampleWidth);
            item.$indicator.css('background-color', item.color.color);
            item.$indicator.parent().next().next().children('.dspvalue').text(item.color.color);
            item.$indicator.parent().children('.dspvalue').val(item.color.color);
            item.circle.o.attr({ fill: item.color.color });
            colorSync(item.name, item.color);
        }
    };
    this.circle = {
        draw: function (color) {
            this.x = color.org.x + global.x0, this.y = color.org.y + global.y0;
            var o = global.paper.circle(this.x, this.y, 5).attr({ fill: color.color, stroke: '#FFF', 'stroke-width': 2 });
            o.node.onmouseover = function () { this.style.cursor = 'pointer' };
            $(o.node).hover(function () { o.animate({ r: 6 }, 0) }, function () { o.animate({ r: 5 }, 0) });
            var item = this.item;
            $(o.node).mousedown(function (e) {
                registerMouseMove('cir', item);
            });
            this.o = o;
        },
        move: function (pos, item) {
            var x = pos.x - global.x0, y = pos.y - global.y0, radian = Math.atan2(-y, x);
            var h_dif = (radian / Math.PI / 2 - item.color.org.hsl.h);
            //                    while (h_dif < 0) h_dif += 1; while (h_dif > 1) h_dif -= 1;
            //                    $('#label1').text(h_dif * 360);
            var radius = Math.sqrt(x * x + y * y);
            var rat = 1;
            if (radius > global.r) rat = global.r / radius;
            else {
                var rr = global.r * (1 - global.w);
                if (radius < rr) rat = rr / radius;
            }
            radius = radius * rat, x = x * rat, y = y * rat;
            item.color.shift(radius, x, y);
            x = global.x0 + x, y = global.y0 + y;
            this.o.translate(x - this.x, y - this.y).attr({ fill: item.color.color });
            this.x = x, this.y = y;
            item.line.o.remove();
            item.line.draw(this);
            item.circle.colorAdjust(item);
            var circle = this;
            if (global.method != "custom")
                $(items).each(function (i) {
                    if (i >= 0)
                        if (this.circle.o != circle.o)
                            this.circle.rotate(h_dif, this);
                });
        },
        colorAdjust: function (item) {
            item.bar.o.attr({ fill: '0-' + item.color.color1 + '-' + item.color.color2 });
            item.$indicator.css('background-color', item.color.color);
            item.$indicator.parent().next().next().children('.dspvalue').text(item.color.color);
            colorSync(item.name, item.color);
        },
        rotate: function (h_dif, item) {
            item.color.shiftHue(h_dif);
            var x = item.color.x + global.x0, y = item.color.y + global.y0;
            this.o.translate(x - this.x, y - this.y).attr({ fill: item.color.color });
            this.x = x, this.y = y;
            item.line.o.remove();
            item.line.draw(this);
            this.colorAdjust(item);
        }
    };
    this.line = {
        draw: function (circle) {
            this.o = global.paper.path('M ' + global.x0 + ',' + global.y0 + ' L ' + circle.x + ',' + circle.y).attr({ stroke: '#888' });
            circle.o.toFront();
        }
    };
    this.$indicator;
    this.initial = function (indicator) {
        this.$indicator = $(indicator);
        this.name = this.$indicator.parent().next().children()[0].id;
        this.color.item = this, this.bar.item = this, this.triangle.item = this, this.circle.item = this, this.line.item = this;
        this.draw();
        var item = this;
        this.$indicator.hover(function () {
            item.circle.o.animate({ r: 6 }, 0).toFront();
            item.triangle.o.attr({ fill: '#F00' });
        }, function () {
            item.circle.o.animate({ r: 5 }, 0);
            item.triangle.o.attr({ fill: '#000' });
        });
    },
    this.reset = function () {
        this.bar.o.remove(), this.triangle.o.remove(), this.circle.o.remove(), this.line.o.remove();
        this.draw();
    },
    this.draw = function () {
        this.color.initial(this.$indicator.css('background-color'));
        this.$indicator.parent().next().next().children('.dspvalue').text(this.color.color);
        this.bar.draw(this.$indicator.parent().next().children()[0], this.color);
        this.triangle.draw(this.color, this.bar);
        this.circle.draw(this.color);
        this.line.draw(this.circle);
    }
}
var browser, version;
$(function () {
    $('.err').hide();
    $('.txtvalue').hide();
    $('.txtvalue').change(function (i) {
        $this = $(this);
        $this.attr('title', '');
        $this.next().hide();
        var regColor = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
        if (!regColor.test($this.val())) {
            $this.attr('title', 'incorrect color code');
            $this.next().show();
        }
        else {
            var orgcolor = $this.val();
            var temp = new drawsItem();
            temp.color.initial($(this).val());
            var hsl = temp.color.hsl;
            if (hsl.s < (1 - global.w)) hsl.s = 1 - global.w;
            hsl.l = Math.min(Math.max(global.lightnessMin, hsl.l), global.lightnessMax);
            var curcolor = Raphael.hsl2rgb(hsl.h, hsl.s, hsl.l).toString().toUpperCase();
            if (curcolor != orgcolor) {
                $this.attr('title', 'this color is adjusted internally by color policy');
                temp.color.initial(curcolor);
            }
            $this.val(curcolor);
            var item = items2[$this.parent().prev().children()[0].id];
            item.circle.move({ x: temp.color.org.x + global.x0, y: temp.color.org.y + global.y0 }, item);
            var x = (temp.color.hsl.l - global.lightnessMin) / (global.lightnessMax - global.lightnessMin) * global.sampleWidth + global.sampleStart;
            item.triangle.move(x, item);
        }
    });
    if ($('#colorwheel_container').length < 1) return;
    global.initial();
    $('.colorIndicator').each(function (indes) {
        var item = new drawsItem();
        item.initial(this);
        eval('global.c' + this.id.substr(this.id.length - 4) + ' = $.extend(true, {}, item.color)');
        items.push(item);
        items2[item.name] = item;
    });
    $('.methods input').change(function () {
        if (this.value == 'rgbinput') {
            $('.dspvalue').each(function (i) {
                $(this).next().val($(this).text());
            });
            $('.dspvalue').hide();
            $('.txtvalue').show();
            global.mode = "rgb";
            return;
        }
        if (global.mode = "rgb") {
            $('.txtvalue').each(function (i) {
                $(this).prev().text($(this).val());
                $(this).attr('title', '');
            });
            $(items).each(function (i) {
                this.color.save();
                this.circle.x = this.color.org.x + global.x0, this.circle.y = this.color.org.y + global.y0;
            });
            $('.dspvalue').show();
            $('.txtvalue').hide();
            global.mode = "hsl";
        }
        global.method = this.value;
        if (this.value == 'analogous' || this.value == 'custom') return;
        var hsl = items2["sampleMenu"].color.hsl;
        var a = { h: hsl.h, s: hsl.s, l: hsl.l }, b = $.extend({}, a), c = $.extend({}, a), d = $.extend({}, a), css = 'background-color';
        if (this.value == 'monochromatic') {
            a.s = 0.3, a.l = 0.25;
            b.s = 0.4, b.l = 0.30;
            c.s = 0.5, c.l = 0.35;
            d.s = 0.2, d.l = 0.20;
        } else if (this.value == 'triad') {
            var e = 1 / 3;
            a.s = 0.3, a.l = 0.25;
            b.s = 0.4, b.l = 0.30, b.h = checkHue(a.h + e);
            c.s = 0.5, c.l = 0.35, c.h = b.h;
            d.s = 0.2, d.l = 0.20, c.h = checkHue(c.h + e);
        } else if (this.value == 'complementary') {
            a.s = 0.3, a.l = 0.25;
            b.s = 0.4, b.l = 0.30, b.h = checkHue(a.h + 0.5);
            c.s = 0.5, c.l = 0.35, c.h = b.h;
            d.s = 0.2, d.l = 0.20;
        } else if (this.value == 'compound') {
            a.s = 0.3, a.l = 0.25;
            b.s = 0.4, b.l = 0.30, b.h = checkHue(a.h + 0.03);
            c.s = 0.5, c.l = 0.35, c.h = checkHue(a.h - 0.03);
            d.s = 0.2, d.l = 0.20;
        }
        $('.colorMenu').css(css, Raphael.hsl2rgb(a.h, a.s, a.l).toString().toUpperCase());
        $('.colorTBar').css(css, Raphael.hsl2rgb(b.h, b.s, b.l).toString().toUpperCase());
        $('.colorStat').css(css, Raphael.hsl2rgb(c.h, c.s, c.l).toString().toUpperCase());
        $('.colorButn').css(css, Raphael.hsl2rgb(d.h, d.s, d.l).toString().toUpperCase());
        $(items).each(function (i) {
            this.reset();
        });
        //$('#label2').text(this.value);
    });
});
function checkHue(h) { while (h > 1) h -= 1; while (h < 0) h += 1; return h; }
function registerMouseMove(type, item) {
    cleanUp();
    var type = type, item = item, state = true;
    item.triangle.o.attr({ fill: '#C00' });
    item.circle.o.animate({ r: 6 }, 0);
    item.circle.o.toFront();
    if (global.mode == 'hsl') {
        $('.colorArea').mousemove(function (e) {
            if (!state) return;
            //$('#label1').text(this.id + ' - mousemove');
            //$('#label2').text(this.id + ' - (' + im.x + ', ' + im.y + ', ' + im.state + ')');
            var pos = getLocalPos(e.pageX, e.pageY, type == ('bar') ? item.bar.container : global.container);
            if (type == 'bar') item.triangle.move(pos.x, item);
            else if (type == 'cir') item.circle.move(pos, item);
        });
    }
    $('.colorArea').mouseup(function () {
        //$('#label1').text(this.id + ' - mouseup');
        cleanUp();
    });
    $('.colorArea').mouseleave(function () {
        //$('#label1').text(this.id + ' - mouseout');
        cleanUp();
    });
    function cleanUp() {
        if (!state) return;
        $('.colorArea').unbind('mousemove');
        $('.colorArea').unbind('mouseup');
        $('.colorArea').unbind('mouseleave');
        state = false;
        item.triangle.o.attr({ fill: '#000' });
        item.circle.o.animate({ r: 5 }, 0);
        if (type == 'cir') {
            $(items).each(function (i) {
                this.color.save();
                this.circle.x = this.color.org.x + global.x0, this.circle.y = this.color.org.y + global.y0;
            });
        }
        //$('#label2').text('cleanUp - (' + this.x + ', ' + this.y + ', ' + this.state + ')');
    }
}
function getGlobalPos(el) {
    //var id = el.id;
    for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    //$('#label1').text(id + ' - (' + lx + ', ' + ly + ') - (' + interactManager.paper.canvas.offsetLeft + ', ' + interactManager.paper.canvas.offsetTop + ')');
    return { x: lx, y: ly };
}
// returns the local position according to the given raphael object
function getLocalPos(globalX, globalY, obj) {
    var canvasPosition = getGlobalPos(obj);
    var x = globalX - canvasPosition.x, y = globalY - canvasPosition.y;
    //$('#label2').text('(' + globalX + ', ' + globalY + ') - (' + x + ', ' + y + ')');
    return { x: x, y: y };
}
function colorSync(name, color) {
    colorSync2(name, color);
    if ($('#colortoggle').is(':hidden')) $('#colortoggle').show();
    if (!eval('global.t' + name.substr(name.length - 4))) {
        var f = name.substr(name.length - 4);
        eval('global.t' + f + ' = true');
        $('#colortoggle').mousedown(function () {
            colorSync2(name, eval('global.c' + f));
            $('body').mouseup(function () {
                colorSync2(name, items2[name].color);
                $('body').unbind('mouseup');
            });
        });
    }
}
function colorSync2(name, color) {
    var h = color.hsl.h, s = color.hsl.s, l = color.hsl.l, l1 = (l > 0.8) ? 1 : l + 0.2, l2 = (l < 0.2) ? 0 : l - 0.2;
    var color1 = color.color;
    var color2 = Raphael.hsl2rgb(h, s, l1);
    var color3 = Raphael.hsl2rgb(h, s, l2);
    if (name == 'sampleMenu') {
        if ($.browser.msie) {
            $(cm.cam).css(cm.bc, color1);
            $(cm.cam)[0].filters[0].startColorStr = color2;
            $(cm.cam)[0].filters[0].EndColorStr = color1;
            $(cm.cmm)[0].filters[0].startColorStr = color1;
            $(cm.cmm)[0].filters[0].EndColorStr = color3;
        } else if ($.browser.mozilla) {
            $(cm.cam).css(cm.bi, cm.ff10 + color2 + ' 0%, ' + color1 + ' 100%)');
            $(cm.cmm).css(cm.bi, cm.ff10 + color1 + ' 0%, ' + color1 + ' 50%, ' + color3 + ' 100%)');
        } else if ($.browser.webkit) {
            $(cm.cam).css(cm.bi, cm.gg10 + color2 + '), color-stop(1, ' + color1 + '))');
            $(cm.cmm).css(cm.bi, cm.gg10 + color1 + '), color-stop(.5, ' + color1 + '), color-stop(1, ' + color3 + '))');
        }
    } else if (name == 'sampleTBar') {
        if ($.browser.msie) {
            $(cm.ctb)[0].filters[0].GradientType = 0;
            $(cm.ctb)[0].filters[0].startColorStr = color2;
            $(cm.ctb)[0].filters[0].EndColorStr = color1;
        } else if ($.browser.mozilla) {
            $(cm.ctb).css(cm.bi, cm.ff11 + color1 + ' 0%, ' + color1 + ' 50%, ' + color2 + ' 100%)');
        } else if ($.browser.webkit) {
            $(cm.ctb).css(cm.bi, cm.gg11 + color1 + '), color-stop(.5, ' + color1 + '), color-stop(1, ' + color2 + '))');
        }
    } else if (name == 'sampleStat') {
        if ($.browser.msie) {
            $(cm.cst).css(cm.bt, '1px solid ' + color3);
            $(cm.cst).each(function (i) {
                this.filters[0].GradientType = 0;
                this.filters[0].startColorStr = color2;
                this.filters[0].EndColorStr = color1;
            });
        } else if ($.browser.mozilla) {
            $(cm.cst).css(cm.bt, '1px solid ' + color3);
            $(cm.cst).css(cm.bi, cm.ff11 + color1 + ' 0%, ' + color1 + ' 50%, ' + color2 + ' 100%)');
        } else if ($.browser.webkit) {
            $(cm.cst).css(cm.bt, '1px solid ' + color3);
            $(cm.cst).css(cm.bi, cm.gg11 + color1 + '), color-stop(.5, ' + color1 + '), color-stop(1, ' + color2 + '))');
        }
    } else if (name == 'sampleButn') {
        if ($.browser.msie) {
            $(cm.cbt).each(function (i) {
                this.filters[0].startColorStr = color2;
                this.filters[0].EndColorStr = color1;
            });
        } else if ($.browser.mozilla) {
            $(cm.cbt).css(cm.bi, cm.ff10 + color2 + ' 0%, ' + color1 + ' 100%)');
        } else if ($.browser.webkit) {
            $(cm.cbt).css(cm.bi, cm.gg10 + color2 + '), color-stop(1, ' + color1 + '))');
        }
    }
}
var cm = {
    bc: 'background-color', bi: 'background-image', ft: 'filter', mf: '-ms-filter', bt: 'border-top',
    cam: '.appMenuSelected_s', cmm: '#mainmenu', ctb: '.pageToolBar', cst: '.statusBar, .treeToolBar', cbt: ".search, .detailEdit input[type='submit']",
    mf11: 'progid:DXImageTransform.Microsoft.gradient(startColorStr=',
    mf10: 'progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorStr=',
    mf2: ', EndColorStr=', mf3: ')',
    ff10: '-moz-linear-gradient(-90deg, ',
    ff11: '-moz-linear-gradient(90deg, ',
    gg10: '-webkit-gradient(linear, left top, left bottom, color-stop(0, ',
    gg11: '-webkit-gradient(linear, left bottom, left top, color-stop(0, '
};
function btn_save_color_onclick() {
    var data = { type: "color" };
    $(items).each(function (i) {
        eval("data." + this.name + "='" + this.color.color + "'");
    });
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: data,
        dataType: "json",
        error: function (request, status, exception) {
            alert('error: ' + status.toString());
        },
        success: function (ret) {
            if (ret.status == "OK")
                window.location = window.location;
            else
                alert(ret.status);
        }
    });
    return false;
}
/* font */
var fonts, current;
$(function () {
    var $an = $('.appName');
    var $font = $('.font');
    $font.text($('.testTitle').val());
    $('.testTitle').change(function () {
        $font.text($(this).val());
    });
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: { type: 'fonts' },
        dataType: "json",
        error: function (request, status, exception) {
            alert('error: ' + status.toString());
        },
        success: function (ret) {
            if (ret.status == "OK")
                showFont(ret);
            else
                alert(ret.status);
        }
    });
    function showFont(ret) {
        fonts = ret.fonts;
        current = ret.index;
        var fontContainerWidth = $(window).width() - 400 - 64, w = 120, h = 36, temp = '';
        $.each(fonts, function (i) {
            $('.font-container .scroll-pane .scroll-content').append('<div class="o-item">' + this + '</div>');
        });
        var $items = $('.o-item');
        var width = 0, n = $items.length;
        $($items[current]).css("background-color", "#bbb");
        $items.each(function (i) {
            width += this.offsetWidth + 4;
            $(this).click(function () {
                changeFontTo(i);
                $scrollbar.slider("value", i + 1);
                fontSync();
            });
        });
        //scrollpane parts
        var $scrollPane = $(".scroll-pane"), $scrollContent = $(".scroll-content");
        $scrollContent.width(width);
        $('.parent-font-container').width(fontContainerWidth);
        $('div.font-container').width(fontContainerWidth);
        $scrollPane.width(fontContainerWidth);

        //build slider
        var $scrollbar = $(".scroll-bar").slider({
            min: 1, max: n, value: current + 1,
            slide: function (event, ui) {
                slidTo(ui.value - 1);
                fontSync();
            }
        });

        //append icon to handle
        var handleHelper = $scrollbar.find(".ui-slider-handle").mousedown(function () {
            $scrollbar.width(handleHelper.width());
        }).mouseup(function () {
            $scrollbar.width("100%");
        }).append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>").wrap("<div class='ui-handle-helper-parent'></div>").parent();

        //change overflow to hidden now that slider handles the scrolling
        $scrollPane.css("overflow", "hidden");

        function slidTo(i) {
            changeFontTo(i);
            if ($scrollContent.width() > $scrollPane.width()) {
                var x = Math.round(i / (n - 1) * ($scrollPane.width() - $scrollContent.width()));
                $scrollContent.css("margin-left", x + "px");
            } else {
                $scrollContent.css("margin-left", 0);
            }
        }

        //size scrollbar and handle proportionally to scroll distance
        function sizeScrollbar() {
            var remainder = $scrollContent.width() - $scrollPane.width();
            var proportion = remainder / $scrollContent.width();
            var handleSize = $scrollPane.width() - (proportion * $scrollPane.width());
            $scrollbar.find(".ui-slider-handle").css({
                width: handleSize,
                "margin-left": -handleSize / 2
            });
            handleHelper.width("").width($scrollbar.width() - handleSize);
        }

        //reset slider value based on scroll content position
        function resetValue() {
            var remainder = $scrollPane.width() - $scrollContent.width();
            var leftVal = $scrollContent.css("margin-left") === "auto" ? 0 : parseInt($scrollContent.css("margin-left"));
            var percentage = Math.round(leftVal / remainder * 100);
            $scrollbar.slider("value", percentage);
        }

        //if the slider is 100% and window gets larger, reveal content
        function reflowContent() {
            var showing = $scrollContent.width() + parseInt($scrollContent.css("margin-left"), 10);
            var gap = $scrollPane.width() - showing;
            if (gap > 0) {
                $scrollContent.css("margin-left", parseInt($scrollContent.css("margin-left"), 10) + gap);
            }
        }

        function changeFontTo(i, fontFamily) {
            $($items[current]).css("background-color", "#ddd");
            current = i;
            var $item = $($items[current]);
            $item.css("background-color", "#bbb");
            $font.css("font-family", $item.text());
            $('.f-family').text($item.text() + ' (' + (current + 1) + '-' + $items.length + ')');
        }
        function fontSync(size) {
            fontSync2(size);
            if ($('#fonttoggle').is(':hidden')) {
                $('#fonttoggle').show().mousedown(function () {
                    $('.appName').css({
                        'font-family': global.fFamily,
                        'font-size': global.fSize,
                        'font-style': global.fStyle,
                        'font-weight': global.fWeight
                    });
                    $('body').mouseup(function () {
                        fontSync2();
                        $('body').unbind('mouseup');
                    });
                });
            };
        }
        function fontSync2(size) {
            $('.appName').css({
                'font-family': fonts[current],
                'font-size': size || $('.f-size').slider("value") + 'px',
                'font-style': $('.f-style')[0].checked ? 'italic' : 'normal',
                'font-weight': $('.f-weight')[0].checked ? 'bold' : 'normal'
            });
        }
        //change handle position on window resize
        $(window).resize(function () {
            fontContainerWidth = $(window).width() - 400 - 64;
            $('.parent-font-container').width(fontContainerWidth);
            $('div.font-container').width(fontContainerWidth);
            $scrollPane.width(fontContainerWidth);
            //resetValue();
            sizeScrollbar();
            reflowContent();
        });
        //init scrollbar size
        setTimeout(sizeScrollbar, 10); //safari wants a timeout
        // size style weight
        $('.f-size').slider({
            min: 16, max: 60, val: 1,
            slide: function (event, ui) {
                var s = ui.value + 'px';
                $font.css('font-size', s);
                fontSync(s);
                $('.sizevalue').text(s);
            }
        });
        $('.f-style').change(function () { $font.css('font-style', this.checked ? 'italic' : 'normal'); fontSync(); });
        $('.f-weight').change(function () { $font.css('font-weight', this.checked ? 'bold' : 'normal'); fontSync(); });
        // init
        $font.css('font-family', fonts[ret.index]);
        $font.css('font-size', ret.size);
        $font.css('font-style', ret.style);
        $font.css('font-weight', ret.weight);
        slidTo(current);
        $('.f-size').slider("value", ret.size.substr(0, ret.size.length - 2));
        $('.f-style')[0].checked = ret.style == "italic";
        $('.f-weight')[0].checked = ret.weight == "bold";
        $('.sizevalue').text(ret.size);
        global.fFamily = fonts[ret.index], global.fSize = ret.size, global.fStyle = ret.style, global.fWeight = ret.weight;
    }
});
function btn_save_font_onclick() {
    var data = {
        type: "font",
        family: fonts[current],
        size: $('.f-size').slider("value") + 'px',
        style: $('.f-style')[0].checked ? 'italic' : 'normal',
        weight: $('.f-weight')[0].checked ? 'bold' : 'normal'
    };
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: data,
        dataType: "json",
        error: function (request, status, exception) {
            alert('error: ' + status.toString());
        },
        success: function (ret) {
            if (ret.status == "OK")
                window.location = window.location;
            else
                alert(ret.status);
        }
    });
    return false;
}
/* logo */
var logoMaxWidth = 250, logoMaxHeight = 100, logoWidth, logoHeight;
$(function () {
    var prefix = document.location.pathname.toLowerCase();
    prefix = prefix.substr(0, prefix.indexOf('/files/'))
    url = 'url("../Master/DomainLogo.aspx?rec_id=' + rec_id + '&' + Math.floor(Math.random() * 1001) + '")';
    $('.curlogo').css({ 'background-image': url, 'width': logo_width, 'height': logo_height, 'background-repeat': 'no-repeat' });
    $('.curlogo').next().text('current logo ' + logo_width + ' X ' + logo_height + '');
    global.lWith = logo_width, global.lHeight = logo_height, global.lUrl = url;
    $('#file_upload').uploadify({
        'uploader': prefix + '/uploadify/uploadify.swf',
        'script': prefix + '/uploadify/UploadLogo.ashx?rec_id=' + rec_id,
        'cancelImg': prefix + '/uploadify/cancel.png',
        'buttonText': 'Choose an image',
        'fileExt': '*.jpg;*.gif;*.png',
        'fileDesc': 'Web Image Files (.JPG, .GIF, .PNG)',
        'auto': true,
        'onAllComplete': function (event, data) {
            if (data.filesUploaded > 0) {
                $('.uldLogo').attr("src", "../Master/DomainLogo.aspx?rec_id=" + rec_id + "&templogo=" + Math.floor(Math.random() * 1001));
                $.ajax({
                    type: 'POST',
                    url: '../Master/DomainLogo.aspx?rec_id=' + rec_id + '&logosize=true',
                    dataType: "json",
                    error: function (request, status, exception) {
                        alert('error: ' + status.toString());
                    },
                    success: function (ret) {
                        if (ret.status == "OK")
                            showewLogo(ret.width, ret.height);
                        else
                            alert(ret.status);
                    }
                });
            };
            $('#btn_logo_upload').hide();
        }
    });
});
function showewLogo(width, height) {
    $('.uldLogo').next().text('image: ' + width + 'px X ' + height + 'px');
    logoWidth = Math.min(width, logoMaxWidth), logoHeight = Math.min(height, logoMaxHeight);
    url = 'url("../Master/DomainLogo.aspx?rec_id=' + rec_id + '&templogo=' + Math.floor(Math.random() * 1001) + '")';
    $('.newlogo').css({ 'background-image': url, 'width': logoWidth, 'height': logoHeight });
    $('.newlogo').next().text('new logo ' + logoWidth + 'px X ' + logoHeight + 'px');
    //sync
    $('#logo').css({ 'background-image': url, 'width': logoWidth, 'height': logoHeight });
    if ($('#logotoggle').is(':hidden')) {
        $('#logotoggle').show().mousedown(function () {
            $('#logo').css({ 'background-image': global.lUrl, 'width': global.lWidth, 'height': global.lHeight });
            $('body').mouseup(function () {
                $('#logo').css({ 'background-image': url, 'width': logoWidth, 'height': logoHeight });
                $('body').unbind('mouseup');
            });
        });
    };
}
function btn_save_logo_onclick() {
    if ($('.newlogo').css('background-image') == "none")
        return false;
    var data = {
        type: "logo",
        width: logoWidth + 'px',
        height: logoHeight + 'px'
    };
    $.ajax({
        type: 'POST',
        url: window.location.href,
        data: data,
        dataType: "json",
        error: function (request, status, exception) {
            alert('error: ' + status.toString());
        },
        success: function (ret) {
            if (ret.status == "OK")
                window.location = window.location;
            else
                alert(ret.status);
        }
    });
    return false;
}