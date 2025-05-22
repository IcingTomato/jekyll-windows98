---
layout: default
title: "扫雷"
tags: game
---

# 扫雷

这是一个经典的扫雷游戏。点击格子开始游戏，右键标记地雷。

<div style="display: flex; justify-content: center; margin: 20px 0;">
    <div id="minesweeper-container"></div>
</div>

<script src="/jekyll-windows98/assets/js/minesweeper.js"></script>
<script>
    window.baseUrl = '{{ site.baseurl }}';
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('minesweeper-container');
        new Minesweeper(container);
    });
</script>

## 游戏说明

- 左键点击：揭开格子
- 右键点击：标记/取消标记地雷
- 数字表示周围 8 个格子中地雷的数量
- 点击笑脸按钮可以重新开始游戏
- 计时器显示游戏时间
- 左上角显示剩余地雷数量

祝你玩得开心！😊
