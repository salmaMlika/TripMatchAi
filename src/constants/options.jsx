// Budget Options
export const budgetOptions = [
  {
    id: 'low',
    title: 'Low',
    desc: '0 - 1000 USD',
    icon: '💰'
  },
  {
    id: 'medium',
    title: 'Medium',
    desc: '1000 - 2500 USD',
    icon: '💰'
  },
  {
    id: 'high',
    title: 'High',
    desc: '2500+ USD',
    icon: '💰'
  }
];
// Travel Companions Options
export const travelWithOptions = [
  {
    id: 'solo',
    title: 'Solo',
    icon: '👤'
  },
  {
    id: 'couple',
    title: 'Couple',
    icon: '👫'
  },
  {
    id: 'family',
    title: 'Family',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'friends',
    title: 'Friends',
    icon: '👥'
  }
];


// Activities Options
export const activityOptions = [
  {
    id: 'beaches',
    title: 'Beaches',
    icon: '🏖️'
  },
  {
    id: 'city-sightseeing',
    title: 'City sightseeing',
    icon: '🏛️'
  },
  {
    id: 'outdoor-adventures',
    title: 'Outdoor adventures',
    icon: '🏔️'
  },
  {
    id: 'festivals-events',
    title: 'Festivals/events',
    icon: '🎪'
  },
  {
    id: 'food-exploration',
    title: 'Food exploration',
    icon: '🍽️'
  },
  {
    id: 'nightlife',
    title: 'Nightlife',
    icon: '🌃'
  },
  {
    id: 'shopping',
    title: 'Shopping',
    icon: '🛍️'
  },
  {
    id: 'spa-wellness',
    title: 'Spa wellness',
    icon: '🧘‍♀️'
  }
];
export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {days} Days for {travelers} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {days} days with each day plan with best time to visit in JSON format.';