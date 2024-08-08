import React, {useEffect, useState} from "react";
import {Card, Image,message, Upload} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const Home = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {

    }, []);


    const beforeUpload = (file) => {
        console.log(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        getBase64(file, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        
        return false;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传图片
            </div>
        </button>
    );

    return (
        <>
            <Card
                title="自动裁剪图标工具"
            >

                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />

                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    action=''
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: '100%',
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </Card>

        </>
    );
};

export default React.memo(Home);