
const { createClient } = require('@sanity/client');
const { config } = require('dotenv');

config({ path: '.env.local' });

const client = createClient({
    projectId: 't1lt9uvy',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN || 'skV375lqH34l6Y2a2CjC33f81155455gg24322423423',
    useCdn: false,
});

async function run() {
    console.log('--- 1. Generating Industry Content ---');

    const industriesContent = [
        {
            _id: 'industry-power',
            _type: 'industry',
            title: 'Power & Energy',
            slug: { _type: 'slug', current: 'power-energy' },
            description: 'The Indian power sector is undergoing a significant transformation, driven by the government’s focus on renewable energy and infrastructure upgrades. With a projected CAGR of 7-8% over the next decade, we are positioned to support this growth. Our expertise covers thermal power plant maintenance, solar park infrastructure, and transmission line civil works.',
            heroSubtitle: 'Powering Progress',
            stats: [
                { label: 'CAGR (Estimated)', value: '7.5%' },
                { label: 'Projects Delivered', value: '25+' },
                { label: 'Market Share', value: 'Growing' }
            ]
        },
        {
            _id: 'industry-oil-gas',
            _type: 'industry',
            title: 'Oil & Gas',
            slug: { _type: 'slug', current: 'oil-gas' },
            description: 'India’s oil and gas demand is expected to grow at a CAGR of 4.5% till 2030. We provide critical civil and structural services for refineries, pipelines, and petrochemical complexes, ensuring safety and compliance with international standards.',
            heroSubtitle: 'Refining The Future',
            stats: [
                { label: 'Sector Growth', value: '4.5%' },
                { label: 'Key Projects', value: '15+' },
                { label: 'Safety Record', value: '100%' }
            ]
        },
        {
            _id: 'industry-fertilizer',
            _type: 'industry',
            title: 'Fertilizers & Chemicals',
            slug: { _type: 'slug', current: 'fertilizers-chemicals' },
            description: 'The fertilizer industry is crucial for India’s food security, growing at a CAGR of 11.9%. We specialize in plant modernization, storage silo construction, and corrosion-resistant infrastructure for chemical handling.',
            heroSubtitle: 'Cultivating Growth',
            stats: [
                { label: 'Industry CAGR', value: '11.9%' },
                { label: 'Plants Served', value: '10+' },
                { label: 'Capacity Added', value: 'High' }
            ]
        },
        {
            _id: 'industry-steel',
            _type: 'industry',
            title: 'Steel & Metals',
            slug: { _type: 'slug', current: 'steel-metals' },
            description: 'With the National Steel Policy aiming for 300 MT capacity by 2030, the steel sector is booming. Our services range from blast furnace civil works to heavy industrial flooring and structural fabrication.',
            heroSubtitle: 'Forging Strength',
            stats: [
                { label: 'Capacity Target', value: '300 MT' },
                { label: 'Projects executed', value: '12+' },
                { label: 'Reliability', value: 'High' }
            ]
        },
        {
            _id: 'industry-other',
            _type: 'industry',
            title: 'Other Infrastructure',
            slug: { _type: 'slug', current: 'other-infrastructure' },
            description: 'Beyond our core sectors, we deliver excellence in general infrastructure, commercial buildings, and specialized civil engineering projects tailored to unique client needs.',
            heroSubtitle: 'Versatile Engineering',
            stats: [
                { label: 'Diverse Portfolio', value: 'Yes' },
                { label: 'Custom Solutions', value: 'Available' }
            ]
        }
    ];

    const transaction = client.transaction();
    for (const ind of industriesContent) {
        transaction.createOrReplace(ind);
    }

    await transaction.commit();
    console.log('Industries content updated.');

    console.log('--- 2. Updating Classification (Including Others) ---');

    // Keywords (lowercase)
    const classifier = {
        'industry-power': ['ntpc', 'power', 'energy', 'mw', 'tpp', 'cpp', 'rrvunl', 'wbpdcl', 'mahagenco', 'tspl', 'coastal energen', 'electricity', 'mauda', 'unchahar', 'barauni', 'suratgarh', 'raichur', 'kanti', 'meja', 'harduaganj', 'obra', 'simhadri', 'vallur', 'rihand', 'kaniha', 'korba', 'prayagraj', 'solapur', 'muzaffarpur', 'ramagundam'],
        'industry-oil-gas': ['refinery', 'petro', 'reliance', 'nrl', 'ongc', 'oil', 'gas', 'dahej', 'panipat'],
        'industry-fertilizer': ['fertilizer', 'hurl', 'chemical', 'nalco', 'ammonia', 'urea', 'sindri', 'gorakhpur', 'talcher'],
        'industry-steel': ['steel', 'aluminium', 'balco', 'vedanta', 'metal', 'kalinga nagar', 'jharsuguda', 'tata steel']
    };

    const projects = await client.fetch(`*[_type == "project"]`);
    const patchTransaction = client.transaction();
    let count = 0;

    for (const p of projects) {
        let matchedIndustryId = 'industry-other'; // Default
        const text = `${p.title} ${p.clientName} ${p.location ? p.location.join(' ') : ''} ${p.workDescription || ''} ${p.description || ''}`.toLowerCase();

        // Try to match specific industries
        for (const [indId, keywords] of Object.entries(classifier)) {
            if (keywords.some(k => text.includes(k))) {
                matchedIndustryId = indId;
                break;
            }
        }

        // Always patch to ensure comprehensive coverage
        patchTransaction.patch(p._id, patch =>
            patch.set({ industry: { _type: 'reference', _ref: matchedIndustryId } })
        );
        count++;

        // Log typical ones
        // if (matchedIndustryId === 'industry-other') console.log(`Assigned [${p.title}] to Other`);
    }

    if (count > 0) {
        await patchTransaction.commit();
        console.log(`Updated ${count} projects with industry tags (including Other).`);
    }
}

run();
