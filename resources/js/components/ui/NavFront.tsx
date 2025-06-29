import * as React from "react";
import { Link } from "lucide-react";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePage } from "@inertiajs/react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a href={href} className="block space-y-1 rounded-md p-3 leading-none no-underline hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="text-sm font-medium leading-none dark:text-[#EDEDEC] block">{title}</span>
          <span className="text-muted-foreground text-sm leading-snug line-clamp-2 dark:text-[#EDEDEC] block">
            {children}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export default function NavFront() {
  return (
    <>
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:text-[#EDEDEC]">Home</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild>
                                <a className=" flex h-full w-full flex-col justify-center rounded-md  p-6 no-underline outline-hidden select-none focus:shadow-md bg-linear-25 to-sky-200 via-blue-400 from-indigo-900 hover:to-sky-400 hover:via-blue-500 transition-all duration-300 ease-in-out" href="/">
                                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                                    shadcn/ui
                                    </div>
                                    <p className="text-sm leading-tight text-white">
                                    Beautifully designed components built with Tailwind CSS.
                                    </p>
                                </a>
                            </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                            Re-usable components built using Radix UI and Tailwind CSS.
                        </ListItem>
                        <ListItem href="/docs/installation" title="Installation">
                            How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem href="/docs/primitives/typography" title="Typography">
                            Styles for headings, paragraphs, lists...etc
                        </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:text-[#EDEDEC]">Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {components.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            >
                            {component.description}
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:text-[#EDEDEC]">List</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-4">
                        <li>
                            <NavigationMenuLink asChild>
                            <a href="#">
                                <div className="font-medium">Components</div>
                                <div className="text-muted-foreground">
                                Browse all components in the library.
                                </div>
                            </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <a href="#">
                                <div className="font-medium">Documentation</div>
                                <div className="text-muted-foreground">
                                Learn how to use the library.
                                </div>
                            </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <a href="#">
                                <div className="font-medium">Blog</div>
                                <div className="text-muted-foreground">
                                Read our latest blog posts.
                                </div>
                            </a>
                            </NavigationMenuLink>
                        </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="dark:text-[#EDEDEC]">With Icon</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                        <li>
                            <NavigationMenuLink asChild>
                            <a href="#" className="flex-row items-center gap-2">
                                <CircleHelpIcon />
                                Backlog
                            </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <a href="#" className="flex-row items-center gap-2">
                                <CircleIcon />
                                To Do
                            </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                            <a href="#" className="flex-row items-center gap-2">
                                <CircleCheckIcon />
                                Done
                            </a>
                            </NavigationMenuLink>
                        </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </>
  )
}
