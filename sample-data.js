// Pre-populated sample engineering & CAD design portfolio items
const SAMPLE_DESIGNS = [
  {
    id: "dsg-101",
    title: "Autonomous Seeding Robot Chassis",
    category: "Tractor & Farm Machinery",
    software: ["SolidWorks 2024", "ANSYS Workbench", "Keyshot"],
    date: "2026-08-15",
    shortDescription: "Heavy-duty electric drive chassis with dynamic soil-opener linkages, LiDAR mounting, and modular hopper bay.",
    fullDescription: "An autonomous field seeding robot design engineered for precision agriculture. Features a lightweight tubular alloy frame, high-torque hub motors, dual-articulated seed metering linkages, and multi-sensor mounting brackets (LiDAR, Real-Time Kinematic GPS, and spectral cameras). Designed for 24/7 continuous row-crop operation.",
    specs: [
      { key: "Dimensions", value: "1450 x 920 x 850 mm" },
      { key: "Total Mass", value: "68.5 kg" },
      { key: "Max Payload Capacity", value: "120 kg (Seed Hopper)" },
      { key: "Powertrain", value: "48V 1.5kW Dual Hub Drive" },
      { key: "Material", value: "Aluminum 6061-T6 & Carbon Composite" },
      { key: "FEA Safety Factor", value: "2.4x under max impact load" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%230f172a"/>
            <stop offset="100%" stop-color="%231e293b"/>
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23334155" stroke-width="0.5" stroke-dasharray="2,2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(%23bg1)"/>
        <rect width="100%" height="100%" fill="url(%23grid)"/>
        
        <!-- Technical HUD overlay -->
        <text x="30" y="40" fill="%2338bdf8" font-family="monospace" font-size="14" font-weight="bold">CAD SPEC // ISOMETRIC OVERVIEW</text>
        <text x="30" y="60" fill="%2394a3b8" font-family="monospace" font-size="11">MODEL ID: AUT-SEED-2026-V3</text>
        <text x="650" y="40" fill="%2338bdf8" font-family="monospace" font-size="12">SCALE: 1:10</text>
        
        <!-- Chassis Body -->
        <g stroke="%2338bdf8" stroke-width="2" fill="none">
          <path d="M 200 320 L 320 230 L 600 230 L 520 320 Z" fill="%230f172a" fill-opacity="0.7"/>
          <path d="M 200 320 L 200 370 L 520 370 L 520 320 Z" fill="%231e293b" fill-opacity="0.8"/>
          <path d="M 520 320 L 600 230 L 600 280 L 520 370 Z" fill="%230284c7" fill-opacity="0.3"/>
          
          <!-- Wheels -->
          <circle cx="220" cy="380" r="45" stroke="%23f59e0b" stroke-width="3" fill="%23090d16"/>
          <circle cx="220" cy="380" r="25" stroke="%2338bdf8" stroke-width="1.5"/>
          <circle cx="500" cy="380" r="45" stroke="%23f59e0b" stroke-width="3" fill="%23090d16"/>
          <circle cx="500" cy="380" r="25" stroke="%2338bdf8" stroke-width="1.5"/>
          
          <!-- Front Sensor Rig -->
          <path d="M 170 320 L 200 320 L 190 260 L 150 260 Z" stroke="%2310b981"/>
          <circle cx="150" cy="260" r="12" fill="%2310b981" fill-opacity="0.3"/>
          <line x1="150" y1="260" x2="100" y2="200" stroke="%2310b981" stroke-dasharray="3,3"/>
          <text x="70" y="195" fill="%2310b981" font-family="monospace" font-size="10">LiDAR SENSOR TOWER</text>
          
          <!-- Hopper Reservoir -->
          <polygon points="340,230 460,230 440,150 360,150" stroke="%2338bdf8" stroke-width="2" fill="%230369a1" fill-opacity="0.4"/>
          <line x1="400" y1="150" x2="400" y2="100" stroke="%2338bdf8" stroke-dasharray="2,2"/>
          <text x="350" y="90" fill="%2338bdf8" font-family="monospace" font-size="10">SEED HOPPER (120L)</text>
          
          <!-- Soil Opener linkage -->
          <path d="M 330 370 L 370 420 L 410 420" stroke="%23ef4444" stroke-width="2.5"/>
          <polygon points="410,415 435,420 410,425" fill="%23ef4444"/>
          <text x="445" y="423" fill="%23ef4444" font-family="monospace" font-size="10">COULTER DISC linkage</text>
        </g>
        
        <!-- Dimension Overlay Lines -->
        <line x1="200" y1="440" x2="520" y2="440" stroke="%2364748b" stroke-width="1" stroke-dasharray="4,4"/>
        <line x1="200" y1="435" x2="200" y2="445" stroke="%2364748b"/>
        <line x1="520" y1="435" x2="520" y2="445" stroke="%2364748b"/>
        <text x="330" y="455" fill="%2394a3b8" font-family="monospace" font-size="11">WHEELBASE: 1450 mm</text>
      </svg>`,
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%230b1329"/>
            <stop offset="100%" stop-color="%23172554"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(%23bg2)"/>
        <text x="30" y="40" fill="%2360a5fa" font-family="monospace" font-size="14" font-weight="bold">FEA STRESS ANALYSIS // LOAD DISTRIBUTION</text>
        <text x="30" y="60" fill="%2394a3b8" font-family="monospace" font-size="11">LOAD: 1200 N DOWNWARD STATIC</text>
        
        <!-- Stress mesh diagram -->
        <g stroke-width="1.5" fill="none">
          <!-- Low stress blue area -->
          <polygon points="150,300 250,200 450,200 350,300" stroke="%233b82f6" fill="%231d4ed8" fill-opacity="0.3"/>
          <!-- Med stress yellow area -->
          <polygon points="350,300 450,200 550,200 480,300" stroke="%23eab308" fill="%23ca8a04" fill-opacity="0.5"/>
          <!-- High stress red hotspot -->
          <polygon points="480,300 550,200 620,250 560,330" stroke="%23ef4444" fill="%23dc2626" fill-opacity="0.7"/>
        </g>
        
        <!-- Stress scale legend bar -->
        <text x="650" y="150" fill="%23cbd5e1" font-family="monospace" font-size="10">VON MISES (MPa)</text>
        <rect x="650" y="165" width="20" height="20" fill="%23dc2626"/> <text x="680" y="180" fill="%23cbd5e1" font-family="monospace" font-size="10">210 (Max)</text>
        <rect x="650" y="195" width="20" height="20" fill="%23ca8a04"/> <text x="680" y="210" fill="%23cbd5e1" font-family="monospace" font-size="10">140</text>
        <rect x="650" y="225" width="20" height="20" fill="%231d4ed8"/> <text x="680" y="240" fill="%23cbd5e1" font-family="monospace" font-size="10">35 (Min)</text>
      </svg>`
    ]
  },
  {
    id: "dsg-102",
    title: "Heavy-Duty Category 2 Tractor 3-Point Hitch",
    category: "Tractor & Farm Machinery",
    software: ["Fusion 360", "AutoCAD Mechanical"],
    date: "2026-07-28",
    shortDescription: "Reinforced Category 2 three-point linkage system with dual hydraulic lift cylinders and quick-attach coupler hooks.",
    fullDescription: "A fully modeled Cat 2 tractor 3-point hitch linkage built to ISO 730 standards. Includes dual double-acting hydraulic cylinders for 3200 kg lifting capacity, adjustable sway blocks, turnbuckle top link, and hardened steel coupler pins. Optimised for heavy tillage implements.",
    specs: [
      { key: "Category Standard", value: "ISO 730 Category 2" },
      { key: "Lift Capacity", value: "3,200 kg @ 610mm behind ball ends" },
      { key: "Hydraulic Pressure", value: "210 bar (3000 PSI)" },
      { key: "Pin Diameters", value: "Top: 25.4mm, Lower: 28.6mm" },
      { key: "Main Material", value: "Forged Alloy Steel 4140" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgHitch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%2318181b"/>
            <stop offset="100%" stop-color="%2327272a"/>
          </linearGradient>
          <pattern id="gridHitch" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="%233f3f46" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(%23bgHitch)"/>
        <rect width="100%" height="100%" fill="url(%23gridHitch)"/>
        
        <text x="30" y="40" fill="%23f59e0b" font-family="monospace" font-size="14" font-weight="bold">KINEMATIC BLUEPRINT // CAT-2 LINKAGE</text>
        <text x="30" y="60" fill="%23a1a1aa" font-family="monospace" font-size="11">DRAWING NO: TRACT-3PH-08B</text>
        
        <!-- Linkage drawing -->
        <g stroke="%23f59e0b" stroke-width="2.5" fill="none" stroke-linejoin="round">
          <!-- Top Link -->
          <line x1="250" y1="170" x2="520" y2="150" stroke="%2338bdf8" stroke-width="3"/>
          <circle cx="250" cy="170" r="8" fill="%2338bdf8"/>
          <circle cx="520" cy="150" r="8" fill="%2338bdf8"/>
          <text x="360" y="140" fill="%2338bdf8" font-family="monospace" font-size="11">ADJUSTABLE TOP LINK</text>
          
          <!-- Lower Arms -->
          <path d="M 220 300 L 450 310 L 580 340" stroke="%23f59e0b" stroke-width="4"/>
          <circle cx="220" cy="300" r="10" fill="%23f59e0b"/>
          <circle cx="580" cy="340" r="10" fill="%23f59e0b"/>
          <text x="320" y="335" fill="%23f59e0b" font-family="monospace" font-size="11">LIFT ARM (FORGED 4140)</text>
          
          <!-- Hydraulic Cylinder -->
          <rect x="290" y="210" width="100" height="30" rx="5" fill="%231e293b" stroke="%2310b981" stroke-width="2"/>
          <line x1="390" y1="225" x2="470" y2="280" stroke="%2310b981" stroke-width="3"/>
          <circle cx="290" cy="225" r="6" fill="%2310b981"/>
          <circle cx="470" cy="280" r="6" fill="%2310b981"/>
          <text x="300" y="200" fill="%2310b981" font-family="monospace" font-size="11">HYDRAULIC ACTUATOR (210 BAR)</text>
          
          <!-- Quick Coupler Hook -->
          <path d="M 570 320 L 610 330 L 600 360 L 570 340 Z" fill="%23ef4444" stroke="%23ef4444"/>
          <text x="620" y="340" fill="%23ef4444" font-family="monospace" font-size="11">QUICK COUPLER</text>
        </g>
      </svg>`
    ]
  },
  {
    id: "dsg-103",
    title: "Hexacopter Heavy-Lift Spraying Drone Frame",
    category: "Drone Design",
    software: ["SolidWorks 2024", "Rhino 3D", "Keyshot"],
    date: "2026-06-19",
    shortDescription: "Foldable carbon-fiber hexacopter platform designed for 25L agricultural crop spraying payloads.",
    fullDescription: "A foldable 1600mm wheelbase hexacopter platform engineered for rugged field environments. Features quick-release carbon arm latches, vibration-dampened flight controller bay, integrated 25-liter fluid tank chassis cutouts, and centrifugal atomizing spray nozzle booms.",
    specs: [
      { key: "Wheelbase", value: "1650 mm (Diagonal)" },
      { key: "Frame Weight", value: "4.8 kg (Dry)" },
      { key: "Spray Payload", value: "25 Liters / 28 kg" },
      { key: "Propeller Size", value: "30 x 10 inch Carbon Folding" },
      { key: "Arm Tube Diameter", value: "40mm OD 3K Carbon Fiber" },
      { key: "Folding Mechanism", value: "CNC Aluminum 7075 Quick Latch" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="bgDrone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="%23091e3a"/>
            <stop offset="100%" stop-color="%232f80ed"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="%230a0f1d"/>
        
        <text x="30" y="40" fill="%2338bdf8" font-family="monospace" font-size="14" font-weight="bold">DRONE SCHEMATIC // HEXACOPTER 1650MM</text>
        <text x="30" y="60" fill="%2394a3b8" font-family="monospace" font-size="11">MODEL: AGRI-HEX-25L</text>
        
        <!-- Central Hub -->
        <polygon points="400,210 440,230 440,270 400,290 360,270 360,230" fill="%231e293b" stroke="%2338bdf8" stroke-width="3"/>
        <circle cx="400" cy="250" r="25" fill="%230284c7" stroke="%2338bdf8" stroke-width="2"/>
        <text x="382" y="255" fill="%23ffffff" font-family="monospace" font-size="10" font-weight="bold">CORE</text>
        
        <!-- 6 Arms -->
        <g stroke="%2338bdf8" stroke-width="4">
          <!-- Arm 1 (Top Left) -->
          <line x1="370" y1="225" x2="230" y2="140"/>
          <circle cx="230" cy="140" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
          
          <!-- Arm 2 (Top Right) -->
          <line x1="430" y1="225" x2="570" y2="140"/>
          <circle cx="570" cy="140" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
          
          <!-- Arm 3 (Right) -->
          <line x1="440" y1="250" x2="620" y2="250"/>
          <circle cx="620" cy="250" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
          
          <!-- Arm 4 (Bottom Right) -->
          <line x1="430" y1="275" x2="570" y2="360"/>
          <circle cx="570" cy="360" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
          
          <!-- Arm 5 (Bottom Left) -->
          <line x1="370" y1="275" x2="230" y2="360"/>
          <circle cx="230" cy="360" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
          
          <!-- Arm 6 (Left) -->
          <line x1="360" y1="250" x2="180" y2="250"/>
          <circle cx="180" cy="250" r="30" fill="%230f172a" stroke="%2310b981" stroke-width="2"/>
        </g>
        
        <!-- Propeller Sweeps -->
        <g stroke="%23f59e0b" stroke-width="1.5" stroke-dasharray="4,4" fill="none">
          <circle cx="230" cy="140" r="55"/>
          <circle cx="570" cy="140" r="55"/>
          <circle cx="620" cy="250" r="55"/>
          <circle cx="570" cy="360" r="55"/>
          <circle cx="230" cy="360" r="55"/>
          <circle cx="180" cy="250" r="55"/>
        </g>
        <text x="640" y="440" fill="%23f59e0b" font-family="monospace" font-size="11">30" CARBON PROPELLERS</text>
      </svg>`
    ]
  },
  {
    id: "dsg-104",
    title: "High-Torque Two-Stage Planetary Gearbox",
    category: "CAD Design",
    software: ["SolidWorks 2023", "ANSYS Workbench"],
    date: "2026-05-12",
    shortDescription: "Compact 25:1 ratio two-stage epicyclic gearbox designed for electric machinery actautors.",
    fullDescription: "A high power-density 2-stage planetary reduction drive. Designed with helical gear profiles for reduced acoustic noise and high torque transfer. Includes internal oil lubrication channels and needle roller planet pin bearings.",
    specs: [
      { key: "Reduction Ratio", value: "25 : 1 (Two Stage)" },
      { key: "Rated Output Torque", value: "450 Nm" },
      { key: "Max Speed Input", value: "6,000 RPM" },
      { key: "Gear Tooth Profile", value: "Helical 20° Pressure Angle" },
      { key: "Efficiency", value: "> 95%" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <rect width="100%" height="100%" fill="%230f172a"/>
        <text x="30" y="40" fill="%23ec4899" font-family="monospace" font-size="14" font-weight="bold">EPICYCLIC GEAR MESH // SECTIONAL VIEW</text>
        <text x="30" y="60" fill="%2394a3b8" font-family="monospace" font-size="11">GEARBOX ID: PG-25-STAGE2</text>
        
        <!-- Outer Ring Gear -->
        <circle cx="400" cy="250" r="160" fill="none" stroke="%23ec4899" stroke-width="8"/>
        <circle cx="400" cy="250" r="168" fill="none" stroke="%23475569" stroke-width="2"/>
        
        <!-- Sun Gear -->
        <circle cx="400" cy="250" r="45" fill="%23831843" stroke="%23f43f5e" stroke-width="3"/>
        <text x="382" y="255" fill="%23ffffff" font-family="monospace" font-size="12" font-weight="bold">SUN</text>
        
        <!-- 3 Planet Gears -->
        <g stroke="%2338bdf8" stroke-width="3" fill="%230369a1">
          <!-- Planet 1 (Top) -->
          <circle cx="400" cy="145" r="50"/>
          <circle cx="400" cy="145" r="12" fill="%230f172a" stroke="%23f59e0b"/>
          
          <!-- Planet 2 (Bottom Left) -->
          <circle cx="309" cy="302" r="50"/>
          <circle cx="309" cy="302" r="12" fill="%230f172a" stroke="%23f59e0b"/>
          
          <!-- Planet 3 (Bottom Right) -->
          <circle cx="491" cy="302" r="50"/>
          <circle cx="491" cy="302" r="12" fill="%230f172a" stroke="%23f59e0b"/>
        </g>
        
        <!-- Planet Carrier Link -->
        <polygon points="400,145 309,302 491,302" fill="none" stroke="%23f59e0b" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="410" y="330" fill="%23f59e0b" font-family="monospace" font-size="11">TRI-CARRIER LINK</text>
      </svg>`
    ]
  },
  {
    id: "dsg-105",
    title: "Double-Acting Hydraulic Cylinder Actuator",
    category: "Engineering Projects",
    software: ["AutoCAD 2024", "PTC Creo"],
    date: "2026-04-03",
    shortDescription: "Custom 80mm bore hydraulic RAM cylinder engineered for front loader arms.",
    fullDescription: "A precision double-acting hydraulic actuator designed for agricultural front loaders and excavators. Rated for working pressures up to 250 bar with polyurethane lip seals and chrome-plated induction-hardened piston rods.",
    specs: [
      { key: "Cylinder Bore", value: "80 mm" },
      { key: "Piston Rod Diameter", value: "50 mm" },
      { key: "Stroke Length", value: "450 mm" },
      { key: "Max Operating Pressure", value: "250 bar (3625 PSI)" },
      { key: "Theoretical Force", value: "125.6 kN @ 250 bar" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <rect width="100%" height="100%" fill="%23091314"/>
        <text x="30" y="40" fill="%2310b981" font-family="monospace" font-size="14" font-weight="bold">HYDRAULIC ACTUATOR // ASSEMBLY DRAWING</text>
        
        <!-- Cylinder Barrel -->
        <rect x="150" y="200" width="380" height="100" rx="4" fill="%23064e3b" stroke="%2310b981" stroke-width="3"/>
        
        <!-- Piston Rod -->
        <rect x="420" y="225" width="280" height="50" fill="%2394a3b8" stroke="%23f8fafc" stroke-width="2"/>
        
        <!-- Piston Head inside barrel -->
        <rect x="380" y="205" width="40" height="90" fill="%2310b981" stroke="%2334d399"/>
        
        <!-- Ports -->
        <circle cx="200" cy="180" r="15" fill="%2310b981"/>
        <line x1="200" y1="180" x2="200" y2="200" stroke="%2310b981" stroke-width="4"/>
        <text x="175" y="160" fill="%2310b981" font-family="monospace" font-size="11">PORT A (EXTENSION)</text>

        <circle cx="480" cy="180" r="15" fill="%2310b981"/>
        <line x1="480" y1="180" x2="480" y2="200" stroke="%2310b981" stroke-width="4"/>
        <text x="455" y="160" fill="%2310b981" font-family="monospace" font-size="11">PORT B (RETRACTION)</text>
      </svg>`
    ]
  },
  {
    id: "dsg-106",
    title: "Ergonomic Smart Tractor Cabin Interface",
    category: "Other Designs",
    software: ["Blender 4.2", "Fusion 360"],
    date: "2026-03-21",
    shortDescription: "Concept design for a modern digital-twin operator console with multi-axis joystick.",
    fullDescription: "A modern ergonomic armrest console design for high-horsepower tractors. Features an intuitive multi-function joystick layout, integrated 12-inch touchscreen display housing, and customizable ISOBUS field controls.",
    specs: [
      { key: "Material", value: "Soft-Touch Polyurethane & Machined Aluminum" },
      { key: "Screen Mount", value: "Dual VESA 100 articulated arm" },
      { key: "Joystick Axes", value: "3-Axis proportional Hall-effect" },
      { key: "Buttons", value: "16 Programmable RGB Backlit switches" }
    ],
    images: [
      `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <rect width="100%" height="100%" fill="%2318181b"/>
        <text x="30" y="40" fill="%23a855f7" font-family="monospace" font-size="14" font-weight="bold">CABIN INTERFACE CONCEPT // ARMREST CONSOLE</text>
        <path d="M 200 350 Q 250 220 400 240 T 600 280 L 600 380 L 200 380 Z" fill="%2327272a" stroke="%23a855f7" stroke-width="3"/>
        <rect x="450" y="140" width="160" height="100" rx="8" fill="%230f172a" stroke="%2338bdf8" stroke-width="2"/>
        <text x="475" y="190" fill="%2338bdf8" font-family="monospace" font-size="12">ISOBUS DISPLAY</text>
        <circle cx="320" cy="245" r="20" fill="%23a855f7"/>
        <line x1="320" y1="245" x2="300" y2="180" stroke="%23a855f7" stroke-width="6"/>
        <circle cx="300" cy="180" r="15" fill="%23e9d5ff"/>
      </svg>`
    ]
  }
];
