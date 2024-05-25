import React from 'react';

import animalBadge from '../assets/images/achievements/animal_lover.png';
import beachBadge from '../assets/images/achievements/beach_achievement.png';
import elderlyBadge from '../assets/images/achievements/elderly.png';
import redcrossBadge from '../assets/images/achievements/redcross_achievement.png';

const imageMap = {
    "Red Cross!": redcrossBadge,
    "Animal Lover": animalBadge,
    "Saving the Beach!": beachBadge,
    "Helping Ah Ma!": elderlyBadge,
    // Add more mappings as needed
};


const AchievementsGrid = ({ user }: { user: { achievements: any[] } }) => {
    
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
            {user.achievements && user.achievements.map((achievement: any) => (
                <div key={achievement.id} style={{ margin: '10px', textAlign: 'center' }}>
                    <img 
                      src={imageMap[achievement as keyof typeof imageMap] || 'defaultImagePath'} 
                      alt={achievement.title} 
                      style={{ width: '100px', height: '100px' }} />
                    <h3 style={{ fontSize: '16px' }}>{achievement.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default AchievementsGrid;
