# S.R. Construction - CMS User Guide

This guide details how to manage content on your website using the Sanity CMS.

**Access URL:** `[Your-Website-URL]/studio`

---

## 1. Site Settings
**Menu Item:** `Site Settings`
This section controls global website information.

-   **Logo Text/Image**: The text displayed as the logo in the header.
-   **Address**: Your office address shown in the footer.
-   **Phone Numbers**: Add multiple contact numbers here. (Note: The legacy "Phone" field is read-only; please use this list instead).
-   **Email**: The primary contact email.
-   **Footer Tagline**: Text appearing above the copyright in the footer.
-   **Copyright Text**: Copyright notice (e.g., "All rights reserved").
-   **Social Links**: Add links to your social profiles.
    -   *Platform*: Name of the network (e.g., "LinkedIn").
    -   *Url*: Full profile link.

## 2. Navigation (Header & Footer)
**Menu Item:** `Navigation`
Manage your "Header Menu" and "Footer Menu".

-   **Menu Name**: Identify which menu this is (e.g., "Header Menu").
-   **Navigation Items**: The list of links.
    -   **Label**: Text shown to the user (e.g., "About").
    -   **Link Type**:
        -   *Internal Page*: Link to a CMS document (Page, Project, etc.).
        -   *External / Custom URL*: Link to another website or specific path.
        -   *Section (Scroll)*: specific ID on the homepage.
    -   **Conditionals**:
        -   If *Internal*: Select the **Internal Page** reference.
        -   If *External*: Enter the **URL** (full `https://` or relative `/path`).
        -   If *Section*: Enter the **Section ID** (e.g., `contact`, `projects` - without the `#`).

## 3. Homepage Content
**Menu Item:** `Homepage`
This single document controls the sections on your landing page.

-   **Hero Section**:
    -   *Hero Heading*: Static fallback title.
    -   *Hero Typewriter Phrases*: Animated text that cycles (e.g., "Excellence", "Innovation").
    -   *Subheading*: Text below the main title.
    -   *CTA Buttons*: Labels and links for Primary (Orange) and Secondary (Outline) buttons.
    -   *Hero Image*: The main background or banner image.
-   **Section Titles**: Customize the headings for "Clients", "Industries", "Projects", "Equipment", "Process", "Blog", and "FAQ" sections.
-   **Process Steps**: Manage the "How We Work" timeline.
    -   *Num*: Step number (01, 02...).
    -   *Title*: Step name.
    -   *Description*: Brief details.
-   **Safety & Standards**: Manage certifications.
    -   *Title*: Certification name.
    -   *Description*: Brief details.
    -   *Icon*: Choose an icon preset (award, shield, hat, leaf).

## 4. Generic Pages
**Menu Item:** `Page`
Create standard pages like "About Us", "Contact", or "Privacy Policy".

-   **Title**: Page name.
-   **Slug**: URL path (click "Generate").
-   **Hero Type**:
    -   *Image*: Upload a **Hero Image**.
    -   *Color*: Uses a solid background color.
-   **Hero Heading**: Overrides the page title in the banner if set.
-   **Hero Color**: Hex code (Default: `#0F172A`).
-   **Content**: Rich text area for paragraphs, headings, and images.

## 5. Projects
**Menu Item:** `Project`
Manage your portfolio portfolio.

-   **Content Group**:
    -   *Title*: Project Name.
    -   *Category*: Residential, Commercial, Industrial, or Other.
    -   *Featured Project*: Toggle "On" to highlight this on key sections.
    -   *Work Description*: Detailed scope of work.
    -   *Short Description*: Brief summary for cards.
-   **Details Group**:
    -   *Project Status*: Completed or In-Progress.
    -   *Client Name*: Who the project was for.
    -   *Work Value*: Project value in Rs.
    -   *Locations*: List of locations (allows multiple).
    -   *Related Industry*: Link to an Industry document.
    -   *Dates*: Start and End dates.
-   **Media Group**:
    -   *Main Image*: Thumbnail and banner image.
    -   *Project Gallery*: Additional photos for the project page.

## 6. Industries
**Menu Item:** `Industry`
Define the sectors you serve (e.g., Oil & Gas, Infrastructure).

-   **Identity**: Title, Slug, Description, and Cover Image.
-   **Page Content**:
    -   *Hero Subtitle*: Specific subtitle for this industry page.
    -   *Our Offerings*: List of sub-services (Title + Image).
    -   *Content*: Rich text block.
-   **Statistics**:
    -   *Proven Track Record Stats*: Add key metrics (Label: "Years", Value: "25+").

## 7. Team & Staffing
**Menu Items:** `Team Page` and `Staff Role`
The team page is split into a header and the staffing list.

-   **Team Page (Settings)**:
    -   *Page Title*: Main heading (Default: "Qualified & Experienced Staffs").
    -   *Subtitle*: Text below the title.
    -   *Slug*: URL path (Default: `team`).
-   **Staff Role (List Items)**:
    -   *Role / Designation*: E.g., "Engineers", "Architects".
    -   *Number of Staff*: The count of employees in this role.
    -   *Representative Image*: A photo representing the group.
    -   *Display Order*: Use numbers (0, 1, 2...) to sort the list.

## 8. Clients (Logos)
**Menu Item:** `Client`
Manage the scrolling "Our Clients" logo bar.

-   **Company Name**: For internal tracking.
-   **Logo**: Upload a clean PNG/SVG of the client logo.
-   **Website URL**: (Optional) Link to the client's site.

## 9. Equipment
**Menu Item:** `Equipment`
Manage your machinery fleet list.

-   **Equipment Name**: E.g., "Excavator JS 200".
-   **Quantity**: Text field (e.g., "5 Units").
-   **Image**: Photo of the machinery.
-   **Description**: Brief summary.
-   **Features**: List of key characteristics.
-   **Technical Specification**: detailed data.

## 10. News & Insights (Blog)
**Menu Item:** `Blog Post`

-   **Title**: Article headline.
-   **Related Industry**: Optional link to an industry.
-   **Published at**: Date/Time of publication.
-   **Main image**: Cover photo.
-   **Excerpt**: Short teaser text for listing pages.
-   **Body**: Rich text content with images.

## 11. FAQs
**Menu Item:** `FAQs`
Manage the accordion list on the homepage.

-   **Question**: The query.
-   **Answer**: The response text.
-   **Order**: Sorting number (lowest first).

## 12. Inquiries & Leads
**Menu Item:** `Inquiries / Leads`
View form submissions from the website.

-   **Data**: View Name, Email, Mobile, Project Type, and Message.
-   **Status**: Update internal state (New, Contacted, Converted, Lost).

## 13. Advanced Page Configs
**Menu Item:** `Page Configs`
Specific settings for grouped pages.

-   **Projects Page Config**: Manage the header/title for the main projects listing page.
-   **Team Page Config**: Manage the header/title for the team members page.
