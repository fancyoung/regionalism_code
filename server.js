var fs = require('fs');
var _ = require('lodash');

fs.readFile('data.txt', 'UTF-8', function(err, data) {
  if(!err) {
    var a = {};
    _.each(data.match(/^.*$/gm), function(str) {
      var arr = str.match(/(\d+)\s+(\S+)/);
      a[arr[1]] = {name: arr[2]};
    });
    _.each(a, function(v, k) {
      var desc = v.name;
      var level = 1;
      if(k%10000 != 0) {
        level = 2;
        if(k%100 != 0) {
          desc = a[k-k%100].name + '/' + desc;
          level = 3;
        }
        desc = a[k-k%10000].name + '/' + desc;
      }
      if(/^(市辖区|县|自治区直辖县级行政区划)$/.test(v.name)) {
        v.useless = true;
      } else {
        v.brief = v.name.replace(/^(\S{2,}?)(汉族|蒙古族|满族|朝鲜族|赫哲族|达斡尔族|鄂温克族|鄂伦春族|回族|东乡族|土族|撒拉族|保安族|裕固族|维吾尔族|哈萨克族|柯尔克孜族|锡伯族|塔吉克族|乌孜别克族|俄罗斯族|塔塔尔族|藏族|门巴族|珞巴族|羌族|彝族|白族|哈尼族|傣族|傈僳族|佤族|拉祜族|纳西族|景颇族|布朗族|阿昌族|普米族|怒族|德昂族|独龙族|基诺族|苗族|布依族|侗族|水族|仡佬族|壮族|瑶族|仫佬族|毛南族|京族|土家族|黎族|畲族|高山族)*(省|市|自治州|自治县|县|地区|特别行政区|区|盟)$/, '$1');
      }
      v.level = level;
      v.desc = desc;
    });
    fs.writeFile('output_data.json', JSON.stringify(a, null, 4));
  }
});


