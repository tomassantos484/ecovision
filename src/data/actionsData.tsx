import React from 'react';
import { 
  Train, Bus, Car, Bike, 
  Coffee, ShoppingBag, Utensils, Leaf, Recycle,
  Droplets, LightbulbOff, ShowerHead, Sun, Trash2, Zap 
} from 'lucide-react';

export interface Action {
  id: number;
  title: string;
  impact: string;
  category: string;
  icon: React.ReactNode;
  co2Saved?: number;
  completed?: boolean;
}

// Define action categories as constants to prevent magic strings
export const CATEGORIES = {
  TRANSPORTATION: 'transportation',
  WASTE: 'waste',
  FOOD: 'food',
  ENERGY: 'energy',
  WATER: 'water',
  CUSTOM: 'custom'
};

// Define all actions without any completed flags
const actionsData: Record<string, Action[]> = {
  [CATEGORIES.TRANSPORTATION]: [
    {
      id: 1,
      title: 'used public transit',
      impact: '2.3 kg CO₂ saved',
      category: CATEGORIES.TRANSPORTATION,
      icon: <Train size={18} className="text-eco-dark/80" />,
      co2Saved: 2.3
    },
    {
      id: 2,
      title: 'walked instead of drove',
      impact: '1.8 kg CO₂ saved',
      category: CATEGORIES.TRANSPORTATION,
      icon: <Bike size={18} className="text-eco-dark/80" />,
      co2Saved: 1.8
    },
    {
      id: 3,
      title: 'carpooled to work',
      impact: '1.5 kg CO₂ saved',
      category: CATEGORIES.TRANSPORTATION,
      icon: <Car size={18} className="text-eco-dark/80" />,
      co2Saved: 1.5
    },
    {
      id: 4,
      title: 'biked to destination',
      impact: '2.1 kg CO₂ saved',
      category: CATEGORIES.TRANSPORTATION,
      icon: <Bike size={18} className="text-eco-dark/80" />,
      co2Saved: 2.1
    },
    {
      id: 5,
      title: 'took the bus',
      impact: '1.9 kg CO₂ saved',
      category: CATEGORIES.TRANSPORTATION,
      icon: <Bus size={18} className="text-eco-dark/80" />,
      co2Saved: 1.9
    }
  ],
  [CATEGORIES.WASTE]: [
    {
      id: 6,
      title: 'brought reusable mug',
      impact: '0.5 kg waste reduced',
      category: 'waste reduction',
      icon: <Coffee size={18} className="text-eco-dark/80" />,
      co2Saved: 0.05
    },
    {
      id: 7,
      title: 'used reusable bags',
      impact: '0.3 kg waste reduced',
      category: 'waste reduction',
      icon: <ShoppingBag size={18} className="text-eco-dark/80" />,
      co2Saved: 0.03
    },
    {
      id: 8,
      title: 'properly recycled waste',
      impact: '1.2 kg waste diverted',
      category: 'waste reduction',
      icon: <Recycle size={18} className="text-eco-dark/80" />,
      co2Saved: 0.8
    },
    {
      id: 9,
      title: 'composted food scraps',
      impact: '0.6 kg waste diverted',
      category: 'waste reduction',
      icon: <Trash2 size={18} className="text-eco-dark/80" />,
      co2Saved: 0.2
    }
  ],
  [CATEGORIES.FOOD]: [
    {
      id: 10,
      title: 'ate a meatless meal',
      impact: '1.5 kg CO₂ saved',
      category: CATEGORIES.FOOD,
      icon: <Utensils size={18} className="text-eco-dark/80" />,
      co2Saved: 1.5
    },
    {
      id: 11,
      title: 'bought local produce',
      impact: '0.4 kg CO₂ saved',
      category: CATEGORIES.FOOD,
      icon: <Leaf size={18} className="text-eco-dark/80" />,
      co2Saved: 0.4
    }
  ],
  [CATEGORIES.ENERGY]: [
    {
      id: 12,
      title: 'used natural lighting',
      impact: '0.2 kg CO₂ saved',
      category: CATEGORIES.ENERGY,
      icon: <Sun size={18} className="text-eco-dark/80" />,
      co2Saved: 0.2
    },
    {
      id: 13,
      title: 'turned off lights',
      impact: '0.3 kg CO₂ saved',
      category: CATEGORIES.ENERGY,
      icon: <LightbulbOff size={18} className="text-eco-dark/80" />,
      co2Saved: 0.3
    },
    {
      id: 14,
      title: 'took shorter shower',
      impact: '0.5 kg CO₂ saved',
      category: CATEGORIES.ENERGY,
      icon: <ShowerHead size={18} className="text-eco-dark/80" />,
      co2Saved: 0.5
    },
    {
      id: 15,
      title: 'unplugged devices',
      impact: '0.2 kg CO₂ saved',
      category: CATEGORIES.ENERGY,
      icon: <Zap size={18} className="text-eco-dark/80" />,
      co2Saved: 0.2
    }
  ],
  [CATEGORIES.WATER]: [
    {
      id: 16,
      title: 'collected rainwater',
      impact: '50 l water saved',
      category: CATEGORIES.WATER,
      icon: <Droplets size={18} className="text-eco-dark/80" />,
      co2Saved: 0.1
    },
    {
      id: 17,
      title: 'fixed leaky faucet',
      impact: '70 l water saved daily',
      category: CATEGORIES.WATER,
      icon: <Droplets size={18} className="text-eco-dark/80" />,
      co2Saved: 0.15
    }
  ]
};

export default actionsData; 