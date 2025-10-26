import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// VCR Session endpoint - Store facial expression data
app.post('/api/vcr-session', async (req, res) => {
  try {
    const { userId, expressionData } = req.body;
    
    // TODO: Store in database
    console.log(`Received VCR data for user ${userId}:`, expressionData.length, 'data points');
    
    res.json({ 
      success: true, 
      message: 'VCR session data saved',
      dataPoints: expressionData.length 
    });
  } catch (error) {
    console.error('Error saving VCR session:', error);
    res.status(500).json({ error: 'Failed to save VCR session data' });
  }
});

// Create Persona endpoint
app.post('/api/create-persona', async (req, res) => {
  try {
    const { questionnaireData, expressionData } = req.body;
    
    // TODO: Generate persona using OpenAI and store in database
    console.log('Creating persona for:', questionnaireData.name);
    
    res.json({ 
      success: true, 
      personaId: 'temp-persona-id',
      message: 'Persona created successfully' 
    });
  } catch (error) {
    console.error('Error creating persona:', error);
    res.status(500).json({ error: 'Failed to create persona' });
  }
});

// Chat endpoint - Converse with AI persona
app.post('/api/chat', async (req, res) => {
  try {
    const { personaId, relationshipId, message, conversationHistory = [] } = req.body;
    
    // TODO: Load persona from database
    // TODO: Apply relational modifier based on relationshipId
    
    // Placeholder system prompt
    const systemPrompt = `You are a helpful AI assistant simulating a persona. 
This is a placeholder - the actual persona data will be loaded from the database.`;
    
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const reply = completion.choices[0].message.content;
    
    res.json({ 
      success: true, 
      reply,
      usage: completion.usage 
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Xemory API server running on port ${port}`);
  console.log(`   Health check: http://localhost:${port}/health`);
});

