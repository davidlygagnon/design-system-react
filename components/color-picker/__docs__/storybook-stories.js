"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _colorPicker = require("../../color-picker");

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var HEX_REGEX_6_DIGITS = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

var handleChange = function handleChange(event, data) {
  var dataAsArray = Object.keys(data).map(function (key) {
    return data[key];
  });
  (0, _react3.action)('onChange').apply(void 0, [event, data].concat(_toConsumableArray(dataAsArray)));
};

var customOuterInputValidator = function customOuterInputValidator(hex) {
  return !hex || HEX_REGEX_6_DIGITS.test(hex);
};

(0, _react3.storiesOf)(_constants.COLOR_PICKER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around_medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('Default', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    }
  });
}).add('Custom Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    variant: "custom"
  });
}).add('Swatch Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    variant: "swatches"
  });
}).add('Predefined Colors', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    value: "#000000",
    events: {
      onChange: handleChange
    },
    swatchColors: ['', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
  });
}).add('Predefined Colors Only', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    value: "#000000",
    events: {
      onChange: handleChange
    },
    swatchColors: ['', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'],
    variant: "swatches"
  });
}).add('Hidden Input', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    hideInput: true
  });
}).add('Custom Tab Selected', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    defaultSelectedTab: "custom"
  });
}).add('Outer Input in Error State', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    value: "#invalid",
    events: {
      onChange: handleChange
    },
    errorText: "Hex is invalid. Please correct this field."
  });
}).add('Working Color Input in Error State', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    events: {
      onChange: handleChange
    },
    errorTextWorkingColor: "Hex is invalid. Please correct this field."
  });
}).add('Custom Validator', function () {
  return (// Example of a custom validator that support hex color with strictly 6 digits.
    _react2.default.createElement(_colorPicker2.default, {
      events: {
        onChange: handleChange,
        onValidateColor: customOuterInputValidator,
        onValidateWorkingColor: customOuterInputValidator
      }
    })
  );
}).add('Color Picker Disabled', function () {
  return _react2.default.createElement(_colorPicker2.default, {
    disabled: true
  });
});