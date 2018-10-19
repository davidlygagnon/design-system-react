"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _iconSettings = require("../../../../components/icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _button = require("../../../../components/button");

var _button2 = _interopRequireDefault(_button);

var _card = require("../../../../components/card");

var _card2 = _interopRequireDefault(_card);

var _empty = require("../../../../components/card/empty");

var _empty2 = _interopRequireDefault(_empty);

var _filter = require("../../../../components/card/filter");

var _filter2 = _interopRequireDefault(_filter);

var _dataTable = require("../../../../components/data-table");

var _dataTable2 = _interopRequireDefault(_dataTable);

var _column = require("../../../../components/data-table/column");

var _column2 = _interopRequireDefault(_column);

var _icon = require("../../../../components/icon");

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var sampleItems = [{
  name: 'Cloudhub'
}, {
  name: 'Cloudhub + Anypoint Connectors'
}, {
  name: 'Cloud City'
}];

var Example =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Example, _React$Component);

  function Example() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Example);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        items: sampleItems,
        isFiltering: false
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleFilterChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        var filteredItems = sampleItems.filter(function (item) {
          return RegExp(event.target.value, 'i').test(item.name);
        });

        _this.setState({
          isFiltering: true,
          items: filteredItems
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleDeleteAllItems", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          isFiltering: false,
          items: []
        });
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleAddItem", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.setState({
          items: sampleItems
        });
      }
    }), _temp));
  }

  _createClass(Example, [{
    key: "render",
    value: function render() {
      var isEmpty = this.state.items.length === 0;
      return _react2.default.createElement(_iconSettings2.default, {
        iconPath: "/assets/icons"
      }, _react2.default.createElement("div", {
        className: "slds-grid slds-grid_vertical"
      }, _react2.default.createElement(_card2.default, {
        id: "ExampleCard",
        filter: (!isEmpty || this.state.isFiltering) && _react2.default.createElement(_filter2.default, {
          onChange: this.handleFilterChange
        }),
        headerActions: !isEmpty && _react2.default.createElement(_button2.default, {
          label: "Delete All Items",
          onClick: this.handleDeleteAllItems
        }),
        heading: "Releated Items",
        icon: _react2.default.createElement(_icon2.default, {
          category: "standard",
          name: "document",
          size: "small"
        }),
        empty: isEmpty ? _react2.default.createElement(_empty2.default, {
          heading: "No Related Items"
        }, _react2.default.createElement(_button2.default, {
          label: "Add Item",
          onClick: this.handleAddItem
        })) : null
      }, _react2.default.createElement(_dataTable2.default, {
        items: this.state.items,
        id: "DataTableExample-1",
        bordered: true
      }, _react2.default.createElement(_column2.default, {
        label: "Opportunity Name",
        property: "name",
        truncate: true
      })))));
    }
  }]);

  return Example;
}(_react2.default.Component);

Object.defineProperty(Example, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'CardExample'
});
exports.default = Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime