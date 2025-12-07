# Sử dụng Node.js bản nhẹ (Alpine)
FROM node:22-alpine

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file package để cài thư viện trước (tận dụng cache của Docker)
COPY package*.json ./

# Cài đặt các thư viện (dependencies)
# Dùng --force nếu gặp lỗi xung đột version, hoặc chỉ dùng npm install
RUN npm install --legacy-peer-deps

# Cài thêm Angular CLI toàn cầu để tiện dùng lệnh ng (tuỳ chọn)
RUN npm install -g @angular/cli

# Copy toàn bộ code nguồn vào container
COPY . .

# Mở port 4200 (Port mặc định của Angular)
EXPOSE 4200

# LỆNH QUAN TRỌNG:
# Phải thêm --host 0.0.0.0 để truy cập được từ bên ngoài container
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]