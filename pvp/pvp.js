var point_map_num = parseInt(prompt("フィールド番号"));

//map選択
var point_map = choose_point_map(point_map_num);
turn_count = 0;

//TURN設定
var turn = parseInt(prompt("TURN"));

//x , y
var y = point_map.length;
var x = point_map[0].length;

//agent配置（固定）
//Agentの人数と配置場所を変えるときはここを書き換えよう！！
//{x:y}の順だよ
var agentsA = {0:0, 8:8};
var agentsB = {1:1, 9:9};

//agent_num
var agent_num = 0;
for(let key in agentsA) agent_num++;
agent_num *= 2;


game = new Game(x, y, point_map, agentsA, agentsB, agent_num);

game.draw_board();


old_x = [];
old_y = [];
new_x = [];
new_y = [];
count = 0;

function get_value(){
    old_x[count] = get_old_x();
    old_y[count] = get_old_y();
    new_x[count] = get_new_x(old_x[count]);
    new_y[count] = get_new_y(old_y[count]);

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