//Game class

//board Status
// 0 ... 何もない
// 1-8 ... Team A agents
// 9-16 ... Team B agents
// 100 ... Team A's Tile (orange)
// 200 ... Team B's Tile (blue)

//point_map ... 盤面上の点数

class Game{

    //agents ... 連想配列 , {x:y} の形式
    constructor(x, y, point_map, agentsA, agentsB, agent_num){

        //両チームのAgent数の合計
        this.agent_num = agent_num;

        //毎ターンごとの目的地
        this.each_turn_dest = [];

        //point_map , board 初期化
        this.board = init_Array(x, y);
        this.point_map = init_Array(x, y);

        for(var i=0; i<y; i++){
            for(var j=0; j<x; j++){
                this.point_map[i][j] = point_map[i][j];
            }
        }


        //agents配置
        var countA = 1, countB = 9;
        //agents A
        for(var key in agentsA){
            this.board[agentsA[key]][key] = countA++;
        }
        //agents B
        for(var key in agentsB){
            this.board[agentsB[key]][key] = countB++;
        }

        this.x = x;
        this.y = y;
    }

    finish(){
        var orange_point = this.count_point(100);
        var blue_point = this.count_point(200);

        console.log("-----------------------試合終了-----------------------");
        console.log("ORANGE : " + orange_point);
        console.log("BLUE   : " + blue_point);
        
        var winner = "";
        if(orange_point > blue_point) winner = "ORANGE";
        else if(orange_point < blue_point) winner = "BLUE";
        else winner = "DRAW";

        console.log("WINNER : " + winner);
    }

    //1始点からの塗りつぶし
    //始点の座標 (x, y)
    fill_from_point(x, y, status){
        var ret = status;
        var s = init_Array(2, 1);
        s[0][0] = x;
        s[0][1] = y;


        while(s.length){
            var c = s.pop();
            if(ret[c[1]][c[0]] === 1){
                ret[c[1]][c[0]] = 0;
                var dx = [0, 0, 1, -1];
                var dy = [1, -1, 0, 0];

                for(var i=0; i<4; i++){
                    var cell = [c[0] + dx[i], c[1] + dy[i]];

                    //盤面外はダメ
                    if((cell[0] < 0 || cell[0] > this.x - 1) || (cell[1] < 0 || cell[1] > this.y - 1)){
                        continue;
                    }else{
                        if(ret[cell[1]][cell[0]] === 1){
                            s.push(cell);
                        }
                    }
                }
            }
        }

        return ret;
    }

    count_enclosed_point(team_number){
        var status = init_Array(this.x, this.y);
        var sum = 0;

        var a = (team_number===100)? 1 : 9;
        var b = (team_number===100)? 8 : 16;

        //全マスをtrueで初期化
        //誰かのマスならfalse
        for(var i=0; i<this.y; i++){
            for(var j=0; j<this.x; j++){
                status[i][j] = 1;

                var flag = (a <= this.board[i][j] && this.board[i][j] <= b);

                if(this.board[i][j] === team_number || flag){
                    status[i][j] = 0;
                }else{
                    status[i][j] = 1;
                }
            }
        }
                

        //塗りつぶしをすべての淵のマスで実行する
        //上
        for(var i=0; i<this.x; i++){
            if(status[0][i] === 1){
                status = this.fill_from_point(i, 0, status);
            }
        }

        //下
        for(var i=0; i<this.x; i++){
            if(status[this.y - 1][i] === 1){
                status = this.fill_from_point(i, this.y - 1, status);
            }
        }

        //右
        for(var i=0; i<this.y; i++){
            if(status[i][this.x - 1] === 1){
                status = this.fill_from_point(this.x - 1, i, status);
            }
        }

        //左
        for(var i=0; i<this.y; i++){
            if(status[i][0] === 1){
                status = this.fill_from_point(0, i, status);
            }
        }

        //囲まれている場所の絶対値を足す
        for(var i=0; i<this.y; i++){
            for(var j=0; j<this.x; j++){
                if(status[i][j] === 1){
                    sum += Math.abs(this.point_map[i][j]);
                }
            }
        }

        return sum;
    }

    //team_number ... 100 OR 200
    count_point(team_number){
        var sum = 0;
        //塗られているポイント
        for(var i=0; i<this.y; i++){
            for(var j=0; j<this.x; j++){
                var a = (team_number===100)? 1 : 9;
                var b = (team_number===100)? 8 : 16;
                var flag = (a <= this.board[i][j]) && (this.board[i][j] <= b);

                if(this.board[i][j] === team_number || flag){
                    sum += this.point_map[i][j];
                }
            }
        }

        sum += this.count_enclosed_point(team_number);

        return sum;
    }

    //team ... 100 OR 200
    //status
    //// 1 ... go
    //// 2 ... remove_tile
    //// 3 ... pass
    agent_move(old_x, old_y, new_x, new_y){

        var move_status = [];
        for(var i=0; i<this.agent_num; i++){
            move_status[i] = this.get_move_status(old_x[i], old_y[i], new_x[i], new_y[i]);
        }

        var flag;
        var count = [];
        for(var i=0; i<this.agent_num; i++) count[i] = 0;

        //GOのものから
        for(var i=0; i<this.agent_num; i++){

            if(move_status[i] === 1){
                flag = true;

                flag = this.can_try_to_move(old_x[i], old_y[i], new_x[i], new_y[i]);

                //1ターンで動けるのは1回まで
                if(count[i] > 1){
                    flag = false;
                    console.log(this.get_color(old_x[i], old_y[i])+ " : Agent #" + this.get_agent_No(old_x[i], old_y[i]) + " : 1ターンに2回動くな");
                }

                //同じ場所に行かないか
                for(var j=0; j<this.agent_num; j++){
                    if(new_x[i] === new_x[j] && new_y[i] === new_y[j] && i !== j && move_status[j] === 1){
                        flag = false;
                        console.log(this.get_color(old_x[i], old_y[i])+ " : Agent #" + this.get_agent_No(old_x[i], old_y[i]) + " : 同じ場所に行こうとすな！");
                        break;
                    }
                }

                //移動
                if(flag){
                    this.go(old_x[i], old_y[i], new_x[i], new_y[i]);
                    console.log(this.get_color(new_x[i], new_y[i])+ " : Agent #" + this.get_agent_No(new_x[i], new_y[i]) + " : 動いたよー　(^ ^)");
                    count[i]++;
                }
            }
        }

        //remove_tileの処理
        for(var i=0; i<this.agent_num; i++){
            if(move_status[i] === 2){
                flag = true;
                flag = this.can_try_to_move(old_x[i], old_y[i], new_x[i], new_y[i]);

                //1ターンで動けるのは1回まで
                if(count[i] > 1){
                    flag = false;
                    console.log(this.get_color(old_x[i], old_y[i])+ " : Agent #" + this.get_agent_No(old_x[i], old_y[i]) + " : 1ターンに2回動くな");
                }

                //取ろうとする場所が誰かのタイルであれば
                if(flag){
                    if(this.board[new_y[i]][new_x[i]] === 100 || this.board[new_y[i]][new_x[i]] === 200){
                        this.remove_tile(new_x[i], new_y[i]);
                        console.log(this.get_color(old_x[i], old_y[i]) + " : Agent #" + this.get_agent_No(old_x[i], old_y[i]) + " : （" + new_x[i] + "," + new_y[i] + "）のタイルをとったよ　>_<");
                        count[i]++;
                    }else{
                        console.log(this.get_color(old_x[i], old_y[i]) + " : Agent #" + this.get_agent_No(old_x[i], old_y[i]) + " : そこ剥がせねーよ、バーカ！");
                    }
                }
            }
        }

        this.draw_board();
    }

    draw_board(){
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        var cell =70;

        //開発用
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        for(var i=0; i<this.y; i++){
            for(var j=0; j<this.x; j++){
                //背景マス
                var status = this.board[i][j];

                //色決定
                if(status === 100){
                    ctx.fillStyle = 'orange';
                }
                else if(status === 200){
                    ctx.fillStyle = 'skyblue';
                }
                else{
                    ctx.fillStyle = '#cdccd1';
                }
                ctx.fillRect(j*cell, i*cell, cell, cell);

                //agents は〇で表現する
                if(1 <= status && status <= 8){
                    ctx.fillStyle = 'orange';
                    ctx.beginPath();
                    ctx.arc(j*cell+cell/2, i*cell+cell/2, cell/2-1, 0, 2*Math.PI, false);
                    ctx.fill();

                    //agentナンバー表示
                    decide_font(ctx, "black", "48px '明朝体", "left", "bottom");
                    ctx.fillText(String(this.board[i][j]), j*cell, (i+1)*cell);

                }else if(9 <= status && status <= 16){
                    ctx.fillStyle = 'skyblue';
                    ctx.beginPath();
                    ctx.arc(j*cell+cell/2, i*cell+cell/2, cell/2-1, 0, 2*Math.PI, false);
                    ctx.fill();

                    //agentナンバー表示
                    decide_font(ctx, "black", "48px '明朝体", "left", "bottom");
                    ctx.fillText(String(this.board[i][j] - 8), j*cell, (i+1)*cell);
                }

                //マスのふち
                ctx.strokeStyle = 'black';
                ctx.strokeRect(j*cell, i*cell, cell, cell);
                //点数表示
                decide_font(ctx, "blue", "30px '明朝体'", "left", "top");
                ctx.fillText(String(this.point_map[i][j]), j*cell, i*cell);
            }
        }

        var orange_point = this.count_point(100);
        var blue_point = this.count_point(200);

        console.log("ORANGE : " + orange_point);
        console.log("BLUE : " + blue_point);
    }

    set_each_turn_dest(arr){
        this.each_turn_dest = arr;
    }

    //team ... 100 OR 200
    go(old_x, old_y, new_x, new_y){
        var temp = this.board[old_y][old_x];
        this.board[old_y][old_x] = this.get_team(old_x, old_y);
        this.board[new_y][new_x] = temp;
    }

    remove_tile(x, y){
        this.board[y][x] = 0;
    }

    get_team(x, y){
        return (this.board[y][x] < 9)? 100 : 200;
    }

    can_try_to_move(old_x, old_y, new_x, new_y){
        var flag = true;

        //Agentは存在するか
        if(1 > this.board[old_y][old_x] || this.board[old_y][old_x] > 16){
            flag = false;
            console.log(this.get_color(old_x, old_y)+ " : Agent #" + this.get_agent_No(old_x, old_y) + " : そこにエージェントはいなかった。。。");
        }

        //移動できる範囲内か
        if(Math.abs(new_x - old_x) > 1 || Math.abs(new_y - old_y) > 1){
            flag = false;
            console.log(this.get_color(old_x, old_y)+ " : Agent #" + this.get_agent_No(old_x, old_y) + " : 2マス以上動くな");
        }

        //盤面の外に行かないか
        if(0 > new_x || new_x > this.x-1 || 0 > new_y || new_y > this.y-1){
            flag = false;
            console.log(this.get_color(old_x, old_y)+ " : Agent #" + this.get_agent_No(old_x, old_y) + " : 盤面の外に出るな");
        }

        return flag;
    }

    get_color(x, y){
        return ((this.board[y][x] > 8)? "BLUE  " : "ORANGE");
    }

    get_agent_No(x, y){
        return (this.board[y][x] > 8)? this.board[y][x]-8 : this.board[y][x];
    }

    get_move_status(old_x, old_y, new_x, new_y){

        if(new_x === -1 && new_y === -1){
            console.log(this.get_color(old_x, old_y)+ " : Agent #" + this.get_agent_No(old_x, old_y) + " : パスしたンゴーー");
            return 3;
        }
        
        if(0 <= new_x && new_x <= this.x - 1 && 0 <= new_y && new_y <= this.y - 1){
            //行き先が
            // 0 または自陣
            if(this.board[new_y][new_x] === 0 || this.board[new_y][new_x] === this.get_team(old_x, old_y)){
                return 1;
            }
            
            if((this.get_team(new_x, new_y) === 100 || this.get_team(new_x, new_y) === 200) && this.board[new_y][new_x] !== this.get_team(new_x, new_y)){
                return 2;
            }
        }else{
            return 1;
        }
    }
}

//point_map自動生成
//agent自動生成
//入力フォームからの値取得
//ターン制限
//リプレイ機能？？