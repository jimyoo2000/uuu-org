"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function CommonHeader(_a) {
    // const naviData = [
    //   {
    //     title: "Unimine",
    //     ref: "/",
    //   },
    //   {
    //     title: "UMI",
    //     ref: "/umi"
    //   },
    //   {
    //     title: "Pool",
    //     ref: "/pool",
    //     items: [
    //       {
    //         title: "Unisage",
    //         enable: true,
    //         ref: "/sage"
    //       },
    //       {
    //         title: "Liquidity Mining",
    //         enable: false,
    //         ref: "/pool"
    //       }, ,
    //       {
    //         title: "Custom Mining",
    //         enable: false,
    //         ref: "/pool"
    //       }]
    //   },
    //   {
    //     title: "Register",
    //     ref: "/register"
    //   }
    // ]
    var selectIndex = _a.selectIndex;
    var naviData = [
        {
            title: "Unimine",
            ref: "/"
        },
        {
            title: "Pool",
            ref: "/pool"
        },
        {
            title: "Unisage V2",
            ref: "/sagev2"
        },
        {
            title: "Register",
            ref: "/register"
        },
        {
            title: "Chrismas",
            ref: "/chrismas"
        }
    ];
    var _b = react_1.useState("g-head"), naviClassName = _b[0], setNaviClassName = _b[1];
    // const [showNavi, setShowNavi] = useState<boolean>(false);
    var toggleNavi = function () {
        if (naviClassName === 'g-head navShow')
            setNaviClassName("g-head");
        else
            setNaviClassName("g-head navShow");
    };
    var showNaviMenu = function (show) {
        if (show) {
            setNaviClassName("g-head navShow");
        }
        else {
            setNaviClassName("g-head");
        }
    };
    var clickItem = function (index) {
        showNaviMenu(false);
    };
    /**
              <li><Link to="/" className="name">HOME</Link></li>
             <li><Link to="/umi/" className="name">UMI Token</Link></li>
             <li><Link to="/fund/" className="name">Fund</Link></li>
             <li><Link to="/register/" className="name on">register</Link></li>
    */
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "g-headD" }),
        react_1["default"].createElement("div", { className: naviClassName },
            react_1["default"].createElement("div", { className: "wal" },
                react_1["default"].createElement("a", { className: "logo" }),
                react_1["default"].createElement("div", { className: "navA", onClick: function (e) {
                        // toggleNavi();
                        toggleNavi();
                    } }, " "),
                react_1["default"].createElement("div", { className: "g-nav" },
                    react_1["default"].createElement("ul", null, naviData.map(function (navi, index) {
                        return (react_1["default"].createElement("li", { key: index, onClick: function (e) {
                                clickItem(index);
                            } },
                            react_1["default"].createElement(react_router_dom_1.Link, { to: navi.ref, className: index === selectIndex ? "name on" : "name" }, navi.title)));
                    })))))));
}
;
exports["default"] = CommonHeader;
