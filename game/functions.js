function choose_point_map(point_map_num){
    var point_map;
    switch(point_map_num){
        case 1 : point_map = [
            [0, 1, 2, 3, 0, 2],
            [1, -1, 6, 7, 0, 2],
            [2, 9, 10, 11, 0, 2],
            [3, 13, 14, 15, 0, 2],
            [4, 17, 18, 19, 0, 2],
            [5, 1, 1, 1, 1, 2],
            [6, 2, 2, 2, 2, 2],
            [7, 3, 3, 3, 3, 3]
        ]; break;

        case 2 : point_map = [
            [-2, 1, 0, 1, 2, 2, 1, 0, 1, -2],
            [3, 2, 0, -3, 4, 4, -3, 0, 2, 3],
            [1, 2, 3, 2, 1, 1, 2, 3, 2, 1],
            [3, 5, 2, 2, -1, -1, 2, 2, 5, 3],
            [-3, 4, 2, 1, 1, 1, 1, 2, 4, -3],
            [-3, 4, 2, 1, 1, 1, 1, 2, 4, -3],
            [3, 5, 2, 2, -1, -1, 2, 2, 5, 3],
            [1, 2, 3, 2, 1, 1, 2, 3, 2, 1],
            [3, 2, 0, -3, 4, 4, -3, 0, 2, 3],
            [-2, 1, 0, 1, 2, 2, 1, 0, 1, -2],
        ]; break;

        default : case 1 : point_map = [
            [0, 1, 2, 3, 0, 2],
            [1, -1, 6, 7, 0, 2],
            [2, 9, 10, 11, 0, 2],
            [3, 13, 14, 15, 0, 2],
            [4, 17, 18, 19, 0, 2],
            [5, 1, 1, 1, 1, 2],
            [6, 2, 2, 2, 2, 2],
            [7, 3, 3, 3, 3, 3]
        ]; break;
    }

    return point_map;
}

function init_Array(x, y){
    var arr = new Array(y);

    for(var i=0; i<y; i++){
        arr[i] = new Array(x);
        for(var j=0; j<x; j++){
            arr[i][j] = 0;
        }
    }

    return arr;
}

function decide_font(ctx, color, font, align, baseline){
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
}

function get_old_x(){
    var form = document.forms.set;

    var agent_number = parseInt(form.agent_No.value) + 8;

    for(var i=0; i<game.y; i++){
        for(var j=0; j<game.x; j++){
            if(game.board[i][j] === agent_number){
                return j;
            }
        }
    }
}

function get_old_y(){
    var form = document.forms.set;

    var agent_number = parseInt(form.agent_No.value) + 8;

    for(var i=0; i<game.y; i++){
        for(var j=0; j<game.x; j++){
            if(game.board[i][j] === agent_number){
                return i;
            }
        }
    }
}

function get_new_x(old_x){
    var form = document.forms.set;

    var num = parseInt(form.dest.value);

    switch(num){
        case 0 : return -1;
        case 1 :  return old_x;
        case 2 :  return old_x + 1;
        case 3 :  return old_x + 1;
        case 4 :  return old_x + 1;
        case 5 :  return old_x;
        case 6 :  return old_x - 1;
        case 7 :  return old_x - 1;
        case 8 :  return old_x - 1;
    }
}

function get_new_y(old_y){
    var form = document.forms.set;

    var num = parseInt(form.dest.value);

    switch(num){
        case 0 : return -1;
        case 1 : return old_y - 1;
        case 2 : return old_y - 1;
        case 3 : return old_y;
        case 4 : return old_y + 1;
        case 5 : return old_y + 1;
        case 6 : return old_y + 1;
        case 7 : return old_y;
        case 8 : return old_y - 1;
    }
}

function get_bot_new_x(old_x, num){
    switch(num){
        case 0 : return -1;
        case 1 :  return old_x;
        case 2 :  return old_x + 1;
        case 3 :  return old_x + 1;
        case 4 :  return old_x + 1;
        case 5 :  return old_x;
        case 6 :  return old_x - 1;
        case 7 :  return old_x - 1;
        case 8 :  return old_x - 1;
    }
}

function get_bot_new_y(old_y, num){
    switch(num){
        case 0 : return -1;
        case 1 : return old_y - 1;
        case 2 : return old_y - 1;
        case 3 : return old_y;
        case 4 : return old_y + 1;
        case 5 : return old_y + 1;
        case 6 : return old_y + 1;
        case 7 : return old_y;
        case 8 : return old_y - 1;
    }
}