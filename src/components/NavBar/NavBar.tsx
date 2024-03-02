'use client'
import { useState } from 'react';
import {
  Container,
  Group,
  Menu,
  Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './index.module.css';
import {UserButton} from "@clerk/nextjs";
import Image from "next/image";
import Logo from '../../../public/logo.png';
import Link from 'next/link';
import {useRouter} from "next-nprogress-bar";
import {usePathname} from "next/navigation";

const links = [
  { link: '/', label: 'Create' },
  { link: '/md', label: 'Markdown' },
  { link: '/me', label: 'My snippets' },
];

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links.filter((link) => link.link === pathname)[0]?.link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link)
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.header}>
      <Container size="md">
        <Group justify="space-between">
          <Image src={Logo} alt={'Logo'} height={'35'} />
          <Container size="md" className={classes.inner}>
            <Group gap={5} visibleFrom="xs">
              {items}
            </Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          </Container>
          <Menu
            width={260}
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <UserButton />
            </Menu.Target>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}