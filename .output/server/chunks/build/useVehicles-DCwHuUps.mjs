import { b as useAsyncData, o as formatNumber, c as conditionLabel, f as formatNaira, e as formatMileage, d as dealership } from '../virtual/entry.mjs';
import { computed } from 'vue';

// app/data/vehicles.ts
function img(name) {
	return `/images/vehicles/${name}.jpg`;
}
function features(groups) {
	return {
		safety: groups.safety ?? [],
		interior: groups.interior ?? [],
		exterior: groups.exterior ?? [],
		comfort: groups.comfort ?? [],
		infotainment: groups.infotainment ?? [],
		driverAssistance: groups.driverAssistance ?? []
	};
}
var vehicles = [
	{
		id: "veh-001",
		slug: "2024-porsche-911-carrera-s",
		stockNumber: "VM-2401",
		make: "Porsche",
		model: "911",
		trim: "Carrera S",
		year: 2024,
		condition: "used",
		status: "available",
		price: 112e6,
		currency: "NGN",
		mileage: 12400,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "RWD",
		bodyType: "Coupe",
		exteriorColor: "Guards Red",
		interiorColor: "Black leather",
		engine: "3.0L twin-turbo flat-six",
		seatingCapacity: 4,
		doors: 2,
		description: "The 911 Carrera S remains the benchmark sports car: compact, precise and effortlessly quick. This example pairs the 3.0-litre twin-turbo flat-six with Porsche’s eight-speed PDK transmission and a focused, driver-oriented cabin.\n\nIts Guards Red finish and classic silhouette give it real presence, while the low mileage suggests a carefully used example. Specification highlights are listed below; the dealership can confirm the full condition and history directly.",
		images: [
			img("porsche-911-carrera-s"),
			img("porsche-911-detail"),
			img("interior-2")
		],
		features: features({
			safety: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Automatic emergency braking",
				"Tyre pressure monitoring"
			],
			interior: [
				"14-way power-adjustable front seats",
				"Heated front seats",
				"Black leather upholstery",
				"Aluminium trim inlays"
			],
			exterior: [
				"20/21-inch alloy wheels",
				"LED matrix headlights",
				"Auto-dimming mirrors",
				"Rear parking sensors"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless entry and start",
				"Electrically adjustable steering column"
			],
			infotainment: [
				"Porsche Communication Management",
				"Apple CarPlay",
				"BOSE surround sound",
				"Digital instrument cluster"
			],
			driverAssistance: [
				"Rear-view camera",
				"Park Assist",
				"Cruise control",
				"Drive mode selector"
			]
		}),
		createdAt: "2026-10-15T09:00:00.000Z",
		featured: true
	},
	{
		id: "veh-002",
		slug: "2025-mercedes-amg-g-63",
		stockNumber: "VM-2402",
		make: "Mercedes-AMG",
		model: "G 63",
		trim: "4MATIC",
		year: 2025,
		condition: "new",
		status: "available",
		price: 295e6,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "4WD",
		bodyType: "SUV",
		exteriorColor: "Polar White",
		interiorColor: "Black Nappa leather",
		engine: "4.0L twin-turbo V8",
		seatingCapacity: 5,
		doors: 5,
		description: "The G 63 combines unmistakable boxy proportions with serious performance from its hand-built 4.0-litre twin-turbo V8. Inside, the cabin is a study in contrast: rugged architecture finished with premium materials and modern technology.\n\nThis is a new-vehicle listing. Final specification, delivery timing and registration arrangements should be confirmed with the sales team before purchase.",
		images: [
			img("mercedes-amg-g63"),
			img("range-rover-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Active brake assist",
				"Blind-spot monitoring",
				"Attention assist",
				"360-degree camera"
			],
			interior: [
				"AMG sport seats",
				"Nappa leather upholstery",
				"Carbon-fibre trim",
				"Heated front and rear seats"
			],
			exterior: [
				"21-inch AMG alloy wheels",
				"LED high-performance headlights",
				"Side-exit exhaust",
				"Electric sunroof"
			],
			comfort: [
				"Three-zone climate control",
				"Air balance package",
				"Keyless-go",
				"Power-adjustable front seats"
			],
			infotainment: [
				"MBUX infotainment",
				"Burmester surround sound",
				"Apple CarPlay and Android Auto",
				"Wireless charging"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Parking assist",
				"Traffic sign assist"
			]
		}),
		createdAt: "2026-10-11T09:00:00.000Z",
		featured: true
	},
	{
		id: "veh-003",
		slug: "2023-bmw-m4-competition",
		stockNumber: "VM-2403",
		make: "BMW",
		model: "M4",
		trim: "Competition",
		year: 2023,
		condition: "used",
		status: "available",
		price: 825e5,
		currency: "NGN",
		mileage: 21800,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "RWD",
		bodyType: "Coupe",
		exteriorColor: "Portimao Blue",
		interiorColor: "Black leather",
		engine: "3.0L twin-turbo inline-six",
		seatingCapacity: 4,
		doors: 2,
		description: "The M4 Competition is a true performance coupe, with a 3.0-litre twin-turbo inline-six, an eight-speed M Steptronic transmission and rear-wheel drive. The Portimao Blue finish is one of the model’s most recognisable colours.\n\nThis used example is presented with its key specification and mileage. As with every demonstration listing, the team should verify the full service history, condition and documentation directly.",
		images: [
			img("bmw-m4-competition"),
			img("bmw-m4-alt"),
			img("interior-3")
		],
		features: features({
			safety: [
				"M Drive Professional",
				"Lane departure warning",
				"Front collision warning",
				"Tyre pressure monitoring"
			],
			interior: [
				"M carbon bucket-style seats",
				"Heated front seats",
				"Carbon-fibre interior trim",
				"M seat belts"
			],
			exterior: [
				"19/20-inch M alloy wheels",
				"Carbon-fibre roof",
				"Adaptive LED headlights",
				"M rear spoiler"
			],
			comfort: [
				"Three-zone climate control",
				"Comfort access",
				"Electric seat adjustment with memory"
			],
			infotainment: [
				"BMW Live Cockpit Professional",
				"Harman Kardon sound",
				"Apple CarPlay and Android Auto",
				"Head-up display"
			],
			driverAssistance: [
				"Parking assistant",
				"Reversing camera",
				"Adaptive cruise control",
				"Speed limit info"
			]
		}),
		createdAt: "2026-10-03T09:00:00.000Z",
		featured: true
	},
	{
		id: "veh-004",
		slug: "2025-range-rover-evoque-r-dynamic",
		stockNumber: "VM-2404",
		make: "Land Rover",
		model: "Range Rover Evoque",
		trim: "R-Dynamic S",
		year: 2025,
		condition: "new",
		status: "available",
		price: 78e6,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Hybrid",
		drivetrain: "AWD",
		bodyType: "SUV",
		exteriorColor: "Fuji White",
		interiorColor: "Ebony",
		engine: "2.0L turbo mild hybrid",
		seatingCapacity: 5,
		doors: 5,
		description: "The Evoque brings compact luxury to the Range Rover family, with clean proportions, a calm cabin and all-wheel-drive confidence. The R-Dynamic S trim adds a more purposeful exterior treatment and a well-equipped interior.\n\nThis is a new-vehicle listing. Exact trim specification, colour availability and delivery timing are subject to confirmation with the dealership.",
		images: [
			img("range-rover-evoque"),
			img("range-rover-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Emergency braking",
				"Lane-keeping assist",
				"Blind-spot assist",
				"Rear traffic monitor"
			],
			interior: [
				"Grained leather seats",
				"10-way power front seats",
				"Heated front seats",
				"Dual-zone climate control"
			],
			exterior: [
				"20-inch alloy wheels",
				"LED headlights",
				"Panoramic roof",
				"R-Dynamic body kit"
			],
			comfort: [
				"Keyless entry",
				"Power tailgate",
				"Rain-sensing wipers",
				"Auto-dimming rear-view mirror"
			],
			infotainment: [
				"Pivi Pro touchscreen",
				"Apple CarPlay and Android Auto",
				"Meridian sound system",
				"Connected navigation"
			],
			driverAssistance: [
				"ClearSight rear-view mirror",
				"Parking sensors",
				"Rear camera",
				"Cruise control"
			]
		}),
		createdAt: "2026-09-19T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-005",
		slug: "2022-mercedes-benz-s-500-4matic",
		stockNumber: "VM-2405",
		make: "Mercedes-Benz",
		model: "S 500",
		trim: "4MATIC",
		year: 2022,
		condition: "used",
		status: "available",
		price: 98e6,
		currency: "NGN",
		mileage: 34600,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Obsidian Black",
		interiorColor: "Macchiato Beige",
		engine: "3.0L turbo inline-six with EQ Boost",
		seatingCapacity: 5,
		doors: 4,
		description: "The S-Class sets the standard for a quiet, effortlessly comfortable luxury sedan. This S 500 pairs its smooth inline-six with 4MATIC all-wheel drive and a cabin finished in light Macchiato Beige leather.\n\nIt is a used example with a recorded 34,600 km. The dealership can provide further detail on condition, service records and documentation on request.",
		images: [
			img("mercedes-s500"),
			img("mercedes-c43-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Active brake assist",
				"Pre-Safe occupant protection",
				"Blind-spot assist",
				"360-degree camera"
			],
			interior: [
				"Nappa leather upholstery",
				"Heated and ventilated front seats",
				"Power rear sunblind",
				"Ambient lighting"
			],
			exterior: [
				"19-inch alloy wheels",
				"LED high-performance headlights",
				"Chrome exterior trim",
				"Power-closing doors"
			],
			comfort: [
				"Four-zone climate control",
				"Air Balance cabin fragrance",
				"Massaging front seats",
				"Keyless-go"
			],
			infotainment: [
				"MBUX with central touchscreen",
				"Burmester 3D sound",
				"Wireless smartphone integration",
				"Rear-seat entertainment"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Active parking assist",
				"Traffic sign assist"
			]
		}),
		createdAt: "2026-10-07T09:00:00.000Z",
		featured: true
	},
	{
		id: "veh-006",
		slug: "2025-audi-q7-55-tfsi-quattro",
		stockNumber: "VM-2406",
		make: "Audi",
		model: "Q7",
		trim: "55 TFSI quattro",
		year: 2025,
		condition: "new",
		status: "available",
		price: 92e6,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "SUV",
		exteriorColor: "Glacier White",
		interiorColor: "Okapi Brown",
		engine: "3.0L turbo V6",
		seatingCapacity: 7,
		doors: 5,
		description: "The Q7 is a seven-seat luxury SUV that balances family practicality with a composed, premium drive. The 55 TFSI engine and quattro all-wheel drive provide confident performance, while the cabin offers generous space across three rows.\n\nThis is a new-vehicle listing. Final specification and availability should be confirmed with the team.",
		images: [
			img("audi-q7"),
			img("suv-profile"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Audi pre-sense front",
				"Lane departure warning",
				"Rear cross-traffic assist",
				"Tyre pressure monitoring"
			],
			interior: [
				"Leather upholstery",
				"Heated front seats",
				"Third-row seating",
				"Power tailgate"
			],
			exterior: [
				"20-inch alloy wheels",
				"Matrix LED headlights",
				"Panoramic sunroof",
				"Roof rails"
			],
			comfort: [
				"Four-zone climate control",
				"Keyless entry and start",
				"Electric front seats with memory",
				"Ambient lighting"
			],
			infotainment: [
				"MMI navigation plus",
				"Virtual cockpit",
				"Apple CarPlay and Android Auto",
				"Bang & Olufsen sound"
			],
			driverAssistance: [
				"Adaptive cruise assist",
				"Parking system plus",
				"Reversing camera",
				"Camera-based traffic sign recognition"
			]
		}),
		createdAt: "2026-09-14T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-007",
		slug: "2023-tesla-model-3-long-range",
		stockNumber: "VM-2407",
		make: "Tesla",
		model: "Model 3",
		trim: "Long Range",
		year: 2023,
		condition: "used",
		status: "available",
		price: 465e5,
		currency: "NGN",
		mileage: 18200,
		transmission: "Automatic",
		fuelType: "Electric",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Pearl White",
		interiorColor: "Black",
		engine: "Dual electric motors",
		seatingCapacity: 5,
		doors: 4,
		description: "The Model 3 Long Range offers dual-motor all-wheel drive, strong acceleration and a minimalist cabin built around a central touchscreen. This example is finished in Pearl White with the black interior.\n\nBattery health, charging equipment and software status should be verified directly with the dealership before purchase. This listing is demonstration data.",
		images: [
			img("tesla-model-3"),
			img("tesla-alt"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Automatic emergency braking",
				"Lane departure avoidance",
				"Blind-spot monitoring",
				"Eight surround cameras"
			],
			interior: [
				"Synthetic leather seats",
				"Heated front seats",
				"Minimalist dashboard",
				"Panoramic glass roof"
			],
			exterior: [
				"18-inch aero wheels",
				"Auto-dimming mirrors",
				"LED headlights",
				"Flush door handles"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless entry via phone",
				"Power-adjustable front seats",
				"Cabin overheat protection"
			],
			infotainment: [
				"15-inch central touchscreen",
				"Premium audio",
				"Navigation with live traffic",
				"Over-the-air updates"
			],
			driverAssistance: [
				"Autopilot",
				"Adaptive cruise control",
				"Automatic lane keeping",
				"Auto-park preparation"
			]
		}),
		createdAt: "2026-09-27T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-008",
		slug: "2024-porsche-taycan-4s",
		stockNumber: "VM-2408",
		make: "Porsche",
		model: "Taycan",
		trim: "4S",
		year: 2024,
		condition: "used",
		status: "available",
		price: 96e6,
		currency: "NGN",
		mileage: 9800,
		transmission: "Automatic",
		fuelType: "Electric",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Volcano Grey",
		interiorColor: "Black",
		engine: "Dual electric motors",
		seatingCapacity: 4,
		doors: 4,
		description: "The Taycan 4S brings Porsche dynamics to an electric four-door, with dual-motor all-wheel drive and a low, wide stance. The interior combines digital displays with a driver-focused layout.\n\nThis low-mileage used example is finished in Volcano Grey. Charging hardware and battery condition should be confirmed directly with the dealership.",
		images: [
			img("porsche-taycan"),
			img("porsche-panamera"),
			img("interior-2")
		],
		features: features({
			safety: [
				"Automatic emergency braking",
				"Lane-keeping assist",
				"Surround view camera",
				"Tyre pressure monitoring"
			],
			interior: [
				"Partial leather interior",
				"Heated front seats",
				"Four-zone climate control",
				"Ambient lighting"
			],
			exterior: [
				"20-inch Taycan alloy wheels",
				"LED matrix headlights",
				"Auto-deploying door handles",
				"Panoramic glass roof"
			],
			comfort: [
				"Keyless entry and start",
				"Power front seats with memory",
				"Heat pump",
				"Wireless charging"
			],
			infotainment: [
				"Porsche Communication Management",
				"Apple CarPlay",
				"Digital cockpit",
				"Navigation with charging planner"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-centring assist",
				"Park Assist",
				"Night vision assist"
			]
		}),
		createdAt: "2026-09-24T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-009",
		slug: "2023-mercedes-amg-c-43",
		stockNumber: "VM-2409",
		make: "Mercedes-AMG",
		model: "C 43",
		trim: "4MATIC",
		year: 2023,
		condition: "used",
		status: "available",
		price: 62e6,
		currency: "NGN",
		mileage: 24900,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Selenite Grey",
		interiorColor: "Black",
		engine: "2.0L turbo inline-four with EQ Boost",
		seatingCapacity: 5,
		doors: 4,
		description: "The C 43 is the accessible entry point to AMG ownership, combining a turbocharged four-cylinder with mild-hybrid assistance and all-wheel drive. It offers a noticeably sharper edge than the standard C-Class without sacrificing everyday usability.\n\nThis used example is presented in Selenite Grey. Condition and service history should be verified with the dealership.",
		images: [
			img("mercedes-amg-c43"),
			img("mercedes-c43-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Active brake assist",
				"Blind-spot assist",
				"Attention assist",
				"Parking package with camera"
			],
			interior: [
				"AMG sport seats",
				"Artico/Microcut upholstery",
				"Heated front seats",
				"Ambient lighting"
			],
			exterior: [
				"18-inch AMG alloy wheels",
				"AMG body styling",
				"LED headlights",
				"Power sunroof"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless start",
				"Power front seats with memory"
			],
			infotainment: [
				"MBUX infotainment",
				"Wireless Apple CarPlay and Android Auto",
				"Burmester sound",
				"Navigation"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Parking assist",
				"Traffic sign assist"
			]
		}),
		createdAt: "2026-09-09T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-010",
		slug: "2025-ford-f-150-raptor",
		stockNumber: "VM-2410",
		make: "Ford",
		model: "F-150",
		trim: "Raptor",
		year: 2025,
		condition: "new",
		status: "available",
		price: 985e5,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "4WD",
		bodyType: "Pickup",
		exteriorColor: "Antimatter Blue",
		interiorColor: "Black",
		engine: "3.5L twin-turbo V6",
		seatingCapacity: 5,
		doors: 4,
		description: "The F-150 Raptor is a high-performance pickup built for difficult terrain, with long-travel suspension, four-wheel drive and a twin-turbo V6. Its broad body and purposeful stance make it one of the most distinctive vehicles in its class.\n\nThis is a new-vehicle listing. Exact specification and availability should be confirmed with the sales team.",
		images: [
			img("ford-f150-raptor"),
			img("pickup-profile"),
			img("interior-2")
		],
		features: features({
			safety: [
				"Pre-collision assist",
				"Blind-spot information system",
				"Rear-view camera",
				"Tyre pressure monitoring"
			],
			interior: [
				"Sport cloth seats",
				"Heated front seats",
				"Leather-wrapped steering wheel",
				"Dual-zone climate control"
			],
			exterior: [
				"17-inch alloy wheels",
				"All-terrain tyres",
				"LED headlights",
				"Bed liner"
			],
			comfort: [
				"Keyless entry and start",
				"Remote start",
				"Power-adjustable pedals",
				"Trailer tow package"
			],
			infotainment: [
				"SYNC 4 infotainment",
				"12-inch touchscreen",
				"Apple CarPlay and Android Auto",
				"B&O sound system"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping system",
				"Trail control",
				"360-degree camera"
			]
		}),
		createdAt: "2026-09-04T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-011",
		slug: "2022-land-rover-discovery-hse",
		stockNumber: "VM-2411",
		make: "Land Rover",
		model: "Discovery",
		trim: "HSE",
		year: 2022,
		condition: "used",
		status: "available",
		price: 52e6,
		currency: "NGN",
		mileage: 41300,
		transmission: "Automatic",
		fuelType: "Hybrid",
		drivetrain: "AWD",
		bodyType: "SUV",
		exteriorColor: "Fuji White",
		interiorColor: "Ebony",
		engine: "3.0L turbo inline-six mild hybrid",
		seatingCapacity: 7,
		doors: 5,
		description: "The Discovery is a versatile seven-seat SUV with genuine off-road capability and a comfortable, airy cabin. The HSE trim adds a strong level of standard equipment, including premium audio and extended leather touches.\n\nThis used example has covered 41,300 km. The dealership can confirm service history, condition and documentation on request.",
		images: [
			img("land-rover-discovery"),
			img("range-rover-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Emergency braking",
				"Blind-spot assist",
				"Rear traffic monitor",
				"ClearSight ground view"
			],
			interior: [
				"Leather seats",
				"Heated front seats",
				"Power-adjustable front seats",
				"Three-zone climate control"
			],
			exterior: [
				"20-inch alloy wheels",
				"LED headlights",
				"Panoramic roof",
				"Power tailgate"
			],
			comfort: [
				"Keyless entry",
				"Air suspension",
				"Terrain Response 2",
				"Heated steering wheel"
			],
			infotainment: [
				"Pivi Pro infotainment",
				"Meridian surround sound",
				"Apple CarPlay and Android Auto",
				"Connected navigation"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Parking sensors",
				"Rear camera"
			]
		}),
		createdAt: "2026-08-30T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-012",
		slug: "2021-volkswagen-golf-gti",
		stockNumber: "VM-2412",
		make: "Volkswagen",
		model: "Golf",
		trim: "GTI",
		year: 2021,
		condition: "used",
		status: "available",
		price: 285e5,
		currency: "NGN",
		mileage: 38700,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "FWD",
		bodyType: "Hatchback",
		exteriorColor: "Atlantic Blue",
		interiorColor: "Titan Black",
		engine: "2.0L turbo inline-four",
		seatingCapacity: 5,
		doors: 5,
		description: "The Golf GTI is the original hot hatch: compact, quick and easy to live with. This Mk8 example pairs a 2.0-litre turbocharged engine with a quick-shifting DSG gearbox and the model’s signature plaid-inspired cabin details.\n\nA used example with 38,700 km recorded. Condition and service history should be verified directly with the dealership.",
		images: [
			img("vw-golf-gti"),
			img("hatch-profile"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Front assist with pedestrian monitoring",
				"Lane assist",
				"Rear traffic alert",
				"Tyre pressure monitoring"
			],
			interior: [
				"GTI sport seats",
				"Heated front seats",
				"Digital cockpit",
				"Ambient lighting"
			],
			exterior: [
				"18-inch alloy wheels",
				"LED headlights",
				"GTI body kit",
				"Rear spoiler"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless entry and start",
				"Power front seats"
			],
			infotainment: [
				"Discover Pro navigation",
				"Apple CarPlay and Android Auto",
				"Wireless charging",
				"Harman Kardon sound"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Park assist",
				"Rear-view camera",
				"Travel assist"
			]
		}),
		createdAt: "2026-08-25T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-013",
		slug: "2020-hyundai-sonata-limited",
		stockNumber: "VM-2413",
		make: "Hyundai",
		model: "Sonata",
		trim: "Limited",
		year: 2020,
		condition: "used",
		status: "available",
		price: 198e5,
		currency: "NGN",
		mileage: 52400,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "FWD",
		bodyType: "Sedan",
		exteriorColor: "Phantom Black",
		interiorColor: "Black",
		engine: "2.5L inline-four",
		seatingCapacity: 5,
		doors: 4,
		description: "The Sonata Limited offers a generous equipment list at a more accessible price point. Its cabin includes a large touchscreen, premium audio and a broad suite of driver assistance features, while the sedan body remains comfortable for daily use.\n\nThis used example has 52,400 km recorded. The team can confirm the full history and current condition directly.",
		images: [
			img("hyundai-sonata"),
			img("sedan-profile"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Forward collision avoidance",
				"Blind-spot collision warning",
				"Rear cross-traffic alert",
				"Lane-following assist"
			],
			interior: [
				"Leather seating",
				"Heated front seats",
				"Power driver seat",
				"Dual-zone climate control"
			],
			exterior: [
				"18-inch alloy wheels",
				"LED headlights",
				"Panoramic sunroof",
				"Chrome accents"
			],
			comfort: [
				"Keyless entry and start",
				"Wireless charging",
				"Auto-dimming mirror",
				"Hands-free boot opening"
			],
			infotainment: [
				"10.25-inch touchscreen",
				"Bose premium audio",
				"Apple CarPlay and Android Auto",
				"Navigation"
			],
			driverAssistance: [
				"Smart cruise control",
				"Lane-centring assist",
				"Rear-view camera",
				"Highway driving assist"
			]
		}),
		createdAt: "2026-08-20T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-014",
		slug: "2019-fiat-500-lounge",
		stockNumber: "VM-2414",
		make: "Fiat",
		model: "500",
		trim: "Lounge",
		year: 2019,
		condition: "used",
		status: "sold",
		price: 115e5,
		currency: "NGN",
		mileage: 61e3,
		transmission: "Manual",
		fuelType: "Petrol",
		drivetrain: "FWD",
		bodyType: "Hatchback",
		exteriorColor: "Blu Volare",
		interiorColor: "Ivory",
		engine: "1.2L inline-four",
		seatingCapacity: 4,
		doors: 3,
		description: "The Fiat 500 is a compact city car with unmistakable retro styling and a surprisingly characterful cabin. The Lounge trim adds a more comfort-focused specification, including alloy wheels and a glass roof.\n\nThis listing is marked as sold and is retained as a demonstration of the site’s sold-vehicle state. Explore similar available inventory for current options.",
		images: [
			img("fiat-500"),
			img("hatch-profile"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Driver airbag",
				"Passenger airbag",
				"ABS with EBD",
				"Tyre pressure monitoring"
			],
			interior: [
				"Ivory cloth upholstery",
				"Height-adjustable driver seat",
				"Split-folding rear seats"
			],
			exterior: [
				"15-inch alloy wheels",
				"Chrome mirror caps",
				"Fixed glass roof",
				"Body-coloured bumpers"
			],
			comfort: [
				"Manual air conditioning",
				"Remote central locking",
				"Electric front windows"
			],
			infotainment: [
				"Five-inch touchscreen",
				"Bluetooth connectivity",
				"USB input",
				"Six-speaker audio"
			],
			driverAssistance: ["Rear parking sensors", "Cruise control"]
		}),
		createdAt: "2026-07-27T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-015",
		slug: "2020-bmw-730li-m-sport",
		stockNumber: "VM-2415",
		make: "BMW",
		model: "730Li",
		trim: "M Sport",
		year: 2020,
		condition: "used",
		status: "available",
		price: 58e6,
		currency: "NGN",
		mileage: 44200,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "RWD",
		bodyType: "Sedan",
		exteriorColor: "Bernina Grey",
		interiorColor: "Cognac",
		engine: "2.0L turbo inline-four",
		seatingCapacity: 5,
		doors: 4,
		description: "The long-wheelbase 7 Series prioritises rear-seat comfort and quiet cruising. This 730Li is finished in Bernina Grey with a warm Cognac leather cabin and wears the M Sport exterior package.\n\nA used example with 44,200 km shown. Buyers should confirm the complete service history and condition with the dealership.",
		images: [
			img("bmw-730li"),
			img("bmw-530i"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Driving Assistant",
				"Front collision warning",
				"Lane departure warning",
				"Surround-view camera"
			],
			interior: [
				"Nappa leather upholstery",
				"Heated and ventilated front seats",
				"Power rear seats",
				"Ambient lighting"
			],
			exterior: [
				"19-inch M alloy wheels",
				"M Sport body styling",
				"Adaptive LED headlights",
				"Power boot lid"
			],
			comfort: [
				"Four-zone climate control",
				"Comfort access",
				"Rear sunblinds",
				"Soft-close doors"
			],
			infotainment: [
				"BMW Operating System 7",
				"Harman Kardon sound",
				"Wireless Apple CarPlay",
				"Rear touchscreen controller"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Parking assistant plus",
				"Reversing assistant",
				"Speed limit info"
			]
		}),
		createdAt: "2026-08-15T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-016",
		slug: "2021-audi-tt-s-line",
		stockNumber: "VM-2416",
		make: "Audi",
		model: "TT",
		trim: "S line",
		year: 2021,
		condition: "used",
		status: "reserved",
		price: 365e5,
		currency: "NGN",
		mileage: 29500,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Coupe",
		exteriorColor: "Nano Grey",
		interiorColor: "Black",
		engine: "2.0L turbo inline-four",
		seatingCapacity: 4,
		doors: 2,
		description: "The Audi TT is a compact sports coupe with a distinctive interior and balanced quattro all-wheel-drive handling. This S line example is finished in Nano Grey and shows 29,500 km.\n\nThis vehicle is currently marked as reserved. Enquiries are welcome, but availability should be confirmed directly with the dealership before making plans.",
		images: [
			img("audi-tt"),
			img("audi-r8-alt"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Audi pre-sense",
				"Lane departure warning",
				"Tyre pressure monitoring",
				"Rear parking sensors"
			],
			interior: [
				"S line sport seats",
				"Leather/Alcantara upholstery",
				"Heated front seats",
				"Flat-bottom steering wheel"
			],
			exterior: [
				"19-inch alloy wheels",
				"S line body styling",
				"LED headlights",
				"Rear spoiler"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless start",
				"Auto-dimming mirror"
			],
			infotainment: [
				"Audi virtual cockpit",
				"MMI navigation plus",
				"Apple CarPlay and Android Auto",
				"Bang & Olufsen sound"
			],
			driverAssistance: [
				"Cruise control",
				"Rear-view camera",
				"Audi side assist",
				"Park assist"
			]
		}),
		createdAt: "2026-08-10T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-017",
		slug: "2024-audi-rs7-sportback",
		stockNumber: "VM-2417",
		make: "Audi",
		model: "RS7",
		trim: "Sportback",
		year: 2024,
		condition: "new",
		status: "available",
		price: 118e6,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Daytona Grey",
		interiorColor: "Black",
		engine: "4.0L twin-turbo V8",
		seatingCapacity: 5,
		doors: 5,
		description: "The RS7 Sportback pairs a practical five-door body with a 4.0-litre twin-turbo V8 and quattro all-wheel drive. It is a genuine performance car that can still carry passengers and luggage with ease.\n\nThis is a new-vehicle listing. Specification, delivery timing and final pricing should be confirmed with the dealership.",
		images: [
			img("audi-rs7-sportback"),
			img("audi-road"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Audi pre-sense",
				"Adaptive cruise assist",
				"Lane departure warning",
				"360-degree camera"
			],
			interior: [
				"RS sport seats",
				"Valcona leather upholstery",
				"Heated front and rear seats",
				"Carbon-fibre trim"
			],
			exterior: [
				"22-inch RS alloy wheels",
				"Matrix LED headlights",
				"RS body styling",
				"Panoramic sunroof"
			],
			comfort: [
				"Four-zone climate control",
				"Keyless entry and start",
				"Power tailgate",
				"Air suspension"
			],
			infotainment: [
				"MMI touch response",
				"Bang & Olufsen 3D sound",
				"Apple CarPlay and Android Auto",
				"Head-up display"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-centring assist",
				"Park assist",
				"Night vision"
			]
		}),
		createdAt: "2026-10-18T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-018",
		slug: "2022-bmw-530i-m-sport",
		stockNumber: "VM-2418",
		make: "BMW",
		model: "530i",
		trim: "M Sport",
		year: 2022,
		condition: "used",
		status: "available",
		price: 485e5,
		currency: "NGN",
		mileage: 33800,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "RWD",
		bodyType: "Sedan",
		exteriorColor: "Alpine White",
		interiorColor: "Cognac",
		engine: "2.0L turbo inline-four",
		seatingCapacity: 5,
		doors: 4,
		description: "The 530i M Sport combines the 5 Series’ composed ride with a sharper exterior treatment and a well-finished cabin. Alpine White over Cognac leather is a particularly clean combination.\n\nThis used example shows 33,800 km. Service history and condition should be confirmed with the dealership before purchase.",
		images: [
			img("bmw-530i"),
			img("bmw-730li"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Driving Assistant",
				"Front collision warning",
				"Lane departure warning",
				"Tyre pressure monitoring"
			],
			interior: [
				"Sport seats",
				"Cognac leather upholstery",
				"Heated front seats",
				"Ambient lighting"
			],
			exterior: [
				"19-inch M alloy wheels",
				"M Sport body styling",
				"Adaptive LED headlights",
				"Power sunroof"
			],
			comfort: [
				"Dual-zone climate control",
				"Comfort access",
				"Power front seats with memory",
				"Auto-dimming mirrors"
			],
			infotainment: [
				"BMW Live Cockpit Professional",
				"Apple CarPlay and Android Auto",
				"Harman Kardon sound",
				"Navigation"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Parking assistant",
				"Reversing camera",
				"Speed limit info"
			]
		}),
		createdAt: "2026-08-05T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-019",
		slug: "2023-ford-mustang-gt",
		stockNumber: "VM-2419",
		make: "Ford",
		model: "Mustang",
		trim: "GT",
		year: 2023,
		condition: "used",
		status: "sold",
		price: 44e6,
		currency: "NGN",
		mileage: 16900,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "RWD",
		bodyType: "Coupe",
		exteriorColor: "Shadow Black",
		interiorColor: "Ebony",
		engine: "5.0L V8",
		seatingCapacity: 4,
		doors: 2,
		description: "The Mustang GT is an old-school V8 coupe with unmistakable presence. This example pairs the 5.0-litre engine with a ten-speed automatic transmission and a black-on-black specification.\n\nThis vehicle is marked as sold. It remains visible to demonstrate how sold listings are presented, and similar available vehicles are suggested below.",
		images: [
			img("ford-mustang-gt"),
			img("mustang-alt"),
			img("interior-2")
		],
		features: features({
			safety: [
				"Pre-collision assist",
				"Blind-spot monitoring",
				"Rear-view camera",
				"Tyre pressure monitoring"
			],
			interior: [
				"Leather-trimmed sport seats",
				"Heated and ventilated front seats",
				"Aluminium trim",
				"Ambient lighting"
			],
			exterior: [
				"19-inch alloy wheels",
				"LED headlights",
				"Rear spoiler",
				"Dual exhaust outlets"
			],
			comfort: [
				"Dual-zone climate control",
				"Keyless entry and start",
				"Power front seats"
			],
			infotainment: [
				"SYNC 3 infotainment",
				"Bang & Olufsen sound",
				"Apple CarPlay and Android Auto",
				"Navigation"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Rear parking sensors",
				"Pre-collision assist"
			]
		}),
		createdAt: "2026-08-01T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-020",
		slug: "2024-porsche-panamera",
		stockNumber: "VM-2420",
		make: "Porsche",
		model: "Panamera",
		trim: "4",
		year: 2024,
		condition: "new",
		status: "available",
		price: 145e6,
		currency: "NGN",
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Sedan",
		exteriorColor: "Jet Black",
		interiorColor: "Bordeaux Red",
		engine: "2.9L twin-turbo V6",
		seatingCapacity: 4,
		doors: 4,
		description: "The Panamera is a luxury four-door with sports-car proportions and a genuinely engaging drive. This example pairs all-wheel drive with a twin-turbo V6 and a striking Bordeaux Red cabin.\n\nThis is a new-vehicle listing. Final specification and availability should be confirmed with the dealership.",
		images: [
			img("porsche-panamera"),
			img("porsche-taycan"),
			img("interior-2")
		],
		features: features({
			safety: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Surround view camera",
				"Automatic emergency braking"
			],
			interior: [
				"Leather interior in Bordeaux Red",
				"14-way power front seats",
				"Heated front seats",
				"Four-zone climate control"
			],
			exterior: [
				"20-inch Panamera alloy wheels",
				"LED matrix headlights",
				"Power tailgate",
				"Panoramic glass roof"
			],
			comfort: [
				"Keyless entry and start",
				"Soft-close doors",
				"Power steering column",
				"Ambient lighting"
			],
			infotainment: [
				"Porsche Communication Management",
				"BOSE surround sound",
				"Apple CarPlay",
				"Head-up display"
			],
			driverAssistance: [
				"Active lane keeping",
				"Adaptive cruise control",
				"Park Assist",
				"Night vision assist"
			]
		}),
		createdAt: "2026-09-29T09:00:00.000Z",
		featured: true
	},
	{
		id: "veh-021",
		slug: "2023-audi-r8-v10-performance",
		stockNumber: "VM-2421",
		make: "Audi",
		model: "R8",
		trim: "V10 Performance",
		year: 2023,
		condition: "used",
		status: "reserved",
		price: 138e6,
		currency: "NGN",
		mileage: 9100,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Coupe",
		exteriorColor: "Tango Red",
		interiorColor: "Black",
		engine: "5.2L V10",
		seatingCapacity: 2,
		doors: 2,
		description: "The R8 V10 Performance is the final expression of Audi’s naturally aspirated supercar formula. A 5.2-litre V10, quattro drive and a low-slung aluminium chassis deliver a highly distinctive experience.\n\nThis low-mileage example is currently marked as reserved. Enquiries are welcome, but the dealership should confirm availability before any travel arrangements are made.",
		images: [
			img("audi-r8"),
			img("audi-r8-alt"),
			img("interior-3")
		],
		features: features({
			safety: [
				"Electronic stability control",
				"Tyre pressure monitoring",
				"Rear parking sensors",
				"Rear-view camera"
			],
			interior: [
				"Fine Nappa leather seats",
				"Carbon-fibre trim",
				"Heated seats",
				"Digital cockpit"
			],
			exterior: [
				"20-inch alloy wheels",
				"LED headlights",
				"Carbon-fibre side blades",
				"Fixed rear spoiler"
			],
			comfort: [
				"Automatic climate control",
				"Keyless entry and start",
				"Power-adjustable seats"
			],
			infotainment: [
				"Audi virtual cockpit",
				"MMI navigation plus",
				"Bang & Olufsen sound",
				"Bluetooth connectivity"
			],
			driverAssistance: [
				"Cruise control",
				"Parking assist",
				"Audi side assist",
				"Hill-hold assist"
			]
		}),
		createdAt: "2026-07-20T09:00:00.000Z",
		featured: false
	},
	{
		id: "veh-022",
		slug: "2021-mercedes-amg-gt-53",
		stockNumber: "VM-2422",
		make: "Mercedes-AMG",
		model: "GT 53",
		trim: "4MATIC+",
		year: 2021,
		condition: "used",
		status: "available",
		price: 88e6,
		currency: "NGN",
		mileage: 27600,
		transmission: "Automatic",
		fuelType: "Petrol",
		drivetrain: "AWD",
		bodyType: "Coupe",
		exteriorColor: "Selenite Grey",
		interiorColor: "Black Nappa",
		engine: "3.0L turbo inline-six with EQ Boost",
		seatingCapacity: 4,
		doors: 4,
		description: "The AMG GT 53 four-door coupe blends grand-touring comfort with a strong inline-six and all-wheel drive. Its fastback profile and low stance give it a distinct presence among luxury sedans.\n\nThis used example shows 27,600 km. Full service history and condition should be verified with the dealership.",
		images: [
			img("mercedes-amg-gt"),
			img("mercedes-amg-alt"),
			img("interior-1")
		],
		features: features({
			safety: [
				"Active brake assist",
				"Blind-spot assist",
				"Attention assist",
				"Surround-view camera"
			],
			interior: [
				"AMG sport seats",
				"Nappa leather upholstery",
				"Heated front seats",
				"Ambient lighting"
			],
			exterior: [
				"20-inch AMG alloy wheels",
				"AMG body styling",
				"LED high-performance headlights",
				"Power sunroof"
			],
			comfort: [
				"Four-zone climate control",
				"Keyless-go",
				"Power front seats with memory",
				"Air suspension"
			],
			infotainment: [
				"MBUX infotainment",
				"Burmester surround sound",
				"Apple CarPlay and Android Auto",
				"Wireless charging"
			],
			driverAssistance: [
				"Adaptive cruise control",
				"Lane-keeping assist",
				"Parking assist",
				"Traffic sign assist"
			]
		}),
		createdAt: "2026-07-15T09:00:00.000Z",
		featured: true
	}
];
// app/types/vehicle.ts
/**
* Core vehicle types.
*
* This file is intentionally framework-agnostic so the same contracts can be
* shared by the Phase 1 mock repository and a future API-backed repository.
*/
var VEHICLE_CONDITIONS = ["new", "used"];
var VEHICLE_BODY_TYPES = [
	"SUV",
	"Sedan",
	"Coupe",
	"Hatchback",
	"Pickup",
	"Wagon"
];
var VEHICLE_TRANSMISSIONS = ["Automatic", "Manual"];
var VEHICLE_FUEL_TYPES = [
	"Petrol",
	"Diesel",
	"Hybrid",
	"Electric"
];
var VEHICLE_DRIVETRAINS = [
	"RWD",
	"FWD",
	"AWD",
	"4WD"
];
var VEHICLE_SORT_KEYS = [
	"recommended",
	"newest",
	"price-asc",
	"price-desc",
	"year-desc",
	"mileage-asc"
];
// app/utils/vehicleFilters.ts
var DEFAULT_SORT = dealership.defaultSort;
var DEFAULT_PER_PAGE = dealership.inventoryPerPage;
var SORT_OPTIONS = [
	{
		label: "Recommended",
		value: "recommended"
	},
	{
		label: "Newest listings",
		value: "newest"
	},
	{
		label: "Price: low to high",
		value: "price-asc"
	},
	{
		label: "Price: high to low",
		value: "price-desc"
	},
	{
		label: "Newest model year",
		value: "year-desc"
	},
	{
		label: "Lowest mileage",
		value: "mileage-asc"
	}
];
var FILTER_QUERY_KEYS = [
	"q",
	"make",
	"model",
	"condition",
	"minPrice",
	"maxPrice",
	"minYear",
	"maxYear",
	"bodyType",
	"transmission",
	"fuelType",
	"minMileage",
	"maxMileage",
	"exteriorColor",
	"drivetrain",
	"sort",
	"page",
	"perPage"
];
function createDefaultFilters(overrides = {}) {
	return {
		sort: DEFAULT_SORT,
		page: 1,
		perPage: DEFAULT_PER_PAGE,
		...overrides
	};
}
function readQueryValue(query, key) {
	const value = query[key];
	const first = Array.isArray(value) ? value[0] : value;
	if (typeof first !== "string") return void 0;
	const trimmed = first.trim();
	return trimmed.length > 0 ? trimmed : void 0;
}
function readNumber(query, key, options = {}) {
	const raw = readQueryValue(query, key);
	if (raw === void 0) return void 0;
	const parsed = Number(raw);
	if (!Number.isFinite(parsed)) return void 0;
	if (options.min !== void 0 && parsed < options.min) return options.min;
	if (options.max !== void 0 && parsed > options.max) return options.max;
	return Math.round(parsed);
}
function readEnum(query, key, allowed) {
	const raw = readQueryValue(query, key);
	if (!raw) return void 0;
	return allowed.find((value) => value.toLowerCase() === raw.toLowerCase());
}
/**
* Parses a Nuxt route query object into typed filters. Invalid values are
* ignored rather than thrown, so shared links never crash the inventory page.
*/
function parseVehicleFilters(query, defaults = {}) {
	const source = query instanceof URLSearchParams ? Object.fromEntries(query.entries()) : query;
	const filters = createDefaultFilters(defaults);
	const q = readQueryValue(source, "q");
	if (q) filters.q = q;
	const make = readQueryValue(source, "make");
	if (make) filters.make = make;
	const model = readQueryValue(source, "model");
	if (model) filters.model = model;
	const condition = readEnum(source, "condition", VEHICLE_CONDITIONS);
	if (condition) filters.condition = condition;
	const minPrice = readNumber(source, "minPrice", { min: 0 });
	if (minPrice !== void 0) filters.minPrice = minPrice;
	const maxPrice = readNumber(source, "maxPrice", { min: 0 });
	if (maxPrice !== void 0) filters.maxPrice = maxPrice;
	const minYear = readNumber(source, "minYear", {
		min: 1900,
		max: 2100
	});
	if (minYear !== void 0) filters.minYear = minYear;
	const maxYear = readNumber(source, "maxYear", {
		min: 1900,
		max: 2100
	});
	if (maxYear !== void 0) filters.maxYear = maxYear;
	const bodyType = readEnum(source, "bodyType", VEHICLE_BODY_TYPES);
	if (bodyType) filters.bodyType = bodyType;
	const transmission = readEnum(source, "transmission", VEHICLE_TRANSMISSIONS);
	if (transmission) filters.transmission = transmission;
	const fuelType = readEnum(source, "fuelType", VEHICLE_FUEL_TYPES);
	if (fuelType) filters.fuelType = fuelType;
	const minMileage = readNumber(source, "minMileage", { min: 0 });
	if (minMileage !== void 0) filters.minMileage = minMileage;
	const maxMileage = readNumber(source, "maxMileage", { min: 0 });
	if (maxMileage !== void 0) filters.maxMileage = maxMileage;
	const exteriorColor = readQueryValue(source, "exteriorColor");
	if (exteriorColor) filters.exteriorColor = exteriorColor;
	const drivetrain = readEnum(source, "drivetrain", VEHICLE_DRIVETRAINS);
	if (drivetrain) filters.drivetrain = drivetrain;
	const sort = readEnum(source, "sort", VEHICLE_SORT_KEYS);
	if (sort) filters.sort = sort;
	const page = readNumber(source, "page", {
		min: 1,
		max: 9999
	});
	if (page !== void 0) filters.page = page;
	const perPage = readNumber(source, "perPage", {
		min: 1,
		max: 48
	});
	if (perPage !== void 0) filters.perPage = perPage;
	return filters;
}
/**
* Serializes only meaningful filters so default inventory URLs stay clean.
*/
function serializeVehicleFilters(filters) {
	const query = {};
	const defaults = createDefaultFilters();
	for (const key of FILTER_QUERY_KEYS) {
		const value = filters[key];
		if (value === void 0 || value === null || value === "") continue;
		if (key === "page" && value === 1) continue;
		if (key === "perPage" && value === defaults.perPage) continue;
		if (key === "sort" && value === defaults.sort) continue;
		query[key] = String(value);
	}
	return query;
}
function matchesText(vehicle, query) {
	const haystack = [
		vehicle.make,
		vehicle.model,
		vehicle.trim,
		String(vehicle.year),
		vehicle.bodyType,
		vehicle.fuelType,
		vehicle.transmission,
		vehicle.exteriorColor,
		vehicle.interiorColor,
		vehicle.stockNumber,
		vehicle.engine,
		vehicle.condition === "new" ? "new" : "used pre-owned",
		vehicle.status
	].filter(Boolean).join(" ").toLowerCase();
	return query.toLowerCase().split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}
function matchesVehicle(vehicle, filters) {
	if (filters.q && !matchesText(vehicle, filters.q)) return false;
	if (filters.make && vehicle.make.toLowerCase() !== filters.make.toLowerCase()) return false;
	if (filters.model && vehicle.model.toLowerCase() !== filters.model.toLowerCase()) return false;
	if (filters.condition && vehicle.condition !== filters.condition) return false;
	if (filters.bodyType && vehicle.bodyType !== filters.bodyType) return false;
	if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
	if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
	if (filters.drivetrain && vehicle.drivetrain !== filters.drivetrain) return false;
	if (filters.exteriorColor && vehicle.exteriorColor?.toLowerCase() !== filters.exteriorColor.toLowerCase()) return false;
	if (filters.minPrice !== void 0 && vehicle.price < filters.minPrice) return false;
	if (filters.maxPrice !== void 0 && vehicle.price > filters.maxPrice) return false;
	if (filters.minYear !== void 0 && vehicle.year < filters.minYear) return false;
	if (filters.maxYear !== void 0 && vehicle.year > filters.maxYear) return false;
	if (filters.minMileage !== void 0 || filters.maxMileage !== void 0) {
		if (vehicle.mileage === void 0) return false;
		if (filters.minMileage !== void 0 && vehicle.mileage < filters.minMileage) return false;
		if (filters.maxMileage !== void 0 && vehicle.mileage > filters.maxMileage) return false;
	}
	return true;
}
function statusRank(vehicle) {
	switch (vehicle.status) {
		case "available": return 0;
		case "reserved": return 1;
		default: return 2;
	}
}
function sortVehicles(vehicles, sort) {
	const copy = [...vehicles];
	switch (sort) {
		case "newest": return copy.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
		case "price-asc": return copy.sort((a, b) => a.price - b.price);
		case "price-desc": return copy.sort((a, b) => b.price - a.price);
		case "year-desc": return copy.sort((a, b) => b.year - a.year || a.price - b.price);
		case "mileage-asc": return copy.sort((a, b) => {
			if (a.mileage === void 0 && b.mileage === void 0) return 0;
			if (a.mileage === void 0) return 1;
			if (b.mileage === void 0) return -1;
			return a.mileage - b.mileage;
		});
		default: return copy.sort((a, b) => {
			if (a.featured !== b.featured) return a.featured ? -1 : 1;
			const statusDifference = statusRank(a) - statusRank(b);
			if (statusDifference !== 0) return statusDifference;
			return Date.parse(b.createdAt) - Date.parse(a.createdAt);
		});
	}
}
/**
* Pure search implementation used by the mock repository. A future server
* repository can apply the same filter contract against the database.
*/
function searchVehicles(vehicles, filters) {
	const sorted = sortVehicles(vehicles.filter((vehicle) => matchesVehicle(vehicle, filters)), filters.sort);
	const perPage = Math.max(1, filters.perPage);
	const pageCount = Math.max(1, Math.ceil(sorted.length / perPage));
	const page = Math.min(Math.max(1, filters.page), pageCount);
	const start = (page - 1) * perPage;
	return {
		items: sorted.slice(start, start + perPage),
		total: sorted.length,
		page,
		perPage,
		pageCount,
		filters: {
			...filters,
			page
		}
	};
}
function getActiveFilterChips(filters) {
	const chips = [];
	if (filters.q) chips.push({
		key: "q",
		label: "Search",
		value: filters.q,
		clearKeys: ["q"]
	});
	if (filters.make) chips.push({
		key: "make",
		label: "Make",
		value: filters.make,
		clearKeys: ["make", "model"]
	});
	if (filters.model) chips.push({
		key: "model",
		label: "Model",
		value: filters.model,
		clearKeys: ["model"]
	});
	if (filters.condition) chips.push({
		key: "condition",
		label: "Condition",
		value: conditionLabel(filters.condition),
		clearKeys: ["condition"]
	});
	if (filters.minPrice !== void 0 || filters.maxPrice !== void 0) {
		const value = filters.minPrice !== void 0 && filters.maxPrice !== void 0 ? `${formatNaira(filters.minPrice)} – ${formatNaira(filters.maxPrice)}` : filters.minPrice !== void 0 ? `From ${formatNaira(filters.minPrice)}` : `Up to ${formatNaira(filters.maxPrice)}`;
		chips.push({
			key: "priceRange",
			label: "Price",
			value,
			clearKeys: ["minPrice", "maxPrice"]
		});
	}
	if (filters.minYear !== void 0 || filters.maxYear !== void 0) {
		const value = filters.minYear !== void 0 && filters.maxYear !== void 0 ? `${filters.minYear} – ${filters.maxYear}` : filters.minYear !== void 0 ? `From ${filters.minYear}` : `Up to ${filters.maxYear}`;
		chips.push({
			key: "yearRange",
			label: "Year",
			value,
			clearKeys: ["minYear", "maxYear"]
		});
	}
	if (filters.bodyType) chips.push({
		key: "bodyType",
		label: "Body style",
		value: filters.bodyType,
		clearKeys: ["bodyType"]
	});
	if (filters.transmission) chips.push({
		key: "transmission",
		label: "Transmission",
		value: filters.transmission,
		clearKeys: ["transmission"]
	});
	if (filters.fuelType) chips.push({
		key: "fuelType",
		label: "Fuel",
		value: filters.fuelType,
		clearKeys: ["fuelType"]
	});
	if (filters.minMileage !== void 0 || filters.maxMileage !== void 0) {
		const value = filters.minMileage !== void 0 && filters.maxMileage !== void 0 ? `${formatMileage(filters.minMileage)} – ${formatMileage(filters.maxMileage)}` : filters.minMileage !== void 0 ? `From ${formatMileage(filters.minMileage)}` : `Up to ${formatMileage(filters.maxMileage)}`;
		chips.push({
			key: "mileageRange",
			label: "Mileage",
			value,
			clearKeys: ["minMileage", "maxMileage"]
		});
	}
	if (filters.exteriorColor) chips.push({
		key: "exteriorColor",
		label: "Colour",
		value: filters.exteriorColor,
		clearKeys: ["exteriorColor"]
	});
	if (filters.drivetrain) chips.push({
		key: "drivetrain",
		label: "Drivetrain",
		value: filters.drivetrain,
		clearKeys: ["drivetrain"]
	});
	return chips;
}
function clearFilterKeys(filters, keys) {
	const next = {
		...filters,
		page: 1
	};
	for (const key of keys) {
		if (key === "sort" || key === "page" || key === "perPage") continue;
		Reflect.deleteProperty(next, key);
	}
	return next;
}
function uniqueSorted(values) {
	return [...new Set(values.filter((value) => Boolean(value)))].sort((a, b) => a.localeCompare(b, "en"));
}
function getFilterFacets(vehicles) {
	return {
		makes: uniqueSorted(vehicles.map((vehicle) => vehicle.make)),
		models: uniqueSorted(vehicles.map((vehicle) => vehicle.model)),
		bodyTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.bodyType)),
		transmissions: uniqueSorted(vehicles.map((vehicle) => vehicle.transmission)),
		fuelTypes: uniqueSorted(vehicles.map((vehicle) => vehicle.fuelType)),
		drivetrains: uniqueSorted(vehicles.map((vehicle) => vehicle.drivetrain)),
		colors: uniqueSorted(vehicles.map((vehicle) => vehicle.exteriorColor))
	};
}
function getModelOptionsForMake(vehicles, make) {
	return uniqueSorted((make ? vehicles.filter((vehicle) => vehicle.make.toLowerCase() === make.toLowerCase()) : vehicles).map((vehicle) => vehicle.model));
}
function describeResultCount(total) {
	if (total === 0) return "No vehicles";
	if (total === 1) return "1 vehicle";
	return `${formatNumber(total)} vehicles`;
}
// app/repositories/mockVehicleRepository.ts
/**
* Phase 1 repository. The demo array is imported here and nowhere else in the
* UI, keeping a single seam for the Phase 2 API implementation.
*/
var MockVehicleRepository = class {
	inventory;
	constructor(inventory) {
		this.inventory = inventory;
	}
	async getAll() {
		return [...this.inventory];
	}
	async getBySlug(slug) {
		return this.inventory.find((vehicle) => vehicle.slug === slug) ?? null;
	}
	async search(filters) {
		return searchVehicles(this.inventory, filters);
	}
	async getRelated(slug, limit = 3) {
		const current = this.inventory.find((vehicle) => vehicle.slug === slug);
		if (!current) return [];
		return this.inventory.filter((vehicle) => vehicle.slug !== slug).map((vehicle) => {
			let score = 0;
			if (vehicle.make === current.make) score += 4;
			if (vehicle.bodyType && vehicle.bodyType === current.bodyType) score += 3;
			if (vehicle.condition === current.condition) score += 1;
			if (vehicle.status === "available") score += 3;
			if (current.price > 0) {
				const priceDifference = Math.abs(vehicle.price - current.price) / current.price;
				if (priceDifference <= .25) score += 3;
				else if (priceDifference <= .5) score += 1;
			}
			return {
				vehicle,
				score
			};
		}).sort((a, b) => b.score - a.score || b.vehicle.year - a.vehicle.year).slice(0, limit).map((entry) => entry.vehicle);
	}
};
// app/repositories/vehicleRepository.ts
/**
* The active repository. Swap this single binding for an API-backed
* implementation during Phase 2.
*/
var vehicleRepository = new MockVehicleRepository(vehicles);
// app/composables/useVehicles.ts
/**
* Returns the configured inventory repository. Phase 2 only needs to change the
* binding in `repositories/vehicleRepository.ts`.
*/
function useVehicleRepository() {
	return vehicleRepository;
}
/**
* SSR-friendly inventory loader. Called once per page so the payload is shared
* across homepage sections without repeatedly fetching the same data.
*/
function useVehicles() {
	const repository = useVehicleRepository();
	const { data, pending, error, refresh, status } = useAsyncData("vehicle-inventory", () => repository.getAll(), { default: () => [] });
	const vehicles = computed(() => data.value ?? []);
	return {
		vehicles,
		availableVehicles: computed(() => vehicles.value.filter((vehicle) => vehicle.status === "available")),
		featuredVehicles: computed(() => vehicles.value.filter((vehicle) => vehicle.featured && vehicle.status === "available").sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))),
		newArrivals: computed(() => [...vehicles.value].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))),
		pending,
		error,
		refresh,
		status
	};
}
function useVehicle(slug) {
	const repository = useVehicleRepository();
	return useAsyncData(`vehicle-${slug}`, () => repository.getBySlug(slug), { default: () => null });
}

export { SORT_OPTIONS as S, VEHICLE_BODY_TYPES as V, useVehicles as a, getActiveFilterChips as b, createDefaultFilters as c, describeResultCount as d, clearFilterKeys as e, getModelOptionsForMake as f, getFilterFacets as g, VEHICLE_TRANSMISSIONS as h, VEHICLE_FUEL_TYPES as i, VEHICLE_DRIVETRAINS as j, serializeVehicleFilters as k, uniqueSorted as l, parseVehicleFilters as p, searchVehicles as s, useVehicle as u, vehicleRepository as v };
//# sourceMappingURL=useVehicles-DCwHuUps.mjs.map
