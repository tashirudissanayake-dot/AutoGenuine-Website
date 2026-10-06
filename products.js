// products.js - AutoGenuine Central Product Database & Utilities

const DEFAULT_PRODUCTS = [
    {
        id: "brake-pad-set",
        name: "Front Ceramic Brake Pad Set",
        category: "Brake Parts",
        categorySlug: "brake-parts",
        price: 4500.00,
        originalPrice: 5800.00,
        discountPercent: 22,
        rating: 4.9,
        reviewsCount: 12,
        inStock: true,
        stockCount: 18,
        sku: "AG-BRK-4091",
        oemNumber: "04465-02220 / 04465-YZZE1",
        brand: "Advics / Brembo Genuine",
        warranty: "2 Years / 40,000 km Warranty",
        origin: "Japan",
        mainImage: "images/brake-pad.jpg",
        gallery: ["images/brake-pad.jpg"],
        shortDescription: "High-performance ceramic front brake pad set offering exceptional stopping power, whisper-quiet braking, and ultra-low brake dust buildup for everyday and highway driving.",
        fullDescription: `The AutoGenuine Front Ceramic Brake Pad Set is engineered to exceed original equipment (OEM) standards. Designed with high-density ceramic friction formulation, these pads provide reliable braking response across diverse temperatures while significantly reducing disc rotor wear.
        
Equipped with multi-layer noise-dampening shims and chamfered edges, you can enjoy quiet, vibration-free stopping performance under all Sri Lankan road conditions.`,
        features: [
            "Premium low-dust ceramic friction formulation",
            "Pre-fitted multi-layer anti-squeal shims",
            "Chamfered & slotted for enhanced thermal dissipation",
            "100% Asbestos-free environmentally safe materials",
            "Includes wear sensor clips and high-temp brake grease packet"
        ],
        specs: {
            "Part Position": "Front Axle (Left & Right)",
            "Material": "Premium Ceramic Composite",
            "Thickness": "17.5 mm",
            "Width": "131.5 mm",
            "Height": "57.2 mm",
            "Wear Indicator": "Acoustic Wear Warning Sensor",
            "Package Contents": "4 Brake Pads (Full Front Set) + Hardware Clips",
            "Country of Origin": "Japan (Genuine OEM Specification)"
        },
        compatibility: [
            { make: "Toyota", model: "Corolla (Axio / Fielder / Altis)", years: "2007 - 2021", engine: "1.5L / 1.8L (1NZ-FE, 2ZR-FE)" },
            { make: "Toyota", model: "Premio / Allion (NZT260, ZRT260)", years: "2007 - 2020", engine: "1.5L / 1.8L (1NZ-FE, 2ZR-FAE)" },
            { make: "Toyota", model: "Yaris / Vitz (KSP130, NSP130)", years: "2011 - 2020", engine: "1.0L / 1.3L" },
            { make: "Nissan", model: "Tiida / Latio (C11, SC11)", years: "2006 - 2014", engine: "1.5L (HR15DE)" },
            { make: "Honda", model: "Fit / Grace / Vezel (Front Compatibility Variant)", years: "2014 - 2021", engine: "1.5L i-VTEC / Earth Dreams" }
        ],
        reviews: [
            {
                author: "Kasun Dharmasena",
                avatar: "KD",
                location: "Colombo",
                rating: 5,
                date: "2 days ago",
                title: "Superb braking power & no noise!",
                comment: "I installed these on my Premio NZT260 last week. The braking feel is smooth and progressive with absolutely no squeaking or wheel dust. OEM fit was 100% exact."
            },
            {
                author: "Dilshan Perera",
                avatar: "DP",
                location: "Kandy",
                rating: 5,
                date: "1 week ago",
                title: "100% Genuine part - very satisfied",
                comment: "Fast 1-day delivery to Kandy. Genuine Japanese packaging with verification hologram. Highly recommended for anyone looking for authentic parts."
            }
        ]
    },
    {
        id: "toyota-oil-filter",
        name: "Toyota Genuine Engine Oil Filter",
        category: "Filters",
        categorySlug: "filters",
        price: 1250.00,
        originalPrice: 1650.00,
        discountPercent: 24,
        rating: 5.0,
        reviewsCount: 18,
        inStock: true,
        stockCount: 45,
        sku: "AG-FLT-1008",
        oemNumber: "90915-YZZE1 / 90915-10003",
        brand: "Toyota Genuine Motor Parts",
        warranty: "1 Year / 10,000 km Service Life",
        origin: "Japan / Thailand (Toyota Motor Corp)",
        mainImage: "images/oil-filter.jpg",
        gallery: ["images/oil-filter.jpg"],
        shortDescription: "Genuine Toyota micro-pore spin-on engine oil filter engineered to capture 99% of microscopic engine impurities and ensure uninterrupted oil flow under all temperatures.",
        fullDescription: `Keep your vehicle's engine running at peak efficiency and longevity with the Genuine Toyota Engine Oil Filter. Specifically constructed with resin-impregnated cellulose and synthetic fiber media, it traps contaminants as small as 10 microns without restricting oil lubrication flow.
        
Features a heavy-duty silicone anti-drainback valve that prevents dry cold starts by holding oil in the filter when the engine is switched off, plus a precision pressure relief bypass valve.`,
        features: [
            "High-capacity synthetic filter media captures 99% of contaminants",
            "Heat-resistant silicone anti-drainback valve stops dry engine starts",
            "Precision bypass relief valve prevents oil starvation in cold temperatures",
            "Heavy-duty heavy-gauge steel casing with burst-proof construction",
            "Pre-lubricated nitrile rubber O-ring seal for leak-proof installation"
        ],
        specs: {
            "Filter Type": "Spin-on Metal Canister Oil Filter",
            "Thread Size": "3/4\"-16 UNF",
            "Outer Diameter": "65 mm",
            "Height": "75 mm",
            "Bypass Valve": "Yes (8 - 11 PSI Opening Pressure)",
            "Anti-Drainback Valve": "Yes (High-grade Silicone)",
            "Filtration Rating": "10 - 15 Microns (99.2% Efficiency)",
            "Recommended Service": "Every 5,000 - 10,000 km / Engine Oil Change"
        },
        compatibility: [
            { make: "Toyota", model: "Corolla / Axio / Fielder / Altis (All Generations)", years: "2000 - 2024", engine: "1NZ-FE, 2NZ-FE, 2ZR-FE, 1ZR-FE" },
            { make: "Toyota", model: "Premio / Allion (NZT240, NZT260, ZRT260)", years: "2002 - 2021", engine: "1.5L / 1.8L Engines" },
            { make: "Toyota", model: "Yaris / Vitz / Aqua / Prius C", years: "2005 - 2023", engine: "1NZ-FXE Hybrid / 1.3L / 1.5L" },
            { make: "Toyota", model: "Prius (ZVW30, ZVW50) / C-HR (Hybrid)", years: "2009 - 2023", engine: "1.8L 2ZR-FXE Hybrid Engine" }
        ],
        reviews: [
            {
                author: "Nimal Siriwardena",
                avatar: "NS",
                location: "Kurunegala",
                rating: 5,
                date: "1 week ago",
                title: "Original Toyota Part with Hologram",
                comment: "Always use this genuine filter for my Prius oil changes. Oil stays clean and pressure builds instantly on start. AutoGenuine delivered within 24 hours."
            }
        ]
    },
    {
        id: "premium-air-filter",
        name: "High-Flow Engine Air Filter",
        category: "Filters",
        categorySlug: "filters",
        price: 2150.00,
        originalPrice: 2800.00,
        discountPercent: 23,
        rating: 4.8,
        reviewsCount: 9,
        inStock: true,
        stockCount: 22,
        sku: "AG-FLT-2034",
        oemNumber: "17801-21050 / 17801-0D060",
        brand: "Denso Genuine Parts",
        warranty: "1 Year / 20,000 km Service Life",
        origin: "Japan (OEM Standard)",
        mainImage: "images/air-filter.jpg",
        gallery: ["images/air-filter.jpg"],
        shortDescription: "Premium pleated multi-fiber engine air intake filter providing maximum airflow for improved acceleration, fuel economy, and maximum engine dust protection.",
        fullDescription: `Maximize your engine's combustion efficiency and horsepower with this OEM-spec High-Flow Engine Air Filter. Crafted using advanced multi-layer synthetic non-woven pleated media, it traps airborne dust, pollen, soot, and road debris without causing intake air restriction.
        
A flexible polyurethane sealing frame provides an airtight seal inside the airbox, ensuring 100% of incoming intake air is filtered before entering the throttle body and combustion chamber.`,
        features: [
            "Optimized deep pleat geometry for maximum filtration surface area",
            "Boosts engine horsepower, throttle response, and fuel efficiency",
            "Traps 99.5% of harmful road dust, sand particles, and pollen",
            "Flexible polyurethane perimeter gasket prevents airbox blow-by",
            "Direct OEM drop-in replacement with no modifications needed"
        ],
        specs: {
            "Filter Type": "Panel Type Dry Element Engine Air Filter",
            "Length": "241 mm",
            "Width": "176 mm",
            "Height": "51 mm",
            "Frame Material": "Molded Polyurethane Elastomer",
            "Media Material": "Multi-density Synthetic Non-woven Pleated Media",
            "Recommended Service": "Replace every 15,000 - 20,000 km or 12 months"
        },
        compatibility: [
            { make: "Toyota", model: "Axio / Fielder (NZE141, NZE161)", years: "2006 - 2021", engine: "1NZ-FE (1.5L)" },
            { make: "Toyota", model: "Premio / Allion (NZT260, ZRT260)", years: "2007 - 2021", engine: "1NZ-FE, 2ZR-FAE" },
            { make: "Toyota", model: "Aqua / Prius C (NHP10)", years: "2012 - 2021", engine: "1.5L 1NZ-FXE Hybrid" }
        ],
        reviews: [
            {
                author: "Amal Rodrigo",
                avatar: "AR",
                location: "Moratuwa",
                rating: 4.8,
                date: "2 weeks ago",
                title: "Instant improvement in throttle response",
                comment: "My old air filter was clogged and car felt sluggish. Replaced it with this in 2 minutes. Fuel economy went up immediately."
            }
        ]
    },
    {
        id: "exide-car-battery",
        name: "Exide Matrix Car Battery 60Ah",
        category: "Batteries",
        categorySlug: "batteries",
        price: 32500.00,
        originalPrice: 36000.00,
        discountPercent: 10,
        rating: 5.0,
        reviewsCount: 21,
        inStock: true,
        stockCount: 12,
        sku: "AG-BAT-6001",
        oemNumber: "DIN60 / 55D23L / 65D23L",
        brand: "Exide Matrix Genuine",
        warranty: "30 Months Islandwide Replacement Warranty",
        origin: "Sri Lanka / India",
        mainImage: "images/car-battery.jpg",
        gallery: ["images/car-battery.jpg"],
        shortDescription: "Ultra-durable, zero-maintenance automotive battery featuring advanced Silver-Alloy matrix technology for effortless cold-cranking and extreme tropical weather resilience.",
        fullDescription: `The Exide Matrix 60Ah Maintenance-Free Car Battery is built to deliver superior starting power and long-lasting cyclic performance. Formulated with specialized Silver Alloy and Ca-Ca technology, it withstands high under-bonnet engine temperatures and stop-and-go city traffic with zero water topping required.
        
Equipped with a built-in Magic Eye state-of-charge indicator, spark arrestor safety venting, and vibration-resistant container ribs.`,
        features: [
            "Advanced Silver Alloy (Silver Plus) grid technology",
            "100% Zero Maintenance - factory sealed and charged",
            "High Cold Cranking Amps (520 CCA) for instant engine turnover",
            "Built-in Magic Eye hydrometer for quick charge status check",
            "30 Months comprehensive islandwide replacement warranty"
        ],
        specs: {
            "Battery Capacity": "60 Ah (Ampere-hours)",
            "Voltage": "12 Volts",
            "Cold Cranking Amps (CCA)": "520 A @ -18°C",
            "Terminal Type": "Standard Post (JIS Standard)",
            "Dimensions (L x W x H)": "232 mm x 173 mm x 225 mm",
            "Weight": "15.8 kg",
            "Warranty Period": "30 Months Comprehensive Replacement"
        },
        compatibility: [
            { make: "Toyota", model: "Premio / Allion / Corolla / Axio", years: "2005 - 2022", engine: "Petrol / Hybrid Aux (1.5L - 2.0L)" },
            { make: "Nissan", model: "Sunny / Sylphy / X-Trail (T30, T31)", years: "2004 - 2018", engine: "1.5L - 2.0L Petrol" },
            { make: "Honda", model: "Civic / CR-V / Accord / HR-V", years: "2006 - 2020", engine: "1.5L - 2.0L" }
        ],
        reviews: [
            {
                author: "Ravindu Pushpakumara",
                avatar: "RP",
                location: "Maharagama",
                rating: 5,
                date: "3 weeks ago",
                title: "Strong crank & fast free delivery",
                comment: "Car started on the first crank. Free battery health test and installation guidance provided. The 30 months warranty card was stamped."
            }
        ]
    },
    {
        id: "disc-brake-rotors",
        name: "Ventilated Front Disc Brake Rotors Pair",
        category: "Brake Parts",
        categorySlug: "brake-parts",
        price: 14800.00,
        originalPrice: 18500.00,
        discountPercent: 20,
        rating: 4.9,
        reviewsCount: 15,
        inStock: true,
        stockCount: 14,
        sku: "AG-BRK-8022",
        oemNumber: "43512-12710 / 43512-02250",
        brand: "Brembo / Dixcel Japan",
        warranty: "2 Years / 50,000 km Warranty",
        origin: "Japan",
        mainImage: "images/brake.jpg",
        gallery: ["images/brake.jpg"],
        shortDescription: "Precision-balanced high-carbon ventilated front brake disc rotors engineered for rapid heat dissipation, zero brake fade, and smooth vibration-free stopping.",
        fullDescription: `Upgrade your vehicle's braking safety with the AutoGenuine Precision Ventilated Front Brake Disc Rotors. Cast from premium high-carbon grey iron, these rotors resist thermal warping and rotor cracking under heavy braking.
        
Directional cooling vanes ensure rapid airflow through the rotor core, significantly lowering operational temperatures and extending the life of your brake pads.`,
        features: [
            "High-carbon G3000 cast iron alloy for maximum thermal stability",
            "Precision curved cooling vanes for maximum airflow ventilation",
            "Electro-coated anti-corrosion protection on hats and edges",
            "100% Dynamically spin-balanced to eliminate pedal vibration",
            "Precision ground friction surface for instantaneous bed-in"
        ],
        specs: {
            "Rotor Type": "Vented Front Disc Rotor Pair (Left + Right)",
            "Diameter": "275 mm",
            "Nominal Thickness": "22.0 mm",
            "Minimum Thickness": "19.0 mm",
            "Bolt Hole Count": "5 Holes (PCD 100 / 114.3 mm)",
            "Centering Diameter": "55.0 mm",
            "Weight": "12.4 kg (Pair)"
        },
        compatibility: [
            { make: "Toyota", model: "Corolla / Axio / Fielder (NZE141, NZE161, ZRE142)", years: "2007 - 2021", engine: "1.5L / 1.8L" },
            { make: "Toyota", model: "Premio / Allion (NZT260, ZRT260, ZRT261)", years: "2007 - 2022", engine: "1.5L / 1.8L / 2.0L" },
            { make: "Toyota", model: "Prius (ZVW30, ZVW50)", years: "2009 - 2022", engine: "1.8L 2ZR-FXE Hybrid" }
        ],
        reviews: [
            {
                author: "Danushka Fernando",
                avatar: "DF",
                location: "Negombo",
                rating: 5,
                date: "5 days ago",
                title: "No more steering wobble when braking!",
                comment: "My old rotors had warped and steering shook at 80 km/h. Fitted these Brembo discs with new pads and braking is now silky smooth. Top quality."
            }
        ]
    },
    {
        id: "cabin-air-filter",
        name: "Activated Carbon Cabin AC Filter",
        category: "Filters",
        categorySlug: "filters",
        price: 1850.00,
        originalPrice: 2400.00,
        discountPercent: 23,
        rating: 4.8,
        reviewsCount: 11,
        inStock: true,
        stockCount: 30,
        sku: "AG-FLT-3091",
        oemNumber: "87139-30040 / 87139-52040",
        brand: "Denso CleanAir Genuine",
        warranty: "1 Year / 15,000 km Service Life",
        origin: "Japan / South Korea",
        mainImage: "images/filter.jpg",
        gallery: ["images/filter.jpg"],
        shortDescription: "Multi-stage activated carbon air conditioning cabin filter that eliminates odors, exhausts fumes, dust, PM2.5 particles, and allergens from entering your vehicle cabin.",
        fullDescription: `Protect yourself and your passengers from road fumes, traffic smoke, pollen, and airborne bacteria with the AutoGenuine Activated Carbon Cabin Air Filter. 
        
Features a triple-layer micro-pleated structure containing pure coconut shell activated charcoal. Neutralizes unpleasant AC odor and maintains fresh, clean interior air circulation.`,
        features: [
            "High-density natural coconut shell activated carbon layer",
            "Filters 99.7% of PM2.5 micro-particles, dust, and diesel soot",
            "Anti-microbial and anti-allergen treated filter fibers",
            "Protects AC blower motor and evaporator core from dirt buildup",
            "Simple 3-minute glovebox DIY installation"
        ],
        specs: {
            "Filter Type": "Activated Carbon Cabin Air Conditioner Filter",
            "Length": "215 mm",
            "Width": "194 mm",
            "Height": "29 mm",
            "Layers": "3-Stage Composite Filtration Media",
            "Recommended Service": "Replace every 10,000 - 15,000 km or 6 months"
        },
        compatibility: [
            { make: "Toyota", model: "Corolla / Axio / Premio / Allion / Yaris / Vitz / Aqua", years: "2006 - 2024", engine: "All Engines (Petrol & Hybrid)" },
            { make: "Nissan", model: "Leaf / X-Trail / Sylphy / Serena", years: "2010 - 2022", engine: "All Variants" },
            { make: "Honda", model: "Fit / Grace / Vezel / Civic / Insight", years: "2013 - 2023", engine: "Hybrid & Non-Hybrid" }
        ],
        reviews: [
            {
                author: "Charith Senanayake",
                avatar: "CS",
                location: "Battaramulla",
                rating: 5,
                date: "1 week ago",
                title: "AC smells fresh and cold air improved!",
                comment: "Old filter was completely black with dirt. Installed this carbon filter in 3 mins. AC cooling airflow increased noticeably and exterior smoke smell is gone."
            }
        ]
    },
    {
        id: "amaron-battery",
        name: "Amaron Pro Heavy Duty 70Ah Battery",
        category: "Batteries",
        categorySlug: "batteries",
        price: 36800.00,
        originalPrice: 41000.00,
        discountPercent: 10,
        rating: 5.0,
        reviewsCount: 16,
        inStock: true,
        stockCount: 8,
        sku: "AG-BAT-7002",
        oemNumber: "80D26L / 85D26L / 90D26L",
        brand: "Amaron Pro Hi-Life",
        warranty: "36 Months Comprehensive Warranty",
        origin: "India (Johnson Controls & Amara Raja)",
        mainImage: "images/battery.jpg",
        gallery: ["images/battery.jpg"],
        shortDescription: "Ultra long-lasting premium automotive battery with patented Silven-X alloy plates for supreme heat tolerance, high cranking amps, and zero maintenance life.",
        fullDescription: `The Amaron Pro 70Ah Hi-Life Battery is engineered with Johnson Controls' patented Silven-X alloy technology. Provides highest heat resistance and extreme vibration durability specially tailored for Sri Lankan tropical road and weather conditions.
        
High reserve capacity and 580 CCA output ensure reliable starting even with high electrical loads (powerful audio, high-wattage headlights, dashcam, and navigation).`,
        features: [
            "Patented Silven-X Silver Alloy technology for extreme longevity",
            "Factory charged and 100% maintenance-free sealed design",
            "High cranking power (580 CCA) for instant diesel & petrol starts",
            "BIC vents for superior safety and reduced acid spewing",
            "36 Months comprehensive nationwide warranty card included"
        ],
        specs: {
            "Battery Capacity": "70 Ah (Ampere-hours)",
            "Voltage": "12 Volts",
            "Cold Cranking Amps (CCA)": "580 A @ -18°C",
            "Dimensions (L x W x H)": "260 mm x 173 mm x 225 mm",
            "Weight": "17.9 kg",
            "Warranty": "36 Months Replacement Warranty"
        },
        compatibility: [
            { make: "Toyota", model: "Hilux / Prado / Fortuner / Land Cruiser / HiAce", years: "2005 - 2023", engine: "2.4L / 2.7L / 2.8L / 3.0L D-4D & Petrol" },
            { make: "Mitsubishi", model: "Montero / Pajero Sport / L200 Triton", years: "2006 - 2022", engine: "2.5L / 3.2L DI-D & 3.0L V6" },
            { make: "Nissan", model: "Navara / Patrol / X-Trail T31 Diesel", years: "2007 - 2021", engine: "2.0L / 2.5L dCi" }
        ],
        reviews: [
            {
                author: "Sanjeewa Kumara",
                avatar: "SK",
                location: "Kurunegala",
                rating: 5,
                date: "2 weeks ago",
                title: "Best battery for Hilux & SUVs",
                comment: "Amaron lasts 4+ years easily in our climate. Powerful crank on my Hilux. Fast door-to-door delivery with stamped 3-year warranty card."
            }
        ]
    },
    {
        id: "timing-belt-kit",
        name: "Engine Timing Belt & Water Pump Complete Kit",
        category: "Engine Parts",
        categorySlug: "engine-parts",
        price: 24500.00,
        originalPrice: 29800.00,
        discountPercent: 18,
        rating: 4.9,
        reviewsCount: 14,
        inStock: true,
        stockCount: 9,
        sku: "AG-ENG-5021",
        oemNumber: "13568-19106 / 16100-19235",
        brand: "Gates / Aisin Japan Genuine",
        warranty: "2 Years / 100,000 km Warranty",
        origin: "Japan / USA",
        mainImage: "images/engine.jpg",
        gallery: ["images/engine.jpg"],
        shortDescription: "Complete OEM engine overhaul timing kit including high-strength aramid timing belt, tensioner pulley, idler bearings, and heavy-duty water pump with gasket.",
        fullDescription: `Ensure total engine reliability and avoid catastrophic valve-to-piston contact with the AutoGenuine Complete Timing Belt & Water Pump Overhaul Kit.
        
Constructed with heat-resistant HNBR rubber and aramid tensile cords, the timing belt resists stretching, tooth shear, and oil contamination. Includes an OEM Japanese Aisin water pump with precision cast impeller.`,
        features: [
            "High-grade HNBR rubber timing belt with aramid tensile cords",
            "Japanese NTN / NSK hydraulic tensioner and idler bearings",
            "Aisin OEM aluminum die-cast water pump with pre-fitted gasket",
            "Front crankshaft and camshaft viton oil seals included",
            "Rated for 100,000 km guaranteed service interval"
        ],
        specs: {
            "Kit Components": "Timing Belt + Tensioner Pulley + Idler + Water Pump + Seals",
            "Belt Tooth Count": "163 Teeth",
            "Belt Width": "27 mm",
            "Material": "HNBR (Hydrogenated Nitrile Butadiene Rubber) + Aramid",
            "Water Pump Housing": "Die-cast Aluminum with Mechanical Ceramic Seal",
            "Service Interval": "Replace every 100,000 km"
        },
        compatibility: [
            { make: "Toyota", model: "Prado 120 / 150 / Hilux / HiAce (1KD-FTV, 2KD-FTV)", years: "2002 - 2021", engine: "2.5L / 3.0L D-4D Turbo Diesel" },
            { make: "Toyota", model: "Land Cruiser 100 / 200 (1HD-FTE, 1HZ)", years: "1998 - 2018", engine: "4.2L Turbo Diesel" },
            { make: "Mitsubishi", model: "Pajero / L200 (4D56, 4M41)", years: "2000 - 2018", engine: "2.5L / 3.2L Diesel" }
        ],
        reviews: [
            {
                author: "Ruwan Wijesinghe",
                avatar: "RW",
                location: "Gampaha",
                rating: 5,
                date: "1 week ago",
                title: "Everything needed for 100k km service",
                comment: "My mechanic was impressed with the Japanese Aisin water pump and genuine Gates belt. Perfect fit on 1KD engine Prado."
            }
        ]
    },
    {
        id: "led-headlights",
        name: "Super White High-Power LED Headlight Kit",
        category: "Lights",
        categorySlug: "lights",
        price: 8900.00,
        originalPrice: 11500.00,
        discountPercent: 23,
        rating: 4.8,
        reviewsCount: 19,
        inStock: true,
        stockCount: 25,
        sku: "AG-LGT-9004",
        oemNumber: "H4 / H11 / HB3 / HB4 LED Conversion",
        brand: "Philips / Osram Pro LED",
        warranty: "2 Years Replacement Warranty",
        origin: "Germany / Taiwan",
        mainImage: "images/lights.jpg",
        gallery: ["images/lights.jpg"],
        shortDescription: "Ultra-bright 6000K pure white automotive LED headlight conversion kit producing 12,000 lumens with razor-sharp beam cutoff and 12,000 RPM turbo cooling fan.",
        fullDescription: `Upgrade your nighttime driving vision with the AutoGenuine Super White High-Power LED Headlight Conversion Kit. Generating over 300% more road illumination than standard halogen bulbs, this kit provides a crisp 6000K diamond white beam.
        
Precision beam engineering ensures zero glare to oncoming traffic, while aircraft-grade 6063 aluminum housing and a silent 12,000 RPM active turbo cooling fan ensure over 50,000 hours of continuous operation.`,
        features: [
            "Custom automotive-grade CSP LED chips (12,000 Lumens Pair)",
            "6000K Pure Diamond White color temperature for maximum clarity",
            "1:1 Mini halogen bulb sizing - 100% plug & play installation",
            "Built-in CANbus intelligent decoder (no dashboard bulb error)",
            "IP68 Waterproof rating and 12,000 RPM high-speed silent fan"
        ],
        specs: {
            "Bulb Types Available": "H4 (Hi/Low), H11, HB3 (9005), HB4 (9006)",
            "Luminous Flux": "12,000 Lumens (6,000 LM per bulb)",
            "Color Temperature": "6000K Diamond White",
            "Operating Voltage": "DC 9V - 32V (Fits 12V & 24V Vehicles)",
            "Wattage": "55W per bulb (110W Set)",
            "Cooling": "Aviation 6063 Aluminum + Turbo Fan",
            "Lifespan": "> 50,000 Hours"
        },
        compatibility: [
            { make: "Toyota", model: "Corolla / Axio / Premio / Allion / Vitz / Aqua / Hilux", years: "2000 - 2024", engine: "All Models with H4 / H11 / HB3 / HB4 Sockets" },
            { make: "Nissan", model: "Sunny / Tiida / X-Trail / Navara / Leaf / March", years: "2002 - 2023", engine: "All Models" },
            { make: "Honda", model: "Fit / Grace / Vezel / Civic / CR-V / Insight", years: "2005 - 2023", engine: "All Models" },
            { make: "Suzuki", model: "Wagon R / Swift / Alto / Ciaz / Vitara", years: "2005 - 2024", engine: "All Models" }
        ],
        reviews: [
            {
                author: "Mohamed Rizan",
                avatar: "MR",
                location: "Dehiwala",
                rating: 5,
                date: "4 days ago",
                title: "Night driving is 10x better now",
                comment: "Replaced dull yellow halogen bulbs on my Axio. The light output is bright, clean white with a sharp cutoff line that doesn't blind oncoming cars. Plug and play in 5 mins."
            }
        ]
    }
];

// ==========================================
// CENTRAL CATALOG PERSISTENCE & MYSQL BACKEND INTEGRATION
// ==========================================
const PRODUCTS_STORAGE_KEY = "autogenuine_custom_products";
const API_BASE_URL = (function() {
    try {
        if (typeof window !== 'undefined' && window.location) {
            const loc = window.location;
            if (loc.protocol.startsWith('http')) {
                const path = loc.pathname;
                if (path.includes('/ProjectY/')) {
                    return loc.origin + '/ProjectY/api/';
                }
                return './api/';
            } else if (loc.protocol === 'file:') {
                return 'http://localhost/ProjectY/api/';
            }
        }
    } catch (e) {}
    return 'http://localhost/ProjectY/api/';
})();

let isMySQLActive = false;

function getStoredProducts() {
    try {
        const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error reading stored products:", e);
    }
    try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    } catch (e) {}
    return [...DEFAULT_PRODUCTS];
}

function saveStoredProducts(productsList) {
    try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsList));
        PRODUCTS = productsList;
        return true;
    } catch (e) {
        console.error("Error saving products:", e);
        return false;
    }
}

// In-memory reference for backward compatibility
let PRODUCTS = getStoredProducts();

function getAllProducts() {
    return getStoredProducts();
}

function getProductById(id) {
    if (!id) return null;
    const all = getAllProducts();
    return all.find(p => p.id.toLowerCase() === id.toLowerCase().trim()) || null;
}

function getProductsByCategory(categorySlug) {
    const all = getAllProducts();
    if (!categorySlug || categorySlug === "all") return all;
    return all.filter(p => 
        (p.categorySlug && p.categorySlug.toLowerCase() === categorySlug.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(categorySlug.toLowerCase()))
    );
}

function getRelatedProducts(currentId, limit = 3) {
    const all = getAllProducts();
    const current = getProductById(currentId);
    if (!current) return all.slice(0, limit);
    return all.filter(p => p.id !== current.id).slice(0, limit);
}

// Admin Catalog Operations (Synchronized with MySQL & LocalStorage)
function addNewProduct(productData) {
    const products = getStoredProducts();
    const id = productData.id || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-4);
    const category = productData.category || "Engine Parts";
    const categorySlug = productData.categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const price = parseFloat(productData.price) || 0;
    const originalPrice = parseFloat(productData.originalPrice) || Math.round(price * 1.2);
    const discount = productData.discountPercent !== undefined 
        ? parseInt(productData.discountPercent) 
        : (originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

    const newProduct = {
        id: id,
        name: productData.name || "New Spare Part",
        category: category,
        categorySlug: categorySlug,
        price: price,
        originalPrice: originalPrice,
        discountPercent: discount,
        rating: parseFloat(productData.rating) || 5.0,
        reviewsCount: parseInt(productData.reviewsCount) || 1,
        inStock: productData.inStock !== false && (parseInt(productData.stockCount) > 0 || productData.stockCount === undefined),
        stockCount: parseInt(productData.stockCount) || 15,
        sku: productData.sku || `AG-PRT-${Math.floor(1000 + Math.random() * 9000)}`,
        oemNumber: productData.oemNumber || "OEM-GENUINE",
        brand: productData.brand || "AutoGenuine Certified",
        warranty: productData.warranty || "1 Year Manufacturer Warranty",
        origin: productData.origin || "Japan OEM",
        mainImage: productData.mainImage || "images/engine.jpg",
        gallery: productData.gallery && productData.gallery.length > 0 ? productData.gallery : [productData.mainImage || "images/engine.jpg"],
        shortDescription: productData.shortDescription || "Genuine high-grade automotive replacement component.",
        fullDescription: productData.fullDescription || "Engineered to strict OEM quality specifications. Provides seamless fitment and prolonged service longevity.",
        features: Array.isArray(productData.features) && productData.features.length > 0 ? productData.features : [
            "100% Genuine Certified Component",
            "Direct OEM bolt-on fitment",
            "Factory tested for high performance"
        ],
        specs: productData.specs || {
            "Material": "OEM Spec Alloy / Composite",
            "Part Position": "Standard Fitment",
            "Warranty": "1 Year Stamped Warranty",
            "Condition": "Brand New Genuine"
        },
        compatibility: Array.isArray(productData.compatibility) && productData.compatibility.length > 0 ? productData.compatibility : [
            { make: "Toyota / Multi-brand", model: "Universal Compatible", years: "2010 - 2026", engine: "Standard" }
        ],
        reviews: [
            {
                author: "Quality Inspector",
                avatar: "QI",
                location: "Colombo",
                rating: 5,
                date: "Verified Stock",
                title: "Certified Genuine Stock",
                comment: "Inspected and certified for high reliability and safety standards."
            }
        ]
    };

    products.unshift(newProduct);
    saveStoredProducts(products);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'products.php?action=add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        }).catch(err => console.warn('MySQL Product Add sync notice:', err));
    }

    return { success: true, product: newProduct, message: `Product "${newProduct.name}" added successfully!` };
}

function updateProduct(productId, updatedFields) {
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === productId);
    if (index === -1) {
        return { success: false, message: "Product not found." };
    }
    
    // Merge
    const existing = products[index];
    const category = updatedFields.category || existing.category;
    const categorySlug = updatedFields.categorySlug || (updatedFields.category ? updatedFields.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") : existing.categorySlug);
    const price = updatedFields.price !== undefined ? parseFloat(updatedFields.price) : existing.price;
    const originalPrice = updatedFields.originalPrice !== undefined ? parseFloat(updatedFields.originalPrice) : existing.originalPrice;
    const stockCount = updatedFields.stockCount !== undefined ? parseInt(updatedFields.stockCount) : existing.stockCount;

    products[index] = {
        ...existing,
        ...updatedFields,
        category: category,
        categorySlug: categorySlug,
        price: price,
        originalPrice: originalPrice,
        stockCount: stockCount,
        inStock: stockCount > 0
    };

    saveStoredProducts(products);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'products.php?action=update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, ...updatedFields })
        }).catch(err => console.warn('MySQL Product Update sync notice:', err));
    }

    return { success: true, product: products[index], message: `Product "${products[index].name}" updated successfully!` };
}

function deleteProduct(productId) {
    let products = getStoredProducts();
    const initialLen = products.length;
    products = products.filter(p => p.id !== productId);
    if (products.length === initialLen) {
        return { success: false, message: "Product not found." };
    }
    saveStoredProducts(products);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'products.php?action=delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId })
        }).catch(err => console.warn('MySQL Product Delete sync notice:', err));
    }

    return { success: true, message: "Product removed from catalog successfully!" };
}

function resetCatalogToDefault() {
    saveStoredProducts(DEFAULT_PRODUCTS);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'products.php?action=reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).catch(err => console.warn('MySQL Product Reset sync notice:', err));
    }

    return { success: true, count: DEFAULT_PRODUCTS.length, message: "Catalog reset to default 9 items successfully!" };
}

function formatPrice(num) {
    if (isNaN(num)) return "0.00";
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ==========================================
// USER-SCOPED STORAGE KEY HELPERS (Cart, Wishlist & Coupon Isolation)
// ==========================================
function getUserStorageSuffix() {
    try {
        const user = getCurrentUser();
        if (user && user.email) {
            return "u_" + user.email.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
        }
    } catch (e) {}
    return "guest";
}

function getCartStorageKey() {
    return "autogenuine_cart_items_" + getUserStorageSuffix();
}

function getWishlistStorageKey() {
    return "autogenuine_wishlist_items_" + getUserStorageSuffix();
}

function getCouponStorageKey() {
    return "autogenuine_active_coupon_" + getUserStorageSuffix();
}

function transferGuestCartToUser(userEmail) {
    if (!userEmail) return;
    try {
        const guestKey = "autogenuine_cart_items_guest";
        const guestWishlistKey = "autogenuine_wishlist_items_guest";
        const guestCouponKey = "autogenuine_active_coupon_guest";

        const userSuffix = "u_" + userEmail.toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
        const userCartKey = "autogenuine_cart_items_" + userSuffix;
        const userWishlistKey = "autogenuine_wishlist_items_" + userSuffix;
        const userCouponKey = "autogenuine_active_coupon_" + userSuffix;

        // 1. Transfer Cart items
        const guestCartSaved = localStorage.getItem(guestKey);
        if (guestCartSaved) {
            const guestItems = JSON.parse(guestCartSaved);
            if (Array.isArray(guestItems) && guestItems.length > 0) {
                const userSaved = localStorage.getItem(userCartKey);
                let userItems = userSaved ? JSON.parse(userSaved) : [];

                guestItems.forEach(gItem => {
                    const existingIdx = userItems.findIndex(u => u.id === gItem.id);
                    if (existingIdx > -1) {
                        userItems[existingIdx].quantity = (userItems[existingIdx].quantity || 1) + (gItem.quantity || 1);
                    } else {
                        userItems.push(gItem);
                    }
                });

                localStorage.setItem(userCartKey, JSON.stringify(userItems));
                localStorage.removeItem(guestKey);
            }
        }

        // 2. Transfer Wishlist items
        const guestWishSaved = localStorage.getItem(guestWishlistKey);
        if (guestWishSaved) {
            const guestWish = JSON.parse(guestWishSaved);
            if (Array.isArray(guestWish) && guestWish.length > 0) {
                const userWishSaved = localStorage.getItem(userWishlistKey);
                let userWish = userWishSaved ? JSON.parse(userWishSaved) : [];
                guestWish.forEach(id => {
                    if (!userWish.includes(id)) {
                        userWish.push(id);
                    }
                });
                localStorage.setItem(userWishlistKey, JSON.stringify(userWish));
                localStorage.removeItem(guestWishlistKey);
            }
        }

        // 3. Transfer active coupon
        const guestCoupon = localStorage.getItem(guestCouponKey);
        if (guestCoupon && !localStorage.getItem(userCouponKey)) {
            localStorage.setItem(userCouponKey, guestCoupon);
            localStorage.removeItem(guestCouponKey);
        }

        // 4. Clean up legacy shared keys
        localStorage.removeItem("autogenuine_cart_items");
        localStorage.removeItem("autogenuine_wishlist_items");
        localStorage.removeItem("autogenuine_active_coupon");
    } catch (e) {
        console.warn("Guest data transfer notice:", e);
    }
}

function getCartItems() {
    try {
        const key = getCartStorageKey();
        const saved = localStorage.getItem(key);
        if (saved) return JSON.parse(saved);

        // One-time migration for legacy single-cart storage
        const legacy = localStorage.getItem("autogenuine_cart_items");
        if (legacy) {
            const parsed = JSON.parse(legacy);
            if (Array.isArray(parsed) && parsed.length > 0) {
                localStorage.setItem(key, JSON.stringify(parsed));
                localStorage.removeItem("autogenuine_cart_items");
                return parsed;
            }
        }
    } catch (e) {
        return [];
    }
    return [];
}

function getCartCount() {
    const items = getCartItems();
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
}

function getCartSubtotal() {
    const items = getCartItems();
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return { success: false, message: "Product not found" };

    const items = getCartItems();
    const existingIndex = items.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        items[existingIndex].quantity = (items[existingIndex].quantity || 1) + quantity;
    } else {
        items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.mainImage,
            category: product.category,
            quantity: quantity
        });
    }

    try {
        localStorage.setItem(getCartStorageKey(), JSON.stringify(items));
        updateAllCartBadges();
        return { success: true, count: getCartCount(), product: product };
    } catch (e) {
        return { success: false, message: "Storage error" };
    }
}

function updateCartItemQuantity(productId, newQty) {
    let items = getCartItems();
    const index = items.findIndex(item => item.id === productId);
    if (index > -1) {
        if (newQty <= 0) {
            items.splice(index, 1);
        } else {
            items[index].quantity = newQty;
        }
        localStorage.setItem(getCartStorageKey(), JSON.stringify(items));
        updateAllCartBadges();
        return true;
    }
    return false;
}

function removeCartItem(productId) {
    let items = getCartItems();
    items = items.filter(item => item.id !== productId);
    localStorage.setItem(getCartStorageKey(), JSON.stringify(items));
    updateAllCartBadges();
    return true;
}

function clearCart() {
    localStorage.removeItem(getCartStorageKey());
    localStorage.removeItem(getCouponStorageKey());
    localStorage.removeItem("autogenuine_cart_items");
    updateAllCartBadges();
}

// ==========================================
// PROMO COUPONS MANAGEMENT
// ==========================================
const COUPONS_LIST_KEY = "autogenuine_available_coupons";
const DEFAULT_COUPONS = [
    { code: "WELCOME10", discountPercent: 10, minOrder: 0, description: "Welcome Discount (10% Off)", active: true, expiryDate: "2026-12-31" },
    { code: "AUTO20", discountPercent: 20, minOrder: 5000, description: "Special Seasonal Discount (20% Off)", active: true, expiryDate: "2026-12-31" },
    { code: "GENUINE15", discountPercent: 15, minOrder: 3000, description: "Genuine Club Discount (15% Off)", active: true, expiryDate: "2026-12-31" }
];

function getAvailableCoupons() {
    try {
        const saved = localStorage.getItem(COUPONS_LIST_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    try {
        localStorage.setItem(COUPONS_LIST_KEY, JSON.stringify(DEFAULT_COUPONS));
    } catch (e) {}
    return [...DEFAULT_COUPONS];
}

function saveAvailableCoupons(coupons) {
    try {
        localStorage.setItem(COUPONS_LIST_KEY, JSON.stringify(coupons));
    } catch (e) {}
}

function applyCouponCode(code) {
    if (!code) return { success: false, message: "Please enter a coupon code" };
    const cleaned = code.trim().toUpperCase();
    const coupons = getAvailableCoupons();
    const found = coupons.find(c => c.code.toUpperCase() === cleaned && c.active !== false);

    if (found) {
        const couponObj = { 
            code: found.code, 
            discountPercent: found.discountPercent, 
            minOrder: found.minOrder || 0,
            description: found.description || `${found.discountPercent}% Discount`
        };
        localStorage.setItem(getCouponStorageKey(), JSON.stringify(couponObj));
        return { success: true, discountPercent: found.discountPercent, coupon: couponObj, message: `${found.discountPercent}% Discount Coupon (${found.code}) Applied!` };
    } else {
        return { success: false, message: `Invalid or inactive coupon code "${cleaned}". Try WELCOME10 or AUTO20` };
    }
}

function getActiveCoupon() {
    try {
        const saved = localStorage.getItem(getCouponStorageKey());
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        return null;
    }
}

function removeCouponCode() {
    localStorage.removeItem(getCouponStorageKey());
    localStorage.removeItem("autogenuine_active_coupon");
}

function addNewCoupon(couponData) {
    const coupons = getAvailableCoupons();
    const code = (couponData.code || "").trim().toUpperCase();
    if (!code) return { success: false, message: "Coupon code is required." };
    if (coupons.some(c => c.code.toUpperCase() === code)) {
        return { success: false, message: `Coupon code "${code}" already exists!` };
    }
    const newCoupon = {
        code: code,
        discountPercent: parseInt(couponData.discountPercent) || 10,
        minOrder: parseFloat(couponData.minOrder) || 0,
        description: couponData.description || `${couponData.discountPercent}% Special Discount`,
        active: couponData.active !== false,
        expiryDate: couponData.expiryDate || "2026-12-31",
        createdAt: new Date().toLocaleDateString()
    };
    coupons.push(newCoupon);
    saveAvailableCoupons(coupons);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'coupons.php?action=create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoupon)
        }).catch(err => console.warn('MySQL Coupon Add sync notice:', err));
    }

    return { success: true, coupon: newCoupon, message: `Coupon "${code}" created successfully!` };
}

function deleteCoupon(code) {
    let coupons = getAvailableCoupons();
    coupons = coupons.filter(c => c.code.toUpperCase() !== code.trim().toUpperCase());
    saveAvailableCoupons(coupons);

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'coupons.php?action=delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        }).catch(err => console.warn('MySQL Coupon Delete sync notice:', err));
    }

    return { success: true, message: `Coupon "${code}" deleted.` };
}

function toggleCouponStatus(code) {
    const coupons = getAvailableCoupons();
    const c = coupons.find(item => item.code.toUpperCase() === code.trim().toUpperCase());
    if (c) {
        c.active = !c.active;
        saveAvailableCoupons(coupons);

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            fetch(API_BASE_URL + 'coupons.php?action=toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: code, active: c.active })
            }).catch(err => console.warn('MySQL Coupon Toggle sync notice:', err));
        }

        return { success: true, active: c.active, message: `Coupon "${code}" is now ${c.active ? 'Active' : 'Disabled'}.` };
    }
    return { success: false, message: "Coupon not found." };
}

function updateAllCartBadges() {
    const count = getCartCount();
    document.querySelectorAll(".header-actions a[href*='cart'] b, .cart-badge-count, #cartCount").forEach(badge => {
        badge.textContent = count;
    });
}

function getWishlistItems() {
    try {
        const key = getWishlistStorageKey();
        const saved = localStorage.getItem(key);
        if (saved) return JSON.parse(saved);

        const legacy = localStorage.getItem("autogenuine_wishlist_items");
        if (legacy) {
            const parsed = JSON.parse(legacy);
            if (Array.isArray(parsed) && parsed.length > 0) {
                localStorage.setItem(key, JSON.stringify(parsed));
                localStorage.removeItem("autogenuine_wishlist_items");
                return parsed;
            }
        }
    } catch (e) {
        return [];
    }
    return [];
}

function getWishlistProducts() {
    const ids = getWishlistItems();
    return ids.map(id => getProductById(id)).filter(p => p !== null);
}

function toggleWishlist(productId) {
    let items = getWishlistItems();
    const index = items.indexOf(productId);
    let isAdded = false;
    if (index > -1) {
        items.splice(index, 1);
        isAdded = false;
    } else {
        items.push(productId);
        isAdded = true;
    }
    localStorage.setItem(getWishlistStorageKey(), JSON.stringify(items));
    updateWishlistBadges();
    return isAdded;
}

function isProductInWishlist(productId) {
    const items = getWishlistItems();
    return items.includes(productId);
}

function moveWishlistToCart(productId) {
    addToCart(productId, 1);
    toggleWishlist(productId);
}

function clearWishlist() {
    localStorage.removeItem(getWishlistStorageKey());
    localStorage.removeItem("autogenuine_wishlist_items");
    updateWishlistBadges();
}

function updateWishlistBadges() {
    const count = getWishlistItems().length;
    document.querySelectorAll(".wishlist-badge-count, #wishlistCount").forEach(badge => {
        badge.textContent = count;
    });
}

// ==========================================
// USER AUTHENTICATION & ADMIN 2-STEP SYSTEM
// ==========================================
const USERS_STORAGE_KEY = "autogenuine_registered_users";
const CURRENT_USER_KEY = "autogenuine_current_user";
const ORDERS_STORAGE_KEY = "autogenuine_orders_history";
const QUOTATIONS_STORAGE_KEY = "autogenuine_quotations";
const ADMIN_AUTH_KEY = "autogenuine_admin_verified";
const ADMIN_MASTER_PIN = "8899";

const DEFAULT_REGISTERED_USERS = [
    { 
        name: "Admin Supervisor", 
        email: "admin@autogenuine.lk", 
        phone: "0771234567", 
        password: "admin123", 
        role: "admin", 
        vehicle: "Workshop HQ / Fleet Control", 
        registeredAt: "01/01/2026" 
    },
    { 
        name: "Kasun Dharmasena", 
        email: "kasun@gmail.com", 
        phone: "0771234567", 
        password: "123", 
        role: "customer", 
        vehicle: "Toyota Premio NZT260 (2016)", 
        registeredAt: "10/09/2026" 
    }
];

function getRegisteredUsers() {
    try {
        const saved = localStorage.getItem(USERS_STORAGE_KEY);
        if (saved) {
            let users = JSON.parse(saved);
            if (Array.isArray(users) && users.length > 0) {
                // Ensure default admin account exists with password
                const adminIdx = users.findIndex(u => u.email && u.email.toLowerCase() === "admin@autogenuine.lk");
                if (adminIdx === -1) {
                    users.unshift({ ...DEFAULT_REGISTERED_USERS[0] });
                } else if (!users[adminIdx].password) {
                    users[adminIdx].password = "admin123";
                }
                
                // Ensure default kasun account exists with password
                const kasunIdx = users.findIndex(u => u.email && u.email.toLowerCase() === "kasun@gmail.com");
                if (kasunIdx === -1) {
                    users.push({ ...DEFAULT_REGISTERED_USERS[1] });
                } else if (!users[kasunIdx].password) {
                    users[kasunIdx].password = "123";
                }
                
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                return users;
            }
        }
    } catch (e) {}
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_REGISTERED_USERS));
    return [...DEFAULT_REGISTERED_USERS];
}

function getCurrentUser() {
    try {
        const saved = localStorage.getItem(CURRENT_USER_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        return null;
    }
}

function isAdminAuthenticated() {
    const user = getCurrentUser();
    const verified = localStorage.getItem(ADMIN_AUTH_KEY) === "true";
    return !!(user && user.role === "admin" && verified);
}

async function verifyAdminPin(pin) {
    const cleanPin = String(pin).trim();
    if (cleanPin === ADMIN_MASTER_PIN) {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        updateHeaderAccountButton();

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            try {
                await fetch(API_BASE_URL + 'auth.php?action=verify_admin_pin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pin: cleanPin })
                });
            } catch (err) {
                console.warn('MySQL Admin PIN verify sync notice:', err);
            }
        }

        return { success: true, message: "Security PIN verified successfully! Full administrative access granted." };
    }
    return { success: false, message: "Invalid Security PIN! Please enter the correct 4-digit PIN (Demo: 8899)." };
}

function logoutAdmin() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    updateHeaderAccountButton();
}

async function registerUser(name, email, phone, password, vehicle) {
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();
    const cleanPass = (password || '').trim();
    const cleanVehicle = (vehicle || '').trim() || "Not specified";

    if (!cleanName || !cleanEmail || !cleanPass) {
        return { success: false, message: "Name, email, and password are required." };
    }

    const users = getRegisteredUsers();
    if (users.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
        return { success: false, message: "An account with this email already exists." };
    }

    const newUser = { 
        id: Date.now(),
        user_id: Date.now(),
        name: cleanName, 
        full_name: cleanName,
        email: cleanEmail, 
        phone: cleanPhone, 
        password: cleanPass, 
        role: "customer", 
        vehicle: cleanVehicle, 
        registered_vehicle: cleanVehicle,
        registeredAt: new Date().toLocaleDateString('en-GB')
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    localStorage.removeItem(ADMIN_AUTH_KEY);
    updateHeaderAccountButton();

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        try {
            const res = await fetch(API_BASE_URL + 'auth.php?action=register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: cleanName, 
                    email: cleanEmail, 
                    phone: cleanPhone, 
                    password: cleanPass, 
                    vehicle: cleanVehicle 
                })
            });
            const data = await res.json();
            if (data && data.success && data.data && data.data.user) {
                const dbUser = data.data.user;
                newUser.id = dbUser.id || dbUser.user_id || newUser.id;
                newUser.user_id = newUser.id;
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
                
                // Update in users list
                const uIdx = users.findIndex(u => u.email.toLowerCase() === cleanEmail);
                if (uIdx > -1) {
                    users[uIdx].id = newUser.id;
                    users[uIdx].user_id = newUser.id;
                    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                }
            } else if (data && !data.success) {
                console.warn('MySQL User Register warning:', data.message);
            }
        } catch (err) {
            console.warn('MySQL User Register sync notice:', err);
        }
    }

    // Transfer any guest cart items to newly registered user
    transferGuestCartToUser(cleanEmail);
    updateAllCartBadges();
    updateWishlistBadges();

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('autogenuine:authchanged', { detail: { user: newUser } }));
    }

    return { success: true, user: newUser, message: "Registration successful! Welcome to AutoGenuine." };
}

async function loginUser(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass) {
        return { success: false, message: "Please enter both email and password." };
    }

    // 1. Check PHP / MySQL backend API first if available
    if (API_BASE_URL) {
        try {
            const response = await fetch(API_BASE_URL + 'auth.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password: cleanPass })
            });
            const resData = await response.json();
            if (resData && resData.success && resData.data && resData.data.user) {
                const apiUser = resData.data.user;
                const userToStore = {
                    ...apiUser,
                    password: cleanPass
                };

                // Merge and persist into local registered users
                const users = getRegisteredUsers();
                const existingIdx = users.findIndex(u => u.email && u.email.toLowerCase() === cleanEmail);
                if (existingIdx > -1) {
                    users[existingIdx] = { ...users[existingIdx], ...userToStore };
                } else {
                    users.push(userToStore);
                }
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));

                // Transfer guest cart items into this user's isolated cart
                transferGuestCartToUser(cleanEmail);
                updateAllCartBadges();
                updateWishlistBadges();

                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('autogenuine:authchanged', { detail: { user: userToStore } }));
                }

                if (userToStore.role === "admin") {
                    const isPinVerified = localStorage.getItem(ADMIN_AUTH_KEY) === "true";
                    updateHeaderAccountButton();
                    return { 
                        success: true, 
                        user: userToStore, 
                        requiresAdminPin: !isPinVerified, 
                        message: isPinVerified ? `Welcome back, Administrator ${userToStore.name}!` : "Admin credentials recognized. Step 2 Security PIN required."
                    };
                } else {
                    localStorage.removeItem(ADMIN_AUTH_KEY);
                    updateHeaderAccountButton();
                    return { 
                        success: true, 
                        user: userToStore, 
                        requiresAdminPin: false, 
                        message: resData.message || `Welcome back, ${userToStore.name}!` 
                    };
                }
            } else if (resData && !resData.success && resData.message && !resData.message.includes('Database connection')) {
                // If the backend specifically rejected password, check if local offline user matches
                console.warn('Backend login rejected:', resData.message);
            }
        } catch (apiErr) {
            console.warn('API Auth fetch error (using local storage fallback):', apiErr);
        }
    }

    // 2. Local Storage Fallback Authentication
    const users = getRegisteredUsers();
    const user = users.find(u => {
        if (!u.email || u.email.toLowerCase() !== cleanEmail) return false;
        if (u.password && u.password === cleanPass) return true;
        if (cleanEmail === 'admin@autogenuine.lk' && cleanPass === 'admin123') return true;
        if (cleanEmail === 'kasun@gmail.com' && cleanPass === '123') return true;
        return false;
    });

    if (user) {
        user.password = cleanPass;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

        // Transfer guest cart items into this user's isolated cart
        transferGuestCartToUser(cleanEmail);
        updateAllCartBadges();
        updateWishlistBadges();

        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('autogenuine:authchanged', { detail: { user: user } }));
        }

        if (user.role === "admin") {
            const isPinVerified = localStorage.getItem(ADMIN_AUTH_KEY) === "true";
            updateHeaderAccountButton();
            return { 
                success: true, 
                user: user, 
                requiresAdminPin: !isPinVerified, 
                message: isPinVerified ? `Welcome back, Administrator ${user.name}!` : "Admin credentials recognized. Step 2 Security PIN required."
            };
        } else {
            localStorage.removeItem(ADMIN_AUTH_KEY);
            updateHeaderAccountButton();
            return { success: true, user: user, requiresAdminPin: false, message: `Welcome back, ${user.name}!` };
        }
    }

    return { success: false, message: "Invalid email or password. Please check your credentials or register a new account." };
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    updateHeaderAccountButton();
    updateAllCartBadges();
    updateWishlistBadges();

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('autogenuine:authchanged', { detail: { user: null } }));
    }
}

// ==========================================
// ORDERS & QUOTATIONS PERSISTENCE
// ==========================================
function getOrdersHistory() {
    try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    const demoOrders = [
        {
            orderId: "#AG-90412",
            date: "14/09/2026",
            customerName: "Kasun Dharmasena",
            customerEmail: "kasun@gmail.com",
            customerPhone: "0771234567",
            address: "No. 45/2, Galle Road, Colombo 03",
            city: "Colombo",
            paymentMethod: "Cash on Delivery (COD)",
            subtotal: 5750,
            discount: 575,
            shipping: 450,
            total: 5625,
            status: "Shipped",
            itemCount: 2,
            items: [
                { id: "brake-pad-set", name: "Front Ceramic Brake Pad Set", price: 4500, quantity: 1 },
                { id: "toyota-oil-filter", name: "Toyota Genuine Engine Oil Filter", price: 1250, quantity: 1 }
            ]
        },
        {
            orderId: "#AG-88210",
            date: "12/09/2026",
            customerName: "Saman Kumara",
            customerEmail: "saman.k@yahoo.com",
            customerPhone: "0719876543",
            address: "Peradeniya Road, Kandy",
            city: "Kandy",
            paymentMethod: "Bank Transfer",
            subtotal: 32500,
            discount: 0,
            shipping: 0,
            total: 32500,
            status: "Delivered",
            itemCount: 1,
            items: [
                { id: "exide-battery-60ah", name: "Exide Matrix 60Ah Maintenance-Free Battery", price: 32500, quantity: 1 }
            ]
        }
    ];
    try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(demoOrders));
    } catch (e) {}
    return demoOrders;
}

function saveOrder(orderData) {
    try {
        let orders = getOrdersHistory();
        if (!orderData.status) {
            orderData.status = "Processing Dispatch";
        }
        orders.unshift(orderData);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            fetch(API_BASE_URL + 'orders.php?action=create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            }).then(res => res.json()).then(resData => {
                if (resData.success) {
                    console.log('✅ Order saved to MySQL database:', orderData.orderId);
                }
            }).catch(err => console.warn('MySQL Order Create sync notice:', err));
        }

        return { success: true, order: orderData };
    } catch (e) {
        return { success: false, message: "Error saving order" };
    }
}

function updateOrderStatus(orderId, newStatus) {
    let orders = getOrdersHistory();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            fetch(API_BASE_URL + 'orders.php?action=update_status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: orderId, status: newStatus })
            }).catch(err => console.warn('MySQL Order Status Update sync notice:', err));
        }

        return { success: true, message: `Order ${orderId} status changed to "${newStatus}".` };
    }
    return { success: false, message: "Order not found." };
}

function deleteOrder(orderId) {
    let orders = getOrdersHistory();
    orders = orders.filter(o => o.orderId !== orderId);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'orders.php?action=delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: orderId })
        }).catch(err => console.warn('MySQL Order Delete sync notice:', err));
    }

    return { success: true, message: `Order ${orderId} removed.` };
}

function getQuotationsList() {
    try {
        const saved = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    const demoQuotes = [
        {
            quoteId: "#QUOT-4819",
            name: "Nimal Ranatunga",
            phone: "0778899112",
            vehicle: "Toyota Land Cruiser Prado",
            year: "2018",
            vin: "GDJ150-003418",
            details: "Need genuine front & rear shock absorbers (KYB/Toyota) and front lower control arms with bushes.",
            status: "Pending Review",
            date: "13/09/2026"
        },
        {
            quoteId: "#QUOT-3092",
            name: "Praveen Fernando",
            phone: "0765544332",
            vehicle: "Honda Grace Hybrid",
            year: "2016",
            vin: "GM4-1029381",
            details: "Dual clutch actuator assembly and original Honda ATF-DW1 fluid quotation.",
            status: "Quoted",
            date: "11/09/2026"
        }
    ];
    try {
        localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(demoQuotes));
    } catch (e) {}
    return demoQuotes;
}

function saveQuotation(data) {
    try {
        let quotes = getQuotationsList();
        if (!data.status) data.status = "Pending Review";
        quotes.unshift(data);
        localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotes));

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            fetch(API_BASE_URL + 'quotations.php?action=create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(resData => {
                if (resData.success) {
                    console.log('✅ Quotation saved to MySQL database:', data.quoteId);
                }
            }).catch(err => console.warn('MySQL Quotation Create sync notice:', err));
        }

        return { success: true, quote: data };
    } catch (e) {
        return { success: false };
    }
}

function updateQuotationStatus(quoteId, newStatus) {
    let quotes = getQuotationsList();
    const q = quotes.find(item => item.quoteId === quoteId);
    if (q) {
        q.status = newStatus;
        localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotes));

        // Sync to MySQL via PHP API
        if (API_BASE_URL) {
            fetch(API_BASE_URL + 'quotations.php?action=update_status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quoteId: quoteId, status: newStatus })
            }).catch(err => console.warn('MySQL Quotation Status Update sync notice:', err));
        }

        return { success: true, message: `Quotation ${quoteId} updated to "${newStatus}".` };
    }
    return { success: false, message: "Quotation not found." };
}

function deleteQuotation(quoteId) {
    let quotes = getQuotationsList();
    quotes = quotes.filter(q => q.quoteId !== quoteId);
    localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotes));

    // Sync to MySQL via PHP API
    if (API_BASE_URL) {
        fetch(API_BASE_URL + 'quotations.php?action=delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quoteId: quoteId })
        }).catch(err => console.warn('MySQL Quotation Delete sync notice:', err));
    }

    return { success: true, message: `Quotation ${quoteId} removed.` };
}

function updateHeaderAccountButton() {
    const user = getCurrentUser();
    const isAdmin = isAdminAuthenticated();
    
    document.querySelectorAll(".account-btn-label, #accountBtnText").forEach(el => {
        el.textContent = user ? (isAdmin ? "Admin 🛡️" : user.name.split(" ")[0]) : "Account";
    });

    // Update or insert Admin Panel header button
    const adminHeaderBtns = document.querySelectorAll(".admin-header-btn");
    if (isAdmin) {
        if (adminHeaderBtns.length === 0) {
            document.querySelectorAll(".header-actions").forEach(container => {
                const adminBtn = document.createElement("a");
                adminBtn.href = "admin.html";
                adminBtn.className = "admin-header-btn";
                adminBtn.innerHTML = "🛡️ Admin Panel";
                adminBtn.title = "Open Admin Management Dashboard";
                container.insertBefore(adminBtn, container.firstChild);
            });
        }
    } else {
        adminHeaderBtns.forEach(btn => btn.remove());
    }
}

// ==========================================
// BLOG ARTICLES DATABASE
// ==========================================
const BLOG_ARTICLES = [
    {
        id: "1",
        title: "How to Choose the Right Brake Parts",
        category: "Maintenance",
        date: "September 2026",
        readTime: "4 min read",
        image: "images/brake.jpg",
        excerpt: "Simple tips for selecting suitable brake pads and disc rotors for your vehicle to guarantee stopping power and passenger safety.",
        author: "Eng. Samantha Silva (Automotive Specialist)",
        content: `
            <p>Brakes are arguably the most critical safety system on any vehicle. When driving under tropical weather conditions and heavy traffic in Sri Lanka, having optimal stopping performance is non-negotiable.</p>
            
            <h4>1. Ceramic vs. Semi-Metallic Brake Pads</h4>
            <p><strong>Ceramic Brake Pads:</strong> Composed of dense ceramic composite fibers and copper filaments. They produce almost zero black brake dust, eliminate squeaking noises, and offer smooth, progressive braking feel.</p>
            <p><strong>Semi-Metallic Pads:</strong> Ideal for heavy commercial vehicles and aggressive high-speed track use, but can cause more disc wear and dust buildup.</p>

            <h4>2. When Should You Inspect Your Rotors?</h4>
            <ul>
                <li>Steering wheel vibration or brake pedal pulsation at speeds above 60 km/h.</li>
                <li>Deep circular grooves or uneven scoring on the rotor friction surface.</li>
                <li>Rotor thickness wearing below the manufacturer minimum thickness stamping.</li>
            </ul>

            <h4>3. Expert Installation Tip</h4>
            <p>Always replace brake pads in full axle sets (both Left and Right sides together) and ensure anti-rattle clips are freshly lubricated with high-temperature silicone brake grease.</p>
        `,
        relatedProductId: "brake-pad-set"
    },
    {
        id: "2",
        title: "Why Genuine Parts Matter For Engine Longevity",
        category: "Tips & Guide",
        date: "August 2026",
        readTime: "5 min read",
        image: "images/engine.jpg",
        excerpt: "Learn why counterfeit parts compromise engine reliability, fuel efficiency, and void your warranty protection.",
        author: "Ruwan Wickramasinghe (Senior Mechanical Tech)",
        content: `
            <p>Counterfeit and sub-standard automotive parts have flooded the local market. While they may appear identical on the outside, their internal engineering shortcuts can cause catastrophic engine failure.</p>
            
            <h4>1. Precise Tolerances & Metallurgy</h4>
            <p>Genuine OEM parts (such as timing belts, water pumps, and spark plugs) undergo stringent metallurgical stress testing. Substandard rubber in timing belts can snap prematurely, causing pistons to collide with valves resulting in engine overhaul costs exceeding Rs. 250,000.</p>

            <h4>2. Filtration Efficiency</h4>
            <p>Genuine Toyota and Denso oil filters feature synthetic resin-bonded micro-pores that capture particles down to 10 microns, preventing abrasive metal shavings from circulating through bearings and camshaft journals.</p>

            <h4>3. Official Warranty Protection</h4>
            <p>Every genuine part sold by AutoGenuine comes with official stamped warranty documentation and hologram verification, providing complete peace of mind.</p>
        `,
        relatedProductId: "timing-belt-kit"
    },
    {
        id: "3",
        title: "When Should You Replace Your Vehicle Filters?",
        category: "Service Guide",
        date: "July 2026",
        readTime: "3 min read",
        image: "images/filter.jpg",
        excerpt: "A practical guide to engine oil, air intake, and cabin AC filter replacement intervals under dusty road conditions.",
        author: "Kasun Jayasundara (Fleet Maintenance Lead)",
        content: `
            <p>Filters are the lungs and kidneys of your vehicle. Neglecting filter replacements causes increased fuel consumption, sluggish acceleration, and foul cabin air conditioning smells.</p>
            
            <h4>1. Engine Oil Filter (Every 5,000 - 8,000 km)</h4>
            <p>Always replace the oil filter at every engine oil change. Reusing an old filter contaminates fresh oil instantly and risks bypass valve sticking.</p>

            <h4>2. Engine Air Filter (Every 15,000 - 20,000 km)</h4>
            <p>A clogged engine air filter restricts airflow into the throttle body, causing the ECU to enrich fuel injection and dropping fuel economy by 10% - 15%.</p>

            <h4>3. Activated Carbon Cabin AC Filter (Every 10,000 - 15,000 km)</h4>
            <p>Crucial for tropical climates. Activated charcoal traps harmful PM2.5 exhaust soot, diesel smoke, and bacteria, preventing mold odors inside the vehicle cabin.</p>
        `,
        relatedProductId: "toyota-oil-filter"
    }
];

function getAllBlogArticles() {
    return BLOG_ARTICLES;
}

function getBlogArticleById(id) {
    return BLOG_ARTICLES.find(a => a.id === String(id)) || BLOG_ARTICLES[0];
}

// ==========================================
// INTERACTIVE LIVE CHATBOT ENGINE
// ==========================================
function getBotResponse(userMsg) {
    const msg = userMsg.toLowerCase().trim();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("ayubowan")) {
        return "👋 Hello! Welcome to AutoGenuine. How can I assist you with genuine car spare parts today? You can ask about part fitment, prices, delivery, or warranty!";
    }
    if (msg.includes("delivery") || msg.includes("shipping") || msg.includes("courier") || msg.includes("time") || msg.includes("how long")) {
        return "🚚 <strong>Delivery Timelines:</strong><br>• Colombo & Western Province: Within 24 hours<br>• Islandwide Outstation: 1 - 2 business days via Domex/PromptX.<br>• Free shipping on orders over Rs. 10,000!";
    }
    if (msg.includes("fit") || msg.includes("chassis") || msg.includes("vin") || msg.includes("compatible") || msg.includes("model")) {
        return "🚗 <strong>Fitment Verification:</strong><br>Please type your <strong>Car Make, Model, and Year</strong> (e.g. <em>Toyota Premio 2016</em> or <em>Axio NZE161</em>). Our technical system will check exact OEM compatibility!";
    }
    if (msg.includes("warranty") || msg.includes("guarantee")) {
        return "🛡️ <strong>Official Warranty:</strong><br>All our parts come with official stamped manufacturer warranty:<br>• Batteries: 30 - 36 Months replacement<br>• Brake Parts & Kits: 2 Years / 40,000 km<br>• Filters: 1 Year service warranty.";
    }
    if (msg.includes("payment") || msg.includes("pay") || msg.includes("cod") || msg.includes("card") || msg.includes("bank")) {
        return "💳 <strong>Payment Options:</strong><br>• Cash on Delivery (COD) across Sri Lanka<br>• Direct Bank Transfer (Commercial Bank / HNB)<br>• Credit / Debit Card & Koko installment plans.";
    }
    if (msg.includes("brake") || msg.includes("rotor") || msg.includes("pad")) {
        return "🛑 We have genuine <strong>Ceramic Brake Pads (Rs. 4,500)</strong> and <strong>Ventilated Brake Rotors (Rs. 14,800)</strong> in stock for Toyota, Nissan, and Honda vehicles. Would you like to view details?";
    }
    if (msg.includes("battery") || msg.includes("exide") || msg.includes("amaron")) {
        return "🔋 We stock <strong>Exide Matrix 60Ah (Rs. 32,500)</strong> and <strong>Amaron Pro 70Ah (Rs. 36,800)</strong> maintenance-free batteries with up to 36 months replacement warranty!";
    }
    if (msg.includes("filter") || msg.includes("oil") || msg.includes("air")) {
        return "🛢️ We have genuine <strong>Toyota Engine Oil Filters (Rs. 1,250)</strong>, <strong>High-Flow Air Filters (Rs. 2,150)</strong>, and <strong>Carbon Cabin Filters (Rs. 1,850)</strong> in stock.";
    }
    if (msg.includes("contact") || msg.includes("call") || msg.includes("phone") || msg.includes("whatsapp")) {
        return "📞 You can contact our parts specialist hotline at <strong>+94 78 628 7337</strong> or chat on WhatsApp directly at <a href='https://wa.me/94786287337' target='_blank' style='color:#25d366; font-weight:700;'>+94 78 628 7337 (Click to Chat)</a>.";
    }

    return "Thank you for your message! Our mechanical team has received your query regarding <em>\"" + userMsg + "\"</em> and will verify your vehicle specifications. You can also request a free part quotation via the Contact form!";
}

// Theme (Light / Dark Mode) Management
const THEME_STORAGE_KEY = "autogenuine_theme";

function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY) || "dark";
    } catch (e) {
        return "dark";
    }
}

function applyTheme(theme) {
    const isLight = theme === "light";
    if (isLight) {
        document.body.classList.add("light-theme");
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.body.classList.remove("light-theme");
        document.documentElement.setAttribute("data-theme", "dark");
    }
    updateThemeButtons(theme);
}

function toggleTheme() {
    const current = getSavedTheme();
    const next = current === "light" ? "dark" : "light";
    try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (e) {}
    applyTheme(next);
    return next;
}

function updateThemeButtons(theme) {
    const isLight = theme === "light";
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
        btn.innerHTML = isLight 
            ? `<span class="theme-icon">☀️</span> <span class="theme-text">Light</span>` 
            : `<span class="theme-icon">🌙</span> <span class="theme-text">Dark</span>`;
        btn.setAttribute("title", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
        btn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
        btn.classList.toggle("is-light", isLight);
    });
}

function initThemeToggle() {
    const currentTheme = getSavedTheme();
    applyTheme(currentTheme);

    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            toggleTheme();
        });
    });
}

// Shared Modal Handler Helpers
function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        el.classList.add("active");
        el.setAttribute("aria-hidden", "false");
    }
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        el.classList.remove("active");
        el.setAttribute("aria-hidden", "true");
    }
}

// ==========================================
// LIVE MYSQL DATABASE SYNCHRONIZATION ENGINE
// ==========================================
async function checkDatabaseConnection() {
    if (!API_BASE_URL) {
        isMySQLActive = false;
        updateDatabaseStatusUI(false, "Local Offline Mode (LocalStorage)");
        return false;
    }
    try {
        const response = await fetch(API_BASE_URL + 'status.php', { cache: 'no-store' });
        const data = await response.json();
        if (data && data.success && data.data && data.data.connected) {
            isMySQLActive = true;
            updateDatabaseStatusUI(true, `MySQL Connected (${data.data.database})`);
            return true;
        } else {
            isMySQLActive = false;
            updateDatabaseStatusUI(false, "MySQL Disconnected (Fallback active)");
            return false;
        }
    } catch (err) {
        isMySQLActive = false;
        updateDatabaseStatusUI(false, "API Server Offline (LocalStorage active)");
        return false;
    }
}

function updateDatabaseStatusUI(connected, statusText) {
    document.querySelectorAll('.db-status-pill, .mysql-status-indicator, #dbStatusIndicator').forEach(el => {
        el.className = connected ? 'db-status-pill online' : 'db-status-pill offline';
        el.innerHTML = connected 
            ? `<span class="status-dot online"></span> <span class="status-label">MySQL Live: ${statusText || 'Connected'}</span>` 
            : `<span class="status-dot offline"></span> <span class="status-label">${statusText || 'Local Mode'}</span>`;
        el.title = connected ? "Live MySQL Database connection active via PHP PDO" : "Running on LocalStorage / Offline Fallback";
    });
}

async function syncWithBackendDatabase() {
    if (!API_BASE_URL) return;
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) return;

    try {
        // 1. Fetch fresh products from MySQL
        const prodRes = await fetch(API_BASE_URL + 'products.php', { cache: 'no-store' });
        const prodData = await prodRes.json();
        if (prodData && prodData.success && Array.isArray(prodData.data) && prodData.data.length > 0) {
            saveStoredProducts(prodData.data);
        }

        // 2. Fetch fresh users from MySQL (Safe Merge preserving passwords)
        const usersRes = await fetch(API_BASE_URL + 'auth.php?action=get_users', { cache: 'no-store' });
        const usersData = await usersRes.json();
        if (usersData && usersData.success && Array.isArray(usersData.data) && usersData.data.length > 0) {
            const localUsers = getRegisteredUsers();
            const merged = [...localUsers];
            usersData.data.forEach(dbUser => {
                if (!dbUser || !dbUser.email) return;
                const dbEmail = dbUser.email.toLowerCase();
                const existingIdx = merged.findIndex(u => u.email && u.email.toLowerCase() === dbEmail);
                if (existingIdx > -1) {
                    merged[existingIdx] = {
                        ...merged[existingIdx],
                        ...dbUser,
                        password: merged[existingIdx].password || (dbEmail === 'admin@autogenuine.lk' ? 'admin123' : (dbEmail === 'kasun@gmail.com' ? '123' : ''))
                    };
                } else {
                    merged.push({
                        ...dbUser,
                        password: dbEmail === 'admin@autogenuine.lk' ? 'admin123' : (dbEmail === 'kasun@gmail.com' ? '123' : '')
                    });
                }
            });
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        }

        // 3. Fetch fresh orders from MySQL
        const ordersRes = await fetch(API_BASE_URL + 'orders.php', { cache: 'no-store' });
        const ordersData = await ordersRes.json();
        if (ordersData && ordersData.success && Array.isArray(ordersData.data)) {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersData.data));
        }

        // 4. Fetch fresh quotes from MySQL
        const quotesRes = await fetch(API_BASE_URL + 'quotations.php', { cache: 'no-store' });
        const quotesData = await quotesRes.json();
        if (quotesData && quotesData.success && Array.isArray(quotesData.data)) {
            localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotesData.data));
        }

        // 5. Fetch fresh coupons from MySQL
        const couponsRes = await fetch(API_BASE_URL + 'coupons.php', { cache: 'no-store' });
        const couponsData = await couponsRes.json();
        if (couponsData && couponsData.success && Array.isArray(couponsData.data)) {
            saveAvailableCoupons(couponsData.data);
        }

        // Dispatch sync event for any active page views (Admin tables, Catalog grids)
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('autogenuine:dbsynced', { detail: { timestamp: Date.now() } }));
        }
    } catch (e) {
        console.warn('Background MySQL synchronization notice:', e);
    }
}

// ==========================================
// LIVE ORDER TRACKING & DISPATCH STATUS ENGINE
// ==========================================
function getOrderTrackingDetails(orderRef) {
    const orders = getOrdersHistory();
    const cleanRef = String(orderRef || "").trim().toUpperCase();
    const cleanNoHash = cleanRef.replace(/^#/, "");

    const found = orders.find(o => 
        (o.orderId && (o.orderId.toUpperCase() === cleanRef || o.orderId.toUpperCase() === '#' + cleanNoHash)) ||
        (o.customerPhone && o.customerPhone.replace(/[^0-9]/g, "").includes(cleanNoHash))
    );

    if (!found) return null;

    const status = found.status || "Processing Dispatch";
    let step = 1;
    let statusMsg = "Your order has been received and is being prepared for dispatch.";
    const courier = found.courierName || "Domex Islandwide Express Courier";
    const trackingNo = found.trackingNumber || ("DX-" + Math.abs(hashCode(found.orderId || "AG")).toString().substring(0, 7) + "LK");
    const estDelivery = found.estimatedDelivery || "Within 24 - 48 Hours";

    const s = status.toLowerCase();
    if (s.includes("delivered") || s.includes("completed")) {
        step = 4;
        statusMsg = "Package successfully delivered to customer destination.";
    } else if (s.includes("out for delivery")) {
        step = 3.5;
        statusMsg = "Courier delivery rider is out for delivery to your address today.";
    } else if (s.includes("shipped") || s.includes("transit") || (s.includes("dispatch") && !s.includes("processing"))) {
        step = 3;
        statusMsg = "Dispatched via islandwide express courier! Handed over to Domex central sorting hub.";
    } else if (s.includes("inspect") || s.includes("quality")) {
        step = 2;
        statusMsg = "Genuine OEM fitment and quality inspection passed. Package sealed for dispatch.";
    } else if (s.includes("cancel")) {
        step = 0;
        statusMsg = "This order was cancelled. Please contact customer support.";
    }

    return {
        ...found,
        status: status,
        trackingStep: step,
        statusMessage: statusMsg,
        courierName: courier,
        trackingNumber: trackingNo,
        estimatedDelivery: estDelivery
    };
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function ensureOrderTrackingModalExists() {
    if (document.getElementById("orderTrackingModal")) return;

    const modalHtml = `
    <div class="modal-overlay" id="orderTrackingModal" aria-hidden="true">
        <div class="modal-card order-tracking-modal-card">
            <div class="modal-header">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:1.5rem;">🚚</span>
                    <div>
                        <h3 id="trackModalOrderRef">Live Order Tracking</h3>
                        <small style="color:var(--text-muted); font-size:0.8rem;">AutoGenuine Real-Time Dispatch Network</small>
                    </div>
                </div>
                <button class="modal-close" onclick="closeModal('orderTrackingModal')">✕</button>
            </div>
            
            <div id="trackModalBody" class="tracking-modal-body">
                <!-- Filled dynamically by renderTrackingContent -->
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function openOrderTrackingModal(orderRef) {
    ensureOrderTrackingModalExists();
    const modal = document.getElementById("orderTrackingModal");
    const body = document.getElementById("trackModalBody");
    const refTitle = document.getElementById("trackModalOrderRef");

    if (!modal || !body) return;

    const cleanInput = orderRef ? String(orderRef).trim() : "";

    // If no order reference is provided, show search & recent orders screen
    if (!cleanInput) {
        refTitle.textContent = "Live Order Tracking";
        const currentUser = getCurrentUser();
        const allOrders = getOrdersHistory();
        let userOrders = [];

        if (currentUser && currentUser.role !== "admin") {
            userOrders = allOrders.filter(o => 
                (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
                (o.customerPhone && currentUser.phone && o.customerPhone.replace(/[^0-9]/g, "") === currentUser.phone.replace(/[^0-9]/g, ""))
            );
        }

        let userOrdersHtml = "";
        if (userOrders.length > 0) {
            userOrdersHtml = `
                <div style="margin-top:20px; text-align:left;">
                    <h4 style="font-size:0.95rem; margin-bottom:10px; color:var(--text-main, #f0f4fc);">Your Recent Orders (${currentUser.name})</h4>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        ${userOrders.map(o => `
                            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-input, #1a2030); border:1px solid var(--border-color, #242c42); padding:10px 14px; border-radius:8px;">
                                <div>
                                    <strong style="color:var(--text-main, #fff); font-size:0.9rem;">${o.orderId}</strong>
                                    <span style="font-size:0.8rem; color:var(--text-muted); margin-left:8px;">${o.date} • Rs. ${formatPrice(o.total)}</span>
                                    <div style="font-size:0.75rem; color:var(--accent, #2a9d8f); margin-top:2px;">Status: <b>${o.status || 'Processing'}</b></div>
                                </div>
                                <button type="button" onclick="openOrderTrackingModal('${o.orderId}')" style="background:#e63946; color:#fff; border:none; padding:6px 12px; border-radius:6px; font-size:0.8rem; font-weight:600; cursor:pointer;">
                                    Track Live 🚚
                                </button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;
        }

        body.innerHTML = `
            <div style="padding:10px 0; text-align:center;">
                <div style="font-size:3rem; margin-bottom:10px;">🚚</div>
                <h3 style="margin-bottom:6px; font-size:1.2rem;">Track Your AutoGenuine Dispatch</h3>
                <p style="color:var(--text-muted); font-size:0.88rem; max-width:440px; margin:0 auto 20px auto;">
                    Enter your Order Reference Number (e.g. <code>#AG-84920</code>) or registered contact phone number to track live status.
                </p>

                <form onsubmit="event.preventDefault(); const val = document.getElementById('trackingSearchInput').value.trim(); if(val) openOrderTrackingModal(val);" style="display:flex; gap:8px; max-width:450px; margin:0 auto;">
                    <input type="text" id="trackingSearchInput" placeholder="Order Ref # (e.g. #AG-84920) or Phone" required style="flex:1; padding:12px 14px; border-radius:8px; border:1px solid var(--border-color, #242c42); background:var(--bg-input, #1a2030); color:var(--text-main, #fff); font-size:0.95rem;">
                    <button type="submit" style="background:#e63946; color:#fff; border:none; padding:12px 20px; border-radius:8px; font-weight:700; cursor:pointer;">
                        Track →
                    </button>
                </form>

                ${userOrdersHtml}
            </div>
        `;
        openModal("orderTrackingModal");
        return;
    }

    const order = getOrderTrackingDetails(cleanInput);

    if (!order) {
        refTitle.textContent = "Order Not Found";
        body.innerHTML = `
            <div class="tracking-error-box" style="text-align:center; padding:20px 10px;">
                <div style="font-size:2.5rem; margin-bottom:10px;">⚠️</div>
                <h4 style="margin-bottom:8px; font-size:1.1rem;">No Order Found</h4>
                <p style="color:var(--text-muted); font-size:0.88rem; margin-bottom:20px;">We couldn't locate any order matching <strong>"${escapeQuotes(cleanInput)}"</strong>. Please check your order reference number or contact number.</p>
                
                <form onsubmit="event.preventDefault(); const val = document.getElementById('trackingRetryInput').value.trim(); if(val) openOrderTrackingModal(val);" style="display:flex; gap:8px; max-width:420px; margin:0 auto;">
                    <input type="text" id="trackingRetryInput" placeholder="e.g. #AG-84920 or 077..." value="${escapeQuotes(cleanInput)}" required style="flex:1; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color, #242c42); background:var(--bg-input, #1a2030); color:var(--text-main, #fff);">
                    <button type="submit" style="background:#e63946; color:#fff; border:none; padding:10px 18px; border-radius:8px; font-weight:600; cursor:pointer;">Retry Track</button>
                </form>
            </div>
        `;
        openModal("orderTrackingModal");
        return;
    }

    refTitle.textContent = `Order ${order.orderId || '#AG-ORDER'}`;

    const step = order.trackingStep;
    const isCancelled = step === 0;

    let itemsListHtml = "";
    if (Array.isArray(order.items) && order.items.length > 0) {
        itemsListHtml = order.items.map(item => `
            <div class="track-item-row">
                <div class="track-item-name">
                    <strong>${typeof item === 'string' ? item : item.name}</strong>
                    ${typeof item === 'object' && item.quantity ? `<small>Qty: ${item.quantity} × Rs. ${formatPrice(item.price || 0)}</small>` : ''}
                </div>
                ${typeof item === 'object' && item.subtotal ? `<strong class="track-item-price">Rs. ${formatPrice(item.subtotal)}</strong>` : ''}
            </div>
        `).join("");
    } else if (typeof order.items === 'string') {
        itemsListHtml = `<div class="track-item-row"><div class="track-item-name"><strong>${order.items}</strong></div></div>`;
    }

    const whatsappText = encodeURIComponent(`Hello AutoGenuine Support, I would like to check on my Order ${order.orderId} (${order.customerName}). Status: ${order.status}.`);

    body.innerHTML = `
        <!-- REAL-TIME STATUS BANNER -->
        <div class="tracking-status-banner ${isCancelled ? 'cancelled' : step >= 4 ? 'delivered' : step >= 3 ? 'shipped' : 'processing'}">
            <div class="banner-status-badge">
                <span class="status-pulse-dot"></span>
                <strong>STATUS: ${order.status.toUpperCase()}</strong>
            </div>
            <p class="banner-status-msg">${order.statusMessage}</p>
        </div>

        <!-- 4-STEP VISUAL PROGRESS STEPPER -->
        ${!isCancelled ? `
        <div class="tracking-stepper-wrapper">
            <div class="stepper-step ${step >= 1 ? 'completed active' : ''}">
                <div class="step-circle">${step > 1 ? '✓' : '1'}</div>
                <div class="step-label">
                    <strong>Order Placed</strong>
                    <small>${order.date || 'Confirmed'}</small>
                </div>
            </div>
            <div class="stepper-line ${step >= 2 ? 'filled' : ''}"></div>
            <div class="stepper-step ${step >= 2 ? 'completed active' : ''}">
                <div class="step-circle">${step > 2 ? '✓' : '2'}</div>
                <div class="step-label">
                    <strong>Fitment Inspection</strong>
                    <small>OEM Verified</small>
                </div>
            </div>
            <div class="stepper-line ${step >= 3 ? 'filled' : ''}"></div>
            <div class="stepper-step ${step >= 3 ? 'completed active' : ''}">
                <div class="step-circle">${step >= 3 ? '🚚' : '3'}</div>
                <div class="step-label">
                    <strong>Dispatched / Shipped</strong>
                    <small>${order.courierName ? 'Domex Courier' : 'In Transit'}</small>
                </div>
            </div>
            <div class="stepper-line ${step >= 4 ? 'filled' : ''}"></div>
            <div class="stepper-step ${step >= 4 ? 'completed active' : ''}">
                <div class="step-circle">${step >= 4 ? '✓' : '4'}</div>
                <div class="step-label">
                    <strong>Delivered</strong>
                    <small>Destination</small>
                </div>
            </div>
        </div>
        ` : `
        <div style="background:rgba(230,57,70,0.1); border:1px solid #e63946; padding:15px; border-radius:8px; text-align:center; color:#e63946; margin-bottom:20px;">
            <strong>Order Cancelled</strong>
        </div>
        `}

        <!-- COURIER & LOGISTICS DETAILS -->
        <div class="tracking-info-grid">
            <div class="info-card">
                <small>Courier Partner</small>
                <strong>📦 ${order.courierName}</strong>
            </div>
            <div class="info-card">
                <small>Tracking Reference Code</small>
                <code class="track-code">${order.trackingNumber}</code>
            </div>
            <div class="info-card">
                <small>Estimated Delivery</small>
                <strong>⏱️ ${order.estimatedDelivery}</strong>
            </div>
            <div class="info-card">
                <small>Payment Method</small>
                <strong>💳 ${order.paymentMethod || 'Cash on Delivery'}</strong>
            </div>
        </div>

        <!-- RECIPIENT & ITEMS CARD -->
        <div class="tracking-recipient-card">
            <div class="recipient-header">
                <div>
                    <strong>Deliver To: ${order.customerName || 'Customer'}</strong>
                    <p style="font-size:0.85rem; color:var(--text-muted); margin-top:2px;">📍 ${order.address || 'Sri Lanka'} • ☎ ${order.customerPhone || 'Verified'}</p>
                </div>
            </div>

            <hr style="border:0; border-top:1px solid var(--border-color, #242c42); margin:12px 0;">

            <div class="track-items-summary">
                <h5 style="margin-bottom:8px; font-size:0.85rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Purchased Spare Parts</h5>
                ${itemsListHtml}
            </div>

            <div class="track-total-row">
                <span>Total Amount Paid / Due:</span>
                <strong style="color:var(--accent, #2a9d8f); font-size:1.15rem;">Rs. ${formatPrice(order.total || 0)}</strong>
            </div>
        </div>

        <!-- ACTIONS ROW -->
        <div class="tracking-actions-footer">
            <a href="https://wa.me/94786287337?text=${whatsappText}" target="_blank" class="btn-track-whatsapp" style="display:inline-flex; align-items:center; gap:8px; background:#25d366; color:#fff; text-decoration:none; padding:10px 18px; border-radius:6px; font-weight:700; font-size:0.88rem;">
                <span>💬</span> WhatsApp Dispatch Support
            </a>
            <button type="button" class="btn-track-print" onclick="printOrderInvoice('${order.orderId}')" style="display:inline-flex; align-items:center; gap:8px; background:var(--bg-input, #1a2030); border:1px solid var(--border-color, #242c42); color:var(--text-main, #f0f4fc); padding:10px 18px; border-radius:6px; font-weight:600; cursor:pointer;">
                <span>🖨️</span> Print Invoice
            </button>
        </div>
    `;

    openModal("orderTrackingModal");
}
window.openOrderTrackingModal = openOrderTrackingModal;

function openQuickTrackerPrompt() {
    const inputRef = prompt("Enter your Order Reference Number (e.g. #AG-90412) or Phone Number:");
    if (inputRef && inputRef.trim()) {
        openOrderTrackingModal(inputRef.trim());
    }
}
window.openQuickTrackerPrompt = openQuickTrackerPrompt;

function printOrderInvoice(orderRef) {
    const order = getOrderTrackingDetails(orderRef);
    if (!order) return;

    let itemsRows = "";
    if (Array.isArray(order.items) && order.items.length > 0) {
        itemsRows = order.items.map(i => `
            <tr>
                <td style="padding:8px; border-bottom:1px solid #ddd;">${typeof i === 'string' ? i : i.name}</td>
                <td style="padding:8px; border-bottom:1px solid #ddd; text-align:center;">${i.quantity || 1}</td>
                <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right;">Rs. ${formatPrice(i.price || 0)}</td>
                <td style="padding:8px; border-bottom:1px solid #ddd; text-align:right;"><strong>Rs. ${formatPrice(i.subtotal || i.price || 0)}</strong></td>
            </tr>
        `).join("");
    } else {
        itemsRows = `<tr><td colspan="4" style="padding:8px;">${order.items || 'Genuine Automotive Spare Parts'}</td></tr>`;
    }

    const printHtml = `
    <html>
    <head>
        <title>AutoGenuine Invoice - ${order.orderId}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #111; padding: 40px; }
            .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #e63946; padding-bottom: 15px; margin-bottom: 25px; }
            .logo h2 { margin: 0; color: #e63946; font-size: 24px; }
            .meta p { margin: 3px 0; font-size: 13px; color: #555; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
            th { background: #f4f6f8; padding: 10px 8px; text-align: left; border-bottom: 2px solid #ccc; }
            .totals { margin-top: 25px; text-align: right; }
            .totals p { margin: 5px 0; font-size: 14px; }
            .totals strong { font-size: 18px; color: #e63946; }
            .footer { margin-top: 40px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="invoice-header">
            <div class="logo">
                <h2>AutoGenuine Sri Lanka</h2>
                <p style="margin:4px 0; font-size:12px; color:#666;">Official OEM Automotive Parts Distributor</p>
                <p style="margin:2px 0; font-size:12px; color:#666;">Hotline / WhatsApp: +94 78 628 7337 | info@autogenuine.lk</p>
            </div>
            <div class="meta" style="text-align:right;">
                <h3 style="margin:0 0 5px 0; color:#333;">TAX INVOICE</h3>
                <p><strong>Order Ref:</strong> ${order.orderId}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Tracking:</strong> ${order.trackingNumber}</p>
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:13px;">
            <div>
                <strong>Billed & Delivered To:</strong>
                <p style="margin:3px 0;">${order.customerName}</p>
                <p style="margin:3px 0;">${order.address}</p>
                <p style="margin:3px 0;">Phone: ${order.customerPhone}</p>
            </div>
            <div style="text-align:right;">
                <strong>Logistics & Courier:</strong>
                <p style="margin:3px 0;">${order.courierName}</p>
                <p style="margin:3px 0;">Payment: ${order.paymentMethod}</p>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Spare Part Description</th>
                    <th style="text-align:center;">Qty</th>
                    <th style="text-align:right;">Unit Price</th>
                    <th style="text-align:right;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsRows}
            </tbody>
        </table>

        <div class="totals">
            <p>Subtotal: Rs. ${formatPrice(order.subtotal || order.total)}</p>
            ${order.discount > 0 ? `<p>Discount: - Rs. ${formatPrice(order.discount)}</p>` : ''}
            <p>Shipping / Islandwide Delivery: ${order.shipping > 0 ? `Rs. ${formatPrice(order.shipping)}` : 'FREE'}</p>
            <p><strong>Grand Total: Rs. ${formatPrice(order.total)}</strong></p>
        </div>

        <div class="footer">
            <p>Thank you for choosing AutoGenuine! All genuine OEM parts come with stamped manufacturer warranty.</p>
            <p>For warranty claims or vehicle fitment support, contact +94 78 628 7337 (WhatsApp available).</p>
        </div>
        <script>window.print();</script>
    </body>
    </html>
    `;

    const printWin = window.open("", "_blank", "width=800,height=700");
    if (printWin) {
        printWin.document.open();
        printWin.document.write(printHtml);
        printWin.document.close();
    }
}
window.printOrderInvoice = printOrderInvoice;

// Auto-run on DOM ready
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        updateAllCartBadges();
        updateWishlistBadges();
        updateHeaderAccountButton();
        initThemeToggle();
        ensureOrderTrackingModalExists();
        syncWithBackendDatabase();
    });
}




