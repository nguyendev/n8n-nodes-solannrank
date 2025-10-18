# Hướng Dẫn Sử Dụng n8n-nodes-solannrank

## Cài Đặt

### Cách 1: Cài đặt từ npm (sau khi publish)
```bash
npm install n8n-nodes-solannrank
```

### Cách 2: Test local với n8n

1. Build node:
```bash
npm run build
```

2. Link package:
```bash
npm link
```

3. Trong thư mục cài đặt n8n của bạn:
```bash
npm link n8n-nodes-solannrank
```

4. Khởi động n8n:
```bash
n8n start
```

## Cấu Hình Credentials

Trong n8n, tạo credential mới:

1. Chọn **Solann Rank API**
2. Điền thông tin:
   - **MCP Server URL**: `https://localhost:44329/api/mcp` (hoặc URL server của bạn)
   - **API Key**: API key của bạn
   - **Ignore SSL Errors**: Bật cho localhost development

## Sử Dụng

### Ví Dụ 1: Liệt Kê Tools

1. Thêm node **Solann Rank** vào workflow
2. Chọn:
   - Resource: **Tool**
   - Operation: **List Tools**
3. Execute

Response sẽ trả về danh sách các tools có sẵn.

### Ví Dụ 2: Gọi Tool

1. Thêm node **Solann Rank**
2. Chọn:
   - Resource: **Tool**
   - Operation: **Call Tool**
   - Tool Name: `search` (hoặc tên tool khác)
   - Arguments: `{"query": "test"}` (JSON format)
3. Execute

### Ví Dụ 3: Liệt Kê Prompts

1. Thêm node **Solann Rank**
2. Chọn:
   - Resource: **Prompt**
   - Operation: **List Prompts**
3. Execute

### Ví Dụ 4: Lấy Prompt

1. Thêm node **Solann Rank**
2. Chọn:
   - Resource: **Prompt**
   - Operation: **Get Prompt**
   - Prompt Name: `summarize` (hoặc tên prompt khác)
   - Arguments: `{"text": "content to summarize"}`
3. Execute

### Ví Dụ 5: Liệt Kê Resources

1. Thêm node **Solann Rank**
2. Chọn:
   - Resource: **Resource**
   - Operation: **List Resources**
3. Execute

### Ví Dụ 6: Đọc Resource

1. Thêm node **Solann Rank**
2. Chọn:
   - Resource: **Resource**
   - Operation: **Read Resource**
   - Resource URI: `file:///path/to/resource`
3. Execute

## JSON-RPC Protocol

Node này sử dụng JSON-RPC 2.0 để giao tiếp với MCP server:

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "tool-name",
    "arguments": {}
  },
  "id": 1
}
```

## Xử Lý Lỗi

Node hỗ trợ **Continue on Fail**. Khi bật:
- Lỗi sẽ được trả về dưới dạng JSON object
- Workflow tiếp tục chạy
- Output: `{ "error": "error message" }`

## Troubleshooting

### SSL Certificate Errors
Bật **Ignore SSL Errors** trong credentials cho localhost development.

### Connection Refused
Kiểm tra:
- MCP Server có đang chạy không?
- URL có đúng không?
- Firewall có block không?

### Invalid API Key
Kiểm tra API key trong credentials có chính xác không.

### Invalid JSON in Arguments
Đảm bảo Arguments field là JSON hợp lệ:
```json
{"key": "value"}
```

## Development

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
npm run lintfix
```

### Format
```bash
npm run format
```

## Liên Hệ

- Issues: [GitHub Issues](https://github.com/yourusername/n8n-nodes-solannrank/issues)
- Documentation: [README.md](README.md)
