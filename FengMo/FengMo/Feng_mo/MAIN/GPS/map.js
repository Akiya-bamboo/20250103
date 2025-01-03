document.addEventListener('DOMContentLoaded', function() {
    const map = document.getElementById('googleMap');
    const container = document.querySelector('.map-container');
    
    // 計算容器的中心點
    function calculateCenter() {
        const rect = container.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }
    
    // 添加平移效果
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        startY = e.pageY - container.offsetTop;
        scrollLeft = container.scrollLeft;
        scrollTop = container.scrollTop;
    });
    
    container.addEventListener('mouseleave', function() {
        isDragging = false;
    });
    
    container.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    container.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const y = e.pageY - container.offsetTop;
        
        const moveX = x - startX;
        const moveY = y - startY;
        
        container.scrollLeft = scrollLeft - moveX;
        container.scrollTop = scrollTop - moveY;
    });
    
    // 添加縮放效果
    container.addEventListener('wheel', function(e) {
        e.preventDefault();
        const scale = parseFloat(getComputedStyle(map).transform.split(',')[3]) || 1;
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = scale * delta;
        
        // 限制縮放範圍
        if (newScale >= 1.2 && newScale <= 3) {
            map.style.transform = `scale(${newScale})`;
        }
    });
}); 