// products.js - AutoGenuine Central Product Database & Utilities

const PRODUCTS = [
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

// Helper Functions
function getAllProducts() {
    return PRODUCTS;
}

function getProductById(id) {
    if (!id) return null;
    return PRODUCTS.find(p => p.id.toLowerCase() === id.toLowerCase().trim()) || null;
}

function getProductsByCategory(categorySlug) {
    if (!categorySlug || categorySlug === "all") return PRODUCTS;
    return PRODUCTS.filter(p => p.categorySlug.toLowerCase() === categorySlug.toLowerCase() || p.category.toLowerCase().includes(categorySlug.toLowerCase()));
}

function getRelatedProducts(currentId, limit = 3) {
    const current = getProductById(currentId);
    if (!current) return PRODUCTS.slice(0, limit);
    return PRODUCTS.filter(p => p.id !== current.id).slice(0, limit);
}

// Cart & Wishlist Storage Handlers
const CART_STORAGE_KEY = "autogenuine_cart_items";
const WISHLIST_STORAGE_KEY = "autogenuine_wishlist_items";
const COUPON_STORAGE_KEY = "autogenuine_active_coupon";

function getCartItems() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
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
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
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
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        updateAllCartBadges();
        return true;
    }
    return false;
}

function removeCartItem(productId) {
    let items = getCartItems();
    items = items.filter(item => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateAllCartBadges();
    return true;
}

function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    updateAllCartBadges();
}

function applyCouponCode(code) {
    if (!code) return { success: false, message: "Please enter a coupon code" };
    const cleaned = code.trim().toUpperCase();
    if (cleaned === "WELCOME10") {
        const coupon = { code: "WELCOME10", discountPercent: 10 };
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
        return { success: true, discountPercent: 10, message: "10% Discount Coupon Applied!" };
    } else {
        return { success: false, message: "Invalid or expired coupon code. Try WELCOME10" };
    }
}

function getActiveCoupon() {
    try {
        const saved = localStorage.getItem(COUPON_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        return null;
    }
}

function removeCouponCode() {
    localStorage.removeItem(COUPON_STORAGE_KEY);
}

function updateAllCartBadges() {
    const count = getCartCount();
    document.querySelectorAll(".header-actions a[href*='cart'] b, .cart-badge-count, #cartCount").forEach(badge => {
        badge.textContent = count;
    });
}

function getWishlistItems() {
    try {
        const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
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
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
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
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    updateWishlistBadges();
}

function updateWishlistBadges() {
    const count = getWishlistItems().length;
    document.querySelectorAll(".wishlist-badge-count, #wishlistCount").forEach(badge => {
        badge.textContent = count;
    });
}

// ==========================================
// USER AUTHENTICATION & ORDER HISTORY SYSTEM
// ==========================================
const USERS_STORAGE_KEY = "autogenuine_registered_users";
const CURRENT_USER_KEY = "autogenuine_current_user";
const ORDERS_STORAGE_KEY = "autogenuine_orders_history";
const QUOTATIONS_STORAGE_KEY = "autogenuine_quotations";

function getRegisteredUsers() {
    try {
        const saved = localStorage.getItem(USERS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [
            { name: "Kasun Dharmasena", email: "kasun@gmail.com", phone: "0771234567", password: "123", vehicle: "Toyota Premio NZT260 (2016)" }
        ];
    } catch (e) {
        return [];
    }
}

function getCurrentUser() {
    try {
        const saved = localStorage.getItem(CURRENT_USER_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        return null;
    }
}

function registerUser(name, email, phone, password, vehicle) {
    const users = getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: "An account with this email already exists." };
    }
    const newUser = { name, email, phone, password, vehicle: vehicle || "Not specified", registeredAt: new Date().toLocaleDateString() };
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    updateHeaderAccountButton();
    return { success: true, user: newUser, message: "Registration successful! Welcome to AutoGenuine." };
}

function loginUser(email, password) {
    const users = getRegisteredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        updateHeaderAccountButton();
        return { success: true, user: user, message: `Welcome back, ${user.name}!` };
    }
    return { success: false, message: "Invalid email or password. Please try again." };
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    updateHeaderAccountButton();
}

function saveOrder(orderData) {
    try {
        let orders = getOrdersHistory();
        orders.unshift(orderData);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {}
}

function getOrdersHistory() {
    try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveQuotation(data) {
    try {
        let quotes = [];
        const saved = localStorage.getItem(QUOTATIONS_STORAGE_KEY);
        if (saved) quotes = JSON.parse(saved);
        quotes.unshift(data);
        localStorage.setItem(QUOTATIONS_STORAGE_KEY, JSON.stringify(quotes));
    } catch (e) {}
}

function updateHeaderAccountButton() {
    const user = getCurrentUser();
    document.querySelectorAll(".account-btn-label, #accountBtnText").forEach(el => {
        el.textContent = user ? user.name.split(" ")[0] : "Account";
    });
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
        return "📞 You can contact our parts specialist hotline at <strong>+94 77 123 4567</strong> or email <strong>info@autogenuine.lk</strong>. Our showroom is located in Colombo, Sri Lanka.";
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

// Auto-run on DOM ready
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        updateAllCartBadges();
        updateWishlistBadges();
        updateHeaderAccountButton();
        initThemeToggle();
    });
}


