import { NavLink } from '@/types';
import {
    IconActivity,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandX,
    IconHome,
    IconBrandBluesky
} from '@tabler/icons-react';

export function getNavLinks(profileLinks: { bluesky: string, twitter: string; github: string, linkedin: string }): NavLink[] {
    return [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full " />
            ),
            href: "/",
            openBlank: false
        },
        {
            title: "Gracensity",
            icon: (
                <IconActivity className="h-full w-full " />
            ),
            href: "https://gracensity.com",
            openBlank: true
        },
        {
            title: "LinkedIn",
            icon: (
                <IconBrandLinkedin className="h-full w-full " />
            ),
            href: `https://linkedin.com/in/${profileLinks.linkedin}`,
            openBlank: true
        },
        {
            title: "Bluesky",
            icon: (
                <IconBrandBluesky className="h-full w-full " />
            ),
            href: `https://bsky.app/profile/${profileLinks.bluesky}`,
            openBlank: true
        },
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full " />
            ),
            href: `https://twitter.com/${profileLinks.twitter}`,
            openBlank: true
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full " />
            ),
            href: `https://github.com/${profileLinks.github}`,
            openBlank: true
        },
    ];
}