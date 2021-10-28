"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var division = /** @class */ (function () {
    function division() {
    }
    division.divisionNum = function (fromArray, resultArray, numOfRepeats, remainder, divider) {
        for (var i = 0; i <= numOfRepeats; i++) {
            if (fromArray[i] % divider == remainder) {
                resultArray.push(fromArray[i]);
            }
        }
        return resultArray;
    };
    division.NumToString = function (resultArray) {
        return resultArray.toString();
    };
    division.primeNumbers = function (fromArray, resultArray, numOfRepeats) {
        for (var i = 0; i <= numOfRepeats; i++) {
            var isPrime = true;
            for (var j = 2; j * j < fromArray[i]; j++) {
                if (fromArray[i] % j == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                resultArray.push(fromArray[i]);
            }
        }
        return resultArray;
    };
    return division;
}());
exports.default = division;
