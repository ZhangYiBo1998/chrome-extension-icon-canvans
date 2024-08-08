// 将图片转化为base64格式
export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
        callback(reader.result)
    };
    reader.readAsDataURL(img);
};

// 将文件resized为目标尺寸
export const resizeImage = (file, targetWidth, targetHeight) => {
    return new Promise((resolve, reject) => {
        // 创建一个FileReader对象来读取文件
        const reader = new FileReader();

        // 文件读取完成后的事件处理
        reader.onload = function(event) {
            const img = new Image();

            // 图像加载完成后的事件处理
            img.onload = function() {
                // 创建一个Canvas元素
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 设置Canvas的尺寸为目标尺寸
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // 在Canvas上绘制图像并调整尺寸
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // 将Canvas内容转换为二进制文件
                canvas.toBlob((blob) => {
                    resolve({
                        file: blob,
                        width: targetWidth,
                        height: targetHeight,
                    });
                }, file.type);
            };

            // 图像加载失败的事件处理
            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };

            // 设置图像的源为文件内容
            img.src = event.target.result;
        };

        // 文件读取失败的事件处理
        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };

        // 读取文件内容
        reader.readAsDataURL(file);
    });
}

// 将base64格式的图片resized为目标尺寸
export const resizeBase64Image = (base64, targetWidth, targetHeight) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        // 图像加载完成后的事件处理
        img.onload = function() {
            // 创建一个Canvas元素
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 设置Canvas的尺寸为目标尺寸
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // 在Canvas上绘制图像并调整尺寸
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            // 将Canvas内容转换为Base64字符串
            const resizedBase64 = canvas.toDataURL('image/png'); // 你可以根据需要更改图像格式
            resolve({
                file: resizedBase64,
                width: targetWidth,
                height: targetHeight,
            });
        };

        // 图像加载失败的事件处理
        img.onerror = function() {
            reject(new Error('Failed to load image'));
        };

        // 设置图像的源为Base64字符串
        img.src = base64;
    });
}

// 下载文件
export const downloadFile = (file, filename) => {
    const aElement = document.createElement('a');
    aElement.setAttribute('href', URL.createObjectURL(file));
    aElement.setAttribute('download', filename);
    aElement.click();
};