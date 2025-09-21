// pagefx.js
(function(){
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 入場：pageshow（BFCache対応）/ DOMContentLoaded のどちらでも外せるように
  function reveal(){
    if(reduce) { html.classList.remove('fx-enter'); return; }
    requestAnimationFrame(()=> html.classList.remove('fx-enter'));
  }
  window.addEventListener('pageshow', reveal, { once:true });
  document.addEventListener('DOMContentLoaded', ()=> {
    // もしfx-enterが残っていたら念のため外す
    if(html.classList.contains('fx-enter')) reveal();
  });

  // 退場：内部リンクのみフェードアウト → 遷移
  let locking = false;
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a'); if(!a) return;

    const href   = a.getAttribute('href') || '';
    const target = a.getAttribute('target');
    const ext    = a.host && a.host !== location.host;
    const special= href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:');

    if(ext || special || target === '_blank') return;

    const url = new URL(href, location.href);
    if(url.href === location.href) return;     // 同一URLは除外
    if(reduce || locking) return;

    e.preventDefault();
    locking = true;
    html.classList.add('fx-exit');
    setTimeout(()=> location.href = url.href, 520);
  });

  // 戻る/進む後のクリーンアップ
  window.addEventListener('pageshow', ()=> html.classList.remove('fx-exit'));
})();
