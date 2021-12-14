$("#pop-up").fadeOut(0); 

$("#report-btn").click(function() {
    $("#pop-up").fadeIn(1000); 
});

$("#send-report").click(function() {

    let id_post = document.getElementById("send-btn").className
    let radio_buttons = document.getElementsByClassName("type-report")
    let i = 0
    for(; i < radio_buttons[i].checked; i++);

    let comment_content = document.getElementById("comment").value
    if(comment == '')
      comment = null;

    let payload = {
        id_post: id_post,
        id_type_report: radio_buttons[i].value,
        comment: comment_content
    }

    console.log(payload)

    fetch("/report",
    {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .catch(e => console.log('Error', e))

    $("#pop-up").fadeOut(1500); 
    clean_data();
});

$("#close-button").click(function() {
    $("#pop-up").fadeOut(400); 
    clean_data()
});

function clean_data()
{
    document.getElementById("comment").value = ""
    let radio_buttons = document.getElementsByClassName("type-report")
    for(let i = 0; i < radio_buttons.length; i++)
        radio_buttons[i].checked = false;
}
