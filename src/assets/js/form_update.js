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
        var winReturn = floatStake * floatOdds
        var placeReturn = floatStake * floatOdds / 3 + floatStake
        var expectedReturn = winReturn + placeReturn
        $(".placeReturn").text(gbpFormat.format(placeReturn))
        $(".totalOutlay").text(gbpFormat.format(floatStake * 2))
    } else {
        var expectedReturn = floatStake * floatOdds
        $(".totalOutlay").text(gbpFormat.format(floatStake))
    }
    expectedReturn = expectedReturn + floatStake
    console.log([getRadio(), receiptOdds, stake, floatStake, floatOdds, expectedReturn])
    $(".betReturnValue").text(gbpFormat.format(expectedReturn))

}

const getQRCode = function (qrcode) {
    var receiptData = {
        "date": $(".date").first().text(),
        "receiptBetType": $(".receiptBetType").first().text(),
        "receiptRaceName": $(".receiptRaceName").first().text(),
        "receiptRaceTime": $(".receiptRaceTime").first().text(),
        "receiptRaceHorse": $(".receiptRaceHorse").first().text(),
        "receiptRaceOdds": $(".receiptRaceOdds").first().text(),
        "receiptStake": $(".receiptStake").first().text(),
        "betReturnValue": $(".betReturnValue").first().text(),
        "placeReturn": $(".placeReturn").first().text(),
        "totalOutlay": $(".totalOutlay").first().text()
    }
    var base64 = btoa(jQuery.param(receiptData))
    var urlData = window.location.href.split('?')[0].replace('index.html', '') + 'receipt.html?data=' + base64;
    console.log(urlData)
    $("#qrcode").empty()
    $("#receiptURL").text("Open");
    $("#receiptURL").attr("href", urlData);
    var qrcode = new QRCode(document.getElementById("qrcode"), urlData)
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
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