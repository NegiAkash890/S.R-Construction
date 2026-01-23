
const fs = require('fs');

// Keywords mapping (lowercase)
const classifier = {
    'industry-power': ['ntpc', 'power', 'energy', 'mw', 'tpp', 'cpp', 'rrvunl', 'wbpdcl', 'mahagenco', 'tspl', 'coastal energen', 'electricity', 'mauda', 'unchahar', 'barauni', 'suratgarh', 'raichur', 'kanti', 'meja', 'harduaganj', 'obra', 'simhadri', 'vallur', 'rihand', 'kaniha', 'korba', 'prayagraj', 'solapur', 'muzaffarpur', 'ramagundam'],
    'industry-oil-gas': ['refinery', 'petro', 'reliance', 'nrl', 'ongc', 'oil', 'gas', 'dahej', 'panipat'],
    'industry-fertilizer': ['fertilizer', 'hurl', 'chemical', 'nalco', 'ammonia', 'urea', 'sindri', 'gorakhpur', 'talcher'],
    'industry-steel': ['steel', 'aluminium', 'balco', 'vedanta', 'metal', 'kalinga nagar', 'jharsuguda', 'tata steel']
};

try {
    const rawStats = fs.readFileSync('projects-dump.json', 'utf8');
    // Sanity query output might be formatted nicely or invalid JSON if containing multiple lines of JSON (ndjson) depending on flags. 
    // 'sanity documents query' typically returns a standard JSON array.

    const projects = JSON.parse(rawStats);
    const patchedProjects = projects.map(p => {
        let matchedIndustryId = null;
        const text = `${p.title} ${p.clientName} ${p.location ? p.location.join(' ') : ''} ${p.workDescription || ''} ${p.description || ''}`.toLowerCase();

        for (const [indId, keywords] of Object.entries(classifier)) {
            if (keywords.some(k => text.includes(k))) {
                matchedIndustryId = indId;
                break;
            }
        }

        if (matchedIndustryId) {
            return {
                ...p,
                industry: { _type: 'reference', _ref: matchedIndustryId }
            };
        }
        // Return original if no match (or maybe assign a default?)
        // User request: "Add tags to the relevant projects".
        return p;
    });

    console.log(JSON.stringify(patchedProjects, null, 2));
} catch (err) {
    console.error('Error processing:', err);
}
