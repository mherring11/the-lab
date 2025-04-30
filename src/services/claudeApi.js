// This is a mock implementation - you would replace this with actual API calls
export async function sendMessageToClaude(message, context = []) {
    console.log('Sending message to Claude:', message);
    console.log('Context:', context);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    // Mock responses based on keywords
    if (message.toLowerCase().includes('workout')) {
        return `Here's a workout plan I recommend:
      
  1. Warm-up: 5 minutes of dynamic stretching
  2. Main workout:
     - 3 sets of 10 push-ups
     - 3 sets of 15 squats
     - 3 sets of 8 dumbbell rows per arm
     - 3 sets of 10 lunges per leg
  3. Cool down: 5 minutes of static stretching
  
  How does this look? We can adjust based on your fitness level and goals.`;
    }
    if (message.toLowerCase().includes('diet') || message.toLowerCase().includes('nutrition')) {
        return `Good nutrition is essential for fitness goals. Here are some guidelines:
  
  1. Protein: Aim for 0.8-1g per pound of body weight
  2. Carbs: Focus on complex carbs like whole grains, fruits and vegetables
  3. Fats: Include healthy fats from avocados, nuts, and olive oil
  4. Hydration: Drink at least 8 glasses of water daily
  
  Would you like me to create a more personalized nutrition plan?`;
    }
    if (message.toLowerCase().includes('help') || message.toLowerCase().includes('can you')) {
        return `I'm your fitness AI assistant, and I can help with:
  
  - Creating personalized workout plans
  - Providing nutritional advice
  - Answering fitness-related questions
  - Tracking your progress
  - Giving form tips for exercises
  
  What would you like help with today?`;
    }
    // Default response
    return `Thanks for your message! I'm here to help with your fitness journey. Is there something specific about training, nutrition, or recovery you'd like to know more about?`;
}
