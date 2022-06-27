Chart.register(ChartDataLabels);
const ctx = document.getElementById('roulette').getContext('2d');

data={
    datasets:[{
        data:[2,40,30,10],
        backgroundColor: '#E1BEE7'
    }],
    labels:[
        "大吉",
        "吉",
        "凶",
        "大凶"
    ],
    
}

options={
    plagins:{
        legend:{
            display:false
        }
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
    tooltips:{
        enable:false
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
        responsive: false,
    }
})

const pie = document.getElementById('roulette')
// Vueの設定
const app = new Vue({
    el:"#app",
    data:{
        rotate:0,
        speed:2.1,
        mode:"speed_up",
        show:false
    },
    methods:{
        // スタートボタンを押したときの処理
        button:function(){
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
                        if(this.speed>=0.05){
                            this.speed = this.speed - this.speed/1000;
                        }
                        
                        break;
                    case "keep":
                }
                
                this.rotate += this.speed
                pie.style.transform = "rotate("+this.rotate+"deg)";

                if(this.speed<=0.15&& this.rotate%360<=5){
                    console.log("finish")
                    this.mode = "stop"
                    this.speed = 0
                    clearInterval(i)
                }
            })
        },
        stop:function(){
            console.log("stop!")
            this.mode="speed_down";

        }
    }
})