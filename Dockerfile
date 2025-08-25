FROM alpine:latest

# Cài đặt dependencies
RUN apk add --no-cache ca-certificates wget unzip && update-ca-certificates

# Download PocketBase (version mới nhất)
RUN wget -O pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.22.0/pocketbase_0.22.0_linux_amd64.zip

# Giải nén và set permissions
RUN unzip pocketbase.zip && chmod +x pocketbase

# Tạo thư mục data
RUN mkdir -p /pb_data

# Expose port
EXPOSE 8080

# Chạy PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8080", "--dir=/pb_data"]