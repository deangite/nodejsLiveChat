$(document).ready(function(){
    $('.upload-btn').on('click', function(){
        $('#upload-input').click()
    })

    $('#upload-input').on('change', function(){
        var uploadInput = $('#upload-input')
        if(uploadInput.val() != ''){
            var formData = new FormData(); // Currently empty
            formData.append('upload', uploadInput[0].files[0])
            $.ajax({
                url: '/uploadFile',
                type: "POST", //ADDED THIS LINE
                data: formData,
                processData: false,
                contentType: false,
                success: function(){
                    uploadInput.val('')
                }
            })
        }
    })
})