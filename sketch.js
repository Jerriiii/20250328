let seaweeds = []; // 儲存水草的屬性
let colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"]; // 指定的顏色列表

function setup() {
  // 創建畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '10'); // 確保畫布在 iframe 上方
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑動事件

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 設定 iframe 的網址
  iframe.style('position', 'absolute');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('top', '10%'); // 垂直居中
  iframe.style('left', '10%'); // 水平居中
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '1'); // 確保 iframe 在畫布下方

  // 初始化水草
  let numLines = 40; // 水草數量
  for (let i = 0; i < numLines; i++) {
    seaweeds.push({
      baseX: width / (numLines + 1) * (i + 1), // 水草的基底位置
      height: random(250, 300), // 水草的高度隨機介於 250 到 300
      color: color(random(colors)), // 隨機選擇顏色
      thickness: random(5, 50), // 水草的粗細隨機介於 5 到 15
      frequency: random(0.005, 0.03), // 水草的搖晃頻率（不同速度）
      phase: random(TWO_PI), // 水草的初始相位
    });
  }
}

function draw() {
  clear(); // 清除畫布背景，讓背景透明

  let amplitude = 5; // 搖晃的幅度（調小幅度）
  let waveSpeed = 0.05; // 波浪傳遞速度

  for (let i = 0; i < seaweeds.length; i++) {
    let seaweed = seaweeds[i]; // 取得每條水草的屬性
    let baseY = height; // 水草的底部
    let segments = 30; // 水草分成的段數（增加段數讓曲線更平滑）
    let segmentHeight = seaweed.height / segments; // 每段的高度

    strokeWeight(seaweed.thickness); // 設定水草的粗細
    let transparentColor = color(
      red(seaweed.color),
      green(seaweed.color),
      blue(seaweed.color),
      150 // 設定透明度（0-255）
    );
    stroke(transparentColor); // 設定水草的顏色（帶透明度）
    noFill(); // 不填充內部顏色

    beginShape(); // 開始繪製水草的曲線
    let previousX = seaweed.baseX; // 起始 X 座標
    let previousY = baseY; // 起始 Y 座標

    vertex(previousX, previousY); // 添加起始點

    for (let j = 0; j < segments; j++) {
      // 計算每段的偏移量，根據水草長度和段數調整
      let offsetX = sin(
        frameCount * seaweed.frequency + seaweed.phase + j * waveSpeed
      ) * amplitude * (1 - j / segments); // 偏移量隨段數減少

      let currentX = previousX + offsetX; // 當前段的 X 座標
      let currentY = previousY - segmentHeight; // 當前段的 Y 座標

      vertex(currentX, currentY); // 添加頂點到曲線

      // 更新上一段的座標
      previousX = currentX;
      previousY = currentY;
    }

    endShape(); // 結束繪製水草的曲線
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗改變

  let numLines = seaweeds.length; // 獲取水草數量
  for (let i = 0; i < numLines; i++) {
    seaweeds[i].baseX = width / (numLines + 1) * (i + 1); // 重新計算每條水草的基底位置
  }
}
