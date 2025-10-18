# n8n-nodes-solannrank

This is an n8n community node that integrates with Solann Rank MCP (Model Context Protocol) Server.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-solannrank` in **Enter npm package name**.
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes.
5. Select **Install**.

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-solannrank
```

For Docker-based deployments add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):

```
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-solannrank
```

## Operations

This node supports the following MCP operations:

### Tools
- **List Tools**: Get a list of all available tools from the MCP server
- **Call Tool**: Execute a specific tool with provided arguments

### Prompts
- **List Prompts**: Get a list of all available prompts
- **Get Prompt**: Retrieve a specific prompt with arguments

### Resources
- **List Resources**: Get a list of all available resources
- **Read Resource**: Read a specific resource by URI

## Credentials

You need to configure the following credentials:

- **MCP Server URL**: The URL of your MCP server (e.g., `https://mcp.solannrank.com/api/mcp`)
- **API Key**: Your API key for authentication
- **Ignore SSL Errors**: Enable this for localhost development (disable in production)

## Compatibility

Tested with n8n version 1.0.0+

## Usage

### Example 1: List Available Tools

1. Add the Solann Rank node to your workflow
2. Select Resource: **Tool**
3. Select Operation: **List Tools**
4. Execute the node

### Example 2: Call a Tool

1. Add the Solann Rank node to your workflow
2. Select Resource: **Tool**
3. Select Operation: **Call Tool**
4. Enter Tool Name: e.g., `search`
5. Enter Arguments as JSON: e.g., `{"query": "example"}`
6. Execute the node

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [MCP (Model Context Protocol)](https://modelcontextprotocol.io/)

## Development

### Build

```bash
npm install
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

## License

[MIT](LICENSE.md)
