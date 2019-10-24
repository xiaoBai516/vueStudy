export default {
	init(){

	},
	toFiexd2(val){
	    return parseInt(val).toFixed(2);
	},
	getFitHeight(delt, minHeight){
	//根据屏幕来进行内部表单高度调整
      let h = 0;
      if(document.body){
          h = document.body.clientHeight;
      }else if( document.documentElement){
          h = document.bodyElement.clientHeight;
      }
      if(h >= 1200){  //大屏
          h = h * 0.6 - delt;
      }else if( h >= 900){
          h = h - 450 - delt - 80;
      }else if( h >= 800){
          h =  minHeight == undefined ? 210 : minHeight;
      }else{
          h =  minHeight == undefined ? 120 : minHeight;
      }
      return h;
	},
}