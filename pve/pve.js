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
bot = new NomaBot();

game.draw_board();


old_x = [];
old_y = [];
new_x = [];
new_y = [];
count = 0;
var bot_number = 1;

function get_value(){
    old_x[count] = get_old_x();
    old_y[count] = get_old_y();
    new_x[count] = get_new_x(old_x[count]);
    new_y[count] = get_new_y(old_y[count]);

    count++;

    if(count === game.agent_num / 2){
        game.agent_move(old_x, old_y, new_x, new_y,);

        //Bot実行
        var bot_number = 1;

        for(let i=0; i<game.agent_num / 2; i++){
            var num = bot.decide_move(game);

            old_x[count+i] = get_bot_old_x(game.board, bot_number);
            old_y[count+i] = get_bot_old_y(game.board, bot_number);
            new_x[count+i] = get_bot_new_x(old_x[count+i], num);
            new_y[count+i] = get_bot_new_y(old_y[count+i], num);

            bot_number++;
        }

        count = 0;
        turn_count++;
    }

    if(turn_count === turn){
        game.finish();
    }
}