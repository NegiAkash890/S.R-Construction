
const fs = require('fs');

// Keywords mapping (lowercase)
const classifier = {
    'industry-power': ['ntpc', 'power', 'energy', 'mw', 'tpp', 'cpp', 'rrvunl', 'wbpdcl', 'mahagenco', 'tspl', 'coastal energen', 'electricity', 'mauda', 'unchahar', 'barauni', 'suratgarh', 'raichur', 'kanti', 'meja', 'harduaganj', 'obra', 'simhadri', 'vallur', 'rihand', 'kaniha', 'korba', 'prayagraj', 'solapur', 'muzaffarpur', 'ramagundam'],
    'industry-oil-gas': ['refinery', 'petro', 'reliance', 'nrl', 'ongc', 'oil', 'gas', 'dahej', 'panipat'],
    'industry-fertilizer': ['fertilizer', 'hurl', 'chemical', 'nalco', 'ammonia', 'urea', 'sindri', 'gorakhpur', 'talcher'],
    'industry-steel': ['steel', 'aluminium', 'balco', 'vedanta', 'metal', 'kalinga nagar', 'jharsuguda', 'tata steel']
};

try {
    const rawStats = fs.readFileSync('projects-dump-full.json', 'utf8');
    // Handle empty or whitespace
    if (!rawStats || rawStats.trim() === '') {
        console.log('[]');
        process.exit(0);
    }

    const projects = JSON.parse(rawStats);
    const patchedProjects = projects.map(p => {
        let matchedIndustryId = 'industry-other'; // Default
        const text = `${p.title} ${p.clientName} ${p.location ? p.location.join(' ') : ''} ${p.workDescription || ''} ${p.description || ''}`.toLowerCase();

        for (const [indId, keywords] of Object.entries(classifier)) {
            if (keywords.some(k => text.includes(k))) {
                matchedIndustryId = indId;
                break;
            }
        }

        // Return object with only _id and changes (reference)
        // Actually sanity documents create needs full docs OR we can just output full docs.
        // Simpler to output full doc with modified industry.
        return {
            ...p,
            industry: { _type: 'reference', _ref: matchedIndustryId }
        };
    });

    console.log(JSON.stringify(patchedProjects, null, 2));
} catch (err) {
    console.error('Error processing:', err);
}
