# 设备分发管理系统

一个用于记录设备分发的前端应用，使用Vue 3、TypeScript和Tailwind CSS构建。

## 功能特点

- 登录系统：防止外人随意访问应用
- 设备管理：创建、编辑和删除设备
- 设备分发：记录设备的分发和归还情况
- 数据统计：通过图表展示分发数据的统计信息
- 数据导出：将查询结果导出为CSV格式

## 技术栈

- Vue 3
- TypeScript
- Tailwind CSS
- Pinia (状态管理)
- Vue Router
- Chart.js (图表展示)
- Day.js (日期处理)
- Papa Parse (CSV导出)

## 开发环境设置

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 使用说明

### 登录

使用以下默认账号密码登录系统：

- 用户名：admin
- 密码：password123

### 设备管理

在"设备管理"页面，您可以：

- 添加新设备
- 编辑现有设备
- 删除设备
- 分发设备给用户

### 分发记录

在"分发记录"页面，您可以：

- 查看所有设备的分发记录
- 按日期、设备类型等筛选记录
- 记录设备归还
- 导出分发记录为CSV

### 统计报表

在"统计报表"页面，您可以：

- 查看设备分发的统计数据
- 按时间段和设备类型筛选数据
- 查看月度分发趋势图
- 查看部门分发统计图
- 查看最常分发的设备列表

## 数据存储

所有数据存储在浏览器的localStorage中，刷新页面或关闭浏览器后数据仍然保留。

## 部署指南

### 在 Ubuntu 系统上部署

#### 前提条件

- Ubuntu 服务器 (推荐 Ubuntu 20.04 LTS 或更高版本)
- Node.js (推荐 v16 或更高版本)
- Nginx (用作 Web 服务器)

#### 安装 Node.js 和 npm

```bash
# 更新软件包列表
sudo apt update

# 安装 Node.js 和 npm
sudo apt install -y nodejs npm

# 安装 n 模块来管理 Node.js 版本
sudo npm install -g n

# 安装最新的稳定版 Node.js
sudo n stable

# 验证安装
node -v
npm -v
```

#### 安装 Nginx

```bash
# 安装 Nginx
sudo apt install -y nginx

# 启动 Nginx 并设置为开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 检查 Nginx 状态
sudo systemctl status nginx
```

#### 部署应用

1. **将项目传输到服务器**

   使用 SCP、SFTP 或 Git 克隆将项目文件传输到服务器：

   ```bash
   # 使用 SCP 示例 (在本地执行)
   scp -r ./Equipment_Send username@your_server_ip:/path/to/destination

   # 或使用 Git (在服务器上执行)
   git clone your_repository_url
   ```

2. **安装依赖并构建项目**

   ```bash
   # 进入项目目录
   cd /var/www/html/Equipment_Send

   # 添加权限
   sudo chown -R iot:iot /var/www/html/Equipment_Send

   # 安装依赖
   npm install

   # 构建生产版本
   npm run build
   ```

3. **配置 Nginx**

   创建一个 Nginx 配置文件：

   ```bash
   sudo nano /etc/nginx/sites-available/equipment-send
   ```

   添加以下配置：

   ```nginx
   server {
       listen 80;
       server_name your_domain_or_ip;

       root /path/to/Equipment_Send/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 禁止访问 . 开头的隐藏文件
       location ~ /\. {
           deny all;
       }
   }
   ```

   启用站点配置并重启 Nginx：

   ```bash
   sudo ln -s /etc/nginx/sites-available/equipment-send /etc/nginx/sites-enabled/
   sudo nginx -t  # 测试配置是否有效
   sudo systemctl restart nginx
   ```

4. **设置防火墙 (可选)**

   如果您使用 UFW 防火墙，请确保允许 HTTP 和 HTTPS 流量：

   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw status
   ```

5. **访问应用**

   现在您可以通过服务器的 IP 地址或域名访问应用：
   
   ```
   http://your_domain_or_ip
   ```

### 使用 Docker 部署 (可选)

如果您更喜欢使用 Docker 进行部署，请按照以下步骤操作：

1. **创建 Dockerfile**

   在项目根目录创建 `Dockerfile` 文件：

   ```dockerfile
   # 构建阶段
   FROM node:16 as build-stage
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # 生产阶段
   FROM nginx:stable-alpine as production-stage
   COPY --from=build-stage /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **创建 nginx.conf 文件**

   ```nginx
   server {
       listen 80;
       server_name localhost;

       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. **构建并运行 Docker 容器**

   ```bash
   # 构建 Docker 镜像
   docker build -t equipment-send .

   # 运行容器
   docker run -d -p 80:80 --name equipment-send equipment-send
   ```

4. **访问应用**

   通过浏览器访问 `http://localhost` 或服务器 IP 地址。
