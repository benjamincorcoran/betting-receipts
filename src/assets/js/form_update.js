const gbpFormat = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

const randomTransaction = function () {
    $("#transactionNumber").text(parseInt(Math.random().toString(16).slice(2), 16))
}

const getRadio = function () {
    if ($("#winRadio").is(":checked")) {
        return 'win';
    }

    else if ($("#eachWayRadio").is(":checked")) {
        return 'each';
    }
}

const updateBetType = function () {
    $("#winRadio").click(function () {
        $('.receiptBetType').text("To Win")
        $(".placeReturnSection").css("display", "none")
        updateReturn()
    })
    $("#eachWayRadio").click(function () {
        $('.receiptBetType').text("Each Way")
        $(".placeReturnSection").css("display", "flex")
        updateReturn()
    })
}

const updateReceiptData = function (dataItemName, format = "") {
    $('#' + dataItemName).keyup(function () {
        var enteredValue = $('#' + dataItemName).val();
        if (format == "gbp") {
            var formattedValue = gbpFormat.format(enteredValue)
        } else {
            var formattedValue = enteredValue
        }
        $(".receipt" + dataItemName.charAt(0).toUpperCase() + dataItemName.slice(1)).text(formattedValue);
    });
}

const updateReturn = function () {
    var receiptOdds = $('.receiptRaceOdds').text();
    var stake = $('.receiptStake').first().text();
    var floatStake = Number(stake.replace(/[^0-9.-]+/g, ""))
    var floatOdds = eval(receiptOdds.replace(":", "/"));
    console.log([getRadio(), receiptOdds, stake, floatStake, floatOdds, expectedReturn])
    if (getRadio() == "each") {
        var winReturn = floatStake / 2 * floatOdds
        var placeReturn = floatStake / 2 * floatOdds / 3 + floatStake
        var expectedReturn = winReturn + placeReturn
        $(".placeReturn").text(gbpFormat.format(placeReturn))
    } else {
        var expectedReturn = floatStake * floatOdds
    }
    expectedReturn = expectedReturn + floatStake
    console.log([getRadio(), receiptOdds, stake, floatStake, floatOdds, expectedReturn])
    $(".betReturnValue").text(gbpFormat.format(expectedReturn))

}

$(document).ready(function () {
    $('.date').text(moment().format('DD/MM/YYYY'))
    randomTransaction();
    updateReceiptData("raceName");
    updateReceiptData("raceTime");
    updateReceiptData("raceHorse");
    updateReceiptData("raceOdds");
    updateReceiptData("stake", format = "gbp");
    updateBetType();
    $('#stake').keyup(function () {
        updateReturn()
    })
    $('#raceOdds').keyup(function () {
        updateReturn()
    })
})