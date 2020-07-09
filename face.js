var html = '';

$(function() {

    $('input[type=file]').after('<span id=\"image\"><\/span>');

    $('input[type=file]').change(function() {

        var subscriptionKey = "サブスクリプションID";

        var uriBase = "https://japaneast.api.cognitive.microsoft.com/face/v1.0/detect";

        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        var file = $(this).prop('files')[0];

        if (!file.type.match('image.*')) {
        $(this).val('');
        $('span').html('');
        return;
        }

        var reader = new FileReader();

        reader.onload = function() {
        var img_src = $('<br><img height=\"300\">').attr('src', reader.result);
        $('span').html(img_src);
        }
        reader.readAsDataURL(file);

        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",subscriptionKey);
            },
            type: "POST",
            data: file,
            processData: false,
        })
        .done(function(data) {
            var Smilescore = data["0"].faceAttributes.smile;
            console.log(Smilescore);
            var inputid = document.getElementById("Smilescore")
            inputid.innerHTML = "Smile Score=" + Smilescore;

        $("#responseTextArea").val(JSON.stringify(data, null, 2));

    })
    .fail(function() {
        alert("error");
    });
    });
});