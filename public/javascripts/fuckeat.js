(function (global, $, doc) {
    var Application = function () {
        this.initElements();
        this.initViewsEvent();
    }
    Application.Eles = {

    }
    Application.prototype = {
        constructor: Application,
        initElements: function () {
            var eles = Application.Eles;
            for (var name in eles) {
                if (eles.hasOwnProperty(name)) {
                    this['$' + name] = $(eles[name]);
                }
            }
        },
        genTemplate: function (name, price) {
            return ' <li class="list-group-item list-group-item-info">' + name + '：' + price + '元</li>'
        },
        showAlert: function (content) {
            $('.alert-tip').show().html(content);
            setTimeout(() => {
                $('.alert-tip').hide();
            }, 2000);
        },
        showLoading: function () {
            $('#load').show();
            $('.mask').show();
        },
        hideLoading: function () {
            $('#load').hide();
            $('.mask').hide();
        },
        renderMenu: function (res, people) {
            let _this = this;
            $('.menu-result').show();
            let discount = 8.4;
            let menuList = '';
            let totalPrice = 0;
            for (let cItem of res) {
                totalPrice += cItem.price;
                menuList += _this.genTemplate(cItem.name, cItem.price)
            }
            $('.list-group').html('');
            $('.list-group').append(menuList);
            $('.price').html(totalPrice);
            $('.discount').html(discount);
            let final = totalPrice * (discount / 10);
            $('.final').html(final.toFixed(1));
            let average = final / people;
            let oldAvg = totalPrice / people;
            let save = oldAvg - average
            $('.average').html(average.toFixed(1));
            $('.save').html(save.toFixed(1));
        },
        startCook: function () {
            let _this = this;
            $('.menu-result').hide();
            let oldNum = $('input').val().trim();
            if (oldNum.indexOf('.') > -1) {
                _this.showAlert('你是不把谁当人了？')
                return;
            }
            let people = parseInt($('input').val().trim())
            if (!people || people <= 0) {
                _this.showAlert('大兄弟，别闹！')
                return;
            }
            if (people > 20) {
                _this.showAlert('饭店不够你们坐的...')
                return;
            }
            _this.showLoading()
            $.post('/api/fuckeat', {
                amount: people
            }, function (res) {
                setTimeout(function () {
                    _this.hideLoading()
                    _this.renderMenu(res, people);
                }, 500)
            })

        },
        initViewsEvent: function () {
            var _this = this;
            $('.no-matter').on('click', function () {
                _this.startCook();
            })
            document.onkeydown = function (event) {
                var e = event || window.event;
                if (e && e.keyCode == 13) {
                    _this.startCook();
                }
            };
        },

    }
    $(function () {
        new Application();
    })
})(window, window.$, document);