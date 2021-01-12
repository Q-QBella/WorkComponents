###  文件上传
需要使用axios

还使用了element的icon，el-icon-plus

1. 传入参数：

| 参数名    | 类型   | 是否必传 | 说明                             |
| --------- | ------ | -------- | -------------------------------- |
| accept    | String | 否       | 选择文件的限制                   |
| setData   | Object | 否       | 请求需要携带的参数               |
| headers   | Object | 否       | 设置请求头                       |
| upLoadUrl | String | 是       | 发送请求的url                    |
| imageUrl  | String | 否       | 如果需要图片进行回显传入图片地址 |

2. 抛出的函数

   | 函数名           | 类型     | 返回值  | 说明                                   |
   | ---------------- | -------- | ------- | -------------------------------------- |
   | onUploadProgress | Function | Number  | 上传进度，（百分制需要乘0.01）         |
   | onUploadSuccess  | Function | Object  | 上传成功函数回调                       |
   | onUploadError    | Function | Object  | 上传失败函数回调                       |
   | fileLimit        | Function | Boolean | 当选择的文件不符合accept的要求才会触发 |

   

