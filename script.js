// 原创数学示意：用移动高斯团理解时间变化；不包含训练或真实预测。
'use strict';
const slider = document.querySelector('#frame');
const label = document.querySelector('#frame-label');
const canvas = document.querySelector('#field');
const context = canvas.getContext('2d');
function drawFrame() {
  const frame = Number(slider.value);
  label.textContent = `第 ${String(frame).padStart(2, '0')} / 30 帧`;
  canvas.setAttribute('aria-label', `第 ${frame} 帧合成高斯团热力图，位置随时间移动`);
  if (!context) return;
  const centerX = 14 + (frame - 1) * 1.18;
  const centerY = 32 + 12 * Math.sin((frame - 1) / 7);
  const stops = [[16,52,69], [45,112,132], [107,183,177], [224,237,170]];
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 64; x++) {
      const value = Math.exp(-((x-centerX)**2 + (y-centerY)**2)/100);
      const scaled = value * 2.999;
      const index = Math.floor(scaled), fraction = scaled-index;
      const rgb = stops[index].map((v,i) => Math.round(v+(stops[index+1][i]-v)*fraction));
      context.fillStyle = `rgb(${rgb.join(',')})`;
      context.fillRect(x*4,y*4,4,4);
    }
  }
}
slider.addEventListener('input', drawFrame);
drawFrame();
// Clipboard 需要安全上下文及浏览器权限；失败时提供手动复制路径。
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('szjzyx@gmail.com');
    status.textContent = '邮箱已复制，可以粘贴到你的邮件应用。';
  } catch {
    status.textContent = '浏览器未允许自动复制，请手动选择邮箱：szjzyx@gmail.com';
  }
});
