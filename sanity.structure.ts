import { StructureBuilder } from 'sanity/structure'

// Helper to filter out singleton types from the default list
const hiddenDocTypes = (listItem: any) =>
    ![
        'homepage',
        'siteSettings',
        'projectsPage',
        'teamPage',
        // We will list these manually
        'project',
        'industry',
        'equipment',
        'blog',
        'page',
        'staffRole',
        'client',
        'faq',
        'navigation',
    ].includes(listItem.getId())

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Content')
        .items([
            // --- SINGLETONS (High Priority) ---
            S.listItem()
                .title('Homepage')
                .child(
                    S.document()
                        .schemaType('homepage')
                        .documentId('homepage')
                        .title('Homepage Content')
                ),

            S.listItem()
                .title('Site Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .title('Global Settings')
                ),

            S.divider(),

            // --- CORE CONTENT ---
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('industry').title('Industries'),
            S.documentTypeListItem('equipment').title('Equipments'),
            S.documentTypeListItem('page').title('Pages (About, etc)'),

            S.divider(),

            // --- MARKETING / UPDATES ---
            S.documentTypeListItem('blog').title('News & Blog'),
            S.documentTypeListItem('faq').title('FAQs'),
            S.documentTypeListItem('client').title('Clients / Logos'),
            S.documentTypeListItem('staffRole').title('Team Members'),

            S.divider(),

            // --- CONFIGURATION ---
            S.listItem()
                .title('Navigation Menus')
                .child(
                    S.list()
                        .title('Menus')
                        .items([
                            S.documentListItem()
                                .title('Header Menu')
                                .schemaType('navigation')
                                .id('header-menu'),
                            S.documentListItem()
                                .title('Footer Menu')
                                .schemaType('navigation')
                                .id('footer-menu'),
                        ])
                ),

            S.listItem()
                .title('Page Configs')
                .child(
                    S.list()
                        .title('Page Configurations')
                        .items([
                            S.listItem()
                                .title('Projects Page Config')
                                .child(
                                    S.document()
                                        .schemaType('projectsPage')
                                        .documentId('projectsPage')
                                ),
                            S.listItem()
                                .title('Team Page Config')
                                .child(
                                    S.document()
                                        .schemaType('teamPage')
                                        .documentId('teamPage')
                                ),
                        ])
                ),

            // --- CATCH-ALL ---
            ...S.documentTypeListItems().filter(hiddenDocTypes),
        ])
