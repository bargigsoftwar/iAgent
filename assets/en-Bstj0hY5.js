const e={common:{welcome:"Welcome",language:"Language",mockApi:"Mock API",enableMockApi:"Enable Mock API",disableMockApi:"Disable Mock API",newChat:"New chat",deleteChat:"Delete Chat",edit:"Edit",delete:"Delete",share:"Share",refresh:"Refresh",send:"Send",stop:"Stop",discard:"Discard",loading:"Loading...",copy:"Copy",copied:"Copied!",more:"More",like:"Like",dislike:"Dislike",rawKeys:"Raw Keys",thinking:"Thinking...",cancel:"Cancel",save:"Save",close:"Close",settings:"Settings",preview:"Preview",unknown:"Unknown"},header:{title:"iAgent",subtitle:"Your intelligent conversation partner",changeLanguage:"Change Language"},errors:{loading:"Error loading translations",unsupported:"Unsupported language",failedToLoad:"Failed to load content",tryAgain:"Please try again",general:"An error occurred",network:"Network error",streaming:"Streaming error: {{error}}",chatError:"Sorry, I encountered an error. Please try again."},chat:{placeholder:"Message iAgent...",emptyState:"Your conversations will appear here",emptyStateSuggestion1:"What can you help me with?",emptyStateSuggestion2:"Tell me about yourself",thinking:"Thinking...",error:"Sorry, I encountered an error. Please try again.",shareTitle:"Chat Message",copySuccess:"Message copied to clipboard",copyError:"Failed to copy message",deleteConfirm:"Are you sure you want to delete this message?",editConfirm:"Are you sure you want to edit this message?",shareSuccess:"Message shared successfully",shareError:"Failed to share message",suggestions:{title:"Start a conversation",items:["Explain quantum computing","Write a creative story","Help with coding","Plan a trip"]},welcome:{title:"Welcome to iAgent",subtitle:"How can I help you today?",description:"I can help you with questions, writing, analysis, coding, and creative projects."},disclaimer:"AI can make mistakes. Check important info.",typing:"AI is typing..."},theme:{light:"Light mode",dark:"Dark mode"},message:{user:"You",assistant:"iAgent",streaming:"Streaming...",copy:"Copy message",copied:"Copied!",refresh:"Refresh message",edit:"Edit message",delete:"Delete message",share:"Share message",more:"More actions",like:"Like",dislike:"Dislike",removeLike:"Remove like",removeDislike:"Remove dislike",goodResponse:"Good response",badResponse:"Bad response",regenerateResponse:"Regenerate response",generationStopped:"Generation stopped",filterInfo:"Filter information"},filter:{manage:"Manage filters",saveCurrentSettings:"Save Current Settings as Filter",noFiltersForChat:"No saved filters for this chat",activeFilter:"Active filter",renameFilter:"Rename Filter",deleteFilter:"Delete Filter",filterName:"Filter Name",renameSuccess:"Filter renamed successfully",renameFailed:"Failed to rename filter",applyFilter:"Apply Filter",saveFilter:"Save Filter",globalFilter:"Global Filter",chatFilter:"Chat Filter",createFilter:"Create Filter",filterApplied:"Filter applied successfully",viewDetails:"View Details",filterDetails:"Filter Details",pickFilter:"Pick this filter",details:"Filter Details",global:"Global",active:"Active",created:"Created",availableAcrossChats:"Available across all chats",currentChatOnly:"Current chat only",onlyForThisChat:"Only for this chat",filterSettings:"Filter Settings",countries:"countries",tools:"tools",filterConfiguration:"Filter Configuration",selectedCountries:"Selected Countries",noCountriesSelected:"No countries selected",dateRange:"Date Range",enabledTools:"Enabled Tools",toolConfigurations:"Tool Configurations",enabled:"Enabled",disabled:"Disabled",configuration:"Configuration",noFilterConfigurationAvailable:"No filter configuration available",filterId:"Filter ID",view:"View",apply:"Apply",rename:"Rename",scope:"Scope"},sidebar:{newChat:"New chat",newChatTitle:"New Chat",conversations:"Conversations",emptyState:"Your conversations will appear here",deleteConversation:"Delete conversation",renameConversation:"Rename conversation",editTitle:"Edit title",saveTitle:"Save",cancelEdit:"Cancel"},input:{placeholder:"Message iAgent...",disclaimer:"AI can make mistakes. Check important info.",send:"Send message",stop:"Stop generation",clear:"Clear input",voice:"Voice input",attachment:"Attach file",selectCountries:"Select countries",configureTools:"Please configure enabled tools before sending",toolsNeedConfig:"Some tools require configuration",settingsRequired:"Settings Required",disabledDueToConfig:"Input disabled - tools need configuration",examples:["What can you help me with?","Explain quantum computing simply","Write a creative short story","Help me debug this code","Plan a weekend trip to Paris","Create a workout routine","Explain machine learning concepts","Write a professional email","Help with math homework","Generate creative ideas for..."]},countries:{palestine:"Palestine",lebanon:"Lebanon",saudi_arabia:"Saudi Arabia",iraq:"Iraq",syria:"Syria",jordan:"Jordan",egypt:"Egypt",israel:"Israel"},tools:{"tool-x":"ToolT","tool-y":"ToolH","tool-z":"ToolF",settings:{title:"Tool Settings",configurationRequired:"Some enabled tools require configuration before use",configRequired:"Config Required",configured:"Configured",pages:{title:"Data Sources",inclusionType:"Inclusion Type",include:"Include",includeOnly:"Include Only",exclude:"Exclude",placeholder:"Select data sources...",help:"Choose which data sources to use for this tool",required:"Please select at least one data source"},requiredWords:{title:"Required Keywords",add:"Add",placeholder:"Enter a required keyword...",help:"Add keywords that must be present in the search",required:"Please add at least one required keyword",empty:"No required keywords added yet"}}},dateRange:{minutes:"minutes",hours:"hours",days:"days",weeks:"weeks",months:"months",years:"years",ago:"ago",customRange:"Custom Range",datePicker:"Date Picker",customRangeTitle:"Set Custom Time Range",datePickerTitle:"Select Date Range",startDate:"Start Date",endDate:"End Date",apply:"Apply",reset:"Reset",duration:{label:"Duration",years:"{{count}} years",months:"{{count}} months",days:"{{count}} days",hours:"{{count}} hours",minutes:"{{count}} minutes",zero:"0 minutes"}},actions:{toggleSidebar:"Toggle sidebar",toggleTheme:"Toggle theme",newConversation:"New conversation",deleteConversation:"Delete conversation",shareConversation:"Share conversation",exportConversation:"Export conversation"},user:{menu:"User menu",profile:"Profile",settings:"Settings"},auth:{login:"Login",logout:"Logout",signIn:"Sign in",signOut:"Sign out",email:"Email",password:"Password"},mock:{greeting:`Hello! I'm an AI assistant created by Anthropic. I'm here to help you with a wide variety of tasks including:

- **Answering questions** on topics like science, history, current events, and more
- **Writing assistance** including essays, creative writing, and professional communications
- **Analysis and research** to help you understand complex topics
- **Programming help** with coding questions and debugging
- **Math and calculations** from basic arithmetic to advanced concepts
- **Creative projects** like brainstorming, storytelling, and ideation

I aim to be helpful, harmless, and honest in all my interactions. I can engage in nuanced conversations while being direct when needed.

What would you like to explore together today?`,technical:`I can definitely help you with technical topics! Here are some areas where I excel:

## Programming & Development
- **Languages**: Python, JavaScript, TypeScript, Java, C++, Rust, and many others
- **Web Development**: React, Vue, Angular, Node.js, Express, Next.js
- **Backend**: APIs, databases, microservices, serverless architecture
- **DevOps**: Docker, Kubernetes, CI/CD, cloud platforms (AWS, Azure, GCP)

## System Design & Architecture
- Scalable system design patterns
- Database design and optimization
- Performance tuning and monitoring
- Security best practices

## Data & AI
- Machine learning fundamentals
- Data analysis and visualization
- SQL and database optimization
- Statistics and data science concepts

I can help with code review, debugging, architecture decisions, or explaining complex technical concepts. What specific technical challenge are you working on?`,explanation:`Great question! Let me break this down in a clear and comprehensive way:

## Understanding the Concept

When we're dealing with complex topics, it's helpful to approach them systematically. Here's how I typically structure explanations:

### 1. **Core Principles**
First, I identify the fundamental concepts that underlie the topic. These are the building blocks that everything else is built upon.

### 2. **Context and Background**
Understanding where something comes from and why it exists helps create a mental framework for learning.

### 3. **Practical Applications**
Real-world examples make abstract concepts concrete and memorable.

### 4. **Common Misconceptions**
Addressing frequent misunderstandings helps avoid confusion and builds deeper comprehension.

## Key Benefits of This Approach

- **Clarity**: Breaking things down makes complex ideas accessible
- **Retention**: Structured learning improves long-term memory
- **Application**: Understanding principles enables creative problem-solving

Would you like me to apply this framework to a specific topic you're curious about? I'm here to help make any concept clearer!`,creative:`I'd love to help with your creative project! Creativity is one of my favorite areas to explore. Here are some ways I can assist:

## Writing & Storytelling
- **Fiction**: Character development, plot structures, dialogue writing
- **Poetry**: Various forms, meter, imagery, and wordplay
- **Screenwriting**: Scene construction, character arcs, formatting
- **Creative nonfiction**: Personal essays, memoirs, travel writing

## Brainstorming & Ideation
- **Concept development**: Turning vague ideas into concrete plans
- **World-building**: Creating rich, consistent fictional universes
- **Problem-solving**: Finding unique angles and fresh perspectives
- **Creative exercises**: Prompts and techniques to spark inspiration

## Content Creation
- **Blog posts and articles**: Engaging, informative content
- **Marketing copy**: Compelling messaging that resonates
- **Social media**: Creative posts that capture attention
- **Presentations**: Making complex information engaging

## Creative Collaboration

I can serve as a creative partner, offering:
- Fresh perspectives on your existing ideas
- Constructive feedback on drafts and concepts
- Alternative approaches when you're stuck
- Encouragement and motivation throughout the process

What type of creative project are you working on? I'm excited to help bring your vision to life!`,default:`I understand you're asking about "{input}". Let me provide a comprehensive response that covers the key aspects of this topic.

## Key Points to Consider

When approaching this topic, there are several important factors to keep in mind:

- **Context matters**: Understanding the broader picture helps frame the specific details
- **Multiple perspectives**: Different viewpoints can provide valuable insights
- **Practical implications**: How this applies to real-world situations
- **Related concepts**: Connections to other ideas that might be relevant

## Detailed Analysis

Based on your question, I can see this touches on several interesting areas. The relationships between the different elements here are quite complex, and it's worth exploring how they influence each other.

There are both immediate considerations and longer-term implications to think about. The immediate aspects include understanding the direct effects and responses, while the longer-term view helps us see patterns and trends that might not be obvious at first glance.

## Moving Forward

I'd be happy to dive deeper into any specific aspect of this topic that interests you most. Whether you're looking for:
- More detailed explanations of certain concepts
- Practical examples and applications
- Related topics that might be useful to explore
- Different approaches to thinking about this subject

Just let me know which direction you'd like to take this conversation, and I'll tailor my response accordingly!`}};export{e as default};
//# sourceMappingURL=en-Bstj0hY5.js.map
