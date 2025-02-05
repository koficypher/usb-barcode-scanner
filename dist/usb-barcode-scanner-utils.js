"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_hid_1 = require("node-hid");
var lodash_1 = __importDefault(require("lodash"));
function getDevices() {
    return node_hid_1.devices();
}
exports.getDevices = getDevices;
function getDevice(vendorId, productId) {
    return lodash_1.default.find(getDevices(), { 'vendorId': vendorId, 'productId': productId });
}
exports.getDevice = getDevice;
function getDeviceByPath(path) {
    return lodash_1.default.find(getDevices(), { 'path': path });
}
exports.getDeviceByPath = getDeviceByPath;
function defaultHidMap() {
    return {
        4: "A",
        5: "B",
        6: "C",
        7: "D",
        8: "E",
        9: "F",
        10: "G",
        11: "H",
        12: "I",
        13: "J",
        14: "K",
        15: "L",
        16: "M",
        17: "N",
        18: "O",
        19: "P",
        20: "Q",
        21: "R",
        22: "S",
        23: "T",
        24: "U",
        25: "V",
        26: "W",
        27: "X",
        28: "Y",
        29: "Z",
        30: "1",
        31: "2",
        32: "3",
        33: "4",
        34: "5",
        35: "6",
        36: "7",
        37: "8",
        38: "9",
        39: "0",
        40: "enter",
        43: "\t",
        44: " ",
        45: "-",
        46: "=",
        47: "[",
        48: "]",
        49: "\\",
        51: ";",
        52: "'",
        53: "`",
        54: ",",
        55: ".",
        56: "/",
        85: "*",
        87: "+"
    };
}
exports.defaultHidMap = defaultHidMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNiLWJhcmNvZGUtc2Nhbm5lci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91c2ItYmFyY29kZS1zY2FubmVyLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQTJDO0FBQzNDLGtEQUF1QjtBQUV2QjtJQUNJLE9BQU8sa0JBQU8sRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFGRCxnQ0FFQztBQUVELG1CQUEwQixRQUFnQixFQUFFLFNBQWlCO0lBQ3pELE9BQU8sZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFGRCw4QkFFQztBQUVELHlCQUFnQyxJQUFZO0lBQ3hDLE9BQU8sZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRkQsMENBRUM7QUFFRDtJQUNJLE9BQU87UUFDSCxDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztRQUNQLEVBQUUsRUFBRSxHQUFHO1FBQ1AsRUFBRSxFQUFFLEdBQUc7UUFDUCxFQUFFLEVBQUUsR0FBRztLQUNWLENBQUE7QUFDTCxDQUFDO0FBdkRELHNDQXVEQyJ9