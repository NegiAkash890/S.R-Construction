
const projects = [
    {
        clientName: "L&T Construction",
        title: "Talcher Fertilizer Facility Construction",
        location: ["Talcher Fertilizer, Angul, Odisha"],
        workDescription: "Fire and Steel Door, Aluminium door and window, Rolling Shutter, False ceiling, Epoxy Coating, False Flooring, IPS Flooring, Underdeck Insulation Glass Partition",
        startDate: "2024-05-01",
        status: "in-progress",
        workValue: 46821895,
        category: "industrial",
        isFeatured: true
    },
    {
        clientName: "Stelmec Limited",
        title: "Talcher Fertilizer Infrastructure",
        location: ["Talcher Fertilizer, Angul, Odisha"],
        workDescription: "Fire And Steel Door, Aluminium Door And Window, False Ceiling, Tiles, Kota Stone, Granite, Epoxy, Waterproofing, Rolling Shutter",
        startDate: "2024-07-01",
        status: "in-progress",
        workValue: 35947222,
        category: "industrial"
    },
    {
        clientName: "Tata Projects Ltd",
        title: "NTECL Vallur Plant Works",
        location: ["NTECL Vallur, Chennai"],
        workDescription: "Fire And Steel Door, Aluminium Door And Window, False Ceiling, Underdeck Insulation, Ips Flooring, Roof treatment, Acid Resistance Tiles, Epoxy Coating, Rolling Shutter, Injection Grouting",
        startDate: "2024-01-01",
        status: "in-progress",
        workValue: 58422874,
        category: "industrial"
    },
    {
        clientName: "Thermax Limited",
        title: "NTPC Rihand Infrastructure Upgrade",
        location: ["NTPC Rihand, Sonbhadra"],
        workDescription: "Waterproofing, IPS Flooring, Underdeck insulation, False Ceiling, Tiles, Kota Stone, Granite, Steel Window, Plumbing and Sanitary Work",
        startDate: "2025-05-01",
        status: "in-progress",
        workValue: 18975117,
        category: "industrial"
    },
    {
        clientName: "L&T Hydrocarbon",
        title: "Panipat Refinery Finishing Works",
        location: ["Panipat Refinery, Haryana"],
        workDescription: "False Ceiling, Building painting",
        startDate: "2025-05-01",
        status: "in-progress",
        workValue: 5220508,
        category: "industrial"
    },
    {
        clientName: "Tata Projects Ltd",
        title: "NTPC Kaniha Building Works",
        location: ["NTPC Kaniha, Angul (Odisha)"],
        workDescription: "Fire And Steel Door, Aluminium Door And Window, False Ceiling, Underdeck insulation, Rolling Shutter, Kota Stone, Granite, IPS Flooring",
        startDate: "2024-01-01",
        status: "in-progress",
        workValue: 30987444,
        category: "industrial"
    },
    {
        clientName: "Thyssenkrupp Industries India Pvt Ltd",
        title: "Talcher Fertilizer Insulation Works",
        location: ["Talcher Fertilizer, Angul, Odisha"],
        workDescription: "False Ceiling and Underdeck Insulation",
        startDate: "2025-06-01",
        status: "in-progress",
        workValue: 8440632,
        category: "industrial"
    },
    {
        clientName: "Thermax Limited",
        title: "Tata Power Prayagraj Doors & Windows",
        location: ["Tata Power, Prayagraj"],
        workDescription: "Fire And Steel Door, Aluminium Door And Window, Partition, Rolling Shutter, Monorail Door And Steel Window",
        startDate: "2024-10-01",
        status: "in-progress",
        workValue: 17675236,
        category: "industrial"
    },
    {
        clientName: "Rohan Builders",
        title: "Adani Power Ceiling Works",
        location: ["Adani Power, Korba"],
        workDescription: "False Ceiling Work",
        startDate: "2025-01-01",
        status: "in-progress",
        workValue: 3265985,
        category: "industrial"
    },
    {
        clientName: "KEC Company",
        title: "BALCO Korba Ceiling Works",
        location: ["BALCO Korba"],
        workDescription: "False Ceiling Work",
        startDate: "2025-03-01",
        status: "in-progress",
        workValue: 3265985,
        category: "industrial"
    },
    {
        clientName: "L&T Construction",
        title: "ETP NRL Refinery Works",
        location: ["ETP –NRL Refinery Assam"],
        workDescription: "Fire and Steel Door, Aluminium Door, window & Ventilators, and Rolling Shutter, False Ceiling",
        startDate: "2025-03-01",
        status: "in-progress",
        workValue: 1814399,
        category: "industrial"
    },
    {
        clientName: "Tata Projects Limited",
        title: "Tata Power Mundra Finishing",
        location: ["Tata Power- Mundra"],
        workDescription: "Acid Resistance Tiles, Painting, Fire and Steel Door, False Ceiling",
        startDate: "2025-04-01",
        status: "in-progress",
        workValue: 6977096,
        category: "industrial"
    },
    {
        clientName: "Mata Janki Concrete Pvt Ltd",
        title: "NTPC Talcher Insulation",
        location: ["NTPC Talcher"],
        workDescription: "False Ceiling and Underdeck Insulation",
        startDate: "2025-08-01",
        status: "in-progress",
        workValue: 3185633,
        category: "industrial"
    },
    {
        clientName: "KCPL",
        title: "NTPC Talcher Shutter & Windows",
        location: ["NTPC Talcher"],
        workDescription: "Rolling Shutter, Aluminium Door And Window",
        startDate: "2025-10-01",
        status: "in-progress",
        workValue: 2785777,
        category: "industrial"
    }
];

// Helper formatting: Add deterministic IDs
const docs = projects.map((p, index) => ({
    _id: `project-ongoing-${index + 1}`,
    _type: 'project',
    ...p,
    description: p.workDescription.substring(0, 150) + (p.workDescription.length > 150 ? '...' : '')
}));

console.log(JSON.stringify(docs, null, 2));
