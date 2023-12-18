var map = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];//to know wether a box is empty or not
var color_picker = ["","#E7BCDE","#D80032","#54B435","#FF8400","#781C68","#A10035","#1A5D1A","#F4CE14","#D83F31","#3E001F","#5C8374","#3E001F","#D864A9","#FF0060","#125B50"];



function score_updater(value){
    var score = Number($("h2").text());
    score = score+value;
    $("h2").text(score);
}


function gameover(){
    var value =[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];// to know the integer value in the box;
    var i =0;
    var j =0;
    $('.box').each(function(index) {
        let textContent = Number($(this).text());
        value[i][j]=textContent;
        j++;
        if(j===4){
            i++;
            j=0;
        }
    });
    
    var flag=true;

    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(value[i][j-1]===value[i][j]){
                flag =false;
            }
        }
    }

    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(value[j-1][i]===value[j][i]){
                flag =false;
            }
        }
    }
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(value[i][j]===0){
                flag = false;
            }
        }
    }
    if(flag){
       $(".game-over").css("z-index","100");
    }
}




$("button").click(function(){
    location.reload();
})












//the random 2 generator
function random_generator(){
    //search wetther is there any block which is empty
    var flag = true;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(map[i][j]===0)flag=false;
        }
    }
    if(flag)gameover();
    else{
        var i = Math.floor(Math.random()*4);
        var j = Math.floor(Math.random()*4);
        while(map[i][j]===1){
            i = Math.floor(Math.random()*4);
            j = Math.floor(Math.random()*4);
        }
        // now i and j are the indices of a empty box
        var s = ".row-"+i+"-"+j;
        $(s).css('background-color',"#113946");
        var t = ".row-"+i+"-"+j+">h4";
        $(t).text("2");
        map[i][j]=1;
    }
}
//function to get the index of color_picker array
function color_index(value){
    var i=0;
    while(value!==1){
        i++;
        value = value/2;
    }
    return color_picker[i];
}
//when the code is run in the begining 2 blocks will be there
random_generator();
random_generator();


$(document).keydown(function(e) {
    // Check for arrow key presses
    switch(e.which) {
        case 37: // Left arrow key
            // Your code for handling left arrow key press
            
            var v1=left_shifter(1);
            var v2=left_shifter(2);
            var v3=left_shifter(0);
            var v4=left_shifter(3);
            if(v1||v2||v3||v4){
                random_generator();
            }
            gameover();
            break;
        case 38: // Up arrow key
            // Your code for handling up arrow key press
            
            var v1=up_shifter(0);
            var v2=up_shifter(1);
            var v3=up_shifter(2);
            var v4=up_shifter(3);
            if(v1||v2||v3||v4){
                random_generator();
            }
            gameover();
            break;
        case 39: // Right arrow key
            // Your code for handling right arrow key press
           
            var v1=right_shifter(0);
            var v2=right_shifter(1);
            var v3=right_shifter(2);
            var v4=right_shifter(3);
            if(v1||v2||v3||v4){
                random_generator();
            }
            gameover();
            break;
        case 40: // Down arrow key
            // Your code for handling down arrow key press
            
            var v1 = down_shifter(0);
            var v2 = down_shifter(1);
            var v3 = down_shifter(2);
            var v4 = down_shifter(3);
            if(v1||v2||v3||v4){
                random_generator();
            }
            gameover();
            break;
        default:
            // Do nothing for other keys
            break;
    }
});


//right shifter
function right_shifter(row){
    var flag = true;
    var movement = false;

    //for row two
    if(map[row][2]===1&&map[row][3]===0){
        var currbox = ".row-"+row+"-"+2;
        var nextbox = ".row-"+row+"-"+3;
        var kalar =  $(currbox).css('background-color');
        var currtext = ".row-"+row+"-"+2+">h4";
        var nexttext = ".row-"+row+"-"+3+">h4";
        
        $(currbox).css('background-color',"transparent");
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        map[row][3]=1;
        map[row][2]=0;
        movement=true;
    }
    else if(map[row][2]===1&&map[row][3]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+2+">h4";
        var nexttext = ".row-"+row+"-"+3+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+row+"-"+2;
            var nextbox = ".row-"+row+"-"+3;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            map[row][3]=1;
            map[row][2]=0;
            score_updater(sum);
            movement=true;
        }
    }


    //for row one
    if(map[row][1]===1&&map[row][2]===0){
        //shift kar do or aage check karo
        var currbox = ".row-"+row+"-"+1;
        var nextbox = ".row-"+row+"-"+2;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+row+"-"+1+">h4";
        var nexttext = ".row-"+row+"-"+2+">h4";
        $(nexttext).text($(currtext).text());
        $(currtext).text("");
        map[row][2]=1;
        map[row][1]=0;
        movement=true;

        //call for row-two
        if(map[row][2]===1&&map[row][3]===0){
            var currbox = ".row-"+row+"-"+2;
            var nextbox = ".row-"+row+"-"+3;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+row+"-"+2+">h4";
            var nexttext = ".row-"+row+"-"+3+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[row][3]=1;
            map[row][2]=0;
            movement=true;
        }
        else if(map[row][2]===1&&map[row][3]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+row+"-"+2+">h4";
            var nexttext = ".row-"+row+"-"+3+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+row+"-"+2;
                var nextbox = ".row-"+row+"-"+3;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[row][3]=1;
                map[row][2]=0;
                score_updater(sum);
                movement=true;
            }
        }
    }
    else if(map[row][1]===1&&map[row][2]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+1+">h4";
        var nexttext = ".row-"+row+"-"+2+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;


            var currbox = ".row-"+row+"-"+1;
            var nextbox = ".row-"+row+"-"+2;
            var kalar =  color_index(sum);
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[row][2]=1;
            map[row][1]=0;
            score_updater(sum);
            movement=true;
        }
    }
    //for row zero
    if(map[row][0]===1&&map[row][1]===0){
        //box box 0 ko 1 pe daal do fir 1 ke liye aage check kar lo
        var currbox = ".row-"+row+"-"+0;
        var nextbox = ".row-"+row+"-"+1;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+row+"-"+0+">h4";
        var nexttext = ".row-"+row+"-"+1+">h4";
        $(nexttext).text($(currtext).text());
        $(currtext).text("");
        map[row][1]=1;
        map[row][0]=0;
        movement=true;

        //aage ke liye check
        if(map[row][1]===1&&map[row][2]===0){
            //shift kar do or aage check karo
            var currbox = ".row-"+row+"-"+1;
            var nextbox = ".row-"+row+"-"+2;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+row+"-"+1+">h4";
            var nexttext = ".row-"+row+"-"+2+">h4";
            $(nexttext).text($(currtext).text());
            $(currtext).text("");
            map[row][2]=1;
            map[row][1]=0;
            movement=true;
    
            //call for row-two
            if(map[row][2]===1&&map[row][3]===0){
                var currbox = ".row-"+row+"-"+2;
                var nextbox = ".row-"+row+"-"+3;
                var kalar =  $(currbox).css('background-color');
                $(nextbox).css("background-color",kalar);
                $(currbox).css('background-color',"transparent");
                var currtext = ".row-"+row+"-"+2+">h4";
                var nexttext = ".row-"+row+"-"+3+">h4";
                var txtvalue = $(currtext).text();
                $(nexttext).text(txtvalue);
                $(currtext).text("");
                map[row][3]=1;
                map[row][2]=0;
                movement=true;
            }
            else if(map[row][2]===1&&map[row][3]===1){
                //check karo agar dono me same value hai kya
                var currtext = ".row-"+row+"-"+2+">h4";
                var nexttext = ".row-"+row+"-"+3+">h4";
                if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                    //values same hai add kar ke pichla box khali kar do
                    flag = false; //mark kar do
                    var sum = (Number($(currtext).text()))*2;
                    var currbox = ".row-"+row+"-"+2;
                    var nextbox = ".row-"+row+"-"+3;
                    var kalar =  color_index(sum);
                    $(nextbox).css('background-color',kalar);
                    $(currbox).css('background-color',"transparent");
                    $(nexttext).text(sum);
                    $(currtext).text("");
                    map[row][3]=1;
                    map[row][2]=0;
                    score_updater(sum);
                    movement=true;
                }
            }
        }
        else if(map[row][1]===1&&map[row][2]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+row+"-"+1+">h4";
            var nexttext = ".row-"+row+"-"+2+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
    
    
                var currbox = ".row-"+row+"-"+1;
                var nextbox = ".row-"+row+"-"+2;
                var kalar =  color_index(sum);
                $(nextbox).css("background-color",kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[row][2]=1;
                map[row][1]=0;
                score_updater(sum);
                movement=true;
            }
        }
        
    }
    else if(map[row][0]===1&&map[row][1]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+0+">h4";
        var nexttext = ".row-"+row+"-"+1+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;


            var currbox = ".row-"+row+"-"+0;
            var nextbox = ".row-"+row+"-"+1;
            var kalar =  color_index(sum);
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[row][1]=1;
            map[row][0]=0;
            score_updater(sum);
            movement=true;
        }
    }
    return movement;
}


//left shifter

function left_shifter(row){
    var flag = true;
    var movement = false;
    //check for 1 index
    if(map[row][1]===1&&map[row][0]===0){
        var currbox = ".row-"+row+"-"+1;
        var nextbox = ".row-"+row+"-"+0;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+row+"-"+1+">h4";
        var nexttext = ".row-"+row+"-"+0+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[row][0]=1;
        map[row][1]=0;
        movement = true;
    }
    else if(map[row][1]===1&&map[row][0]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+1+">h4";
        var nexttext = ".row-"+row+"-"+0+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+row+"-"+1;
            var nextbox = ".row-"+row+"-"+0;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[row][0]=1;
            map[row][1]=0;
            score_updater(sum);
            movement = true;
        }
    }

    //check for inde 2
    if(map[row][2]===1&&map[row][1]===0){
        var currbox = ".row-"+row+"-"+2;
        var nextbox = ".row-"+row+"-"+1;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+row+"-"+2+">h4";
        var nexttext = ".row-"+row+"-"+1+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[row][1]=1;
        map[row][2]=0;
        movement = true;

        //now check for 1 index
        if(map[row][1]===1&&map[row][0]===0){
            var currbox = ".row-"+row+"-"+1;
            var nextbox = ".row-"+row+"-"+0;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+row+"-"+1+">h4";
            var nexttext = ".row-"+row+"-"+0+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[row][0]=1;
            map[row][1]=0;
            movement = true;
        }
        else if(map[row][1]===1&&map[row][0]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+row+"-"+1+">h4";
            var nexttext = ".row-"+row+"-"+0+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+row+"-"+1;
                var nextbox = ".row-"+row+"-"+0;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[row][0]=1;
                map[row][1]=0;
                score_updater(sum);
                movement = true;
            }
        }
    }
    else if(map[row][2]===1&&map[row][1]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+2+">h4";
        var nexttext = ".row-"+row+"-"+1+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+row+"-"+2;
            var nextbox = ".row-"+row+"-"+1;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[row][1]=1;
            map[row][2]=0;
            score_updater(sum);
            movement = true;
        }
    }

    //check for 3
    if(map[row][3]===1&&map[row][2]===0){
        var currbox = ".row-"+row+"-"+3;
        var nextbox = ".row-"+row+"-"+2;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+row+"-"+3+">h4";
        var nexttext = ".row-"+row+"-"+2+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[row][2]=1;
        map[row][3]=0;
        movement = true;

        //now check for index 2
        if(map[row][2]===1&&map[row][1]===0){
            var currbox = ".row-"+row+"-"+2;
            var nextbox = ".row-"+row+"-"+1;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+row+"-"+2+">h4";
            var nexttext = ".row-"+row+"-"+1+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[row][1]=1;
            map[row][2]=0;
            movement = true;
    
            //now check for 1 index
            if(map[row][1]===1&&map[row][0]===0){
                var currbox = ".row-"+row+"-"+1;
                var nextbox = ".row-"+row+"-"+0;
                var kalar =  $(currbox).css('background-color');
                $(nextbox).css("background-color",kalar);
                $(currbox).css('background-color',"transparent");
                var currtext = ".row-"+row+"-"+1+">h4";
                var nexttext = ".row-"+row+"-"+0+">h4";
                var txtvalue = $(currtext).text();
                $(nexttext).text(txtvalue);
                $(currtext).text("");
                map[row][0]=1;
                map[row][1]=0;
                movement = true;
            }
            else if(map[row][1]===1&&map[row][0]===1){
                //check karo agar dono me same value hai kya
                var currtext = ".row-"+row+"-"+1+">h4";
                var nexttext = ".row-"+row+"-"+0+">h4";
                if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                    //values same hai add kar ke pichla box khali kar do
                    flag = false; //mark kar do
                    var sum = (Number($(currtext).text()))*2;
                    var currbox = ".row-"+row+"-"+1;
                    var nextbox = ".row-"+row+"-"+0;
                    var kalar =  color_index(sum);
                    $(nextbox).css('background-color',kalar);
                    $(currbox).css('background-color',"transparent");
                    $(nexttext).text(sum);
                    $(currtext).text("");
                    map[row][0]=1;
                    map[row][1]=0;
                    score_updater(sum);
                    movement = true;
                }
            }
        }
        else if(map[row][2]===1&&map[row][1]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+row+"-"+2+">h4";
            var nexttext = ".row-"+row+"-"+1+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+row+"-"+2;
                var nextbox = ".row-"+row+"-"+1;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[row][1]=1;
                map[row][2]=0;
                score_updater(sum);
                movement = true;
            }
        }
    }
    else if(map[row][3]===1&&map[row][2]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+row+"-"+3+">h4";
        var nexttext = ".row-"+row+"-"+2+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+row+"-"+3;
            var nextbox = ".row-"+row+"-"+2;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[row][2]=1;
            map[row][3]=0;
            score_updater(sum);
            movement = true;
        }
    }
    return movement;
}


//down shifter
function down_shifter(col){
    //check for 2 row
    var flag = true;
    var movement = false;



    if(map[2][col]===1&&map[3][col]===0){
        var currbox = ".row-"+2+"-"+col;
        var nextbox = ".row-"+3+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+2+"-"+col+">h4";
        var nexttext = ".row-"+3+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[3][col]=1;
        map[2][col]=0;
        movement =true;
    }
    else if(map[2][col]===1&&map[3][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+2+"-"+col+">h4";
        var nexttext = ".row-"+3+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+2+"-"+col;
            var nextbox = ".row-"+3+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[3][col]=1;
            map[2][col]=0;
            score_updater(sum);
            movement =true;
        }
    }

    //check for row 1

    if(map[1][col]===1&&map[2][col]===0){
        var currbox = ".row-"+1+"-"+col;
        var nextbox = ".row-"+2+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+1+"-"+col+">h4";
        var nexttext = ".row-"+2+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[2][col]=1;
        map[1][col]=0;
        movement =true;


        //now check for 2
        if(map[2][col]===1&&map[3][col]===0){
            var currbox = ".row-"+2+"-"+col;
            var nextbox = ".row-"+3+"-"+col;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+2+"-"+col+">h4";
            var nexttext = ".row-"+3+"-"+col+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[3][col]=1;
            map[2][col]=0;
            movement =true;
        }
        else if(map[2][col]===1&&map[3][col]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+2+"-"+col+">h4";
            var nexttext = ".row-"+3+"-"+col+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+2+"-"+col;
                var nextbox = ".row-"+3+"-"+col;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[3][col]=1;
                map[2][col]=0;
                score_updater(sum);
                movement =true;
            }
        }
    }
    else if(map[1][col]===1&&map[2][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+1+"-"+col+">h4";
        var nexttext = ".row-"+2+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+1+"-"+col;
            var nextbox = ".row-"+2+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[2][col]=1;
            map[1][col]=0;
            score_updater(sum);
            movement =true;
        }
    }


    //check for 0
    if(map[0][col]===1&&map[1][col]===0){
        var currbox = ".row-"+0+"-"+col;
        var nextbox = ".row-"+1+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+0+"-"+col+">h4";
        var nexttext = ".row-"+1+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[1][col]=1;
        map[0][col]=0;
        movement =true;


        //now check for 1
        if(map[1][col]===1&&map[2][col]===0){
            var currbox = ".row-"+1+"-"+col;
            var nextbox = ".row-"+2+"-"+col;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+1+"-"+col+">h4";
            var nexttext = ".row-"+2+"-"+col+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[2][col]=1;
            map[1][col]=0;
            movement =true;
    
    
            //now check for 2
            if(map[2][col]===1&&map[3][col]===0){
                var currbox = ".row-"+2+"-"+col;
                var nextbox = ".row-"+3+"-"+col;
                var kalar =  $(currbox).css('background-color');
                $(nextbox).css("background-color",kalar);
                $(currbox).css('background-color',"transparent");
                var currtext = ".row-"+2+"-"+col+">h4";
                var nexttext = ".row-"+3+"-"+col+">h4";
                var txtvalue = $(currtext).text();
                $(nexttext).text(txtvalue);
                $(currtext).text("");
                map[3][col]=1;
                map[2][col]=0;
                movement =true;
            }
            else if(map[2][col]===1&&map[3][col]===1){
                //check karo agar dono me same value hai kya
                var currtext = ".row-"+2+"-"+col+">h4";
                var nexttext = ".row-"+3+"-"+col+">h4";
                if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                    //values same hai add kar ke pichla box khali kar do
                    flag = false; //mark kar do
                    var sum = (Number($(currtext).text()))*2;
                    var currbox = ".row-"+2+"-"+col;
                    var nextbox = ".row-"+3+"-"+col;
                    var kalar =  color_index(sum);
                    $(nextbox).css('background-color',kalar);
                    $(currbox).css('background-color',"transparent");
                    $(nexttext).text(sum);
                    $(currtext).text("");
                    map[3][col]=1;
                    map[2][col]=0;
                    score_updater(sum);
                    movement =true;
                }
            }
        }
        else if(map[1][col]===1&&map[2][col]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+1+"-"+col+">h4";
            var nexttext = ".row-"+2+"-"+col+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+1+"-"+col;
                var nextbox = ".row-"+2+"-"+col;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[2][col]=1;
                map[1][col]=0;
                score_updater(sum);
                movement =true;
            }
        }
    }
    else if(map[0][col]===1&&map[1][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+0+"-"+col+">h4";
        var nexttext = ".row-"+1+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+0+"-"+col;
            var nextbox = ".row-"+1+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[1][col]=1;
            map[0][col]=0;
            score_updater(sum);
            movement =true;
        }
    }
    return movement;
}




//up shifter
function up_shifter(col){
    var flag = true;
    var movement =false;
    //check for 1

    if(map[1][col]===1&&map[0][col]===0){
        var currbox = ".row-"+1+"-"+col;
        var nextbox = ".row-"+0+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+1+"-"+col+">h4";
        var nexttext = ".row-"+0+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[0][col]=1;
        map[1][col]=0;
        movement =true;
    }
    else if(map[1][col]===1&&map[0][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+1+"-"+col+">h4";
        var nexttext = ".row-"+0+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+1+"-"+col;
            var nextbox = ".row-"+0+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[0][col]=1;
            map[1][col]=0;
            score_updater(sum);
            movement =true;
        }
    }

    //check for 2

    if(map[2][col]===1&&map[1][col]===0){
        var currbox = ".row-"+2+"-"+col;
        var nextbox = ".row-"+1+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+2+"-"+col+">h4";
        var nexttext = ".row-"+1+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[1][col]=1;
        map[2][col]=0;
        movement =true;

        //now check for 1
        if(map[1][col]===1&&map[0][col]===0){
            var currbox = ".row-"+1+"-"+col;
            var nextbox = ".row-"+0+"-"+col;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+1+"-"+col+">h4";
            var nexttext = ".row-"+0+"-"+col+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[0][col]=1;
            map[1][col]=0;
            movement =true;
        }
        else if(map[1][col]===1&&map[0][col]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+1+"-"+col+">h4";
            var nexttext = ".row-"+0+"-"+col+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+1+"-"+col;
                var nextbox = ".row-"+0+"-"+col;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[0][col]=1;
                map[1][col]=0;
                score_updater(sum);
                movement =true;
            }
        }
    }
    else if(map[2][col]===1&&map[1][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+2+"-"+col+">h4";
        var nexttext = ".row-"+1+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+2+"-"+col;
            var nextbox = ".row-"+1+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[1][col]=1;
            map[2][col]=0;
            score_updater(sum);
            movement =true;
        }
    }

    //check for 3

    if(map[3][col]===1&&map[2][col]===0){
        var currbox = ".row-"+3+"-"+col;
        var nextbox = ".row-"+2+"-"+col;
        var kalar =  $(currbox).css('background-color');
        $(nextbox).css("background-color",kalar);
        $(currbox).css('background-color',"transparent");
        var currtext = ".row-"+3+"-"+col+">h4";
        var nexttext = ".row-"+2+"-"+col+">h4";
        var txtvalue = $(currtext).text();
        $(nexttext).text(txtvalue);
        $(currtext).text("");
        map[2][col]=1;
        map[3][col]=0;
        movement =true;

        //now check for 2
        if(map[2][col]===1&&map[1][col]===0){
            var currbox = ".row-"+2+"-"+col;
            var nextbox = ".row-"+1+"-"+col;
            var kalar =  $(currbox).css('background-color');
            $(nextbox).css("background-color",kalar);
            $(currbox).css('background-color',"transparent");
            var currtext = ".row-"+2+"-"+col+">h4";
            var nexttext = ".row-"+1+"-"+col+">h4";
            var txtvalue = $(currtext).text();
            $(nexttext).text(txtvalue);
            $(currtext).text("");
            map[1][col]=1;
            map[2][col]=0;
            movement =true;
    
            //now check for 1
            if(map[1][col]===1&&map[0][col]===0){
                var currbox = ".row-"+1+"-"+col;
                var nextbox = ".row-"+0+"-"+col;
                var kalar =  $(currbox).css('background-color');
                $(nextbox).css("background-color",kalar);
                $(currbox).css('background-color',"transparent");
                var currtext = ".row-"+1+"-"+col+">h4";
                var nexttext = ".row-"+0+"-"+col+">h4";
                var txtvalue = $(currtext).text();
                $(nexttext).text(txtvalue);
                $(currtext).text("");
                map[0][col]=1;
                map[1][col]=0;
                movement =true;
            }
            else if(map[1][col]===1&&map[0][col]===1){
                //check karo agar dono me same value hai kya
                var currtext = ".row-"+1+"-"+col+">h4";
                var nexttext = ".row-"+0+"-"+col+">h4";
                if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                    //values same hai add kar ke pichla box khali kar do
                    flag = false; //mark kar do
                    var sum = (Number($(currtext).text()))*2;
                    var currbox = ".row-"+1+"-"+col;
                    var nextbox = ".row-"+0+"-"+col;
                    var kalar =  color_index(sum);
                    $(nextbox).css('background-color',kalar);
                    $(currbox).css('background-color',"transparent");
                    $(nexttext).text(sum);
                    $(currtext).text("");
                    map[0][col]=1;
                    map[1][col]=0;
                    score_updater(sum);
                    movement =true;
                }
            }
        }
        else if(map[2][col]===1&&map[1][col]===1){
            //check karo agar dono me same value hai kya
            var currtext = ".row-"+2+"-"+col+">h4";
            var nexttext = ".row-"+1+"-"+col+">h4";
            if(($(currtext).text() ===$(nexttext).text())&&(flag)){
                //values same hai add kar ke pichla box khali kar do
                flag = false; //mark kar do
                var sum = (Number($(currtext).text()))*2;
                var currbox = ".row-"+2+"-"+col;
                var nextbox = ".row-"+1+"-"+col;
                var kalar =  color_index(sum);
                $(nextbox).css('background-color',kalar);
                $(currbox).css('background-color',"transparent");
                $(nexttext).text(sum);
                $(currtext).text("");
                map[1][col]=1;
                map[2][col]=0;
                score_updater(sum);
                movement =true;
            }
        }

    }
    else if(map[3][col]===1&&map[2][col]===1){
        //check karo agar dono me same value hai kya
        var currtext = ".row-"+3+"-"+col+">h4";
        var nexttext = ".row-"+2+"-"+col+">h4";
        if(($(currtext).text() ===$(nexttext).text())&&(flag)){
            //values same hai add kar ke pichla box khali kar do
            flag = false; //mark kar do
            var sum = (Number($(currtext).text()))*2;
            var currbox = ".row-"+3+"-"+col;
            var nextbox = ".row-"+2+"-"+col;
            var kalar =  color_index(sum);
            $(nextbox).css('background-color',kalar);
            $(currbox).css('background-color',"transparent");
            $(nexttext).text(sum);
            $(currtext).text("");
            map[2][col]=1;
            map[3][col]=0;
            score_updater(sum);
            movement =true;
        }
    }
    return movement;
}