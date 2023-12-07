# PortalUI

此项目用于定制 Alauda 产品 Portal 页。

## 本地开发启动项目

```
# node v20+

yarn install

yarn start
```

> 注：本地开发时需通过 `.consolerc` 等方式配置 API 环境信息。

## 编译代码

```
yarn build
```

## 构建 Docker 镜像

```
docker build -t <your-image-tag> .
```

## 替换定制开发的 Portal 页

上传 Docker 镜像后更新 global 集群系统命名空间中名为 `portal` 的 `ConfigMap` 中引用的镜像即可。

您也可以完全自行开发网页代码并将静态资源打包到 Docker 镜像中，然后将 `ConfigMap` 中的 `image` 替换为您的镜像地址，并将 `sourceDir` 替换为 `index.html` 在镜像中的路径。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  finalizers:
    - alauda.io/image-loader
  labels:
    image-load-config: "true"
  name: portal
  namespace: cpaas-system
data:
  images: >
    [
      {
       "image": "<your-image>",
       "destDir": "/console-portal",
       "sourceDir": "/portal/dist/static"
      }
    ]
```
