
const aboutPage = {
    _id: 'about-us',
    _type: 'page',
    title: 'About Us',
    slug: { _type: 'slug', current: 'about-us' },
    heroType: 'color',
    heroHeading: 'About S.R. Construction',
    heroColor: '#1e293b',
    content: [
        {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'Introduction' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'S.R. CONSTRUCTION', marks: ['strong'] },
                { _type: 'span', text: ' have great pleasure to introduce ourselves as leading Contractors for carrying-Building finishing Work (Waterproofing, Tiles & Kota Stone, False Ceiling, Under deck Insulation, False Flooring, Rolling Shutter, Fire & Steel Door, Aluminum Door window, IPS Flooring) Grit/Copper Blasting Work, Supply and Application of all types of Painting Work, AR Tiles Work, Sheeting & Cladding work, Epoxy Coating Work, Grouting Work Insulation Work, Thermoplastic PPG Lining/FRP Lining, Pre-fabricated drain & N-Pits, Various FRP Products and General Order supplier and Supply of all categories of Manpower for Mechanical work & Civil work in Power Plant, Petro Chemical and Oil & Gas Industries (Construction and O&M works) since year 2016.' }
            ]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'S.R. CONSTRUCTION', marks: ['strong'] },
                { _type: 'span', text: ' has sufficient Tools & Tackles, Machinery and Experienced & Qualified staff & manpower, which will do the work all over India in Power Plant, Petro Chemical and Oil & Gas Industries.' }
            ]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'S.R.CONSTRUCTION', marks: ['strong'] },
                { _type: 'span', text: ' is known for its quality, reliability and workmanship. Through consistent quality and timely completion of project, we have been well accepted in Indian market by our reputed clients / customers. Please find the enclosed here with details of S.R. CONSTRUCTION covering all statutory requirements (copy of PF, ESIC, GST, Pan -Card MSME Registration Certificate etc.) along with credential, i.e. list of work done by us & under progress in all over India.' }
            ]
        },
        {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'MISSION' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Fully dedicated to provide quality construction, technical & management services to our customers & strive to implement a long term relationship with our clients based on safety, quality & timely services by treating all employees fairly and involve them in quality improvement process to insure responsiveness & cost effective work execution.' }],
        },
        {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'OUR VALUES' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Our values are the uncompromising foundations upon which we build our mission.' }],
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'Integrity: ', marks: ['strong'] },
                { _type: 'span', text: 'The courage to maintain the right from the wrong without compromise.' }
            ],
            listItem: 'bullet'
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'Reliability: ', marks: ['strong'] },
                { _type: 'span', text: 'The ability to deliver on what we promise, without exception.' }
            ],
            listItem: 'bullet'
        },
        {
            _type: 'block',
            style: 'normal',
            children: [
                { _type: 'span', text: 'Accountability: ', marks: ['strong'] },
                { _type: 'span', text: 'The strength to be responsible for our own actions and decisions.' }
            ],
            listItem: 'bullet'
        },
    ]
};

console.log(JSON.stringify(aboutPage, null, 2));
