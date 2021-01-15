import moment from "moment";

export const getErrorMessage = (errObj) => {
    const errResponse = errObj.response;
    const errorMessage =
        errResponse && errResponse.data
            ? errResponse.data.message
            : "Something went Wrong Please try again";
    return errorMessage;
};

export const formatCurrency = (cash) => {
    const currency = "N";
    const money = cash
        ? cash
              .toFixed(2)
              .replace(/./g, (c, i, a) =>
                  i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c
              )
        : "0.00";
    return `${currency}${money}`;
};

export const formatNumber = (input) => {
    if (isNaN(parseFloat(input))) {
        return "0.00"; //if the input is invalid just set the value to 0.00
    }
    var num = parseFloat(input);
    return (num / 100).toFixed(2).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
    //move the decimal up to places return a X.00 format
};

export const getKeyValue = (keyCode) => {
    if (keyCode > 57) {
        //also check for numpad keys
        keyCode -= 48;
    }
    if (keyCode >= 48 && keyCode <= 57) {
        return String.fromCharCode(keyCode);
    }
};

export const SmartTime = (date) => {
    let dayInwords = moment(date).format("MMMM Do YYYY, h:mm a"); // June 12th 2020, 5:27:00 pm
    return dayInwords;
};
