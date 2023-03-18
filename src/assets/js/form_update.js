const gbpFormat = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })

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
    console.log([receiptOdds, stake, floatStake, floatOdds])
    var expectedReturn = floatStake * floatOdds
    $(".betReturnValue").text(gbpFormat.format(expectedReturn))

}

$(document).ready(function () {
    $('.date').text(moment().format('DD/MM/YYYY'))
    updateReceiptData("raceName");
    updateReceiptData("raceTime");
    updateReceiptData("raceHorse");
    updateReceiptData("raceOdds")
    updateReceiptData("stake", format = "gbp")
    $('#stake').keyup(function () {
        updateReturn()
    })
    $('#raceOdds').keyup(function () {
        updateReturn()
    })
})