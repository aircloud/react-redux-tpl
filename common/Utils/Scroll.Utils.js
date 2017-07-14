/**
 * Created by Xiaotao.Nie on 2017/3/23.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

//通过函数节流的方式进行scroll的绑定
export const bindScroll = function (fn,context){

    function scrollHandle(e){
        fn.call(context,e);
        window.removeEventListener("scroll",scrollHandle);
        setTimeout(function(){
            window.addEventListener("scroll",scrollHandle);
        },50);
    }

    window.addEventListener("scroll",scrollHandle);

};