
const luhnCheck = num => {
    let arr = (num + '')
        .split('')
        .reverse()
        .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    return sum % 10 === 0;
};

const expiryDateCheck = (month, year) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    console.log(currentMonth);
    console.log(new Date().getMonth())
    if (currentYear > year) {

        return false;
    }

    if (currentYear == year && month <= currentMonth) {

        return false;
    }

    return true;
}

const cvvCheck = (cvv, cardNumber) => {
    if (!cardNumber) {
        return;
    }
    const americanExpressFirstDigits = cardNumber.slice(0, 2);

    if (cvv.length < 3 || cvv.length > 4) {

        return false;
    } else if (
        cvv.length == 4 &&
        !(
            americanExpressFirstDigits == "34" ||
            americanExpressFirstDigits == "37"
        )
    ) {

        return false;
    } else if (
        cvv.length == 3 &&
        (americanExpressFirstDigits == "34" ||
            americanExpressFirstDigits == "37")
    ) {

        return false;
    }

    return true;
}


exports.luhnCheck = luhnCheck;
exports.expiryDateCheck = expiryDateCheck;
exports.cvvCheck = cvvCheck