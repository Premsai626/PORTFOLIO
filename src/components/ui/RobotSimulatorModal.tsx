import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';
import {
  Wifi,
  Radio,
  RotateCcw,
  Play,
  Pause,
  Zap,
  Terminal,
  MousePointer,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Activity,
  Trash2,
  Eye,
  EyeOff,
  Navigation,
  ExternalLink,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface RobotSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Obstacle {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

const ARENA_WIDTH = 580;
const ARENA_HEIGHT = 400;
const ROBOT_RADIUS = 16;
const SENSOR_MAX_DIST = 175; // Max ultrasonic range in canvas units

const DEFAULT_OBSTACLES: Obstacle[] = [
  { id: '1', x: 190, y: 110, w: 44, h: 74, color: 'rgb(239, 68, 68)' },
  { id: '2', x: 360, y: 75, w: 64, h: 44, color: 'rgb(244, 63, 94)' },
  { id: '3', x: 270, y: 250, w: 54, h: 54, color: 'rgb(168, 85, 247)' },
  { id: '4', x: 100, y: 270, w: 52, h: 42, color: 'rgb(59, 130, 246)' },
  { id: '5', x: 440, y: 230, w: 46, h: 68, color: 'rgb(14, 165, 233)' },
];

export const RobotSimulatorModal: React.FC<RobotSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mode, setMode] = useState<'AUTONOMOUS' | 'MANUAL'>('AUTONOMOUS');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [robotPos, setRobotPos] = useState({ x: 80, y: 80, angle: 0 }); // angle in degrees
  const [speed, setSpeed] = useState<number>(2.2);
  const [obstacles, setObstacles] = useState<Obstacle[]>(DEFAULT_OBSTACLES);
  const [distanceCm, setDistanceCm] = useState<number>(120);
  const [sensorState, setSensorState] = useState<'CLEAR' | 'APPROACHING' | 'HAZARD'>('CLEAR');
  const [servoAngle, setServoAngle] = useState<number>(0); // -45 to +45 deg relative to robot
  const [logs, setLogs] = useState<string[]>([
    '[BOOT] ESP8266 v2.4 initialized. WebSocket listening on :81',
    '[SENSOR] HC-SR04 ultrasonic echo active (Trigger: D5, Echo: D6)',
    '[NAV] Autonomous collision avoidance state machine running',
  ]);
  const [motorL, setMotorL] = useState<string>('+220 PWM');
  const [motorR, setMotorR] = useState<string>('+220 PWM');
  const [manualInput, setManualInput] = useState<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  }>({ forward: false, backward: false, left: false, right: false });
  const [showRays, setShowRays] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    robotPos: { x: 80, y: 80, angle: 0 },
    isAvoiding: false,
    avoidStage: 0,
    avoidTimer: 0,
    avoidTargetAngle: 0,
  });

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  }, []);

  // Raycasting calculation against arena borders and rectangular obstacles
  const computeSensorRay = useCallback(
    (rx: number, ry: number, totalAngleDeg: number) => {
      const rad = (totalAngleDeg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      let closestDist = SENSOR_MAX_DIST;
      let hitX = rx + cos * SENSOR_MAX_DIST;
      let hitY = ry + sin * SENSOR_MAX_DIST;

      // Arena borders
      if (cos > 0) {
        const d = (ARENA_WIDTH - rx) / cos;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = ARENA_WIDTH;
          hitY = ry + sin * d;
        }
      } else if (cos < 0) {
        const d = (0 - rx) / cos;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = 0;
          hitY = ry + sin * d;
        }
      }

      if (sin > 0) {
        const d = (ARENA_HEIGHT - ry) / sin;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = rx + cos * d;
          hitY = ARENA_HEIGHT;
        }
      } else if (sin < 0) {
        const d = (0 - ry) / sin;
        if (d > 0 && d < closestDist) {
          closestDist = d;
          hitX = rx + cos * d;
          hitY = 0;
        }
      }

      // Check each obstacle rectangle
      for (const obs of obstacles) {
        const lines = [
          { x1: obs.x, y1: obs.y, x2: obs.x + obs.w, y2: obs.y },
          { x1: obs.x + obs.w, y1: obs.y, x2: obs.x + obs.w, y2: obs.y + obs.h },
          { x1: obs.x + obs.w, y1: obs.y + obs.h, x2: obs.x, y2: obs.y + obs.h },
          { x1: obs.x, y1: obs.y + obs.h, x2: obs.x, y2: obs.y },
        ];

        for (const line of lines) {
          const x1 = rx;
          const y1 = ry;
          const x2 = rx + cos * SENSOR_MAX_DIST;
          const y2 = ry + sin * SENSOR_MAX_DIST;

          const x3 = line.x1;
          const y3 = line.y1;
          const x4 = line.x2;
          const y4 = line.y2;

          const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
          if (denom === 0) continue;

          const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
          const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

          if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            const dist = ua * SENSOR_MAX_DIST;
            if (dist < closestDist) {
              closestDist = dist;
              hitX = rx + cos * dist;
              hitY = ry + sin * dist;
            }
          }
        }
      }

      return { dist: closestDist, hitX, hitY };
    },
    [obstacles]
  );

  // Main simulation loop
  useEffect(() => {
    if (!isOpen || !isRunning) return;

    const interval = setInterval(() => {
      let { x, y, angle } = stateRef.current.robotPos;
      const effectiveAngle = angle;
      const { dist } = computeSensorRay(x, y, effectiveAngle);

      const calculatedCm = Math.round(dist * 0.9);
      setDistanceCm(calculatedCm);

      if (calculatedCm < 30) {
        setSensorState('HAZARD');
      } else if (calculatedCm < 55) {
        setSensorState('APPROACHING');
      } else {
        setSensorState('CLEAR');
      }

      if (mode === 'AUTONOMOUS') {
        if (stateRef.current.isAvoiding) {
          stateRef.current.avoidTimer += 1;

          if (stateRef.current.avoidStage === 0) {
            // Stage 0: Emergency reverse pulse
            const rad = ((angle + 180) * Math.PI) / 180;
            x += Math.cos(rad) * 1.1;
            y += Math.sin(rad) * 1.1;
            setMotorL('-140 PWM');
            setMotorR('-140 PWM');

            if (stateRef.current.avoidTimer > 12) {
              stateRef.current.avoidStage = 1;
              stateRef.current.avoidTimer = 0;
              const leftScan = computeSensorRay(x, y, angle - 50).dist;
              const rightScan = computeSensorRay(x, y, angle + 50).dist;
              const turnDelta = rightScan >= leftScan ? 65 + Math.random() * 25 : -(65 + Math.random() * 25);
              stateRef.current.avoidTargetAngle = (angle + turnDelta + 360) % 360;
              addLog(
                `[AVOID] Echo: L=${Math.round(leftScan * 0.9)}cm, R=${Math.round(
                  rightScan * 0.9
                )}cm → Turn ${turnDelta > 0 ? '+' : ''}${Math.round(turnDelta)}°`
              );
            }
          } else if (stateRef.current.avoidStage === 1) {
            // Stage 1: Pivot to clear heading
            const diff = (stateRef.current.avoidTargetAngle - angle + 540) % 360 - 180;
            if (Math.abs(diff) < 5 || stateRef.current.avoidTimer > 35) {
              stateRef.current.isAvoiding = false;
              stateRef.current.avoidStage = 0;
              stateRef.current.avoidTimer = 0;
              setMotorL('+220 PWM');
              setMotorR('+220 PWM');
              setServoAngle(0);
              addLog('[NAV] Clear heading locked. Resuming forward velocity.');
            } else {
              const rotSpeed = diff > 0 ? 5.0 : -5.0;
              angle = (angle + rotSpeed + 360) % 360;
              setServoAngle(diff > 0 ? 25 : -25);
              setMotorL(diff > 0 ? '+200 PWM' : '-200 PWM');
              setMotorR(diff > 0 ? '-200 PWM' : '+200 PWM');
            }
          }
        } else {
          // Normal Cruising
          if (calculatedCm < 32) {
            stateRef.current.isAvoiding = true;
            stateRef.current.avoidStage = 0;
            stateRef.current.avoidTimer = 0;
            addLog(`[ALERT] Obstacle in path (${calculatedCm}cm < 32cm threshold)! Braking.`);
          } else {
            const rad = (angle * Math.PI) / 180;
            x += Math.cos(rad) * speed;
            y += Math.sin(rad) * speed;
            setMotorL('+220 PWM');
            setMotorR('+220 PWM');
          }
        }
      } else {
        // MANUAL MODE
        let isMoving = false;
        if (manualInput.forward) {
          const rad = (angle * Math.PI) / 180;
          x += Math.cos(rad) * (speed * 1.25);
          y += Math.sin(rad) * (speed * 1.25);
          setMotorL('+240 PWM');
          setMotorR('+240 PWM');
          isMoving = true;
        } else if (manualInput.backward) {
          const rad = ((angle + 180) * Math.PI) / 180;
          x += Math.cos(rad) * (speed * 0.95);
          y += Math.sin(rad) * (speed * 0.95);
          setMotorL('-180 PWM');
          setMotorR('-180 PWM');
          isMoving = true;
        }

        if (manualInput.left) {
          angle = (angle - 4.8 + 360) % 360;
          setMotorL('-180 PWM');
          setMotorR('+180 PWM');
          isMoving = true;
        } else if (manualInput.right) {
          angle = (angle + 4.8 + 360) % 360;
          setMotorL('+180 PWM');
          setMotorR('-180 PWM');
          isMoving = true;
        }

        if (!isMoving) {
          setMotorL('0 PWM');
          setMotorR('0 PWM');
        }
      }

      x = Math.max(ROBOT_RADIUS + 4, Math.min(ARENA_WIDTH - ROBOT_RADIUS - 4, x));
      y = Math.max(ROBOT_RADIUS + 4, Math.min(ARENA_HEIGHT - ROBOT_RADIUS - 4, y));

      stateRef.current.robotPos = { x, y, angle };
      setRobotPos({ x, y, angle });
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen, isRunning, mode, speed, computeSensorRay, manualInput, addLog]);

  // Keyboard navigation for manual mode
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, forward: true }));
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, backward: true }));
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, left: true }));
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, right: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, forward: false }));
      }
      if (['ArrowDown', 'KeyS'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, backward: false }));
      }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, left: false }));
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        setManualInput((prev) => ({ ...prev, right: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  // Render Canvas Arena
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Canvas
    ctx.fillStyle = '#050914';
    ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

    // Subtle Arena Grid
    ctx.strokeStyle = 'rgba(30, 58, 138, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < ARENA_WIDTH; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ARENA_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < ARENA_HEIGHT; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ARENA_WIDTH, y);
      ctx.stroke();
    }

    // Draw Obstacles with modern glass/solid hybrid styling
    obstacles.forEach((obs) => {
      // Glow/Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 4;

      const grad = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.w, obs.y + obs.h);
      grad.addColorStop(0, obs.color || 'rgb(239, 68, 68)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 10);
      ctx.fill();

      // Border
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Subtle top inner highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(obs.x + 2, obs.y + 2, obs.w - 4, 3, 2);
      ctx.stroke();
    });

    const { x, y, angle } = robotPos;

    // Draw Ultrasonic Radar Field & Laser Beam
    if (showRays) {
      const sensorAngle = angle + servoAngle;
      const { hitX, hitY } = computeSensorRay(x, y, sensorAngle);

      const coneAngle1 = ((sensorAngle - 16) * Math.PI) / 180;
      const coneAngle2 = ((sensorAngle + 16) * Math.PI) / 180;
      const coneDist = Math.min(SENSOR_MAX_DIST, Math.hypot(hitX - x, hitY - y));

      const grad = ctx.createRadialGradient(x, y, 4, x, y, coneDist);
      if (sensorState === 'HAZARD') {
        grad.addColorStop(0, 'rgba(244, 63, 94, 0.4)');
        grad.addColorStop(1, 'rgba(244, 63, 94, 0.02)');
      } else if (sensorState === 'APPROACHING') {
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0.02)');
      } else {
        grad.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, coneDist, coneAngle1, coneAngle2);
      ctx.closePath();
      ctx.fill();

      // Laser Ping Line
      ctx.strokeStyle =
        sensorState === 'HAZARD'
          ? 'rgb(244, 63, 94)'
          : sensorState === 'APPROACHING'
          ? 'rgb(245, 158, 11)'
          : 'rgb(52, 211, 153)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(hitX, hitY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Impact Blip Target
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(hitX, hitY, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Robot Smart Car
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);

    // Dynamic Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    // 4 Wheels
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-ROBOT_RADIUS - 3, -ROBOT_RADIUS - 4, 11, 6);
    ctx.fillRect(ROBOT_RADIUS - 8, -ROBOT_RADIUS - 4, 11, 6);
    ctx.fillRect(-ROBOT_RADIUS - 3, ROBOT_RADIUS - 2, 11, 6);
    ctx.fillRect(ROBOT_RADIUS - 8, ROBOT_RADIUS - 2, 11, 6);

    // Main Chassis Base
    const chassisGrad = ctx.createLinearGradient(-16, -14, 16, 14);
    chassisGrad.addColorStop(0, '#0f172a');
    chassisGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = chassisGrad;
    ctx.beginPath();
    ctx.roundRect(-16, -14, 32, 28, 7);
    ctx.fill();

    // Chassis Glow Accent
    ctx.strokeStyle = mode === 'MANUAL' ? '#38bdf8' : '#34d399';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Microcontroller Chip (ESP8266)
    ctx.fillStyle = mode === 'MANUAL' ? '#0284c7' : '#059669';
    ctx.beginPath();
    ctx.roundRect(-7, -7, 14, 14, 3);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 7px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ESP', 0, 2);

    // Ultrasonic Sensor Eyes on Front Bumper
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(15, -6, 3.8, 0, Math.PI * 2);
    ctx.arc(15, 6, 3.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.arc(15, -6, 1.8, 0, Math.PI * 2);
    ctx.arc(15, 6, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Front Headlights
    ctx.fillStyle = sensorState === 'HAZARD' ? '#f43f5e' : '#38bdf8';
    ctx.beginPath();
    ctx.arc(16, -11, 2, 0, Math.PI * 2);
    ctx.arc(16, 11, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [robotPos, obstacles, showRays, sensorState, servoAngle, mode, computeSensorRay]);

  // Click to drop obstacle on canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = ARENA_WIDTH / rect.width;
    const scaleY = ARENA_HEIGHT / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    if (Math.hypot(clickX - robotPos.x, clickY - robotPos.y) < 45) return;

    const colors = [
      'rgb(239, 68, 68)',
      'rgb(244, 63, 94)',
      'rgb(168, 85, 247)',
      'rgb(59, 130, 246)',
      'rgb(14, 165, 233)',
    ];

    const newObs: Obstacle = {
      id: Date.now().toString(),
      x: Math.max(10, Math.min(ARENA_WIDTH - 65, clickX - 25)),
      y: Math.max(10, Math.min(ARENA_HEIGHT - 65, clickY - 25)),
      w: 46 + Math.floor(Math.random() * 24),
      h: 42 + Math.floor(Math.random() * 28),
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setObstacles((prev) => [...prev, newObs]);
    addLog(`[USER] Dropped obstacle at (${Math.round(clickX)}, ${Math.round(clickY)})`);
  };

  const resetSimulation = () => {
    stateRef.current.robotPos = { x: 80, y: 80, angle: 0 };
    stateRef.current.isAvoiding = false;
    stateRef.current.avoidStage = 0;
    stateRef.current.avoidTimer = 0;
    setRobotPos({ x: 80, y: 80, angle: 0 });
    setObstacles(DEFAULT_OBSTACLES);
    addLog('[SYSTEM] Vehicle coordinates & obstacles reset to default spawn');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Obstacle-Avoiding Wi-Fi Smart Car — Interactive Hardware Simulator"
      maxWidth="4xl"
    >
      <div className="space-y-5 select-none text-slate-200">
        {/* Top Header Bar: Segmented Controls & Telemetry Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-md">
          {/* Apple-Style Segmented Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => {
                setMode('AUTONOMOUS');
                addLog('[MODE] Switched to Autonomous Collision Avoidance');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'AUTONOMOUS'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/40 border border-emerald-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Autonomous Navigation
            </button>
            <button
              onClick={() => {
                setMode('MANUAL');
                addLog('[MODE] Switched to Wi-Fi Teleoperation');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'MANUAL'
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/40 border border-sky-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Wi-Fi Teleop (Manual)
            </button>
          </div>

          {/* Quick Engine Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isRunning
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={resetSimulation}
              title="Reset Arena & Robot Position"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
              <span>Reset</span>
            </button>

            {/* Hardware Status Pills */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-[11px] font-mono font-medium">
                <Wifi className="w-3 h-3 text-emerald-400" />
                <span>ESP8266 Active</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-950/70 border border-sky-800/60 text-sky-400 text-[11px] font-mono font-medium">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>7.4V LiPo • 98%</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Simulator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left / Center (8 Cols): 2D Physics Track Arena */}
          <div className="lg:col-span-8 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              {/* Minimal Canvas Track Header Pill */}
              <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-md">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">Interactive Test Arena</span>
                <span className="text-slate-600">|</span>
                <span className="text-sky-400 text-[10px] flex items-center gap-1 font-sans">
                  <MousePointer className="w-3 h-3" /> Click track to drop obstacles
                </span>
              </div>

              {/* Live Distance Ribbon */}
              <div
                className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border backdrop-blur-md shadow-md transition-all ${
                  sensorState === 'HAZARD'
                    ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse'
                    : sensorState === 'APPROACHING'
                    ? 'bg-amber-950/90 border-amber-500 text-amber-300'
                    : 'bg-emerald-950/90 border-emerald-600 text-emerald-300'
                }`}
              >
                <span>{distanceCm} cm</span>
                <span className="text-[10px] font-normal text-slate-300 ml-1.5">
                  ({sensorState === 'HAZARD' ? 'Emergency Braking' : sensorState === 'APPROACHING' ? 'Caution' : 'Clear'})
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={ARENA_WIDTH}
                height={ARENA_HEIGHT}
                onClick={handleCanvasClick}
                className="w-full h-auto cursor-crosshair block"
              />
            </div>

            {/* Arena Controls Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 px-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRays(!showRays)}
                  className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer font-sans"
                >
                  {showRays ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showRays ? 'Hide Radar Beam' : 'Show Radar Beam'}</span>
                </button>
                <span className="text-slate-700">•</span>
                <button
                  onClick={() => setObstacles([])}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer font-sans"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Clear All Obstacles</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-sans">
                {mode === 'MANUAL' ? 'Steer with WASD / Arrow Keys or the D-Pad' : 'Autonomous AI collision avoidance loop active'}
              </span>
            </div>
          </div>

          {/* Right Sidebar (4 Cols): Telemetry, Driving Pad & Serial Logs */}
          <div className="lg:col-span-4 space-y-4">
            {/* Real-Time Telemetry Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs font-bold font-display text-white border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-sky-400">
                  <Activity className="w-4 h-4" />
                  <span>LIVE HARDWARE TELEMETRY</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">ONLINE</span>
              </div>

              {/* Clean Metric Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Left Motor</span>
                  <span className="text-sky-300 font-bold">{motorL}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Right Motor</span>
                  <span className="text-sky-300 font-bold">{motorR}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Heading Angle</span>
                  <span className="text-emerald-300 font-bold">{Math.round(robotPos.angle)}°</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-sans">Speed Velocity</span>
                  <span className="text-amber-300 font-bold">{(speed * 10).toFixed(0)} cm/s</span>
                </div>
              </div>

              {/* Speed Slider */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1 font-sans">
                    <Sliders className="w-3 h-3 text-sky-400" />
                    <span>Cruise Speed:</span>
                  </span>
                  <span className="text-sky-400 font-semibold">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4.0"
                  step="0.2"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Manual Driving D-Pad (Shown when in Manual Mode) */}
            {mode === 'MANUAL' ? (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-sky-500/40 space-y-3 shadow-md animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold font-display text-sky-400">
                  <span>WI-FI TELEOPERATION D-PAD</span>
                  <span className="text-[10px] text-slate-400 font-mono">WASD / Keys</span>
                </div>

                <div className="grid grid-cols-3 gap-2 max-w-[170px] mx-auto pt-1">
                  <div />
                  <button
                    onMouseDown={() => setManualInput((prev) => ({ ...prev, forward: true }))}
                    onMouseUp={() => setManualInput((prev) => ({ ...prev, forward: false }))}
                    onTouchStart={() => setManualInput((prev) => ({ ...prev, forward: true }))}
                    onTouchEnd={() => setManualInput((prev) => ({ ...prev, forward: false }))}
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      manualInput.forward
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/50 scale-95'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span className="text-[9px] font-mono mt-0.5 opacity-70">W</span>
                  </button>
                  <div />

                  <button
                    onMouseDown={() => setManualInput((prev) => ({ ...prev, left: true }))}
                    onMouseUp={() => setManualInput((prev) => ({ ...prev, left: false }))}
                    onTouchStart={() => setManualInput((prev) => ({ ...prev, left: true }))}
                    onTouchEnd={() => setManualInput((prev) => ({ ...prev, left: false }))}
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      manualInput.left
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/50 scale-95'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-[9px] font-mono mt-0.5 opacity-70">A</span>
                  </button>

                  <div className="p-2 rounded-xl flex items-center justify-center bg-slate-950/70 border border-slate-800 text-[10px] font-mono text-sky-400 font-semibold text-center">
                    DRIVE
                  </div>

                  <button
                    onMouseDown={() => setManualInput((prev) => ({ ...prev, right: true }))}
                    onMouseUp={() => setManualInput((prev) => ({ ...prev, right: false }))}
                    onTouchStart={() => setManualInput((prev) => ({ ...prev, right: true }))}
                    onTouchEnd={() => setManualInput((prev) => ({ ...prev, right: false }))}
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      manualInput.right
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/50 scale-95'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-[9px] font-mono mt-0.5 opacity-70">D</span>
                  </button>

                  <div />
                  <button
                    onMouseDown={() => setManualInput((prev) => ({ ...prev, backward: true }))}
                    onMouseUp={() => setManualInput((prev) => ({ ...prev, backward: false }))}
                    onTouchStart={() => setManualInput((prev) => ({ ...prev, backward: true }))}
                    onTouchEnd={() => setManualInput((prev) => ({ ...prev, backward: false }))}
                    className={`p-3.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                      manualInput.backward
                        ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/50 scale-95'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                    }`}
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span className="text-[9px] font-mono mt-0.5 opacity-70">S</span>
                  </button>
                  <div />
                </div>
              </div>
            ) : (
              /* Autonomous Routine Overview Card */
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold font-display text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    <span>AUTONOMOUS NAVIGATION</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  The robot evaluates distance measurements 25 times per second. When an obstacle is detected within 32cm, it halts, initiates ultrasonic echo scanning, and pivots toward the widest open path.
                </p>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-300/90 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>C++ non-blocking pulse routine</span>
                </div>
              </div>
            )}

            {/* Serial Terminal Feed */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>FIRMWARE SERIAL LOG</span>
                </div>
                <span className="text-[10px] text-slate-500">115200 BAUD</span>
              </div>

              <div className="h-32 overflow-y-auto space-y-1 font-mono text-[10px] text-slate-300 pr-1 select-text scrollbar-thin">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('[ALERT]') || log.includes('HAZARD')
                        ? 'text-rose-400 font-semibold'
                        : log.includes('[AVOID]')
                        ? 'text-amber-300 font-medium'
                        : log.includes('[NAV]')
                        ? 'text-emerald-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[11px]">Firmware Architecture: Asynchronous ESP8266 C++ with WebSocket Telemetry</span>
          </div>

          <a
            href="https://github.com/Premsai626/obstacle-avoiding-car.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-white border border-slate-800 text-xs font-semibold transition-all shadow-sm"
          >
            <span>View GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
