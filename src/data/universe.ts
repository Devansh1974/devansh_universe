export interface PreviewInfo {
  title: string;
  subtitle: string;
  actionText: string;
}

export interface UniverseNode {
  id: string;
  label: string;
  group: 'core' | 'projects' | 'research' | 'writing' | 'shayari' | 'community' | 'experience' | 'skills' | 'future';
  level: number; // 0 = Center, 1 = Main Star, 2 = Sub Star
  val: number; // Size/weight for physics
  description?: string;
  preview: PreviewInfo;
  color?: string;
  // Dynamic world content specific to each domain
  content?: any;
}

export interface UniverseLink {
  source: string;
  target: string;
}

export const universeNodes: UniverseNode[] = [
  // -------------------------------------------------------------
  // LEVEL 0: CENTER OF THE UNIVERSE
  // -------------------------------------------------------------
  {
    id: 'devansh',
    label: 'DEVANSH',
    group: 'core',
    level: 0,
    val: 45,
    color: '#ffffff',
    description: 'Devansh - Multi-disciplinary builder, researcher, and writer.',
    preview: {
      title: 'Devansh Singh',
      subtitle: 'Living Digital Universe • Click Orbit to Enter Worlds',
      actionText: 'Explore Universe →'
    }
  },

  // -------------------------------------------------------------
  // LEVEL 1: MAIN CATEGORIES (THE GALAXIES)
  // -------------------------------------------------------------
  {
    id: 'projects',
    label: 'Projects',
    group: 'projects',
    level: 1,
    val: 28,
    color: '#38bdf8',
    description: 'A playground of software engineering, custom architecture, and products.',
    preview: {
      title: 'Projects Dimension',
      subtitle: 'StockBeacon • Chatty • AI Bot',
      actionText: 'Enter Dimension →'
    }
  },
  {
    id: 'writing',
    label: 'Writing & Research',
    group: 'writing',
    level: 1,
    val: 28,
    color: '#fb923c',
    description: 'Academic preprints, dynamic articles on tech ethics, and product philosophy.',
    preview: {
      title: 'Writing & Research',
      subtitle: 'Academic preprints & Medium feed',
      actionText: 'Enter Portal →'
    }
  },
  {
    id: 'shayari',
    label: 'Shayari',
    group: 'shayari',
    level: 1,
    val: 22,
    color: '#d97706',
    description: 'Original Urdu/Hindi couplets, raw poetry, and journal expressions.',
    preview: {
      title: 'Shayari Dimension',
      subtitle: 'Notebook of poetry & couplets',
      actionText: 'Open Journal →'
    }
  },
  {
    id: 'community',
    label: 'Public Speaker',
    group: 'community',
    level: 1,
    val: 25,
    color: '#c5a880',
    description: 'Public speaking, technical keynotes, and system architecture presentations.',
    preview: {
      title: 'Public Speaker',
      subtitle: 'Youtube • Keynotes • Talks',
      actionText: 'Explore Talks →'
    }
  },
  {
    id: 'experience',
    label: 'Experience',
    group: 'experience',
    level: 1,
    val: 20,
    color: '#818cf8',
    description: 'Professional roadmap and engineering accomplishments.',
    preview: {
      title: 'Experience History',
      subtitle: 'Builder & Systems Engineer',
      actionText: 'View Timeline →'
    }
  },
  {
    id: 'skills',
    label: 'Skills',
    group: 'skills',
    level: 1,
    val: 18,
    color: '#34d399',
    description: 'Core languages, backend architectures, and deep learning frameworks.',
    preview: {
      title: 'Tech Constellation',
      subtitle: 'Systems, AI & Design Stack',
      actionText: 'Scan Skills →'
    }
  },
  {
    id: 'future',
    label: 'Future',
    group: 'future',
    level: 1,
    val: 21,
    color: '#f43f5e',
    description: 'Future Dimension (Under Development). Upcoming integrations.',
    preview: {
      title: 'Future Horizons',
      subtitle: 'Under Development',
      actionText: 'Sandbox Coming Soon →'
    }
  },
  {
    id: 'connect',
    label: 'Connect',
    group: 'writing',
    level: 1,
    val: 26,
    color: '#f472b6',
    description: 'Get in touch for internships, projects, or collaborations.',
    preview: {
      title: 'Connect & Inquire',
      subtitle: 'Scroll to Message Form',
      actionText: 'Scroll to Contact Section →'
    }
  },

  // -------------------------------------------------------------
  // LEVEL 2: SPECIFIC SUB-ITEMS / PROJECTS / RESEARCH CORES
  // -------------------------------------------------------------
  // Sub-projects
  {
    id: 'stockbeacon',
    label: 'StockBeacon',
    group: 'projects',
    level: 2,
    val: 12,
    color: '#0ea5e9',
    description: 'High-frequency algorithmic stock signal processor utilizing deep LSTM networks.',
    preview: {
      title: 'StockBeacon',
      subtitle: 'Deep Learning Trading Engine',
      actionText: 'Explore Case Study →'
    },
    content: {
      tagline: 'Deep Learning Trading Signal Engine',
      description: 'StockBeacon is a low-latency predictive pipeline for stock market volatility and direction signals. Using high-frequency order book data, it maps temporal dependencies using multi-layered LSTM networks to yield trade execution signals with sub-millisecond precision.',
      tech: ['React', 'Node.js', 'Python (Keras/TensorFlow)', 'WebSockets', 'Redis', 'Docker'],
      codeSnippet: `// High-frequency order book data stream processor
const startSignalEngine = async (ticker) => {
  const ws = new WebSocket(\`wss://feed.stockbeacon.io/live?symbol=\${ticker}\`);
  const redisPublisher = createClient();
  
  ws.on('message', async (data) => {
    const orderBookState = JSON.parse(data);
    const featureVector = extractOrderBookImbalance(orderBookState);
    
    // Evaluate model inference via local Python microservice API
    const response = await axios.post('http://inference-srv/predict', { features: featureVector });
    const signal = response.data.prediction; // BUY, SELL, HOLD
    
    if (signal !== 'HOLD') {
      await redisPublisher.publish('market-signals', JSON.stringify({ ticker, signal, ts: Date.now() }));
    }
  });
};`,
      diagram: 'OrderBook Stream -> Extractor -> TensorFlow Inference Server -> Redis PubSub -> Execute Order',
      github: 'https://github.com/devansh/stockbeacon',
      demo: 'https://stockbeacon.devansh.io'
    }
  },
  {
    id: 'chatty',
    label: 'Chatty',
    group: 'projects',
    level: 2,
    val: 11,
    color: '#38bdf8',
    description: 'End-to-end encrypted messaging engine supporting P2P socket rooms.',
    preview: {
      title: 'Chatty Messenger',
      subtitle: 'Secure WebRTC Messaging Client',
      actionText: 'View Repository →'
    },
    content: {
      tagline: 'End-to-End Encrypted WebRTC Messenger',
      description: 'Chatty is a secure-first client-side messaging app. It creates direct peer-to-peer signaling networks over WebRTC, ensuring that text, media, and voice conversations remain local. It bypasses centralized cloud databases by exchanging public keys in ephemeral socket chambers.',
      tech: ['React', 'WebRTC', 'Socket.io', 'Web Crypto API', 'TailwindCSS'],
      codeSnippet: `// Generate client keys for peer-to-peer connection
const generateSecKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  return keyPair;
};`,
      diagram: 'Client A -> Ephemeral Signaling Server (Socket.io) -> WebRTC Handshake -> Direct Encrypted P2P Tunnel -> Client B',
      github: 'https://github.com/devansh/chatty-p2p',
      demo: 'https://chatty.devansh.io'
    }
  },
  {
    id: 'aibot',
    label: 'AI Bot',
    group: 'projects',
    level: 2,
    val: 10,
    color: '#0284c7',
    description: 'Distributed orchestration agent acting as a personal workspace administrator.',
    preview: {
      title: 'AI Bot Workspace',
      subtitle: 'Agentic LLM Workspace Manager',
      actionText: 'Read Architecture →'
    },
    content: {
      tagline: 'Agentic LLM Workspace Controller',
      description: 'AI Bot is a lightweight background worker designed to automate folder reorganizations, local git actions, and schedule management based on natural language commands. Running locally, it hooks directly into command line shells to coordinate system actions through a semantic tool-use framework.',
      tech: ['Node.js', 'Gemini API', 'TypeScript', 'ShellJS', 'Zsh Hooks'],
      codeSnippet: `// Autonomous agentic loop utilizing tool calls
async function runAgentLoop(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  let chat = model.startChat({
    tools: [{ functionDeclarations: fileSystemTools }],
  });
  
  let result = await chat.sendMessage(prompt);
  const call = result.response.functionCalls?.[0];
  if (call) {
    const toolResult = await executeTool(call.name, call.args);
    result = await chat.sendMessage([{ functionResponse: { name: call.name, response: toolResult } }]);
  }
  return result.response.text;
}`,
      diagram: 'Shell Hook -> Gemini NLP -> Tool-Call Decider -> Exec Sandbox -> Git/File updates -> Feedback',
      github: 'https://github.com/devansh/agent-bot',
      demo: 'https://aibot.devansh.io'
    }
  },
  {
    id: 'mcp_server',
    label: 'MCP Server',
    group: 'projects',
    level: 2,
    val: 12,
    color: '#0284c7',
    description: 'Anthropic Model Context Protocol server exposing filesystem & agentic shell execution tools.',
    preview: {
      title: 'MCP Server Agent',
      subtitle: 'Model Context Protocol Server',
      actionText: 'Explore Repository →'
    },
    content: {
      tagline: 'Autonomous Model Context Protocol Server',
      description: 'MCP Server Agent is a Node/TypeScript backend implementation of Anthropic\'s Model Context Protocol. It allows generative models to run verified terminal commands, read/write local workspaces, and crawl web content through declarative tools.',
      tech: ['TypeScript', 'Node.js', 'Anthropic MCP SDK', 'ShellJS', 'Zsh Hooks'],
      codeSnippet: `// Register MCP server tools dynamically
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "mcp-agent-shell",
  version: "1.0.0"
}, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: [
    {
      name: "execute_command",
      description: "Run custom commands on the system shell",
      inputSchema: { type: "object", properties: { cmd: { type: "string" } } }
    }
  ] };
});`,
      diagram: 'Agent Client -> Stdio Transport -> MCP Server Decider -> Execute Command -> Output feedback',
      github: 'https://github.com/Devansh1974/MCP_AI_Server_Agent',
      demo: ''
    }
  },
  {
    id: 'education_bihar',
    label: 'Bihar Education',
    group: 'projects',
    level: 2,
    val: 11,
    color: '#34d399',
    description: 'Dynamic public data visualizer charting educational demographics in Bihar.',
    preview: {
      title: 'Lack of Education: Bihar',
      subtitle: 'Open Source Data Visualization',
      actionText: 'View Dashboard →'
    },
    content: {
      tagline: 'Data Visualization Dashboard',
      description: 'Lack of Education: Bihar Edition is a collaborative data mapping portal charting school facilities, literacy imbalances, and resource distributions across rural districts. Created under the Kalvium Community developer initiative.',
      tech: ['React', 'D3.js', 'TailwindCSS', 'GeoJSON', 'Chart.js'],
      codeSnippet: `// Render district enrollment metric graphs using D3
const drawImbalanceChart = (data, container) => {
  const svg = d3.select(container).append("svg")
    .attr("width", 500)
    .attr("height", 300);
    
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 45)
    .attr("y", d => 300 - d.literacyRate * 3)
    .attr("width", 40)
    .attr("height", d => d.literacyRate * 3)
    .attr("fill", "#34d399");
};`,
      diagram: 'Public Census API -> GeoJSON parser -> React D3 components -> Heatmap grid',
      github: 'https://github.com/kalviumcommunity/S69_Lack_of_Education_Bihar_Edition',
      demo: ''
    }
  },

  // Combined Research Publication in Writing
  {
    id: 'research_paper_1',
    label: 'Research: AI & Fraud Detection',
    group: 'writing',
    level: 2,
    val: 14,
    color: '#a78bfa',
    description: 'An Empirical Analysis of GNNs in Financial Transaction Graph Networks.',
    preview: {
      title: 'Research Publication',
      subtitle: 'GNNs & Anomaly Detection',
      actionText: 'Read Details & Link →'
    },
    content: {
      title: 'Countering Transactional Anomalies: Graph Neural Networks in High-Volume Financial Landscapes',
      isResearch: true,
      journal: 'Academic Preprint / Research Draft',
      authors: 'Devansh Singh',
      abstract: 'With traditional fraud detection models struggling under the sheer scale of modern payment gateways, Graph Neural Networks (GNNs) offer a promising paradigm. This paper introduces TransGraphGAT, a Graph Attention Network architecture specifically optimized for highly imbalanced node-classification tasks. By representing payment accounts as vertices and transactions as directed, timestamped edges, our model models multi-hop relational dependencies.',
      highlights: [
        'Relational representation of payment flows using multi-hop edge attention gates.',
        'Addressing extreme class skew via dynamic neighborhood weighting.',
        'Validated performance against baseline models.'
      ],
      link: 'https://arxiv.org/abs/2606.00000', // Placeholder link
      linkText: 'View Preprint / Publication Draft'
    }
  },

  // Sub-writing
  {
    id: 'writing_1',
    label: 'Tech Ethics & AI',
    group: 'writing',
    level: 2,
    val: 12,
    color: '#fdba74',
    preview: {
      title: 'Tech Ethics & AI',
      subtitle: '7 min read • Medium Editorial',
      actionText: 'Read Article →'
    },
    description: 'Exploring the ethical dimensions of agentic interfaces and the delegation of human agency.',
    content: {
      title: 'The Silent Handover: Ethics of Autonomous Delegation',
      date: 'April 20, 2026',
      readTime: '7 min read',
      introduction: 'We are slowly transitioning from tools that *respond* to commands, to agentic entities that *decide* sequences on our behalf. What happens when our digital representations commit errors in code, finance, or social settings?',
      body: `### The Illusion of User Control

In the early days of personal computers, software acted purely as an extension of the human hand. A text editor sat idle until keys were struck; a database awaited raw queries. With the rapid evolution of Large Language Model agents, we are experiencing a paradigm shift: we are delegating the executive authority to plan, execute, and refactor.

This delegative shift creates a curious cognitive friction. We feel as though we are orchestrating, yet we are increasingly reviewing outputs after the fact. If a system designs a software framework, updates an API endpoint, or trades stocks based on a high-frequency signal, where does the developer's ownership end and the software's autonomy begin?

### System Audits vs. Relational Trust

To construct reliable systems, engineering paradigms rely heavily on static analysis, unit testing, and sandbox environments. However, as agents operate dynamically across open networks, deterministic testing fails to cover combinatorial possibilities. We must transition from treating code as a structural blueprint to treating code as a social actor.

This requires rigorous telemetry. Every tool invocation, choice sequence, and external handshake must be queryable and structurally visualizable—much like a knowledge graph representing a human brain. Without structural visibility, we risk building opaque systems that, while highly functional, are inherently un-debuggable.

### The Editorial Duty

As builders, it is not enough to optimize latency and model precision. Our primary duty is to create interfaces that reveal agency rather than hide it. The aesthetics of developer tools must avoid "magical" black boxes. Instead, they must offer clean, premium interfaces that communicate structural changes with high-fidelity transparency, rendering the neural fabric of the system visible to the human eye.`,
      outro: 'Only by exposing the mechanics of agent decisions can we build a future where autonomous delegation enhances, rather than dilutes, human agency.'
    }
  },
  {
    id: 'writing_2',
    label: 'Future of Interfaces',
    group: 'writing',
    level: 2,
    val: 11,
    color: '#ffedd5',
    preview: {
      title: 'Future of Interfaces',
      subtitle: '5 min read • Design Thoughts',
      actionText: 'Read Article →'
    },
    description: 'Speculating on canvas-based UI and spatial transitions that replace traditional page routing.',
    content: {
      title: 'Infinite Canvas: The Death of the Webpage',
      date: 'June 12, 2026',
      readTime: '5 min read',
      introduction: 'The traditional "web page" is a digital artifact of physical printing presses. Modern screens require spatial layouts that flow, zoom, and adjust dynamically to represent interconnected ideas.',
      body: `### Web Pages as Historical Baggage

In 1991, the World Wide Web was conceived to share structured academic papers. As a result, HTML was heavily built around document semantics: headings, paragraphs, line breaks, and page boundaries. For decades, the internet has structured information into flat, linear pages accessed by clicking links that trigger full-screen reloads.

But our thoughts are not linear. Our projects, knowledge networks, and creative outputs are structured like neural networks—clusters of concepts linked together in multiple directions.

### The Spatial Paradigm

With frameworks like Three.js and high-performance WebGL, we have the capability to represent portfolios, operating systems, and datasets as spatial environments. Instead of clicking "About Me," "Projects," and "Contact," we should zoom in, hover, and slide across an infinite coordinate canvas.

Consider the graph view in Obsidian or the canvas interface of Figma. In these tools, visual proximity represents semantic similarity. Zooming in reveals granularity; panning out reveals structural relationships. By structuring portfolios as a galaxy, we are not just presenting a catalog of achievements; we are presenting the mental schema of the builder.

This approach requires careful execution:
1. **Performance**: Animations must occur at 60fps to prevent motion sickness.
2. **Context**: Users should never feel "lost" in space. There must always be structural anchors (like a clear center node or global back buttons).
3. **Typography**: Layout styles within dimensions must remain highly readable and clean, utilizing contrasting backgrounds and classic typography structures so the spatial layout doesn't degrade into a gimmick.`,
      outro: 'The future web will feel less like flipping a brochure and more like exploring a living digital universe.'
    }
  },

  // Sub-shayari
  {
    id: 'shayari_1',
    label: 'Ghazal 1',
    group: 'shayari',
    level: 2,
    val: 12,
    color: '#f59e0b',
    preview: {
      title: 'Selected Ghazal',
      subtitle: 'Notebook Entry • Urdu Poetry',
      actionText: 'Read Couplet →'
    },
    content: {
      title: 'The Poetry of Space',
      couplets: [
        {
          original: 'सितारों के जहाँ से आगे कोई और भी जहाँ होगा,\nइश्क़ का कारवाँ अब किसी और आसमाँ में होगा।',
          transliteration: 'Sitaron ke jahan se aage koi aur bhi jahan hoga,\nIshq ka karwan ab kisi aur aasman mein hoga.',
          translation: 'Beyond the realm of these stars, another universe awaits,\nThe caravan of love will journey under a different sky.'
        },
        {
          original: 'नज़र नज़र का फ़र्क़ है बस इस कायनात में,\nकोई ख़ाक देखता है तो कोई आसमान लिखता है।',
          transliteration: 'Nazar nazar ka farq hai bas is kayanaat mein,\nKoi khaak dekhta hai toh koi aasman likhta hai.',
          translation: 'It is but the difference of perspective in this universe:\nOne sees only dust, while another writes of the heavens.'
        },
        {
          original: 'अंधेरों से कह दो ज़रा हौसला रखें,\nदिल का चराग़ बुझा नहीं, रौशनी का सफ़र जारी है।',
          transliteration: 'Andheron se keh do zara hausla rakhein,\nDil ka charagh bujha nahi, roshni ka safar jaari hai.',
          translation: 'Tell the darkness to brace itself,\nThe lamp of the heart is not snuffed; the journey of light continues.'
        }
      ]
    }
  },

  // Sub-community
  {
    id: 'comm_1',
    label: 'Hackathons & Talks',
    group: 'community',
    level: 2,
    val: 13,
    color: '#d4af37',
    preview: {
      title: 'Hackathons & Leadership',
      subtitle: 'Impact & Events Overview',
      actionText: 'View Events →'
    },
    content: {
      timeline: [
        {
          year: '2025',
          title: 'Organized Global ML Hackathon',
          role: 'Lead Technical Coordinator',
          details: 'Mentored over 500 participants globally. Coordinated API tokens, GPU cluster allocations, and led the judging panel comprising industry AI leaders.'
        },
        {
          year: '2024',
          title: 'Speaker at Tech Horizons Summit',
          role: 'Panelist: Systems & ML',
          details: 'Delivered a keynote session titled "Interpreting Anomalies in Graph Structures" highlighting graph algorithms in transaction routing.'
        },
        {
          year: '2023',
          title: 'First Place - AI Hackathon',
          role: 'Full Stack AI Lead',
          details: 'Built StockBeacon prototype in 36 hours. Won the grand prize among 120 competing engineering teams for predictive accuracy and implementation.'
        }
      ],
      metrics: [
        { value: '500+', label: 'Developers Mentored' },
        { value: '3', label: 'Hackathons Organized' },
        { value: '5', label: 'Tech Keynotes Delivered' }
      ]
    }
  }
];

export const universeLinks: UniverseLink[] = [
  // Links from center DEVANSH to primary categories
  { source: 'devansh', target: 'projects' },
  { source: 'devansh', target: 'writing' },
  { source: 'devansh', target: 'shayari' },
  { source: 'devansh', target: 'community' },
  { source: 'devansh', target: 'experience' },
  { source: 'devansh', target: 'skills' },
  { source: 'devansh', target: 'future' },
  { source: 'devansh', target: 'connect' },

  // Links from Projects category to individual projects
  { source: 'projects', target: 'stockbeacon' },
  { source: 'projects', target: 'chatty' },
  { source: 'projects', target: 'aibot' },
  { source: 'projects', target: 'mcp_server' },
  { source: 'projects', target: 'education_bihar' },

  // Links from Writing to articles & research
  { source: 'writing', target: 'writing_1' },
  { source: 'writing', target: 'writing_2' },
  { source: 'writing', target: 'research_paper_1' },

  // Links from Shayari to poems
  { source: 'shayari', target: 'shayari_1' },

  // Links from Community to items
  { source: 'community', target: 'comm_1' },

  // Cross-category connections (webbing) for galaxy look (balanced 8-node ring)
  { source: 'projects', target: 'writing' },
  { source: 'writing', target: 'future' },
  { source: 'future', target: 'connect' },
  { source: 'connect', target: 'shayari' },
  { source: 'shayari', target: 'community' },
  { source: 'community', target: 'experience' },
  { source: 'experience', target: 'skills' },
  { source: 'skills', target: 'projects' },

  // Secondary sub-cross connections for structural realism
  { source: 'stockbeacon', target: 'research_paper_1' },
  { source: 'aibot', target: 'writing_1' },
  { source: 'writing_2', target: 'future' }
];
