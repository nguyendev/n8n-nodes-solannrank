# 🚀 Quick Start Guide

## ✅ Những gì đã được tạo

Một n8n community node hoàn chỉnh với:

- ✅ **Node chính** (`SolannRank.node.ts`) - Xử lý tất cả MCP operations
- ✅ **Credentials** (`SolannRankApi.credentials.ts`) - Quản lý authentication
- ✅ **TypeScript configuration** - Với strict mode
- ✅ **Build system** - TypeScript + Gulp
- ✅ **Documentation** - README + Usage guide (tiếng Việt)
- ✅ **Example workflow** - Demo các chức năng

## 📦 Cấu trúc Project

```
n8n-nodes-solannrank/
├── credentials/
│   └── SolannRankApi.credentials.ts    # API credentials
├── nodes/
│   └── SolannRank/
│       ├── SolannRank.node.ts          # Node logic
│       └── solannrank.svg              # Node icon
├── dist/                                # Compiled files (sau khi build)
├── examples/
│   └── example-workflow.json           # Example n8n workflow
├── package.json                         # Package config
├── tsconfig.json                        # TypeScript config
├── gulpfile.js                          # Build config
└── README.md                            # Documentation
```

## 🛠️ Các bước tiếp theo

### 1. Test Local với n8n

```bash
# Build node
npm run build

# Link globally
npm link

# Trong n8n installation directory
npm link n8n-nodes-solannrank

# Start n8n
n8n start
```

### 2. Tạo Credential trong n8n

1. Mở n8n UI
2. Settings → Credentials → New
3. Tìm "Solann Rank API"
4. Điền:
   - **MCP Server URL**: `https://localhost:44329/api/mcp`
   - **API Key**: Your API key
   - **Ignore SSL Errors**: ✓ (cho development)

### 3. Import Example Workflow

1. Trong n8n, import file `examples/example-workflow.json`
2. Update credentials trong các nodes
3. Click "Execute Workflow"

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Build project
npm run build

# Watch mode (auto rebuild)
npm run dev

# Lint code
npm run lint

# Fix lint issues
npm run lintfix

# Format code
npm run format
```

## 📝 Sử Dụng Node

### List Tools
```
Resource: Tool
Operation: List Tools
→ Returns: Danh sách tất cả tools available
```

### Call Tool
```
Resource: Tool
Operation: Call Tool
Tool Name: "search"
Arguments: {"query": "example"}
→ Returns: Kết quả từ tool
```

### List Prompts
```
Resource: Prompt
Operation: List Prompts
→ Returns: Danh sách prompts
```

### Get Prompt
```
Resource: Prompt
Operation: Get Prompt
Prompt Name: "summarize"
Arguments: {"text": "content"}
→ Returns: Prompt với arguments
```

### List/Read Resources
```
Resource: Resource
Operation: List Resources / Read Resource
→ Returns: Resources data
```

## 🔍 JSON-RPC Protocol

Node giao tiếp với MCP server qua JSON-RPC 2.0:

**Request:**
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

**Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    // Tool output
  },
  "id": 1
}
```

**Error Response:**
```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32603,
    "message": "Error message"
  },
  "id": 1
}
```

## 📤 Publish to npm

Khi sẵn sàng publish:

1. Update version trong `package.json`
2. Update `CHANGELOG.md`
3. Build và test:
   ```bash
   npm run build
   npm run lint
   ```
4. Login to npm:
   ```bash
   npm login
   ```
5. Publish:
   ```bash
   npm publish
   ```

## 🐛 Troubleshooting

### Build fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Node không xuất hiện trong n8n
```bash
# Unlink và link lại
npm unlink -g n8n-nodes-solannrank
npm link
```

### SSL Certificate Errors
Enable "Ignore SSL Errors" trong credentials (chỉ cho development).

## 📚 Tài liệu

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Detailed Usage Guide](USAGE_VI.md)

## ✨ Features

- ✅ MCP Protocol Integration
- ✅ Tools: List & Call
- ✅ Prompts: List & Get
- ✅ Resources: List & Read
- ✅ SSL bypass cho localhost
- ✅ Continue on fail support
- ✅ TypeScript với strict mode
- ✅ Comprehensive error handling

## 🤝 Contributing

Issues và Pull Requests welcome tại: https://github.com/yourusername/n8n-nodes-solannrank

---

**Happy automating! 🎉**
