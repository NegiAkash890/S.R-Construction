import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Website Content')
        .items([
            // Group: Site Settings (Singletons)
            S.listItem()
                .id('settings')
                .title('Site Settings')
                .child(
                    S.list()
                        .title('Settings')
                        .items([
                            S.listItem()
                                .title('Homepage')
                                .child(
                                    S.document()
                                        .schemaType('homepage')
                                        .documentId('homepage')
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

            // Group: Portfolio
            S.listItem()
                .id('portfolio')
                .title('Project Portfolio')
                .child(
                    S.list()
                        .title('Portfolio')
                        .items([
                            S.documentTypeListItem('project').title('All Projects'),
                            S.documentTypeListItem('industry').title('Industries Served'),
                        ])
                ),

            // Group: Organization
            S.listItem()
                .id('organization')
                .title('Our Organization')
                .child(
                    S.list()
                        .title('Organization')
                        .items([
                            S.documentTypeListItem('staffRole').title('Team & Staff'),
                            S.documentTypeListItem('client').title('Client Register'),
                        ])
                ),

            S.divider(),

            // Group: Editorial
            S.listItem()
                .id('editorial')
                .title('Editorial & Pages')
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.documentTypeListItem('blog').title('Blog Posts'),
                            S.documentTypeListItem('page').title('Custom Pages'),
                        ])
                ),

            // Filter out mapped items from the default list
            ...S.documentTypeListItems().filter(
                (listItem) =>
                    !['homepage', 'navigation', 'siteSettings', 'project', 'industry', 'staffRole', 'client', 'blog', 'page'].includes(
                        listItem.getId() as string
                    )
            ),
        ])
