
// 获取当前的访问次数
var count = localStorage.getItem("visitCount");

// 如果访问次数不存在，则设置为 1
if (!count) {
  count = 1;
} else {
  // 否则将访问次数加 1
  count = parseInt(count) + 1;
}

// 将访问次数保存到 localStorage 中
localStorage.setItem("visitCount", count);




