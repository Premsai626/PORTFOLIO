import React, { useState, useEffect } from 'react';
import {
  Radio,
  Compass,
  Wifi,
  Cpu,
  Zap,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  Gauge,
} from 'lucide-react';

interface RobotSimulationAnimationProps {
  height?: number;
  className?: string;
}

interface RobotTelemetryStep {
  mode: 'AUTONOMOUS' | 'WI-FI JOYSTICK';
  state: 'DRIVING_FORWARD' | 'OBSTACLE_AVOIDING' | 'CALCULATING_CLEAR_PATH' | 'TURNING_RIGHT';
  distanceCm: number;
  statusText: string;
  headingDeg: number;
  activeDirection: 'forward' | 'right' | 'left' | 'reverse';
  logMessage: string;
  motorL: string;
  motorR: string;
}

const TELEMETRY_STEPS: RobotTelemetryStep[] = [
  {
    mode: 'AUTONOMOUS',
    state: 'DRIVING_FORWARD',
    distanceCm: 68,
    statusText: 'Path Clear • Cruising',
    headingDeg: 0,
    activeDirection: 'forward',
    logMessage: 'Ultrasonic: 68cm > 20cm threshold. Full throttle forward.',
    motorL: '+220 PWM',
    motorR: '+220 PWM',
  },
  {
    mode: 'AUTONOMOUS',
    state: 'OBSTACLE_AVOIDING',
    distanceCm: 14,
    statusText: 'Obstacle Detected! Halting',
    headingDeg: 0,
    activeDirection: 'reverse',
    logMessage: 'Trigger: Distance 14cm < 20cm! Initiating safety braking.',
    motorL: '-100 PWM',
    motorR: '-100 PWM',
  },
  {
    mode: 'AUTONOMOUS',
    state: 'TURNING_RIGHT',
    distanceCm: 52,
    statusText: 'Redirection: Turning +45°',
    headingDeg: 45,
    activeDirection: 'right',
    logMessage: 'Servo ping scan: Left 12cm | Right 52cm -> Redirecting right.',
    motorL: '+200 PWM',
    motorR: '-200 PWM',
  },
  {
    mode: 'WI-FI JOYSTICK',
    state: 'DRIVING_FORWARD',
    distanceCm: 85,
    statusText: 'Remote Control Active',
    headingDeg: 45,
    activeDirection: 'forward',
    logMessage: 'WebSocket: Client #192.168.4.2 sent JOYSTICK_MOVE(0, 80).',
    motorL: '+190 PWM',
    motorR: '+190 PWM',
  },
];

export const RobotSimulationAnimation: React.FC<RobotSimulationAnimationProps> = ({
  height = 240,
  className = '',
}) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [radarAngle, setRadarAngle] = useState(0);
  const [pingPulse, setPingPulse] = useState(false);

  // Radar continuous sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 8) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Step cycle state machine
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % TELEMETRY_STEPS.length);
      setPingPulse(true);
      setTimeout(() => setPingPulse(false), 500);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const step = TELEMETRY_STEPS[stepIdx];
  const isObstacle = step.distanceCm < 20;

  return (
    <div
      className={`relative w-full rounded-2xl bg-slate-950/90 border border-slate-800 overflow-hidden shadow-md shadow-black/80 flex flex-col justify-between select-none ${className}`}
      style={{ height }}
    >
      {/* Top Telemetry Header */}
      <div className="relative z-20 px-3 py-1.5 flex items-center justify-between border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ESP8266 ROBOT</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            NODE #ROB-ESP-01
          </span>
        </div>

        {/* Wi-Fi & Mode Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold">Wi-Fi: 18ms</span>
          </div>
          <span className="text-[10px] font-mono text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-md font-semibold">
            {step.mode}
          </span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="relative flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2 sm:p-2.5 overflow-hidden bg-slate-950">
        {/* Left Side: 3D Ultrasonic Lidar Radar Scanner */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between p-2.5">
          {/* Radar Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-300">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>ULTRASONIC RADAR</span>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                isObstacle
                  ? 'bg-rose-950/80 border-rose-600 text-rose-400 animate-pulse'
                  : 'bg-emerald-950/80 border-emerald-700 text-emerald-400'
              }`}
            >
              {step.distanceCm} cm {isObstacle ? 'ALERT' : 'CLEAR'}
            </span>
          </div>

          {/* Central Animated Radar Ring & Blips */}
          <div className="relative flex items-center justify-center my-auto py-1">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-emerald-500/25 flex items-center justify-center bg-emerald-950/10">
              {/* Concentric distance rings */}
              <div className="w-16 h-16 rounded-full border border-emerald-500/20" />
              <div className="w-8 h-8 rounded-full border border-dashed border-emerald-500/40" />
              {pingPulse && (
                <div className="absolute w-20 h-20 rounded-full border border-emerald-400/60 animate-ping" />
              )}

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-emerald-500/15" />
              <div className="absolute h-full w-[1px] bg-emerald-500/15" />

              {/* Sweeping Radar Line */}
              <div
                className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-emerald-300 origin-left"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${radarAngle}deg)`,
                }}
              />

              {/* Detected Obstacle Blip */}
              {isObstacle && (
                <div className="absolute top-4 right-5 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-md shadow-rose-500" />
                </div>
              )}

              {/* Clear path blips */}
              {!isObstacle && (
                <div className="absolute top-2 left-6 flex items-center justify-center opacity-60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              )}

              {/* Center Robot Node */}
              <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50 flex items-center justify-center text-[8px] font-bold text-slate-950 z-10">
                ▲
              </div>
            </div>
          </div>

          {/* Status readout strip */}
          <div className="z-10 bg-slate-950/85 border border-slate-800/90 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>Heading: {step.headingDeg}°</span>
            </span>
            <span className={isObstacle ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
              {step.statusText}
            </span>
          </div>
        </div>

        {/* Right Side: Motor Drive Telemetry & Controller */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/90 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col justify-between p-2.5">
          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-sky-300">
              <Cpu className="w-3 h-3 text-sky-400" />
              <span>MOTOR DRIVER (L298N)</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>7.4V LiPo</span>
            </div>
          </div>

          {/* Live Direction Controls & Motor Telemetry */}
          <div className="flex items-center justify-between my-auto gap-3 z-10 py-1">
            {/* Virtual Directional D-Pad */}
            <div className="grid grid-cols-3 gap-1 w-20 sm:w-22 shrink-0">
              <div />
              <div
                className={`p-1.5 rounded flex items-center justify-center border transition-all ${
                  step.activeDirection === 'forward'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/50 scale-105'
                    : 'bg-slate-900/80 text-slate-500 border-slate-800'
                }`}
              >
                <ArrowUp className="w-3 h-3" />
              </div>
              <div />
              <div
                className={`p-1.5 rounded flex items-center justify-center border transition-all ${
                  step.activeDirection === 'left'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/50 scale-105'
                    : 'bg-slate-900/80 text-slate-500 border-slate-800'
                }`}
              >
                <ArrowLeft className="w-3 h-3" />
              </div>
              <div className="p-1 rounded flex items-center justify-center bg-slate-950 border border-slate-800 text-[8px] font-mono text-slate-400">
                OK
              </div>
              <div
                className={`p-1.5 rounded flex items-center justify-center border transition-all ${
                  step.activeDirection === 'right'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/50 scale-105'
                    : 'bg-slate-900/80 text-slate-500 border-slate-800'
                }`}
              >
                <ArrowRight className="w-3 h-3" />
              </div>
              <div />
              <div
                className={`p-1.5 rounded flex items-center justify-center border transition-all ${
                  step.activeDirection === 'reverse'
                    ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-md shadow-rose-500/50 scale-105'
                    : 'bg-slate-900/80 text-slate-500 border-slate-800'
                }`}
              >
                <ArrowDown className="w-3 h-3" />
              </div>
              <div />
            </div>

            {/* Motor Output Readouts */}
            <div className="flex-1 space-y-1.5">
              <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Left Motor:</span>
                <span className="text-sky-300 font-bold">{step.motorL}</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Right Motor:</span>
                <span className="text-sky-300 font-bold">{step.motorR}</span>
              </div>
            </div>
          </div>

          {/* Microcontroller Serial Console Stream */}
          <div className="z-10 bg-slate-950/85 border border-slate-800/90 rounded-lg p-1.5 text-[10px] font-mono text-slate-300 leading-snug">
            <span className="text-emerald-400 font-bold text-[9px] block">
              &gt; SERIAL STREAM:
            </span>
            <p className="line-clamp-1 text-slate-300 font-mono text-[9px]">
              {step.logMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-20 px-3 py-1.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Gauge className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400 font-medium">Collision Engine:</span>
          <span className="text-emerald-400 font-semibold">Active C++ Thread</span>
        </div>
        <span className="text-slate-500">Echo Transceiver: HC-SR04</span>
      </div>
    </div>
  );
};
