FROM alpine:latest

# Cài đặt dependencies
RUN apk add --no-cache ca-certificates wget unzip bash && update-ca-certificates

WORKDIR /app

# Download PocketBase (version mới nhất)
RUN wget -O pocketbase.zip https://github.com/pocketbase/pocketbase/releases/download/v0.29.3/pocketbase_0.29.3_linux_amd64.zip

# Giải nén và set permissions
RUN unzip pocketbase.zip && chmod +x pocketbase && rm -f pocketbase.zip

# Copy hooks và migrations vào image
COPY pb_hooks/ /app/pb_hooks/
COPY pb_migrations/ /app/pb_migrations/

# Tạo thư mục data (sẽ được mount bằng Railway Volume)
RUN mkdir -p /pb_data

# Expose port (Railway sẽ đặt PORT động)
EXPOSE 8080

# Auto-restore nếu chưa có DB và PB_BACKUP_URL được cung cấp, sau đó migrate rồi serve
CMD ["sh", "-c", "if [ ! -f /pb_data/data.db ] && [ -n \"$PB_BACKUP_URL\" ]; then echo 'No data.db found. Restoring from PB_BACKUP_URL...'; wget -O /tmp/pb_seed.zip \"$PB_BACKUP_URL\" && ./pocketbase backup restore /tmp/pb_seed.zip --dir=/pb_data || echo 'Restore failed or no backup provided.'; fi; ./pocketbase migrate up --dir=/pb_data --migrationsDir=/app/pb_migrations && ./pocketbase serve --http=0.0.0.0:${PORT:-8080} --dir=/pb_data --hooksDir=/app/pb_hooks"]