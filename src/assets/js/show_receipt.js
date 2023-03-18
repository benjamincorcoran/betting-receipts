$(document).ready(function () {
    var base64 = new URL(window.location).searchParams.get("data");
    var decode = atob(base64);
    console.log(decode);

    (new URL("http://./?" + decode)).searchParams.forEach((x, y) =>
        $("." + y).text(x));
    (new URL("http://./?" + decode)).searchParams.forEach((x, y) =>
        console.log(x, y));

    if ($('.receiptBetType').text() == 'Each Way') {
        $(".placeReturnSection").css("display", "flex")
    }

})