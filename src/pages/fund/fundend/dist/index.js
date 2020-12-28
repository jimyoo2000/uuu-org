"use strict";
exports.__esModule = true;
var react_1 = require("react");
function Fundend() {
    /**
     * <script type="text/javascript">
            $(function () {
              run('2020/11/18 00:00:00');
  
          function run(enddate) {
              setInterval(function () {
                dateDif(new Date(enddate).getTime())
              }, 1000)
            }
  
          function dateDif(enddate) {
              var date = enddate - new Date().getTime();
              var days = date / 1000 / 60 / 60 / 24;
              var daysRound = Math.floor(days);
              var hours = date / 1000 / 60 / 60 - (24 * daysRound);
              var hoursRound = Math.floor(hours);
              var minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
              var minutesRound = Math.floor(minutes);
              var seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
              var secondsRound = Math.floor(seconds);
              $("#day").text(daysRound);
              $("#hour").text(hoursRound);
              $("#minute").text(minutesRound);
              $("#second").text(secondsRound);
          }
      })
  </script>
     */
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "wal index-1" },
            react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                react_1["default"].createElement("em", null, "Fund"),
                react_1["default"].createElement("div", null, "Unimine Cryptocurrency Sales Start in:")),
            react_1["default"].createElement("div", { className: "list" },
                react_1["default"].createElement("ul", { className: "wow fadeInUp" },
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("b", { id: "day" }, "00"),
                        react_1["default"].createElement("div", null, "Days")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("b", { id: "hour" }, "00"),
                        react_1["default"].createElement("div", null, "Hours")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("b", { id: "minute" }, "00"),
                        react_1["default"].createElement("div", null, "Mins")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement("b", { id: "second" }, "00"),
                        react_1["default"].createElement("div", null, "Secs"))),
                react_1["default"].createElement("p", { className: "wow fadeInUp" }, "Get 100.00 UMI per Ether,and only 0.5 million UMI will be issued during sales.")),
            react_1["default"].createElement("div", { className: "msg wow fadeInUp" },
                react_1["default"].createElement("div", { className: "ico" },
                    react_1["default"].createElement("img", { src: "/assets/image/img85.png", alt: "" })),
                react_1["default"].createElement("p", null, "Install Ethereum wallet to purchase UMI cryptocurrency."),
                react_1["default"].createElement("p", null,
                    "It\u2019s recommended to use: ",
                    react_1["default"].createElement("a", { href: "" }, "Metamask"),
                    "(Chrome extension & Firefox extension), ",
                    react_1["default"].createElement("a", { href: "" }, "imToken"),
                    ",",
                    react_1["default"].createElement("a", { href: "" }, "Trustwallet"),
                    ",",
                    react_1["default"].createElement("a", { href: "" }, "Coinbase"),
                    " etc."))),
        react_1["default"].createElement("div", { className: "wal index-2" },
            react_1["default"].createElement("div", { className: "img wow fadeInUp" },
                react_1["default"].createElement("img", { src: "/assets/image/logo_single.png", alt: "" })),
            react_1["default"].createElement("div", { className: "col" },
                react_1["default"].createElement("div", { className: "title wow fadeInUp" },
                    react_1["default"].createElement("em", null, "About"),
                    react_1["default"].createElement("div", null, "What do we do?")),
                react_1["default"].createElement("div", { className: "content wow fadeInUp" }, "Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain.Unimine is the best platform to get started mining cryptocurrency. It is the easiest platform for beginners to easily get into Blockchain."),
                react_1["default"].createElement("div", { className: "btn wow fadeInUp" },
                    react_1["default"].createElement("a", { href: "" },
                        react_1["default"].createElement("em", null, "ABOUT UMI-Token"),
                        react_1["default"].createElement("img", { src: "/assets/image/img20.png", alt: "" })))))));
}
exports["default"] = Fundend;
