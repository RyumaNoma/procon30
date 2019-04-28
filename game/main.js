var point_map_num = parseInt(prompt("フィールド番号"));
var turn = parseInt(prompt("TURN"));

//map選択
var point_map = choose_point_map(point_map_num);
turn_count = 0;

var y = point_map.length;
var x = point_map[0].length;

//agent配置（固定）
var agentsA = {0:0, 8:8},
agentsB = {1:1, 9:9};

var agent_num = 0;
for(let key in agentsA) agent_num++;


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
    new_x[count] = get_new_x();
    new_y[count] = get_new_y();

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

function get_new_x(){
    var form = document.forms.set;

    var arr = form.dest.value.split(',');

    return parseInt(arr[0]);
}

function get_new_y(){
    var form = document.forms.set;

    var arr = form.dest.value.split(',');

    return parseInt(arr[1]);
}