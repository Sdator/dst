var $$ = mdui.JQ;


var thead_top = $('thead').offset().top;
$(window).scroll(function () {

    var sctop = $(this).scrollTop();
    var thead = $('thead')
    // thead_top = sctop
    // console.log(sctop)
    if (sctop > 60) {
        var ty = sctop - thead_top;
        // console.log(ty)
        // console.log(ty, sctop)
        thead.css({
            "transform": 'translateY(' + ty + 'px)',
            "background-color": "#f00",
            "color": "#fff"
        })
        thead.addClass("mdui-color-blue mdui-text-color-theme-icon-disabled")
        // thead.style = `transform:translateY(${ty + 100}px)`
        // $('thead').css("background-color", "yellow");
        // console.log(thead)

    } else {
        thead.css('transform', 'translateY(0px)');
    }
})


// <td>{{ 食物.Name }} </td>
// <td>{{ 食物.Health }} </td>
// <td>{{ 食物.Hunger }} </td>
// <td>{{ 食物.Sanity }} </td>
// <td>{{ 食物.Perish }} </td>
// <td>{{ 食物.Cooktime }} </td>
// <td>{{ 食物.Priority }} </td>

const app = new Vue({
    el: "#app",
    data: {
        食谱: [],
        排序: [],
        searchTextA: "",
        msg: "",
        num: 0,
        表头食物属性: ["序列", "名字", "生命", "饥饿", "精神", "保鲜", "烹饪时间", "优先度"],

    },
    created() {
        fetch('/data/DS/Foods.json').then(function (response) {
            return response.json();
        }).then(json => {

            this.食谱 = this.格式化数据(json)
        


                console.log(this.食谱)
            // console.log(this.食谱, [...this.食谱])
            /*
                        for (const { Name, Health, Hunger, Sanity, Perish, Cooktime, Priority } of json.FoodRecipe.FoodRecipes) {
                            let item = Health + 100
                            // console.log(Health + 100)
                            setTimeout((排序, data) => {
            
                                排序.push(data)
            
                            }, item, this.排序, {
                                "名字": Name,
                                "生命": Health,
                                "饥饿": Hunger,
                                "精神": Sanity,
                                "保鲜": Perish,
                                "烹饪时间": Cooktime,
                                "优先度": Priority
                            })
                        }
                        睡眠排序
                        for (const 属性 of json.FoodRecipe.FoodRecipes) {
                            let item = 属性.Health + 100
                            setTimeout((食谱, data) => {
                                食谱.push(data)
                            }, item, this.食谱, 属性)
                        }
            */

        }).catch(function (ex) {
            console.log('Parsing failed:', ex);
        });

    },
    methods: {
        格式化数据(json) {

            const 蛋类 = json.FoodEggs.Foods
            const 果类 = json.FoodFruit.Foods
            const 肉类 = json.FoodMeats.Foods
            const 特殊 = json.FoodNoFc.Foods
            const 其他 = json.FoodOthers.Foods
            const 食谱 = json.FoodRecipe.FoodRecipes
            const 菇类 = json.FoodVegetables.Foods
            return [...蛋类, ...果类, ...肉类, ...特殊, ...其他, ...食谱, ...菇类]

        },

        // 排序开始(data) {
        //     排序
        // }
        // 代入值，正倒叙
        cli(e, model) {
            // 清零
            this.排序 = []
            this.num = 0

            const 对照表 = {
                "序列": 0,
                "名字": "Name",
                "生命": "Health",
                "饥饿": "Hunger",
                "精神": "Sanity",
                "保鲜": "Perish",
                "烹饪时间": "Cooktime",
                "优先度": "Priority"
            }
            const 名字 = 对照表[e]
            let i = 0

            // 睡眠排序
            for (const 属性 of this.食谱) {

                属性["序列"] = i++
                let item = model ? ~(属性[名字] - 101) : 属性[名字] + 100
                setTimeout((排序, data) => {
                    // console.log(item)
                    排序.push(data)
                }, item, this.排序, 属性)
            }
            this.食谱 = this.排序

            // console.log(this.排序)

        }
    }

})