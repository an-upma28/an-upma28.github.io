window.onload = function() {
    if (document.getElementById("UserTextInput")==null) {
        console.log("iss da null")
    }
    
    document.getElementById("UserTextInput").addEventListener("keypress", function (event) {
        if (event.keyCode == 13) 
        {
           GetUserMessage()    
           GetBotResponse()
        }
     });
    
}

function GetUserMessage()
{
    InputText = (document.getElementById("UserTextInput").value);
    document.getElementById("UserTextInput").value=""

    UserMessageText = "<div><p class='UserMessage'><span>" + InputText + "</span></p></div>";

    document.getElementById("ChatContainer").innerHTML+=UserMessageText;

    chatHistory = document.getElementById('ChatContainer');
    chatHistory.scrollTop = chatHistory.scrollHeight  ;


}

function scroll()
{
    chatHistory = document.getElementById('ChatContainer');
        var PrevScrollHeight = chatHistory.scrollHeight
        console.log(PrevScrollHeight)
        chatHistory.scrollTop = PrevScrollHeight 
}

function clearchat()
{
    console.log("Retriveed old chat")

    document.getElementById("ChatContainer").innerHTML = ""
}

function PrintQuestion()
{
    BotReply = QuesList()
        BotResponseText = '<div><p class="BotMessage">' + BotReply + '</p></div>'
        document.getElementById("ChatContainer").innerHTML += BotResponseText;
        BotResponseText = ""
        scroll()
}



KEYS=[]
function GetBotResponse()
{
    PrevScrollHeight = chatHistory.scrollHeight
    BotResponseText = ""
    console.log(InputText)
    if (KEYS.includes("BotQues")) 
    {
        if (Yes.includes(InputText))
        {
            if (BotReply.BotQues[1] == "redirect")
            {
                InputText = BotReply.BotQues[2]
            }
            if (BotReply.BotQues[1] == "video")
            {
                BotResponseText = '<div class="image"><video  width="95%" controls source src="' + BotReply.BotQues[2] + '" type="video"></video></div>'
                document.getElementById("ChatContainer").innerHTML += BotResponseText;
                scroll()
                return
            }
        }

        if (No.includes(InputText))
        {
            BotResponseText = '<div><p class="BotMessage">' + 'Alright! I hope that was clear. Is there anything else i can help you with?' + '</p></div>'
            document.getElementById("ChatContainer").innerHTML += BotResponseText;
            scroll()
            return
        }
    }
    

    if (InputText == "view questions")
    {
        PrintQuestion()
        scroll()
        return
    }

    BotReply = BotResponse(InputText)
    KEYS = Object.keys(BotReply)
    console.log(KEYS)


    if (KEYS.includes("answer"))
    {
        BotResponseText += '<div><p class="BotMessage">' + BotReply.answer + '</p></div>'
    }

    if (KEYS.includes("image"))
    {
        BotResponseText +=  "<div class='image'> <img src='"+ BotReply.image + "' width='90%' padding:5%></div>"
    }


    if (KEYS.includes("table"))
    {
        BotResponseText += "<div class='table' > <table> <tr> <th style= 'width:50%'>";
        BotResponseText +=  BotReply.table[0][0] + "</th> <th>" + BotReply.table[1][0] + "</th> </tr>" ;
        for ( let index=1; index < BotReply.table[0].length; index++)
        {
            BotResponseText += "<tr><td>" + BotReply.table[0][index] + "</td> <td>" +  BotReply.table[1][index] + "</td></tr>"
        }
        BotResponseText += "<table> <div class='table' >"
    }

    if (KEYS.includes("video"))
    {
        BotResponseText += '<div class="image"><video  width="95%" controls source src="' + BotReply.video + '" type="video"></video></div>'
       
    }

    if (KEYS.includes("BotQues"))
    {
        BotResponseText += '<div><p class="BotMessage">' + BotReply.BotQues[0] + '</p></div>'
    }

    document.getElementById("ChatContainer").innerHTML += BotResponseText;
    scroll()

    // chatHistory.scrollTop = PrevScrollHeight + 0.6 * chatHistory.scrollHeight
}






