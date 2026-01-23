import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Website Content')
        .items([
            // Group: Site Settings (Singletons)
            S.listItem()
                .id('settings')
                .title('Site Configuration')
                .child(
                    S.list()
                        .title('Settings')
                        .items([
                            S.listItem()
                                .title('Homepage Config')
                                .child(
                                    S.document()
                                        .schemaType('homepage')
                                        .documentId('homepage')
                                ),
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
                            S.listItem()
                                .title('Navigation')
                                .child(
                                    S.document()
                                        .schemaType('navigation')
                                        .documentId('navigation')
                                ),
                            S.listItem()
                                .title('General Settings')
                                .child(
                                    S.document()
                                        .schemaType('siteSettings')
                                        .documentId('siteSettings')
                                ),
                        ])
                ),

            S.divider(),

            // Group: Portfolio & Assets
            S.listItem()
                .id('portfolio')
                .title('Projects & Assets')
                .child(
                    S.list()
                        .title('Portfolio')
                        .items([
                            S.documentTypeListItem('project').title('Projects'),
                            S.documentTypeListItem('industry').title('Industries'),
                            S.documentTypeListItem('equipment').title('Equipment & Machinery'),
                        ])
                ),

            // Group: Organization
            S.listItem()
                .id('organization')
                .title('Organization')
                .child(
                    S.list()
                        .title('Organization')
                        .items([
                            S.documentTypeListItem('staffRole').title('Team'),
                            S.documentTypeListItem('client').title('Clients'),
                        ])
                ),

            S.divider(),

            // Group: Content
            S.listItem()
                .id('editorial')
                .title('Content')
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.documentTypeListItem('blog').title('News / Blog'),
                            S.documentTypeListItem('faq').title('FAQs'),
                            S.documentTypeListItem('page').title('Custom Pages'),
                        ])
                ),

            // Filter out mapped items
            ...S.documentTypeListItems().filter(
                (listItem) =>
                    !['homepage', 'navigation', 'siteSettings', 'project', 'industry', 'staffRole', 'client', 'blog', 'page', 'equipment', 'faq', 'projectsPage', 'teamPage'].includes(
                        listItem.getId() as string
                    )
            ),
        ])
