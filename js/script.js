const list=document.getElementById("list");

bundles.forEach(bundle => {
  const item = document.createElement("div");
  item.className = "item active"; // 'active' class stays so all are expanded
  item.innerHTML = `
    <div class="item-header">${bundle.title}</div>
    <div class="item-content">
      <div class="item-thumb">
        <img src="thumbs/${contentType}/${bundle.file}.jpg" alt="${bundle.title || 'Thumbnail'}">
      </div>
      <iframe loading="lazy" scrolling="no" class="bundle-frame" src="bundles/${contentType}/${bundle.file}.html"></iframe>
    </div>
  `;
  list.appendChild(item);

  // Set maxHeight immediately based on thumbnail + iframe
const content = item.querySelector(".item-content");
const iframe = content.querySelector("iframe");
const thumbHeight = content.querySelector(".item-thumb")?.offsetHeight || 0;
content.style.maxHeight = thumbHeight + (iframe?.offsetHeight || 0) + "px";
});

const listContainer=document.getElementById("listContainer");
const scrollHeader=document.getElementById("scrollHeader");
let dropdownOpen=false;
let scrollTimeout;

/* Accordion */


// Listen for iframe height messages to adjust expanded heights dynamically
window.addEventListener('message', e => {
  if (e.data.type === 'setHeight') {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.contentWindow === e.source) {
        iframe.style.height = e.data.height + "px";
        const content = iframe.closest(".item-content");
        content.style.maxHeight = (content.querySelector(".item-thumb")?.offsetHeight || 0) + iframe.offsetHeight + "px";
      }
    });
  }
});



/* Dropdown */

function toggleDropdown(btn){
  const dropdown = btn.parentElement;
  dropdown.classList.toggle("open");
}

document.addEventListener("click", function(e){
  document.querySelectorAll(".dropdown").forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
});

/* Scroll animation */

listContainer.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollTop = listContainer.scrollTop;

    if (scrollTop > 20) {
      scrollHeader.classList.add("shrink");
      listContainer.classList.add("expand");
    } else {
      scrollHeader.classList.remove("shrink");
      listContainer.classList.remove("expand");
    }

    document.querySelectorAll(".bubble").forEach((b, i) => {
      b.style.transform = `translateY(${scrollTop * 0.1 * (i % 3 + 1)}px)`;
    });
  }, 50); // Adjust the delay (in ms) as needed
});



/* Floating bubbles */

const bubbleContainer=document.getElementById("bubbleContainer");

for(let i=0;i<20;i++){
  const bubble=document.createElement("div");
  bubble.className="bubble";

  const size=Math.random()*200+50;
  bubble.style.width=size+"px";
  bubble.style.height=size+"px";
  bubble.style.left=Math.random()*window.innerWidth+"px";
  bubble.style.top=Math.random()*window.innerHeight+"px";

  bubble.style.setProperty('--x1',(Math.random()*40-20)+'px');
  bubble.style.setProperty('--y1',(Math.random()*40-20)+'px');
  bubble.style.setProperty('--x2',(Math.random()*40-20)+'px');
  bubble.style.setProperty('--y2',(Math.random()*40-20)+'px');
  bubble.style.setProperty('--x3',(Math.random()*40-20)+'px');
  bubble.style.setProperty('--y3',(Math.random()*40-20)+'px');

  bubble.style.animationDuration=(Math.random()*20+10)+'s';

  bubbleContainer.appendChild(bubble);
}