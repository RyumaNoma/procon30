var agentsA = {0:0, 1:0};
var agentsB = {2:0, 3:0};
let point_map = [
    [0, 1, 2, 3, 0, 2],
    [1, -1, 6, 7, 0, 2],
    [2, 9, 10, 11, 0, 2],
    [3, 13, 14, 15, 0, 2],
    [4, 17, 18, 19, 0, 2],
    [5, 1, 1, 1, 1, 2],
    [6, 2, 2, 2, 2, 2],
    [7, 3, 3, 3, 3, 3]
];

var x = parseInt(prompt("width"));
var y = parseInt(prompt("hegiht"));

agent_num = 4;

// var turn = parseInt(prompt("TURN"));
// var turn_count = 0;

game = new Game(x, y, point_map, agentsA, agentsB, agent_num);

game.draw_board();

// game.agent_move([0, 1, 2, 3], [0, 0, 0, 0], [1, 1, 2, 2], [1, 1, 1, 0], [1, 1, 1, 2]);

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