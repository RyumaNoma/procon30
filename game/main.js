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