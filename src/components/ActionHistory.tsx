import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserActions } from '@/services/ecoActionsService';
import { UserAction, EcoAction } from '@/types/database';
import { format } from 'date-fns';
import { Leaf, Calendar, Clock, FileText, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionHistoryProps {
  userId: string;
}

// Extend the UserAction type to include the joined eco_actions data
interface UserActionWithEcoAction extends UserAction {
  eco_actions?: EcoAction;
}

const ActionHistory: React.FC<ActionHistoryProps> = ({ userId }) => {
  const [actions, setActions] = useState<UserActionWithEcoAction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserActions = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await getUserActions(userId);
        
        if (error) {
          console.error('Error fetching user actions:', error);
          setError(error);
        } else {
          setActions(data as UserActionWithEcoAction[] | null);
        }
      } catch (err) {
        console.error('Exception fetching user actions:', err);
        setError('Failed to load your eco actions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserActions();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-4">Your Eco Actions</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-eco-lightGray/30">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium">Error loading actions</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!actions || actions.length === 0) {
    return (
      <div className="bg-eco-cream/50 rounded-lg p-6 text-center">
        <Leaf className="h-10 w-10 mx-auto mb-3 text-eco-green/70" />
        <h3 className="text-lg font-medium mb-1">No eco actions yet</h3>
        <p className="text-eco-dark/70 mb-4">
          Start logging your sustainable actions to track your positive impact.
        </p>
        <button 
          className="bg-eco-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-eco-green/90 transition-colors"
          onClick={() => window.location.href = '/actions'}
        >
          Log Your First Action
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Your Eco Actions</h3>
      <div className="space-y-4">
        {actions.map((action) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 shadow-sm border border-eco-lightGray/30"
          >
            <div className="flex justify-between items-start">
              <h4 className="font-medium">
                {action.eco_actions?.title || 'Eco Action'}
              </h4>
              <span className="text-xs bg-eco-green/10 text-eco-green px-2 py-1 rounded-full">
                +{action.buds_earned} buds
              </span>
            </div>
            
            <div className="mt-2 text-sm text-eco-dark/70 flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {action.completed_at ? format(new Date(action.completed_at), 'MMM d, yyyy') : 'Unknown date'}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {action.completed_at ? format(new Date(action.completed_at), 'h:mm a') : 'Unknown time'}
                </span>
              </div>
            </div>
            
            {action.notes && (
              <div className="mt-2 text-sm flex items-start gap-1.5">
                <FileText className="h-3.5 w-3.5 mt-0.5 text-eco-dark/60" />
                <p className="text-eco-dark/80">{action.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActionHistory; 