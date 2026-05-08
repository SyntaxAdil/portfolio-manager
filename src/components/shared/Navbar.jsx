"use client";

import { FolderKanban, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import NavLink from "../../utils/NavLink";
import { authClient } from "../../lib/auth/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);

  const Nav_Links = [
    { id: 1, href: "/", label: "Projects" },
    { id: 2, href: `/add-project`, label: "Add Project" },
    { id: 3, href: "/edit-project", label: "Edit Project" },
    { id: 4, href: "/remove-project", label: "Remove Project" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex items-center justify-between px-6 md:px-8 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold group"
          >
            <span className="bg-primary text-primary-foreground p-2 rounded-md transition-transform duration-200 group-hover:rotate-12">
              <FolderKanban
                size={18}
                className="transition-transform duration-200 group-hover:-rotate-12"
              />
            </span>
            <span>
              <span className="text-primary">Portfolio</span> Manager
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-2">
            {Nav_Links.map((link) => (
              <li key={link.id} className="px-3 py-2">
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            {isPending ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer size-9">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name}
                  </div>
                  <div className="px-2 pb-1.5 text-xs text-muted-foreground">
                    {user?.email}
                  </div>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                  >
                    <LogOut size={14} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((p) => !p)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {open && (
          <div className="md:hidden border-t bg-background">
            <ul className="flex flex-col p-4">
              {Nav_Links.map((link) => (
                <li
                  key={link.id}
                  className="py-2"
                  onClick={() => setOpen(false)}
                >
                  <NavLink href={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>

            <div className="p-4 pt-0">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={user?.image} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut size={14} className="mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-20" />
    </header>
  );
};

export default Navbar;
