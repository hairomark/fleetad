(function() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM 内容已加载');

        const wrapper = document.getElementById('fleetTableWrapper');
        const table = wrapper.querySelector('#fleetTable');
        if (!table) {
            console.error('未找到 fleetTable 元素');
            return;
        }

        // 创建 tableContainer 和 imageOverlay
        const tableContainer = wrapper.querySelector('#tableContainer');
        const imageOverlay = document.createElement('div');
        imageOverlay.id = 'imageOverlay';
        tableContainer.insertBefore(imageOverlay, table);

        // 设置图片路径
        const imageSrc = '13212.png';

        // 预加载图片
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            console.log(`图片加载成功: ${imageSrc}`);
            imageOverlay.style.backgroundImage = `url("${imageSrc}")`;
        };
        img.onerror = () => console.error(`图片加载失败: ${imageSrc}`);

        // 获取除第一列外的所有列
        const columns = table.querySelectorAll('tr td:not(:first-child), tr th:not(:first-child)');

        // 设置图片覆盖层位置和大小的函数
        function setImageOverlayPosition(column) {
            const columnRect = column.getBoundingClientRect();
            const tableContainerRect = tableContainer.getBoundingClientRect();
            
            imageOverlay.style.left = `${columnRect.left - tableContainerRect.left}px`;
            imageOverlay.style.width = `${columnRect.width}px`;
            imageOverlay.style.display = 'block';
        }

        // 为每列添加鼠标进入事件
        columns.forEach((column) => {
            column.addEventListener('mouseenter', function() {
                setImageOverlayPosition(this);
            });
        });

        // 添加窗口滚动事件监听器
        window.addEventListener('scroll', function() {
            const activeColumn = wrapper.querySelector('td:hover, th:hover');
            if (activeColumn) {
                setImageOverlayPosition(activeColumn);
            }
        });

        // 为表格容器添加鼠标离开事件
        tableContainer.addEventListener('mouseleave', function() {
            console.log('鼠标离开表格容器');
            imageOverlay.style.display = 'none';
        });

        // 窗口大小改变时重新计算图片覆盖层位置
        window.addEventListener('resize', function() {
            if (imageOverlay.style.display === 'block') {
                const activeColumn = table.querySelector('.highlight');
                if (activeColumn) {
                    setImageOverlayPosition(activeColumn);
                }
            }
        });

        // 在 DOMContentLoaded 事件中添加以下代码
        const tableRect = table.getBoundingClientRect();
        imageOverlay.style.width = `${tableRect.width}px`;
        

        console.log('事件监听器已添加');
    });

    console.log('脚本已执行');
})();