Chart.register(ChartDataLabels);
const ctx = document.getElementById('roulette').getContext('2d');

let data_list = [1,1]
let label_list = ["メロン","スイカ"]
let sum = 0;
data_list.forEach(element => {
    sum+=element
    console.log(sum)
});



options={
    plagins:{
        legend:{
            display:false
        },
        tooltip:false
    },
    responsive: false,
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

let roulette
// ルーレットの表示
const making_roulette = function(){
    roulette = new Chart (ctx,{
        type:"doughnut",
        data:{
            datasets:[{
                data:data_list,
                backgroundColor: ["red","blue","green","orange","rgb(158, 98, 255)"
            ]
            }],
            labels:label_list,
            
        },
        plagins:[ChartDataLabels],
        options:{
            
            plagins:{
                tooltip:{
                    enable:false
                }
            },
            responsive: true,
        }
    })    
}

making_roulette()

// クリックされたときのイベント
document.addEventListener("click",function(e){
    console.log(e.target.id)
    if (e.target.id=="roulette"){
        console.log(app.mode)
        switch(app.mode){
            case "speed_up":
                app.stop();
                break;
            case "none":
                app.button();
                break;
            case "stop":
                app.button();
                break;
    }
    }

})


const pie = document.getElementById('roulette')





// Vueの設定
Vue.options.delimiters = ['[[', ']]'];
const app = new Vue({
    el:"#app",
    data:{
        rotate:0,
        speed:2.1,
        mode:"none",
        show:false,
        finish:false,
        message:"---",
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

                        // 終了前の減速
                        if(this.speed>1){
                            console.log("tuujou ")
                            this.speed = this.speed - this.speed/600;
                        }
                        if(this.speed<=0.2){
                            console.log('急ブレーキ３')
                            this.speed -= this.speed/75;
                        }else if(this.speed<=0.3&&this.speed>0.2){
                            console.log('急ブレーキ2.5')
                            this.speed -= this.speed/100;
                        }else if(this.speed<=0.5&&this.speed>0.3){
                            console.log("急ブレーキ２")
                            this.speed -= this.speed/120;
                        }else if(this.speed<=1&&this.speed>0.5){
                            this.speed -= this.speed/400;
                            console.log("急ブレーキ");
                        }
                        
                        break;
                    case "keep":
                }
                
                this.rotate += this.speed
                pie.style.transform = "rotate("+this.rotate+"deg)";

                // 終了時の処理
                if(this.speed<=0.05){
                    console.log("finish")
                    console.log('角度'+this.rotate%360)
                    this.mode = "stop"
                    this.speed = 0;
                    clearInterval(i)
                    this.finish = true;
                    let result_rotate = this.rotate%360;
                    i = 0;
                    // チェック用の合計をリセット
                    this.check_sum = 0;
                    sum = 0;
                    data_list.forEach(element => {
                        sum+=Number(element);
                        console.log("sum"+sum);
                    });
                    if(result_rotate<=90){
                        // 角度が90度以下の場合の処理
                        data_list.some(element=>{
                            console.log("i="+i)
                            console.log("element="+element)
                            console.log("result_rotate"+result_rotate)
                            this.check_sum += element * 360/sum;
                            console.log("check_sum="+this.check_sum)
                            if(this.check_sum>=result_rotate+90){
                                console.log(label_list[i])
                                this.result(label_list[i])
                                return true;
                            }
                            i+=1;
                        })
                    }else{
                        data_list.reverse().some(element => {
                            console.log("i="+i)
                            console.log("element="+element)
                            console.log("result_rotate"+result_rotate)
                            this.check_sum += element * 360/sum;
                            console.log("check_sum="+this.check_sum)
                            console.log(this.check_sum+90)
                            if(result_rotate<this.check_sum+90){
                                result = label_list.reverse()
                                console.log(result)
                                console.log("結果"+result[i])
                                this.result(result[i])
                                label_list.reverse()
                                console.log(label_list)
                                return true;
                            }
                            i+=1;
                        });
                    }
                    
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
        create:function(){
            text = document.getElementById('name').value;
            ratio = document.getElementById("number").value;
            console.log(text.split(","))
            label_list=[]
            data_list = []
            label_list = label_list.concat(text.split(","))
            data_list = data_list.concat(ratio.split(","))
            console.log(label_list)
            console.log(data_list)
            
            roulette.destroy()
            making_roulette()
        },
        result:function(res){
            console.log(res)
            this.message = res;
        }
    }
})