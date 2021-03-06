"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("./types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getSlideWidth = function getSlideWidth(count, wrapAround) {
  return "".concat(wrapAround ? 100 / (3 * count) : 100 / count, "%");
};

var getSlideStyles = function getSlideStyles(count, isCurrentSlide, isVisibleSlide, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight) {
  var width = getSlideWidth(count, wrapAround);
  var visibleSlideOpacity = isVisibleSlide ? 1 : 0;
  var animationSpeed = animation === 'fade' ? 200 : 500;
  return {
    width: width,
    flex: 1,
    height: adaptiveHeight ? '100%' : 'auto',
    padding: "0 ".concat(cellSpacing ? cellSpacing / 2 : 0, "px"),
    transition: animation ? "".concat(speed || animationSpeed, "ms ease 0s") : 'none',
    transform: "".concat(animation === 'zoom' ? "scale(".concat(isCurrentSlide ? 1 : zoomScale || 0.85, ")") : 'initial'),
    touchAction: 'none',
    opacity: animation === 'fade' ? visibleSlideOpacity : 1
  };
};

var isVisibleSlide = function isVisibleSlide(currentSlide, index, slidesToShow, cellAlign) {
  if (slidesToShow === 1) {
    return index === currentSlide;
  }

  if (cellAlign === _types.Alignment.Left) {
    return index < currentSlide + slidesToShow && index >= currentSlide;
  }

  if (cellAlign === _types.Alignment.Center) {
    return index >= currentSlide - slidesToShow / 2 && index <= currentSlide || index > currentSlide && index <= currentSlide + slidesToShow / 2;
  }

  if (cellAlign === _types.Alignment.Right) {
    return index <= currentSlide && index > currentSlide - slidesToShow;
  }

  return false;
};

var generateIndex = function generateIndex(index, count, typeOfSlide) {
  if (typeOfSlide === 'prev-cloned') {
    return index - count;
  }

  if (typeOfSlide === 'next-cloned') {
    return index + count;
  }

  return index;
};

var Slide = function Slide(_ref) {
  var count = _ref.count,
      children = _ref.children,
      currentSlide = _ref.currentSlide,
      index = _ref.index,
      isCurrentSlide = _ref.isCurrentSlide,
      typeOfSlide = _ref.typeOfSlide,
      wrapAround = _ref.wrapAround,
      cellSpacing = _ref.cellSpacing,
      animation = _ref.animation,
      speed = _ref.speed,
      slidesToShow = _ref.slidesToShow,
      zoomScale = _ref.zoomScale,
      cellAlign = _ref.cellAlign,
      setFrameHeight = _ref.setFrameHeight,
      frameHeight = _ref.frameHeight,
      visibleHeights = _ref.visibleHeights,
      adaptiveHeight = _ref.adaptiveHeight;
  var customIndex = wrapAround ? generateIndex(index, count, typeOfSlide) : index;
  var isVisible = isVisibleSlide(currentSlide, customIndex, slidesToShow, cellAlign);
  var slideRef = (0, _react.useRef)(null); // eslint-disable-next-line complexity

  (0, _react.useEffect)(function () {
    var node = slideRef.current;

    if (node) {
      var _node$getBoundingClie;

      var slideHeight = (_node$getBoundingClie = node.getBoundingClientRect()) === null || _node$getBoundingClie === void 0 ? void 0 : _node$getBoundingClie.height;

      if (isVisible) {
        node.removeAttribute('inert');
      } else {
        node.setAttribute('inert', 'true');
      }

      if (adaptiveHeight && isVisible && slidesToShow === 1) {
        if (slideHeight !== frameHeight) {
          setFrameHeight(slideHeight);
        }
      } else if (adaptiveHeight && isVisible && slidesToShow > 1) {
        visibleHeights.current = [].concat(_toConsumableArray(visibleHeights.current), [{
          height: slideHeight,
          slideIndex: customIndex
        }]);
      } else if (adaptiveHeight && !isVisible && visibleHeights.current.findIndex(function (v) {
        return v.slideIndex === customIndex;
      }) > -1) {
        visibleHeights.current = visibleHeights.current.filter(function (v) {
          return v.slideIndex !== customIndex;
        });
      }
    }
  }, [isVisible]);
  (0, _react.useEffect)(function () {
    if (adaptiveHeight && slidesToShow > 1) {
      var newFrameHeight = visibleHeights.current.reduce(function (acc, value) {
        if (acc >= value.height) {
          return acc;
        }

        return value.height;
      }, 0);

      if (newFrameHeight !== frameHeight) {
        setFrameHeight(newFrameHeight);
      }
    }
  }, [adaptiveHeight, visibleHeights.current]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: slideRef,
    className: "slide".concat(typeOfSlide ? " ".concat(typeOfSlide) : '').concat(isVisible ? ' slide-visible' : ''),
    style: getSlideStyles(count, isCurrentSlide, isVisible, wrapAround, cellSpacing, animation, speed, zoomScale, adaptiveHeight)
  }, children);
};

var _default = Slide;
exports.default = _default;