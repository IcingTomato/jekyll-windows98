// 将变量声明和事件监听器移动到DOMContentLoaded事件中
document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮元素
    var max = document.getElementsByClassName("btn")[1];
    var min = document.getElementsByClassName("btn")[2];
    
    // 只在元素存在时添加事件监听器
    if (max) {
        max.addEventListener('click', maximize, false);
    }
    
    if (min) {
        min.addEventListener('click', minimize, false);
    }
});

// 保留函数定义
function maximize() {
    var post = document.getElementsByClassName("content")[0];
    var cont = document.getElementsByClassName("post_content")[0];
    var wid = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth;

    if (wid > 900) {
        widf = wid * 0.9;
        post.style.width = widf + "px";

        if (wid < 1400) {
            cont.style.width = "99%";
        } else {
            cont.style.width = "99.4%";
        }
    }
}

function minimize() {
    var post = document.getElementsByClassName("content")[0];
    var cont = document.getElementsByClassName("post_content")[0];
    var wid = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth;

    if (wid > 900) {
        post.style.width = "800px";
        cont.style.width = "98.5%";
    }
}

// 修复以点开头的内联代码问题
document.addEventListener('DOMContentLoaded', function() {
    // 防止highlight.js处理内联代码
    document.querySelectorAll(':not(pre) > code').forEach(function(code) {
      code.classList.remove('hljs');
      code.classList.remove('language-*');
    });
});

// 在文档加载完成后添加日期
document.addEventListener('DOMContentLoaded', function() {
    var postContent = document.querySelector('.post_content');
    if (postContent && postContent.getAttribute('data-date')) {
      var dateStr = postContent.getAttribute('data-date');
      if (dateStr) {
        // 创建日期元素
        var dateElement = document.createElement('div');
        dateElement.className = 'post-date';
        dateElement.textContent = dateStr;
        dateElement.style.fontSize = '14px';
        dateElement.style.color = '#666';
        dateElement.style.margin = '0 0 25px 25px';
        dateElement.style.paddingBottom = '10px';
        dateElement.style.borderBottom = '1px solid #cccccc';
        dateElement.style.width = 'calc(100% - 110px)';
        
        // 找到第一个内容元素
        var firstContent = postContent.firstElementChild;
        
        // 插入日期元素到内容之前
        postContent.insertBefore(dateElement, firstContent);
      }
    }
  });