// Alternative version using dynamic import
let GoogleGenerativeAI = null;
let genAI = null;
let model = null;

// Initialize the AI service
async function initializeAI() {
  if (!GoogleGenerativeAI) {
    try {
      const module = await import('@google/generative-ai');
      GoogleGenerativeAI = module.GoogleGenerativeAI;
      
      genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);
      
      const generationConfig = {
        responseMimeType: 'application/json',
      };
      
      model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig,
      });
      
      console.log('AI service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      throw new Error('AI service initialization failed. Make sure @google/generative-ai is installed.');
    }
  }
}

// Generate travel plan function
async function generateTravelPlan(destination, days = 3, budget = 'moderate', travelers = 'couple') {
  // Initialize AI if not already done
  await initializeAI();
  
  const prompt = `Generate Travel Plan for Location: ${destination}, for ${days} Days for ${travelers} with a ${budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${days} days with each day plan with best time to visit in JSON format.`;

  try {
    // Create a fresh chat session for each request
    const chatSession = model.startChat({
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });
    
    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parser le JSON si la réponse est en format JSON
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
      const jsonResponse = JSON.parse(cleanText);
      return jsonResponse;
    } catch (parseError) {
      console.warn('La réponse n\'est pas un JSON valide, retour du texte brut');
      return { error: 'Invalid JSON response', rawText: text };
    }
  } catch (error) {
    console.error('Erreur lors de la génération du plan de voyage:', error);
    throw error;
  }
}

// Test function to check if everything works
async function testAIConnection() {
  try {
    await initializeAI();
    console.log('AI connection test successful');
    return true;
  } catch (error) {
    console.error('AI connection test failed:', error);
    return false;
  }
}

// Fonction principale
async function main() {
  try {
    // Test connection first
    const connectionTest = await testAIConnection();
    if (!connectionTest) {
      console.error('Cannot proceed without AI connection');
      return;
    }
    
    // Vous pouvez modifier ces paramètres
    const destination = 'Paris';
    const days = 3;
    const budget = 'moderate'; // 'cheap', 'moderate', 'luxury'
    const travelers = 'couple'; // 'solo', 'couple', 'family', 'friends'
    
    console.log(`Génération d'un plan de voyage pour ${destination}...`);
    
    const travelPlan = await generateTravelPlan(destination, days, budget, travelers);
    
    console.log('\n=== PLAN DE VOYAGE GÉNÉRÉ ===');
    console.log(JSON.stringify(travelPlan, null, 2));
    
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// Version avec paramètres personnalisables
function createTravelPlanGenerator() {
  return {
    async generate(options = {}) {
      const {
        destination = 'Paris',
        days = 3,
        budget = 'moderate',
        travelers = 'couple'
      } = options;
      
      return await generateTravelPlan(destination, days, budget, travelers);
    },
    
    // Méthode pour obtenir un plan avec des paramètres spécifiques
    async getCustomPlan(destination, days, budget, travelers) {
      return await generateTravelPlan(destination, days, budget, travelers);
    },
    
    // Test connection method
    async testConnection() {
      return await testAIConnection();
    }
  };
}

// Exporter les fonctions pour utilisation dans d'autres modules
export {
  generateTravelPlan,
  createTravelPlanGenerator,
  testAIConnection,
  initializeAI
};

// Note: This file is designed to run in browser environment (React/Vite)
// The main() function can be called manually if needed for testing