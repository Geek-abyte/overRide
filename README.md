This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Content Management System

This project includes a modern, user-friendly CMS that allows non-technical users to easily update website content:

1. Create a `.env.local` file in the project root with these variables:
   ```
   CONTENT_API_KEY=your-secure-api-key-here
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password-here
   ```

   For development/testing, you can use these defaults:
   - Admin password: `admin-dev-pw`
   - API key: `default-dev-key`

2. Access the admin panel at `/admin` and log in using your password.

3. The enhanced CMS interface provides:
   - **Flexible Content Structure**: Enable/disable entire sections without breaking the app
   - **Structured Content Editing**: Organized by logical sections with descriptions
   - **Optional Fields**: Leave fields empty to hide them on your site
   - **Visual Guidance**: Section-specific help tips to guide content editing
   - **Modern UI**: Clean design with preview mode, validation, and unsaved changes warnings
   - **JSON Validation**: Real-time error checking to prevent saving invalid content

### Content Organization

The CMS organizes content into these main sections:

- **Site Configuration**: Control which sections are visible on your site
- **Personal Information**: Your details, social links, and contact form settings
- **Navigation**: Menu structure and items
- **Skills & Technologies**: Your technical expertise
- **Projects**: Portfolio projects and work
- **Work Experience**: Professional history and achievements
- **Footer Content**: Configure copyright notices and footer links

### Making Content Optional

To make elements optional:
1. For text fields: Simply leave them empty (`""`)
2. For sections: Set `enabled: false` in the siteConfig section
3. For navigation items: Set `enabled: false` on specific menu items
4. For social links: Leave unused platforms empty

All content is stored in `public/content.json` and safely loaded with fallbacks for missing data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
