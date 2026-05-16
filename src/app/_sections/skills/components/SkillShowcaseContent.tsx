import type { ReactNode } from 'react';

type GraphicStageProps = {
  children: ReactNode;
};

function GraphicStage({ children }: GraphicStageProps) {
  return (
    <div className="relative flex h-full min-h-72 items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}

export function ArchitectureGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[42rem]"
        viewBox="0 0 640 420"
        fill="none"
      >
        <defs>
          <linearGradient
            id="architecture-plane"
            x1="110"
            x2="510"
            y1="70"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7bd0ff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#3cddc7" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <g style={{ filter: 'drop-shadow(0 28px 44px rgba(0,0,0,0.35))' }}>
          <path
            d="M170 82h260l86 58-86 58H170l-86-58 86-58Z"
            fill="url(#architecture-plane)"
            fillOpacity="0.42"
            stroke="#b9e8ff"
            strokeOpacity="0.54"
            strokeWidth="2"
          />
          <path
            d="M170 154h260l86 58-86 58H170l-86-58 86-58Z"
            fill="url(#architecture-plane)"
            fillOpacity="0.28"
            stroke="#7bd0ff"
            strokeOpacity="0.42"
            strokeWidth="2"
          />
          <path
            d="M170 226h260l86 58-86 58H170l-86-58 86-58Z"
            fill="url(#architecture-plane)"
            fillOpacity="0.18"
            stroke="#3cddc7"
            strokeOpacity="0.36"
            strokeWidth="2"
          />
          <path
            d="M170 82v144M430 82v144M516 140v144M84 140v144"
            stroke="#c4e7ff"
            strokeOpacity="0.22"
            strokeWidth="2"
          />
        </g>
      </svg>
    </GraphicStage>
  );
}

export function DesignSystemGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[40rem]"
        viewBox="0 0 620 420"
        fill="none"
      >
        <defs>
          <linearGradient
            id="design-panel"
            x1="140"
            x2="480"
            y1="80"
            y2="330"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#7bd0ff" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect
          x="134"
          y="86"
          width="352"
          height="248"
          rx="42"
          fill="url(#design-panel)"
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="2"
        />
        <path
          d="M190 160h196M190 210h252M190 260h150"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeOpacity="0.78"
          strokeWidth="18"
        />
        <path
          d="M156 334h308"
          stroke="#7bd0ff"
          strokeLinecap="round"
          strokeWidth="18"
        />
        <path
          d="M184 334h72"
          stroke="#3cddc7"
          strokeLinecap="round"
          strokeWidth="18"
        />
        <path
          d="M282 334h72"
          stroke="#ffb4ab"
          strokeLinecap="round"
          strokeWidth="18"
        />
      </svg>
    </GraphicStage>
  );
}

export function DeveloperExperienceGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[42rem]"
        viewBox="0 0 640 420"
        fill="none"
      >
        <defs>
          <linearGradient
            id="dx-flow"
            x1="92"
            x2="548"
            y1="210"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3cddc7" />
            <stop offset="0.52" stopColor="#7bd0ff" />
            <stop offset="1" stopColor="#d4e4fa" />
          </linearGradient>
        </defs>
        <path
          d="M92 246C172 104 270 320 356 190c58-88 124-82 192-16"
          stroke="url(#dx-flow)"
          strokeLinecap="round"
          strokeWidth="18"
        />
        <path
          d="M278 132h102l62 78-62 78H278l-62-78 62-78Z"
          fill="#7bd0ff"
          fillOpacity="0.14"
          stroke="#7bd0ff"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M296 194l-24 18 24 18M344 178l-32 66M362 194l24 18-24 18"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
        />
      </svg>
    </GraphicStage>
  );
}

export function TestingGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[34rem]"
        viewBox="0 0 480 420"
        fill="none"
      >
        <path
          d="M240 62 372 112v92c0 86-51 136-132 166-81-30-132-80-132-166v-92L240 62Z"
          fill="#3cddc7"
          fillOpacity="0.14"
          stroke="#3cddc7"
          strokeOpacity="0.62"
          strokeWidth="3"
        />
        <path
          d="m176 216 42 42 92-108"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        />
        <path
          d="M150 116 240 82l90 34"
          stroke="#7bd0ff"
          strokeLinecap="round"
          strokeOpacity="0.45"
          strokeWidth="12"
        />
      </svg>
    </GraphicStage>
  );
}

export function ExperimentationGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[40rem]"
        viewBox="0 0 620 420"
        fill="none"
      >
        <defs>
          <linearGradient
            id="experiment-branch"
            x1="130"
            x2="500"
            y1="210"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7bd0ff" />
            <stop offset="1" stopColor="#3cddc7" />
          </linearGradient>
        </defs>
        <path
          d="M130 210h110c54 0 72-84 134-84h116M240 210c54 0 72 84 134 84h116"
          stroke="url(#experiment-branch)"
          strokeLinecap="round"
          strokeWidth="16"
        />
        <path
          d="M112 210a28 28 0 1 0 56 0 28 28 0 0 0-56 0ZM464 126a28 28 0 1 0 56 0 28 28 0 0 0-56 0ZM464 294a28 28 0 1 0 56 0 28 28 0 0 0-56 0Z"
          fill="#d4e4fa"
          fillOpacity="0.9"
        />
      </svg>
    </GraphicStage>
  );
}

export function PerformanceGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[38rem]"
        viewBox="0 0 560 420"
        fill="none"
      >
        <path
          d="M116 286a164 164 0 0 1 328 0"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.14"
          strokeWidth="28"
        />
        <path
          d="M116 286a164 164 0 0 1 270-126"
          stroke="#7bd0ff"
          strokeLinecap="round"
          strokeWidth="28"
        />
        <path d="m304 196-78 106h74l-30 72 96-118h-76l14-60Z" fill="#3cddc7" />
        <path
          d="M190 316h180"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeOpacity="0.42"
          strokeWidth="12"
        />
      </svg>
    </GraphicStage>
  );
}

export function ContentModelGraphic() {
  return (
    <GraphicStage>
      <svg
        aria-hidden="true"
        className="h-full w-full max-w-[38rem]"
        viewBox="0 0 560 420"
        fill="none"
      >
        <path
          d="M184 74h206l54 56v214H184V74Z"
          fill="#7bd0ff"
          fillOpacity="0.12"
          stroke="#7bd0ff"
          strokeOpacity="0.42"
          strokeWidth="2"
        />
        <path
          d="M390 74v56h54"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
          strokeWidth="2"
        />
        <path
          d="M220 170h126M220 216h174M220 262h108"
          stroke="#d4e4fa"
          strokeLinecap="round"
          strokeOpacity="0.72"
          strokeWidth="16"
        />
        <path
          d="M128 130h64M128 210h64M128 290h64M368 210h64"
          stroke="#3cddc7"
          strokeLinecap="round"
          strokeWidth="12"
        />
        <path
          d="M192 130h42M192 210h28M192 290h42M346 210h22"
          stroke="#3cddc7"
          strokeLinecap="round"
          strokeOpacity="0.34"
          strokeWidth="2"
        />
      </svg>
    </GraphicStage>
  );
}
