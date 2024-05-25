import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';


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
    const [showModal, setShowModal] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShow = (achievement: any) => { // Explicitly type the parameter as 'any'
        setSelectedAchievement(achievement);
        setShowModal(true);
    };
    return (
        <div className="wrapper">
            {user.achievements && user.achievements.map((achievement: any) => (
                <div key={achievement.id} className="item">
                    <div className="polaroid">
                        <img src={imageMap[achievement as keyof typeof imageMap] || 'defaultImagePath'}  alt={achievement.title} />
                        <div className="caption" style={{ color: 'black' }}>{achievement}</div>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {selectedAchievement && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedAchievement}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={imageMap[selectedAchievement as keyof typeof imageMap] || 'defaultImagePath'} alt={selectedAchievement} style={{ width: '100%' }} />
                        {/* Additional details here */}
                        <p>Here are some details about the achievement...</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default AchievementsGrid;
