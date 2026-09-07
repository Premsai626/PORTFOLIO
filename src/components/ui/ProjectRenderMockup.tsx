import React from 'react';
import { OrbitInterviewAnimation } from './OrbitInterviewAnimation';
import { VibeTuneAnimation } from './VibeTuneAnimation';
import { RobotSimulationAnimation } from './RobotSimulationAnimation';
import { FaqAssistantAnimation } from './FaqAssistantAnimation';

interface ProjectRenderMockupProps {
  projectId: string;
  category: string;
  className?: string;
  height?: number;
}

export const ProjectRenderMockup: React.FC<ProjectRenderMockupProps> = ({
  projectId,
  category: _category,
  className = '',
  height = 240,
}) => {
  // 1. ORBIT AI Interview Platform Simulation
  if (
    projectId === 'orbit-ai-interview' ||
    projectId === 'orbit-ai' ||
    projectId.includes('orbit')
  ) {
    return <OrbitInterviewAnimation height={height} className={className} />;
  }

  // 2. VibeTune AI Mood Music & Spotify Player Simulation
  if (
    projectId === 'vibetune-ai' ||
    projectId === 'vibetune' ||
    projectId.includes('vibetune')
  ) {
    return <VibeTuneAnimation height={height} className={className} />;
  }

  // 3. Obstacle-Avoiding Wi-Fi Smart Robot Simulation
  if (
    projectId === 'obstacle-avoiding-robot' ||
    projectId.includes('robot') ||
    projectId.includes('obstacle')
  ) {
    return <RobotSimulationAnimation height={height} className={className} />;
  }

  // 4. Intelligent FAQ Documentation Assistant Simulation
  if (
    projectId === 'intelligent-faq-bot' ||
    projectId.includes('faq') ||
    projectId.includes('assistant')
  ) {
    return <FaqAssistantAnimation height={height} className={className} />;
  }

  // Fallback to FAQ Assistant Animation as default high-fidelity view
  return <FaqAssistantAnimation height={height} className={className} />;
};
