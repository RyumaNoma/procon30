class Noma extends Game{

    //agent_num ... 自分チームの人数
    constructor(agent_num, point_map){
        this.agent_num = agent_num;
        this.point_map = point_map;
    }

    // 1 <= i <= point_map
    decide_move(game){
        return Math.random * 10 % 9;
    }
}