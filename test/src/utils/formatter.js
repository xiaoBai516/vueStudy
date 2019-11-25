const formatter = {
     // 关系证明
     sexType: (val) => {
          let result = "";
          switch (val) {
               case "1":
                    result = "男";
                    break;
               case "2":
                    result = "女";
                    break;
               default:
                    result = "未知";
          }
          return result;
     }
}

export default formatter
