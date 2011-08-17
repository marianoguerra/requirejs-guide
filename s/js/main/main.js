require(["libs/jquery-1.6.2",
        "libs/mustache",
        "text!main/tpls/greeting.mustache"],
    function(_, _, tGreet) {

        $(function() {
            $('h1:first').html("hello loaded");

            $("body").append(Mustache.to_html(tGreet, {place: "mousehouse", thing: "cheese"}));
        });
    }
);
