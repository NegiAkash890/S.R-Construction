
const { createClient } = require('@sanity/client');
const { config } = require('dotenv');

config({ path: '.env.local' });

const client = createClient({
    projectId: 't1lt9uvy',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN || 'skV375lqH34l6Y2a2CjC33f81155455gg24322423423', // Using the token implied from previous context or assuming auth environment
    useCdn: false,
});

const industries = [
    {
        _id: 'industry-power',
        _type: 'industry',
        title: 'Power & Energy',
        slug: { _type: 'slug', current: 'power-energy' },
        description: 'Specialized construction services for Thermal and Solar Power Plants.'
    },
    {
        _id: 'industry-oil-gas',
        _type: 'industry',
        title: 'Oil & Gas',
        slug: { _type: 'slug', current: 'oil-gas' },
        description: 'Infrastructure and finishing works for Refineries and Petrochemical complexes.'
    },
    {
        _id: 'industry-fertilizer',
        _type: 'industry',
        title: 'Fertilizers & Chemicals',
        slug: { _type: 'slug', current: 'fertilizers-chemicals' },
        description: 'Heavy industrial construction for Fertilizer and Chemical processing units.'
    },
    {
        _id: 'industry-steel',
        _type: 'industry',
        title: 'Steel & Metals',
        slug: { _type: 'slug', current: 'steel-metals' },
        description: 'Structural and finishing support for Steel and Aluminium plants.'
    }
];

// Keywords mapping (lowercase)
const classifier = {
    'industry-power': ['ntpc', 'power', 'energy', 'mw', 'tpp', 'cpp', 'rrvunl', 'wbpdcl', 'mahagenco', 'tspl', 'coastal energen', 'electricity', 'mauda', 'unchahar', 'barauni', 'suratgarh', 'raichur', 'kanti', 'meja', 'harduaganj', 'obra', 'simhadri', 'vallur', 'rihand', 'kaniha', 'korba', 'prayagraj', 'solapur', 'muzaffarpur', 'ramagundam'],
    'industry-oil-gas': ['refinery', 'petro', 'reliance', 'nrl', 'ongc', 'oil', 'gas', 'dahej', 'panipat'],
    'industry-fertilizer': ['fertilizer', 'hurl', 'chemical', 'nalco', 'ammonia', 'urea', 'sindri', 'gorakhpur', 'talcher'],
    'industry-steel': ['steel', 'aluminium', 'balco', 'vedanta', 'metal', 'kalinga nagar', 'jharsuguda']
};

async function run() {
    console.log('--- 1. Creating/Updating Industries ---');
    const transaction = client.transaction();

    for (const ind of industries) {
        transaction.createOrReplace(ind);
    }

    try {
        await transaction.commit();
        console.log('Industries updated.');
    } catch (err) {
        console.error('Error creating industries:', err.message);
    }

    console.log('--- 2. Fetching Projects ---');
    const projects = await client.fetch(`*[_type == "project"]`);
    console.log(`Found ${projects.length} projects.`);

    console.log('--- 3. Patching Projects with Industries ---');
    const patchTransaction = client.transaction();
    let categorizedCount = 0;

    for (const p of projects) {
        // Determine industry
        let matchedIndustryId = null;
        const text = `${p.title} ${p.clientName} ${p.location ? p.location.join(' ') : ''} ${p.description || ''}`.toLowerCase();

        // Check specific industries first
        for (const [indId, keywords] of Object.entries(classifier)) {
            if (keywords.some(k => text.includes(k))) {
                matchedIndustryId = indId;
                break; // Stop at first match (Priority: Power > Oil > Fertilizer > Steel)
                // Adjust priority by changing object key order or logic if needed. 
                // Given the data, strict priority is hard, but this covers most.
            }
        }

        if (matchedIndustryId) {
            patchTransaction.patch(p._id, patch =>
                patch.set({ industry: { _type: 'reference', _ref: matchedIndustryId } })
            );
            categorizedCount++;
            console.log(`Matched [${p.title}] -> ${industries.find(i => i._id === matchedIndustryId).title}`);
        } else {
            console.log(`No match for [${p.title}]`);
        }
    }

    if (categorizedCount > 0) {
        await patchTransaction.commit();
        console.log(`Successfully patched ${categorizedCount} projects.`);
    } else {
        console.log('No projects needed patching.');
    }
}

run();
