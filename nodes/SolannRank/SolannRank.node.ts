import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class SolannRank implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Solann Rank',
		name: 'solannRank',
		icon: 'file:solannrank.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Solann Rank MCP Server',
		defaults: {
			name: 'Solann Rank',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'solannRankApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Tool',
						value: 'tool',
					},
					{
						name: 'Prompt',
						value: 'prompt',
					},
					{
						name: 'Resource',
						value: 'resource',
					},
				],
				default: 'tool',
			},
			// Tool Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tool'],
					},
				},
				options: [
					{
						name: 'List Tools',
						value: 'list',
						description: 'List all available tools',
						action: 'List all available tools',
					},
					{
						name: 'Call Tool',
						value: 'call',
						description: 'Call a specific tool',
						action: 'Call a specific tool',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Tool Name',
				name: 'toolName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tool'],
						operation: ['call'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the tool to call',
			},
			{
				displayName: 'Arguments',
				name: 'arguments',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['tool'],
						operation: ['call'],
					},
				},
				default: '{}',
				description: 'Arguments to pass to the tool (as JSON object)',
			},
			// Prompt Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
					},
				},
				options: [
					{
						name: 'List Prompts',
						value: 'list',
						description: 'List all available prompts',
						action: 'List all available prompts',
					},
					{
						name: 'Get Prompt',
						value: 'get',
						description: 'Get a specific prompt',
						action: 'Get a specific prompt',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Prompt Name',
				name: 'promptName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				default: '',
				required: true,
				description: 'Name of the prompt to get',
			},
			{
				displayName: 'Arguments',
				name: 'arguments',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				default: '{}',
				description: 'Arguments for the prompt (as JSON object)',
			},
			// Resource Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['resource'],
					},
				},
				options: [
					{
						name: 'List Resources',
						value: 'list',
						description: 'List all available resources',
						action: 'List all available resources',
					},
					{
						name: 'Read Resource',
						value: 'read',
						description: 'Read a specific resource',
						action: 'Read a specific resource',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Resource URI',
				name: 'resourceUri',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['resource'],
						operation: ['read'],
					},
				},
				default: '',
				required: true,
				description: 'URI of the resource to read',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('solannRankApi');

		const serverUrl = credentials.serverUrl as string;
		const apiKey = credentials.apiKey as string;
		const allowUnauthorizedCerts = credentials.allowUnauthorizedCerts as boolean;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let method = '';
				let params: any = {};

				// Build JSON-RPC request based on resource and operation
				if (resource === 'tool') {
					if (operation === 'list') {
						method = 'tools/list';
					} else if (operation === 'call') {
						method = 'tools/call';
						const toolName = this.getNodeParameter('toolName', i) as string;
						const argumentsJson = this.getNodeParameter('arguments', i) as string;
						let args = {};
						try {
							args = JSON.parse(argumentsJson);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in arguments: ${error}`,
								{ itemIndex: i },
							);
						}
						params = {
							name: toolName,
							arguments: args,
						};
					}
				} else if (resource === 'prompt') {
					if (operation === 'list') {
						method = 'prompts/list';
					} else if (operation === 'get') {
						method = 'prompts/get';
						const promptName = this.getNodeParameter('promptName', i) as string;
						const argumentsJson = this.getNodeParameter('arguments', i) as string;
						let args = {};
						try {
							args = JSON.parse(argumentsJson);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								`Invalid JSON in arguments: ${error}`,
								{ itemIndex: i },
							);
						}
						params = {
							name: promptName,
							arguments: args,
						};
					}
				} else if (resource === 'resource') {
					if (operation === 'list') {
						method = 'resources/list';
					} else if (operation === 'read') {
						method = 'resources/read';
						const resourceUri = this.getNodeParameter('resourceUri', i) as string;
						params = {
							uri: resourceUri,
						};
					}
				}

				// Build JSON-RPC 2.0 request
				const requestBody = {
					jsonrpc: '2.0',
					method,
					params,
					id: i + 1,
				};

				// Make HTTP request
				const options = {
					method: 'POST' as IHttpRequestMethods,
					headers: {
						'Content-Type': 'application/json',
						'X-API-Key': apiKey,
					},
					body: requestBody,
					skipSslCertificateValidation: allowUnauthorizedCerts,
					url: serverUrl,
					json: true,
				};

				const response = await this.helpers.request(options);

				// Handle JSON-RPC response
				if (response.error) {
					throw new NodeOperationError(
						this.getNode(),
						`MCP Server Error: ${response.error.message} (code: ${response.error.code})`,
						{ itemIndex: i },
					);
				}

				returnData.push({
					json: response.result || response,
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
