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
    ChangeTheme()
    ChangeTheme()
}

function scroll()
{
    ChatContainer.scrollTop = PrevHeight - 100
}

function clearchat()
{
    document.getElementById("ChatContainer").innerHTML = ""
}

function PrintQuestion()
{
    BotReply = QuesList()
    ChatContainer = document.getElementById("ChatContainer");
    PrevHeight = ChatContainer.scrollHeight
    BotResponseText = '<div><p class="BotMessage">' + BotReply + '</p></div>'        
    document.getElementById("ChatContainer").innerHTML += BotResponseText
    BotResponseText = ""
    ChangeTheme()
    ChangeTheme()
    scroll()
}

let color = "p"
function ChangeTheme()
{
    if (color == "p")
    {

        document.getElementById("chat-bg-box").style.backgroundImage="linear-gradient(rgb(0, 40, 53), rgb(6, 0, 58))";
        document.getElementById("Heading").style.backgroundColor= "rgb(13, 15, 43)";
        document.getElementById("text-input-box-background").style.backgroundColor= "rgb(13, 15, 43)";
        // document.getElementsById("image").style.backgroundColor= "rgb(13, 15, 43)" ;
        // document.getElementsById("table").style.backgroundColor= "rgb(13, 15, 43)" 

        BotMessages = document.getElementsByClassName("BotMessage")
        for (i=0; i<BotMessages.length; i++)
        {
            BotMessages[i].style.backgroundColor= "rgb(13, 15, 43)"
        }

        UserMessages = document.getElementsByClassName("UserMessage");
        for (i=0; i<UserMessages.length; i++)
        {
            UserMessages[i].style.backgroundColor= "rgb(78, 129, 135)"
        }

        color = "b"
        return
    }
    
    if (color == "b")
    {
        document.getElementById("chat-bg-box").style.backgroundImage="linear-gradient(rgb(51, 7, 60), rgb(2, 4, 40))";
        document.getElementById("Heading").style.backgroundColor= "rgb(60, 20, 84)";
        document.getElementById("text-input-box-background").style.backgroundColor= "rgb(60, 20, 84)";
        
        BotMessages = document.getElementsByClassName("BotMessage")
        for (i=0; i<BotMessages.length; i++)
        {
            BotMessages[i].style.backgroundColor= "rgb(167, 116, 177)"
        }

        UserMessages = document.getElementsByClassName("UserMessage");
        for (i=0; i<UserMessages.length; i++)
        {
            UserMessages[i].style.backgroundColor= "rgb(174, 107, 195)"
        }

        color = "p"
        return
    }


    
}



KEYS=[]
function GetBotResponse()
{
    ChatContainer = document.getElementById("ChatContainer");
    PrevHeight = ChatContainer.scrollHeight
    BotResponseText = ""
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
        BotResponseText += "</table> </div >"
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
    ChangeTheme()
    ChangeTheme()
    scroll()
}






