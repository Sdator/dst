var $$ = mdui.JQ;








function 格式化数据(json) {

    const 蛋类 = json.FoodEggs.Foods
    const 果类 = json.FoodFruit.Foods
    const 肉类 = json.FoodMeats.Foods
    const 特殊 = json.FoodNoFc.Foods
    const 其他 = json.FoodOthers.Foods
    const 食谱 = json.FoodRecipe.FoodRecipes
    const 菇类 = json.FoodVegetables.Foods
    const { FoodEggs: 测试 } = json

}



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
            "background-color": "#000",
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




const app = new Vue({
    el: "#app",
    data: {
        食谱: [],
        表头食物属性: ["名字", "生命", "饥饿", "精神", "保鲜", "烹饪时间", "优先度"],

    },
    created() {
        fetch('/data/DS/Foods.json').then(function (response) {
            return response.json();
        }).then(json => {
            this.食谱 = json.FoodRecipe.FoodRecipes
            console.log(this.食谱)
        }).catch(function (ex) {
            console.log('Parsing failed:', ex);
        });

    }

})