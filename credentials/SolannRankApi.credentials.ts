import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SolannRankApi implements ICredentialType {
	name = 'solannRankApi';
	displayName = 'Solann Rank API';
	documentationUrl = 'https://your-documentation-url.com';
	properties: INodeProperties[] = [
		{
			displayName: 'MCP Server URL',
			name: 'serverUrl',
			type: 'string',
			default: 'https://mcp.solannrank.com/api/mcp',
			placeholder: 'https://mcp.solannrank.com/api/mcp',
			required: true,
			description: 'The URL of your MCP server',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API key for authentication',
		},
		{
			displayName: 'Ignore SSL Errors',
			name: 'allowUnauthorizedCerts',
			type: 'boolean',
			default: true,
			description: 'Whether to ignore SSL certificate errors (useful for localhost development)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.serverUrl}}',
			url: '',
			method: 'POST',
			body: {
				jsonrpc: '2.0',
				method: 'tools/list',
				id: 1,
			},
			skipSslCertificateValidation: '={{$credentials.allowUnauthorizedCerts}}',
		},
	};
}
