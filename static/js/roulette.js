Chart.register(ChartDataLabels);
const ctx = document.getElementById('roulette').getContext('2d');

const data_list = [2,40,30,10]
const label_list = [
    "大吉",
    "吉",
    "凶",
    "大凶"
]
let sum = 0;
data_list.forEach(element => {
    sum+=element
    console.log(sum)
});

data={
    datasets:[{
        data:data_list,
        backgroundColor: ['Red',"green","orange","blue"]
    }],
    labels:label_list,
    
}

options={
    plagins:{
        legend:{
            display:false
        },
        tooltip:false
    },
    responsive: true,
}



// なぜかプラグインが反映されていない?
// デフォルト設定したら解決
Chart.defaults.set('plugins.datalabels', {
    color: 'black',
    font: {
        weight: 'bold',
        size: 10,
    },
    formatter: (value,ctx) => {
        let label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
    },
});

Chart.defaults.set("plugins",{
    legend:{
        display:false
    },
    tooltip:{
        enable:false,
        callbacks:{
            label:(item) =>{
                console.log(item.chart)
                return "hello"
            }
        }
    },
})


// ルーレットの表示
let roulette = new Chart (ctx,{
    type:"doughnut",
    data:data,
    plagins:[ChartDataLabels],
    options:{
        
        plagins:{
            
        },
        responsive: true,
    }
})

// クリックされたときのイベント
document.addEventListener("click",function(e){
    console.log(e.target.id)
    console.log(app.mode)
    switch(app.mode){
        case "speed_up":
            app.stop();
            break;
        case "none":
            app.button();
            break;
    }
})


const pie = document.getElementById('roulette')

// 矢印の位置の調整
const yajirushi = document.getElementById("yajirushi");



// Vueの設定
const app = new Vue({
    el:"#app",
    data:{
        rotate:0,
        speed:2.1,
        mode:"none",
        show:false,
        finish:false,
        message:"これはテストメッセージです",
        check_sum:0,
    },
    methods:{
        // スタートボタンを押したときの処理
        // ルーレット処理
        button:function(){

            console.log(this)
            this.show = true;
            this.mode="speed_up";
            i = setInterval(()=>{
                
                switch(this.mode){
                    case "speed_up":
                        if(this.speed<30){
                            this.speed += 0.06;
                        }else{
                            console.log("max_speed")
                        }
                        break;
                    case "speed_down":
                        console.log("mode="+this.mode)
                        console.log(this.rotate%360)
                        
                        // 終了前の減速
                        if(this.speed>1){
                            console.log("tuujou ")
                            this.speed = this.speed - this.speed/500;
                        }
                        if(this.speed<=1&& this.rotate%360>=350&&this.speed>=0.02){
                            console.log('急ブレーキ３')
                            this.speed -= this.speed/50;
                        }else if(this.speed<=1&& this.rotate%360>=340&&this.speed>=0.05){
                            console.log('急ブレーキ2.5')
                            this.speed -= this.speed/100;
                        }else if(this.speed<=1&& this.rotate%360>=240&&this.speed>=0.1){
                            console.log("急ブレーキ２")
                            this.speed -= this.speed/150;
                        }else if(this.speed<=1&& this.rotate%360>=150&&this.speed>=0.4){
                            this.speed -= this.speed/200;
                            console.log("急ブレーキ");
                        }
                        
                        break;
                    case "keep":
                }
                
                this.rotate += this.speed
                pie.style.transform = "rotate("+this.rotate+"deg)";

                

                // 終了時の処理
                if(this.speed<=0.05&&this.rotate%360<=4){
                    console.log("finish")
                    console.log('角度'+this.rotate%360)
                    this.mode = "stop"
                    this.speed = 0;
                    clearInterval(i)
                    this.finish = true;
                    let result_rotate = this.rotate%360;
                    i = 0;
                    this.check_sum = 0
                    data_list.some(element => {
                        console.log(element)
                        console.log(result_rotate)
                        this.check_sum += element * 360/sum;
                        console.log(this.check_sum)
                        if(result_rotate<this.check_sum){
                            console.log(label_list[i]);
                            this.result(label_list[i]);
                            return true;
                        }
                        i+=1;
                    });
                }
            })
        },
        stop:function(){
            // ストップボタンの処理
            if(this.mode=="speed_up"){
                if(this.speed >= 27){
                    console.log("stop!")
                    this.mode="speed_down";
                    this.speed -=25;
                }
                
            }
            else{
                console.log("もう押されてる")
            }
        },
        canvas_click:function(){
            console.log("canvas")
        },
        result:function(result){
            console.log(result)
            this.message = result;
        }
    }
})