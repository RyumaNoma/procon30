function choose_point_map(point_map_num){
    var point_map;
    switch(point_map_num){
        case 1 : point_map = [
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

        default : point_map = [
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



function get_value(){
    old_x[count] = get_old_x();
    old_y[count] = get_old_y();
    new_x[count] = get_new_x(old_x[count]);
    new_y[count] = get_new_y(old_y[count]);

    console.log("got values");

    count++;

    if(count === agent_num){
        game.agent_move(old_x, old_y, new_x, new_y,);
        count = 0;
        turn_count++;
    }

    if(turn_count === turn){
        game.finish();
    }
}

function get_team_number(){
    var form = document.forms.set;

    //blue OR orange
    var team = form.team.value;

    return parseInt(team);
}

function get_old_x(){
    var form = document.forms.set;

    var agent_number = parseInt(form.agent_No.value) + get_team_number();

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

    var agent_number = parseInt(form.agent_No.value) + get_team_number();

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