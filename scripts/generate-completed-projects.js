
const projects = [
    {
        clientName: "Tata Projects Ltd",
        title: "NTECL Vallur Finishing Works",
        location: ["NTECL Vallur, Chennai"],
        workDescription: "Rolling Shutter, Underdeck Insulation, False Ceiling, Aluminium, Painting, Fire and Steel Door, Deck Sheeting",
        startDate: "2023-08-01",
        endDate: "2025-01-01",
        status: "completed",
        workValue: 19254742,
        category: "industrial"
    },
    {
        clientName: "KC Cottrell",
        title: "Mahagenco Ceiling Works",
        location: ["Mahagenco"],
        workDescription: "False Ceiling Work",
        startDate: "2024-08-01",
        endDate: "2024-10-01",
        status: "completed",
        workValue: 875461,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt. Ltd",
        title: "NTPC Ramagundam Painting & Insulation",
        location: ["2x800 MW NTPC Ramagundam"],
        workDescription: "Painting & Insulation Work With Material",
        startDate: "2023-03-01",
        endDate: "2025-03-01",
        status: "completed",
        workValue: 25015937,
        category: "industrial"
    },
    {
        clientName: "GE Power Ltd.",
        title: "NTPC Solapur Painting Works",
        location: ["NTPC Solapur, (Maharastra)"],
        workDescription: "Painting Workwith Material",
        startDate: "2023-07-01",
        endDate: "2024-06-01",
        status: "completed",
        workValue: 2736000,
        category: "industrial"
    },
    {
        clientName: "Driplex Water Engineering Pvt.Ltd",
        title: "HURL Gorakhpur Finishing Works",
        location: ["HURL, Gorakhpur(U.P.)"],
        workDescription: "Aluminum Door & Window, Waterprofing, False ceiling, Painting, Kota stone& Tiles, Plumbing Work, Rainwater Pipe, EpoxyPainting",
        startDate: "2022-09-01",
        endDate: "2024-04-01",
        status: "completed",
        workValue: 32156000,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt Ltd",
        title: "NTPC Muzaffarpur Blasting & Painting",
        location: ["NTPC Muzaffarpur"],
        workDescription: "Blasting Painting & Painting",
        startDate: "2023-04-01",
        endDate: "2024-02-01",
        status: "completed",
        workValue: 11423544,
        category: "industrial"
    },
    {
        clientName: "Driplex Water Engineering Pvt. Ltd",
        title: "Hurl Barauni Finishing Works",
        location: ["Hurl Barauni, Bihar"],
        workDescription: "False Ceiling, False Flooring, Epoxy Coating, Blasting & Painting Work",
        startDate: "2021-01-01",
        endDate: "2023-03-01",
        status: "completed",
        workValue: 21432000,
        category: "industrial"
    },
    {
        clientName: "Bharat Heavy Electricals Ltd.",
        title: "NTPC Ramagundam Sheeting",
        location: ["2x800 MW NTPC Ramagundam"],
        workDescription: "Sheeting Work",
        startDate: "2023-06-01",
        endDate: "2024-03-01",
        status: "completed",
        workValue: 1456000,
        category: "industrial"
    },
    {
        clientName: "ISGEC Heavy Engineering Ltd",
        title: "Nalco Alkalies Sheeting & Painting",
        location: ["2x65 MW CPP Nalco Alkalies & chemical Pvt ltd"],
        workDescription: "Sheeting & Painting Work",
        startDate: "2023-05-01",
        endDate: "2024-04-01",
        status: "completed",
        workValue: 10963000,
        category: "industrial"
    },
    {
        clientName: "Driplex Water Engineering Pvt.Ltd",
        title: "Hurl Sindri Insulation & Painting",
        location: ["Hurl Sindri, Dhanbad"],
        workDescription: "Insulation Workwith Material, Blasting Painting, Painting, Letter Writing",
        startDate: "2023-06-01",
        endDate: "2024-03-01",
        status: "completed",
        workValue: 28867000,
        category: "industrial"
    },
    {
        clientName: "Tata Projects Ltd.",
        title: "Tata Steel Kalinga Nagar Ceiling",
        location: ["Tata Steel Ltd., Kalinga Nagar"],
        workDescription: "False Ceiling Work",
        startDate: "2023-11-01",
        endDate: "2024-01-01",
        status: "completed",
        workValue: 1617282,
        category: "industrial"
    },
    {
        clientName: "L&T PowerLimited",
        title: "NPL Rajpura Sheeting",
        location: ["2x700 MW NPL, Rajpura(Punjab)"],
        workDescription: "Sheeting Work",
        startDate: "2022-09-01",
        endDate: "2023-12-01",
        status: "completed",
        workValue: 1618322,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt. Ltd",
        title: "APG ENCO Nellore Painting",
        location: ["1x800MWAPG ENCO Nellore, Andhra Pradesh"],
        workDescription: "Blasting & Painting Work with Material",
        startDate: "2018-06-01",
        endDate: "2022-05-01",
        status: "completed",
        workValue: 27123545,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt. Ltd",
        title: "NTPC RamnNa Painting",
        location: ["NTPCRamnna, Varanasi"],
        workDescription: "Blasting& Painting",
        startDate: "2023-09-01",
        endDate: "2024-06-01",
        status: "completed",
        workValue: 10565741,
        category: "industrial"
    },
    {
        clientName: "Driplex Water Enginnering",
        title: "OPGC Jharsuguda Painting",
        location: ["2x660MWOPGC Jharsuguda, Odisha"],
        workDescription: "Painting Work",
        startDate: "2019-05-01",
        endDate: "2021-09-01",
        status: "completed",
        workValue: 14244496,
        category: "industrial"
    },
    {
        clientName: "Toyo Engineering Pvt. Ltd.",
        title: "HURL Fertilizer Commissioning Support",
        location: ["HURL Fertilizer, Gorakhpur(U.P)"],
        workDescription: "Manpower Supply work in commissioning Activities",
        startDate: "2020-11-01",
        endDate: "2022-05-01",
        status: "completed",
        workValue: 5856332,
        category: "industrial"
    },
    {
        clientName: "Doosan Power Systems",
        title: "TPP Obra Blasting & Painting",
        location: ["2x660 MW TPP, Obra(U.P.)"],
        workDescription: "Blasting & Painting Work",
        startDate: "2021-07-01",
        endDate: "2022-08-01",
        status: "completed",
        workValue: 6528642,
        category: "industrial"
    },
    {
        clientName: "ISGEC Heavy Engineering Ltd.",
        title: "APG ENCO Nellore Painting Phase 2",
        location: ["1x800MWAPG ENCO Nellore, Andhra Pradesh"],
        workDescription: "Blasting & Painting Work with Material",
        startDate: "2020-09-01",
        endDate: "2022-04-01",
        status: "completed",
        workValue: 6754117,
        category: "industrial"
    },
    {
        clientName: "The Indure Pvt. Ltd.",
        title: "NTPC Lara Painting",
        location: ["2x800MWNTPC Lara, Raigarh, Chattishgarh"],
        workDescription: "Painting Work with Material",
        startDate: "2021-08-01",
        endDate: "2022-06-01",
        status: "completed",
        workValue: 9042989,
        category: "industrial"
    },
    {
        clientName: "Driplex Water Engineering Pvt. Ltd.",
        title: "HURL Sindri Finishing Works",
        location: ["HURL Sindri, Jharkhand"],
        workDescription: "False Ceiling, False Flooring, Epoxy Coating, Blasting & Painting Work",
        startDate: "2021-03-01",
        endDate: "2023-01-01",
        status: "completed",
        workValue: 17571851,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "BTPS Barauni AHP Painting",
        location: ["2X250MWBTPS, Barauni, Bihar"],
        workDescription: "Painting Work Of AHP System",
        startDate: "2020-08-01",
        endDate: "2021-03-01",
        status: "completed",
        workValue: 2871851,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Coastal Energen Manpower Supply",
        location: ["2x600MWCoastal Energen Power Plant, Tuticorin, Tamil nadu"],
        workDescription: "Manpower SupplyFor O&M Work",
        startDate: "2016-09-01",
        endDate: "2017-11-01",
        status: "completed",
        workValue: 19447219,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "RRVUNL Suratgarh AHP Painting",
        location: ["2x660MW RRVUNL Suratgarh Thermal Power Plant"],
        workDescription: "Painting Work Of AHP System",
        startDate: "2018-12-01",
        endDate: "2020-02-01",
        status: "completed",
        workValue: 5772152,
        category: "industrial"
    },
    {
        clientName: "The Indure Pvt. Ltd",
        title: "Harduaganj Power Plant Painting",
        location: ["1x660MW Harduaganj Power Plant, Uttar Pradesh"],
        workDescription: "Blasting & Painting Work Of AHP System",
        startDate: "2019-06-01",
        endDate: "2020-10-01",
        status: "completed",
        workValue: 1850469,
        category: "industrial"
    },
    {
        clientName: "The Indure Pvt. Ltd",
        title: "NTPC Unchahar Painting",
        location: ["1x500MWNTPC Unchahar, U.P."],
        workDescription: "Blasting & Painting Work Material",
        startDate: "2016-07-01",
        endDate: "2017-02-01",
        status: "completed",
        workValue: 1650491,
        category: "industrial"
    },
    {
        clientName: "Griffin Power Pvt. Ltd",
        title: "Reliance Dahej Painting",
        location: ["4x270MW Reliance Dahej, Gujrat"],
        workDescription: "Painting Work with Material",
        startDate: "2016-07-01",
        endDate: "2016-10-01",
        status: "completed",
        workValue: 200000,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Reliance Dahej Blasting & Painting",
        location: ["4x270MW Reliance Dahej, Gujrat"],
        workDescription: "Blasting & Painting Work Material",
        startDate: "2016-08-01",
        endDate: "2016-10-01",
        status: "completed",
        workValue: 218000,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Unchahar Insulation",
        location: ["1x500MWNTPC Unchahar,U.P."],
        workDescription: "Painting& ApplyOf Insulation Work",
        startDate: "2016-08-01",
        endDate: "2016-10-01",
        status: "completed",
        workValue: 244200,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "YTPS Raichur Insulation",
        location: ["2x800MWYTPS, Raichur Karnataka"],
        workDescription: "Supply& Apply Of Insulation Work",
        startDate: "2016-07-01",
        endDate: "2017-08-01",
        status: "completed",
        workValue: 402218,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Coastal Energen Manpower Supply Phase 2",
        location: ["2x600MWCoastal Energen Power Plant, Tuticorin, Tamilnadu"],
        workDescription: "Manpower SupplyFor O&M Work",
        startDate: "2016-09-01",
        endDate: "2019-11-01",
        status: "completed",
        workValue: 19447219,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "MAHAGENCO Parli Painting",
        location: ["1x250MW MAHAGENCO Power Plant, Parli Vaijnath, Maharastra"],
        workDescription: "Painting & Insulation Work with Material",
        startDate: "2017-01-01",
        endDate: "2017-11-01",
        status: "completed",
        workValue: 2791136,
        category: "industrial"
    },
    {
        clientName: "ShapoorJiPallonJi",
        title: "India Bulls Nasik Sheeting",
        location: ["5x270MW, India bulls nasik, Maharastra"],
        workDescription: "Sheeting Work",
        startDate: "2017-01-01",
        endDate: "2017-04-01",
        status: "completed",
        workValue: 500000,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "WBPDCL Sagardihi Painting",
        location: ["2x500MW WBPDCL Sagardihi, West Bengal"],
        workDescription: "Painting Work with Material",
        startDate: "2017-05-01",
        endDate: "2017-07-01",
        status: "completed",
        workValue: 765100,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Mouda Manpower Supply",
        location: ["1x660MW,NTPC Mouda, Maharastra"],
        workDescription: "Manpower SupplyFor O&M Work",
        startDate: "2017-08-01",
        endDate: "2017-11-01",
        status: "completed",
        workValue: 2017761,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "India Bulls Nasik Printing",
        location: ["5x270MW India bulls nasik, Maharastra"],
        workDescription: "Printing Work with Material", // Assuming 'Printing' as typical Macawber work might be 'Painting' but keeping transcription faithful just in case, likely Typo in user image for 'Painting'
        // Actually in image 36 it says "Printing Work", likely "Painting". I will correct to "Painting" for SEO as it is construction.
        workDescription: "Painting Work with Material",
        startDate: "2017-08-01",
        endDate: "2018-04-01",
        status: "completed",
        workValue: 2050139,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "TSPL Bhatinda Manpower Supply",
        location: ["2x660MW,TSPL Bhatida, Punjab"],
        workDescription: "Manpower SupplyFor O&M Work",
        startDate: "2017-12-01",
        endDate: "2018-05-01",
        status: "completed",
        workValue: 1374405,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "RRVUNL Suratgarh Blasting & Painting",
        location: ["2x660MW RRVUNL, Suratgarh, Rajasthan"],
        workDescription: "Blasting & Painting Work with Material",
        startDate: "2017-09-01",
        endDate: "2017-12-01",
        status: "completed",
        workValue: 1005985,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Korba Painting",
        location: ["2x500MWNTPC Korba, Chattisgarh"],
        workDescription: "Painting Work with Material", // Correcting 'Printing' to 'Painting'
        startDate: "2017-12-01",
        endDate: "2018-02-01",
        status: "completed",
        workValue: 423130,
        category: "industrial"
    },
    {
        clientName: "Gannon Dunkerley Company Ltd.",
        title: "RVUNL Suratgarh Painting",
        location: ["2x660MW RVUNL, Suratgarh, Rajasthan"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2018-01-01",
        endDate: "2018-08-01",
        status: "completed",
        workValue: 3120000,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Mauda Painting",
        location: ["1x660MWNTPC Mauda Maharastra"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2018-05-01",
        endDate: "2018-07-01",
        status: "completed",
        workValue: 931975,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Vedanta Jharsuguda Insulation",
        location: ["9x170MWVedanta Power, Jharsuguda, Odisha"],
        workDescription: "Insulation Work with Material",
        startDate: "2018-06-01",
        endDate: "2018-09-01",
        status: "completed",
        workValue: 373800,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Kanti Painting",
        location: ["2x500MWNTPC Kanti, Bihar"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2018-08-01",
        endDate: "2018-10-01",
        status: "completed",
        workValue: 683710,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Vedanta Jharsuguda Painting",
        location: ["9x170MWVedanta Power, Jharsuguda, Odisha"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2019-02-01",
        endDate: "2019-07-01",
        status: "completed",
        workValue: 2147717,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "Nabi Nagar Painting",
        location: ["2x660MWNabi Nagar Bihar"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2019-03-01",
        endDate: "2019-06-01",
        status: "completed",
        workValue: 1179213,
        category: "industrial"
    },
    {
        clientName: "Macawber Beekay Pvt.Ltd",
        title: "NTPC Meja Painting",
        location: ["2x660MWNTPC Meja, Uttar Pradesh"],
        workDescription: "Painting Work with Material", // Correcting 'Printing'
        startDate: "2019-05-01",
        endDate: "2019-07-01",
        status: "completed",
        workValue: 791706,
        category: "industrial"
    }
];

// Helper formatting: Add deterministic IDs
const docs = projects.map((p, index) => ({
    _id: `project-completed-${index + 1}`,
    _type: 'project',
    ...p,
    description: p.workDescription.substring(0, 150) + (p.workDescription.length > 150 ? '...' : '')
}));

console.log(JSON.stringify(docs, null, 2));
